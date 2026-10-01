'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, BookOpen, DollarSign, ArrowUpRight, CheckCircle2 } from 'lucide-react'

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-kanit text-slate-800">ภาพรวมระบบ (Platform Overview)</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-kanit text-muted-foreground mb-1">รายได้รวมแพลตฟอร์ม (10%)</p>
                <h3 className="text-2xl font-bold font-inter text-slate-900">฿45,200</h3>
              </div>
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <p className="text-xs text-success font-inter flex items-center mt-2">
              <ArrowUpRight className="w-3 h-3 mr-1" /> +12.5% จากเดือนก่อน
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-kanit text-muted-foreground mb-1">ผู้ใช้ทั้งหมด</p>
                <h3 className="text-2xl font-bold font-inter text-slate-900">1,245</h3>
              </div>
              <Users className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-xs text-success font-inter flex items-center mt-2">
              <ArrowUpRight className="w-3 h-3 mr-1" /> +35 User ใหม่
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-accent">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-kanit text-muted-foreground mb-1">ผู้ขาย (Sellers)</p>
                <h3 className="text-2xl font-bold font-inter text-slate-900">120</h3>
              </div>
              <Users className="w-5 h-5 text-accent" />
            </div>
            <p className="text-xs text-muted-foreground font-kanit mt-2">
              รอการอนุมัติ 5 รายการ
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-kanit text-muted-foreground mb-1">หนังสือในระบบ</p>
                <h3 className="text-2xl font-bold font-inter text-slate-900">350</h3>
              </div>
              <BookOpen className="w-5 h-5 text-purple-500" />
            </div>
            <p className="text-xs text-muted-foreground font-kanit mt-2">
              รอตรวจสอบ 12 รายการ
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-kanit">คำขอเปิดร้านล่าสุด (Pending Sellers)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500">C{i}</div>
                    <div>
                      <h4 className="font-bold font-kanit text-sm">โค้ช สมชาย {i}</h4>
                      <p className="text-xs text-muted-foreground font-kanit">สมัครเมื่อ 2 ชม. ที่แล้ว</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-success hover:bg-success/10 p-2 rounded-full transition-colors"><CheckCircle2 className="w-5 h-5" /></button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-kanit">หนังสือรอตรวจสอบ (Pending Books)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-14 bg-slate-200 rounded"></div>
                    <div>
                      <h4 className="font-bold font-kanit text-sm line-clamp-1">วิเคราะห์แทคติก แมนซิตี้ เล่ม {i}</h4>
                      <p className="text-xs text-muted-foreground font-kanit">โดย: โค้ช สมชาย 1</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-xs font-kanit px-3 py-1 bg-primary text-white rounded hover:bg-primary/90">รีวิว</button>
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
