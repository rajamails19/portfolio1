import { Link, useRouterState } from "@tanstack/react-router";
import { Fragment, useEffect, useState } from "react";
import { useSections } from "@/hooks/use-sections";
import { useTheme } from "@/themes/ThemeContext";
import {
  Sparkles,
  Code2,
  Zap,
  Rocket,
  Layers,
  BookOpenCheck,
  BookText,
  Heart,
  ListTree,
  ChevronRight,
} from "lucide-react";
import { termTiles } from "@/content/terms";
import { useTheoryFavorites } from "@/hooks/use-theory-favorites";

const icons: Record<string, typeof Sparkles> = {
  theory: BookOpenCheck,
  terms: BookText,
  qans: Sparkles,
  programs: Code2,
  realtime: Zap,
  projects: Rocket,
  others: Layers,
};

type Chapter = { id: string; label: string };

// Noir has one flat chapter list (no topic tabs).
const THEORY_CHAPTERS_FLAT: Record<string, Chapter[]> = {
  noir: [
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
    { id: "transformer-breakthrough-2017", label: "Transformers & attention" },
    { id: "what-happens-when-you-press-enter", label: "Prompt → answer" },
    { id: "linear-regression-best-fit-line", label: "ML → deep learning" },
  ],
};

// Rocky's chapters are scoped per topic tab, matching ArticleView's
// THEORY_TOPICS_BY_THEME tabs, so the chapter map always matches what's
// actually rendered instead of dumping every theme's chapters together.
const THEORY_CHAPTERS_BY_TOPIC: Record<string, Record<string, Chapter[]>> = {
  rocky: {
    "MS Fabric": [
      { id: "what-is-microsoft-fabric", label: "What is Fabric?" },
      { id: "why-fabric-exists", label: "Why Fabric exists" },
      { id: "onelake-heart-of-fabric", label: "OneLake" },
      { id: "fabric-workloads-ingestion-engineering", label: "Ingestion & engineering" },
      { id: "fabric-workloads-science-realtime-bi", label: "Science, real-time & BI" },
      { id: "lakehouse-vs-warehouse-fabric", label: "Lakehouse vs Warehouse" },
      { id: "medallion-architecture", label: "Medallion architecture" },
      { id: "direct-lake-explained", label: "Direct Lake" },
      { id: "fabric-real-world-project", label: "Real-world project" },
      { id: "fabric-real-time-analytics", label: "Real-time analytics" },
      { id: "onelake-shortcuts-and-governance", label: "Shortcuts & governance" },
      { id: "fabric-capacity-and-ai", label: "Capacity & AI" },
      { id: "fabric-whiteboard-architecture", label: "Whiteboard architecture" },
      { id: "fabric-vs-traditional-azure", label: "Fabric vs traditional Azure" },
      { id: "fabric-end-to-end-example", label: "End-to-end example" },
      { id: "fabric-restaurant-analogy", label: "Restaurant analogy" },
      { id: "fabric-30-second-explanation", label: "30-second explanation" },
    ],
    PowerBI: [
      { id: "what-is-power-bi", label: "What is Power BI?" },
      { id: "power-bi-ecosystem-tools", label: "Ecosystem: tools" },
      { id: "power-bi-ecosystem-service", label: "Ecosystem: service" },
      { id: "power-query-and-query-folding", label: "Query folding" },
      { id: "star-schema-modeling", label: "Star schema" },
      { id: "vertipaq-engine", label: "VertiPaq" },
      { id: "dax-calculation-engine", label: "DAX & filter context" },
      { id: "measures-vs-calculated-columns-pbi", label: "Measures vs columns" },
      { id: "import-directquery-composite", label: "Storage modes" },
      { id: "incremental-refresh-gateway-rls", label: "Refresh, gateway & RLS" },
      { id: "performance-optimization-architecture", label: "Performance tuning" },
      { id: "dax-formula-vs-storage-engine", label: "Formula vs storage engine" },
      { id: "row-context-vs-filter-context", label: "Row vs filter context" },
      { id: "relationship-direction", label: "Relationship direction" },
      { id: "power-bi-real-world-project", label: "Real-world project" },
      { id: "power-bi-deployment-architecture", label: "Deployment architecture" },
      { id: "power-bi-fabric-architecture", label: "Power BI + Fabric" },
      { id: "power-bi-seminar-flow-and-checklist", label: "Seminar flow & checklist" },
      { id: "power-bi-master-architecture-and-goal", label: "Master architecture & goal" },
    ],
    Basics: [
      { id: "what-is-a-data-analyst", label: "What is a data analyst?" },
      { id: "why-data-analysts-exist", label: "Why the role exists" },
      { id: "how-analysts-work-lifecycle", label: "The analysis lifecycle" },
      { id: "when-descriptive-diagnostic-predictive-prescriptive", label: "Analytics maturity" },
      { id: "data-analyst-toolkit", label: "The toolkit" },
      { id: "sql-for-analysts", label: "SQL for analysts" },
      { id: "excel-vs-sql-vs-python", label: "Excel vs SQL vs Python" },
      { id: "da-real-time-scenario-sales-drop", label: "Scenario: sales drop" },
      { id: "da-real-time-scenario-kpi-dashboard", label: "Scenario: KPI dashboard" },
      { id: "da-architecture-raw-to-decision", label: "Raw data → decision" },
      { id: "data-quality-garbage-in-garbage-out", label: "Data quality" },
      { id: "communicating-with-stakeholders", label: "Communicating findings" },
      { id: "data-analyst-10-things-to-know", label: "10 things to know" },
    ],
    Tableau: [],
  },
};

export function SideNav() {
  const { location } = useRouterState();
  const { theme, themeKey } = useTheme();
  const sections = useSections();
  const favoritesEnabled = themeKey === "rocky";
  const favoritesActive = location.pathname.startsWith("/favorites");
  const { favorites } = useTheoryFavorites(favoritesEnabled);
  const isTerms = location.pathname.startsWith("/terms") && themeKey === "noir";
  const activeSlug = isTerms
    ? "terms"
    : (sections.find((s) => location.pathname.startsWith(`/${s.slug}`))?.slug ?? "qans");
  const activeMeta = theme.sections[activeSlug];
  const isTheory = location.pathname.startsWith("/theory");
  const search = location.search as Record<string, unknown>;
  const currentTopic = typeof search.topic === "string" ? search.topic : undefined;
  const topicChapters = THEORY_CHAPTERS_BY_TOPIC[themeKey];
  const chapters = topicChapters
    ? (topicChapters[currentTopic ?? ""] ?? [])
    : (THEORY_CHAPTERS_FLAT[themeKey] ?? []);
  const [activeChapter, setActiveChapter] = useState(chapters[0]?.id ?? "");

  useEffect(() => {
    setActiveChapter(chapters[0]?.id ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeKey, currentTopic]);

  useEffect(() => {
    if (!isTheory) return;

    const chapterElements = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter((element): element is HTMLElement => Boolean(element));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        if (visible?.target.id) {
          setActiveChapter(visible.target.id);
        }
      },
      { rootMargin: "-22% 0px -68% 0px", threshold: 0 },
    );

    chapterElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [isTheory, chapters]);

  return (
    <aside className="flex w-72 shrink-0 flex-col gap-5 p-6">
      <Link to="/" className="group flex items-center gap-3">
        <div className="relative">
          <span className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-gold to-ember opacity-60 blur-md" />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-noir font-display text-2xl font-bold text-gold-ink ring-1 ring-gold/40">
            {theme.brandName.charAt(0)}
          </div>
        </div>
        <div className="leading-tight">
          <div className="font-display text-xl font-semibold gradient-text">{theme.brandName}</div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {theme.brandKicker}
          </div>
        </div>
      </Link>

      <nav className="glass flex flex-col gap-1 rounded-3xl p-3">
        {sections.map((s, index) => {
          const Icon = icons[s.slug] ?? Sparkles;
          const to = `/${s.slug}` as const;
          const active = location.pathname.startsWith(to);
          const meta = theme.sections[s.slug];
          return (
            <Fragment key={s.slug}>
              <Link
                to={to}
                className={[
                  "group relative flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all",
                  active
                    ? "bg-gradient-to-r from-gold/90 to-ember/80 text-primary-foreground shadow-glow"
                    : "text-foreground/85 hover:bg-white/5 hover:text-foreground",
                ].join(" ")}
              >
                <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-xl ring-1 ring-gold/30">
                  <img
                    src={meta.mascot.image}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </span>
                <span className="flex flex-1 flex-col leading-tight">
                  <span className="flex items-center gap-1.5">
                    <Icon className="h-3.5 w-3.5 opacity-80" />
                    {meta.title}
                  </span>
                  <span
                    className={[
                      "text-[10px] uppercase tracking-wider",
                      active ? "text-primary-foreground/80" : "text-muted-foreground",
                    ].join(" ")}
                  >
                    {meta.mascot.name}
                  </span>
                </span>
                <span
                  className={[
                    "rounded-full px-2 py-0.5 text-[10px] font-semibold tabular-nums",
                    active
                      ? "bg-black/25 text-primary-foreground"
                      : "bg-white/5 text-foreground/70",
                  ].join(" ")}
                >
                  {s.items.length}
                </span>
              </Link>
              {index === 0 && themeKey === "noir" && (
                <Link
                  key="terms"
                  to="/terms"
                  className={[
                    "group relative flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all",
                    isTerms
                      ? "bg-gradient-to-r from-gold/90 to-ember/80 text-primary-foreground shadow-glow"
                      : "text-foreground/85 hover:bg-white/5 hover:text-foreground",
                  ].join(" ")}
                >
                  <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-xl ring-1 ring-gold/30">
                    <img
                      src={theme.sections.terms.mascot.image}
                      alt=""
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </span>
                  <span className="flex flex-1 flex-col leading-tight">
                    <span className="flex items-center gap-1.5">
                      <BookText className="h-3.5 w-3.5 opacity-80" />
                      {theme.sections.terms.title}
                    </span>
                    <span
                      className={[
                        "text-[10px] uppercase tracking-wider",
                        isTerms ? "text-primary-foreground/80" : "text-muted-foreground",
                      ].join(" ")}
                    >
                      {theme.sections.terms.mascot.name}
                    </span>
                  </span>
                  <span
                    className={[
                      "rounded-full px-2 py-0.5 text-[10px] font-semibold tabular-nums",
                      isTerms
                        ? "bg-black/25 text-primary-foreground"
                        : "bg-white/5 text-foreground/70",
                    ].join(" ")}
                  >
                    {termTiles.length}
                  </span>
                </Link>
              )}
            </Fragment>
          );
        })}
        {favoritesEnabled && (
          <Link
            to="/favorites"
            className={[
              "group relative flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all",
              favoritesActive
                ? "bg-gradient-to-r from-gold/90 to-ember/80 text-primary-foreground shadow-glow"
                : "text-foreground/85 hover:bg-white/5 hover:text-foreground",
            ].join(" ")}
          >
            <span
              className={[
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border",
                favoritesActive
                  ? "border-black/15 bg-black/15"
                  : "border-ember/30 bg-ember/10 text-ember",
              ].join(" ")}
            >
              <Heart className="h-4 w-4" fill={favoritesActive ? "currentColor" : "none"} />
            </span>
            <span className="flex flex-1 flex-col leading-tight">
              <span className="flex items-center gap-1.5">Favorites</span>
              <span
                className={[
                  "text-[10px] uppercase tracking-wider",
                  favoritesActive ? "text-primary-foreground/80" : "text-muted-foreground",
                ].join(" ")}
              >
                Saved snippets
              </span>
            </span>
            <span
              className={[
                "rounded-full px-2 py-0.5 text-[10px] font-semibold tabular-nums",
                favoritesActive
                  ? "bg-black/25 text-primary-foreground"
                  : "bg-white/5 text-foreground/70",
              ].join(" ")}
            >
              {favorites.length}
            </span>
          </Link>
        )}
      </nav>

      {favoritesActive ? (
        <div className="glass rounded-3xl p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-ember/30 bg-ember/10 text-ember">
              <Heart className="h-5 w-5" fill="currentColor" />
            </span>
            <div>
              <div className="font-display text-sm font-semibold text-gold-ink">How to save</div>
              <div className="mt-0.5 text-[11px] leading-relaxed text-foreground/65">
                Highlight any text in DAnalyst Basics, then choose Favorite.
              </div>
            </div>
          </div>
        </div>
      ) : isTheory && chapters.length > 0 ? (
        <nav aria-label="Conceptual Theory chapters" className="glass rounded-3xl p-3">
          <div className="mb-2 flex items-center gap-2 px-2 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            <ListTree className="h-3.5 w-3.5 text-gold-ink" /> Chapter map
          </div>
          <div className="space-y-0.5">
            {chapters.map((chapter, index) => {
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
                      ? "bg-gradient-to-r from-gold/90 to-ember/80 text-primary-foreground shadow-sm"
                      : "text-foreground/65 hover:bg-white/5 hover:text-gold-ink",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[10px] tabular-nums",
                      active ? "bg-black/20 text-primary-foreground" : "bg-gold/10 text-gold-ink",
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
                        : "opacity-70 sm:-translate-x-1 sm:opacity-0 sm:group-hover:translate-x-0 sm:group-hover:opacity-70",
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
              src={activeMeta.mascot.image}
              alt={activeMeta.mascot.name}
              className="h-14 w-14 rounded-2xl object-cover ring-1 ring-gold/40"
              loading="lazy"
            />
            <div className="min-w-0">
              <div className="truncate font-display text-sm font-semibold text-gold-ink">
                {activeMeta.mascot.name}
              </div>
              <div className="truncate text-[10px] uppercase tracking-wider text-muted-foreground">
                {activeMeta.mascot.title}
              </div>
            </div>
          </div>
          <p className="mt-3 font-display text-[13px] italic leading-snug text-foreground/85">
            "{activeMeta.mascot.quote.slice(0, 130)}
            {activeMeta.mascot.quote.length > 130 ? "…" : ""}"
          </p>
        </div>
      )}
    </aside>
  );
}
