'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, CheckCircle, XCircle } from 'lucide-react'

// Mock Data
const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'customer', sellerStatus: 'none', date: '2026-09-20' },
  { id: '2', name: 'Coach Alex', email: 'alex@example.com', role: 'seller', sellerStatus: 'pending', date: '2026-09-24' },
  { id: '3', name: 'Pro Player X', email: 'pro@example.com', role: 'seller', sellerStatus: 'approved', date: '2026-09-15' },
  { id: '4', name: 'Admin Root', email: 'admin@football.com', role: 'admin', sellerStatus: 'none', date: '2026-01-01' },
]

export default function AdminUsersPage() {
  const [users, setUsers] = useState(mockUsers)
  const [filter, setFilter] = useState('all')

  const handleApproveSeller = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, sellerStatus: 'approved' } : u))
  }

  const handleRejectSeller = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, sellerStatus: 'rejected', role: 'customer' } : u))
  }

  const filteredUsers = users.filter(u => {
    if (filter === 'pending_sellers') return u.sellerStatus === 'pending'
    if (filter === 'sellers') return u.role === 'seller' && u.sellerStatus === 'approved'
    return true
  })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-kanit text-slate-800">จัดการผู้ใช้งาน (Users & Sellers)</h1>
      
      <Card>
        <CardContent className="p-0">
          <div className="p-4 border-b flex flex-col sm:flex-row justify-between gap-4 bg-white rounded-t-xl">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="ค้นหาชื่อ หรือ อีเมล..." className="pl-9 font-kanit" />
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant={filter === 'all' ? 'default' : 'outline'} 
                onClick={() => setFilter('all')}
                className="font-kanit"
              >ทั้งหมด</Button>
              <Button 
                variant={filter === 'pending_sellers' ? 'default' : 'outline'} 
                onClick={() => setFilter('pending_sellers')}
                className="font-kanit relative"
              >
                รออนุมัติขาย
                {users.filter(u => u.sellerStatus === 'pending').length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-danger opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-danger"></span>
                  </span>
                )}
              </Button>
              <Button 
                variant={filter === 'sellers' ? 'default' : 'outline'} 
                onClick={() => setFilter('sellers')}
                className="font-kanit"
              >ผู้ขายทั้งหมด</Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm font-kanit bg-white">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-medium">ผู้ใช้งาน</th>
                  <th className="px-6 py-4 font-medium">บทบาท (Role)</th>
                  <th className="px-6 py-4 font-medium">สถานะร้านค้า</th>
                  <th className="px-6 py-4 font-medium">วันที่สมัคร</th>
                  <th className="px-6 py-4 font-medium text-right">การจัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredUsers.map(user => (
                  <tr key={user.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{user.name}</div>
                      <div className="text-slate-500 text-xs font-inter">{user.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className={
                        user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                        user.role === 'seller' ? 'bg-accent/20 text-yellow-700' : 
                        'bg-slate-100 text-slate-700'
                      }>
                        {user.role.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      {user.sellerStatus === 'pending' && <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none shadow-none">รอตรวจสอบ</Badge>}
                      {user.sellerStatus === 'approved' && <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none shadow-none">เปิดร้านแล้ว</Badge>}
                      {user.sellerStatus === 'rejected' && <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-none shadow-none">ไม่อนุมัติ</Badge>}
                      {user.sellerStatus === 'none' && <span className="text-slate-400">-</span>}
                    </td>
                    <td className="px-6 py-4 font-inter text-slate-600">{user.date}</td>
                    <td className="px-6 py-4 text-right">
                      {user.sellerStatus === 'pending' ? (
                        <div className="flex justify-end gap-2">
                          <Button size="sm" className="bg-success hover:bg-success/90 text-white font-kanit gap-1" onClick={() => handleApproveSeller(user.id)}>
                            <CheckCircle className="w-4 h-4" /> อนุมัติ
                          </Button>
                          <Button size="sm" variant="destructive" className="font-kanit gap-1" onClick={() => handleRejectSeller(user.id)}>
                            <XCircle className="w-4 h-4" /> ปฏิเสธ
                          </Button>
                        </div>
                      ) : (
                        <Button variant="ghost" size="sm" className="font-kanit">ดูข้อมูล</Button>
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
