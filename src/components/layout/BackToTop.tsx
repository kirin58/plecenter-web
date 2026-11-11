"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 600);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="no-print fixed bottom-24 right-4 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 shadow-md transition-colors hover:border-emerald-600 hover:text-emerald-800 sm:bottom-28 sm:right-6"
      aria-label="กลับขึ้นด้านบน"
      title="กลับขึ้นด้านบน"
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}
