import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(req: Request, { params }: { params: { itemId: string } }) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { itemId } = params

    // ตรวจสอบสิทธิ์การดาวน์โหลด: ดึงข้อมูล order_items และ orders ว่าเป็นของ user นี้ หรือไม่
    const { data: item, error } = await supabase
      .from('order_items')
      .select('*, orders!inner(*), books!inner(file_path, max_downloads)')
      .eq('id', itemId)
      .eq('orders.user_id', user.id)
      .single()

    if (error || !item) {
      return NextResponse.json({ error: 'Item not found or unauthorized' }, { status: 403 })
    }

    // ตรวจสอบสถานะการชำระเงิน
    if (item.orders.status !== 'ready' && item.orders.status !== 'completed') {
      return NextResponse.json({ error: 'ไฟล์ยังไม่พร้อมให้ดาวน์โหลด' }, { status: 400 })
    }

    // ตรวจสอบโควตาการดาวน์โหลด (max 5)
    if (item.download_count >= item.books.max_downloads) {
      return NextResponse.json({ error: 'ดาวน์โหลดเกินโควตาที่กำหนดไว้' }, { status: 403 })
    }

    const filePath = item.books.file_path
    if (!filePath) {
      return NextResponse.json({ error: 'File path not found' }, { status: 404 })
    }

    // สร้าง Signed URL สำหรับดาวน์โหลดไฟล์ (อายุ 24 ชั่วโมง = 86400 วินาที)
    const { data: signedUrlData, error: signedUrlError } = await supabase
      .storage
      .from('ebooks')
      .createSignedUrl(filePath, 86400)

    if (signedUrlError || !signedUrlData) {
      return NextResponse.json({ error: 'Failed to generate download link' }, { status: 500 })
    }

    // อัปเดตจำนวนครั้งการดาวน์โหลด (RPC หรือ Update)
    await supabase
      .from('order_items')
      .update({ 
        download_count: item.download_count + 1,
        last_downloaded_at: new Date().toISOString()
      })
      .eq('id', itemId)
      
    // ถ้าเพิ่งโหลดครั้งแรก ให้เปลี่ยนสถานะจาก ready เป็น completed
    if (item.orders.status === 'ready') {
      await supabase
        .from('orders')
        .update({ status: 'completed', completed_at: new Date().toISOString() })
        .eq('id', item.orders.id)
      
      await supabase.from('order_status_history').insert({
        order_id: item.orders.id,
        from_status: 'ready',
        to_status: 'completed',
        note: 'ดาวน์โหลดไฟล์ครั้งแรก'
      })
    }

    // Redirect user to the signed URL
    return NextResponse.redirect(signedUrlData.signedUrl)
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
