"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, FileText, Clock, ArrowRight, BookOpen } from "lucide-react";

interface SampleExam {
  id: number;
  subjectCode: string;
  year: number;
  title: string;
  description: string;
  questionCount: number;
  timeLimit: string;
  downloadCount: string;
  fileSize: string;
}

const samplesData: SampleExam[] = [
  {
    id: 1,
    subjectCode: "PLE-CC1",
    year: 2568,
    title: "ชุดตัวอย่างข้อสอบความรู้ความสามารถร่วม PLE-CC1 ประจำปี 2568",
    description: "ตัวอย่างข้อสอบปรนัยพร้อมเฉลยและคำอธิบาย ครอบคลุมเภสัชวิทยาและกฎหมายยา",
    questionCount: 50,
    timeLimit: "60 นาที",
    downloadCount: "8,920",
    fileSize: "PDF 2.5 MB",
  },
  {
    id: 2,
    subjectCode: "PLE-PC1",
    year: 2568,
    title: "ชุดตัวอย่างข้อสอบการบริบาลทางเภสัชกรรม PLE-PC1 ประจำปี 2568",
    description: "โจทย์กรณีศึกษาผู้ป่วย (Patient Cases) พร้อมแนวทางการวางแผนการรักษาและการให้คำปรึกษา",
    questionCount: 40,
    timeLimit: "90 นาที",
    downloadCount: "6,410",
    fileSize: "PDF 3.1 MB",
  },
  {
    id: 3,
    subjectCode: "PLE-IP1",
    year: 2568,
    title: "ชุดตัวอย่างข้อสอบเภสัชกรรมอุตสาหการ PLE-IP1 ประจำปี 2568",
    description: "ตัวอย่างข้อสอบการควบคุมคุณภาพและการผลิตยาตามหลักเกณฑ์ GMP/PICs",
    questionCount: 30,
    timeLimit: "45 นาที",
    downloadCount: "3,180",
    fileSize: "PDF 1.8 MB",
  },
  {
    id: 4,
    subjectCode: "PLE-CC2",
    year: 2567,
    title: "แนวทางการสอบทักษะร่วม OSPE 16 ฐาน (Station Practice Guide)",
    description: "สรุปตัวอย่างสถานการณ์จำลอง การจัดเวลาในแต่ละฐาน และเกณฑ์การให้คะแนนของกรรมการ",
    questionCount: 16,
    timeLimit: "ฐานละ 5 นาที",
    downloadCount: "12,400",
    fileSize: "PDF 4.2 MB",
  },
  {
    id: 5,
    subjectCode: "PLE-CC1",
    year: 2567,
    title: "ชุดตัวอย่างข้อสอบเสมือนจริง PLE-CC1 ปี 2567 (Past Exam Paper)",
    description: "ข้อสอบเก่าที่ได้รับอนุญาตให้เผยแพร่เพื่อการศึกษาและทบทวนความรู้",
    questionCount: 100,
    timeLimit: "120 นาที",
    downloadCount: "15,620",
    fileSize: "PDF 3.6 MB",
  },
];

export default function SampleExamsPage() {
  const [selectedSubject, setSelectedSubject] = useState("ทั้งหมด");
  const [selectedYear, setSelectedYear] = useState("ทั้งหมด");

  const subjects = ["ทั้งหมด", "PLE-CC1", "PLE-PC1", "PLE-IP1", "PLE-CC2"];
  const years = ["ทั้งหมด", "2568", "2567"];

  const filtered = samplesData.filter((item) => {
    const matchSub = selectedSubject === "ทั้งหมด" || item.subjectCode === selectedSubject;
    const matchYr = selectedYear === "ทั้งหมด" || item.year.toString() === selectedYear;
    return matchSub && matchYr;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <nav className="text-xs text-gray-500 mb-2 flex items-center gap-1.5">
          <Link href="/" className="hover:text-emerald-800">หน้าแรก</Link>
          <span>/</span>
          <span className="text-emerald-800 font-medium">ตัวอย่างข้อสอบ</span>
        </nav>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          คลังตัวอย่างข้อสอบและแนวทางการสอบ
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 font-light">
          ฝึกทักษะด้วยตัวอย่างข้อสอบมาตรฐาน พร้อมคำอธิบายและแนวทางการเตรียมตัวสอบวิชาชีพ
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          <span className="text-gray-500 font-medium">วิชา:</span>
          {subjects.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                selectedSubject === sub
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-gray-500 font-medium">ปี พ.ศ.:</span>
          {years.map((yr) => (
            <button
              key={yr}
              onClick={() => setSelectedYear(yr)}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                selectedYear === yr
                  ? "bg-emerald-100 text-emerald-900 font-bold border border-emerald-300"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {yr}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-xl bg-white border border-gray-200 hover:border-emerald-300 shadow-xs transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-900 font-bold text-xs border border-emerald-200 font-mono">
                  {item.subjectCode} • ปี {item.year}
                </span>
                <span className="text-[11px] text-gray-400">ดาวน์โหลด {item.downloadCount} ครั้ง</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <div className="text-gray-500 flex items-center gap-2">
                <span className="flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-gray-400" />
                  {item.questionCount} ข้อ
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  {item.timeLimit}
                </span>
              </div>
              <a
                href="#download"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors"
              >
                <Download className="w-3 h-3 text-emerald-700" />
                ดาวน์โหลด ({item.fileSize})
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
