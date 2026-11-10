"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, HelpCircle, Send, Bot, ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  id: number;
  category: string;
  q: string;
  a: string;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    category: "การสมัครสอบ",
    q: "นิสิต/นักศึกษาชั้นปีสุดท้ายสามารถสมัครสอบ PLE-CC1 ได้เมื่อใด?",
    a: "สามารถสมัครได้ในรอบที่ 1 ของปีการศึกษาที่คาดว่าจะสำเร็จการศึกษา โดยต้องแนบหนังสือรับรองสภาพการเป็นนิสิต/นักศึกษาจากคณะเภสัชศาสตร์ที่กำลังศึกษาอยู่",
  },
  {
    id: 2,
    category: "การสมัครสอบ",
    q: "หากต้องการเปลี่ยนสนามสอบหลังจากส่งใบสมัครแล้ว ทำได้หรือไม่?",
    a: "สามารถยื่นคำร้องขอเปลี่ยนสนามสอบได้ก่อนวันปิดรับสมัครอย่างน้อย 7 วันทำการ ทั้งนี้ขึ้นอยู่กับจำนวนที่นั่งสอบที่ว่างในแต่ละสนามสอบด้วย",
  },
  {
    id: 3,
    category: "การชำระเงิน",
    q: "ช่องทางการชำระเงินค่าสมัครสอบมีอะไรบ้าง?",
    a: "ระบบรองรับการสแกนผ่าน Thai QR Payment (PromptPay) ได้ทุกธนาคาร หรือ Mobile Banking รวมทั้งสามารถพิมพ์ใบแจ้งหนี้ (Pay-in Slip) ไปชำระที่เคาน์เตอร์ธนาคารกรุงไทยได้",
  },
  {
    id: 4,
    category: "วันสอบและที่นั่งสอบ",
    q: "บัตรประจำตัวสอบและเลขที่นั่งสอบจะประกาศเมื่อใด?",
    a: "ศูนย์สอบฯ จะประกาศผังห้องสอบและเปิดให้พิมพ์บัตรประจำตัวสอบล่วงหน้า 14 วันก่อนวันสอบ โดยสามารถเข้าดูได้ที่เมนู 'ตรวจสอบสถานะ/คะแนน'",
  },
  {
    id: 5,
    category: "ระบบ E-Exam",
    q: "ในการสอบ E-Exam หากเครื่องคอมพิวเตอร์ดับหรือการเชื่อมต่อขัดข้อง คำตอบจะหายหรือไม่?",
    a: "คำตอบจะไม่สูญหาย เนื่องจากระบบ E-Exam ทำการบันทึกคำตอบลงฐานข้อมูลกลางแบบ Real-time ทุกครั้งที่เลือกคำตอบ เมื่อเปลี่ยนเครื่องหรือเข้าสู่ระบบใหม่จะสามารถทำข้อสอบต่อจากเวลาที่เหลือได้ทันที",
  },
  {
    id: 6,
    category: "ผลสอบและใบรับรอง",
    q: "เกณฑ์การตัดสินผ่านการสอบ PLE แต่ละวิชาคิดอย่างไร?",
    a: "ผู้เข้าสอบต้องได้คะแนนรวมไม่น้อยกว่าร้อยละ 60.00 และต้องมีคะแนนในแต่ละหมวดวิชาย่อยผ่านเกณฑ์มาตรฐานขั้นต่ำตามที่ข้อบังคับสภาเภสัชกรรมกำหนด",
  },
  {
    id: 7,
    category: "ผลสอบและใบรับรอง",
    q: "หากไม่เห็นด้วยกับคะแนนสอบ สามารถยื่นทักท้วงได้ภายในกี่วัน?",
    a: "สามารถยื่นคำร้องทักท้วงข้อสอบได้ภายใน 3 วันทำการหลังวันสอบ หรือยื่นขอตรวจสอบคะแนนย่อยได้ภายใน 15 วันทำการหลังวันประกาศผลสอบผ่านระบบคำร้องออนไลน์",
  },
];

export default function FAQPage() {
  const [selectedCat, setSelectedCat] = useState("ทั้งหมด");
  const [search, setSearch] = useState("");
  const [openIds, setOpenIds] = useState<{ [key: number]: boolean }>({ 1: true });

  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "bot"; text: string }>>([
    {
      sender: "bot",
      text: "ยินดีต้อนรับสู่ระบบบริการข้อมูลอัตโนมัติ ศูนย์สอบความรู้ฯ สภาเภสัชกรรม สอบถามข้อสงสัยเกี่ยวกับการสอบวิชาชีพได้ครับ",
    },
  ]);

  const categories = ["ทั้งหมด", "การสมัครสอบ", "การชำระเงิน", "วันสอบและที่นั่งสอบ", "ระบบ E-Exam", "ผลสอบและใบรับรอง"];

  const toggleAccordion = (id: number) => {
    setOpenIds({ ...openIds, [id]: !openIds[id] });
  };

  const filtered = faqs.filter((item) => {
    const matchCat = selectedCat === "ทั้งหมด" || item.category === selectedCat;
    const matchSearch = item.q.toLowerCase().includes(search.toLowerCase()) ||
                        item.a.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChatMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setChatInput("");

    setTimeout(() => {
      let botReply = "สามารถตรวจสอบกำหนดการและรายละเอียดได้จากปฏิทินสอบประจำปี 2569 ที่เมนูด้านบน หรือหากต้องการคำแนะนำเพิ่มเติม สามารถติดต่อ 0-2591-9992 ครับ";
      if (userText.includes("สมัคร") || userText.includes("เวลา")) {
        botReply = "รอบสอบที่ 1/2569 เปิดรับสมัครตั้งแต่วันนี้ถึง 15 ธ.ค. 2568 ผ่านหน้า 'สมัครสอบออนไลน์' ครับ";
      } else if (userText.includes("ที่นั่ง") || userText.includes("คะแนน")) {
        botReply = "ท่านสามารถกรอกเลขบัตรประชาชน 13 หลักในเมนู 'ตรวจสอบสถานะ/คะแนน' เพื่อดูห้องสอบหรือผลคะแนนได้ทันทีครับ";
      }
      setChatMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <nav className="text-xs text-gray-500 mb-2 flex items-center gap-1.5">
          <Link href="/" className="hover:text-emerald-800">หน้าแรก</Link>
          <span>/</span>
          <span className="text-emerald-800 font-medium">คำถามที่พบบ่อย (FAQ)</span>
        </nav>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          คำถามที่พบบ่อย (FAQ) และระบบตอบข้อซักถาม
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 font-light">
          รวบรวมข้อสงสัยเกี่ยวกับการสมัครสอบ E-Exam การชำระเงิน และการรับรองผลสอบตามระเบียบสภาเภสัชกรรม
        </p>
      </div>

      {/* Search and Category filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-3">
        <div className="relative">
          <input
            type="text"
            placeholder="พิมพ์คำถามที่สงสัย เช่น เปลี่ยนสนามสอบ, ลืมรหัสผ่าน, เกณฑ์คะแนนผ่าน..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600"
          />
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1 rounded whitespace-nowrap font-medium transition-colors ${
                selectedCat === cat
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "bg-gray-100 text-gray-600 hover:bg-emerald-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion FAQ list */}
      <div className="space-y-2.5">
        {filtered.map((item) => {
          const isOpen = !!openIds[item.id];
          return (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs transition-all"
            >
              <button
                onClick={() => toggleAccordion(item.id)}
                className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-gray-50/70 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <HelpCircle className="w-4 h-4 text-emerald-800 shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-gray-900">{item.q}</span>
                </div>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                )}
              </button>
              {isOpen && (
                <div className="px-5 pb-4 pt-1 text-xs text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/50 font-light">
                  <span className="font-semibold text-emerald-900 mr-1.5">คำตอบ:</span>
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* AI Assistant Widget */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2.5 pb-2.5 border-b border-gray-100">
          <div className="w-8 h-8 rounded bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-900">ระบบช่วยตอบข้อซักถามอัตโนมัติ (Automated Helpdesk)</h3>
            <p className="text-[11px] text-gray-400">ตอบข้อสงสัยระเบียบการสอบเบื้องต้นตลอด 24 ชั่วโมง</p>
          </div>
        </div>

        {/* Messages */}
        <div className="h-44 overflow-y-auto p-3 rounded-lg bg-gray-50 border border-gray-100 space-y-2 text-xs">
          {chatMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-2.5 rounded-lg text-xs ${
                  msg.sender === "user"
                    ? "bg-emerald-700 text-white"
                    : "bg-white text-gray-800 border border-gray-200"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSendChat} className="flex gap-2">
          <input
            type="text"
            placeholder="พิมพ์คำถาม เช่น สมัครสอบยังไง, วันสอบวันไหน..."
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            className="flex-1 text-xs px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600"
          />
          <button
            type="submit"
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors shadow-xs flex items-center gap-1"
          >
            <Send className="w-3 h-3" />
            ส่งคำถาม
          </button>
        </form>
      </div>
    </div>
  );
}
