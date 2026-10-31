import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { AccordionItem } from "@/content/types";
import { renderInline } from "@/lib/rich-text";
import { AnswerBlocks } from "./AnswerBlocks";

// Nested one level deeper than QuestionCard's top-level cards, so it reads
// as "inside" a card rather than a sibling — smaller chevron, tighter
// padding, left rail instead of a numbered badge. AnswerBlocks renders
// "accordion" blocks via this component, and this component renders nested
// content via AnswerBlocks — a circular ESM import that's safe because
// neither side touches the other at module-evaluation time, only at render.
export function AccordionBlock({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="my-3 overflow-hidden rounded-2xl border border-gold/15 bg-noir/40">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={i} className={i > 0 ? "border-t border-gold/10" : undefined}>
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-white/[0.03]"
            >
              <span className="min-w-0 flex-1 text-sm font-semibold text-foreground/90">
                {renderInline(item.title)}
              </span>
              {item.badge && (
                <span className="shrink-0 rounded-full border border-gold/25 bg-gold/10 px-2 py-0.5 text-[11px] font-semibold text-gold-ink">
                  {item.badge}
                </span>
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
                <div className="border-t border-gold/10 px-4 pb-3 pt-1">
                  <AnswerBlocks blocks={item.content} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
