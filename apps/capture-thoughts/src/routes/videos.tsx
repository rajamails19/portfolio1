import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { AddButton } from "@/components/AddButton";
import { EmptyState } from "@/components/EmptyState";
import { TagInput } from "@/components/TagInput";
import { useVaultItems, useBlobUrl, filterItems } from "@/hooks/use-vault";
import { vault, type VaultItem } from "@/lib/vault-storage";
import { Film, Upload, Camera, Link2, Play, Star, Trash2, X } from "lucide-react";

export const Route = createFileRoute("/videos")({
  head: () => ({ meta: [{ title: "Videos — My Capture Vault" }, { name: "description", content: "Save reels, clips and captured moments." }] }),
  component: VideosPage,
});

function VideosPage() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState<VaultItem | null>(null);
  const items = filterItems(useVaultItems("video"), q);

  return (
    <AppShell search={q} onSearch={setQ}>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="font-display text-4xl">Videos</h1>
          <p className="text-sm text-muted-foreground">Reels, clips, and tiny cinematic moments.</p>
        </div>
        <span className="text-xs text-muted-foreground">{items.length} clips</span>
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon={<Film className="h-8 w-8 text-[hsl(0_0%_10%)]" />}
          title="Your reel is empty"
          description="Upload a clip, paste a link, or record one right now."
          action={
            <button onClick={() => setOpen(true)} className="rounded-full bg-aurora px-5 py-2.5 text-sm font-semibold text-[hsl(0_0%_10%)] shadow-[var(--shadow-glow)]">
              Save your first video
            </button>
          }
        />
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {items.map((item) => <VideoTile key={item.id} item={item} onOpen={() => setActive(item)} />)}
        </div>
      )}

      <AddButton onClick={() => setOpen(true)} label="Add video" />
      {open && <VideoUploader onClose={() => setOpen(false)} />}
      {active && <VideoLightbox item={active} onClose={() => setActive(null)} />}
    </AppShell>
  );
}

function VideoTile({ item, onOpen }: { item: VaultItem; onOpen: () => void }) {
  const url = useBlobUrl(item.blobKey);
  return (
    <button onClick={onOpen} className="glass animate-fade-up group relative block aspect-[9/16] w-full overflow-hidden rounded-2xl">
      {url ? (
        <video src={url} className="h-full w-full object-cover" muted playsInline preload="metadata" />
      ) : item.videoUrl ? (
        <div className="grid h-full place-items-center bg-aurora text-[hsl(0_0%_10%)]">
          <Link2 className="h-8 w-8" />
        </div>
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      <div className="absolute inset-0 grid place-items-center opacity-0 transition group-hover:opacity-100">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-aurora text-[hsl(0_0%_10%)] shadow-[var(--shadow-glow)]">
          <Play className="ml-0.5 h-6 w-6 fill-current" />
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-2.5 text-left">
        <p className="line-clamp-1 text-xs font-medium">{item.title || "Untitled clip"}</p>
      </div>
    </button>
  );
}

function VideoLightbox({ item, onClose }: { item: VaultItem; onClose: () => void }) {
  const url = useBlobUrl(item.blobKey);
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 p-4 backdrop-blur-xl animate-fade-up" onClick={onClose}>
      <div className="absolute right-4 top-4 z-10 flex gap-2">
        <button onClick={(e) => { e.stopPropagation(); vault.toggleFavorite(item.id); }} className="glass-strong rounded-full p-2.5">
          <Star className={`h-5 w-5 ${item.favorite ? "fill-[var(--peach)] text-[var(--peach)]" : ""}`} />
        </button>
        <button onClick={(e) => { e.stopPropagation(); vault.remove(item.id); onClose(); }} className="glass-strong rounded-full p-2.5">
          <Trash2 className="h-5 w-5" />
        </button>
        <button onClick={onClose} className="glass-strong rounded-full p-2.5"><X className="h-5 w-5" /></button>
      </div>
      {url && <video src={url} controls autoPlay className="max-h-[85vh] max-w-full rounded-2xl shadow-[var(--shadow-glow)]" onClick={(e) => e.stopPropagation()} />}
      {item.videoUrl && !url && (
        <a href={item.videoUrl} target="_blank" rel="noreferrer" className="glass-strong rounded-2xl p-6 text-center" onClick={(e) => e.stopPropagation()}>
          <Link2 className="mx-auto h-8 w-8" />
          <p className="mt-2 break-all">{item.videoUrl}</p>
          <p className="mt-1 text-xs text-muted-foreground">Open original</p>
        </a>
      )}
      {item.title && <p className="mt-4 font-display text-2xl">{item.title}</p>}
    </div>
  );
}

function VideoUploader({ onClose }: { onClose: () => void }) {
  const [blob, setBlob] = useState<Blob | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const camRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!blob) return setPreview(null);
    const u = URL.createObjectURL(blob);
    setPreview(u);
    return () => URL.revokeObjectURL(u);
  }, [blob]);

  const save = async () => {
    if (blob) {
      await vault.add({ kind: "video", title: title || undefined, tags, blob, mimeType: blob.type });
    } else if (link.trim()) {
      await vault.add({ kind: "video", title: title || undefined, tags, videoUrl: link.trim() });
    } else return;
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-md sm:items-center sm:p-6">
      <div className="glass-strong relative w-full max-w-lg rounded-t-3xl p-6 sm:rounded-3xl animate-fade-up">
        <button onClick={onClose} className="absolute right-3 top-3 rounded-full bg-black/40 p-1.5"><X className="h-4 w-4" /></button>
        <h3 className="font-display text-2xl">Save a video</h3>

        {!preview ? (
          <div className="mt-4 grid place-items-center rounded-3xl border-2 border-dashed border-white/15 bg-white/5 p-8 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-aurora shadow-[var(--shadow-glow)]">
              <Film className="h-7 w-7 text-[hsl(0_0%_10%)]" />
            </div>
            <p className="mt-3 text-sm">Upload, record, or paste a link</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <button onClick={() => fileRef.current?.click()} className="glass rounded-full px-4 py-2 text-sm">
                <Upload className="mr-1 inline h-4 w-4" /> Upload
              </button>
              <button onClick={() => camRef.current?.click()} className="glass rounded-full px-4 py-2 text-sm">
                <Camera className="mr-1 inline h-4 w-4" /> Record
              </button>
            </div>
            <input ref={fileRef} type="file" accept="video/*" className="hidden" onChange={(e) => e.target.files?.[0] && setBlob(e.target.files[0])} />
            <input ref={camRef} type="file" accept="video/*" capture="environment" className="hidden" onChange={(e) => e.target.files?.[0] && setBlob(e.target.files[0])} />
            <div className="mt-4 w-full">
              <div className="my-3 flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                <span className="h-px flex-1 bg-white/10" /> or paste link <span className="h-px flex-1 bg-white/10" />
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3">
                <Link2 className="h-4 w-4 text-muted-foreground" />
                <input
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://… (YouTube, TikTok, IG…)"
                  className="w-full bg-transparent py-2.5 text-sm outline-none"
                />
              </div>
            </div>
          </div>
        ) : (
          <video src={preview} controls className="mt-4 max-h-72 w-full rounded-2xl" />
        )}

        <div className="mt-4 space-y-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title (optional)"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm outline-none focus:border-white/25"
          />
          <TagInput tags={tags} onChange={setTags} />
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground">Cancel</button>
          <button
            onClick={save}
            disabled={!blob && !link.trim()}
            className="rounded-full bg-aurora px-5 py-2 text-sm font-semibold text-[hsl(0_0%_10%)] shadow-[var(--shadow-glow)] disabled:opacity-50"
          >
            Save to vault
          </button>
        </div>
      </div>
    </div>
  );
}
