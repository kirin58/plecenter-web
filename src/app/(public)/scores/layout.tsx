import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ตรวจสอบสถานะและผลสอบ",
  description:
    "ตรวจสอบสถานะการสมัคร สนามสอบ ห้องสอบ เลขที่นั่งสอบ และผลคะแนนการสอบความรู้ทางวิชาชีพเภสัชกรรม",
};

export default function ScoresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
