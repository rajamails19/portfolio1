import { useState } from "react";
import { Check, X, Eye, RotateCcw, ChevronDown } from "lucide-react";
import type { QuizQuestion } from "@/content/types";
import { renderInline } from "@/lib/rich-text";

type Attempt = { picked: number | null; revealed: boolean };

export function QuizBlock({ questions }: { questions: QuizQuestion[] }) {
  const [attempts, setAttempts] = useState<Record<number, Attempt>>({});
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const set = (i: number, a: Attempt | null) =>
    setAttempts((prev) => {
      const next = { ...prev };
      if (a) next[i] = a;
      else delete next[i];
      return next;
    });

  const tried = Object.values(attempts).filter((a) => a.picked !== null).length;
  const score = questions.filter((q, i) => attempts[i]?.picked === q.answer).length;

  return (
    <div className="my-3 space-y-3">
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-gold/15 bg-noir/40 px-4 py-2.5 text-sm">
        <span className="text-foreground/75">
          Score: <strong className="text-gold-ink tabular-nums">{score}</strong> /{" "}
          {questions.length}
          {tried > 0 && <span className="ml-2 text-xs text-muted-foreground">({tried} tried)</span>}
        </span>
        <button
          type="button"
          onClick={() => setAttempts({})}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-gold/25 px-3 py-1 text-xs font-semibold text-foreground/75 transition hover:bg-white/5"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gold/15 bg-noir/40">
        {questions.map((q, i) => {
          const a = attempts[i] ?? { picked: null, revealed: false };
          const open = openIndex === i;
          const result =
            a.picked === null ? null : a.picked === q.answer ? "correct" : "wrong";

          return (
            <div key={i} className={i > 0 ? "border-t border-gold/10" : undefined}>
              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : i)}
                aria-expanded={open}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-white/[0.03]"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-gold to-ember font-display text-xs font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1 text-sm font-semibold leading-snug text-foreground/90">
                  {renderInline(q.q)}
                </span>
                {result && (
                  <span
                    aria-label={result === "correct" ? "Answered correctly" : "Answered incorrectly"}
                    className={[
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                      result === "correct"
                        ? "bg-[oklch(0.6_0.15_155)]/30 text-[oklch(0.5_0.16_155)]"
                        : "bg-ember/25 text-ember",
                    ].join(" ")}
                  >
                    {result === "correct" ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <X className="h-3.5 w-3.5" />
                    )}
                  </span>
                )}
                {!result && a.revealed && (
                  <Eye className="h-4 w-4 shrink-0 text-foreground/40" aria-label="Answer viewed" />
                )}
                <ChevronDown
                  className={[
                    "h-4 w-4 shrink-0 text-foreground/50 transition-transform duration-200",
                    open ? "rotate-180" : "",
                  ].join(" ")}
                />
              </button>

              <div
                className={[
                  "grid overflow-hidden transition-[grid-template-rows] duration-200 ease-out",
                  open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                ].join(" ")}
              >
                <div className="min-h-0 min-w-0">
                  <div className="border-t border-gold/10">
                    <div className="space-y-2 px-4 py-3">
                      {q.options.map((opt, k) => {
                        const isAnswer = k === q.answer;
                        const isPicked = a.picked === k;
                        const state = !a.revealed
                          ? "idle"
                          : isAnswer
                            ? "correct"
                            : isPicked
                              ? "wrong"
                              : "dim";
                        return (
                          <button
                            key={k}
                            type="button"
                            disabled={a.revealed}
                            onClick={() => set(i, { picked: k, revealed: true })}
                            className={[
                              "flex w-full items-start gap-3 rounded-xl border px-3 py-2.5 text-left text-sm transition",
                              state === "idle" &&
                                "border-gold/15 bg-noir/50 hover:border-gold/40 hover:bg-noir/80",
                              state === "correct" &&
                                "border-[oklch(0.6_0.15_155)]/50 bg-[oklch(0.28_0.08_155)]/50",
                              state === "wrong" && "border-ember/50 bg-ember/15",
                              state === "dim" && "border-gold/10 bg-noir/30 opacity-60",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                          >
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gold/25 text-xs font-bold text-gold-ink">
                              {state === "correct" ? (
                                <Check className="h-3.5 w-3.5" />
                              ) : state === "wrong" ? (
                                <X className="h-3.5 w-3.5" />
                              ) : (
                                String.fromCharCode(65 + k)
                              )}
                            </span>
                            <span className="min-w-0 flex-1 leading-snug text-foreground/90">
                              {renderInline(opt)}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="border-t border-gold/10 px-4 py-3">
                      {a.revealed ? (
                        <div className="space-y-2">
                          <p className="text-sm leading-relaxed text-foreground/90">
                            <strong className="text-gold-ink">
                              Answer: {String.fromCharCode(65 + q.answer)}.
                            </strong>{" "}
                            {renderInline(q.explanation)}
                          </p>
                          <button
                            type="button"
                            onClick={() => set(i, null)}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground/60 transition hover:text-foreground"
                          >
                            <RotateCcw className="h-3.5 w-3.5" /> Try again
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => set(i, { picked: null, revealed: true })}
                          className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5 text-xs font-bold text-gold-ink transition hover:bg-gold/20"
                        >
                          <Eye className="h-3.5 w-3.5" /> Show answer
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
