import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/aura/AppShell";
import { Waveform } from "@/components/aura/Waveform";
import { shorts } from "@/lib/aura-data";

export const Route = createFileRoute("/shorts")({
  head: () => ({
    meta: [
      { title: "Video Shorts — Aura" },
      { name: "description", content: "10-30 second cinematic moments in your target language." },
    ],
  }),
  component: ShortsPage,
});

function ShortsPage() {
  return (
    <AppShell>
      <div className="snap-y snap-mandatory h-[100svh] overflow-y-auto -mb-36">
        {shorts.map((s) => (
          <article key={s.id} className="snap-start relative h-[100svh] w-full">
            <img src={s.image} alt="" loading="lazy" width={1024} height={1280} className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-background/40" />

            {/* Top meta */}
            <div className="absolute top-10 inset-x-6 flex items-center justify-between z-10">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-primary">{s.language}</p>
                <p className="text-xs text-muted-foreground">{s.city} · {s.duration}</p>
              </div>
              <button className="glass px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest">CC</button>
            </div>

            {/* Caption */}
            <div className="absolute bottom-44 inset-x-6 space-y-3 z-10">
              <p className="font-serif italic text-3xl leading-tight text-balance">{s.caption}</p>
              <p className="text-sm text-muted-foreground">{s.translation}</p>
              <Waveform bars={9} className="text-primary h-6" />
            </div>

            {/* Right rail */}
            <div className="absolute right-5 bottom-48 flex flex-col items-center gap-5 z-10">
              {["½×", "1×", "↺"].map((l) => (
                <button key={l} className="glass size-12 rounded-full grid place-items-center text-sm font-semibold">
                  {l}
                </button>
              ))}
              <button className="size-14 rounded-full bg-primary text-primary-foreground grid place-items-center font-bold orb-glow">
                🎤
              </button>
            </div>
          </article>
        ))}
      </div>
    </AppShell>
  );
}