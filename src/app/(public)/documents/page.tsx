import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  FileText,
  Info,
  Search,
  ShieldCheck,
} from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import {
  documentCategories,
  documentItems,
} from "@/data/documents";

export const metadata: Metadata = {
  title: "เอกสารและแบบฟอร์ม",
  description:
    "แบบฟอร์มคำขอ คู่มือการสอบ ระเบียบ และเอกสารประกอบการสมัครสอบของศูนย์สอบความรู้ฯ สภาเภสัชกรรม",
};

export const instant = false;

type DocumentsSearchParams = {
  category?: string;
  q?: string;
};

function buildQuery(category: string, q: string) {
  const params = new URLSearchParams();
  if (category !== "ทั้งหมด") params.set("category", category);
  if (q) params.set("q", q);
  const query = params.toString();
  return query ? `/documents?${query}` : "/documents";
}

export default async function DocumentsPage({
  searchParams,
}: {
  searchParams: Promise<DocumentsSearchParams>;
}) {
  const params = await searchParams;
  const selectedCategory = documentCategories.includes(
    (params.category ?? "ทั้งหมด") as (typeof documentCategories)[number],
  )
    ? (params.category ?? "ทั้งหมด")
    : "ทั้งหมด";
  const query = (params.q ?? "").trim().toLowerCase();

  const filtered = documentItems.filter((doc) => {
    const matchCategory =
      selectedCategory === "ทั้งหมด" || doc.category === selectedCategory;
    const matchQuery =
      !query ||
      [doc.title, doc.code, doc.description, doc.category]
        .join(" ")
        .toLowerCase()
        .includes(query);
    return matchCategory && matchQuery;
  });

  const grouped = documentCategories
    .filter((category) => category !== "ทั้งหมด")
    .map((category) => ({
      category,
      items: filtered.filter((doc) => doc.category === category),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div>
      <PageHeader
        title="เอกสารและแบบฟอร์ม"
        description="รวมแบบฟอร์มคำขอ คู่มือการสอบ ระเบียบการสอบ และเอกสารประกอบการสมัครสอบ โดยเปิดดูรายละเอียดและพิมพ์เอกสารได้จากหน้ารายการ"
        breadcrumbs={[{ label: "เอกสารและแบบฟอร์ม" }]}
        eyebrow="บริการออนไลน์"
        meta={
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <span className="badge-green">
              เอกสารทั้งหมด {documentItems.length} รายการ
            </span>
            <span>ปรับปรุงล่าสุด 1 พฤศจิกายน 2569</span>
          </div>
        }
        actions={
          <Link href="/requests" className="btn-secondary">
            <ShieldCheck className="h-4 w-4" />
            ยื่นคำร้องออนไลน์
          </Link>
        }
      />

      <div className="container-page py-8 lg:py-10">
        <div className="notice">
          <Info className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <p className="font-semibold">การใช้งานเอกสาร</p>
            <p className="mt-1 leading-6">
              เอกสารในระบบนี้เป็นตัวอย่างเพื่ออำนวยความสะดวกในการค้นหาและตรวจสอบรายละเอียด
              หากต้องการเอกสารฉบับทางการที่ประทับตรา กรุณาติดต่อศูนย์สอบฯ
              หรือดาวน์โหลดจากประกาศฉบับทางการที่เกี่ยวข้อง
            </p>
          </div>
        </div>

        <div className="card mt-5 p-4 sm:p-5">
          <form
            action="/documents"
            method="get"
            role="search"
            className="flex flex-col gap-2 sm:flex-row"
          >
            {selectedCategory !== "ทั้งหมด" && (
              <input type="hidden" name="category" value={selectedCategory} />
            )}
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
              <input
                type="search"
                name="q"
                defaultValue={params.q ?? ""}
                placeholder="ค้นหาชื่อเอกสาร รหัสเอกสาร หรือรายละเอียด"
                aria-label="ค้นหาเอกสารและแบบฟอร์ม"
                className="input pl-10"
              />
            </div>
            <button type="submit" className="btn-primary shrink-0">
              ค้นหาเอกสาร
            </button>
          </form>

          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <span className="mr-1 text-xs font-semibold text-gray-500">
              กลุ่มเอกสาร
            </span>
            {documentCategories.map((category) => {
              const active = selectedCategory === category;
              return (
                <Link
                  key={category}
                  href={buildQuery(category, params.q ?? "")}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                    active
                      ? "border-emerald-700 bg-emerald-700 text-white"
                      : "border-gray-200 bg-gray-50 text-gray-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
                  }`}
                >
                  {category}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm text-gray-600">
          <p>
            พบเอกสาร{" "}
            <span className="font-bold text-emerald-800">
              {filtered.length}
            </span>{" "}
            รายการ
          </p>
          {(query || selectedCategory !== "ทั้งหมด") && (
            <Link
              href="/documents"
              className="font-semibold text-emerald-800 hover:underline"
            >
              ล้างตัวกรอง
            </Link>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-4 rounded-lg border border-gray-200 bg-white p-12 text-center">
            <Info className="mx-auto h-8 w-8 text-gray-400" />
            <h2 className="mt-3 text-base font-bold text-gray-900">
              ไม่พบเอกสารที่ตรงกับเงื่อนไข
            </h2>
            <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-gray-600">
              ลองใช้คำค้นที่สั้นลง เปลี่ยนกลุ่มเอกสาร
              หรือดูรายการเอกสารทั้งหมด
            </p>
            <Link href="/documents" className="btn-secondary mt-4 text-sm">
              ดูเอกสารทั้งหมด
            </Link>
          </div>
        ) : (
          <div className="mt-4 space-y-6">
            {grouped.map((group) => (
              <section key={group.category}>
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-lg font-bold text-gray-900">
                    {group.category}
                  </h2>
                  <span className="badge-gray">{group.items.length} รายการ</span>
                </div>
                <div className="mt-3 divide-y divide-gray-100 overflow-hidden rounded-lg border border-gray-200 bg-white">
                  {group.items.map((doc) => (
                    <Link
                      key={doc.id}
                      href={`/documents/${doc.id}`}
                      className="group flex flex-col gap-3 px-4 py-4 transition-colors hover:bg-emerald-50/40 sm:flex-row sm:items-center sm:justify-between sm:px-5"
                    >
                      <div className="flex min-w-0 items-start gap-3">
                        <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-700">
                          <FileText className="h-5 w-5" />
                        </span>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-[0.7rem] font-semibold text-emerald-800">
                              {doc.code}
                            </span>
                            <span className="badge-gray">{doc.fileType}</span>
                          </div>
                          <h3 className="mt-1 text-sm font-semibold leading-snug text-gray-900 group-hover:text-emerald-900">
                            {doc.title}
                          </h3>
                          <p className="mt-1 line-clamp-1 text-xs text-gray-500">
                            {doc.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center justify-between gap-3 border-t border-gray-100 pt-2 text-xs text-gray-500 sm:border-0 sm:pt-0">
                        <span>
                          {doc.fileType} · {doc.fileSize}
                          <span className="mx-1.5 text-gray-300">|</span>
                          ปรับปรุง {doc.updated}
                        </span>
                        <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-emerald-700" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 rounded-lg border border-gray-200 bg-gray-50 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-bold text-gray-900">
              ต้องการยื่นคำร้องหรือคำขอออนไลน์
            </h2>
            <p className="mt-0.5 text-sm text-gray-600">
              ทักท้วงข้อสอบ ขอทราบคะแนน หรือขอคืนค่าธรรมเนียม
              โดยไม่ต้องพิมพ์เอกสารกระดาษ
            </p>
          </div>
          <Link href="/requests" className="btn-primary shrink-0 text-sm">
            ไปยังระบบยื่นคำร้อง
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
