import { useState } from "react";
import { ExternalLink, Square, FolderOpen, Sparkles, Database, Server, ArrowLeftRight } from "lucide-react";
import type { LocalApp } from "@/lib/mock-data";
import { formatUptime, frameworkColor } from "@/lib/mock-data";
import { StatusDot } from "./StatusDot";

interface Props {
  app: LocalApp;
  onStop: (id: string) => void;
}

const SOURCE_LABEL: Record<LocalApp["source"], string> = {
  claude: "Claude",
  codex: "Codex",
  prototype: "Prototype",
  manual: "Manual",
};

export function AppTile({ app, onStop }: Props) {
  const [flipped, setFlipped] = useState(false);
  const fw = frameworkColor(app.framework);

  return (
    <div className="perspective group animate-float-in">
      <div
        className={`preserve-3d relative h-[260px] w-full transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)] ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* FRONT */}
        <div className="backface-hidden absolute inset-0 glass rounded-2xl p-5 shadow-tile overflow-hidden">
          {/* glow corner */}
          <div
            className="absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl opacity-40 transition-opacity duration-500 group-hover:opacity-70"
            style={{ background: fw }}
          />
          {/* top row */}
          <div className="relative flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <span
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
                style={{
                  background: `linear-gradient(135deg, ${fw}, oklch(0.3 0.05 270))`,
                  boxShadow: `inset 0 1px 0 oklch(1 0 0 / 0.2), 0 8px 24px -8px ${fw}`,
                }}
              >
                <span className="text-sm font-bold text-background">
                  {app.framework.slice(0, 1)}
                </span>
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <StatusDot />
                  <h3 className="truncate font-semibold tracking-tight">{app.name}</h3>
                </div>
                <p className="mt-0.5 truncate font-mono text-[11px] text-muted-foreground">
                  {app.path}
                </p>
              </div>
            </div>
            <span className="shrink-0 rounded-md border border-border bg-white/5 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
              {SOURCE_LABEL[app.source]}
            </span>
          </div>

          {/* badges row */}
          <div className="relative mt-5 flex flex-wrap items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium"
              style={{ borderColor: `${fw} / 0.4`, background: "oklch(1 0 0 / 0.04)" }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: fw }} />
              {app.framework}
            </span>
            <span className="inline-flex items-center gap-1 rounded-lg border border-cyan/30 bg-cyan/5 px-2.5 py-1 font-mono text-xs text-cyan" style={{ color: "var(--cyan)", borderColor: "oklch(0.82 0.16 195 / 0.3)", background: "oklch(0.82 0.16 195 / 0.06)" }}>
              :{app.port}
            </span>
            {app.backend && (
              <span
                className="inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium"
                style={{
                  borderColor: app.backend.running
                    ? "oklch(0.78 0.18 165 / 0.35)"
                    : "oklch(1 0 0 / 0.1)",
                  background: app.backend.running ? "oklch(0.78 0.18 165 / 0.08)" : "transparent",
                  color: app.backend.running ? "var(--emerald)" : "var(--muted-foreground)",
                }}
              >
                <Server className="h-3 w-3" />
                {app.backend.stack}
                {app.backend.port && (
                  <span className="font-mono opacity-80">:{app.backend.port}</span>
                )}
              </span>
            )}
            {app.db && (
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white/5 px-2.5 py-1 text-xs text-muted-foreground">
                <Database className="h-3 w-3" />
                {app.db}
              </span>
            )}
          </div>

          {/* about preview */}
          <p className="relative mt-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {app.about}
          </p>

          {/* footer */}
          <div className="absolute inset-x-5 bottom-4 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
              <span className="opacity-60">uptime</span>
              <span className="text-foreground/80">{formatUptime(app.uptimeSec)}</span>
              <span className="opacity-30">·</span>
              <span className="opacity-60">pid</span>
              <span className="text-foreground/80">{app.pid}</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setFlipped(true)}
                className="grid h-8 w-8 place-items-center rounded-lg border border-border bg-white/5 text-muted-foreground transition hover:text-cyan hover:border-cyan/40 hover:bg-cyan/5"
                title="Details"
                style={{}}
              >
                <ArrowLeftRight className="h-3.5 w-3.5" />
              </button>
              <a
                href={`http://localhost:${app.port}`}
                target="_blank"
                rel="noreferrer"
                className="grid h-8 w-8 place-items-center rounded-lg border border-border bg-white/5 text-muted-foreground transition hover:text-foreground hover:border-foreground/30"
                title="Open"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <button
                onClick={() => onStop(app.id)}
                className="grid h-8 w-8 place-items-center rounded-lg border border-destructive/30 bg-destructive/10 text-destructive transition hover:bg-destructive/20"
                title="Stop server"
              >
                <Square className="h-3.5 w-3.5" fill="currentColor" />
              </button>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div className="backface-hidden rotate-y-180 absolute inset-0 glass rounded-2xl p-5 shadow-tile overflow-hidden">
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{ background: "var(--gradient-iris)" }}
          />
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-cyan" style={{ color: "var(--cyan)" }} />
                <h3 className="truncate font-semibold tracking-tight">{app.name}</h3>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">From {app.readmePath ?? "project metadata"}</p>
            </div>
            <button
              onClick={() => setFlipped(false)}
              className="grid h-8 w-8 place-items-center rounded-lg border border-border bg-white/5 text-muted-foreground transition hover:text-cyan hover:border-cyan/40"
              title="Back"
            >
              <ArrowLeftRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="mt-3 flex items-center gap-2 rounded-lg border border-border bg-black/30 px-2.5 py-1.5">
            <FolderOpen className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            <code className="truncate font-mono text-[11px] text-foreground/80">{app.path}</code>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-foreground/85">{app.about}</p>

          <div className="mt-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Features
            </p>
            <ul className="mt-2 space-y-1.5">
              {app.features.slice(0, 4).map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs text-foreground/80">
                  <span
                    className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                    style={{ background: "var(--cyan)" }}
                  />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
