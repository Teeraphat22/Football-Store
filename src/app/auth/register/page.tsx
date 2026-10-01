'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { register } from '@/lib/actions/auth'
import { Eye, EyeOff } from 'lucide-react'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const password = formData.get('password') as string
    const confirm = formData.get('confirm_password') as string

    if (password !== confirm) {
      setErrorMsg('รหัสผ่านไม่ตรงกัน กรุณาตรวจสอบอีกครั้ง')
      return
    }
    setErrorMsg('')
    
    // Call Server Action
    const result = await register(formData)
    if (result?.error) {
      setErrorMsg(result.error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold font-kanit mb-2">สมัครสมาชิกใหม่</h1>
        <p className="text-muted-foreground font-kanit text-sm">สร้างบัญชีเพื่อซื้อและขายหนังสือฟุตบอล</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMsg && (
          <div className="p-3 text-sm text-danger bg-danger/10 rounded-md font-kanit">
            {errorMsg}
          </div>
        )}
        
        <div className="space-y-2">
          <label className="text-sm font-kanit font-medium">ชื่อ-นามสกุล</label>
          <Input 
            name="full_name" 
            type="text" 
            required 
            placeholder="ชื่อ นามสกุล" 
            className="font-kanit"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-kanit font-medium">อีเมล</label>
          <Input 
            name="email" 
            type="email" 
            required 
            placeholder="example@email.com" 
            className="font-inter"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-kanit font-medium">ต้องการสมัครเป็น</label>
          <div className="flex gap-4 font-kanit text-sm mt-1">
            <label className="flex items-center gap-2 cursor-pointer border p-3 rounded-lg flex-1 hover:bg-slate-50 transition-colors">
              <input type="radio" name="role" value="customer" defaultChecked className="w-4 h-4 text-primary focus:ring-primary" />
              <span>ผู้อ่าน (ซื้อหนังสือ)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer border p-3 rounded-lg flex-1 hover:bg-slate-50 transition-colors">
              <input type="radio" name="role" value="seller" className="w-4 h-4 text-primary focus:ring-primary" />
              <span>ผู้เขียน (ขายหนังสือ)</span>
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-kanit font-medium">รหัสผ่าน</label>
          <div className="relative">
            <Input 
              name="password" 
              type={showPassword ? 'text' : 'password'} 
              required 
              className="font-inter pr-10"
              minLength={6}
            />
            <button 
              type="button" 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-xs text-muted-foreground font-kanit">รหัสผ่านอย่างน้อย 6 ตัวอักษร</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-kanit font-medium">ยืนยันรหัสผ่าน</label>
          <div className="relative">
            <Input 
              name="confirm_password" 
              type={showConfirmPassword ? 'text' : 'password'} 
              required 
              className="font-inter pr-10"
              minLength={6}
            />
            <button 
              type="button" 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <Button type="submit" className="w-full font-kanit h-11 text-lg mt-2">
          สมัครสมาชิก
        </Button>
      </form>

      <div className="text-center text-sm font-kanit text-muted-foreground pt-4 border-t">
        มีบัญชีอยู่แล้ว?{' '}
        <Link href="/auth/login" className="text-primary hover:underline font-medium">
          เข้าสู่ระบบ
        </Link>
      </div>
    </div>
  )
}
