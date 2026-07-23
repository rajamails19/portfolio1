import { useEffect } from "react";
import { X, Play, Square, FolderOpen, Sparkles, Server, Database, Cpu } from "lucide-react";
import type { LocalApp } from "@/lib/mock-data";
import { formatUptime } from "@/lib/mock-data";
import { posterTheme, FRAMEWORK_EMOJI } from "@/lib/poster-theme";

interface Props {
  app: LocalApp | null;
  onClose: () => void;
  onStop: (id: string) => void;
}

const SOURCE_LABEL: Record<LocalApp["source"], { label: string; color: string }> = {
  claude: { label: "Claude Code", color: "oklch(0.82 0.16 45)" },
  codex: { label: "Codex", color: "oklch(0.78 0.18 165)" },
  prototype: { label: "Prototype", color: "oklch(0.72 0.22 25)" },
  manual: { label: "You", color: "oklch(0.85 0.17 85)" },
};

export function DetailsModal({ app, onClose, onStop }: Props) {
  useEffect(() => {
    if (!app) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [app, onClose]);

  if (!app) return null;
  const theme = posterTheme(app);
  const source = SOURCE_LABEL[app.source];

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4 sm:p-8 animate-pop">
      <button
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        aria-label="Close"
      />
      <div className="relative z-10 grid w-full max-w-4xl overflow-hidden rounded-3xl glass shadow-poster md:grid-cols-[260px_1fr]">
        {/* Poster side */}
        <div
          className="relative hidden min-h-[400px] md:block"
          style={{ background: theme.gradient }}
        >
          <div className="absolute inset-0 blob-pattern opacity-80" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, transparent 40%, oklch(0 0 0 / 0.5) 100%)",
            }}
          />
          <div className="absolute inset-0 grid place-items-center">
            <div className="grid h-32 w-32 place-items-center rounded-3xl bg-white/15 text-7xl backdrop-blur-sm">
              {theme.emoji}
            </div>
          </div>
          <div className="absolute bottom-5 left-5 right-5">
            <p className="font-mono text-[10px] uppercase tracking-wider text-white/80">
              Featured by {source.label}
            </p>
          </div>
        </div>

        {/* Content side */}
        <div className="relative p-6 sm:p-8">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white/80 transition hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2">
            <span className="text-2xl md:hidden">{theme.emoji}</span>
            <span className="rounded-full bg-white/95 px-2 py-1 text-[10px] font-bold text-black">
              {FRAMEWORK_EMOJI[app.framework]} {app.framework}
            </span>
            <span
              className="rounded-full px-2 py-1 text-[10px] font-bold"
              style={{ background: source.color, color: "oklch(0.18 0.03 80)" }}
            >
              {source.label}
            </span>
          </div>

          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
            {app.name}
          </h2>

          <div className="mt-2 flex items-center gap-2 rounded-xl bg-black/30 px-3 py-2">
            <FolderOpen className="h-3.5 w-3.5 shrink-0 text-white/60" />
            <code className="truncate font-mono text-[11px] text-white/85">{app.path}</code>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-white/85">{app.about}</p>

          {/* Stats grid */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            <StatPill icon={<Cpu className="h-3 w-3" />} label="PORT" value={`:${app.port}`} />
            <StatPill label="UPTIME" value={formatUptime(app.uptimeSec)} />
            <StatPill label="PID" value={String(app.pid)} mono />
          </div>

          {app.backend && (
            <div
              className="mt-3 flex items-center gap-3 rounded-xl border px-3 py-2.5"
              style={{
                borderColor: app.backend.running
                  ? "oklch(0.84 0.18 145 / 0.4)"
                  : "var(--border)",
                background: app.backend.running
                  ? "oklch(0.84 0.18 145 / 0.08)"
                  : "oklch(1 0 0 / 0.04)",
              }}
            >
              <Server
                className="h-4 w-4 shrink-0"
                style={{ color: app.backend.running ? "oklch(0.84 0.18 145)" : "var(--muted-foreground)" }}
              />
              <div className="flex-1 text-sm">
                <span className="font-semibold">{app.backend.stack} backend</span>
                {app.backend.port && (
                  <span className="ml-2 font-mono text-xs opacity-70">:{app.backend.port}</span>
                )}
              </div>
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase"
                style={{
                  background: app.backend.running ? "oklch(0.84 0.18 145)" : "oklch(1 0 0 / 0.1)",
                  color: app.backend.running ? "oklch(0.18 0.05 145)" : "white",
                }}
              >
                {app.backend.running ? "Running" : "Idle"}
              </span>
              {app.db && (
                <span className="inline-flex items-center gap-1 rounded-md bg-black/40 px-2 py-1 font-mono text-[10px] text-white">
                  <Database className="h-2.5 w-2.5" />
                  {app.db}
                </span>
              )}
            </div>
          )}

          {/* Features */}
          <div className="mt-4">
            <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white/60">
              <Sparkles className="h-3 w-3" />
              From the README
            </p>
            <ul className="mt-2 grid grid-cols-2 gap-1.5">
              {app.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs text-white/85">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: theme.accent }}
                  />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <a
              href={`http://localhost:${app.port}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black shadow-pop transition hover:scale-[1.03]"
            >
              <Play className="h-3.5 w-3.5" fill="currentColor" />
              Open localhost:{app.port}
            </a>
            <button
              onClick={() => {
                onStop(app.id);
                onClose();
              }}
              className="inline-flex items-center gap-2 rounded-full bg-destructive/90 px-4 py-2.5 text-sm font-bold text-white shadow-pop transition hover:scale-[1.03]"
            >
              <Square className="h-3.5 w-3.5" fill="currentColor" />
              Stop server
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatPill({
  icon,
  label,
  value,
  mono,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="rounded-xl border border-border bg-white/5 px-3 py-2">
      <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-white/55">
        {icon}
        {label}
      </div>
      <div className={`mt-0.5 text-sm font-semibold ${mono ? "font-mono" : ""}`}>{value}</div>
    </div>
  );
}
