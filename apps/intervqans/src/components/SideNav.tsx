import { Link, useRouterState } from "@tanstack/react-router";
import { sections } from "@/content";
import { foundersBySection } from "@/content/founders";
import { Sparkles, Code2, Zap, Rocket, Layers } from "lucide-react";

const icons: Record<string, typeof Sparkles> = {
  qans: Sparkles,
  programs: Code2,
  realtime: Zap,
  projects: Rocket,
  others: Layers,
};

export function SideNav() {
  const { location } = useRouterState();
  const activeSlug = sections.find((s) => location.pathname.startsWith(`/${s.slug}`))?.slug ?? "qans";
  const activeFounder = foundersBySection[activeSlug];

  return (
    <aside className="flex w-72 shrink-0 flex-col gap-6 p-6">
      <Link to="/" className="group flex items-center gap-3">
        <div className="relative">
          <span className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-gold to-ember opacity-60 blur-md" />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-noir font-display text-2xl font-bold text-gold ring-1 ring-gold/40">
            S
          </div>
        </div>
        <div className="leading-tight">
          <div className="font-display text-xl font-semibold gradient-text">StudyDeck</div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Noir Edition</div>
        </div>
      </Link>

      <nav className="glass flex flex-col gap-1 rounded-3xl p-3">
        {sections.map((s) => {
          const Icon = icons[s.slug] ?? Sparkles;
          const to = `/${s.slug}` as const;
          const active = location.pathname.startsWith(to);
          const f = foundersBySection[s.slug];
          return (
            <Link
              key={s.slug}
              to={to}
              className={[
                "group relative flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all",
                active
                  ? "bg-gradient-to-r from-gold/90 to-ember/80 text-primary-foreground shadow-glow"
                  : "text-foreground/85 hover:bg-white/5 hover:text-foreground",
              ].join(" ")}
            >
              <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-xl ring-1 ring-gold/30">
                <img src={f.image} alt="" className="h-full w-full object-cover" loading="lazy" />
              </span>
              <span className="flex flex-1 flex-col leading-tight">
                <span className="flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5 opacity-80" />
                  {s.title}
                </span>
                <span className={["text-[10px] uppercase tracking-wider", active ? "text-primary-foreground/80" : "text-muted-foreground"].join(" ")}>
                  {f.name}
                </span>
              </span>
              <span className={["rounded-full px-2 py-0.5 text-[10px] font-semibold tabular-nums", active ? "bg-black/25 text-primary-foreground" : "bg-white/5 text-foreground/70"].join(" ")}>
                {s.items.length}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Active founder card with rotating quote feel */}
      <div className="glass animate-glow-pulse relative overflow-hidden rounded-3xl p-4">
        <div className="flex items-center gap-3">
          <img
            src={activeFounder.image}
            alt={activeFounder.name}
            className="h-14 w-14 rounded-2xl object-cover ring-1 ring-gold/40"
            loading="lazy"
          />
          <div className="min-w-0">
            <div className="truncate font-display text-sm font-semibold text-gold">{activeFounder.name}</div>
            <div className="truncate text-[10px] uppercase tracking-wider text-muted-foreground">{activeFounder.title}</div>
          </div>
        </div>
        <p className="mt-3 font-display text-[13px] italic leading-snug text-foreground/85">
          "{activeFounder.quote.slice(0, 130)}{activeFounder.quote.length > 130 ? "…" : ""}"
        </p>
      </div>
    </aside>
  );
}
