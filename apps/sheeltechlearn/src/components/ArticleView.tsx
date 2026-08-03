import type { CSSProperties } from "react";
import {
  Activity,
  ArrowLeftRight,
  ArrowUp,
  BookOpenCheck,
  BrainCircuit,
  Bot,
  Boxes,
  ChefHat,
  Compass,
  Cpu,
  Gauge,
  GraduationCap,
  LibraryBig,
  FileText,
  Languages,
  Map,
  MousePointerClick,
  Mountain,
  Network,
  Quote,
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
import { useDeck } from "@/hooks/use-deck";
import { AnswerBlocks } from "./AnswerBlocks";
import { OriginalTheoryView } from "./OriginalTheoryView";

type ConceptStyle = {
  Icon: LucideIcon;
  accent: string;
  wash: string;
};

const CONCEPT_STYLES: ConceptStyle[] = [
  { Icon: UsersRound, accent: "oklch(0.48 0.2 350)", wash: "oklch(0.92 0.07 350)" },
  { Icon: MousePointerClick, accent: "oklch(0.48 0.14 245)", wash: "oklch(0.92 0.055 245)" },
  { Icon: Scale, accent: "oklch(0.48 0.14 80)", wash: "oklch(0.94 0.08 88)" },
  { Icon: Sparkles, accent: "oklch(0.48 0.16 315)", wash: "oklch(0.93 0.06 315)" },
  { Icon: Route, accent: "oklch(0.47 0.13 165)", wash: "oklch(0.92 0.06 165)" },
  { Icon: Gauge, accent: "oklch(0.49 0.16 45)", wash: "oklch(0.93 0.07 55)" },
  { Icon: Compass, accent: "oklch(0.47 0.15 285)", wash: "oklch(0.92 0.06 285)" },
  { Icon: Target, accent: "oklch(0.48 0.19 22)", wash: "oklch(0.93 0.065 25)" },
  { Icon: Mountain, accent: "oklch(0.47 0.13 225)", wash: "oklch(0.92 0.055 225)" },
  { Icon: GraduationCap, accent: "oklch(0.48 0.19 345)", wash: "oklch(0.93 0.06 345)" },
  { Icon: Cpu, accent: "oklch(0.47 0.15 255)", wash: "oklch(0.92 0.06 255)" },
  { Icon: ChefHat, accent: "oklch(0.49 0.17 42)", wash: "oklch(0.94 0.075 52)" },
  { Icon: Bot, accent: "oklch(0.47 0.14 175)", wash: "oklch(0.92 0.06 175)" },
  { Icon: Network, accent: "oklch(0.48 0.17 305)", wash: "oklch(0.93 0.06 305)" },
  { Icon: Trophy, accent: "oklch(0.48 0.15 78)", wash: "oklch(0.94 0.08 85)" },
  { Icon: School, accent: "oklch(0.48 0.18 335)", wash: "oklch(0.93 0.065 335)" },
  { Icon: Tags, accent: "oklch(0.47 0.14 205)", wash: "oklch(0.92 0.06 205)" },
  { Icon: ArrowLeftRight, accent: "oklch(0.49 0.16 60)", wash: "oklch(0.94 0.075 67)" },
  { Icon: Languages, accent: "oklch(0.47 0.16 280)", wash: "oklch(0.92 0.06 280)" },
  { Icon: Boxes, accent: "oklch(0.47 0.14 165)", wash: "oklch(0.92 0.06 165)" },
  { Icon: Map, accent: "oklch(0.48 0.18 25)", wash: "oklch(0.93 0.07 30)" },
  { Icon: Search, accent: "oklch(0.47 0.14 235)", wash: "oklch(0.92 0.055 235)" },
  { Icon: BrainCircuit, accent: "oklch(0.48 0.17 310)", wash: "oklch(0.93 0.06 310)" },
  { Icon: Crosshair, accent: "oklch(0.48 0.19 350)", wash: "oklch(0.93 0.065 350)" },
  { Icon: SlidersHorizontal, accent: "oklch(0.49 0.15 82)", wash: "oklch(0.94 0.075 88)" },
  { Icon: ShieldCheck, accent: "oklch(0.47 0.13 150)", wash: "oklch(0.92 0.055 150)" },
  { Icon: RefreshCcw, accent: "oklch(0.47 0.15 255)", wash: "oklch(0.92 0.06 255)" },
];

type BlockGroup = {
  blocks: Block[];
  startIndex: number;
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
}: {
  group: BlockGroup;
  conceptIndex: number;
  tileIndex: number;
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
      className={`theory-block-card group relative overflow-hidden rounded-[1.65rem] border bg-white/70 p-5 shadow-[0_12px_38px_-24px_var(--concept-accent)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white/85 hover:shadow-[0_20px_48px_-24px_var(--concept-accent)] sm:p-6 ${tileSpan(group.blocks)}`}
      style={
        {
          "--concept-accent": style.accent,
          "--concept-wash": style.wash,
          "--tile-delay": `${Math.min(tileIndex, 5) * 70}ms`,
        } as CSSProperties
      }
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[var(--concept-wash)] opacity-70 blur-2xl transition duration-500 group-hover:scale-125" />
      <div className="mb-3 flex items-center justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/70 bg-[var(--concept-wash)] text-[var(--concept-accent)] shadow-sm">
          <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} />
        </span>
        <span className="h-1.5 w-12 rounded-full bg-[var(--concept-accent)] opacity-25 transition-all duration-300 group-hover:w-20 group-hover:opacity-50" />
      </div>
      <AnswerBlocks blocks={group.blocks} prose />
    </div>
  );
}

export function ArticleView({
  section,
  showOriginalText = false,
}: {
  section: Section;
  showOriginalText?: boolean;
}) {
  const deck = useDeck();
  const founder = deck.foundersBySection[section.slug];

  return (
    <div id="top" className="theory-view-shell theory-canvas relative min-h-screen overflow-x-clip pb-24">
      <div aria-hidden className="theory-orb theory-orb-one" />
      <div aria-hidden className="theory-orb theory-orb-two" />
      <div aria-hidden className="theory-grid" />

      <div className="relative mx-auto w-full max-w-[1500px] px-4 pt-8 sm:px-6 lg:px-8 lg:pt-10">
        <header className="grid gap-4 lg:grid-cols-12">
          <div className="theory-hero-panel relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/58 p-7 shadow-[0_28px_90px_-48px_oklch(0.55_0.22_345/0.65)] backdrop-blur-xl sm:p-10 lg:col-span-8 lg:p-12">
            <div aria-hidden className="theory-hero-rings" />
            <div className="relative max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-rose/20 bg-white/70 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.25em] text-rose shadow-sm">
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
              {section.items.slice(0, 4).map((item, index) => {
                const { Icon } = CONCEPT_STYLES[index];
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="inline-flex items-center gap-2 rounded-full border border-rose/15 bg-white/65 px-3.5 py-2 text-xs font-semibold text-foreground/70 shadow-sm transition hover:-translate-y-0.5 hover:border-rose/35 hover:text-rose"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {item.question}
                  </a>
                );
              })}
              <a
                href="/theory?view=original#original-theory-view"
                aria-current={showOriginalText ? "page" : undefined}
                className="relative ml-auto inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-full border border-[oklch(0.48_0.16_245/0.24)] bg-[oklch(0.96_0.025_240/0.88)] px-4 py-2 text-xs font-bold text-[oklch(0.42_0.14_245)] shadow-sm transition hover:-translate-y-0.5 hover:border-[oklch(0.48_0.16_245/0.45)] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.48_0.16_245/0.55)] focus-visible:ring-offset-2 disabled:cursor-default disabled:opacity-70"
              >
                <FileText className="h-3.5 w-3.5" /> Original Text
              </a>
            </div>
          </div>

          {founder && (
            <div className="theory-mentor-card group relative min-h-[360px] overflow-hidden rounded-[2rem] bg-[oklch(0.2_0.05_350)] shadow-[0_28px_80px_-42px_oklch(0.4_0.2_350)] lg:col-span-4">
              <img
                src={founder.image}
                alt={founder.name}
                className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.16_0.05_350)] via-[oklch(0.18_0.04_350/0.25)] to-transparent" />
              <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/25 bg-white/15 text-white backdrop-blur-md">
                <Quote className="h-5 w-5" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                <p className="font-display text-lg italic leading-snug">"{founder.quote}"</p>
                <div className="mt-5 flex items-center gap-3 border-t border-white/20 pt-4">
                  <div>
                    <div className="font-display text-base font-semibold">{founder.name}</div>
                    <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90">
                      {founder.title}
                    </div>
                  </div>
                  <span className="ml-auto rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/80">
                    Mentor
                  </span>
                </div>
              </div>
            </div>
          )}
        </header>

        {!showOriginalText && <nav
          aria-label="Concept map"
          className="theory-formatted-nav theory-concept-nav sticky top-20 z-30 mt-4 flex gap-2 overflow-x-auto rounded-2xl border border-white/65 bg-white/60 p-2 shadow-[0_16px_44px_-32px_oklch(0.45_0.18_345)] backdrop-blur-xl lg:hidden"
        >
          {section.items.map((item, index) => {
            const { Icon, accent, wash } = CONCEPT_STYLES[index % CONCEPT_STYLES.length];
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                title={item.question}
                className="flex shrink-0 items-center gap-2 rounded-xl border border-transparent px-3 py-2 text-xs font-semibold text-foreground/80 transition hover:border-white/80 hover:bg-white/75 hover:text-[var(--concept-accent)]"
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
        </nav>}

        {showOriginalText ? (
          <OriginalTheoryView />
        ) : (
        <main id="theory-view" className="mt-5 scroll-mt-24 space-y-5">
          {section.items.map((item, conceptIndex) => {
            const style = CONCEPT_STYLES[conceptIndex % CONCEPT_STYLES.length];
            const { Icon } = style;
            const groups = groupBlocks(item.answer);

            return (
              <section
                key={item.id}
                id={item.id}
                className="theory-concept scroll-mt-24 rounded-[2rem] border border-white/60 bg-white/28 p-3 shadow-[0_26px_80px_-58px_var(--concept-accent)] backdrop-blur-sm sm:p-4"
                style={
                  {
                    "--concept-accent": style.accent,
                    "--concept-wash": style.wash,
                    "--concept-delay": `${conceptIndex * 55}ms`,
                  } as CSSProperties
                }
              >
                <div className="grid gap-3 lg:grid-cols-12">
                  <header className="theory-concept-heading relative overflow-hidden rounded-[1.65rem] bg-[var(--concept-accent)] p-6 text-white shadow-[0_18px_42px_-28px_var(--concept-accent)] sm:p-7 lg:col-span-3 lg:self-start">
                    <div className="pointer-events-none absolute -bottom-12 -right-10 font-display text-[9rem] font-bold leading-none text-white/10">
                      {String(conceptIndex + 1).padStart(2, "0")}
                    </div>
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/25 bg-white/15 backdrop-blur">
                      <Icon className="h-6 w-6" strokeWidth={2} />
                    </div>
                    <p className="relative mt-8 text-[10px] font-bold uppercase tracking-[0.25em] text-white/90">
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
                            className="rounded-full border border-white/35 bg-black/10 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur"
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
                      />
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
        </main>
        )}

        {founder && (
          <div className="mx-auto mt-10 max-w-3xl rounded-[2rem] border border-white/65 bg-white/55 p-4 shadow-[0_22px_60px_-40px_oklch(0.55_0.2_350)] backdrop-blur-xl sm:p-5">
            <div className="flex flex-col gap-4 rounded-[1.5rem] bg-white/60 p-5 sm:flex-row sm:items-center">
              <img
                src={founder.image}
                alt={founder.name}
                className="h-16 w-16 rounded-2xl object-cover ring-1 ring-rose/30"
                loading="lazy"
              />
              <div className="min-w-0 flex-1">
                <p className="font-display text-base italic leading-snug text-foreground/85">
                  "{founder.quote}"
                </p>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-rose">
                  {founder.name} · {founder.title}
                </p>
              </div>
              <Quote className="hidden h-8 w-8 shrink-0 text-rose/35 sm:block" />
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <a
            href="#top"
            onClick={(event) => {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 rounded-full border border-rose/25 bg-white/70 px-5 py-2.5 text-xs font-semibold text-foreground/82 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-rose/50 hover:text-rose"
          >
            <ArrowUp className="h-3.5 w-3.5" /> Float back to the top
          </a>
        </div>
      </div>
    </div>
  );
}
