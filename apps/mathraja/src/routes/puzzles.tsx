import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/site-layout";
import { PUZZLES } from "@/lib/math-data";

export const Route = createFileRoute("/puzzles")({
  head: () => ({
    meta: [
      { title: "Math Puzzles — MathDreams" },
      { name: "description", content: "Bite-sized math puzzles that make thinking feel fun." },
    ],
  }),
  component: PuzzlesPage,
});

function PuzzlesPage() {
  return (
    <PageShell
      eyebrow="Puzzles"
      title="Brain snacks"
      subtitle="Little puzzles that spark big thinking — perfect for a bedtime challenge or a lunchbox note."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {PUZZLES.map((p) => (
          <PuzzleCard key={p.title} p={p} />
        ))}
      </div>
    </PageShell>
  );
}

function PuzzleCard({ p }: { p: (typeof PUZZLES)[number] }) {
  const [show, setShow] = useState(false);
  const diffColor =
    p.diff === "Easy" ? "bg-emerald-200/70" : p.diff === "Medium" ? "bg-amber-200/70" : "bg-rose-200/70";
  return (
    <div className="glass rounded-3xl p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-glow">
      <div className="flex items-start justify-between">
        <h3 className="font-display text-2xl font-bold text-gradient">{p.title}</h3>
        <span className={`rounded-full ${diffColor} px-2.5 py-1 text-[11px] font-semibold`}>
          {p.diff}
        </span>
      </div>
      <p className="mt-3 text-foreground/80">{p.body}</p>
      <button
        onClick={() => setShow((s) => !s)}
        className="mt-4 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow"
      >
        {show ? "Hide answer" : "Reveal answer"}
      </button>
      {show && (
        <div className="animate-pop mt-4 rounded-2xl bg-white/70 p-4 text-sm">
          <b className="text-primary">Answer:</b> {p.answer}
        </div>
      )}
    </div>
  );
}
