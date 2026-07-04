import mascotLogo from "@/assets/mascot-logo.png";
import mascotNotes from "@/assets/mascot-notes.jpg";
import mascotTopics from "@/assets/mascot-topics.jpg";
import mascotInterview from "@/assets/mascot-interview.jpg";
import mascotDiagrams from "@/assets/mascot-diagrams.jpg";
import mascotVideos from "@/assets/mascot-videos.jpg";
import mascotQuiz from "@/assets/mascot-quiz.jpg";
import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";

const nav = [
  { to: "/", label: "Dashboard", image: mascotLogo, grad: "grad-aurora" },
  { to: "/notes", label: "AI Notes", image: mascotNotes, grad: "grad-sunset" },
  { to: "/topics", label: "Topics", image: mascotTopics, grad: "grad-peach" },
  { to: "/interview", label: "Interview Q&A", image: mascotInterview, grad: "grad-ocean" },
  { to: "/diagrams", label: "Diagrams", image: mascotDiagrams, grad: "grad-mint" },
  { to: "/videos", label: "Videos", image: mascotVideos, grad: "grad-sunset" },
  { to: "/quiz", label: "Quiz Arena", image: mascotQuiz, grad: "grad-primary" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen w-full flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex sticky top-0 h-screen w-72 shrink-0 flex-col gap-4 p-4">
        <div className="glass rounded-3xl p-5 flex items-center gap-3">
          <div className="relative h-12 w-12 rounded-2xl grad-primary grid place-items-center overflow-hidden glow-purple">
            <img src={mascotLogo} alt="" className="h-12 w-12 object-cover" />
          </div>
          <div>
            <div className="font-bold text-lg leading-tight text-grad">NeuroNext</div>
            <div className="text-[11px] text-muted-foreground tracking-wider uppercase">
              AI Career OS
            </div>
          </div>
        </div>

        <nav className="glass rounded-3xl p-3 flex-1 flex flex-col gap-1">
          {nav.map((item) => {
            const active =
              item.to === "/"
                ? pathname === "/"
                : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={[
                  "group relative flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all",
                  active
                    ? "text-white shadow-lg"
                    : "text-foreground/70 hover:text-foreground hover:bg-white/50",
                ].join(" ")}
              >
                {active && (
                  <span className="absolute inset-0 rounded-2xl grad-primary -z-0" />
                )}
                <span
                  className={[
                    "relative z-10 h-9 w-9 grid place-items-center rounded-xl",
                    active ? "bg-white/25" : `${item.grad} text-white/90`,
                  ].join(" ")}
                >
                  <img src={item.image} alt="" loading="lazy" className="h-full w-full rounded-xl object-cover" />
                </span>
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="relative overflow-hidden rounded-3xl glass-dark p-5 text-white">
          <img src={mascotLogo} alt="" loading="lazy" className="absolute -right-4 -top-4 h-24 w-24 rounded-3xl object-cover opacity-25" />
          <div className="text-xs uppercase tracking-wider text-white/70">Streak</div>
          <div className="text-3xl font-bold mt-1">12 days</div>
          <div className="mt-3 text-xs text-white/80">Keep learning, keep building, keep growing.</div>
          <div className="mt-3 h-2 rounded-full bg-white/20 overflow-hidden">
            <div className="h-full w-[78%] bg-white/80 rounded-full animate-shimmer" />
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 p-4 lg:p-8">
        {/* Mobile top bar */}
        <div className="lg:hidden glass rounded-2xl p-3 mb-4 flex items-center gap-2 overflow-x-auto">
          {nav.map((n) => {
            const active = n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={[
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap",
                  active ? "grad-primary text-white" : "bg-white/60 text-foreground/70",
                ].join(" ")}
              >
                <img src={n.image} alt="" loading="lazy" className="h-5 w-5 rounded-md object-cover" />
                {n.label}
              </Link>
            );
          })}
        </div>
        {children}
      </main>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  mascotSrc,
  gradient = "grad-aurora",
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  mascotSrc: string;
  gradient?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-3xl ${gradient} p-6 md:p-8 mb-6 glow-purple`}>
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
      <div className="relative flex items-center gap-6">
        <div className="flex-1 min-w-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/40 backdrop-blur text-[11px] font-semibold uppercase tracking-wider text-foreground/70">
            <span className="h-4 w-4 overflow-hidden rounded-full grad-primary shadow-sm" /> {eyebrow}
          </div>
          <h1 className="mt-3 text-3xl md:text-5xl font-extrabold leading-tight text-foreground">
            {title}
          </h1>
          <p className="mt-2 text-foreground/70 max-w-xl">{subtitle}</p>
        </div>
        <img
          src={mascotSrc}
          alt=""
          loading="lazy"
          className="hidden md:block h-44 w-44 lg:h-56 lg:w-56 object-cover rounded-3xl glass shadow-xl animate-float"
        />
      </div>
    </div>
  );
}
