import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { AddButton } from "@/components/AddButton";
import { EmptyState } from "@/components/EmptyState";
import { TagInput } from "@/components/TagInput";
import { useVaultItems, filterItems } from "@/hooks/use-vault";
import { vault, type VaultItem } from "@/lib/vault-storage";
import { FileText, Star, Trash2, X } from "lucide-react";

export const Route = createFileRoute("/text")({
  head: () => ({ meta: [{ title: "Text — My Capture Vault" }, { name: "description", content: "Capture quick notes, ideas, and quotes." }] }),
  component: TextPage,
});

const HUES = [320, 350, 50, 280, 200, 160];

function TextPage() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const items = filterItems(useVaultItems("text"), q);

  return (
    <AppShell search={q} onSearch={setQ}>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="font-display text-4xl">Text</h1>
          <p className="text-sm text-muted-foreground">Catch ideas before they fade.</p>
        </div>
        <span className="text-xs text-muted-foreground">{items.length} notes</span>
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon={<FileText className="h-8 w-8 text-[hsl(0_0%_10%)]" />}
          title="No notes yet"
          description="A blank page is waiting for your next great idea."
          action={
            <button onClick={() => setOpen(true)} className="rounded-full bg-aurora px-5 py-2.5 text-sm font-semibold text-[hsl(0_0%_10%)] shadow-[var(--shadow-glow)]">
              Write your first note
            </button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <NoteCard key={item.id} item={item} hue={HUES[i % HUES.length]} />
          ))}
        </div>
      )}

      <AddButton onClick={() => setOpen(true)} label="New note" />
      {open && <NoteEditor onClose={() => setOpen(false)} />}
    </AppShell>
  );
}

function NoteCard({ item, hue }: { item: VaultItem; hue: number }) {
  return (
    <div
      className="glass animate-fade-up group relative overflow-hidden rounded-3xl p-5 transition hover:-translate-y-0.5"
      style={{ boxShadow: `0 8px 40px oklch(0.78 0.14 ${hue} / 0.2)` }}
    >
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-40 blur-2xl"
        style={{ background: `oklch(0.85 0.18 ${hue})` }}
      />
      {item.title && <h3 className="mb-2 font-display text-xl">{item.title}</h3>}
      <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90 line-clamp-[10]">{item.text}</p>
      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex flex-wrap gap-1">
          {item.tags.slice(0, 3).map((t) => (
            <span key={t} className="rounded-full bg-white/10 px-2 py-0.5">#{t}</span>
          ))}
        </div>
        <div className="flex items-center gap-1.5 opacity-0 transition group-hover:opacity-100">
          <button onClick={() => vault.toggleFavorite(item.id)} className="rounded-full bg-white/5 p-1.5 hover:bg-white/10">
            <Star className={`h-3.5 w-3.5 ${item.favorite ? "fill-[var(--peach)] text-[var(--peach)]" : ""}`} />
          </button>
          <button onClick={() => vault.remove(item.id)} className="rounded-full bg-white/5 p-1.5 hover:bg-white/10">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <div className="mt-2 text-[10px] uppercase tracking-wider text-muted-foreground">
        {new Date(item.createdAt).toLocaleString()}
      </div>
    </div>
  );
}

function NoteEditor({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const save = async () => {
    if (!text.trim()) return;
    await vault.add({ kind: "text", title: title || undefined, text: text.trim(), tags });
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-md sm:items-center sm:p-6">
      <div className="glass-strong relative w-full max-w-lg rounded-t-3xl p-6 sm:rounded-3xl animate-fade-up">
        <button onClick={onClose} className="absolute right-3 top-3 rounded-full bg-black/40 p-1.5"><X className="h-4 w-4" /></button>
        <h3 className="font-display text-2xl">New note</h3>
        <div className="mt-4 space-y-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title (optional)"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 outline-none focus:border-white/25"
          />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write anything…"
            rows={8}
            autoFocus
            className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-relaxed outline-none focus:border-white/25"
          />
          <TagInput tags={tags} onChange={setTags} />
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground">Cancel</button>
          <button
            onClick={save}
            disabled={!text.trim()}
            className="rounded-full bg-aurora px-5 py-2 text-sm font-semibold text-[hsl(0_0%_10%)] shadow-[var(--shadow-glow)] disabled:opacity-50"
          >
            Save note
          </button>
        </div>
      </div>
    </div>
  );
}
