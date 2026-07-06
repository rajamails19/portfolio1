import { Search, Command, Bell, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const roles = ["Principal", "Teacher", "Parent", "Admin", "AI Engineer"] as const;

export function Topbar() {
  const [role, setRole] = useState<(typeof roles)[number]>("Principal");
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 glass border-b border-glass-border">
      <div className="flex items-center gap-3 px-6 py-3">
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search agents, executions, students, policies…"
            className="w-full pl-9 pr-16 py-2 bg-white/5 border border-glass-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
          />
          <kbd className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] text-muted-foreground border border-glass-border rounded px-1.5 py-0.5">
            <Command className="h-3 w-3" /> K
          </kbd>
        </div>
        <span className="hidden md:inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full glass border border-violet-glow/40 text-violet-glow">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-glow animate-pulse" />
          Demo Mode
        </span>
        <button className="relative h-9 w-9 rounded-lg glass flex items-center justify-center hover:bg-white/10 transition">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-glow" />
        </button>
        <div className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 h-9 px-3 rounded-lg glass hover:bg-white/10 transition text-sm"
          >
            <div className="h-6 w-6 rounded-md bg-gradient-to-br from-violet-glow to-electric flex items-center justify-center text-[10px] font-semibold text-background">
              {role[0]}
            </div>
            <span className="hidden sm:inline">{role}</span>
            <ChevronDown className="h-3.5 w-3.5 opacity-60" />
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-48 glass-strong rounded-xl p-1 z-40 shadow-2xl">
              {roles.map((r) => (
                <button
                  key={r}
                  onClick={() => { setRole(r); setOpen(false); }}
                  className={cn(
                    "w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-white/10",
                    r === role && "text-primary",
                  )}
                >
                  {r}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
