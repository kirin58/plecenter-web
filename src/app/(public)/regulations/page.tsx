"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, ArrowRight, BookOpen, FileText } from "lucide-react";

interface Regulation {
  id: number;
  category: string;
  code: string;
  title: string;
  lastUpdated: string;
  summary: string;
  pdfUrl: string;
}

const regulationsData: Regulation[] = [
  {
    id: 1,
    category: "ระเบียบและข้อบังคับสภาฯ",
    code: "REG-01",
    title: "ข้อบังคับสภาเภสัชกรรม ว่าด้วยการสอบความรู้เพื่อขอขึ้นทะเบียนและรับใบอนุญาตเป็นผู้ประกอบวิชาชีพเภสัชกรรม พ.ศ. 2563 (และที่แก้ไขเพิ่มเติม)",
    lastUpdated: "มกราคม 2568",
    summary: "กฎระเบียบแม่บทกำหนดคุณสมบัติผู้มีสิทธิ์สอบ การยื่นคำขอ เกณฑ์การผ่านการสอบ และการอุทธรณ์ผลการสอบ",
    pdfUrl: "#",
  },
  {
    id: 2,
    category: "เกณฑ์สมรรถนะร่วม (Core)",
    code: "PLE-CC1",
    title: "เกณฑ์ความรู้ความสามารถร่วมทางเภสัชกรรม PLE-CC1 (Core Competency 1)",
    lastUpdated: "กันยายน 2568",
    summary: "ครอบคลุมองค์ความรู้พื้นฐานทางเภสัชศาสตร์ เภสัชวิทยา เภสัชกรรมคลินิก กฎหมายและจริยธรรมวิชาชีพเภสัชกรรม",
    pdfUrl: "#",
  },
  {
    id: 3,
    category: "เกณฑ์สมรรถนะร่วม (Core)",
    code: "PLE-CC2",
    title: "เกณฑ์การประเมินทักษะและสมรรถนะร่วมทางวิชาชีพ PLE-CC2 (OSPE 16 ฐาน)",
    lastUpdated: "สิงหาคม 2568",
    summary: "รายละเอียดทักษะการซักประวัติ การตรวจคัดกรอง การให้คำแนะนำเรื่องยา การผสมยาปราศจากเชื้อ และการประเมินความปลอดภัยในการใช้ยา",
    pdfUrl: "#",
  },
  {
    id: 4,
    category: "สมรรถนะเฉพาะด้าน (Practice)",
    code: "PLE-PC1",
    title: "เกณฑ์ความรู้ทางวิชาชีพด้านการบริบาลทางเภสัชกรรม PLE-PC1",
    lastUpdated: "ตุลาคม 2568",
    summary: "เกณฑ์สำหรับบัณฑิตหลักสูตรการบริบาลทางเภสัชกรรม เน้นการประยุกต์ใช้เภสัชบำบัดขั้นสูงและการติดตามอาการไม่พึงประสงค์จากการใช้ยา",
    pdfUrl: "#",
  },
  {
    id: 5,
    category: "สมรรถนะเฉพาะด้าน (Practice)",
    code: "PLE-PC2",
    title: "เกณฑ์การประเมินทักษะการบริบาลทางเภสัชกรรม PLE-PC2 (OSCE)",
    lastUpdated: "สิงหาคม 2568",
    summary: "การประเมินทักษะการสัมภาษณ์ผู้ป่วยจำลอง (Simulated Patient) การแก้ปัญหาการใช้ยาที่ซับซ้อนในหอผู้ป่วย",
    pdfUrl: "#",
  },
  {
    id: 6,
    category: "สมรรถนะเฉพาะด้าน (Industrial)",
    code: "PLE-IP1",
    title: "เกณฑ์ความรู้ทางวิชาชีพด้านเภสัชกรรมอุตสาหการ PLE-IP1",
    lastUpdated: "ตุลาคม 2568",
    summary: "เกณฑ์สำหรับบัณฑิตหลักสูตรเภสัชกรรมอุตสาหการ ครอบคลุมการพัฒนาสูตรตำรับ การผลิตยาตามมาตรฐาน GMP/PICs การประกันและการควบคุมคุณภาพยา",
    pdfUrl: "#",
  },
  {
    id: 7,
    category: "เกณฑ์สมรรถนะด้านการคุ้มครองผู้บริโภค",
    code: "PLE-PHCP1",
    title: "เกณฑ์ความรู้ทางวิชาชีพด้านการคุ้มครองผู้บริโภคด้านยาและสุขภาพ PLE-PHCP1",
    lastUpdated: "มิถุนายน 2568",
    summary: "กฎหมายอาหารและยา การคุ้มครองสิทธิผู้บริโภค การตรวจสอบโฆษณายา และการจัดการระบบยาในชุมชน",
    pdfUrl: "#",
  },
];

export default function RegulationsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ทั้งหมด");

  const categories = [
    "ทั้งหมด",
    "ระเบียบและข้อบังคับสภาฯ",
    "เกณฑ์สมรรถนะร่วม (Core)",
    "สมรรถนะเฉพาะด้าน (Practice)",
    "สมรรถนะเฉพาะด้าน (Industrial)",
    "เกณฑ์สมรรถนะด้านการคุ้มครองผู้บริโภค",
  ];

  const filtered = selectedCategory === "ทั้งหมด"
    ? regulationsData
    : regulationsData.filter((r) => r.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <nav className="text-xs text-gray-500 mb-2 flex items-center gap-1.5">
          <Link href="/" className="hover:text-emerald-800">หน้าแรก</Link>
          <span>/</span>
          <span className="text-emerald-800 font-medium">ระเบียบและหลักเกณฑ์การสอบ</span>
        </nav>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          ระเบียบและเกณฑ์สมรรถนะการสอบวิชาชีพเภสัชกรรม
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 font-light">
          เอกสารข้อบังคับ เกณฑ์ความรู้ความสามารถ และขอบเขตสมรรถนะแยกตามสาขาวิชาชีพ
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
              selectedCategory === cat
                ? "bg-emerald-700 text-white shadow-xs"
                : "bg-white text-gray-600 hover:bg-emerald-50 border border-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Regulations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-xl bg-white border border-gray-200 hover:border-emerald-300 shadow-xs transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-900 font-bold text-xs border border-emerald-200 font-mono">
                  {item.code}
                </span>
                <span className="text-[11px] text-gray-400">
                  ปรับปรุงล่าสุด: {item.lastUpdated}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                {item.summary}
              </p>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <Link
                href={`/regulations/${item.id}`}
                className="text-emerald-800 font-semibold hover:underline flex items-center gap-1"
              >
                อ่านข้อกำหนดฉบับย่อ
                <ArrowRight className="w-3 h-3" />
              </Link>
              <a
                href={item.pdfUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-emerald-700" />
                ดาวน์โหลดเอกสาร PDF
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
