'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronRight, ChevronLeft, UploadCloud, CheckCircle2 } from 'lucide-react'

export default function BookUploadWizard() {
  const [step, setStep] = useState(1)
  const [price, setPrice] = useState<number>(0)

  // คำนวณรายได้สุทธิ (หัก 10%)
  const netEarnings = price ? (price * 0.9).toFixed(2) : 0
  const platformFee = price ? (price * 0.1).toFixed(2) : 0

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold font-kanit">อัปโหลดหนังสือใหม่</h1>
        <span className="text-sm font-kanit text-muted-foreground">ขั้นตอนที่ {step} / 4</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-muted rounded-full h-2 mb-8">
        <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${(step / 4) * 100}%` }}></div>
      </div>

      <Card>
        <CardContent className="p-6 md:p-8">
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-xl font-bold font-kanit mb-4 border-b pb-2">ข้อมูลทั่วไป</h2>
              <div className="space-y-2">
                <label className="text-sm font-kanit font-medium">ชื่อหนังสือ</label>
                <Input placeholder="เช่น ฝึกสกิลการยิงประตู..." className="font-kanit" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-kanit font-medium">คำอธิบาย</label>
                <textarea className="w-full border rounded-md p-3 min-h-[120px] font-kanit text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="รายละเอียดของหนังสือ..."></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-kanit font-medium">หมวดหมู่</label>
                  <select className="w-full border rounded-md p-2 text-sm font-kanit h-10">
                    <option>เลือกหมวดหมู่...</option>
                    <option>เลี้ยงบอล</option>
                    <option>ยิงประตู</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-kanit font-medium">ระดับผู้เล่น</label>
                  <select className="w-full border rounded-md p-2 text-sm font-kanit h-10">
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-xl font-bold font-kanit mb-4 border-b pb-2">อัปโหลดไฟล์</h2>
              
              <div className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-muted/30 transition-colors cursor-pointer">
                <UploadCloud className="w-12 h-12 text-primary mb-4" />
                <h3 className="font-bold font-kanit mb-1">ลากไฟล์ E-book มาวางที่นี่</h3>
                <p className="text-sm text-muted-foreground font-kanit mb-4">รองรับ PDF หรือ EPUB ขนาดไม่เกิน 100MB</p>
                <Button variant="outline" size="sm" className="font-kanit">เลือกไฟล์</Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="border border-dashed rounded-xl p-6 text-center hover:bg-muted/30 cursor-pointer">
                  <h3 className="font-bold font-kanit text-sm mb-1">ภาพปก (3:4)</h3>
                  <p className="text-xs text-muted-foreground font-kanit">JPG/PNG ไม่เกิน 5MB</p>
                </div>
                <div className="border border-dashed rounded-xl p-6 text-center hover:bg-muted/30 cursor-pointer">
                  <h3 className="font-bold font-kanit text-sm mb-1">ตัวอย่าง (ไม่บังคับ)</h3>
                  <p className="text-xs text-muted-foreground font-kanit">PDF 10 หน้าแรก</p>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-xl font-bold font-kanit mb-4 border-b pb-2">ตั้งราคาและการดาวน์โหลด</h2>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-kanit font-medium">ราคาปกติ (THB)</label>
                  <Input 
                    type="number" 
                    placeholder="0.00" 
                    className="font-inter text-lg h-12"
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-kanit font-medium">ราคาลด (ไม่บังคับ)</label>
                  <Input type="number" placeholder="0.00" className="font-inter text-lg h-12" />
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-6 mt-4">
                <h3 className="font-bold font-kanit mb-4 text-sm text-muted-foreground">สรุปรายได้ที่คาดหวัง</h3>
                <div className="space-y-2 font-kanit text-sm">
                  <div className="flex justify-between">
                    <span>ราคาขาย</span>
                    <span className="font-inter">฿{price || '0.00'}</span>
                  </div>
                  <div className="flex justify-between text-danger">
                    <span>หักค่าธรรมเนียมแพลตฟอร์ม (10%)</span>
                    <span className="font-inter">-฿{platformFee}</span>
                  </div>
                  <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg">
                    <span>รายได้สุทธิที่คุณจะได้รับ</span>
                    <span className="font-inter text-primary">฿{netEarnings}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <label className="text-sm font-kanit font-medium">จำกัดการดาวน์โหลดสูงสุดต่อผู้ซื้อ (ครั้ง)</label>
                <Input type="number" defaultValue="5" className="font-inter w-32" />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-center py-8">
              <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-success" />
              </div>
              <h2 className="text-2xl font-bold font-kanit mb-2">ตรวจสอบและส่งขออนุมัติ</h2>
              <p className="text-muted-foreground font-kanit max-w-sm mx-auto mb-8">
                ข้อมูลและไฟล์หนังสือของคุณพร้อมแล้ว เมื่อกดยืนยัน ระบบจะส่งให้ทีมงานตรวจสอบความถูกต้องก่อนเริ่มวางขาย
              </p>
              
              <div className="flex flex-col gap-3 max-w-sm mx-auto">
                <Button className="w-full font-kanit" size="lg">ยืนยันและส่งให้ Admin อนุมัติ</Button>
                <Button variant="outline" className="w-full font-kanit" size="lg">บันทึกเป็นแบบร่าง (Draft)</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between items-center pt-4">
        <Button 
          variant="outline" 
          onClick={() => setStep(s => Math.max(1, s - 1))}
          disabled={step === 1}
          className="font-kanit gap-2"
        >
          <ChevronLeft className="w-4 h-4" /> ย้อนกลับ
        </Button>

        {step < 4 && (
          <Button 
            onClick={() => setStep(s => Math.min(4, s + 1))}
            className="font-kanit gap-2"
          >
            ถัดไป <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
