import { useEffect, useState } from "react";
import { vault, useVaultSubscribe, type ItemKind, type VaultItem } from "@/lib/vault-storage";

export function useVaultItems(kind?: ItemKind) {
  const [items, setItems] = useState<VaultItem[]>([]);
  useEffect(() => {
    setItems(vault.list(kind));
    return useVaultSubscribe(() => setItems(vault.list(kind)));
  }, [kind]);
  return items;
}

export function useBlobUrl(blobKey?: string) {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    let active = true;
    let current: string | null = null;
    if (!blobKey) return;
    vault.getBlobUrl(blobKey).then((u) => {
      if (active) {
        setUrl(u);
        current = u;
      } else if (u) URL.revokeObjectURL(u);
    });
    return () => {
      active = false;
      if (current) URL.revokeObjectURL(current);
    };
  }, [blobKey]);
  return url;
}

export function filterItems(items: VaultItem[], q: string) {
  const s = q.trim().toLowerCase();
  if (!s) return items;
  return items.filter(
    (i) =>
      i.title?.toLowerCase().includes(s) ||
      i.text?.toLowerCase().includes(s) ||
      i.tags.some((t) => t.toLowerCase().includes(s)),
  );
}
