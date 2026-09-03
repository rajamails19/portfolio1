import { FileText, LayoutGrid } from "lucide-react";
import type { StorySegment } from "@/content/story-original";
import { CodeBlock } from "./CodeBlock";

// Verbatim source, rendered exactly as supplied — the only "formatting" is
// swapping each image marker for the actual diagram it stood in for.
export function StoryOriginalView({ segments }: { segments: StorySegment[] }) {
  return (
    <main id="original-story-view" className="mt-5 scroll-mt-24">
      <div className="glass rounded-[2rem] border border-gold/20 p-4 shadow-[0_26px_80px_-50px_oklch(0.1_0.02_60)] sm:p-6 lg:p-8">
        <header className="flex flex-col gap-5 border-b border-gold/15 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-noir/60 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-gold-ink">
              <FileText className="h-3.5 w-3.5" /> Source archive
            </div>
            <h2 className="mt-4 font-display text-3xl font-semibold text-foreground sm:text-4xl">
              Original Text
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/65 sm:text-base">
              Your story — preserved exactly as supplied, with each diagram placed where it belongs.
            </p>
          </div>
          <a
            href="/story#story-view"
            className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-full border border-gold/25 bg-noir/70 px-4 py-2.5 text-xs font-bold text-gold-ink shadow-sm transition hover:-translate-y-0.5 hover:border-gold/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/45 focus-visible:ring-offset-2"
          >
            <LayoutGrid className="h-3.5 w-3.5" /> Formatted View
          </a>
        </header>

        <div className="mt-6 space-y-6">
          {segments.map((segment, index) =>
            segment.type === "diagram" ? (
              <div key={index} className="overflow-hidden rounded-[1.75rem] border border-gold/15">
                <CodeBlock language="text" code={segment.content} />
              </div>
            ) : (
              <div
                key={index}
                className="overflow-x-auto whitespace-pre-wrap break-words font-mono text-[13px] leading-6 text-foreground/78 sm:text-sm sm:leading-7"
              >
                {segment.content}
              </div>
            ),
          )}
        </div>
      </div>
    </main>
  );
}
