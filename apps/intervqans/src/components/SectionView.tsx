import { useMemo, useState } from "react";
import { Search, Quote } from "lucide-react";
import type { Section } from "@/content/types";
import { foundersBySection } from "@/content/founders";
import { QuestionCard } from "./QuestionCard";
import { QuotesTicker } from "./QuotesTicker";

export function SectionView({ section }: { section: Section }) {
  const [q, setQ] = useState("");
  const founder = foundersBySection[section.slug];

  const filtered = useMemo(() => {
    if (!q.trim()) return section.items;
    const needle = q.toLowerCase();
    return section.items.filter(
      (it) =>
        it.question.toLowerCase().includes(needle) ||
        it.tags?.some((t) => t.toLowerCase().includes(needle)),
    );
  }, [q, section.items]);

  return (
    <div className="mx-auto w-full max-w-4xl px-6 pb-16 pt-8">
      <div className="relative overflow-hidden rounded-4xl shadow-glow ring-1 ring-gold/20">
        {founder && (
          <img
            src={founder.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-45"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-noir via-noir/85 to-noir/30" />
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
        <div className="relative grid gap-6 p-8 sm:p-10 md:grid-cols-[1.5fr,1fr] md:items-center">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-noir/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold backdrop-blur">
              <span className="text-base">{section.emoji}</span> Section
            </div>
            <h1 className="font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              {section.title}
            </h1>
            <p className="mt-3 max-w-xl text-base text-foreground/75 sm:text-lg">{section.tagline}</p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-gold/25 bg-noir/60 px-3 py-1 text-xs font-semibold text-foreground/80">
                {section.items.length} entries
              </span>
              <span className="rounded-full border border-gold/25 bg-noir/60 px-3 py-1 text-xs font-semibold text-foreground/80">
                Click any card to expand
              </span>
            </div>
          </div>
          {founder && (
            <div className="glass-strong hidden rounded-3xl p-4 md:block">
              <div className="flex items-center gap-3">
                <img src={founder.image} alt={founder.name} className="h-14 w-14 rounded-2xl object-cover ring-1 ring-gold/40" />
                <div>
                  <div className="font-display text-sm font-semibold text-gold">{founder.name}</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{founder.title}</div>
                </div>
              </div>
              <Quote className="mt-3 h-4 w-4 text-gold" />
              <p className="mt-1 font-display text-sm italic leading-snug text-foreground/90">"{founder.quote}"</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <QuotesTicker />
      </div>

      <div className="glass sticky top-4 z-10 mt-6 flex items-center gap-3 rounded-full px-4 py-2.5">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={`Search in ${section.title}…`}
          className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground/70 focus:outline-none"
        />
        {q && (
          <button
            onClick={() => setQ("")}
            className="rounded-full border border-gold/25 bg-noir/60 px-2 py-0.5 text-xs font-medium text-foreground/80 hover:bg-noir"
          >
            clear
          </button>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {filtered.length === 0 ? (
          <div className="glass rounded-3xl p-8 text-center text-sm text-muted-foreground">
            No matches. Try a different keyword.
          </div>
        ) : (
          filtered.map((it, i) => <QuestionCard key={it.id} item={it} index={i} />)
        )}
      </div>
    </div>
  );
}
