import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/aura/AppShell";
import { Waveform } from "@/components/aura/Waveform";
import { images } from "@/lib/aura-data";

export const Route = createFileRoute("/echo")({
  head: () => ({
    meta: [
      { title: "Echo Chamber — Aura" },
      { name: "description", content: "Listen, repeat, listen, repeat. An immersive sci-fi voice room." },
      { property: "og:image", content: images.echoChamber },
    ],
  }),
  component: EchoPage,
});

function EchoPage() {
  const [mode, setMode] = useState<"listen" | "speak">("listen");
  return (
    <AppShell hideDock>
      <div className="relative min-h-[100svh]">
        <img src={images.echoChamber} alt="" loading="lazy" width={1024} height={1280} className="absolute inset-0 size-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/20 to-background" />

        <header className="relative z-10 flex items-center justify-between px-6 pt-10">
          <a href="/" className="text-xs uppercase tracking-widest text-muted-foreground">← Exit</a>
          <span className="text-[10px] uppercase tracking-[0.3em] text-primary">Echo Chamber</span>
          <span className="text-xs text-muted-foreground tabular-nums">04:21</span>
        </header>

        <div className="relative z-10 flex flex-col items-center justify-center pt-24 pb-32 px-6 text-center">
          {/* Orb */}
          <div className="relative size-64 grid place-items-center">
            <span className="absolute inset-0 rounded-full bg-primary/10 [animation:ring-pulse_3s_ease-out_infinite]" />
            <span className="absolute inset-6 rounded-full bg-primary/15 [animation:ring-pulse_3s_ease-out_1s_infinite]" />
            <span className="absolute inset-12 rounded-full bg-gradient-to-br from-primary to-[oklch(0.6_0.18_50)] orb-glow [animation:breathe_3s_ease-in-out_infinite]" />
            <Waveform bars={5} className="text-primary-foreground h-10 relative z-10" active={mode === "speak"} />
          </div>

          <p className="mt-10 text-[10px] uppercase tracking-[0.3em] text-primary">
            {mode === "listen" ? "Now listening" : "Repeat after the voice"}
          </p>
          <p className="mt-3 font-serif italic text-3xl tracking-tight text-balance max-w-sm">
            ¿Dónde está la biblioteca?
          </p>
          <p className="text-sm text-muted-foreground mt-2">Where is the library?</p>
        </div>

        <div className="absolute bottom-10 inset-x-6 z-10 glass-strong rounded-full p-2 flex">
          <button
            onClick={() => setMode("listen")}
            className={`flex-1 py-3 rounded-full text-xs uppercase tracking-widest transition ${mode === "listen" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
          >
            Listen
          </button>
          <button
            onClick={() => setMode("speak")}
            className={`flex-1 py-3 rounded-full text-xs uppercase tracking-widest transition ${mode === "speak" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
          >
            Repeat
          </button>
        </div>
      </div>
    </AppShell>
  );
}