import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, ShoppingCart, BookOpen } from 'lucide-react'

export default function BookDetailPage({ params }: { params: { slug: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left: Cover */}
        <div className="w-full lg:w-1/3 max-w-sm mx-auto lg:mx-0">
          <div className="aspect-[3/4] bg-muted rounded-xl shadow-lg relative overflow-hidden flex items-center justify-center">
            <span className="text-muted-foreground font-kanit">รูปปกหนังสือ</span>
          </div>
        </div>

        {/* Right: Details */}
        <div className="flex-1 space-y-6">
          <div>
            <Badge className="mb-3">หมวดหมู่ตัวอย่าง</Badge>
            <h1 className="text-3xl md:text-4xl font-bold font-kanit mb-2">ชื่อหนังสือตัวอย่าง ({params.slug})</h1>
            <p className="text-lg text-muted-foreground font-kanit">เขียนโดย: Coach Name</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-accent text-accent" />
              <span className="font-bold font-inter text-lg">4.8</span>
            </div>
            <span className="text-muted-foreground font-kanit text-sm">(12 รีวิว)</span>
            <span className="text-muted-foreground font-kanit text-sm">•</span>
            <span className="text-muted-foreground font-kanit text-sm">ขายแล้ว 150 เล่ม</span>
          </div>

          <div className="flex items-center gap-3 font-inter font-bold text-3xl">
            <span className="text-danger">฿290</span>
            <span className="text-xl text-muted-foreground line-through">฿350</span>
          </div>

          <p className="font-kanit text-text/80 leading-relaxed">
            รายละเอียดหนังสือตัวอย่าง... อธิบายเทคนิคต่างๆ อย่างเจาะลึก
          </p>

          <div className="pt-6 flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="w-full sm:w-auto font-kanit text-lg gap-2">
              <ShoppingCart className="w-5 h-5" />
              เพิ่มลงตะกร้า
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto font-kanit text-lg gap-2">
              <BookOpen className="w-5 h-5" />
              ทดลองอ่านฟรี
            </Button>
          </div>
          
          <div className="pt-8 border-t space-y-4">
            <h3 className="font-bold text-lg font-kanit">ข้อมูลหนังสือ</h3>
            <ul className="space-y-2 text-sm font-kanit text-muted-foreground">
              <li><strong>ระดับผู้เล่น:</strong> Intermediate</li>
              <li><strong>จำนวนหน้า:</strong> 120 หน้า</li>
              <li><strong>รูปแบบไฟล์:</strong> PDF, EPUB</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
