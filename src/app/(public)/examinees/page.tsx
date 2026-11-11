import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CalendarDays,
  Check,
  ClipboardList,
  FileText,
  GraduationCap,
  Hash,
  Info,
  ListChecks,
  LogIn,
  MapPin,
  Phone,
  SearchCheck,
  ShieldCheck,
  Users,
} from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import { applicationSteps, siteInfo } from "@/data/site";

export const metadata: Metadata = {
  title: "ข้อมูลสำหรับผู้เข้าสอบ",
  description:
    "คุณสมบัติผู้สมัคร ประเภทการสมัคร รหัสประจำตัวผู้สอบ ขั้นตอนการสมัคร และข้อปฏิบัติก่อนและหลังวันสอบสำหรับผู้เข้าสอบเภสัชกรรม",
};

const sections = [
  { id: "qualifications", label: "คุณสมบัติผู้สมัคร" },
  { id: "application-types", label: "ประเภทการสมัคร" },
  { id: "candidate-id", label: "รหัสประจำตัวผู้สอบ" },
  { id: "process", label: "ขั้นตอนการสมัคร" },
  { id: "before-exam", label: "ก่อนวันสอบ" },
  { id: "after-exam", label: "ผลการสอบ" },
];

const institutionCodes = [
  ["01x", "จุฬาลงกรณ์มหาวิทยาลัย"],
  ["02x", "มหาวิทยาลัยขอนแก่น"],
  ["03x", "มหาวิทยาลัยเชียงใหม่"],
  ["04x", "มหาวิทยาลัยนเรศวร"],
  ["05x", "มหาวิทยาลัยมหาสารคาม"],
  ["06x", "มหาวิทยาลัยมหิดล"],
  ["07x", "มหาวิทยาลัยศรีนครินทรวิโรฒ"],
  ["08x", "มหาวิทยาลัยศิลปากร"],
  ["09x", "มหาวิทยาลัยสงขลานครินทร์"],
  ["10x", "มหาวิทยาลัยอุบลราชธานี"],
  ["11x", "มหาวิทยาลัยพายัพ"],
  ["14x", "มหาวิทยาลัยสยาม"],
  ["15x", "มหาวิทยาลัยวลัยลักษณ์"],
  ["16x", "มหาวิทยาลัยพะเยา"],
  ["17x", "มหาวิทยาลัยอีสเทิร์นเอเชีย"],
  ["18x", "มหาวิทยาลัยธรรมศาสตร์"],
  ["19x", "มหาวิทยาลัยบูรพา"],
  ["20x", "มหาวิทยาลัยรังสิต"],
  ["25x", "มหาวิทยาลัยเวสเทิร์น"],
  ["30x", "มหาวิทยาลัยหัวเฉียวเฉลิมพระเกียรติ"],
  ["510", "มหาวิทยาลัยในฟิลิปปินส์"],
  ["511", "มหาวิทยาลัยในอินเดีย"],
  ["512", "มหาวิทยาลัยในญี่ปุ่น"],
  ["513", "มหาวิทยาลัยอื่น ๆ ในเอเชีย"],
  ["520", "มหาวิทยาลัยในอเมริกา"],
  ["530", "มหาวิทยาลัยในยุโรป"],
  ["540", "มหาวิทยาลัยในออสเตรเลียและนิวซีแลนด์"],
];

export default function ExamineesPage() {
  return (
    <div>
      <PageHeader
        title="ข้อมูลสำหรับผู้เข้าสอบ"
        description="คุณสมบัติการสมัคร ประเภทการสมัคร รหัสประจำตัวผู้สอบ ขั้นตอนการสมัคร และข้อปฏิบัติที่ควรทราบก่อนและหลังการสอบ"
        breadcrumbs={[
          { label: "เกี่ยวกับเรา" },
          { label: "ข้อมูลสำหรับผู้เข้าสอบ" },
        ]}
        eyebrow="เกี่ยวกับเรา"
        actions={
          <>
            <Link href="/apply" className="btn-primary">
              สมัครสอบออนไลน์
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/scores" className="btn-secondary">
              <SearchCheck className="h-4 w-4" />
              ตรวจสอบสถานะ
            </Link>
          </>
        }
      />

      <div className="container-page grid gap-8 py-10 lg:grid-cols-[1fr_17rem]">
        <div className="min-w-0 space-y-8">
          <section id="qualifications" className="scroll-mt-32">
            <h2 className="section-heading flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-emerald-700" />
              คุณสมบัติผู้สมัคร
            </h2>
            <div className="mt-4 overflow-hidden rounded-lg border border-gray-200">
              <table className="table-official">
                <tbody>
                  <tr>
                    <th className="w-56 bg-gray-50 text-left text-sm font-bold text-gray-800">
                      วุฒิการศึกษา
                    </th>
                    <td>
                      สำเร็จการศึกษาหลักสูตรเภสัชศาสตรบัณฑิตหรือเทียบเท่า
                      ที่สภาเภสัชกรรมรับรอง
                    </td>
                  </tr>
                  <tr>
                    <th className="bg-gray-50 text-left text-sm font-bold text-gray-800">
                      สถานะสมาชิก
                    </th>
                    <td>
                      เป็นสมาชิกสภาเภสัชกรรม หรือยื่นคำขอสมัครสมาชิกพร้อมกับการสมัครสอบ
                    </td>
                  </tr>
                  <tr>
                    <th className="bg-gray-50 text-left text-sm font-bold text-gray-800">
                      การฝึกปฏิบัติงาน
                    </th>
                    <td>
                      ผ่านการฝึกปฏิบัติงานวิชาชีพตามหลักเกณฑ์ที่สภาเภสัชกรรมกำหนด
                      หรือมีกำหนดการฝึกที่ชัดเจน
                    </td>
                  </tr>
                  <tr>
                    <th className="bg-gray-50 text-left text-sm font-bold text-gray-800">
                      ลักษณะต้องห้าม
                    </th>
                    <td>ไม่มีลักษณะต้องห้ามตามพระราชบัญญัติวิชาชีพเภสัชกรรม</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="notice mt-4">
              <Info className="mt-0.5 h-5 w-5 shrink-0" />
              <p>
                ผู้สมัครควรตรวจสอบรายวิชาที่ต้องสอบและผลการสอบเดิมก่อนยื่นใบสมัคร
                เพื่อไม่ให้สมัครซ้ำในรายวิชาที่ผ่านแล้ว
              </p>
            </div>
          </section>

          <section id="application-types" className="scroll-mt-32">
            <h2 className="section-heading flex items-center gap-2">
              <Users className="h-5 w-5 text-emerald-700" />
              ประเภทการสมัคร
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="card p-5">
                <h3 className="text-base font-bold text-gray-900">
                  สมัครผ่านคณะเภสัชศาสตร์
                </h3>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  สำหรับผู้กำลังจะสำเร็จการศึกษาหรือสถาบันที่ประสงค์จะรวบรวมใบสมัคร
                  และส่งข้อมูลผ่านช่องทางคณะส่งสมัคร
                </p>
                <ul className="mt-3 space-y-1.5 text-sm text-gray-700">
                  <li className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                    ใบสมัครที่ลงนามครบถ้วน
                  </li>
                  <li className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                    หลักฐานการศึกษาหรือหนังสือรับรองจากสถาบัน
                  </li>
                  <li className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                    รูปถ่ายและหลักฐานการชำระเงิน
                  </li>
                </ul>
                <Link
                  href="/documents/7"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-emerald-800 hover:underline"
                >
                  คู่มือการสมัครผ่านคณะ
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="card p-5">
                <h3 className="text-base font-bold text-gray-900">
                  สมัครด้วยตนเอง
                </h3>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  สำหรับผู้สำเร็จการศึกษาแล้วและประสงค์จะสมัครเป็นรายบุคคล
                  ผ่านระบบออนไลน์ของศูนย์สอบฯ
                </p>
                <ul className="mt-3 space-y-1.5 text-sm text-gray-700">
                  <li className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                    บัตรประจำตัวประชาชน
                  </li>
                  <li className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                    หลักฐานการศึกษาและใบรับรองการฝึกปฏิบัติงาน
                  </li>
                  <li className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                    รูปถ่ายขนาดและรูปแบบตามที่กำหนด
                  </li>
                </ul>
                <Link
                  href="/documents/8"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-emerald-800 hover:underline"
                >
                  คู่มือการสมัครรายบุคคล
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>

          <section id="candidate-id" className="scroll-mt-32">
            <h2 className="section-heading flex items-center gap-2">
              <Hash className="h-5 w-5 text-emerald-700" />
              รหัสประจำตัวผู้สอบ 9 หลัก
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              รหัสประจำตัวผู้สอบประกอบด้วยตัวเลข 9 หลัก แบ่งเป็น 3 ส่วน
            </p>

            <div className="mt-4 overflow-hidden rounded-lg border border-gray-200">
              <div className="grid grid-cols-3 divide-x divide-gray-200 bg-emerald-50 text-center">
                <div className="px-3 py-4">
                  <div className="text-xs font-semibold text-emerald-700">
                    ส่วน ก · 2 หลัก
                  </div>
                  <div className="mt-1 font-mono text-2xl font-bold text-emerald-900">
                    69
                  </div>
                  <div className="mt-1 text-xs text-emerald-800">
                    ปี พ.ศ. ที่สมัคร (2 หลักท้าย)
                  </div>
                </div>
                <div className="px-3 py-4">
                  <div className="text-xs font-semibold text-emerald-700">
                    ส่วน ข · 3 หลัก
                  </div>
                  <div className="mt-1 font-mono text-2xl font-bold text-emerald-900">
                    010
                  </div>
                  <div className="mt-1 text-xs text-emerald-800">
                    รหัสสถาบันที่สภาเภสัชกรรมกำหนด
                  </div>
                </div>
                <div className="px-3 py-4">
                  <div className="text-xs font-semibold text-emerald-700">
                    ส่วน ค · 4 หลัก
                  </div>
                  <div className="mt-1 font-mono text-2xl font-bold text-emerald-900">
                    0001
                  </div>
                  <div className="mt-1 text-xs text-emerald-800">
                    ลำดับของผู้สมัครในปีนั้น
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 bg-white px-4 py-3 text-sm text-gray-600">
                ตัวอย่างรหัสประจำตัวผู้สอบ:{" "}
                <span className="font-mono font-bold text-gray-900">69 010 0001</span>
              </div>
            </div>

            <details className="mt-4 rounded-lg border border-gray-200 bg-white">
              <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50">
                ดูรหัสสถาบันการศึกษา
              </summary>
              <div className="border-t border-gray-200 px-4 py-3">
                <div className="grid gap-x-8 gap-y-1.5 text-sm sm:grid-cols-2">
                  {institutionCodes.map(([code, name]) => (
                    <div
                      key={code}
                      className="flex items-baseline justify-between gap-3 border-b border-gray-50 py-1.5"
                    >
                      <span className="font-mono text-xs font-semibold text-emerald-800">
                        {code}
                      </span>
                      <span className="text-right text-gray-700">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </details>

            <div className="notice mt-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
              <p>
                รหัสประจำตัวผู้สอบจะกำหนดโดยศูนย์สอบฯ
                ผู้สมัครไม่สามารถกำหนดรหัสด้วยตนเองได้
                และควรตรวจสอบรหัสให้ถูกต้องก่อนพิมพ์บัตรประจำตัวผู้สอบ
              </p>
            </div>
          </section>

          <section id="process" className="scroll-mt-32">
            <h2 className="section-heading flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-emerald-700" />
              ขั้นตอนการสมัครสอบ
            </h2>
            <div className="mt-4 space-y-2">
              {applicationSteps.map((step) => (
                <div
                  key={step.step}
                  className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-sm font-bold text-white">
                    {step.step}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">
                      {step.title}
                    </h3>
                    <p className="mt-0.5 text-sm leading-6 text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/apply" className="btn-primary">
                เริ่มสมัครสอบ
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/documents/8" className="btn-secondary">
                <FileText className="h-4 w-4" />
                คู่มือการสมัคร
              </Link>
              <Link href="/exam-registration" className="btn-neutral">
                <LogIn className="h-4 w-4" />
                ลงทะเบียนเข้าสอบ
              </Link>
            </div>
          </section>

          <section id="before-exam" className="scroll-mt-32">
            <h2 className="section-heading flex items-center gap-2">
              <ListChecks className="h-5 w-5 text-emerald-700" />
              สิ่งที่ต้องเตรียมก่อนวันสอบ
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="card p-5">
                <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900">
                  <BadgeCheck className="h-4 w-4 text-emerald-700" />
                  เอกสารและหลักฐาน
                </h3>
                <ul className="mt-2 space-y-1.5 text-sm text-gray-700">
                  <li>บัตรประจำตัวประชาชนฉบับจริงที่ยังไม่หมดอายุ</li>
                  <li>บัตรประจำตัวผู้สอบที่พิมพ์จากระบบ</li>
                  <li>หลักฐานการชำระเงิน (หากระบบกำหนด)</li>
                </ul>
              </div>
              <div className="card p-5">
                <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900">
                  <MapPin className="h-4 w-4 text-emerald-700" />
                  การเดินทางและเวลา
                </h3>
                <ul className="mt-2 space-y-1.5 text-sm text-gray-700">
                  <li>ตรวจสอบสนามสอบ อาคาร และห้องสอบล่วงหน้า</li>
                  <li>เผื่อเวลาเดินทางอย่างน้อย 60 นาที</li>
                  <li>มาถึงสนามสอบก่อนเวลาเริ่มสอบตามที่กำหนด</li>
                </ul>
              </div>
              <div className="card p-5">
                <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900">
                  <BookOpen className="h-4 w-4 text-emerald-700" />
                  การเตรียมความรู้
                </h3>
                <ul className="mt-2 space-y-1.5 text-sm text-gray-700">
                  <li>ศึกษาระเบียบและเกณฑ์การสอบล่าสุด</li>
                  <li>ฝึกทำตัวอย่างข้อสอบและทดลองระบบ E-Exam</li>
                  <li>ตรวจสอบรายวิชาและรูปแบบการสอบให้ชัดเจน</li>
                </ul>
              </div>
              <div className="card p-5">
                <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900">
                  <CalendarDays className="h-4 w-4 text-emerald-700" />
                  สุขภาพและความพร้อม
                </h3>
                <ul className="mt-2 space-y-1.5 text-sm text-gray-700">
                  <li>พักผ่อนให้เพียงพอและเตรียมความพร้อมทางร่างกาย</li>
                  <li>ปฏิบัติตามแนวทางด้านสุขอนามัยของสนามสอบ</li>
                  <li>แจ้งเจ้าหน้าที่หากมีเหตุจำเป็นด้านสุขภาพ</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="after-exam" className="scroll-mt-32">
            <h2 className="section-heading flex items-center gap-2">
              <SearchCheck className="h-5 w-5 text-emerald-700" />
              การตรวจสอบผลการสอบ
            </h2>
            <div className="prose-official mt-3">
              <p>
                ศูนย์สอบฯ จะประกาศกำหนดการและช่องทางการตรวจสอบผลการสอบผ่านเว็บไซต์
                ผู้เข้าสอบสามารถตรวจสอบผลได้ด้วยเลขประจำตัวประชาชนและเลขประจำตัวผู้สอบ
                โดยผลการสอบอย่างเป็นทางการจะเผยแพร่ในประกาศของศูนย์สอบฯ
              </p>
              <p>
                ผู้เข้าสอบที่ประสงค์จะทักท้วงข้อสอบหรือขอทราบคะแนนสามารถยื่นคำร้อง
                ผ่านระบบคำร้องออนไลน์ภายในระยะเวลาที่ประกาศกำหนด
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/scores" className="btn-primary">
                <SearchCheck className="h-4 w-4" />
                ตรวจสอบผลการสอบ
              </Link>
              <Link href="/requests" className="btn-secondary">
                <ClipboardList className="h-4 w-4" />
                ยื่นคำร้องออนไลน์
              </Link>
            </div>
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-32 lg:self-start">
          <nav
            aria-label="สารบัญหน้านี้"
            className="card p-4"
          >
            <h2 className="px-2 text-xs font-bold uppercase tracking-wide text-gray-500">
              ในหน้านี้
            </h2>
            <ul className="mt-2 space-y-0.5">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="block rounded px-2 py-1.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-800"
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
            <h2 className="text-sm font-bold text-emerald-950">ต้องการความช่วยเหลือ</h2>
            <p className="mt-1 text-sm leading-6 text-emerald-900">
              สอบถามข้อมูลการสมัครและการสอบได้ในวันและเวลาราชการ
            </p>
            <a
              href={`tel:${siteInfo.phoneHref}`}
              className="mt-2 flex items-center gap-2 text-sm font-semibold text-emerald-900 hover:underline"
            >
              <Phone className="h-4 w-4" />
              {siteInfo.phone}
            </a>
          </div>

          <div className="card p-4">
            <h2 className="text-sm font-bold text-gray-900">ลิงก์ที่เกี่ยวข้อง</h2>
            <ul className="mt-2 space-y-1.5 text-sm">
              <li>
                <Link href="/calendar" className="text-gray-700 hover:text-emerald-800 hover:underline">
                  ปฏิทินและกำหนดการสอบ
                </Link>
              </li>
              <li>
                <Link href="/regulations" className="text-gray-700 hover:text-emerald-800 hover:underline">
                  ระเบียบและเกณฑ์การสอบ
                </Link>
              </li>
              <li>
                <Link href="/documents" className="text-gray-700 hover:text-emerald-800 hover:underline">
                  เอกสารและแบบฟอร์ม
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-700 hover:text-emerald-800 hover:underline">
                  คำถามที่พบบ่อย
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
