import Link from "next/link";
import { Download, Monitor, Building2, BookOpen, FileText } from "lucide-react";

const guides = [
  {
    id: 1,
    title: "คู่มือการใช้งานระบบสอบออนไลน์ E-Exam ฉบับสมบูรณ์",
    category: "ระบบสอบ E-Exam",
    desc: "คำแนะนำตั้งแต่การล็อกอินเข้าสู่ระบบ การเลือกตอบข้อสอบ การใช้งานแถบนำทาง การปักหมุดข้อสอบ และการส่งคำตอบ",
    pages: "24 หน้า",
    size: "PDF 3.4 MB",
    icon: Monitor,
  },
  {
    id: 2,
    title: "คู่มือการเตรียมตัวสอบทักษะวิชาชีพร่วม OSPE (16 สถานี)",
    category: "การสอบทักษะ OSPE",
    desc: "ข้อควรปฏิบัติในแต่ละฐาน การบริหารเวลา 5 นาทีต่อสถานี การปฏิบัติตามคำสั่งของกรรมการ และรายการอุปกรณ์ที่จัดเตรียมให้",
    pages: "36 หน้า",
    size: "PDF 5.1 MB",
    icon: Building2,
  },
  {
    id: 3,
    title: "คู่มือการประเมินทักษะการบริบาลทางเภสัชกรรม OSCE",
    category: "การสอบทักษะ OSCE",
    desc: "แนวทางการซักประวัติ การแก้ปัญหาด้านยา (Drug-related Problems) และการสื่อสารกับผู้ป่วยจำลอง (Standardized Patient)",
    pages: "28 หน้า",
    size: "PDF 4.2 MB",
    icon: BookOpen,
  },
  {
    id: 4,
    title: "แนวทางการลงทะเบียนและอัปโหลดเอกสารผ่านระบบออนไลน์",
    category: "การรับสมัคร",
    desc: "ขั้นตอนการสแกนและรับรองสำเนาเอกสาร ขนาดไฟล์ที่ถูกต้อง และการชำระเงินผ่านระบบ QR Payment",
    pages: "16 หน้า",
    size: "PDF 1.8 MB",
    icon: FileText,
  },
];

export default function GuidesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <nav className="text-xs text-gray-500 mb-2 flex items-center gap-1.5">
          <Link href="/" className="hover:text-emerald-800">หน้าแรก</Link>
          <span>/</span>
          <span className="text-emerald-800 font-medium">คู่มือการสอบ</span>
        </nav>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          คู่มือการสอบและสื่อการเรียนรู้
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 font-light">
          เอกสารแนะนำและคู่มือการเตรียมตัวสำหรับการสอบความรู้และทักษะวิชาชีพเภสัชกรรมทุกรูปแบบ
        </p>
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {guides.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="p-5 rounded-xl bg-white border border-gray-200 hover:border-emerald-300 shadow-xs transition-all flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-100">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {item.category}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-gray-400">
                  {item.pages} • {item.size}
                </span>
                <a
                  href="#download-guide"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-700" />
                  ดาวน์โหลดคู่มือ
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
