import { NextResponse } from 'next/server';
import path from 'path';
import { createClient } from '@/lib/supabase/server';

const isSupabaseConfigured = () => !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const missingSupabase = () => NextResponse.json({ error: 'Supabase is required in production.' }, { status: 503 });

const CONTENT_TYPE_BY_EXT: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
};

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (isSupabaseConfigured()) {
    const supabase = await createClient() as any; // eslint-disable-line
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: image, error } = await supabase
      .from('images')
      .select('filename')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (error || !image) return NextResponse.json({ error: 'Image not found' }, { status: 404 });

    const storagePath = `${user.id}/${image.filename}`;
    const { data, error: signedUrlError } = await supabase.storage
      .from('note-images')
      .createSignedUrl(storagePath, 60);

    if (signedUrlError || !data?.signedUrl) {
      return NextResponse.json({ error: signedUrlError?.message ?? 'Unable to load image' }, { status: 500 });
    }

    return NextResponse.redirect(data.signedUrl);
  }

  if (process.env.NODE_ENV === 'production') return missingSupabase();

  const { getDb, UPLOADS_DIR } = await import('@/lib/db');
  const fs = await import('fs/promises');
  const image = getDb().prepare('SELECT filename FROM images WHERE id = ?').get(id) as { filename: string } | undefined;
  if (!image) return NextResponse.json({ error: 'Image not found' }, { status: 404 });

  const filepath = path.join(UPLOADS_DIR, image.filename);
  const file = await fs.readFile(filepath);
  const contentType = CONTENT_TYPE_BY_EXT[path.extname(image.filename).toLowerCase()] ?? 'application/octet-stream';

  return new NextResponse(file, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'private, max-age=60',
    },
  });
}
