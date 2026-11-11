"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Info, UserPlus } from "lucide-react";

const faculties = [
  "จุฬาลงกรณ์มหาวิทยาลัย",
  "มหาวิทยาลัยมหิดล",
  "มหาวิทยาลัยเชียงใหม่",
  "มหาวิทยาลัยขอนแก่น",
  "มหาวิทยาลัยสงขลานครินทร์",
  "มหาวิทยาลัยศิลปากร",
  "มหาวิทยาลัยธรรมศาสตร์",
  "สถาบันการศึกษาอื่น ๆ ทั้งในและต่างประเทศ",
];

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
    <div className="card p-6 sm:p-8">
      <div className="text-center">
        <h1 className="text-xl font-bold text-gray-900">
          ลงทะเบียนผู้สมัครสอบใหม่
        </h1>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          สร้างบัญชีผู้ใช้งานสำหรับการสอบความรู้ทางวิชาชีพเภสัชกรรม
        </p>
      </div>

      <form onSubmit={handleRegister} className="mt-6 space-y-4">
        <div>
          <label htmlFor="register-national-id" className="field-label">
            เลขประจำตัวประชาชน (13 หลัก){" "}
            <span className="text-red-600">*</span>
          </label>
          <input
            id="register-national-id"
            type="text"
            required
            inputMode="numeric"
            maxLength={13}
            autoComplete="off"
            placeholder="เช่น 1103701234567"
            className="input font-mono"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="register-first-name" className="field-label">
              ชื่อ (ภาษาไทย) <span className="text-red-600">*</span>
            </label>
            <input
              id="register-first-name"
              type="text"
              required
              autoComplete="given-name"
              placeholder="สมชาย"
              className="input"
            />
          </div>
          <div>
            <label htmlFor="register-last-name" className="field-label">
              นามสกุล (ภาษาไทย) <span className="text-red-600">*</span>
            </label>
            <input
              id="register-last-name"
              type="text"
              required
              autoComplete="family-name"
              placeholder="ใจดีบริสุทธิ์"
              className="input"
            />
          </div>
        </div>

        <div>
          <label htmlFor="register-email" className="field-label">
            อีเมลติดต่อทางการ <span className="text-red-600">*</span>
          </label>
          <input
            id="register-email"
            type="email"
            required
            autoComplete="email"
            placeholder="name@example.com"
            className="input"
          />
        </div>

        <div>
          <label htmlFor="register-faculty" className="field-label">
            คณะเภสัชศาสตร์ สถาบันที่สำเร็จการศึกษา{" "}
            <span className="text-red-600">*</span>
          </label>
          <select id="register-faculty" className="select" defaultValue={faculties[0]}>
            {faculties.map((faculty) => (
              <option key={faculty} value={faculty}>
                {faculty}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="register-password" className="field-label">
            กำหนดรหัสผ่าน (อย่างน้อย 8 ตัวอักษร){" "}
            <span className="text-red-600">*</span>
          </label>
          <input
            id="register-password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            placeholder="กรอกรหัสผ่าน"
            className="input"
          />
        </div>

        <label className="flex items-start gap-2.5 rounded-md border border-gray-200 bg-gray-50 p-3.5 text-sm leading-6 text-gray-700">
          <input
            type="checkbox"
            required
            className="mt-1 h-4 w-4 shrink-0 accent-emerald-700"
          />
          <span>
            ข้าพเจ้ายินยอมให้สภาเภสัชกรรมเก็บและประมวลผลข้อมูลส่วนบุคคล
            ตามนโยบายคุ้มครองข้อมูลส่วนบุคคล (PDPA)
          </span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
        >
          <UserPlus className="h-4 w-4" />
          {loading ? "กำลังบันทึกข้อมูล..." : "ลงทะเบียนผู้สมัครสอบ"}
        </button>
      </form>

      <div className="notice mt-5 text-sm">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        <p className="leading-6">
          แบบฟอร์มนี้เป็นการสาธิต ยังไม่มีการบันทึกข้อมูลจริง
          กรุณาอย่าใช้ข้อมูลส่วนบุคคลจริงในการทดลอง
        </p>
      </div>

      <div className="mt-5 border-t border-gray-200 pt-4 text-center text-sm text-gray-600">
        มีบัญชีผู้ใช้งานอยู่แล้ว?{" "}
        <Link
          href="/login"
          className="font-semibold text-emerald-800 hover:underline"
        >
          เข้าสู่ระบบ
        </Link>
      </div>
    </div>
  );
}
