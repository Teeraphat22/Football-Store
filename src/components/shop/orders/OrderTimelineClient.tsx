'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent } from '@/components/ui/card'
import { ShoppingCart, CreditCard, Settings, Package, CheckCircle2, XCircle, Undo2, Download, MessageCircle, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

const STEPS = [
  { id: 'pending', label: 'สั่งซื้อสำเร็จ', icon: ShoppingCart },
  { id: 'paid', label: 'ชำระเงินแล้ว', icon: CreditCard },
  { id: 'processing', label: 'กำลังเตรียมไฟล์', icon: Settings },
  { id: 'ready', label: 'พร้อมดาวน์โหลด', icon: Package },
  { id: 'completed', label: 'เสร็จสิ้น', icon: CheckCircle2 },
]

export default function OrderTimelineClient({ 
  initialOrder, 
  initialHistory 
}: { 
  initialOrder: any, 
  initialHistory: any[] 
}) {
  const supabase = createClient()
  const [order, setOrder] = useState(initialOrder)
  const [history, setHistory] = useState(initialHistory)

  useEffect(() => {
    // Subscribe to order status changes
    const orderSub = supabase
      .channel(`order-${order.id}`)
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'orders',
        filter: `id=eq.${order.id}` 
      }, (payload) => {
        setOrder(payload.new)
      })
      .subscribe()

    // Subscribe to history additions
    const historySub = supabase
      .channel(`history-${order.id}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'order_status_history',
        filter: `order_id=eq.${order.id}`
      }, (payload) => {
        setHistory(prev => [payload.new, ...prev])
      })
      .subscribe()

    return () => {
      supabase.removeChannel(orderSub)
      supabase.removeChannel(historySub)
    }
  }, [order.id, supabase])

  const currentStatusIndex = STEPS.findIndex(s => s.id === order.status)
  const isCancelled = order.status === 'cancelled'
  const isRefunded = order.status === 'refunded'
  const isSpecialState = isCancelled || isRefunded

  const handleDownload = async (itemId: string) => {
    // TODO: Call API to get signed URL
    alert('เรียก API เพื่อดึง Signed URL สร้างใน Step ต่อไป')
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Left: Timeline */}
      <div className="lg:col-span-1">
        <Card>
          <CardContent className="p-6">
            <h2 className="font-bold text-lg font-kanit mb-6">สถานะคำสั่งซื้อ</h2>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
              {isSpecialState ? (
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-surface bg-danger text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
                    {isCancelled ? <XCircle className="w-5 h-5" /> : <Undo2 className="w-5 h-5" />}
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border shadow-sm bg-surface">
                    <div className="flex items-center justify-between space-x-2 mb-1">
                      <div className="font-bold text-danger font-kanit">{isCancelled ? 'ยกเลิกคำสั่งซื้อ' : 'คืนเงินสำเร็จ'}</div>
                    </div>
                  </div>
                </div>
              ) : (
                STEPS.map((step, idx) => {
                  const isActive = currentStatusIndex >= idx
                  const isCurrent = currentStatusIndex === idx
                  const stepHistory = history.find(h => h.to_status === step.id)
                  
                  return (
                    <div key={step.id} className="relative flex items-center group">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-surface shrink-0 z-10 shadow transition-colors ${isActive ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                        <step.icon className="w-5 h-5" />
                      </div>
                      <div className="ml-4 w-full">
                        <div className={`font-bold font-kanit ${isActive ? 'text-text' : 'text-muted-foreground'}`}>
                          {step.label}
                        </div>
                        {stepHistory && (
                          <div className="text-sm text-muted-foreground font-kanit mt-1">
                            {new Date(stepHistory.created_at).toLocaleString('th-TH')}
                            {stepHistory.note && <p className="text-xs mt-1 italic text-muted-foreground/80">{stepHistory.note}</p>}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right: Details & Actions */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardContent className="p-6">
            <h2 className="font-bold text-lg font-kanit mb-4 border-b pb-2">รายละเอียดสินค้า</h2>
            <div className="space-y-4">
              {order.order_items.map((item: any) => (
                <div key={item.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-lg gap-4">
                  <div>
                    <h3 className="font-bold font-kanit">{item.title_snapshot}</h3>
                    <p className="text-sm text-muted-foreground font-inter">฿{item.price}</p>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button 
                      disabled={order.status !== 'ready' && order.status !== 'completed'} 
                      onClick={() => handleDownload(item.id)}
                      className="font-kanit flex-1 sm:flex-none gap-2"
                    >
                      <Download className="w-4 h-4" />
                      ดาวน์โหลด ({item.download_count}/5)
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t pt-4 flex flex-col sm:flex-row gap-4 justify-end">
              <Button variant="outline" className="font-kanit gap-2">
                <MessageCircle className="w-4 h-4" />
                ติดต่อผู้ขาย
              </Button>
              <Button variant="outline" className="font-kanit gap-2 text-danger hover:text-danger hover:bg-danger/10 border-danger/30">
                <HelpCircle className="w-4 h-4" />
                ขอคืนเงิน
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
