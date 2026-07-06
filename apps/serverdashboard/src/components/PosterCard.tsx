import { Play, Square, Database, Server } from "lucide-react";
import type { LocalApp } from "@/lib/mock-data";
import { formatUptime } from "@/lib/mock-data";
import { FRAMEWORK_EMOJI } from "@/lib/poster-theme";
import { artFor } from "@/lib/poster-art";

interface Props {
  app: LocalApp;
  onOpen: (app: LocalApp) => void;
  onStop: (id: string) => void;
}

export function PosterCard({ app, onOpen, onStop }: Props) {
  const art = artFor(app.id);

  return (
    <div className="group relative w-[230px] shrink-0 snap-start animate-pop">
      {/* Poster body */}
      <button
        onClick={() => onOpen(app)}
        className="relative block w-full overflow-hidden rounded-[26px] text-left shadow-poster transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-2 hover:rotate-[-0.6deg] hover:scale-[1.03]"
        style={{ aspectRatio: "2 / 3", boxShadow: "var(--shadow-poster)" }}
      >
        {/* cinematic cover art */}
        <img
          src={art}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {/* readable wash */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, oklch(0 0 0 / 0.15) 0%, transparent 35%, oklch(0 0 0 / 0.55) 70%, oklch(0 0 0 / 0.9) 100%)",
          }}
        />
        {/* shine on hover */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:animate-shine" />

        {/* TOP: live pill */}
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/45 px-2 py-1 backdrop-blur-md ring-1 ring-white/20">
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full"
              style={{ background: "oklch(0.84 0.18 145)" }}
            />
            <span
              className="relative inline-flex h-2 w-2 rounded-full"
              style={{ background: "oklch(0.84 0.18 145)" }}
            />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-white">LIVE</span>
        </div>

        {/* TOP-RIGHT: framework chip */}
        <div className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-1 text-[10px] font-bold text-black/80 shadow-md backdrop-blur">
          <span className="mr-1">{FRAMEWORK_EMOJI[app.framework]}</span>
          {app.framework}
        </div>

        {/* BOTTOM: title + meta */}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="font-display text-[19px] font-semibold leading-tight tracking-tight text-white drop-shadow">
            {app.name}
          </h3>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            <span className="rounded-md bg-white/95 px-1.5 py-0.5 font-mono text-[10px] font-bold text-black">
              :{app.port}
            </span>
            {app.backend && (
              <span
                className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-mono text-[10px] font-bold"
                style={{
                  background: app.backend.running ? "oklch(0.84 0.18 145)" : "oklch(0 0 0 / 0.4)",
                  color: app.backend.running ? "oklch(0.15 0.05 145)" : "white",
                }}
              >
                <Server className="h-2.5 w-2.5" />
                {app.backend.stack}
                {app.backend.port && <span className="opacity-80">:{app.backend.port}</span>}
              </span>
            )}
            {app.db && (
              <span className="inline-flex items-center gap-1 rounded-md bg-black/45 px-1.5 py-0.5 font-mono text-[10px] font-bold text-white backdrop-blur-sm">
                <Database className="h-2.5 w-2.5" />
                {app.db}
              </span>
            )}
          </div>
          <p className="mt-1.5 font-mono text-[10px] uppercase tracking-wider text-white/70">
            {formatUptime(app.uptimeSec)} on stage
          </p>
        </div>
      </button>

      {/* Floating action bar — appears on hover */}
      <div className="pointer-events-none absolute -bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 opacity-0 transition-all duration-300 group-hover:translate-y-1 group-hover:opacity-100">
        <a
          href={`http://localhost:${app.port}`}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-bold text-black shadow-pop transition hover:scale-105"
        >
          <Play className="h-3 w-3" fill="currentColor" />
          Open
        </a>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onStop(app.id);
          }}
          className="pointer-events-auto grid h-8 w-8 place-items-center rounded-full bg-black/70 text-white shadow-pop ring-1 ring-white/20 backdrop-blur transition hover:bg-destructive hover:scale-105"
          title="Stop server"
        >
          <Square className="h-3 w-3" fill="currentColor" />
        </button>
      </div>
    </div>
  );
}
