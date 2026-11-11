import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  ExternalLink,
  GraduationCap,
  Info,
  Link2,
  ShieldCheck,
} from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "เว็บไซต์ที่เกี่ยวข้อง",
  description:
    "แหล่งข้อมูลและเว็บไซต์ทางการของหน่วยงานเครือข่ายด้านเภสัชกรรม สาธารณสุข และสถาบันการศึกษาที่เกี่ยวข้องกับศูนย์สอบความรู้ฯ",
};

const mainOrganizations = [
  {
    title: "สภาเภสัชกรรม (The Pharmacy Council of Thailand)",
    desc: "องค์กรวิชาชีพควบคุมและส่งเสริมมาตรฐานวิชาชีพเภสัชกรรมแห่งประเทศไทย",
    url: "https://www.pharmacycouncil.org",
  },
  {
    title: "ศูนย์เภสัชสนเทศ (Drug Information Center - DIC)",
    desc: "แหล่งข้อมูลสารสนเทศด้านยาและพิษวิทยาแห่งชาติสำหรับบุคลากรทางการแพทย์",
    url: "https://www.pharmacycouncil.org/dic",
  },
  {
    title: "สำนักงานคณะกรรมการอาหารและยา (อย.)",
    desc: "กำกับดูแลคุณภาพและความปลอดภัยของผลิตภัณฑ์ยาและสุขภาพ",
    url: "https://www.fda.moph.go.th",
  },
  {
    title: "องค์การเภสัชกรรม (GPO)",
    desc: "ผลิต วิจัย และจัดหายาจำเป็นเพื่อความมั่นคงทางยาของประเทศ",
    url: "https://www.gpo.or.th",
  },
  {
    title: "สมาคมเภสัชกรรมโรงพยาบาล (ประเทศไทย)",
    desc: "พัฒนาวิชาชีพและการบริบาลทางเภสัชกรรมในโรงพยาบาล",
    url: "https://thaihp.org",
  },
  {
    title: "สมาคมเภสัชกรรมชุมชน (ประเทศไทย)",
    desc: "ส่งเสริมมาตรฐานร้านยาคุณภาพและการบริบาลทางเภสัชกรรมในชุมชน",
    url: "https://www.pharmycommunity.com",
  },
];

const pharmacyFaculties = [
  { name: "คณะเภสัชศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย", url: "https://www.pharm.chula.ac.th" },
  { name: "คณะเภสัชศาสตร์ มหาวิทยาลัยมหิดล", url: "https://pharmacy.mahidol.ac.th" },
  { name: "คณะเภสัชศาสตร์ มหาวิทยาลัยเชียงใหม่", url: "https://www.pharmacy.cmu.ac.th" },
  { name: "คณะเภสัชศาสตร์ มหาวิทยาลัยขอนแก่น", url: "https://pharm.kku.ac.th" },
  { name: "คณะเภสัชศาสตร์ มหาวิทยาลัยสงขลานครินทร์", url: "https://pharmacy.psu.ac.th" },
  { name: "คณะเภสัชศาสตร์ มหาวิทยาลัยศิลปากร", url: "https://pharmacy.su.ac.th" },
  { name: "คณะเภสัชศาสตร์ มหาวิทยาลัยศรีนครินทรวิโรฒ", url: "https://pharm.swu.ac.th" },
  { name: "คณะเภสัชศาสตร์ มหาวิทยาลัยธรรมศาสตร์", url: "https://pharm.tu.ac.th" },
  { name: "คณะเภสัชศาสตร์ มหาวิทยาลัยนเรศวร", url: "https://pha.nu.ac.th" },
  { name: "คณะเภสัชศาสตร์ มหาวิทยาลัยอุบลราชธานี", url: "https://phar.ubu.ac.th" },
  { name: "คณะเภสัชศาสตร์ มหาวิทยาลัยพะเยา", url: "https://pharmacy.up.ac.th" },
  { name: "คณะเภสัชศาสตร์ มหาวิทยาลัยรังสิต", url: "https://pharmacy.rsu.ac.th" },
  { name: "คณะเภสัชศาสตร์ มหาวิทยาลัยหัวเฉียวเฉลิมพระเกียรติ", url: "https://pharm.hcu.ac.th" },
  { name: "คณะเภสัชศาสตร์ มหาวิทยาลัยสยาม", url: "https://pharmacy.siam.edu" },
];

export default function LinksPage() {
  return (
    <div>
      <PageHeader
        title="เว็บไซต์และหน่วยงานเครือข่าย"
        description="เชื่อมโยงสู่องค์กรวิชาชีพ หน่วยงานภาครัฐด้านสาธารณสุข และสถาบันการศึกษาที่ผลิตเภสัชกร ซึ่งเกี่ยวข้องกับการสอบและการขึ้นทะเบียนวิชาชีพ"
        breadcrumbs={[{ label: "เว็บไซต์ที่เกี่ยวข้อง" }]}
        eyebrow="เครือข่าย"
        meta={
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <span className="badge-green">
              หน่วยงาน {mainOrganizations.length + pharmacyFaculties.length} แห่ง
            </span>
            <span>ปรับปรุงล่าสุด 1 พฤศจิกายน 2569</span>
          </div>
        }
        actions={
          <Link href="/contact" className="btn-secondary">
            <Link2 className="h-4 w-4" />
            แจ้งลิงก์ที่ใช้งานไม่ได้
          </Link>
        }
      />

      <div className="container-page py-8 lg:py-10">
        <section>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                องค์กรวิชาชีพและหน่วยงานหลัก
              </h2>
              <p className="mt-0.5 text-sm text-gray-600">
                หน่วยงานที่กำกับดูแลและสนับสนุนการประกอบวิชาชีพเภสัชกรรม
              </p>
            </div>
            <span className="badge-gray">
              {mainOrganizations.length} หน่วยงาน
            </span>
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {mainOrganizations.map((org) => (
              <a
                key={org.url}
                href={org.url}
                target="_blank"
                rel="noreferrer"
                className="card group flex flex-col p-5 transition-colors hover:border-emerald-400"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-emerald-700 transition-colors group-hover:border-emerald-200 group-hover:bg-emerald-50">
                  <Building2 className="h-5 w-5" />
                </span>
                <h3 className="mt-3 text-sm font-bold leading-snug text-gray-900 group-hover:text-emerald-900">
                  {org.title}
                </h3>
                <p className="mt-1 flex-1 text-sm leading-6 text-gray-600">
                  {org.desc}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 border-t border-gray-100 pt-2.5 text-sm font-semibold text-emerald-800">
                  ไปยังเว็บไซต์ทางการ
                  <ExternalLink className="h-3.5 w-3.5" />
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-8 border-t border-gray-200 pt-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-start gap-2.5">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-700">
                <GraduationCap className="h-4 w-4" />
              </span>
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  คณะเภสัชศาสตร์ สถาบันการศึกษาเครือข่าย
                </h2>
                <p className="mt-0.5 text-sm text-gray-600">
                  สถาบันที่จัดการเรียนการสอนหลักสูตรเภสัชศาสตรบัณฑิต
                </p>
              </div>
            </div>
            <span className="badge-gray">
              {pharmacyFaculties.length} สถาบัน
            </span>
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {pharmacyFaculties.map((faculty) => (
              <a
                key={faculty.url}
                href={faculty.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-2 rounded-md border border-gray-200 bg-white px-3.5 py-2.5 text-sm font-medium text-gray-800 transition-colors hover:border-emerald-400 hover:bg-emerald-50/50 hover:text-emerald-900"
              >
                <span className="min-w-0 truncate">{faculty.name}</span>
                <ExternalLink className="h-3.5 w-3.5 shrink-0 text-gray-400" />
              </a>
            ))}
          </div>
        </section>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <div className="notice">
            <Info className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <h2 className="text-sm font-bold">การเชื่อมโยงไปยังเว็บไซต์ภายนอก</h2>
              <p className="mt-1 text-sm leading-6">
                ลิงก์เหล่านี้เป็นแหล่งข้อมูลของหน่วยงานภายนอก
                ศูนย์สอบฯ ไม่ได้ควบคุมหรือรับรองเนื้อหาบนเว็บไซต์เหล่านั้น
                และไม่รับผิดชอบต่อข้อมูลหรือบริการที่ปรากฏ
              </p>
            </div>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold text-emerald-950">
              <ShieldCheck className="h-4 w-4" />
              ต้องการข้อมูลจากศูนย์สอบฯ
            </h2>
            <p className="mt-2 text-sm leading-6 text-emerald-900">
              ข้อมูลการสมัครสอบ ระเบียบ และเอกสารทั้งหมด
              เผยแพร่บนเว็บไซต์นี้โดยตรง
            </p>
            <div className="mt-3 flex flex-wrap gap-3 text-sm font-semibold text-emerald-900">
              <Link
                href="/documents"
                className="inline-flex items-center gap-1 hover:underline"
              >
                เอกสารและแบบฟอร์ม
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 hover:underline"
              >
                ติดต่อศูนย์สอบฯ
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
