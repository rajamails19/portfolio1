import type { Block } from "@/content/types";

// Live answer edits are stored as rows in the shared Supabase project's
// intervqans_page_edits table (same anonymous-access table StudyDeck's Page
// Editor uses), one row per question, keyed "aiqa-answer:<question id>".
const URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
const TABLE = "intervqans_page_edits";
const PREFIX = "aiqa-answer:";

export const remoteConfigured = Boolean(URL && KEY);

export interface RemoteEdit {
  baseHash: string;
  answer: Block[];
}

const headers = () => ({
  apikey: KEY as string,
  Authorization: `Bearer ${KEY}`,
  "content-type": "application/json",
});

export async function fetchRemoteEdits(): Promise<Record<string, RemoteEdit>> {
  if (!remoteConfigured) return {};
  const res = await fetch(
    `${URL}/rest/v1/${TABLE}?select=pathname,edits&pathname=like.${encodeURIComponent(`${PREFIX}*`)}`,
    { headers: headers() },
  );
  if (!res.ok) throw new Error(`Couldn't load live edits (${res.status})`);
  const rows = (await res.json()) as { pathname: string; edits: RemoteEdit }[];
  const out: Record<string, RemoteEdit> = {};
  for (const r of rows) {
    if (r.edits && typeof r.edits.baseHash === "string" && Array.isArray(r.edits.answer)) {
      out[r.pathname.slice(PREFIX.length)] = r.edits;
    }
  }
  return out;
}

export async function saveRemoteEdits(edits: Record<string, RemoteEdit>): Promise<void> {
  if (!remoteConfigured)
    throw new Error("Live saving isn't configured (missing Supabase env vars)");
  const rows = Object.entries(edits).map(([id, e]) => ({ pathname: `${PREFIX}${id}`, edits: e }));
  const res = await fetch(`${URL}/rest/v1/${TABLE}?on_conflict=pathname`, {
    method: "POST",
    headers: { ...headers(), Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify(rows),
  });
  if (!res.ok) throw new Error(`Live save failed (${res.status})`);
}
