import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Bookmark,
  MessageCircle,
  Send,
  MoreHorizontal,
  Play,
  Volume2,
  Sparkles,
  FolderPlus,
  Layers,
  ChevronRight,
  Heart,
  Film,
  Check,
} from "lucide-react";

import mascot from "@/assets/mascot.png";
import { topics, feed } from "@/lib/data";
import type { Post } from "@/lib/data";
import { AppShell } from "@/components/AppShell";
import { useSavedStore } from "@/lib/saved-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumen — Scroll. Learn. Build AI." },
      {
        name: "description",
        content:
          "An Instagram-style hub for learning AI engineering. Stories, reels, papers, prompts — a dreamy feed for curious minds.",
      },
    ],
  }),
  component: Index,
});

/* ---------------- page ---------------- */

function Index() {
  return (
    <AppShell right={<RightCategories />}>
      <StoriesRail />
      <Feed />
    </AppShell>
  );
}

/* ---------------- stories rail ---------------- */

function StoriesRail() {
  return (
    <section className="sticky top-0 z-20">
      <div className="glass border-b border-white/40 px-4 lg:px-8 py-4">
        <div className="flex gap-4 overflow-x-auto scrollbar-none">
          <button className="flex flex-col items-center gap-1.5 shrink-0">
            <div className="relative">
              <div className="size-16 rounded-full glass-strong grid place-items-center shadow-soft">
                <img
                  src={mascot}
                  alt="you"
                  className="size-14 rounded-full"
                  width={56}
                  height={56}
                />
              </div>
              <span className="absolute -bottom-1 -right-1 size-6 rounded-full dream-gradient grid place-items-center text-white text-sm font-bold ring-2 ring-white">
                +
              </span>
            </div>
            <span className="text-[11px] text-muted-foreground">Your path</span>
          </button>

          {topics.map((t) => (
            <button key={t.name} className="flex flex-col items-center gap-1.5 shrink-0 group">
              <div className="story-ring group-hover:scale-105 transition">
                <div className="size-16 rounded-full bg-white p-0.5 relative overflow-hidden">
                  <img
                    src={t.img}
                    alt={t.name}
                    loading="lazy"
                    className="size-full rounded-full object-cover"
                    width={64}
                    height={64}
                  />
                  {t.live && (
                    <span
                      className="absolute -bottom-0 left-1/2 -translate-x-1/2 translate-y-1 px-2 py-0.5 rounded-md text-[10px] font-bold text-white"
                      style={{ background: "oklch(0.65 0.22 25)" }}
                    >
                      LIVE
                    </span>
                  )}
                </div>
              </div>
              <span className="text-[11px] font-medium max-w-16 truncate">{t.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- feed ---------------- */

function Feed() {
  return (
    <div className="mx-auto max-w-[480px] lg:max-w-[520px] px-3 sm:px-0 py-6 flex flex-col gap-8">
      {feed.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
      <EndOfFeed />
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [savedToFolder, setSavedToFolder] = useState<string | null>(null);
  const { folders, saveToFolder } = useSavedStore();

  const accent = "cardAccent" in post && post.cardAccent ? post.cardAccent : null;

  function handleSaveToFolder(folderId: string) {
    const postWithImg = post as Post & { img?: string; title?: string };
    saveToFolder(folderId, {
      postId: post.id,
      title: "title" in post ? (post.title ?? "") : "quote" in post ? post.quote.slice(0, 60) : "",
      tag: post.tag,
      author: post.author,
      img: "img" in postWithImg ? postWithImg.img : undefined,
      kind: post.kind,
    });
    setSavedToFolder(folderId);
    setTimeout(() => setSavedToFolder(null), 1800);
  }

  return (
    <article
      className={`rounded-3xl shadow-soft overflow-hidden ${accent ? `bg-gradient-to-br ${accent} border-2 border-white/40` : "glass-strong"}`}
    >
      {/* header */}
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="story-ring shrink-0">
            <div className="size-9 rounded-full bg-white grid place-items-center text-xs font-bold text-primary">
              {post.author.slice(0, 2).toUpperCase()}
            </div>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">
              {post.author} <span className="text-primary">·</span>{" "}
              <span className="font-normal text-muted-foreground">{post.time}</span>
            </p>
            <p className="text-[11px] text-muted-foreground truncate">#{post.tag}</p>
          </div>
        </div>
        <button className="size-8 grid place-items-center rounded-full hover:bg-white/60">
          <MoreHorizontal className="size-5" />
        </button>
      </header>

      {/* body */}
      {post.kind === "quote" ? (
        <div className="dream-gradient mx-3 mb-3 rounded-2xl p-8 text-center shadow-soft">
          <p className="text-2xl sm:text-3xl font-serif italic leading-snug text-foreground/90">
            "{post.quote}"
          </p>
          <p className="mt-4 text-sm font-semibold text-foreground/70">— {post.by}</p>
        </div>
      ) : (
        <div className="relative mx-3 mb-3 overflow-hidden rounded-2xl shadow-soft group">
          <img
            src={post.img}
            alt={post.title}
            loading="lazy"
            className={`w-full object-cover ${accent ? "aspect-[4/3]" : "aspect-[4/5]"}`}
            width={768}
            height={1024}
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t ${accent ? "from-indigo-900/60 via-transparent to-transparent" : "from-black/70 via-black/10 to-transparent"}`}
          />

          {"reelId" in post && post.reelId ? (
            <Link
              to="/reel/$reelId"
              params={{ reelId: post.reelId }}
              className="absolute bottom-0 left-0 right-0 p-5 text-white group/link"
            >
              <p className="text-[11px] uppercase tracking-widest opacity-80">#{post.tag}</p>
              <h2 className="mt-1 text-xl sm:text-2xl font-extrabold leading-tight drop-shadow group-hover/link:underline underline-offset-2">
                {post.title}
              </h2>
            </Link>
          ) : "articleId" in post && post.articleId ? (
            <Link
              to="/post/$postId"
              params={{ postId: post.articleId }}
              target="_blank"
              className="absolute bottom-0 left-0 right-0 p-5 text-white group/link"
            >
              <p className="text-[11px] uppercase tracking-widest opacity-80">#{post.tag}</p>
              <h2 className="mt-1 text-xl sm:text-2xl font-extrabold leading-tight drop-shadow group-hover/link:underline underline-offset-2">
                {post.title}
              </h2>
            </Link>
          ) : (
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
              <p className="text-[11px] uppercase tracking-widest opacity-80">#{post.tag}</p>
              <h2 className="mt-1 text-xl sm:text-2xl font-extrabold leading-tight drop-shadow">
                {post.title}
              </h2>
            </div>
          )}

          {post.kind === "reel" && (
            <>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="size-16 rounded-full glass-strong grid place-items-center shadow-glow animate-float">
                  <Play className="size-7 text-primary fill-primary" />
                </span>
              </div>
              <span className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full glass text-[11px] font-semibold">
                <Film className="size-3" /> {post.duration}
              </span>
              <span className="absolute top-3 right-3 size-8 rounded-full glass grid place-items-center">
                <Volume2 className="size-4" />
              </span>
            </>
          )}

          {post.kind === "carousel" && (
            <>
              <span className="absolute top-3 right-3 px-2 py-1 rounded-full glass text-[11px] font-semibold flex items-center gap-1">
                <Layers className="size-3" /> 1/{post.slides}
              </span>
              <button className="absolute right-3 top-1/2 -translate-y-1/2 size-9 rounded-full glass-strong grid place-items-center shadow-soft">
                <ChevronRight className="size-5" />
              </button>
            </>
          )}
        </div>
      )}

      {/* actions */}
      <div className="px-4 pb-4">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <div className="flex items-center gap-4">
            <button onClick={() => setLiked(!liked)} className="transition hover:scale-110">
              <Heart
                className={`size-7 ${liked ? "fill-rose-500 text-rose-500" : ""}`}
                strokeWidth={1.8}
              />
            </button>
            <button className="hover:scale-110 transition">
              <MessageCircle className="size-7" strokeWidth={1.8} />
            </button>
            <button className="hover:scale-110 transition">
              <Send className="size-7" strokeWidth={1.8} />
            </button>
          </div>
          <button onClick={() => setSaved(!saved)} className="hover:scale-110 transition">
            <Bookmark
              className={`size-7 ${saved ? "fill-primary text-primary" : ""}`}
              strokeWidth={1.8}
            />
          </button>
        </div>

        <p className="mt-3 text-sm font-semibold">
          {post.kind === "quote" ? `${post.likes} resonated` : `${post.likes} learners`}
        </p>
        {post.kind !== "quote" && (
          <p className="mt-1 text-sm leading-relaxed">
            <span className="font-semibold">{post.author}</span>{" "}
            <span className="text-foreground/80">{post.caption}</span>
          </p>
        )}

        {saved && (
          <div className="mt-3 glass rounded-2xl p-3 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-xs font-semibold pr-1 shrink-0">Save to →</span>
            {folders.slice(0, 6).map((f) => (
              <button
                key={f.id}
                onClick={() => handleSaveToFolder(f.id)}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-gradient-to-br ${f.gradient} shadow-soft transition`}
              >
                {savedToFolder === f.id ? (
                  <Check className="size-3.5" />
                ) : (
                  <span className="text-xs leading-none">{f.emoji}</span>
                )}
                {f.name}
              </button>
            ))}
            <Link
              to="/saved"
              className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold glass-strong"
            >
              <FolderPlus className="size-3.5" /> New
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}

function EndOfFeed() {
  return (
    <div className="text-center py-10">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-strong shadow-soft">
        <Sparkles className="size-4 text-primary animate-pulse" />
        <span className="text-sm font-medium">Brewing more for you…</span>
      </div>
    </div>
  );
}

/* ---------------- right categories (desktop) ---------------- */

function RightCategories() {
  const { folders, countInFolder } = useSavedStore();

  return (
    <aside className="hidden xl:flex fixed right-0 top-0 h-screen w-80 flex-col gap-4 px-5 py-6 glass border-l border-white/40 z-20 overflow-y-auto">
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Your folders
        </h3>
        <p className="text-sm text-foreground/70 mt-1">Tap to open a folder.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {folders.map((f) => (
          <Link
            key={f.id}
            to="/saved/$folderId"
            params={{ folderId: f.id }}
            className="group glass-strong rounded-2xl p-4 text-left shadow-soft hover:-translate-y-0.5 transition"
          >
            <div
              className={`size-10 rounded-xl bg-gradient-to-br ${f.gradient} grid place-items-center shadow-glow mb-3`}
            >
              <span className="text-xl">{f.emoji}</span>
            </div>
            <p className="text-sm font-semibold truncate">{f.name}</p>
            <p className="text-[11px] text-muted-foreground">{countInFolder(f.id)} items</p>
          </Link>
        ))}
        <Link
          to="/saved"
          className="rounded-2xl p-4 text-left border-2 border-dashed border-primary/40 hover:border-primary transition flex flex-col items-start justify-center gap-2"
        >
          <div className="size-10 rounded-xl glass grid place-items-center">
            <FolderPlus className="size-5 text-primary" />
          </div>
          <p className="text-sm font-semibold text-primary">New folder</p>
        </Link>
      </div>

      <div className="mt-4 glass-strong rounded-3xl p-5 shadow-soft relative overflow-hidden">
        <div className="absolute -right-6 -top-6 size-32 dream-gradient rounded-full blur-2xl opacity-70" />
        <div className="relative">
          <img
            src={mascot}
            alt=""
            className="size-16 rounded-2xl mb-3 animate-float"
            width={64}
            height={64}
          />
          <p className="text-base font-bold leading-tight">Your daily AI snack 🍡</p>
          <p className="text-xs text-muted-foreground mt-1">
            3-min read · Transformers, explained like you're 12.
          </p>
          <Link
            to="/post/$postId"
            params={{ postId: "1" }}
            target="_blank"
            className="mt-3 block w-full py-2 rounded-xl text-white font-semibold dream-gradient shadow-soft text-center text-sm"
          >
            Open today's drop
          </Link>
        </div>
      </div>

      <div className="glass rounded-2xl p-4">
        <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
          Trending now
        </h4>
        <ul className="text-sm space-y-1.5">
          {["#mixture-of-experts", "#flash-attention-3", "#agentic-rag", "#world-models"].map(
            (t) => (
              <li key={t}>
                <button
                  onClick={() => window.open(`/search?q=${t.slice(1)}`, "_self")}
                  className="hover:text-primary font-medium transition"
                >
                  {t}
                </button>
              </li>
            ),
          )}
        </ul>
      </div>
    </aside>
  );
}
