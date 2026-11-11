import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  FileText,
  Scale,
  ShieldCheck,
} from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import { siteInfo } from "@/data/site";

export const metadata: Metadata = {
  title: "ข้อกำหนดการใช้งาน",
  description:
    "ข้อกำหนดและเงื่อนไขการใช้งานเว็บไซต์และบริการออนไลน์ของศูนย์สอบความรู้และทักษะทางวิชาชีพเภสัชกรรม สภาเภสัชกรรม",
};

const sections = [
  {
    title: "1. การยอมรับข้อกำหนด",
    body: [
      "การเข้าใช้งานเว็บไซต์และการใช้บริการออนไลน์ของศูนย์สอบความรู้และทักษะทางวิชาชีพเภสัชกรรม สภาเภสัชกรรม ถือว่าท่านได้อ่าน เข้าใจ และยอมรับข้อกำหนดการใช้งานฉบับนี้แล้ว หากท่านไม่ยอมรับข้อกำหนดดังกล่าว กรุณาหยุดใช้งานเว็บไซต์",
    ],
  },
  {
    title: "2. ขอบเขตการใช้งาน",
    body: [
      "เว็บไซต์นี้จัดทำขึ้นเพื่อเผยแพร่ข้อมูลข่าวสารและให้บริการออนไลน์ที่เกี่ยวข้องกับการสอบความรู้และทักษะทางวิชาชีพเภสัชกรรม ท่านตกลงที่จะใช้งานเว็บไซต์เพื่อวัตถุประสงค์ที่ชอบด้วยกฎหมายเท่านั้น และจะไม่ดำเนินการใด ๆ ที่อาจก่อให้เกิดความเสียหายต่อระบบหรือผู้ใช้งานรายอื่น",
    ],
    list: [
      "ห้ามใช้เว็บไซต์ในลักษณะที่เป็นการรบกวน ทำให้ระบบหยุดชะงัก หรือเข้าถึงข้อมูลโดยไม่ได้รับอนุญาต",
      "ห้ามปลอมแปลงข้อมูลส่วนบุคคลหรือเอกสารประกอบการสมัครสอบ",
      "ห้ามคัดลอก ดัดแปลง หรือเผยแพร่เนื้อหาของเว็บไซต์เพื่อประโยชน์ทางการค้าโดยไม่ได้รับอนุญาต",
      "ห้ามใช้เครื่องมืออัตโนมัติเพื่อรวบรวมข้อมูลจากเว็บไซต์ในลักษณะที่เกินความจำเป็น",
    ],
  },
  {
    title: "3. บัญชีผู้ใช้งานและความรับผิดชอบ",
    body: [
      "ผู้ใช้งานมีหน้าที่รักษาความลับของข้อมูลการเข้าใช้งาน และต้องรับผิดชอบต่อการกระทำทั้งหมดที่เกิดขึ้นภายใต้บัญชีของตน หากพบการใช้งานโดยไม่ได้รับอนุญาต ต้องแจ้งเจ้าหน้าที่ศูนย์สอบฯ ทันที",
      "ข้อมูลที่ผู้ใช้งานกรอกในระบบต้องเป็นข้อมูลที่ถูกต้อง ครบถ้วน และเป็นปัจจุบัน การให้ข้อมูลอันเป็นเท็จอาจส่งผลให้การสมัครสอบเป็นโมฆะ หรืออาจถูกดำเนินการตามระเบียบที่เกี่ยวข้อง",
    ],
  },
  {
    title: "4. ทรัพย์สินทางปัญญา",
    body: [
      "ข้อความ ภาพ กราฟิก โลโก้ แบบฟอร์ม และเนื้อหาอื่น ๆ บนเว็บไซต์นี้ เป็นทรัพย์สินของสภาเภสัชกรรมหรือได้รับอนุญาตให้เผยแพร่ การอ้างอิงเนื้อหาต้องระบุแหล่งที่มาอย่างชัดเจน และต้องไม่ทำให้เข้าใจผิดว่าเป็นเอกสารฉบับทางการที่ออกโดยศูนย์สอบฯ",
    ],
  },
  {
    title: "5. ข้อจำกัดความรับผิด",
    body: [
      "ศูนย์สอบฯ พยายามรักษาความถูกต้องและเป็นปัจจุบันของข้อมูลบนเว็บไซต์ อย่างไรก็ตาม ข้อมูลบางส่วนอาจมีการเปลี่ยนแปลงตามประกาศหรือระเบียบที่เกี่ยวข้อง ผู้ใช้งานควรตรวจสอบประกาศฉบับทางการก่อนดำเนินการใด ๆ ที่มีผลทางกฎหมาย",
      "ศูนย์สอบฯ ไม่รับผิดชอบต่อความเสียหายที่เกิดจากการใช้งานเว็บไซต์ การขัดข้องของระบบ หรือการเข้าถึงข้อมูลโดยบุคคลภายนอก ซึ่งอยู่นอกเหนือการควบคุมโดยสมเหตุสมผล",
    ],
  },
  {
    title: "6. การเชื่อมโยงไปยังเว็บไซต์ภายนอก",
    body: [
      "เว็บไซต์อาจมีลิงก์เชื่อมโยงไปยังเว็บไซต์ของหน่วยงานภายนอก ศูนย์สอบฯ ไม่ได้ควบคุมหรือรับรองเนื้อหาของเว็บไซต์เหล่านั้น และไม่รับผิดชอบต่อข้อมูลหรือบริการที่ปรากฏบนเว็บไซต์ภายนอก",
    ],
  },
  {
    title: "7. การคุ้มครองข้อมูลส่วนบุคคล",
    body: [
      "การเก็บรวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคลของผู้ใช้งาน เป็นไปตามนโยบายความเป็นส่วนตัวของศูนย์สอบฯ ซึ่งเผยแพร่แยกต่างหากบนเว็บไซต์",
    ],
  },
  {
    title: "8. การเปลี่ยนแปลงข้อกำหนด",
    body: [
      "ศูนย์สอบฯ อาจปรับปรุงข้อกำหนดการใช้งานฉบับนี้เป็นครั้งคราว โดยจะเผยแพร่ฉบับปรับปรุงบนเว็บไซต์พร้อมระบุวันที่ปรับปรุงล่าสุด การใช้งานเว็บไซต์ต่อหลังจากการเปลี่ยนแปลงถือว่าท่านยอมรับข้อกำหนดฉบับปรับปรุง",
    ],
  },
  {
    title: "9. กฎหมายที่ใช้บังคับ",
    body: [
      "ข้อกำหนดการใช้งานฉบับนี้อยู่ภายใต้บังคับของกฎหมายไทย ในกรณีเกิดข้อพิพาท ให้อยู่ในเขตอำนาจของศาลไทยที่มีเขตอำนาจตามกฎหมาย",
    ],
  },
];

export default function TermsPage() {
  return (
    <div>
      <PageHeader
        title="ข้อกำหนดการใช้งาน"
        description="ข้อกำหนดและเงื่อนไขการใช้งานเว็บไซต์และบริการออนไลน์ของศูนย์สอบความรู้ฯ สภาเภสัชกรรม"
        breadcrumbs={[{ label: "ข้อกำหนดการใช้งาน" }]}
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
            <Scale className="mt-0.5 h-5 w-5 shrink-0" />
            <p className="leading-7">
              กรุณาอ่านข้อกำหนดการใช้งานก่อนใช้บริการ
              การเข้าใช้งานเว็บไซต์และระบบบริการออนไลน์ถือว่าท่านยอมรับข้อกำหนดทั้งหมด
              รวมถึงนโยบายความเป็นส่วนตัวที่เกี่ยวข้อง
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
              </section>
            ))}
          </div>

          <div className="mt-8 rounded-md border border-amber-200 bg-amber-50 p-5">
            <h2 className="flex items-center gap-2 text-base font-bold text-amber-950">
              <AlertTriangle className="h-5 w-5" />
              ข้อควรระวัง
            </h2>
            <p className="mt-2 text-sm leading-7 text-amber-900">
              ข้อมูลการสมัครสอบและผลการสอบที่มีผลผูกพันทางกฎหมาย
              ให้ยึดถือตามประกาศหรือเอกสารฉบับทางการที่ศูนย์สอบฯ เผยแพร่
              หากพบความคลาดเคลื่อนของข้อมูลบนเว็บไซต์ กรุณาแจ้งเจ้าหน้าที่เพื่อตรวจสอบและแก้ไขโดยเร็ว
            </p>
          </div>
        </article>

        <aside className="space-y-4 lg:sticky lg:top-32 lg:self-start">
          <div className="card p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold text-gray-900">
              <CheckCircle2 className="h-4 w-4 text-emerald-700" />
              หลักการใช้งาน
            </h2>
            <ul className="mt-3 space-y-2.5 text-sm text-gray-700">
              {[
                "ใช้ข้อมูลที่ถูกต้องและเป็นปัจจุบัน",
                "รักษาความลับของข้อมูลเข้าใช้งาน",
                "ไม่กระทำการที่กระทบต่อระบบ",
                "อ้างอิงแหล่งที่มาเมื่อเผยแพร่เนื้อหา",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold text-emerald-950">
              <ShieldCheck className="h-4 w-4" />
              เอกสารที่เกี่ยวข้อง
            </h2>
            <div className="mt-3 space-y-2 text-sm">
              <Link
                href="/privacy"
                className="flex items-center justify-between gap-2 font-semibold text-emerald-900 hover:underline"
              >
                นโยบายความเป็นส่วนตัว
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/regulations"
                className="flex items-center justify-between gap-2 font-semibold text-emerald-900 hover:underline"
              >
                ระเบียบและเกณฑ์การสอบ
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/documents"
                className="flex items-center justify-between gap-2 font-semibold text-emerald-900 hover:underline"
              >
                เอกสารและแบบฟอร์ม
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="card p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold text-gray-900">
              <FileText className="h-4 w-4 text-emerald-700" />
              สอบถามเพิ่มเติม
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              ติดต่อเจ้าหน้าที่ศูนย์สอบฯ ในวันและเวลาราชการ
            </p>
            <a
              href={`mailto:${siteInfo.email}`}
              className="mt-2 block break-all text-sm font-semibold text-emerald-800 hover:underline"
            >
              {siteInfo.email}
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
