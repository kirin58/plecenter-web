import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building,
  Check,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Handshake,
  Mail,
  MapPin,
  Network,
  Phone,
  ScrollText,
  ShieldCheck,
  Users,
} from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import { siteInfo } from "@/data/site";

export const metadata: Metadata = {
  title: "เกี่ยวกับศูนย์สอบฯ",
  description:
    "บทบาท หน้าที่ ขอบเขตการดำเนินงาน และโครงสร้างการบริหารของศูนย์สอบความรู้และทักษะทางวิชาชีพเภสัชกรรม สภาเภสัชกรรม",
};

const duties = [
  {
    title: "การจัดการสอบ",
    description:
      "รับสมัคร จัดสนามสอบ ห้องสอบ และเลขที่นั่งสอบ ดูแลความปลอดภัยของข้อสอบ ตรวจให้คะแนน และประกาศผล",
    icon: ClipboardCheck,
  },
  {
    title: "ฐานข้อมูลผู้เข้าสอบ",
    description:
      "จัดเก็บประวัติการสมัคร คะแนนสอบ ผลการประเมิน และข้อมูลที่เกี่ยวข้องอย่างเป็นระบบและปลอดภัย",
    icon: Network,
  },
  {
    title: "การให้บริการและประชาสัมพันธ์",
    description:
      "ให้ข้อมูลการสอบ รับฟังข้อซักถาม และเผยแพร่ประกาศของศูนย์สอบฯ ผ่านช่องทางที่เข้าถึงได้",
    icon: Handshake,
  },
  {
    title: "การประสานงานคณะกรรมการ",
    description:
      "สนับสนุนงานธุรการและการประชุมของคณะอนุกรรมการสอบความรู้ฯ และคณะทำงานที่เกี่ยวข้อง",
    icon: Users,
  },
  {
    title: "การฝึกปฏิบัติงานวิชาชีพ",
    description:
      "ประสานงานแหล่งฝึกและติดตามการฝึกปฏิบัติงานของผู้สำเร็จการศึกษาจากต่างประเทศตามหลักเกณฑ์",
    icon: GraduationCap,
  },
];

const principles = [
  "ถูกต้องตามข้อบังคับและประกาศที่เกี่ยวข้อง",
  "เป็นธรรมและเท่าเทียมต่อผู้เข้าสอบทุกราย",
  "โปร่งใส ตรวจสอบได้ และเผยแพร่ข้อมูลอย่างเหมาะสม",
  "รวดเร็วและเข้าถึงง่ายผ่านบริการออนไลน์",
];

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        title="เกี่ยวกับศูนย์สอบความรู้ฯ"
        description="บทบาท หน้าที่ ขอบเขตการดำเนินงาน และหลักการให้บริการของศูนย์สอบความรู้และทักษะทางวิชาชีพเภสัชกรรม สภาเภสัชกรรม"
        breadcrumbs={[{ label: "เกี่ยวกับเรา" }, { label: "เกี่ยวกับศูนย์สอบฯ" }]}
        eyebrow="เกี่ยวกับเรา"
      />

      <div className="container-page grid gap-8 py-10 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-8">
          <section className="prose-official">
            <h2 className="!mt-0">บทบาทและหน้าที่</h2>
            <p>
              ศูนย์สอบความรู้และทักษะทางวิชาชีพเภสัชกรรม
              เป็นหน่วยงานภายใต้สภาเภสัชกรรม
              มีหน้าที่ดำเนินการจัดสอบความรู้และทักษะทางวิชาชีพเภสัชกรรม
              สำหรับผู้ขอขึ้นทะเบียนและรับใบอนุญาตเป็นผู้ประกอบวิชาชีพเภสัชกรรม
              ให้เป็นไปตามข้อบังคับและประกาศของสภาเภสัชกรรม
            </p>
            <p>
              การดำเนินงานครอบคลุมตั้งแต่การรับสมัครสอบ การจัดสนามสอบ
              การรักษาความปลอดภัยของข้อสอบ การตรวจให้คะแนน
              การประมวลผลและการประกาศผล ไปจนถึงการให้บริการข้อมูลแก่ผู้เข้าสอบ
              และการประสานงานกับคณะอนุกรรมการและคณะทำงานที่เกี่ยวข้อง
            </p>
          </section>

          <section>
            <h2 className="section-heading">ขอบเขตการดำเนินงาน</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {duties.map((duty) => {
                const Icon = duty.icon;
                return (
                  <div key={duty.title} className="card p-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-md bg-emerald-50 text-emerald-700">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-3 text-base font-bold text-gray-900">
                      {duty.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      {duty.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="card p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
              <Network className="h-5 w-5 text-emerald-700" />
              โครงสร้างการดำเนินงาน
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              ศูนย์สอบฯ มีผู้อำนวยการและเจ้าหน้าที่ปฏิบัติงาน
              โดยได้รับกำกับดูแลจากคณะอนุกรรมการสอบความรู้ฯ
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div className="rounded-md border border-emerald-200 bg-emerald-50 p-4">
                <div className="text-xs font-bold uppercase tracking-wide text-emerald-700">
                  กำกับดูแล
                </div>
                <div className="mt-1 text-sm font-bold text-gray-900">
                  คณะอนุกรรมการสอบความรู้ฯ
                </div>
                <p className="mt-1 text-xs leading-5 text-gray-600">
                  กำหนดนโยบายและกำกับการจัดการสอบ
                </p>
              </div>
              <div className="rounded-md border border-gray-200 bg-white p-4">
                <div className="text-xs font-bold uppercase tracking-wide text-gray-500">
                  บริหารงาน
                </div>
                <div className="mt-1 text-sm font-bold text-gray-900">
                  ผู้อำนวยการศูนย์สอบฯ
                </div>
                <p className="mt-1 text-xs leading-5 text-gray-600">
                  บริหารการดำเนินงานและประสานงานที่เกี่ยวข้อง
                </p>
              </div>
              <div className="rounded-md border border-gray-200 bg-white p-4">
                <div className="text-xs font-bold uppercase tracking-wide text-gray-500">
                  ปฏิบัติงาน
                </div>
                <div className="mt-1 text-sm font-bold text-gray-900">
                  เจ้าหน้าที่ศูนย์สอบฯ
                </div>
                <p className="mt-1 text-xs leading-5 text-gray-600">
                  งานธุรการ งานจัดการสอบ และงานบริการผู้เข้าสอบ
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/committees" className="btn-secondary">
                ดูคณะอนุกรรมการและคณะทำงาน
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/regulations" className="btn-neutral">
                ระเบียบและประกาศที่เกี่ยวข้อง
              </Link>
            </div>
          </section>

          <section>
            <h2 className="section-heading">หลักการให้บริการ</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {principles.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 rounded-md border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
            <h2 className="flex items-center gap-2 text-base font-bold text-emerald-950">
              <ShieldCheck className="h-5 w-5 text-emerald-700" />
              การคุ้มครองข้อมูลส่วนบุคคล
            </h2>
            <p className="mt-2 text-sm leading-7 text-emerald-900">
              ศูนย์สอบฯ เก็บรวบรวมและใช้ข้อมูลส่วนบุคคลเท่าที่จำเป็นสำหรับการสมัครสอบ
              การจัดสอบ และการประกาศผล โดยดำเนินการตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล
              พ.ศ. 2562 และนโยบายความเป็นส่วนตัวของสภาเภสัชกรรม
            </p>
            <Link
              href="/privacy"
              className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-emerald-900 hover:underline"
            >
              อ่านนโยบายความเป็นส่วนตัว
              <ArrowRight className="h-4 w-4" />
            </Link>
          </section>
        </div>

        <aside className="space-y-4">
          <div className="card p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold text-gray-900">
              <Building className="h-4 w-4 text-emerald-700" />
              ที่ตั้งสำนักงาน
            </h2>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              {siteInfo.address}
            </p>
            <div className="mt-4 space-y-2.5 border-t border-gray-100 pt-4 text-sm">
              <a
                href={`tel:${siteInfo.phoneHref}`}
                className="flex items-start gap-2 text-gray-700 hover:text-emerald-800"
              >
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                {siteInfo.phone}
              </a>
              <a
                href={`mailto:${siteInfo.email}`}
                className="flex items-start gap-2 break-all text-gray-700 hover:text-emerald-800"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                {siteInfo.email}
              </a>
            </div>
            <a
              href={siteInfo.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-neutral mt-4 w-full text-sm"
            >
              <MapPin className="h-4 w-4" />
              เปิดแผนที่
            </a>
          </div>

          <div className="card p-5">
            <h2 className="text-sm font-bold text-gray-900">เอกสารที่เกี่ยวข้อง</h2>
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
                  <ScrollText className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                  ระเบียบและเกณฑ์การสอบ
                </Link>
              </li>
              <li>
                <Link
                  href="/examinees"
                  className="flex items-start gap-2 text-gray-700 hover:text-emerald-800 hover:underline"
                >
                  <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                  ข้อมูลสำหรับผู้เข้าสอบ
                </Link>
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-amber-200 bg-amber-50 p-5">
            <div className="flex items-center gap-2 text-sm font-bold text-amber-900">
              <BadgeCheck className="h-4 w-4" />
              ช่องทางติดต่อราชการ
            </div>
            <p className="mt-2 text-sm leading-6 text-amber-900">
              ติดต่อเจ้าหน้าที่ในวันและเวลาราชการ
              หรือส่งข้อความผ่านแบบฟอร์มติดต่อออนไลน์
            </p>
            <Link
              href="/contact"
              className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-amber-900 hover:underline"
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
