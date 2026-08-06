import { createFileRoute, Link } from "@tanstack/react-router";
import { useSections } from "@/hooks/use-sections";
import { useTheme } from "@/themes/ThemeContext";
import {
  ArrowRight,
  Sparkles,
  Code2,
  Zap,
  Rocket,
  Layers,
  BookOpenCheck,
  Quote,
} from "lucide-react";
import { QuotesTicker } from "@/components/QuotesTicker";

const icons = {
  theory: BookOpenCheck,
  qans: Sparkles,
  programs: Code2,
  realtime: Zap,
  projects: Rocket,
  others: Layers,
};

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { theme } = useTheme();
  const sections = useSections();
  const total = sections.reduce((n, s) => n + s.items.length, 0);
  const hero = theme.hero;
  const heroMascot = theme.sections.qans.mascot;

  return (
    <div className="mx-auto w-full max-w-5xl px-6 pb-16 pt-8">
      <section className="relative overflow-hidden rounded-4xl shadow-glow ring-1 ring-gold/20">
        <img
          src={hero.image}
          alt=""
          width={1600}
          height={912}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-noir/95 via-noir/80 to-noir/40" />
        <div className="relative grid gap-8 p-8 sm:p-12 lg:grid-cols-[1.4fr,1fr] lg:items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-noir/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-ink backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> {hero.eyebrow}
            </div>
            <h1 className="font-display text-5xl font-semibold leading-[1.02] text-foreground sm:text-6xl">
              {hero.headA}
              <span className="gradient-text">{hero.headAccent}</span>
              {hero.headB}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-foreground/75">{hero.sub}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/qans"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-ember px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-95"
              >
                {hero.cta1} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/programs"
                className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-noir/50 px-5 py-3 text-sm font-semibold text-foreground backdrop-blur transition hover:bg-noir/80"
              >
                {hero.cta2}
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-8 text-sm text-foreground/70">
              <div>
                <span className="font-display text-2xl font-bold text-gold-ink">{total}</span>{" "}
                {hero.stat1Label}
              </div>
              <div>
                <span className="font-display text-2xl font-bold text-gold-ink">{sections.length}</span>{" "}
                {hero.stat2Label}
              </div>
              <div>
                <span className="font-display text-2xl font-bold text-gold-ink">{hero.stat3Value}</span>{" "}
                {hero.stat3Label}
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="animate-float relative mx-auto">
              <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-gold/40 to-ember/30 blur-2xl" />
              <img
                src={heroMascot.image}
                alt={heroMascot.name}
                width={800}
                height={800}
                className="relative h-72 w-72 rounded-[2rem] object-cover shadow-glow ring-2 ring-gold/40"
              />
              <div className="glass-strong absolute -bottom-4 -left-4 max-w-[220px] rounded-2xl p-3">
                <Quote className="mb-1 h-3.5 w-3.5 text-gold-ink" />
                <p className="font-display text-xs italic leading-snug text-foreground/90">
                  "{heroMascot.quote.slice(0, 60)}
                  {heroMascot.quote.length > 60 ? "…" : ""}"
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                  — {heroMascot.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-8">
        <QuotesTicker />
      </div>

      <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((s, i) => {
          const Icon = icons[s.slug as keyof typeof icons] ?? Sparkles;
          const meta = theme.sections[s.slug];
          return (
            <Link
              key={s.slug}
              to={`/${s.slug}`}
              className="group animate-pop-in relative overflow-hidden rounded-3xl ring-1 ring-gold/15 transition-all hover:-translate-y-1 hover:ring-gold/40 hover:shadow-glow"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <img
                src={meta.mascot.image}
                alt={meta.mascot.name}
                className="absolute inset-0 h-full w-full object-cover opacity-40 transition group-hover:opacity-55"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/85 to-noir/40" />
              <div className="relative flex h-full flex-col p-6">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gold/30 bg-noir/70 backdrop-blur">
                    <Icon className="h-5 w-5 text-gold-ink" />
                  </span>
                  <span className="rounded-full border border-gold/25 bg-noir/60 px-2.5 py-1 text-xs font-semibold text-foreground/80">
                    {s.items.length}
                  </span>
                </div>
                <div className="mt-16">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-gold-ink/80">
                    {meta.mascot.name}
                  </div>
                  <h3 className="mt-1 font-display text-2xl font-semibold text-foreground">
                    {meta.title}
                  </h3>
                  <p className="mt-1 text-sm text-foreground/70">{meta.tagline}</p>
                </div>
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-ink transition group-hover:gap-2.5">
                  Open deck <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
