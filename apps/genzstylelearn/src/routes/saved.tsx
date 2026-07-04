import { createFileRoute, Link } from "@tanstack/react-router";
import { Bookmark, FolderPlus, X, Check } from "lucide-react";
import { useState } from "react";
import { useSavedStore, GRADIENT_OPTIONS } from "@/lib/saved-store";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/saved")({
  head: () => ({ meta: [{ title: "Saved · Lumen" }] }),
  component: SavedPage,
});

/* ── emoji options for new folder ── */
const EMOJI_OPTIONS = ["📁", "🔖", "⭐", "🧠", "🔬", "🛠️", "🎯", "💡", "🚀", "📌", "❤️", "🎨"];

function SavedPage() {
  const { folders, countInFolder, createFolder } = useSavedStore();

  /* modal state */
  const [showModal, setShowModal] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [selectedGradient, setSelectedGradient] = useState(GRADIENT_OPTIONS[0].value);
  const [selectedEmoji, setSelectedEmoji] = useState("📁");

  async function handleCreate() {
    const name = folderName.trim();
    if (!name) return;
    await createFolder(name, selectedGradient, selectedEmoji);
    setFolderName("");
    setSelectedGradient(GRADIENT_OPTIONS[0].value);
    setSelectedEmoji("📁");
    setShowModal(false);
  }

  return (
    <AppShell>
      <div className="max-w-xl mx-auto px-4 py-6">
        {/* Page header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="size-9 rounded-xl dream-gradient grid place-items-center shadow-soft shrink-0">
            <Bookmark className="size-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold">Saved</h1>
            <p className="text-xs text-muted-foreground">Everything you've kept.</p>
          </div>
        </div>

        {/* Folders grid */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
            Your folders
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {folders.map((folder) => (
              <Link
                key={folder.id}
                to="/saved/$folderId"
                params={{ folderId: folder.id }}
                className="group glass-strong rounded-2xl p-4 text-left shadow-soft hover:-translate-y-0.5 transition block"
              >
                <div
                  className={`size-10 rounded-xl bg-gradient-to-br ${folder.gradient} grid place-items-center shadow-glow mb-3`}
                >
                  <span className="text-xl">{folder.emoji}</span>
                </div>
                <p className="text-sm font-semibold truncate">{folder.name}</p>
                <p className="text-[11px] text-muted-foreground">
                  {countInFolder(folder.id)} items
                </p>
              </Link>
            ))}

            {/* New folder button */}
            <button
              onClick={() => setShowModal(true)}
              className="rounded-2xl p-4 text-left border-2 border-dashed border-primary/40 hover:border-primary transition flex flex-col items-start justify-center gap-2"
            >
              <div className="size-10 rounded-xl glass grid place-items-center">
                <FolderPlus className="size-5 text-primary" />
              </div>
              <p className="text-sm font-semibold text-primary">New folder</p>
            </button>
          </div>
        </section>
      </div>

      {/* ── New Folder Modal ── */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div className="w-full max-w-sm glass-strong rounded-3xl shadow-glow p-6 animate-fade-up">
            {/* Modal header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-extrabold">New folder</h2>
              <button
                onClick={() => setShowModal(false)}
                className="size-8 rounded-full glass grid place-items-center hover:bg-white/60 transition"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Preview */}
            <div className="flex items-center gap-4 mb-5 p-4 glass rounded-2xl">
              <div
                className={`size-14 rounded-2xl bg-gradient-to-br ${selectedGradient} grid place-items-center shadow-glow shrink-0`}
              >
                <span className="text-3xl">{selectedEmoji}</span>
              </div>
              <div>
                <p className="font-extrabold text-base truncate max-w-[180px]">
                  {folderName || "Folder name"}
                </p>
                <p className="text-xs text-muted-foreground">0 items</p>
              </div>
            </div>

            {/* Name input */}
            <label className="block mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5 block">
                Name
              </span>
              <input
                autoFocus
                type="text"
                placeholder="e.g. Research papers"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                maxLength={32}
                className="w-full rounded-xl px-4 py-2.5 text-sm font-medium bg-white/60 border border-white/60 focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-foreground/30"
              />
            </label>

            {/* Emoji picker */}
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 block">
                Icon
              </span>
              <div className="flex flex-wrap gap-2">
                {EMOJI_OPTIONS.map((em) => (
                  <button
                    key={em}
                    onClick={() => setSelectedEmoji(em)}
                    className={`size-9 rounded-xl text-lg transition ${
                      selectedEmoji === em
                        ? "ring-2 ring-primary shadow-glow bg-white/80"
                        : "glass hover:bg-white/60"
                    }`}
                  >
                    {em}
                  </button>
                ))}
              </div>
            </div>

            {/* Color picker */}
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 block">
                Colour
              </span>
              <div className="flex flex-wrap gap-2">
                {GRADIENT_OPTIONS.map((g) => (
                  <button
                    key={g.value}
                    onClick={() => setSelectedGradient(g.value)}
                    className={`size-9 rounded-xl bg-gradient-to-br ${g.value} shadow-soft transition relative`}
                  >
                    {selectedGradient === g.value && (
                      <span className="absolute inset-0 rounded-xl ring-2 ring-white ring-offset-1 ring-offset-transparent flex items-center justify-center">
                        <Check className="size-4 text-white drop-shadow" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 rounded-xl glass text-sm font-semibold hover:bg-white/60 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={!folderName.trim()}
                className="flex-1 py-2.5 rounded-xl dream-gradient text-white text-sm font-semibold shadow-soft disabled:opacity-40 transition"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
