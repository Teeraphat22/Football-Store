import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  try {
    const { items, orderId } = await req.json()
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // สร้าง line_items สำหรับ Stripe
    const line_items = items.map((item: any) => ({
      price_data: {
        currency: 'thb',
        product_data: {
          name: item.title,
          images: item.coverUrl ? [item.coverUrl] : [],
        },
        unit_amount: Math.round((item.salePrice || item.price) * 100), // Stripe รับหน่วยเป็นสตางค์
      },
      quantity: 1,
    }))

    // สร้าง Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'promptpay'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout`,
      metadata: {
        orderId: orderId,
        userId: user.id,
      },
      customer_email: user.email,
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
