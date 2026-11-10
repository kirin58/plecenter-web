"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, Search, FileText, ArrowRight, ShieldCheck } from "lucide-react";

interface DocItem {
  id: number;
  category: string;
  title: string;
  code: string;
  fileType: "PDF" | "DOCX";
  fileSize: string;
  downloads: string;
  date: string;
}

const documentsData: DocItem[] = [
  {
    id: 1,
    category: "แบบฟอร์มคำขอและคำร้อง",
    title: "แบบฟอร์มยื่นคำร้องทักท้วงข้อสอบความรู้ทางวิชาชีพเภสัชกรรม (ภส.10)",
    code: "FORM-PLE-10",
    fileType: "PDF",
    fileSize: "420 KB",
    downloads: "4,210",
    date: "ต.ค. 2568",
  },
  {
    id: 2,
    category: "แบบฟอร์มคำขอและคำร้อง",
    title: "คำขอตรวจสอบและขอทราบผลคะแนนสอบรายวิชาย่อย (ภส.11)",
    code: "FORM-PLE-11",
    fileType: "PDF",
    fileSize: "380 KB",
    downloads: "5,840",
    date: "ต.ค. 2568",
  },
  {
    id: 3,
    category: "แบบฟอร์มคำขอและคำร้อง",
    title: "คำร้องขอรับเงินค่าธรรมเนียมการสอบคืน กรณีมีเหตุสุดวิสัย (ภส.12)",
    code: "FORM-PLE-12",
    fileType: "PDF",
    fileSize: "350 KB",
    downloads: "1,290",
    date: "ก.ย. 2568",
  },
  {
    id: 4,
    category: "คู่มือการสอบ",
    title: "คู่มือการใช้งานระบบสอบออนไลน์ด้วยคอมพิวเตอร์ E-Exam สำหรับผู้สอบ",
    code: "MANUAL-EEXAM",
    fileType: "PDF",
    fileSize: "3.2 MB",
    downloads: "18,400",
    date: "พ.ย. 2568",
  },
  {
    id: 5,
    category: "คู่มือการสอบ",
    title: "คู่มือเกณฑ์ความรู้และทักษะตามสมรรถนะร่วม (Core Competency Handbook)",
    code: "MANUAL-CC",
    fileType: "PDF",
    fileSize: "5.4 MB",
    downloads: "14,100",
    date: "ส.ค. 2568",
  },
  {
    id: 6,
    category: "เอกสารการสมัคร",
    title: "เอกสารแนะนำการยื่นสมัครสอบผ่านคณะเภสัชศาสตร์ และการสมัครรายบุคคล",
    code: "GUIDE-REG",
    fileType: "PDF",
    fileSize: "1.2 MB",
    downloads: "9,600",
    date: "ต.ค. 2568",
  },
  {
    id: 7,
    category: "แบบฟอร์มคำขอและคำร้อง",
    title: "ใบนำชำระเงินค่าปรับและค่าธรรมเนียมล่าช้า (Pay-in Slip)",
    code: "FORM-PAYIN",
    fileType: "PDF",
    fileSize: "290 KB",
    downloads: "2,150",
    date: "ก.ค. 2568",
  },
  {
    id: 8,
    category: "เอกสารการสมัคร",
    title: "แบบคำขอหนังสือรับรองการฝึกปฏิบัติงานวิชาชีพเภสัชกรรม (2,000 ชั่วโมง)",
    code: "FORM-INTERN",
    fileType: "DOCX",
    fileSize: "180 KB",
    downloads: "7,320",
    date: "ส.ค. 2568",
  },
];

export default function DocumentsPage() {
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");
  const [search, setSearch] = useState("");

  const categories = ["ทั้งหมด", "แบบฟอร์มคำขอและคำร้อง", "คู่มือการสอบ", "เอกสารการสมัคร"];

  const filtered = documentsData.filter((doc) => {
    const matchCat = selectedCategory === "ทั้งหมด" || doc.category === selectedCategory;
    const matchSearch = doc.title.toLowerCase().includes(search.toLowerCase()) ||
                        doc.code.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      {/* Header */}
      <div>
        <nav className="text-xs text-gray-500 mb-2 flex items-center gap-1.5">
          <Link href="/" className="hover:text-emerald-800">หน้าแรก</Link>
          <span>/</span>
          <span className="text-emerald-800 font-medium">ศูนย์เอกสารและแบบฟอร์ม</span>
        </nav>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          ศูนย์ดาวน์โหลดเอกสารและแบบฟอร์มคำขอ
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 font-light">
          ดาวน์โหลดแบบฟอร์มคำร้อง คู่มือการสอบ เอกสารประกอบการสมัครสอบ และหนังสือรับรอง
        </p>
      </div>

      {/* Online action banner */}
      <div className="p-4 sm:p-5 rounded-xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs">
          <div className="font-bold text-gray-900 text-sm">บริการยื่นคำร้องหรือทักท้วงข้อสอบออนไลน์</div>
          <div className="text-gray-500 font-light">
            ท่านสามารถกรอกและส่งคำร้องผ่านระบบออนไลน์ได้โดยตรง ไม่จำเป็นต้องพิมพ์เอกสารกระดาษ
          </div>
        </div>
        <Link
          href="/requests"
          className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors shrink-0 flex items-center gap-1"
        >
          ไปยังระบบยื่นคำร้องออนไลน์
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Filters and search */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex flex-col sm:flex-row justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "bg-gray-100 text-gray-600 hover:bg-emerald-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <input
            type="text"
            placeholder="ค้นหาชื่อแบบฟอร์มหรือรหัส..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600"
          />
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2" />
        </div>
      </div>

      {/* Documents table / list */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-xs divide-y divide-gray-100">
        {filtered.map((doc) => (
          <div
            key={doc.id}
            className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-emerald-50/20 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded bg-gray-100 border border-gray-200 text-gray-700 shrink-0">
                <FileText className="w-4 h-4 text-emerald-800" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-gray-100 text-gray-700">
                    {doc.code}
                  </span>
                  <span className="text-[10px] text-emerald-900 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {doc.category}
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 leading-snug">
                  {doc.title}
                </h3>
                <div className="text-[11px] text-gray-400 font-light">
                  ขนาดไฟล์ {doc.fileSize} • ดาวน์โหลด {doc.downloads} ครั้ง • ปรับปรุง {doc.date}
                </div>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-2 self-start sm:self-center">
              <a
                href="#download"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
              >
                <Download className="w-3 h-3 text-emerald-700" />
                ดาวน์โหลด ({doc.fileType})
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
