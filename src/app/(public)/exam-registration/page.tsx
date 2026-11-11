"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Check,
  Clock,
  FileText,
  Hash,
  Info,
  LogIn,
  MapPin,
  Phone,
  SearchCheck,
  ShieldCheck,
} from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import { examRounds, siteInfo } from "@/data/site";

type IdentityMode = "national-id" | "passport";

function isValidThaiNationalId(value: string) {
  if (!/^\d{13}$/.test(value)) return false;
  let sum = 0;
  for (let i = 0; i < 12; i += 1) {
    sum += Number(value[i]) * (13 - i);
  }
  const checkDigit = (11 - (sum % 11)) % 10;
  return checkDigit === Number(value[12]);
}

export default function ExamRegistrationPage() {
  const defaultRound =
    examRounds.find((round) => round.id === "ip1-5-2569") ?? examRounds[0];
  const [selectedRoundId, setSelectedRoundId] = useState(defaultRound.id);
  const [identityMode, setIdentityMode] = useState<IdentityMode>("national-id");
  const [identityNumber, setIdentityNumber] = useState("");
  const [examCode, setExamCode] = useState("");
  const [errors, setErrors] = useState<{ identity?: string; examCode?: string }>(
    {},
  );
  const [submitted, setSubmitted] = useState(false);

  const selectedRound =
    examRounds.find((round) => round.id === selectedRoundId) ?? defaultRound;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: { identity?: string; examCode?: string } = {};

    if (!identityNumber.trim()) {
      nextErrors.identity =
        identityMode === "national-id"
          ? "กรุณากรอกเลขบัตรประจำตัวประชาชน"
          : "กรุณากรอกเลขหนังสือเดินทาง";
    } else if (
      identityMode === "national-id" &&
      !isValidThaiNationalId(identityNumber.replace(/\D/g, ""))
    ) {
      nextErrors.identity =
        "เลขบัตรประจำตัวประชาชนไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง";
    } else if (
      identityMode === "passport" &&
      !/^[A-Za-z0-9]{6,12}$/.test(identityNumber.trim())
    ) {
      nextErrors.identity =
        "เลขหนังสือเดินทางไม่ถูกต้อง (6–12 ตัวอักษรหรือตัวเลข)";
    }

    if (!/^\d{9}$/.test(examCode.trim())) {
      nextErrors.examCode = "รหัสประจำตัวผู้สอบต้องเป็นตัวเลข 9 หลัก";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
    }
  }

  function resetForm() {
    setSubmitted(false);
    setIdentityNumber("");
    setExamCode("");
    setErrors({});
  }

  return (
    <div>
      <PageHeader
        title="ลงทะเบียนเข้าสอบ"
        description="สำหรับผู้สมัครที่ได้รับรหัสประจำตัวผู้สอบแล้ว ใช้เลขบัตรประจำตัวประชาชนและรหัสประจำตัวผู้สอบเพื่อเข้าสู่ระบบลงทะเบียน"
        breadcrumbs={[
          { label: "บริการออนไลน์" },
          { label: "ลงทะเบียนเข้าสอบ" },
        ]}
        eyebrow="บริการออนไลน์"
        actions={
          <Link href="/apply" className="btn-secondary">
            <FileText className="h-4 w-4" />
            ยังไม่ได้สมัครสอบ
          </Link>
        }
      />

      <div className="container-page grid gap-8 py-10 lg:grid-cols-[1fr_21rem]">
        <div className="space-y-4">
          <section className="overflow-hidden rounded-lg border border-gray-200 bg-white">
            <div className="border-b border-gray-200 bg-emerald-50 px-5 py-4 sm:px-6">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-900">
                <LogIn className="h-4 w-4" />
                เข้าสู่ระบบลงทะเบียนสอบ
              </div>
              <p className="mt-1 text-sm text-emerald-800">
                คำขอสอบความรู้ผู้ขอขึ้นทะเบียนเป็นผู้ประกอบวิชาชีพเภสัชกรรม
              </p>
            </div>

            <div className="p-5 sm:p-6">
              <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
                <div className="text-sm font-semibold text-gray-900">
                  การสอบความรู้ {selectedRound.round} ({selectedRound.code.replace("PLE-", "")})
                </div>
                <div className="mt-2 grid gap-1.5 text-sm text-gray-600 sm:grid-cols-2">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="h-4 w-4 text-emerald-700" />
                    วันที่สอบ {selectedRound.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-emerald-700" />
                    {selectedRound.time}
                  </span>
                  <span className="flex items-center gap-1.5 sm:col-span-2">
                    <MapPin className="h-4 w-4 shrink-0 text-emerald-700" />
                    {selectedRound.venue}
                  </span>
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="exam-round" className="field-label">
                  เลือกรอบสอบ
                </label>
                <select
                  id="exam-round"
                  value={selectedRoundId}
                  onChange={(event) => {
                    setSelectedRoundId(event.target.value);
                    setSubmitted(false);
                  }}
                  className="select"
                >
                  {examRounds.map((round) => (
                    <option key={round.id} value={round.id}>
                      {round.round} ({round.code}) · {round.dateShort}
                    </option>
                  ))}
                </select>
              </div>

              {submitted ? (
                <div className="mt-6 space-y-4" role="status" aria-live="polite">
                  <div className="rounded-md border border-emerald-300 bg-emerald-50 p-5">
                    <div className="flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-white">
                        <Check className="h-5 w-5" />
                      </span>
                      <div>
                        <h2 className="text-base font-bold text-emerald-950">
                          เข้าสู่ระบบลงทะเบียนสำเร็จ
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-emerald-900">
                          ระบบตรวจสอบเลขบัตรประจำตัวและรหัสประจำตัวผู้สอบเรียบร้อยแล้ว
                          กรุณาตรวจสอบข้อมูลรอบสอบและดำเนินการในขั้นตอนถัดไป
                        </p>
                      </div>
                    </div>
                  </div>

                  <dl className="divide-y divide-gray-100 rounded-md border border-gray-200 text-sm">
                    <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:justify-between">
                      <dt className="text-gray-500">รอบสอบ</dt>
                      <dd className="font-semibold text-gray-900">
                        {selectedRound.round} ({selectedRound.code})
                      </dd>
                    </div>
                    <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:justify-between">
                      <dt className="text-gray-500">วันที่สอบ</dt>
                      <dd className="font-semibold text-gray-900">
                        {selectedRound.date} · {selectedRound.time}
                      </dd>
                    </div>
                    <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:justify-between">
                      <dt className="text-gray-500">สถานะการลงทะเบียน</dt>
                      <dd className="font-semibold text-emerald-800">
                        พร้อมดำเนินการ
                      </dd>
                    </div>
                  </dl>

                  <div className="flex flex-wrap gap-2">
                    <Link href="/apply" className="btn-primary">
                      ดำเนินการลงทะเบียนต่อ
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link href="/scores" className="btn-secondary">
                      <SearchCheck className="h-4 w-4" />
                      ตรวจสอบสถานะการสมัคร
                    </Link>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="btn-neutral"
                    >
                      เข้าสู่ระบบใหม่
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-5 space-y-5" noValidate>
                  <fieldset>
                    <legend className="field-label">
                      ประเภทเอกสารยืนยันตัวตน
                    </legend>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="identity-mode"
                          value="national-id"
                          checked={identityMode === "national-id"}
                          onChange={() => {
                            setIdentityMode("national-id");
                            setIdentityNumber("");
                            setErrors((current) => ({
                              ...current,
                              identity: undefined,
                            }));
                          }}
                          className="h-4 w-4 accent-emerald-700"
                        />
                        บัตรประจำตัวประชาชน
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="identity-mode"
                          value="passport"
                          checked={identityMode === "passport"}
                          onChange={() => {
                            setIdentityMode("passport");
                            setIdentityNumber("");
                            setErrors((current) => ({
                              ...current,
                              identity: undefined,
                            }));
                          }}
                          className="h-4 w-4 accent-emerald-700"
                        />
                        หนังสือเดินทาง (Passport)
                      </label>
                    </div>
                  </fieldset>

                  <div>
                    <label htmlFor="identity-number" className="field-label">
                      {identityMode === "national-id"
                        ? "เลขบัตรประจำตัวประชาชน"
                        : "เลขหนังสือเดินทาง"}{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="identity-number"
                      type="text"
                      inputMode={identityMode === "national-id" ? "numeric" : "text"}
                      autoComplete="off"
                      maxLength={identityMode === "national-id" ? 13 : 12}
                      value={identityNumber}
                      onChange={(event) => {
                        const value =
                          identityMode === "national-id"
                            ? event.target.value.replace(/\D/g, "")
                            : event.target.value.toUpperCase();
                        setIdentityNumber(value);
                        if (errors.identity) {
                          setErrors((current) => ({
                            ...current,
                            identity: undefined,
                          }));
                        }
                      }}
                      placeholder={
                        identityMode === "national-id"
                          ? "กรอกเลขประจำตัวประชาชน 13 หลัก"
                          : "กรอกเลขหนังสือเดินทาง"
                      }
                      aria-invalid={Boolean(errors.identity)}
                      aria-describedby={
                        errors.identity ? "identity-error" : undefined
                      }
                      className={`input font-mono ${
                        errors.identity ? "border-red-400" : ""
                      }`}
                    />
                    {errors.identity && (
                      <p
                        id="identity-error"
                        className="mt-1.5 text-sm font-medium text-red-700"
                      >
                        {errors.identity}
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
                      placeholder="กรอกเฉพาะตัวเลข 9 หลัก"
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
                        รหัสประจำตัวผู้สอบปรากฏอยู่ในบัตรประจำตัวผู้สอบหรือจดหมายแจ้งสิทธิ์สอบ
                      </p>
                    )}
                  </div>

                  <button type="submit" className="btn-primary w-full sm:w-auto">
                    <LogIn className="h-4 w-4" />
                    เข้าสู่ระบบลงทะเบียน
                  </button>

                  <p className="text-xs leading-6 text-gray-500">
                    การเข้าใช้งานระบบถือว่าท่านยอมรับข้อกำหนดการใช้งานและนโยบายความเป็นส่วนตัว
                    ระบบจะบันทึกข้อมูลการเข้าใช้งานเพื่อความปลอดภัย
                  </p>
                </form>
              )}
            </div>
          </section>

          <div className="notice-warning">
            <Info className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <p className="font-semibold">
                ไม่ทราบรหัสประจำตัวผู้สอบหรือไม่พบข้อมูล
              </p>
              <p className="mt-1 leading-6">
                กรุณาติดต่อศูนย์สอบความรู้ฯ พร้อมเตรียมเลขบัตรประจำตัวประชาชน
                และหลักฐานการสมัคร เพื่อให้เจ้าหน้าที่ตรวจสอบข้อมูลให้ท่าน
              </p>
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="card p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold text-gray-900">
              <Hash className="h-4 w-4 text-emerald-700" />
              ข้อมูลที่ต้องเตรียม
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              <li className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                เลขบัตรประจำตัวประชาชน 13 หลัก หรือเลขหนังสือเดินทาง
              </li>
              <li className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                รหัสประจำตัวผู้สอบ 9 หลัก
              </li>
              <li className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                เลือกรอบสอบให้ตรงกับสิทธิ์ที่ได้รับ
              </li>
            </ul>
          </div>

          <div className="card p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold text-gray-900">
              <BadgeCheck className="h-4 w-4 text-emerald-700" />
              ขั้นตอนหลังเข้าสู่ระบบ
            </h2>
            <ol className="mt-3 space-y-3 text-sm text-gray-700">
              <li className="flex gap-2.5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-bold text-emerald-800">
                  1
                </span>
                ตรวจสอบข้อมูลส่วนบุคคลและรอบสอบ
              </li>
              <li className="flex gap-2.5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-bold text-emerald-800">
                  2
                </span>
                ยืนยันการลงทะเบียนและชำระค่าธรรมเนียม (หากยังไม่ชำระ)
              </li>
              <li className="flex gap-2.5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-bold text-emerald-800">
                  3
                </span>
                พิมพ์บัตรประจำตัวผู้สอบและตรวจสอบที่นั่งสอบ
              </li>
            </ol>
          </div>

          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold text-emerald-950">
              <Phone className="h-4 w-4" />
              ติดต่อศูนย์สอบฯ
            </h2>
            <p className="mt-2 text-sm leading-6 text-emerald-900">
              {siteInfo.hours}
            </p>
            <a
              href={`tel:${siteInfo.phoneHref}`}
              className="mt-2 block text-sm font-semibold text-emerald-900 hover:underline"
            >
              {siteInfo.phone}
            </a>
            <a
              href={`mailto:${siteInfo.email}`}
              className="mt-1 block break-all text-sm text-emerald-900 hover:underline"
            >
              {siteInfo.email}
            </a>
          </div>

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
              <ShieldCheck className="h-4 w-4 text-emerald-700" />
              ความปลอดภัยของข้อมูล
            </div>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              ข้อมูลของท่านจะถูกใช้เพื่อการตรวจสอบสิทธิ์และดำเนินการลงทะเบียนสอบเท่านั้น
              ตามนโยบายความเป็นส่วนตัวของสภาเภสัชกรรม
            </p>
            <Link
              href="/privacy"
              className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-emerald-800 hover:underline"
            >
              นโยบายความเป็นส่วนตัว
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
