import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/portfolio/page-shell";
import { SectionHeader } from "@/components/portfolio/visual-system";
import { getPublishedCompetition } from "@/lib/portfolio/data";

export async function generateMetadata({ params }: PageProps<"/competitions/[id]">) {
  const { id } = await params;
  const competition = await getPublishedCompetition(id);
  return {
    title: `${String(competition.title)} | Somprasong Thunnok`,
    description: String(competition.description ?? competition.takeaways ?? "รายละเอียดการแข่งขัน"),
  };
}

export default async function CompetitionDetailPage({ params }: PageProps<"/competitions/[id]">) {
  const { id } = await params;
  const competition = await getPublishedCompetition(id);

  return (
    <PageShell>
      <main>
        <section className="relative overflow-hidden border-b border-cyan-300/10 bg-[#050a12] px-5 py-24 sm:py-32">
          <div className="star-field absolute inset-0" />
          <article className="relative mx-auto max-w-7xl">
            <Link href="/competitions" className="text-sm font-semibold text-cyan-200 hover:text-white">
              &lt;- กลับไปรายการแข่งขัน
            </Link>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
              บันทึกจากสนามแข่งขัน
            </p>
            <h1 className="tech-heading mt-5 max-w-5xl text-5xl font-black text-white sm:text-7xl">
              {String(competition.title)}
            </h1>
            {competition.organization ? (
              <p className="mt-6 text-xl text-slate-400">{String(competition.organization)}</p>
            ) : null}
          </article>
        </section>

        <article className="section-mid px-5 py-24">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_0.7fr]">
            <div>
              {competition.image_url ? (
                <Image
                  src={String(competition.image_url)}
                  alt={`${String(competition.title)} ภาพการแข่งขัน`}
                  width={1400}
                  height={820}
                  className="max-h-[620px] w-full object-cover"
                  priority
                />
              ) : null}
              {competition.description ? (
                <section className="mt-12">
                  <SectionHeader eyebrow="เรื่องราวของเวทีนี้" title="การแข่งขันเป็นอย่างไร" dark />
                  <p className="mt-6 whitespace-pre-line text-lg leading-9 text-slate-300">
                    {String(competition.description)}
                  </p>
                </section>
              ) : null}
            </div>

            <aside className="grid content-start gap-8">
              <section className="hud-panel p-6">
                <h2 className="text-2xl font-semibold text-white">สิ่งที่ได้รับ</h2>
                {competition.takeaways ? (
                  <p className="mt-5 whitespace-pre-line text-base leading-8 text-slate-300">
                    {String(competition.takeaways)}
                  </p>
                ) : (
                  <p className="mt-5 text-base leading-8 text-slate-500">
                    ยังไม่ได้เพิ่มรายละเอียดส่วนนี้
                  </p>
                )}
              </section>

              <dl className="grid gap-4 text-base">
                {competition.result ? (
                  <div className="border-b border-cyan-300/15 pb-3">
                    <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">ผลการแข่งขัน</dt>
                    <dd className="mt-1 text-slate-300">{String(competition.result)}</dd>
                  </div>
                ) : null}
                {competition.event_date ? (
                  <div className="border-b border-cyan-300/15 pb-3">
                    <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">วันที่แข่งขัน</dt>
                    <dd className="mt-1 text-slate-300">{String(competition.event_date)}</dd>
                  </div>
                ) : null}
              </dl>
            </aside>
          </div>
        </article>
      </main>
    </PageShell>
  );
}
