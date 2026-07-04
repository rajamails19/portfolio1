import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Trash2, ExternalLink, Bookmark, PackageOpen } from "lucide-react";
import { useSavedStore } from "@/lib/saved-store";
import { AppShell } from "@/components/AppShell";
import { useState } from "react";

export const Route = createFileRoute("/saved/$folderId")({
  head: () => ({ meta: [{ title: "Folder · Lumen" }] }),
  component: FolderPage,
});

function FolderPage() {
  const { folderId } = Route.useParams();
  const { folders, itemsInFolder, removeFromFolder, deleteFolder } = useSavedStore();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const folder = folders.find((f) => f.id === folderId);
  const items = itemsInFolder(folderId);

  if (!folder) {
    return (
      <AppShell>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="glass-strong rounded-3xl p-10 text-center shadow-soft max-w-sm mx-4">
            <p className="text-4xl mb-4">📭</p>
            <h2 className="text-xl font-extrabold mb-2">Folder not found</h2>
            <Link
              to="/saved"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full dream-gradient text-white font-semibold shadow-soft mt-4"
            >
              <ArrowLeft className="size-4" /> Back to Saved
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="max-w-xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link
            to="/saved"
            className="size-9 rounded-xl glass-strong grid place-items-center shadow-soft hover:scale-105 transition shrink-0"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <div
            className={`size-12 rounded-2xl bg-gradient-to-br ${folder.gradient} grid place-items-center shadow-glow shrink-0`}
          >
            <span className="text-2xl">{folder.emoji}</span>
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-extrabold truncate">{folder.name}</h1>
            <p className="text-xs text-muted-foreground">
              {items.length} {items.length === 1 ? "item" : "items"}
            </p>
          </div>
          {!folder.builtIn && (
            <button
              onClick={() => setConfirmDelete(true)}
              className="size-9 rounded-xl glass grid place-items-center hover:bg-rose-100 hover:text-rose-600 transition shrink-0"
            >
              <Trash2 className="size-4" />
            </button>
          )}
        </div>

        {/* Delete confirm */}
        {confirmDelete && (
          <div className="mb-6 glass-strong rounded-2xl p-4 shadow-soft border border-rose-200/60">
            <p className="text-sm font-semibold mb-3">
              Delete "{folder.name}" and all {items.length} items inside?
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  deleteFolder(folderId);
                  window.history.back();
                }}
                className="flex-1 py-2 rounded-xl bg-rose-500 text-white text-sm font-semibold"
              >
                Delete
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="flex-1 py-2 rounded-xl glass text-sm font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Empty state */}
        {items.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex flex-col items-center gap-4">
              <div
                className={`size-20 rounded-3xl bg-gradient-to-br ${folder.gradient} grid place-items-center shadow-glow opacity-40`}
              >
                <PackageOpen className="size-9 text-white" />
              </div>
              <p className="text-lg font-extrabold">Nothing here yet</p>
              <p className="text-sm text-muted-foreground max-w-xs">
                Tap the bookmark icon on any post and choose "{folder.name}" to save it here.
              </p>
              <Link
                to="/"
                className="mt-2 px-5 py-2.5 rounded-full dream-gradient text-white font-semibold shadow-soft text-sm"
              >
                Browse the feed
              </Link>
            </div>
          </div>
        )}

        {/* Items grid */}
        {items.length > 0 && (
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="glass-strong rounded-2xl overflow-hidden shadow-soft flex gap-4 items-center group"
              >
                {item.img && (
                  <img src={item.img} alt={item.title} className="size-20 object-cover shrink-0" />
                )}
                {!item.img && (
                  <div
                    className={`size-20 bg-gradient-to-br ${folder.gradient} shrink-0 grid place-items-center`}
                  >
                    <span className="text-3xl">{folder.emoji}</span>
                  </div>
                )}
                <div className="py-3 min-w-0 flex-1">
                  <p className="text-[11px] text-primary font-semibold uppercase tracking-wide">
                    #{item.tag}
                  </p>
                  <p className="font-bold text-sm leading-tight mt-0.5 line-clamp-2">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{item.author}</p>
                </div>
                <div className="flex flex-col gap-2 mr-4 shrink-0">
                  {item.kind !== "quote" && (
                    <Link
                      to="/post/$postId"
                      params={{ postId: item.postId }}
                      target="_blank"
                      className="size-8 rounded-xl glass grid place-items-center hover:bg-primary/10 transition"
                    >
                      <ExternalLink className="size-3.5" />
                    </Link>
                  )}
                  <button
                    onClick={() => removeFromFolder(item.id)}
                    className="size-8 rounded-xl glass grid place-items-center hover:bg-rose-100 hover:text-rose-500 transition"
                  >
                    <Bookmark className="size-3.5 fill-primary text-primary" strokeWidth={1.8} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
