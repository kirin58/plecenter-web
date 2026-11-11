import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  ClipboardList,
  FileText,
  GraduationCap,
  Mail,
  Network,
  Phone,
  Scale,
  ShieldCheck,
  Users,
} from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import { siteInfo } from "@/data/site";

export const metadata: Metadata = {
  title: "คณะอนุกรรมการและคณะทำงาน",
  description:
    "รายชื่อคณะอนุกรรมการสอบความรู้ฯ และคณะทำงานที่รับผิดชอบการจัดการสอบ การสร้างข้อสอบ และการประเมินทักษะวิชาชีพเภสัชกรรม",
};

const committees = [
  {
    title:
      "คณะอนุกรรมการสอบความรู้ผู้ขอขึ้นทะเบียนและรับใบอนุญาตเป็นผู้ประกอบวิชาชีพเภสัชกรรม",
    role: "กำกับและกำหนดทิศทางการจัดการสอบ",
    icon: ShieldCheck,
    duties: [
      "กำกับการจัดการสอบความรู้และดำเนินการที่เกี่ยวข้อง",
      "จัดให้มีการฝึกปฏิบัติงานวิชาชีพและดำเนินการที่เกี่ยวข้อง",
      "เสนอชื่อผู้ผ่านการสอบและผ่านการฝึกปฏิบัติงานต่อสภาเภสัชกรรม",
      "เสนอแผนงบประมาณและผลการดำเนินงานต่อสภาเภสัชกรรม",
      "เสนอระเบียบและประกาศที่เกี่ยวข้อง",
      "แต่งตั้งคณะทำงานหรือมอบหมายผู้ปฏิบัติหน้าที่",
    ],
  },
  {
    title: "คณะทำงานสร้างข้อสอบ",
    role: "จัดทำและกลั่นกรองข้อสอบ",
    icon: BookOpen,
    duties: [
      "สร้างข้อสอบความรู้สำหรับผู้ขอขึ้นทะเบียนเป็นผู้ประกอบวิชาชีพเภสัชกรรม",
      "ประสานความร่วมมือกับคณะเภสัชศาสตร์ในการออกข้อสอบ",
      "กลั่นกรองข้อสอบให้สอดคล้องกับสมรรถนะวิชาชีพ",
      "ปฏิบัติหน้าที่อื่นตามที่คณะอนุกรรมการมอบหมาย",
    ],
  },
  {
    title: "คณะทำงานพัฒนาและคัดเลือกข้อสอบ",
    role: "พัฒนาและคัดเลือกข้อสอบที่มีคุณภาพ",
    icon: ClipboardList,
    duties: [
      "พิจารณา กลั่นกรอง และคัดเลือกข้อสอบในชุดวิชาต่าง ๆ",
      "พัฒนาและปรับปรุงข้อสอบให้มีคุณภาพและความเป็นธรรม",
      "จัดเตรียมข้อสอบสำหรับการสอบแต่ละครั้ง",
      "ปฏิบัติหน้าที่อื่นตามที่คณะอนุกรรมการมอบหมาย",
    ],
  },
  {
    title: "คณะทำงานพัฒนามาตรฐานการฝึกปฏิบัติงานวิชาชีพ",
    role: "กำหนดมาตรฐานแหล่งฝึกและกระบวนการฝึก",
    icon: GraduationCap,
    duties: [
      "พัฒนาเกณฑ์มาตรฐานแหล่งฝึกปฏิบัติงานวิชาชีพ",
      "ประเมินและรับรองแหล่งฝึกตามหลักเกณฑ์",
      "ติดตามและประเมินผลการฝึกปฏิบัติงาน",
    ],
  },
  {
    title: "คณะทำงานพัฒนามาตรฐานทักษะวิชาชีพด้านการเตรียมยา",
    role: "กำหนดมาตรฐานทักษะการเตรียมยา",
    icon: FileText,
    duties: [
      "กำหนดรายการทักษะและเกณฑ์การประเมินด้านการเตรียมยา",
      "พัฒนาเครื่องมือและสถานการณ์ประเมินทักษะ",
      "ทบทวนมาตรฐานให้สอดคล้องกับแนวปฏิบัติทางวิชาชีพ",
    ],
  },
  {
    title: "คณะทำงานพัฒนามาตรฐานทักษะวิชาชีพด้านการจ่ายยา",
    role: "กำหนดมาตรฐานทักษะการจ่ายยา",
    icon: Award,
    duties: [
      "กำหนดรายการทักษะและเกณฑ์การประเมินด้านการจ่ายยา",
      "พัฒนาเครื่องมือและสถานการณ์ประเมินทักษะ",
      "ทบทวนมาตรฐานให้สอดคล้องกับแนวปฏิบัติทางวิชาชีพ",
    ],
  },
];

export default function CommitteesPage() {
  return (
    <div>
      <PageHeader
        title="คณะอนุกรรมการและคณะทำงาน"
        description="โครงสร้างการกำกับดูแล การกิจ และองค์ประกอบของคณะอนุกรรมการสอบความรู้ฯ และคณะทำงานเฉพาะด้านที่สนับสนุนการจัดการสอบ"
        breadcrumbs={[
          { label: "เกี่ยวกับเรา" },
          { label: "คณะอนุกรรมการและคณะทำงาน" },
        ]}
        eyebrow="เกี่ยวกับเรา"
      />

      <div className="container-page grid gap-8 py-10 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-6">
          <section className="prose-official">
            <p>
              การจัดการสอบความรู้ทางวิชาชีพเภสัชกรรมอยู่ภายใต้การกำกับดูแลของ
              คณะอนุกรรมการสอบความรู้ผู้ขอขึ้นทะเบียนและรับใบอนุญาตเป็นผู้ประกอบวิชาชีพเภสัชกรรม
              โดยมีคณะทำงานเฉพาะด้านทำหน้าที่จัดทำ พัฒนา และคัดเลือกข้อสอบ
              ตลอดจนกำหนดมาตรฐานทักษะวิชาชีพที่ใช้ในการประเมิน
            </p>
            <p>
              ผู้ดำรงตำแหน่งในคณะอนุกรรมการและคณะทำงานต้องมีคุณสมบัติตามประกาศสภาเภสัชกรรม
              ที่ 11/2549 เรื่อง คุณสมบัติของคณะกรรมการ อนุกรรมการ และคณะทำงาน
              ที่เกี่ยวข้องกับการสอบความรู้ฯ
            </p>
          </section>

          <div className="space-y-3">
            {committees.map((committee) => {
              const Icon = committee.icon;
              return (
                <section key={committee.title} className="card p-5 sm:p-6">
                  <div className="flex items-start gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-emerald-100 bg-emerald-50 text-emerald-700">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className="text-base font-bold leading-snug text-gray-900 sm:text-lg">
                        {committee.title}
                      </h2>
                      <p className="mt-0.5 text-sm text-emerald-800">
                        {committee.role}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 border-t border-gray-100 pt-4">
                    <h3 className="text-xs font-bold uppercase tracking-wide text-gray-500">
                      อำนาจและหน้าที่
                    </h3>
                    <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
                      {committee.duties.map((duty) => (
                        <li
                          key={duty}
                          className="flex items-start gap-2 text-sm leading-6 text-gray-700"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" />
                          {duty}
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              );
            })}
          </div>

          <section className="rounded-lg border border-gray-200 bg-gray-50 p-5">
            <h2 className="flex items-center gap-2 text-base font-bold text-gray-900">
              <Network className="h-5 w-5 text-emerald-700" />
              การเชื่อมโยงการดำเนินงาน
            </h2>
            <p className="mt-2 text-sm leading-7 text-gray-600">
              คณะอนุกรรมการสอบความรู้ฯ ทำหน้าที่กำกับนโยบายและพิจารณาเรื่องสำคัญ
              ส่วนคณะทำงานเฉพาะด้านรับผิดชอบงานวิชาการและมาตรฐานทักษะ
              โดยมีศูนย์สอบความรู้ฯ ทำหน้าที่เป็นหน่วยปฏิบัติงานและเลขานุการ
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/about" className="btn-secondary text-sm">
                เกี่ยวกับศูนย์สอบฯ
              </Link>
              <Link href="/regulations" className="btn-neutral text-sm">
                ประกาศและระเบียบที่เกี่ยวข้อง
              </Link>
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <div className="card p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold text-gray-900">
              <Users className="h-4 w-4 text-emerald-700" />
              ประกาศที่เกี่ยวข้อง
            </h2>
            <ul className="mt-3 space-y-3 text-sm">
              <li>
                <Link
                  href="/news/7"
                  className="block leading-snug text-gray-700 hover:text-emerald-800 hover:underline"
                >
                  ประกาศคณะอนุกรรมการสอบความรู้ฯ ที่ 1/2569
                  เรื่อง แนวทางปฏิบัติของผู้เข้าสอบและสนามสอบ
                </Link>
                <span className="mt-0.5 block text-xs text-gray-500">
                  20 สิงหาคม 2569
                </span>
              </li>
              <li>
                <Link
                  href="/news/8"
                  className="block leading-snug text-gray-700 hover:text-emerald-800 hover:underline"
                >
                  ข้อบังคับสภาเภสัชกรรมว่าด้วยเกณฑ์ความรู้ความสามารถทางวิชาชีพ
                  (ฉบับปรับปรุง)
                </Link>
                <span className="mt-0.5 block text-xs text-gray-500">
                  1 กรกฎาคม 2569
                </span>
              </li>
              <li>
                <Link
                  href="/news/6"
                  className="block leading-snug text-gray-700 hover:text-emerald-800 hover:underline"
                >
                  ประกาศศูนย์สอบฯ ที่ 3/2569 เรื่อง การสอบ PLE-IP2 ประจำปี 2570
                </Link>
                <span className="mt-0.5 block text-xs text-gray-500">
                  15 กันยายน 2569
                </span>
              </li>
            </ul>
            <Link
              href="/news"
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-emerald-800 hover:underline"
            >
              ดูประกาศทั้งหมด
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="card p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold text-gray-900">
              <Scale className="h-4 w-4 text-emerald-700" />
              เอกสารอ้างอิง
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href="/documents/12"
                  className="flex items-start gap-2 text-gray-700 hover:text-emerald-800 hover:underline"
                >
                  <FileText className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                  คู่มือทักษะตามเกณฑ์ความรู้ความสามารถทางวิชาชีพฯ
                </Link>
              </li>
              <li>
                <Link
                  href="/regulations"
                  className="flex items-start gap-2 text-gray-700 hover:text-emerald-800 hover:underline"
                >
                  <Scale className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                  ระเบียบและเกณฑ์การสอบ
                </Link>
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
            <h2 className="text-sm font-bold text-emerald-950">
              ติดต่อฝ่ายเลขานุการ
            </h2>
            <p className="mt-2 text-sm leading-6 text-emerald-900">
              สอบถามข้อมูลการประชุมหรือการประสานงานคณะกรรมการ
              ได้ในวันและเวลาราชการ
            </p>
            <div className="mt-3 space-y-2 text-sm text-emerald-900">
              <a
                href={`tel:${siteInfo.phoneHref}`}
                className="flex items-center gap-2 hover:underline"
              >
                <Phone className="h-4 w-4 text-emerald-700" />
                {siteInfo.phone}
              </a>
              <a
                href={`mailto:${siteInfo.email}`}
                className="flex items-center gap-2 break-all hover:underline"
              >
                <Mail className="h-4 w-4 shrink-0 text-emerald-700" />
                {siteInfo.email}
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
