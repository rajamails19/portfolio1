-- ═══════════════════════════════════════════════════════════════════════════
-- StudyDeck (intervqans) — "My Notes" cloud sync (private to the signed-in user)
-- Run this in: Supabase Dashboard → SQL Editor → New Query → Run
--
-- Shared project: this only adds a new, uniquely-named table and storage
-- bucket. It does not touch any table used by other apps, and it is safe to
-- re-run (everything is IF NOT EXISTS / DROP IF EXISTS).
--
-- Unlike intervqans_page_edits, there is NO anonymous access here: rows and
-- photos are only readable/writable by the user who owns them.
-- ═══════════════════════════════════════════════════════════════════════════

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- One row per note or photo. Photo files live in Storage; `photo_path` points to them.
CREATE TABLE IF NOT EXISTS public.intervqans_cert_notes (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  cert       TEXT NOT NULL,                       -- tab code, e.g. 'AIF-C01', 'CSM'
  kind       TEXT NOT NULL CHECK (kind IN ('note', 'photo')),
  text       TEXT,                                -- notes
  caption    TEXT,                                -- photos
  photo_path TEXT,                                -- photos: '<user_id>/<id>.jpg' in the bucket below
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT intervqans_cert_notes_note_has_text  CHECK (kind <> 'note'  OR text IS NOT NULL),
  CONSTRAINT intervqans_cert_notes_photo_has_path CHECK (kind <> 'photo' OR photo_path IS NOT NULL)
);

CREATE INDEX IF NOT EXISTS intervqans_cert_notes_user_cert_idx
  ON public.intervqans_cert_notes (user_id, cert, created_at);

-- Auto-update updated_at (same shared helper the other tables use; safe to re-run).
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS intervqans_cert_notes_set_updated_at ON public.intervqans_cert_notes;
CREATE TRIGGER intervqans_cert_notes_set_updated_at
  BEFORE UPDATE ON public.intervqans_cert_notes
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ─── Table access: signed-in users only (deliberately NOT granted to anon) ───
GRANT SELECT, INSERT, UPDATE, DELETE ON public.intervqans_cert_notes TO authenticated;

ALTER TABLE public.intervqans_cert_notes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "intervqans_cert_notes: owner only" ON public.intervqans_cert_notes;
CREATE POLICY "intervqans_cert_notes: owner only"
  ON public.intervqans_cert_notes FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- ─── Photo storage: private bucket, one folder per user ─────────────────────
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('intervqans-cert-photos', 'intervqans-cert-photos', false, 5242880,
        ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "intervqans cert photos: owner folder only" ON storage.objects;
CREATE POLICY "intervqans cert photos: owner folder only"
  ON storage.objects FOR ALL
  TO authenticated
  USING (
    bucket_id = 'intervqans-cert-photos'
    AND (storage.foldername(name))[1] = auth.uid()::text
  )
  WITH CHECK (
    bucket_id = 'intervqans-cert-photos'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );
