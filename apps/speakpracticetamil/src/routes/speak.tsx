import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, TopBar } from "@/components/aura/AppShell";
import { ProgressRing } from "@/components/aura/ProgressRing";
import { Waveform } from "@/components/aura/Waveform";
import { speakCards } from "@/lib/aura-data";

export const Route = createFileRoute("/speak")({
  head: () => ({
    meta: [
      { title: "Speak Cards — Aura" },
      { name: "description", content: "One sentence at a time. Listen, repeat, perfect." },
    ],
  }),
  component: SpeakPage,
});

function SpeakPage() {
  const [index, setIndex] = useState(0);
  const [reps, setReps] = useState(0);
  const [recording, setRecording] = useState(false);
  const card = speakCards[index];

  const trigger = () => {
    if (recording) {
      setRecording(false);
      setReps((r) => Math.min(r + 1, 10));
    } else {
      setRecording(true);
    }
  };

  const next = () => {
    setIndex((i) => (i + 1) % speakCards.length);
    setReps(0);
  };

  return (
    <AppShell>
      <TopBar
        eyebrow="Speak Cards"
        title="One sentence at a time."
        right={
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
            {index + 1}/{speakCards.length}
          </span>
        }
      />

      <div className="px-6">
        <div className="relative aspect-[3/4] rounded-[40px] glass p-8 flex flex-col justify-between overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

          <div className="flex justify-between items-start relative">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary">{card.language}</p>
              <p className="text-xs text-muted-foreground mt-1">{card.category} · {card.level}</p>
            </div>
            <ProgressRing value={reps} size={56} />
          </div>

          <div className="relative space-y-4">
            <p className="font-serif italic text-4xl leading-[1.05] tracking-tight text-balance">
              {card.phrase}
            </p>
            <p className="text-sm text-muted-foreground">{card.translation}</p>
          </div>

          <div className="relative flex items-center justify-center h-20">
            <Waveform bars={11} className="text-primary h-14" active={recording} />
          </div>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 mt-8">
          <button
            className="text-xs uppercase tracking-widest text-muted-foreground py-3 hover:text-foreground"
            onClick={() => setIndex((i) => (i - 1 + speakCards.length) % speakCards.length)}
          >
            ← Prev
          </button>

          <button
            onClick={trigger}
            className="relative grid place-items-center size-20 rounded-full bg-primary text-primary-foreground orb-glow transition-transform active:scale-90"
            aria-label={recording ? "Stop" : "Record"}
          >
            {recording ? (
              <span className="size-5 rounded-md bg-primary-foreground" />
            ) : (
              <Waveform bars={3} className="text-primary-foreground h-7" />
            )}
          </button>

          <button
            className="text-xs uppercase tracking-widest text-muted-foreground py-3 hover:text-foreground"
            onClick={next}
          >
            Next →
          </button>
        </div>

        {reps >= 10 && (
          <div className="mt-8 p-5 rounded-3xl bg-primary/10 border border-primary/20 text-center [animation:breathe_1.6s_ease-out_1]">
            <p className="font-serif italic text-xl text-primary">Perfected ✦</p>
            <p className="text-xs text-muted-foreground mt-1">This phrase now lives in your voice.</p>
          </div>
        )}
      </div>
    </AppShell>
  );
}