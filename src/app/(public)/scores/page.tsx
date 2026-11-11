"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Clock,
  FileCheck,
  Info,
  MapPin,
  Printer,
  Search,
  ShieldCheck,
  User,
} from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";

const DEMO_ID = "1103701234563";
const DEMO_CODE = "690081293";

type TabKey = "status" | "scores";

const demoCandidate = {
  name: "นายตัวอย่าง ใจดี",
  nameEn: "Mr. Example Jaidee",
  nationalId: "1-1037-01234-56-3",
  examCode: "690081293",
  university: "คณะเภสัชศาสตร์ มหาวิทยาลัยตัวอย่าง",
  program: "เภสัชศาสตรบัณฑิต",
  round: "การสอบความรู้ทางวิชาชีพเภสัชกรรม ครั้งที่ 5/2569",
  code: "PLE-IP1",
  status: "อนุมัติสิทธิ์สอบและชำระค่าธรรมเนียมแล้ว",
  venue: "ศูนย์สอบมหาวิทยาลัยธรรมศาสตร์ ศูนย์รังสิต",
  building: "อาคารเรียนรวม SC3",
  room: "ห้อง 302",
  seat: "A-042",
  examDate: "13 ธันวาคม 2569",
  examTime: "09:00 – 12:00 น.",
  scores: [
    {
      subject: "PLE-IP1 เภสัชกรรมอุตสาหการ ภาคทฤษฎี",
      fullScore: 100,
      criteria: 60,
      score: 78.5,
      result: "ผ่านเกณฑ์",
      passed: true,
    },
    {
      subject: "PLE-CC1 ความรู้ความสามารถร่วมทางเภสัชศาสตร์",
      fullScore: 100,
      criteria: 60,
      score: 72.0,
      result: "ผ่านเกณฑ์",
      passed: true,
    },
    {
      subject: "PLE-IP2 เภสัชกรรมอุตสาหการ ภาคทักษะ",
      fullScore: 100,
      criteria: 60,
      score: 58.0,
      result: "ไม่ผ่านเกณฑ์",
      passed: false,
    },
  ],
};

function isValidThaiNationalId(value: string) {
  if (!/^\d{13}$/.test(value)) return false;
  let sum = 0;
  for (let i = 0; i < 12; i += 1) {
    sum += Number(value[i]) * (13 - i);
  }
  const checkDigit = (11 - (sum % 11)) % 10;
  return checkDigit === Number(value[12]);
}

function formatNationalId(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length !== 13) return value;
  return `${digits[0]}-${digits.slice(1, 5)}-${digits.slice(5, 10)}-${digits.slice(10, 12)}-${digits[12]}`;
}

export default function ScoresPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("status");
  const [nationalId, setNationalId] = useState("");
  const [examCode, setExamCode] = useState("");
  const [errors, setErrors] = useState<{
    nationalId?: string;
    examCode?: string;
  }>({});
  const [searched, setSearched] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const passedCount = demoCandidate.scores.filter((item) => item.passed).length;
  const averageScore =
    demoCandidate.scores.reduce((total, item) => total + item.score, 0) /
    demoCandidate.scores.length;

  function fillDemo() {
    setNationalId(DEMO_ID);
    setExamCode(DEMO_CODE);
    setErrors({});
    setSearched(false);
    setNotFound(false);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: { nationalId?: string; examCode?: string } = {};
    const cleanId = nationalId.replace(/\D/g, "");
    const cleanCode = examCode.replace(/\D/g, "");

    if (!cleanId) {
      nextErrors.nationalId = "กรุณากรอกเลขบัตรประจำตัวประชาชน";
    } else if (!isValidThaiNationalId(cleanId)) {
      nextErrors.nationalId =
        "เลขบัตรประจำตัวประชาชนไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง";
    }

    if (!cleanCode) {
      nextErrors.examCode = "กรุณากรอกรหัสประจำตัวผู้สอบ";
    } else if (!/^\d{9}$/.test(cleanCode)) {
      nextErrors.examCode = "รหัสประจำตัวผู้สอบต้องเป็นตัวเลข 9 หลัก";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const matched = cleanId === DEMO_ID && cleanCode === DEMO_CODE;
    setSearched(true);
    setNotFound(!matched);
    if (!matched) {
      setActiveTab("status");
    }
  }

  function resetSearch() {
    setSearched(false);
    setNotFound(false);
    setErrors({});
    setNationalId("");
    setExamCode("");
    setActiveTab("status");
  }

  return (
    <div>
      <PageHeader
        title="ตรวจสอบสถานะและผลสอบ"
        description="ตรวจสอบสถานะการสมัคร สนามสอบ ห้องสอบ เลขที่นั่งสอบ และผลคะแนนอย่างเป็นทางการ ด้วยเลขบัตรประจำตัวประชาชนและรหัสประจำตัวผู้สอบ"
        breadcrumbs={[{ label: "ตรวจสอบสถานะและผลสอบ" }]}
        eyebrow="บริการออนไลน์"
        meta={
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <span className="badge-green">ระบบตรวจสอบออนไลน์</span>
            <span>ข้อมูล ณ วันที่ 10 พฤศจิกายน 2569</span>
          </div>
        }
        actions={
          <Link href="/exam-registration" className="btn-secondary">
            <Search className="h-4 w-4" />
            ลงทะเบียนเข้าสอบ
          </Link>
        }
      />

      <div className="container-page max-w-5xl py-8 lg:py-10">
        <div className="notice-warning">
          <Info className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <p className="font-semibold">
              ระบบสาธิตสำหรับทดลองใช้งาน
            </p>
            <p className="mt-1 leading-6">
              หน้านี้เป็นการจำลองขั้นตอนการตรวจสอบข้อมูล
              ยังไม่เชื่อมต่อฐานข้อมูลการสอบจริง
              ท่านสามารถใช้ข้อมูลตัวอย่างเพื่อทดลองดูผลลัพธ์ได้
            </p>
            <button
              type="button"
              onClick={fillDemo}
              className="mt-2.5 inline-flex items-center gap-1.5 rounded-md border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold text-amber-900 transition-colors hover:bg-amber-100"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              ใช้ข้อมูลตัวอย่าง
            </button>
          </div>
        </div>

        <div className="card mt-5 p-5 sm:p-6">
          <h2 className="text-base font-bold text-gray-900">
            ค้นหาข้อมูลผู้เข้าสอบ
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            กรอกข้อมูลให้ครบถ้วนเพื่อตรวจสอบสถานะและผลการสอบ
          </p>

          <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="national-id" className="field-label">
                  เลขบัตรประจำตัวประชาชน{" "}
                  <span className="text-red-600">*</span>
                </label>
                <input
                  id="national-id"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  maxLength={13}
                  value={nationalId}
                  onChange={(event) => {
                    setNationalId(event.target.value.replace(/\D/g, ""));
                    if (errors.nationalId) {
                      setErrors((current) => ({
                        ...current,
                        nationalId: undefined,
                      }));
                    }
                  }}
                  placeholder="กรอกเลขบัตรประจำตัวประชาชน 13 หลัก"
                  aria-invalid={Boolean(errors.nationalId)}
                  aria-describedby={
                    errors.nationalId ? "national-id-error" : undefined
                  }
                  className={`input font-mono ${
                    errors.nationalId ? "border-red-400" : ""
                  }`}
                />
                {errors.nationalId && (
                  <p
                    id="national-id-error"
                    className="mt-1.5 text-sm font-medium text-red-700"
                  >
                    {errors.nationalId}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="exam-code" className="field-label">
                  รหัสประจำตัวผู้สอบ <span className="text-red-600">*</span>
                </label>
                <input
                  id="exam-code"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  maxLength={9}
                  value={examCode}
                  onChange={(event) => {
                    setExamCode(event.target.value.replace(/\D/g, ""));
                    if (errors.examCode) {
                      setErrors((current) => ({
                        ...current,
                        examCode: undefined,
                      }));
                    }
                  }}
                  placeholder="กรอกรหัสประจำตัวผู้สอบ 9 หลัก"
                  aria-invalid={Boolean(errors.examCode)}
                  aria-describedby={
                    errors.examCode ? "exam-code-error" : "exam-code-hint"
                  }
                  className={`input font-mono ${
                    errors.examCode ? "border-red-400" : ""
                  }`}
                />
                {errors.examCode ? (
                  <p
                    id="exam-code-error"
                    className="mt-1.5 text-sm font-medium text-red-700"
                  >
                    {errors.examCode}
                  </p>
                ) : (
                  <p id="exam-code-hint" className="field-hint">
                    รหัส 9 หลักปรากฏอยู่ในบัตรประจำตัวผู้สอบ
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button type="submit" className="btn-primary">
                <Search className="h-4 w-4" />
                ตรวจสอบข้อมูล
              </button>
              <button
                type="button"
                onClick={resetSearch}
                className="btn-neutral"
              >
                ล้างข้อมูล
              </button>
              <span className="text-xs text-gray-500">
                ข้อมูลของท่านจะถูกใช้เพื่อการตรวจสอบสถานะเท่านั้น
              </span>
            </div>
          </form>
        </div>

        {searched && notFound && (
          <div className="mt-5 rounded-lg border border-gray-200 bg-white p-8 text-center">
            <AlertCircle className="mx-auto h-8 w-8 text-amber-600" />
            <h2 className="mt-3 text-base font-bold text-gray-900">
              ไม่พบข้อมูลในระบบสาธิต
            </h2>
            <p className="mx-auto mt-1 max-w-lg text-sm leading-6 text-gray-600">
              ระบบยังไม่เชื่อมต่อฐานข้อมูลจริง
              กรุณาใช้ปุ่ม “ใช้ข้อมูลตัวอย่าง” เพื่อทดลองดูผลลัพธ์
              หรือติดต่อศูนย์สอบฯ หากต้องการตรวจสอบข้อมูลจริง
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <button type="button" onClick={fillDemo} className="btn-primary text-sm">
                ใช้ข้อมูลตัวอย่าง
              </button>
              <Link href="/contact" className="btn-secondary text-sm">
                ติดต่อศูนย์สอบฯ
              </Link>
            </div>
          </div>
        )}

        {searched && !notFound && (
          <div className="mt-5">
            <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-900">
              <span className="font-semibold">ข้อมูลตัวอย่าง:</span>{" "}
              ผลลัพธ์ด้านล่างเป็นการสาธิต ไม่ใช่ข้อมูลการสอบจริงของท่าน
            </div>

            <div className="mt-4 border-b border-gray-200">
              <div className="flex gap-1" role="tablist" aria-label="ประเภทข้อมูล">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "status"}
                  onClick={() => setActiveTab("status")}
                  className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
                    activeTab === "status"
                      ? "border-emerald-700 text-emerald-800"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <MapPin className="h-4 w-4" />
                  สถานะและที่นั่งสอบ
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "scores"}
                  onClick={() => setActiveTab("scores")}
                  className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
                    activeTab === "scores"
                      ? "border-emerald-700 text-emerald-800"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <BarChart3 className="h-4 w-4" />
                  ผลการสอบ
                </button>
              </div>
            </div>

            <div className="card mt-4 p-5 sm:p-7" role="tabpanel">
              <div className="flex flex-col gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                    <User className="h-6 w-6" />
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-base font-bold text-gray-900">
                        {demoCandidate.name}
                      </h2>
                      <span className="badge-green">
                        {demoCandidate.status}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-gray-500">
                      {demoCandidate.nameEn} · เลขบัตร {demoCandidate.nationalId}
                    </p>
                    <p className="mt-0.5 text-sm text-gray-600">
                      {demoCandidate.university} · {demoCandidate.program}
                    </p>
                  </div>
                </div>
                <div className="shrink-0 text-left sm:text-right">
                  <div className="text-xs text-gray-500">
                    รหัสประจำตัวผู้สอบ
                  </div>
                  <div className="mt-1 rounded border border-gray-200 bg-gray-50 px-2.5 py-1 font-mono text-sm font-bold text-gray-900">
                    {demoCandidate.examCode}
                  </div>
                </div>
              </div>

              {activeTab === "status" && (
                <div className="mt-5 space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900">
                        <CalendarDays className="h-4 w-4 text-emerald-700" />
                        รอบสอบและสนามสอบ
                      </h3>
                      <p className="mt-0.5 text-xs text-gray-500">
                        {demoCandidate.round} · {demoCandidate.code}
                      </p>
                    </div>
                    <span className="badge-gray">ข้อมูลตัวอย่าง</span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-md border border-gray-200 bg-gray-50 p-3">
                      <div className="text-xs text-gray-500">สนามสอบ</div>
                      <div className="mt-1 text-sm font-semibold text-gray-900">
                        {demoCandidate.venue}
                      </div>
                    </div>
                    <div className="rounded-md border border-gray-200 bg-gray-50 p-3">
                      <div className="text-xs text-gray-500">อาคาร / ห้องสอบ</div>
                      <div className="mt-1 text-sm font-semibold text-gray-900">
                        {demoCandidate.building} · {demoCandidate.room}
                      </div>
                    </div>
                    <div className="rounded-md border border-emerald-300 bg-emerald-50 p-3">
                      <div className="text-xs font-semibold text-emerald-800">
                        เลขที่นั่งสอบ
                      </div>
                      <div className="mt-1 font-mono text-base font-bold text-emerald-900">
                        {demoCandidate.seat}
                      </div>
                    </div>
                    <div className="rounded-md border border-gray-200 bg-gray-50 p-3">
                      <div className="text-xs text-gray-500">วันและเวลาสอบ</div>
                      <div className="mt-1 text-sm font-semibold text-gray-900">
                        {demoCandidate.examDate}
                      </div>
                      <div className="mt-0.5 flex items-center gap-1 text-xs text-gray-600">
                        <Clock className="h-3.5 w-3.5" />
                        {demoCandidate.examTime}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-md border border-gray-200 p-4">
                    <h3 className="text-sm font-bold text-gray-900">
                      ข้อปฏิบัติก่อนวันสอบ
                    </h3>
                    <ul className="mt-2 space-y-1.5 text-sm text-gray-700">
                      <li className="flex gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                        พิมพ์บัตรประจำตัวผู้สอบและตรวจสอบข้อมูลให้ถูกต้อง
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                        นำบัตรประจำตัวประชาชนฉบับจริงและบัตรประจำตัวผู้สอบมาในวันสอบ
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                        มาถึงสนามสอบก่อนเวลาเริ่มสอบอย่างน้อย 60 นาที
                      </li>
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="btn-primary"
                    >
                      <Printer className="h-4 w-4" />
                      พิมพ์บัตรประจำตัวสอบ
                    </button>
                    <Link href="/regulations" className="btn-secondary">
                      ระเบียบการสอบ
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === "scores" && (
                <div className="mt-5 space-y-5">
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
                      <div className="text-xs text-gray-500">รายวิชาที่สอบ</div>
                      <div className="mt-1 text-2xl font-bold text-gray-900">
                        {demoCandidate.scores.length}
                      </div>
                    </div>
                    <div className="rounded-md border border-emerald-200 bg-emerald-50 p-4">
                      <div className="text-xs text-emerald-800">ผ่านเกณฑ์</div>
                      <div className="mt-1 text-2xl font-bold text-emerald-900">
                        {passedCount} วิชา
                      </div>
                    </div>
                    <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
                      <div className="text-xs text-gray-500">คะแนนเฉลี่ย</div>
                      <div className="mt-1 text-2xl font-bold text-gray-900">
                        {averageScore.toFixed(1)}
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="table-official">
                      <thead>
                        <tr>
                          <th scope="col">รายวิชา</th>
                          <th scope="col" className="text-center">คะแนนเต็ม</th>
                          <th scope="col" className="text-center">เกณฑ์ผ่าน</th>
                          <th scope="col" className="text-center">คะแนนที่ได้</th>
                          <th scope="col" className="text-center">ผลการประเมิน</th>
                        </tr>
                      </thead>
                      <tbody>
                        {demoCandidate.scores.map((score) => (
                          <tr key={score.subject}>
                            <td className="font-medium text-gray-900">
                              {score.subject}
                            </td>
                            <td className="text-center font-mono">
                              {score.fullScore}
                            </td>
                            <td className="text-center font-mono">
                              {score.criteria}%
                            </td>
                            <td className="text-center font-mono font-bold text-gray-900">
                              {score.score.toFixed(1)}
                            </td>
                            <td className="text-center">
                              <span
                                className={
                                  score.passed ? "badge-green" : "badge-red"
                                }
                              >
                                {score.result}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 pt-4">
                    <p className="text-xs leading-5 text-gray-500">
                      ผลการสอบฉบับทางการจะประกาศผ่านระบบนี้
                      และสามารถยื่นคำร้องได้ตามระยะเวลาที่กำหนด
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Link href="/requests" className="btn-secondary text-sm">
                        ยื่นคำร้อง / ขอทราบคะแนน
                      </Link>
                      <button
                        type="button"
                        onClick={() => window.print()}
                        className="btn-primary text-sm"
                      >
                        <FileCheck className="h-4 w-4" />
                        พิมพ์ผลการสอบ
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="card p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold text-gray-900">
              <ShieldCheck className="h-4 w-4 text-emerald-700" />
              ความถูกต้องของข้อมูล
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              ผลการสอบที่มีผลผูกพันทางกฎหมายให้ยึดถือตามประกาศของศูนย์สอบฯ
              หากพบข้อมูลไม่ถูกต้อง กรุณาติดต่อเจ้าหน้าที่ก่อนวันสอบอย่างน้อย 5 วันทำการ
            </p>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold text-emerald-950">
              <Info className="h-4 w-4" />
              ต้องการความช่วยเหลือ
            </h2>
            <p className="mt-2 text-sm leading-6 text-emerald-900">
              ติดต่อศูนย์สอบฯ ในวันและเวลาราชการ
              เพื่อตรวจสอบข้อมูลการสมัครหรือผลการสอบของท่าน
            </p>
            <Link
              href="/contact"
              className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-emerald-900 hover:underline"
            >
              ช่องทางติดต่อ
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
