"use client";

import Link from "next/link";
import { useActionState } from "react";
import { ImageUpload } from "@/components/admin/image-upload";
import { saveProject } from "@/app/admin/(cms)/projects/actions";
import { slugify } from "@/lib/utils/slug";
import type { Project, ProjectActionState } from "@/types/project";
import { ProjectImagesField } from "./project-images-field";

type ProjectFormProps = {
  project?: Project | null;
};

const initialState: ProjectActionState = {
  status: "idle",
  message: "",
};

function Field({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-200">{label}</span>
      {children}
    </label>
  );
}

function FormSection({
  children,
  description,
  title,
}: {
  children: React.ReactNode;
  description: string;
  title: string;
}) {
  return (
    <section className="grid gap-5 rounded-md border border-white/10 bg-white/[0.03] p-5">
      <div>
        <h2 className="text-base font-semibold text-white">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
      {children}
    </section>
  );
}

const inputClass =
  "mt-2 w-full rounded-md border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300";

export function ProjectForm({ project }: ProjectFormProps) {
  const [state, formAction, isPending] = useActionState(
    saveProject,
    initialState,
  );
  const pathKey = project?.id ?? "draft";
  const defaultSlug = project?.slug ?? "";

  return (
    <form action={formAction} className="grid gap-6">
      <input type="hidden" name="id" value={project?.id ?? ""} />

      <FormSection
        title="ข้อมูลพื้นฐาน"
        description="ชื่อ คำอธิบาย และภาพหลักที่จะแสดงบนหน้า Portfolio"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="ชื่อผลงาน">
            <input
              name="title"
              required
              defaultValue={project?.title ?? ""}
              onBlur={(event) => {
                const form = event.currentTarget.form;
                const slugInput = form?.elements.namedItem("slug");
                if (
                  slugInput instanceof HTMLInputElement &&
                  !slugInput.value.trim()
                ) {
                  slugInput.value = slugify(event.currentTarget.value);
                }
              }}
              className={inputClass}
            />
          </Field>

          <Field label="Slug สำหรับ URL">
            <input
              name="slug"
              required
              defaultValue={defaultSlug}
              className={inputClass}
            />
          </Field>
        </div>

        <Field label="คำอธิบายสั้น ๆ">
          <textarea
            name="short_description"
            rows={3}
            defaultValue={project?.short_description ?? ""}
            className={inputClass}
          />
        </Field>

        <Field label="เรื่องราวของผลงาน">
          <textarea
            name="full_description"
            rows={8}
            defaultValue={project?.full_description ?? ""}
            className={inputClass}
          />
        </Field>

        <ImageUpload
          label="ภาพปกผลงาน"
          name="cover_image_url"
          initialUrl={project?.cover_image_url}
          pathPrefix={`projects/${pathKey}/cover`}
        />
      </FormSection>

      <FormSection
        title="รายละเอียดผลงาน"
        description="ข้อมูลเพิ่มเติม ลิงก์ และช่วงเวลาของผลงาน"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="บทบาทของผม">
            <input name="role" defaultValue={project?.role ?? ""} className={inputClass} />
          </Field>
          <Field label="เครื่องมือที่ใช้">
            <input
              name="technologies"
              defaultValue={project?.technologies?.join(", ") ?? ""}
              placeholder="React, Supabase, Tailwind"
              className={inputClass}
            />
          </Field>
          <Field label="ลิงก์ GitHub">
            <input name="github_url" defaultValue={project?.github_url ?? ""} className={inputClass} />
          </Field>
          <Field label="ลิงก์ทดลองใช้">
            <input name="demo_url" defaultValue={project?.demo_url ?? ""} className={inputClass} />
          </Field>
          <Field label="การแข่งขันหรือเวที">
            <input name="competition" defaultValue={project?.competition ?? ""} className={inputClass} />
          </Field>
          <Field label="รางวัล">
            <input name="award" defaultValue={project?.award ?? ""} className={inputClass} />
          </Field>
          <Field label="วันที่เริ่มต้น">
            <input
              type="date"
              name="started_at"
              defaultValue={project?.started_at ?? ""}
              className={inputClass}
            />
          </Field>
          <Field label="วันที่สิ้นสุด">
            <input
              type="date"
              name="ended_at"
              defaultValue={project?.ended_at ?? ""}
              className={inputClass}
            />
          </Field>
          <Field label="ลำดับการแสดงผล">
            <input
              type="number"
              name="sort_order"
              defaultValue={project?.sort_order ?? 0}
              className={inputClass}
            />
          </Field>
        </div>
      </FormSection>

      <FormSection
        title="การเผยแพร่"
        description="เลือกว่าจะให้ผลงานนี้แสดงบนเว็บไซต์หรือเป็นผลงานแนะนำหรือไม่"
      >
        <label className="flex items-center gap-3 text-sm text-slate-200">
          <input
            type="checkbox"
            name="published"
            defaultChecked={Boolean(project?.published)}
            className="h-4 w-4 accent-cyan-300"
          />
          เผยแพร่บนเว็บไซต์
        </label>
        <label className="flex items-center gap-3 text-sm text-slate-200">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={Boolean(project?.featured)}
            className="h-4 w-4 accent-cyan-300"
          />
          แนะนำผลงานนี้
        </label>
      </FormSection>

      <ProjectImagesField
        images={project?.project_images}
        pathPrefix={`projects/${pathKey}`}
      />

      {state.message ? (
        <p
          className={`rounded-md border px-4 py-3 text-sm ${
            state.status === "success"
              ? "border-cyan-300/30 bg-cyan-300/10 text-cyan-100"
              : "border-red-400/30 bg-red-500/10 text-red-100"
          }`}
        >
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-cyan-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? "กำลังบันทึก..." : "บันทึกผลงาน"}
        </button>
        <Link
          href="/admin/projects"
          className="rounded-md border border-white/10 px-5 py-3 text-center font-semibold text-slate-200 transition hover:border-cyan-300/40"
        >
          ยกเลิก
        </Link>
      </div>
    </form>
  );
}
