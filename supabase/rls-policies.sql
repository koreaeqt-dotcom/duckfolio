-- Duckfolio RLS policies
-- Run this file in Supabase SQL Editor after confirming the listed tables exist.
-- These policies keep public content readable only when published and keep all
-- writes behind the authenticated membership in public.admins.

alter table public.admins enable row level security;

drop policy if exists "Duckfolio users can read own admin membership" on public.admins;
create policy "Duckfolio users can read own admin membership"
on public.admins
for select
to authenticated
using (user_id = auth.uid());

create or replace function public.is_duckfolio_admin()
returns boolean
language sql
stable
security invoker
set search_path = public
as $$
  select exists (
    select 1
    from public.admins
    where user_id = auth.uid()
  );
$$;

-- Keep legacy policies safe when they still reference public.is_admin().
-- This function must not run as SECURITY DEFINER.
create or replace function public.is_admin()
returns boolean
language sql
stable
security invoker
set search_path = public
as $$
  select exists (
    select 1
    from public.admins
    where user_id = auth.uid()
  );
$$;

-- Profile is intentionally public because it powers the portfolio identity block.
alter table public.profile enable row level security;
drop policy if exists "Duckfolio public can read profile" on public.profile;
create policy "Duckfolio public can read profile"
on public.profile
for select
to anon, authenticated
using (true);

drop policy if exists "Duckfolio admins can manage profile" on public.profile;
create policy "Duckfolio admins can manage profile"
on public.profile
for all
to authenticated
using (public.is_duckfolio_admin())
with check (public.is_duckfolio_admin());

-- Published public content and admin CRUD policies.
do $$
declare
  table_name text;
begin
  foreach table_name in array array['projects', 'achievements', 'competitions', 'certificates', 'skills', 'gallery', 'timeline'] loop
    if to_regclass(format('public.%I', table_name)) is null then
      continue;
    end if;

    execute format('alter table public.%I enable row level security', table_name);

    execute format('drop policy if exists "Duckfolio public can read published %1$s" on public.%1$I', table_name);
    execute format('create policy "Duckfolio public can read published %1$s" on public.%1$I for select to anon, authenticated using (published = true)', table_name);

    execute format('drop policy if exists "Duckfolio admins can manage %1$s" on public.%1$I', table_name);
    execute format('create policy "Duckfolio admins can manage %1$s" on public.%1$I for all to authenticated using (public.is_duckfolio_admin()) with check (public.is_duckfolio_admin())', table_name);
  end loop;
end;
$$;

alter table public.project_images enable row level security;
drop policy if exists "Duckfolio public can read images for published projects" on public.project_images;
create policy "Duckfolio public can read images for published projects"
on public.project_images
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.projects
    where projects.id = project_images.project_id
      and projects.published = true
  )
);

drop policy if exists "Duckfolio admins can manage project images" on public.project_images;
create policy "Duckfolio admins can manage project images"
on public.project_images
for all
to authenticated
using (public.is_duckfolio_admin())
with check (public.is_duckfolio_admin());

-- The bucket remains public for portfolio images, but only admins can upload,
-- replace, or delete objects.
drop policy if exists "Duckfolio public can view portfolio images" on storage.objects;
create policy "Duckfolio public can view portfolio images"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'portfolio-images');

drop policy if exists "Duckfolio admins can upload portfolio images" on storage.objects;
create policy "Duckfolio admins can upload portfolio images"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'portfolio-images' and public.is_duckfolio_admin());

drop policy if exists "Duckfolio admins can update portfolio images" on storage.objects;
create policy "Duckfolio admins can update portfolio images"
on storage.objects
for update
to authenticated
using (bucket_id = 'portfolio-images' and public.is_duckfolio_admin())
with check (bucket_id = 'portfolio-images' and public.is_duckfolio_admin());

drop policy if exists "Duckfolio admins can delete portfolio images" on storage.objects;
create policy "Duckfolio admins can delete portfolio images"
on storage.objects
for delete
to authenticated
using (bucket_id = 'portfolio-images' and public.is_duckfolio_admin());
