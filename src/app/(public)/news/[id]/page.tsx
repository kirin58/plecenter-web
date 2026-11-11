import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Eye,
  FileText,
  Info,
  Paperclip,
  Phone,
  Printer,
  ShieldCheck,
} from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import NewsActions from "@/components/news/NewsActions";
import {
  getNewsById,
  getRelatedNews,
  newsItems,
  type ContentBlock,
} from "@/data/news";
import { siteInfo } from "@/data/site";

export const instant = false;

export function generateStaticParams() {
  return newsItems.map((item) => ({ id: String(item.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = getNewsById(Number(id));
  if (!item) return { title: "ไม่พบประกาศ" };
  return {
    title: item.title,
    description: item.summary,
  };
}

function ContentBlockView({ block }: { block: ContentBlock }) {
  if (block.type === "h2") {
    return <h2>{block.text}</h2>;
  }
  if (block.type === "ul") {
    return (
      <ul>
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  if (block.type === "ol") {
    return (
      <ol>
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
    );
  }
  if (block.type === "note") {
    return (
      <div className="notice-warning my-5">
        <Info className="mt-0.5 h-5 w-5 shrink-0" />
        <p className="leading-7">{block.text}</p>
      </div>
    );
  }
  return <p>{block.text}</p>;
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = getNewsById(Number(id));
  if (!item) notFound();

  const related = getRelatedNews(item, 3);
  const index = newsItems.findIndex((news) => news.id === item.id);
  const previous = index > 0 ? newsItems[index - 1] : null;
  const next = index < newsItems.length - 1 ? newsItems[index + 1] : null;

  return (
    <div>
      <PageHeader
        title={item.title}
        breadcrumbs={[
          { label: "ข่าวสารและประกาศ", href: "/news" },
          { label: item.category },
        ]}
        eyebrow={item.category}
        meta={
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <CalendarDays className="h-3.5 w-3.5" />
              {item.date}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" />
              {item.views.toLocaleString("th-TH")} ครั้ง
            </span>
            <span className="font-mono">{item.docCode}</span>
            {item.pinned && <span className="badge-amber">ประกาศสำคัญ</span>}
          </div>
        }
        actions={
          <Link href="/news" className="btn-secondary">
            <ArrowLeft className="h-4 w-4" />
            กลับรายการประกาศ
          </Link>
        }
      />

      <div className="container-page grid gap-8 py-10 lg:grid-cols-[1fr_20rem]">
        <article>
          <div className="card p-6 sm:p-9">
            <div className="notice">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p className="font-semibold">
                  ประกาศฉบับทางการจากศูนย์สอบความรู้ฯ
                </p>
                <p className="mt-1 text-sm leading-6">
                  เอกสารนี้เผยแพร่เพื่อให้ผู้เข้าสอบและผู้ที่เกี่ยวข้องรับทราบข้อมูล
                  โดยมีผลใช้บังคับตามประกาศฉบับจริงของศูนย์สอบฯ
                </p>
              </div>
            </div>

            <div className="prose-official mt-6">
              {item.content.map((block, blockIndex) => (
                <ContentBlockView
                  key={`${block.type}-${blockIndex}`}
                  block={block}
                />
              ))}
            </div>

            {item.attachments && item.attachments.length > 0 && (
              <section className="mt-8 border-t border-gray-200 pt-6">
                <h2 className="flex items-center gap-2 text-base font-bold text-gray-900">
                  <Paperclip className="h-5 w-5 text-emerald-700" />
                  เอกสารแนบท้ายประกาศ
                </h2>
                <ul className="mt-3 divide-y divide-gray-100 rounded-md border border-gray-200">
                  {item.attachments.map((attachment) => (
                    <li
                      key={attachment.label}
                      className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <span className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-700">
                          <FileText className="h-4 w-4" />
                        </span>
                        <span>
                          <span className="block text-sm font-medium text-gray-900">
                            {attachment.label}
                          </span>
                          <span className="mt-0.5 block text-xs text-gray-500">
                            {attachment.fileType} · {attachment.size}
                          </span>
                        </span>
                      </span>
                      <span className="shrink-0 text-xs text-gray-500">
                        เอกสารแนบท้ายฉบับทางการ
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-xs leading-5 text-gray-500">
                  หากต้องการเอกสารแนบท้ายฉบับที่ประทับตราทางราชการ
                  กรุณาติดต่อศูนย์สอบฯ หรือดาวน์โหลดจากประกาศฉบับทางการที่เผยแพร่ร่วมกับหนังสือราชการ
                </p>
              </section>
            )}

            <div className="mt-8 border-t border-gray-200 pt-5">
              <NewsActions />
              <p className="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
                <Printer className="h-3.5 w-3.5" />
                การพิมพ์หน้านี้จะแสดงเฉพาะเนื้อหาประกาศ โดยไม่มีเมนูเว็บไซต์
              </p>
            </div>
          </div>

          <nav
            aria-label="ประกาศก่อนหน้าและถัดไป"
            className="mt-4 grid gap-3 sm:grid-cols-2"
          >
            {previous ? (
              <Link
                href={`/news/${previous.id}`}
                className="card group p-4 transition-colors hover:border-emerald-400"
              >
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700">
                  <ArrowLeft className="h-3.5 w-3.5" />
                  ประกาศก่อนหน้า
                </span>
                <span className="mt-1.5 line-clamp-2 block text-sm font-medium text-gray-900 group-hover:text-emerald-900">
                  {previous.title}
                </span>
              </Link>
            ) : (
              <span className="hidden sm:block" />
            )}
            {next && (
              <Link
                href={`/news/${next.id}`}
                className="card group p-4 text-right transition-colors hover:border-emerald-400"
              >
                <span className="flex items-center justify-end gap-1 text-xs font-semibold text-emerald-700">
                  ประกาศถัดไป
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
                <span className="mt-1.5 line-clamp-2 block text-sm font-medium text-gray-900 group-hover:text-emerald-900">
                  {next.title}
                </span>
              </Link>
            )}
          </nav>
        </article>

        <aside className="space-y-4 lg:sticky lg:top-32 lg:self-start">
          <div className="card p-5">
            <h2 className="text-sm font-bold text-gray-900">
              ข้อมูลประกาศ
            </h2>
            <dl className="mt-3 space-y-2.5 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-gray-500">หมวดหมู่</dt>
                <dd className="text-right font-semibold text-gray-900">
                  {item.category}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-gray-500">วันที่ประกาศ</dt>
                <dd className="text-right text-gray-900">{item.date}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-gray-500">รหัสเอกสาร</dt>
                <dd className="text-right font-mono text-xs font-semibold text-gray-900">
                  {item.docCode}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-gray-500">ผู้เผยแพร่</dt>
                <dd className="text-right text-gray-900">ศูนย์สอบความรู้ฯ</dd>
              </div>
            </dl>
          </div>

          {related.length > 0 && (
            <div className="card p-5">
              <h2 className="text-sm font-bold text-gray-900">
                ประกาศที่เกี่ยวข้อง
              </h2>
              <ul className="mt-3 space-y-3">
                {related.map((news) => (
                  <li key={news.id}>
                    <Link href={`/news/${news.id}`} className="group block">
                      <span className="text-xs font-semibold text-emerald-700">
                        {news.category}
                      </span>
                      <span className="mt-0.5 line-clamp-2 block text-sm font-medium leading-snug text-gray-900 group-hover:text-emerald-800">
                        {news.title}
                      </span>
                      <span className="mt-0.5 block text-xs text-gray-500">
                        {news.date}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold text-emerald-950">
              <Phone className="h-4 w-4" />
              สอบถามประกาศนี้
            </h2>
            <p className="mt-2 text-sm leading-6 text-emerald-900">
              เจ้าหน้าที่ให้บริการในวันและเวลาราชการ
            </p>
            <a
              href={`tel:${siteInfo.phoneHref}`}
              className="mt-2 block text-sm font-semibold text-emerald-900 hover:underline"
            >
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
