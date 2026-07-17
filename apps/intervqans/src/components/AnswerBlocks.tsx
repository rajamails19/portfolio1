import type { Block } from "@/content/types";
import { CodeBlock } from "./CodeBlock";
import { FlowDiagram } from "./FlowDiagram";
import { renderInline } from "@/lib/rich-text";
import { Info, Lightbulb, AlertTriangle, ExternalLink, Link2 } from "lucide-react";

function Callout({ variant = "info", children }: { variant?: "info" | "warn" | "tip"; children: React.ReactNode }) {
  const styles = {
    info: { bg: "bg-[oklch(0.25_0.06_235)]/60", ring: "ring-[oklch(0.7_0.15_235)]/40", Icon: Info, label: "Note" },
    tip: { bg: "bg-[oklch(0.28_0.08_155)]/50", ring: "ring-[oklch(0.6_0.15_155)]/40", Icon: Lightbulb, label: "Tip" },
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
            return <p key={i} className="my-3">{renderInline(b.content)}</p>;
          case "list": {
            const Tag = b.ordered ? "ol" : "ul";
            return (
              <Tag key={i} className={`my-3 space-y-1.5 pl-5 ${b.ordered ? "list-decimal" : "list-disc"} marker:text-gold/80`}>
                {b.items.map((it, k) => <li key={k}>{renderInline(it)}</li>)}
              </Tag>
            );
          }
          case "code":
            return <CodeBlock key={i} language={b.language} code={b.content} />;
          case "callout":
            return <Callout key={i} variant={b.variant}>{renderInline(b.content)}</Callout>;
          case "flow":
            return <FlowDiagram key={i} block={b} />;
          case "table":
            return (
              <div key={i} className="my-4 overflow-hidden rounded-2xl border border-gold/20">
                <table className="w-full text-sm">
                  <thead className="bg-noir/70">
                    <tr>
                      {b.headers.map((h, k) => (
                        <th key={k} className="px-4 py-2.5 text-left font-semibold text-gold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row, r) => (
                      <tr key={r} className="border-t border-gold/10 odd:bg-noir/40">
                        {row.map((c, k) => (
                          <td key={k} className="px-4 py-2.5 align-top text-foreground/85">{renderInline(c)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "link":
            return (
              <a
                key={i}
                href={b.href}
                target="_blank"
                rel="noreferrer"
                className="my-2 inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5 text-sm font-medium text-gold hover:bg-gold/20"
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
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
                      <Link2 className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium text-foreground group-hover:text-gold">
                        {l.label}
                      </span>
                      {l.description && (
                        <span className="mt-0.5 block text-xs text-muted-foreground">{l.description}</span>
                      )}
                      <span className="mt-0.5 block truncate text-[11px] text-gold/60">{l.href}</span>
                    </span>
                    <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0 text-gold/60 transition group-hover:text-gold" />
                  </a>
                ))}
              </div>
            );
        }
      })}
    </div>
  );
}
