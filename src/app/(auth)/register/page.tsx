"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserPlus } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/apply");
    }, 500);
  };

  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-xs space-y-6">
      <div className="text-center space-y-1">
        <h1 className="text-lg font-bold text-gray-900">ลงทะเบียนผู้สมัครสอบใหม่</h1>
        <p className="text-xs text-gray-500 font-light">
          สร้างบัญชีผู้ใช้งานสำหรับการสอบความรู้ทางวิชาชีพเภสัชกรรม
        </p>
      </div>

      <form onSubmit={handleRegister} className="space-y-3.5 text-xs">
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            เลขประจำตัวประชาชน (13 หลัก) *
          </label>
          <input
            type="text"
            required
            placeholder="เช่น 1103701234567"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600 font-mono text-xs"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">ชื่อ (ภาษาไทย) *</label>
            <input
              type="text"
              required
              placeholder="สมชาย"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-1">นามสกุล (ภาษาไทย) *</label>
            <input
              type="text"
              required
              placeholder="ใจดีบริสุทธิ์"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">อีเมลติดต่อทางการ *</label>
          <input
            type="email"
            required
            placeholder="somchai.j@example.com"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">คณะเภสัชศาสตร์ สถาบันที่สำเร็จการศึกษา *</label>
          <select className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600">
            <option>จุฬาลงกรณ์มหาวิทยาลัย</option>
            <option>มหาวิทยาลัยมหิดล</option>
            <option>มหาวิทยาลัยเชียงใหม่</option>
            <option>มหาวิทยาลัยขอนแก่น</option>
            <option>มหาวิทยาลัยสงขลานครินทร์</option>
            <option>มหาวิทยาลัยศิลปากร</option>
            <option>มหาวิทยาลัยธรรมศาสตร์</option>
            <option>สถาบันการศึกษาอื่นๆ ทั้งในและต่างประเทศ</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">กำหนดรหัสผ่าน (อย่างน้อย 8 ตัวอักษร) *</label>
          <input
            type="password"
            required
            placeholder="••••••••"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600"
          />
        </div>

        <div className="flex items-start gap-2 pt-1 text-[11px] text-gray-600">
          <input type="checkbox" required className="mt-0.5 rounded text-emerald-700" />
          <span>
            ข้าพเจ้ายินยอมให้สภาเภสัชกรรมเก็บและประมวลผลข้อมูลส่วนบุคคลตามนโยบายคุ้มครองข้อมูลส่วนบุคคล (PDPA)
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors flex items-center justify-center gap-1.5"
        >
          <UserPlus className="w-3.5 h-3.5" />
          {loading ? "กำลังบันทึกข้อมูล..." : "ลงทะเบียนผู้สมัครสอบ"}
        </button>
      </form>

      <div className="pt-4 border-t border-gray-100 text-center text-xs text-gray-500">
        มีบัญชีผู้ใช้งานอยู่แล้ว?{" "}
        <Link href="/auth/login" className="font-semibold text-emerald-800 hover:underline">
          เข้าสู่ระบบ
        </Link>
      </div>
    </div>
  );
}
