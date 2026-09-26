export type ProjectImage = {
  id: string;
  project_id: string;
  image_url: string | null;
  caption: string | null;
  sort_order: number | null;
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  short_description: string | null;
  full_description: string | null;
  cover_image_url: string | null;
  role: string | null;
  technologies: string[] | null;
  github_url: string | null;
  demo_url: string | null;
  competition: string | null;
  award: string | null;
  started_at: string | null;
  ended_at: string | null;
  featured: boolean | null;
  published: boolean | null;
  sort_order: number | null;
  created_at: string | null;
  updated_at: string | null;
  project_images?: ProjectImage[];
};

export type ProjectActionState = {
  status: "idle" | "success" | "error";
  message: string;
};
