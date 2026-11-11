import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CalendarDays,
  Download,
  FileText,
  Info,
  ListChecks,
  Phone,
  ShieldCheck,
} from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import DocumentActions from "@/components/documents/DocumentActions";
import {
  documentItems,
  getDocumentById,
} from "@/data/documents";
import { siteInfo } from "@/data/site";

export const instant = false;

export function generateStaticParams() {
  return documentItems.map((doc) => ({ id: String(doc.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const doc = getDocumentById(Number(id));
  if (!doc) return { title: "ไม่พบเอกสาร" };
  return {
    title: doc.title,
    description: doc.description,
  };
}

export default async function DocumentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doc = getDocumentById(Number(id));
  if (!doc) notFound();

  const related = documentItems
    .filter((item) => item.id !== doc.id && item.category === doc.category)
    .slice(0, 3);

  return (
    <div>
      <PageHeader
        title={doc.title}
        description={doc.description}
        breadcrumbs={[
          { label: "เอกสารและแบบฟอร์ม", href: "/documents" },
          { label: doc.code },
        ]}
        eyebrow={doc.category}
        meta={
          <div className="flex flex-wrap items-center gap-2">
            <span className="badge-green">{doc.code}</span>
            <span className="badge-gray">{doc.fileType}</span>
            <span className="text-xs text-gray-500">
              ปรับปรุงล่าสุด {doc.updated}
            </span>
          </div>
        }
      />

      <div className="container-page grid gap-8 py-10 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-6">
          <section className="card p-6 sm:p-8">
            <div className="grid gap-4 border-b border-gray-200 pb-5 sm:grid-cols-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  รหัสเอกสาร
                </div>
                <div className="mt-1 font-mono text-sm font-bold text-gray-900">
                  {doc.code}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  กลุ่มเอกสาร
                </div>
                <div className="mt-1 text-sm font-semibold text-gray-900">
                  {doc.category}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  จำนวนการเปิดใช้งาน
                </div>
                <div className="mt-1 text-sm font-semibold text-gray-900">
                  {doc.downloads.toLocaleString("th-TH")} ครั้ง
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-bold text-gray-900">
                รายละเอียดเอกสาร
              </h2>
              <p className="mt-2 text-sm leading-7 text-gray-700">
                {doc.description}
              </p>
            </div>

            <div className="mt-6">
              <h2 className="flex items-center gap-2 text-base font-bold text-gray-900">
                <ListChecks className="h-5 w-5 text-emerald-700" />
                เอกสารนี้ประกอบด้วย
              </h2>
              <ul className="mt-3 space-y-2">
                {doc.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 rounded-md border border-gray-100 bg-gray-50 px-4 py-2.5 text-sm text-gray-700"
                  >
                    <FileText className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 rounded-md border border-gray-200 p-4">
              <h2 className="text-base font-bold text-gray-900">
                ผู้อ่านที่เกี่ยวข้อง
              </h2>
              <p className="mt-1 text-sm text-gray-600">{doc.audience}</p>
            </div>

            <div className="mt-6 rounded-md border border-amber-200 bg-amber-50 p-4">
              <div className="flex items-start gap-2.5">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-800" />
                <div className="text-sm leading-6 text-amber-900">
                  <p className="font-semibold">การใช้งานเอกสาร</p>
                  <p className="mt-1">
                    เอกสารในระบบนี้จัดทำเพื่อเผยแพร่ข้อมูลและอำนวยความสะดวกแก่ผู้เข้าสอบ
                    หากต้องการเอกสารฉบับทางการที่ประทับตรา
                    กรุณาติดต่อศูนย์สอบความรู้ฯ หรือดาวน์โหลดจากประกาศฉบับทางการที่เกี่ยวข้อง
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="card p-5 sm:p-6">
            <h2 className="text-base font-bold text-gray-900">
              ขั้นตอนการใช้เอกสาร
            </h2>
            <ol className="mt-3 space-y-3">
              {[
                "พิมพ์เอกสารหรือบันทึกเป็นไฟล์ PDF จากปุ่มด้านขวา",
                "กรอกข้อมูลให้ครบถ้วนและตรวจสอบความถูกต้อง",
                "แนบเอกสารประกอบตามรายการที่กำหนด",
                "ยื่นเอกสารต่อศูนย์สอบฯ ตามช่องทางที่ประกาศกำหนด",
              ].map((step, index) => (
                <li key={step} className="flex gap-3 text-sm text-gray-700">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-bold text-emerald-800">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </section>

          {related.length > 0 && (
            <section className="card p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-base font-bold text-gray-900">
                  เอกสารในกลุ่มเดียวกัน
                </h2>
                <Link
                  href="/documents"
                  className="text-sm font-semibold text-emerald-800 hover:underline"
                >
                  ดูทั้งหมด
                </Link>
              </div>
              <div className="mt-3 divide-y divide-gray-100">
                {related.map((item) => (
                  <Link
                    key={item.id}
                    href={`/documents/${item.id}`}
                    className="group flex items-start justify-between gap-3 py-3"
                  >
                    <span className="flex items-start gap-2">
                      <FileText className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                      <span>
                        <span className="block text-sm font-medium text-gray-900 group-hover:text-emerald-900">
                          {item.title}
                        </span>
                        <span className="mt-0.5 block text-xs text-gray-500">
                          {item.code} · {item.fileType} {item.fileSize}
                        </span>
                      </span>
                    </span>
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-gray-300 group-hover:text-emerald-700" />
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-32 lg:self-start">
          <div className="card p-5">
            <h2 className="text-sm font-bold text-gray-900">เอกสารนี้</h2>
            <div className="mt-3 flex items-center gap-3 rounded-md border border-gray-200 bg-gray-50 p-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-emerald-700 text-white">
                <FileText className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-gray-900">
                  {doc.fileType} · {doc.fileSize}
                </div>
                <div className="text-xs text-gray-500">
                  ปรับปรุง {doc.updated}
                </div>
              </div>
            </div>
            <div className="mt-3">
              <DocumentActions />
            </div>
            <Link
              href="/documents"
              className="mt-2 flex items-center justify-center gap-1.5 rounded-md border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              <Download className="h-4 w-4" />
              กลับไปศูนย์เอกสาร
            </Link>
          </div>

          <div className="card p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold text-gray-900">
              <CalendarDays className="h-4 w-4 text-emerald-700" />
              ข้อมูลเอกสาร
            </h2>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-gray-500">รหัส</dt>
                <dd className="font-mono text-xs font-semibold text-gray-900">
                  {doc.code}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-gray-500">ประเภท</dt>
                <dd className="font-semibold text-gray-900">{doc.fileType}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-gray-500">ขนาด</dt>
                <dd className="text-gray-900">{doc.fileSize}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-gray-500">ปรับปรุง</dt>
                <dd className="text-right text-gray-900">{doc.updated}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold text-emerald-950">
              <ShieldCheck className="h-4 w-4" />
              ต้องการความช่วยเหลือ
            </h2>
            <p className="mt-2 text-sm leading-6 text-emerald-900">
              สอบถามเกี่ยวกับการกรอกหรือยื่นเอกสารได้ในวันและเวลาราชการ
            </p>
            <a
              href={`tel:${siteInfo.phoneHref}`}
              className="mt-2 flex items-center gap-2 text-sm font-semibold text-emerald-900 hover:underline"
            >
              <Phone className="h-4 w-4" />
              {siteInfo.phone}
            </a>
            <Link
              href="/contact"
              className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-emerald-900 hover:underline"
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
