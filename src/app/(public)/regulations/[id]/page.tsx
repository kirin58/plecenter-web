import Link from "next/link";
import { Download, ArrowLeft, BookOpen, FileText } from "lucide-react";

interface RegulationDetailProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }, { id: "6" }, { id: "7" }];
}

export default async function RegulationDetailPage({ params }: RegulationDetailProps) {
  const { id } = await params;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-500 flex items-center gap-1.5">
        <Link href="/" className="hover:text-emerald-800">หน้าแรก</Link>
        <span>/</span>
        <Link href="/regulations" className="hover:text-emerald-800">ระเบียบและหลักเกณฑ์</Link>
        <span>/</span>
        <span className="text-emerald-900 font-medium">เกณฑ์สมรรถนะ PLE-CC1</span>
      </nav>

      {/* Content Card */}
      <div className="bg-white p-6 sm:p-10 rounded-2xl border border-gray-200 shadow-xs space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-mono font-bold text-xs">
              PLE-CC1
            </span>
            <span className="text-xs text-gray-500">เกณฑ์ความรู้ความสามารถร่วมทางเภสัชกรรม (ฉบับรับรองปี 2568)</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
            เกณฑ์สมรรถนะและขอบเขตข้อสอบความรู้ความสามารถร่วม (PLE-CC1)
          </h1>
        </div>

        {/* Breakdown */}
        <div className="text-sm text-gray-700 leading-relaxed space-y-4 pt-4 border-t border-gray-100 font-light">
          <p>
            การสอบ PLE-CC1 มุ่งเน้นการประเมินความรู้พื้นฐานและสมรรถนะร่วมที่จำเป็นสำหรับการประกอบวิชาชีพเภสัชกรรมในทุกสาขา โดยมีโครงสร้างข้อสอบแบ่งตามหมวดหมู่ดังนี้:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs space-y-1">
              <div className="font-bold text-gray-900 text-sm">หมวดที่ 1: เภสัชวิทยาและเภสัชบำบัดพื้นฐาน (35%)</div>
              <p className="text-gray-600 font-light">กลไกการออกฤทธิ์ อาการข้างเคียง อันตรกิริยาระหว่างยา และขนาดยาที่เหมาะสม</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs space-y-1">
              <div className="font-bold text-gray-900 text-sm">หมวดที่ 2: เภสัชภัณฑ์และการส่งมอบยา (25%)</div>
              <p className="text-gray-600 font-light">รูปแบบเภสัชภัณฑ์ ความคงตัว การผสมยา และการจ่ายยาตามใบสั่งแพทย์</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs space-y-1">
              <div className="font-bold text-gray-900 text-sm">หมวดที่ 3: กฎหมายและจริยธรรมวิชาชีพ (20%)</div>
              <p className="text-gray-600 font-light">พ.ร.บ. ยา, พ.ร.บ. วิชาชีพเภสัชกรรม, จริยธรรมและสิทธิผู้ป่วย</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs space-y-1">
              <div className="font-bold text-gray-900 text-sm">หมวดที่ 4: เภสัชระบาดวิทยาและการจัดการระบบยา (20%)</div>
              <p className="text-gray-600 font-light">การใช้ยาอย่างสมเหตุผล (RDU), การเฝ้าระวังความปลอดภัย, ระบบสาธารณสุข</p>
            </div>
          </div>

          <h3 className="text-sm font-bold text-gray-900 pt-2">เกณฑ์การตัดสินผ่านการสอบ</h3>
          <p>
            ผู้สอบต้องได้คะแนนรวมไม่น้อยกว่าร้อยละ 60.00 และต้องมีคะแนนในแต่ละหมวดไม่น้อยกว่าเกณฑ์ขั้นต่ำตามที่คณะอนุกรรมการกำหนด
          </p>
        </div>

        {/* PDF Download bar */}
        <div className="pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/sample-exams"
            className="text-xs font-semibold text-emerald-800 hover:underline flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            ดูตัวอย่างข้อสอบวิชานี้ (Sample Exam)
          </Link>
          <a
            href="#download-doc"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            ดาวน์โหลดเอกสารเกณฑ์ฉบับเต็ม (PDF 3.8 MB)
          </a>
        </div>
      </div>
    </div>
  );
}
