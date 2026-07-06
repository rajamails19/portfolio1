import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/site-layout";
import { TOPICS } from "@/lib/math-data";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Mixed Math Quiz — MathDreams" },
      { name: "description", content: "A fresh mixed quiz drawn from every topic." },
    ],
  }),
  component: QuizPage,
});

function QuizPage() {
  const questions = useMemo(() => {
    const all = TOPICS.flatMap((t) =>
      t.quiz.map((q) => ({ ...q, topic: t.name, slug: t.slug, emoji: t.emoji })),
    );
    return all.sort(() => Math.random() - 0.5).slice(0, 8);
  }, []);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const done = i >= questions.length;
  const q = questions[i];

  return (
    <PageShell
      eyebrow="Quiz"
      title="Mixed math challenge"
      subtitle="8 quick questions across every topic. See how many Zog-points you can score!"
    >
      <div className="mx-auto max-w-2xl">
        {done ? (
          <div className="glass rounded-3xl p-8 text-center shadow-glow">
            <div className="text-6xl">{score >= 6 ? "🏆" : score >= 4 ? "🌟" : "🌱"}</div>
            <h2 className="mt-3 font-display text-3xl font-bold text-gradient">
              {score} / {questions.length}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {score === questions.length
                ? "Legendary! You're a MathDreams grandmaster."
                : score >= 6
                  ? "Amazing work — you're on fire."
                  : "Great effort! Peek at the topic pages, then run it back."}
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <button
                onClick={() => location.reload()}
                className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-glow"
              >
                New quiz
              </button>
              <Link
                to="/topics"
                className="glass rounded-full px-5 py-2 text-sm font-semibold"
              >
                Study topics
              </Link>
            </div>
          </div>
        ) : (
          <div className="glass rounded-3xl p-6 shadow-soft sm:p-8">
            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
              <span>
                Question {i + 1} / {questions.length}
              </span>
              <span>Score: {score}</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/60">
              <div
                className="h-full bg-gradient-to-r from-fuchsia-400 to-amber-300 transition-all"
                style={{ width: `${((i + 1) / questions.length) * 100}%` }}
              />
            </div>
            <div className="mt-4 inline-block rounded-full bg-white/70 px-3 py-1 text-xs font-semibold">
              {q.emoji} {q.topic}
            </div>
            <h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">{q.q}</h3>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {q.options.map((opt, oi) => {
                const isPicked = picked === oi;
                const isRight = oi === q.answer;
                const state =
                  picked === null
                    ? "hover:bg-white"
                    : isRight
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
                      if (oi === q.answer) setScore((s) => s + 1);
                    }}
                    className={`rounded-2xl border border-white/70 bg-white/70 px-4 py-3 text-left font-semibold transition ${state}`}
                  >
                    {String.fromCharCode(65 + oi)}. {opt}
                  </button>
                );
              })}
            </div>
            {picked !== null && (
              <button
                onClick={() => {
                  setI((x) => x + 1);
                  setPicked(null);
                }}
                className="mt-5 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-glow"
              >
                Next →
              </button>
            )}
          </div>
        )}
      </div>
    </PageShell>
  );
}
