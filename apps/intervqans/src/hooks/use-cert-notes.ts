import { useCallback, useEffect, useState } from "react";
import { newId, type CertItem, type CertNote, type CertPhoto } from "@/lib/cert-notes-db";
import { errorMessage, type NotesStore } from "@/lib/cert-notes-store";

type Status = "loading" | "ready" | "error";

/**
 * Notes + photos for one cert tab. `store` decides where they live (this browser or the
 * signed-in cloud account); `enabled` holds loading until the sign-in state is known so
 * the wrong list never flashes.
 */
export function useCertNotes(cert: string, store: NotesStore, enabled: boolean) {
  const [items, setItems] = useState<CertItem[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setStatus("loading");
      return;
    }
    let cancelled = false;
    setStatus("loading");
    setError(null);
    store
      .list(cert)
      .then((list) => {
        if (cancelled) return;
        setItems(list);
        setStatus("ready");
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setError(errorMessage(e));
        setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [cert, store, enabled, reloadKey]);

  const reload = useCallback(() => setReloadKey((k) => k + 1), []);

  const save = useCallback(
    async (item: CertItem) => {
      const saved = await store.put(item);
      setItems((prev) =>
        prev.some((p) => p.id === saved.id)
          ? prev.map((p) => (p.id === saved.id ? saved : p))
          : [...prev, saved],
      );
    },
    [store],
  );

  const addNote = useCallback(
    async (text: string) => {
      const now = Date.now();
      // Stored exactly as typed; only trailing whitespace is dropped.
      const note: CertNote = {
        id: newId(),
        cert,
        kind: "note",
        text: text.replace(/\s+$/, ""),
        createdAt: now,
        updatedAt: now,
      };
      await save(note);
    },
    [cert, save],
  );

  const addPhoto = useCallback(
    async (dataUrl: string, caption: string) => {
      const now = Date.now();
      const photo: CertPhoto = {
        id: newId(),
        cert,
        kind: "photo",
        dataUrl,
        caption: caption.trim(),
        createdAt: now,
        updatedAt: now,
      };
      await save(photo);
    },
    [cert, save],
  );

  const updateNote = useCallback(
    async (id: string, text: string) => {
      const current = items.find((i) => i.id === id);
      if (!current || current.kind !== "note") return;
      await save({ ...current, text: text.replace(/\s+$/, ""), updatedAt: Date.now() });
    },
    [items, save],
  );

  const updateCaption = useCallback(
    async (id: string, caption: string) => {
      const current = items.find((i) => i.id === id);
      if (!current || current.kind !== "photo") return;
      await save({ ...current, caption: caption.trim(), updatedAt: Date.now() });
    },
    [items, save],
  );

  const remove = useCallback(
    async (id: string) => {
      const item = items.find((i) => i.id === id);
      if (!item) return;
      await store.remove(item);
      setItems((prev) => prev.filter((p) => p.id !== id));
    },
    [items, store],
  );

  return {
    status,
    error,
    reload,
    notes: items.filter((i): i is CertNote => i.kind === "note"),
    photos: items.filter((i): i is CertPhoto => i.kind === "photo"),
    addNote,
    addPhoto,
    updateNote,
    updateCaption,
    remove,
  };
}
