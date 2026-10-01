import { Resend } from 'resend'
import { BaseEmail } from '@/components/emails/BaseEmail'
import { render } from '@react-email/components'
import * as React from 'react'

const resend = new Resend(process.env.RESEND_API_KEY || 're_mock_key')
const FROM_EMAIL = 'Football Store <noreply@footballstore.app>'

type SendEmailOptions = {
  to: string
  subject: string
  previewText: string
  title: string
  greeting: string
  content: React.ReactNode
  buttonText?: string
  buttonHref?: string
}

async function sendEmail({ to, subject, previewText, title, greeting, content, buttonText, buttonHref }: SendEmailOptions) {
  try {
    const html = await render(
      React.createElement(BaseEmail, { previewText, title, greeting, buttonText, buttonHref }, content)
    )

    const data = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    })
    return { success: true, data }
  } catch (error) {
    console.error('Failed to send email:', error)
    return { success: false, error }
  }
}

// 1. ลูกค้า: ยินดีต้อนรับ (Welcome)
export const sendWelcomeEmail = async (to: string, name: string) => {
  return sendEmail({
    to,
    subject: 'ยินดีต้อนรับสู่ Football Store',
    previewText: 'ยินดีต้อนรับสู่แหล่งรวม E-book ฟุตบอลที่ดีที่สุด',
    title: 'Welcome to Football Store',
    greeting: `สวัสดีคุณ ${name},`,
    content: React.createElement('p', { style: { color: '#374151' } }, 'ขอบคุณที่สมัครสมาชิกกับเรา คุณสามารถเริ่มค้นหาเทคนิคการเล่นและแทคติกฟุตบอลระดับโปรได้ทันที'),
    buttonText: 'เริ่มค้นหาหนังสือเลย',
    buttonHref: `${process.env.NEXT_PUBLIC_APP_URL}/books`,
  })
}

// 2. ลูกค้า: ยืนยันคำสั่งซื้อ (Order Confirmation)
export const sendOrderConfirmationEmail = async (to: string, orderId: string, total: string) => {
  return sendEmail({
    to,
    subject: `ยืนยันคำสั่งซื้อ #${orderId}`,
    previewText: 'เราได้รับคำสั่งซื้อของคุณแล้ว',
    title: 'Order Confirmation',
    greeting: 'ขอบคุณสำหรับการสั่งซื้อ,',
    content: React.createElement('p', { style: { color: '#374151' } }, `คำสั่งซื้อรหัส ${orderId} ยอดรวม ${total} บาท ได้รับการยืนยันแล้ว และอยู่ในระหว่างการเตรียมไฟล์ (Processing)`),
    buttonText: 'ดูสถานะคำสั่งซื้อ',
    buttonHref: `${process.env.NEXT_PUBLIC_APP_URL}/orders/${orderId}`,
  })
}

// 3. ลูกค้า: ส่งลิงก์ดาวน์โหลด (Ready to Download)
export const sendDownloadLinkEmail = async (to: string, orderId: string) => {
  return sendEmail({
    to,
    subject: `หนังสือของคุณพร้อมดาวน์โหลดแล้ว! (ออเดอร์ #${orderId})`,
    previewText: 'ไฟล์ E-book ของคุณเตรียมเสร็จเรียบร้อย',
    title: 'Ready to Download',
    greeting: 'สวัสดีครับ,',
    content: React.createElement('p', { style: { color: '#374151' } }, `หนังสือในออเดอร์ ${orderId} ของคุณพร้อมสำหรับการดาวน์โหลดแล้ว คุณสามารถเข้าไปที่คลังหนังสือเพื่อดาวน์โหลดได้เลย (จำกัดการดาวน์โหลดสูงสุด 5 ครั้งต่อไฟล์)`),
    buttonText: 'ไปที่คลังหนังสือของฉัน',
    buttonHref: `${process.env.NEXT_PUBLIC_APP_URL}/library`,
  })
}

// 4. ลูกค้า: แจ้งอัปเดตสถานะ (เช่น ยกเลิก/คืนเงิน)
export const sendOrderStatusUpdateEmail = async (to: string, orderId: string, status: string, note?: string) => {
  return sendEmail({
    to,
    subject: `อัปเดตสถานะคำสั่งซื้อ #${orderId}`,
    previewText: `สถานะออเดอร์ของคุณเปลี่ยนเป็น: ${status}`,
    title: 'Order Status Update',
    greeting: 'อัปเดตล่าสุด,',
    content: React.createElement('p', { style: { color: '#374151' } }, `คำสั่งซื้อรหัส ${orderId} ของคุณได้เปลี่ยนสถานะเป็น: ${status} ${note ? `\nรายละเอียด: ${note}` : ''}`),
    buttonText: 'ตรวจสอบคำสั่งซื้อ',
    buttonHref: `${process.env.NEXT_PUBLIC_APP_URL}/orders/${orderId}`,
  })
}

// 5. ผู้ขาย: สมัครขายผ่าน (Seller Approved)
export const sendSellerApprovedEmail = async (to: string, name: string) => {
  return sendEmail({
    to,
    subject: 'ยินดีด้วย! บัญชีผู้ขายของคุณได้รับการอนุมัติแล้ว',
    previewText: 'เริ่มลงขาย E-book ของคุณได้เลย',
    title: 'Seller Account Approved',
    greeting: `สวัสดีโค้ช ${name},`,
    content: React.createElement('p', { style: { color: '#374151' } }, 'ทีมงานได้ตรวจสอบและอนุมัติบัญชีผู้ขายของคุณเรียบร้อยแล้ว คุณสามารถเข้าสู่ Seller Center เพื่ออัปโหลดหนังสือเล่มแรกของคุณได้ทันที'),
    buttonText: 'เข้าสู่ Seller Center',
    buttonHref: `${process.env.NEXT_PUBLIC_APP_URL}/seller/dashboard`,
  })
}

// 6. ผู้ขาย: มีคำสั่งซื้อใหม่ (New Order for Seller)
export const sendNewOrderToSellerEmail = async (to: string, bookTitle: string) => {
  return sendEmail({
    to,
    subject: `มีคำสั่งซื้อใหม่สำหรับหนังสือ: ${bookTitle}`,
    previewText: 'ยินดีด้วย คุณขายหนังสือได้อีก 1 เล่ม',
    title: 'New Order Received!',
    greeting: 'มีข่าวดีครับ,',
    content: React.createElement('p', { style: { color: '#374151' } }, `หนังสือเรื่อง "${bookTitle}" ของคุณเพิ่งมีคนสั่งซื้อ! คุณสามารถตรวจสอบรายละเอียดและยอดขายได้ในแดชบอร์ด`),
    buttonText: 'ดูแดชบอร์ด',
    buttonHref: `${process.env.NEXT_PUBLIC_APP_URL}/seller/orders`,
  })
}

// 7. ผู้ขาย: หนังสืออนุมัติแล้ว (Book Approved)
export const sendBookApprovedEmail = async (to: string, bookTitle: string) => {
  return sendEmail({
    to,
    subject: `หนังสือ "${bookTitle}" ผ่านการอนุมัติแล้ว!`,
    previewText: 'หนังสือของคุณถูกเผยแพร่ขึ้นบนหน้าร้านแล้ว',
    title: 'Book Approved & Published',
    greeting: 'สวัสดีครับ,',
    content: React.createElement('p', { style: { color: '#374151' } }, `หนังสือเรื่อง "${bookTitle}" ของคุณผ่านการตรวจสอบและเริ่มวางจำหน่ายแล้ว!`),
    buttonText: 'ดูหนังสือของคุณ',
    buttonHref: `${process.env.NEXT_PUBLIC_APP_URL}/seller/books`,
  })
}

// 8. ผู้ขาย: แจ้งถอนเงิน (Payout Update)
export const sendPayoutUpdateEmail = async (to: string, amount: string, status: string) => {
  return sendEmail({
    to,
    subject: `อัปเดตการถอนเงิน: จำนวน ${amount} บาท`,
    previewText: `คำขอถอนเงินของคุณมีสถานะเป็น ${status}`,
    title: 'Payout Update',
    greeting: 'อัปเดตเรื่องการเงิน,',
    content: React.createElement('p', { style: { color: '#374151' } }, `คำขอถอนเงินจำนวน ${amount} บาท ของคุณ ตอนนี้มีสถานะเป็น: ${status} (หากสถานะสำเร็จ เงินจะเข้าบัญชีภายใน 1-2 วันทำการ)`),
    buttonText: 'ดูประวัติการถอนเงิน',
    buttonHref: `${process.env.NEXT_PUBLIC_APP_URL}/seller/payouts`,
  })
}

// 9. ผู้ขาย: แจ้งเมื่อหนังสือไม่ผ่านอนุมัติ (Book Rejected)
export const sendBookRejectedEmail = async (to: string, bookTitle: string, reason: string) => {
  return sendEmail({
    to,
    subject: `หนังสือ "${bookTitle}" ไม่ผ่านการอนุมัติ`,
    previewText: 'กรุณาตรวจสอบและแก้ไขหนังสือของคุณ',
    title: 'Action Required: Book Update',
    greeting: 'เรียนผู้ขาย,',
    content: React.createElement('p', { style: { color: '#374151' } }, `หนังสือเรื่อง "${bookTitle}" ของคุณไม่ผ่านการตรวจสอบ เนื่องจาก: ${reason} กรุณาแก้ไขและส่งเข้ามาใหม่`),
    buttonText: 'แก้ไขหนังสือ',
    buttonHref: `${process.env.NEXT_PUBLIC_APP_URL}/seller/books`,
  })
}

// 10. แอดมิน: มีคนขอสมัครขาย (New Seller Pending)
export const sendAdminNewSellerAlert = async (adminEmail: string, sellerName: string) => {
  return sendEmail({
    to: adminEmail,
    subject: `[Admin] มีคำขอเปิดร้านใหม่จาก: ${sellerName}`,
    previewText: 'มีผู้ใช้ใหม่ต้องการสมัครเป็นผู้ขาย',
    title: 'New Seller Application',
    greeting: 'แจ้งเตือนระบบ,',
    content: React.createElement('p', { style: { color: '#374151' } }, `คุณมีคำขอเปิดร้านใหม่จาก "${sellerName}" รอการตรวจสอบอยู่`),
    buttonText: 'ไปหน้าจัดการผู้ใช้',
    buttonHref: `${process.env.NEXT_PUBLIC_APP_URL}/admin/users`,
  })
}

// 11. แอดมิน: มีหนังสือใหม่รอตรวจ (New Book Pending)
export const sendAdminNewBookAlert = async (adminEmail: string, bookTitle: string) => {
  return sendEmail({
    to: adminEmail,
    subject: `[Admin] มีหนังสือใหม่รอตรวจ: ${bookTitle}`,
    previewText: 'หนังสือใหม่ถูกอัปโหลดและรอแอดมินอนุมัติ',
    title: 'New Book Pending Approval',
    greeting: 'แจ้งเตือนระบบ,',
    content: React.createElement('p', { style: { color: '#374151' } }, `หนังสือเรื่อง "${bookTitle}" เพิ่งถูกอัปโหลดและรอการพิจารณาอนุมัติ`),
    buttonText: 'ไปหน้าตรวจสอบหนังสือ',
    buttonHref: `${process.env.NEXT_PUBLIC_APP_URL}/admin/books`,
  })
}
