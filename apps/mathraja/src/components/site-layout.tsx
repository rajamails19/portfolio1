import { Link, useRouterState } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";
import mascot from "@/assets/mascot-hero.jpg";
import { AccountButton } from "@/components/visitor-access";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

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
  { to: "/easy-tricks", label: "Easy-Tricks" },
] as const;

export function SiteHeader() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const isActive = (to: string) => path === to || path.startsWith(to + "/");

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
          <nav className="ml-1 hidden flex-1 items-center gap-1 overflow-x-auto no-scrollbar md:flex">
            {NAV.slice(1).map((item) => {
              const active = isActive(item.to);
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
          <div className="flex flex-1 justify-end md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label="Open menu"
                  className="rounded-full p-2 text-foreground/70 hover:bg-white/60 hover:text-foreground"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <SheetTitle className="font-display text-lg text-gradient">MathDreams</SheetTitle>
                <nav className="mt-6 flex flex-col gap-1">
                  {NAV.slice(1).map((item) => {
                    const active = isActive(item.to);
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className={
                          "rounded-xl px-3 py-2 text-sm font-medium transition " +
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
              </SheetContent>
            </Sheet>
          </div>
          <AccountButton />
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
    <div className="aurora min-h-[100dvh]">
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
