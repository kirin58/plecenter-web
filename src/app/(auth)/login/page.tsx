"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";

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
    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-xs space-y-6">
      <div className="text-center space-y-1">
        <h1 className="text-lg font-bold text-gray-900">เข้าสู่ระบบผู้สมัครสอบ</h1>
        <p className="text-xs text-gray-500 font-light">
          ระบบสารสนเทศศูนย์สอบความรู้ฯ สภาเภสัชกรรม
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4 text-xs">
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            เลขประจำตัวประชาชน (13 หลัก) หรือ อีเมล *
          </label>
          <input
            type="text"
            required
            placeholder="เช่น 1103701234567"
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600 font-mono text-xs"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="font-semibold text-gray-700">รหัสผ่าน *</label>
            <a href="#" className="text-emerald-800 hover:underline text-[11px]">
              ลืมรหัสผ่าน?
            </a>
          </div>
          <input
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600 text-xs"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors flex items-center justify-center gap-1.5"
        >
          <LogIn className="w-3.5 h-3.5" />
          {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
        </button>
      </form>

      <div className="pt-4 border-t border-gray-100 text-center text-xs text-gray-500">
        ยังไม่มีบัญชีผู้ใช้งานในระบบ?{" "}
        <Link href="/auth/register" className="font-semibold text-emerald-800 hover:underline">
          ลงทะเบียนผู้สมัครสอบใหม่
        </Link>
      </div>
    </div>
  );
}
