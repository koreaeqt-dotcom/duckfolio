import Image from "next/image";
import Link from "next/link";
import type { ContentItem, Profile } from "@/lib/portfolio/data";

export function DuckInsignia({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`grid place-items-center border border-cyan-300/60 bg-slate-950 text-cyan-200 shadow-[0_0_24px_rgba(34,211,238,0.22)] ${className}`}><span className="text-sm font-black">D</span></span>;
}

export function SectionHeader({ eyebrow, title, action, dark = false }: { eyebrow: string; title: string; action?: { href: string; label: string }; dark?: boolean }) {
  return <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className={`text-xs font-semibold uppercase tracking-[0.22em] ${dark ? "text-cyan-300" : "text-cyan-400"}`}>{eyebrow}</p><h2 className={`tech-heading mt-3 text-3xl font-semibold sm:text-5xl ${dark ? "text-white" : "text-slate-100"}`}>{title}</h2></div>{action ? <Link href={action.href} className="text-sm font-semibold text-cyan-200 transition hover:text-white">{action.label} <span aria-hidden="true">-&gt;</span></Link> : null}</div>;
}

export function EmptyState({ children }: { children: React.ReactNode; dark?: boolean }) {
  return <div className="hud-panel px-6 py-8 text-base leading-7 text-slate-300">{children}</div>;
}

export function ProfilePortrait({ profile }: { profile: Profile | null }) {
  return <aside className="relative mx-auto w-full max-w-md"><div className="absolute -inset-8 rounded-full bg-cyan-400/10 blur-3xl" /><div className="hud-panel relative overflow-hidden p-2"><div className="relative aspect-[4/5] overflow-hidden bg-slate-900">{profile?.avatar_url ? <Image src={profile.avatar_url} alt={profile.full_name ? `ภาพโปรไฟล์ของ ${profile.full_name}` : "ภาพโปรไฟล์"} fill sizes="(max-width: 768px) 90vw, 28rem" className="object-cover" /> : <Image src="/visuals/somprasong-portrait-clean3.png" alt="ภาพโปรไฟล์ของ Somprasong Thunnok" fill sizes="(max-width: 768px) 90vw, 28rem" className="object-contain object-bottom" />}</div></div><div className="hud-panel relative -mt-12 ml-auto w-[88%] p-5"><p className="text-xs uppercase tracking-[0.2em] text-cyan-300">โปรไฟล์นักสร้าง</p><h3 className="mt-2 text-2xl font-semibold text-white">{profile?.full_name ?? "Somprasong Thunnok"}</h3>{profile?.headline ? <p className="mt-2 text-base leading-7 text-slate-300">{profile.headline}</p> : null}<dl className="mt-4 grid gap-2 text-sm text-slate-400">{profile?.school ? <ProfileDatum label="สถานศึกษา" value={profile.school} /> : null}{profile?.location ? <ProfileDatum label="สถานที่" value={profile.location} /> : null}</dl></div></aside>;
}

function ProfileDatum({ label, value }: { label: string; value: string }) { return <div className="flex min-w-0 justify-between gap-4"><dt className="text-cyan-300/80">{label}</dt><dd className="break-words text-right">{value}</dd></div>; }

export function EventLog({ dateField, empty, items }: { dateField: string; empty: string; items: ContentItem[] }) {
  if (items.length === 0) return <EmptyState dark>{empty}</EmptyState>;
  return <div className="relative grid gap-8 pl-7 before:absolute before:left-2 before:top-2 before:h-full before:w-px before:bg-cyan-300/30">{items.map((item) => <article key={String(item.id)} className="relative min-w-0"><span className="absolute -left-[1.7rem] top-1 h-3 w-3 rounded-full border border-cyan-100 bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.7)]" /><p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">{String(item[dateField] ?? "ปัจจุบัน")}</p><h3 className="mt-2 break-words text-xl font-semibold text-white">{String(item.title ?? item.name)}</h3><p className="mt-2 break-words text-base leading-7 text-slate-400">{String(item.organization ?? item.issuer ?? item.description ?? "")}</p></article>)}</div>;
}
