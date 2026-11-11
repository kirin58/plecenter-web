import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  CalendarDays,
  Eye,
  FileText,
  Info,
  Paperclip,
  Search,
} from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import { newsCategories, newsItems } from "@/data/news";

export const metadata: Metadata = {
  title: "ข่าวสารและประกาศ",
  description:
    "ประกาศรับสมัคร กำหนดการสอบ สนามสอบ ผลการสอบ และข่าวสารอย่างเป็นทางการจากศูนย์สอบความรู้ฯ สภาเภสัชกรรม",
};

export const instant = false;

const PAGE_SIZE = 6;

type NewsSearchParams = {
  category?: string;
  q?: string;
  page?: string;
};

function buildQuery({
  category,
  q,
  page,
}: {
  category?: string;
  q?: string;
  page?: number;
}) {
  const params = new URLSearchParams();
  if (category && category !== "ทั้งหมด") params.set("category", category);
  if (q) params.set("q", q);
  if (page && page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `/news?${query}` : "/news";
}

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<NewsSearchParams>;
}) {
  const params = await searchParams;
  const selectedCategory = newsCategories.includes(
    (params.category ?? "ทั้งหมด") as (typeof newsCategories)[number],
  )
    ? (params.category ?? "ทั้งหมด")
    : "ทั้งหมด";
  const query = (params.q ?? "").trim();
  const normalizedQuery = query.toLowerCase();
  const requestedPage = Number.parseInt(params.page ?? "1", 10);
  const currentPage =
    Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const filtered = newsItems
    .filter((item) => {
      const matchCategory =
        selectedCategory === "ทั้งหมด" || item.category === selectedCategory;
      const matchQuery =
        !normalizedQuery ||
        [item.title, item.summary, item.category, item.docCode]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      return matchCategory && matchQuery;
    })
    .sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return b.dateISO.localeCompare(a.dateISO);
    });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const visible = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  return (
    <div>
      <PageHeader
        title="ข่าวสารและประกาศ"
        description="ติดตามประกาศรับสมัคร กำหนดการสอบ สนามสอบ ผลการสอบ และประกาศอย่างเป็นทางการจากศูนย์สอบฯ"
        breadcrumbs={[{ label: "ข่าวสารและประกาศ" }]}
        eyebrow="ข่าวสาร"
        meta={
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <span className="badge-green">ประกาศทั้งหมด {newsItems.length} ฉบับ</span>
            <span>ปรับปรุงล่าสุด 10 พฤศจิกายน 2569</span>
          </div>
        }
        actions={
          <Link href="/search" className="btn-secondary">
            <Search className="h-4 w-4" />
            ค้นหาประกาศ
          </Link>
        }
      />

      <div className="container-page grid gap-8 py-8 lg:grid-cols-[1fr_18rem] lg:py-10">
        <div>
          <div className="card p-4 sm:p-5">
            <form
              action="/news"
              method="get"
              role="search"
              className="flex flex-col gap-2 sm:flex-row"
            >
              {selectedCategory !== "ทั้งหมด" && (
                <input
                  type="hidden"
                  name="category"
                  value={selectedCategory}
                />
              )}
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                <input
                  type="search"
                  name="q"
                  defaultValue={query}
                  placeholder="ค้นหาหัวข้อประกาศ เลขที่เอกสาร หรือหมวดหมู่"
                  aria-label="ค้นหาข่าวสารและประกาศ"
                  className="input pl-10"
                />
              </div>
              <button type="submit" className="btn-primary shrink-0">
                ค้นหา
              </button>
            </form>

            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <span className="mr-1 text-xs font-semibold text-gray-500">
                หมวดหมู่
              </span>
              {newsCategories.map((category) => {
                const active = selectedCategory === category;
                return (
                  <Link
                    key={category}
                    href={buildQuery({ category, q: query })}
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
              {query ? (
                <>
                  ผลการค้นหาสำหรับ{" "}
                  <span className="font-semibold text-gray-900">
                    “{query}”
                  </span>{" "}
                  พบ{" "}
                  <span className="font-bold text-emerald-800">
                    {filtered.length}
                  </span>{" "}
                  รายการ
                </>
              ) : (
                <>
                  ประกาศในหมวด{" "}
                  <span className="font-semibold text-gray-900">
                    {selectedCategory}
                  </span>{" "}
                  จำนวน{" "}
                  <span className="font-bold text-emerald-800">
                    {filtered.length}
                  </span>{" "}
                  รายการ
                </>
              )}
            </p>
            {(query || selectedCategory !== "ทั้งหมด") && (
              <Link
                href="/news"
                className="text-sm font-semibold text-emerald-800 hover:underline"
              >
                ล้างตัวกรอง
              </Link>
            )}
          </div>

          {visible.length === 0 ? (
            <div className="mt-4 rounded-lg border border-gray-200 bg-white p-12 text-center">
              <Info className="mx-auto h-8 w-8 text-gray-400" />
              <h2 className="mt-3 text-base font-bold text-gray-900">
                ไม่พบประกาศที่ตรงกับเงื่อนไข
              </h2>
              <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-gray-600">
                ลองใช้คำค้นที่สั้นลง เปลี่ยนหมวดหมู่
                หรือตรวจสอบการสะกดคำอีกครั้ง
              </p>
              <Link href="/news" className="btn-secondary mt-4 text-sm">
                ดูประกาศทั้งหมด
              </Link>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {visible.map((item) => (
                <article
                  key={item.id}
                  className="card p-5 transition-colors hover:border-emerald-400"
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    {item.pinned && (
                      <span className="badge-amber">
                        <Bell className="h-3 w-3" />
                        ประกาศสำคัญ
                      </span>
                    )}
                    <span className="badge-green">{item.category}</span>
                    <span className="flex items-center gap-1 text-gray-500">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {item.date}
                    </span>
                    <span className="flex items-center gap-1 text-gray-500">
                      <Eye className="h-3.5 w-3.5" />
                      {item.views.toLocaleString("th-TH")} ครั้ง
                    </span>
                    {item.attachments && item.attachments.length > 0 && (
                      <span className="flex items-center gap-1 text-gray-500">
                        <Paperclip className="h-3.5 w-3.5" />
                        {item.attachments.length} ไฟล์แนบ
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/news/${item.id}`}
                    className="mt-2.5 block text-base font-bold leading-snug text-gray-900 hover:text-emerald-800 sm:text-lg"
                  >
                    {item.title}
                  </Link>
                  <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-gray-600">
                    {item.summary}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-3">
                    <span className="font-mono text-[0.7rem] text-gray-400">
                      {item.docCode}
                    </span>
                    <Link
                      href={`/news/${item.id}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-800 hover:underline"
                    >
                      อ่านประกาศฉบับเต็ม
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <nav
              aria-label="การแบ่งหน้า"
              className="mt-6 flex flex-wrap items-center justify-center gap-1.5"
            >
              {safePage > 1 ? (
                <Link
                  href={buildQuery({
                    category: selectedCategory,
                    q: query,
                    page: safePage - 1,
                  })}
                  className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <ArrowLeft className="h-4 w-4" />
                  ก่อนหน้า
                </Link>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-md border border-gray-100 bg-gray-50 px-3 py-2 text-sm text-gray-400">
                  <ArrowLeft className="h-4 w-4" />
                  ก่อนหน้า
                </span>
              )}

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <Link
                    key={page}
                    href={buildQuery({
                      category: selectedCategory,
                      q: query,
                      page,
                    })}
                    aria-current={page === safePage ? "page" : undefined}
                    className={`flex h-9 w-9 items-center justify-center rounded-md border text-sm font-semibold ${
                      page === safePage
                        ? "border-emerald-700 bg-emerald-700 text-white"
                        : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </Link>
                ),
              )}

              {safePage < totalPages ? (
                <Link
                  href={buildQuery({
                    category: selectedCategory,
                    q: query,
                    page: safePage + 1,
                  })}
                  className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  ถัดไป
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-md border border-gray-100 bg-gray-50 px-3 py-2 text-sm text-gray-400">
                  ถัดไป
                  <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </nav>
          )}
        </div>

        <aside className="space-y-4">
          <div className="card p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold text-gray-900">
              <Bell className="h-4 w-4 text-emerald-700" />
              ประกาศที่ควรติดตาม
            </h2>
            <ul className="mt-3 space-y-3">
              {newsItems
                .filter((item) => item.pinned)
                .map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/news/${item.id}`}
                      className="group block"
                    >
                      <span className="badge-amber">{item.category}</span>
                      <span className="mt-1.5 block text-sm font-semibold leading-snug text-gray-900 group-hover:text-emerald-800">
                        {item.title}
                      </span>
                      <span className="mt-1 block text-xs text-gray-500">
                        {item.date}
                      </span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold text-emerald-950">
              <FileText className="h-4 w-4" />
              เอกสารและแบบฟอร์ม
            </h2>
            <p className="mt-2 text-sm leading-6 text-emerald-900">
              แบบฟอร์มคำขอ คู่มือการสอบ และระเบียบที่เกี่ยวข้อง
              สามารถเปิดดูรายละเอียดและพิมพ์เอกสารได้
            </p>
            <Link
              href="/documents"
              className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-emerald-900 hover:underline"
            >
              ไปยังศูนย์เอกสาร
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="card p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold text-gray-900">
              <Search className="h-4 w-4 text-emerald-700" />
              ค้นหาข้อมูลอื่น
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              ค้นหาหน้าเว็บ ประกาศ และเอกสารทั้งหมดได้จากระบบค้นหากลาง
            </p>
            <Link href="/search" className="btn-secondary mt-3 w-full text-sm">
              ค้นหาเว็บไซต์
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
