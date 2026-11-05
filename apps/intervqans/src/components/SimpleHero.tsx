import type { LucideIcon } from "lucide-react";

export function SimpleHero({
  icon: Icon,
  plain,
  accent,
  joined = false,
}: {
  icon: LucideIcon;
  plain: string;
  accent: string;
  /** No space between the two parts (e.g. "Quick-" + "Images"). */
  joined?: boolean;
}) {
  return (
    <section className="glass-strong relative overflow-hidden rounded-4xl p-6 sm:p-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gold/15 blur-3xl"
      />
      <div className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-noir/60 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.25em] text-gold-ink">
        <Icon className="h-3.5 w-3.5" /> Section
      </div>
      <h1 className="mt-5 max-w-3xl break-words font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
        {plain}
        {joined ? "" : " "}
        <span className="gradient-text">{accent}</span>
      </h1>
    </section>
  );
}
