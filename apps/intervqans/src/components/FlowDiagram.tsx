import type { CSSProperties } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import type { Block } from "@/content/types";

type FlowBlock = Extract<Block, { type: "flow" }>;
type Tone = NonNullable<FlowBlock["nodes"][number]["tone"]>;

// Solid, saturated chip + fixed dark ink — reads the same regardless of
// app light/dark mode, instead of relying on the page background for contrast.
const tones: Record<Tone, { bg: string; border: string; ink: string; sub: string }> = {
  gold: { bg: "oklch(0.8 0.16 85)", border: "oklch(0.6 0.16 85)", ink: "oklch(0.2 0.03 85)", sub: "oklch(0.32 0.05 85)" },
  ember: { bg: "oklch(0.74 0.19 40)", border: "oklch(0.55 0.19 40)", ink: "oklch(0.18 0.03 40)", sub: "oklch(0.3 0.06 40)" },
  mint: { bg: "oklch(0.78 0.15 155)", border: "oklch(0.56 0.15 155)", ink: "oklch(0.18 0.04 155)", sub: "oklch(0.3 0.06 155)" },
  sky: { bg: "oklch(0.77 0.13 235)", border: "oklch(0.56 0.13 235)", ink: "oklch(0.18 0.03 235)", sub: "oklch(0.3 0.05 235)" },
};

export function FlowDiagram({ block }: { block: FlowBlock }) {
  const horizontal = block.direction !== "vertical";
  const Arrow = horizontal ? ArrowRight : ArrowDown;

  return (
    <figure className="my-5 overflow-hidden rounded-2xl border border-gold/20 bg-noir/50 p-5">
      {block.title && (
        <figcaption className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold/80">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/40" />
          {block.title}
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/40" />
        </figcaption>
      )}
      <div
        className={[
          "flex gap-3",
          horizontal ? "flex-row flex-wrap items-stretch justify-center" : "flex-col items-stretch",
        ].join(" ")}
      >
        {block.nodes.map((n, i) => {
          const tone = tones[n.tone ?? "gold"];
          return (
            <div
              key={i}
              className={
                horizontal ? "flex items-center gap-3" : "flex flex-col items-center gap-2"
              }
            >
              <div
                className="relative min-w-[140px] rounded-2xl border p-3 text-center shadow-[0_4px_20px_-8px_oklch(0.2_0.02_85/0.35)]"
                style={
                  {
                    backgroundColor: tone.bg,
                    borderColor: tone.border,
                    color: tone.ink,
                  } as CSSProperties
                }
              >
                <div className="font-display text-sm font-semibold leading-tight">{n.label}</div>
                {n.sub && (
                  <div className="mt-1 text-[11px] font-medium" style={{ color: tone.sub }}>
                    {n.sub}
                  </div>
                )}
              </div>
              {i < block.nodes.length - 1 && (
                <Arrow className="h-5 w-5 shrink-0 text-gold/70" strokeWidth={2.5} />
              )}
            </div>
          );
        })}
      </div>
    </figure>
  );
}
