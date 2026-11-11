"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  Bell,
  BookOpen,
  Building,
  CalendarDays,
  ChevronDown,
  ClipboardList,
  FolderOpen,
  GraduationCap,
  LogIn,
  Mail,
  Menu,
  Monitor,
  Phone,
  Scale,
  Search,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";

type NavChild = {
  href: string;
  label: string;
  description: string;
  icon: typeof Search;
};

type NavItem = {
  href: string;
  label: string;
  children?: NavChild[];
};

const navItems: NavItem[] = [
  { href: "/", label: "หน้าแรก" },
  {
    href: "/about",
    label: "เกี่ยวกับเรา",
    children: [
      {
        href: "/about",
        label: "เกี่ยวกับศูนย์สอบฯ",
        description: "บทบาท หน้าที่ และขอบเขตการดำเนินงาน",
        icon: Building,
      },
      {
        href: "/committees",
        label: "คณะอนุกรรมการและคณะทำงาน",
        description: "โครงสร้างการกำกับดูแลและผู้รับผิดชอบ",
        icon: Users,
      },
      {
        href: "/examinees",
        label: "ข้อมูลสำหรับผู้เข้าสอบ",
        description: "คุณสมบัติ รหัสผู้สอบ และขั้นตอนที่เกี่ยวข้อง",
        icon: GraduationCap,
      },
    ],
  },
  {
    href: "/calendar",
    label: "การสอบ",
    children: [
      {
        href: "/calendar",
        label: "ปฏิทินและกำหนดการสอบ",
        description: "ตารางสอบและกำหนดการเตรียมความพร้อม",
        icon: CalendarDays,
      },
      {
        href: "/regulations",
        label: "ระเบียบและเกณฑ์การสอบ",
        description: "ข้อบังคับ ประกาศ และเกณฑ์การประเมิน",
        icon: Scale,
      },
      {
        href: "/guides",
        label: "คู่มือการสอบ",
        description: "คู่มือและแนวทางปฏิบัติสำหรับผู้เข้าสอบ",
        icon: BookOpen,
      },
      {
        href: "/sample-exams",
        label: "ตัวอย่างข้อสอบ",
        description: "ตัวอย่างข้อสอบและแนวทางการตอบ",
        icon: ClipboardList,
      },
      {
        href: "/e-exam",
        label: "ระบบ E-Exam",
        description: "ข้อมูลระบบสอบคอมพิวเตอร์และทดลองสอบ",
        icon: Monitor,
      },
    ],
  },
  {
    href: "/apply",
    label: "บริการออนไลน์",
    children: [
      {
        href: "/apply",
        label: "สมัครสอบออนไลน์",
        description: "ยื่นใบสมัครและชำระค่าธรรมเนียม",
        icon: ClipboardList,
      },
      {
        href: "/exam-registration",
        label: "ลงทะเบียนเข้าสอบ",
        description: "เข้าสู่ระบบด้วยเลขบัตรและรหัสผู้สอบ",
        icon: LogIn,
      },
      {
        href: "/scores",
        label: "ตรวจสอบสถานะและผลสอบ",
        description: "ค้นหาสถานะการสมัคร ที่นั่งสอบ และคะแนน",
        icon: Search,
      },
      {
        href: "/documents",
        label: "เอกสารและแบบฟอร์ม",
        description: "ดาวน์โหลดแบบฟอร์มและคู่มือที่เกี่ยวข้อง",
        icon: FolderOpen,
      },
      {
        href: "/requests",
        label: "ยื่นคำร้องออนไลน์",
        description: "ทักท้วงข้อสอบ ขอทราบคะแนน และขอคืนเงิน",
        icon: ClipboardList,
      },
    ],
  },
  { href: "/news", label: "ข่าวสาร/ประกาศ" },
  { href: "/contact", label: "ติดต่อเรา" },
];

function isItemActive(pathname: string, item: NavItem) {
  if (item.href === "/") return pathname === "/";
  return (
    pathname === item.href ||
    pathname.startsWith(`${item.href}/`) ||
    Boolean(item.children?.some((child) => pathname.startsWith(child.href)))
  );
}

export default function Header() {
  const pathname = usePathname() || "/";
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
    setMobileGroup(null);
  }, [pathname]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    }
    function onPointerDown(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.06)]">
      {/* Official utility bar */}
      <div className="bg-emerald-900 text-emerald-50">
        <div className="container-page flex min-h-9 items-center justify-between gap-3 py-1.5 text-xs">
          <div className="flex min-w-0 items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-amber-400" />
            <span className="hidden shrink-0 font-medium text-amber-300 sm:inline">
              เว็บไซต์ทางการ
            </span>
            <span className="hidden text-emerald-300 sm:inline">|</span>
            <span className="truncate text-emerald-100">
              ศูนย์สอบความรู้และทักษะทางวิชาชีพเภสัชกรรม สภาเภสัชกรรม
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-3 text-emerald-100">
            <a
              href="tel:025919992"
              className="hidden items-center gap-1.5 hover:text-white md:flex"
            >
              <Phone className="h-3.5 w-3.5" />
              0-2591-9992 ถึง 5
            </a>
            <span className="hidden text-emerald-600 md:inline">|</span>
            <a
              href="mailto:ph_exam@pharmacycouncil.org"
              className="hidden items-center gap-1.5 hover:text-white lg:flex"
            >
              <Mail className="h-3.5 w-3.5" />
              ph_exam@pharmacycouncil.org
            </a>
            <Link
              href="/login"
              className="flex items-center gap-1.5 rounded px-1.5 py-0.5 font-medium hover:bg-emerald-800 hover:text-white"
            >
              <LogIn className="h-3.5 w-3.5" />
              เข้าสู่ระบบ
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="border-b border-gray-200">
        <div className="container-page flex h-[4.5rem] items-center justify-between gap-3">
          <Link
            href="/"
            className="flex min-w-0 shrink-0 items-center gap-2.5"
            aria-label="กลับสู่หน้าแรก ศูนย์สอบความรู้ฯ สภาเภสัชกรรม"
          >
            <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-emerald-700 bg-emerald-700 text-white">
              <ShieldCheck className="h-6 w-6" strokeWidth={1.8} />
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-amber-400" />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-base font-bold text-gray-900 sm:text-[1.05rem]">
                ศูนย์สอบความรู้ฯ สภาเภสัชกรรม
              </span>
              <span className="mt-0.5 block truncate text-[0.68rem] font-medium uppercase tracking-wide text-gray-500">
                Pharmacy Licensure Examination Center
              </span>
            </span>
          </Link>

          <nav
            ref={navRef}
            className="hidden items-center gap-0.5 xl:flex"
            aria-label="เมนูหลัก"
          >
            {navItems.map((item) => {
              const active = isItemActive(pathname, item);
              if (!item.children) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-md px-2.5 py-2 text-sm font-semibold transition-colors ${
                      active
                        ? "bg-emerald-50 text-emerald-800"
                        : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-800"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              }

              const isOpen = openMenu === item.label;
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(item.label)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenMenu(isOpen ? null : item.label)
                    }
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    className={`flex items-center gap-1 rounded-md px-2.5 py-2 text-sm font-semibold transition-colors ${
                      active || isOpen
                        ? "bg-emerald-50 text-emerald-800"
                        : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-800"
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="absolute left-1/2 top-full z-50 w-[22rem] -translate-x-1/2 pt-2">
                      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white py-1.5 shadow-lg">
                        {item.children.map((child) => {
                          const Icon = child.icon;
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="flex gap-3 px-4 py-2.5 transition-colors hover:bg-emerald-50"
                            >
                              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-emerald-100 bg-emerald-50 text-emerald-700">
                                <Icon className="h-4 w-4" />
                              </span>
                              <span>
                                <span className="block text-sm font-semibold text-gray-900">
                                  {child.label}
                                </span>
                                <span className="mt-0.5 block text-xs leading-snug text-gray-500">
                                  {child.description}
                                </span>
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/search"
              className="icon-button"
              aria-label="ค้นหาเว็บไซต์"
              title="ค้นหาเว็บไซต์"
            >
              <Search className="h-4 w-4" />
            </Link>
            <Link
              href="/apply"
              className="hidden items-center gap-1.5 rounded-md bg-emerald-700 px-3.5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 sm:flex"
            >
              สมัครสอบ
              <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="icon-button xl:hidden"
              aria-label={mobileOpen ? "ปิดเมนู" : "เปิดเมนู"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="fixed inset-x-0 bottom-0 top-[6.75rem] z-40 overflow-y-auto border-t border-gray-200 bg-white xl:hidden"
        >
          <div className="container-page space-y-1 py-4">
            <Link
              href="/apply"
              className="mb-3 flex items-center justify-between rounded-md bg-emerald-700 px-4 py-3 text-sm font-semibold text-white"
            >
              สมัครสอบออนไลน์
              <ArrowRight className="h-4 w-4" />
            </Link>

            {navItems.map((item) => {
              const active = isItemActive(pathname, item);
              if (!item.children) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between rounded-md px-4 py-3 text-sm font-semibold ${
                      active
                        ? "bg-emerald-50 text-emerald-800"
                        : "text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    {item.label}
                    <ChevronRightIcon />
                  </Link>
                );
              }
              const expanded = mobileGroup === item.label;
              return (
                <div key={item.href} className="border-b border-gray-100 pb-1">
                  <button
                    type="button"
                    onClick={() =>
                      setMobileGroup(expanded ? null : item.label)
                    }
                    className={`flex w-full items-center justify-between rounded-md px-4 py-3 text-sm font-semibold ${
                      active
                        ? "bg-emerald-50 text-emerald-800"
                        : "text-gray-800 hover:bg-gray-50"
                    }`}
                    aria-expanded={expanded}
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        expanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expanded && (
                    <div className="space-y-0.5 pb-2 pl-2">
                      {item.children.map((child) => {
                        const Icon = child.icon;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="flex items-center gap-3 rounded-md px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50"
                          >
                            <Icon className="h-4 w-4 text-emerald-700" />
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="mt-4 rounded-md border border-amber-200 bg-amber-50 p-3">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                <Bell className="h-4 w-4" />
                ประกาศสำคัญ
              </div>
              <Link
                href="/news/1"
                className="mt-1 block text-sm leading-snug text-amber-900 hover:underline"
              >
                เปิดรับสมัครสอบครั้งที่ 1/2570 ถึงวันที่ 15 ธันวาคม 2569
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className="h-4 w-4 text-gray-400"
      aria-hidden="true"
    >
      <path d="m7.5 5 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
