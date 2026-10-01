'use client'

import Link from 'next/link'
import { useCart } from '@/lib/store/cart'
import { Button } from '@/components/ui/button'
import { Trash2, ShoppingCart, ArrowRight } from 'lucide-react'

export default function CartPage() {
  const { items, removeItem, getTotal, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
          <ShoppingCart className="w-12 h-12 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold font-kanit mb-4">ตะกร้าสินค้าของคุณว่างเปล่า</h2>
        <p className="text-muted-foreground font-kanit mb-8 max-w-md">
          ดูเหมือนว่าคุณจะยังไม่ได้เพิ่มหนังสือลงในตะกร้าสินค้า ลองค้นหาหนังสือเทคนิคฟุตบอลที่คุณสนใจดูสิ
        </p>
        <Button asChild size="lg" className="font-kanit">
          <Link href="/books">ไปเลือกซื้อหนังสือเลย</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold font-kanit mb-8">ตะกร้าสินค้า</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-4">
          <div className="flex justify-between items-center mb-4 pb-4 border-b">
            <span className="font-kanit text-muted-foreground">{items.length} รายการ</span>
            <Button variant="ghost" size="sm" className="text-danger hover:text-danger/80 hover:bg-danger/10 font-kanit" onClick={clearCart}>
              ล้างตะกร้า
            </Button>
          </div>
          
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 p-4 border rounded-xl bg-surface items-center">
              <div className="w-20 h-28 bg-muted rounded-md flex-shrink-0 flex items-center justify-center overflow-hidden relative">
                {item.coverUrl ? (
                  <img src={item.coverUrl} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[10px] text-muted-foreground">ไม่มีรูป</span>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-bold font-kanit text-lg line-clamp-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground font-kanit">{item.author}</p>
                <div className="flex items-center gap-2 mt-2 font-inter font-bold">
                  <span className="text-primary text-lg">฿{item.salePrice || item.price}</span>
                  {item.salePrice && <span className="text-sm text-muted-foreground line-through">฿{item.price}</span>}
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-danger flex-shrink-0" onClick={() => removeItem(item.id)}>
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>
          ))}
        </div>
        
        <div className="w-full lg:w-[350px]">
          <div className="border rounded-xl p-6 bg-surface sticky top-24">
            <h3 className="font-bold text-xl font-kanit mb-6">สรุปคำสั่งซื้อ</h3>
            
            <div className="space-y-3 mb-6 font-kanit">
              <div className="flex justify-between">
                <span className="text-muted-foreground">ยอดรวม ({items.length} รายการ)</span>
                <span className="font-inter font-medium">฿{getTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-success">
                <span>ส่วนลด</span>
                <span className="font-inter font-medium">-฿0.00</span>
              </div>
              <div className="border-t pt-3 mt-3 flex justify-between items-center">
                <span className="font-bold text-lg">ยอดสุทธิ</span>
                <span className="font-inter font-bold text-2xl text-primary">฿{getTotal().toFixed(2)}</span>
              </div>
            </div>

            <Button className="w-full font-kanit gap-2" size="lg" asChild>
              <Link href="/checkout">
                ดำเนินการชำระเงิน <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
