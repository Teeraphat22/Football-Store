import Link from 'next/link'
import { BookOpen } from 'lucide-react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-muted/30 flex flex-col items-center justify-center p-4">
      <Link href="/" className="flex items-center gap-2 text-primary font-bold text-2xl mb-8">
        <BookOpen className="h-8 w-8" />
        <span>Football Store</span>
      </Link>
      <div className="w-full max-w-md bg-surface p-8 rounded-2xl shadow-sm border border-border">
        {children}
      </div>
    </div>
  )
}
