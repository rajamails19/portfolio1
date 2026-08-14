import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "ringdeck:danalyst:basics:favorites:v1";
const FAVORITES_EVENT = "ringdeck:theory-favorites-changed";

export type TheoryFavorite = {
  id: string;
  sourceId: string;
  sourceTitle: string;
  kind: string;
  content: string;
  createdAt: string;
};

export type NewTheoryFavorite = Omit<TheoryFavorite, "createdAt">;

function readFavorites(): TheoryFavorite[] {
  if (typeof window === "undefined") return [];

  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]") as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (favorite): favorite is TheoryFavorite =>
        typeof favorite === "object" &&
        favorite !== null &&
        typeof favorite.id === "string" &&
        typeof favorite.sourceId === "string" &&
        typeof favorite.sourceTitle === "string" &&
        typeof favorite.kind === "string" &&
        typeof favorite.content === "string" &&
        typeof favorite.createdAt === "string" &&
        favorite.kind === "Text selection",
    );
  } catch {
    return [];
  }
}

export function favoriteIdForSelection(sourceId: string, content: string) {
  let hash = 5381;
  const normalized = content.replace(/\s+/g, " ").trim();
  for (let index = 0; index < normalized.length; index += 1) {
    hash = (hash * 33) ^ normalized.charCodeAt(index);
  }
  return `${sourceId}:selection:${(hash >>> 0).toString(36)}`;
}

function writeFavorites(favorites: TheoryFavorite[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch {
    // Keep the in-memory experience working if storage is unavailable.
  }
  window.dispatchEvent(new CustomEvent(FAVORITES_EVENT, { detail: favorites }));
}

export function useTheoryFavorites(enabled: boolean) {
  const [favorites, setFavorites] = useState<TheoryFavorite[]>([]);

  useEffect(() => {
    if (!enabled) return;
    setFavorites(readFavorites());

    const syncFavorites = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) setFavorites(readFavorites());
    };
    const syncCurrentWindow = (event: Event) => {
      const detail = (event as CustomEvent<TheoryFavorite[]>).detail;
      setFavorites(Array.isArray(detail) ? detail : readFavorites());
    };
    window.addEventListener("storage", syncFavorites);
    window.addEventListener(FAVORITES_EVENT, syncCurrentWindow);
    return () => {
      window.removeEventListener("storage", syncFavorites);
      window.removeEventListener(FAVORITES_EVENT, syncCurrentWindow);
    };
  }, [enabled]);

  const addFavorite = useCallback((favorite: NewTheoryFavorite) => {
    const current = readFavorites();
    if (current.some((item) => item.id === favorite.id)) return;
    writeFavorites([...current, { ...favorite, createdAt: new Date().toISOString() }]);
  }, []);

  const removeFavorite = useCallback((id: string) => {
    writeFavorites(readFavorites().filter((favorite) => favorite.id !== id));
  }, []);

  return { favorites, addFavorite, removeFavorite };
}
