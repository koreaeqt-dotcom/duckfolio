"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils/slug";
import type { ProjectActionState } from "@/types/project";

function textValue(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").trim();
  return value.length > 0 ? value : null;
}

function dateValue(formData: FormData, key: string) {
  return textValue(formData, key);
}

function numberValue(formData: FormData, key: string) {
  const value = textValue(formData, key);
  return value ? Number(value) : 0;
}

function projectPayload(formData: FormData) {
  const title = textValue(formData, "title") ?? "";
  const manualSlug = textValue(formData, "slug");
  const technologies = String(formData.get("technologies") ?? "")
    .split(",")
    .map((technology) => technology.trim())
    .filter(Boolean);

  return {
    title,
    slug: manualSlug ?? slugify(title),
    short_description: textValue(formData, "short_description"),
    full_description: textValue(formData, "full_description"),
    cover_image_url: textValue(formData, "cover_image_url"),
    role: textValue(formData, "role"),
    technologies,
    github_url: textValue(formData, "github_url"),
    demo_url: textValue(formData, "demo_url"),
    competition: textValue(formData, "competition"),
    award: textValue(formData, "award"),
    started_at: dateValue(formData, "started_at"),
    ended_at: dateValue(formData, "ended_at"),
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
    sort_order: numberValue(formData, "sort_order"),
  };
}

async function validateProjectSlug(slug: string, currentProjectId?: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("id")
    .eq("slug", slug)
    .limit(1)
    .maybeSingle();

  if (error) {
    return "Could not validate the project slug. Please try again.";
  }

  if (data && data.id !== currentProjectId) {
    return "That slug is already used by another project.";
  }

  return null;
}

async function replaceProjectImages(projectId: string, formData: FormData) {
  const imageUrls = formData
    .getAll("project_image_url")
    .map((value) => String(value).trim())
    .filter(Boolean);
  const captions = formData
    .getAll("project_image_caption")
    .map((value) => String(value).trim());

  const supabase = await createClient();
  const { error: deleteError } = await supabase
    .from("project_images")
    .delete()
    .eq("project_id", projectId);

  if (deleteError) {
    return `ลบภาพเดิมไม่สำเร็จ: ${deleteError.message}`;
  }

  if (imageUrls.length === 0) {
    return null;
  }

  const { error: insertError } = await supabase.from("project_images").insert(
    imageUrls.map((imageUrl, index) => ({
      project_id: projectId,
      image_url: imageUrl,
      caption: captions[index] || null,
      sort_order: index,
    })),
  );

  return insertError ? `บันทึกภาพไม่สำเร็จ: ${insertError.message}` : null;
}

export async function saveProject(
  _previousState: ProjectActionState,
  formData: FormData,
): Promise<ProjectActionState> {
  await requireAdmin();

  const payload = projectPayload(formData);
  const projectId = textValue(formData, "id") ?? undefined;

  if (!payload.title) {
    return { status: "error", message: "Project title is required." };
  }

  if (!payload.slug) {
    return { status: "error", message: "Project slug is required." };
  }

  const slugError = await validateProjectSlug(payload.slug, projectId);

  if (slugError) {
    return { status: "error", message: slugError };
  }

  const supabase = await createClient();

  if (projectId) {
    const { error } = await supabase
      .from("projects")
      .update(payload)
      .eq("id", projectId);

    if (error) {
      return { status: "error", message: error.message };
    }

    const imageError = await replaceProjectImages(projectId, formData);

    if (imageError) {
      return { status: "error", message: imageError };
    }
    revalidatePath("/admin/projects");
    revalidatePath(`/projects/${payload.slug}`);

    return { status: "success", message: "Project saved." };
  }

  const { data, error } = await supabase
    .from("projects")
    .insert(payload)
    .select("id")
    .single();

  if (error) {
    return { status: "error", message: error.message };
  }

  const imageError = await replaceProjectImages(data.id, formData);

  if (imageError) {
    return { status: "error", message: imageError };
  }
  revalidatePath("/admin/projects");
  redirect(`/admin/projects/${data.id}/edit`);
}

export async function deleteProject(projectId: string) {
  await requireAdmin();

  const supabase = await createClient();
  const { error: imageError } = await supabase
    .from("project_images")
    .delete()
    .eq("project_id", projectId);

  if (imageError) {
    throw new Error(`ลบภาพของผลงานไม่สำเร็จ: ${imageError.message}`);
  }

  const { error } = await supabase.from("projects").delete().eq("id", projectId);

  if (error) {
    throw new Error(`ลบผลงานไม่สำเร็จ: ${error.message}`);
  }

  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}
