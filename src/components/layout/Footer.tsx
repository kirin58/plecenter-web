import Link from "next/link";
import { Building2, Phone, Mail, MapPin, ExternalLink, ShieldCheck } from "lucide-react";

const quickLinks = [
  { href: "/", label: "หน้าแรก" },
  { href: "/news", label: "ข่าวสารและประกาศ" },
  { href: "/calendar", label: "ปฏิทินสอบ" },
  { href: "/regulations", label: "ระเบียบและเกณฑ์การสอบ" },
  { href: "/faq", label: "คำถามที่พบบ่อย (FAQ)" },
  { href: "/contact", label: "ติดต่อศูนย์สอบฯ" },
];

const documentLinks = [
  { href: "/guides", label: "คู่มือการสอบและ OSPE" },
  { href: "/documents", label: "ศูนย์เอกสารและแบบฟอร์ม" },
  { href: "/e-exam", label: "ระบบสอบคอมพิวเตอร์ E-Exam" },
  { href: "/requests", label: "ระบบยื่นคำร้องออนไลน์" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-100" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">
                ศูนย์สอบความรู้ฯ สภาเภสัชกรรม
              </h3>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed font-light">
              ศูนย์สอบความรู้และทักษะทางวิชาชีพเภสัชกรรม สภาเภสัชกรรม (Pharmacy Licensure Examination Center) 
              ดำเนินการจัดสอบเพื่อขึ้นทะเบียนและรับใบอนุญาตเป็นผู้ประกอบวิชาชีพเภสัชกรรมตามกฎหมาย
            </p>
            <div className="pt-2 text-xs text-gray-600 space-y-1">
              <div>มาตรฐานการสอบระดับสากล</div>
              <div className="text-emerald-800 font-medium">คุ้มครองข้อมูลส่วนบุคคลตาม พ.ร.บ. PDPA</div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4 border-l-2 border-emerald-600 pl-2">
              บริการหลัก
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-gray-600 hover:text-emerald-800 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Documents */}
          <div>
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4 border-l-2 border-emerald-600 pl-2">
              เอกสารและคู่มือ
            </h3>
            <ul className="space-y-2">
              {documentLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-gray-600 hover:text-emerald-800 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4 border-l-2 border-emerald-600 pl-2">
              ข้อมูลติดต่อราชการ
            </h3>
            <ul className="space-y-3 text-xs text-gray-600">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>
                  สภาเภสัชกรรม อาคาร 6 ชั้น 7 ซอยสาธารณสุข 8 กระทรวงสาธารณสุข ถนนติวานนท์ ต.ตลาดขวัญ อ.เมือง จ.นนทบุรี 11000
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <a
                  href="tel:025919992"
                  className="hover:text-emerald-800 font-mono"
                >
                  0-2591-9992 ถึง 5
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <a
                  href="mailto:plecenter@pharmacycouncil.org"
                  className="hover:text-emerald-800 font-mono"
                >
                  plecenter@pharmacycouncil.org
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>
            © พ.ศ. 2569 ศูนย์สอบความรู้และทักษะทางวิชาชีพเภสัชกรรม สภาเภสัชกรรม — สงวนลิขสิทธิ์ตามกฎหมาย
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <Link href="/regulations" className="hover:underline">นโยบายความเป็นส่วนตัว</Link>
            <span>|</span>
            <Link href="/regulations" className="hover:underline">ข้อกำหนดการใช้งานระบบ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
