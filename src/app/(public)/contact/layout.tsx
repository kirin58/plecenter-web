import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ติดต่อศูนย์สอบฯ",
  description:
    "ช่องทางติดต่อสอบถามข้อมูลการสอบ การสมัครสอบ เอกสาร และการให้บริการของศูนย์สอบความรู้ฯ สภาเภสัชกรรม",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
