"use client";

import { useState } from "react";
import Link from "next/link";
import { Scale, BarChart3, RefreshCw, Building2, CheckCircle2, Send, FileText } from "lucide-react";

export default function RequestsPage() {
  const [requestType, setRequestType] = useState<string>("ทักท้วงข้อสอบ");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const requestOptions = [
    { id: "ทักท้วงข้อสอบ", label: "ทักท้วงข้อสอบ (ภส.10)", icon: Scale },
    { id: "ขอทราบคะแนน", label: "ขอทราบผลคะแนนย่อย (ภส.11)", icon: BarChart3 },
    { id: "ขอคืนเงิน", label: "ขอคืนเงินค่าสมัครสอบ (ภส.12)", icon: RefreshCw },
    { id: "ฝึกงาน", label: "ขอรับรองการฝึกปฏิบัติงาน", icon: Building2 },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      {/* Header */}
      <div>
        <nav className="text-xs text-gray-500 mb-2 flex items-center gap-1.5">
          <Link href="/" className="hover:text-emerald-800">หน้าแรก</Link>
          <span>/</span>
          <span className="text-emerald-800 font-medium">ยื่นคำร้องและคำขอออนไลน์</span>
        </nav>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          ระบบยื่นคำร้องและคำขอออนไลน์ (E-Petition)
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 font-light">
          ยื่นคำร้องทักท้วงข้อสอบ ขอทราบคะแนนย่อย หรือขอคืนค่าธรรมเนียมสอบต่อสภาเภสัชกรรม
        </p>
      </div>

      {/* Select Request Type */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {requestOptions.map((opt) => {
          const Icon = opt.icon;
          const isSelected = requestType === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => {
                setRequestType(opt.id);
                setSubmitted(false);
              }}
              className={`p-4 rounded-xl border text-center transition-all ${
                isSelected
                  ? "bg-emerald-800 text-white font-bold shadow-xs border-emerald-800"
                  : "bg-white text-gray-700 border-gray-200 hover:border-emerald-300"
              }`}
            >
              <div className="flex justify-center mb-1.5">
                <Icon className={`w-5 h-5 ${isSelected ? "text-emerald-100" : "text-emerald-700"}`} />
              </div>
              <div className="text-xs">{opt.label}</div>
            </button>
          );
        })}
      </div>

      {/* Form Container */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            <div className="border-b border-gray-100 pb-3">
              <h2 className="text-sm font-bold text-gray-900">
                แบบคำร้อง: {requestType}
              </h2>
              <p className="text-gray-500 font-light mt-0.5">
                กรุณาระบุข้อมูลให้ครบถ้วนเพื่อความรวดเร็วในการตรวจสอบโดยคณะอนุกรรมการศูนย์สอบฯ
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">เลขประจำตัวประชาชน (13 หลัก) *</label>
                <input
                  type="text"
                  required
                  defaultValue="1103701234567"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">ชื่อ - นามสกุล ผู้ยื่นคำร้อง *</label>
                <input
                  type="text"
                  required
                  defaultValue="นายสมชาย ใจดีบริสุทธิ์"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">เบอร์โทรศัพท์ติดต่อ *</label>
                <input
                  type="tel"
                  required
                  defaultValue="089-123-4567"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">อีเมลติดต่อ *</label>
                <input
                  type="email"
                  required
                  defaultValue="somchai.j@example.com"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            {requestType === "ทักท้วงข้อสอบ" && (
              <div className="space-y-4 pt-2 border-t border-gray-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">วิชาที่ต้องการทักท้วง *</label>
                    <select className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600">
                      <option>PLE-CC1 (ความรู้ความสามารถร่วม)</option>
                      <option>PLE-PC1 (บริบาลทางเภสัชกรรม)</option>
                      <option>PLE-IP1 (เภสัชกรรมอุตสาหการ)</option>
                      <option>PLE-CC2 (ทักษะ OSPE)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">ข้อที่ทักท้วง (ระบุเลขข้อ) *</label>
                    <input
                      type="text"
                      placeholder="เช่น ข้อ 42, 78 หรือ ฐานที่ 3"
                      required
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">เหตุผลและเอกสารวิชาการอ้างอิง *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="อธิบายเหตุผลในการทักท้วง เช่น ตัวเลือกมีความกำกวม หรือมีข้อมูลทางการแพทย์/คู่มือแนวทางการรักษาฉบับใหม่..."
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>
            )}

            {requestType === "ขอทราบคะแนน" && (
              <div className="space-y-4 pt-2 border-t border-gray-100">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">รอบการสอบที่ต้องการขอทราบผลคะแนนย่อย *</label>
                  <select className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600">
                    <option>รอบที่ 2/2568 (สอบเมื่อ กรกฎาคม 2568)</option>
                    <option>รอบที่ 1/2568 (สอบเมื่อ มกราคม 2568)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">วัตถุประสงค์ในการขอทราบคะแนน *</label>
                  <input
                    type="text"
                    placeholder="เช่น เพื่อนำไปใช้วางแผนการสอบรอบถัดไป หรือเพื่อตรวจสอบความถูกต้อง"
                    required
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>
            )}

            {requestType === "ขอคืนเงิน" && (
              <div className="space-y-4 pt-2 border-t border-gray-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">ธนาคารสำหรับรับเงินคืน *</label>
                    <input
                      type="text"
                      placeholder="เช่น ธนาคารกรุงไทย"
                      required
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">เลขที่บัญชีเงินฝาก *</label>
                    <input
                      type="text"
                      placeholder="ระบุเลขบัญชีเงินฝาก"
                      required
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600 font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Attachments */}
            <div className="pt-2 border-t border-gray-100">
              <label className="block font-semibold text-gray-700 mb-1">แนบไฟล์หลักฐานประกอบ (PDF หรือ JPG ไม่เกิน 5MB)</label>
              <input
                type="file"
                className="w-full text-xs text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-800 hover:file:bg-emerald-100"
              />
            </div>

            <div className="pt-3 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                ส่งคำร้องต่อสภาเภสัชกรรม
              </button>
            </div>
          </form>
        ) : (
          /* Submission Confirmation */
          <div className="text-center py-8 space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-900">บันทึกคำร้องเข้าสู่ระบบเรียบร้อยแล้ว</h3>
            <p className="text-xs text-gray-600 max-w-md mx-auto leading-relaxed font-light">
              รหัสติดตามคำร้องทางการของท่านคือ <strong className="font-mono text-emerald-900 font-bold">REQ-2569-0418</strong> เจ้าหน้าที่ศูนย์สอบฯ จะดำเนินการตรวจสอบและแจ้งผลกลับตามระเบียบสภาเภสัชกรรม
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="px-3.5 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 rounded-lg border border-emerald-200 hover:bg-emerald-100"
              >
                ยื่นคำร้องฉบับอื่นเพิ่มเติม
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
