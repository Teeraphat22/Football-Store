import Link from 'next/link'
import { ShoppingCart, User, Search, BookOpen, LogOut, LayoutDashboard, Package, Library } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/server'
import { logout } from '@/lib/actions/auth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  let profile = null
  if (user) {
    const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
    profile = data
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-primary font-bold text-xl">
            <BookOpen className="h-6 w-6" />
            <span>Football Store</span>
          </Link>
          
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted" />
              <input
                type="search"
                placeholder="ค้นหาเทคนิค, ตำแหน่ง หรือชื่อผู้เขียน..."
                className="w-full pl-9 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm font-kanit"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/books" className="hidden md:block text-sm font-medium hover:text-primary font-kanit">
              คลังหนังสือทั้งหมด
            </Link>
            <Link href="/cart" className="relative p-2 hover:bg-muted rounded-md transition-colors">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-danger"></span>
            </Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="hidden md:flex items-center gap-2 font-kanit px-3 py-1.5 border rounded-md hover:bg-muted transition-colors">
                  <User className="h-4 w-4" />
                  <span className="max-w-[100px] truncate">{profile?.full_name || user.email}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 font-kanit">
                  <div className="px-2 py-1.5 text-sm font-semibold font-kanit text-muted-foreground">บัญชีของฉัน</div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/library" className="flex items-center w-full cursor-pointer">
                      <Library className="mr-2 h-4 w-4" />
                      <span>คลังหนังสือของฉัน</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/orders" className="flex items-center w-full cursor-pointer">
                      <Package className="mr-2 h-4 w-4" />
                      <span>ประวัติการสั่งซื้อ</span>
                    </Link>
                  </DropdownMenuItem>
                  
                  {/* Seller / Admin links */}
                  {profile?.role === 'seller' && (
                    <DropdownMenuItem>
                      <Link href="/seller/dashboard" className="flex items-center w-full cursor-pointer text-primary">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Seller Center</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {profile?.role === 'admin' && (
                    <DropdownMenuItem>
                      <Link href="/admin/dashboard" className="flex items-center w-full cursor-pointer text-accent">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Admin Panel</span>
                      </Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <form action={logout} className="w-full">
                      <button type="submit" className="w-full text-left flex items-center text-danger hover:text-danger cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>ออกจากระบบ</span>
                      </button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth/login" className="hidden md:flex items-center gap-2 font-kanit px-3 py-1.5 border rounded-md hover:bg-muted transition-colors text-sm">
                <User className="h-4 w-4" />
                <span>เข้าสู่ระบบ</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-slate-900 text-slate-50 py-12 mt-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-white">
              <BookOpen className="h-5 w-5" />
              Football Store
            </h3>
            <p className="text-slate-400 text-sm font-kanit">
              แหล่งรวม E-book เทคนิคการเล่นและการฝึกซ้อมฟุตบอลที่ดีที่สุด สำหรับทุกระดับ
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 font-kanit text-white">หมวดหมู่</h4>
            <ul className="space-y-2 text-sm text-slate-400 font-kanit">
              <li><Link href="/books?category=dribbling" className="hover:text-white transition-colors">เลี้ยงบอล</Link></li>
              <li><Link href="/books?category=shooting" className="hover:text-white transition-colors">ยิงประตู</Link></li>
              <li><Link href="/books?category=goalkeeper" className="hover:text-white transition-colors">ผู้รักษาประตู</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 font-kanit text-white">ลูกค้า</h4>
            <ul className="space-y-2 text-sm text-slate-400 font-kanit">
              <li><Link href="/library" className="hover:text-white transition-colors">คลังหนังสือของฉัน</Link></li>
              <li><Link href="/orders" className="hover:text-white transition-colors">ประวัติการสั่งซื้อ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 font-kanit text-white">ผู้ขาย</h4>
            <ul className="space-y-2 text-sm text-slate-400 font-kanit">
              <li><Link href="/become-seller" className="hover:text-white transition-colors">สมัครเป็นผู้ขาย</Link></li>
              <li><Link href="/seller/dashboard" className="hover:text-white transition-colors">แดชบอร์ด</Link></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-8 pt-8 border-t border-slate-800 text-sm text-center text-slate-500 font-kanit">
          &copy; {new Date().getFullYear()} Football Book Store. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
