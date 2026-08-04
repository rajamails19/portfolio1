-- MathDreams visitor analytics. Run this in the Supabase SQL editor.
create extension if not exists pgcrypto;

create table if not exists public.mathraja_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  visitor_id uuid not null,
  session_id uuid not null,
  user_id uuid references auth.users(id) on delete set null default auth.uid(),
  event_name text not null check (char_length(event_name) between 1 and 80),
  path text check (path is null or char_length(path) <= 500),
  duration_seconds integer check (duration_seconds is null or duration_seconds between 0 and 86400),
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists mathraja_events_created_at_idx
  on public.mathraja_events (created_at desc);
create index if not exists mathraja_events_visitor_id_idx
  on public.mathraja_events (visitor_id, created_at desc);
create index if not exists mathraja_events_user_id_idx
  on public.mathraja_events (user_id, created_at desc)
  where user_id is not null;

alter table public.mathraja_events enable row level security;

revoke all on public.mathraja_events from anon, authenticated;
grant insert on public.mathraja_events to anon, authenticated;

drop policy if exists "visitors can record mathraja events" on public.mathraja_events;
create policy "visitors can record mathraja events"
  on public.mathraja_events
  for insert
  to anon, authenticated
  with check (user_id is null or user_id = auth.uid());

-- No SELECT policy is intentionally created: raw visitor activity is visible only
-- to project administrators in Supabase, not to site visitors.

-- Handy admin queries:
-- Daily visitors and signed-in visitors
-- select date_trunc('day', created_at) day,
--        count(distinct visitor_id) visitors,
--        count(distinct user_id) signed_in_visitors
-- from public.mathraja_events group by 1 order by 1 desc;

-- Most active visitors over the last 30 days
-- select visitor_id, user_id, sum(duration_seconds) active_seconds
-- from public.mathraja_events
-- where event_name = 'active_time' and created_at > now() - interval '30 days'
-- group by visitor_id, user_id order by active_seconds desc limit 100;

-- Identified visitors (run as a project administrator)
-- select u.email, e.user_id,
--        min(e.created_at) first_seen,
--        max(e.created_at) last_seen,
--        sum(e.duration_seconds) filter (where e.event_name = 'active_time') active_seconds
-- from public.mathraja_events e
-- join auth.users u on u.id = e.user_id
-- group by u.email, e.user_id order by last_seen desc;

-- Popular pages
-- select path, count(*) page_views
-- from public.mathraja_events
-- where event_name = 'page_view'
-- group by path order by page_views desc;
