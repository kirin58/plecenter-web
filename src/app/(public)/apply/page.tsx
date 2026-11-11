"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  FileText,
  GraduationCap,
  Info,
  LogIn,
  Printer,
  QrCode,
  ShieldCheck,
  User,
} from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import { examRounds } from "@/data/site";

const openRounds = examRounds.filter((round) => round.status === "เปิดรับสมัคร");

const venues = [
  "ศูนย์สอบมหาวิทยาลัยธรรมศาสตร์ ศูนย์รังสิต (กรุงเทพฯ และปริมณฑล)",
  "ศูนย์สอบมหาวิทยาลัยเชียงใหม่ (ภาคเหนือ)",
  "ศูนย์สอบมหาวิทยาลัยขอนแก่น (ภาคตะวันออกเฉียงเหนือ)",
  "ศูนย์สอบมหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่ (ภาคใต้)",
  "ศูนย์สอบมหาวิทยาลัยมหิดล ศาลายา (ภาคกลาง)",
];

type DocumentKey = "idCard" | "transcript" | "photo";

type ApplyForm = {
  nationalId: string;
  title: string;
  firstNameTh: string;
  lastNameTh: string;
  firstNameEn: string;
  lastNameEn: string;
  dob: string;
  phone: string;
  email: string;
  university: string;
  degree: string;
  gradYear: string;
  selectedRoundIds: string[];
  venue: string;
  consent: boolean;
  paymentMethod: "promptpay" | "card" | "counter";
};

const initialForm: ApplyForm = {
  nationalId: "",
  title: "",
  firstNameTh: "",
  lastNameTh: "",
  firstNameEn: "",
  lastNameEn: "",
  dob: "",
  phone: "",
  email: "",
  university: "",
  degree: "",
  gradYear: "",
  selectedRoundIds: [],
  venue: venues[0],
  consent: false,
  paymentMethod: "promptpay",
};

const documentRequirements: {
  key: DocumentKey;
  title: string;
  description: string;
  icon: typeof CreditCard;
}[] = [
  {
    key: "idCard",
    title: "สำเนาบัตรประจำตัวประชาชน",
    description: "ลงลายมือชื่อรับรองสำเนาถูกต้อง รองรับ PDF, JPG หรือ PNG",
    icon: CreditCard,
  },
  {
    key: "transcript",
    title: "ใบรายงานผลการศึกษาหรือหนังสือรับรอง",
    description: "ออกโดยสถาบันการศึกษา รองรับ PDF, JPG หรือ PNG",
    icon: GraduationCap,
  },
  {
    key: "photo",
    title: "รูปถ่ายหน้าตรงขนาด 1.5 นิ้ว",
    description: "ถ่ายไว้ไม่เกิน 6 เดือน พื้นหลังสีขาวหรือสีฟ้า",
    icon: Camera,
  },
];

function isValidThaiNationalId(value: string) {
  if (!/^\d{13}$/.test(value)) return false;
  let sum = 0;
  for (let i = 0; i < 12; i += 1) {
    sum += Number(value[i]) * (13 - i);
  }
  const checkDigit = (11 - (sum % 11)) % 10;
  return checkDigit === Number(value[12]);
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isPhone(value: string) {
  return /^[0-9+\-\s]{9,15}$/.test(value);
}

export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<ApplyForm>(initialForm);
  const [documents, setDocuments] = useState<Record<DocumentKey, File | null>>({
    idCard: null,
    transcript: null,
    photo: null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [reference, setReference] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const selectedRounds = openRounds.filter((round) =>
    form.selectedRoundIds.includes(round.id),
  );
  const totalFee = selectedRounds.reduce((total, round) => total + round.fee, 0);

  function updateForm<K extends keyof ApplyForm>(key: K, value: ApplyForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    if (errors[key]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[key];
        return next;
      });
    }
  }

  function toggleRound(id: string) {
    setForm((current) => ({
      ...current,
      selectedRoundIds: current.selectedRoundIds.includes(id)
        ? current.selectedRoundIds.filter((roundId) => roundId !== id)
        : [...current.selectedRoundIds, id],
    }));
    if (errors.selectedRoundIds) {
      setErrors((current) => {
        const next = { ...current };
        delete next.selectedRoundIds;
        return next;
      });
    }
  }

  function validateStep(currentStep: number) {
    const nextErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!isValidThaiNationalId(form.nationalId)) {
        nextErrors.nationalId =
          "กรุณากรอกเลขบัตรประจำตัวประชาชน 13 หลักให้ถูกต้อง";
      }
      if (!form.title) nextErrors.title = "กรุณาเลือกคำนำหน้าชื่อ";
      if (!form.firstNameTh.trim())
        nextErrors.firstNameTh = "กรุณากรอกชื่อภาษาไทย";
      if (!form.lastNameTh.trim())
        nextErrors.lastNameTh = "กรุณากรอกนามสกุลภาษาไทย";
      if (!form.firstNameEn.trim())
        nextErrors.firstNameEn = "กรุณากรอกชื่อภาษาอังกฤษ";
      if (!form.lastNameEn.trim())
        nextErrors.lastNameEn = "กรุณากรอกนามสกุลภาษาอังกฤษ";
      if (!form.dob) nextErrors.dob = "กรุณาเลือกวันเดือนปีเกิด";
      if (!isPhone(form.phone))
        nextErrors.phone = "กรุณากรอกหมายเลขโทรศัพท์ให้ถูกต้อง";
      if (!isEmail(form.email))
        nextErrors.email = "กรุณากรอกอีเมลให้ถูกต้อง";
      if (!form.university.trim())
        nextErrors.university = "กรุณากรอกสถาบันการศึกษา";
      if (!form.degree.trim())
        nextErrors.degree = "กรุณากรอกหลักสูตรหรือสาขาวิชา";
      if (!/^\d{4}$/.test(form.gradYear))
        nextErrors.gradYear = "กรุณากรอกปีที่สำเร็จการศึกษา 4 หลัก";
    }

    if (currentStep === 2) {
      if (form.selectedRoundIds.length === 0) {
        nextErrors.selectedRoundIds =
          "กรุณาเลือกรายวิชาที่ประสงค์จะสมัครอย่างน้อย 1 รายวิชา";
      }
      if (!form.venue) nextErrors.venue = "กรุณาเลือกสนามสอบ";
    }

    if (currentStep === 3) {
      documentRequirements.forEach((doc) => {
        if (!documents[doc.key]) {
          nextErrors[doc.key] = `กรุณาแนบ${doc.title}`;
        }
      });
    }

    if (currentStep === 4) {
      if (!form.consent) {
        nextErrors.consent = "กรุณายอมรับข้อกำหนดและนโยบายความเป็นส่วนตัว";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function goNext() {
    if (validateStep(step)) {
      setStep((current) => Math.min(4, current + 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function goBack() {
    setErrors({});
    setStep((current) => Math.max(1, current - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function submitApplication() {
    if (!validateStep(4)) return;
    const random = Math.floor(100000 + Math.random() * 900000);
    setReference(`PLE-2570-${random}`);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const steps = [
    { number: 1, label: "ข้อมูลผู้สมัคร" },
    { number: 2, label: "เลือกรายวิชา" },
    { number: 3, label: "แนบเอกสาร" },
    { number: 4, label: "ตรวจสอบและชำระเงิน" },
  ];

  if (submitted) {
    return (
      <div>
        <PageHeader
          title="สมัครสอบออนไลน์"
          description="ยื่นใบสมัครสอบความรู้ทางวิชาชีพเภสัชกรรม"
          breadcrumbs={[{ label: "สมัครสอบออนไลน์" }]}
          eyebrow="บริการออนไลน์"
        />
        <div className="container-page max-w-3xl py-10">
          <div className="card p-6 sm:p-8">
            <div className="flex items-start gap-4 rounded-md border border-emerald-300 bg-emerald-50 p-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-white">
                <Check className="h-6 w-6" />
              </span>
              <div>
                <h2 className="text-lg font-bold text-emerald-950">
                  บันทึกการสมัครสอบเรียบร้อยแล้ว
                </h2>
                <p className="mt-1 text-sm leading-6 text-emerald-900">
                  ระบบได้บันทึกข้อมูลการสมัครและจำลองการชำระค่าธรรมเนียมเรียบร้อยแล้ว
                  กรุณาเก็บหมายเลขอ้างอิงไว้สำหรับติดต่อเจ้าหน้าที่
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-md border border-gray-200 bg-gray-50 p-5 text-center">
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                หมายเลขอ้างอิงการสมัคร
              </div>
              <div className="mt-1 font-mono text-2xl font-bold tracking-wide text-emerald-900">
                {reference}
              </div>
              <p className="mt-1 text-xs text-gray-500">
                กรุณาระบุหมายเลขนี้เมื่อติดต่อศูนย์สอบฯ
              </p>
            </div>

            <dl className="mt-5 divide-y divide-gray-100 rounded-md border border-gray-200 text-sm">
              <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:justify-between">
                <dt className="text-gray-500">ผู้สมัคร</dt>
                <dd className="font-semibold text-gray-900">
                  {form.title}
                  {form.firstNameTh} {form.lastNameTh}
                </dd>
              </div>
              <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:justify-between">
                <dt className="text-gray-500">รายวิชาที่สมัคร</dt>
                <dd className="text-right font-semibold text-gray-900">
                  {selectedRounds.map((round) => round.code).join(", ")}
                </dd>
              </div>
              <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:justify-between">
                <dt className="text-gray-500">สนามสอบ</dt>
                <dd className="text-right font-semibold text-gray-900">
                  {form.venue}
                </dd>
              </div>
              <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:justify-between">
                <dt className="text-gray-500">ค่าธรรมเนียมรวม</dt>
                <dd className="text-right text-base font-bold text-emerald-800">
                  {totalFee.toLocaleString("th-TH")} บาท
                </dd>
              </div>
              <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:justify-between">
                <dt className="text-gray-500">อีเมลรับแจ้งเตือน</dt>
                <dd className="text-right text-gray-900">{form.email}</dd>
              </div>
            </dl>

            <div className="notice mt-5">
              <Info className="mt-0.5 h-4 w-4 shrink-0" />
              <p className="text-sm leading-6">
                ระบบนี้เป็นการสาธิตขั้นตอนการสมัคร ยังไม่มีการบันทึกข้อมูลจริงหรือตัดเงินจริง
                เมื่อระบบเชื่อมต่อฐานข้อมูลกลาง ท่านจะได้รับอีเมลยืนยันและสามารถตรวจสอบสถานะได้ที่หน้าตรวจสอบสถานะและผลสอบ
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="btn-primary"
              >
                <Printer className="h-4 w-4" />
                พิมพ์ใบสมัคร
              </button>
              <Link href="/scores" className="btn-secondary">
                ตรวจสอบสถานะการสมัคร
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/" className="btn-neutral">
                กลับสู่หน้าแรก
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="สมัครสอบออนไลน์"
        description="ยื่นใบสมัครสอบความรู้ทางวิชาชีพเภสัชกรรม เลือกรายวิชาและสนามสอบ แนบเอกสาร และชำระค่าธรรมเนียมผ่านระบบอิเล็กทรอนิกส์"
        breadcrumbs={[{ label: "สมัครสอบออนไลน์" }]}
        eyebrow="บริการออนไลน์"
        meta={
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <span className="badge-green">เปิดรับสมัครครั้งที่ 1/2570</span>
            <span>ถึงวันที่ 15 ธันวาคม 2569 เวลา 23:59 น.</span>
          </div>
        }
        actions={
          <Link href="/exam-registration" className="btn-secondary">
            <LogIn className="h-4 w-4" />
            มีรหัสผู้สอบแล้ว
          </Link>
        }
      />

      <div className="container-page max-w-5xl py-8 lg:py-10">
        <div className="notice-warning">
          <Info className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <p className="font-semibold">แบบฟอร์มสาธิตสำหรับทดลองใช้งาน</p>
            <p className="mt-1 leading-6">
              ขั้นตอนการสมัครนี้จำลองการทำงานของระบบจริง
              ยังไม่มีการบันทึกข้อมูลหรือชำระเงินจริง
              กรุณาอย่าใช้ข้อมูลส่วนบุคคลจริงในการทดลอง
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-lg border border-gray-200 bg-white p-4">
          <ol className="grid gap-2 sm:grid-cols-4">
            {steps.map((item) => {
              const isActive = step === item.number;
              const isDone = step > item.number;
              return (
                <li key={item.number}>
                  <button
                    type="button"
                    onClick={() => {
                      if (item.number < step) {
                        setErrors({});
                        setStep(item.number);
                      }
                    }}
                    disabled={item.number > step}
                    className={`flex w-full items-center gap-2 rounded-md border px-3 py-2.5 text-left text-sm transition-colors ${
                      isActive
                        ? "border-emerald-700 bg-emerald-700 text-white"
                        : isDone
                          ? "border-emerald-200 bg-emerald-50 text-emerald-900 hover:bg-emerald-100"
                          : "border-gray-200 bg-gray-50 text-gray-400"
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        isActive
                          ? "bg-white text-emerald-800"
                          : isDone
                            ? "bg-emerald-700 text-white"
                            : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {isDone ? <Check className="h-3.5 w-3.5" /> : item.number}
                    </span>
                    <span className="font-semibold">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="card mt-5 p-5 sm:p-7">
          {step === 1 && (
            <section aria-labelledby="step-1-heading">
              <div className="border-b border-gray-200 pb-3">
                <h2
                  id="step-1-heading"
                  className="flex items-center gap-2 text-base font-bold text-gray-900"
                >
                  <User className="h-5 w-5 text-emerald-700" />
                  1. ข้อมูลส่วนบุคคลและการศึกษา
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  กรุณากรอกข้อมูลให้ตรงกับบัตรประจำตัวประชาชนและเอกสารทางการ
                </p>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="apply-national-id" className="field-label">
                    เลขบัตรประจำตัวประชาชน <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="apply-national-id"
                    type="text"
                    inputMode="numeric"
                    maxLength={13}
                    autoComplete="off"
                    value={form.nationalId}
                    onChange={(event) =>
                      updateForm(
                        "nationalId",
                        event.target.value.replace(/\D/g, ""),
                      )
                    }
                    placeholder="กรอกเลขบัตรประจำตัวประชาชน 13 หลัก"
                    aria-invalid={Boolean(errors.nationalId)}
                    className={`input max-w-md font-mono ${
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
                  <label htmlFor="apply-title" className="field-label">
                    คำนำหน้าชื่อ <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="apply-title"
                    value={form.title}
                    onChange={(event) => updateForm("title", event.target.value)}
                    aria-invalid={Boolean(errors.title)}
                    className={`select ${errors.title ? "border-red-400" : ""}`}
                  >
                    <option value="">เลือกคำนำหน้าชื่อ</option>
                    <option value="นาย">นาย</option>
                    <option value="นาง">นาง</option>
                    <option value="นางสาว">นางสาว</option>
                    <option value="เภสัชกร">เภสัชกร</option>
                    <option value="เภสัชกรหญิง">เภสัชกรหญิง</option>
                  </select>
                  {errors.title && (
                    <p className="mt-1.5 text-sm font-medium text-red-700">
                      {errors.title}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="apply-dob" className="field-label">
                    วันเดือนปีเกิด <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="apply-dob"
                    type="date"
                    value={form.dob}
                    onChange={(event) => updateForm("dob", event.target.value)}
                    aria-invalid={Boolean(errors.dob)}
                    className={`input ${errors.dob ? "border-red-400" : ""}`}
                  />
                  {errors.dob && (
                    <p className="mt-1.5 text-sm font-medium text-red-700">
                      {errors.dob}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="apply-first-th" className="field-label">
                    ชื่อ (ภาษาไทย) <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="apply-first-th"
                    type="text"
                    value={form.firstNameTh}
                    onChange={(event) =>
                      updateForm("firstNameTh", event.target.value)
                    }
                    aria-invalid={Boolean(errors.firstNameTh)}
                    className={`input ${errors.firstNameTh ? "border-red-400" : ""}`}
                  />
                  {errors.firstNameTh && (
                    <p className="mt-1.5 text-sm font-medium text-red-700">
                      {errors.firstNameTh}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="apply-last-th" className="field-label">
                    นามสกุล (ภาษาไทย) <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="apply-last-th"
                    type="text"
                    value={form.lastNameTh}
                    onChange={(event) =>
                      updateForm("lastNameTh", event.target.value)
                    }
                    aria-invalid={Boolean(errors.lastNameTh)}
                    className={`input ${errors.lastNameTh ? "border-red-400" : ""}`}
                  />
                  {errors.lastNameTh && (
                    <p className="mt-1.5 text-sm font-medium text-red-700">
                      {errors.lastNameTh}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="apply-first-en" className="field-label">
                    First Name (English) <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="apply-first-en"
                    type="text"
                    value={form.firstNameEn}
                    onChange={(event) =>
                      updateForm("firstNameEn", event.target.value)
                    }
                    aria-invalid={Boolean(errors.firstNameEn)}
                    className={`input ${errors.firstNameEn ? "border-red-400" : ""}`}
                  />
                  {errors.firstNameEn && (
                    <p className="mt-1.5 text-sm font-medium text-red-700">
                      {errors.firstNameEn}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="apply-last-en" className="field-label">
                    Last Name (English) <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="apply-last-en"
                    type="text"
                    value={form.lastNameEn}
                    onChange={(event) =>
                      updateForm("lastNameEn", event.target.value)
                    }
                    aria-invalid={Boolean(errors.lastNameEn)}
                    className={`input ${errors.lastNameEn ? "border-red-400" : ""}`}
                  />
                  {errors.lastNameEn && (
                    <p className="mt-1.5 text-sm font-medium text-red-700">
                      {errors.lastNameEn}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="apply-phone" className="field-label">
                    เบอร์โทรศัพท์มือถือ <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="apply-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(event) => updateForm("phone", event.target.value)}
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
                  <label htmlFor="apply-email" className="field-label">
                    อีเมลติดต่อ <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="apply-email"
                    type="email"
                    value={form.email}
                    onChange={(event) => updateForm("email", event.target.value)}
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
                  <label htmlFor="apply-university" className="field-label">
                    สถาบันที่สำเร็จการศึกษา{" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="apply-university"
                    type="text"
                    value={form.university}
                    onChange={(event) =>
                      updateForm("university", event.target.value)
                    }
                    placeholder="เช่น คณะเภสัชศาสตร์ มหาวิทยาลัย..."
                    aria-invalid={Boolean(errors.university)}
                    className={`input ${errors.university ? "border-red-400" : ""}`}
                  />
                  {errors.university && (
                    <p className="mt-1.5 text-sm font-medium text-red-700">
                      {errors.university}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="apply-degree" className="field-label">
                    หลักสูตร / สาขาวิชา <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="apply-degree"
                    type="text"
                    value={form.degree}
                    onChange={(event) =>
                      updateForm("degree", event.target.value)
                    }
                    placeholder="เช่น เภสัชศาสตรบัณฑิต"
                    aria-invalid={Boolean(errors.degree)}
                    className={`input ${errors.degree ? "border-red-400" : ""}`}
                  />
                  {errors.degree && (
                    <p className="mt-1.5 text-sm font-medium text-red-700">
                      {errors.degree}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="apply-grad-year" className="field-label">
                    ปีที่สำเร็จการศึกษา (พ.ศ.){" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="apply-grad-year"
                    type="text"
                    inputMode="numeric"
                    maxLength={4}
                    value={form.gradYear}
                    onChange={(event) =>
                      updateForm(
                        "gradYear",
                        event.target.value.replace(/\D/g, ""),
                      )
                    }
                    placeholder="เช่น 2569"
                    aria-invalid={Boolean(errors.gradYear)}
                    className={`input max-w-[10rem] font-mono ${
                      errors.gradYear ? "border-red-400" : ""
                    }`}
                  />
                  {errors.gradYear && (
                    <p className="mt-1.5 text-sm font-medium text-red-700">
                      {errors.gradYear}
                    </p>
                  )}
                </div>
              </div>
            </section>
          )}

          {step === 2 && (
            <section aria-labelledby="step-2-heading">
              <div className="border-b border-gray-200 pb-3">
                <h2
                  id="step-2-heading"
                  className="flex items-center gap-2 text-base font-bold text-gray-900"
                >
                  <ClipboardList className="h-5 w-5 text-emerald-700" />
                  2. เลือกรายวิชาและสนามสอบ
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  ค่าธรรมเนียมสอบข้อเขียน E-Exam รายวิชาละ 1,000 บาท
                  และการสอบทักษะ OSPE รายวิชาละ 2,000 บาท
                </p>
              </div>

              <fieldset className="mt-4">
                <legend className="field-label">
                  รายวิชาที่ประสงค์จะสมัคร{" "}
                  <span className="text-red-600">*</span>
                </legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {openRounds.map((round) => {
                    const checked = form.selectedRoundIds.includes(round.id);
                    return (
                      <label
                        key={round.id}
                        className={`flex cursor-pointer items-start gap-3 rounded-md border p-4 transition-colors ${
                          checked
                            ? "border-emerald-500 bg-emerald-50"
                            : "border-gray-200 bg-white hover:border-emerald-300"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleRound(round.id)}
                          className="mt-1 h-4 w-4 shrink-0 accent-emerald-700"
                        />
                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-center justify-between gap-2">
                            <span className="text-sm font-bold text-emerald-900">
                              {round.code}
                            </span>
                            <span className="text-sm font-bold text-gray-900">
                              {round.fee.toLocaleString("th-TH")} บาท
                            </span>
                          </span>
                          <span className="mt-0.5 block text-sm font-medium text-gray-900">
                            {round.name}
                          </span>
                          <span className="mt-1 block text-xs text-gray-600">
                            {round.mode} · {round.dateShort} · {round.time}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>
                {errors.selectedRoundIds && (
                  <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-red-700">
                    <AlertCircle className="h-4 w-4" />
                    {errors.selectedRoundIds}
                  </p>
                )}
              </fieldset>

              <div className="mt-5">
                <label htmlFor="apply-venue" className="field-label">
                  สนามสอบที่ต้องการ <span className="text-red-600">*</span>
                </label>
                <select
                  id="apply-venue"
                  value={form.venue}
                  onChange={(event) => updateForm("venue", event.target.value)}
                  className="select"
                >
                  {venues.map((venue) => (
                    <option key={venue} value={venue}>
                      {venue}
                    </option>
                  ))}
                </select>
                <p className="field-hint">
                  การจัดสรรสนามสอบขึ้นอยู่กับจำนวนที่นั่งและพื้นที่ให้บริการ
                  ศูนย์สอบฯ อาจปรับเปลี่ยนสนามสอบตามความเหมาะสม
                </p>
              </div>

              <div className="mt-5 rounded-md border border-gray-200 bg-gray-50 p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      รายวิชาที่เลือก
                    </div>
                    <div className="mt-0.5 text-sm text-gray-600">
                      {selectedRounds.length > 0
                        ? selectedRounds
                            .map((round) => round.code)
                            .join(", ")
                        : "ยังไม่ได้เลือกรายวิชา"}
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-xs text-gray-500">
                      ค่าธรรมเนียมรวม
                    </div>
                    <div className="text-xl font-bold text-emerald-800">
                      {totalFee.toLocaleString("th-TH")} บาท
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {step === 3 && (
            <section aria-labelledby="step-3-heading">
              <div className="border-b border-gray-200 pb-3">
                <h2
                  id="step-3-heading"
                  className="flex items-center gap-2 text-base font-bold text-gray-900"
                >
                  <FileText className="h-5 w-5 text-emerald-700" />
                  3. แนบเอกสารประกอบการสมัคร
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  รองรับไฟล์ PDF, JPG และ PNG ขนาดไม่เกิน 5 MB ต่อไฟล์
                  กรุณาตรวจสอบความชัดเจนของเอกสารก่อนอัปโหลด
                </p>
              </div>

              <div className="mt-4 space-y-3">
                {documentRequirements.map((doc) => {
                  const Icon = doc.icon;
                  const file = documents[doc.key];
                  return (
                    <div
                      key={doc.key}
                      className={`rounded-md border p-4 ${
                        errors[doc.key]
                          ? "border-red-300 bg-red-50/40"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-700">
                          <Icon className="h-4 w-4" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <label
                            htmlFor={`apply-doc-${doc.key}`}
                            className="block text-sm font-semibold text-gray-900"
                          >
                            {doc.title} <span className="text-red-600">*</span>
                          </label>
                          <p className="mt-0.5 text-xs text-gray-500">
                            {doc.description}
                          </p>
                          <input
                            id={`apply-doc-${doc.key}`}
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(event) => {
                              const selected =
                                event.target.files?.[0] ?? null;
                              setDocuments((current) => ({
                                ...current,
                                [doc.key]: selected,
                              }));
                              if (errors[doc.key]) {
                                setErrors((current) => {
                                  const next = { ...current };
                                  delete next[doc.key];
                                  return next;
                                });
                              }
                            }}
                            className="mt-2 block w-full text-sm text-gray-600 file:mr-3 file:rounded-md file:border-0 file:bg-emerald-50 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-emerald-800 hover:file:bg-emerald-100"
                          />
                          {file ? (
                            <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-emerald-800">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              เลือกไฟล์แล้ว: {file.name} (
                              {(file.size / 1024 / 1024).toFixed(2)} MB)
                            </p>
                          ) : (
                            <p className="mt-2 text-xs text-gray-400">
                              ยังไม่ได้เลือกไฟล์
                            </p>
                          )}
                          {errors[doc.key] && (
                            <p className="mt-1.5 text-sm font-medium text-red-700">
                              {errors[doc.key]}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="notice mt-4">
                <Info className="mt-0.5 h-4 w-4 shrink-0" />
                <p className="text-sm leading-6">
                  เอกสารที่อัปโหลดในแบบฟอร์มสาธิตนี้จะไม่ถูกส่งไปยังเซิร์ฟเวอร์
                  และจะหายไปเมื่อปิดหรือรีเฟรชหน้าเว็บ
                </p>
              </div>
            </section>
          )}

          {step === 4 && (
            <section aria-labelledby="step-4-heading">
              <div className="border-b border-gray-200 pb-3">
                <h2
                  id="step-4-heading"
                  className="flex items-center gap-2 text-base font-bold text-gray-900"
                >
                  <CreditCard className="h-5 w-5 text-emerald-700" />
                  4. ตรวจสอบข้อมูลและชำระเงิน
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  กรุณาตรวจสอบข้อมูลให้ถูกต้องก่อนยืนยันการสมัคร
                </p>
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_18rem]">
                <div className="space-y-4">
                  <div className="rounded-md border border-gray-200">
                    <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                      <h3 className="text-sm font-bold text-gray-900">
                        ข้อมูลผู้สมัคร
                      </h3>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-xs font-semibold text-emerald-800 hover:underline"
                      >
                        แก้ไข
                      </button>
                    </div>
                    <dl className="divide-y divide-gray-100 text-sm">
                      <div className="flex flex-col gap-1 px-4 py-2.5 sm:flex-row sm:justify-between">
                        <dt className="text-gray-500">ชื่อ-นามสกุล</dt>
                        <dd className="font-medium text-gray-900">
                          {form.title}
                          {form.firstNameTh} {form.lastNameTh}
                        </dd>
                      </div>
                      <div className="flex flex-col gap-1 px-4 py-2.5 sm:flex-row sm:justify-between">
                        <dt className="text-gray-500">เลขบัตรประชาชน</dt>
                        <dd className="font-mono text-gray-900">
                          {form.nationalId}
                        </dd>
                      </div>
                      <div className="flex flex-col gap-1 px-4 py-2.5 sm:flex-row sm:justify-between">
                        <dt className="text-gray-500">การศึกษา</dt>
                        <dd className="text-right text-gray-900">
                          {form.university} · {form.degree} · {form.gradYear}
                        </dd>
                      </div>
                      <div className="flex flex-col gap-1 px-4 py-2.5 sm:flex-row sm:justify-between">
                        <dt className="text-gray-500">ติดต่อ</dt>
                        <dd className="text-right text-gray-900">
                          {form.phone} · {form.email}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="rounded-md border border-gray-200">
                    <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                      <h3 className="text-sm font-bold text-gray-900">
                        รายวิชาและสนามสอบ
                      </h3>
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="text-xs font-semibold text-emerald-800 hover:underline"
                      >
                        แก้ไข
                      </button>
                    </div>
                    <ul className="divide-y divide-gray-100">
                      {selectedRounds.map((round) => (
                        <li
                          key={round.id}
                          className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm"
                        >
                          <span>
                            <span className="block font-medium text-gray-900">
                              {round.code} · {round.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              {round.mode} · {round.dateShort}
                            </span>
                          </span>
                          <span className="shrink-0 font-semibold text-gray-900">
                            {round.fee.toLocaleString("th-TH")} บาท
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="border-t border-gray-100 px-4 py-2.5 text-sm text-gray-600">
                      สนามสอบ: {form.venue}
                    </div>
                  </div>

                  <div className="rounded-md border border-gray-200 px-4 py-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-gray-900">
                        เอกสารแนบ
                      </h3>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="text-xs font-semibold text-emerald-800 hover:underline"
                      >
                        แก้ไข
                      </button>
                    </div>
                    <ul className="mt-2 space-y-1.5 text-sm text-gray-700">
                      {documentRequirements.map((doc) => (
                        <li key={doc.key} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" />
                          {doc.title}
                          <span className="truncate text-xs text-gray-500">
                            {documents[doc.key]?.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <fieldset>
                    <legend className="field-label">ช่องทางชำระเงิน</legend>
                    <div className="grid gap-2 sm:grid-cols-3">
                      {[
                        { value: "promptpay", label: "Thai QR / PromptPay" },
                        { value: "card", label: "บัตรเครดิต / เดบิต" },
                        { value: "counter", label: "เคาน์เตอร์ธนาคาร" },
                      ].map((method) => (
                        <label
                          key={method.value}
                          className={`flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2.5 text-sm ${
                            form.paymentMethod === method.value
                              ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                              : "border-gray-200 text-gray-700"
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment-method"
                            value={method.value}
                            checked={form.paymentMethod === method.value}
                            onChange={() =>
                              updateForm(
                                "paymentMethod",
                                method.value as ApplyForm["paymentMethod"],
                              )
                            }
                            className="h-4 w-4 accent-emerald-700"
                          />
                          {method.label}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <div
                    className={`rounded-md border p-4 ${
                      errors.consent
                        ? "border-red-300 bg-red-50"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <label className="flex items-start gap-2.5 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={form.consent}
                        onChange={(event) => {
                          updateForm("consent", event.target.checked);
                          if (errors.consent) {
                            setErrors((current) => {
                              const next = { ...current };
                              delete next.consent;
                              return next;
                            });
                          }
                        }}
                        className="mt-0.5 h-4 w-4 shrink-0 accent-emerald-700"
                      />
                      <span>
                        ข้าพเจ้ายืนยันว่าข้อมูลที่กรอกเป็นความจริง
                        และยอมรับข้อกำหนดการใช้งานรวมถึงนโยบายความเป็นส่วนตัวของศูนย์สอบฯ
                      </span>
                    </label>
                    {errors.consent && (
                      <p className="mt-1.5 text-sm font-medium text-red-700">
                        {errors.consent}
                      </p>
                    )}
                  </div>
                </div>

                <aside className="space-y-3">
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
                    <h3 className="text-sm font-bold text-emerald-950">
                      สรุปค่าธรรมเนียม
                    </h3>
                    <dl className="mt-3 space-y-2 text-sm">
                      {selectedRounds.map((round) => (
                        <div
                          key={round.id}
                          className="flex justify-between gap-2"
                        >
                          <dt className="text-emerald-900">{round.code}</dt>
                          <dd className="font-medium text-emerald-950">
                            {round.fee.toLocaleString("th-TH")} บาท
                          </dd>
                        </div>
                      ))}
                      <div className="flex justify-between gap-2 border-t border-emerald-200 pt-2 text-base font-bold text-emerald-950">
                        <dt>รวมทั้งสิ้น</dt>
                        <dd>{totalFee.toLocaleString("th-TH")} บาท</dd>
                      </div>
                    </dl>
                    <p className="mt-2 text-xs leading-5 text-emerald-800">
                      ค่าธรรมเนียมที่ชำระแล้วไม่สามารถขอคืนได้
                      เว้นแต่มีเหตุสุดวิสัยตามระเบียบ
                    </p>
                  </div>

                  <div className="rounded-lg border border-gray-200 bg-white p-4 text-center">
                    <QrCode className="mx-auto h-10 w-10 text-gray-700" />
                    <p className="mt-2 text-xs text-gray-500">
                      เมื่อยืนยัน ระบบจะแสดง QR Code
                      สำหรับชำระเงินในขั้นตอนถัดไป
                    </p>
                  </div>

                  <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                      <ShieldCheck className="h-4 w-4 text-emerald-700" />
                      ความปลอดภัย
                    </div>
                    <p className="mt-1 text-xs leading-5 text-gray-600">
                      ข้อมูลของท่านถูกใช้เพื่อการสมัครสอบเท่านั้น
                      และจะไม่เปิดเผยต่อบุคคลภายนอกโดยไม่ได้รับอนุญาต
                    </p>
                  </div>
                </aside>
              </div>
            </section>
          )}

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 pt-5">
            {step > 1 ? (
              <button type="button" onClick={goBack} className="btn-neutral">
                <ArrowLeft className="h-4 w-4" />
                ย้อนกลับ
              </button>
            ) : (
              <Link href="/examinees" className="btn-neutral">
                ตรวจสอบคุณสมบัติ
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}

            {step < 4 ? (
              <button type="button" onClick={goNext} className="btn-primary">
                ถัดไป
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={submitApplication}
                className="btn-primary"
              >
                <CheckCircle2 className="h-4 w-4" />
                ยืนยันการสมัครและชำระเงิน
              </button>
            )}
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between">
          <span className="flex items-start gap-2">
            <Info className="mt-0.5 h-4 w-4 shrink-0" />
            ผู้สมัครควรตรวจสอบคุณสมบัติและรายวิชาที่ต้องสอบก่อนยื่นใบสมัคร
          </span>
          <div className="flex shrink-0 gap-2">
            <Link
              href="/examinees"
              className="font-semibold text-emerald-800 hover:underline"
            >
              ข้อมูลผู้เข้าสอบ
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/documents"
              className="font-semibold text-emerald-800 hover:underline"
            >
              คู่มือการสมัคร
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
