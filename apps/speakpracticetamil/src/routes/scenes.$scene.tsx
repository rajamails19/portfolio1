import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppShell } from "@/components/aura/AppShell";
import { Waveform } from "@/components/aura/Waveform";
import { scenes } from "@/lib/aura-data";

export const Route = createFileRoute("/scenes/$scene")({
  loader: ({ params }) => {
    const scene = scenes.find((s) => s.slug === params.scene);
    if (!scene) throw notFound();
    return scene;
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: `${loaderData.name} — Aura` },
            { name: "description", content: loaderData.tagline },
            { property: "og:image", content: loaderData.image },
          ],
        }
      : {},
  component: SceneDetail,
  notFoundComponent: () => (
    <AppShell><div className="p-10 text-center text-muted-foreground">Scene not found.</div></AppShell>
  ),
  errorComponent: ({ error }) => (
    <AppShell><div className="p-10 text-center text-muted-foreground">{error.message}</div></AppShell>
  ),
});

function SceneDetail() {
  const scene = Route.useLoaderData();

  return (
    <AppShell hideDock>
      <div className="relative min-h-[100svh]">
        <img src={scene.image} alt={scene.name} width={1024} height={1280} className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/50" />

        <header className="relative z-10 flex items-center justify-between px-6 pt-10">
          <Link to="/scenes" className="text-xs uppercase tracking-widest text-muted-foreground">← Scenes</Link>
          <span className="text-[10px] uppercase tracking-[0.3em] text-primary">{scene.city}</span>
        </header>

        <div className="absolute inset-x-0 bottom-10 px-6 z-10 space-y-6">
          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary">Live ambient · {scene.intensity}</p>
            <h1 className="font-serif italic text-5xl leading-[0.95] tracking-tight text-balance">{scene.name}</h1>
            <p className="text-base text-muted-foreground">{scene.tagline}</p>
          </div>

          <div className="glass-strong rounded-[28px] p-5 space-y-3">
            <div className="flex items-center justify-between">
              <Waveform bars={18} className="text-primary h-7" />
              <span className="text-xs text-muted-foreground tabular-nums">02:14 / {scene.duration}</span>
            </div>
            <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
              <div className="h-full w-1/3 bg-primary rounded-full" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {["Subtitles", "Slow 0.7×", "Translate"].map((l) => (
              <button key={l} className="glass py-3 rounded-2xl text-xs uppercase tracking-widest text-muted-foreground">
                {l}
              </button>
            ))}
          </div>

          <button className="w-full py-5 rounded-full bg-primary text-primary-foreground font-medium tracking-tight orb-glow flex items-center justify-center gap-3">
            <Waveform bars={3} className="text-primary-foreground h-5" />
            Enter Scene
          </button>
        </div>
      </div>
    </AppShell>
  );
}