import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/server'
import { BookOpen, Clock, CheckCircle } from 'lucide-react'

export default async function BecomeSellerPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let profile = null
  if (user) {
    const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
    profile = data
  }

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border p-8 md:p-12 text-center">
        <BookOpen className="w-16 h-16 text-primary mx-auto mb-6" />
        <h1 className="text-3xl font-bold font-kanit mb-4">ร่วมเป็นนักเขียนและผู้ขายกับเรา</h1>
        
        {!user && (
          <>
            <p className="text-muted-foreground font-kanit mb-8 text-lg">
              แบ่งปันความรู้และเทคนิคฟุตบอลของคุณให้กับผู้คนนับหมื่น สร้างรายได้ง่ายๆ เพียงอัปโหลด E-book ของคุณ
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="font-kanit text-lg px-8">
                <Link href="/auth/register">สมัครเปิดร้านเลย</Link>
              </Button>
            </div>
          </>
        )}

        {user && profile?.role === 'customer' && (
          <>
            <p className="text-muted-foreground font-kanit mb-8 text-lg">
              คุณมีบัญชีผู้อ่านอยู่แล้ว ต้องการอัปเกรดเป็นบัญชีผู้ขายหรือไม่? (แอดมินจะใช้เวลาตรวจสอบ 1-2 วันทำการ)
            </p>
            {/* ในระบบจริงตรงนี้ควรกดปุ่มเพื่ออัปเดต role แต่สำหรับการทดสอบให้แจ้งเตือนไว้ก่อน */}
            <Button size="lg" className="font-kanit" disabled>
              ระบบอัปเกรดบัญชีกำลังอยู่ระหว่างพัฒนา
            </Button>
          </>
        )}

        {user && profile?.role === 'seller' && profile?.seller_status === 'pending' && (
          <div className="bg-blue-50 border border-blue-100 p-8 rounded-xl mt-6">
            <Clock className="w-12 h-12 text-blue-500 mx-auto mb-4 animate-pulse" />
            <h3 className="text-xl font-bold font-kanit text-blue-900 mb-2">บัญชีของคุณกำลังรอการตรวจสอบ</h3>
            <p className="text-blue-700 font-kanit">
              ทีมงานได้รับคำขอเปิดร้านของคุณแล้ว กรุณารอแอดมินตรวจสอบและอนุมัติภายใน 24 ชั่วโมง 
            </p>
            <p className="text-sm text-blue-600 font-kanit mt-4 pt-4 border-t border-blue-200">
              *สำหรับการทดสอบ: ให้ไปที่หน้า /admin/dashboard เพื่อกดอนุมัติตัวเองครับ
            </p>
          </div>
        )}

        {user && profile?.role === 'seller' && profile?.seller_status === 'approved' && (
          <div className="bg-green-50 border border-green-100 p-8 rounded-xl mt-6">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold font-kanit text-green-900 mb-2">ร้านค้าของคุณเปิดใช้งานแล้ว!</h3>
            <p className="text-green-700 font-kanit mb-6">
              คุณสามารถเริ่มอัปโหลดหนังสือและตั้งราคาขายได้ทันที
            </p>
            <Button asChild size="lg" className="font-kanit bg-green-600 hover:bg-green-700">
              <Link href="/seller/dashboard">เข้าสู่ Seller Center</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
