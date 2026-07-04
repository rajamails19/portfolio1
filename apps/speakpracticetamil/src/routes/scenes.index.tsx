import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, TopBar } from "@/components/aura/AppShell";
import { Waveform } from "@/components/aura/Waveform";
import { scenes } from "@/lib/aura-data";

export const Route = createFileRoute("/scenes/")({
  head: () => ({
    meta: [
      { title: "Scene Immersion — Aura" },
      { name: "description", content: "Cinematic environments to live inside." },
    ],
  }),
  component: ScenesPage,
});

function ScenesPage() {
  return (
    <AppShell>
      <TopBar
        eyebrow="Scene Immersion"
        title="Step inside a world."
      />
      <div className="px-6 space-y-5">
        {scenes.map((s, i) => (
          <Link
            key={s.slug}
            to="/scenes/$scene"
            params={{ scene: s.slug }}
            className={`block relative overflow-hidden rounded-[32px] ring-1 ring-white/5 group ${i === 0 ? "aspect-[4/5]" : "aspect-[5/4]"}`}
          >
            <img src={s.image} alt={s.name} loading="lazy" width={1024} height={1024} className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-1">{s.city} · {s.intensity}</p>
              <h3 className="font-serif italic text-3xl tracking-tight text-white">{s.name}</h3>
              <p className="text-sm text-white/60 mt-1 mb-4">{s.tagline}</p>
              <div className="flex items-center justify-between">
                <Waveform bars={5} className="text-primary h-5" />
                <span className="text-xs text-white/60">{s.duration}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}