import Link from "next/link";
import { Building2, ExternalLink, GraduationCap, ShieldCheck } from "lucide-react";

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <nav className="text-xs text-gray-500 mb-2 flex items-center gap-1.5">
          <Link href="/" className="hover:text-emerald-800">หน้าแรก</Link>
          <span>/</span>
          <span className="text-emerald-800 font-medium">เว็บไซต์ที่เกี่ยวข้อง</span>
        </nav>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          เว็บไซต์และหน่วยงานเครือข่ายสภาเภสัชกรรม
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 font-light">
          เชื่อมโยงสู่องค์กรวิชาชีพ หน่วยงานภาครัฐด้านสาธารณสุข และสถาบันการศึกษาผลิตเภสัชกร
        </p>
      </div>

      {/* Main Organizations */}
      <div className="space-y-4">
        <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2 border-l-2 border-emerald-600 pl-2">
          องค์กรวิชาชีพและหน่วยงานหลัก
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mainOrganizations.map((org, idx) => (
            <a
              key={idx}
              href={org.url}
              target="_blank"
              rel="noreferrer"
              className="p-5 rounded-xl bg-white border border-gray-200 hover:border-emerald-300 shadow-xs transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 rounded bg-gray-100 group-hover:bg-emerald-50 text-emerald-800 flex items-center justify-center mb-3 transition-colors border border-gray-200">
                  <Building2 className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-gray-900 group-hover:text-emerald-800 transition-colors">
                  {org.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed font-light">
                  {org.desc}
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-gray-100 text-xs font-semibold text-emerald-800 flex items-center gap-1">
                ไปยังเว็บไซต์ทางการ
                <ExternalLink className="w-3 h-3" />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Pharmacy Faculties */}
      <div className="space-y-4 pt-4 border-t border-gray-200">
        <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2 border-l-2 border-emerald-600 pl-2">
          คณะเภสัชศาสตร์ สถาบันการศึกษาเครือข่ายสภาเภสัชกรรม
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 text-xs">
          {pharmacyFaculties.map((fac, idx) => (
            <a
              key={idx}
              href={fac.url}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-lg bg-white border border-gray-200 hover:bg-emerald-50/50 hover:border-emerald-300 transition-colors text-gray-800 font-medium flex items-center justify-between"
            >
              <span className="truncate">{fac.name}</span>
              <ExternalLink className="w-3 h-3 text-gray-400 shrink-0 ml-1.5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
