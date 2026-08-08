-- ═══════════════════════════════════════════════════════════════════════════
-- SheelTechLearn — Page Editor persistence
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- (Shared project — this only adds a new, uniquely-named table. It does not
--  touch any existing table used by other apps, including intervqans_page_edits.)
-- ═══════════════════════════════════════════════════════════════════════════

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- One row per route path (e.g. "/", "/theory"). `edits` holds the same
-- { blocks, customBlocks } shape the old localStorage version used.
CREATE TABLE IF NOT EXISTS public.sheeltechlearn_page_edits (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pathname   TEXT NOT NULL UNIQUE,
  edits      JSONB NOT NULL DEFAULT '{"blocks": {}, "customBlocks": []}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS sheeltechlearn_page_edits_pathname_idx
  ON public.sheeltechlearn_page_edits(pathname);

-- Auto-update updated_at (reuses the same trigger function other apps in
-- this project already define — CREATE OR REPLACE is safe to re-run).
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS sheeltechlearn_page_edits_set_updated_at ON public.sheeltechlearn_page_edits;
CREATE TRIGGER sheeltechlearn_page_edits_set_updated_at
  BEFORE UPDATE ON public.sheeltechlearn_page_edits
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ─── Table grants ───────────────────────────────────────────────────────────
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sheeltechlearn_page_edits TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sheeltechlearn_page_edits TO authenticated;

-- ─── RLS ──────────────────────────────────────────────────────────────────
-- Same trust level as intervqans_page_edits: no login system, the Page
-- Editor is a personal tool gated only by knowing the pencil icon exists.
ALTER TABLE public.sheeltechlearn_page_edits ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "sheeltechlearn_page_edits: anyone read"  ON public.sheeltechlearn_page_edits;
DROP POLICY IF EXISTS "sheeltechlearn_page_edits: anyone write" ON public.sheeltechlearn_page_edits;

CREATE POLICY "sheeltechlearn_page_edits: anyone read"
  ON public.sheeltechlearn_page_edits FOR SELECT
  USING (true);

CREATE POLICY "sheeltechlearn_page_edits: anyone write"
  ON public.sheeltechlearn_page_edits FOR ALL
  USING (true)
  WITH CHECK (true);
