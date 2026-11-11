import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ลงทะเบียนเข้าสอบ",
  description:
    "เข้าสู่ระบบลงทะเบียนเข้าสอบด้วยเลขบัตรประจำตัวประชาชนหรือหนังสือเดินทาง และรหัสประจำตัวผู้สอบ 9 หลัก",
};

export default function ExamRegistrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
