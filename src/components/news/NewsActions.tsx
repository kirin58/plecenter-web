"use client";

import { useState } from "react";
import { Check, Link2, Printer } from "lucide-react";

export default function NewsActions() {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="grid gap-2 sm:grid-cols-2">
      <button
        type="button"
        onClick={() => window.print()}
        className="btn-primary w-full"
      >
        <Printer className="h-4 w-4" />
        พิมพ์ / บันทึกเป็น PDF
      </button>
      <button type="button" onClick={copyLink} className="btn-neutral w-full">
        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
        {copied ? "คัดลอกลิงก์แล้ว" : "คัดลอกลิงก์ประกาศ"}
      </button>
    </div>
  );
}
