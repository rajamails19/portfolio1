import type { CSSProperties } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Activity,
  ArrowLeftRight,
  ArrowUp,
  BarChart3,
  BookOpen,
  BookOpenCheck,
  BrainCircuit,
  Bot,
  Boxes,
  ChefHat,
  Cloud,
  Code2,
  Compass,
  Cpu,
  Gauge,
  GraduationCap,
  LayoutDashboard,
  LibraryBig,
  FileText,
  Languages,
  Map,
  MousePointerClick,
  Mountain,
  Network,
  RefreshCcw,
  Route,
  Scale,
  School,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Tags,
  Target,
  Trophy,
  UsersRound,
  Crosshair,
  type LucideIcon,
} from "lucide-react";
import type { Block, Section } from "@/content/types";
import { useTheme } from "@/themes/ThemeContext";
import { rockyOriginalByTopic } from "@/content/theory-original-rocky";
import { AnswerBlocks } from "./AnswerBlocks";
import { OriginalTheoryView } from "./OriginalTheoryView";
import { PlainOriginalView } from "./PlainOriginalView";
import { FavoriteHeart } from "./TheoryFavorites";
import {
  favoriteIdForSelection,
  useTheoryFavorites,
  type NewTheoryFavorite,
} from "@/hooks/use-theory-favorites";

const THEORY_TOPICS_BY_THEME: Record<string, { name: string; Icon: typeof Code2 }[]> = {
  rocky: [
    { name: "Basics", Icon: BookOpen },
    { name: "PowerBI", Icon: BarChart3 },
    { name: "Tableau", Icon: LayoutDashboard },
    { name: "MS Fabric", Icon: Cloud },
  ],
};

// Verbatim source text for topic-tabbed themes, keyed by theme then topic.
const THEORY_ORIGINAL_BY_THEME: Record<
  string,
  Record<string, { id: string; title: string; content: string }[]>
> = {
  rocky: rockyOriginalByTopic,
};

type ConceptStyle = {
  Icon: LucideIcon;
  accent: string;
  wash: string;
};

const CONCEPT_STYLES: ConceptStyle[] = [
  { Icon: UsersRound, accent: "oklch(0.78 0.15 85)", wash: "oklch(0.3 0.06 85)" },
  { Icon: MousePointerClick, accent: "oklch(0.75 0.14 235)", wash: "oklch(0.28 0.06 235)" },
  { Icon: Scale, accent: "oklch(0.78 0.15 45)", wash: "oklch(0.3 0.07 45)" },
  { Icon: Sparkles, accent: "oklch(0.76 0.15 320)", wash: "oklch(0.29 0.06 320)" },
  { Icon: Route, accent: "oklch(0.75 0.13 155)", wash: "oklch(0.28 0.06 155)" },
  { Icon: Gauge, accent: "oklch(0.78 0.17 40)", wash: "oklch(0.3 0.08 40)" },
  { Icon: Compass, accent: "oklch(0.75 0.14 285)", wash: "oklch(0.28 0.06 285)" },
  { Icon: Target, accent: "oklch(0.75 0.19 22)", wash: "oklch(0.29 0.07 22)" },
  { Icon: Mountain, accent: "oklch(0.75 0.12 225)", wash: "oklch(0.28 0.05 225)" },
  { Icon: GraduationCap, accent: "oklch(0.78 0.18 345)", wash: "oklch(0.3 0.07 345)" },
  { Icon: Cpu, accent: "oklch(0.75 0.14 255)", wash: "oklch(0.28 0.06 255)" },
  { Icon: ChefHat, accent: "oklch(0.79 0.16 52)", wash: "oklch(0.31 0.08 52)" },
  { Icon: Bot, accent: "oklch(0.75 0.13 175)", wash: "oklch(0.28 0.06 175)" },
  { Icon: Network, accent: "oklch(0.76 0.16 305)", wash: "oklch(0.29 0.06 305)" },
  { Icon: Trophy, accent: "oklch(0.78 0.15 85)", wash: "oklch(0.31 0.08 85)" },
  { Icon: School, accent: "oklch(0.78 0.17 335)", wash: "oklch(0.3 0.07 335)" },
  { Icon: Tags, accent: "oklch(0.75 0.13 205)", wash: "oklch(0.28 0.06 205)" },
  { Icon: ArrowLeftRight, accent: "oklch(0.79 0.16 67)", wash: "oklch(0.31 0.08 67)" },
  { Icon: Languages, accent: "oklch(0.75 0.15 280)", wash: "oklch(0.28 0.06 280)" },
  { Icon: Boxes, accent: "oklch(0.75 0.13 165)", wash: "oklch(0.28 0.06 165)" },
  { Icon: Map, accent: "oklch(0.77 0.17 30)", wash: "oklch(0.3 0.07 30)" },
  { Icon: Search, accent: "oklch(0.75 0.13 235)", wash: "oklch(0.28 0.055 235)" },
  { Icon: BrainCircuit, accent: "oklch(0.76 0.16 310)", wash: "oklch(0.29 0.06 310)" },
  { Icon: Crosshair, accent: "oklch(0.78 0.18 350)", wash: "oklch(0.3 0.07 350)" },
  { Icon: SlidersHorizontal, accent: "oklch(0.79 0.15 88)", wash: "oklch(0.31 0.08 88)" },
  { Icon: ShieldCheck, accent: "oklch(0.75 0.12 150)", wash: "oklch(0.28 0.055 150)" },
  { Icon: RefreshCcw, accent: "oklch(0.75 0.14 255)", wash: "oklch(0.28 0.06 255)" },
];

type BlockGroup = {
  blocks: Block[];
  startIndex: number;
};

type SelectionCandidate = {
  favorite: NewTheoryFavorite;
  top: number;
  left: number;
};

function groupBlocks(blocks: Block[]): BlockGroup[] {
  const groups: BlockGroup[] = [];

  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index];
    if (block.type === "heading" && blocks[index + 1]) {
      groups.push({ blocks: [block, blocks[index + 1]], startIndex: index });
      index += 1;
    } else {
      groups.push({ blocks: [block], startIndex: index });
    }
  }

  return groups;
}

function tileSpan(blocks: Block[]) {
  if (blocks.some((block) => block.type === "table" || block.type === "flow")) {
    return "md:col-span-2 xl:col-span-3";
  }

  const list = blocks.find(
    (block): block is Extract<Block, { type: "list" }> => block.type === "list",
  );
  if (list && list.items.length > 4) return "md:col-span-2";
  if (blocks.some((block) => block.type === "callout")) return "md:col-span-2";

  return "";
}

function BlockTile({
  group,
  conceptIndex,
  tileIndex,
  sourceId,
  sourceTitle,
}: {
  group: BlockGroup;
  conceptIndex: number;
  tileIndex: number;
  sourceId: string;
  sourceTitle: string;
}) {
  const style = CONCEPT_STYLES[conceptIndex % CONCEPT_STYLES.length];
  const visualBlock = group.blocks.find((block) => block.type !== "heading") ?? group.blocks[0];
  const Icon =
    visualBlock.type === "flow"
      ? Activity
      : visualBlock.type === "table"
        ? BookOpenCheck
        : visualBlock.type === "callout"
          ? BrainCircuit
          : visualBlock.type === "list"
            ? LibraryBig
            : Sparkles;

  return (
    <div
      data-favorite-source-id={sourceId}
      data-favorite-source-title={sourceTitle}
      className={`theory-block-card group relative overflow-hidden rounded-[1.65rem] border p-5 shadow-[0_12px_38px_-24px_var(--concept-accent)] transition duration-300 hover:-translate-y-1 sm:p-6 ${tileSpan(group.blocks)}`}
      style={
        {
          "--concept-accent": style.accent,
          "--concept-wash": style.wash,
          "--tile-delay": `${Math.min(tileIndex, 5) * 70}ms`,
        } as CSSProperties
      }
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[var(--concept-wash)] opacity-40 transition duration-500 group-hover:scale-125" />
      <div className="mb-3 flex items-center justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-gold/20 bg-[var(--concept-wash)] text-[var(--concept-accent)] shadow-sm">
          <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} />
        </span>
        <span className="h-1.5 w-12 rounded-full bg-[var(--concept-accent)] opacity-25 transition-all duration-300 group-hover:w-20 group-hover:opacity-50" />
      </div>
      <AnswerBlocks blocks={group.blocks} />
    </div>
  );
}

export function ArticleView({
  section,
  showOriginalText = false,
  initialTopic,
}: {
  section: Section;
  showOriginalText?: boolean;
  initialTopic?: string;
}) {
  const { themeKey } = useTheme();
  const navigate = useNavigate();
  const topics = THEORY_TOPICS_BY_THEME[themeKey];
  const showTopics = !!topics;
  const [activeTopic, setActiveTopic] = useState(
    (initialTopic && topics?.some((t) => t.name === initialTopic)
      ? initialTopic
      : topics?.[0]?.name) ?? "",
  );
  const favoritesEnabled = themeKey === "rocky";
  const isBasicsFavoritesPoc = favoritesEnabled && activeTopic === "Basics";
  const { favorites, addFavorite, removeFavorite } = useTheoryFavorites(favoritesEnabled);
  const [selectionCandidate, setSelectionCandidate] = useState<SelectionCandidate | null>(null);
  const favoriteContentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!topics || topics.some((t) => t.name === activeTopic)) return;
    const fallback =
      initialTopic && topics.some((t) => t.name === initialTopic) ? initialTopic : topics[0].name;
    setActiveTopic(fallback);
  }, [topics, activeTopic, initialTopic]);

  useEffect(() => {
    setSelectionCandidate(null);
  }, [activeTopic]);

  // Keep the URL's `topic` param in sync with the active tab (not just when
  // toggling Original Text) so the sidebar's chapter map can read it too.
  useEffect(() => {
    if (!showTopics || !activeTopic) return;
    navigate({
      to: "/theory",
      search: (prev) => ({ view: prev.view, topic: activeTopic }),
      replace: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTopic, showTopics]);

  const items = useMemo(
    () => (showTopics ? section.items.filter((it) => it.category === activeTopic) : section.items),
    [activeTopic, section.items, showTopics],
  );

  const originalEntries = showTopics
    ? (THEORY_ORIGINAL_BY_THEME[themeKey]?.[activeTopic] ?? [])
    : undefined;

  const captureFavoriteSelection = useCallback(() => {
    if (!isBasicsFavoritesPoc) return;

    window.setTimeout(() => {
      const selection = window.getSelection();
      const selectedText = selection?.toString().replace(/\s+/g, " ").trim() ?? "";
      const root = favoriteContentRef.current;
      const anchorNode = selection?.anchorNode;

      if (
        !selection ||
        selection.rangeCount === 0 ||
        selection.isCollapsed ||
        !selectedText ||
        !root ||
        !anchorNode
      ) {
        setSelectionCandidate(null);
        return;
      }

      const anchorElement =
        anchorNode.nodeType === Node.ELEMENT_NODE
          ? (anchorNode as Element)
          : anchorNode.parentElement;
      if (!anchorElement || !root.contains(anchorElement)) {
        setSelectionCandidate(null);
        return;
      }

      const source = anchorElement.closest<HTMLElement>("[data-favorite-source-id]");
      const sourceId = source?.dataset.favoriteSourceId;
      const sourceTitle = source?.dataset.favoriteSourceTitle;
      if (!sourceId || !sourceTitle) {
        setSelectionCandidate(null);
        return;
      }

      const rangeRect = selection.getRangeAt(0).getBoundingClientRect();
      const content = selectedText.slice(0, 4000);
      setSelectionCandidate({
        favorite: {
          id: favoriteIdForSelection(sourceId, content),
          sourceId,
          sourceTitle,
          kind: "Text selection",
          content,
        },
        top: Math.max(76, rangeRect.top - 54),
        left: Math.min(Math.max(rangeRect.left + rangeRect.width / 2, 82), window.innerWidth - 82),
      });
    }, 0);
  }, [isBasicsFavoritesPoc]);

  useEffect(() => {
    if (!isBasicsFavoritesPoc) return;
    document.addEventListener("selectionchange", captureFavoriteSelection);
    return () => document.removeEventListener("selectionchange", captureFavoriteSelection);
  }, [captureFavoriteSelection, isBasicsFavoritesPoc]);

  return (
    <div
      id="top"
      className="theory-view-shell theory-canvas relative min-h-dvh overflow-x-clip pb-24"
    >
      <div aria-hidden className="theory-orb theory-orb-one" />
      <div aria-hidden className="theory-orb theory-orb-two" />
      <div aria-hidden className="theory-grid" />

      <div className="relative mx-auto w-full max-w-[1500px] px-4 pt-8 sm:px-6 lg:px-8 lg:pt-10">
        <header className="theory-hero-panel relative overflow-hidden rounded-[2rem] border border-gold/20 glass p-7 shadow-[0_28px_90px_-48px_oklch(0.2_0.05_60/0.65)] sm:p-10 lg:p-12">
          <div aria-hidden className="theory-hero-rings" />
          <div className="relative max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-noir/60 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.25em] text-gold-ink shadow-sm">
              <Sparkles className="h-3.5 w-3.5" /> A wandering field guide
            </div>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[0.98] sm:text-6xl lg:text-7xl">
              <span className="gradient-text">{section.title}</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/70 sm:text-xl">
              {section.tagline}
            </p>
            <p className="mt-4 max-w-xl font-display text-sm italic leading-relaxed text-foreground/72">
              No numbers, no order, no exam at the end — just follow the dotted path and stop
              wherever something catches your eye.
            </p>
          </div>

          <div className="relative mt-9 flex flex-wrap items-center gap-2.5">
            {items.slice(0, 4).map((item, index) => {
              const { Icon } = CONCEPT_STYLES[index];
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-noir/50 px-3.5 py-2 text-xs font-semibold text-foreground/70 shadow-sm transition hover:-translate-y-0.5 hover:border-gold/45 hover:text-gold-ink"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {item.question}
                </a>
              );
            })}
            <a
              href={
                showTopics
                  ? `/theory?view=original&topic=${encodeURIComponent(activeTopic)}#original-theory-view`
                  : "/theory?view=original#original-theory-view"
              }
              aria-current={showOriginalText ? "page" : undefined}
              className="relative ml-auto inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-full border border-gold/30 bg-noir/60 px-4 py-2 text-xs font-bold text-gold-ink shadow-sm transition hover:-translate-y-0.5 hover:border-gold/55 hover:bg-noir focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/55 focus-visible:ring-offset-2 disabled:cursor-default disabled:opacity-70"
            >
              <FileText className="h-3.5 w-3.5" /> Original Text
            </a>
          </div>
        </header>

        {!showOriginalText && showTopics && (
          <div className="mt-5 flex justify-center sm:justify-start">
            <div
              className="glass inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-gold/20 p-1.5 shadow-[var(--shadow-soft)]"
              role="tablist"
              aria-label="Conceptual Theory topics"
            >
              {topics.map(({ name, Icon }) => {
                const active = activeTopic === name;
                return (
                  <button
                    key={name}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveTopic(name)}
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
                        {items.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {!showOriginalText && items.length > 0 && (
          <nav
            aria-label="Concept map"
            className="theory-formatted-nav theory-concept-nav sticky top-20 z-30 mt-4 flex gap-2 overflow-x-auto rounded-2xl border border-gold/15 glass p-2 shadow-[0_16px_44px_-32px_oklch(0.1_0.02_60)] lg:hidden"
          >
            {items.map((item, index) => {
              const { Icon, accent, wash } = CONCEPT_STYLES[index % CONCEPT_STYLES.length];
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  title={item.question}
                  className="flex shrink-0 items-center gap-2 rounded-xl border border-transparent px-3 py-2 text-xs font-semibold text-foreground/80 transition hover:border-gold/25 hover:bg-noir/60 hover:text-[var(--concept-accent)]"
                  style={
                    {
                      "--concept-accent": accent,
                      "--concept-wash": wash,
                    } as CSSProperties
                  }
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--concept-wash)] text-[var(--concept-accent)]">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="max-w-36 truncate">{item.question}</span>
                </a>
              );
            })}
          </nav>
        )}

        {showOriginalText ? (
          showTopics ? (
            <PlainOriginalView topic={activeTopic} entries={originalEntries ?? []} />
          ) : (
            <OriginalTheoryView />
          )
        ) : items.length === 0 ? (
          <div className="glass mt-5 rounded-3xl p-10 text-center text-sm text-muted-foreground">
            {activeTopic ? `${activeTopic} concepts are coming next.` : "Nothing here yet."}
          </div>
        ) : (
          <main
            ref={favoriteContentRef}
            id="theory-view"
            className="mt-5 scroll-mt-24 space-y-5"
            onMouseUp={captureFavoriteSelection}
            onKeyUp={captureFavoriteSelection}
            onTouchEnd={captureFavoriteSelection}
          >
            {items.map((item, conceptIndex) => {
              const style = CONCEPT_STYLES[conceptIndex % CONCEPT_STYLES.length];
              const { Icon } = style;
              const groups = groupBlocks(item.answer);

              return (
                <section
                  key={item.id}
                  id={item.id}
                  data-favorite-source-id={item.id}
                  data-favorite-source-title={item.question}
                  className="theory-concept scroll-mt-24 rounded-[2rem] border border-gold/15 bg-noir/50 p-3 shadow-[0_26px_80px_-58px_var(--concept-accent)] sm:p-4"
                  style={
                    {
                      "--concept-accent": style.accent,
                      "--concept-wash": style.wash,
                      "--concept-delay": `${conceptIndex * 55}ms`,
                    } as CSSProperties
                  }
                >
                  <div className="grid gap-3 lg:grid-cols-12">
                    <header className="theory-concept-heading relative overflow-hidden rounded-[1.65rem] bg-[var(--concept-accent)] p-6 text-noir shadow-[0_18px_42px_-28px_var(--concept-accent)] sm:p-7 lg:col-span-3 lg:self-start">
                      <div className="pointer-events-none absolute -bottom-12 -right-10 font-display text-[9rem] font-bold leading-none text-black/10">
                        {String(conceptIndex + 1).padStart(2, "0")}
                      </div>
                      <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-black/15 bg-black/15">
                        <Icon className="h-6 w-6" strokeWidth={2} />
                      </div>
                      <p className="relative mt-8 text-[10px] font-bold uppercase tracking-[0.25em] text-noir/80">
                        Concept {String(conceptIndex + 1).padStart(2, "0")}
                      </p>
                      <h2 className="relative mt-2 font-display text-2xl font-semibold leading-tight sm:text-[1.7rem]">
                        {item.question}
                      </h2>
                      {item.tags && item.tags.length > 0 && (
                        <div className="relative mt-5 flex flex-wrap gap-1.5">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-black/20 bg-black/15 px-2.5 py-1 text-[10px] font-bold text-noir"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </header>

                    <div className="grid gap-3 md:grid-cols-2 lg:col-span-9 xl:grid-cols-3">
                      {groups.map((group, tileIndex) => (
                        <BlockTile
                          key={group.startIndex}
                          group={group}
                          conceptIndex={conceptIndex}
                          tileIndex={tileIndex}
                          sourceId={item.id}
                          sourceTitle={item.question}
                        />
                      ))}
                    </div>
                  </div>
                </section>
              );
            })}
          </main>
        )}

        {selectionCandidate &&
          isBasicsFavoritesPoc &&
          (() => {
            const active = favorites.some(
              (favorite) => favorite.id === selectionCandidate.favorite.id,
            );
            return (
              <div
                className="fixed z-50 -translate-x-1/2 rounded-full shadow-[0_16px_48px_-18px_black]"
                style={{ top: selectionCandidate.top, left: selectionCandidate.left }}
                onMouseDown={(event) => event.preventDefault()}
              >
                <FavoriteHeart
                  active={active}
                  onClick={() => {
                    if (active) removeFavorite(selectionCandidate.favorite.id);
                    else addFavorite(selectionCandidate.favorite);
                    window.getSelection()?.removeAllRanges();
                    setSelectionCandidate(null);
                  }}
                />
              </div>
            );
          })()}

        <div className="mt-8 flex justify-center">
          <a
            href="#top"
            onClick={(event) => {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-noir/60 px-5 py-2.5 text-xs font-semibold text-foreground/82 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-gold/50 hover:text-gold-ink"
          >
            <ArrowUp className="h-3.5 w-3.5" /> Float back to the top
          </a>
        </div>
      </div>
    </div>
  );
}
