'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/lib/store/cart'
import { Button } from '@/components/ui/button'
import { CreditCard, QrCode } from 'lucide-react'

export default function CheckoutPage() {
  const { items, getTotal } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart')
    }
  }, [items, router])

  const handleCheckout = async (method: 'stripe' | 'promptpay') => {
    setLoading(true)
    // TODO: เรียก API สร้าง Stripe Session หรือ PromptPay
    // Mock simulation
    setTimeout(() => {
      router.push('/checkout/success')
      setLoading(false)
    }, 1500)
  }

  if (items.length === 0) return null

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold font-kanit mb-8 text-center">ชำระเงิน</h1>
      
      <div className="bg-surface border rounded-xl p-6 md:p-8 shadow-sm">
        <h3 className="font-bold text-xl font-kanit mb-6 pb-4 border-b">สรุปยอดที่ต้องชำระ</h3>
        
        <div className="space-y-4 mb-8">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center font-kanit text-sm">
              <span className="line-clamp-1 flex-1 pr-4">{item.title}</span>
              <span className="font-inter font-medium whitespace-nowrap">฿{item.salePrice || item.price}</span>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 mb-8 flex justify-between items-center">
          <span className="font-bold text-lg font-kanit">ยอดสุทธิรวม</span>
          <span className="font-inter font-bold text-3xl text-primary">฿{getTotal().toFixed(2)}</span>
        </div>

        <h3 className="font-bold text-lg font-kanit mb-4">เลือกช่องทางชำระเงิน</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            className="h-24 flex flex-col gap-2 items-center justify-center font-kanit hover:border-primary hover:text-primary transition-all"
            onClick={() => handleCheckout('stripe')}
            disabled={loading}
          >
            <CreditCard className="w-8 h-8" />
            <span>บัตรเครดิต / เดบิต (Stripe)</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-24 flex flex-col gap-2 items-center justify-center font-kanit hover:border-primary hover:text-primary transition-all"
            onClick={() => handleCheckout('promptpay')}
            disabled={loading}
          >
            <QrCode className="w-8 h-8" />
            <span>สแกน QR Code (PromptPay)</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
