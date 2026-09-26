import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/types/project";

export type Profile = {
  full_name: string | null;
  headline: string | null;
  bio: string | null;
  school: string | null;
  location: string | null;
  email: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  avatar_url: string | null;
};

export type ContentItem = Record<string, string | number | boolean | null>;

export async function getProfile() {
  const supabase = await createClient();
  const { data } = await supabase.from("profile").select("*").limit(1).maybeSingle();
  return data as Profile | null;
}

export async function getPublishedProjects(limit?: number, featuredOnly = false) {
  const supabase = await createClient();
  let query = supabase
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("featured", { ascending: false })
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (featuredOnly) {
    query = query.eq("featured", true);
  }

  if (limit) {
    query = query.limit(limit);
  }

  const { data } = await query;
  return (data ?? []) as Project[];
}

export async function getProjectBySlug(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*,project_images(*)")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!data) {
    notFound();
  }

  return data as Project;
}

export async function getPublishedContent(table: string, limit?: number) {
  const supabase = await createClient();
  let query = supabase
    .from(table)
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (limit) {
    query = query.limit(limit);
  }

  const { data } = await query;
  return (data ?? []) as ContentItem[];
}

export async function getPublishedCompetition(id: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("competitions")
    .select("*")
    .eq("id", id)
    .eq("published", true)
    .maybeSingle();

  if (!data) {
    notFound();
  }

  return data as ContentItem;
}
