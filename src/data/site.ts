export const siteInfo = {
  name: "ศูนย์สอบความรู้และทักษะทางวิชาชีพเภสัชกรรม",
  shortName: "ศูนย์สอบความรู้ฯ",
  council: "สภาเภสัชกรรม",
  nameEn: "Pharmacy Licensure Examination Center",
  abbr: "PLE Center",
  address:
    "สำนักงานเลขาธิการสภาเภสัชกรรม ชั้น 8 อาคารมหิตลาธิเบศร กระทรวงสาธารณสุข เลขที่ 88/19 หมู่ 4 ถนนติวานนท์ ตำบลตลาดขวัญ อำเภอเมือง จังหวัดนนทบุรี 11000",
  phone: "0-2591-9992 ถึง 5 ต่อ 5",
  phoneHref: "025919992",
  fax: "0-2591-9996",
  email: "ph_exam@pharmacycouncil.org",
  registryEmail: "pharthai@pharmacycouncil.org",
  hours: "วันจันทร์ – วันศุกร์ เวลา 08.30 – 16.30 น. (เว้นวันหยุดราชการ)",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=สำนักงานเลขาธิการสภาเภสัชกรรม+กระทรวงสาธารณสุข+นนทบุรี",
  updated: "10 พฤศจิกายน 2569",
};

export type ExamType = {
  code: string;
  name: string;
  mode: "ข้อเขียน (E-Exam)" | "ทักษะ (OSPE)";
  group: string;
  fee: number;
  description: string;
};

export const examTypes: ExamType[] = [
  {
    code: "PLE-CC1",
    name: "ความรู้ความสามารถร่วมทางเภสัชศาสตร์",
    mode: "ข้อเขียน (E-Exam)",
    group: "สมรรถนะร่วม",
    fee: 1000,
    description:
      "ประเมินความรู้พื้นฐานทางเภสัชศาสตร์ที่จำเป็นสำหรับผู้ประกอบวิชาชีพเภสัชกรรม",
  },
  {
    code: "PLE-CC2",
    name: "ทักษะและสมรรถนะร่วมทางเภสัชศาสตร์",
    mode: "ทักษะ (OSPE)",
    group: "สมรรถนะร่วม",
    fee: 2000,
    description:
      "ประเมินทักษะวิชาชีพผ่านสถานีสอบปฏิบัติ (Objective Structured Practical Examination)",
  },
  {
    code: "PLE-IP1",
    name: "เภสัชกรรมอุตสาหการ ภาคทฤษฎี",
    mode: "ข้อเขียน (E-Exam)",
    group: "เภสัชกรรมอุตสาหการ",
    fee: 1000,
    description:
      "ประเมินความรู้ด้านการผลิต การควบคุมคุณภาพ และการขึ้นทะเบียนผลิตภัณฑ์ยา",
  },
  {
    code: "PLE-IP2",
    name: "เภสัชกรรมอุตสาหการ ภาคทักษะ",
    mode: "ทักษะ (OSPE)",
    group: "เภสัชกรรมอุตสาหการ",
    fee: 2000,
    description:
      "ประเมินทักษะการปฏิบัติงานในกระบวนการผลิตและการควบคุมคุณภาพยา",
  },
  {
    code: "PLE-PC1",
    name: "บริบาลทางเภสัชกรรม ภาคทฤษฎี",
    mode: "ข้อเขียน (E-Exam)",
    group: "บริบาลทางเภสัชกรรม",
    fee: 1000,
    description:
      "ประเมินความรู้ด้านเภสัชบำบัด การใช้ยา และการดูแลผู้ป่วยอย่างสมเหตุสมผล",
  },
  {
    code: "PLE-PC2",
    name: "บริบาลทางเภสัชกรรม ภาคทักษะ",
    mode: "ทักษะ (OSPE)",
    group: "บริบาลทางเภสัชกรรม",
    fee: 2000,
    description:
      "ประเมินทักษะการซักประวัติ การจ่ายยา และการให้คำแนะนำด้านยาตามมาตรฐานวิชาชีพ",
  },
  {
    code: "PLE-PHCP1",
    name: "คุ้มครองผู้บริโภคด้านยาและสุขภาพ ภาคทฤษฎี",
    mode: "ข้อเขียน (E-Exam)",
    group: "คุ้มครองผู้บริโภค",
    fee: 1000,
    description:
      "ประเมินความรู้ด้านกฎหมายยา เภสัชสาธารณสุข และการคุ้มครองผู้บริโภค",
  },
  {
    code: "PLE-PHCP2",
    name: "คุ้มครองผู้บริโภคด้านยาและสุขภาพ ภาคทักษะ",
    mode: "ทักษะ (OSPE)",
    group: "คุ้มครองผู้บริโภค",
    fee: 2000,
    description:
      "ประเมินทักษะการดำเนินงานคุ้มครองผู้บริโภคและการสื่อสารความเสี่ยงด้านยา",
  },
];

export type ExamRound = {
  id: string;
  code: string;
  round: string;
  name: string;
  mode: string;
  date: string;
  dateShort: string;
  time: string;
  registration: string;
  deadline: string;
  venue: string;
  status: "เปิดรับสมัคร" | "ปิดรับสมัคร" | "ประกาศผลแล้ว";
  fee: number;
};

export const examRounds: ExamRound[] = [
  {
    id: "cc1-1-2570",
    code: "PLE-CC1",
    round: "ครั้งที่ 1/2570",
    name: "ความรู้ความสามารถร่วมทางเภสัชศาสตร์",
    mode: "E-Exam",
    date: "16 มกราคม 2570",
    dateShort: "16 ม.ค. 2570",
    time: "09:00 – 12:00 น.",
    registration: "1 พ.ย. – 15 ธ.ค. 2569",
    deadline: "15 ธันวาคม 2569 เวลา 23:59 น.",
    venue: "ศูนย์สอบส่วนกลางและศูนย์ภูมิภาค",
    status: "เปิดรับสมัคร",
    fee: 1000,
  },
  {
    id: "pc1-1-2570",
    code: "PLE-PC1",
    round: "ครั้งที่ 1/2570",
    name: "บริบาลทางเภสัชกรรม ภาคทฤษฎี",
    mode: "E-Exam",
    date: "17 มกราคม 2570",
    dateShort: "17 ม.ค. 2570",
    time: "09:00 – 12:00 น.",
    registration: "1 พ.ย. – 15 ธ.ค. 2569",
    deadline: "15 ธันวาคม 2569 เวลา 23:59 น.",
    venue: "ศูนย์สอบส่วนกลางและศูนย์ภูมิภาค",
    status: "เปิดรับสมัคร",
    fee: 1000,
  },
  {
    id: "ip1-1-2570",
    code: "PLE-IP1",
    round: "ครั้งที่ 1/2570",
    name: "เภสัชกรรมอุตสาหการ ภาคทฤษฎี",
    mode: "E-Exam",
    date: "23 มกราคม 2570",
    dateShort: "23 ม.ค. 2570",
    time: "09:00 – 12:00 น.",
    registration: "1 พ.ย. – 15 ธ.ค. 2569",
    deadline: "15 ธันวาคม 2569 เวลา 23:59 น.",
    venue: "ศูนย์สอบส่วนกลางและศูนย์ภูมิภาค",
    status: "เปิดรับสมัคร",
    fee: 1000,
  },
  {
    id: "phcp1-1-2570",
    code: "PLE-PHCP1",
    round: "ครั้งที่ 1/2570",
    name: "คุ้มครองผู้บริโภคด้านยาและสุขภาพ ภาคทฤษฎี",
    mode: "E-Exam",
    date: "24 มกราคม 2570",
    dateShort: "24 ม.ค. 2570",
    time: "09:00 – 12:00 น.",
    registration: "1 พ.ย. – 15 ธ.ค. 2569",
    deadline: "15 ธันวาคม 2569 เวลา 23:59 น.",
    venue: "ศูนย์สอบส่วนกลางและศูนย์ภูมิภาค",
    status: "เปิดรับสมัคร",
    fee: 1000,
  },
  {
    id: "cc2-1-2570",
    code: "PLE-CC2",
    round: "ครั้งที่ 1/2570",
    name: "ทักษะและสมรรถนะร่วมทางเภสัชศาสตร์",
    mode: "OSPE",
    date: "30 – 31 มกราคม 2570",
    dateShort: "30 – 31 ม.ค. 2570",
    time: "ตามรอบสอบที่กำหนด",
    registration: "1 พ.ย. – 15 ธ.ค. 2569",
    deadline: "15 ธันวาคม 2569 เวลา 23:59 น.",
    venue: "คณะเภสัชศาสตร์ มหาวิทยาลัยเครือข่าย",
    status: "เปิดรับสมัคร",
    fee: 2000,
  },
  {
    id: "pc2-1-2570",
    code: "PLE-PC2",
    round: "ครั้งที่ 1/2570",
    name: "บริบาลทางเภสัชกรรม ภาคทักษะ",
    mode: "OSPE",
    date: "6 กุมภาพันธ์ 2570",
    dateShort: "6 ก.พ. 2570",
    time: "ตามรอบสอบที่กำหนด",
    registration: "1 พ.ย. – 15 ธ.ค. 2569",
    deadline: "15 ธันวาคม 2569 เวลา 23:59 น.",
    venue: "คณะเภสัชศาสตร์ มหาวิทยาลัยเครือข่าย",
    status: "เปิดรับสมัคร",
    fee: 2000,
  },
  {
    id: "ip2-1-2570",
    code: "PLE-IP2",
    round: "ครั้งที่ 1/2570",
    name: "เภสัชกรรมอุตสาหการ ภาคทักษะ",
    mode: "OSPE",
    date: "7 กุมภาพันธ์ 2570",
    dateShort: "7 ก.พ. 2570",
    time: "ตามรอบสอบที่กำหนด",
    registration: "1 พ.ย. – 15 ธ.ค. 2569",
    deadline: "15 ธันวาคม 2569 เวลา 23:59 น.",
    venue: "คณะเภสัชศาสตร์ มหาวิทยาลัยเครือข่าย",
    status: "เปิดรับสมัคร",
    fee: 2000,
  },
  {
    id: "phcp2-1-2570",
    code: "PLE-PHCP2",
    round: "ครั้งที่ 1/2570",
    name: "คุ้มครองผู้บริโภคด้านยาและสุขภาพ ภาคทักษะ",
    mode: "OSPE",
    date: "13 กุมภาพันธ์ 2570",
    dateShort: "13 ก.พ. 2570",
    time: "ตามรอบสอบที่กำหนด",
    registration: "1 พ.ย. – 15 ธ.ค. 2569",
    deadline: "15 ธันวาคม 2569 เวลา 23:59 น.",
    venue: "คณะเภสัชศาสตร์ มหาวิทยาลัยเครือข่าย",
    status: "เปิดรับสมัคร",
    fee: 2000,
  },
  {
    id: "ip1-5-2569",
    code: "PLE-IP1",
    round: "ครั้งที่ 5/2569",
    name: "เภสัชกรรมอุตสาหการ ภาคทฤษฎี",
    mode: "E-Exam",
    date: "13 ธันวาคม 2569",
    dateShort: "13 ธ.ค. 2569",
    time: "09:00 – 12:00 น.",
    registration: "ปิดรับสมัครแล้ว",
    deadline: "2 ตุลาคม 2569 เวลา 23:59 น.",
    venue: "ศูนย์สอบส่วนกลางและศูนย์ภูมิภาค",
    status: "ปิดรับสมัคร",
    fee: 1000,
  },
];

export const announcementBar = {
  label: "ประกาศสำคัญ",
  text: "เปิดรับสมัครการสอบความรู้ทางวิชาชีพเภสัชกรรม ครั้งที่ 1/2570 ระหว่างวันที่ 1 พฤศจิกายน – 15 ธันวาคม 2569",
  href: "/news/1",
};

export const relatedLinks = [
  {
    name: "สภาเภสัชกรรม",
    nameEn: "The Pharmacy Council of Thailand",
    href: "https://www.pharmacycouncil.org",
    description: "หน่วยงานกำกับดูแลวิชาชีพเภสัชกรรม",
  },
  {
    name: "สำนักงานคณะกรรมการอาหารและยา",
    nameEn: "Thai FDA",
    href: "https://www.fda.moph.go.th",
    description: "กำกับดูแลยา อาหาร และผลิตภัณฑ์สุขภาพ",
  },
  {
    name: "องค์การเภสัชกรรม",
    nameEn: "GPO",
    href: "https://www.gpo.or.th",
    description: "รัฐวิสาหกิจด้านการผลิตและจัดหายา",
  },
  {
    name: "สมาคมเภสัชกรรมโรงพยาบาล (ประเทศไทย)",
    nameEn: "Thai Hospital Pharmacy Association",
    href: "https://thaihp.org",
    description: "องค์กรวิชาชีพด้านเภสัชกรรมโรงพยาบาล",
  },
  {
    name: "ศูนย์เภสัชสนเทศ",
    nameEn: "Drug Information Center",
    href: "http://drug.pharmacy.psu.ac.th",
    description: "แหล่งข้อมูลยาสำหรับบุคลากรสาธารณสุข",
  },
  {
    name: "กระทรวงสาธารณสุข",
    nameEn: "Ministry of Public Health",
    href: "https://www.moph.go.th",
    description: "นโยบายและบริการด้านสาธารณสุข",
  },
];

export const applicationSteps = [
  {
    step: 1,
    title: "ตรวจสอบคุณสมบัติ",
    description:
      "ตรวจสอบวุฒิการศึกษา สถานะการฝึกปฏิบัติงาน และรายวิชาที่ต้องสอบให้ครบถ้วน",
  },
  {
    step: 2,
    title: "กรอกใบสมัครและแนบเอกสาร",
    description:
      "กรอกข้อมูลส่วนบุคคล เลือกรอบสอบ และแนบหลักฐานการศึกษาและรูปถ่าย",
  },
  {
    step: 3,
    title: "ชำระค่าธรรมเนียม",
    description:
      "ชำระค่าธรรมเนียมการสอบผ่านช่องทางที่กำหนด และเก็บหลักฐานการชำระเงิน",
  },
  {
    step: 4,
    title: "ตรวจสอบสถานะและที่นั่งสอบ",
    description:
      "ตรวจสอบการอนุมัติสิทธิ์สอบ สนามสอบ ห้องสอบ และเลขที่นั่งสอบก่อนวันสอบ",
  },
  {
    step: 5,
    title: "เข้าสอบและตรวจผล",
    description:
      "ปฏิบัติตามระเบียบการสอบ และตรวจสอบผลการสอบผ่านระบบออนไลน์",
  },
];
