/**
 * saved-store.ts
 * Supabase-backed store for folders + saved items.
 * Uses anonymous sign-in — no login required, but data is stored in the cloud
 * and tied to this device's anonymous session. Add Google login later to sync
 * across all devices.
 */

import { useState, useEffect, useCallback } from "react";
import { supabase } from "./supabase-client";

/* ── types ── */

export type Folder = {
  id: string;
  name: string;
  gradient: string;
  emoji: string;
  builtIn?: boolean;
  createdAt: string;
};

export type SavedItem = {
  id: string;
  folderId: string;
  postId: string;
  title: string;
  tag: string;
  author: string;
  img?: string;
  kind: "image" | "reel" | "carousel" | "quote";
  savedAt: string;
};

/* ── default built-in folders ── */

export const DEFAULT_FOLDERS: Omit<Folder, "createdAt">[] = [
  { id: "saved", name: "Saved", gradient: "from-pink-300 to-rose-300", emoji: "🔖", builtIn: true },
  {
    id: "papers",
    name: "Papers",
    gradient: "from-violet-300 to-fuchsia-300",
    emoji: "📄",
    builtIn: true,
  },
  {
    id: "snippets",
    name: "Snippets",
    gradient: "from-amber-200 to-pink-300",
    emoji: "✂️",
    builtIn: true,
  },
  {
    id: "models",
    name: "Models",
    gradient: "from-rose-300 to-orange-300",
    emoji: "🤖",
    builtIn: true,
  },
  {
    id: "prompts",
    name: "Prompts",
    gradient: "from-purple-300 to-pink-300",
    emoji: "✨",
    builtIn: true,
  },
  {
    id: "brain-food",
    name: "Brain food",
    gradient: "from-fuchsia-300 to-violet-300",
    emoji: "🧠",
    builtIn: true,
  },
];

/* ── gradient palette ── */

export const GRADIENT_OPTIONS = [
  { label: "Rose", value: "from-pink-300 to-rose-400" },
  { label: "Violet", value: "from-violet-300 to-purple-400" },
  { label: "Amber", value: "from-amber-300 to-orange-400" },
  { label: "Teal", value: "from-teal-300 to-cyan-400" },
  { label: "Indigo", value: "from-indigo-300 to-blue-400" },
  { label: "Lime", value: "from-lime-300 to-green-400" },
  { label: "Fuchsia", value: "from-fuchsia-300 to-pink-400" },
  { label: "Sky", value: "from-sky-300 to-blue-400" },
];

/* ── helpers: map Supabase rows → app types ── */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToFolder(row: any): Folder {
  return {
    id: row.id,
    name: row.name,
    gradient: row.gradient,
    emoji: row.emoji,
    builtIn: row.built_in ?? false,
    createdAt: row.created_at,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToItem(row: any): SavedItem {
  return {
    id: row.id,
    folderId: row.folder_id,
    postId: row.post_id,
    title: row.title,
    tag: row.tag,
    author: row.author,
    img: row.img ?? undefined,
    kind: row.kind,
    savedAt: row.saved_at,
  };
}

/* ── hook ── */

export function useSavedStore() {
  const [userId, setUserId] = useState<string | null>(null);
  const [folders, setFolders] = useState<Folder[]>([
    ...DEFAULT_FOLDERS.map((f) => ({ ...f, createdAt: new Date(0).toISOString() })),
  ]);
  const [items, setItems] = useState<SavedItem[]>([]);
  const [loading, setLoading] = useState(true);

  /* ── 1. ensure anonymous session on mount ── */
  useEffect(() => {
    async function init() {
      const { data: sessionData } = await supabase.auth.getSession();
      let uid = sessionData.session?.user?.id ?? null;

      if (!uid) {
        // sign in anonymously — creates a UUID-keyed user, session persisted locally
        const { data, error } = await supabase.auth.signInAnonymously();
        if (!error && data.user) uid = data.user.id;
      }

      if (uid) {
        setUserId(uid);
        await loadAll(uid);
      }
      setLoading(false);
    }
    init();
  }, []);

  async function loadAll(uid: string) {
    // load custom folders from Supabase
    const { data: folderRows } = await supabase
      .from("lumen_folders")
      .select("*")
      .eq("user_id", uid)
      .eq("built_in", false)
      .order("created_at", { ascending: true });

    const custom: Folder[] = (folderRows ?? []).map(rowToFolder);
    const builtIns = DEFAULT_FOLDERS.map((f) => ({ ...f, createdAt: new Date(0).toISOString() }));
    setFolders([...builtIns, ...custom]);

    // load saved items from Supabase
    const { data: itemRows } = await supabase
      .from("lumen_saved_items")
      .select("*")
      .eq("user_id", uid)
      .order("saved_at", { ascending: false });

    setItems((itemRows ?? []).map(rowToItem));
  }

  /* ── 2. ensure built-in folders exist in Supabase for this user ── */
  useEffect(() => {
    if (!userId) return;

    async function seedBuiltIns() {
      for (const f of DEFAULT_FOLDERS) {
        await supabase.from("lumen_folders").upsert(
          {
            id: f.id,
            user_id: userId,
            name: f.name,
            gradient: f.gradient,
            emoji: f.emoji,
            built_in: true,
          },
          { onConflict: "id" },
        );
      }
    }
    seedBuiltIns();
  }, [userId]);

  /* ── CRUD ── */

  const createFolder = useCallback(
    async (name: string, gradient: string, emoji: string): Promise<Folder | null> => {
      if (!userId) return null;
      const { data, error } = await supabase
        .from("lumen_folders")
        .insert({ user_id: userId, name, gradient, emoji, built_in: false })
        .select()
        .single();
      if (error || !data) return null;
      const folder = rowToFolder(data);
      setFolders((prev) => [...prev, folder]);
      return folder;
    },
    [userId],
  );

  const deleteFolder = useCallback(
    async (id: string) => {
      if (!userId) return;
      await supabase.from("lumen_folders").delete().eq("id", id).eq("user_id", userId);
      setFolders((prev) => prev.filter((f) => f.id !== id || f.builtIn));
      setItems((prev) => prev.filter((i) => i.folderId !== id));
    },
    [userId],
  );

  const saveToFolder = useCallback(
    async (
      folderId: string,
      post: Omit<SavedItem, "id" | "folderId" | "savedAt">,
    ): Promise<void> => {
      if (!userId) return;

      // For built-in folders (UUID conflict): resolve folder UUID from Supabase
      const { data: folderRow } = await supabase
        .from("lumen_folders")
        .select("id")
        .eq("user_id", userId)
        .eq("id", folderId)
        .maybeSingle();

      // If the folder is a built-in (slug id like "saved"), find or create it
      let resolvedFolderId = folderId;
      if (!folderRow) {
        // Try by name match for built-in slugs
        const builtIn = DEFAULT_FOLDERS.find((f) => f.id === folderId);
        if (builtIn) {
          const { data: existing } = await supabase
            .from("lumen_folders")
            .select("id")
            .eq("user_id", userId)
            .eq("name", builtIn.name)
            .maybeSingle();
          resolvedFolderId = existing?.id ?? folderId;
        }
      }

      const { data, error } = await supabase
        .from("lumen_saved_items")
        .insert({
          user_id: userId,
          folder_id: resolvedFolderId,
          post_id: post.postId,
          title: post.title,
          tag: post.tag,
          author: post.author,
          img: post.img ?? null,
          kind: post.kind,
        })
        .select()
        .single();

      if (!error && data) {
        setItems((prev) => [rowToItem(data), ...prev]);
      }
    },
    [userId],
  );

  const removeFromFolder = useCallback(
    async (itemId: string) => {
      if (!userId) return;
      await supabase.from("lumen_saved_items").delete().eq("id", itemId).eq("user_id", userId);
      setItems((prev) => prev.filter((i) => i.id !== itemId));
    },
    [userId],
  );

  const itemsInFolder = useCallback(
    (folderId: string) => items.filter((i) => i.folderId === folderId),
    [items],
  );

  const countInFolder = useCallback(
    (folderId: string) => items.filter((i) => i.folderId === folderId).length,
    [items],
  );

  return {
    userId,
    loading,
    folders,
    items,
    createFolder,
    deleteFolder,
    saveToFolder,
    removeFromFolder,
    itemsInFolder,
    countInFolder,
  };
}
