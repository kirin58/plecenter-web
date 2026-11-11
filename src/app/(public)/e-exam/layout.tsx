import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ระบบ E-Exam",
  description:
    "ข้อมูลระบบการสอบออนไลน์ด้วยคอมพิวเตอร์ (E-Exam) ข้อกำหนดการใช้งาน และระบบทดลองสอบเสมือนจริงสำหรับผู้เข้าสอบ",
};

export default function EExamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
