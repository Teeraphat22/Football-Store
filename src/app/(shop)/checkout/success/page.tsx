'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/store/cart'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Package, Library } from 'lucide-react'

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart()

  useEffect(() => {
    // ล้างตะกร้าเมื่อชำระเงินสำเร็จ
    clearCart()
  }, [clearCart])

  return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
      <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mb-6">
        <CheckCircle2 className="w-12 h-12 text-success" />
      </div>
      
      <h1 className="text-3xl md:text-4xl font-bold font-kanit mb-4 text-success">ชำระเงินสำเร็จ!</h1>
      <p className="text-lg text-muted-foreground font-kanit mb-2 max-w-lg">
        ขอบคุณสำหรับการสั่งซื้อ เราได้ส่งใบเสร็จรับเงินไปยังอีเมลของคุณเรียบร้อยแล้ว
      </p>
      <p className="text-muted-foreground font-kanit mb-10 max-w-lg">
        รหัสคำสั่งซื้อ: <span className="font-inter font-medium text-text">ORD-{Math.random().toString().slice(2, 10)}</span>
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg" className="font-kanit gap-2">
          <Link href="/library">
            <Library className="w-5 h-5" />
            ไปที่คลังหนังสือของฉัน
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="font-kanit gap-2">
          <Link href="/orders">
            <Package className="w-5 h-5" />
            ติดตามคำสั่งซื้อ
          </Link>
        </Button>
      </div>
    </div>
  )
}
