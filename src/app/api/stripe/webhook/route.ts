import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'
import Stripe from 'stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('Stripe-Signature') as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || 'whsec_test_mock'
    )
  } catch (error: any) {
    console.error('Webhook signature verification failed:', error.message)
    return NextResponse.json({ error: `Webhook Error: ${error.message}` }, { status: 400 })
  }

  const supabase = createClient()

  try {
    // จัดการ Event เมื่อชำระเงินสำเร็จ
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      const orderId = session.metadata?.orderId

      if (orderId) {
        // อัปเดตสถานะคำสั่งซื้อเป็น 'paid'
        await supabase
          .from('orders')
          .update({
            status: 'paid',
            stripe_session_id: session.id,
            stripe_payment_intent: session.payment_intent as string,
            paid_at: new Date().toISOString(),
          })
          .eq('id', orderId)

        // เพิ่มบันทึกสถานะลงใน Timeline
        await supabase.from('order_status_history').insert({
          order_id: orderId,
          from_status: 'pending',
          to_status: 'paid',
          note: 'ชำระเงินผ่านระบบ Stripe สำเร็จ',
          changed_by: null // System action
        })
        
        // TODO: สามารถส่งอีเมลยืนยันการชำระเงินตรงนี้ได้ (จะทำใน Step 10)
      }
    }

    // รองรับกรณีชำระเงินล้มเหลว
    if (event.type === 'checkout.session.async_payment_failed') {
      const session = event.data.object as Stripe.Checkout.Session
      const orderId = session.metadata?.orderId
      if (orderId) {
         await supabase.from('order_status_history').insert({
          order_id: orderId,
          from_status: 'pending',
          to_status: 'cancelled',
          note: 'การชำระเงินถูกปฏิเสธหรือล้มเหลว',
        })
        await supabase.from('orders').update({ status: 'cancelled' }).eq('id', orderId)
      }
    }

    return NextResponse.json({ received: true })
  } catch (err: any) {
    console.error('Error processing webhook:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
