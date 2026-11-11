"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  FileText,
  Info,
  RefreshCw,
  Scale,
  Send,
  ShieldCheck,
} from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import { examRounds, siteInfo } from "@/data/site";

type RequestType = "appeal" | "scores" | "refund" | "training";

const requestTypes: {
  id: RequestType;
  label: string;
  formCode: string;
  description: string;
  icon: typeof Scale;
}[] = [
  {
    id: "appeal",
    label: "ทักท้วงข้อสอบ",
    formCode: "ภส.10",
    description: "ยื่นข้อทักท้วงคำถาม ตัวเลือก หรือเฉลยของข้อสอบ",
    icon: Scale,
  },
  {
    id: "scores",
    label: "ขอทราบคะแนนสอบ",
    formCode: "ภส.11",
    description: "ขอทราบคะแนนรายบุคคลและรายละเอียดคะแนนรายส่วน",
    icon: BarChart3,
  },
  {
    id: "refund",
    label: "ขอคืนค่าธรรมเนียม",
    formCode: "ภส.12",
    description: "ยื่นคำร้องขอคืนค่าธรรมเนียมกรณีมีเหตุสุดวิสัย",
    icon: RefreshCw,
  },
  {
    id: "training",
    label: "รับรองการฝึกปฏิบัติงาน",
    formCode: "ภส.13",
    description: "ขอหนังสือรับรองหรือตรวจสอบระยะเวลาการฝึกปฏิบัติงาน",
    icon: Building2,
  },
];

const roundOptions = examRounds.map((round) => ({
  id: round.id,
  label: `${round.round} · ${round.code} (${round.dateShort})`,
}));

function isValidThaiNationalId(value: string) {
  if (!/^\d{13}$/.test(value)) return false;
  let sum = 0;
  for (let i = 0; i < 12; i += 1) {
    sum += Number(value[i]) * (13 - i);
  }
  const checkDigit = (11 - (sum % 11)) % 10;
  return checkDigit === Number(value[12]);
}

const initialForm = {
  requestType: "appeal" as RequestType,
  nationalId: "",
  fullName: "",
  phone: "",
  email: "",
  roundId: examRounds[0]?.id ?? "",
  questionNumber: "",
  subject: "",
  detail: "",
  bank: "",
  accountNumber: "",
  accountName: "",
  organization: "",
  trainingPeriod: "",
  consent: false,
};

export default function RequestsPage() {
  const [form, setForm] = useState(initialForm);
  const [attachment, setAttachment] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [reference, setReference] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const activeType =
    requestTypes.find((item) => item.id === form.requestType) ??
    requestTypes[0];

  function updateField<K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
    if (errors[key]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[key];
        return next;
      });
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};

    if (!isValidThaiNationalId(form.nationalId)) {
      nextErrors.nationalId =
        "กรุณากรอกเลขบัตรประจำตัวประชาชน 13 หลักให้ถูกต้อง";
    }
    if (!form.fullName.trim()) nextErrors.fullName = "กรุณากรอกชื่อ-นามสกุล";
    if (!/^[0-9+\-\s]{9,15}$/.test(form.phone)) {
      nextErrors.phone = "กรุณากรอกหมายเลขโทรศัพท์ให้ถูกต้อง";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "กรุณากรอกอีเมลให้ถูกต้อง";
    }
    if (!form.roundId) nextErrors.roundId = "กรุณาเลือกรอบสอบ";

    if (form.requestType === "appeal") {
      if (!form.questionNumber.trim())
        nextErrors.questionNumber = "กรุณาระบุเลขข้อหรือสถานีสอบ";
      if (!form.subject.trim())
        nextErrors.subject = "กรุณาระบุรายวิชาที่ทักท้วง";
      if (form.detail.trim().length < 20)
        nextErrors.detail = "กรุณาอธิบายเหตุผลอย่างน้อย 20 ตัวอักษร";
    }

    if (form.requestType === "scores") {
      if (!form.subject.trim())
        nextErrors.subject = "กรุณาระบุรายวิชาที่ขอทราบคะแนน";
      if (!form.detail.trim())
        nextErrors.detail = "กรุณาระบุวัตถุประสงค์ในการขอทราบคะแนน";
    }

    if (form.requestType === "refund") {
      if (!form.bank.trim()) nextErrors.bank = "กรุณาระบุธนาคาร";
      if (!form.accountNumber.trim())
        nextErrors.accountNumber = "กรุณาระบุเลขที่บัญชี";
      if (!form.accountName.trim())
        nextErrors.accountName = "กรุณาระบุชื่อบัญชี";
      if (form.detail.trim().length < 20)
        nextErrors.detail = "กรุณาอธิบายเหตุผลในการขอคืนเงินอย่างน้อย 20 ตัวอักษร";
    }

    if (form.requestType === "training") {
      if (!form.organization.trim())
        nextErrors.organization = "กรุณาระบุสถานที่ฝึกปฏิบัติงาน";
      if (!form.trainingPeriod.trim())
        nextErrors.trainingPeriod = "กรุณาระบุระยะเวลาการฝึกปฏิบัติงาน";
      if (!form.detail.trim())
        nextErrors.detail = "กรุณาระบุรายละเอียดที่ต้องการให้รับรอง";
    }

    if (!form.consent) {
      nextErrors.consent = "กรุณายอมรับข้อกำหนดและยืนยันความถูกต้องของข้อมูล";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setReference(`REQ-2570-${Math.floor(100000 + Math.random() * 900000)}`);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setForm(initialForm);
    setAttachment(null);
    setErrors({});
    setReference("");
    setSubmitted(false);
  }

  return (
    <div>
      <PageHeader
        title="ยื่นคำร้องออนไลน์"
        description="ยื่นคำร้องทักท้วงข้อสอบ ขอทราบคะแนน ขอคืนค่าธรรมเนียม หรือขอหนังสือรับรองการฝึกปฏิบัติงาน ต่อศูนย์สอบความรู้ฯ"
        breadcrumbs={[{ label: "ยื่นคำร้องออนไลน์" }]}
        eyebrow="บริการออนไลน์"
        meta={
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <span className="badge-green">ระบบคำร้องออนไลน์</span>
            <span>เจ้าหน้าที่จะติดต่อกลับตามข้อมูลที่ระบุ</span>
          </div>
        }
        actions={
          <Link href="/documents" className="btn-secondary">
            <FileText className="h-4 w-4" />
            แบบฟอร์มคำขอ
          </Link>
        }
      />

      <div className="container-page max-w-5xl py-8 lg:py-10">
        {submitted ? (
          <div className="card p-6 sm:p-8" role="status">
            <div className="text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                <CheckCircle2 className="h-7 w-7" />
              </span>
              <h2 className="mt-4 text-lg font-bold text-gray-900">
                บันทึกคำร้องเข้าสู่ระบบเรียบร้อยแล้ว
              </h2>
              <p className="mx-auto mt-1 max-w-lg text-sm leading-6 text-gray-600">
                เจ้าหน้าที่ศูนย์สอบฯ จะตรวจสอบคำร้องและแจ้งผลตามระเบียบที่เกี่ยวข้อง
                กรุณาเก็บหมายเลขอ้างอิงไว้สำหรับการติดตาม
              </p>
            </div>

            <div className="mx-auto mt-5 max-w-sm rounded-md border border-gray-200 bg-gray-50 p-5 text-center">
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                หมายเลขอ้างอิงคำร้อง
              </div>
              <div className="mt-1 font-mono text-2xl font-bold tracking-wide text-emerald-900">
                {reference}
              </div>
            </div>

            <dl className="mt-5 divide-y divide-gray-100 rounded-md border border-gray-200 text-sm">
              <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:justify-between">
                <dt className="text-gray-500">ประเภทคำร้อง</dt>
                <dd className="font-semibold text-gray-900">
                  {activeType.label} ({activeType.formCode})
                </dd>
              </div>
              <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:justify-between">
                <dt className="text-gray-500">ผู้ยื่นคำร้อง</dt>
                <dd className="font-semibold text-gray-900">{form.fullName}</dd>
              </div>
              <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:justify-between">
                <dt className="text-gray-500">อีเมลติดต่อ</dt>
                <dd className="text-gray-900">{form.email}</dd>
              </div>
              <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:justify-between">
                <dt className="text-gray-500">เอกสารแนบ</dt>
                <dd className="text-right text-gray-900">
                  {attachment ? attachment.name : "ไม่ได้แนบไฟล์"}
                </dd>
              </div>
            </dl>

            <div className="notice-warning mt-5">
              <Info className="mt-0.5 h-4 w-4 shrink-0" />
              <p className="text-sm leading-6">
                ระบบนี้เป็นการสาธิตการทำงาน ยังไม่มีการบันทึกหรือส่งคำร้องจริง
                หากต้องการยื่นคำร้องอย่างเป็นทางการ กรุณาติดต่อศูนย์สอบฯ
                ตามช่องทางที่ประกาศกำหนด
              </p>
            </div>

            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <button type="button" onClick={resetForm} className="btn-primary">
                ยื่นคำร้องฉบับอื่น
              </button>
              <Link href="/documents" className="btn-secondary">
                ดูแบบฟอร์มคำขอ
              </Link>
              <Link href="/contact" className="btn-neutral">
                ติดต่อศูนย์สอบฯ
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="notice-warning">
              <Info className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p className="font-semibold">ระบบสาธิตสำหรับทดลองใช้งาน</p>
                <p className="mt-1 leading-6">
                  แบบฟอร์มนี้จำลองขั้นตอนการยื่นคำร้อง ยังไม่มีการส่งข้อมูลจริง
                  กรุณาอย่าใช้ข้อมูลส่วนบุคคลจริงในการทดลอง
                </p>
              </div>
            </div>

            <fieldset className="mt-5">
              <legend className="sr-only">ประเภทคำร้อง</legend>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {requestTypes.map((type) => {
                  const Icon = type.icon;
                  const active = form.requestType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => {
                        updateField("requestType", type.id);
                        setErrors({});
                      }}
                      className={`rounded-lg border p-4 text-left transition-colors ${
                        active
                          ? "border-emerald-700 bg-emerald-700 text-white"
                          : "border-gray-200 bg-white text-gray-800 hover:border-emerald-300 hover:bg-emerald-50/50"
                      }`}
                    >
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-md ${
                          active
                            ? "bg-emerald-800 text-emerald-50"
                            : "bg-emerald-50 text-emerald-700"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="mt-2 block text-sm font-bold">
                        {type.label}
                      </span>
                      <span
                        className={`mt-0.5 block text-xs ${
                          active ? "text-emerald-100" : "text-gray-500"
                        }`}
                      >
                        {type.formCode} · {type.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <form onSubmit={handleSubmit} noValidate className="card mt-5 p-5 sm:p-7">
              <div className="border-b border-gray-200 pb-3">
                <h2 className="text-base font-bold text-gray-900">
                  แบบคำร้อง: {activeType.label}
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  กรุณากรอกข้อมูลให้ครบถ้วนเพื่อความรวดเร็วในการตรวจสอบ
                </p>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="request-national-id" className="field-label">
                    เลขบัตรประจำตัวประชาชน{" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="request-national-id"
                    type="text"
                    inputMode="numeric"
                    maxLength={13}
                    autoComplete="off"
                    value={form.nationalId}
                    onChange={(event) =>
                      updateField(
                        "nationalId",
                        event.target.value.replace(/\D/g, ""),
                      )
                    }
                    placeholder="กรอกเลขบัตรประจำตัวประชาชน 13 หลัก"
                    aria-invalid={Boolean(errors.nationalId)}
                    className={`input font-mono ${
                      errors.nationalId ? "border-red-400" : ""
                    }`}
                  />
                  {errors.nationalId && (
                    <p className="mt-1.5 text-sm font-medium text-red-700">
                      {errors.nationalId}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="request-full-name" className="field-label">
                    ชื่อ-นามสกุลผู้ยื่นคำร้อง{" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="request-full-name"
                    type="text"
                    value={form.fullName}
                    onChange={(event) =>
                      updateField("fullName", event.target.value)
                    }
                    aria-invalid={Boolean(errors.fullName)}
                    className={`input ${errors.fullName ? "border-red-400" : ""}`}
                  />
                  {errors.fullName && (
                    <p className="mt-1.5 text-sm font-medium text-red-700">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="request-phone" className="field-label">
                    เบอร์โทรศัพท์ติดต่อ <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="request-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(event) =>
                      updateField("phone", event.target.value)
                    }
                    placeholder="08X-XXX-XXXX"
                    aria-invalid={Boolean(errors.phone)}
                    className={`input ${errors.phone ? "border-red-400" : ""}`}
                  />
                  {errors.phone && (
                    <p className="mt-1.5 text-sm font-medium text-red-700">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="request-email" className="field-label">
                    อีเมลติดต่อ <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="request-email"
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                      updateField("email", event.target.value)
                    }
                    placeholder="name@example.com"
                    aria-invalid={Boolean(errors.email)}
                    className={`input ${errors.email ? "border-red-400" : ""}`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-sm font-medium text-red-700">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="request-round" className="field-label">
                    รอบสอบที่เกี่ยวข้อง <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="request-round"
                    value={form.roundId}
                    onChange={(event) =>
                      updateField("roundId", event.target.value)
                    }
                    className="select"
                  >
                    {roundOptions.map((round) => (
                      <option key={round.id} value={round.id}>
                        {round.label}
                      </option>
                    ))}
                  </select>
                  {errors.roundId && (
                    <p className="mt-1.5 text-sm font-medium text-red-700">
                      {errors.roundId}
                    </p>
                  )}
                </div>
              </div>

              {form.requestType === "appeal" && (
                <div className="mt-4 space-y-4 border-t border-gray-200 pt-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="request-subject" className="field-label">
                        รายวิชาที่ทักท้วง{" "}
                        <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="request-subject"
                        type="text"
                        value={form.subject}
                        onChange={(event) =>
                          updateField("subject", event.target.value)
                        }
                        placeholder="เช่น PLE-IP1"
                        aria-invalid={Boolean(errors.subject)}
                        className={`input ${errors.subject ? "border-red-400" : ""}`}
                      />
                      {errors.subject && (
                        <p className="mt-1.5 text-sm font-medium text-red-700">
                          {errors.subject}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="request-question-number"
                        className="field-label"
                      >
                        เลขข้อหรือสถานีสอบ{" "}
                        <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="request-question-number"
                        type="text"
                        value={form.questionNumber}
                        onChange={(event) =>
                          updateField("questionNumber", event.target.value)
                        }
                        placeholder="เช่น ข้อ 42 หรือสถานีที่ 3"
                        aria-invalid={Boolean(errors.questionNumber)}
                        className={`input ${
                          errors.questionNumber ? "border-red-400" : ""
                        }`}
                      />
                      {errors.questionNumber && (
                        <p className="mt-1.5 text-sm font-medium text-red-700">
                          {errors.questionNumber}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="request-detail" className="field-label">
                      เหตุผลและเอกสารอ้างอิง{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      id="request-detail"
                      rows={5}
                      value={form.detail}
                      onChange={(event) =>
                        updateField("detail", event.target.value)
                      }
                      placeholder="อธิบายเหตุผลในการทักท้วง พร้อมอ้างอิงตำรา คู่มือ หรือแนวทางปฏิบัติที่เกี่ยวข้อง"
                      aria-invalid={Boolean(errors.detail)}
                      className={`textarea ${
                        errors.detail ? "border-red-400" : ""
                      }`}
                    />
                    {errors.detail && (
                      <p className="mt-1.5 text-sm font-medium text-red-700">
                        {errors.detail}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {form.requestType === "scores" && (
                <div className="mt-4 space-y-4 border-t border-gray-200 pt-4">
                  <div>
                    <label htmlFor="request-score-subject" className="field-label">
                      รายวิชาที่ขอทราบคะแนน{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="request-score-subject"
                      type="text"
                      value={form.subject}
                      onChange={(event) =>
                        updateField("subject", event.target.value)
                      }
                      placeholder="เช่น PLE-CC1, PLE-PC1"
                      aria-invalid={Boolean(errors.subject)}
                      className={`input ${errors.subject ? "border-red-400" : ""}`}
                    />
                    {errors.subject && (
                      <p className="mt-1.5 text-sm font-medium text-red-700">
                        {errors.subject}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="request-score-purpose" className="field-label">
                      วัตถุประสงค์ในการขอทราบคะแนน{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      id="request-score-purpose"
                      rows={4}
                      value={form.detail}
                      onChange={(event) =>
                        updateField("detail", event.target.value)
                      }
                      placeholder="ระบุวัตถุประสงค์ เช่น เพื่อตรวจสอบความถูกต้องของคะแนน หรือเพื่อวางแผนการสอบครั้งถัดไป"
                      aria-invalid={Boolean(errors.detail)}
                      className={`textarea ${
                        errors.detail ? "border-red-400" : ""
                      }`}
                    />
                    {errors.detail && (
                      <p className="mt-1.5 text-sm font-medium text-red-700">
                        {errors.detail}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {form.requestType === "refund" && (
                <div className="mt-4 space-y-4 border-t border-gray-200 pt-4">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <label htmlFor="request-bank" className="field-label">
                        ธนาคาร <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="request-bank"
                        type="text"
                        value={form.bank}
                        onChange={(event) =>
                          updateField("bank", event.target.value)
                        }
                        placeholder="เช่น ธนาคารกรุงไทย"
                        aria-invalid={Boolean(errors.bank)}
                        className={`input ${errors.bank ? "border-red-400" : ""}`}
                      />
                      {errors.bank && (
                        <p className="mt-1.5 text-sm font-medium text-red-700">
                          {errors.bank}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="request-account-number" className="field-label">
                        เลขที่บัญชี <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="request-account-number"
                        type="text"
                        inputMode="numeric"
                        value={form.accountNumber}
                        onChange={(event) =>
                          updateField(
                            "accountNumber",
                            event.target.value.replace(/\D/g, ""),
                          )
                        }
                        placeholder="ระบุเลขที่บัญชีเงินฝาก"
                        aria-invalid={Boolean(errors.accountNumber)}
                        className={`input font-mono ${
                          errors.accountNumber ? "border-red-400" : ""
                        }`}
                      />
                      {errors.accountNumber && (
                        <p className="mt-1.5 text-sm font-medium text-red-700">
                          {errors.accountNumber}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="request-account-name" className="field-label">
                        ชื่อบัญชี <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="request-account-name"
                        type="text"
                        value={form.accountName}
                        onChange={(event) =>
                          updateField("accountName", event.target.value)
                        }
                        aria-invalid={Boolean(errors.accountName)}
                        className={`input ${
                          errors.accountName ? "border-red-400" : ""
                        }`}
                      />
                      {errors.accountName && (
                        <p className="mt-1.5 text-sm font-medium text-red-700">
                          {errors.accountName}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="request-refund-detail" className="field-label">
                      เหตุผลในการขอคืนค่าธรรมเนียม{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      id="request-refund-detail"
                      rows={5}
                      value={form.detail}
                      onChange={(event) =>
                        updateField("detail", event.target.value)
                      }
                      placeholder="อธิบายเหตุสุดวิสัยและแนบหลักฐานประกอบ เช่น ใบรับรองแพทย์ หนังสือรับรองจากหน่วยงาน"
                      aria-invalid={Boolean(errors.detail)}
                      className={`textarea ${
                        errors.detail ? "border-red-400" : ""
                      }`}
                    />
                    {errors.detail && (
                      <p className="mt-1.5 text-sm font-medium text-red-700">
                        {errors.detail}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {form.requestType === "training" && (
                <div className="mt-4 space-y-4 border-t border-gray-200 pt-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="request-organization" className="field-label">
                        สถานที่ฝึกปฏิบัติงาน{" "}
                        <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="request-organization"
                        type="text"
                        value={form.organization}
                        onChange={(event) =>
                          updateField("organization", event.target.value)
                        }
                        placeholder="ระบุโรงพยาบาลหรือสถานประกอบการ"
                        aria-invalid={Boolean(errors.organization)}
                        className={`input ${
                          errors.organization ? "border-red-400" : ""
                        }`}
                      />
                      {errors.organization && (
                        <p className="mt-1.5 text-sm font-medium text-red-700">
                          {errors.organization}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="request-training-period" className="field-label">
                        ระยะเวลาการฝึกปฏิบัติงาน{" "}
                        <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="request-training-period"
                        type="text"
                        value={form.trainingPeriod}
                        onChange={(event) =>
                          updateField("trainingPeriod", event.target.value)
                        }
                        placeholder="เช่น 1 มิถุนายน – 31 สิงหาคม 2569"
                        aria-invalid={Boolean(errors.trainingPeriod)}
                        className={`input ${
                          errors.trainingPeriod ? "border-red-400" : ""
                        }`}
                      />
                      {errors.trainingPeriod && (
                        <p className="mt-1.5 text-sm font-medium text-red-700">
                          {errors.trainingPeriod}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="request-training-detail" className="field-label">
                      รายละเอียดที่ต้องการให้รับรอง{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      id="request-training-detail"
                      rows={4}
                      value={form.detail}
                      onChange={(event) =>
                        updateField("detail", event.target.value)
                      }
                      placeholder="ระบุวัตถุประสงค์และรายละเอียดที่ต้องการให้ศูนย์สอบฯ รับรอง"
                      aria-invalid={Boolean(errors.detail)}
                      className={`textarea ${
                        errors.detail ? "border-red-400" : ""
                      }`}
                    />
                    {errors.detail && (
                      <p className="mt-1.5 text-sm font-medium text-red-700">
                        {errors.detail}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-4 border-t border-gray-200 pt-4">
                <label htmlFor="request-attachment" className="field-label">
                  แนบไฟล์หลักฐานประกอบ
                </label>
                <input
                  id="request-attachment"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(event) =>
                    setAttachment(event.target.files?.[0] ?? null)
                  }
                  className="block w-full text-sm text-gray-600 file:mr-3 file:rounded-md file:border-0 file:bg-emerald-50 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-emerald-800 hover:file:bg-emerald-100"
                />
                <p className="field-hint">
                  รองรับ PDF, JPG และ PNG ขนาดไม่เกิน 5 MB ต่อไฟล์
                  {attachment ? ` · เลือกไฟล์แล้ว: ${attachment.name}` : ""}
                </p>
              </div>

              <div
                className={`mt-4 rounded-md border p-4 ${
                  errors.consent
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <label className="flex items-start gap-2.5 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(event) =>
                      updateField("consent", event.target.checked)
                    }
                    className="mt-0.5 h-4 w-4 shrink-0 accent-emerald-700"
                  />
                  <span>
                    ข้าพเจ้าขอยืนยันว่าข้อมูลและหลักฐานที่แนบเป็นความจริง
                    และยินยอมให้ศูนย์สอบฯ ใช้ข้อมูลเพื่อการพิจารณาคำร้องตามระเบียบ
                  </span>
                </label>
                {errors.consent && (
                  <p className="mt-1.5 text-sm font-medium text-red-700">
                    {errors.consent}
                  </p>
                )}
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 pt-4">
                <p className="flex items-start gap-1.5 text-xs text-gray-500">
                  <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  ข้อมูลของท่านจะถูกใช้เพื่อการพิจารณาคำร้องเท่านั้น
                </p>
                <button type="submit" className="btn-primary">
                  <Send className="h-4 w-4" />
                  ส่งคำร้อง
                </button>
              </div>
            </form>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="card p-5">
                <h2 className="flex items-center gap-2 text-sm font-bold text-gray-900">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  ระยะเวลาการยื่นคำร้อง
                </h2>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  การทักท้วงข้อสอบต้องยื่นภายในระยะเวลาที่ประกาศกำหนดหลังวันสอบ
                  ส่วนการขอทราบคะแนนสามารถยื่นได้ภายใน 30 วันนับจากวันที่ประกาศผล
                </p>
              </div>
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
                <h2 className="flex items-center gap-2 text-sm font-bold text-emerald-950">
                  <Info className="h-4 w-4" />
                  ต้องการความช่วยเหลือ
                </h2>
                <p className="mt-2 text-sm leading-6 text-emerald-900">
                  ติดต่อศูนย์สอบฯ {siteInfo.hours}
                </p>
                <a
                  href={`tel:${siteInfo.phoneHref}`}
                  className="mt-1 block text-sm font-semibold text-emerald-900 hover:underline"
                >
                  {siteInfo.phone}
                </a>
                <Link
                  href="/contact"
                  className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-emerald-900 hover:underline"
                >
                  ช่องทางติดต่อทั้งหมด
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
