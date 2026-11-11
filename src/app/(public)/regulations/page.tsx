import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Info,
  Scale,
  Search,
  ShieldCheck,
} from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import {
  regulationCategories,
  regulationItems,
} from "@/data/regulations";

export const metadata: Metadata = {
  title: "ระเบียบและเกณฑ์การสอบ",
  description:
    "ข้อบังคับ ระเบียบ และเกณฑ์สมรรถนะการสอบความรู้และทักษะทางวิชาชีพเภสัชกรรม แยกตามรายวิชาและสาขาวิชาชีพ",
};

export const instant = false;

type RegulationsSearchParams = {
  category?: string;
  q?: string;
};

function buildQuery(category: string, q: string) {
  const params = new URLSearchParams();
  if (category !== "ทั้งหมด") params.set("category", category);
  if (q) params.set("q", q);
  const query = params.toString();
  return query ? `/regulations?${query}` : "/regulations";
}

export default async function RegulationsPage({
  searchParams,
}: {
  searchParams: Promise<RegulationsSearchParams>;
}) {
  const params = await searchParams;
  const selectedCategory = regulationCategories.includes(
    (params.category ?? "ทั้งหมด") as (typeof regulationCategories)[number],
  )
    ? (params.category ?? "ทั้งหมด")
    : "ทั้งหมด";
  const query = (params.q ?? "").trim().toLowerCase();

  const filtered = regulationItems.filter((item) => {
    const matchCategory =
      selectedCategory === "ทั้งหมด" || item.category === selectedCategory;
    const matchQuery =
      !query ||
      [item.title, item.summary, item.code, item.category, item.scope]
        .join(" ")
        .toLowerCase()
        .includes(query);
    return matchCategory && matchQuery;
  });

  const grouped = regulationCategories
    .filter((category) => category !== "ทั้งหมด")
    .map((category) => ({
      category,
      items: filtered.filter((item) => item.category === category),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div>
      <PageHeader
        title="ระเบียบและเกณฑ์การสอบ"
        description="เอกสารข้อบังคับ เกณฑ์ความรู้ความสามารถ และขอบเขตสมรรถนะแยกตามสาขาวิชาชีพ เพื่อให้ผู้เข้าสอบเตรียมความพร้อมได้อย่างถูกต้อง"
        breadcrumbs={[{ label: "ระเบียบและเกณฑ์การสอบ" }]}
        eyebrow="การสอบ"
        meta={
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <span className="badge-green">
              ระเบียบและเกณฑ์ {regulationItems.length} ฉบับ
            </span>
            <span>ปรับปรุงล่าสุด 1 พฤศจิกายน 2569</span>
          </div>
        }
        actions={
          <Link href="/documents" className="btn-secondary">
            <BookOpen className="h-4 w-4" />
            เอกสารและแบบฟอร์ม
          </Link>
        }
      />

      <div className="container-page py-8 lg:py-10">
        <div className="notice">
          <Info className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <p className="font-semibold">การอ้างอิงเอกสารทางราชการ</p>
            <p className="mt-1 leading-6">
              เนื้อหาบนหน้านี้เป็นสรุปเพื่อให้ผู้เข้าสอบเข้าใจโครงสร้างและเกณฑ์การประเมิน
              หากต้องการเอกสารฉบับทางการที่ประทับตรา กรุณาติดต่อศูนย์สอบฯ
              หรือดาวน์โหลดจากประกาศฉบับทางการที่เผยแพร่ร่วมกับหนังสือราชการ
            </p>
          </div>
        </div>

        <div className="card mt-5 p-4 sm:p-5">
          <form
            action="/regulations"
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
                placeholder="ค้นหารหัสวิชา หมวดสมรรถนะ หรือหัวข้อเกณฑ์"
                aria-label="ค้นหาระเบียบและเกณฑ์การสอบ"
                className="input pl-10"
              />
            </div>
            <button type="submit" className="btn-primary shrink-0">
              ค้นหา
            </button>
          </form>

          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <span className="mr-1 text-xs font-semibold text-gray-500">
              หมวดเอกสาร
            </span>
            {regulationCategories.map((category) => {
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
            พบระเบียบและเกณฑ์{" "}
            <span className="font-bold text-emerald-800">
              {filtered.length}
            </span>{" "}
            ฉบับ
          </p>
          {(query || selectedCategory !== "ทั้งหมด") && (
            <Link
              href="/regulations"
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
              ไม่พบระเบียบที่ตรงกับเงื่อนไข
            </h2>
            <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-gray-600">
              ลองใช้คำค้นที่สั้นลง เปลี่ยนหมวดเอกสาร
              หรือดูรายการระเบียบทั้งหมด
            </p>
            <Link href="/regulations" className="btn-secondary mt-4 text-sm">
              ดูระเบียบทั้งหมด
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
                  <span className="badge-gray">{group.items.length} ฉบับ</span>
                </div>
                <div className="mt-3 grid gap-3 lg:grid-cols-2">
                  {group.items.map((item) => (
                    <article
                      key={item.id}
                      className="card flex flex-col p-5 transition-colors hover:border-emerald-400"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="badge-green font-mono">
                          {item.code}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <CalendarDays className="h-3.5 w-3.5" />
                          ปรับปรุง {item.updated}
                        </span>
                      </div>
                      <h3 className="mt-2.5 text-base font-bold leading-snug text-gray-900">
                        <Link
                          href={`/regulations/${item.id}`}
                          className="hover:text-emerald-800"
                        >
                          {item.shortTitle}
                        </Link>
                      </h3>
                      <p className="mt-1.5 line-clamp-3 flex-1 text-sm leading-6 text-gray-600">
                        {item.summary}
                      </p>
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-3">
                        <span className="text-xs text-gray-500">
                          {item.authority}
                        </span>
                        <Link
                          href={`/regulations/${item.id}`}
                          className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-800 hover:underline"
                        >
                          อ่านรายละเอียด
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <div className="card p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold text-gray-900">
              <Scale className="h-4 w-4 text-emerald-700" />
              การบังคับใช้ระเบียบ
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              ระเบียบและเกณฑ์ที่เผยแพร่บนเว็บไซต์ใช้เพื่อการรับทราบและเตรียมความพร้อม
              การบังคับใช้ให้เป็นไปตามข้อบังคับและประกาศฉบับทางการของสภาเภสัชกรรม
            </p>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold text-emerald-950">
              <ShieldCheck className="h-4 w-4" />
              ต้องการคำแนะนำเพิ่มเติม
            </h2>
            <p className="mt-2 text-sm leading-6 text-emerald-900">
              เจ้าหน้าที่ศูนย์สอบฯ ให้คำแนะนำเกี่ยวกับระเบียบการสอบในวันและเวลาราชการ
            </p>
            <Link
              href="/contact"
              className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-emerald-900 hover:underline"
            >
              ช่องทางติดต่อ
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
