"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Info, LogIn, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [nationalId, setNationalId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/scores");
    }, 500);
  };

  return (
    <div className="card p-6 sm:p-8">
      <div className="text-center">
        <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-md bg-emerald-50 text-emerald-700">
          <ShieldCheck className="h-5 w-5" />
        </span>
        <h1 className="mt-3 text-xl font-bold text-gray-900">
          เข้าสู่ระบบผู้สมัครสอบ
        </h1>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          ระบบสารสนเทศศูนย์สอบความรู้และทักษะทางวิชาชีพเภสัชกรรม
          สภาเภสัชกรรม
        </p>
      </div>

      <form onSubmit={handleLogin} className="mt-6 space-y-4">
        <div>
          <label htmlFor="login-national-id" className="field-label">
            เลขประจำตัวประชาชน (13 หลัก) หรืออีเมล{" "}
            <span className="text-red-600">*</span>
          </label>
          <input
            id="login-national-id"
            type="text"
            required
            autoComplete="username"
            placeholder="เช่น 1103701234567"
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
            className="input font-mono"
          />
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between gap-3">
            <label htmlFor="login-password" className="field-label mb-0">
              รหัสผ่าน <span className="text-red-600">*</span>
            </label>
            <Link
              href="/faq?q=รหัสผ่าน"
              className="text-sm font-medium text-emerald-800 hover:underline"
            >
              ลืมรหัสผ่าน?
            </Link>
          </div>
          <input
            id="login-password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="กรอกรหัสผ่าน"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
        >
          <LogIn className="h-4 w-4" />
          {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
        </button>
      </form>

      <div className="notice mt-5 text-sm">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        <p className="leading-6">
          ระบบนี้เป็นการสาธิต การเข้าสู่ระบบจะนำท่านไปยังหน้าตรวจสอบสถานะ
          และไม่มีการบันทึกข้อมูลบัญชีจริง
        </p>
      </div>

      <div className="mt-5 border-t border-gray-200 pt-4 text-center text-sm text-gray-600">
        ยังไม่มีบัญชีผู้ใช้งานในระบบ?{" "}
        <Link
          href="/register"
          className="font-semibold text-emerald-800 hover:underline"
        >
          ลงทะเบียนผู้สมัครสอบใหม่
        </Link>
      </div>
    </div>
  );
}
