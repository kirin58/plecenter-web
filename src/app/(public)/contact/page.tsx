"use client";

import { useState } from "react";
import Link from "next/link";
import { Building2, MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare, Globe } from "lucide-react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <nav className="text-xs text-gray-500 mb-2 flex items-center gap-1.5">
          <Link href="/" className="hover:text-emerald-800">หน้าแรก</Link>
          <span>/</span>
          <span className="text-emerald-800 font-medium">ติดต่อเรา</span>
        </nav>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          ติดต่อศูนย์สอบความรู้ฯ สภาเภสัชกรรม
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 font-light">
          สอบถามข้อมูลการสอบ สมัครสอบ ขอรับเอกสาร หรือติดต่อเจ้าหน้าที่ศูนย์สอบฯ ตามวันและเวลาทำการ
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Contact Info & Channels */}
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs space-y-5">
            <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
              <Building2 className="w-4 h-4 text-emerald-800" />
              ที่ทำการสภาเภสัชกรรม (ศูนย์สอบความรู้ฯ)
            </h2>

            <div className="space-y-3.5 text-xs text-gray-600 font-light">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-900">สถานที่ตั้ง</div>
                  <div className="leading-relaxed mt-0.5">
                    อาคาร 6 ชั้น 7 ซอยสาธารณสุข 8 กระทรวงสาธารณสุข<br />
                    ถนนติวานนท์ ตำบลตลาดขวัญ อำเภอเมือง จังหวัดนนทบุรี 11000
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-800 shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900">หมายเลขโทรศัพท์</div>
                  <div className="font-mono text-emerald-900 font-medium">0-2591-9992 ถึง 5 (คู่สายอัตโนมัติ)</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-800 shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900">จดหมายอิเล็กทรอนิกส์ (Email)</div>
                  <div className="font-mono text-emerald-900 font-medium">plecenter@pharmacycouncil.org</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-emerald-800 shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900">เวลาทำการราชการ</div>
                  <div>วันจันทร์ - วันศุกร์: 08:30 - 16:30 น. (เว้นวันหยุดราชการและวันนักขัตฤกษ์)</div>
                </div>
              </div>
            </div>

            {/* Official communication channels */}
            <div className="pt-3 border-t border-gray-100 space-y-2">
              <div className="text-xs font-bold text-gray-900">ช่องทางการสื่อสารอิเล็กทรอนิกส์</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-200 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-800" />
                  <div>
                    <div className="font-semibold text-gray-900">LINE Official</div>
                    <div className="text-[11px] text-gray-500 font-mono">@plecenter</div>
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-200 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-emerald-800" />
                  <div>
                    <div className="font-semibold text-gray-900">เว็บไซต์ทางการ</div>
                    <div className="text-[11px] text-gray-500">pharmacycouncil.org</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs space-y-5">
          <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
            <Mail className="w-4 h-4 text-emerald-800" />
            ส่งข้อความสอบถามถึงเจ้าหน้าที่ศูนย์สอบฯ
          </h2>

          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">ชื่อ - นามสกุล ของท่าน *</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น นายรักเรียน มุ่งมั่น"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">อีเมลติดต่อกลับ *</label>
                  <input
                    type="email"
                    required
                    placeholder="email@example.com"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">เบอร์โทรศัพท์ติดต่อ</label>
                  <input
                    type="tel"
                    placeholder="08X-XXX-XXXX"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">หมวดหมู่เรื่องที่ติดต่อ *</label>
                <select className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600">
                  <option>สอบถามการสมัครสอบและการชำระเงิน</option>
                  <option>สอบถามเรื่องสนามสอบและที่นั่งสอบ</option>
                  <option>การใช้งานระบบสอบคอมพิวเตอร์ E-Exam</option>
                  <option>การขอรับรองผลคะแนนหรือหนังสือรับรอง</option>
                  <option>ปัญหาทางเทคนิคและการเข้าสู่ระบบ</option>
                  <option>เรื่องอื่นๆ</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">รายละเอียดข้อความ *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="พิมพ์ข้อความที่ต้องการสอบถามหรือแจ้งปัญหา..."
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                ส่งข้อความสอบถาม
              </button>
            </form>
          ) : (
            <div className="text-center py-8 space-y-2.5">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-gray-900">ส่งข้อความเรียบร้อยแล้ว</h3>
              <p className="text-xs text-gray-500 max-w-xs mx-auto font-light">
                เจ้าหน้าที่ศูนย์สอบฯ จะดำเนินการตรวจสอบและติดต่อกลับตามข้อมูลที่ท่านระบุไว้
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="text-xs font-semibold text-emerald-800 hover:underline pt-1"
              >
                ส่งข้อความฉบับอื่น
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
