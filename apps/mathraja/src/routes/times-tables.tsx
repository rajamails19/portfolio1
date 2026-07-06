import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/site-layout";

export const Route = createFileRoute("/times-tables")({
  head: () => ({
    meta: [
      { title: "Times Tables 1–12 — MathDreams" },
      { name: "description", content: "Interactive multiplication tables from 1 to 12." },
    ],
  }),
  component: TimesTablesPage,
});

function TimesTablesPage() {
  const [n, setN] = useState(7);
  return (
    <PageShell
      eyebrow="Times Tables"
      title="Multiplication mountain"
      subtitle="Tap a number to reveal its full table. Print, chant, race Zog — whatever makes it stick."
    >
      <div className="mb-8 flex flex-wrap gap-2">
        {Array.from({ length: 12 }, (_, i) => i + 1).map((k) => (
          <button
            key={k}
            onClick={() => setN(k)}
            className={
              "grid h-11 w-11 place-items-center rounded-2xl font-bold transition " +
              (k === n
                ? "bg-primary text-primary-foreground shadow-glow"
                : "glass hover:-translate-y-0.5")
            }
          >
            {k}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="glass rounded-3xl p-6 shadow-soft">
          <h2 className="font-display text-3xl font-bold text-gradient">The {n} times table</h2>
          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((k) => (
              <div
                key={k}
                className="animate-pop rounded-2xl bg-white/70 px-4 py-3 text-center font-semibold shadow-soft"
                style={{ animationDelay: `${k * 30}ms` }}
              >
                <span className="text-muted-foreground">
                  {n} × {k} =
                </span>{" "}
                <span className="text-primary">{n * k}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-3xl p-6 shadow-soft">
          <h2 className="font-display text-2xl font-bold text-gradient">Full 12×12 grid</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-center text-sm">
              <thead>
                <tr>
                  <th className="p-1"></th>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((c) => (
                    <th key={c} className="p-1 font-bold text-primary">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((r) => (
                  <tr key={r}>
                    <th className="p-1 font-bold text-primary">{r}</th>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((c) => {
                      const hi = r === n || c === n;
                      return (
                        <td
                          key={c}
                          className={
                            "rounded-md p-1 font-medium " +
                            (hi ? "bg-primary/15 text-primary" : "text-foreground/70")
                          }
                        >
                          {r * c}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
