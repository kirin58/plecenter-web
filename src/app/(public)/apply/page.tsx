"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ArrowLeft, Printer, CreditCard, GraduationCap, Camera, QrCode, FileText } from "lucide-react";

export default function ApplyPage() {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    nationalId: "1103701234567",
    title: "นาย",
    firstNameTh: "สมชาย",
    lastNameTh: "ใจดีบริสุทธิ์",
    firstNameEn: "Somchai",
    lastNameEn: "Jaideeborisut",
    dob: "2000-05-15",
    phone: "089-123-4567",
    email: "somchai.j@example.com",
    university: "คณะเภสัชศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
    degree: "เภสัชศาสตรบัณฑิต (การบริบาลทางเภสัชกรรม)",
    gradYear: "2567",
    gpa: "3.45",
    // Step 2
    selectedRounds: ["PLE-CC1", "PLE-PC1"],
    venue: "ศูนย์สอบมหาวิทยาลัยธรรมศาสตร์ ศูนย์รังสิต",
    // Step 3
    docIdCard: true,
    docTranscript: true,
    docPhoto: true,
    // Step 4
    paymentMethod: "promptpay",
  });

  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const feePerSubject = 1500;
  const totalFee = formData.selectedRounds.length * feePerSubject;

  const handleCheckboxRound = (code: string) => {
    if (formData.selectedRounds.includes(code)) {
      setFormData({
        ...formData,
        selectedRounds: formData.selectedRounds.filter((c) => c !== code),
      });
    } else {
      setFormData({
        ...formData,
        selectedRounds: [...formData.selectedRounds, code],
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      {/* Header */}
      <div>
        <nav className="text-xs text-gray-500 mb-2 flex items-center gap-1.5">
          <Link href="/" className="hover:text-emerald-800">หน้าแรก</Link>
          <span>/</span>
          <span className="text-emerald-800 font-medium">สมัครสอบออนไลน์</span>
        </nav>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          ระบบสมัครสอบความรู้ทางวิชาชีพเภสัชกรรมออนไลน์
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 font-light">
          ปีการศึกษา 2569 รอบที่ 1 • สมัคร อัปโหลดเอกสาร และชำระเงินผ่านระบบอิเล็กทรอนิกส์
        </p>
      </div>

      {/* Steps Indicator */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          {[
            { num: 1, label: "ข้อมูลผู้สมัคร" },
            { num: 2, label: "เลือกรอบ/วิชาสอบ" },
            { num: 3, label: "แนบเอกสาร" },
            { num: 4, label: "ชำระเงิน/เสร็จสิ้น" },
          ].map((s) => (
            <div
              key={s.num}
              onClick={() => s.num < step && setStep(s.num)}
              className={`p-2.5 rounded-lg transition-all cursor-pointer ${
                step === s.num
                  ? "bg-emerald-700 text-white font-bold shadow-xs"
                  : step > s.num
                  ? "bg-emerald-50 text-emerald-900 font-medium border border-emerald-200"
                  : "bg-gray-50 text-gray-400"
              }`}
            >
              <div className="text-[10px] opacity-80">ขั้นตอนที่ {s.num}</div>
              <div className="truncate text-xs">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs space-y-6">
        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-5">
            <div className="border-b border-gray-100 pb-3">
              <h2 className="text-base font-bold text-gray-900">1. ข้อมูลส่วนบุคคลและการศึกษา</h2>
              <p className="text-xs text-gray-500">กรุณาตรวจสอบความถูกต้องของชื่อ-นามสกุลตามบัตรประจำตัวประชาชน</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">เลขประจำตัวประชาชน (13 หลัก) *</label>
                <input
                  type="text"
                  value={formData.nationalId}
                  onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600 font-mono"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">คำนำหน้าชื่อ *</label>
                <select
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600"
                >
                  <option>นาย</option>
                  <option>นาง</option>
                  <option>นางสาว</option>
                  <option>เภสัชกร</option>
                  <option>เภสัชกรหญิง</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">ชื่อ (ภาษาไทย) *</label>
                <input
                  type="text"
                  value={formData.firstNameTh}
                  onChange={(e) => setFormData({ ...formData, firstNameTh: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">นามสกุล (ภาษาไทย) *</label>
                <input
                  type="text"
                  value={formData.lastNameTh}
                  onChange={(e) => setFormData({ ...formData, lastNameTh: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">First Name (English) *</label>
                <input
                  type="text"
                  value={formData.firstNameEn}
                  onChange={(e) => setFormData({ ...formData, firstNameEn: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Last Name (English) *</label>
                <input
                  type="text"
                  value={formData.lastNameEn}
                  onChange={(e) => setFormData({ ...formData, lastNameEn: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">เบอร์โทรศัพท์มือถือ *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">อีเมลติดต่อ (สำหรับรับแจ้งเตือน) *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100">
              <h3 className="text-xs font-bold text-gray-900 mb-3">สถาบันการศึกษาและวุฒิการศึกษา</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-1">สถาบันที่สำเร็จการศึกษา *</label>
                  <input
                    type="text"
                    value={formData.university}
                    onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">หลักสูตร / สาขาวิชา *</label>
                  <input
                    type="text"
                    value={formData.degree}
                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">ปีที่สำเร็จการศึกษา (พ.ศ.) *</label>
                  <input
                    type="text"
                    value={formData.gradYear}
                    onChange={(e) => setFormData({ ...formData, gradYear: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2 text-xs font-semibold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 shadow-xs flex items-center gap-1.5"
              >
                ถัดไป: เลือกรอบและวิชาสอบ
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="space-y-5">
            <div className="border-b border-gray-100 pb-3">
              <h2 className="text-base font-bold text-gray-900">2. เลือกรอบการสอบและรายวิชา</h2>
              <p className="text-xs text-gray-500">เลือกวิชาที่ประสงค์จะสอบในรอบที่ 1/2569 (ค่าธรรมเนียมวิชาละ 1,500 บาท)</p>
            </div>

            <div className="space-y-3">
              {[
                {
                  code: "PLE-CC1",
                  title: "ความรู้ความสามารถร่วมทางเภสัชกรรม (Core Competency 1)",
                  date: "18 มกราคม 2569 (09:00 - 12:00 น.)",
                  format: "ปรนัย MCQ (150 ข้อ)",
                },
                {
                  code: "PLE-PC1",
                  title: "บริบาลทางเภสัชกรรม (Pharmacy Care Practice 1)",
                  date: "19 มกราคม 2569 (09:00 - 16:30 น.)",
                  format: "ปรนัยประยุกต์กรณีศึกษา",
                },
                {
                  code: "PLE-IP1",
                  title: "เภสัชกรรมอุตสาหการ (Industrial Pharmacy 1)",
                  date: "25 มกราคม 2569 (09:00 - 12:00 น.)",
                  format: "ปรนัยการผลิตและการควบคุมคุณภาพยา",
                },
              ].map((sub) => {
                const checked = formData.selectedRounds.includes(sub.code);
                return (
                  <div
                    key={sub.code}
                    onClick={() => handleCheckboxRound(sub.code)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                      checked
                        ? "bg-emerald-50/70 border-emerald-400 shadow-xs"
                        : "bg-white border-gray-200 hover:border-emerald-200"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {}}
                      className="mt-0.5 h-4 w-4 rounded text-emerald-700 focus:ring-emerald-600 border-gray-300"
                    />
                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-gray-900">{sub.code}: {sub.title}</span>
                        <span className="font-bold text-emerald-800">1,500 บาท</span>
                      </div>
                      <div className="text-gray-500 mt-1">วันจัดสอบ: {sub.date}</div>
                      <div className="text-gray-400">รูปแบบการสอบ: {sub.format}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Venue selection */}
            <div className="pt-3 border-t border-gray-100 space-y-1.5">
              <label className="block text-xs font-bold text-gray-800">เลือกศูนย์สอบและสนามสอบที่ต้องการ *</label>
              <select
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600"
              >
                <option>ศูนย์สอบมหาวิทยาลัยธรรมศาสตร์ ศูนย์รังสิต (กรุงเทพฯ และปริมณฑล)</option>
                <option>ศูนย์สอบมหาวิทยาลัยเชียงใหม่ (ภาคเหนือ)</option>
                <option>ศูนย์สอบมหาวิทยาลัยขอนแก่น (ภาคตะวันออกเฉียงเหนือ)</option>
                <option>ศูนย์สอบมหาวิทยาลัยสงขลานครินทร์ (ภาคใต้)</option>
              </select>
            </div>

            {/* Fee summary */}
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between text-xs">
              <div>
                <span className="text-gray-600">วิชาที่เลือก: </span>
                <span className="font-bold text-emerald-900">{formData.selectedRounds.join(", ") || "ยังไม่ได้เลือก"}</span>
              </div>
              <div className="text-right">
                <span className="text-gray-600">ยอดรวมค่าธรรมเนียม: </span>
                <span className="text-sm font-bold text-emerald-800">{totalFee.toLocaleString()} บาท</span>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs font-medium text-gray-600 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                ย้อนกลับ
              </button>
              <button
                type="button"
                disabled={formData.selectedRounds.length === 0}
                onClick={() => setStep(3)}
                className="px-5 py-2 text-xs font-semibold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 disabled:opacity-50 shadow-xs flex items-center gap-1.5"
              >
                ถัดไป: แนบเอกสารประกอบ
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="space-y-5">
            <div className="border-b border-gray-100 pb-3">
              <h2 className="text-base font-bold text-gray-900">3. อัปโหลดเอกสารประกอบการสมัคร</h2>
              <p className="text-xs text-gray-500">รองรับไฟล์ PDF, JPG, PNG ขนาดไม่เกิน 5 MB ต่อไฟล์</p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-emerald-700 shrink-0" />
                  <div>
                    <div className="font-bold text-gray-900">1. สำเนาบัตรประจำตัวประชาชน *</div>
                    <div className="text-gray-500 text-[11px]">ลงลายมือชื่อรับรองสำเนาถูกต้อง (id_card_somchai.pdf)</div>
                  </div>
                </div>
                <span className="text-emerald-800 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  อัปโหลดแล้ว
                </span>
              </div>

              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-5 h-5 text-emerald-700 shrink-0" />
                  <div>
                    <div className="font-bold text-gray-900">2. ใบรายงานผลการศึกษา (Transcript) หรือหนังสือรับรอง *</div>
                    <div className="text-gray-500 text-[11px]">ออกโดยสถาบันการศึกษา (transcript_chula.pdf)</div>
                  </div>
                </div>
                <span className="text-emerald-800 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  อัปโหลดแล้ว
                </span>
              </div>

              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Camera className="w-5 h-5 text-emerald-700 shrink-0" />
                  <div>
                    <div className="font-bold text-gray-900">3. รูปถ่ายหน้าตรงขนาด 1.5 นิ้ว (ถ่ายไว้ไม่เกิน 6 เดือน) *</div>
                    <div className="text-gray-500 text-[11px]">ภาพสี พื้นหลังสีขาวหรือฟ้าสำหรับบัตรประจำตัวสอบ (photo_formal.jpg)</div>
                  </div>
                </div>
                <span className="text-emerald-800 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  อัปโหลดแล้ว
                </span>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2 text-xs font-medium text-gray-600 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                ย้อนกลับ
              </button>
              <button
                type="button"
                onClick={() => setStep(4)}
                className="px-5 py-2 text-xs font-semibold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 shadow-xs flex items-center gap-1.5"
              >
                ถัดไป: สรุปและชำระเงิน
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <div className="space-y-6">
            {!paymentSuccess ? (
              <>
                <div className="border-b border-gray-100 pb-3">
                  <h2 className="text-base font-bold text-gray-900">4. สรุปข้อมูลและชำระเงินค่าธรรมเนียมสอบ</h2>
                  <p className="text-xs text-gray-500">ชำระผ่านระบบ Thai QR Payment (PromptPay) หรือ Mobile Banking</p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span className="text-gray-500">ชื่อผู้สมัคร:</span>
                    <span className="font-bold text-gray-900">{formData.title}{formData.firstNameTh} {formData.lastNameTh}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">เลขประจำตัวประชาชน:</span>
                    <span className="font-mono text-gray-900">{formData.nationalId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">สนามสอบ:</span>
                    <span className="text-gray-900">{formData.venue}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-2 font-bold text-sm">
                    <span>ยอดชำระสุทธิ ({formData.selectedRounds.join(", ")}):</span>
                    <span className="text-emerald-800">{totalFee.toLocaleString()} บาท</span>
                  </div>
                </div>

                {/* QR Code */}
                <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200 text-center space-y-3 max-w-sm mx-auto">
                  <div className="inline-block px-2.5 py-0.5 bg-emerald-100 text-emerald-900 rounded text-xs font-bold border border-emerald-200">
                    Thai QR Payment / PromptPay
                  </div>
                  
                  <div className="w-40 h-40 mx-auto bg-white p-3 rounded-xl border border-gray-300 flex flex-col items-center justify-center">
                    <QrCode className="w-32 h-32 text-gray-800" />
                  </div>

                  <div className="text-xs space-y-0.5">
                    <div className="font-mono font-bold text-gray-900">REF: PLE2569-008129</div>
                    <div className="text-emerald-800 font-bold text-base">{totalFee.toLocaleString()} บาท</div>
                    <div className="text-gray-500 text-[11px]">สแกนชำระผ่าน Mobile Banking ได้ทุกธนาคาร</div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setPaymentSuccess(true)}
                    className="w-full py-2.5 text-xs font-bold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 shadow-xs transition-colors"
                  >
                    จำลอง: ตรวจสอบการชำระเงินเรียบร้อย
                  </button>
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-4 py-2 text-xs font-medium text-gray-600 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    ย้อนกลับ
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-gray-900">การสมัครสอบเสร็จสมบูรณ์</h3>
                <p className="text-xs text-gray-600 max-w-md mx-auto leading-relaxed">
                  ระบบได้บันทึกข้อมูลการสมัครและการชำระเงินเรียบร้อยแล้ว หมายเลขอ้างอิงประจำตัวผู้สมัครคือ <strong className="font-mono text-emerald-800">PLE2569-008129</strong> ส่งใบเสร็จรับเงินทางอีเมล <strong>{formData.email}</strong> แล้ว
                </p>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-2.5">
                  <Link
                    href="/scores"
                    className="px-4 py-2 text-xs font-semibold text-emerald-900 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100"
                  >
                    ดูบัตรประจำตัวสอบและที่นั่งสอบ
                  </Link>
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs flex items-center gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    พิมพ์ใบเสร็จและใบนัดสอบ
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
