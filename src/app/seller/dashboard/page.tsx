'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Book, DollarSign, ShoppingCart, TrendingUp } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const mockData = [
  { name: 'ม.ค.', sales: 4000 },
  { name: 'ก.พ.', sales: 3000 },
  { name: 'มี.ค.', sales: 2000 },
  { name: 'เม.ย.', sales: 2780 },
  { name: 'พ.ค.', sales: 1890 },
  { name: 'มิ.ย.', sales: 2390 },
  { name: 'ก.ค.', sales: 3490 },
]

export default function SellerDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-kanit">ภาพรวมร้านค้า</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-kanit mb-1">รายได้สุทธิ (เดือนนี้)</p>
              <h3 className="text-2xl font-bold font-inter text-primary">฿12,450</h3>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <DollarSign className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-kanit mb-1">จำนวนที่ขายได้</p>
              <h3 className="text-2xl font-bold font-inter">45 เล่ม</h3>
            </div>
            <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500">
              <ShoppingCart className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-kanit mb-1">หนังสือทั้งหมด</p>
              <h3 className="text-2xl font-bold font-inter">8 เล่ม</h3>
            </div>
            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center text-yellow-600">
              <Book className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-kanit mb-1">อัตราการเติบโต</p>
              <h3 className="text-2xl font-bold font-inter text-success">+15%</h3>
            </div>
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center text-success">
              <TrendingUp className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart & Top Books */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-kanit text-xl">กราฟรายได้ 7 เดือนล่าสุด</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontFamily: 'Kanit' }} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `฿${value}`} />
                  <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ fontFamily: 'Kanit', borderRadius: '8px' }} />
                  <Bar dataKey="sales" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-kanit text-xl">หนังสือขายดีของคุณ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-12 h-16 bg-muted rounded flex-shrink-0"></div>
                  <div>
                    <p className="font-bold font-kanit text-sm line-clamp-1">ฝึกสกิลยิงประตู เล่ม {i}</p>
                    <p className="text-xs text-muted-foreground font-kanit">ขายได้ {50 - i * 10} เล่ม</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
