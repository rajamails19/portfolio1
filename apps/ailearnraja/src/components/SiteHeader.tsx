import { Link } from "@tanstack/react-router";
import { Flame } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/notes", label: "Notes" },
  { to: "/topics", label: "Topics" },
  { to: "/interview", label: "Interview" },
  { to: "/diagrams", label: "Diagrams" },
  { to: "/videos", label: "Videos" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/60 border-b border-[oklch(0.85_0.14_85/0.18)]">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="relative w-9 h-9 rounded-full grid place-items-center bg-gradient-to-br from-[oklch(0.72_0.19_45)] to-[oklch(0.85_0.14_85)] shadow-glow">
            <Flame className="w-4 h-4 text-[oklch(0.16_0.03_270)]" strokeWidth={2.5} />
          </span>
          <div className="flex flex-col leading-none">
            <span className="font-display text-lg tracking-widest text-gradient-ember">AETHERIA</span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">AI Career Codex</span>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-4 py-2 rounded-full text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-[oklch(0.85_0.14_85/0.1)] transition-colors"
              activeProps={{ className: "px-4 py-2 rounded-full text-sm font-medium text-[oklch(0.85_0.14_85)] bg-[oklch(0.85_0.14_85/0.12)] ring-1 ring-[oklch(0.85_0.14_85/0.3)]" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
