import { useState } from "react";
import { ChevronDown, Columns3, Heart, Plus } from "lucide-react";
import type { QAItem } from "@/content/types";
import { AnswerBlocks } from "./AnswerBlocks";
import { useTierMarks } from "@/lib/tier-marks";

// Solid background + fixed dark ink — same convention used for the
// highlight mark and table headers, so these read correctly in both
// light and dark appearance without depending on page tokens.
const diffColors: Record<string, string> = {
  Easy: "bg-[oklch(0.78_0.15_155)] text-[oklch(0.2_0.04_155)]",
  Medium: "bg-[oklch(0.82_0.15_85)] text-[oklch(0.2_0.03_85)]",
  Hard: "bg-[oklch(0.74_0.19_35)] text-[oklch(0.18_0.04_35)]",
};

export function QuestionCard({
  item,
  index,
  onCompare,
}: {
  item: QAItem;
  index: number;
  onCompare?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const { marksFor, toggle } = useTierMarks();
  const marks = marksFor(item);

  return (
    <div
      className={[
        "glass-strong animate-pop-in group overflow-hidden rounded-3xl transition-all duration-300",
        open ? "shadow-glow" : "hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]",
      ].join(" ")}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex items-start gap-2 px-4 py-5 sm:px-6">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex min-w-0 flex-1 items-start gap-3 text-left sm:gap-4"
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
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${diffColors[item.difficulty]}`}
                >
                  {item.difficulty}
                </span>
              )}
              {item.tags?.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-gold/20 bg-noir/60 px-2 py-0.5 text-[11px] font-medium text-foreground/75"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </button>

        <div className="mt-1 flex shrink-0 items-center gap-1.5">
          {item.category === "2M" && (
            <>
              <button
                type="button"
                onClick={() => toggle(item, "plus")}
                aria-pressed={marks.plus}
                title={marks.plus ? "Remove from Important" : "Mark Important (+)"}
                aria-label="Mark Important"
                className={[
                  "flex h-8 w-8 items-center justify-center rounded-full border transition",
                  marks.plus
                    ? "border-gold/40 bg-gold/15 text-gold-ink"
                    : "border-gold/25 bg-noir/60 text-foreground/70 hover:border-gold/60 hover:text-foreground",
                ].join(" ")}
              >
                <Plus className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => toggle(item, "heart")}
                aria-pressed={marks.heart}
                title={marks.heart ? "Remove from Super Important" : "Mark Super Important (heart)"}
                aria-label="Heart"
                className={[
                  "flex h-8 w-8 items-center justify-center rounded-full border transition",
                  marks.heart
                    ? "border-[oklch(0.62_0.14_12)]/45 bg-[oklch(0.62_0.14_12)]/20 text-[oklch(0.74_0.12_12)]"
                    : "border-gold/25 bg-noir/60 text-foreground/70 hover:border-gold/60 hover:text-foreground",
                ].join(" ")}
              >
                <Heart className={["h-4 w-4", marks.heart ? "fill-current" : ""].join(" ")} />
              </button>
            </>
          )}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Collapse answer" : "Expand answer"}
            className={[
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-noir/60 text-foreground/70 transition-transform duration-300",
              open
                ? "rotate-180 border-transparent bg-gradient-to-br from-gold to-ember text-primary-foreground"
                : "group-hover:bg-noir",
            ].join(" ")}
          >
            <ChevronDown className="h-5 w-5" />
          </button>
        </div>

        {onCompare && (
          <button
            type="button"
            onClick={onCompare}
            aria-label={`Compare ${item.question} across languages`}
            title="Compare across languages"
            className="mt-1 inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-full border border-gold/35 bg-gold/10 px-2.5 text-xs font-bold text-gold-ink transition hover:border-gold/60 hover:bg-gold/20 sm:px-3"
          >
            <Columns3 className="h-4 w-4" />
            <span className="hidden sm:inline">Compare</span>
          </button>
        )}
      </div>

      <div
        className={[
          "grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        ].join(" ")}
      >
        <div className="min-h-0 min-w-0">
          <div className="border-t border-gold/15 bg-noir/40 px-6 pb-6 pt-4">
            <AnswerBlocks blocks={item.answer} />
          </div>
        </div>
      </div>
    </div>
  );
}
