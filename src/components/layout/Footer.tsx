import Link from "next/link";
import {
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  Printer,
  ShieldCheck,
} from "lucide-react";
import { siteInfo } from "@/data/site";

const serviceLinks = [
  { href: "/apply", label: "สมัครสอบออนไลน์" },
  { href: "/exam-registration", label: "ลงทะเบียนเข้าสอบ" },
  { href: "/scores", label: "ตรวจสอบสถานะและผลสอบ" },
  { href: "/calendar", label: "ปฏิทินและกำหนดการสอบ" },
  { href: "/documents", label: "เอกสารและแบบฟอร์ม" },
  { href: "/requests", label: "ยื่นคำร้องออนไลน์" },
  { href: "/e-exam", label: "ระบบ E-Exam" },
];

const aboutLinks = [
  { href: "/about", label: "เกี่ยวกับศูนย์สอบฯ" },
  { href: "/committees", label: "คณะอนุกรรมการและคณะทำงาน" },
  { href: "/examinees", label: "ข้อมูลสำหรับผู้เข้าสอบ" },
  { href: "/news", label: "ข่าวสารและประกาศ" },
  { href: "/faq", label: "คำถามที่พบบ่อย" },
  { href: "/contact", label: "ติดต่อศูนย์สอบฯ" },
];

const documentLinks = [
  { href: "/regulations", label: "ระเบียบและเกณฑ์การสอบ" },
  { href: "/guides", label: "คู่มือการสอบ" },
  { href: "/sample-exams", label: "ตัวอย่างข้อสอบ" },
  { href: "/documents", label: "แบบฟอร์มคำขออื่น ๆ" },
  { href: "/links", label: "หน่วยงานที่เกี่ยวข้อง" },
];

export default function Footer() {
  return (
    <footer className="mt-auto bg-emerald-950 text-emerald-100">
      <div className="container-page py-12 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-emerald-600 bg-emerald-900 text-amber-300">
                <ShieldCheck className="h-6 w-6" strokeWidth={1.8} />
              </span>
              <div className="leading-tight">
                <div className="text-base font-bold text-white">
                  ศูนย์สอบความรู้ฯ สภาเภสัชกรรม
                </div>
                <div className="mt-0.5 text-[0.68rem] font-medium uppercase tracking-wide text-emerald-400">
                  Pharmacy Licensure Examination Center
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-emerald-200">
              ดำเนินการจัดสอบความรู้และทักษะทางวิชาชีพเภสัชกรรม
              เพื่อการขึ้นทะเบียนและรับใบอนุญาตเป็นผู้ประกอบวิชาชีพเภสัชกรรม
              ภายใต้การกำกับดูแลของสภาเภสัชกรรม
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-emerald-300">
              <ShieldCheck className="h-4 w-4 text-amber-400" />
              คุ้มครองข้อมูลส่วนบุคคลตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล
              พ.ศ. 2562
            </div>
          </div>

          <div>
            <h2 className="border-l-2 border-amber-400 pl-2.5 text-sm font-bold text-white">
              บริการหลัก
            </h2>
            <ul className="mt-4 space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-emerald-200 transition-colors hover:text-white hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="border-l-2 border-amber-400 pl-2.5 text-sm font-bold text-white">
              ข้อมูลและประกาศ
            </h2>
            <ul className="mt-4 space-y-2.5">
              {aboutLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-emerald-200 transition-colors hover:text-white hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-3 space-y-2.5 border-t border-emerald-800 pt-3">
              {documentLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-emerald-200 transition-colors hover:text-white hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="border-l-2 border-amber-400 pl-2.5 text-sm font-bold text-white">
              ข้อมูลติดต่อ
            </h2>
            <ul className="mt-4 space-y-3.5 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                <span className="leading-6 text-emerald-200">
                  {siteInfo.address}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                <a
                  href={`tel:${siteInfo.phoneHref}`}
                  className="text-emerald-200 hover:text-white"
                >
                  {siteInfo.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Printer className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                <span className="text-emerald-200">โทรสาร {siteInfo.fax}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                <a
                  href={`mailto:${siteInfo.email}`}
                  className="break-all text-emerald-200 hover:text-white"
                >
                  {siteInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                <span className="text-emerald-200">{siteInfo.hours}</span>
              </li>
            </ul>
            <a
              href={siteInfo.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-300 hover:text-amber-200 hover:underline"
            >
              เปิดแผนที่สำนักงาน
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-emerald-800">
        <div className="container-page flex flex-col gap-3 py-4 text-xs text-emerald-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2569 ศูนย์สอบความรู้และทักษะทางวิชาชีพเภสัชกรรม สภาเภสัชกรรม
            สงวนลิขสิทธิ์
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <Link href="/privacy" className="hover:text-white hover:underline">
              นโยบายความเป็นส่วนตัว
            </Link>
            <span className="text-emerald-700">|</span>
            <Link href="/terms" className="hover:text-white hover:underline">
              ข้อกำหนดการใช้งาน
            </Link>
            <span className="text-emerald-700">|</span>
            <Link href="/sitemap" className="hover:text-white hover:underline">
              แผนผังเว็บไซต์
            </Link>
            <span className="text-emerald-700">|</span>
            <span>ปรับปรุงล่าสุด {siteInfo.updated}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
