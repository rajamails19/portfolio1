import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site-layout";
import { GRADES } from "@/lib/math-data";

export const Route = createFileRoute("/grades/")({
  head: () => ({
    meta: [
      { title: "Grades 1–6 — MathDreams" },
      { name: "description", content: "Choose your grade level, from grade 1 to grade 6." },
    ],
  }),
  component: GradesIndex,
});

function GradesIndex() {
  return (
    <PageShell
      eyebrow="Grades"
      title="Choose your grade"
      subtitle="Each grade unlocks the topics that matter most for that year, with kid-friendly explanations and playful practice."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {GRADES.map((g) => (
          <Link
            key={g.grade}
            to="/grades/$grade"
            params={{ grade: String(g.grade) }}
            className="group glass relative overflow-hidden rounded-3xl p-7 transition hover:-translate-y-1 hover:shadow-glow"
          >
            <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${g.color} opacity-70`} />
            <div className="flex items-start justify-between">
              <div>
                <div className="font-display text-5xl font-bold">{g.title}</div>
                <div className="mt-1 font-medium text-foreground/70">{g.subtitle}</div>
              </div>
              <div className="glass grid h-14 w-14 place-items-center rounded-2xl text-xl font-bold">
                {g.grade}
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {g.topics.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-white/70 px-2.5 py-1 text-[11px] font-medium capitalize text-foreground/70"
                >
                  {t.replace("-", " ")}
                </span>
              ))}
            </div>
            <div className="mt-6 text-sm font-semibold text-primary">Enter grade →</div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
