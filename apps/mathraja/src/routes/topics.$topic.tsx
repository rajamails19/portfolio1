import { createFileRoute, Link, notFound } from "@tanstack/react-router";
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
    <div className="aurora min-h-screen">
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
