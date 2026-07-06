import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Bot, Workflow, BrainCircuit, UserCheck, Bus,
  MessageSquareHeart, FlaskConical, Cloud, Bug, LineChart, Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Mission Control", icon: LayoutDashboard },
  { to: "/agents", label: "AI Agents", icon: Bot },
  { to: "/workflows", label: "Orchestrator", icon: Workflow },
  { to: "/knowledge", label: "Knowledge / RAG", icon: BrainCircuit },
  { to: "/attendance", label: "Attendance", icon: UserCheck },
  { to: "/transport", label: "Transport", icon: Bus },
  { to: "/parents", label: "Parent Desk", icon: MessageSquareHeart },
  { to: "/mlops", label: "MLOps Lab", icon: FlaskConical },
  { to: "/cloud", label: "CloudOps", icon: Cloud },
  { to: "/traces", label: "Trace Debugger", icon: Bug },
  { to: "/analytics", label: "Executive", icon: LineChart },
] as const;

export function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col glass border-r border-glass-border h-screen sticky top-0 p-4 gap-1">
      <Link to="/" className="flex items-center gap-3 px-3 py-4 mb-2">
        <div className="relative">
          <div className="absolute inset-0 rounded-xl bg-primary blur-lg opacity-60" />
          <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-violet-glow to-electric flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-background" />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-display font-semibold text-sm text-gradient">Campus AI</span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Mission Control</span>
        </div>
      </Link>
      <nav className="flex flex-col gap-1 overflow-y-auto">
        {nav.map((item) => {
          const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all",
                active
                  ? "glass-strong text-foreground glow-violet"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5",
              )}
            >
              {active && (
                <span className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-r bg-gradient-to-b from-violet-glow to-electric" />
              )}
              <Icon className={cn("h-4 w-4 shrink-0", active && "text-primary")} />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto glass rounded-xl p-3 text-xs">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-glow animate-pulse-glow" />
          <span className="font-medium">All systems nominal</span>
        </div>
        <p className="text-muted-foreground">12 agents · 4 models · 10 services</p>
      </div>
    </aside>
  );
}
