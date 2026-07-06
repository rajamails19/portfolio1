import { createFileRoute } from "@tanstack/react-router";
import * as Icons from "lucide-react";
import { Plug } from "lucide-react";
import { SectionHeader } from "@/components/common/GlassCard";
import { StateView, statusToKind } from "@/components/common/states/StateView";
import { Skeleton } from "@/components/common/states/Skeleton";
import { useApiResource } from "@/hooks/useApiResource";
import { CloudService } from "@/services";
import type { CloudServiceStatus } from "@/types/models";

export const Route = createFileRoute("/cloud")({
  head: () => ({ meta: [{ title: "CloudOps Architecture · Campus AI" }] }),
  component: CloudPage,
});

// Default catalog when the cloud service is disconnected — every service
// appears as an explicit, honest "Disconnected · Connect" placeholder.
const CATALOG: CloudServiceStatus[] = [
  { id: "run",        name: "Cloud Run",     category: "Compute",       provider: "gcp", status: "disconnected", icon: "Server" },
  { id: "firestore",  name: "Firestore",     category: "Database",      provider: "gcp", status: "disconnected", icon: "Database" },
  { id: "bigquery",   name: "BigQuery",      category: "Analytics",     provider: "gcp", status: "disconnected", icon: "BarChart3" },
  { id: "storage",    name: "Cloud Storage", category: "Storage",       provider: "gcp", status: "disconnected", icon: "HardDrive" },
  { id: "billing",    name: "Billing API",   category: "FinOps",        provider: "gcp", status: "disconnected", icon: "Wallet" },
  { id: "pubsub",     name: "Pub/Sub",       category: "Messaging",     provider: "gcp", status: "disconnected", icon: "Radio" },
  { id: "monitoring", name: "Monitoring",    category: "Observability", provider: "gcp", status: "disconnected", icon: "Activity" },
  { id: "gateway",    name: "API Gateway",   category: "Edge",          provider: "gcp", status: "disconnected", icon: "Network" },
  { id: "vector",     name: "Vector DB",     category: "ML",            provider: "gcp", status: "disconnected", icon: "Boxes" },
  { id: "llm",        name: "Gemini / LLM",  category: "ML",            provider: "gcp", status: "disconnected", icon: "Sparkles" },
];

function CloudPage() {
  const services = useApiResource<CloudServiceStatus[]>(() => CloudService.listServices());
  const costs = useApiResource(() => CloudService.getCostTrend());

  const items = services.data && services.data.length > 0 ? services.data : CATALOG;
  const showingPlaceholders = services.isDisconnected || !services.data || services.data.length === 0;
  const costsKind = statusToKind(costs.status);

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow={showingPlaceholders ? "Awaiting service connections" : "GCP · production architecture"}
        title="CloudOps Architecture"
        description="Connect each cloud service to flow live health, latency and cost into the dashboard. Service catalog is honest about what is and is not connected."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {services.isLoading
          ? Array.from({ length: 10 }).map((_, i) => <Skeleton key={i} className="h-36 rounded-2xl" />)
          : items.map((s) => <CloudServiceCard key={s.id} svc={s} placeholder={showingPlaceholders} />)}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="paper-card p-6 min-h-[280px]">
          <h3 className="font-display italic text-lg mb-1">Cost · 24h</h3>
          <p className="text-xs text-muted-foreground mb-4">From Billing API · once connected.</p>
          <div className="h-56 border border-dashed border-border rounded-xl bg-secondary/30 flex items-center justify-center">
            {costs.isLoading
              ? <Skeleton className="h-full w-full" />
              : <StateView compact kind={costsKind ?? "empty"} description={costsKind === "disconnected" ? "Connect Billing API to populate 24h cost curves." : undefined} />}
          </div>
        </div>
        <div className="paper-card p-6 min-h-[280px]">
          <h3 className="font-display italic text-lg mb-1">p95 latency · 24h</h3>
          <p className="text-xs text-muted-foreground mb-4">From Cloud Monitoring · once connected.</p>
          <div className="h-56 border border-dashed border-border rounded-xl bg-secondary/30 flex items-center justify-center">
            <StateView compact kind="disconnected" description="Wire Monitoring exporter to render p50/p95/p99 latency per service." />
          </div>
        </div>
      </div>
    </div>
  );
}

function CloudServiceCard({ svc, placeholder }: { svc: CloudServiceStatus; placeholder: boolean }) {
  const Icon = (Icons[svc.icon as keyof typeof Icons] ?? Icons.Cloud) as Icons.LucideIcon;
  const connected = svc.status === "connected";
  const degraded = svc.status === "degraded";
  return (
    <div className={`paper-card p-4 flex flex-col gap-3 transition hover:-translate-y-0.5 hover:shadow-lg ${
      connected ? "border-emerald-glow/30" : degraded ? "border-amber-glow/30" : "border-border"
    }`}>
      <div className="flex items-center justify-between">
        <div className="h-9 w-9 rounded-lg bg-secondary border border-border flex items-center justify-center text-primary">
          <Icon className="h-4 w-4" />
        </div>
        <span className={`text-[10px] uppercase tracking-widest font-mono ${
          connected ? "text-emerald-glow" : degraded ? "text-amber-glow" : "text-muted-foreground"
        }`}>
          {svc.status}
        </span>
      </div>
      <div>
        <p className="text-sm font-medium leading-tight">{svc.name}</p>
        <p className="text-[10px] text-muted-foreground mt-0.5">{svc.category} · {svc.provider}</p>
      </div>

      {connected ? (
        <div className="text-[11px] font-mono flex items-center justify-between">
          <span>{svc.metrics?.latencyMs ? `${svc.metrics.latencyMs}ms` : "—"}</span>
          <span className="text-emerald-glow">{svc.metrics?.costToday != null ? `$${svc.metrics.costToday.toFixed(2)}` : "—"}</span>
        </div>
      ) : (
        <button
          type="button"
          disabled={!placeholder}
          className="mt-auto inline-flex items-center justify-center gap-1.5 text-[11px] px-2.5 py-1.5 rounded-md border border-primary/40 bg-primary/10 text-primary hover:bg-primary/15 transition"
        >
          <Plug className="h-3 w-3" /> Connect
        </button>
      )}
    </div>
  );
}
