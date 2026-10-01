import Link from 'next/link'
import { Book, LayoutDashboard, Package, DollarSign, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

const sidebarLinks = [
  { name: 'แดชบอร์ด', href: '/seller/dashboard', icon: LayoutDashboard },
  { name: 'จัดการหนังสือ', href: '/seller/books', icon: Book },
  { name: 'คำสั่งซื้อ', href: '/seller/orders', icon: Package },
  { name: 'รายได้และการถอนเงิน', href: '/seller/payouts', icon: DollarSign },
]

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-surface border-r flex flex-col">
        <div className="p-6 border-b">
          <h2 className="font-bold font-kanit text-2xl text-primary">Seller Center</h2>
          <p className="text-sm text-muted-foreground font-kanit">Football Store</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {sidebarLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-text hover:bg-primary/10 hover:text-primary transition-colors font-kanit">
                <link.icon className="w-5 h-5" />
                {link.name}
              </div>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t mt-auto">
          <Link href="/" className="inline-flex h-9 w-full items-center justify-start gap-2 rounded-lg border border-input bg-background px-4 py-2 font-medium font-kanit text-foreground hover:bg-muted transition-colors">
            <LogOut className="w-4 h-4" />
            กลับหน้าร้านค้า
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
