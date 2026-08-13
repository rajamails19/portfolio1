import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Quote,
  Code2,
  CircleDot,
  BookOpen,
  Atom,
  Coffee,
  Shield,
  BarChart3,
  LayoutDashboard,
  Cloud,
} from "lucide-react";
import type { Section } from "@/content/types";
import { useTheme } from "@/themes/ThemeContext";
import { QuestionCard } from "./QuestionCard";
import { QuotesTicker } from "./QuotesTicker";

const QANS_TOPICS_BY_THEME: Record<string, { name: string; Icon: typeof Code2 }[]> = {
  chaat: [
    { name: "Playwright", Icon: Code2 },
    { name: "Selenium", Icon: CircleDot },
    { name: "Basics", Icon: BookOpen },
  ],
  fifa: [
    { name: "React", Icon: Atom },
    { name: "Java", Icon: Coffee },
    { name: "Angular", Icon: Shield },
  ],
  rocky: [
    { name: "Basics", Icon: BookOpen },
    { name: "PowerBI", Icon: BarChart3 },
    { name: "Tableau", Icon: LayoutDashboard },
    { name: "MS Fabric", Icon: Cloud },
  ],
};

export function SectionView({ section }: { section: Section }) {
  const [q, setQ] = useState("");
  const { theme, themeKey } = useTheme();
  const meta = theme.sections[section.slug];
  const mascot = meta.mascot;
  const topics = section.slug === "qans" ? QANS_TOPICS_BY_THEME[themeKey] : undefined;
  const showTopics = !!topics;
  const [activeTopic, setActiveTopic] = useState(topics?.[0]?.name ?? "");

  useEffect(() => {
    if (topics && !topics.some((t) => t.name === activeTopic)) {
      setActiveTopic(topics[0].name);
    }
  }, [topics, activeTopic]);

  const visibleItems = useMemo(
    () => (showTopics ? section.items.filter((it) => it.category === activeTopic) : section.items),
    [activeTopic, section.items, showTopics],
  );

  const filtered = useMemo(() => {
    if (!q.trim()) return visibleItems;
    const needle = q.toLowerCase();
    return visibleItems.filter(
      (it) =>
        it.question.toLowerCase().includes(needle) ||
        it.tags?.some((t) => t.toLowerCase().includes(needle)),
    );
  }, [q, visibleItems]);

  return (
    <div className="mx-auto w-full max-w-4xl px-6 pb-16 pt-8">
      <div className="relative overflow-hidden rounded-4xl shadow-glow ring-1 ring-gold/20">
        <img
          src={mascot.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-45"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-noir via-noir/85 to-noir/30" />
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
        <div className="relative grid gap-6 p-8 sm:p-10 md:grid-cols-[1.5fr,1fr] md:items-center">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-noir/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-ink backdrop-blur">
              <span className="text-base">{meta.emoji}</span> Section
            </div>
            <h1 className="font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              {meta.title}
            </h1>
            <p className="mt-3 max-w-xl text-base text-foreground/75 sm:text-lg">{meta.tagline}</p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-gold/25 bg-noir/60 px-3 py-1 text-xs font-semibold text-foreground/80">
                {visibleItems.length} entries
              </span>
              <span className="rounded-full border border-gold/25 bg-noir/60 px-3 py-1 text-xs font-semibold text-foreground/80">
                Click any card to expand
              </span>
            </div>
          </div>
          <div className="glass-strong hidden rounded-3xl p-4 md:block">
            <div className="flex items-center gap-3">
              <img
                src={mascot.image}
                alt={mascot.name}
                className="h-14 w-14 rounded-2xl object-cover ring-1 ring-gold/40"
              />
              <div>
                <div className="font-display text-sm font-semibold text-gold-ink">{mascot.name}</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {mascot.title}
                </div>
              </div>
            </div>
            <Quote className="mt-3 h-4 w-4 text-gold-ink" />
            <p className="mt-1 font-display text-sm italic leading-snug text-foreground/90">
              "{mascot.quote}"
            </p>
          </div>
        </div>
      </div>

      {showTopics && (
        <div className="mt-5 flex justify-center sm:justify-start">
          <div
            className="glass inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-gold/20 p-1.5 shadow-[var(--shadow-soft)]"
            role="tablist"
            aria-label="Q and Answers topics"
          >
            {topics?.map(({ name, Icon }) => {
              const active = activeTopic === name;
              return (
                <button
                  key={name}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setActiveTopic(name);
                    setQ("");
                  }}
                  className={[
                    "inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-bold tracking-wide transition-all duration-300 sm:text-sm",
                    active
                      ? "bg-gradient-to-r from-gold to-ember text-primary-foreground shadow-glow"
                      : "text-foreground/65 hover:bg-noir/60 hover:text-foreground",
                  ].join(" ")}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {name}
                  {active && (
                    <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[10px] tabular-nums">
                      {visibleItems.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-6">
        <QuotesTicker />
      </div>

      <div className="glass sticky top-4 z-10 mt-6 flex items-center gap-3 rounded-full px-4 py-2.5">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={`Search in ${showTopics ? activeTopic : meta.title}…`}
          className="flex-1 bg-transparent text-base placeholder:text-muted-foreground/70 focus:outline-none sm:text-sm"
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
            {showTopics && !q
              ? `${activeTopic} questions are coming next.`
              : "No matches. Try a different keyword."}
          </div>
        ) : (
          filtered.map((it, i) => <QuestionCard key={it.id} item={it} index={i} />)
        )}
      </div>
    </div>
  );
}
