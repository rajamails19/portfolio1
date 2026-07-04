import { createFileRoute } from "@tanstack/react-router";
import { AppShell, TopBar } from "@/components/aura/AppShell";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "Progress — Aura" },
      { name: "description", content: "Your listening brain map, fluency tree, and achievement galaxy." },
    ],
  }),
  component: ProgressPage,
});

function ProgressPage() {
  return (
    <AppShell>
      <TopBar eyebrow="Your Universe" title="The shape of your voice." />

      <section className="px-6 space-y-6">
        {/* Listening Brain Map */}
        <div className="aspect-square rounded-[36px] glass relative overflow-hidden p-6">
          <p className="text-[10px] uppercase tracking-[0.3em] text-primary">Listening Brain Map</p>
          <svg viewBox="0 0 200 200" className="absolute inset-0 size-full" aria-hidden>
            <defs>
              <radialGradient id="g1" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="oklch(0.78 0.16 70)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="oklch(0.78 0.16 70)" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="100" cy="100" r="60" fill="url(#g1)" />
            {Array.from({ length: 36 }).map((_, i) => {
              const a = (i / 36) * Math.PI * 2;
              const r = 30 + ((i * 13) % 50);
              const x = 100 + Math.cos(a) * r;
              const y = 100 + Math.sin(a) * r;
              return <circle key={i} cx={x} cy={y} r={1.2} fill="oklch(0.78 0.16 70)" opacity={0.4 + ((i % 6) / 10)} />;
            })}
            {Array.from({ length: 18 }).map((_, i) => {
              const a1 = (i / 18) * Math.PI * 2;
              const a2 = ((i + 5) / 18) * Math.PI * 2;
              return (
                <line
                  key={i}
                  x1={100 + Math.cos(a1) * 70}
                  y1={100 + Math.sin(a1) * 70}
                  x2={100 + Math.cos(a2) * 70}
                  y2={100 + Math.sin(a2) * 70}
                  stroke="oklch(0.78 0.16 70 / 0.15)"
                  strokeWidth="0.5"
                />
              );
            })}
          </svg>
          <div className="absolute bottom-6 left-6 right-6">
            <p className="font-serif italic text-2xl">1,247 phrases heard</p>
            <p className="text-xs text-muted-foreground">across 6 languages</p>
          </div>
        </div>

        {/* Speaking Confidence Meter */}
        <div className="p-7 rounded-[32px] glass">
          <div className="flex items-end justify-between mb-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary">Speaking Confidence</p>
            <p className="font-serif italic text-3xl">B1</p>
          </div>
          <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
            <div className="h-full w-[62%] bg-gradient-to-r from-primary/60 to-primary rounded-full" />
          </div>
          <div className="flex justify-between mt-2 text-[10px] uppercase tracking-widest text-muted-foreground/60">
            <span>A1</span><span>A2</span><span className="text-primary">B1</span><span>B2</span><span>C1</span>
          </div>
        </div>

        {/* Achievement Galaxy */}
        <div className="p-7 rounded-[32px] glass">
          <p className="text-[10px] uppercase tracking-[0.3em] text-primary">Achievement Galaxy</p>
          <div className="grid grid-cols-4 gap-3 mt-5">
            {["First Word","7-Day Fire","Trill Master","Café Native","Airport Pro","Family Hero","Marathoner","Whisperer"].map((a, i) => (
              <div key={a} className="aspect-square rounded-2xl glass grid place-items-center text-center p-2">
                <div className="space-y-1">
                  <div className={`mx-auto size-6 rounded-full ${i < 5 ? "bg-primary orb-glow" : "bg-white/10"}`} />
                  <p className="text-[9px] leading-tight text-muted-foreground">{a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fluency Tree */}
        <div className="p-7 rounded-[32px] glass">
          <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-4">Fluency Growth Tree</p>
          <svg viewBox="0 0 300 200" className="w-full" aria-hidden>
            <path d="M150 200 L150 120" stroke="oklch(0.78 0.16 70)" strokeWidth="3" />
            <path d="M150 140 Q120 110 90 100" stroke="oklch(0.78 0.16 70 / 0.7)" strokeWidth="2" fill="none" />
            <path d="M150 140 Q180 110 210 100" stroke="oklch(0.78 0.16 70 / 0.7)" strokeWidth="2" fill="none" />
            <path d="M150 110 Q130 80 110 60" stroke="oklch(0.78 0.16 70 / 0.5)" strokeWidth="2" fill="none" />
            <path d="M150 110 Q170 80 190 60" stroke="oklch(0.78 0.16 70 / 0.5)" strokeWidth="2" fill="none" />
            {[
              [90, 100, "Café"], [210, 100, "Mercado"],
              [110, 60, "Family"], [190, 60, "Hotel"],
              [150, 30, "Airport"],
            ].map(([x, y, label], i) => (
              <g key={i}>
                <circle cx={x as number} cy={y as number} r={7} fill="oklch(0.78 0.16 70)" />
                <text x={x as number} y={(y as number) - 12} fontSize="8" fill="oklch(0.78 0.16 70)" textAnchor="middle">{label}</text>
              </g>
            ))}
          </svg>
        </div>
      </section>
    </AppShell>
  );
}