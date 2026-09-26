import { notFound } from "next/navigation";
import { DeleteProjectButton } from "@/app/admin/(cms)/projects/delete-project-button";
import { ProjectForm } from "@/app/admin/(cms)/projects/project-form";
import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/types/project";

export default async function AdminEditProjectPage({
  params,
}: PageProps<"/admin/projects/[id]/edit">) {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*,project_images(*)")
    .eq("id", id)
    .single();

  if (error || !data) {
    notFound();
  }

  const project = data as Project;

  return (
    <section className="mx-auto max-w-5xl">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-cyan-200">
            ผลงาน
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-white">
            แก้ไขผลงาน
          </h1>
          <p className="mt-3 max-w-2xl text-slate-400">
            แก้ไขรายละเอียด สถานะการเผยแพร่ ภาพปก และภาพเพิ่มเติมของผลงาน
          </p>
        </div>
        <DeleteProjectButton projectId={project.id} />
      </div>
      <ProjectForm project={project} />
    </section>
  );
}
