import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  FileText,
  Info,
  Scale,
  ShieldCheck,
} from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import PrintButton from "@/components/ui/PrintButton";
import {
  getRegulationById,
  regulationItems,
} from "@/data/regulations";
import { getDocumentById } from "@/data/documents";

export const instant = false;

export function generateStaticParams() {
  return regulationItems.map((item) => ({ id: String(item.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = getRegulationById(Number(id));
  if (!item) return { title: "ไม่พบระเบียบการสอบ" };
  return {
    title: item.shortTitle,
    description: item.summary,
  };
}

export default async function RegulationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = getRegulationById(Number(id));
  if (!item) notFound();

  const relatedDocument = item.relatedDocumentId
    ? getDocumentById(item.relatedDocumentId)
    : null;

  return (
    <div>
      <PageHeader
        title={item.shortTitle}
        description={item.summary}
        breadcrumbs={[
          { label: "ระเบียบและเกณฑ์การสอบ", href: "/regulations" },
          { label: item.code },
        ]}
        eyebrow={item.category}
        meta={
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500">
            <span className="badge-green font-mono">{item.code}</span>
            <span className="flex items-center gap-1">
              <CalendarDays className="h-3.5 w-3.5" />
              ปรับปรุง {item.updated}
            </span>
            <span>{item.authority}</span>
          </div>
        }
        actions={
          <Link href="/regulations" className="btn-secondary">
            <ArrowLeft className="h-4 w-4" />
            กลับรายการระเบียบ
          </Link>
        }
      />

      <div className="container-page grid gap-8 py-10 lg:grid-cols-[1fr_20rem]">
        <article>
          <div className="card p-6 sm:p-9">
            <div className="notice">
              <Info className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p className="font-semibold">สรุปสาระสำคัญของระเบียบและเกณฑ์</p>
                <p className="mt-1 text-sm leading-6">
                  เนื้อหานี้เรียบเรียงเพื่อให้ผู้เข้าสอบเข้าใจเกณฑ์การประเมิน
                  โดยยึดถือข้อบังคับและประกาศฉบับทางการของสภาเภสัชกรรมเป็นหลัก
                </p>
              </div>
            </div>

            <section className="prose-official mt-6">
              <h2>ขอบเขตการบังคับใช้</h2>
              <p>{item.scope}</p>

              <h2>โครงสร้างสมรรถนะที่ประเมิน</h2>
              <div className="not-prose mt-3 overflow-x-auto">
                <table className="table-official">
                  <thead>
                    <tr>
                      <th scope="col">หมวดสมรรถนะ</th>
                      <th scope="col" className="w-24 text-center">
                        สัดส่วน
                      </th>
                      <th scope="col">รายละเอียด</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.sections.map((section) => (
                      <tr key={section.title}>
                        <td className="font-medium text-gray-900">
                          {section.title}
                        </td>
                        <td className="text-center font-mono font-semibold text-emerald-800">
                          {section.weight ?? "—"}
                        </td>
                        <td className="text-gray-700">
                          {section.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2>เกณฑ์การตัดสินผล</h2>
              <ul>
                {item.criteria.map((criterion) => (
                  <li key={criterion}>{criterion}</li>
                ))}
              </ul>
            </section>

            <div className="mt-8 border-t border-gray-200 pt-5">
              <div className="flex flex-wrap gap-2">
                <PrintButton label="พิมพ์ / บันทึกเป็น PDF" />
                <Link href="/documents" className="btn-secondary">
                  <FileText className="h-4 w-4" />
                  เอกสารและแบบฟอร์ม
                </Link>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                การพิมพ์หน้านี้จะแสดงเฉพาะเนื้อหาหลักของหน้า
                ไม่รวมเมนูเว็บไซต์
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-5">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
              <div>
                <h2 className="text-sm font-bold text-amber-950">
                  ข้อควรระวังก่อนการใช้งาน
                </h2>
                <p className="mt-1 text-sm leading-6 text-amber-900">
                  เกณฑ์การประเมินอาจมีการปรับปรุงตามประกาศของสภาเภสัชกรรม
                  ผู้เข้าสอบควรตรวจสอบประกาศฉบับล่าสุดก่อนการสมัครสอบและก่อนวันสอบทุกครั้ง
                </p>
              </div>
            </div>
          </div>
        </article>

        <aside className="space-y-4 lg:sticky lg:top-32 lg:self-start">
          <div className="card p-5">
            <h2 className="text-sm font-bold text-gray-900">ข้อมูลเอกสาร</h2>
            <dl className="mt-3 space-y-2.5 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-gray-500">หมวดเอกสาร</dt>
                <dd className="text-right font-semibold text-gray-900">
                  {item.category}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-gray-500">รหัสเอกสาร</dt>
                <dd className="text-right font-mono text-xs font-semibold text-gray-900">
                  {item.code}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-gray-500">ปรับปรุงล่าสุด</dt>
                <dd className="text-right text-gray-900">{item.updated}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-gray-500">ผู้ออกประกาศ</dt>
                <dd className="text-right text-gray-900">{item.authority}</dd>
              </div>
            </dl>
          </div>

          {relatedDocument && (
            <div className="card p-5">
              <h2 className="flex items-center gap-2 text-sm font-bold text-gray-900">
                <FileText className="h-4 w-4 text-emerald-700" />
                เอกสารที่เกี่ยวข้อง
              </h2>
              <Link
                href={`/documents/${relatedDocument.id}`}
                className="group mt-3 block"
              >
                <span className="block text-sm font-semibold leading-snug text-gray-900 group-hover:text-emerald-800">
                  {relatedDocument.title}
                </span>
                <span className="mt-1 block text-xs text-gray-500">
                  {relatedDocument.code} · {relatedDocument.fileType} ·{" "}
                  {relatedDocument.fileSize}
                </span>
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-emerald-800 group-hover:underline">
                  เปิดรายละเอียด
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          )}

          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold text-emerald-950">
              <BookOpen className="h-4 w-4" />
              เอกสารประกอบการเตรียมสอบ
            </h2>
            <div className="mt-3 space-y-2 text-sm">
              <Link
                href="/sample-exams"
                className="flex items-center justify-between gap-2 font-semibold text-emerald-900 hover:underline"
              >
                คลังตัวอย่างข้อสอบ
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/calendar"
                className="flex items-center justify-between gap-2 font-semibold text-emerald-900 hover:underline"
              >
                ปฏิทินและกำหนดการสอบ
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/apply"
                className="flex items-center justify-between gap-2 font-semibold text-emerald-900 hover:underline"
              >
                สมัครสอบออนไลน์
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="card p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold text-gray-900">
              <Scale className="h-4 w-4 text-emerald-700" />
              สอบถามระเบียบการสอบ
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              ติดต่อเจ้าหน้าที่ศูนย์สอบฯ ในวันและเวลาราชการ
              เพื่อขอคำแนะนำเกี่ยวกับการตีความระเบียบ
            </p>
            <Link
              href="/contact"
              className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-emerald-800 hover:underline"
            >
              ติดต่อศูนย์สอบฯ
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
