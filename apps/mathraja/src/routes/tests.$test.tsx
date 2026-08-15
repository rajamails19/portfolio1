import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/site-layout";
import { TESTS, type Test, type TestProblem } from "@/lib/test-data";
import { additionWorking, subtractionWorking } from "@/lib/column-math";

function normalize(s: string): string {
  const last = s.trim().split("\n").pop() ?? s;
  const afterColon = last.includes(":") ? last.slice(last.lastIndexOf(":") + 1) : last;
  return afterColon
    .toLowerCase()
    .replace(/[,$\s]/g, "")
    .replace(/^answer/, "");
}

export const Route = createFileRoute("/tests/$test")({
  loader: ({ params }): Test => {
    const t = TESTS.find((x) => x.slug === params.test);
    if (!t) throw notFound();
    return t;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.title} — MathDreams` : "Test · MathDreams" },
      { name: "description", content: loaderData?.subtitle ?? "Math practice test" },
    ],
  }),
  component: TestDetail,
});

function TestDetail() {
  const t = Route.useLoaderData() as Test;
  const totalProblems = t.sections.reduce((n, s) => n + s.problems.length, 0);

  return (
    <div className="aurora min-h-[100dvh]">
      <SiteHeader />

      <section className="mx-auto max-w-5xl px-4 pt-10 sm:px-6">
        <div className="flex flex-wrap gap-2">
          <Link
            to="/grades/$grade"
            params={{ grade: String(t.grade) }}
            className="glass rounded-full px-3 py-1 text-xs font-semibold"
          >
            ← Grade {t.grade}
          </Link>
        </div>
        <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
          <span className="text-gradient">{t.title}</span>
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">{t.subtitle}</p>
        <p className="mt-1 text-sm text-foreground/60">
          {t.sections.length} sections · {totalProblems} problems
        </p>
      </section>

      <section className="mx-auto mt-8 max-w-5xl space-y-4 px-4 pb-10 sm:px-6">
        {t.sections.map((s, si) => (
          <SectionCard key={si} section={s} sectionIndex={si} />
        ))}
      </section>

      <SiteFooter />
    </div>
  );
}

function SectionCard({
  section,
  sectionIndex,
}: {
  section: Test["sections"][number];
  sectionIndex: number;
}) {
  const [open, setOpen] = useState(sectionIndex === 0);
  const [showSolutions, setShowSolutions] = useState(false);

  return (
    <div className="glass overflow-hidden rounded-3xl shadow-soft">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left sm:px-6"
      >
        <span className="flex items-center gap-3">
          <span className="text-2xl">{section.emoji}</span>
          <span className="font-display text-xl font-bold sm:text-2xl">
            {sectionIndex + 1}. {section.title}
          </span>
        </span>
        <span className="text-sm font-semibold text-foreground/60">
          {section.problems.length} problems {open ? "▲" : "▼"}
        </span>
      </button>

      {open && (
        <div className="border-t border-white/40 px-5 pb-6 pt-4 sm:px-6">
          {section.analogy && (
            <p className="mb-4 rounded-2xl bg-primary/10 px-4 py-3 text-sm text-foreground/75">
              💡 {section.analogy}
            </p>
          )}

          <ol className="space-y-3">
            {section.problems.map((p, pi) => (
              <ProblemRow key={pi} index={pi} problem={p} showSolutions={showSolutions} />
            ))}
          </ol>

          <button
            onClick={() => setShowSolutions((s) => !s)}
            className="mt-5 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-glow"
          >
            {showSolutions ? "Hide solutions" : "Show solutions"}
          </button>
        </div>
      )}
    </div>
  );
}

function ProblemRow({
  index,
  problem,
  showSolutions,
}: {
  index: number;
  problem: TestProblem;
  showSolutions: boolean;
}) {
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const correct = checked && normalize(value) === normalize(problem.a) && value.trim() !== "";

  const worked = problem.grid
    ? problem.grid.op === "+"
      ? additionWorking(problem.grid.a, problem.grid.b)
      : subtractionWorking(problem.grid.a, problem.grid.b)
    : null;
  const exprLabel = problem.grid
    ? `${problem.grid.a.toLocaleString()} ${problem.grid.op} ${problem.grid.b.toLocaleString()}`
    : null;

  return (
    <li className="rounded-2xl bg-white/60 p-4">
      <div className="flex gap-3">
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
          {index + 1}
        </span>
        <span className="font-semibold text-foreground/90">{problem.q}</span>
      </div>

      <div className="ml-9 mt-3 flex flex-wrap items-center gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setChecked(false);
          }}
          placeholder="Your answer"
          className="w-40 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-base font-semibold text-foreground shadow-sm outline-none focus:border-primary sm:w-56 sm:text-sm"
        />
        <button
          onClick={() => setChecked(true)}
          className="rounded-full bg-primary/90 px-4 py-2 text-xs font-bold text-primary-foreground"
        >
          Check
        </button>
        <button
          onClick={() => setShowHint((h) => !h)}
          className="rounded-full border border-amber-400/60 bg-amber-100/70 px-4 py-2 text-xs font-bold text-amber-800"
        >
          💡 {showHint ? "Hide hint" : "Hint"}
        </button>
        {checked && (
          <span
            className={`text-sm font-bold ${correct ? "text-emerald-600" : "text-rose-500"}`}
          >
            {correct ? "✅ Correct!" : "❌ Try again"}
          </span>
        )}
      </div>

      {showHint && (
        <div className="ml-9 mt-2 rounded-2xl bg-amber-50 p-4">
          {exprLabel && (
            <p className="font-display text-lg font-bold text-amber-900">✨ {exprLabel}</p>
          )}
          {worked && (
            <pre className="mt-3 overflow-x-auto rounded-xl bg-white/70 px-4 py-3 font-mono text-base leading-7 text-amber-950">
              {worked.grid.join("\n")}
            </pre>
          )}
          <div className="mt-3 space-y-1">
            {(worked?.steps ?? problem.hint ?? []).map((line, li) => (
              <p key={li} className="font-mono text-sm font-semibold text-amber-900">
                {line}
              </p>
            ))}
          </div>
          <p className="mt-3 font-display text-base font-bold text-amber-800">⭐ {problem.a}</p>
        </div>
      )}

      {showSolutions && (
        <div className="ml-9 mt-2 whitespace-pre-line rounded-xl bg-emerald-100/60 px-3 py-2 text-sm text-emerald-900">
          {problem.a}
        </div>
      )}
    </li>
  );
}
