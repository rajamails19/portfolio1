import { NextResponse } from 'next/server';

const isSupabaseConfigured = () => !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { ok: false, error: 'Supabase is required in production.', pingedAt: new Date().toISOString() },
      { status: process.env.NODE_ENV === 'production' ? 503 : 200 }
    );
  }

  const res = await fetch(`${url}/rest/v1/folders?limit=1`, {
    headers: { apikey: key!, Authorization: `Bearer ${key}` },
  });
  return NextResponse.json({ ok: res.ok, status: res.status, pingedAt: new Date().toISOString() });
}
