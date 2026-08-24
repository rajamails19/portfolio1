import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  CheckCircle2,
  ChevronDown,
  Lightbulb,
  Route as RouteIcon,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/site-layout";
import { TOPICS, type Topic } from "@/lib/math-data";

export const Route = createFileRoute("/topics/$topic")({
  loader: ({ params }): Topic => {
    const t = TOPICS.find((x) => x.slug === params.topic);
    if (!t) throw notFound();
    return t;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.name} — MathDreams` : "Topic · MathDreams" },
      { name: "description", content: loaderData?.tagline ?? "Math topic" },
    ],
  }),
  component: TopicDetail,
});

function TopicDetail() {
  const t = Route.useLoaderData() as Topic;

  return (
    <div className="aurora min-h-[100dvh]">
      <SiteHeader />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <div className="flex flex-wrap gap-2">
              <Link to="/topics" className="glass rounded-full px-3 py-1 text-xs font-semibold">
                ← All topics
              </Link>
              {t.grades.map((g) => (
                <Link
                  key={g}
                  to="/grades/$grade"
                  params={{ grade: String(g) }}
                  className="glass rounded-full px-3 py-1 text-xs font-semibold"
                >
                  Grade {g}
                </Link>
              ))}
            </div>
            <h1 className="mt-4 font-display text-5xl font-bold sm:text-6xl">
              <span className="mr-2">{t.emoji}</span>
              <span className="text-gradient">{t.name}</span>
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">{t.tagline}</p>
          </div>
          <div className="glass overflow-hidden rounded-[2.5rem] p-3 shadow-glow">
            <img
              src={t.image}
              alt={t.name}
              className="h-full w-full rounded-[2rem] object-cover"
              width={1024}
              height={768}
            />
          </div>
        </div>
      </section>

      <div className="mx-auto mt-16 grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2">
        <Card title="🌱 Tips">
          <ul className="space-y-2">
            {t.tips.map((tip, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                  {i + 1}
                </span>
                <span className="text-foreground/80">{tip}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card title="✨ Tricks">
          <ul className="space-y-2">
            {t.tricks.map((trick, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-1 text-lg">🪄</span>
                <span className="text-foreground/80">{trick}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {t.deepDive && <SkillPath guide={t.deepDive} />}

      {/* Step-by-step examples */}
      <section className="mx-auto mt-6 max-w-7xl px-4 sm:px-6">
        <Card title="📝 Step-by-step examples">
          <div className="grid gap-5 md:grid-cols-2">
            {t.examples.map((ex, i) => (
              <div key={i} className="rounded-2xl bg-white/60 p-5">
                <div className="font-display text-xl font-bold text-primary">{ex.question}</div>
                <ol className="mt-3 space-y-2">
                  {ex.steps.map((s, si) => (
                    <li key={si} className="flex gap-3 text-sm">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {si + 1}
                      </span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-3 inline-block rounded-full bg-primary/15 px-3 py-1 text-sm font-semibold text-primary">
                  ✅ {ex.answer}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Quiz */}
      <section className="mx-auto mt-6 max-w-7xl px-4 pb-6 sm:px-6">
        <Card title="🎯 Quick quiz">
          <TopicQuiz quiz={t.quiz} />
        </Card>
      </section>

      <SiteFooter />
    </div>
  );
}

function SkillPath({ guide }: { guide: NonNullable<Topic["deepDive"]> }) {
  const levelStyles = {
    Easy: "bg-emerald-100 text-emerald-800 ring-emerald-300/70",
    Medium: "bg-amber-100 text-amber-800 ring-amber-300/70",
    Hard: "bg-rose-100 text-rose-800 ring-rose-300/70",
  } as const;

  return (
    <>
      <section className="mx-auto mt-6 max-w-7xl px-4 sm:px-6">
        <Card title="🧭 Division learning path">
          <p className="max-w-4xl text-base leading-7 text-foreground/75">{guide.intro}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {guide.vocabulary.map((item) => (
              <div key={item.term} className="rounded-2xl bg-white/65 p-4 ring-1 ring-white/80">
                <div className="font-display text-lg font-bold text-primary">{item.term}</div>
                <p className="mt-1 text-sm leading-6 text-foreground/75">{item.meaning}</p>
                <div className="mt-3 rounded-xl bg-primary/10 px-3 py-2 text-xs font-semibold text-primary">
                  {item.example}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
            <div className="rounded-3xl bg-ink p-5 text-cream shadow-soft sm:p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-mustard text-xl">
                  🔁
                </span>
                <div>
                  <h3 className="font-display text-2xl font-bold">{guide.method.title}</h3>
                  <p className="mt-0.5 text-xs font-bold uppercase tracking-[0.15em] text-mustard">
                    {guide.method.cue}
                  </p>
                </div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {guide.method.steps.map((step, index) => (
                  <div
                    key={step.label}
                    className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15"
                  >
                    <div className="flex items-center gap-2">
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-mustard text-xs font-extrabold text-ink">
                        {index + 1}
                      </span>
                      <strong className="text-sm">{step.label}</strong>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-cream/75">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-3xl bg-emerald-50/80 p-5 ring-1 ring-emerald-200">
                <div className="flex items-center gap-2 font-display text-xl font-bold text-emerald-900">
                  <ShieldCheck className="h-5 w-5" /> Three checks
                </div>
                <ul className="mt-4 space-y-3">
                  {guide.checks.map((check) => (
                    <li key={check} className="flex gap-2 text-sm leading-6 text-emerald-950/75">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />
                      {check}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl bg-amber-50/80 p-5 ring-1 ring-amber-200">
                <div className="flex items-center gap-2 font-display text-xl font-bold text-amber-900">
                  <Lightbulb className="h-5 w-5" /> Remember
                </div>
                <p className="mt-3 text-sm leading-6 text-amber-950/75">
                  Division is multiplication running backward. When you feel stuck, write a nearby
                  multiplication fact first.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <section className="mx-auto mt-6 max-w-7xl px-4 sm:px-6">
        <Card title="🚦 Practice ladder">
          <div className="mb-5 flex items-start gap-3 rounded-2xl bg-primary/10 p-4 text-sm leading-6 text-foreground/75">
            <RouteIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <p>
              Try each problem before opening it. If you need help, reveal the hint first—then
              compare your method with the full solution.
            </p>
          </div>
          <div className="grid gap-5 xl:grid-cols-3">
            {guide.practice.map((group) => (
              <div
                key={group.level}
                className="rounded-3xl bg-white/55 p-3 ring-1 ring-white/80 sm:p-4"
              >
                <div className="flex items-center justify-between gap-3 px-1 pb-3">
                  <div>
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-extrabold ring-1 ${levelStyles[group.level]}`}
                    >
                      {group.level}
                    </span>
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">{group.subtitle}</p>
                  </div>
                  <span className="text-xs font-bold text-primary">
                    {group.problems.length} problems
                  </span>
                </div>
                <div className="space-y-3">
                  {group.problems.map((problem, index) => (
                    <PracticeProblem key={problem.question} problem={problem} number={index + 1} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="mx-auto mt-6 max-w-7xl px-4 sm:px-6">
        <Card title="🧯 Common mistakes — and the fix">
          <div className="grid gap-4 md:grid-cols-3">
            {guide.mistakes.map((item, index) => (
              <div key={item.mistake} className="rounded-2xl bg-white/60 p-5 ring-1 ring-white/80">
                <div className="flex items-start gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-coral/15 text-sm font-extrabold text-coral">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold">{item.mistake}</h3>
                    <p className="mt-2 text-sm leading-6 text-foreground/70">
                      <strong className="text-primary">Fix:</strong> {item.fix}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </>
  );
}

function PracticeProblem({
  problem,
  number,
}: {
  problem: NonNullable<Topic["deepDive"]>["practice"][number]["problems"][number];
  number: number;
}) {
  return (
    <details className="group overflow-hidden rounded-2xl bg-white/80 ring-1 ring-border/70 open:shadow-soft">
      <summary className="flex min-h-16 cursor-pointer list-none items-center gap-3 p-4 marker:hidden">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-primary/10 text-xs font-extrabold text-primary">
          {String(number).padStart(2, "0")}
        </span>
        <strong className="min-w-0 flex-1 text-sm leading-6">{problem.question}</strong>
        <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition group-open:rotate-180" />
      </summary>
      <div className="border-t border-border/70 bg-cream/40 p-4">
        <div className="rounded-xl bg-mustard/20 px-3 py-2 text-xs leading-5 text-foreground/75">
          <strong>Hint:</strong> {problem.hint}
        </div>
        <ol className="mt-3 space-y-2">
          {problem.steps.map((step, index) => (
            <li key={step} className="flex gap-2 text-xs leading-5 text-foreground/75">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-[10px] font-bold text-white">
                {index + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
        <div className="mt-3 rounded-xl bg-emerald-100 px-3 py-2 text-sm font-extrabold text-emerald-900">
          Answer: {problem.answer}
        </div>
      </div>
    </details>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-3xl p-6 shadow-soft">
      <h2 className="font-display text-2xl font-bold text-gradient">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function TopicQuiz({
  quiz,
}: {
  quiz: { q: string; options: string[]; answer: number; hint?: string }[];
}) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const current = quiz[i];
  const done = i >= quiz.length;

  if (done) {
    return (
      <div className="rounded-2xl bg-white/60 p-6 text-center">
        <div className="font-display text-3xl font-bold text-gradient">
          You got {score} / {quiz.length}!
        </div>
        <p className="mt-2 text-muted-foreground">
          {score === quiz.length
            ? "Perfect! Zog is doing a happy dance. 🎉"
            : "Nice try! Review the tips and give it another go."}
        </p>
        <button
          onClick={() => {
            setI(0);
            setScore(0);
            setPicked(null);
          }}
          className="mt-4 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-glow"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white/60 p-6">
      <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
        <span>
          Question {i + 1} of {quiz.length}
        </span>
        <span>Score: {score}</span>
      </div>
      <div className="mt-3 font-display text-2xl font-bold">{current.q}</div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {current.options.map((opt, oi) => {
          const isPicked = picked === oi;
          const isCorrect = oi === current.answer;
          const state =
            picked === null
              ? "hover:bg-white"
              : isCorrect
                ? "bg-emerald-200/70 border-emerald-400"
                : isPicked
                  ? "bg-rose-200/70 border-rose-400"
                  : "opacity-60";
          return (
            <button
              key={oi}
              disabled={picked !== null}
              onClick={() => {
                setPicked(oi);
                if (oi === current.answer) setScore((s) => s + 1);
              }}
              className={`rounded-2xl border border-white/70 bg-white/70 px-4 py-3 text-left font-semibold transition ${state}`}
            >
              {String.fromCharCode(65 + oi)}. {opt}
            </button>
          );
        })}
      </div>
      {picked !== null && current.hint && picked !== current.answer && (
        <p className="mt-3 text-sm text-muted-foreground">💡 Hint: {current.hint}</p>
      )}
      {picked !== null && (
        <button
          onClick={() => {
            setI((x) => x + 1);
            setPicked(null);
          }}
          className="mt-4 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-glow"
        >
          Next →
        </button>
      )}
    </div>
  );
}
