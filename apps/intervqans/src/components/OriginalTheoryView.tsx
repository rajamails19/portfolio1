import { FileText, LayoutGrid } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { originalTheorySections } from "@/content/theory-original";
import { useAppearance } from "@/themes/AppearanceContext";

// Appends a valid CSS alpha channel to an oklch(...) string, e.g.
// "oklch(0.74 0.09 222)" + 0.2 -> "oklch(0.74 0.09 222 / 0.2)".
function withAlpha(oklchColor: string, alpha: number) {
  return oklchColor.replace(/\)$/, ` / ${alpha})`);
}

const BREEZE_DARK = "oklch(0.74 0.09 222)";
const BREEZE_LIGHT = "oklch(0.42 0.11 222)";

// Dark mode: light, saturated accent text on a near-black card.
const PALETTE_DARK = [
  { accent: "oklch(0.74 0.09 222)", wash: "oklch(0.27 0.045 222)", soft: "oklch(0.19 0.02 222)" },
  { accent: "oklch(0.72 0.08 235)", wash: "oklch(0.26 0.045 235)", soft: "oklch(0.185 0.02 235)" },
  { accent: "oklch(0.76 0.08 205)", wash: "oklch(0.28 0.045 205)", soft: "oklch(0.195 0.02 205)" },
  { accent: "oklch(0.73 0.09 250)", wash: "oklch(0.265 0.045 250)", soft: "oklch(0.19 0.02 250)" },
];

// Light mode: dark ink accent on a near-white card, so body text (which
// tracks the global --foreground, dark in light mode) stays readable.
const PALETTE_LIGHT = [
  { accent: "oklch(0.42 0.11 222)", wash: "oklch(0.9 0.035 222)", soft: "oklch(0.99 0.007 222)" },
  { accent: "oklch(0.4 0.1 235)", wash: "oklch(0.89 0.035 235)", soft: "oklch(0.985 0.007 235)" },
  { accent: "oklch(0.44 0.1 205)", wash: "oklch(0.91 0.035 205)", soft: "oklch(0.99 0.007 205)" },
  { accent: "oklch(0.41 0.11 250)", wash: "oklch(0.895 0.035 250)", soft: "oklch(0.985 0.007 250)" },
];

const KEYWORDS = [
  "Attention Is All You Need",
  "Machine Learning",
  "supervised learning",
  "unsupervised learning",
  "reinforcement learning",
  "generalization error",
  "training error",
  "data leakage",
  "classification",
  "regression",
  "Embedding Space",
  "embeddings",
  "Transformers",
  "attention",
  "parameters",
  "weights",
  "generalization",
  "memorization",
  "tokens",
  "training set",
  "validation set",
  "test set",
  "regularization",
  "high bias",
  "high variance",
  "predictions",
];

const KEYWORD_PATTERN = new RegExp(
  `(${KEYWORDS.map((keyword) => keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
  "gi",
);

function renderKeywords(text: string, keyPrefix: string) {
  let highlights = 0;
  return text.split(KEYWORD_PATTERN).map((part, index) => {
    const isKeyword = KEYWORDS.some((keyword) => keyword.toLowerCase() === part.toLowerCase());
    if (!isKeyword || highlights >= 2) return <span key={`${keyPrefix}-${index}`}>{part}</span>;
    highlights += 1;
    return (
      <mark
        key={`${keyPrefix}-${index}`}
        className="rounded-md bg-[var(--original-wash)] px-1 py-0.5 font-semibold text-[var(--original-accent)] decoration-clone"
      >
        {part}
      </mark>
    );
  });
}

function renderInline(text: string, keyPrefix: string): ReactNode {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={`${keyPrefix}-strong-${index}`} className="font-bold text-[var(--original-accent)]">
          {renderKeywords(part.slice(2, -2), `${keyPrefix}-strong-${index}`)}
        </strong>
      );
    }
    return renderKeywords(part, `${keyPrefix}-plain-${index}`);
  });
}

function cleanMarkdown(text: string) {
  return text.startsWith("**") && text.endsWith("**") ? text.slice(2, -2) : text;
}

function isSectionHeading(line: string, segmentIndex: number) {
  const clean = cleanMarkdown(line);
  if (line.startsWith("**") && clean.length > 12) return true;
  if (segmentIndex === 0 && /[.!]$/.test(clean)) return false;
  if (clean.length > 92) return false;
  return clean.endsWith("?") || (!/[.,:;!]$/.test(clean) && /^[A-Z]/.test(clean));
}

function OriginalLine({ line, lineIndex }: { line: string; lineIndex: number }) {
  if (!line.trim()) return <div aria-hidden className="h-2" />;

  if (/^[-*]\s+/.test(line)) {
    return (
      <div className="grid grid-cols-[1.3rem_1fr] gap-2 text-[15px] leading-7 text-foreground/78 sm:text-base">
        <span className="font-bold text-[var(--original-accent)]">{line.slice(0, 1)}</span>
        <span>{renderInline(line.slice(2), `line-${lineIndex}`)}</span>
      </div>
    );
  }

  if (line.startsWith('"') || line.startsWith("“")) {
    return (
      <blockquote className="my-2 rounded-r-2xl border-l-4 border-[var(--original-accent)] bg-[var(--original-wash)]/55 px-5 py-3 font-display text-[15px] italic leading-7 text-foreground/82 sm:text-base">
        {renderInline(line, `line-${lineIndex}`)}
      </blockquote>
    );
  }

  const isolatedBold = line.startsWith("**") && line.endsWith("**") && cleanMarkdown(line).length <= 12;
  if (isolatedBold) {
    return (
      <div className="my-1 flex">
        <span className="rounded-full border border-[var(--original-accent)]/25 bg-[var(--original-wash)] px-3 py-1 font-display text-sm font-bold text-[var(--original-accent)] shadow-sm">
          {cleanMarkdown(line)}
        </span>
      </div>
    );
  }

  return (
    <p className="text-[15px] leading-7 text-foreground/78 sm:text-base sm:leading-8">
      {renderInline(line, `line-${lineIndex}`)}
    </p>
  );
}

function OriginalChapter({ content, paletteIndex }: { content: string; paletteIndex: number }) {
  const pieces = content.split(/\n+\s*(={3,})\s*\n+/);
  const segments: Array<{ text: string; divider?: string }> = [];

  for (let index = 0; index < pieces.length; index += 2) {
    segments.push({ text: pieces[index], divider: pieces[index + 1] });
  }

  return (
    <div className="space-y-4 px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
      {segments.map((segment, segmentIndex) => {
        const lines = segment.text.split("\n");
        const firstContentIndex = lines.findIndex((line) => line.trim());
        const firstLine = firstContentIndex >= 0 ? lines[firstContentIndex] : "";
        const hasHeading = Boolean(firstLine && isSectionHeading(firstLine, segmentIndex));
        const bodyLines = hasHeading ? lines.filter((_, index) => index !== firstContentIndex) : lines;

        return (
          <div key={`${paletteIndex}-${segmentIndex}`}>
            <article className="relative overflow-hidden rounded-[1.55rem] border border-[var(--original-accent)]/18 bg-[var(--original-soft)] px-5 py-5 shadow-[0_18px_46px_-38px_var(--original-accent)] sm:px-7 sm:py-6">
              <div aria-hidden className="absolute -right-10 -top-12 h-32 w-32 rounded-full bg-[var(--original-wash)] opacity-70 blur-3xl" />
              {hasHeading && (
                <header className="relative mb-5 flex items-start gap-3 border-b border-[var(--original-accent)]/15 pb-4">
                  <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--original-wash)] text-[10px] font-bold text-[var(--original-accent)]">
                    {String(segmentIndex + 1).padStart(2, "0")}
                  </span>
                  <h4 className="font-display text-xl font-semibold leading-snug text-foreground sm:text-2xl">
                    {renderInline(firstLine, `heading-${paletteIndex}-${segmentIndex}`)}
                  </h4>
                </header>
              )}
              <div className="relative space-y-1">
                {bodyLines.map((line, lineIndex) => (
                  <OriginalLine key={`${segmentIndex}-${lineIndex}`} line={line} lineIndex={lineIndex} />
                ))}
              </div>
            </article>

            {segment.divider && (
              <div className="my-4 flex items-center gap-3 px-3" aria-label="Source divider">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[var(--original-accent)]/25" />
                <span className="rounded-full border border-[var(--original-accent)]/15 bg-noir/65 px-3 py-1 font-mono text-[10px] font-bold tracking-[0.3em] text-[var(--original-accent)]">
                  {segment.divider}
                </span>
                <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[var(--original-accent)]/25" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function OriginalTheoryView() {
  const { appearance } = useAppearance();
  const isLight = appearance === "light";
  const breeze = isLight ? BREEZE_LIGHT : BREEZE_DARK;
  const palette = isLight ? PALETTE_LIGHT : PALETTE_DARK;

  return (
    <main id="original-theory-view" className="mt-5 scroll-mt-24">
      <div
        className="rounded-[2rem] border glass p-4 shadow-[0_26px_80px_-50px_oklch(0.1_0.02_60)] sm:p-6 lg:p-8"
        style={{ borderColor: withAlpha(breeze, 0.2) }}
      >
        <header
          className="flex flex-col gap-5 border-b pb-6 sm:flex-row sm:items-end sm:justify-between"
          style={{ borderColor: withAlpha(breeze, 0.15) }}
        >
          <div>
            <div
              className="inline-flex items-center gap-2 rounded-full border bg-noir/60 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.22em]"
              style={{ borderColor: withAlpha(breeze, 0.25), color: breeze }}
            >
              <FileText className="h-3.5 w-3.5" /> Source archive
            </div>
            <h2 className="mt-4 font-display text-3xl font-semibold text-foreground sm:text-4xl">Original Text</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/65 sm:text-base">
              The wording below is preserved exactly as supplied, with visual chapters added only to make comparison easier.
            </p>
          </div>
          <a
            href="/theory#theory-view"
            className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-full border border-gold/25 bg-noir/70 px-4 py-2.5 text-xs font-bold text-gold-ink shadow-sm transition hover:-translate-y-0.5 hover:border-gold/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/45 focus-visible:ring-offset-2"
          >
            <LayoutGrid className="h-3.5 w-3.5" /> Formatted View
          </a>
        </header>

        <nav
          aria-label="Original text sections"
          className="sticky top-20 z-20 -mx-1 mt-5 flex gap-2 overflow-x-auto rounded-2xl border bg-noir/55 p-2 shadow-sm"
          style={{ borderColor: withAlpha(breeze, 0.15), ["--original-hover" as string]: breeze }}
        >
          {originalTheorySections.map((section, index) => (
            <a
              key={section.id}
              href={`#original-${section.id}`}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-foreground/68 transition hover:bg-noir/80 hover:text-[var(--original-hover)]"
            >
              <span
                className="flex h-6 w-6 items-center justify-center rounded-lg text-[10px] font-bold"
                style={{ backgroundColor: withAlpha(breeze, 0.15), color: breeze }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              {section.title}
            </a>
          ))}
        </nav>

        <div className="mt-5 space-y-5">
          {originalTheorySections.map((section, index) => (
            <section
              key={section.id}
              id={`original-${section.id}`}
              className="scroll-mt-40 overflow-hidden rounded-[1.75rem] border border-gold/15 bg-noir/35 shadow-[0_18px_50px_-38px_oklch(0.1_0.02_60)]"
              style={
                {
                  "--original-accent": palette[index % palette.length].accent,
                  "--original-wash": palette[index % palette.length].wash,
                  "--original-soft": palette[index % palette.length].soft,
                } as CSSProperties
              }
            >
              <header className="flex items-center gap-3 border-b border-[var(--original-accent)]/20 bg-[var(--original-wash)] px-5 py-4 sm:px-7">
                <span className="font-display text-2xl font-semibold text-[var(--original-accent)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground sm:text-xl">{section.title}</h3>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/45">Verbatim source</p>
                </div>
              </header>
              <OriginalChapter content={section.content} paletteIndex={index} />
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
