'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { login } from '@/lib/actions/auth'
import { Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const result = await login(formData)
    if (result?.error) {
      setErrorMsg(result.error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold font-kanit mb-2">เข้าสู่ระบบ</h1>
        <p className="text-muted-foreground font-kanit text-sm">เข้าสู่ระบบเพื่อดาวน์โหลดหนังสือของคุณ</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMsg && (
          <div className="p-3 text-sm text-danger bg-danger/10 rounded-md font-kanit">
            {errorMsg}
          </div>
        )}

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
          <div className="flex justify-between items-center">
            <label className="text-sm font-kanit font-medium">รหัสผ่าน</label>
            <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline font-kanit">
              ลืมรหัสผ่าน?
            </Link>
          </div>
          <div className="relative">
            <Input 
              name="password" 
              type={showPassword ? 'text' : 'password'} 
              required 
              className="font-inter pr-10"
            />
            <button 
              type="button" 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <Button type="submit" className="w-full font-kanit h-11 text-lg mt-4">
          เข้าสู่ระบบ
        </Button>
      </form>

      <div className="text-center text-sm font-kanit text-muted-foreground pt-4 border-t">
        ยังไม่มีบัญชีผู้ใช้?{' '}
        <Link href="/auth/register" className="text-primary hover:underline font-medium">
          สมัครสมาชิกเลย
        </Link>
      </div>
    </div>
  )
}
