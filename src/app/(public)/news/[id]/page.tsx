import Link from "next/link";
import { FileText, MapPin, AlertCircle, Calendar, Eye, Download, ArrowLeft } from "lucide-react";

interface NewsDetailProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }, { id: "6" }];
}

export default async function NewsDetailPage({ params }: NewsDetailProps) {
  const { id } = await params;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-500 flex items-center gap-1.5">
        <Link href="/" className="hover:text-emerald-800">หน้าแรก</Link>
        <span>/</span>
        <Link href="/news" className="hover:text-emerald-800">ข่าวสารและประกาศ</Link>
        <span>/</span>
        <span className="text-emerald-900 font-medium">ประกาศศูนย์สอบฯ ฉบับที่ 12/2569</span>
      </nav>

      {/* Article Header */}
      <div className="bg-white p-6 sm:p-10 rounded-2xl border border-gray-200 shadow-xs space-y-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-medium">
              ประกาศสอบ
            </span>
            <span className="text-gray-300">|</span>
            <span className="text-gray-500 text-[11px] flex items-center gap-1">
              <Calendar className="w-3 h-3 text-gray-400" />
              8 พฤศจิกายน 2568
            </span>
            <span className="text-gray-300">|</span>
            <span className="text-gray-500 text-[11px] flex items-center gap-1">
              <Eye className="w-3 h-3 text-gray-400" />
              2,410 ครั้ง
            </span>
            <span className="text-gray-300">|</span>
            <span className="text-gray-500 font-mono text-[11px]">รหัสเอกสาร: PLE-ANN-2569-012</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight leading-snug">
            ประกาศศูนย์สอบฯ ฉบับที่ 12/2569 เรื่อง กำหนดการและสถานที่จัดสอบ PLE-CC1 ครั้งที่ 1/2569
          </h1>
        </div>

        {/* Content Body */}
        <div className="text-sm text-gray-700 leading-relaxed space-y-4 pt-4 border-t border-gray-100 font-light">
          <p>
            ด้วยศูนย์สอบความรู้และทักษะทางวิชาชีพเภสัชกรรม (ศูนย์สอบฯ) สภาเภสัชกรรม จะดำเนินการจัดสอบความรู้ความสามารถร่วมทางเภสัชกรรม (Pharmacy Licensure Examination - Core Competency 1: PLE-CC1) ครั้งที่ 1 ประจำปี พ.ศ. 2569 เพื่อให้เป็นไปตามข้อบังคับสภาเภสัชกรรมว่าด้วยการขึ้นทะเบียนและรับใบอนุญาตเป็นผู้ประกอบวิชาชีพเภสัชกรรม
          </p>
          
          <h3 className="text-sm font-bold text-gray-900 pt-2">1. กำหนดวันและเวลาสอบ</h3>
          <p>
            วันเสาร์ที่ 18 มกราคม พ.ศ. 2569 เวลา 09:00 - 12:00 น. (ระยะเวลาสอบ 3 ชั่วโมง ข้อสอบแบบปรนัย จำนวน 150 ข้อ)
          </p>

          <h3 className="text-sm font-bold text-gray-900 pt-2">2. ศูนย์สอบและสนามสอบที่เปิดให้บริการ</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>ศูนย์สอบกรุงเทพฯ และปริมณฑล:</strong> มหาวิทยาลัยธรรมศาสตร์ ศูนย์รังสิต อาคารเรียนรวม SC3 ชั้น 2-4</li>
            <li><strong>ศูนย์สอบภาคเหนือ:</strong> มหาวิทยาลัยเชียงใหม่ อาคาร 50 ปี คณะเภสัชศาสตร์</li>
            <li><strong>ศูนย์สอบภาคตะวันออกเฉียงเหนือ:</strong> มหาวิทยาลัยขอนแก่น คณะเภสัชศาสตร์ อาคาร 1</li>
            <li><strong>ศูนย์สอบภาคใต้:</strong> มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่ คณะเภสัชศาสตร์</li>
          </ul>

          <h3 className="text-sm font-bold text-gray-900 pt-2">3. สิ่งของและหลักฐานที่ต้องนำมาในวันสอบ</h3>
          <ol className="list-decimal pl-5 space-y-1">
            <li>บัตรประจำตัวประชาชนฉบับจริง หรือหนังสือเดินทาง (Passport) ที่ยังไม่หมดอายุ</li>
            <li>บัตรประจำตัวผู้สอบ (พิมพ์จากระบบรับสมัครสอบออนไลน์ พร้อมติดรูปถ่ายตามเกณฑ์)</li>
            <li>ดินสอดำ 2B, ยางลบดินสอ, ปากกาลูกลื่นสีน้ำเงินหรือดำ</li>
          </ol>

          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-950 text-xs leading-relaxed space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-xs text-amber-950">
              <AlertCircle className="w-4 h-4 text-amber-800" />
              ข้อควรระวังและระเบียบห้องสอบ
            </div>
            <p>
              ผู้เข้าสอบที่มาถึงห้องสอบช้ากว่าเวลาเริ่มสอบ 15 นาที จะไม่ได้รับอนุญาตให้เข้าห้องสอบโดยเด็ดขาด และห้ามนำอุปกรณ์สื่อสาร เครื่องคิดเลข (ยกเว้นรุ่นที่สภาฯ กำหนด) หรืออุปกรณ์อิเล็กทรอนิกส์ทุกชนิดเข้าห้องสอบ
            </p>
          </div>
        </div>

        {/* Download Attachments Section */}
        <div className="pt-6 border-t border-gray-100 space-y-3">
          <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
            เอกสารแนบท้ายประกาศฉบับทางการ
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href="#pdf-download"
              className="p-3.5 rounded-xl bg-gray-50 hover:bg-emerald-50/50 border border-gray-200 hover:border-emerald-300 flex items-center justify-between transition-colors group"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-emerald-800 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-gray-900 group-hover:text-emerald-800">
                    ประกาศศูนย์สอบฯ ฉบับที่ 12/2569 (ฉบับสมบูรณ์)
                  </div>
                  <div className="text-[11px] text-gray-500 font-mono">PDF • 1.4 MB • ประทับตราสภาฯ</div>
                </div>
              </div>
              <Download className="w-4 h-4 text-emerald-700" />
            </a>
            
            <a
              href="#seating-download"
              className="p-3.5 rounded-xl bg-gray-50 hover:bg-emerald-50/50 border border-gray-200 hover:border-emerald-300 flex items-center justify-between transition-colors group"
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-emerald-800 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-gray-900 group-hover:text-emerald-800">
                    ผังอาคารและแผนที่การเดินทาง มธ.รังสิต
                  </div>
                  <div className="text-[11px] text-gray-500 font-mono">PDF • 890 KB</div>
                </div>
              </div>
              <Download className="w-4 h-4 text-emerald-700" />
            </a>
          </div>
        </div>

        {/* Action button bar */}
        <div className="pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">การเผยแพร่:</span>
            <button className="px-2.5 py-1 text-xs rounded border border-gray-200 hover:bg-gray-50 text-gray-700">
              คัดลอกลิงก์
            </button>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/scores"
              className="px-4 py-2 text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors"
            >
              ตรวจสอบเลขที่นั่งสอบ
            </Link>
            <Link
              href="/apply"
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors"
            >
              ไปยังระบบสมัครสอบ
            </Link>
          </div>
        </div>
      </div>

      {/* Back button */}
      <div>
        <Link
          href="/news"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          กลับสู่หน้ารายการข่าวสารและประกาศ
        </Link>
      </div>
    </div>
  );
}
