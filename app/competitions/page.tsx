import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/portfolio/page-shell";
import { EmptyState } from "@/components/portfolio/visual-system";
import { getPublishedContent, type ContentItem } from "@/lib/portfolio/data";

export const metadata = {
  title: "รายการแข่งขัน | Somprasong Thunnok",
  description: "การแข่งขัน ผลลัพธ์ และสิ่งที่ได้รับจากแต่ละเวที",
};

export default async function CompetitionsPage() {
  const competitions = await getPublishedContent("competitions");

  return (
    <PageShell>
      <main>
        <section className="relative overflow-hidden border-b border-cyan-300/10 bg-[#050a12] px-5 py-24 sm:py-32">
          <div className="star-field absolute inset-0" />
          <div className="relative mx-auto max-w-7xl">
            <Link href="/projects" className="text-sm font-semibold text-cyan-200 hover:text-white">
              &lt;- กลับไปหน้าผลงาน
            </Link>
            <h1 className="tech-heading mt-8 text-5xl font-black text-white sm:text-7xl">
              รายการแข่งขัน
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-slate-400">
              เวทีที่ได้ลงมือทำจริง และบทเรียนที่ติดตัวกลับมา
            </p>
          </div>
        </section>

        <section className="section-mid px-5 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl">
            {competitions.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {competitions.map((competition) => (
                  <CompetitionCard key={String(competition.id)} item={competition} />
                ))}
              </div>
            ) : (
              <EmptyState dark>ยังไม่มีรายการแข่งขันที่เผยแพร่</EmptyState>
            )}
          </div>
        </section>
      </main>
    </PageShell>
  );
}

function CompetitionCard({ item }: { item: ContentItem }) {
  return (
    <article className="hud-panel overflow-hidden">
      {item.image_url ? (
        <Image
          src={String(item.image_url)}
          alt={`${String(item.title)} ภาพการแข่งขัน`}
          width={1000}
          height={600}
          className="h-64 w-full object-cover"
        />
      ) : null}
      <div className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
          <span>{String(item.result ?? item.organization ?? "การแข่งขัน")}</span>
          {item.event_date ? <span>{String(item.event_date)}</span> : null}
        </div>
        <h2 className="mt-4 text-2xl font-semibold text-white">{String(item.title)}</h2>
        {item.description ? (
          <p className="mt-3 line-clamp-3 text-base leading-7 text-slate-400">
            {String(item.description)}
          </p>
        ) : null}
        <Link
          href={`/competitions/${String(item.id)}`}
          className="mt-6 inline-flex border border-cyan-300/40 px-5 py-3 text-sm font-semibold text-cyan-100 hover:bg-cyan-300/10"
        >
          ดูสิ่งที่ได้รับจากการแข่งขัน &gt;
        </Link>
      </div>
    </article>
  );
}
