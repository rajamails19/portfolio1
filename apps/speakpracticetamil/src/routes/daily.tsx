import { createFileRoute } from "@tanstack/react-router";
import { AppShell, TopBar } from "@/components/aura/AppShell";
import { Waveform } from "@/components/aura/Waveform";

export const Route = createFileRoute("/daily")({
  head: () => ({
    meta: [
      { title: "Daily Mimic — Aura" },
      { name: "description", content: "One sentence a day. Build a streak you can hear." },
    ],
  }),
  component: DailyPage,
});

const days = Array.from({ length: 14 }, (_, i) => i);

function DailyPage() {
  return (
    <AppShell>
      <TopBar eyebrow="Daily Mimic" title="A sentence a day." />

      <section className="px-6 space-y-8">
        {/* Streak */}
        <div className="relative p-8 rounded-[40px] bg-gradient-to-br from-primary/20 via-card to-background border border-primary/20 overflow-hidden">
          <div className="absolute -right-20 -top-20 size-64 bg-primary/30 blur-[100px]" />
          <div className="relative flex items-end justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary">Streak</p>
              <p className="font-serif italic text-7xl text-primary leading-none mt-2">14</p>
              <p className="text-sm text-muted-foreground mt-2">consecutive days</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Best</p>
              <p className="font-serif italic text-2xl">21</p>
            </div>
          </div>

          <div className="relative mt-8 grid grid-cols-7 gap-2">
            {days.map((d) => (
              <div
                key={d}
                className={`aspect-square rounded-lg ${d < 14 ? "bg-primary [box-shadow:0_0_8px_rgba(245,158,11,0.4)]" : "bg-white/5"}`}
              />
            ))}
          </div>
        </div>

        {/* Today's challenge */}
        <div className="p-8 rounded-[40px] glass space-y-6">
          <p className="text-[10px] uppercase tracking-[0.3em] text-primary">Today's challenge</p>
          <p className="font-serif italic text-3xl leading-tight tracking-tight text-balance">
            "El ferrocarril recorre rápidamente."
          </p>
          <p className="text-sm text-muted-foreground">Master the perfect double-r trill.</p>

          <div className="flex items-center justify-between pt-2">
            <Waveform bars={12} className="text-primary h-8" />
            <span className="text-xs text-muted-foreground">3 takes left</span>
          </div>

          <button className="w-full py-5 rounded-full bg-primary text-primary-foreground font-medium tracking-tight orb-glow">
            Take the Challenge
          </button>
        </div>
      </section>
    </AppShell>
  );
}