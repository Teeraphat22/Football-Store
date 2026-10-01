import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import OrderTimelineClient from '@/components/shop/orders/OrderTimelineClient'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Fetch order data
  const { data: order, error } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .eq('id', params.id)
    .single()

  if (error || !order || order.user_id !== user.id) {
    redirect('/orders')
  }

  // Fetch status history
  const { data: history } = await supabase
    .from('order_status_history')
    .select('*')
    .eq('order_id', order.id)
    .order('created_at', { ascending: false })

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-6">
        <Link href="/orders" className="text-muted-foreground hover:text-primary flex items-center gap-1 font-kanit w-fit mb-4">
          <ChevronLeft className="w-4 h-4" /> กลับไปหน้ารายการสั่งซื้อ
        </Link>
        <h1 className="text-3xl font-bold font-kanit">คำสั่งซื้อ {order.order_code}</h1>
        <p className="text-muted-foreground font-kanit mt-1">
          วันที่สั่งซื้อ: {new Date(order.created_at).toLocaleString('th-TH')}
        </p>
      </div>

      <OrderTimelineClient initialOrder={order} initialHistory={history || []} />
    </div>
  )
}
