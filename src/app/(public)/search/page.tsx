import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, FileText, Info, Search } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import { pageEntries } from "@/data/search";
import { newsItems } from "@/data/news";
import { documentItems } from "@/data/documents";

export const metadata: Metadata = {
  title: "ค้นหาเว็บไซต์",
  description:
    "ค้นหาบริการ ประกาศ เอกสาร และข้อมูลการสอบจากศูนย์สอบความรู้ฯ สภาเภสัชกรรม",
};

export const instant = false;

const popularSearches = [
  "สมัครสอบ",
  "ปฏิทินสอบ",
  "ผลสอบ",
  "E-Exam",
  "ทักท้วงข้อสอบ",
  "รหัสผู้สอบ",
];

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));
  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark
            key={`${part}-${index}`}
            className="rounded bg-amber-200 px-0.5 text-inherit"
          >
            {part}
          </mark>
        ) : (
          <span key={`${part}-${index}`}>{part}</span>
        ),
      )}
    </>
  );
}

type Result = {
  title: string;
  description: string;
  href: string;
  category: string;
};

function ResultGroup({
  title,
  results,
  query,
}: {
  title: string;
  results: Result[];
  query: string;
}) {
  if (results.length === 0) return null;
  return (
    <section className="mt-7">
      <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
        {title}
        <span className="badge-gray">{results.length}</span>
      </h2>
      <div className="mt-3 divide-y divide-gray-100 rounded-lg border border-gray-200 bg-white">
        {results.map((result) => (
          <Link
            key={result.href}
            href={result.href}
            className="group flex items-start gap-3 px-4 py-4 transition-colors hover:bg-emerald-50/50 sm:px-5"
          >
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-700">
              <FileText className="h-4 w-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-gray-900 group-hover:text-emerald-900">
                  <Highlight text={result.title} query={query} />
                </span>
                <span className="badge-green">{result.category}</span>
              </span>
              <span className="mt-1 block text-sm leading-6 text-gray-600">
                <Highlight text={result.description} query={query} />
              </span>
              <span className="mt-1.5 block text-xs font-mono text-gray-400">
                {result.href}
              </span>
            </span>
            <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-gray-300 group-hover:text-emerald-700" />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = (params.q ?? "").trim();
  const normalized = query.toLowerCase();

  const pageResults: Result[] = normalized
    ? pageEntries
        .filter((entry) =>
          [entry.title, entry.description, ...entry.keywords]
            .join(" ")
            .toLowerCase()
            .includes(normalized),
        )
        .map((entry) => ({
          title: entry.title,
          description: entry.description,
          href: entry.href,
          category: entry.category,
        }))
    : [];

  const newsResults: Result[] = normalized
    ? newsItems
        .filter((item) =>
          [item.title, item.summary, item.category, item.docCode]
            .join(" ")
            .toLowerCase()
            .includes(normalized),
        )
        .map((item) => ({
          title: item.title,
          description: item.summary,
          href: `/news/${item.id}`,
          category: item.category,
        }))
    : [];

  const documentResults: Result[] = normalized
    ? documentItems
        .filter((item) =>
          [item.title, item.description, item.code, item.category]
            .join(" ")
            .toLowerCase()
            .includes(normalized),
        )
        .map((item) => ({
          title: item.title,
          description: `${item.description} (${item.code})`,
          href: `/documents/${item.id}`,
          category: item.category,
        }))
    : [];

  const total =
    pageResults.length + newsResults.length + documentResults.length;

  return (
    <div>
      <PageHeader
        title="ค้นหาเว็บไซต์"
        description="ค้นหาบริการ ประกาศ เอกสาร และข้อมูลการสอบจากทุกส่วนของเว็บไซต์"
        breadcrumbs={[{ label: "ค้นหาเว็บไซต์" }]}
        eyebrow="เครื่องมือช่วยค้นหา"
      />

      <div className="container-page max-w-5xl py-8 sm:py-10">
        <div className="rounded-lg border border-gray-200 bg-white p-5 sm:p-6">
          <form action="/search" method="get" role="search" className="flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
              <input
                type="search"
                name="q"
                defaultValue={query}
                placeholder="พิมพ์คำค้น เช่น สมัครสอบ, ผลสอบ, รหัสผู้สอบ"
                aria-label="คำค้นหา"
                className="input pl-10"
              />
            </div>
            <button type="submit" className="btn-primary shrink-0 sm:px-6">
              <Search className="h-4 w-4" />
              ค้นหา
            </button>
          </form>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-gray-500">
              คำค้นยอดนิยม
            </span>
            {popularSearches.map((term) => (
              <Link
                key={term}
                href={`/search?q=${encodeURIComponent(term)}`}
                className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-700 transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
              >
                {term}
              </Link>
            ))}
          </div>
        </div>

        {query && (
          <p className="mt-6 text-sm text-gray-600" role="status">
            ผลการค้นหาสำหรับ{" "}
            <span className="font-semibold text-gray-900">“{query}”</span>{" "}
            พบทั้งหมด{" "}
            <span className="font-bold text-emerald-800">{total}</span> รายการ
          </p>
        )}

        {query && total === 0 && (
          <div className="mt-6 rounded-lg border border-gray-200 bg-white p-10 text-center">
            <Info className="mx-auto h-8 w-8 text-gray-400" />
            <h2 className="mt-3 text-base font-bold text-gray-900">
              ไม่พบผลการค้นหาที่ตรงกับคำค้น
            </h2>
            <p className="mx-auto mt-1 max-w-xl text-sm leading-6 text-gray-600">
              ลองใช้คำค้นที่สั้นลง ตรวจสอบการสะกดคำ
              หรือค้นหาจากหมวดหมู่บริการที่ต้องการ
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <Link href="/news" className="btn-secondary text-sm">
                ดูประกาศทั้งหมด
              </Link>
              <Link href="/documents" className="btn-neutral text-sm">
                ดูเอกสารทั้งหมด
              </Link>
              <Link href="/contact" className="btn-neutral text-sm">
                ติดต่อศูนย์สอบฯ
              </Link>
            </div>
          </div>
        )}

        {query && total > 0 && (
          <div>
            <ResultGroup title="หน้าเว็บ" results={pageResults} query={query} />
            <ResultGroup title="ข่าวสารและประกาศ" results={newsResults} query={query} />
            <ResultGroup title="เอกสารและแบบฟอร์ม" results={documentResults} query={query} />
          </div>
        )}

        {!query && (
          <section className="mt-8">
            <h2 className="section-heading">หมวดหมู่ที่เข้าถึงบ่อย</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {pageEntries
                .filter((entry) =>
                  [
                    "/apply",
                    "/exam-registration",
                    "/scores",
                    "/calendar",
                    "/documents",
                    "/news",
                    "/examinees",
                    "/contact",
                  ].includes(entry.href),
                )
                .map((entry) => (
                  <Link
                    key={entry.href}
                    href={entry.href}
                    className="group flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-emerald-400"
                  >
                    <span>
                      <span className="block text-sm font-semibold text-gray-900 group-hover:text-emerald-900">
                        {entry.title}
                      </span>
                      <span className="mt-0.5 block text-xs leading-5 text-gray-500">
                        {entry.description}
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-gray-400 group-hover:text-emerald-700" />
                  </Link>
                ))}
            </div>
            <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
              หรือดู{" "}
              <Link href="/sitemap" className="font-semibold text-emerald-800 hover:underline">
                แผนผังเว็บไซต์
              </Link>{" "}
              เพื่อเข้าถึงทุกหน้าในเว็บไซต์
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
