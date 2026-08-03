import { FileText, LayoutGrid } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { originalTheorySections } from "@/content/theory-original";

const ORIGINAL_PALETTE = [
  { accent: "oklch(0.48 0.16 245)", wash: "oklch(0.92 0.055 245)", soft: "oklch(0.975 0.018 245)" },
  { accent: "oklch(0.49 0.18 345)", wash: "oklch(0.93 0.055 345)", soft: "oklch(0.978 0.016 345)" },
  { accent: "oklch(0.47 0.14 165)", wash: "oklch(0.92 0.05 165)", soft: "oklch(0.975 0.018 165)" },
  { accent: "oklch(0.5 0.16 65)", wash: "oklch(0.94 0.065 72)", soft: "oklch(0.98 0.02 72)" },
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
                <span className="rounded-full border border-[var(--original-accent)]/15 bg-white/65 px-3 py-1 font-mono text-[10px] font-bold tracking-[0.3em] text-[var(--original-accent)]">
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
  return (
    <main id="original-theory-view" className="mt-5 scroll-mt-24">
      <div className="rounded-[2rem] border border-white/70 bg-white/55 p-4 shadow-[0_26px_80px_-50px_oklch(0.48_0.16_245/0.4)] backdrop-blur-xl sm:p-6 lg:p-8">
        <header className="flex flex-col gap-5 border-b border-[oklch(0.7_0.08_240/0.28)] pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.65_0.1_240/0.25)] bg-[oklch(0.95_0.035_240)] px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[oklch(0.43_0.14_245)]">
              <FileText className="h-3.5 w-3.5" /> Source archive
            </div>
            <h2 className="mt-4 font-display text-3xl font-semibold text-foreground sm:text-4xl">Original Text</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/65 sm:text-base">
              The wording below is preserved exactly as supplied, with visual chapters added only to make comparison easier.
            </p>
          </div>
          <a
            href="/theory#theory-view"
            className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-full border border-rose/20 bg-white/80 px-4 py-2.5 text-xs font-bold text-rose shadow-sm transition hover:-translate-y-0.5 hover:border-rose/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose/45 focus-visible:ring-offset-2"
          >
            <LayoutGrid className="h-3.5 w-3.5" /> Formatted View
          </a>
        </header>

        <nav aria-label="Original text sections" className="sticky top-20 z-20 -mx-1 mt-5 flex gap-2 overflow-x-auto rounded-2xl border border-white/75 bg-white/75 p-2 shadow-sm backdrop-blur-xl">
          {originalTheorySections.map((section, index) => (
            <a
              key={section.id}
              href={`#original-${section.id}`}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-foreground/68 transition hover:bg-[oklch(0.94_0.035_240)] hover:text-[oklch(0.43_0.14_245)]"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[oklch(0.91_0.055_240)] text-[10px] font-bold text-[oklch(0.43_0.14_245)]">
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
              className="scroll-mt-40 overflow-hidden rounded-[1.75rem] border border-[oklch(0.72_0.07_240/0.28)] bg-[oklch(0.985_0.008_240/0.9)] shadow-[0_18px_50px_-38px_oklch(0.45_0.12_245/0.45)]"
              style={
                {
                  "--original-accent": ORIGINAL_PALETTE[index % ORIGINAL_PALETTE.length].accent,
                  "--original-wash": ORIGINAL_PALETTE[index % ORIGINAL_PALETTE.length].wash,
                  "--original-soft": ORIGINAL_PALETTE[index % ORIGINAL_PALETTE.length].soft,
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
