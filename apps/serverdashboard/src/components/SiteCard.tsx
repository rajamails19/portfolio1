import { ExternalLink, Globe } from "lucide-react";
import type { DeployedSite } from "@/lib/mock-data";
import type { UptimeResult } from "@/lib/uptime.functions";
import { StatusDot } from "./StatusDot";

const HOST_STYLE: Record<DeployedSite["host"], { label: string; color: string }> = {
  vercel: { label: "Vercel", color: "oklch(0.95 0.01 250)" },
  cloudflare: { label: "Cloudflare", color: "oklch(0.82 0.17 75)" },
  namecheap: { label: "Namecheap", color: "oklch(0.7 0.18 30)" },
  prototype: { label: "Prototype", color: "oklch(0.7 0.2 25)" },
  netlify: { label: "Netlify", color: "oklch(0.78 0.18 195)" },
};

interface Props {
  site: DeployedSite;
  ping?: UptimeResult;
}

export function SiteCard({ site, ping }: Props) {
  const host = HOST_STYLE[site.host];
  const tone = !ping
    ? "idle"
    : ping.status === "up"
    ? "live"
    : ping.status === "slow"
    ? "warn"
    : "down";

  return (
    <a
      href={site.url}
      target="_blank"
      rel="noreferrer"
      className="group glass relative block overflow-hidden rounded-2xl p-4 shadow-tile transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan/30"
      style={{ animation: "float-in 0.5s ease-out both" }}
    >
      <div
        className="absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl opacity-30 transition group-hover:opacity-60"
        style={{ background: host.color }}
      />
      <div className="relative flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border bg-white/5"
            style={{ color: host.color }}
          >
            <Globe className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <StatusDot tone={tone} />
              <h4 className="truncate font-semibold tracking-tight">{site.name}</h4>
            </div>
            <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{site.stack}</p>
          </div>
        </div>
        <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
      </div>

      <p className="relative mt-3 line-clamp-2 text-xs text-muted-foreground">{site.about}</p>

      <div className="relative mt-3 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
        <span className="rounded border border-border bg-white/5 px-1.5 py-0.5" style={{ color: host.color }}>
          {host.label}
        </span>
        <span className="text-foreground/70">
          {ping ? (
            ping.status === "down" ? "down" : `${ping.code ?? 200} · ${ping.ms}ms`
          ) : (
            "checking…"
          )}
        </span>
      </div>
    </a>
  );
}
