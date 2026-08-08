import type { Block } from "@/content/types";
import { CodeBlock } from "./CodeBlock";
import { FlowDiagram } from "./FlowDiagram";
import { Expandable } from "./Expandable";
import { renderInline } from "@/lib/rich-text";
import { Info, Lightbulb, AlertTriangle, ExternalLink, Link2 } from "lucide-react";

// Bold, distinct per-column header colors on a fixed dark bar — reads the
// same in both app light/dark modes since it doesn't depend on page tokens.
const HEADER_COLORS = [
  "oklch(0.8 0.16 85)",
  "oklch(0.76 0.15 235)",
  "oklch(0.78 0.19 40)",
  "oklch(0.78 0.15 155)",
  "oklch(0.78 0.16 320)",
];

// First-column row-label text sits on the page's own background instead of
// a fixed dark bar, so it needs to hold up in both light and dark mode.
// Bold, dark red/green — reads clearly on both the dark noir cards and the
// light/cream backgrounds, unlike a light gold at the same lightness.
const ROW_LABEL_COLORS = ["oklch(0.42 0.13 150)", "oklch(0.45 0.19 25)"];

// Source content often wraps an entire table cell in "**...**". Rendering
// that through the shared rich-text renderer would force it to text-gold-ink,
// which silently overrides the per-row color below — so strip that outer
// bold marker here and apply our own bold + color instead.
function stripOuterBold(text: string): string | null {
  const trimmed = text.trim();
  const match = /^\*\*(.+)\*\*$/.exec(trimmed);
  return match ? match[1] : null;
}

function Callout({
  variant = "info",
  children,
}: {
  variant?: "info" | "warn" | "tip";
  children: React.ReactNode;
}) {
  const styles = {
    info: {
      bg: "bg-[oklch(0.25_0.06_235)]/60",
      ring: "ring-[oklch(0.7_0.15_235)]/40",
      Icon: Info,
      label: "Note",
    },
    tip: {
      bg: "bg-[oklch(0.28_0.08_155)]/50",
      ring: "ring-[oklch(0.6_0.15_155)]/40",
      Icon: Lightbulb,
      label: "Tip",
    },
    warn: { bg: "bg-ember/15", ring: "ring-ember/40", Icon: AlertTriangle, label: "Watch out" },
  }[variant];
  const { Icon } = styles;
  return (
    <div className={`my-4 flex gap-3 rounded-2xl ${styles.bg} p-4 ring-1 ${styles.ring}`}>
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-foreground/70" />
      <div className="text-sm leading-relaxed text-foreground/90">
        <span className="mr-1 font-semibold">{styles.label}:</span>
        {children}
      </div>
    </div>
  );
}

export function AnswerBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="text-[15px] leading-relaxed text-foreground/85">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "heading":
            return (
              <h4 key={i} className="mt-5 mb-2 font-display text-lg font-semibold text-foreground">
                {b.content}
              </h4>
            );
          case "text":
            return (
              <p key={i} className="my-3">
                {renderInline(b.content)}
              </p>
            );
          case "list": {
            const Tag = b.ordered ? "ol" : "ul";
            return (
              <Tag
                key={i}
                className={`my-3 space-y-1.5 pl-5 ${b.ordered ? "list-decimal" : "list-disc"} marker:text-gold-ink/80`}
              >
                {b.items.map((it, k) => (
                  <li key={k}>{renderInline(it)}</li>
                ))}
              </Tag>
            );
          }
          case "code":
            return (
              <Expandable key={i} label={`${b.language} code`}>
                <CodeBlock language={b.language} code={b.content} />
              </Expandable>
            );
          case "callout":
            return (
              <Callout key={i} variant={b.variant}>
                {renderInline(b.content)}
              </Callout>
            );
          case "flow":
            return (
              <Expandable key={i} label={b.title ?? "Diagram"}>
                <FlowDiagram block={b} />
              </Expandable>
            );
          case "image":
            return (
              <Expandable key={i} label={b.alt}>
                <div className="my-4 overflow-hidden rounded-2xl border border-gold/20">
                  <img src={b.src} alt={b.alt} className="w-full" />
                </div>
              </Expandable>
            );
          case "table":
            return (
              <div key={i} className="my-4 overflow-hidden rounded-2xl border border-gold/20">
                <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead style={{ backgroundColor: "oklch(0.16 0.02 85)" }}>
                    <tr>
                      {b.headers.map((h, k) => (
                        <th
                          key={k}
                          className="px-4 py-2.5 text-left font-bold"
                          style={{ color: h ? HEADER_COLORS[k % HEADER_COLORS.length] : "oklch(0.55 0.01 85)" }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row, r) => (
                      <tr key={r} className="border-t border-gold/10 odd:bg-noir/40">
                        {row.map((c, k) =>
                          k === 0 ? (
                            <td
                              key={k}
                              className="px-4 py-2.5 align-top font-bold"
                              style={{ color: ROW_LABEL_COLORS[r % ROW_LABEL_COLORS.length] }}
                            >
                              {stripOuterBold(c) ?? renderInline(c)}
                            </td>
                          ) : (
                            <td key={k} className="px-4 py-2.5 align-top text-foreground/85">
                              {renderInline(c)}
                            </td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </div>
            );
          case "link":
            return (
              <a
                key={i}
                href={b.href}
                target="_blank"
                rel="noreferrer"
                className="my-2 inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5 text-sm font-medium text-gold-ink hover:bg-gold/20"
              >
                {b.label} <ExternalLink className="h-3.5 w-3.5" />
              </a>
            );
          case "links":
            return (
              <div key={i} className="my-4 grid gap-2 sm:grid-cols-2">
                {b.items.map((l, k) => (
                  <a
                    key={k}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-start gap-3 rounded-2xl border border-gold/20 bg-noir/50 p-3 transition hover:border-gold/50 hover:bg-noir/80"
                  >
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold-ink">
                      <Link2 className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium text-foreground group-hover:text-gold-ink">
                        {l.label}
                      </span>
                      {l.description && (
                        <span className="mt-0.5 block text-xs text-muted-foreground">
                          {l.description}
                        </span>
                      )}
                      <span className="mt-0.5 block truncate text-[11px] text-gold-ink/60">
                        {l.href}
                      </span>
                    </span>
                    <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0 text-gold-ink/60 transition group-hover:text-gold-ink" />
                  </a>
                ))}
              </div>
            );
        }
      })}
    </div>
  );
}
