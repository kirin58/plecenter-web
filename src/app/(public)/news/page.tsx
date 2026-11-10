"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Calendar, Eye, Download, ArrowRight, FileText } from "lucide-react";

const allNews = [
  {
    id: 1,
    category: "ประกาศสอบ",
    title: "ประกาศศูนย์สอบฯ ฉบับที่ 12/2569 เรื่อง กำหนดการและสถานที่จัดสอบ PLE-CC1 ครั้งที่ 1/2569",
    date: "8 พ.ย. 2568",
    views: "2,410",
    isPinned: true,
    fileSize: "PDF 1.4 MB",
    summary: "แจ้งรายละเอียดสนามสอบ ศูนย์สอบมหาวิทยาลัยธรรมศาสตร์ ศูนย์รังสิต มหาวิทยาลัยเชียงใหม่ มหาวิทยาลัยขอนแก่น และมหาวิทยาลัยสงขลานครินทร์ พร้อมกำหนดการวันสอบและสิ่งของที่อนุญาตให้นำเข้าห้องสอบ",
  },
  {
    id: 2,
    category: "ผลการสอบ",
    title: "ประกาศผลการพิจารณาคำร้องทักท้วงข้อสอบวิชาชีพเภสัชกรรม ประจำรอบที่ 2/2568",
    date: "5 พ.ย. 2568",
    views: "1,850",
    isPinned: false,
    fileSize: "PDF 850 KB",
    summary: "คณะกรรมการศูนย์สอบฯ ได้ประชุมพิจารณาข้อทักท้วงข้อสอบวิชา PLE-CC1 และ PLE-PC1 เสร็จสิ้นแล้ว มีมติยกผลประโยชน์ให้ผู้เข้าสอบในข้อ 42 และ 78 ผู้สอบสามารถตรวจสอบคะแนนใหม่ได้ในระบบ",
  },
  {
    id: 3,
    category: "ระเบียบการสอบ",
    title: "ข้อบังคับสภาเภสัชกรรมว่าด้วยเกณฑ์ความรู้ความสามารถทางวิชาชีพของผู้ขอขึ้นทะเบียน (ฉบับปรับปรุง)",
    date: "1 พ.ย. 2568",
    views: "3,120",
    isPinned: false,
    fileSize: "PDF 2.1 MB",
    summary: "ปรับปรุงข้อกำหนดเกณฑ์ความรู้ความสามารถและสมรรถนะร่วม (Core Competency) ให้สอดคล้องกับมาตรฐานวิชาชีพสากลและระบบยาในปัจจุบัน เริ่มมีผลบังคับใช้ตั้งแต่รอบสอบ 1/2569 เป็นต้นไป",
  },
  {
    id: 4,
    category: "สนามสอบ",
    title: "แจ้งผังที่นั่งสอบและแนวทางการปฏิบัติตนของผู้เข้าสอบ ณ มหาวิทยาลัยธรรมศาสตร์ ศูนย์รังสิต",
    date: "28 ต.ค. 2568",
    views: "1,240",
    isPinned: false,
    fileSize: "PDF 920 KB",
    summary: "รายละเอียดการเดินทาง อาคารเรียนรวม SC3 ชั้น 2-4 จุดตรวจบัตรประจำตัวสอบ การแต่งกายที่ถูกต้อง และข้อปฏิบัติเพื่อสุขอนามัย",
  },
  {
    id: 5,
    category: "ประกาศสอบ",
    title: "เปิดรับสมัครสอบความรู้และทักษะการบริบาลทางเภสัชกรรม (PLE-PC1) รอบพิเศษ",
    date: "20 ต.ค. 2568",
    views: "980",
    isPinned: false,
    fileSize: "PDF 1.1 MB",
    summary: "สำหรับผู้ที่สำเร็จการศึกษาหลักสูตรเภสัชศาสตรบัณฑิต (บริบาลทางเภสัชกรรม) ที่ยังสอบไม่ผ่านในหมวดวิชาดังกล่าว สามารถยื่นเอกสารและชำระค่าธรรมเนียมได้ภายในวันที่ 30 พฤศจิกายน 2568",
  },
  {
    id: 6,
    category: "ทั่วไป",
    title: "แนวทางการใช้งานระบบสอบออนไลน์ E-Exam สำหรับผู้เข้าสอบปีการศึกษา 2569",
    date: "15 ต.ค. 2568",
    views: "4,520",
    isPinned: false,
    fileSize: "PDF 3.4 MB",
    summary: "คู่มือฉบับสมบูรณ์อธิบายขั้นตอนการล็อกอิน การทำข้อสอบแบบปรนัย การเปลี่ยนข้อคำถาม การทบทวนคำตอบ และการส่งกระดาษคำตอบอิเล็กทรอนิกส์",
  },
];

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["ทั้งหมด", "ประกาศสอบ", "ผลการสอบ", "ระเบียบการสอบ", "สนามสอบ", "ทั่วไป"];

  const filtered = allNews.filter((item) => {
    const matchCat = selectedCategory === "ทั้งหมด" || item.category === selectedCategory;
    const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb & Header */}
      <div>
        <nav className="text-xs text-gray-500 mb-2 flex items-center gap-1.5">
          <Link href="/" className="hover:text-emerald-800">หน้าแรก</Link>
          <span>/</span>
          <span className="text-emerald-800 font-medium">ข่าวสารและประกาศ</span>
        </nav>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          ข่าวสารและประกาศศูนย์สอบฯ
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 font-light">
          ติดตามประกาศระเบียบ กำหนดการสอบ สนามสอบ และประกาศผลการสอบอย่างเป็นทางการจากสภาเภสัชกรรม
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-emerald-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative min-w-[280px]">
          <input
            type="text"
            placeholder="ค้นหาประกาศ, คำสั่ง, เลขที่..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-2 rounded-lg border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-emerald-600"
          />
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* News List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
            <FileText className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-gray-700">ไม่พบข่าวสารหรือประกาศที่ค้นหา</p>
            <p className="text-xs text-gray-400 mt-1">ลองเปลี่ยนคำค้นหาหรือเลือกหมวดหมู่อื่น</p>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white p-5 rounded-xl border border-gray-200 hover:border-emerald-300 shadow-xs transition-all flex flex-col md:flex-row justify-between gap-5"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {item.isPinned && (
                    <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-200 text-[10px] font-bold">
                      ประกาศสำคัญ
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-medium">
                    {item.category}
                  </span>
                  <span className="text-gray-300">|</span>
                  <span className="text-gray-500 text-[11px] flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    {item.date}
                  </span>
                  <span className="text-gray-300">|</span>
                  <span className="text-gray-500 text-[11px] flex items-center gap-1">
                    <Eye className="w-3 h-3 text-gray-400" />
                    {item.views} ครั้ง
                  </span>
                </div>

                <Link
                  href={`/news/${item.id}`}
                  className="text-sm sm:text-base font-bold text-gray-900 hover:text-emerald-800 transition-colors block leading-snug"
                >
                  {item.title}
                </Link>

                <p className="text-xs text-gray-500 line-clamp-2 font-light leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-2.5 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-gray-100">
                <a
                  href="#download"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-900 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200"
                >
                  <Download className="w-3 h-3 text-emerald-700" />
                  {item.fileSize}
                </a>
                <Link
                  href={`/news/${item.id}`}
                  className="text-xs font-semibold text-emerald-800 hover:underline flex items-center gap-1"
                >
                  อ่านรายละเอียด
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 pt-4">
        <button className="px-3 py-1.5 text-xs text-gray-500 rounded border border-gray-200 bg-white hover:bg-gray-50">« ย้อนกลับ</button>
        <button className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 rounded">1</button>
        <button className="px-3 py-1.5 text-xs text-gray-700 rounded border border-gray-200 bg-white hover:bg-gray-50">2</button>
        <button className="px-3 py-1.5 text-xs text-gray-700 rounded border border-gray-200 bg-white hover:bg-gray-50">3</button>
        <span className="text-gray-400 text-xs">...</span>
        <button className="px-3 py-1.5 text-xs text-gray-500 rounded border border-gray-200 bg-white hover:bg-gray-50">ถัดไป »</button>
      </div>
    </div>
  );
}
