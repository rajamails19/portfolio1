import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import mascot from "@/assets/mascot-hero.jpg";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/grades", label: "Grades" },
  { to: "/topics", label: "Topics" },
  { to: "/games", label: "Games" },
  { to: "/puzzles", label: "Puzzles" },
  { to: "/quiz", label: "Quiz" },
  { to: "/formulas", label: "Formulas" },
  { to: "/times-tables", label: "Times Tables" },
  { to: "/dictionary", label: "Dictionary" },
  { to: "/tips", label: "Tips" },
] as const;

export function SiteHeader() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="mx-auto mt-3 max-w-7xl px-3">
        <div className="glass flex items-center gap-2 rounded-3xl px-3 py-2 shadow-soft">
          <Link to="/" className="flex shrink-0 items-center gap-2 pl-2 pr-3">
            <img
              src={mascot}
              alt="Zog the math monster"
              className="h-9 w-9 rounded-full object-cover ring-2 ring-white/70"
            />
            <span className="font-display text-lg font-bold text-gradient">MathDreams</span>
          </Link>
          <nav className="ml-1 flex flex-1 items-center gap-1 overflow-x-auto no-scrollbar">
            {NAV.slice(1).map((item) => {
              const active = path === item.to || path.startsWith(item.to + "/");
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={
                    "whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition " +
                    (active
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : "text-foreground/70 hover:bg-white/60 hover:text-foreground")
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mx-auto mt-24 max-w-7xl px-6 pb-10">
      <div className="glass rounded-3xl p-8 text-center">
        <p className="font-display text-2xl font-semibold text-gradient">
          Where every kid falls in love with numbers.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          MathDreams · Elementary math, made magical.
        </p>
      </div>
    </footer>
  );
}

export function PageShell({
  children,
  eyebrow,
  title,
  subtitle,
}: {
  children: ReactNode;
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="aurora min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
        <div className="mb-10 max-w-3xl">
          {eyebrow && (
            <span className="glass inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
              {eyebrow}
            </span>
          )}
          <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
            <span className="text-gradient">{title}</span>
          </h1>
          {subtitle && (
            <p className="mt-3 text-base text-muted-foreground sm:text-lg">{subtitle}</p>
          )}
        </div>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
