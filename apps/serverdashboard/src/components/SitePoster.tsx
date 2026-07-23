import { ExternalLink } from "lucide-react";
import type { DeployedSite } from "@/lib/mock-data";
import type { UptimeResult } from "@/lib/uptime.functions";
import { HOST_ART } from "@/lib/poster-art";

const HOST_LABEL: Record<DeployedSite["host"], { label: string; emoji: string }> = {
  vercel: { label: "Vercel", emoji: "▲" },
  cloudflare: { label: "Cloudflare", emoji: "🔥" },
  namecheap: { label: "Domains", emoji: "🌐" },
  prototype: { label: "Prototype", emoji: "💖" },
  netlify: { label: "Netlify", emoji: "🟢" },
};

// deterministic hue shift so 30 vercel sites don't look identical
function hue(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  return Math.abs(h) % 360;
}

interface Props {
  site: DeployedSite;
  ping?: UptimeResult;
}

export function SitePoster({ site, ping }: Props) {
  const host = HOST_LABEL[site.host];
  const art = HOST_ART[site.host];
  const status = !ping ? "checking" : ping.status === "up" ? "live" : ping.status === "slow" ? "slow" : "down";
  const statusColor =
    status === "live"
      ? "oklch(0.84 0.18 145)"
      : status === "slow"
      ? "oklch(0.85 0.17 75)"
      : status === "down"
      ? "oklch(0.68 0.24 25)"
      : "oklch(0.7 0.04 260)";

  return (
    <a
      href={site.url}
      target="_blank"
      rel="noreferrer"
      className="group relative block w-[280px] shrink-0 snap-start overflow-hidden rounded-[22px] shadow-poster transition-transform duration-500 hover:-translate-y-1.5 hover:scale-[1.02] animate-pop"
      style={{ aspectRatio: "16 / 10", boxShadow: "var(--shadow-poster)" }}
    >
      <img
        src={art}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        style={{ filter: `hue-rotate(${hue(site.id)}deg) saturate(1.1)` }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(0 0 0 / 0.1) 0%, transparent 40%, oklch(0 0 0 / 0.55) 75%, oklch(0 0 0 / 0.92) 100%)",
        }}
      />

      {/* host pill */}
      <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 backdrop-blur ring-1 ring-white/15">
        <span className="text-xs">{host.emoji}</span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-white">{host.label}</span>
      </div>

      {/* status */}
      <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 backdrop-blur ring-1 ring-white/15">
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: statusColor, boxShadow: `0 0 10px ${statusColor}` }}
        />
        <span className="text-[10px] font-bold uppercase text-white">{status}</span>
        {ping && status !== "down" && status !== "checking" && (
          <span className="font-mono text-[10px] text-white/70">{ping.ms}ms</span>
        )}
      </div>

      {/* bottom */}
      <div className="absolute inset-x-0 bottom-0 p-4">
        <div className="flex items-end justify-between gap-2">
          <div className="min-w-0">
            <h4 className="truncate font-display text-lg font-semibold leading-tight text-white drop-shadow">
              {site.name}
            </h4>
            <p className="mt-0.5 truncate text-[11px] text-white/70">{site.stack}</p>
          </div>
          <ExternalLink className="h-3.5 w-3.5 shrink-0 text-white/80 transition group-hover:translate-x-0.5 group-hover:translate-y-[-2px]" />
        </div>
      </div>
    </a>
  );
}
