import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, TopBar } from "@/components/aura/AppShell";
import { Waveform } from "@/components/aura/Waveform";

export const Route = createFileRoute("/marathon")({
  head: () => ({
    meta: [
      { title: "Listening Marathon — Aura" },
      { name: "description", content: "Hands-free passive immersion. 15, 30, or 60 minutes." },
    ],
  }),
  component: MarathonPage,
});

const options = [
  { mins: 15, label: "The Walk", desc: "A short stroll of voices" },
  { mins: 30, label: "The Commute", desc: "Half hour of native flow" },
  { mins: 60, label: "The Long Drive", desc: "One full hour, hands free" },
];

function MarathonPage() {
  const [sel, setSel] = useState(1);
  return (
    <AppShell>
      <TopBar eyebrow="Listening Marathon" title="Hands free fluency." />

      <section className="px-6 space-y-4">
        {options.map((o, i) => (
          <button
            key={o.mins}
            onClick={() => setSel(i)}
            className={`w-full text-left p-6 rounded-[28px] glass relative overflow-hidden transition ${i === sel ? "ring-2 ring-primary" : "ring-1 ring-white/5"}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-primary">{o.label}</p>
                <p className="font-serif italic text-3xl mt-2 tracking-tight">{o.mins} min</p>
                <p className="text-xs text-muted-foreground mt-1">{o.desc}</p>
              </div>
              <Waveform bars={Math.max(4, Math.floor(o.mins / 6))} className="text-primary h-10" active={i === sel} />
            </div>
          </button>
        ))}

        <div className="pt-4 space-y-3">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground text-center">Perfect for</p>
          <div className="flex gap-2 justify-center flex-wrap">
            {["Driving", "Walking", "Gym", "Chores", "Sleep"].map((t) => (
              <span key={t} className="px-3 py-1.5 rounded-full glass text-[10px] uppercase tracking-widest text-muted-foreground">{t}</span>
            ))}
          </div>
        </div>

        <button className="w-full py-5 mt-6 rounded-full bg-primary text-primary-foreground font-medium tracking-tight orb-glow">
          Begin {options[sel].mins}-Minute Marathon
        </button>
      </section>
    </AppShell>
  );
}