'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { exportToCSV, exportToExcel, parseFile } from '@/lib/data-export'
import { FileSpreadsheet, Download, UploadCloud, FileText } from 'lucide-react'

// Mock Data
const mockSalesData = [
  { order_id: 'ORD-1001', date: '2026-09-20', customer: 'john@example.com', seller: 'Coach Alex', book: 'แทคติก 4-3-3', amount: 390, platform_fee: 39, net: 351, status: 'paid' },
  { order_id: 'ORD-1002', date: '2026-09-21', customer: 'mary@example.com', seller: 'Pro Player X', book: 'ยิงประตู', amount: 250, platform_fee: 25, net: 225, status: 'paid' },
  { order_id: 'ORD-1003', date: '2026-09-22', customer: 'tom@example.com', seller: 'Coach Alex', book: 'ผู้รักษาประตู', amount: 350, platform_fee: 35, net: 315, status: 'paid' },
]

export default function AdminReportsPage() {
  const [importData, setImportData] = useState<any[] | null>(null)

  const handleExportExcel = () => {
    exportToExcel(mockSalesData, 'Sales_Report_Sep2026', 'Sales')
  }

  const handleExportCSV = () => {
    exportToCSV(mockSalesData, 'Sales_Report_Sep2026')
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const data = await parseFile(file)
      setImportData(data)
    } catch (error) {
      console.error('Import Error:', error)
      alert('เกิดข้อผิดพลาดในการอ่านไฟล์')
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-kanit text-slate-800">ระบบรายงาน & นำเข้าข้อมูล</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Export Section */}
        <Card>
          <CardHeader>
            <CardTitle className="font-kanit flex items-center gap-2">
              <Download className="w-5 h-5 text-primary" />
              ดึงข้อมูลรายงาน (Export)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm font-kanit text-muted-foreground mb-4">
              ส่งออกรายงานยอดขาย รายชื่อผู้ใช้งาน หรือข้อมูลทางการเงินเพื่อนำไปวิเคราะห์ต่อในรูปแบบ Excel หรือ CSV
            </p>
            
            <div className="border rounded-lg p-4 bg-slate-50 flex justify-between items-center">
              <div>
                <h4 className="font-bold font-kanit text-sm">รายงานยอดขายเดือนนี้</h4>
                <p className="text-xs font-inter text-muted-foreground mt-1">จำนวน {mockSalesData.length} รายการ</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="font-kanit gap-2" onClick={handleExportCSV}>
                  <FileText className="w-4 h-4" /> CSV
                </Button>
                <Button size="sm" className="bg-[#107C41] hover:bg-[#185c37] text-white font-kanit gap-2" onClick={handleExportExcel}>
                  <FileSpreadsheet className="w-4 h-4" /> Excel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Import Section */}
        <Card>
          <CardHeader>
            <CardTitle className="font-kanit flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-blue-500" />
              นำเข้าข้อมูล (Import)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-kanit text-muted-foreground mb-4">
              อัปโหลดไฟล์ Excel (.xlsx) หรือ CSV เพื่อนำเข้าข้อมูล เช่น รายชื่อ Category หรือคูปองส่วนลดแบบจำนวนมาก
            </p>
            
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors relative">
              <input 
                type="file" 
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileUpload}
              />
              <UploadCloud className="w-10 h-10 text-slate-400 mx-auto mb-2" />
              <h3 className="font-bold font-kanit text-sm">ลากไฟล์มาวาง หรือคลิกเพื่อเลือกไฟล์</h3>
              <p className="text-xs text-muted-foreground font-kanit mt-1">รองรับ .csv, .xlsx</p>
            </div>

            {importData && (
              <div className="mt-4 p-4 border rounded-lg bg-blue-50">
                <h4 className="font-bold font-kanit text-sm text-blue-800 mb-2">ตัวอย่างข้อมูลที่อ่านได้ (Preview):</h4>
                <div className="max-h-32 overflow-y-auto text-xs font-inter bg-white p-2 border rounded">
                  <pre>{JSON.stringify(importData.slice(0, 2), null, 2)}</pre>
                  {importData.length > 2 && <div className="text-muted-foreground mt-2 font-kanit">... และอีก {importData.length - 2} แถว</div>}
                </div>
                <Button size="sm" className="w-full mt-4 font-kanit">บันทึกข้อมูลเข้าระบบ</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
