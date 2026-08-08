-- ═══════════════════════════════════════════════════════════════════════════
-- StudyDeck (intervqans) — Style presets (S1/S2/S3) go cloud too
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- (Shared project — this only adds a new, uniquely-named table. It does not
--  touch intervqans_page_edits or anything used by other apps.)
-- ═══════════════════════════════════════════════════════════════════════════

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- One row per slot (0, 1, 2 = S1, S2, S3). `style` holds the
-- { bold, italic, underline, strikeThrough, foreColor, hiliteColor } shape.
CREATE TABLE IF NOT EXISTS public.intervqans_style_presets (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slot       INTEGER NOT NULL UNIQUE CHECK (slot IN (0, 1, 2)),
  style      JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS intervqans_style_presets_set_updated_at ON public.intervqans_style_presets;
CREATE TRIGGER intervqans_style_presets_set_updated_at
  BEFORE UPDATE ON public.intervqans_style_presets
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ─── Table grants ───────────────────────────────────────────────────────────
GRANT SELECT, INSERT, UPDATE, DELETE ON public.intervqans_style_presets TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.intervqans_style_presets TO authenticated;

-- ─── RLS ──────────────────────────────────────────────────────────────────
-- Same trust level as intervqans_page_edits: no login system.
ALTER TABLE public.intervqans_style_presets ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "intervqans_style_presets: anyone read"  ON public.intervqans_style_presets;
DROP POLICY IF EXISTS "intervqans_style_presets: anyone write" ON public.intervqans_style_presets;

CREATE POLICY "intervqans_style_presets: anyone read"
  ON public.intervqans_style_presets FOR SELECT
  USING (true);

CREATE POLICY "intervqans_style_presets: anyone write"
  ON public.intervqans_style_presets FOR ALL
  USING (true)
  WITH CHECK (true);
