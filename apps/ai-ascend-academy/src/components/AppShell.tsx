import { Link, useRouterState } from "@tanstack/react-router";
import { Home, BookOpen, Layers, MessageCircleQuestion, GitBranch, PlayCircle, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

const navItems = [
  { to: "/", label: "Dashboard", icon: Home },
  { to: "/notes", label: "AI Notes", icon: BookOpen },
  { to: "/topics", label: "Topics", icon: Layers },
  { to: "/interview", label: "Interview Q&A", icon: MessageCircleQuestion },
  { to: "/diagrams", label: "Diagrams", icon: GitBranch },
  { to: "/videos", label: "Videos", icon: PlayCircle },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen flex">
      {/* ambient cosmic glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-[oklch(0.65_0.27_290_/_25%)] blur-3xl" />
        <div className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-[oklch(0.72_0.28_330_/_20%)] blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-[oklch(0.78_0.2_210_/_15%)] blur-3xl" />
      </div>

      <aside className="hidden md:flex sticky top-0 h-screen w-64 flex-col gap-2 p-5 glass-strong border-r border-white/10">
        <Link to="/" className="flex items-center gap-2 px-2 py-3">
          <div className="grid place-items-center h-10 w-10 rounded-xl gradient-aurora glow">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="text-lg font-extrabold tracking-tight gradient-text">NeuroForge</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">AI · DS Career</div>
          </div>
        </Link>

        <nav className="mt-4 flex flex-col gap-1">
          {navItems.map(({ to, label, icon: Icon }) => {
            const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                  active
                    ? "gradient-aurora text-white shadow-[var(--shadow-glow)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                <Icon className={`h-4 w-4 ${active ? "" : "group-hover:scale-110 transition-transform"}`} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto rounded-2xl p-4 glass border border-white/10 relative overflow-hidden">
          <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full gradient-neon opacity-40 blur-2xl" />
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Streak</div>
          <div className="mt-1 text-2xl font-bold gradient-text">🔥 7 days</div>
          <p className="mt-1 text-xs text-muted-foreground">Keep forging the mind.</p>
        </div>
      </aside>

      {/* mobile top nav */}
      <div className="md:hidden fixed top-0 inset-x-0 z-40 glass-strong border-b border-white/10 px-4 py-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
        {navItems.map(({ to, label, icon: Icon }) => {
          const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${
                active ? "gradient-aurora text-white" : "bg-white/5 text-muted-foreground"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </Link>
          );
        })}
      </div>

      <main className="flex-1 min-w-0 pt-20 md:pt-0">
        {children}
      </main>
    </div>
  );
}
