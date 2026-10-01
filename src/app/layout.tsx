import type { Metadata } from "next";
import { Kanit, Inter } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-kanit",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Football Book Store",
  description: "E-book Marketplace สำหรับเทคนิคและการฝึกซ้อมฟุตบอล",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={`${kanit.variable} ${inter.variable} font-kanit antialiased`}>
        {children}
      </body>
    </html>
  );
}
