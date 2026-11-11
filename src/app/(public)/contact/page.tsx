"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  Info,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Printer,
  Send,
  ShieldCheck,
} from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import { siteInfo } from "@/data/site";

const contactTopics = [
  "สอบถามการสมัครสอบและการชำระเงิน",
  "สอบถามสนามสอบและที่นั่งสอบ",
  "การใช้งานระบบ E-Exam",
  "การขอรับรองผลคะแนนหรือหนังสือรับรอง",
  "ปัญหาการเข้าสู่ระบบหรือข้อมูลไม่ถูกต้อง",
  "เอกสารและแบบฟอร์มคำขอ",
  "เรื่องอื่น ๆ",
];

const channels = [
  {
    title: "โทรศัพท์",
    value: siteInfo.phone,
    href: `tel:${siteInfo.phoneHref}`,
    icon: Phone,
    description: "สอบถามข้อมูลและติดตามเรื่องในวันและเวลาราชการ",
  },
  {
    title: "อีเมล",
    value: siteInfo.email,
    href: `mailto:${siteInfo.email}`,
    icon: Mail,
    description: "ส่งเอกสารหรือคำถามที่ต้องการคำตอบเป็นลายลักษณ์อักษร",
  },
  {
    title: "โทรสาร",
    value: siteInfo.fax,
    href: undefined,
    icon: Printer,
    description: "ช่องทางสำหรับหน่วยงานที่ต้องการส่งเอกสารทางราชการ",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    topic: contactTopics[0],
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [reference, setReference] = useState("");
  const [sent, setSent] = useState(false);

  function updateField(key: keyof typeof form, value: string) {
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

    if (!form.name.trim()) nextErrors.name = "กรุณากรอกชื่อ-นามสกุล";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "กรุณากรอกอีเมลให้ถูกต้อง";
    }
    if (!form.subject.trim()) nextErrors.subject = "กรุณากรอกหัวข้อ";
    if (form.message.trim().length < 10) {
      nextErrors.message = "กรุณากรอกรายละเอียดอย่างน้อย 10 ตัวอักษร";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setReference(
      `CNT-2570-${Math.floor(100000 + Math.random() * 900000)}`,
    );
    setSent(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div>
      <PageHeader
        title="ติดต่อศูนย์สอบฯ"
        description="สอบถามข้อมูลการสอบ การสมัครสอบ เอกสาร และการให้บริการของศูนย์สอบความรู้และทักษะทางวิชาชีพเภสัชกรรม สภาเภสัชกรรม"
        breadcrumbs={[{ label: "ติดต่อศูนย์สอบฯ" }]}
        eyebrow="ช่วยเหลือ"
        meta={
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <span className="badge-green">{siteInfo.hours}</span>
            <span>ปรับปรุงล่าสุด {siteInfo.updated}</span>
          </div>
        }
        actions={
          <a
            href={siteInfo.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
          >
            <MapPin className="h-4 w-4" />
            เปิดแผนที่สำนักงาน
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        }
      />

      <div className="container-page grid gap-8 py-8 lg:grid-cols-[1fr_1.05fr] lg:py-10">
        <div className="space-y-4">
          <section className="card p-5 sm:p-6">
            <h2 className="flex items-center gap-2 border-b border-gray-200 pb-3 text-base font-bold text-gray-900">
              <MapPin className="h-5 w-5 text-emerald-700" />
              ที่ทำการศูนย์สอบฯ
            </h2>
            <address className="mt-4 not-italic">
              <p className="text-sm leading-7 text-gray-700">
                {siteInfo.address}
              </p>
              <div className="mt-3 grid gap-2 text-sm text-gray-700">
                <p className="flex items-start gap-2">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                  <span>
                    โทรศัพท์:{" "}
                    <a
                      href={`tel:${siteInfo.phoneHref}`}
                      className="font-semibold text-emerald-800 hover:underline"
                    >
                      {siteInfo.phone}
                    </a>
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <Printer className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                  <span>โทรสาร: {siteInfo.fax}</span>
                </p>
                <p className="flex items-start gap-2">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                  <span>
                    อีเมล:{" "}
                    <a
                      href={`mailto:${siteInfo.email}`}
                      className="break-all font-semibold text-emerald-800 hover:underline"
                    >
                      {siteInfo.email}
                    </a>
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                  <span>{siteInfo.hours}</span>
                </p>
              </div>
            </address>
            <a
              href={siteInfo.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-800 hover:underline"
            >
              เปิดตำแหน่งสำนักงานใน Google Maps
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </section>

          <div className="grid gap-3 sm:grid-cols-3">
            {channels.map((channel) => {
              const Icon = channel.icon;
              return (
                <div key={channel.title} className="card p-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-emerald-50 text-emerald-700">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="mt-2.5 text-sm font-bold text-gray-900">
                    {channel.title}
                  </h3>
                  {channel.href ? (
                    <a
                      href={channel.href}
                      className="mt-0.5 block break-all text-sm font-medium text-emerald-800 hover:underline"
                    >
                      {channel.value}
                    </a>
                  ) : (
                    <p className="mt-0.5 text-sm font-medium text-gray-800">
                      {channel.value}
                    </p>
                  )}
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    {channel.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold text-emerald-950">
              <MessageSquare className="h-4 w-4" />
              ก่อนติดต่อเจ้าหน้าที่
            </h2>
            <p className="mt-2 text-sm leading-6 text-emerald-900">
              ท่านอาจพบคำตอบที่ต้องการแล้วในหน้าคำถามที่พบบ่อย
              ซึ่งรวบรวมข้อมูลเกี่ยวกับการสมัครสอบ การชำระเงิน ที่นั่งสอบ
              และผลการสอบไว้อย่างครบถ้วน
            </p>
            <Link
              href="/faq"
              className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-emerald-900 hover:underline"
            >
              ดูคำถามที่พบบ่อย
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <section className="card p-5 sm:p-6">
          <h2 className="flex items-center gap-2 border-b border-gray-200 pb-3 text-base font-bold text-gray-900">
            <Mail className="h-5 w-5 text-emerald-700" />
            ส่งข้อความสอบถาม
          </h2>

          {sent ? (
            <div className="py-6 text-center" role="status">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                <CheckCircle2 className="h-7 w-7" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-gray-900">
                ส่งข้อความเรียบร้อยแล้ว
              </h3>
              <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-gray-600">
                เจ้าหน้าที่จะตรวจสอบและติดต่อกลับตามข้อมูลที่ท่านระบุไว้
                กรุณาเก็บหมายเลขอ้างอิงสำหรับการติดตาม
              </p>
              <div className="mx-auto mt-4 max-w-xs rounded-md border border-gray-200 bg-gray-50 p-4">
                <div className="text-xs text-gray-500">หมายเลขอ้างอิง</div>
                <div className="mt-1 font-mono text-xl font-bold text-emerald-900">
                  {reference}
                </div>
              </div>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setReference("");
                    setForm({
                      name: "",
                      email: "",
                      phone: "",
                      topic: contactTopics[0],
                      subject: "",
                      message: "",
                    });
                  }}
                  className="btn-secondary"
                >
                  ส่งข้อความฉบับอื่น
                </button>
                <Link href="/" className="btn-neutral">
                  กลับสู่หน้าแรก
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="notice-warning mt-4">
                <Info className="mt-0.5 h-4 w-4 shrink-0" />
                <p className="text-sm leading-6">
                  แบบฟอร์มนี้เป็นการสาธิตการทำงานของระบบ
                  ยังไม่มีการส่งข้อมูลจริง กรุณาติดต่อผ่านโทรศัพท์หรืออีเมล
                  หากต้องการความช่วยเหลือเร่งด่วน
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="field-label">
                      ชื่อ-นามสกุล <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={form.name}
                      onChange={(event) =>
                        updateField("name", event.target.value)
                      }
                      placeholder="เช่น นายตัวอย่าง ใจดี"
                      aria-invalid={Boolean(errors.name)}
                      className={`input ${errors.name ? "border-red-400" : ""}`}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-sm font-medium text-red-700">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="field-label">
                      อีเมลติดต่อกลับ <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="contact-email"
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

                  <div>
                    <label htmlFor="contact-phone" className="field-label">
                      เบอร์โทรศัพท์
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(event) =>
                        updateField("phone", event.target.value)
                      }
                      placeholder="08X-XXX-XXXX"
                      className="input"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-topic" className="field-label">
                      หมวดหมู่เรื่องที่ติดต่อ
                    </label>
                    <select
                      id="contact-topic"
                      value={form.topic}
                      onChange={(event) =>
                        updateField("topic", event.target.value)
                      }
                      className="select"
                    >
                      {contactTopics.map((topic) => (
                        <option key={topic} value={topic}>
                          {topic}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="contact-subject" className="field-label">
                      หัวข้อ <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={form.subject}
                      onChange={(event) =>
                        updateField("subject", event.target.value)
                      }
                      placeholder="สรุปเรื่องที่ต้องการสอบถามโดยย่อ"
                      aria-invalid={Boolean(errors.subject)}
                      className={`input ${errors.subject ? "border-red-400" : ""}`}
                    />
                    {errors.subject && (
                      <p className="mt-1.5 text-sm font-medium text-red-700">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="contact-message" className="field-label">
                      รายละเอียด <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      value={form.message}
                      onChange={(event) =>
                        updateField("message", event.target.value)
                      }
                      placeholder="อธิบายรายละเอียดของเรื่องที่ต้องการสอบถาม เพื่อให้เจ้าหน้าที่ตรวจสอบและตอบกลับได้อย่างถูกต้อง"
                      aria-invalid={Boolean(errors.message)}
                      className={`textarea ${errors.message ? "border-red-400" : ""}`}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-sm font-medium text-red-700">
                        {errors.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-2 text-xs leading-5 text-gray-500">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                  ข้อมูลของท่านจะถูกใช้เพื่อการติดต่อกลับและตรวจสอบเรื่องที่สอบถามเท่านั้น
                  ตามนโยบายความเป็นส่วนตัวของศูนย์สอบฯ
                </div>

                <button type="submit" className="btn-primary">
                  <Send className="h-4 w-4" />
                  ส่งข้อความสอบถาม
                </button>
              </form>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
