import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between py-10 px-4 sm:px-6 lg:px-8">
      {/* Top Branding */}
      <div className="text-center">
        <Link href="/" className="inline-flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-700 text-white shadow-xs">
            <ShieldCheck className="h-5 w-5 text-emerald-100" />
          </div>
          <div className="text-left leading-tight">
            <div className="text-lg font-bold text-gray-900">ศูนย์สอบความรู้ฯ สภาเภสัชกรรม</div>
            <div className="mt-0.5 text-xs text-gray-500">Pharmacy Licensure Examination Center (PLE)</div>
          </div>
        </Link>
      </div>

      {/* Main card */}
      <main id="main-content" className="w-full max-w-md mx-auto my-6">
        {children}
      </main>

      {/* Footer */}
      <div className="text-center text-xs text-gray-600 space-y-1">
        <div>© พ.ศ. 2569 ศูนย์สอบความรู้และทักษะทางวิชาชีพเภสัชกรรม สภาเภสัชกรรม</div>
        <div>
          <Link href="/" className="text-emerald-800 hover:underline">
            กลับสู่หน้าหลัก
          </Link>
          <span className="mx-2">|</span>
          <Link href="/faq" className="text-emerald-800 hover:underline">
            ช่วยเหลือและคำถามที่พบบ่อย
          </Link>
        </div>
      </div>
    </div>
  );
}
