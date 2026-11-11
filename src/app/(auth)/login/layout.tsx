import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "เข้าสู่ระบบผู้สมัครสอบ",
  description:
    "เข้าสู่ระบบสารสนเทศของผู้สมัครสอบศูนย์สอบความรู้และทักษะทางวิชาชีพเภสัชกรรม สภาเภสัชกรรม",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
