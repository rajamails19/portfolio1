import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { RefreshCw, Search, Sparkles } from "lucide-react";
import { StageBackground } from "@/components/StageBackground";
import { PosterCard } from "@/components/PosterCard";
import { SitePoster } from "@/components/SitePoster";
import { Row } from "@/components/Row";
import { DetailsModal } from "@/components/DetailsModal";
import {
  MOCK_APPS,
  DEPLOYED_SITES,
  type LocalApp,
  type DeployedSite,
} from "@/lib/mock-data";
import { pingSites, type UptimeResult } from "@/lib/uptime.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Stage · your dev universe, Netflix-style" },
      {
        name: "description",
        content: "Local dev servers, Vercel apps, Cloudflare and domains — all in one cinematic dashboard.",
      },
    ],
  }),
  component: Index,
});

type TabId = "local" | "vercel" | "cloudflare" | "domains" | "lovable";

const TABS: { id: TabId; label: string; emoji: string; accent: string }[] = [
  { id: "local",      label: "Local",      emoji: "💻", accent: "var(--gradient-coral)" },
  { id: "vercel",     label: "Vercel",     emoji: "▲",  accent: "var(--gradient-grape)" },
  { id: "cloudflare", label: "Cloudflare", emoji: "🟠", accent: "var(--gradient-sunset)" },
  { id: "domains",    label: "Domains",    emoji: "🌐", accent: "var(--gradient-sky)" },
  { id: "lovable",    label: "Lovable",    emoji: "💖", accent: "var(--gradient-magenta)" },
];

function Index() {
  const [tab, setTab] = useState<TabId>("local");
  const [apps, setApps] = useState<LocalApp[]>(MOCK_APPS);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<LocalApp | null>(null);
  const [pings, setPings] = useState<Record<string, UptimeResult>>({});
  const pingFn = useServerFn(pingSites);

  // ping deployed sites for the active tab
  useEffect(() => {
    if (tab === "local") return;
    const hostMap: Record<TabId, DeployedSite["host"] | null> = {
      local: null, vercel: "vercel", cloudflare: "cloudflare",
      domains: "namecheap", lovable: "lovable",
    };
    const host = hostMap[tab];
    if (!host) return;
    const list = DEPLOYED_SITES.filter((s) => s.host === host);
    let cancelled = false;
    pingFn({ data: { urls: list.map((s) => s.url) } })
      .then((res) => {
        if (cancelled) return;
        const m: Record<string, UptimeResult> = {};
        list.forEach((s, i) => (m[s.id] = res.results[i]));
        setPings((p) => ({ ...p, ...m }));
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [tab, pingFn]);

  const handleStop = (id: string) =>
    setApps((prev) => prev.filter((a) => a.id !== id));

  const filteredApps = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return apps;
    return apps.filter((a) =>
      [a.name, a.framework, a.path, String(a.port)].some((v) =>
        v.toLowerCase().includes(q),
      ),
    );
  }, [apps, query]);

  const sitesByTab = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filter = (host: DeployedSite["host"]) =>
      DEPLOYED_SITES.filter(
        (s) => s.host === host && (!q || s.name.toLowerCase().includes(q) || s.stack.toLowerCase().includes(q)),
      );
    return {
      vercel: filter("vercel"),
      cloudflare: filter("cloudflare"),
      domains: filter("namecheap"),
      lovable: filter("lovable"),
    };
  }, [query]);

  // group local apps by framework into rows
  const localRows = useMemo(() => {
    const running = filteredApps.filter((a) => a.backend?.running);
    const byFw: Record<string, LocalApp[]> = {};
    filteredApps.forEach((a) => { (byFw[a.framework] ||= []).push(a); });
    const rows: { title: string; eyebrow: string; apps: LocalApp[] }[] = [
      { eyebrow: "Now playing", title: "All local servers", apps: filteredApps },
    ];
    if (running.length) rows.push({ eyebrow: "Backstage", title: "With a backend running", apps: running });
    Object.entries(byFw).forEach(([fw, list]) => {
      if (list.length > 1) rows.push({ eyebrow: fw, title: `${fw} shows`, apps: list });
    });
    return rows;
  }, [filteredApps]);

  return (
    <div className="relative min-h-screen text-white">
      <StageBackground />
      <DetailsModal app={selected} onClose={() => setSelected(null)} onStop={handleStop} />

      {/* NETFLIX-STYLE TOP NAV */}
      <header className="sticky top-0 z-40 backdrop-blur-xl" style={{ background: "linear-gradient(180deg, oklch(0.12 0.06 290 / 0.92), oklch(0.12 0.06 290 / 0.55) 80%, transparent)" }}>
        <div className="mx-auto flex max-w-[1600px] items-center gap-6 px-6 py-4">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div
              className="grid h-9 w-9 place-items-center rounded-xl shadow-pop"
              style={{ background: "var(--gradient-sunset)" }}
            >
              <Sparkles className="h-4 w-4 text-white" fill="currentColor" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-gradient">
              STAGE
            </span>
          </div>

          {/* Tabs — Netflix style */}
          <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
            {TABS.map((t) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`group relative shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                    active ? "text-white" : "text-white/55 hover:text-white"
                  }`}
                >
                  <span className="relative z-10 inline-flex items-center gap-1.5">
                    <span className="text-base leading-none">{t.emoji}</span>
                    {t.label}
                    <span className="font-mono text-[10px] opacity-60">
                      {t.id === "local" ? apps.length : sitesByTab[t.id as keyof typeof sitesByTab]?.length ?? 0}
                    </span>
                  </span>
                  {active && (
                    <span
                      className="absolute inset-0 rounded-full"
                      style={{ background: t.accent, boxShadow: "0 8px 24px -8px oklch(0 0 0 / 0.5)" }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex-1" />

          <div className="relative hidden w-[260px] md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/55" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              className="h-9 w-full rounded-full border border-white/10 bg-white/5 pl-9 pr-3 text-sm placeholder:text-white/40 focus:border-white/30 focus:bg-white/10 focus:outline-none"
            />
          </div>

          <button
            onClick={() => setApps([...MOCK_APPS])}
            className="grid h-9 w-9 place-items-center rounded-full bg-white text-black shadow-pop transition hover:rotate-180"
            title="Refresh"
          >
            <RefreshCw className="h-4 w-4" strokeWidth={2.5} />
          </button>
        </div>
      </header>

      {/* CONTENT — flips on tab change */}
      <main key={tab} className="flip-stage pb-16">
        {tab === "local" && (
          <>
            {localRows.map((r) => (
              <Row key={r.title} eyebrow={r.eyebrow} title={r.title}>
                {r.apps.map((a) => (
                  <PosterCard key={a.id} app={a} onOpen={setSelected} onStop={handleStop} />
                ))}
              </Row>
            ))}
            {filteredApps.length === 0 && <Empty />}
          </>
        )}

        {tab !== "local" && (
          <SiteTab sites={sitesByTab[tab as keyof typeof sitesByTab]} pings={pings} />
        )}
      </main>
    </div>
  );
}

function SiteTab({ sites, pings }: { sites: DeployedSite[]; pings: Record<string, UptimeResult> }) {
  if (sites.length === 0) return <Empty />;
  const live = sites.filter((s) => pings[s.id]?.status === "up");
  const slow = sites.filter((s) => pings[s.id]?.status === "slow");
  const down = sites.filter((s) => pings[s.id]?.status === "down");
  const rest = sites.filter((s) => !pings[s.id]);

  const rows = [
    { eyebrow: "All sites", title: "Every site, one scroll", list: sites },
    ...(live.length ? [{ eyebrow: "✓ Live", title: "Up and responding", list: live }] : []),
    ...(slow.length ? [{ eyebrow: "⚠ Slow", title: "Responding slowly", list: slow }] : []),
    ...(down.length ? [{ eyebrow: "✕ Down", title: "Need attention", list: down }] : []),
    ...(rest.length && !live.length ? [{ eyebrow: "Pinging…", title: "Checking now", list: rest }] : []),
  ];

  return (
    <>
      {rows.map((r) => (
        <Row key={r.title} eyebrow={r.eyebrow} title={r.title}>
          {r.list.map((s) => (
            <SitePoster key={s.id} site={s} ping={pings[s.id]} />
          ))}
        </Row>
      ))}
    </>
  );
}

function Empty() {
  return (
    <div className="mx-auto mt-20 max-w-md px-6 text-center">
      <p className="text-5xl animate-float">🍿</p>
      <p className="mt-3 font-display text-xl">Nothing here yet.</p>
      <p className="mt-1 text-sm text-white/60">Try a different tab or clear your search.</p>
    </div>
  );
}
