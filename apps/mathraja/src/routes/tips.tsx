import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site-layout";
import { TIPS } from "@/lib/math-data";

export const Route = createFileRoute("/tips")({
  head: () => ({
    meta: [
      { title: "Tips & Tricks — MathDreams" },
      {
        name: "description",
        content: "Study tips and thinking tricks for kids and parents to build math confidence.",
      },
    ],
  }),
  component: TipsPage,
});

function TipsPage() {
  return (
    <PageShell
      eyebrow="Tips & Tricks"
      title="Habits that grow math brains"
      subtitle="Six tiny practices that quietly turn kids into confident, curious problem-solvers."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {TIPS.map((tip) => (
          <div key={tip.title} className="glass rounded-3xl p-6 shadow-soft">
            <div className="text-4xl">{tip.icon}</div>
            <h3 className="mt-3 font-display text-xl font-bold text-gradient">{tip.title}</h3>
            <p className="mt-2 text-foreground/80">{tip.body}</p>
          </div>
        ))}
      </div>

      <div className="glass mt-10 rounded-3xl p-8 shadow-soft">
        <h2 className="font-display text-2xl font-bold text-gradient">
          Zog's 3-step problem-solving ritual
        </h2>
        <ol className="mt-4 grid gap-4 md:grid-cols-3">
          {[
            {
              n: "1",
              t: "Understand",
              d: "Read it twice. Circle the question. Underline the numbers.",
            },
            {
              n: "2",
              t: "Plan",
              d: "Draw it. Pick an operation. Estimate what the answer should look like.",
            },
            { n: "3", t: "Check", d: "Does the answer make sense? Plug it back in to verify." },
          ].map((s) => (
            <div key={s.n} className="rounded-2xl bg-white/70 p-5">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-lg font-bold text-primary-foreground">
                {s.n}
              </div>
              <div className="mt-2 font-display text-lg font-bold">{s.t}</div>
              <p className="mt-1 text-sm text-foreground/70">{s.d}</p>
            </div>
          ))}
        </ol>
      </div>
    </PageShell>
  );
}
