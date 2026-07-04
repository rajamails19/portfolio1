import { createFileRoute } from "@tanstack/react-router";
import { Compass } from "lucide-react";
import { topics, feed } from "@/lib/data";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/explore")({
  head: () => ({ meta: [{ title: "Explore · Lumen" }] }),
  component: ExplorePage,
});

const imagePosts = feed.filter((p) => p.kind !== "quote") as Extract<
  (typeof feed)[number],
  { img: string }
>[];

function ExplorePage() {
  return (
    <AppShell>
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="size-9 rounded-xl dream-gradient grid place-items-center shadow-soft">
            <Compass className="size-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold">Explore</h1>
            <p className="text-xs text-muted-foreground">Pick a topic. Go deep.</p>
          </div>
        </div>

        {/* topics grid */}
        <section className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
            All topics
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {topics.map((t) => (
              <button
                key={t.name}
                className="group glass-strong rounded-2xl overflow-hidden shadow-soft hover:-translate-y-0.5 transition text-left"
              >
                <div className="relative h-24 overflow-hidden">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {t.live && (
                    <span
                      className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold text-white"
                      style={{ background: "oklch(0.65 0.22 25)" }}
                    >
                      LIVE
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <p className="font-bold text-sm">{t.name}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">{t.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* trending posts */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
            Trending this week
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {imagePosts.map((p) => (
              <div key={p.id} className="glass-strong rounded-2xl overflow-hidden shadow-soft">
                <div className="relative">
                  <img src={p.img} alt={p.title} className="w-full aspect-square object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 p-3">
                    <p className="text-[10px] uppercase tracking-widest text-white/70">#{p.tag}</p>
                    <p className="text-xs font-bold text-white leading-tight line-clamp-2 mt-0.5">
                      {p.title}
                    </p>
                  </div>
                </div>
                <div className="px-3 py-2">
                  <p className="text-[11px] text-muted-foreground">{p.likes} learners</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
