import { Link, useRouterState } from "@tanstack/react-router";
import { Image, FileText, Mic, Film, Search, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";

const TABS = [
  { to: "/pics", label: "Images", icon: Image, emoji: "📸" },
  { to: "/text", label: "Notes", icon: FileText, emoji: "📝" },
  { to: "/voice", label: "Voice", icon: Mic, emoji: "🎤" },
  { to: "/videos", label: "Videos", icon: Film, emoji: "🎬" },
] as const;

export function AppShell({
  children,
  search,
  onSearch,
  rightSlot,
}: {
  children: ReactNode;
  search?: string;
  onSearch?: (v: string) => void;
  rightSlot?: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [localSearch, setLocalSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const value = search ?? localSearch;
  const setValue = onSearch ?? setLocalSearch;

  return (
    <div className="relative min-h-screen">
      {/* Floating top nav */}
      <header className="sticky top-0 z-40 px-3 pt-4 sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          {/* Logo */}
          <Link
            to="/"
            className="pill-nav flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 transition hover:-translate-y-0.5"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--accent)] text-[var(--ink)]">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <span className="hidden text-sm font-semibold tracking-tight sm:block">MyCapture</span>
          </Link>

          {/* Center pill with category tabs */}
          <nav className="pill-nav mx-auto flex flex-1 items-center justify-center gap-1 rounded-full p-1.5 sm:flex-none">
            {TABS.map((t) => {
              const active = pathname.startsWith(t.to);
              const Icon = t.icon;
              return (
                <Link
                  key={t.to}
                  to={t.to}
                  className={`group relative flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition sm:px-5 ${
                    active
                      ? "bg-[var(--accent)] text-[var(--ink)] shadow-[var(--shadow-soft)]"
                      : "text-foreground/70 hover:bg-[var(--secondary)] hover:text-foreground"
                  }`}
                >
                  <span className="text-base leading-none">{t.emoji}</span>
                  <span className="hidden sm:inline">{t.label}</span>
                  <Icon className="h-4 w-4 sm:hidden" />
                </Link>
              );
            })}
          </nav>

          {/* Search */}
          <div className="pill-nav flex shrink-0 items-center gap-2 rounded-full p-1.5">
            <button
              onClick={() => setSearchOpen((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-full text-foreground/70 transition hover:bg-[var(--secondary)] hover:text-foreground"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>
            {rightSlot}
          </div>
        </div>

        {searchOpen && (
          <div className="mx-auto mt-3 max-w-2xl px-2">
            <div className="card-soft flex items-center gap-2 rounded-full px-4 py-2.5">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                autoFocus
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Search everything you've saved…"
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
            </div>
          </div>
        )}
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-24 pt-6 sm:px-6">{children}</main>
    </div>
  );
}
