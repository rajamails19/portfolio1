import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell, TopBar } from "@/components/aura/AppShell";
import { Waveform } from "@/components/aura/Waveform";

export const Route = createFileRoute("/shadowing")({
  head: () => ({
    meta: [
      { title: "Shadowing Studio — Aura" },
      { name: "description", content: "Speak in sync with native speakers. Karaoke for fluency." },
    ],
  }),
  component: ShadowingPage,
});

const words = ["Quiero", "un", "café", "con", "leche,", "por", "favor."];

function ShadowingPage() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % (words.length + 2)), 650);
    return () => clearInterval(t);
  }, []);

  return (
    <AppShell>
      <TopBar eyebrow="Shadowing Studio" title="Speak alongside." />

      <div className="px-6 space-y-8">
        <div className="rounded-[32px] glass p-8 space-y-8">
          <p className="font-serif italic text-4xl leading-tight tracking-tight text-balance">
            {words.map((w, i) => (
              <span
                key={i}
                className={`transition-colors duration-300 ${i < active ? "text-primary" : i === active ? "text-foreground" : "text-muted-foreground/40"}`}
              >
                {w}{" "}
              </span>
            ))}
          </p>
          <p className="text-sm text-muted-foreground">I want a coffee with milk, please.</p>
        </div>

        {/* Waveform comparison */}
        <div className="rounded-[32px] glass p-6 space-y-6">
          <div className="flex justify-between text-[10px] uppercase tracking-widest">
            <span className="text-primary">Native</span>
            <span className="text-muted-foreground">You</span>
          </div>
          <div className="space-y-4">
            <Waveform bars={32} className="text-primary h-10 w-full justify-between flex" />
            <Waveform bars={32} className="text-muted-foreground h-10 w-full justify-between flex" />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Match</span>
            <span className="text-primary font-semibold">87%</span>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full w-[87%] bg-primary rounded-full" />
          </div>
        </div>

        <div className="flex gap-3">
          {["0.5×", "0.75×", "1×"].map((s, i) => (
            <button key={s} className={`flex-1 py-3 rounded-full text-xs uppercase tracking-widest ${i === 1 ? "bg-primary text-primary-foreground" : "glass text-muted-foreground"}`}>
              {s}
            </button>
          ))}
        </div>

        <button className="w-full py-5 rounded-full bg-primary text-primary-foreground font-medium tracking-tight orb-glow">
          Begin Shadow
        </button>
      </div>
    </AppShell>
  );
}