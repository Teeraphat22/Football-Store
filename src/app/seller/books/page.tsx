'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Plus, Edit2, Check, X, Search } from 'lucide-react'

// Mock Data
const initialBooks = [
  { id: '1', title: 'ฝึกสกิลการยิงประตูแบบโรนัลโด', price: 350, salePrice: 290, status: 'published', sold: 50 },
  { id: '2', title: 'แทคติก 4-3-3 ใช้ได้จริงในสนาม', price: 450, salePrice: 390, status: 'published', sold: 120 },
  { id: '3', title: 'พื้นฐานการจับบอลแรก (Draft)', price: 290, salePrice: null, status: 'draft', sold: 0 },
]

export default function SellerBooksPage() {
  const [books, setBooks] = useState(initialBooks)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editPrice, setEditPrice] = useState('')
  const [editSalePrice, setEditSalePrice] = useState('')

  const startEdit = (book: typeof initialBooks[0]) => {
    setEditingId(book.id)
    setEditPrice(book.price.toString())
    setEditSalePrice(book.salePrice ? book.salePrice.toString() : '')
  }

  const saveEdit = (id: string) => {
    setBooks(books.map(b => 
      b.id === id 
        ? { ...b, price: Number(editPrice) || b.price, salePrice: editSalePrice ? Number(editSalePrice) : null }
        : b
    ))
    setEditingId(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold font-kanit">จัดการหนังสือ</h1>
        <Button asChild className="font-kanit gap-2">
          <Link href="/seller/books/new">
            <Plus className="w-4 h-4" /> เพิ่มหนังสือใหม่
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <div className="p-4 border-b flex justify-between items-center bg-surface/50">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="ค้นหาชื่อหนังสือ..." className="pl-9 h-9 font-kanit text-sm" />
            </div>
            <Button variant="outline" size="sm" className="font-kanit">จัดการส่วนลด (Bulk)</Button>
          </div>
          <table className="w-full text-left text-sm font-kanit">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="px-6 py-3 font-medium">ชื่อหนังสือ</th>
                <th className="px-6 py-3 font-medium">สถานะ</th>
                <th className="px-6 py-3 font-medium">ยอดขาย</th>
                <th className="px-6 py-3 font-medium">ราคาปกติ (฿)</th>
                <th className="px-6 py-3 font-medium">ราคาลด (฿)</th>
                <th className="px-6 py-3 font-medium text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {books.map(book => (
                <tr key={book.id} className="hover:bg-muted/30">
                  <td className="px-6 py-4 font-bold">{book.title}</td>
                  <td className="px-6 py-4">
                    <Badge variant={book.status === 'published' ? 'default' : 'secondary'}>
                      {book.status === 'published' ? 'เผยแพร่' : 'ฉบับร่าง'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 font-inter">{book.sold}</td>
                  
                  {editingId === book.id ? (
                    <>
                      <td className="px-6 py-4">
                        <Input 
                          type="number" 
                          value={editPrice} 
                          onChange={(e) => setEditPrice(e.target.value)} 
                          className="w-20 h-8 font-inter"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <Input 
                          type="number" 
                          value={editSalePrice} 
                          onChange={(e) => setEditSalePrice(e.target.value)} 
                          className="w-20 h-8 font-inter"
                          placeholder="-"
                        />
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <Button size="icon" variant="ghost" className="text-success hover:text-success h-8 w-8" onClick={() => saveEdit(book.id)}>
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-danger hover:text-danger h-8 w-8" onClick={() => setEditingId(null)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4 font-inter">{book.price}</td>
                      <td className="px-6 py-4 font-inter">{book.salePrice || '-'}</td>
                      <td className="px-6 py-4 text-right">
                        <Button size="sm" variant="ghost" className="text-primary hover:text-primary gap-1 font-kanit" onClick={() => startEdit(book)}>
                          <Edit2 className="w-3 h-3" /> แก้ไขเร็ว
                        </Button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
