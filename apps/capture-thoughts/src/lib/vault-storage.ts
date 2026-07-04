import { get, set, del, keys as idbKeys } from "idb-keyval";

// Storage abstraction. Swap implementation later (Supabase, etc.) without
// touching components. All blobs live in IndexedDB; metadata in localStorage.

export type ItemKind = "pic" | "text" | "voice" | "video";

export interface VaultItem {
  id: string;
  kind: ItemKind;
  title?: string;
  tags: string[];
  text?: string; // for text notes
  videoUrl?: string; // for pasted video links
  blobKey?: string; // pointer into IndexedDB for pic/voice/video blobs
  mimeType?: string;
  durationMs?: number; // for voice/video
  createdAt: number;
  favorite?: boolean;
}

const META_KEY = "vault:items:v1";

function readAll(): VaultItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(META_KEY);
    return raw ? (JSON.parse(raw) as VaultItem[]) : [];
  } catch {
    return [];
  }
}

function writeAll(items: VaultItem[]) {
  localStorage.setItem(META_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("vault:changed"));
}

export const vault = {
  list(kind?: ItemKind): VaultItem[] {
    const all = readAll().sort((a, b) => b.createdAt - a.createdAt);
    return kind ? all.filter((i) => i.kind === kind) : all;
  },

  async add(item: Omit<VaultItem, "id" | "createdAt" | "tags"> & { tags?: string[]; blob?: Blob }): Promise<VaultItem> {
    const id = crypto.randomUUID();
    let blobKey: string | undefined;
    if (item.blob) {
      blobKey = `blob:${id}`;
      await set(blobKey, item.blob);
    }
    const stored: VaultItem = {
      id,
      kind: item.kind,
      title: item.title,
      tags: item.tags ?? [],
      text: item.text,
      videoUrl: item.videoUrl,
      blobKey,
      mimeType: item.mimeType,
      durationMs: item.durationMs,
      createdAt: Date.now(),
    };
    writeAll([stored, ...readAll()]);
    return stored;
  },

  async remove(id: string) {
    const all = readAll();
    const item = all.find((i) => i.id === id);
    if (item?.blobKey) await del(item.blobKey);
    writeAll(all.filter((i) => i.id !== id));
  },

  toggleFavorite(id: string) {
    writeAll(readAll().map((i) => (i.id === id ? { ...i, favorite: !i.favorite } : i)));
  },

  async getBlobUrl(blobKey: string): Promise<string | null> {
    const blob = await get<Blob>(blobKey);
    return blob ? URL.createObjectURL(blob) : null;
  },

  async clearAll() {
    const ks = await idbKeys();
    await Promise.all(ks.map((k) => del(k)));
    localStorage.removeItem(META_KEY);
    window.dispatchEvent(new CustomEvent("vault:changed"));
  },
};

export function useVaultSubscribe(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const handler = () => cb();
  window.addEventListener("vault:changed", handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener("vault:changed", handler);
    window.removeEventListener("storage", handler);
  };
}
