import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { AddButton } from "@/components/AddButton";
import { PicUploader } from "@/components/PicUploader";
import { EmptyState } from "@/components/EmptyState";
import { useVaultItems, useBlobUrl, filterItems } from "@/hooks/use-vault";
import { vault, type VaultItem } from "@/lib/vault-storage";
import { Image as ImageIcon, Star, Trash2, X } from "lucide-react";

export const Route = createFileRoute("/pics")({
  head: () => ({ meta: [{ title: "Pics — My Capture Vault" }, { name: "description", content: "Save screenshots, photos and visual inspiration." }] }),
  component: PicsPage,
});

function PicsPage() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState<VaultItem | null>(null);
  const items = filterItems(useVaultItems("pic"), q);

  return (
    <AppShell search={q} onSearch={setQ}>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="font-display text-4xl">Pics</h1>
          <p className="text-sm text-muted-foreground">Drop, paste, or upload anything beautiful.</p>
        </div>
        <span className="text-xs text-muted-foreground">{items.length} saved</span>
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon={<ImageIcon className="h-8 w-8 text-[hsl(0_0%_10%)]" />}
          title="Your gallery is empty"
          description="Drop a screenshot, paste an image with ⌘V, or snap one with your camera."
          action={
            <button onClick={() => setOpen(true)} className="rounded-full bg-aurora px-5 py-2.5 text-sm font-semibold text-[hsl(0_0%_10%)] shadow-[var(--shadow-glow)]">
              Save your first picture
            </button>
          }
        />
      ) : (
        <div className="columns-2 gap-3 sm:columns-3 md:columns-4 [&>*]:mb-3">
          {items.map((item) => (
            <PicCard key={item.id} item={item} onOpen={() => setActive(item)} />
          ))}
        </div>
      )}

      <AddButton onClick={() => setOpen(true)} label="Add picture" />
      <PicUploader open={open} onClose={() => setOpen(false)} />
      {active && <PicLightbox item={active} onClose={() => setActive(null)} />}
    </AppShell>
  );
}

function PicCard({ item, onOpen }: { item: VaultItem; onOpen: () => void }) {
  const url = useBlobUrl(item.blobKey);
  if (!url) return <div className="glass h-48 rounded-2xl" />;
  return (
    <button onClick={onOpen} className="group relative block w-full overflow-hidden rounded-2xl glass animate-fade-up">
      <img src={url} alt={item.title ?? ""} className="w-full transition duration-500 group-hover:scale-105" />
      {(item.title || item.favorite) && (
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/80 via-black/30 to-transparent p-2.5 text-left">
          <span className="line-clamp-1 text-xs">{item.title}</span>
          {item.favorite && <Star className="h-3.5 w-3.5 fill-[var(--peach)] text-[var(--peach)]" />}
        </div>
      )}
    </button>
  );
}

function PicLightbox({ item, onClose }: { item: VaultItem; onClose: () => void }) {
  const url = useBlobUrl(item.blobKey);
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-4 backdrop-blur-xl animate-fade-up" onClick={onClose}>
      <div className="absolute right-4 top-4 flex gap-2">
        <button
          onClick={(e) => { e.stopPropagation(); vault.toggleFavorite(item.id); }}
          className="glass-strong rounded-full p-2.5"
          aria-label="Favorite"
        >
          <Star className={`h-5 w-5 ${item.favorite ? "fill-[var(--peach)] text-[var(--peach)]" : ""}`} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); vault.remove(item.id); onClose(); }}
          className="glass-strong rounded-full p-2.5"
          aria-label="Delete"
        >
          <Trash2 className="h-5 w-5" />
        </button>
        <button onClick={onClose} className="glass-strong rounded-full p-2.5" aria-label="Close">
          <X className="h-5 w-5" />
        </button>
      </div>
      {url && <img src={url} alt={item.title ?? ""} className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-[var(--shadow-glow)]" />}
      {item.title && <p className="mt-4 font-display text-2xl">{item.title}</p>}
      {item.tags.length > 0 && (
        <div className="mt-2 flex gap-1.5">
          {item.tags.map((t) => (
            <span key={t} className="glass rounded-full px-2.5 py-0.5 text-xs">#{t}</span>
          ))}
        </div>
      )}
    </div>
  );
}
