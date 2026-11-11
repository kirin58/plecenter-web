import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ยื่นคำร้องออนไลน์",
  description:
    "ยื่นคำร้องทักท้วงข้อสอบ ขอทราบคะแนน ขอคืนค่าธรรมเนียม หรือขอหนังสือรับรองการฝึกปฏิบัติงาน ต่อศูนย์สอบความรู้ฯ",
};

export default function RequestsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
