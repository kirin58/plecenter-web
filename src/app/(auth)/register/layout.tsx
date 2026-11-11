import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ลงทะเบียนผู้สมัครสอบใหม่",
  description:
    "สร้างบัญชีผู้ใช้งานสำหรับการสมัครสอบความรู้และทักษะทางวิชาชีพเภสัชกรรม สภาเภสัชกรรม",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
