import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/portfolio/page-shell";
import { ProjectCard } from "@/components/portfolio/project-card";
import { EmptyState } from "@/components/portfolio/visual-system";
import { getPublishedProjects } from "@/lib/portfolio/data";

export default async function Home() {
  const projects = await getPublishedProjects(6);

  return (
    <PageShell>
      <main>
        <section className="relative isolate flex min-h-[calc(100svh-5rem)] items-end overflow-hidden bg-[#050a12] px-5 pb-16 pt-28 sm:pb-24">
          <div className="space-grid absolute inset-0 -z-10" />
          <Image
            src="/visuals/somprasong-mecha-hero-fullbody.png"
            alt="Somprasong ในชุดหุ่นยนต์"
            fill
            priority
            className="hero-image absolute inset-0 -z-20 object-cover"
            sizes="100vw"
          />
          <div className="hero-vignette absolute inset-0 -z-10" />
          <div className="hero-bottom absolute inset-x-0 bottom-0 z-0 h-52" />
          <div className="relative z-10 mx-auto w-full max-w-7xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">Portfolio</p>
            <h1 className="tech-heading mt-5 max-w-3xl text-5xl font-black leading-[0.92] text-white sm:text-7xl lg:text-8xl">
              Somprasong <span className="text-cyan-300">Thunnok</span>
            </h1>
            <p className="mt-6 text-lg text-slate-200 sm:text-xl">ผลงานที่ทำจากการลอง ลงมือ และเรียนรู้</p>
            <Link
              href="/projects"
              className="energy-button mt-8 inline-flex items-center gap-4 border border-cyan-200 bg-cyan-300 px-7 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-white"
            >
              ดูผลงาน <span aria-hidden="true">-&gt;</span>
            </Link>
          </div>
        </section>

        <section id="projects" className="section-dark px-5 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-end justify-between gap-6 border-b border-white/10 pb-5">
              <h2 className="tech-heading text-3xl font-semibold text-white sm:text-5xl">ผลงาน</h2>
              <span className="text-sm text-slate-500">{projects.length} รายการ</span>
            </div>
            <div className="mt-8 grid gap-5 lg:grid-cols-6">
              {projects.length > 0 ? (
                projects.map((project, index) => (
                  <div key={project.id} className={index === 0 ? "lg:col-span-6" : "lg:col-span-3"}>
                    <ProjectCard project={project} index={index} variant={index === 0 ? "feature" : "stacked"} />
                  </div>
                ))
              ) : (
                <div className="lg:col-span-6">
                  <EmptyState dark>ยังไม่มีผลงานที่เผยแพร่</EmptyState>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
