import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Clock,
  FileQuestion,
  Info,
  ListChecks,
  Monitor,
} from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "ตัวอย่างข้อสอบ",
  description:
    "คลังตัวอย่างข้อสอบและแนวทางการเตรียมความพร้อมสำหรับการสอบความรู้และทักษะทางวิชาชีพเภสัชกรรม",
};

export const instant = false;

type SampleSet = {
  id: number;
  subjectCode: string;
  year: number;
  title: string;
  description: string;
  questionCount: number;
  timeLimit: string;
  topics: string[];
  format: string;
};

const sampleSets: SampleSet[] = [
  {
    id: 1,
    subjectCode: "PLE-CC1",
    year: 2568,
    title: "ชุดตัวอย่างข้อสอบความรู้ความสามารถร่วม PLE-CC1",
    description:
      "ตัวอย่างข้อสอบปรนัยพร้อมเฉลยและคำอธิบาย ครอบคลุมเภสัชวิทยา เภสัชภัณฑ์ และกฎหมายยา",
    questionCount: 50,
    timeLimit: "60 นาที",
    topics: ["เภสัชวิทยา", "เภสัชภัณฑ์", "กฎหมายยา", "เภสัชระบาดวิทยา"],
    format: "ข้อสอบปรนัย 5 ตัวเลือก",
  },
  {
    id: 2,
    subjectCode: "PLE-PC1",
    year: 2568,
    title: "ชุดตัวอย่างข้อสอบการบริบาลทางเภสัชกรรม PLE-PC1",
    description:
      "โจทย์กรณีศึกษาผู้ป่วย (Patient Cases) พร้อมแนวทางการวางแผนการรักษาและการให้คำปรึกษา",
    questionCount: 40,
    timeLimit: "90 นาที",
    topics: ["เภสัชบำบัดขั้นสูง", "การติดตามอาการไม่พึงประสงค์", "ผู้ป่วยเฉพาะกลุ่ม"],
    format: "กรณีศึกษาและข้อสอบปรนัย",
  },
  {
    id: 3,
    subjectCode: "PLE-IP1",
    year: 2568,
    title: "ชุดตัวอย่างข้อสอบเภสัชกรรมอุตสาหการ PLE-IP1",
    description:
      "ตัวอย่างข้อสอบการควบคุมคุณภาพและการผลิตยาตามหลักเกณฑ์ GMP/PICs",
    questionCount: 30,
    timeLimit: "45 นาที",
    topics: ["การพัฒนาสูตรตำรับ", "GMP/PICs", "การควบคุมคุณภาพ"],
    format: "ข้อสอบปรนัย 5 ตัวเลือก",
  },
  {
    id: 4,
    subjectCode: "PLE-CC2",
    year: 2567,
    title: "แนวทางการสอบทักษะร่วม OSPE 16 ฐาน",
    description:
      "สรุปตัวอย่างสถานการณ์จำลอง การจัดเวลาในแต่ละฐาน และเกณฑ์การให้คะแนนของกรรมการ",
    questionCount: 16,
    timeLimit: "ฐานละ 5 นาที",
    topics: ["การซักประวัติ", "การให้คำแนะนำ", "การผสมยา", "จริยธรรม"],
    format: "สถานการณ์จำลอง (OSPE)",
  },
  {
    id: 5,
    subjectCode: "PLE-CC1",
    year: 2567,
    title: "ชุดตัวอย่างข้อสอบเสมือนจริง PLE-CC1 ปี 2567",
    description:
      "ข้อสอบเก่าที่ได้รับอนุญาตให้เผยแพร่เพื่อการศึกษาและทบทวนความรู้",
    questionCount: 100,
    timeLimit: "120 นาที",
    topics: ["เภสัชวิทยา", "เภสัชภัณฑ์", "กฎหมายและจริยธรรม", "ระบบยา"],
    format: "ข้อสอบปรนัย 5 ตัวเลือก",
  },
];

const subjects = ["ทั้งหมด", "PLE-CC1", "PLE-PC1", "PLE-IP1", "PLE-CC2"];
const years = ["ทั้งหมด", "2568", "2567"];

function buildQuery(subject: string, year: string) {
  const params = new URLSearchParams();
  if (subject !== "ทั้งหมด") params.set("subject", subject);
  if (year !== "ทั้งหมด") params.set("year", year);
  const query = params.toString();
  return query ? `/sample-exams?${query}` : "/sample-exams";
}

export default async function SampleExamsPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string; year?: string }>;
}) {
  const params = await searchParams;
  const selectedSubject = subjects.includes(params.subject ?? "")
    ? (params.subject ?? "ทั้งหมด")
    : "ทั้งหมด";
  const selectedYear = years.includes(params.year ?? "")
    ? (params.year ?? "ทั้งหมด")
    : "ทั้งหมด";

  const filtered = sampleSets.filter((item) => {
    const matchSubject =
      selectedSubject === "ทั้งหมด" || item.subjectCode === selectedSubject;
    const matchYear =
      selectedYear === "ทั้งหมด" || item.year.toString() === selectedYear;
    return matchSubject && matchYear;
  });

  return (
    <div>
      <PageHeader
        title="คลังตัวอย่างข้อสอบและแนวทางการสอบ"
        description="ฝึกทักษะด้วยตัวอย่างข้อสอบมาตรฐาน พร้อมคำอธิบายและแนวทางการเตรียมตัวสอบวิชาชีพ"
        breadcrumbs={[{ label: "ตัวอย่างข้อสอบ" }]}
        eyebrow="การสอบ"
        meta={
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <span className="badge-green">ชุดตัวอย่าง {sampleSets.length} ชุด</span>
            <span>ปรับปรุงล่าสุด 1 พฤศจิกายน 2569</span>
          </div>
        }
        actions={
          <Link href="/e-exam" className="btn-primary">
            <Monitor className="h-4 w-4" />
            ทดลองทำข้อสอบ
          </Link>
        }
      />

      <div className="container-page py-8 lg:py-10">
        <div className="notice">
          <Info className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <p className="font-semibold">ช่องทางการเข้าถึงข้อสอบตัวอย่าง</p>
            <p className="mt-1 leading-6">
              ข้อสอบตัวอย่างที่ได้รับอนุญาตให้เผยแพร่จะเปิดให้ใช้งานผ่านระบบ E-Exam
              และประกาศของศูนย์สอบฯ หน้านี้เป็นดัชนีรวบรวมข้อมูลชุดข้อสอบ
              เพื่อให้ผู้เข้าสอบวางแผนการทบทวนได้อย่างเหมาะสม
              ไม่มีการจำหน่ายหรือเผยแพร่ไฟล์ข้อสอบนอกช่องทางทางการ
            </p>
          </div>
        </div>

        <div className="card mt-5 p-4 sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="mr-1 text-xs font-semibold text-gray-500">
                รายวิชา
              </span>
              {subjects.map((subject) => {
                const active = selectedSubject === subject;
                return (
                  <Link
                    key={subject}
                    href={buildQuery(subject, selectedYear)}
                    className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                      active
                        ? "border-emerald-700 bg-emerald-700 text-white"
                        : "border-gray-200 bg-gray-50 text-gray-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
                    }`}
                  >
                    {subject}
                  </Link>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <span className="mr-1 text-xs font-semibold text-gray-500">
                ปี พ.ศ.
              </span>
              {years.map((year) => {
                const active = selectedYear === year;
                return (
                  <Link
                    key={year}
                    href={buildQuery(selectedSubject, year)}
                    className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                      active
                        ? "border-emerald-700 bg-emerald-700 text-white"
                        : "border-gray-200 bg-gray-50 text-gray-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
                    }`}
                  >
                    {year === "ทั้งหมด" ? "ทั้งหมด" : `ปี ${year}`}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm text-gray-600">
          <p>
            พบชุดตัวอย่างข้อสอบ{" "}
            <span className="font-bold text-emerald-800">
              {filtered.length}
            </span>{" "}
            ชุด
          </p>
          {(selectedSubject !== "ทั้งหมด" || selectedYear !== "ทั้งหมด") && (
            <Link
              href="/sample-exams"
              className="font-semibold text-emerald-800 hover:underline"
            >
              ล้างตัวกรอง
            </Link>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-4 rounded-lg border border-gray-200 bg-white p-12 text-center">
            <FileQuestion className="mx-auto h-8 w-8 text-gray-400" />
            <h2 className="mt-3 text-base font-bold text-gray-900">
              ยังไม่มีชุดข้อสอบในเงื่อนไขนี้
            </h2>
            <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-gray-600">
              ลองเลือกวิชาหรือปีการศึกษาอื่น
              หรือติดตามประกาศการเผยแพร่ข้อสอบตัวอย่างจากศูนย์สอบฯ
            </p>
            <Link href="/sample-exams" className="btn-secondary mt-4 text-sm">
              ดูชุดข้อสอบทั้งหมด
            </Link>
          </div>
        ) : (
          <div className="mt-4 grid gap-3 lg:grid-cols-2">
            {filtered.map((item) => (
              <article key={item.id} className="card flex flex-col p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="badge-green font-mono">
                      {item.subjectCode}
                    </span>
                    <span className="badge-gray">ปี {item.year}</span>
                  </div>
                  <span className="text-xs text-gray-500">{item.format}</span>
                </div>

                <h2 className="mt-2.5 text-base font-bold leading-snug text-gray-900">
                  {item.title}
                </h2>
                <p className="mt-1.5 text-sm leading-6 text-gray-600">
                  {item.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-gray-600">
                  <span className="flex items-center gap-1.5">
                    <ListChecks className="h-4 w-4 text-emerald-700" />
                    {item.questionCount} ข้อ
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-emerald-700" />
                    {item.timeLimit}
                  </span>
                </div>

                <ul className="mt-3 flex flex-wrap gap-1.5 border-t border-gray-100 pt-3">
                  {item.topics.map((topic) => (
                    <li
                      key={topic}
                      className="rounded border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs text-gray-600"
                    >
                      {topic}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs text-gray-500">
                    เผยแพร่ผ่านระบบ E-Exam
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/documents/9"
                      className="btn-neutral px-3 py-1.5 text-sm"
                    >
                      คู่มือการใช้งาน
                    </Link>
                    <Link
                      href="/e-exam"
                      className="btn-primary px-3 py-1.5 text-sm"
                    >
                      เริ่มทดลองสอบ
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <div className="card p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold text-gray-900">
              <BookOpen className="h-4 w-4 text-emerald-700" />
              แนวทางการใช้ข้อสอบตัวอย่าง
            </h2>
            <ul className="mt-2 space-y-1.5 text-sm leading-6 text-gray-600">
              <li>จับเวลาตามที่กำหนดเพื่อฝึกบริหารเวลาในการสอบจริง</li>
              <li>ทบทวนคำอธิบายและหัวข้อที่ตอบผิดหลังทำข้อสอบเสร็จ</li>
              <li>ตรวจสอบระเบียบการสอบก่อนเข้าสอบจริงทุกครั้ง</li>
            </ul>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold text-emerald-950">
              <Monitor className="h-4 w-4" />
              ทำความคุ้นเคยกับระบบสอบ
            </h2>
            <p className="mt-2 text-sm leading-6 text-emerald-900">
              ระบบจำลอง E-Exam มีคำถามตัวอย่างและแถบนำทางข้อสอบ
              ช่วยให้ท่านคุ้นเคยกับขั้นตอนการทำข้อสอบและการส่งคำตอบ
            </p>
            <Link
              href="/e-exam"
              className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-emerald-900 hover:underline"
            >
              เปิดระบบทดลองสอบ
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
