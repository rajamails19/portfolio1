import { ArrowRight, ArrowDown } from "lucide-react";
import type { Block } from "@/content/types";

type FlowBlock = Extract<Block, { type: "flow" }>;

const tones: Record<NonNullable<FlowBlock["nodes"][number]["tone"]>, string> = {
  gold: "from-gold/25 to-gold/5 border-gold/50 text-gold",
  ember: "from-ember/25 to-ember/5 border-ember/50 text-[oklch(0.85_0.15_35)]",
  mint: "from-[oklch(0.5_0.15_155)]/25 to-[oklch(0.5_0.15_155)]/5 border-[oklch(0.65_0.15_155)]/50 text-[oklch(0.85_0.13_155)]",
  sky: "from-[oklch(0.5_0.15_235)]/25 to-[oklch(0.5_0.15_235)]/5 border-[oklch(0.65_0.15_235)]/50 text-[oklch(0.85_0.12_235)]",
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
            <div key={i} className={horizontal ? "flex items-center gap-3" : "flex flex-col items-center gap-2"}>
              <div
                className={[
                  "relative min-w-[140px] rounded-2xl border bg-gradient-to-br p-3 text-center shadow-[0_4px_20px_-8px_oklch(0.82_0.15_85/0.4)]",
                  tone,
                ].join(" ")}
              >
                <div className="font-display text-sm font-semibold leading-tight">{n.label}</div>
                {n.sub && <div className="mt-1 text-[11px] text-foreground/70">{n.sub}</div>}
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
