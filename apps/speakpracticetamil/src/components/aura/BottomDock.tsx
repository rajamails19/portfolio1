import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Waveform } from "./Waveform";

type Tab = { to: string; label: string; icon: React.ReactNode };

const Square = () => (
  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="4" y="4" width="7" height="7" rx="2" />
    <rect x="13" y="4" width="7" height="7" rx="2" />
    <rect x="4" y="13" width="7" height="7" rx="2" />
    <rect x="13" y="13" width="7" height="7" rx="2" />
  </svg>
);
const Film = () => (
  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 8h18M3 16h18M8 4v16M16 4v16" />
  </svg>
);
const Orbit = () => (
  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="12" cy="12" r="3" />
    <ellipse cx="12" cy="12" rx="9" ry="4" />
  </svg>
);
const Spark = () => (
  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
  </svg>
);

const tabs: Tab[] = [
  { to: "/", label: "Home", icon: <Square /> },
  { to: "/shorts", label: "Shorts", icon: <Film /> },
  { to: "/scenes", label: "Scenes", icon: <Orbit /> },
  { to: "/progress", label: "Progress", icon: <Spark /> },
];

export function BottomDock() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[min(92%,420px)] h-20 glass-strong rounded-full flex items-center justify-between px-7 py-2 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.7)]"
    >
      {tabs.slice(0, 2).map((t) => (
        <DockItem key={t.to} tab={t} active={pathname === t.to} />
      ))}

      <Link
        to="/echo"
        className="relative -top-7 group"
        aria-label="Open voice"
      >
        <span className="absolute inset-0 rounded-full orb-glow [animation:breathe_3s_ease-in-out_infinite]" />
        <span className="relative grid place-items-center size-16 rounded-full bg-gradient-to-br from-primary to-[oklch(0.7_0.18_55)] text-primary-foreground transition-transform active:scale-90">
          <Waveform bars={3} className="text-primary-foreground h-5" />
        </span>
      </Link>

      {tabs.slice(2).map((t) => (
        <DockItem key={t.to} tab={t} active={pathname === t.to} />
      ))}
    </nav>
  );
}

function DockItem({ tab, active }: { tab: Tab; active: boolean }) {
  return (
    <Link
      to={tab.to}
      className={cn(
        "grid place-items-center p-2 rounded-xl transition-colors",
        active ? "text-primary" : "text-muted-foreground hover:text-foreground",
      )}
      aria-label={tab.label}
    >
      {tab.icon}
    </Link>
  );
}