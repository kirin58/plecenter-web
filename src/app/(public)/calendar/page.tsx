"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, MapPin, Download, CheckCircle2, Clock, FileText, ArrowRight } from "lucide-react";

interface CalendarEvent {
  id: number;
  year: number;
  examCode: string;
  name: string;
  type: string;
  registrationDate: string;
  examDate: string;
  resultDate: string;
  venue: string;
  status: "เปิดรับสมัคร" | "ปิดรับสมัคร" | "กำลังจัดสอบ" | "เตรียมเปิดรับ" | "เสร็จสิ้น";
  statusColor: string;
}

const calendarData: CalendarEvent[] = [
  {
    id: 1,
    year: 2569,
    examCode: "PLE-CC1",
    name: "ความรู้ความสามารถร่วมทางเภสัชกรรม (Core Competency 1)",
    type: "ปรนัย MCQ (150 ข้อ)",
    registrationDate: "1 พ.ย. 68 - 15 ธ.ค. 68",
    examDate: "18 มกราคม 2569",
    resultDate: "15 กุมภาพันธ์ 2569",
    venue: "ศูนย์สอบ 4 ภูมิภาค (มธ.รังสิต, มช., มข., มอ.)",
    status: "เปิดรับสมัคร",
    statusColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
  },
  {
    id: 2,
    year: 2569,
    examCode: "PLE-PC1",
    name: "ความรู้ทางวิชาชีพด้านการบริบาลทางเภสัชกรรม (Pharmacy Care 1)",
    type: "ปรนัย MCQ ประยุกต์กรณีศึกษา",
    registrationDate: "1 พ.ย. 68 - 15 ธ.ค. 68",
    examDate: "19 มกราคม 2569",
    resultDate: "15 กุมภาพันธ์ 2569",
    venue: "ศูนย์สอบส่วนกลาง และศูนย์ภูมิภาค",
    status: "เปิดรับสมัคร",
    statusColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
  },
  {
    id: 3,
    year: 2569,
    examCode: "PLE-IP1",
    name: "ความรู้ทางวิชาชีพด้านเภสัชกรรมอุตสาหการ (Industrial Pharmacy 1)",
    type: "ปรนัย MCQ การผลิตและการประกันคุณภาพยา",
    registrationDate: "1 ธ.ค. 68 - 5 ม.ค. 69",
    examDate: "25 มกราคม 2569",
    resultDate: "20 กุมภาพันธ์ 2569",
    venue: "ศูนย์สอบมหาวิทยาลัยธรรมศาสตร์ ศูนย์รังสิต",
    status: "เตรียมเปิดรับ",
    statusColor: "bg-amber-50 text-amber-800 border-amber-200",
  },
  {
    id: 4,
    year: 2569,
    examCode: "PLE-CC2",
    name: "การสอบประเมินทักษะและสมรรถนะร่วมทางวิชาชีพ (OSPE)",
    type: "สถานการณ์จำลอง OSPE 16 ฐาน",
    registrationDate: "5 ม.ค. 69 - 25 ม.ค. 69",
    examDate: "14 - 15 กุมภาพันธ์ 2569",
    resultDate: "15 มีนาคม 2569",
    venue: "คณะเภสัชศาสตร์ มหาวิทยาลัยเครือข่าย 8 แห่ง",
    status: "เตรียมเปิดรับ",
    statusColor: "bg-gray-50 text-gray-700 border-gray-200",
  },
  {
    id: 5,
    year: 2569,
    examCode: "PLE-PC2",
    name: "การสอบประเมินทักษะการบริบาลทางเภสัชกรรม (OSCE)",
    type: "การให้คำปรึกษาและแก้ไขปัญหาการใช้ยาแก่ผู้ป่วยจำลอง",
    registrationDate: "1 ก.พ. 69 - 20 ก.พ. 69",
    examDate: "7 - 8 มีนาคม 2569",
    resultDate: "31 มีนาคม 2569",
    venue: "ศูนย์สอบโรงพยาบาลและสถาบันเครือข่าย",
    status: "เตรียมเปิดรับ",
    statusColor: "bg-gray-50 text-gray-700 border-gray-200",
  },
  {
    id: 6,
    year: 2568,
    examCode: "PLE-CC1",
    name: "ความรู้ความสามารถร่วมทางเภสัชกรรม ครั้งที่ 2/2568",
    type: "ปรนัย MCQ",
    registrationDate: "15 พ.ค. 68 - 15 มิ.ย. 68",
    examDate: "19 กรกฎาคม 2568",
    resultDate: "15 สิงหาคม 2568",
    venue: "ศูนย์สอบ มธ. รังสิต",
    status: "เสร็จสิ้น",
    statusColor: "bg-gray-50 text-gray-500 border-gray-200",
  },
  {
    id: 7,
    year: 2570,
    examCode: "PLE-CC1 & PC1",
    name: "การสอบรอบที่ 1 ประจำปี พ.ศ. 2570 (แผนงานล่วงหน้า)",
    type: "E-Exam ออนไลน์เต็มรูปแบบ",
    registrationDate: "พฤศจิกายน 2569",
    examDate: "มกราคม 2570",
    resultDate: "กุมภาพันธ์ 2570",
    venue: "ศูนย์สอบ E-Exam ทั่วประเทศ",
    status: "เตรียมเปิดรับ",
    statusColor: "bg-teal-50 text-teal-800 border-teal-200",
  },
];

export default function CalendarPage() {
  const [selectedYear, setSelectedYear] = useState<number>(2569);
  const [selectedFilter, setSelectedFilter] = useState<string>("ทั้งหมด");

  const years = [2568, 2569, 2570, 2571];
  const filters = ["ทั้งหมด", "PLE-CC1", "PLE-PC1", "PLE-IP1", "PLE-CC2", "PLE-PC2"];

  const filteredEvents = calendarData.filter((evt) => {
    const matchYear = evt.year === selectedYear;
    const matchCode = selectedFilter === "ทั้งหมด" || evt.examCode.includes(selectedFilter);
    return matchYear && matchCode;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb & Header */}
      <div>
        <nav className="text-xs text-gray-500 mb-2 flex items-center gap-1.5">
          <Link href="/" className="hover:text-emerald-800">หน้าแรก</Link>
          <span>/</span>
          <span className="text-emerald-800 font-medium">ปฏิทินสอบ</span>
        </nav>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              ปฏิทินและกำหนดการสอบวิชาชีพเภสัชกรรม
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 font-light">
              ตารางกำหนดการรับสมัคร วันสอบ วันประกาศผล สำหรับการสอบความรู้และทักษะทางวิชาชีพ
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3.5 py-2 text-xs font-semibold text-emerald-900 bg-white border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors flex items-center gap-1.5 shadow-xs">
              <Calendar className="w-3.5 h-3.5 text-emerald-700" />
              เพิ่มเข้า Google Calendar
            </button>
            <button className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 transition-colors flex items-center gap-1.5 shadow-xs">
              <Download className="w-3.5 h-3.5" />
              ดาวน์โหลดตารางสอบ PDF
            </button>
          </div>
        </div>
      </div>

      {/* Year Selector Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200">
        {years.map((yr) => (
          <button
            key={yr}
            onClick={() => setSelectedYear(yr)}
            className={`pb-3 px-4 text-xs font-bold transition-all relative ${
              selectedYear === yr
                ? "text-emerald-800 font-bold"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            ปฏิทินปี {yr}
            {selectedYear === yr && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Subject Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <span className="text-gray-500 mr-2 font-medium">กรองรายวิชา:</span>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setSelectedFilter(f)}
            className={`px-3 py-1 rounded whitespace-nowrap transition-colors ${
              selectedFilter === f
                ? "bg-emerald-100 text-emerald-900 font-bold border border-emerald-300"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Calendar Event Cards */}
      <div className="space-y-3">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
            <Calendar className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-gray-700">ยังไม่มีกำหนดการสอบในเงื่อนไขที่เลือก</p>
            <p className="text-xs text-gray-400 mt-1">สามารถติดตามประกาศเพิ่มเติมได้ที่หน้าข่าวสาร</p>
          </div>
        ) : (
          filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-white p-5 rounded-xl border border-gray-200 hover:border-emerald-300 shadow-xs transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-900 font-mono font-bold text-xs border border-emerald-200">
                    {evt.examCode}
                  </span>
                  <span className="text-[11px] text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                    {evt.type}
                  </span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border w-fit ${evt.statusColor}`}>
                  {evt.status}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-gray-900">
                  {evt.name}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  สถานที่จัดสอบ: {evt.venue}
                </p>
              </div>

              {/* Milestones */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-gray-100 text-xs">
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 space-y-1">
                  <span className="text-gray-500 font-medium text-[11px]">1. ช่วงรับสมัครสอบ</span>
                  <div className="font-bold text-gray-900">
                    {evt.registrationDate}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200 space-y-1">
                  <span className="text-emerald-900 font-bold text-[11px]">2. วันที่ทำการจัดสอบ</span>
                  <div className="font-bold text-emerald-950">
                    {evt.examDate}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 space-y-1">
                  <span className="text-gray-500 font-medium text-[11px]">3. ประกาศผลการสอบ</span>
                  <div className="font-bold text-gray-900">
                    {evt.resultDate}
                  </div>
                </div>
              </div>

              {/* Action row */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <span className="text-[11px] text-gray-400">
                  * กำหนดการอาจมีการเปลี่ยนแปลงตามประกาศอย่างเป็นทางการของสภาเภสัชกรรม
                </span>
                <div className="flex items-center gap-2">
                  <Link
                    href="/regulations"
                    className="px-3 py-1.5 text-xs text-gray-600 hover:text-emerald-800 font-medium"
                  >
                    ดูเกณฑ์วิชานี้
                  </Link>
                  {evt.status === "เปิดรับสมัคร" && (
                    <Link
                      href="/apply"
                      className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors"
                    >
                      สมัครสอบรอบนี้
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
