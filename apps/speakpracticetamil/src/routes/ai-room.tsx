import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/aura/AppShell";
import { Waveform } from "@/components/aura/Waveform";
import { images } from "@/lib/aura-data";

export const Route = createFileRoute("/ai-room")({
  head: () => ({
    meta: [
      { title: "AI Conversation Room — Aura" },
      { name: "description", content: "Voice-first conversations with an AI fluent in the world." },
      { property: "og:image", content: images.aiAvatar },
    ],
  }),
  component: AiRoom,
});

function AiRoom() {
  return (
    <AppShell hideDock>
      <div className="relative min-h-[100svh] flex flex-col">
        <img src={images.aiAvatar} alt="" loading="lazy" width={1024} height={1280} className="absolute inset-0 size-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/40 to-background" />

        <header className="relative z-10 flex items-center justify-between px-6 pt-10">
          <a href="/" className="text-xs uppercase tracking-widest text-muted-foreground">← Exit</a>
          <span className="text-[10px] uppercase tracking-[0.3em] text-primary">AI Conversation</span>
          <span className="text-xs text-muted-foreground tabular-nums">12:04</span>
        </header>

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-primary">Aria is speaking</p>
          <p className="mt-4 font-serif italic text-3xl leading-tight tracking-tight max-w-sm text-balance">
            "¿Y qué te trajo a Madrid esta semana?"
          </p>
          <p className="text-sm text-muted-foreground mt-3">What brought you to Madrid this week?</p>

          <div className="mt-12">
            <Waveform bars={9} className="text-primary h-16" />
          </div>
        </div>

        <div className="relative z-10 px-6 pb-10 space-y-4">
          <div className="flex justify-center gap-3">
            {["Beginner", "Intermediate", "Advanced"].map((l, i) => (
              <span key={l} className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-widest ${i === 1 ? "bg-primary text-primary-foreground" : "glass text-muted-foreground"}`}>
                {l}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-center gap-6 pt-4">
            <button className="glass size-14 rounded-full grid place-items-center text-xl">⏸</button>
            <button className="size-20 rounded-full bg-primary text-primary-foreground grid place-items-center orb-glow [animation:breathe_2.4s_ease-in-out_infinite]">
              <Waveform bars={3} className="text-primary-foreground h-7" />
            </button>
            <button className="glass size-14 rounded-full grid place-items-center text-xl">⏭</button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}