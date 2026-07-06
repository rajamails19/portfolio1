import { createFileRoute } from "@tanstack/react-router";
import { Bus, MapPin, Navigation } from "lucide-react";
import { GlassCard, SectionHeader } from "@/components/common/GlassCard";
import { StateView, statusToKind } from "@/components/common/states/StateView";
import { Skeleton } from "@/components/common/states/Skeleton";
import { useApiResource } from "@/hooks/useApiResource";
import { TransportService } from "@/services";
import type { TransportEvent } from "@/types/models";

export const Route = createFileRoute("/transport")({
  head: () => ({ meta: [{ title: "Transport Command Center · Campus AI" }] }),
  component: TransportPage,
});

function TransportPage() {
  const events = useApiResource<TransportEvent[]>(() => TransportService.listEvents());
  const kind = statusToKind(events.status);

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="GPS · prediction · notifications"
        title="Transport Command Center"
        description="Live bus telemetry fused with traffic prediction. The Bus Route Agent will reroute and notify parents autonomously once the GPS stream is connected."
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 paper-card p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display italic text-lg">Live fleet</h3>
            <span className="text-xs text-muted-foreground font-mono">awaiting telemetry</span>
          </div>
          <div className="relative h-80 grid-bg rounded-xl border border-dashed border-border overflow-hidden flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full opacity-20">
              <path d="M 0 200 Q 200 100 400 220 T 800 180" stroke="oklch(0.46 0.03 250)" strokeWidth="1.5" fill="none" />
              <path d="M 100 0 Q 200 200 350 350" stroke="oklch(0.46 0.03 250)" strokeWidth="1.5" fill="none" />
              <path d="M 500 0 L 500 400" stroke="oklch(0.46 0.03 250)" strokeWidth="1.5" fill="none" />
            </svg>
            <StateView compact kind="disconnected" title="No GPS stream connected." description="Bus positions, ETAs and route paths render once the fleet telemetry topic is wired." />
          </div>
        </div>

        <div className="paper-card p-5 min-h-[300px]">
          <h3 className="font-display italic text-lg mb-3">Event stream</h3>
          {events.isLoading && <div className="space-y-2">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-8" />)}</div>}
          {kind && (
            <StateView
              compact
              kind={kind}
              description={kind === "disconnected" ? "Transport events stream here (departed, arrived, delayed, rerouted, incident, boarding)." : undefined}
            />
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <GlassCard className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <Navigation className="h-4 w-4 text-violet-glow" />
            <h3 className="font-display italic text-sm">ETA Prediction Agent</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-3">Predicts route ETA from live GPS + historical traffic graphs.</p>
          <div className="grid grid-cols-3 gap-2 text-xs">
            {["MAE", "Latency", "Version"].map((k) => (
              <div key={k}>
                <p className="text-[10px] uppercase text-muted-foreground">{k}</p>
                <p className="font-mono">—</p>
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-4 w-4 text-cyan-glow" />
            <h3 className="font-display italic text-sm">Parent notification preview</h3>
          </div>
          <p className="text-xs text-muted-foreground">Notifications are generated only on real delay events. None to preview yet.</p>
        </GlassCard>
        <GlassCard className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <Bus className="h-4 w-4 text-primary" />
            <h3 className="font-display italic text-sm">Route registry</h3>
          </div>
          <p className="text-xs text-muted-foreground">Define routes in the operations service. Each route will appear with driver, students, status and ETA.</p>
        </GlassCard>
      </div>
    </div>
  );
}
