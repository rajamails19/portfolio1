import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { QAItem } from "@/content/types";
import { AnswerBlocks } from "./AnswerBlocks";

const diffColors: Record<string, string> = {
  Easy: "border border-[oklch(0.6_0.15_155)]/40 bg-[oklch(0.35_0.1_155)]/40 text-[oklch(0.88_0.12_155)]",
  Medium: "border border-gold/40 bg-gold/15 text-gold",
  Hard: "border border-ember/50 bg-ember/20 text-[oklch(0.85_0.15_35)]",
};

export function QuestionCard({ item, index }: { item: QAItem; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={[
        "glass-strong animate-pop-in group overflow-hidden rounded-3xl transition-all duration-300",
        open ? "shadow-glow" : "hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]",
      ].join(" ")}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-gold to-ember font-display text-sm font-bold text-primary-foreground shadow-glow">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="font-display text-lg font-semibold leading-snug text-foreground sm:text-xl">
            {item.question}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            {item.difficulty && (
              <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${diffColors[item.difficulty]}`}>
                {item.difficulty}
              </span>
            )}
            {item.tags?.map((t) => (
              <span key={t} className="rounded-full border border-gold/20 bg-noir/60 px-2 py-0.5 text-[11px] font-medium text-foreground/75">
                {t}
              </span>
            ))}
          </div>
        </div>

        <span
          className={[
            "mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-noir/60 text-foreground/70 transition-transform duration-300",
            open ? "rotate-180 border-transparent bg-gradient-to-br from-gold to-ember text-primary-foreground" : "group-hover:bg-noir",
          ].join(" ")}
        >
          <ChevronDown className="h-5 w-5" />
        </span>
      </button>

      <div
        className={[
          "grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        ].join(" ")}
      >
        <div className="min-h-0">
          <div className="border-t border-gold/15 bg-noir/40 px-6 pb-6 pt-4">
            <AnswerBlocks blocks={item.answer} />
          </div>
        </div>
      </div>
    </div>
  );
}
