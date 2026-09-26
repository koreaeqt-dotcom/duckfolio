-- Duckfolio competition entries
-- Run this once in Supabase SQL Editor before using /admin/competitions.

-- Keep the migration standalone in case the main RLS file has not been run yet.
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

create table if not exists public.competitions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  organization text,
  event_date date,
  result text,
  description text,
  takeaways text,
  image_url text,
  published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.competitions enable row level security;

drop policy if exists "Duckfolio public can read published competitions" on public.competitions;
create policy "Duckfolio public can read published competitions"
on public.competitions
for select
to anon, authenticated
using (published = true);

drop policy if exists "Duckfolio admins can manage competitions" on public.competitions;
create policy "Duckfolio admins can manage competitions"
on public.competitions
for all
to authenticated
using (public.is_duckfolio_admin())
with check (public.is_duckfolio_admin());
