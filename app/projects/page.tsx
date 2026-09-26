import { PageShell } from "@/components/portfolio/page-shell";
import { ProjectCard } from "@/components/portfolio/project-card";
import { EmptyState } from "@/components/portfolio/visual-system";
import { getPublishedProjects } from "@/lib/portfolio/data";
import Link from "next/link";

export const metadata = { title: "ผลงาน | Somprasong Thunnok", description: "รวมผลงานของ Somprasong Thunnok" };

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <PageShell>
      <main>
        <section className="relative overflow-hidden border-b border-cyan-300/10 bg-[#050a12] px-5 py-24 sm:py-32">
          <div className="star-field absolute inset-0" />
          <div className="relative mx-auto max-w-7xl">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h1 className="tech-heading text-5xl font-black text-white sm:text-7xl">ผลงาน</h1>
              <Link href="/competitions" className="text-sm font-semibold text-cyan-200 hover:text-white">
                ดูรายการแข่งขัน &gt;
              </Link>
            </div>
          </div>
        </section>
        <section className="section-mid px-5 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-6">
              {projects.length > 0 ? (
                projects.map((project, index) => (
                  <div key={project.id} className={index % 4 === 0 ? "lg:col-span-6" : "lg:col-span-3"}>
                    <ProjectCard project={project} variant={index % 4 === 0 ? "feature" : "stacked"} />
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
