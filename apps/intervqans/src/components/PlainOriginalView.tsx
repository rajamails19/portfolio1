import { FileText, LayoutGrid } from "lucide-react";
import type { OriginalTopicText } from "@/content/theory-original-rocky";

// Deliberately plain: no keyword highlighting, no per-section color palette,
// no heading/list heuristics. The text renders exactly as supplied, with
// only a thin divider inserted at "=====" breaks for readability.
export function PlainOriginalView({
  topic,
  entries,
}: {
  topic: string;
  entries: OriginalTopicText[];
}) {
  return (
    <main id="original-theory-view" className="mt-5 scroll-mt-24">
      <div className="glass rounded-[2rem] border border-gold/20 p-4 shadow-[0_26px_80px_-50px_oklch(0.1_0.02_60)] sm:p-6 lg:p-8">
        <header className="flex flex-col gap-5 border-b border-gold/15 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-noir/60 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-gold-ink">
              <FileText className="h-3.5 w-3.5" /> Source archive
            </div>
            <h2 className="mt-4 font-display text-3xl font-semibold text-foreground sm:text-4xl">Original Text</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/65 sm:text-base">
              {topic} — preserved exactly as supplied, no formatting or edits.
            </p>
          </div>
          <a
            href={`/theory?topic=${encodeURIComponent(topic)}#theory-view`}
            className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-full border border-gold/25 bg-noir/70 px-4 py-2.5 text-xs font-bold text-gold-ink shadow-sm transition hover:-translate-y-0.5 hover:border-gold/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/45 focus-visible:ring-offset-2"
          >
            <LayoutGrid className="h-3.5 w-3.5" /> Formatted View
          </a>
        </header>

        {entries.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-dashed border-gold/20 p-8 text-center text-sm text-muted-foreground">
            {topic === "Basics"
              ? "This tab was drafted directly in the formatted view above — there's no separate pasted source text for it."
              : `No source text for ${topic} yet.`}
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            {entries.map((entry) => {
              const chunks = entry.content.split(/\n\s*=====\s*\n/);
              return (
                <article
                  key={entry.id}
                  className="overflow-hidden rounded-[1.75rem] border border-gold/15 bg-noir/35 px-5 py-6 sm:px-8 sm:py-8"
                >
                  <h3 className="font-display text-xl font-semibold text-foreground sm:text-2xl">{entry.title}</h3>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    Verbatim source
                  </p>
                  <div className="mt-6 space-y-6 overflow-x-auto">
                    {chunks.map((chunk, chunkIndex) => (
                      <div key={chunkIndex}>
                        {chunkIndex > 0 && (
                          <div className="mb-6 flex items-center gap-3" aria-hidden>
                            <span className="h-px flex-1 bg-gold/15" />
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold/40" />
                            <span className="h-px flex-1 bg-gold/15" />
                          </div>
                        )}
                        <div className="whitespace-pre-wrap break-words font-mono text-[13px] leading-6 text-foreground/78 sm:text-sm sm:leading-7">
                          {chunk.trim()}
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
