"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "plecenter.cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) !== "accepted") {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  function accept() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      // Storage may be unavailable; closing the notice is still safe.
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="no-print fixed inset-x-0 bottom-0 z-50 border-t border-emerald-200 bg-white/98 shadow-[0_-4px_16px_rgba(16,24,40,0.08)] backdrop-blur"
      role="region"
      aria-label="การแจ้งเตือนการใช้คุกกี้"
    >
      <div className="container-page flex flex-col gap-3 py-3.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
          <p className="text-sm leading-6 text-gray-700">
            เว็บไซต์นี้ใช้คุกกี้เพื่อเพิ่มประสิทธิภาพในการใช้งาน
            และเพื่อการวิเคราะห์การเข้าชมเว็บไซต์
            การใช้งานเว็บไซต์ต่อไปถือว่าท่านยินยอมตาม{" "}
            <Link
              href="/privacy"
              className="font-semibold text-emerald-800 underline underline-offset-2"
            >
              นโยบายความเป็นส่วนตัว
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2 self-end sm:self-auto">
          <button
            type="button"
            onClick={accept}
            className="btn-primary px-5 py-2 text-sm"
          >
            ยอมรับ
          </button>
          <button
            type="button"
            onClick={() => setVisible(false)}
            className="icon-button h-9 w-9"
            aria-label="ปิดการแจ้งเตือนคุกกี้"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
