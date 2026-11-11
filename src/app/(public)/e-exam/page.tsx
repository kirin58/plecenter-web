"use client";

import { useState } from "react";
import { Monitor, Clock, Flag, CheckCircle2, ShieldCheck, FileText, ArrowRight, ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";

export default function EExamPage() {
  const [activeTab, setActiveTab] = useState<"info" | "simulator">("info");
  
  // Simulator state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [flagged, setFlagged] = useState<{ [key: number]: boolean }>({});
  const [simulatorSubmitted, setSimulatorSubmitted] = useState(false);

  const sampleQuestions = [
    {
      id: 1,
      question: "ผู้ป่วยชายอายุ 58 ปี เป็นโรคเบาหวานชนิดที่ 2 ได้รับยา Metformin 1,000 mg วันละ 2 ครั้ง ตรวจพบ eGFR 28 mL/min/1.73m² ข้อใดคือการจัดการทางเภสัชกรรมที่ถูกต้องตามหลักวิชาชีพ?",
      options: [
        "A. ให้ยาในขนาดเดิมและนัดติดตามผลการตรวจทางห้องปฏิบัติการในอีก 1 เดือน",
        "B. ปรับลดขนาดยาเหลือ Metformin 500 mg วันละ 1 ครั้ง",
        "C. หยุดใช้ยา Metformin เนื่องจาก eGFR ต่ำกว่า 30 mL/min/1.73m² เพื่อป้องกัน Lactic Acidosis",
        "D. เปลี่ยนไปใช้ยาในกลุ่ม Sulfonylurea ในขนาดสูงสุดแทนทันที",
      ],
      correctAnswer: 2,
    },
    {
      id: 2,
      question: "ยาปฏิชีวนะในข้อใดมีกลไกยับยั้งการสังเคราะห์ผนังเซลล์ของแบคทีเรีย (Bacterial Cell Wall Synthesis Inhibitor)?",
      options: [
        "A. Amoxicillin / Clavulanate",
        "B. Azithromycin",
        "C. Ciprofloxacin",
        "D. Doxycycline",
      ],
      correctAnswer: 0,
    },
    {
      id: 3,
      question: "ตามพระราชบัญญัติยา พ.ศ. 2510 (และที่แก้ไขเพิ่มเติม) ข้อใดจัดเป็น 'ยาอันตราย'?",
      options: [
        "A. ยาพาราเซตามอล 500 มก. บรรจุแผงละ 10 เม็ด",
        "B. ยาต้านการอักเสบชนิดไม่ใช่สเตียรอยด์ เช่น Ibuprofen 400 มก.",
        "C. ยาน้ำแก้ไอขับเสมหะผสมสมุนไพรแผนโบราณ",
        "D. ผงถ่านกัมมันต์สำหรับบรรเทาอาการท้องเสีย",
      ],
      correctAnswer: 1,
    },
  ];

  const handleSelectOption = (qIdx: number, oIdx: number) => {
    setSelectedAnswers({ ...selectedAnswers, [qIdx]: oIdx });
  };

  const toggleFlag = (qIdx: number) => {
    setFlagged({ ...flagged, [qIdx]: !flagged[qIdx] });
  };

  return (
    <div>
      <PageHeader
        title="ระบบการสอบออนไลน์ด้วยคอมพิวเตอร์ (E-Exam)"
        description="ระบบสอบดิจิทัลของศูนย์สอบความรู้ฯ สภาเภสัชกรรม ที่ได้มาตรฐานด้านความปลอดภัย ความเที่ยงตรง และความโปร่งใส"
        breadcrumbs={[{ label: "ระบบ E-Exam" }]}
        eyebrow="บริการออนไลน์"
        meta={
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <span className="badge-green">มาตรฐานระบบ E-Exam ปี 2569</span>
            <span>รองรับการสอบปรนัยและกรณีศึกษา</span>
          </div>
        }
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("info")}
              className={activeTab === "info" ? "btn-primary" : "btn-secondary"}
            >
              ข้อมูลและข้อกำหนด
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("simulator")}
              className={
                activeTab === "simulator" ? "btn-primary" : "btn-secondary"
              }
            >
              ระบบทดลองสอบเสมือนจริง
            </button>
          </div>
        }
      />

      <div className="container-page space-y-6 py-8 lg:py-10">

      {activeTab === "info" ? (
        <div className="space-y-6">
          {/* Banner */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 rounded text-[11px] font-bold border border-emerald-200">
                มาตรฐานระบบ E-Exam ปี 2569
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                ระบบสอบดิจิทัลเพื่อการประเมินความรู้และทักษะวิชาชีพเภสัชกรรม
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
                ระบบ E-Exam ของสภาเภสัชกรรมได้รับการรับรองความปลอดภัยทางไซเบอร์ รองรับการประมวลผลข้อสอบปรนัยและกรณีศึกษา พร้อมระบบบันทึกคำตอบอัตโนมัติแบบเรียลไทม์ และระบบปักหมุดข้อสอบเพื่อทบทวน
              </p>
              <div className="pt-1 flex items-center gap-3">
                <button
                  onClick={() => setActiveTab("simulator")}
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs flex items-center gap-1.5"
                >
                  เปิดโปรแกรมจำลอง E-Exam
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <Link
                  href="/documents/9"
                  className="px-4 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  คู่มือการใช้งาน E-Exam
                </Link>
              </div>
            </div>
            <div className="w-16 h-16 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-emerald-800 shrink-0 shadow-xs">
              <Monitor className="w-8 h-8" />
            </div>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-white border border-gray-200 space-y-2 shadow-xs">
              <div className="w-8 h-8 rounded bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-100">
                <Clock className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-xs text-gray-900">ระบบนับเวลาอิสระ (Time Control)</h3>
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                จับเวลาอย่างแม่นยำ พร้อมระบบแจ้งเตือนเมื่อเหลือเวลาสอบ 15 นาที และ 5 นาทีสุดท้าย
              </p>
            </div>
            <div className="p-5 rounded-xl bg-white border border-gray-200 space-y-2 shadow-xs">
              <div className="w-8 h-8 rounded bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-100">
                <Flag className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-xs text-gray-900">ปักหมุดข้อสอบ (Question Flagging)</h3>
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                ทำเครื่องหมายข้อที่ไม่แน่ใจเพื่อกลับมาตรวจสอบได้อย่างรวดเร็วผ่านแถบนำทาง
              </p>
            </div>
            <div className="p-5 rounded-xl bg-white border border-gray-200 space-y-2 shadow-xs">
              <div className="w-8 h-8 rounded bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-100">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-xs text-gray-900">สำรองข้อมูลอัตโนมัติ (Data Persistence)</h3>
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                ระบบบันทึกคำตอบลงฐานข้อมูลทันทีทุกครั้งที่คลิกเลือกคำตอบ ป้องกันข้อมูลสูญหาย
              </p>
            </div>
          </div>

          {/* Steps Timeline */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              ขั้นตอนการปฏิบัติสำหรับผู้เข้าสอบ ณ ห้องสอบคอมพิวเตอร์
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-lg bg-gray-50 border border-gray-200 space-y-1">
                <span className="font-bold text-emerald-800 text-[11px]">ขั้นตอนที่ 1</span>
                <div className="font-bold text-gray-900">รายงานตัวหน้าห้องสอบ</div>
                <p className="text-gray-500 text-[11px]">แสดงบัตรประจำตัวประชาชนและใบนัดสอบล่วงหน้า 30 นาที</p>
              </div>
              <div className="p-3.5 rounded-lg bg-gray-50 border border-gray-200 space-y-1">
                <span className="font-bold text-emerald-800 text-[11px]">ขั้นตอนที่ 2</span>
                <div className="font-bold text-gray-900">เข้าประจำเครื่องสอบ</div>
                <p className="text-gray-500 text-[11px]">นั่งตามเลขที่นั่งสอบ และใส่รหัสผ่านที่ได้รับจากกรรมการคุมสอบ</p>
              </div>
              <div className="p-3.5 rounded-lg bg-gray-50 border border-gray-200 space-y-1">
                <span className="font-bold text-emerald-800 text-[11px]">ขั้นตอนที่ 3</span>
                <div className="font-bold text-gray-900">ทำข้อสอบในเวลา</div>
                <p className="text-gray-500 text-[11px]">สามารถตรวจทาน เปลี่ยนคำตอบ และสลับข้อได้ตลอดเวลาสอบ</p>
              </div>
              <div className="p-3.5 rounded-lg bg-gray-50 border border-gray-200 space-y-1">
                <span className="font-bold text-emerald-800 text-[11px]">ขั้นตอนที่ 4</span>
                <div className="font-bold text-gray-900">ส่งกระดาษคำตอบ</div>
                <p className="text-gray-500 text-[11px]">ตรวจสอบสถานะว่าตอบครบทุกข้อ แล้วกดยืนยันการส่งข้อสอบ</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Simulator */
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden space-y-0">
          {/* Top Bar */}
          <div className="bg-emerald-800 text-white px-5 py-2.5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold bg-emerald-900 px-2 py-0.5 rounded font-mono text-[11px]">E-EXAM SIMULATOR</span>
              <span>วิชาทดสอบ: PLE-CC1 (ความรู้ความสามารถร่วม)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono font-bold bg-emerald-900 px-2 py-0.5 rounded text-emerald-200 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                01:28:45
              </span>
              <span>นายสมชาย ใจดีบริสุทธิ์</span>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {simulatorSubmitted && (
              <div className="rounded-md border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-900">
                <p className="font-semibold">
                  ส่งคำตอบจำลองเรียบร้อยแล้ว
                </p>
                <p className="mt-1 leading-6">
                  ระบบบันทึกคำตอบของท่านครบทุกข้อแล้ว
                  การส่งคำตอบในระบบทดลองนี้ไม่มีผลต่อผลการสอบจริง
                </p>
              </div>
            )}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="text-xs font-bold text-gray-900">
                คำถามข้อที่ {currentQuestion + 1} จาก {sampleQuestions.length}
              </div>
              <button
                onClick={() => toggleFlag(currentQuestion)}
                className={`px-3 py-1 rounded text-xs font-medium border flex items-center gap-1.5 transition-colors ${
                  flagged[currentQuestion]
                    ? "bg-amber-100 text-amber-900 border-amber-300 font-bold"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                }`}
              >
                <Flag className="w-3 h-3 text-amber-700" />
                {flagged[currentQuestion] ? "ปักหมุดทบทวนแล้ว" : "ปักหมุดข้อนี้เพื่อทบทวน"}
              </button>
            </div>

            {/* Question Text */}
            <div className="text-sm sm:text-base font-semibold text-gray-900 leading-relaxed">
              {sampleQuestions[currentQuestion].question}
            </div>

            {/* Options */}
            <div className="space-y-2.5 pt-2">
              {sampleQuestions[currentQuestion].options.map((opt, oIdx) => {
                const isSelected = selectedAnswers[currentQuestion] === oIdx;
                return (
                  <div
                    key={oIdx}
                    onClick={() => handleSelectOption(currentQuestion, oIdx)}
                    className={`p-3.5 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all ${
                      isSelected
                        ? "bg-emerald-50 border-emerald-600 font-semibold text-emerald-950 shadow-xs"
                        : "bg-white border-gray-200 hover:border-emerald-300 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] shrink-0 ${
                          isSelected
                            ? "border-emerald-700 bg-emerald-700 text-white"
                            : "border-gray-300"
                        }`}
                      >
                        {isSelected && <Check className="h-3 w-3" strokeWidth={3} />}
                      </div>
                      <span>{opt}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Palette */}
            <div className="pt-4 border-t border-gray-100">
              <div className="text-[11px] text-gray-500 mb-2 font-medium">แถบสถานะและหมายเลขข้อสอบ:</div>
              <div className="flex items-center gap-1.5">
                {sampleQuestions.map((_, qIdx) => {
                  const isAnswered = selectedAnswers[qIdx] !== undefined;
                  const isCur = currentQuestion === qIdx;
                  const isFlg = flagged[qIdx];
                  return (
                    <button
                      key={qIdx}
                      onClick={() => setCurrentQuestion(qIdx)}
                      className={`w-8 h-8 rounded text-xs font-bold transition-all relative ${
                        isCur
                          ? "ring-2 ring-emerald-700 bg-emerald-100 text-emerald-900"
                          : isAnswered
                          ? "bg-emerald-700 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {qIdx + 1}
                      {isFlg && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <button
                disabled={currentQuestion === 0}
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
                className="px-4 py-2 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                ข้อก่อนหน้า
              </button>
              {currentQuestion < sampleQuestions.length - 1 ? (
                <button
                  onClick={() => setCurrentQuestion(currentQuestion + 1)}
                  className="px-5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs flex items-center gap-1"
                >
                  ข้อถัดไป
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setSimulatorSubmitted(true)}
                  className="px-5 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-xs"
                >
                  ยืนยันส่งกระดาษคำตอบอิเล็กทรอนิกส์
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
