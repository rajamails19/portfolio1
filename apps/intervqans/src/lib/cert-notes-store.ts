import type { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import {
  listAllItems,
  listItems,
  newId,
  putItem,
  removeItem,
  type CertItem,
} from "@/lib/cert-notes-db";

/**
 * Where "My Notes" lives. Signed out → this browser's IndexedDB (localStore).
 * Signed in → your private Supabase rows + storage bucket (cloudStore).
 * Both look identical to the UI.
 */
export interface NotesStore {
  mode: "local" | "cloud";
  list(cert: string): Promise<CertItem[]>;
  /** Creates or updates; returns the item as stored (cloud adds the photo path). */
  put(item: CertItem): Promise<CertItem>;
  remove(item: CertItem): Promise<void>;
}

export const localStore: NotesStore = {
  mode: "local",
  list: listItems,
  put: async (item) => {
    await putItem(item);
    return item;
  },
  remove: (item) => removeItem(item.id),
};

const TABLE = "intervqans_cert_notes";
const BUCKET = "intervqans-cert-photos";
const SIGNED_URL_SECONDS = 60 * 60 * 12;

interface Row {
  id: string;
  cert: string;
  kind: "note" | "photo";
  text: string | null;
  caption: string | null;
  photo_path: string | null;
  created_at: string;
  updated_at: string;
}

const iso = (ms: number) => new Date(ms).toISOString();

export function cloudStore(userId: string, client: SupabaseClient = supabase): NotesStore {
  return {
    mode: "cloud",

    async list(cert) {
      const { data, error } = await client
        .from(TABLE)
        .select("*")
        .eq("user_id", userId)
        .eq("cert", cert)
        .order("created_at", { ascending: true });
      if (error) throw error;
      const rows = (data ?? []) as Row[];

      const urls = new Map<string, string>();
      const paths = rows.flatMap((r) => (r.kind === "photo" && r.photo_path ? [r.photo_path] : []));
      if (paths.length) {
        const { data: signed, error: signErr } = await client.storage
          .from(BUCKET)
          .createSignedUrls(paths, SIGNED_URL_SECONDS);
        if (signErr) throw signErr;
        for (const s of signed ?? []) if (s.path && s.signedUrl) urls.set(s.path, s.signedUrl);
      }

      return rows.map((r): CertItem =>
        r.kind === "note"
          ? {
              id: r.id,
              cert: r.cert,
              kind: "note",
              text: r.text ?? "",
              createdAt: Date.parse(r.created_at),
              updatedAt: Date.parse(r.updated_at),
            }
          : {
              id: r.id,
              cert: r.cert,
              kind: "photo",
              caption: r.caption ?? "",
              path: r.photo_path ?? undefined,
              dataUrl: (r.photo_path && urls.get(r.photo_path)) || "",
              createdAt: Date.parse(r.created_at),
              updatedAt: Date.parse(r.updated_at),
            },
      );
    },

    async put(item) {
      if (item.kind === "note") {
        const { error } = await client.from(TABLE).upsert({
          id: item.id,
          user_id: userId,
          cert: item.cert,
          kind: "note",
          text: item.text,
          created_at: iso(item.createdAt),
          updated_at: iso(item.updatedAt),
        });
        if (error) throw error;
        return item;
      }

      // Photo: upload the file once; later edits (captions) only touch the row.
      let path = item.path;
      if (!path) {
        path = `${userId}/${item.id}.jpg`;
        const blob = await (await fetch(item.dataUrl)).blob();
        const { error: upErr } = await client.storage
          .from(BUCKET)
          .upload(path, blob, { contentType: blob.type || "image/jpeg", upsert: true });
        if (upErr) throw upErr;
      }
      const { error } = await client.from(TABLE).upsert({
        id: item.id,
        user_id: userId,
        cert: item.cert,
        kind: "photo",
        caption: item.caption,
        photo_path: path,
        created_at: iso(item.createdAt),
        updated_at: iso(item.updatedAt),
      });
      if (error) throw error;
      return { ...item, path };
    },

    async remove(item) {
      const { error } = await client.from(TABLE).delete().eq("id", item.id);
      if (error) throw error;
      // The row is the source of truth; a leftover file in a private bucket is harmless.
      if (item.kind === "photo" && item.path) {
        await client.storage.from(BUCKET).remove([item.path]);
      }
    },
  };
}

/* ───────────────────── one-time move: this device → cloud ───────────────────── */

export async function countLocalItems(): Promise<{ notes: number; photos: number }> {
  const all = await listAllItems();
  return {
    notes: all.filter((i) => i.kind === "note").length,
    photos: all.filter((i) => i.kind === "photo").length,
  };
}

export interface UploadResult {
  uploaded: number;
  failed: number;
  firstError?: string;
}

/**
 * Copies every local note/photo (all certs) to the cloud, oldest first, and removes
 * each local copy only after its upload succeeded — so a failure never loses anything
 * and re-running simply continues where it stopped.
 */
export async function uploadLocalToCloud(
  userId: string,
  client: SupabaseClient = supabase,
): Promise<UploadResult> {
  const store = cloudStore(userId, client);
  const all = await listAllItems();
  const result: UploadResult = { uploaded: 0, failed: 0 };

  for (const item of all) {
    try {
      const id = newId();
      const copy: CertItem =
        item.kind === "note" ? { ...item, id } : { ...item, id, path: undefined };
      await store.put(copy);
      await removeItem(item.id);
      result.uploaded++;
    } catch (e) {
      result.failed++;
      result.firstError ??= errorMessage(e);
    }
  }
  return result;
}

export function errorMessage(e: unknown): string {
  if (e instanceof Error) return e.message;
  const m = (e as { message?: unknown } | null)?.message;
  return typeof m === "string" ? m : String(e);
}
