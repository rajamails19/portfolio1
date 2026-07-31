import type { Block } from "@/content/types";
import { CodeBlock } from "./CodeBlock";
import { FlowDiagram } from "./FlowDiagram";
import { renderInline } from "@/lib/rich-text";
import { Info, Lightbulb, AlertTriangle, ExternalLink, Link2 } from "lucide-react";

function Callout({
  variant = "info",
  children,
}: {
  variant?: "info" | "warn" | "tip";
  children: React.ReactNode;
}) {
  const styles = {
    info: {
      bg: "bg-[oklch(0.96_0.028_240)]",
      ring: "ring-[oklch(0.68_0.09_245)]/30",
      icon: "text-[oklch(0.5_0.13_250)]",
      Icon: Info,
      label: "Note",
    },
    tip: {
      bg: "bg-[oklch(0.96_0.03_170)]",
      ring: "ring-[oklch(0.66_0.09_170)]/30",
      icon: "text-[oklch(0.47_0.11_172)]",
      Icon: Lightbulb,
      label: "Tip",
    },
    warn: {
      bg: "bg-[oklch(0.96_0.035_60)]",
      ring: "ring-[oklch(0.7_0.11_50)]/35",
      icon: "text-[oklch(0.52_0.15_45)]",
      Icon: AlertTriangle,
      label: "Watch out",
    },
  }[variant];
  const { Icon } = styles;
  return (
    <div
      className={`callout-body my-4 flex gap-3 rounded-2xl ${styles.bg} p-4 ring-1 ${styles.ring}`}
    >
      <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${styles.icon}`} />
      <div className="text-sm leading-relaxed text-[oklch(0.33_0.04_250)]">
        <span className="mr-1 font-bold text-[oklch(0.51_0.21_27)]">{styles.label}:</span>
        {children}
      </div>
    </div>
  );
}

export function AnswerBlocks({ blocks, prose = false }: { blocks: Block[]; prose?: boolean }) {
  return (
    <div
      className={
        prose
          ? "text-[16.5px] leading-[1.75] text-foreground/85"
          : "text-[15px] leading-relaxed text-foreground/85"
      }
    >
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
                className={`my-3 space-y-1.5 pl-5 ${b.ordered ? "list-decimal" : "list-disc"} marker:text-rose/80`}
              >
                {b.items.map((it, k) => (
                  <li key={k}>{renderInline(it)}</li>
                ))}
              </Tag>
            );
          }
          case "code":
            return <CodeBlock key={i} language={b.language} code={b.content} />;
          case "callout":
            return (
              <Callout key={i} variant={b.variant}>
                {renderInline(b.content)}
              </Callout>
            );
          case "flow":
            return <FlowDiagram key={i} block={b} />;
          case "table": {
            const sky = b.tone === "sky";
            return (
              <div
                key={i}
                className={`my-4 overflow-x-auto rounded-2xl border shadow-[var(--shadow-soft)] ${
                  sky
                    ? "border-[oklch(0.7_0.11_240)]/45 bg-[oklch(0.975_0.018_240)]"
                    : "border-rose/20"
                }`}
              >
                <table className="w-full text-sm">
                  <thead className={sky ? "bg-[oklch(0.91_0.055_240)]" : "bg-noir/70"}>
                    <tr>
                      {b.headers.map((h, k) => (
                        <th
                          key={k}
                          className={`px-4 py-2.5 text-left font-semibold ${
                            sky ? "text-[oklch(0.42_0.16_250)]" : "text-rose"
                          }`}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row, r) => (
                      <tr
                        key={r}
                        className={`border-t ${
                          sky
                            ? "border-[oklch(0.76_0.08_240)]/35 odd:bg-[oklch(0.95_0.03_235)]"
                            : "border-rose/10 odd:bg-noir/40"
                        }`}
                      >
                        {row.map((c, k) => (
                          <td key={k} className="px-4 py-2.5 align-top text-foreground/85">
                            {renderInline(c)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
          case "image":
            return (
              <a
                key={i}
                href={b.src}
                target="_blank"
                rel="noreferrer"
                aria-label={`${b.alt} — open full-size image`}
                className="my-4 block overflow-hidden rounded-2xl border border-rose/20 bg-noir/70 p-1 shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:border-rose/40 hover:shadow-glow"
              >
                <img
                  src={b.src}
                  alt={b.alt}
                  className="h-auto w-full rounded-xl object-contain"
                  loading="lazy"
                />
              </a>
            );
          case "link":
            return (
              <a
                key={i}
                href={b.href}
                target="_blank"
                rel="noreferrer"
                className="my-2 inline-flex items-center gap-1.5 rounded-full border border-rose/30 bg-rose/10 px-3 py-1.5 text-sm font-medium text-rose hover:bg-rose/20"
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
                    className="group flex items-start gap-3 rounded-2xl border border-rose/20 bg-noir/50 p-3 transition hover:border-rose/50 hover:bg-noir/80"
                  >
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-rose/30 bg-rose/10 text-rose">
                      <Link2 className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium text-foreground group-hover:text-rose">
                        {l.label}
                      </span>
                      {l.description && (
                        <span className="mt-0.5 block text-xs text-muted-foreground">
                          {l.description}
                        </span>
                      )}
                      <span className="mt-0.5 block truncate text-[11px] font-medium text-muted-foreground">
                        {l.href}
                      </span>
                    </span>
                    <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground transition group-hover:text-rose" />
                  </a>
                ))}
              </div>
            );
        }
      })}
    </div>
  );
}
