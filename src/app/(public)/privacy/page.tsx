import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Cookie,
  FileCheck,
  Lock,
  Mail,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import { siteInfo } from "@/data/site";

export const metadata: Metadata = {
  title: "นโยบายความเป็นส่วนตัว",
  description:
    "นโยบายการเก็บรวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคลของศูนย์สอบความรู้และทักษะทางวิชาชีพเภสัชกรรม สภาเภสัชกรรม",
};

const sections = [
  {
    title: "1. ผู้ควบคุมข้อมูลส่วนบุคคล",
    body: [
      "ศูนย์สอบความรู้และทักษะทางวิชาชีพเภสัชกรรม สภาเภสัชกรรม เป็นผู้ควบคุมข้อมูลส่วนบุคคลตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 สำหรับข้อมูลที่เก็บรวบรวมผ่านเว็บไซต์และระบบบริการออนไลน์ของศูนย์สอบฯ",
    ],
  },
  {
    title: "2. ข้อมูลส่วนบุคคลที่เก็บรวบรวม",
    body: [
      "ศูนย์สอบฯ เก็บรวบรวมข้อมูลเท่าที่จำเป็นต่อการสมัครสอบ การตรวจสอบสิทธิ์ และการดำเนินการสอบ ได้แก่",
    ],
    list: [
      "ข้อมูลระบุตัวตน เช่น ชื่อ-นามสกุล เลขบัตรประจำตัวประชาชน หรือเลขหนังสือเดินทาง วันเดือนปีเกิด และรูปถ่าย",
      "ข้อมูลติดต่อ เช่น หมายเลขโทรศัพท์ ที่อยู่อีเมล และที่อยู่สำหรับการจัดส่งเอกสาร",
      "ข้อมูลการศึกษา เช่น สถาบันการศึกษา หลักสูตร ปีที่สำเร็จการศึกษา และผลการศึกษา",
      "ข้อมูลการสมัครสอบ เช่น รอบสอบ รายวิชา สนามสอบ และสถานะการชำระค่าธรรมเนียม",
      "ข้อมูลการเข้าใช้งานระบบ เช่น วันเวลา ไอพีแอดเดรส และบันทึกเหตุการณ์เพื่อความปลอดภัย",
    ],
  },
  {
    title: "3. วัตถุประสงค์และฐานทางกฎหมายในการประมวลผล",
    body: [
      "ศูนย์สอบฯ ประมวลผลข้อมูลส่วนบุคคลเพื่อดำเนินการจัดสอบความรู้และทักษะทางวิชาชีพเภสัชกรรม ตามอำนาจหน้าที่ของสภาเภสัชกรรม โดยอาศัยฐานทางกฎหมายดังนี้",
    ],
    list: [
      "ฐานการปฏิบัติตามสัญญา สำหรับการรับสมัคร การชำระค่าธรรมเนียม และการให้บริการสอบ",
      "ฐานหน้าที่ตามกฎหมาย สำหรับการขึ้นทะเบียนและรับใบอนุญาตประกอบวิชาชีพ",
      "ฐานความยินยอม สำหรับการติดต่อสื่อสารหรือการใช้งานที่ไม่จำเป็นต่อการดำเนินการสอบ",
      "ฐานประโยชน์โดยชอบด้วยกฎหมาย สำหรับการรักษาความปลอดภัยของระบบและการป้องกันการทุจริต",
    ],
  },
  {
    title: "4. การเปิดเผยข้อมูลส่วนบุคคล",
    body: [
      "ศูนย์สอบฯ จะไม่เปิดเผยข้อมูลส่วนบุคคลของท่านแก่บุคคลภายนอก เว้นแต่เป็นกรณีที่กฎหมายกำหนด หรือเพื่อดำเนินการจัดสอบร่วมกับหน่วยงานที่เกี่ยวข้อง เช่น สถาบันการศึกษา ศูนย์สอบภูมิภาค หรือหน่วยงานราชการที่มีอำนาจตามกฎหมาย ทั้งนี้ จะจำกัดขอบเขตการเปิดเผยเท่าที่จำเป็น",
    ],
  },
  {
    title: "5. ระยะเวลาการเก็บรักษาข้อมูล",
    body: [
      "ศูนย์สอบฯ เก็บรักษาข้อมูลส่วนบุคคลตามระยะเวลาที่จำเป็นต่อการดำเนินการสอบ การขึ้นทะเบียน และการตรวจสอบย้อนหลังตามระเบียบของสภาเภสัชกรรม เมื่อพ้นระยะเวลาดังกล่าวจะดำเนินการลบหรือทำให้ข้อมูลไม่สามารถระบุตัวตนได้",
    ],
  },
  {
    title: "6. สิทธิของเจ้าของข้อมูลส่วนบุคคล",
    body: [
      "ท่านมีสิทธิตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 ดังนี้",
    ],
    list: [
      "สิทธิขอเข้าถึงและขอรับสำเนาข้อมูลส่วนบุคคลของตน",
      "สิทธิขอแก้ไขข้อมูลให้ถูกต้องและเป็นปัจจุบัน",
      "สิทธิขอลบหรือทำลายข้อมูล หรือทำให้ข้อมูลไม่สามารถระบุตัวตนได้",
      "สิทธิขอระงับการใช้ข้อมูลในกรณีที่จำเป็น",
      "สิทธิคัดค้านการประมวลผลข้อมูล",
      "สิทธิถอนความยินยอม โดยไม่กระทบต่อการประมวลผลที่ได้ดำเนินการไปแล้ว",
    ],
    footer:
      "การยื่นคำขอใช้สิทธิสามารถทำได้ผ่านช่องทางติดต่อของศูนย์สอบฯ โดยต้องแสดงหลักฐานยืนยันตัวตน และศูนย์สอบฯ จะพิจารณาคำขอภายในระยะเวลาที่กฎหมายกำหนด",
  },
  {
    title: "7. การใช้คุกกี้และเทคโนโลยีที่คล้ายกัน",
    body: [
      "เว็บไซต์ใช้คุกกี้ที่จำเป็นต่อการทำงานของระบบ เช่น การจดจำการตั้งค่าความเป็นส่วนตัว และการรักษาความปลอดภัยของเซสชัน ทั้งนี้ ท่านสามารถจัดการคุกกี้ผ่านการตั้งค่าเบราว์เซอร์ได้ แต่การปิดคุกกี้บางประเภทอาจส่งผลต่อการใช้งานบริการบางส่วน",
    ],
  },
  {
    title: "8. มาตรการรักษาความมั่นคงปลอดภัย",
    body: [
      "ศูนย์สอบฯ ใช้มาตรการทางเทคนิคและมาตรการบริหารจัดการที่เหมาะสม เพื่อป้องกันการเข้าถึง การแก้ไข การเปิดเผย หรือการทำลายข้อมูลส่วนบุคคลโดยไม่ได้รับอนุญาต รวมถึงการจำกัดสิทธิ์การเข้าถึงข้อมูลตามหน้าที่ความรับผิดชอบของผู้ปฏิบัติงาน",
    ],
  },
  {
    title: "9. การติดต่อเกี่ยวกับข้อมูลส่วนบุคคล",
    body: [
      `หากท่านมีข้อสงสัยหรือต้องการใช้สิทธิเกี่ยวกับข้อมูลส่วนบุคคล กรุณาติดต่อศูนย์สอบความรู้ฯ โทรศัพท์ ${siteInfo.phone} หรืออีเมล ${siteInfo.email} ในวันและเวลาราชการ`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div>
      <PageHeader
        title="นโยบายความเป็นส่วนตัว"
        description="นโยบายการเก็บรวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคลของศูนย์สอบความรู้ฯ ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562"
        breadcrumbs={[{ label: "นโยบายความเป็นส่วนตัว" }]}
        eyebrow="ข้อกำหนดและนโยบาย"
        meta={
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <span className="badge-green">มีผลบังคับใช้ 1 มกราคม 2569</span>
            <span>ปรับปรุงล่าสุด {siteInfo.updated}</span>
          </div>
        }
      />

      <div className="container-page grid gap-8 py-10 lg:grid-cols-[1fr_18rem]">
        <article className="card p-6 sm:p-8">
          <div className="notice">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
            <p className="leading-7">
              ศูนย์สอบฯ ให้ความสำคัญกับการคุ้มครองข้อมูลส่วนบุคคลของผู้สมัคร
              ผู้เข้าสอบ และผู้ใช้งานเว็บไซต์
              นโยบายฉบับนี้อธิบายถึงข้อมูลที่เก็บรวบรวม วัตถุประสงค์ในการใช้
              และสิทธิของเจ้าของข้อมูลอย่างชัดเจน
            </p>
          </div>

          <div className="prose-official mt-6">
            {sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {"list" in section && section.list && (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {"footer" in section && section.footer && (
                  <p>{section.footer}</p>
                )}
              </section>
            ))}
          </div>

          <div className="mt-8 rounded-md border border-gray-200 bg-gray-50 p-5">
            <h2 className="flex items-center gap-2 text-base font-bold text-gray-900">
              <Mail className="h-5 w-5 text-emerald-700" />
              ช่องทางติดต่อเจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล
            </h2>
            <div className="mt-3 grid gap-2 text-sm text-gray-700 sm:grid-cols-2">
              <p>
                โทรศัพท์:{" "}
                <a
                  href={`tel:${siteInfo.phoneHref}`}
                  className="font-semibold text-emerald-800 hover:underline"
                >
                  {siteInfo.phone}
                </a>
              </p>
              <p>
                อีเมล:{" "}
                <a
                  href={`mailto:${siteInfo.email}`}
                  className="break-all font-semibold text-emerald-800 hover:underline"
                >
                  {siteInfo.email}
                </a>
              </p>
              <p className="sm:col-span-2">{siteInfo.hours}</p>
            </div>
          </div>
        </article>

        <aside className="space-y-4 lg:sticky lg:top-32 lg:self-start">
          <div className="card p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold text-gray-900">
              <Lock className="h-4 w-4 text-emerald-700" />
              สรุปสาระสำคัญ
            </h2>
            <ul className="mt-3 space-y-2.5 text-sm text-gray-700">
              {[
                "เก็บข้อมูลเท่าที่จำเป็นต่อการจัดสอบ",
                "ใช้ข้อมูลเพื่อการสมัครสอบและการขึ้นทะเบียน",
                "ไม่เปิดเผยข้อมูลแก่บุคคลภายนอกโดยไม่จำเป็น",
                "เจ้าของข้อมูลมีสิทธิเข้าถึง แก้ไข และลบข้อมูล",
                "มีมาตรการรักษาความปลอดภัยของข้อมูล",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <UserCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold text-gray-900">
              <Cookie className="h-4 w-4 text-emerald-700" />
              การตั้งค่าคุกกี้
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              ท่านสามารถเปลี่ยนแปลงหรือเพิกถอนความยินยอมการใช้คุกกี้ที่ไม่จำเป็นได้
              โดยล้างข้อมูลเว็บไซต์ในการตั้งค่าเบราว์เซอร์
            </p>
          </div>

          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold text-emerald-950">
              <FileCheck className="h-4 w-4" />
              เอกสารที่เกี่ยวข้อง
            </h2>
            <div className="mt-3 space-y-2 text-sm">
              <Link
                href="/terms"
                className="flex items-center justify-between gap-2 font-semibold text-emerald-900 hover:underline"
              >
                ข้อกำหนดการใช้งาน
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/documents"
                className="flex items-center justify-between gap-2 font-semibold text-emerald-900 hover:underline"
              >
                เอกสารและแบบฟอร์ม
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-between gap-2 font-semibold text-emerald-900 hover:underline"
              >
                ติดต่อศูนย์สอบฯ
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
