import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/project";

export function ProjectCard({ project, variant = "stacked" }: { index?: number; project: Project; variant?: "feature" | "wide" | "stacked" }) {
  const feature = variant === "feature";
  const articleClass = ["group hud-panel grid overflow-hidden transition duration-500 hover:-translate-y-1", feature ? "md:grid-cols-[1.25fr_0.75fr]" : ""].join(" ");
  const imageClass = ["relative overflow-hidden bg-slate-900", feature ? "min-h-80 md:min-h-full" : "h-60"].join(" ");
  const contentClass = ["flex min-w-0 flex-col p-5", feature ? "md:p-8" : ""].join(" ");

  return (
    <article className={articleClass}>
      <div className={imageClass}>
        {project.cover_image_url ? (
          <Image
            src={project.cover_image_url}
            alt={project.title + " ภาพผลงาน"}
            fill
            sizes={feature ? "70vw" : "50vw"}
            className="object-cover transition duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="h-full bg-[radial-gradient(circle_at_70%_30%,rgba(34,211,238,0.3),transparent_20%),linear-gradient(145deg,#13243b,#03070d)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#03070d]/80 via-transparent to-transparent" />
      </div>
      <div className={contentClass}>
        <h2 className={feature ? "break-words text-3xl font-semibold text-white sm:text-4xl" : "break-words text-2xl font-semibold text-white"}>{project.title}</h2>
        {project.short_description ? <p className="mt-3 line-clamp-3 text-base leading-7 text-slate-400">{project.short_description}</p> : null}
        <Link href={`/projects/${project.slug}`} className="mt-6 inline-flex w-fit items-center gap-3 text-sm font-semibold text-cyan-200 transition hover:text-white">
          ดูรายละเอียด <span aria-hidden="true">-&gt;</span>
        </Link>
      </div>
    </article>
  );
}
