"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, User, MapPin, BarChart3, Printer, Clock, FileCheck, CheckCircle2, ArrowRight } from "lucide-react";

export default function ScoresAndStatusPage() {
  const [nationalId, setNationalId] = useState("1103701234567");
  const [hasSearched, setHasSearched] = useState(true);

  const mockCandidate = {
    name: "นายสมชาย ใจดีบริสุทธิ์",
    nameEn: "Mr. Somchai Jaideeborisut",
    nationalId: "1-1037-01234-56-7",
    examCode: "PLE-2569-008129",
    university: "จุฬาลงกรณ์มหาวิทยาลัย (เภสัชศาสตรบัณฑิต)",
    examRound: "การสอบความรู้ทางวิชาชีพเภสัชกรรม ครั้งที่ 1/2569",
    status: "อนุมัติและชำระเงินแล้ว",
    venue: "ศูนย์สอบมหาวิทยาลัยธรรมศาสตร์ ศูนย์รังสิต",
    building: "อาคารเรียนรวม SC3 ชั้น 3",
    room: "ห้อง 302",
    seatNumber: "A-042",
    examDate: "18 มกราคม 2569 (09:00 - 12:00 น.)",
    // Scores
    scores: [
      {
        subject: "PLE-CC1 (ความรู้ความสามารถร่วม)",
        fullScore: 100,
        scoreGot: 78.5,
        criteria: 60.0,
        result: "ผ่านเกณฑ์",
        resultColor: "text-emerald-800 bg-emerald-50 border-emerald-200",
      },
      {
        subject: "PLE-PC1 (บริบาลทางเภสัชกรรม)",
        fullScore: 100,
        scoreGot: 82.0,
        criteria: 60.0,
        result: "ผ่านเกณฑ์",
        resultColor: "text-emerald-800 bg-emerald-50 border-emerald-200",
      },
      {
        subject: "PLE-CC2 (ทักษะ OSPE 16 ฐาน)",
        fullScore: 100,
        scoreGot: 74.0,
        criteria: 60.0,
        result: "ผ่านเกณฑ์",
        resultColor: "text-emerald-800 bg-emerald-50 border-emerald-200",
      },
    ],
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (nationalId.trim()) {
      setHasSearched(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      {/* Header */}
      <div>
        <nav className="text-xs text-gray-500 mb-2 flex items-center gap-1.5">
          <Link href="/" className="hover:text-emerald-800">หน้าแรก</Link>
          <span>/</span>
          <span className="text-emerald-800 font-medium">ตรวจสอบสถานะและคะแนนสอบ</span>
        </nav>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          ระบบตรวจสอบสถานะการสมัคร ที่นั่งสอบ และผลคะแนนสอบ
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 font-light">
          กรอกเลขประจำตัวประชาชน 13 หลัก เพื่อดูสถานะการสมัคร เลขที่นั่งสอบ หรือผลคะแนนอย่างเป็นทางการ
        </p>
      </div>

      {/* Search Input Box */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="กรอกเลขประจำตัวประชาชน 13 หลัก (เช่น 1103701234567)"
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
              className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600 font-mono"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors shrink-0"
          >
            ค้นหาข้อมูล
          </button>
        </form>
      </div>

      {/* Search Result */}
      {hasSearched && (
        <div className="space-y-4">
          {/* Candidate Card */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gray-100 text-gray-700 flex items-center justify-center shrink-0 border border-gray-200">
                  <User className="w-6 h-6 text-emerald-800" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-gray-900">{mockCandidate.name}</h2>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {mockCandidate.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-gray-500 font-mono mt-0.5">
                    {mockCandidate.nameEn} • เลขบัตร: {mockCandidate.nationalId}
                  </div>
                  <div className="text-xs text-gray-600 mt-0.5">
                    {mockCandidate.university}
                  </div>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1 text-xs">
                <span className="text-[11px] text-gray-400">เลขประจำตัวผู้สอบ</span>
                <span className="font-mono text-xs font-bold px-2.5 py-1 bg-gray-50 rounded border border-gray-200 text-gray-900">
                  {mockCandidate.examCode}
                </span>
              </div>
            </div>

            {/* Seating Info */}
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                  ข้อมูลสนามสอบและที่นั่งสอบรอบปัจจุบัน
                </span>
                <span className="text-[11px] font-medium text-gray-600 bg-white px-2 py-0.5 rounded border border-gray-200">
                  {mockCandidate.examRound}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                <div className="bg-white p-2.5 rounded-lg border border-gray-200">
                  <div className="text-gray-400 text-[10px]">สนามสอบ</div>
                  <div className="font-bold text-gray-900 mt-0.5">{mockCandidate.venue}</div>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-gray-200">
                  <div className="text-gray-400 text-[10px]">อาคาร / ชั้น</div>
                  <div className="font-bold text-gray-900 mt-0.5">{mockCandidate.building}</div>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-gray-200">
                  <div className="text-gray-400 text-[10px]">ห้องสอบ</div>
                  <div className="font-bold text-gray-900 mt-0.5 text-emerald-800">{mockCandidate.room}</div>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-emerald-300">
                  <div className="text-emerald-800 text-[10px] font-bold">เลขที่นั่งสอบ</div>
                  <div className="font-bold text-sm text-emerald-800 mt-0.5 font-mono">{mockCandidate.seatNumber}</div>
                </div>
              </div>

              <div className="text-[11px] text-gray-500 flex items-center justify-between pt-1">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-gray-400" />
                  กำหนดการสอบ: {mockCandidate.examDate}
                </span>
                <button
                  onClick={() => window.print()}
                  className="font-bold text-emerald-800 hover:underline flex items-center gap-1"
                >
                  <Printer className="w-3 h-3" />
                  พิมพ์บัตรประจำตัวสอบ
                </button>
              </div>
            </div>

            {/* Scores Table */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                  <BarChart3 className="w-4 h-4 text-emerald-700" />
                  ประวัติผลการสอบและการประเมินสมรรถนะ
                </h3>
                <Link
                  href="/requests"
                  className="text-xs text-emerald-800 hover:underline font-medium"
                >
                  ยื่นคำขอทักท้วง / ขอทราบคะแนนย่อย →
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
                    <tr>
                      <th className="py-2 px-3">รายวิชาสอบ</th>
                      <th className="py-2 px-3 text-center">คะแนนเต็ม</th>
                      <th className="py-2 px-3 text-center">เกณฑ์ผ่าน</th>
                      <th className="py-2 px-3 text-center">คะแนนที่ได้</th>
                      <th className="py-2 px-3 text-center">ผลการประเมิน</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {mockCandidate.scores.map((sc, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50">
                        <td className="py-2.5 px-3 font-medium text-gray-900">{sc.subject}</td>
                        <td className="py-2.5 px-3 text-center text-gray-500 font-mono">{sc.fullScore}</td>
                        <td className="py-2.5 px-3 text-center text-gray-500 font-mono">{sc.criteria}%</td>
                        <td className="py-2.5 px-3 text-center font-bold text-gray-900 font-mono">{sc.scoreGot}</td>
                        <td className="py-2.5 px-3 text-center">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${sc.resultColor}`}>
                            {sc.result}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Print Bar */}
            <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-[11px] text-gray-400">
                * เอกสารรับรองผลสอบฉบับอิเล็กทรอนิกส์มีลายมือชื่อดิจิทัลและรหัสตรวจสอบย้อนหลัง
              </span>
              <button
                onClick={() => window.print()}
                className="px-3.5 py-1.5 text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <FileCheck className="w-3.5 h-3.5 text-emerald-700" />
                พิมพ์หนังสือรับรองผลการสอบ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
