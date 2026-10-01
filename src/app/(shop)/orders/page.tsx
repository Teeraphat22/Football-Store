import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Package, ChevronRight, Clock } from 'lucide-react'

// Helper for status badge
const getStatusBadge = (status: string) => {
  const map: Record<string, { label: string; color: string }> = {
    pending: { label: 'รอชำระเงิน', color: 'bg-yellow-500' },
    paid: { label: 'ชำระเงินแล้ว', color: 'bg-blue-500' },
    processing: { label: 'กำลังเตรียมไฟล์', color: 'bg-indigo-500' },
    ready: { label: 'พร้อมดาวน์โหลด', color: 'bg-green-500' },
    completed: { label: 'เสร็จสิ้น', color: 'bg-success' },
    cancelled: { label: 'ยกเลิก', color: 'bg-danger' },
    refunded: { label: 'คืนเงิน', color: 'bg-gray-500' },
  }
  const config = map[status] || { label: status, color: 'bg-gray-500' }
  return <Badge className={`${config.color} text-white font-kanit`}>{config.label}</Badge>
}

export default async function OrdersPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Fetch orders
  const { data: orders } = await supabase
    .from('orders')
    .select('*, order_items(*, books(title, cover_url))')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold font-kanit mb-8">ประวัติการสั่งซื้อ</h1>
      
      {!orders || orders.length === 0 ? (
        <div className="text-center py-20 border rounded-xl bg-surface">
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-bold font-kanit mb-2">ยังไม่มีคำสั่งซื้อ</h2>
          <p className="text-muted-foreground font-kanit">คุณยังไม่ได้ทำการสั่งซื้อหนังสือใดๆ</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link key={order.id} href={`/orders/${order.id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer border-border mb-4">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
                    <div>
                      <h3 className="font-bold font-kanit text-lg flex items-center gap-2">
                        {order.order_code}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground font-inter mt-1">
                        <Clock className="w-4 h-4" />
                        {new Date(order.created_at).toLocaleDateString('th-TH', {
                          year: 'numeric', month: 'short', day: 'numeric',
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-inter font-bold text-lg">฿{order.total}</span>
                      {getStatusBadge(order.status)}
                      <ChevronRight className="w-5 h-5 text-muted-foreground hidden sm:block" />
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <p className="text-sm text-muted-foreground font-kanit line-clamp-1">
                      {order.order_items?.map((item: any) => item.title_snapshot).join(', ')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
