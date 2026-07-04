-- ═══════════════════════════════════════════════════════════════════════════
-- Lumen — Saved Folders & Items Schema
-- Run in: Supabase Dashboard → SQL Editor → New Query
-- Project: bbzyyxomctmdhownbilb.supabase.co
-- ═══════════════════════════════════════════════════════════════════════════

-- ─── Lumen Folders ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.lumen_folders (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  gradient    TEXT NOT NULL DEFAULT 'from-pink-300 to-rose-300',
  emoji       TEXT NOT NULL DEFAULT '📁',
  built_in    BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS lumen_folders_user_id_idx ON public.lumen_folders(user_id);

-- ─── Lumen Saved Items ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.lumen_saved_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  folder_id   UUID NOT NULL REFERENCES public.lumen_folders(id) ON DELETE CASCADE,
  post_id     TEXT NOT NULL,
  title       TEXT NOT NULL DEFAULT '',
  tag         TEXT NOT NULL DEFAULT '',
  author      TEXT NOT NULL DEFAULT '',
  img         TEXT,
  kind        TEXT NOT NULL DEFAULT 'image',
  saved_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, folder_id, post_id)
);

CREATE INDEX IF NOT EXISTS lumen_items_user_id_idx   ON public.lumen_saved_items(user_id);
CREATE INDEX IF NOT EXISTS lumen_items_folder_id_idx ON public.lumen_saved_items(folder_id);
CREATE INDEX IF NOT EXISTS lumen_items_saved_at_idx  ON public.lumen_saved_items(saved_at DESC);

-- ─── Row Level Security ───────────────────────────────────────────────────────
-- Users (including anonymous) can only see/edit their own data

ALTER TABLE public.lumen_folders     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lumen_saved_items ENABLE ROW LEVEL SECURITY;

-- Folders policies
CREATE POLICY "Users can view own folders"
  ON public.lumen_folders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own folders"
  ON public.lumen_folders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own folders"
  ON public.lumen_folders FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own folders"
  ON public.lumen_folders FOR DELETE
  USING (auth.uid() = user_id);

-- Saved items policies
CREATE POLICY "Users can view own saved items"
  ON public.lumen_saved_items FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saved items"
  ON public.lumen_saved_items FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved items"
  ON public.lumen_saved_items FOR DELETE
  USING (auth.uid() = user_id);

-- ─── Realtime ────────────────────────────────────────────────────────────────
-- Enable in Supabase Dashboard: Database → Replication → toggle lumen_folders + lumen_saved_items
