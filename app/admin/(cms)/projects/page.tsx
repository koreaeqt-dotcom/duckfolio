import Link from "next/link";
import { DeleteProjectButton } from "@/app/admin/(cms)/projects/delete-project-button";
import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/types/project";

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("id,title,slug,short_description,featured,published,sort_order,created_at")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  const projects = (data ?? []) as Project[];

  return (
    <section className="mx-auto max-w-6xl">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-cyan-200">
            ผลงาน
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-white">ผลงาน</h1>
          <p className="mt-3 max-w-2xl text-slate-400">
            เพิ่ม แก้ไข และเลือกผลงานที่อยากแสดงบน Portfolio
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="rounded-md bg-cyan-300 px-4 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
        >
          เพิ่มผลงาน
        </Link>
      </div>

      {error ? (
        <p className="mt-6 rounded-md border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {error.message}
        </p>
      ) : null}

      <div className="mt-8 grid gap-4">
        {projects.length > 0 ? (
          projects.map((project) => (
            <article
              key={project.id}
              className="rounded-md border border-white/10 bg-white/[0.03] p-5"
            >
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-semibold text-white">
                      {project.title}
                    </h2>
                    {project.published ? (
                      <span className="rounded-md bg-cyan-300/15 px-2 py-1 text-xs text-cyan-100">
                        เผยแพร่แล้ว
                      </span>
                    ) : (
                      <span className="rounded-md bg-amber-300/15 px-2 py-1 text-xs text-amber-100">
                        ฉบับร่าง
                      </span>
                    )}
                    {project.featured ? (
                      <span className="rounded-md bg-white/10 px-2 py-1 text-xs text-slate-200">
                        แนะนำ
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 text-sm text-slate-500">/{project.slug}</p>
                  <p className="mt-3 max-w-3xl text-slate-400">
                    {project.short_description || "ยังไม่มีคำอธิบายสั้น ๆ"}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Link
                    href={`/admin/projects/${project.id}/edit`}
                    className="text-sm font-medium text-cyan-200 hover:text-cyan-100"
                  >
                    แก้ไข
                  </Link>
                  <DeleteProjectButton projectId={project.id} />
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-md border border-dashed border-white/10 p-8 text-center">
            <h2 className="text-lg font-semibold text-white">
              ยังไม่มีผลงาน
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              เพิ่มผลงานแรกของคุณเพื่อเริ่มเติมเนื้อหาให้ Portfolio
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
