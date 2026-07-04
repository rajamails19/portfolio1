import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PlusSquare, Image, Film, Quote, Layers, Send, X } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { topics } from "@/lib/data";

export const Route = createFileRoute("/create")({
  head: () => ({ meta: [{ title: "Create · Lumen" }] }),
  component: CreatePage,
});

const kinds = [
  { id: "image", label: "Image post", icon: Image, desc: "Share a visual with a caption" },
  { id: "reel", label: "Reel", icon: Film, desc: "Short video or animated concept" },
  { id: "quote", label: "Quote", icon: Quote, desc: "A sentence worth remembering" },
  { id: "carousel", label: "Carousel", icon: Layers, desc: "Swipeable slide thread" },
] as const;

function CreatePage() {
  const navigate = useNavigate();
  const [kind, setKind] = useState<"image" | "reel" | "quote" | "carousel">("image");
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [tag, setTag] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <AppShell>
        <div className="max-w-xl mx-auto px-4 py-16 text-center">
          <div className="glass-strong rounded-3xl p-10 shadow-soft">
            <p className="text-5xl mb-4">🎉</p>
            <h2 className="text-2xl font-extrabold mb-2">Post created!</h2>
            <p className="text-muted-foreground text-sm mb-6">
              "{title}" is ready. Publishing pipeline coming soon.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setTitle("");
                  setCaption("");
                  setTag("");
                }}
                className="px-5 py-2.5 rounded-full glass-strong font-semibold text-sm shadow-soft hover:bg-white/70 transition"
              >
                Create another
              </button>
              <button
                onClick={() => navigate({ to: "/" })}
                className="px-5 py-2.5 rounded-full dream-gradient text-white font-semibold text-sm shadow-soft"
              >
                Back to feed
              </button>
            </div>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="max-w-xl mx-auto px-4 py-6">
        {/* header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="size-9 rounded-xl dream-gradient grid place-items-center shadow-soft">
            <PlusSquare className="size-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold">Create</h1>
            <p className="text-xs text-muted-foreground">Drop something worth learning.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* post type */}
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">
              Post type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {kinds.map((k) => (
                <button
                  type="button"
                  key={k.id}
                  onClick={() => setKind(k.id)}
                  className={`glass-strong rounded-2xl p-4 text-left shadow-soft transition hover:-translate-y-0.5 ${
                    kind === k.id ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <div
                    className={`size-8 rounded-xl grid place-items-center mb-2 ${kind === k.id ? "dream-gradient" : "glass"}`}
                  >
                    <k.icon
                      className={`size-4 ${kind === k.id ? "text-white" : "text-foreground/70"}`}
                    />
                  </div>
                  <p className="font-semibold text-sm">{k.label}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{k.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* topic tag */}
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">
              Topic
            </label>
            <div className="flex flex-wrap gap-2">
              {topics.map((t) => (
                <button
                  type="button"
                  key={t.name}
                  onClick={() => setTag(tag === t.name ? "" : t.name)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                    tag === t.name
                      ? "dream-gradient text-white shadow-soft"
                      : "glass-strong hover:bg-white/70"
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          {/* title */}
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-2">
              {kind === "quote" ? "The quote" : "Title"}
            </label>
            <div className="relative">
              <textarea
                rows={2}
                placeholder={
                  kind === "quote"
                    ? "Drop a sentence that hits different…"
                    : "Write a punchy, curiosity-sparking title…"
                }
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full glass-strong rounded-2xl px-4 py-3 text-sm font-medium placeholder:text-muted-foreground outline-none focus:ring-2 ring-primary/40 transition shadow-soft resize-none"
              />
              {title && (
                <button
                  type="button"
                  onClick={() => setTitle("")}
                  className="absolute top-3 right-3"
                >
                  <X className="size-4 text-muted-foreground" />
                </button>
              )}
            </div>
          </div>

          {/* caption — not for quote */}
          {kind !== "quote" && (
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-2">
                Caption
              </label>
              <textarea
                rows={3}
                placeholder="Give context. What will they learn? Why does it matter?"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full glass-strong rounded-2xl px-4 py-3 text-sm placeholder:text-muted-foreground outline-none focus:ring-2 ring-primary/40 transition shadow-soft resize-none"
              />
            </div>
          )}

          {/* submit */}
          <button
            type="submit"
            disabled={!title.trim()}
            className="w-full py-3.5 rounded-2xl dream-gradient text-white font-bold text-base shadow-soft flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition"
          >
            <Send className="size-5" />
            Publish to feed
          </button>
        </form>
      </div>
    </AppShell>
  );
}
