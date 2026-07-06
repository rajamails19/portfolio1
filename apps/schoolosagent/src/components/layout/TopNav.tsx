import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Bell, ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Control" },
  { to: "/agents", label: "Agents" },
  { to: "/workflows", label: "Orchestrator" },
  { to: "/knowledge", label: "Knowledge" },
  { to: "/attendance", label: "Attendance" },
  { to: "/transport", label: "Transport" },
  { to: "/parents", label: "Parent Desk" },
  { to: "/mlops", label: "MLOps" },
  { to: "/cloud", label: "CloudOps" },
  { to: "/traces", label: "Traces" },
  { to: "/analytics", label: "Executive" },
] as const;

const roles = ["Principal", "Teacher", "Parent", "Admin", "AI Engineer"] as const;

export function TopNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [role, setRole] = useState<(typeof roles)[number]>("Principal");
  const [roleOpen, setRoleOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-background/85 backdrop-blur border-b border-border">
      {/* Masthead */}
      <div className="px-6 lg:px-10 pt-4 pb-3 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-baseline gap-3 min-w-0">
          <span className="font-display text-2xl lg:text-3xl tracking-tight italic">Campus&nbsp;AI</span>
          <span className="hidden sm:inline text-[10px] uppercase tracking-[0.3em] text-muted-foreground border-l border-border pl-3">
            The Mission Ledger · Vol. III
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              placeholder="Search the ledger…"
              className="w-full pl-9 pr-3 py-2 bg-secondary border border-border rounded-md text-sm focus:outline-none focus:border-primary placeholder:text-muted-foreground"
            />
          </div>
          <span className="hidden lg:inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest px-2 py-1 border border-accent/40 text-accent rounded">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-glow" />
            Demo
          </span>
          <button className="relative h-9 w-9 rounded-md border border-border hover:bg-secondary flex items-center justify-center">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
          </button>
          <div className="relative">
            <button
              onClick={() => setRoleOpen((v) => !v)}
              className="flex items-center gap-2 h-9 px-3 rounded-md border border-border hover:bg-secondary text-sm"
            >
              <div className="h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-semibold">
                {role[0]}
              </div>
              <span className="hidden sm:inline">{role}</span>
              <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </button>
            {roleOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-card border border-border rounded-md p-1 z-40 shadow-lg">
                {roles.map((r) => (
                  <button
                    key={r}
                    onClick={() => { setRole(r); setRoleOpen(false); }}
                    className={cn(
                      "w-full text-left px-3 py-2 text-sm rounded hover:bg-secondary",
                      r === role && "text-primary font-medium",
                    )}
                  >
                    {r}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            className="lg:hidden h-9 w-9 rounded-md border border-border flex items-center justify-center"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Double editorial rule */}
      <div className="px-6 lg:px-10">
        <div className="h-px bg-foreground/80" />
        <div className="h-px bg-foreground/80 mt-[3px]" />
      </div>

      {/* Horizontal section nav */}
      <nav className="hidden lg:flex px-6 lg:px-10 gap-1 overflow-x-auto">
        {nav.map((item, i) => {
          const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "relative px-3.5 py-3 text-[11px] uppercase tracking-[0.18em] whitespace-nowrap transition-colors",
                active
                  ? "text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground",
                i > 0 && "border-l border-border/60",
              )}
            >
              {item.label}
              {active && (
                <span className="absolute left-3 right-3 -bottom-px h-[2px] bg-accent" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-border px-6 py-3 grid grid-cols-2 gap-1 bg-card">
          {nav.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "px-3 py-2 text-xs uppercase tracking-widest rounded",
                  active ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
