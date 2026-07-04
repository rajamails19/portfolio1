import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/aura/AppShell";
import { Waveform } from "@/components/aura/Waveform";
import { ProgressRing } from "@/components/aura/ProgressRing";
import { images, scenes, speakCards } from "@/lib/aura-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aura — Speak the world before you read it" },
      { name: "description", content: "A cinematic listening and speaking platform. Lose yourself in the sound of a new language." },
      { property: "og:title", content: "Aura — Speak the world" },
      { property: "og:description", content: "Listen. Repeat. Speak. Premium language immersion." },
      { property: "og:image", content: images.heroMadrid },
      { name: "twitter:image", content: images.heroMadrid },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <AppShell>
      {/* Cinematic Hero */}
      <section className="relative w-full h-[88svh] -mt-px overflow-hidden">
        <img
          src={images.heroMadrid}
          alt="Cinematic Madrid night portrait"
          className="absolute inset-0 size-full object-cover"
          width={1024}
          height={1024}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background/80 to-transparent" />

        <header className="relative z-10 flex items-center justify-between px-6 pt-10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-primary">Aura</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/80">The Listening Engine</p>
          </div>
          <button className="glass size-10 rounded-full grid place-items-center" aria-label="Profile">
            <span className="size-2 rounded-full bg-primary" />
          </button>
        </header>

        <div className="absolute bottom-10 inset-x-0 px-6 z-10 space-y-6">
          <div className="space-y-3 max-w-[26ch]">
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary">Now Streaming · Spanish</p>
            <h1 className="font-serif text-[44px] leading-[0.95] tracking-tight italic text-balance text-foreground">
              Lose yourself in the sound of Madrid.
            </h1>
            <p className="text-[15px] text-muted-foreground text-pretty">
              Forget grammar. Just listen to the rhythm of native souls.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/scenes/$scene"
              params={{ scene: "cafe" }}
              className="group flex items-center gap-3 pl-4 pr-6 py-3 rounded-full bg-primary text-primary-foreground font-medium tracking-tight transition-transform active:scale-95"
            >
              <Waveform bars={4} className="text-primary-foreground h-5" />
              <span>Enter Session</span>
            </Link>
            <Link
              to="/marathon"
              className="text-sm text-muted-foreground tracking-tight underline-offset-4 hover:underline"
            >
              Or just listen →
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Access Row */}
      <section className="px-6 -mt-8 relative z-20">
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 -mx-6 px-6">
          {[
            { to: "/echo", label: "Echo", sub: "Repeat loop" },
            { to: "/shadowing", label: "Shadow", sub: "Speak with" },
            { to: "/ai-room", label: "AI Room", sub: "Talk back" },
            { to: "/marathon", label: "Marathon", sub: "Passive" },
            { to: "/daily", label: "Mimic", sub: "1 a day" },
          ].map((q) => (
            <Link
              key={q.to}
              to={q.to}
              className="shrink-0 w-28 aspect-square glass rounded-3xl p-4 flex flex-col justify-between transition-transform active:scale-95"
            >
              <span className="size-2 rounded-full bg-primary/80" />
              <div>
                <p className="font-semibold tracking-tight text-foreground">{q.label}</p>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70">{q.sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Continue Speaking */}
      <section className="pt-12 pb-2">
        <div className="px-6 flex items-end justify-between mb-5">
          <h2 className="font-serif text-2xl italic">Continue Speaking</h2>
          <Link to="/speak" className="text-[10px] uppercase tracking-widest text-muted-foreground/70 hover:text-foreground">
            All 12
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar px-6 pb-4">
          {speakCards.slice(0, 4).map((c) => (
            <Link
              key={c.id}
              to="/speak"
              className="shrink-0 w-64 p-6 rounded-[28px] glass ring-1 ring-white/5 relative overflow-hidden"
            >
              <div className="absolute top-5 right-5">
                <ProgressRing value={c.reps} />
              </div>
              <p className="text-[10px] uppercase tracking-widest text-primary mb-2">{c.language}</p>
              <p className="font-serif italic text-2xl leading-tight tracking-tight text-foreground mb-3 mt-12 text-balance">
                {c.phrase}
              </p>
              <p className="text-xs text-muted-foreground">{c.category} · {c.level}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Tonight's Immersion */}
      <section className="pt-8">
        <div className="px-6 flex items-end justify-between mb-5">
          <h2 className="font-serif text-2xl italic">Tonight's Immersion</h2>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground/70">
            6 scenes
          </span>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar px-6 pb-4">
          {scenes.slice(0, 4).map((s) => (
            <Link
              key={s.slug}
              to="/scenes/$scene"
              params={{ scene: s.slug }}
              className="shrink-0 w-[280px] aspect-[4/5] rounded-[28px] overflow-hidden relative group ring-1 ring-white/5"
            >
              <img src={s.image} alt={s.name} loading="lazy" width={1024} height={1280} className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />
              <div className="absolute inset-x-0 bottom-0 p-6 space-y-1">
                <p className="text-[10px] uppercase tracking-[0.25em] text-primary">{s.city}</p>
                <h3 className="font-serif italic text-2xl tracking-tight text-white">{s.name}</h3>
                <p className="text-xs text-white/60">{s.duration} · {s.intensity}</p>
              </div>
              <div className="absolute top-5 right-5 glass rounded-full size-10 grid place-items-center">
                <Waveform bars={3} className="text-primary h-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Daily Mimic + Listening Marathon */}
      <section className="px-6 pt-10 space-y-4">
        <Link to="/daily" className="block p-7 rounded-[32px] bg-gradient-to-br from-card to-background border border-primary/15 relative overflow-hidden">
          <div className="absolute -right-12 -top-12 size-48 bg-primary/15 blur-[80px]" />
          <div className="relative flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-primary [animation:breathe_2s_ease-in-out_infinite]" />
                <span className="text-[10px] uppercase tracking-widest text-primary">Daily Mimic</span>
              </div>
              <p className="font-serif italic text-3xl tracking-tight max-w-[12ch]">14 day streak</p>
              <p className="text-xs text-muted-foreground">Master the perfect Spanish trill today.</p>
            </div>
            <div className="text-right">
              <p className="font-serif italic text-5xl text-primary">14</p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">days</p>
            </div>
          </div>
          <div className="mt-6 h-1 w-full rounded-full bg-white/5 overflow-hidden">
            <div className="h-full w-2/3 rounded-full bg-primary shadow-[0_0_12px_rgba(245,158,11,0.4)]" />
          </div>
        </Link>

        <Link to="/marathon" className="block relative overflow-hidden p-7 rounded-[32px] glass">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-widest text-primary">Listening Marathon</p>
              <p className="font-serif italic text-2xl tracking-tight">Hands free fluency.</p>
              <p className="text-xs text-muted-foreground">15, 30 or 60 minutes of native speech.</p>
            </div>
            <Waveform bars={6} className="text-primary h-10" />
          </div>
        </Link>
      </section>
    </AppShell>
  );
}
