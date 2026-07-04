import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Film, Compass, Search, Heart, PlusSquare, Sparkles } from "lucide-react";
import mascot from "@/assets/mascot.png";
import type { ReactNode } from "react";

const nav = [
  { name: "Feed", icon: Home, to: "/" },
  { name: "Reels", icon: Film, to: "/reels" },
  { name: "Explore", icon: Compass, to: "/explore" },
  { name: "Search", icon: Search, to: "/search" },
  { name: "Saved", icon: Heart, to: "/saved" },
  { name: "Create", icon: PlusSquare, to: "/create" },
];

export function AppShell({ children, right }: { children: ReactNode; right?: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen text-foreground">
      {/* desktop left rail */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-20 xl:w-64 flex-col gap-2 px-3 xl:px-5 py-6 glass border-r border-white/40 z-30">
        <Link to="/" className="flex items-center gap-3 px-2 mb-6">
          <div className="story-ring shrink-0">
            <div className="size-10 rounded-full overflow-hidden bg-white grid place-items-center">
              <Sparkles className="size-5 text-primary" />
            </div>
          </div>
          <span
            className="hidden xl:block text-2xl font-bold tracking-tight bg-clip-text text-transparent dream-gradient"
            style={{ WebkitBackgroundClip: "text" }}
          >
            Lumen
          </span>
        </Link>

        <nav className="flex flex-col gap-1">
          {nav.map((n) => {
            const active = pathname === n.to;
            return (
              <Link
                key={n.name}
                to={n.to}
                className={`group flex items-center gap-4 rounded-2xl px-3 py-3 transition-all hover:bg-white/60 ${
                  active ? "bg-white/70 shadow-soft" : ""
                }`}
              >
                <n.icon
                  className={`size-6 shrink-0 ${active ? "text-primary" : "text-foreground/80"} group-hover:scale-110 transition`}
                  strokeWidth={active ? 2.4 : 1.8}
                />
                <span
                  className={`hidden xl:block text-[15px] ${active ? "font-semibold" : "font-medium"}`}
                >
                  {n.name}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto">
          <div className="glass-strong rounded-3xl p-4 shadow-soft hidden xl:block">
            <div className="flex items-center gap-3">
              <img
                src={mascot}
                alt="Lumen mascot"
                className="size-12 rounded-full ring-2 ring-white"
                width={48}
                height={48}
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">Hey, learner ✨</p>
                <p className="text-xs text-muted-foreground truncate">12 streak · 3 saves today</p>
              </div>
            </div>
          </div>
          <div className="xl:hidden flex justify-center">
            <img
              src={mascot}
              alt="Lumen mascot"
              className="size-10 rounded-full ring-2 ring-white"
              width={40}
              height={40}
            />
          </div>
        </div>
      </aside>

      {/* main content */}
      <main className={`lg:ml-20 xl:ml-64 pb-24 lg:pb-10 ${right ? "xl:mr-80" : ""}`}>
        {children}
      </main>
      {right}

      {/* mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 glass-strong border-t border-white/40 px-4 py-2 grid grid-cols-5 gap-1">
        {[nav[0], nav[2], nav[5], nav[1], nav[4]].map((n, i) => {
          const active = pathname === n.to;
          return (
            <Link
              key={n.name}
              to={n.to}
              className={`flex flex-col items-center gap-0.5 py-2 rounded-2xl ${active ? "text-primary" : "text-foreground/70"}`}
            >
              {i === 2 ? (
                <span className="size-10 rounded-2xl dream-gradient grid place-items-center shadow-glow -mt-4">
                  <n.icon className="size-5 text-white" />
                </span>
              ) : (
                <n.icon className="size-6" strokeWidth={active ? 2.4 : 1.8} />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
