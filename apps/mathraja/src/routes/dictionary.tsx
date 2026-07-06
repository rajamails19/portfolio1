import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/site-layout";
import { DICTIONARY } from "@/lib/math-data";

export const Route = createFileRoute("/dictionary")({
  head: () => ({
    meta: [
      { title: "Math Dictionary — MathDreams" },
      { name: "description", content: "Simple, kid-friendly definitions of math words." },
    ],
  }),
  component: DictionaryPage,
});

function DictionaryPage() {
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () =>
      DICTIONARY.filter(
        (d) =>
          d.term.toLowerCase().includes(q.toLowerCase()) ||
          d.def.toLowerCase().includes(q.toLowerCase()),
      ),
    [q],
  );

  return (
    <PageShell
      eyebrow="Dictionary"
      title="Math words, in kid speak"
      subtitle="Every tricky word gets a plain-English definition and a real example."
    >
      <div className="glass mb-8 flex items-center gap-3 rounded-full p-2 pl-5 shadow-soft">
        <span className="text-lg">🔎</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search a term… (try 'prime' or 'perimeter')"
          className="w-full bg-transparent py-2 text-base outline-none"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((d) => (
          <div key={d.term} className="glass rounded-3xl p-5 shadow-soft">
            <div className="flex items-baseline justify-between">
              <h3 className="font-display text-xl font-bold text-primary">{d.term}</h3>
              <span className="text-xs text-muted-foreground">n.</span>
            </div>
            <p className="mt-2 text-foreground/80">{d.def}</p>
            <p className="mt-2 rounded-xl bg-white/70 p-3 text-sm text-foreground/70">
              <b className="text-primary">Example:</b> {d.ex}
            </p>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="glass col-span-full rounded-3xl p-8 text-center text-muted-foreground">
            No word matches "{q}". Try a shorter search.
          </div>
        )}
      </div>
    </PageShell>
  );
}
