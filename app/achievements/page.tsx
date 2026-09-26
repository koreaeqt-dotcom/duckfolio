import Image from "next/image";
import { PageShell } from "@/components/portfolio/page-shell";
import { EmptyState, SectionHeader } from "@/components/portfolio/visual-system";
import { getPublishedContent, type ContentItem } from "@/lib/portfolio/data";

export const metadata = { title: "ความสำเร็จ | Somprasong Thunnok", description: "รางวัล การแข่งขัน และใบรับรอง" };

export default async function AchievementsPage() {
  const [achievements, certificates] = await Promise.all([getPublishedContent("achievements"), getPublishedContent("certificates")]);
  return <PageShell><main><section className="relative overflow-hidden border-b border-cyan-300/10 bg-[#050a12] px-5 py-24 text-white sm:py-32"><div className="star-field absolute inset-0" /><div className="relative mx-auto max-w-7xl"><p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">ช่วงเวลาที่ภูมิใจ</p><h1 className="tech-heading mt-5 text-5xl font-black sm:text-7xl">ความสำเร็จ</h1><p className="mt-6 max-w-2xl text-xl leading-9 text-slate-400">รางวัล การแข่งขัน และใบรับรองจากสิ่งที่ค่อย ๆ ตั้งใจทำมา</p></div></section><section className="section-deep px-5 py-24"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2"><RecordColumn dateField="event_date" empty="ยังไม่มีความสำเร็จที่เผยแพร่" items={achievements} title="เรื่องที่อยากเล่า" /><RecordColumn dateField="issued_date" empty="ยังไม่มีใบรับรองที่เผยแพร่" items={certificates} title="ใบรับรอง" /></div></section></main></PageShell>;
}

function RecordColumn({ dateField, empty, items, title }: { dateField: string; empty: string; items: ContentItem[]; title: string }) {
  return <section><SectionHeader eyebrow="บันทึก" title={title} dark /><div className="relative mt-10 grid gap-8 pl-7 before:absolute before:left-2 before:top-2 before:h-full before:w-px before:bg-cyan-300/30">{items.length > 0 ? items.map((item) => <article key={String(item.id)} className="relative min-w-0"><span className="absolute -left-[1.7rem] top-1 h-3 w-3 rounded-full border border-cyan-100 bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.7)]" />{item.image_url ? <Image src={String(item.image_url)} alt={String(item.title ?? "ภาพความสำเร็จ")} width={900} height={460} className="mb-5 h-52 w-full object-cover" /> : null}<div className="flex flex-wrap items-center justify-between gap-3"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">{String(item.award_level ?? item.issuer ?? item.organization ?? "บันทึก")}</p>{item[dateField] ? <p className="text-sm text-slate-500">{String(item[dateField])}</p> : null}</div><h2 className="mt-3 text-2xl font-semibold text-white">{String(item.title)}</h2>{item.description ? <p className="mt-3 text-base leading-7 text-slate-400">{String(item.description)}</p> : null}</article>) : <EmptyState dark>{empty}</EmptyState>}</div></section>;
}
