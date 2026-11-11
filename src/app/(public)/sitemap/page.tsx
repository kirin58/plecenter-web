import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText, Map, ShieldCheck } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import { pageEntries } from "@/data/search";

export const metadata: Metadata = {
  title: "แผนผังเว็บไซต์",
  description:
    "รายการหน้าทั้งหมดของเว็บไซต์ศูนย์สอบความรู้และทักษะทางวิชาชีพเภสัชกรรม สภาเภสัชกรรม",
};

const groupOrder = [
  "หน้าเว็บ",
  "การสอบ",
  "บริการออนไลน์",
  "ข่าวสาร",
  "เอกสาร",
  "ช่วยเหลือ",
  "ข้อกำหนด",
];

const groupDescriptions: Record<string, string> = {
  หน้าเว็บ: "ข้อมูลพื้นฐานของศูนย์สอบฯ และผู้เข้าสอบ",
  การสอบ: "กำหนดการ ระเบียบ คู่มือ และรูปแบบการสอบ",
  บริการออนไลน์: "บริการที่ผู้เข้าสอบใช้งานได้ตลอดกระบวนการสอบ",
  ข่าวสาร: "ประกาศและข่าวสารอย่างเป็นทางการ",
  เอกสาร: "แบบฟอร์มและเอกสารที่เกี่ยวข้อง",
  ช่วยเหลือ: "ช่องทางสอบถามและแหล่งข้อมูลเพิ่มเติม",
  ข้อกำหนด: "นโยบายและเงื่อนไขการใช้งานเว็บไซต์",
};

export default function SitemapPage() {
  const grouped = groupOrder
    .map((group) => ({
      group,
      entries: pageEntries.filter((entry) => entry.category === group),
    }))
    .filter((item) => item.entries.length > 0);

  return (
    <div>
      <PageHeader
        title="แผนผังเว็บไซต์"
        description="รายการหน้าทั้งหมดของเว็บไซต์ จัดกลุ่มตามหมวดหมู่บริการ เพื่อให้เข้าถึงข้อมูลที่ต้องการได้อย่างรวดเร็ว"
        breadcrumbs={[{ label: "แผนผังเว็บไซต์" }]}
        eyebrow="เครื่องมือช่วยค้นหา"
        meta={
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Map className="h-4 w-4 text-emerald-700" />
            ทั้งหมด {pageEntries.length} หน้า
          </div>
        }
      />

      <div className="container-page max-w-5xl py-10">
        <div className="grid gap-4 sm:grid-cols-2">
          {grouped.map(({ group, entries }) => (
            <section key={group} className="card p-5">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-50 text-emerald-700">
                  <FileText className="h-4 w-4" />
                </span>
                <div>
                  <h2 className="text-base font-bold text-gray-900">{group}</h2>
                  <p className="text-xs text-gray-500">
                    {groupDescriptions[group]}
                  </p>
                </div>
              </div>
              <ul className="mt-3 space-y-1.5">
                {entries.map((entry) => (
                  <li key={entry.href}>
                    <Link
                      href={entry.href}
                      className="group flex items-start justify-between gap-2 rounded-md px-2 py-1.5 text-sm text-gray-700 transition-colors hover:bg-emerald-50 hover:text-emerald-900"
                    >
                      <span>
                        <span className="font-medium">{entry.title}</span>
                        <span className="mt-0.5 block text-xs leading-5 text-gray-500">
                          {entry.description}
                        </span>
                      </span>
                      <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-gray-300 group-hover:text-emerald-700" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-5">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
            <div>
              <h2 className="text-sm font-bold text-emerald-950">
                ไม่พบหน้าที่ต้องการ
              </h2>
              <p className="mt-1 text-sm leading-6 text-emerald-900">
                ใช้ระบบค้นหาของเว็บไซต์เพื่อค้นหาบริการ ประกาศ หรือเอกสาร
                หรือติดต่อเจ้าหน้าที่ศูนย์สอบฯ เพื่อขอความช่วยเหลือ
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link href="/search" className="btn-primary text-sm">
                  ค้นหาเว็บไซต์
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/contact" className="btn-secondary text-sm">
                  ติดต่อศูนย์สอบฯ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
