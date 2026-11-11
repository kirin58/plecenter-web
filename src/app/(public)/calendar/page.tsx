import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  FileText,
  Info,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import PrintButton from "@/components/ui/PrintButton";
import { examRounds } from "@/data/site";

export const metadata: Metadata = {
  title: "ปฏิทินและกำหนดการสอบ",
  description:
    "ตารางการสอบความรู้และทักษะทางวิชาชีพเภสัชกรรม กำหนดรับสมัคร วันสอบ สนามสอบ และกำหนดการเตรียมความพร้อม",
};

export const instant = false;

type CalendarView = "open" | "closed" | "prep";

const views: { key: CalendarView; label: string; description: string }[] = [
  {
    key: "open",
    label: "รอบสอบที่เปิดรับสมัคร",
    description: "รายวิชาที่สามารถยื่นสมัครได้ในขณะนี้",
  },
  {
    key: "closed",
    label: "รอบสอบที่ปิดรับสมัคร",
    description: "รอบสอบที่สิ้นสุดการรับสมัครแล้ว",
  },
  {
    key: "prep",
    label: "กำหนดการเตรียมความพร้อม",
    description: "ลำดับขั้นตอนตั้งแต่การสมัครจนถึงการประกาศผล",
  },
];

const preparationSchedule = [
  {
    date: "1 พฤศจิกายน 2569",
    title: "เปิดรับสมัครสอบครั้งที่ 1/2570",
    description:
      "ผู้สมัครยื่นใบสมัครออนไลน์ เลือกรายวิชาและสนามสอบ พร้อมแนบเอกสารประกอบ",
  },
  {
    date: "15 ธันวาคม 2569",
    title: "ปิดรับสมัครและชำระค่าธรรมเนียม",
    description:
      "ระบบปิดรับสมัครเวลา 23:59 น. ผู้สมัครต้องชำระค่าธรรมเนียมให้เสร็จสิ้นภายในวันดังกล่าว",
  },
  {
    date: "5 มกราคม 2570",
    title: "ประกาศรายชื่อผู้มีสิทธิ์สอบ",
    description:
      "ตรวจสอบรายชื่อ สนามสอบ ห้องสอบ และเลขที่นั่งสอบผ่านระบบตรวจสอบสถานะ",
  },
  {
    date: "16 มกราคม – 13 กุมภาพันธ์ 2570",
    title: "วันสอบข้อเขียนและวันสอบทักษะ",
    description:
      "การสอบข้อเขียนแบบ E-Exam และการสอบทักษะ OSPE ตามวัน เวลา และสถานที่ที่กำหนด",
  },
  {
    date: "ภายใน 30 วันหลังวันสอบ",
    title: "ประกาศผลการสอบ",
    description:
      "ศูนย์สอบฯ เผยแพร่ผลการสอบอย่างเป็นทางการผ่านระบบตรวจสอบผลสอบ",
  },
];

function isOpenView(view: string): view is CalendarView {
  return view === "open" || view === "closed" || view === "prep";
}

export default async function CalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const params = await searchParams;
  const activeView = isOpenView(params.view ?? "") ? params.view : "open";

  const openRounds = examRounds.filter(
    (round) => round.status === "เปิดรับสมัคร",
  );
  const closedRounds = examRounds.filter(
    (round) => round.status !== "เปิดรับสมัคร",
  );

  const rounds = activeView === "open" ? openRounds : closedRounds;
  const totalFee = openRounds.reduce((total, round) => total + round.fee, 0);

  return (
    <div>
      <PageHeader
        title="ปฏิทินและกำหนดการสอบ"
        description="ตารางการสอบความรู้และทักษะทางวิชาชีพเภสัชกรรม กำหนดรับสมัคร วันสอบ สนามสอบ และกำหนดการเตรียมความพร้อม"
        breadcrumbs={[{ label: "การสอบ", href: "/calendar" }, { label: "ปฏิทินและกำหนดการสอบ" }]}
        eyebrow="การสอบ"
        meta={
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <span className="badge-green">
              เปิดรับสมัคร {openRounds.length} รายวิชา
            </span>
            <span>ครั้งที่ 1/2570 · ถึงวันที่ 15 ธันวาคม 2569</span>
          </div>
        }
        actions={
          <>
            <PrintButton label="พิมพ์ตารางสอบ" />
            <Link href="/apply" className="btn-primary">
              สมัครสอบออนไลน์
              <ArrowRight className="h-4 w-4" />
            </Link>
          </>
        }
      />

      <div className="container-page py-8 lg:py-10">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="card p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
              <CalendarDays className="h-4 w-4 text-emerald-700" />
              ช่วงรับสมัคร
            </div>
            <div className="mt-1.5 text-sm font-bold text-gray-900">
              1 พ.ย. – 15 ธ.ค. 2569
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
              <Clock className="h-4 w-4 text-emerald-700" />
              วันสอบข้อเขียน
            </div>
            <div className="mt-1.5 text-sm font-bold text-gray-900">
              16 – 24 มกราคม 2570
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
              <ShieldCheck className="h-4 w-4 text-emerald-700" />
              วันสอบทักษะ
            </div>
            <div className="mt-1.5 text-sm font-bold text-gray-900">
              30 ม.ค. – 13 ก.พ. 2570
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-lg border border-gray-200 bg-white p-2">
          <div className="grid gap-1 sm:grid-cols-3">
            {views.map((view) => {
              const active = activeView === view.key;
              return (
                <Link
                  key={view.key}
                  href={`/calendar?view=${view.key}`}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-md px-4 py-3 transition-colors ${
                    active
                      ? "bg-emerald-700 text-white"
                      : "text-gray-700 hover:bg-emerald-50"
                  }`}
                >
                  <div className="text-sm font-bold">{view.label}</div>
                  <div
                    className={`mt-0.5 text-xs ${
                      active ? "text-emerald-100" : "text-gray-500"
                    }`}
                  >
                    {view.description}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {activeView === "prep" ? (
          <section className="mt-5">
            <div className="card p-5 sm:p-7">
              <h2 className="text-lg font-bold text-gray-900">
                กำหนดการเตรียมความพร้อมสำหรับการสอบครั้งที่ 1/2570
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                ผู้เข้าสอบควรติดตามประกาศของศูนย์สอบฯ และดำเนินการตามลำดับดังนี้
              </p>

              <ol className="mt-6">
                {preparationSchedule.map((item, index) => (
                  <li
                    key={item.title}
                    className="relative flex gap-4 pb-7 last:pb-0"
                  >
                    {index < preparationSchedule.length - 1 && (
                      <span
                        className="absolute left-[1.1rem] top-9 h-[calc(100%-2rem)] w-px bg-emerald-200"
                        aria-hidden="true"
                      />
                    )}
                    <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-emerald-300 bg-emerald-50 text-sm font-bold text-emerald-800">
                      {index + 1}
                    </span>
                    <div className="pt-0.5">
                      <div className="text-xs font-bold uppercase tracking-wide text-emerald-700">
                        {item.date}
                      </div>
                      <h3 className="mt-0.5 text-sm font-bold text-gray-900">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="notice mt-4">
              <Info className="mt-0.5 h-5 w-5 shrink-0" />
              <p className="leading-6">
                กำหนดการอาจมีการเปลี่ยนแปลงตามประกาศอย่างเป็นทางการของศูนย์สอบฯ
                กรุณาตรวจสอบข่าวสารและประกาศก่อนดำเนินการทุกครั้ง
              </p>
            </div>
          </section>
        ) : (
          <section className="mt-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  {activeView === "open"
                    ? "รายวิชาที่เปิดรับสมัคร"
                    : "รายวิชาที่ปิดรับสมัครแล้ว"}
                </h2>
                <p className="mt-0.5 text-sm text-gray-600">
                  {activeView === "open"
                    ? `ค่าธรรมเนียมรวมทุกรายวิชา ${totalFee.toLocaleString("th-TH")} บาท`
                    : "รอบสอบเหล่านี้สิ้นสุดการรับสมัครแล้ว"}
                </p>
              </div>
              <Link
                href="/regulations"
                className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-800 hover:underline"
              >
                ระเบียบและเกณฑ์การสอบ
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {rounds.length === 0 ? (
              <div className="mt-4 rounded-lg border border-gray-200 bg-white p-10 text-center">
                <CalendarDays className="mx-auto h-8 w-8 text-gray-400" />
                <h3 className="mt-3 text-base font-bold text-gray-900">
                  ยังไม่มีกำหนดการในหมวดนี้
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  ติดตามประกาศเพิ่มเติมได้ที่หน้าข่าวสารและประกาศ
                </p>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                {rounds.map((round) => (
                  <article key={round.id} className="card p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex min-w-0 items-start gap-3">
                        <span className="flex h-12 w-20 shrink-0 items-center justify-center rounded-md border border-emerald-200 bg-emerald-50 text-sm font-bold text-emerald-800">
                          {round.code.replace("PLE-", "")}
                        </span>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="badge-gray">{round.mode}</span>
                            <span
                              className={
                                round.status === "เปิดรับสมัคร"
                                  ? "badge-green"
                                  : "badge-gray"
                              }
                            >
                              {round.status}
                            </span>
                          </div>
                          <h3 className="mt-1.5 text-base font-bold leading-snug text-gray-900">
                            {round.name}
                          </h3>
                          <p className="mt-0.5 text-xs text-gray-500">
                            {round.round} · {round.code}
                          </p>
                        </div>
                      </div>
                      <div className="shrink-0 text-left sm:text-right">
                        <div className="text-xs text-gray-500">ค่าธรรมเนียม</div>
                        <div className="text-base font-bold text-emerald-800">
                          {round.fee.toLocaleString("th-TH")} บาท
                        </div>
                      </div>
                    </div>

                    <dl className="mt-4 grid gap-2 border-t border-gray-100 pt-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
                      <div>
                        <dt className="flex items-center gap-1.5 text-xs text-gray-500">
                          <CalendarDays className="h-3.5 w-3.5" />
                          วันสอบ
                        </dt>
                        <dd className="mt-0.5 font-semibold text-gray-900">
                          {round.date}
                        </dd>
                      </div>
                      <div>
                        <dt className="flex items-center gap-1.5 text-xs text-gray-500">
                          <Clock className="h-3.5 w-3.5" />
                          เวลาสอบ
                        </dt>
                        <dd className="mt-0.5 font-semibold text-gray-900">
                          {round.time}
                        </dd>
                      </div>
                      <div>
                        <dt className="flex items-center gap-1.5 text-xs text-gray-500">
                          <FileText className="h-3.5 w-3.5" />
                          รับสมัคร
                        </dt>
                        <dd className="mt-0.5 font-semibold text-gray-900">
                          {round.registration}
                        </dd>
                      </div>
                      <div>
                        <dt className="flex items-center gap-1.5 text-xs text-gray-500">
                          <MapPin className="h-3.5 w-3.5" />
                          สนามสอบ
                        </dt>
                        <dd className="mt-0.5 font-semibold text-gray-900">
                          {round.venue}
                        </dd>
                      </div>
                    </dl>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-3">
                      <span className="text-xs text-gray-500">
                        {round.status === "เปิดรับสมัคร"
                          ? `ปิดรับสมัคร ${round.deadline}`
                          : `สิ้นสุดการรับสมัครเมื่อ ${round.deadline}`}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        <Link
                          href="/regulations"
                          className="text-sm font-semibold text-emerald-800 hover:underline"
                        >
                          ดูเกณฑ์การสอบ
                        </Link>
                        {round.status === "เปิดรับสมัคร" ? (
                          <Link
                            href="/apply"
                            className="btn-primary px-3 py-1.5 text-sm"
                          >
                            สมัครสอบรายวิชานี้
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        ) : (
                          <Link
                            href="/news"
                            className="btn-neutral px-3 py-1.5 text-sm"
                          >
                            ดูประกาศที่เกี่ยวข้อง
                          </Link>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        <div className="mt-6 flex flex-col gap-3 rounded-lg border border-gray-200 bg-gray-50 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" />
            <p className="text-sm leading-6 text-gray-600">
              กำหนดการสอบอาจมีการเปลี่ยนแปลง
              กรุณาติดตามประกาศฉบับล่าสุดจากศูนย์สอบฯ
              และตรวจสอบข้อมูลสนามสอบก่อนวันสอบทุกครั้ง
            </p>
          </div>
          <Link href="/news" className="btn-secondary shrink-0 text-sm">
            ดูประกาศทั้งหมด
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
