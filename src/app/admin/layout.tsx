import Link from 'next/link'
import { Users, BookOpen, LayoutDashboard, ShieldAlert, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

const sidebarLinks = [
  { name: 'ภาพรวมระบบ', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'คำขอผู้ขาย / ผู้ใช้', href: '/admin/users', icon: Users },
  { name: 'ตรวจสอบหนังสือ', href: '/admin/books', icon: BookOpen },
  { name: 'ระบบแจ้งเตือน / Log', href: '#', icon: ShieldAlert },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-muted/20 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-100 flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h2 className="font-bold font-kanit text-2xl text-accent">Admin Panel</h2>
          <p className="text-sm text-slate-400 font-kanit">Football Store MGT</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {sidebarLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-accent transition-colors font-kanit">
                <link.icon className="w-5 h-5" />
                {link.name}
              </div>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800 mt-auto">
          <Link href="/" className="inline-flex h-9 w-full items-center justify-start gap-2 rounded-lg px-4 py-2 font-medium font-kanit text-slate-300 hover:text-white hover:bg-slate-800 transition-colors">
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
