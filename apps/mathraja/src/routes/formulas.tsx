import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site-layout";
import { FORMULAS } from "@/lib/math-data";

export const Route = createFileRoute("/formulas")({
  head: () => ({
    meta: [
      { title: "Math Formulas — MathDreams" },
      { name: "description", content: "A friendly cheat-sheet of essential math formulas." },
    ],
  }),
  component: FormulasPage,
});

function FormulasPage() {
  return (
    <PageShell
      eyebrow="Formulas"
      title="Your friendly cheat-sheet"
      subtitle="The formulas kids actually need — with a mini example so they stick."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {FORMULAS.map((sec) => (
          <div key={sec.category} className="glass rounded-3xl p-6 shadow-soft">
            <h2 className="font-display text-2xl font-bold text-gradient">{sec.category}</h2>
            <ul className="mt-4 space-y-3">
              {sec.items.map((it) => (
                <li
                  key={it.name}
                  className="rounded-2xl bg-white/70 p-4 transition hover:bg-white"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-semibold">{it.name}</span>
                    <code className="rounded-lg bg-primary/10 px-2 py-0.5 font-mono text-sm font-bold text-primary">
                      {it.formula}
                    </code>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">e.g. {it.example}</div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
