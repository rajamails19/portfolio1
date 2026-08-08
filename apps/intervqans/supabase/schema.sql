-- ═══════════════════════════════════════════════════════════════════════════
-- StudyDeck (intervqans) — Page Editor persistence
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- (Shared project — this only adds a new, uniquely-named table. It does not
--  touch any existing table used by other apps.)
-- ═══════════════════════════════════════════════════════════════════════════

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- One row per route path (e.g. "/", "/theory", "/terms"). `edits` holds the
-- same { blocks, customBlocks } shape the old localStorage version used.
CREATE TABLE IF NOT EXISTS public.intervqans_page_edits (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pathname   TEXT NOT NULL UNIQUE,
  edits      JSONB NOT NULL DEFAULT '{"blocks": {}, "customBlocks": []}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS intervqans_page_edits_pathname_idx
  ON public.intervqans_page_edits(pathname);

-- Auto-update updated_at (reuses the same trigger function other apps in
-- this project already define — CREATE OR REPLACE is safe to re-run).
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS intervqans_page_edits_set_updated_at ON public.intervqans_page_edits;
CREATE TRIGGER intervqans_page_edits_set_updated_at
  BEFORE UPDATE ON public.intervqans_page_edits
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ─── Table grants ───────────────────────────────────────────────────────────
-- RLS policies filter rows, but Postgres still requires explicit GRANT for
-- the role to touch the table at all (same requirement as this project's
-- other tables — see apple-notes-clone/supabase/schema.sql).
GRANT SELECT, INSERT, UPDATE, DELETE ON public.intervqans_page_edits TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.intervqans_page_edits TO authenticated;

-- ─── RLS ──────────────────────────────────────────────────────────────────
-- StudyDeck has no login system — the Page Editor is a personal tool gated
-- only by knowing the pencil icon exists. Read/write are both open to the
-- anon key (same trust level the old localStorage version had: anyone with
-- the page open in edit mode could change it). Tighten this later with
-- Supabase Auth if you want editing restricted to just you.
ALTER TABLE public.intervqans_page_edits ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "intervqans_page_edits: anyone read"  ON public.intervqans_page_edits;
DROP POLICY IF EXISTS "intervqans_page_edits: anyone write" ON public.intervqans_page_edits;

CREATE POLICY "intervqans_page_edits: anyone read"
  ON public.intervqans_page_edits FOR SELECT
  USING (true);

CREATE POLICY "intervqans_page_edits: anyone write"
  ON public.intervqans_page_edits FOR ALL
  USING (true)
  WITH CHECK (true);
