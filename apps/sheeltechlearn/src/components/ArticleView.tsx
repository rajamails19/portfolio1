import { ArrowUp, Quote, Sparkles } from "lucide-react";
import type { Section } from "@/content/types";
import { useDeck } from "@/hooks/use-deck";
import { AnswerBlocks } from "./AnswerBlocks";

/* ── Per-stop personality ─────────────────────────────────────────────
   Each concept gets a side of the page, a shape, a tint, and a little
   emoji scene for the empty half — so the scroll wanders left → right
   → centre instead of reading like a syllabus. Cycles for any count. */

type Stop = {
  side: "left" | "right" | "center";
  rotate: string;
  shape: React.CSSProperties;
  tint: string;
  ring: string;
  stamp: string;
  art: { big: string; small: [string, string]; caption: string };
};

const STOPS: Stop[] = [
  {
    side: "left",
    rotate: "lg:-rotate-1",
    shape: { borderRadius: "2.5rem 2.5rem 2.5rem 0.6rem" },
    tint: "bg-[oklch(0.98_0.02_350)]/90",
    ring: "ring-rose/25",
    stamp: "🚗",
    art: { big: "🚗", small: ["🔧", "🛞"], caption: "one car, many hands" },
  },
  {
    side: "right",
    rotate: "lg:rotate-1",
    shape: { borderRadius: "58% 42% 52% 48% / 3.5rem 4.5rem 3rem 4rem" },
    tint: "bg-[oklch(0.97_0.03_240)]/90",
    ring: "ring-[oklch(0.68_0.09_245)]/30",
    stamp: "🎲",
    art: { big: "🖱️", small: ["📚", "🎲"], caption: "same click, new answer" },
  },
  {
    side: "center",
    rotate: "lg:rotate-[0.75deg]",
    shape: { borderRadius: "1.25rem" },
    tint: "bg-[oklch(0.97_0.05_92)]/95",
    ring: "ring-[oklch(0.74_0.15_82)]/35",
    stamp: "⚖️",
    art: { big: "🤔", small: ["✅", "⚖️"], caption: "pass/fail → judgement" },
  },
  {
    side: "left",
    rotate: "lg:-rotate-[0.75deg]",
    shape: { borderRadius: "3.5rem 3.5rem 3.5rem 3.5rem / 4rem 3rem 4rem 3rem" },
    tint: "bg-[oklch(0.97_0.03_320)]/90",
    ring: "ring-[oklch(0.7_0.12_320)]/30",
    stamp: "🎩",
    art: { big: "🎩", small: ["🐇", "📚"], caption: "no rabbits in here" },
  },
  {
    side: "right",
    rotate: "lg:rotate-[1deg]",
    shape: { borderRadius: "4rem 1rem 4rem 1rem" },
    tint: "bg-[oklch(0.97_0.03_170)]/90",
    ring: "ring-[oklch(0.66_0.09_170)]/30",
    stamp: "🗺️",
    art: { big: "🗺️", small: ["🛤️", "🚀"], caption: "data → product" },
  },
  {
    side: "left",
    rotate: "lg:-rotate-[1deg]",
    shape: { borderRadius: "1rem 4rem 1rem 4rem" },
    tint: "bg-[oklch(0.97_0.035_60)]/90",
    ring: "ring-[oklch(0.7_0.11_50)]/35",
    stamp: "🩺",
    art: { big: "🩺", small: ["👩‍⚕️", "💊"], caption: "three doctors, three answers" },
  },
  {
    side: "right",
    rotate: "lg:rotate-[0.75deg]",
    shape: { borderRadius: "45% 55% 48% 52% / 4rem 3rem 4.5rem 3.5rem" },
    tint: "bg-[oklch(0.97_0.03_285)]/90",
    ring: "ring-[oklch(0.68_0.11_285)]/30",
    stamp: "🎒",
    art: { big: "🎒", small: ["🔭", "🧩"], caption: "pack for the trail" },
  },
  {
    side: "center",
    rotate: "lg:-rotate-[0.5deg]",
    shape: { borderRadius: "1.25rem 1.25rem 3rem 3rem" },
    tint: "bg-[oklch(0.97_0.04_20)]/95",
    ring: "ring-[oklch(0.7_0.13_20)]/30",
    stamp: "🎯",
    art: { big: "🎯", small: ["📈", "🌪️"], caption: "pattern, not noise" },
  },
  {
    side: "left",
    rotate: "lg:-rotate-[0.75deg]",
    shape: { borderRadius: "3rem 3rem 0.6rem 3rem" },
    tint: "bg-[oklch(0.96_0.02_250)]/90",
    ring: "ring-[oklch(0.68_0.09_245)]/30",
    stamp: "🌫️",
    art: { big: "⛰️", small: ["🌫️", "🥾"], caption: "downhill in the fog" },
  },
  {
    side: "right",
    rotate: "lg:rotate-1",
    shape: { borderRadius: "3.5rem 0.6rem 3.5rem 3.5rem" },
    tint: "bg-[oklch(0.98_0.02_350)]/90",
    ring: "ring-rose/25",
    stamp: "🏁",
    art: { big: "🎓", small: ["📊", "🏁"], caption: "the exam that matters" },
  },
];

/* Floating emoji scene for the empty side of a stop */
function EmojiScene({ art, flip }: { art: Stop["art"]; flip?: boolean }) {
  return (
    <div className={`relative hidden h-56 select-none lg:block ${flip ? "scale-x-[-1]" : ""}`}>
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-44 w-52 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-rose/15 to-coral/10 blur-none"
        style={{ borderRadius: "60% 40% 55% 45% / 45% 55% 42% 58%" }}
      />
      <span
        className={`animate-float absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl drop-shadow-lg ${flip ? "scale-x-[-1]" : ""}`}
      >
        {art.big}
      </span>
      <span
        className={`animate-wiggle absolute left-[22%] top-[18%] text-3xl opacity-90 ${flip ? "scale-x-[-1]" : ""}`}
        style={{ animationDelay: "0.6s" }}
      >
        {art.small[0]}
      </span>
      <span
        className={`animate-float absolute right-[20%] bottom-[16%] text-3xl opacity-90 ${flip ? "scale-x-[-1]" : ""}`}
        style={{ animationDelay: "1.2s" }}
      >
        {art.small[1]}
      </span>
      <span
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap font-display text-sm italic text-muted-foreground ${flip ? "scale-x-[-1]" : ""}`}
      >
        ~ {art.caption} ~
      </span>
    </div>
  );
}

/* Curvy dashed trail between stops, alternating direction */
function Trail({ flip }: { flip?: boolean }) {
  return (
    <div aria-hidden className="relative mx-auto hidden h-28 w-full max-w-4xl lg:block">
      <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="h-full w-full text-rose/50">
        <path
          d={flip ? "M 72 0 C 72 16, 28 14, 28 30" : "M 28 0 C 28 16, 72 14, 72 30"}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="1.6 2.2"
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-base text-rose/80">
        ✦
      </span>
    </div>
  );
}

export function ArticleView({ section }: { section: Section }) {
  const deck = useDeck();
  const founder = deck.foundersBySection[section.slug];

  return (
    <div className="mx-auto w-full max-w-6xl overflow-x-clip px-6 pb-24 pt-12">
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <header className="relative mx-auto max-w-3xl text-center">
        <span className="absolute -left-10 top-2 hidden animate-float text-4xl lg:block">🧭</span>
        <span
          className="absolute -right-8 -top-4 hidden animate-wiggle text-3xl lg:block"
          style={{ animationDelay: "0.8s" }}
        >
          ✨
        </span>
        <div className="inline-flex items-center gap-2 rounded-full border border-rose/25 bg-noir/50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-rose">
          <Sparkles className="h-3.5 w-3.5" /> A wandering field guide
        </div>
        <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] sm:text-6xl">
          <span className="gradient-text">{section.title}</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
          {section.tagline}
        </p>
        <p className="mt-3 font-display text-sm italic text-foreground/60">
          No numbers, no order, no exam at the end — just follow the dotted path and stop wherever
          something catches your eye.
        </p>
      </header>

      {/* ── Trail map — scattered stamps, not a syllabus ──────────── */}
      <nav
        aria-label="Trail map"
        className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-3"
      >
        {section.items.map((it, i) => {
          const stop = STOPS[i % STOPS.length];
          const tilt = [-2, 1.5, -1, 2, -1.5][i % 5];
          return (
            <a
              key={it.id}
              href={`#${it.id}`}
              className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-foreground/85 transition hover:-translate-y-0.5 hover:text-rose hover:shadow-glow"
              style={{ transform: `rotate(${tilt}deg)` }}
            >
              <span className="text-base">{stop.stamp}</span>
              {it.question}
            </a>
          );
        })}
      </nav>

      {/* ── The wandering stops ───────────────────────────────────── */}
      <div className="mt-16">
        {section.items.map((it, i) => {
          const stop = STOPS[i % STOPS.length];
          const panel = (
            <article
              className={`relative ${stop.tint} ${stop.rotate} p-7 shadow-[var(--shadow-glass)] ring-1 backdrop-blur-sm ${stop.ring} sm:p-9`}
              style={stop.shape}
            >
              <span className="absolute -right-3 -top-3 flex h-12 w-12 rotate-6 items-center justify-center rounded-2xl bg-gradient-to-br from-rose to-coral text-2xl shadow-glow">
                {stop.stamp}
              </span>
              <h2 className="pr-8 font-display text-[1.7rem] font-semibold leading-snug text-foreground sm:text-3xl">
                {it.question}
              </h2>
              {it.tags && it.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {it.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-rose/20 bg-white/50 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-5">
                <AnswerBlocks blocks={it.answer} prose />
              </div>
            </article>
          );

          return (
            <div key={it.id}>
              {i > 0 && <Trail flip={STOPS[(i - 1) % STOPS.length].side === "right"} />}
              <section
                id={it.id}
                className="scroll-mt-8 lg:grid lg:grid-cols-12 lg:items-center lg:gap-6"
              >
                {stop.side === "left" && (
                  <>
                    <div className="lg:col-span-8">{panel}</div>
                    <div className="lg:col-span-4">
                      <EmojiScene art={stop.art} />
                    </div>
                  </>
                )}
                {stop.side === "right" && (
                  <>
                    <div className="lg:col-span-4">
                      <EmojiScene art={stop.art} flip />
                    </div>
                    <div className="lg:col-span-8">{panel}</div>
                  </>
                )}
                {stop.side === "center" && (
                  <div className="lg:col-span-8 lg:col-start-3">
                    <div className="mb-4 hidden justify-center gap-6 text-3xl lg:flex">
                      <span className="animate-wiggle">{stop.art.small[0]}</span>
                      <span className="animate-float">{stop.art.big}</span>
                      <span className="animate-wiggle" style={{ animationDelay: "1s" }}>
                        {stop.art.small[1]}
                      </span>
                    </div>
                    {panel}
                  </div>
                )}
              </section>
            </div>
          );
        })}
      </div>

      {/* ── Postcard sign-off ─────────────────────────────────────── */}
      {founder && (
        <div className="mx-auto mt-20 max-w-md rotate-[-1.5deg]">
          <div className="glass-strong rounded-3xl p-6 shadow-glow ring-1 ring-rose/25">
            <div className="flex items-center gap-3">
              <img
                src={founder.image}
                alt={founder.name}
                className="h-12 w-12 rounded-2xl object-cover ring-1 ring-rose/40"
                loading="lazy"
              />
              <div className="leading-tight">
                <div className="font-display text-sm font-semibold text-rose">{founder.name}</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {founder.title}
                </div>
              </div>
              <Quote className="ml-auto h-5 w-5 text-rose/60" />
            </div>
            <p className="mt-3 font-display text-base italic leading-snug text-foreground/90">
              "{founder.quote}"
            </p>
          </div>
        </div>
      )}

      <div className="mt-10 flex justify-center">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="inline-flex items-center gap-1.5 rounded-full border border-rose/25 bg-noir/50 px-4 py-2 text-xs font-semibold text-foreground/80 transition hover:border-rose/50 hover:text-rose"
        >
          <ArrowUp className="h-3.5 w-3.5" /> Float back to the top
        </a>
      </div>
    </div>
  );
}
