import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  FileText,
  HelpCircle,
  Info,
  Mail,
  Phone,
  Search,
} from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import { siteInfo } from "@/data/site";

export const metadata: Metadata = {
  title: "คำถามที่พบบ่อย",
  description:
    "คำตอบสำหรับข้อสงสัยเกี่ยวกับการสมัครสอบ การชำระเงิน วันสอบ ที่นั่งสอบ ระบบ E-Exam ผลสอบ และเอกสารของศูนย์สอบความรู้ฯ",
};

export const instant = false;

type FaqCategory =
  | "การสมัครสอบ"
  | "การชำระเงิน"
  | "วันสอบและที่นั่งสอบ"
  | "ระบบ E-Exam"
  | "ผลสอบและใบรับรอง"
  | "เอกสารและคำร้อง";

const categories: FaqCategory[] = [
  "การสมัครสอบ",
  "การชำระเงิน",
  "วันสอบและที่นั่งสอบ",
  "ระบบ E-Exam",
  "ผลสอบและใบรับรอง",
  "เอกสารและคำร้อง",
];

const faqs: {
  id: number;
  category: FaqCategory;
  question: string;
  answer: string;
}[] = [
  {
    id: 1,
    category: "การสมัครสอบ",
    question: "ผู้ที่กำลังจะสำเร็จการศึกษาสามารถสมัครสอบได้หรือไม่",
    answer:
      "ผู้ที่คาดว่าจะสำเร็จการศึกษาตามหลักสูตรที่สภาเภสัชกรรมรับรองสามารถสมัครสอบได้ โดยต้องแนบหนังสือรับรองสถานะนักศึกษาจากคณะเภสัชศาสตร์ และต้องยื่นหลักฐานการสำเร็จการศึกษาตามกำหนดที่ศูนย์สอบฯ ประกาศ",
  },
  {
    id: 2,
    category: "การสมัครสอบ",
    question: "ต้องสมัครสมาชิกสภาเภสัชกรรมก่อนสมัครสอบหรือไม่",
    answer:
      "ผู้สมัครต้องมีสถานะเป็นสมาชิกสภาเภสัชกรรม หรือยื่นคำขอสมัครสมาชิกพร้อมกับการสมัครสอบตามหลักเกณฑ์ที่กำหนด ทั้งนี้ ควรตรวจสอบสถานะสมาชิกก่อนยื่นใบสมัครเพื่อป้องกันความล่าช้า",
  },
  {
    id: 3,
    category: "การสมัครสอบ",
    question: "สามารถเปลี่ยนสนามสอบหลังส่งใบสมัครแล้วได้หรือไม่",
    answer:
      "สามารถยื่นคำร้องขอเปลี่ยนสนามสอบได้ก่อนวันปิดรับสมัครอย่างน้อย 7 วันทำการ โดยขึ้นอยู่กับจำนวนที่นั่งที่ว่างในสนามสอบที่ต้องการ การเปลี่ยนสนามสอบอาจมีค่าธรรมเนียมตามระเบียบที่กำหนด",
  },
  {
    id: 4,
    category: "การชำระเงิน",
    question: "ค่าธรรมเนียมการสอบเท่าไร และชำระได้ผ่านช่องทางใด",
    answer:
      "การสอบข้อเขียนแบบ E-Exam มีค่าธรรมเนียมรายวิชาละ 1,000 บาท และการสอบทักษะ OSPE มีค่าธรรมเนียมรายวิชาละ 2,000 บาท ระบบรองรับการชำระผ่าน Thai QR Payment (PromptPay) บัตรเครดิต/เดบิต และเคาน์เตอร์ธนาคารตามที่ระบบกำหนด",
  },
  {
    id: 5,
    category: "การชำระเงิน",
    question: "ชำระค่าธรรมเนียมแล้วสามารถขอคืนเงินได้หรือไม่",
    answer:
      "ค่าธรรมเนียมที่ชำระแล้วไม่สามารถขอคืนได้ เว้นแต่มีเหตุสุดวิสัยตามระเบียบที่สภาเภสัชกรรมกำหนด ผู้สมัครสามารถยื่นคำร้องขอคืนค่าธรรมเนียมผ่านระบบคำร้องออนไลน์พร้อมแนบหลักฐานประกอบ",
  },
  {
    id: 6,
    category: "วันสอบและที่นั่งสอบ",
    question: "จะทราบสนามสอบ ห้องสอบ และเลขที่นั่งสอบได้เมื่อใด",
    answer:
      "ศูนย์สอบฯ จะประกาศรายชื่อผู้มีสิทธิ์สอบและเปิดให้ตรวจสอบสนามสอบ ห้องสอบ และเลขที่นั่งสอบล่วงหน้าอย่างน้อย 14 วันก่อนวันสอบ ผ่านระบบตรวจสอบสถานะและผลสอบบนเว็บไซต์",
  },
  {
    id: 7,
    category: "วันสอบและที่นั่งสอบ",
    question: "ต้องนำเอกสารใดไปในวันสอบบ้าง",
    answer:
      "ผู้เข้าสอบต้องนำบัตรประจำตัวประชาชนฉบับจริงที่ยังไม่หมดอายุ บัตรประจำตัวผู้สอบที่พิมพ์จากระบบ และอุปกรณ์ที่ประกาศอนุญาต เช่น ปากกาลูกลื่นสีน้ำเงินหรือดำ ทั้งนี้ ห้ามนำอุปกรณ์สื่อสารและอุปกรณ์อิเล็กทรอนิกส์เข้าบริเวณห้องสอบ",
  },
  {
    id: 8,
    category: "วันสอบและที่นั่งสอบ",
    question: "มาสายเกินกำหนดสามารถเข้าห้องสอบได้หรือไม่",
    answer:
      "ผู้เข้าสอบที่มาสายเกิน 15 นาทีหลังเริ่มการสอบจะไม่ได้รับอนุญาตให้เข้าห้องสอบ และจะไม่ได้รับคืนค่าธรรมเนียมการสอบ ควรเผื่อเวลาเดินทางล่วงหน้าเนื่องจากสภาพการจราจรอาจไม่แน่นอน",
  },
  {
    id: 9,
    category: "ระบบ E-Exam",
    question: "หากเครื่องคอมพิวเตอร์ขัดข้องระหว่างสอบ คำตอบจะหายหรือไม่",
    answer:
      "ระบบ E-Exam บันทึกคำตอบอัตโนมัติเมื่อผู้เข้าสอบเลือกคำตอบ หากเครื่องขัดข้องให้ยกมือแจ้งกรรมการคุมสอบทันที เจ้าหน้าที่จะดำเนินการเปลี่ยนเครื่องหรือเข้าสู่ระบบใหม่ โดยผู้เข้าสอบสามารถทำข้อสอบต่อได้ตามเวลาที่เหลือ",
  },
  {
    id: 10,
    category: "ระบบ E-Exam",
    question: "สามารถทดลองใช้ระบบ E-Exam ก่อนวันสอบได้หรือไม่",
    answer:
      "ศูนย์สอบฯ จัดให้มีระบบทดลองสอบ (Mock Test) สำหรับผู้เข้าสอบ ควรเข้าทดลองอย่างน้อย 1 ครั้งก่อนวันสอบ เพื่อตรวจสอบการเข้าสู่ระบบ การใช้งานหน้าจอ และการศึกษาระเบียบการสอบ",
  },
  {
    id: 11,
    category: "ผลสอบและใบรับรอง",
    question: "เกณฑ์การผ่านการสอบแต่ละรายวิชาคิดอย่างไร",
    answer:
      "ผู้เข้าสอบต้องได้คะแนนรวมไม่น้อยกว่าร้อยละ 60 ของคะแนนเต็ม และต้องผ่านเกณฑ์ขั้นต่ำในส่วนที่กำหนดตามข้อบังคับและประกาศของสภาเภสัชกรรม ทั้งนี้ เกณฑ์อาจแตกต่างกันตามรูปแบบการสอบแต่ละรายวิชา",
  },
  {
    id: 12,
    category: "ผลสอบและใบรับรอง",
    question: "หากไม่เห็นด้วยกับผลสอบ สามารถยื่นคำร้องได้ภายในกี่วัน",
    answer:
      "การทักท้วงข้อสอบสามารถยื่นได้ภายในระยะเวลาที่ประกาศกำหนดหลังวันสอบ ส่วนการขอทราบคะแนนรายบุคคลสามารถยื่นได้ภายใน 30 วันนับจากวันที่ประกาศผลสอบ โดยเป็นไปตามระเบียบและค่าธรรมเนียมที่กำหนด",
  },
  {
    id: 13,
    category: "เอกสารและคำร้อง",
    question: "ดาวน์โหลดแบบฟอร์มคำขอได้จากที่ใด",
    answer:
      "แบบฟอร์มคำขอและเอกสารที่เกี่ยวข้องทั้งหมดเผยแพร่ที่หน้าศูนย์เอกสารและแบบฟอร์ม โดยสามารถเปิดดูรายละเอียดและพิมพ์เอกสารได้จากหน้ารายการเอกสารแต่ละฉบับ",
  },
  {
    id: 14,
    category: "เอกสารและคำร้อง",
    question: "ยื่นคำร้องออนไลน์ได้หรือไม่ และต้องใช้เอกสารใดบ้าง",
    answer:
      "สามารถยื่นคำร้องทักท้วงข้อสอบ ขอทราบคะแนน หรือขอคืนค่าธรรมเนียมผ่านระบบคำร้องออนไลน์ โดยต้องกรอกข้อมูลส่วนบุคคล เลขประจำตัวผู้สอบ รายละเอียดคำร้อง และแนบหลักฐานประกอบตามประเภทคำร้อง",
  },
  {
    id: 15,
    category: "เอกสารและคำร้อง",
    question: "ต้องการเอกสารฉบับทางการที่ประทับตรา ต้องทำอย่างไร",
    answer:
      "เอกสารบนเว็บไซต์เป็นตัวอย่างเพื่อการค้นหาและตรวจสอบรายละเอียด หากต้องการเอกสารฉบับทางการที่ประทับตรา กรุณาติดต่อศูนย์สอบฯ ในวันและเวลาราชการ หรือดาวน์โหลดจากประกาศฉบับทางการที่เผยแพร่ร่วมกับหนังสือราชการ",
  },
];

export default async function FaqPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const params = await searchParams;
  const query = (params.q ?? "").trim();
  const selectedCategory = categories.includes(
    (params.category ?? "") as FaqCategory,
  )
    ? (params.category as FaqCategory)
    : null;

  const normalized = query.toLowerCase();
  const filtered = faqs.filter((faq) => {
    const matchCategory =
      !selectedCategory || faq.category === selectedCategory;
    const matchQuery =
      !normalized ||
      [faq.question, faq.answer, faq.category]
        .join(" ")
        .toLowerCase()
        .includes(normalized);
    return matchCategory && matchQuery;
  });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: filtered.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div>
      <PageHeader
        title="คำถามที่พบบ่อย"
        description="รวบรวมข้อสงสัยเกี่ยวกับการสมัครสอบ การชำระเงิน วันสอบ ที่นั่งสอบ ระบบ E-Exam ผลสอบ และเอกสารการสอบ"
        breadcrumbs={[{ label: "ช่วยเหลือ", href: "/faq" }, { label: "คำถามที่พบบ่อย" }]}
        eyebrow="ช่วยเหลือ"
        meta={
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <span className="badge-green">{faqs.length} คำถาม</span>
            <span>ปรับปรุงล่าสุด 10 พฤศจิกายน 2569</span>
          </div>
        }
        actions={
          <Link href="/contact" className="btn-secondary">
            <Mail className="h-4 w-4" />
            ติดต่อเจ้าหน้าที่
          </Link>
        }
      />

      <div className="container-page grid gap-8 py-8 lg:grid-cols-[1fr_19rem] lg:py-10">
        <div>
          <div className="card p-4 sm:p-5">
            <form
              action="/faq"
              method="get"
              role="search"
              className="flex flex-col gap-2 sm:flex-row"
            >
              {selectedCategory && (
                <input type="hidden" name="category" value={selectedCategory} />
              )}
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                <input
                  type="search"
                  name="q"
                  defaultValue={query}
                  placeholder="พิมพ์คำถาม เช่น สมัครสอบ, ชำระเงิน, ที่นั่งสอบ"
                  aria-label="ค้นหาคำถามที่พบบ่อย"
                  className="input pl-10"
                />
              </div>
              <button type="submit" className="btn-primary shrink-0">
                ค้นหา
              </button>
            </form>

            <div className="mt-3 flex flex-wrap gap-1.5">
              <Link
                href={query ? `/faq?q=${encodeURIComponent(query)}` : "/faq"}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  !selectedCategory
                    ? "border-emerald-700 bg-emerald-700 text-white"
                    : "border-gray-200 bg-gray-50 text-gray-700 hover:border-emerald-300 hover:bg-emerald-50"
                }`}
              >
                ทั้งหมด
              </Link>
              {categories.map((category) => {
                const active = selectedCategory === category;
                const href = query
                  ? `/faq?q=${encodeURIComponent(query)}&category=${encodeURIComponent(category)}`
                  : `/faq?category=${encodeURIComponent(category)}`;
                return (
                  <Link
                    key={category}
                    href={href}
                    className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                      active
                        ? "border-emerald-700 bg-emerald-700 text-white"
                        : "border-gray-200 bg-gray-50 text-gray-700 hover:border-emerald-300 hover:bg-emerald-50"
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
                  <span className="font-semibold text-gray-900">“{query}”</span>{" "}
                  พบ{" "}
                  <span className="font-bold text-emerald-800">
                    {filtered.length}
                  </span>{" "}
                  คำถาม
                </>
              ) : (
                <>
                  แสดงคำถาม{" "}
                  <span className="font-bold text-emerald-800">
                    {filtered.length}
                  </span>{" "}
                  รายการ
                </>
              )}
            </p>
            {(query || selectedCategory) && (
              <Link
                href="/faq"
                className="font-semibold text-emerald-800 hover:underline"
              >
                ล้างตัวกรอง
              </Link>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="mt-4 rounded-lg border border-gray-200 bg-white p-10 text-center">
              <HelpCircle className="mx-auto h-8 w-8 text-gray-400" />
              <h2 className="mt-3 text-base font-bold text-gray-900">
                ไม่พบคำถามที่ตรงกับเงื่อนไข
              </h2>
              <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-gray-600">
                ลองใช้คำค้นที่สั้นลง เลือกหมวดหมู่อื่น
                หรือติดต่อเจ้าหน้าที่เพื่อสอบถามโดยตรง
              </p>
              <Link href="/contact" className="btn-secondary mt-4 text-sm">
                ติดต่อศูนย์สอบฯ
              </Link>
            </div>
          ) : (
            <div className="mt-4 space-y-2.5">
              {filtered.map((faq) => (
                <details
                  key={faq.id}
                  className="group rounded-lg border border-gray-200 bg-white open:border-emerald-300"
                  open={filtered.length === 1}
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-3 px-4 py-4 sm:px-5">
                    <span className="flex items-start gap-2.5">
                      <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                      <span>
                        <span className="block text-sm font-semibold leading-snug text-gray-900">
                          {faq.question}
                        </span>
                        <span className="mt-1 block text-xs text-emerald-700">
                          {faq.category}
                        </span>
                      </span>
                    </span>
                    <ChevronDown className="mt-0.5 h-4 w-4 shrink-0 text-gray-400 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="border-t border-gray-100 bg-gray-50/70 px-4 py-4 text-sm leading-7 text-gray-700 sm:px-5">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          )}

          <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-5">
            <div className="flex items-start gap-3">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
              <div>
                <h2 className="text-sm font-bold text-emerald-950">
                  ไม่พบคำตอบที่ต้องการ
                </h2>
                <p className="mt-1 text-sm leading-6 text-emerald-900">
                  เจ้าหน้าที่ศูนย์สอบฯ พร้อมให้คำแนะนำในวันและเวลาราชการ
                  ท่านสามารถสอบถามผ่านโทรศัพท์ อีเมล หรือแบบฟอร์มติดต่อออนไลน์
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Link href="/contact" className="btn-primary text-sm">
                    ส่งข้อความสอบถาม
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/documents" className="btn-secondary text-sm">
                    เอกสารและแบบฟอร์ม
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="card p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold text-gray-900">
              <Phone className="h-4 w-4 text-emerald-700" />
              ติดต่อศูนย์สอบฯ
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              {siteInfo.hours}
            </p>
            <a
              href={`tel:${siteInfo.phoneHref}`}
              className="mt-2 block text-sm font-semibold text-emerald-800 hover:underline"
            >
              {siteInfo.phone}
            </a>
            <a
              href={`mailto:${siteInfo.email}`}
              className="mt-1 block break-all text-sm text-emerald-800 hover:underline"
            >
              {siteInfo.email}
            </a>
          </div>

          <div className="card p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold text-gray-900">
              <BookOpen className="h-4 w-4 text-emerald-700" />
              แหล่งข้อมูลที่เกี่ยวข้อง
            </h2>
            <ul className="mt-3 space-y-2.5 text-sm">
              {[
                { href: "/examinees", label: "ข้อมูลสำหรับผู้เข้าสอบ" },
                { href: "/calendar", label: "ปฏิทินและกำหนดการสอบ" },
                { href: "/regulations", label: "ระเบียบและเกณฑ์การสอบ" },
                { href: "/e-exam", label: "ระบบ E-Exam" },
                { href: "/documents", label: "เอกสารและแบบฟอร์ม" },
                { href: "/requests", label: "ยื่นคำร้องออนไลน์" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center justify-between gap-2 text-gray-700 hover:text-emerald-800 hover:underline"
                  >
                    {link.label}
                    <ArrowRight className="h-3.5 w-3.5 text-gray-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold text-gray-900">
              <FileText className="h-4 w-4 text-emerald-700" />
              เอกสารที่ใช้บ่อย
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              {[
                { href: "/documents/8", label: "คู่มือการสมัครสอบ" },
                { href: "/documents/9", label: "คู่มือการสอบ E-Exam" },
                { href: "/documents/10", label: "ระเบียบการสอบ E-Exam" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-emerald-800 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </div>
  );
}
