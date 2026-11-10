"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Calendar,
  PenTool,
  CreditCard,
  BookOpen,
  ClipboardList,
  Search,
  Bell,
  Clock,
  MapPin,
  Eye,
  Download,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Monitor,
} from "lucide-react";

const banners = [
  {
    tag: "ประกาศรับสมัครสอบ",
    tagColor: "bg-emerald-100 text-emerald-900 border-emerald-200",
    title: "การสอบความรู้ทางวิชาชีพเภสัชกรรม ครั้งที่ 1/2569",
    subtitle: "วิชา PLE-CC1 (ความรู้ความสามารถร่วม) และ PLE-PC1 (บริบาลทางเภสัชกรรม)",
    period: "เปิดรับสมัคร 1 พ.ย. 2568 - 15 ธ.ค. 2568",
    actionText: "สมัครสอบออนไลน์",
    actionHref: "/apply",
    secondaryText: "ดาวน์โหลดประกาศทางการ",
    secondaryHref: "/news/1",
    badge: "รอบปัจจุบัน",
  },
  {
    tag: "ระบบดิจิทัล E-Exam",
    tagColor: "bg-teal-100 text-teal-900 border-teal-200",
    title: "เตรียมความพร้อมการสอบด้วยระบบคอมพิวเตอร์ E-Exam 2569",
    subtitle: "มาตรฐานความปลอดภัยระดับสากล จับเวลาแม่นยำ ทราบผลคะแนนรวดเร็ว และเป็นมิตรกับผู้สอบ",
    period: "เปิดให้ทดลองสอบจำลอง (Mock Test Simulator) แล้ววันนี้",
    actionText: "เข้าสู่ระบบ E-Exam",
    actionHref: "/e-exam",
    secondaryText: "คู่มือการใช้งาน E-Exam",
    secondaryHref: "/documents",
    badge: "เทคโนโลยีใหม่",
  },
  {
    tag: "ประกาศผลการสอบ",
    tagColor: "bg-blue-100 text-blue-900 border-blue-200",
    title: "ประกาศผลการสอบทักษะวิชาชีพ ครั้งที่ 2/2568",
    subtitle: "ตรวจสอบรายชื่อผู้ผ่านเกณฑ์ และดาวน์โหลดเอกสารรับรองผลการสอบรายบุคคลได้แล้ว",
    period: "ประกาศ ณ วันที่ 25 ตุลาคม 2568",
    actionText: "ตรวจสอบคะแนนสอบ",
    actionHref: "/scores",
    secondaryText: "ยื่นคำขอทราบคะแนน",
    secondaryHref: "/requests",
    badge: "ผลการสอบล่าสุด",
  },
];

const quickMenus = [
  {
    title: "สมัครสอบออนไลน์",
    desc: "กรอกข้อมูล เลือกรอบสอบ ชำระเงินผ่านระบบ QR Code ทันที",
    icon: PenTool,
    href: "/apply",
    badge: "เปิดรับสมัคร",
  },
  {
    title: "ตรวจสอบสถานะ / ที่นั่งสอบ",
    desc: "ค้นหาข้อมูลผู้สมัคร สนามสอบ ห้องสอบ และเลขที่นั่งสอบ",
    icon: Search,
    href: "/scores",
    badge: "ค้นหาด่วน",
  },
  {
    title: "ปฏิทินและกำหนดการสอบ",
    desc: "ตารางสอบตลอดปี 2568 - 2571 ทุกวิชาและทักษะ",
    icon: Calendar,
    href: "/calendar",
  },
  {
    title: "ระบบสอบคอมพิวเตอร์ E-Exam",
    desc: "แนวทาง ขั้นตอน และระบบทดลองทำข้อสอบเสมือนจริง",
    icon: Monitor,
    href: "/e-exam",
  },
  {
    title: "ตัวอย่างข้อสอบและเฉลย",
    desc: "คลังข้อสอบเก่า PLE-CC, PC, IP และแบบฝึกหัดทบทวน",
    icon: BookOpen,
    href: "/sample-exams",
  },
  {
    title: "แบบฟอร์ม & คำร้องออนไลน์",
    desc: "ยื่นทักท้วงข้อสอบ ขอทราบคะแนน ขอคืนเงินค่าสมัคร",
    icon: ClipboardList,
    href: "/requests",
  },
];

const newsItems = [
  {
    id: 1,
    category: "ประกาศสอบ",
    title: "ประกาศศูนย์สอบฯ ฉบับที่ 12/2569 เรื่อง กำหนดการและสถานที่จัดสอบ PLE-CC1 ครั้งที่ 1/2569",
    date: "8 พ.ย. 2568",
    views: "2,410",
    isPinned: true,
    fileSize: "PDF 1.4 MB",
  },
  {
    id: 2,
    category: "ผลการสอบ",
    title: "ประกาศผลการพิจารณาคำร้องทักท้วงข้อสอบวิชาชีพเภสัชกรรม ประจำรอบที่ 2/2568",
    date: "5 พ.ย. 2568",
    views: "1,850",
    isPinned: false,
    fileSize: "PDF 850 KB",
  },
  {
    id: 3,
    category: "ระเบียบการสอบ",
    title: "ข้อบังคับสภาเภสัชกรรมว่าด้วยเกณฑ์ความรู้ความสามารถทางวิชาชีพของผู้ขอขึ้นทะเบียน (ฉบับปรับปรุง)",
    date: "1 พ.ย. 2568",
    views: "3,120",
    isPinned: false,
    fileSize: "PDF 2.1 MB",
  },
  {
    id: 4,
    category: "สนามสอบ",
    title: "แจ้งผังที่นั่งสอบและแนวทางการปฏิบัติตนของผู้เข้าสอบ ณ มหาวิทยาลัยธรรมศาสตร์ ศูนย์รังสิต",
    date: "28 ต.ค. 2568",
    views: "1,240",
    isPinned: false,
    fileSize: "PDF 920 KB",
  },
];

const upcomingExams = [
  {
    code: "PLE-CC1",
    name: "ความรู้ความสามารถร่วมทางเภสัชกรรม (MCQ)",
    date: "18 มกราคม 2569",
    time: "09:00 - 12:00 น.",
    status: "เปิดรับสมัคร",
    statusColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    location: "ศูนย์สอบ มธ. รังสิต / มช. / มข. / มอ.",
  },
  {
    code: "PLE-PC1",
    name: "บริบาลทางเภสัชกรรม (Pharmacy Care Practice)",
    date: "19 มกราคม 2569",
    time: "09:00 - 16:30 น.",
    status: "เปิดรับสมัคร",
    statusColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    location: "ศูนย์สอบส่วนกลาง และศูนย์ภูมิภาค",
  },
  {
    code: "PLE-IP1",
    name: "เภสัชกรรมอุตสาหการ (Industrial Pharmacy)",
    date: "25 มกราคม 2569",
    time: "09:00 - 12:00 น.",
    status: "เตรียมเปิดรับ",
    statusColor: "bg-amber-50 text-amber-800 border-amber-200",
    location: "ศูนย์สอบกรุงเทพฯ",
  },
  {
    code: "PLE-CC2 (OSPE)",
    name: "การสอบประเมินทักษะและสมรรถนะทางวิชาชีพ",
    date: "14-15 กุมภาพันธ์ 2569",
    time: "ตามรอบนัดหมายประจำสถานี",
    status: "กำหนดการเบื้องต้น",
    statusColor: "bg-gray-50 text-gray-700 border-gray-200",
    location: "คณะเภสัชศาสตร์ มหาวิทยาลัยเครือข่าย",
  },
];

export default function HomePage() {
  const [activeBanner, setActiveBanner] = useState(0);
  const [newsFilter, setNewsFilter] = useState("ทั้งหมด");

  const filteredNews = newsFilter === "ทั้งหมด" 
    ? newsItems 
    : newsItems.filter(item => item.category === newsFilter);

  return (
    <div className="space-y-12 pb-20">
      {/* Official Hero Banner */}
      <section className="relative pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-50/70 via-teal-50/30 to-white border border-emerald-200/80 shadow-xs p-6 sm:p-10 lg:p-12">
          <div className="relative z-10 max-w-3xl space-y-5">
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold border ${banners[activeBanner].tagColor}`}>
                {banners[activeBanner].tag}
              </span>
              <span className="text-[11px] font-medium text-gray-600 bg-white px-2 py-0.5 rounded border border-gray-200">
                {banners[activeBanner].badge}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight leading-snug">
              {banners[activeBanner].title}
            </h1>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
              {banners[activeBanner].subtitle}
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-900 bg-emerald-100/70 border border-emerald-200/80 w-fit px-3 py-1.5 rounded-lg font-medium">
              <Clock className="w-3.5 h-3.5 text-emerald-800" />
              <span>{banners[activeBanner].period}</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href={banners[activeBanner].actionHref}
                className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 transition-colors shadow-xs"
              >
                {banners[activeBanner].actionText}
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Link>
              <Link
                href={banners[activeBanner].secondaryHref}
                className="inline-flex items-center justify-center px-4 py-2.5 text-xs font-medium text-emerald-900 bg-white border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors"
              >
                {banners[activeBanner].secondaryText}
              </Link>
            </div>
          </div>

          {/* Carousel dots */}
          <div className="flex items-center gap-2 mt-8 pt-4 border-t border-emerald-100">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveBanner(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  activeBanner === idx
                    ? "w-8 bg-emerald-700"
                    : "w-2.5 bg-emerald-200 hover:bg-emerald-300"
                }`}
                aria-label={`ไปยังแบนเนอร์ ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access Grid - Formal Style */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 border-l-4 border-emerald-600 pl-3">
            บริการสำหรับผู้สมัครและผู้เข้าสอบ
          </h2>
          <p className="text-xs text-gray-500 mt-0.5 pl-3">
            เข้าถึงระบบการสอบและเอกสารคำขอที่เกี่ยวข้องตามมาตรฐานสภาเภสัชกรรม
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickMenus.map((menu, idx) => {
            const Icon = menu.icon;
            return (
              <Link
                key={idx}
                href={menu.href}
                className="group p-5 rounded-xl bg-white border border-gray-200 hover:border-emerald-400 hover:bg-emerald-50/20 transition-all shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-800 flex items-center justify-center group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    {menu.badge && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                        {menu.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-emerald-800 transition-colors">
                    {menu.title}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500 leading-relaxed font-light">
                    {menu.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center text-xs font-semibold text-emerald-700 group-hover:text-emerald-800">
                  เข้าสู่ระบบงาน
                  <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Announcements & News Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-200">
            <div>
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-emerald-700" />
                <h2 className="text-base sm:text-lg font-bold text-gray-900">
                  ข่าวสารและประกาศจากศูนย์สอบฯ
                </h2>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                ประกาศระเบียบ รอบการสอบ สนามสอบ และประกาศผลการสอบอย่างเป็นทางการ
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg text-xs overflow-x-auto">
              {["ทั้งหมด", "ประกาศสอบ", "ผลการสอบ", "ระเบียบการสอบ", "สนามสอบ"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setNewsFilter(tab)}
                  className={`px-3 py-1 rounded whitespace-nowrap font-medium transition-colors ${
                    newsFilter === tab
                      ? "bg-white text-emerald-900 font-bold shadow-xs"
                      : "text-gray-600 hover:text-emerald-800"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredNews.map((item) => (
              <div
                key={item.id}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-emerald-50/20 px-2 rounded-lg transition-colors"
              >
                <div className="space-y-1 max-w-3xl">
                  <div className="flex items-center gap-2 text-xs">
                    {item.isPinned && (
                      <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-200 text-[10px] font-bold">
                        ประกาศสำคัญ
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-medium">
                      {item.category}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500 text-[11px]">{item.date}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500 text-[11px] flex items-center gap-1">
                      <Eye className="w-3 h-3 text-gray-400" />
                      {item.views} ครั้ง
                    </span>
                  </div>
                  <Link
                    href={`/news/${item.id}`}
                    className="block text-sm font-semibold text-gray-900 hover:text-emerald-800 transition-colors leading-snug"
                  >
                    {item.title}
                  </Link>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href="#download"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-900 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors"
                  >
                    <Download className="w-3 h-3 text-emerald-700" />
                    {item.fileSize}
                  </a>
                  <Link
                    href={`/news/${item.id}`}
                    className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-emerald-800 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    รายละเอียด
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-gray-100 text-center">
            <Link
              href="/news"
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:underline"
            >
              ดูประกาศและข่าวสารทั้งหมด
              <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Exam Schedule */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-700" />
                <h2 className="text-base sm:text-lg font-bold text-gray-900">
                  กำหนดการสอบวิชาชีพรอบถัดไป (ปี 2569)
                </h2>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                ตรวจสอบวันสอบ เวลา และศูนย์สอบเพื่อเตรียมความพร้อมล่วงหน้า
              </p>
            </div>
            <Link
              href="/calendar"
              className="inline-flex items-center px-3.5 py-1.5 text-xs font-medium text-emerald-900 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors w-fit"
            >
              ปฏิทินสอบฉบับเต็ม 3 ปี (2569-2571)
              <ArrowRight className="w-3 h-3 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingExams.map((exam, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-gray-50/50 border border-gray-200 hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-200 font-mono">
                      {exam.code}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${exam.statusColor}`}>
                      {exam.status}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-gray-900">
                    {exam.name}
                  </h3>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-200 text-xs space-y-1 text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                    <span className="font-medium text-gray-900">{exam.date}</span>
                    <span className="text-gray-400">({exam.time})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{exam.location}</span>
                  </div>
                </div>

                <div className="mt-4 pt-2 flex items-center justify-between text-xs">
                  <Link
                    href="/apply"
                    className="font-semibold text-emerald-800 hover:underline flex items-center gap-1"
                  >
                    สมัครสอบรอบนี้
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                  <Link
                    href="/regulations"
                    className="text-[11px] text-gray-500 hover:text-gray-700"
                  >
                    เกณฑ์การสอบ
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Quality Indicators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-white border border-gray-200 text-center space-y-1 shadow-xs">
            <div className="text-2xl font-bold text-emerald-800 font-mono">100%</div>
            <div className="text-xs font-bold text-gray-900">ระบบดิจิทัล E-Exam</div>
            <p className="text-[11px] text-gray-500 font-light">จัดสอบและประมวลผลคะแนนด้วยมาตรฐานสากล</p>
          </div>
          <div className="p-5 rounded-xl bg-white border border-gray-200 text-center space-y-1 shadow-xs">
            <div className="text-2xl font-bold text-emerald-800 font-mono">15,000+</div>
            <div className="text-xs font-bold text-gray-900">ผู้ผ่านเกณฑ์ขึ้นทะเบียน</div>
            <p className="text-[11px] text-gray-500 font-light">มาตรฐานบัณฑิตเภสัชศาสตร์ที่ได้รับใบอนุญาต</p>
          </div>
          <div className="p-5 rounded-xl bg-white border border-gray-200 text-center space-y-1 shadow-xs">
            <div className="text-2xl font-bold text-emerald-800 font-mono">20+</div>
            <div className="text-xs font-bold text-gray-900">สถาบันเครือข่ายสภาฯ</div>
            <p className="text-[11px] text-gray-500 font-light">ศูนย์สอบมาตรฐานครอบคลุม 4 ภูมิภาค</p>
          </div>
          <div className="p-5 rounded-xl bg-white border border-gray-200 text-center space-y-1 shadow-xs">
            <div className="text-2xl font-bold text-emerald-800 font-mono">PDPA</div>
            <div className="text-xs font-bold text-gray-900">มาตรฐานความปลอดภัย</div>
            <p className="text-[11px] text-gray-500 font-light">คุ้มครองข้อมูลส่วนบุคคลและผลสอบตามกฎหมาย</p>
          </div>
        </div>
      </section>

      {/* Network Links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 text-center">
            เว็บไซต์และหน่วยงานที่เกี่ยวข้องในระบบสาธารณสุข
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-gray-600">
            <a href="https://www.pharmacycouncil.org" target="_blank" rel="noreferrer" className="hover:text-emerald-800 hover:underline">
              สภาเภสัชกรรม (The Pharmacy Council)
            </a>
            <span className="text-gray-300">|</span>
            <a href="https://www.fda.moph.go.th" target="_blank" rel="noreferrer" className="hover:text-emerald-800 hover:underline">
              สำนักงานคณะกรรมการอาหารและยา (อย.)
            </a>
            <span className="text-gray-300">|</span>
            <a href="https://www.gpo.or.th" target="_blank" rel="noreferrer" className="hover:text-emerald-800 hover:underline">
              องค์การเภสัชกรรม (GPO)
            </a>
            <span className="text-gray-300">|</span>
            <a href="https://thaihp.org" target="_blank" rel="noreferrer" className="hover:text-emerald-800 hover:underline">
              สมาคมเภสัชกรรมโรงพยาบาล (ประเทศไทย)
            </a>
            <span className="text-gray-300">|</span>
            <Link href="/links" className="text-emerald-800 font-medium hover:underline">
              ดูรายชื่อคณะเภสัชศาสตร์ทั้งหมด →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
