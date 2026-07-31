import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useDeck } from "@/hooks/use-deck";
import {
  Sparkles,
  Music2,
  Zap,
  Star,
  Layers,
  BookOpen,
  ChevronRight,
  ListTree,
} from "lucide-react";

const icons: Record<string, typeof Sparkles> = {
  theory: BookOpen,
  qans: Sparkles,
  programs: Music2,
  realtime: Zap,
  projects: Star,
  others: Layers,
};

const theoryChapters = [
  { id: "ai-engineering-is-a-team-sport", label: "AI foundations" },
  { id: "how-learning-actually-happens", label: "How models learn" },
  { id: "goal-is-generalization", label: "Generalization" },
  { id: "what-is-the-computer-doing", label: "Parameters & models" },
  { id: "three-different-classrooms", label: "Learning types" },
  { id: "features-and-labels", label: "Features & predictions" },
  { id: "how-can-a-machine-understand-language", label: "Language & tokens" },
  { id: "embedding-space", label: "Embeddings & search" },
  { id: "bias-and-variance", label: "Bias & variance" },
  { id: "train-validation-test-splits", label: "Train, validate, test" },
] as const;

export function SideNav() {
  const { location } = useRouterState();
  const deck = useDeck();
  const activeSlug =
    deck.sections.find((s) => location.pathname.startsWith(`/${s.slug}`))?.slug ?? "qans";
  const activeFounder = deck.foundersBySection[activeSlug];
  const isTheory = location.pathname.startsWith("/theory");
  const [activeChapter, setActiveChapter] = useState(theoryChapters[0].id);

  useEffect(() => {
    if (!isTheory) return;

    const chapterElements = theoryChapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter((element): element is HTMLElement => Boolean(element));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        if (visible?.target.id) setActiveChapter(visible.target.id);
      },
      { rootMargin: "-22% 0px -68% 0px", threshold: 0 },
    );

    chapterElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [isTheory]);

  return (
    <aside className="sticky top-0 flex h-screen w-72 shrink-0 flex-col gap-5 overflow-y-auto p-6">
      <Link to="/" className="group flex items-center gap-3">
        <div className="relative">
          <span className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-solid-rose to-solid-coral opacity-60 blur-md" />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-noir font-display text-2xl font-bold text-rose ring-1 ring-rose/40">
            {deck.brandLogo}
          </div>
        </div>
        <div className="leading-tight">
          <div className="font-display text-xl font-semibold gradient-text">{deck.brandName}</div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {deck.brandTag}
          </div>
        </div>
      </Link>

      <nav className="glass flex flex-col gap-1 rounded-3xl p-3">
        {deck.sections.map((s) => {
          const Icon = icons[s.slug] ?? Sparkles;
          const to = `/${s.slug}` as const;
          const active = location.pathname.startsWith(to);
          const f = deck.foundersBySection[s.slug];
          return (
            <Link
              key={s.slug}
              to={to}
              className={[
                "group relative flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all",
                active
                  ? "bg-gradient-to-r from-solid-rose to-solid-coral text-on-solid shadow-glow"
                  : "text-foreground/85 hover:bg-white/5 hover:text-foreground",
              ].join(" ")}
            >
              <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-xl ring-1 ring-rose/30">
                <img src={f.image} alt="" className="h-full w-full object-cover" loading="lazy" />
              </span>
              <span className="flex flex-1 flex-col leading-tight">
                <span className="flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5 opacity-80" />
                  {s.title}
                </span>
                <span
                  className={[
                    "text-[10px] uppercase tracking-wider",
                    active ? "text-on-solid/90" : "text-muted-foreground",
                  ].join(" ")}
                >
                  {f.name}
                </span>
              </span>
              <span
                className={[
                  "rounded-full px-2 py-0.5 text-[10px] font-semibold tabular-nums",
                  active ? "bg-black/25 text-on-solid" : "bg-white/5 text-foreground/70",
                ].join(" ")}
              >
                {s.items.length}
              </span>
            </Link>
          );
        })}
      </nav>

      {isTheory ? (
        <nav aria-label="Conceptual Theory chapters" className="glass rounded-3xl p-3">
          <div className="mb-2 flex items-center gap-2 px-2 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            <ListTree className="h-3.5 w-3.5 text-rose" /> Chapter map
          </div>
          <div className="space-y-0.5">
            {theoryChapters.map((chapter, index) => {
              const active = activeChapter === chapter.id;
              return (
                <a
                  key={chapter.id}
                  href={`#${chapter.id}`}
                  onClick={() => setActiveChapter(chapter.id)}
                  aria-current={active ? "location" : undefined}
                  className={[
                    "group flex items-center gap-2 rounded-xl px-2.5 py-2 text-xs font-semibold transition",
                    active
                      ? "bg-gradient-to-r from-solid-rose to-solid-coral text-on-solid shadow-sm"
                      : "text-foreground/65 hover:bg-white/55 hover:text-rose",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[10px] tabular-nums",
                      active ? "bg-white/20" : "bg-rose/10 text-rose",
                    ].join(" ")}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1 truncate">{chapter.label}</span>
                  <ChevronRight
                    className={[
                      "h-3.5 w-3.5 transition",
                      active
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-70",
                    ].join(" ")}
                  />
                </a>
              );
            })}
          </div>
        </nav>
      ) : (
        <div className="glass animate-glow-pulse relative overflow-hidden rounded-3xl p-4">
          <div className="flex items-center gap-3">
            <img
              src={activeFounder.image}
              alt={activeFounder.name}
              className="h-14 w-14 rounded-2xl object-cover ring-1 ring-rose/40"
              loading="lazy"
            />
            <div className="min-w-0">
              <div className="truncate font-display text-sm font-semibold text-rose">
                {activeFounder.name}
              </div>
              <div className="truncate text-[10px] uppercase tracking-wider text-muted-foreground">
                {activeFounder.title}
              </div>
            </div>
          </div>
          <p className="mt-3 font-display text-[13px] italic leading-snug text-foreground/85">
            "{activeFounder.quote.slice(0, 130)}
            {activeFounder.quote.length > 130 ? "…" : ""}"
          </p>
        </div>
      )}
    </aside>
  );
}
