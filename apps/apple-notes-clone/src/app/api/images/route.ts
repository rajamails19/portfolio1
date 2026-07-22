import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { createClient } from '@/lib/supabase/server';

const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/gif', 'image/webp']);
const EXT_BY_TYPE: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/gif': '.gif',
  'image/webp': '.webp',
};

const isSupabaseConfigured = () => !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const missingSupabase = () => NextResponse.json({ error: 'Supabase is required in production.' }, { status: 503 });

function validateImage(file: File) {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    return 'Only JPEG, PNG, GIF, and WebP images are supported.';
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return 'Images must be 10 MB or smaller.';
  }
  return null;
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const file   = formData.get('file') as File | null;
  const noteId = formData.get('noteId') as string | null;
  if (!file || !noteId) return NextResponse.json({ error: 'file and noteId required' }, { status: 400 });

  const validationError = validateImage(file);
  if (validationError) return NextResponse.json({ error: validationError }, { status: 400 });

  const ext      = EXT_BY_TYPE[file.type] ?? (path.extname(file.name) || '.png');
  const id       = uuidv4();
  const filename = `${id}${ext}`;

  if (isSupabaseConfigured()) {
    const supabase = await createClient() as any; // eslint-disable-line
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: note, error: noteError } = await supabase
      .from('notes')
      .select('id')
      .eq('id', noteId)
      .eq('user_id', user.id)
      .single();

    if (noteError || !note) return NextResponse.json({ error: 'Note not found' }, { status: 404 });

    const arrayBuffer = await file.arrayBuffer();
    const storagePath = `${user.id}/${filename}`;

    const { error: uploadError } = await supabase.storage
      .from('note-images')
      .upload(storagePath, arrayBuffer, { contentType: file.type });

    if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 });

    const url = `/api/images/${id}`;
    const { error: insertError } = await supabase
      .from('images')
      .insert({ id, note_id: noteId, filename, url, user_id: user.id });

    if (insertError) return NextResponse.json({ error: insertError.message }, { status: 500 });
    return NextResponse.json({ id, noteId, filename, url });
  }

  if (process.env.NODE_ENV === 'production') return missingSupabase();

  // Local file fallback for development only.
  const { getDb, UPLOADS_DIR } = await import('@/lib/db');
  const fs = await import('fs');
  const filepath = path.join(UPLOADS_DIR, filename);
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(filepath, buffer);
  const url = `/uploads/${filename}`;
  const db = getDb();
  db.prepare('INSERT INTO images (id, noteId, filename, url) VALUES (?, ?, ?, ?)').run(id, noteId, filename, url);
  return NextResponse.json({ id, noteId, filename, url });
}
