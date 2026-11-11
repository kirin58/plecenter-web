"use client";

import { Printer } from "lucide-react";

export default function PrintButton({
  label = "พิมพ์หน้านี้",
  className = "btn-secondary",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <button type="button" onClick={() => window.print()} className={className}>
      <Printer className="h-4 w-4" />
      {label}
    </button>
  );
}
