import Link from "next/link";
import { ArrowRight, FileQuestion, Home, Search } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const helpfulLinks = [
  { href: "/apply", label: "สมัครสอบออนไลน์" },
  { href: "/exam-registration", label: "ลงทะเบียนเข้าสอบ" },
  { href: "/scores", label: "ตรวจสอบสถานะและผลสอบ" },
  { href: "/documents", label: "เอกสารและแบบฟอร์ม" },
  { href: "/news", label: "ข่าวสารและประกาศ" },
  { href: "/contact", label: "ติดต่อศูนย์สอบฯ" },
];

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <div className="container-page flex min-h-[60vh] max-w-3xl flex-col items-center justify-center py-16 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700">
            <FileQuestion className="h-8 w-8" />
          </span>
          <p className="mt-6 text-sm font-bold uppercase tracking-wider text-emerald-700">
            ไม่พบหน้าที่ต้องการ
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            ไม่พบหน้าที่ท่านกำลังค้นหา
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
            หน้าเว็บอาจถูกย้าย เปลี่ยนชื่อ หรือลิงก์ที่ใช้ไม่ถูกต้อง
            กรุณาตรวจสอบที่อยู่เว็บไซต์อีกครั้ง หรือเลือกเข้าสู่บริการที่ต้องการจากรายการด้านล่าง
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Link href="/" className="btn-primary">
              <Home className="h-4 w-4" />
              กลับสู่หน้าแรก
            </Link>
            <Link href="/search" className="btn-secondary">
              <Search className="h-4 w-4" />
              ค้นหาเว็บไซต์
            </Link>
          </div>

          <div className="mt-10 w-full rounded-lg border border-gray-200 bg-gray-50 p-5 text-left">
            <h2 className="text-sm font-bold text-gray-900">
              บริการที่เข้าถึงบ่อย
            </h2>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {helpfulLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between gap-2 rounded-md border border-gray-200 bg-white px-3.5 py-2.5 text-sm font-medium text-gray-800 transition-colors hover:border-emerald-400 hover:text-emerald-900"
                >
                  {link.label}
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </Link>
              ))}
            </div>
          </div>

          <p className="mt-6 text-xs text-gray-500">
            หากท่านเห็นว่าหน้านี้ควรมีอยู่ กรุณาแจ้งเจ้าหน้าที่ผ่านหน้า{" "}
            <Link
              href="/contact"
              className="font-semibold text-emerald-800 hover:underline"
            >
              ติดต่อศูนย์สอบฯ
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
