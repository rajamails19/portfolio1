import { useState } from "react";
import { Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { conceptGroups, type Concept } from "@/content/concepts-8020-copy";

// Rows cycle yellow → green → blue. Class strings are written out in full so
// Tailwind can see them.
const TONES = [
  {
    card: "from-[oklch(0.82_0.14_88)] to-[oklch(0.72_0.15_68)] text-[oklch(0.2_0.04_70)] shadow-[0_18px_50px_-18px_oklch(0.8_0.14_85/0.55)]",
    bubble: "bg-black/15",
    chip: "bg-black/15 text-[oklch(0.25_0.05_70)]",
    box: "ring-[oklch(0.82_0.14_88/0.28)]",
    kicker: "text-[oklch(0.84_0.13_88)]",
    key: "text-[oklch(0.86_0.13_88)] decoration-[oklch(0.82_0.14_88/0.6)]",
    rail: "bg-[oklch(0.82_0.14_88)]",
    glow: "bg-[oklch(0.82_0.14_88/0.12)]",
  },
  {
    card: "from-[oklch(0.7_0.13_160)] to-[oklch(0.56_0.12_168)] text-[oklch(0.17_0.04_165)] shadow-[0_18px_50px_-18px_oklch(0.65_0.13_160/0.55)]",
    bubble: "bg-black/15",
    chip: "bg-black/15 text-[oklch(0.2_0.05_165)]",
    box: "ring-[oklch(0.7_0.13_160/0.28)]",
    kicker: "text-[oklch(0.78_0.13_160)]",
    key: "text-[oklch(0.82_0.13_160)] decoration-[oklch(0.72_0.13_160/0.6)]",
    rail: "bg-[oklch(0.7_0.13_160)]",
    glow: "bg-[oklch(0.7_0.13_160/0.12)]",
  },
  {
    card: "from-[oklch(0.72_0.12_240)] to-[oklch(0.56_0.15_262)] text-[oklch(0.16_0.04_255)] shadow-[0_18px_50px_-18px_oklch(0.62_0.14_250/0.55)]",
    bubble: "bg-black/15",
    chip: "bg-black/15 text-[oklch(0.2_0.05_255)]",
    box: "ring-[oklch(0.72_0.12_240/0.28)]",
    kicker: "text-[oklch(0.8_0.11_240)]",
    key: "text-[oklch(0.84_0.1_240)] decoration-[oklch(0.74_0.12_240/0.6)]",
    rail: "bg-[oklch(0.72_0.12_240)]",
    glow: "bg-[oklch(0.72_0.12_240/0.12)]",
  },
];

function Definition({ concept, keyClass }: { concept: Concept; keyClass: string }) {
  const at = concept.definition.indexOf(concept.key);
  if (at < 0) return <>{concept.definition}</>;
  return (
    <>
      {concept.definition.slice(0, at)}
      <span className={`font-semibold underline decoration-2 underline-offset-4 ${keyClass}`}>
        {concept.key}
      </span>
      {concept.definition.slice(at + concept.key.length)}
    </>
  );
}

function ConceptRow({
  concept,
  index,
  fallbackIcon,
  id,
}: {
  concept: Concept;
  index: number;
  fallbackIcon: LucideIcon;
  id: string;
}) {
  const tone = TONES[index % TONES.length];
  const Icon = concept.icon ?? fallbackIcon;
  return (
    <li
      id={id}
      className="scroll-mt-24 animate-pop-in grid items-stretch gap-3 sm:grid-cols-[minmax(0,1fr)_2.5rem_minmax(0,1.25fr)] sm:gap-0"
      style={{ animationDelay: `${Math.min(index, 8) * 55}ms` }}
    >
      <div
        className={`relative min-w-0 overflow-hidden rounded-3xl bg-gradient-to-br p-5 sm:p-6 ${tone.card}`}
      >
        <Icon
          aria-hidden
          className="pointer-events-none absolute -bottom-4 -right-3 h-28 w-28 opacity-[0.14]"
          strokeWidth={1.5}
        />
        <span className={`relative grid h-11 w-11 place-items-center rounded-full ${tone.bubble}`}>
          <Icon className="h-5 w-5" />
        </span>
        <div className="relative mt-4 text-[10px] font-bold uppercase tracking-[0.3em] opacity-70">
          Concept
        </div>
        <h3 className="relative mt-1 break-words font-display text-xl font-semibold leading-snug sm:text-2xl">
          {concept.name}
        </h3>
      </div>

      <div aria-hidden className="hidden items-center sm:flex">
        <span className={`h-2 w-2 shrink-0 rounded-full ${tone.rail}`} />
        <span className={`h-px flex-1 opacity-50 ${tone.rail}`} />
      </div>

      <div
        className={`relative flex min-w-0 flex-col justify-center overflow-hidden rounded-3xl bg-noir/55 p-5 ring-1 backdrop-blur sm:p-6 ${tone.box}`}
      >
        <span
          aria-hidden
          className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-2xl ${tone.glow}`}
        />
        <span aria-hidden className={`absolute left-0 top-5 h-8 w-1 rounded-r-full ${tone.rail}`} />
        <div className={`relative text-[10px] font-bold uppercase tracking-[0.3em] ${tone.kicker}`}>
          In one line
        </div>
        <p className="relative mt-2 break-words text-base leading-7 text-foreground/90">
          <Definition concept={concept} keyClass={tone.key} />
        </p>
      </div>
    </li>
  );
}

// Row text colours cycle green → blue → white.
const ROW_COLORS = [
  "text-[oklch(0.72_0.2_127)] hover:text-[oklch(0.86_0.2_127)]",
  "text-[oklch(0.75_0.09_240)] hover:text-[oklch(0.88_0.08_240)]",
  "text-white/90 hover:text-white",
];

function GroupQuickReference({ group, gi }: { group: (typeof conceptGroups)[number]; gi: number }) {
  return (
    <section
      aria-label="Quick reference"
      className="rounded-3xl border border-gold/20 bg-noir/60 p-6 shadow-soft backdrop-blur sm:p-8"
    >
      <div className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-gold-ink">
        Quick reference
      </div>
      <h3 className="border-b border-white/25 pb-3 font-display text-xl font-semibold leading-tight text-white">
        {group.title.split(" — ")[0]}
      </h3>
      <ul className="mt-4 grid gap-x-10 sm:grid-cols-2">
        {group.concepts.map((concept, i) => (
          <li key={concept.name} className="min-w-0">
            <a
              href={`#concept-${gi}-${i}`}
              className={`block break-words py-2 text-[15px] leading-snug transition hover:underline hover:underline-offset-4 ${ROW_COLORS[i % ROW_COLORS.length]}`}
            >
              {concept.name}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ConceptsViewCopy() {
  const [active, setActive] = useState(0);
  const group = conceptGroups[active];

  const pick = (gi: number) => {
    setActive(gi);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mx-auto w-full max-w-[var(--page-max)] px-6 pb-16 pt-8 transition-[max-width] duration-300 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[17rem_minmax(0,1fr)] lg:items-start">
        <nav
          aria-label="Concept topics"
          className="glass flex gap-1 overflow-x-auto rounded-3xl p-2 lg:flex-col lg:overflow-x-visible lg:p-3"
        >
          {conceptGroups.map((g, gi) => {
            const GroupIcon = g.icon;
            const isActive = gi === active;
            return (
              <button
                key={g.title}
                type="button"
                onClick={() => pick(gi)}
                aria-current={isActive ? "true" : undefined}
                className={[
                  "flex shrink-0 items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-medium transition-all lg:shrink",
                  isActive
                    ? "bg-gradient-to-r from-gold/90 to-ember/80 text-primary-foreground shadow-glow"
                    : "text-foreground/85 hover:bg-white/5 hover:text-foreground",
                ].join(" ")}
              >
                <GroupIcon className="h-4 w-4 shrink-0 opacity-80" />
                <span className="min-w-0 flex-1 whitespace-nowrap leading-tight lg:whitespace-normal">
                  {g.title.split(" — ")[0]}
                </span>
                <span
                  className={[
                    "rounded-full px-2 py-0.5 text-[10px] font-semibold tabular-nums",
                    isActive
                      ? "bg-black/25 text-primary-foreground"
                      : "bg-white/5 text-foreground/70",
                  ].join(" ")}
                >
                  {g.concepts.length}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="min-w-0">
          <section className="glass-strong relative overflow-hidden rounded-4xl p-6 sm:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gold/15 blur-3xl"
            />
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-noir/60 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.25em] text-gold-ink">
              <Target className="h-3.5 w-3.5" /> Section
            </div>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              80-20 <span className="gradient-text">Concepts Rule</span>
            </h1>
          </section>
          <div key={group.title} className="mt-8 min-w-0">
            <GroupQuickReference group={group} gi={active} />
            <section aria-label={group.title} className="mt-12">
              <h2 className="qa-heading font-display text-2xl font-semibold text-foreground">
                {group.title}
              </h2>
              <ul className="mt-8 flex flex-col gap-8 sm:gap-10">
                {group.concepts.map((concept, i) => (
                  <ConceptRow
                    key={concept.name}
                    id={`concept-${active}-${i}`}
                    concept={concept}
                    index={i}
                    fallbackIcon={group.icon}
                  />
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
