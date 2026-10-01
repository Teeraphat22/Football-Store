'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Search, CheckCircle, XCircle, FileText } from 'lucide-react'
import { Input } from '@/components/ui/input'

// Mock Data
const mockBooks = [
  { id: '1', title: 'การผ่านบอลสไตล์บาร์เซโลน่า', seller: 'Coach X', status: 'pending_approval', price: 290, date: '2026-09-24' },
  { id: '2', title: 'ผู้รักษาประตูฉบับสมบูรณ์', seller: 'Pro Y', status: 'pending_approval', price: 450, date: '2026-09-25' },
  { id: '3', title: 'ฟิตเนสสำหรับนักเตะ 90 นาที', seller: 'Trainer Z', status: 'published', price: 150, date: '2026-09-10' },
]

export default function AdminBooksPage() {
  const [books, setBooks] = useState(mockBooks)

  const handleApprove = (id: string) => {
    setBooks(books.map(b => b.id === id ? { ...b, status: 'published' } : b))
  }

  const handleReject = (id: string) => {
    setBooks(books.map(b => b.id === id ? { ...b, status: 'rejected' } : b))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-kanit text-slate-800">ระบบตรวจสอบหนังสือ (Book Approvals)</h1>
      
      <Card>
        <CardContent className="p-0">
          <div className="p-4 border-b flex justify-between items-center bg-white rounded-t-xl">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="ค้นหาชื่อหนังสือ หรือ ผู้ขาย..." className="pl-9 font-kanit" />
            </div>
            
            <div className="flex gap-2 font-kanit text-sm items-center">
              <span className="text-muted-foreground mr-2">กรองสถานะ:</span>
              <select className="border rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary">
                <option>ทั้งหมด</option>
                <option>รอตรวจสอบ</option>
                <option>เผยแพร่แล้ว</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm font-kanit bg-white">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-medium">หนังสือ</th>
                  <th className="px-6 py-4 font-medium">ผู้ขาย</th>
                  <th className="px-6 py-4 font-medium">ราคา (฿)</th>
                  <th className="px-6 py-4 font-medium">สถานะ</th>
                  <th className="px-6 py-4 font-medium text-right">ตรวจสอบ</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {books.map(book => (
                  <tr key={book.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{book.title}</div>
                      <div className="text-slate-500 text-xs font-inter mt-1">อัปโหลด: {book.date}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{book.seller}</td>
                    <td className="px-6 py-4 font-inter font-medium text-slate-700">{book.price}</td>
                    <td className="px-6 py-4">
                      {book.status === 'pending_approval' && <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-none">รอตรวจสอบ</Badge>}
                      {book.status === 'published' && <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">เผยแพร่แล้ว</Badge>}
                      {book.status === 'rejected' && <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-none">ไม่อนุมัติ</Badge>}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {book.status === 'pending_approval' ? (
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline" className="font-kanit gap-1 border-blue-200 text-blue-600 hover:bg-blue-50">
                            <FileText className="w-4 h-4" /> ดูเนื้อหา
                          </Button>
                          <Button size="sm" className="bg-success hover:bg-success/90 text-white font-kanit" onClick={() => handleApprove(book.id)}>
                            ผ่าน
                          </Button>
                          <Button size="sm" variant="destructive" className="font-kanit" onClick={() => handleReject(book.id)}>
                            ไม่ผ่าน
                          </Button>
                        </div>
                      ) : (
                        <Button variant="ghost" size="sm" className="font-kanit text-slate-400">จัดการ</Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
