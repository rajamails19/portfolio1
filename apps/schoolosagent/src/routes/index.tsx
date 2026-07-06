import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play, Loader2, Activity, Radio } from "lucide-react";
import { MetricCard } from "@/components/common/MetricCard";
import { StateView, statusToKind } from "@/components/common/states/StateView";
import { Skeleton } from "@/components/common/states/Skeleton";
import { useApiResource } from "@/hooks/useApiResource";
import { MissionControlService } from "@/services";
import type { MissionMetricSnapshot } from "@/services";
import { formatNumber, formatPercent, formatCurrency } from "@/lib/utils/format";
import type { WorkflowRun } from "@/types/models";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mission Control · Campus AI" },
      { name: "description", content: "Executive AI command center for your school — live agents, KPIs, workflows." },
    ],
  }),
  component: MissionControl,
});

const tickerItems = [
  { tag: "SYS", text: "Awaiting backend connection — telemetry stream offline" },
  { tag: "RAG", text: "Vector database not configured" },
  { tag: "MLO", text: "No model deployments registered yet" },
  { tag: "OBS", text: "OpenTelemetry collector not reachable" },
  { tag: "ATT", text: "Attendance stream pending" },
];

function MissionControl() {
  const snapshot = useApiResource<MissionMetricSnapshot>(() => MissionControlService.getSnapshot());
  const recent = useApiResource<WorkflowRun[]>(() => MissionControlService.listRecentRuns());

  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [now, setNow] = useState("");

  useEffect(() => {
    const tick = () =>
      setNow(new Date().toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const runWorkflow = async () => {
    if (running) return;
    setRunning(true);
    setProgress(0);
    // UI-only simulation — actual run requires backend.
    for (let i = 1; i <= 100; i += 5) {
      await new Promise((r) => setTimeout(r, 30));
      setProgress(i);
    }
    setRunning(false);
    setProgress(0);
    await MissionControlService.triggerMorningWorkflow();
  };

  const recentKind = statusToKind(recent.status);

  return (
    <div className="space-y-8">
      {/* Cinematic hero strip */}
      <div className="paper-card-elevated relative overflow-hidden p-7 lg:p-9">
        <div className="pointer-events-none absolute -top-32 -right-24 h-80 w-80 rounded-full bg-violet-glow/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-amber-glow/15 blur-3xl" />
        <div className="relative flex items-end justify-between gap-6 flex-wrap">
          <div className="min-w-0">
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
              <span className="inline-flex items-center gap-1.5 text-amber-glow">
                <Radio className="h-3 w-3 animate-pulse-glow" /> Awaiting backend
              </span>
              <span>·</span>
              <span className="font-mono text-foreground">{now || "--:--:--"}</span>
              <span>·</span>
              <span>Vol. III · Issue 142</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl tracking-tight italic">
              Campus AI Mission Control
            </h1>
            <p className="text-sm text-muted-foreground mt-3 max-w-2xl">
              AI-first operating system for modern schools. Frontend is production-ready;
              <span className="text-foreground"> live metrics will appear once the orchestrator, RAG and observability stack are connected.</span>
            </p>
          </div>
          <button
            onClick={runWorkflow}
            disabled={running}
            className="group relative inline-flex items-center gap-2.5 rounded-xl px-5 py-3 text-sm font-medium bg-primary text-primary-foreground hover:opacity-95 transition disabled:opacity-70 glow-violet shadow-lg"
          >
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-glow/40 to-amber-glow/30 opacity-0 group-hover:opacity-100 transition" />
            {running ? <Loader2 className="h-4 w-4 animate-spin relative" /> : <Play className="h-4 w-4 relative" />}
            <span className="relative">{running ? "Dispatching…" : "Trigger Morning Workflow"}</span>
          </button>
        </div>

        {/* Ticker */}
        <div className="mt-7 -mx-7 lg:-mx-9 border-t border-border/70 pt-3 px-7 lg:px-9 overflow-hidden">
          <div className="flex gap-10 whitespace-nowrap animate-[sweep-x_38s_linear_infinite]" style={{ animationDuration: "38s" }}>
            {[...tickerItems, ...tickerItems, ...tickerItems].map((t, i) => (
              <span key={i} className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-mono text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded bg-secondary text-primary">{t.tag}</span>
                {t.text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {running && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
          <div className="paper-card p-4 rail-violet">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-mono text-primary">workflow.morning_campus.run() · simulated</span>
              <span className="text-muted-foreground font-mono">{progress}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
              <motion.div
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-violet-glow via-emerald-glow to-amber-glow"
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Metric cards — values come from MissionControlService.getSnapshot() */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MissionMetric loading={snapshot.isLoading} label="Students Present" value={formatNumber(snapshot.data?.studentsPresent)} icon="UserCheck" accent="violet" />
        <MissionMetric loading={snapshot.isLoading} label="Teachers Active" value={formatNumber(snapshot.data?.teachersActive)} suffix={snapshot.data?.teachersExpected ? `/ ${snapshot.data.teachersExpected}` : undefined} icon="Users" accent="cyan" />
        <MissionMetric loading={snapshot.isLoading} label="AI Agents Running" value={formatNumber(snapshot.data?.agentsRunning)} icon="Bot" accent="emerald" />
        <MissionMetric loading={snapshot.isLoading} label="Buses On Route" value={formatNumber(snapshot.data?.busesOnRoute)} suffix={snapshot.data?.busesTotal ? `/ ${snapshot.data.busesTotal}` : undefined} icon="Bus" accent="amber" />
        <MissionMetric loading={snapshot.isLoading} label="Attendance Today" value={formatPercent(snapshot.data?.attendancePct)} icon="TrendingUp" accent="emerald" />
        <MissionMetric loading={snapshot.isLoading} label="Open Alerts" value={formatNumber(snapshot.data?.openAlerts)} icon="ShieldAlert" accent="rose" />
        <MissionMetric loading={snapshot.isLoading} label="Cloud Health" value={formatPercent(snapshot.data?.cloudHealthPct)} icon="Cloud" accent="cyan" />
        <MissionMetric loading={snapshot.isLoading} label="AI Cost Today" value={formatCurrency(snapshot.data?.aiCostTodayUsd)} icon="Sparkles" accent="violet" />
      </div>

      {/* Pulse + activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 paper-card-elevated p-6 relative overflow-hidden">
          <div className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-violet-glow/10 blur-3xl" />
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Live Campus Pulse</p>
              <h3 className="font-display text-xl italic mt-1">Attendance · last 14 days</h3>
            </div>
            <span className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
              source: BigQuery (pending)
            </span>
          </div>
          <div className="h-72 flex items-center justify-center border border-dashed border-border rounded-xl bg-secondary/40">
            <StateView
              compact
              kind="disconnected"
              title="No campus stream connected"
              description="When BigQuery and the attendance event topic are wired, a 14-day area chart of present/absent students renders here in real time."
            />
          </div>
        </div>

        <div className="paper-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg italic">Live Activity</h3>
            <span className="text-[10px] uppercase tracking-widest text-amber-glow font-mono">offline</span>
          </div>
          <div className="space-y-3">
            <Skeleton className="h-8" />
            <Skeleton className="h-8" />
            <Skeleton className="h-8" />
          </div>
          <p className="mt-4 text-[11px] text-muted-foreground leading-relaxed">
            Subscribe this panel to <span className="font-mono text-primary">ws://orchestrator/agent-events</span> to stream agent
            activity here. While disconnected, no fake events are shown.
          </p>
        </div>
      </div>

      {/* Recent runs */}
      <div className="paper-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Activity className="h-4 w-4 text-primary" />
            <h3 className="font-display text-lg italic">Recent AI Executions</h3>
          </div>
          <span className="text-xs text-muted-foreground font-mono">
            {recent.data ? `${recent.data.length} runs` : "—"} · last 24h
          </span>
        </div>
        {recentKind ? (
          <StateView
            kind={recentKind}
            title={recentKind === "disconnected" ? "No workflow executions recorded yet." : undefined}
            description={
              recentKind === "disconnected"
                ? "Connect the workflow service to begin recording executions. Each run will appear here with id, trigger, status and duration."
                : undefined
            }
          />
        ) : null}
      </div>
    </div>
  );
}

function MissionMetric({
  loading, label, value, suffix, icon, accent,
}: {
  loading: boolean;
  label: string;
  value: string;
  suffix?: string;
  icon: Parameters<typeof MetricCard>[0]["icon"];
  accent: Parameters<typeof MetricCard>[0]["accent"];
}) {
  if (loading) {
    return (
      <div className="paper-card p-5">
        <div className="flex items-start justify-between mb-4">
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</span>
          <Skeleton className="h-8 w-8 rounded-lg" />
        </div>
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-3 w-32 mt-2" />
      </div>
    );
  }
  return (
    <MetricCard
      label={label}
      value={value}
      suffix={suffix}
      delta="awaiting backend"
      icon={icon}
      accent={accent}
    />
  );
}
