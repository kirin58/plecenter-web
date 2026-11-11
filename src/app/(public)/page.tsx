import Link from "next/link";
import {
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  ClipboardList,
  Clock,
  ExternalLink,
  FileText,
  FolderOpen,
  GraduationCap,
  LogIn,
  Mail,
  MapPin,
  Monitor,
  Phone,
  Scale,
  SearchCheck,
  ShieldCheck,
} from "lucide-react";
import {
  applicationSteps,
  examRounds,
  examTypes,
  relatedLinks,
  siteInfo,
} from "@/data/site";
import { newsItems } from "@/data/news";
import { documentItems } from "@/data/documents";

const services = [
  {
    title: "สมัครสอบออนไลน์",
    description: "ยื่นใบสมัคร เลือกวิชาและสนามสอบ ชำระค่าธรรมเนียม",
    href: "/apply",
    icon: ClipboardList,
    highlight: true,
  },
  {
    title: "ตรวจสอบสถานะและผลสอบ",
    description: "ค้นหาสถานะการสมัคร ที่นั่งสอบ และผลคะแนน",
    href: "/scores",
    icon: SearchCheck,
  },
  {
    title: "ปฏิทินและกำหนดการสอบ",
    description: "ตารางสอบและกำหนดการเตรียมความพร้อม",
    href: "/calendar",
    icon: CalendarDays,
  },
  {
    title: "ระเบียบและเกณฑ์การสอบ",
    description: "ข้อบังคับ ประกาศ และเกณฑ์การประเมิน",
    href: "/regulations",
    icon: Scale,
  },
  {
    title: "เอกสารและแบบฟอร์ม",
    description: "แบบฟอร์มคำขอ คู่มือ และระเบียบที่เกี่ยวข้อง",
    href: "/documents",
    icon: FolderOpen,
  },
  {
    title: "ยื่นคำร้องออนไลน์",
    description: "ทักท้วงข้อสอบ ขอทราบคะแนน และขอคืนเงิน",
    href: "/requests",
    icon: FileText,
  },
  {
    title: "ระบบ E-Exam",
    description: "ข้อมูลการสอบคอมพิวเตอร์และแบบทดลองสอบ",
    href: "/e-exam",
    icon: Monitor,
  },
  {
    title: "ลงทะเบียนเข้าสอบ",
    description: "เข้าสู่ระบบด้วยเลขบัตรและรหัสประจำตัวผู้สอบ",
    href: "/exam-registration",
    icon: LogIn,
  },
];

const featuredDocuments = documentItems.filter((doc) =>
  [1, 2, 4, 9].includes(doc.id),
);

// The eight licensure examinations are grouped into four professional areas.
const examGroups = [
  {
    title: "สมรรถนะร่วม",
    description: "ความรู้และทักษะพื้นฐานที่ผู้ประกอบวิชาชีพทุกสาขาต้องมี",
    codes: ["PLE-CC1", "PLE-CC2"],
  },
  {
    title: "บริบาลทางเภสัชกรรม",
    description: "การดูแลผู้ป่วย การใช้ยา และการให้คำแนะนำด้านสุขภาพ",
    codes: ["PLE-PC1", "PLE-PC2"],
  },
  {
    title: "เภสัชกรรมอุตสาหการ",
    description: "การผลิต การควบคุมคุณภาพ และการขึ้นทะเบียนผลิตภัณฑ์ยา",
    codes: ["PLE-IP1", "PLE-IP2"],
  },
  {
    title: "คุ้มครองผู้บริโภค",
    description: "กฎหมายยา เภสัชสาธารณสุข และความปลอดภัยด้านยา",
    codes: ["PLE-PHCP1", "PLE-PHCP2"],
  },
];

export default function HomePage() {
  const latestNews = newsItems.slice(0, 5);
  const openRounds = examRounds.filter((round) => round.status === "เปิดรับสมัคร");
  const nextRounds = openRounds.slice(0, 4);
  const currentRound = openRounds[0];

  return (
    <div>
      {/* Hero */}
      <section className="hero-pattern">
        <div className="container-page grid gap-10 py-10 lg:grid-cols-[1.35fr_0.95fr] lg:items-center lg:py-14">
          <div>
            <div className="inline-flex items-center gap-2 rounded border border-emerald-700 bg-emerald-900/70 px-3 py-1.5 text-xs font-semibold text-amber-300">
              <ShieldCheck className="h-4 w-4" />
              เว็บไซต์ทางการของศูนย์สอบความรู้ฯ สภาเภสัชกรรม
            </div>

            <h1 className="mt-5 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.65rem]">
              การสอบความรู้ทางวิชาชีพเภสัชกรรม
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-emerald-100">
              ศูนย์สอบความรู้และทักษะทางวิชาชีพเภสัชกรรม
              ดำเนินการจัดสอบเพื่อการขึ้นทะเบียนและรับใบอนุญาตเป็นผู้ประกอบวิชาชีพเภสัชกรรม
              ตั้งแต่การรับสมัคร การจัดสนามสอบ ไปจนถึงการประกาศผลอย่างเป็นทางการ
            </p>

            <div className="mt-7 border-l-2 border-amber-400 pl-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="badge border-amber-400/40 bg-amber-400/15 text-amber-200">
                  เปิดรับสมัคร
                </span>
                <span className="text-sm font-semibold text-white">
                  การสอบครั้งที่ {currentRound.round.replace("ครั้งที่ ", "")}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-emerald-100">
                สมัครได้ตั้งแต่วันที่ 1 พฤศจิกายน – 15 ธันวาคม 2569
                สำหรับการสอบข้อเขียนแบบ E-Exam และการสอบทักษะ OSPE
              </p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                <Link href="/apply" className="btn-gold">
                  สมัครสอบออนไลน์
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/calendar"
                  className="btn border border-emerald-600 bg-emerald-900/40 text-white hover:bg-emerald-800"
                >
                  ดูกำหนดการสอบ
                </Link>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-xs text-emerald-200">
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-amber-400" />
                สอบข้อเขียนแบบ E-Exam
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-amber-400" />
                ตรวจสอบผลสอบออนไลน์
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-amber-400" />
                ศูนย์สอบครอบคลุม 4 ภูมิภาค
              </span>
            </div>
          </div>

          {/* Latest announcements */}
          <aside className="rounded-lg border border-emerald-800 bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-emerald-700" />
                <h2 className="text-sm font-bold text-gray-900">ประกาศล่าสุด</h2>
              </div>
              <Link
                href="/news"
                className="flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:underline"
              >
                ดูทั้งหมด
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <ul className="divide-y divide-gray-100">
              {latestNews.slice(0, 4).map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/news/${item.id}`}
                    className="block px-5 py-3.5 transition-colors hover:bg-emerald-50/60"
                  >
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-semibold text-emerald-700">
                        {item.category}
                      </span>
                      <span className="text-gray-300">|</span>
                      <span className="text-gray-500">{item.date}</span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-sm font-medium leading-snug text-gray-900">
                      {item.title}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="border-t border-gray-200 bg-gray-50 px-5 py-3.5">
              <Link
                href="/scores"
                className="flex items-center justify-between gap-2 text-sm font-semibold text-emerald-800 hover:text-emerald-900"
              >
                <span className="flex items-center gap-2">
                  <SearchCheck className="h-4 w-4" />
                  ตรวจสอบสถานะการสมัครและผลสอบ
                </span>
                <ArrowRight className="h-4 w-4 shrink-0" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Services */}
      <section className="border-b border-gray-200 bg-gray-50 py-12">
        <div className="container-page">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="section-heading">บริการสำหรับผู้เข้าสอบ</h2>
              <p className="section-subheading">
                เข้าถึงบริการที่จำเป็นตลอดกระบวนการสอบ ตั้งแต่การสมัครจนถึงการตรวจผล
              </p>
            </div>
            <Link
              href="/examinees"
              className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-800 hover:underline"
            >
              ข้อมูลสำหรับผู้เข้าสอบ
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.href}
                  href={service.href}
                  className="group flex flex-col rounded-lg border border-gray-200 bg-white p-5 transition-colors hover:border-emerald-500 hover:bg-emerald-50/30"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="flex h-10 w-10 items-center justify-center rounded-md bg-emerald-50 text-emerald-700 transition-colors group-hover:bg-emerald-700 group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    {service.highlight && (
                      <span className="badge-green">เปิดรับสมัคร</span>
                    )}
                  </div>
                  <h3 className="mt-3.5 text-base font-bold text-gray-900 group-hover:text-emerald-900">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    {service.description}
                  </p>
                  <span className="mt-3 flex items-center gap-1 text-sm font-semibold text-emerald-700">
                    เข้าใช้งาน
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Schedule and application steps */}
      <section className="py-12">
        <div className="container-page grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="card overflow-hidden">
            <div className="flex flex-col gap-2 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
                  <CalendarDays className="h-5 w-5 text-emerald-700" />
                  กำหนดการสอบที่เปิดรับสมัคร
                </h2>
                <p className="mt-0.5 text-xs text-gray-500">
                  การสอบครั้งที่ 1/2570 · สมัครถึงวันที่ 15 ธันวาคม 2569
                </p>
              </div>
              <Link
                href="/calendar"
                className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-800 hover:underline"
              >
                ปฏิทินฉบับเต็ม
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="divide-y divide-gray-100">
              {nextRounds.map((round) => (
                <div
                  key={round.id}
                  className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <span className="mt-0.5 flex h-11 w-16 shrink-0 items-center justify-center rounded border border-emerald-200 bg-emerald-50 text-xs font-bold text-emerald-800">
                      {round.code.replace("PLE-", "")}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-gray-900">
                        {round.name}
                      </h3>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-600">
                        <span className="flex items-center gap-1">
                          <CalendarDays className="h-3.5 w-3.5 text-gray-400" />
                          {round.dateShort}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-gray-400" />
                          {round.time}
                        </span>
                        <span className="badge-gray">{round.mode}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2 sm:flex-col sm:items-end">
                    <span className="badge-green">{round.status}</span>
                    <Link
                      href="/apply"
                      className="text-sm font-semibold text-emerald-800 hover:underline"
                    >
                      สมัครสอบ
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2 border-t border-gray-200 bg-gray-50 px-5 py-3 text-xs text-gray-600 sm:flex-row sm:items-center sm:justify-between">
              <span>
                ผู้สมัครควรตรวจสอบคุณสมบัติและรายวิชาที่ต้องสอบก่อนยื่นใบสมัคร
              </span>
              <Link
                href="/examinees"
                className="font-semibold text-emerald-800 hover:underline"
              >
                ตรวจสอบคุณสมบัติ
              </Link>
            </div>
          </div>

          <div className="card p-5 sm:p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
              <GraduationCap className="h-5 w-5 text-emerald-700" />
              ขั้นตอนการสมัครสอบ
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              ดำเนินการตามลำดับเพื่อให้การสมัครสมบูรณ์
            </p>
            <ol className="mt-5 space-y-0">
              {applicationSteps.map((step, index) => (
                <li key={step.step} className="relative flex gap-3 pb-5 last:pb-0">
                  {index < applicationSteps.length - 1 && (
                    <span
                      className="absolute left-[0.9rem] top-8 h-[calc(100%-1.5rem)] w-px bg-emerald-200"
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-emerald-300 bg-emerald-50 text-xs font-bold text-emerald-800">
                    {step.step}
                  </span>
                  <div className="pt-0.5">
                    <h3 className="text-sm font-bold text-gray-900">
                      {step.title}
                    </h3>
                    <p className="mt-0.5 text-xs leading-5 text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <Link
              href="/apply"
              className="btn-primary mt-5 w-full text-sm"
            >
              เริ่มสมัครสอบ
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* News */}
      <section className="border-y border-gray-200 bg-gray-50 py-12">
        <div className="container-page">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="section-heading">ข่าวสารและประกาศ</h2>
              <p className="section-subheading">
                ประกาศรับสมัคร กำหนดการ สนามสอบ และผลการสอบจากศูนย์สอบฯ
              </p>
            </div>
            <Link
              href="/news"
              className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-800 hover:underline"
            >
              ดูประกาศทั้งหมด
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-6 card divide-y divide-gray-100">
            {latestNews.map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.id}`}
                className="flex flex-col gap-2 px-5 py-4 transition-colors hover:bg-emerald-50/40 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-start gap-3">
                  <span
                    className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                      item.pinned ? "bg-amber-500" : "bg-emerald-400"
                    }`}
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-semibold text-emerald-700">
                        {item.category}
                      </span>
                      {item.pinned && (
                        <span className="badge-amber">ประกาศสำคัญ</span>
                      )}
                      <span className="text-gray-500">{item.date}</span>
                    </div>
                    <h3 className="mt-1 text-sm font-medium leading-snug text-gray-900">
                      {item.title}
                    </h3>
                  </div>
                </div>
                <span className="flex shrink-0 items-center gap-1 self-end text-sm font-semibold text-emerald-800 sm:self-auto">
                  อ่านประกาศ
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Examination areas */}
      <section className="py-12">
        <div className="container-page">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="section-heading">รายวิชาและสาขาการสอบ</h2>
              <p className="section-subheading">
                การสอบแบ่งเป็น 4 สาขา ประกอบด้วยการสอบข้อเขียนและสอบทักษะ
              </p>
            </div>
            <Link
              href="/regulations"
              className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-800 hover:underline"
            >
              เกณฑ์การประเมิน
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {examGroups.map((group) => (
              <div key={group.title} className="card p-5">
                <h3 className="text-base font-bold text-gray-900">
                  {group.title}
                </h3>
                <p className="mt-1 text-xs leading-5 text-gray-600">
                  {group.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {group.codes.map((code) => {
                    const exam = examTypes.find((item) => item.code === code);
                    if (!exam) return null;
                    return (
                      <li
                        key={code}
                        className="flex items-center justify-between gap-2 rounded border border-gray-200 bg-gray-50 px-3 py-2"
                      >
                        <div>
                          <div className="text-xs font-bold text-emerald-800">
                            {exam.code}
                          </div>
                          <div className="text-[0.7rem] text-gray-500">
                            {exam.mode}
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-gray-700">
                          {exam.fee.toLocaleString("th-TH")} บาท
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="border-y border-gray-200 bg-gray-50 py-12">
        <div className="container-page">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="section-heading">เอกสารและแบบฟอร์มที่ใช้บ่อย</h2>
              <p className="section-subheading">
                ดาวน์โหลดหรือเปิดดูรายละเอียดแบบฟอร์มคำขอและคู่มือที่เกี่ยวข้อง
              </p>
            </div>
            <Link
              href="/documents"
              className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-800 hover:underline"
            >
              ศูนย์เอกสารทั้งหมด
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {featuredDocuments.map((doc) => (
              <Link
                key={doc.id}
                href={`/documents/${doc.id}`}
                className="group flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-emerald-500"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-700">
                  <FileText className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold leading-snug text-gray-900 group-hover:text-emerald-900">
                    {doc.title}
                  </span>
                  <span className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500">
                    <span>{doc.code}</span>
                    <span className="text-gray-300">|</span>
                    <span>{doc.fileType} · {doc.fileSize}</span>
                  </span>
                </span>
                <ArrowRight className="ml-auto mt-1 h-4 w-4 shrink-0 text-gray-400 group-hover:text-emerald-700" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Related links */}
      <section className="py-12">
        <div className="container-page">
          <h2 className="section-heading">หน่วยงานและแหล่งข้อมูลที่เกี่ยวข้อง</h2>
          <p className="section-subheading">
            เชื่อมโยงไปยังหน่วยงานในระบบสาธารณสุขและองค์กรวิชาชีพที่เกี่ยวข้อง
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start justify-between gap-3 rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-emerald-400"
              >
                <span>
                  <span className="block text-sm font-semibold text-gray-900 group-hover:text-emerald-900">
                    {link.name}
                  </span>
                  <span className="mt-0.5 block text-xs text-gray-500">
                    {link.description}
                  </span>
                </span>
                <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-gray-400 group-hover:text-emerald-700" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="border-t border-gray-200 bg-emerald-50 py-10">
        <div className="container-page flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-bold text-emerald-950">
              ติดต่อศูนย์สอบความรู้ฯ
            </h2>
            <p className="mt-1 text-sm text-emerald-900">
              เจ้าหน้าที่ให้บริการในวันและเวลาราชการ
            </p>
          </div>
          <div className="grid gap-3 text-sm text-emerald-950 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
              <span>{siteInfo.phone}</span>
            </div>
            <div className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
              <span className="break-all">{siteInfo.email}</span>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
              <span>{siteInfo.hours}</span>
            </div>
            <div className="flex items-start gap-2 sm:col-span-2 lg:col-span-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
              <span>{siteInfo.address}</span>
            </div>
          </div>
          <Link href="/contact" className="btn-primary shrink-0">
            ติดต่อเรา
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
