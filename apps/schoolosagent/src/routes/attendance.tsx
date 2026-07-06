import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { MetricCard } from "@/components/common/MetricCard";
import { GlassCard, SectionHeader } from "@/components/common/GlassCard";
import { StateView, statusToKind } from "@/components/common/states/StateView";
import { Skeleton } from "@/components/common/states/Skeleton";
import { useApiResource } from "@/hooks/useApiResource";
import { AttendanceService } from "@/services";
import type { AttendanceRecord } from "@/types/models";

export const Route = createFileRoute("/attendance")({
  head: () => ({ meta: [{ title: "Attendance Intelligence · Campus AI" }] }),
  component: AttendancePage,
});

function AttendancePage() {
  const records = useApiResource<AttendanceRecord[]>(() => AttendanceService.listToday());
  const [q, setQ] = useState("Show students absent more than 3 days this week");
  const kind = statusToKind(records.status);

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Real-time + predictive"
        title="Attendance Intelligence"
        description="Multi-modal attendance: gate vision, RFID, teacher inputs. Reconciled by the Attendance Agent with AI risk scoring."
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(["Today", "Late Arrivals", "Absent >3 days", "At Risk (AI)"] as const).map((label, i) => (
          records.isLoading ? <Skeleton key={i} className="h-28 rounded-2xl" /> : (
            <MetricCard
              key={label}
              label={label}
              value="—"
              delta="awaiting backend"
              icon={i === 0 ? "UserCheck" : i === 1 ? "Clock" : i === 2 ? "AlertTriangle" : "Brain"}
              accent={i === 0 ? "emerald" : i === 1 ? "amber" : i === 2 ? "rose" : "violet"}
            />
          )
        ))}
      </div>

      <GlassCard className="p-5">
        <form onSubmit={(e) => e.preventDefault()}>
          <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Natural language query</label>
          <div className="mt-2 flex gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="flex-1 bg-secondary border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button className="px-5 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:opacity-95 transition">
              <Sparkles className="h-4 w-4" /> Run
            </button>
          </div>
          <p className="mt-3 text-[11px] text-muted-foreground">
            Query is translated to SQL/BigQuery by the Attendance Agent. Results appear below once the warehouse is connected.
          </p>
        </form>
      </GlassCard>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 paper-card p-6 min-h-[320px]">
          <h3 className="font-display italic text-lg mb-2">Trend · last 14 days</h3>
          <div className="h-64 border border-dashed border-border rounded-xl bg-secondary/30 flex items-center justify-center">
            <StateView compact kind={kind ?? "disconnected"} description="Connect the attendance source to render the present/absent trend." />
          </div>
        </div>
        <div className="paper-card p-6 min-h-[320px]">
          <h3 className="font-display italic text-lg mb-2">By grade</h3>
          <div className="h-64 border border-dashed border-border rounded-xl bg-secondary/30 flex items-center justify-center">
            <StateView compact kind="disconnected" description="Per-grade attendance bars render here." />
          </div>
        </div>
      </div>

      <div className="paper-card p-6">
        <h3 className="font-display italic text-lg">Watchlist · AI risk score</h3>
        <p className="text-xs text-muted-foreground">Flagged by the Absenteeism Predictor for principal review.</p>
        <div className="mt-4">
          <StateView compact kind="disconnected" description="No watchlist yet — model and inference pipeline pending." />
        </div>
      </div>
    </div>
  );
}
