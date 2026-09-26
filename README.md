# Duckfolio

Duckfolio is a personal portfolio website with a built-in admin CMS. The public site presents projects, achievements, certificates, skills, timeline entries, gallery photos, and profile information with a subtle night-pond visual identity.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Auth
- Supabase Postgres
- Supabase Storage

## Local Setup

Install dependencies:

```bash
npm install
```

Create `.env.local` with:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Supabase Requirements

Duckfolio expects these tables to exist:

- `profile`
- `projects`
- `project_images`
- `achievements`
- `competitions`
- `certificates`
- `skills`
- `gallery`
- `timeline`
- `admins`

Public pages only query rows with `published = true` for publishable content. The admin CMS requires a signed-in Supabase Auth user whose `auth.users.id` matches `public.admins.user_id`.

Storage uploads use the public bucket:

```text
portfolio-images
```

Make sure your RLS and Storage policies allow authorized admins to manage CMS rows and upload files, while public visitors can only read published content and public images.

The ready-to-run policy file is [`supabase/rls-policies.sql`](./supabase/rls-policies.sql). Run it in the Supabase SQL Editor. It includes the required admin membership policy:

```sql
create policy "Duckfolio users can read own admin membership"
on public.admins
for select
to authenticated
using (user_id = auth.uid());
```

This project never uses `SUPABASE_SECRET_KEY`, `service_role`, hard-coded admin emails, or public access to `public.admins`.

For competition entries, run [`supabase/competitions.sql`](./supabase/competitions.sql). It creates the `competitions` table and its required admin membership helper, allows public visitors to read only published entries, and keeps all writes admin-only. It can be run by itself or after the main RLS policy file.

## Routes

Public routes:

- `/`
- `/projects`
- `/projects/[slug]`
- `/achievements`
- `/competitions`
- `/competitions/[id]`
- `/gallery`

Admin routes:

- `/admin`
- `/admin/login`
- `/admin/projects`
- `/admin/projects/new`
- `/admin/projects/[id]/edit`
- `/admin/achievements`
- `/admin/competitions`
- `/admin/certificates`
- `/admin/gallery`
- `/admin/skills`
- `/admin/timeline`
- `/admin/profile`

## Admin Login

There is no public signup page. Create the admin user in Supabase Auth, then add that user to `public.admins`. Unauthenticated visitors to `/admin` are redirected to `/admin/login`. Signed-in users who are not admins are also redirected away from the CMS.

## Deployment

Deploy to Vercel as a standard Next.js app. Add the same Supabase environment variables in the Vercel project settings, and confirm the Supabase URL host is available at build time so Next.js can allow optimized images from your project.

## Checks

```bash
npm run lint
npm run build
```
