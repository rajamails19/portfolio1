import { createFileRoute, Link } from "@tanstack/react-router";
import { Play, Volume2, Heart, MessageCircle, Send, Bookmark, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { feed } from "@/lib/data";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/reels")({
  head: () => ({ meta: [{ title: "Reels · Lumen" }] }),
  component: ReelsPage,
});

const reels = feed.filter((p) => p.kind === "reel") as Extract<
  (typeof feed)[number],
  { kind: "reel" }
>[];

function ReelsPage() {
  return (
    <AppShell>
      <div className="max-w-[480px] mx-auto px-3 sm:px-0 py-6">
        <div className="flex items-center gap-3 mb-6 px-1">
          <Link to="/" className="hover:text-primary transition">
            <ArrowLeft className="size-5" />
          </Link>
          <h1 className="text-xl font-extrabold">Reels</h1>
          <span className="text-sm text-muted-foreground font-medium">{reels.length} drops</span>
        </div>

        <div className="flex flex-col gap-8">
          {reels.map((reel) => (
            <ReelCard key={reel.id} reel={reel} />
          ))}
        </div>

        <div className="mt-10 glass-strong rounded-3xl p-6 text-center shadow-soft">
          <p className="text-2xl mb-2">🎬</p>
          <p className="font-bold text-base">More reels incoming</p>
          <p className="text-sm text-muted-foreground mt-1">
            New drops every day. Come back tomorrow.
          </p>
        </div>
      </div>
    </AppShell>
  );
}

function ReelCard({ reel }: { reel: Extract<(typeof feed)[number], { kind: "reel" }> }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [playing, setPlaying] = useState(false);

  return (
    <article className="glass-strong rounded-3xl shadow-soft overflow-hidden">
      {/* author */}
      <header className="flex items-center gap-3 px-4 py-3">
        <div className="story-ring shrink-0">
          <div className="size-9 rounded-full bg-white grid place-items-center text-xs font-bold text-primary">
            {reel.author.slice(0, 2).toUpperCase()}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold">
            {reel.author} <span className="text-primary">·</span>{" "}
            <span className="font-normal text-muted-foreground">{reel.time}</span>
          </p>
          <p className="text-[11px] text-muted-foreground">#{reel.tag}</p>
        </div>
      </header>

      {/* video frame */}
      <div className="relative mx-3 mb-3 overflow-hidden rounded-2xl shadow-soft">
        <img src={reel.img} alt={reel.title} className="w-full aspect-[4/5] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* play button */}
        <button
          onClick={() => setPlaying(!playing)}
          className="absolute inset-0 grid place-items-center"
        >
          <span
            className={`size-16 rounded-full glass-strong grid place-items-center shadow-glow transition-all ${playing ? "opacity-0" : "animate-float"}`}
          >
            <Play className="size-7 text-primary fill-primary" />
          </span>
        </button>

        {playing && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="glass-strong rounded-2xl px-6 py-4 text-center">
              <p className="text-2xl mb-1">▶️</p>
              <p className="text-sm font-semibold text-white">Playing in your head</p>
              <p className="text-xs text-white/70 mt-1">Video player coming soon</p>
            </div>
          </div>
        )}

        <span className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full glass text-[11px] font-semibold text-white">
          <Play className="size-3 fill-white" /> {reel.duration}
        </span>
        <span className="absolute top-3 right-3 size-8 rounded-full glass grid place-items-center">
          <Volume2 className="size-4 text-white" />
        </span>

        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <h2 className="text-xl font-extrabold leading-tight drop-shadow">{reel.title}</h2>
        </div>
      </div>

      {/* actions */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setLiked(!liked)} className="hover:scale-110 transition">
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
        <p className="mt-3 text-sm font-semibold">{reel.likes} learners</p>
        <p className="mt-1 text-sm text-foreground/80">
          <span className="font-semibold">{reel.author}</span> {reel.caption}
        </p>
      </div>
    </article>
  );
}
