import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, ChevronRight, Activity, Crosshair, Shield, TrendingUp } from 'lucide-react'

// Mock Data
const categories = [
  { id: '1', name: 'เลี้ยงบอล', icon: Activity },
  { id: '2', name: 'ยิงประตู', icon: Crosshair },
  { id: '3', name: 'ผู้รักษาประตู', icon: Shield },
  { id: '4', name: 'ฟิตเนส', icon: TrendingUp },
  { id: '5', name: 'แทคติก', icon: Star },
]

const bestSellers = [
  { id: '1', title: 'ฝึกสกิลการยิงประตูแบบโรนัลโด', author: 'Coach A', price: 350, salePrice: 290, rating: 4.5 },
  { id: '2', title: 'แทคติก 4-3-3 ใช้ได้จริงในสนาม', author: 'Coach B', price: 450, salePrice: 390, rating: 4.8 },
  { id: '3', title: 'ปฏิกิริยาเซฟลูกยิงเผาขน', author: 'Coach C', price: 320, salePrice: null, rating: 4.3 },
  { id: '4', title: 'เลี้ยงบอลทะลุทะลวงแบบเมสซี่', author: 'Coach A', price: 390, salePrice: 320, rating: 5.0 },
]

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12 pb-12">
      {/* Hero Section */}
      <section className="relative bg-primary text-white overflow-hidden py-20 lg:py-32">
        {/* ลายเส้นสนาม (Background decoration) */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-4 border-white rounded-full"></div>
          <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-white"></div>
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-white"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-kanit leading-tight">
              ยกระดับทักษะฟุตบอล<br />ด้วย E-book ระดับโปร
            </h1>
            <p className="text-lg text-primary-foreground/90 font-kanit max-w-xl">
              แหล่งรวมความรู้ เทคนิค และการฝึกซ้อมฟุตบอลที่ดีที่สุด จากโค้ชและนักเตะมืออาชีพ ดาวน์โหลดอ่านได้ทันที
            </p>
            <div className="flex gap-4 pt-4">
              <Link href="/books" className="inline-flex h-10 px-8 items-center justify-center rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 font-medium font-kanit transition-colors">
                เริ่มค้นหาหนังสือเลย
              </Link>
              <Link href="/become-seller" className="inline-flex h-10 px-8 items-center justify-center rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 font-medium font-kanit transition-colors">
                ขายหนังสือของคุณ
              </Link>
            </div>
          </div>
          
          <div className="hidden lg:flex justify-center perspective-1000">
            {/* ปกหนังสือเอียง 3D */}
            <div className="relative w-64 h-80 bg-accent rounded-xl shadow-2xl transform rotate-y-12 rotate-z-6 transition-transform hover:rotate-y-0 hover:rotate-z-0 duration-500 flex flex-col items-center justify-center p-6 text-text">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-2 font-kanit">The Football Masterclass</h3>
              <p className="text-center font-kanit opacity-80">Best Seller 2026</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-bold font-kanit mb-6">หมวดหมู่ยอดนิยม</h2>
        <div className="flex flex-wrap gap-4">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/books?category=${cat.id}`}>
              <Badge variant="outline" className="px-4 py-2 text-sm font-kanit hover:bg-primary hover:text-white cursor-pointer flex items-center gap-2 border-border shadow-sm rounded-full transition-colors">
                <cat.icon className="w-4 h-4" />
                {cat.name}
              </Badge>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold font-kanit">หนังสือขายดี</h2>
          <Link href="/books" className="text-sm text-primary font-medium flex items-center hover:underline">
            ดูทั้งหมด <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((book) => (
            <Card key={book.id} className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer border-border">
              <div className="aspect-[3/4] bg-muted relative overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <span className="text-muted-foreground font-kanit">ไม่มีรูปปก</span>
                {book.salePrice && (
                  <Badge className="absolute top-2 right-2 bg-danger hover:bg-danger text-white">
                    Sale
                  </Badge>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold font-kanit text-lg line-clamp-1 group-hover:text-primary transition-colors">{book.title}</h3>
                <p className="text-sm text-muted-foreground font-kanit mb-2">{book.author}</p>
                
                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="text-sm font-medium font-inter">{book.rating}</span>
                </div>

                <div className="flex items-center gap-2 font-inter font-bold">
                  {book.salePrice ? (
                    <>
                      <span className="text-lg text-danger">฿{book.salePrice}</span>
                      <span className="text-sm text-muted-foreground line-through">฿{book.price}</span>
                    </>
                  ) : (
                    <span className="text-lg text-text">฿{book.price}</span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
