import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "สมัครสอบออนไลน์",
  description:
    "ยื่นใบสมัครสอบความรู้ทางวิชาชีพเภสัชกรรม เลือกรายวิชาและสนามสอบ แนบเอกสาร และชำระค่าธรรมเนียมผ่านระบบอิเล็กทรอนิกส์",
};

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
