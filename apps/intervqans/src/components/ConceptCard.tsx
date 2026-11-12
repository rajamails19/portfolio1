import type { LucideIcon } from "lucide-react";
import type { Concept } from "@/content/concepts-8020";

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

export function ConceptCard({
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
