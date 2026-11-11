import type { Metadata } from "next";
import { Sarabun } from "next/font/google";
import "./globals.css";

const sarabun = Sarabun({
  variable: "--font-sarabun",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.plecenter.org"),
  title: {
    default: "ศูนย์สอบความรู้ฯ สภาเภสัชกรรม | PLE Center",
    template: "%s | ศูนย์สอบความรู้ฯ สภาเภสัชกรรม",
  },
  description:
    "ศูนย์สอบความรู้และทักษะทางวิชาชีพเภสัชกรรม สภาเภสัชกรรม ให้บริการข้อมูลการสมัครสอบ ปฏิทินสอบ ระเบียบการสอบ เอกสาร แบบฟอร์ม และการตรวจสอบผลการสอบอย่างเป็นทางการ",
  keywords: [
    "ศูนย์สอบความรู้",
    "สภาเภสัชกรรม",
    "PLE",
    "การสอบเภสัชกรรม",
    "ใบอนุญาตประกอบวิชาชีพเภสัชกรรม",
  ],
  openGraph: {
    type: "website",
    locale: "th_TH",
    siteName: "ศูนย์สอบความรู้ฯ สภาเภสัชกรรม",
    title: "ศูนย์สอบความรู้ฯ สภาเภสัชกรรม | PLE Center",
    description:
      "บริการข้อมูลการสอบความรู้และทักษะทางวิชาชีพเภสัชกรรมอย่างเป็นทางการ",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="th" className={`${sarabun.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-white text-gray-800 antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-emerald-800 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          ข้ามไปยังเนื้อหาหลัก
        </a>
        {children}
      </body>
    </html>
  );
}
