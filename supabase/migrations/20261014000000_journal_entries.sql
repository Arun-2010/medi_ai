-- Mood journal: one row per finished session.
-- Run this once in Supabase dashboard → SQL Editor.

create table if not exists public.journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  mood_id text not null check (mood_id in ('stressed', 'sleep', 'exam', 'focus', 'low', 'quick')),
  minutes integer not null check (minutes between 1 and 60),
  feeling text not null check (feeling in ('calmer', 'same', 'not_better')),
  note text check (char_length(note) <= 300),
  created_at timestamptz not null default now()
);

create index if not exists journal_entries_user_created_idx
  on public.journal_entries (user_id, created_at desc);

-- Each person can only see, add and delete their own entries.
alter table public.journal_entries enable row level security;

create policy "Read own journal entries"
  on public.journal_entries for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "Add own journal entries"
  on public.journal_entries for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Delete own journal entries"
  on public.journal_entries for delete to authenticated
  using ((select auth.uid()) = user_id);
