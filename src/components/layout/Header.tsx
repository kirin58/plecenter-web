"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  Monitor,
  Calendar,
  ClipboardList,
  Search,
  BookOpen,
  HelpCircle,
  Phone,
  ChevronDown,
  Menu,
  X,
  ShieldCheck,
  Building2,
  Bell,
} from "lucide-react";

const navLinks = [
  { href: "/", label: "หน้าแรก" },
  { href: "/news", label: "ข่าวสาร/ประกาศ" },
  { href: "/calendar", label: "ปฏิทินสอบ" },
  { href: "/apply", label: "สมัครสอบออนไลน์" },
  { href: "/scores", label: "ตรวจสอบสถานะ/คะแนน" },
  { href: "/regulations", label: "ระเบียบและเกณฑ์สอบ" },
  { href: "/sample-exams", label: "ตัวอย่างข้อสอบ" },
  { href: "/documents", label: "ศูนย์เอกสาร" },
  { href: "/e-exam", label: "ระบบ E-Exam" },
  { href: "/contact", label: "ติดต่อสภาฯ" },
];

function NavLinksDesktop({ pathname }: { pathname: string }) {
  return (
    <nav className="hidden xl:flex items-center gap-1">
      {navLinks.slice(0, 7).map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
              isActive
                ? "text-emerald-800 bg-emerald-50 font-semibold border-b-2 border-emerald-600 rounded-b-none"
                : "text-gray-700 hover:text-emerald-800 hover:bg-emerald-50/50"
            }`}
          >
            {link.label}
          </Link>
        );
      })}

      {/* Services dropdown */}
      <div className="relative group">
        <button className="px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:text-emerald-800 hover:bg-emerald-50/50 flex items-center gap-1">
          <span>บริการอื่น</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-500 group-hover:rotate-180 transition-transform" />
        </button>
        <div className="absolute right-0 top-full pt-1.5 hidden group-hover:block w-56 z-50">
          <div className="bg-white rounded-xl shadow-lg border border-emerald-100 p-1.5 space-y-0.5">
            <Link href="/documents" className="flex items-center gap-2.5 px-3 py-2 text-xs text-gray-700 rounded-lg hover:bg-emerald-50 hover:text-emerald-800">
              <FileText className="w-3.5 h-3.5 text-emerald-700" />
              <span>ศูนย์เอกสารและแบบฟอร์ม</span>
            </Link>
            <Link href="/e-exam" className="flex items-center gap-2.5 px-3 py-2 text-xs text-gray-700 rounded-lg hover:bg-emerald-50 hover:text-emerald-800">
              <Monitor className="w-3.5 h-3.5 text-emerald-700" />
              <span>ระบบสอบ E-Exam</span>
            </Link>
            <Link href="/requests" className="flex items-center gap-2.5 px-3 py-2 text-xs text-gray-700 rounded-lg hover:bg-emerald-50 hover:text-emerald-800">
              <ClipboardList className="w-3.5 h-3.5 text-emerald-700" />
              <span>ยื่นคำร้องและทักท้วง</span>
            </Link>
            <Link href="/guides" className="flex items-center gap-2.5 px-3 py-2 text-xs text-gray-700 rounded-lg hover:bg-emerald-50 hover:text-emerald-800">
              <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
              <span>คู่มือการสอบวิชาชีพ</span>
            </Link>
            <Link href="/faq" className="flex items-center gap-2.5 px-3 py-2 text-xs text-gray-700 rounded-lg hover:bg-emerald-50 hover:text-emerald-800">
              <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
              <span>คำถามที่พบบ่อย (FAQ)</span>
            </Link>
            <Link href="/contact" className="flex items-center gap-2.5 px-3 py-2 text-xs text-gray-700 rounded-lg hover:bg-emerald-50 hover:text-emerald-800">
              <Building2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>ติดต่อสภาเภสัชกรรม</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("/");
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      setCurrentPath(pathname);
    }
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-white/98 backdrop-blur-md border-b border-emerald-100 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      {/* Official Government Micro Top Bar */}
      <div className="bg-emerald-800 text-white px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-900 text-emerald-100 border border-emerald-700">
              <Bell className="w-3 h-3 text-emerald-300" />
              ประกาศทางการ
            </span>
            <span className="truncate text-emerald-100">
              การสอบความรู้และทักษะทางวิชาชีพเภสัชกรรม (PLE-CC1 & PLE-PC1) ประจำปี 2569
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-emerald-200 shrink-0 text-[11px]">
            <Link href="/faq" className="hover:text-white transition-colors">ถาม-ตอบ FAQ</Link>
            <span className="text-emerald-600">|</span>
            <Link href="/requests" className="hover:text-white transition-colors">ยื่นคำร้องออนไลน์</Link>
            <span className="text-emerald-600">|</span>
            <a href="tel:025919992" className="hover:text-white transition-colors flex items-center gap-1">
              <Phone className="w-3 h-3" />
              0-2591-9992-5
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Official Emblem Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-xs border border-emerald-600 group-hover:bg-emerald-800 transition-colors">
              <ShieldCheck className="w-5 h-5 text-emerald-100" />
            </div>
            <div className="leading-tight">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-gray-900 font-sans">
                  ศูนย์สอบความรู้ฯ สภาเภสัชกรรม
                </span>
              </div>
              <span className="block text-[11px] text-gray-500 font-normal">
                Pharmacy Licensure Examination Center (PLE)
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <NavLinksDesktop pathname={currentPath} />

          {/* User actions */}
          <div className="hidden sm:flex items-center gap-2">
            <Link
              href="/auth/login"
              className="px-3.5 py-2 text-xs font-medium text-emerald-900 rounded-lg hover:bg-emerald-50 transition-colors border border-emerald-200"
            >
              เข้าสู่ระบบ
            </Link>
            <Link
              href="/apply"
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 shadow-xs transition-colors"
            >
              สมัครสอบออนไลน์
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-gray-700 rounded-lg hover:bg-emerald-50 border border-gray-200"
            aria-label="เปิดเมนูนำทาง"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-1 max-h-[85vh] overflow-y-auto">
          {navLinks.map((link) => {
            const isActive = currentPath === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 text-xs rounded-lg font-medium transition-colors ${
                  isActive
                    ? "bg-emerald-50 text-emerald-800 font-semibold"
                    : "text-gray-700 hover:bg-emerald-50/60"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-3 mt-3 border-t border-gray-200 grid grid-cols-2 gap-2">
            <Link
              href="/auth/login"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-center text-xs font-medium text-emerald-800 rounded-lg border border-emerald-200 bg-white"
            >
              เข้าสู่ระบบ
            </Link>
            <Link
              href="/apply"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-center text-xs font-semibold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800"
            >
              สมัครสอบออนไลน์
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
