'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = createClient()

  // Extract from form data
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'กรุณากรอกข้อมูลให้ครบถ้วน' }
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function register(formData: FormData) {
  const supabase = createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('full_name') as string
  const role = formData.get('role') as string || 'customer'

  if (!email || !password || !fullName) {
    return { error: 'กรุณากรอกข้อมูลให้ครบถ้วน' }
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  })

  if (error) {
    return { error: error.message }
  }

  // NOTE: Insert into profiles
  if (data.user) {
    const isSeller = role === 'seller'
    await supabase.from('profiles').insert({
      id: data.user.id,
      full_name: fullName,
      role: isSeller ? 'seller' : 'customer',
      // *เปลี่ยนเป็น approved อัตโนมัติเพื่อให้ทดสอบได้ทันที*
      seller_status: isSeller ? 'approved' : 'none'
    })
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function logout() {
  const supabase = createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/auth/login')
}
