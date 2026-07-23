import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST() {
  if (process.env.ENABLE_MIGRATION_TOOLS !== 'true') {
    return NextResponse.json({ message: 'Migration tools are disabled.' }, { status: 404 });
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return NextResponse.json({ message: 'Supabase not configured.' }, { status: 400 });
  }

  const supabase = await createClient() as any; // eslint-disable-line
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ message: 'Not authenticated.' }, { status: 401 });

  let db: ReturnType<typeof import('@/lib/db')['getDb']>;
  try {
    const dbModule = await import('@/lib/db');
    db = dbModule.getDb();
  } catch {
    return NextResponse.json({ message: 'No local database found.' });
  }

  // --- Migrate folders ---
  const localFolders = db.prepare('SELECT * FROM folders').all() as Array<{
    id: string; name: string; createdAt: string;
  }>;
  let foldersMigrated = 0;
  for (const f of localFolders) {
    const { error } = await supabase.from('folders').upsert(
      { id: f.id, name: f.name, user_id: user.id, created_at: f.createdAt },
      { onConflict: 'id' }
    );
    if (!error) foldersMigrated++;
  }

  // --- Migrate notes ---
  const localNotes = db.prepare('SELECT * FROM notes').all() as Array<{
    id: string; folderId: string; title: string; content: string;
    pinned: number; createdAt: string; updatedAt: string;
  }>;
  let notesMigrated = 0;
  for (const n of localNotes) {
    const { error } = await supabase.from('notes').upsert(
      {
        id: n.id, folder_id: n.folderId, title: n.title, content: n.content,
        pinned: n.pinned === 1, user_id: user.id,
        created_at: n.createdAt, updated_at: n.updatedAt,
      },
      { onConflict: 'id' }
    );
    if (!error) notesMigrated++;
  }

  // Image migration is intentionally not supported in this endpoint.
  // New uploads are stored through /api/images and served via authenticated /api/images/:id URLs.
  const f = foldersMigrated, n = notesMigrated;
  return NextResponse.json({
    message: `Migrated ${f} folder${f !== 1 ? 's' : ''} and ${n} note${n !== 1 ? 's' : ''}. Image migration is disabled for public-launch safety.`,
  });
}
