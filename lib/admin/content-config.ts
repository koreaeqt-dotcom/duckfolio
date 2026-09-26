export type ContentField = {
  name: string;
  label: string;
  type: "text" | "textarea" | "date" | "number" | "checkbox" | "image" | "url";
  required?: boolean;
};

export type ContentTableKey =
  | "achievements"
  | "competitions"
  | "certificates"
  | "gallery"
  | "skills"
  | "timeline"
  | "profile";

export type ContentConfig = {
  key: ContentTableKey;
  title: string;
  description: string;
  table: string;
  imagePath: string;
  fields: ContentField[];
  singleton?: boolean;
};

export const contentConfigs: Record<ContentTableKey, ContentConfig> = {
  achievements: {
    key: "achievements",
    title: "ความสำเร็จ",
    description: "รางวัล การแข่งขัน ใบประกาศ และช่วงเวลาที่อยากเล่า",
    table: "achievements",
    imagePath: "achievements",
    fields: [
      { name: "title", label: "ชื่อเรื่อง", type: "text", required: true },
      { name: "organization", label: "หน่วยงานหรือเวที", type: "text" },
      { name: "description", label: "รายละเอียด", type: "textarea" },
      { name: "award_level", label: "ระดับรางวัล", type: "text" },
      { name: "event_date", label: "วันที่", type: "date" },
      { name: "image_url", label: "ภาพประกอบ", type: "image" },
      { name: "published", label: "เผยแพร่", type: "checkbox" },
      { name: "sort_order", label: "ลำดับการแสดงผล", type: "number" },
    ],
  },
  competitions: {
    key: "competitions",
    title: "รายการแข่งขัน",
    description: "บันทึกการแข่งขัน ผลลัพธ์ และสิ่งที่ได้รับจากแต่ละเวที",
    table: "competitions",
    imagePath: "competitions",
    fields: [
      { name: "title", label: "ชื่อการแข่งขัน", type: "text", required: true },
      { name: "organization", label: "ผู้จัดหรือเวที", type: "text" },
      { name: "event_date", label: "วันที่แข่งขัน", type: "date" },
      { name: "result", label: "ผลการแข่งขันหรือรางวัล", type: "text" },
      { name: "description", label: "รายละเอียดการแข่งขัน", type: "textarea" },
      { name: "takeaways", label: "สิ่งที่ได้รับจากการแข่งขัน", type: "textarea" },
      { name: "image_url", label: "ภาพการแข่งขัน", type: "image" },
      { name: "published", label: "เผยแพร่", type: "checkbox" },
      { name: "sort_order", label: "ลำดับการแสดงผล", type: "number" },
    ],
  },
  certificates: {
    key: "certificates",
    title: "ใบรับรอง",
    description: "ใบรับรองการเรียน คอร์ส และการอบรมที่อยากแสดง",
    table: "certificates",
    imagePath: "certificates",
    fields: [
      { name: "title", label: "ชื่อใบรับรอง", type: "text", required: true },
      { name: "issuer", label: "ผู้ออกใบรับรอง", type: "text" },
      { name: "description", label: "รายละเอียด", type: "textarea" },
      { name: "image_url", label: "ภาพใบรับรอง", type: "image" },
      { name: "credential_url", label: "ลิงก์ตรวจสอบ", type: "url" },
      { name: "issued_date", label: "วันที่ได้รับ", type: "date" },
      { name: "published", label: "เผยแพร่", type: "checkbox" },
      { name: "sort_order", label: "ลำดับการแสดงผล", type: "number" },
    ],
  },
  gallery: {
    key: "gallery",
    title: "แกลเลอรี",
    description: "ภาพจากผลงาน กิจกรรม การแข่งขัน และชีวิตระหว่างเรียน",
    table: "gallery",
    imagePath: "gallery",
    fields: [
      { name: "title", label: "ชื่อภาพ", type: "text", required: true },
      { name: "description", label: "คำบรรยาย", type: "textarea" },
      { name: "image_url", label: "รูปภาพ", type: "image" },
      { name: "category", label: "หมวดหมู่", type: "text" },
      { name: "event_date", label: "วันที่", type: "date" },
      { name: "published", label: "เผยแพร่", type: "checkbox" },
      { name: "sort_order", label: "ลำดับการแสดงผล", type: "number" },
    ],
  },
  skills: {
    key: "skills",
    title: "ทักษะ",
    description: "เครื่องมือและความสามารถที่อยากแสดงในหน้า Portfolio",
    table: "skills",
    imagePath: "skills",
    fields: [
      { name: "name", label: "ชื่อทักษะ", type: "text", required: true },
      { name: "category", label: "หมวดหมู่", type: "text" },
      { name: "level", label: "ระดับ 1-5", type: "number" },
      { name: "icon", label: "ชื่อไอคอน", type: "text" },
      { name: "published", label: "เผยแพร่", type: "checkbox" },
      { name: "sort_order", label: "ลำดับการแสดงผล", type: "number" },
    ],
  },
  timeline: {
    key: "timeline",
    title: "เส้นทางการเรียนรู้",
    description: "เหตุการณ์สำคัญจากการเรียน โปรเจกต์ และประสบการณ์ต่าง ๆ",
    table: "timeline",
    imagePath: "timeline",
    fields: [
      { name: "title", label: "ชื่อเหตุการณ์", type: "text", required: true },
      { name: "description", label: "รายละเอียด", type: "textarea" },
      { name: "organization", label: "สถานที่หรือหน่วยงาน", type: "text" },
      { name: "start_date", label: "วันที่เริ่มต้น", type: "date" },
      { name: "end_date", label: "วันที่สิ้นสุด", type: "date" },
      { name: "type", label: "ประเภท", type: "text" },
      { name: "published", label: "เผยแพร่", type: "checkbox" },
      { name: "sort_order", label: "ลำดับการแสดงผล", type: "number" },
    ],
  },
  profile: {
    key: "profile",
    title: "โปรไฟล์",
    description: "ข้อมูลแนะนำตัวและช่องทางติดต่อที่จะแสดงบนเว็บไซต์",
    table: "profile",
    imagePath: "profile",
    singleton: true,
    fields: [
      { name: "full_name", label: "ชื่อเต็ม", type: "text", required: true },
      { name: "headline", label: "คำแนะนำตัวสั้น ๆ", type: "text" },
      { name: "bio", label: "เรื่องราวของตัวเอง", type: "textarea" },
      { name: "school", label: "สถานศึกษา", type: "text" },
      { name: "location", label: "สถานที่", type: "text" },
      { name: "email", label: "อีเมล", type: "text" },
      { name: "github_url", label: "ลิงก์ GitHub", type: "url" },
      { name: "linkedin_url", label: "ลิงก์ LinkedIn", type: "url" },
      { name: "avatar_url", label: "รูปโปรไฟล์", type: "image" },
    ],
  },
};
