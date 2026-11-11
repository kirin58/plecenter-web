import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  FileText,
  GraduationCap,
  Info,
  Monitor,
  ShieldCheck,
} from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import { getDocumentById } from "@/data/documents";

export const metadata: Metadata = {
  title: "คู่มือการสอบ",
  description:
    "คู่มือการสมัครสอบ การใช้งานระบบ E-Exam การเตรียมตัวสอบทักษะ และแนวปฏิบัติสำหรับผู้เข้าสอบของศูนย์สอบความรู้ฯ สภาเภสัชกรรม",
};

const guideEntries = [
  {
    documentId: 8,
    category: "การสมัครสอบ",
    title: "คู่มือการสมัครสอบด้วยตนเองสำหรับผู้สำเร็จการศึกษาแล้ว",
    description:
      "ขั้นตอนการตรวจสอบคุณสมบัติ การกรอกข้อมูล การแนบเอกสาร และการชำระค่าธรรมเนียมผ่านระบบออนไลน์",
    icon: FileText,
  },
  {
    documentId: 7,
    category: "การสมัครสอบ",
    title: "คู่มือการยื่นสมัครสอบผ่านคณะเภสัชศาสตร์ (คณะส่งสมัคร)",
    description:
      "แนวทางสำหรับคณะเภสัชศาสตร์ในการรวบรวมใบสมัคร ตรวจสอบเอกสาร และส่งข้อมูลตามกำหนดการ",
    icon: GraduationCap,
  },
  {
    documentId: 9,
    category: "ระบบ E-Exam",
    title: "คู่มือการสอบด้วยคอมพิวเตอร์ (E-Exam) สำหรับผู้เข้าสอบ",
    description:
      "การเข้าสู่ระบบ การทำข้อสอบ การปักหมุดทบทวน และการส่งคำตอบ พร้อมแนวทางแก้ไขปัญหาที่พบบ่อย",
    icon: Monitor,
  },
  {
    documentId: 10,
    category: "ระบบ E-Exam",
    title: "ระเบียบและข้อปฏิบัติการสอบ E-Exam",
    description:
      "ระเบียบการเข้าห้องสอบ การใช้อุปกรณ์ และการปฏิบัติตนตลอดระยะเวลาการสอบ",
    icon: ShieldCheck,
  },
  {
    documentId: 12,
    category: "การสอบทักษะ",
    title: "คู่มือทักษะตามเกณฑ์ความรู้ความสามารถทางวิชาชีพ",
    description:
      "รายการทักษะวิชาชีพ เกณฑ์การประเมิน และตัวอย่างสถานการณ์สำหรับการสอบภาคทักษะ",
    icon: BookOpen,
  },
  {
    documentId: 11,
    category: "การสอบทักษะ",
    title: "ระเบียบและข้อปฏิบัติการสอบ PLE-CC2 (OSPE)",
    description:
      "ลำดับการเข้าสถานีสอบ ข้อปฏิบัติระหว่างการสอบ และเกณฑ์การให้คะแนนของกรรมการ",
    icon: ShieldCheck,
  },
];

const categoryOrder = ["การสมัครสอบ", "ระบบ E-Exam", "การสอบทักษะ"];

const categoryDescriptions: Record<string, string> = {
  การสมัครสอบ: "เอกสารและขั้นตอนการยื่นใบสมัครสอบออนไลน์",
  "ระบบ E-Exam": "แนวทางการใช้งานระบบสอบคอมพิวเตอร์และระเบียบที่เกี่ยวข้อง",
  การสอบทักษะ: "การเตรียมความพร้อมสำหรับการสอบภาคทักษะ OSPE และ OSCE",
};

export default function GuidesPage() {
  const groups = categoryOrder.map((category) => ({
    category,
    entries: guideEntries.filter((entry) => entry.category === category),
  }));

  return (
    <div>
      <PageHeader
        title="คู่มือการสอบและสื่อการเรียนรู้"
        description="เอกสารแนะนำและคู่มือการเตรียมตัวสำหรับการสอบความรู้และทักษะวิชาชีพเภสัชกรรมทุกรูปแบบ"
        breadcrumbs={[{ label: "คู่มือการสอบ" }]}
        eyebrow="การสอบ"
        meta={
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <span className="badge-green">คู่มือ {guideEntries.length} รายการ</span>
            <span>ปรับปรุงล่าสุด 1 พฤศจิกายน 2569</span>
          </div>
        }
        actions={
          <Link href="/documents" className="btn-secondary">
            <FileText className="h-4 w-4" />
            เอกสารและแบบฟอร์ม
          </Link>
        }
      />

      <div className="container-page py-8 lg:py-10">
        <div className="notice">
          <Info className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <p className="font-semibold">การเข้าถึงคู่มือฉบับเต็ม</p>
            <p className="mt-1 leading-6">
              คู่มือในหน้านี้เชื่อมโยงไปยังรายละเอียดเอกสารในศูนย์เอกสาร
              ซึ่งสามารถเปิดอ่านและพิมพ์เพื่อการศึกษาได้
              หากต้องการไฟล์ฉบับทางการ กรุณาติดต่อศูนย์สอบฯ
              หรือดาวน์โหลดจากประกาศที่เกี่ยวข้อง
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-6">
          {groups.map((group) => (
            <section key={group.category}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    {group.category}
                  </h2>
                  <p className="mt-0.5 text-sm text-gray-600">
                    {categoryDescriptions[group.category]}
                  </p>
                </div>
                <span className="badge-gray">{group.entries.length} รายการ</span>
              </div>

              <div className="mt-3 grid gap-3 lg:grid-cols-2">
                {group.entries.map((entry) => {
                  const document = getDocumentById(entry.documentId);
                  const Icon = entry.icon;
                  if (!document) return null;
                  return (
                    <article
                      key={entry.documentId}
                      className="card flex flex-col p-5 transition-colors hover:border-emerald-400"
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-emerald-100 bg-emerald-50 text-emerald-700">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="badge-green font-mono text-[0.7rem]">
                              {document.code}
                            </span>
                            <span className="badge-gray">
                              {document.fileType}
                            </span>
                          </div>
                          <h3 className="mt-1.5 text-base font-bold leading-snug text-gray-900">
                            {entry.title}
                          </h3>
                          <p className="mt-1 line-clamp-3 text-sm leading-6 text-gray-600">
                            {entry.description}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-3">
                        <span className="text-xs text-gray-500">
                          {document.fileSize} · ปรับปรุง {document.updated}
                        </span>
                        <Link
                          href={`/documents/${document.id}`}
                          className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-800 hover:underline"
                        >
                          เปิดรายละเอียดคู่มือ
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-8 rounded-lg border border-emerald-200 bg-emerald-50 p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <Monitor className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
              <div>
                <h2 className="text-sm font-bold text-emerald-950">
                  ทดลองใช้งานระบบ E-Exam
                </h2>
                <p className="mt-1 text-sm leading-6 text-emerald-900">
                  ระบบจำลองการสอบช่วยให้ท่านคุ้นเคยกับหน้าจอและขั้นตอนการส่งคำตอบ
                  ก่อนเข้าสอบจริง
                </p>
              </div>
            </div>
            <Link href="/e-exam" className="btn-primary shrink-0 text-sm">
              เปิดระบบทดลองสอบ
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
