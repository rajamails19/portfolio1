import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/common/GlassCard";
import { StateView, statusToKind } from "@/components/common/states/StateView";
import { Skeleton } from "@/components/common/states/Skeleton";
import { useApiResource } from "@/hooks/useApiResource";
import { WorkflowService } from "@/services";
import type { WorkflowRun, WorkflowNodeStatus } from "@/types/models";
import { Check, Loader2, AlertTriangle, RefreshCw, ShieldCheck, GitBranch, Activity, Clock, SkipForward } from "lucide-react";

export const Route = createFileRoute("/workflows")({
  head: () => ({ meta: [{ title: "Workflow Orchestrator · Campus AI" }] }),
  component: WorkflowsPage,
});

type Kind = "trigger" | "agent" | "sink";
type Node = { id: string; label: string; sub: string; x: number; y: number; kind: Kind; accent: "violet" | "cyan" | "amber" | "emerald" | "rose" };

const NODE_W = 188;
const NODE_H = 64;
const CANVAS_H = 520;

// Static schematic — represents the *compiled graph topology*, not live data.
const nodes: Node[] = [
  { id: "trigger", label: "Parent reports absence", sub: "webhook · parent.app", x: 40, y: 80, kind: "trigger", accent: "cyan" },
  { id: "auth",    label: "Parent Auth Agent",      sub: "verify_parent(uid)", x: 40, y: 220, kind: "agent", accent: "violet" },
  { id: "att",     label: "Attendance Agent",       sub: "mark_absent()",      x: 40, y: 360, kind: "agent", accent: "violet" },
  { id: "log",     label: "Analytics Logger",       sub: "bigquery.insert",    x: 320, y: 220, kind: "sink", accent: "amber" },
  { id: "teacher", label: "Teacher Notification",   sub: "notify(class_t)",    x: 320, y: 360, kind: "agent", accent: "emerald" },
  { id: "confirm", label: "Parent Confirmation",    sub: "send_confirmation",  x: 320, y: 80, kind: "agent", accent: "violet" },
  { id: "lunch",   label: "Cafeteria Agent",        sub: "adjust_count(-1)",   x: 600, y: 80, kind: "agent", accent: "amber" },
  { id: "bus",     label: "Bus Agent",              sub: "cancel_pickup()",    x: 600, y: 220, kind: "agent", accent: "amber" },
  { id: "hw",      label: "Homework Agent",         sub: "assign_makeup()",    x: 600, y: 360, kind: "agent", accent: "emerald" },
];

const edges: Array<{ from: string; to: string }> = [
  { from: "trigger", to: "auth" }, { from: "auth", to: "att" }, { from: "att", to: "teacher" },
  { from: "teacher", to: "hw" }, { from: "hw", to: "bus" }, { from: "bus", to: "lunch" },
  { from: "lunch", to: "confirm" }, { from: "confirm", to: "log" }, { from: "log", to: "att" },
];

const accentStroke = {
  violet: "oklch(0.42 0.09 160)",
  cyan: "oklch(0.5 0.08 200)",
  emerald: "oklch(0.55 0.12 150)",
  amber: "oklch(0.62 0.16 45)",
  rose: "oklch(0.55 0.18 18)",
};

const STATUSES: WorkflowNodeStatus[] = ["queued", "running", "waiting", "retrying", "failed", "completed", "skipped"];

function nodeCenter(n: Node) { return { x: n.x + NODE_W / 2, y: n.y + NODE_H / 2 }; }
function edgePath(a: Node, b: Node) {
  const p1 = nodeCenter(a); const p2 = nodeCenter(b); const mx = (p1.x + p2.x) / 2;
  return `M ${p1.x} ${p1.y} C ${mx} ${p1.y}, ${mx} ${p2.y}, ${p2.x} ${p2.y}`;
}

function WorkflowsPage() {
  const runs = useApiResource<WorkflowRun[]>(() => WorkflowService.listRuns());
  const [selectedRunId] = useState<string | null>(null);
  const activeRun = runs.data?.find((r) => r.id === selectedRunId) ?? runs.data?.[0];
  const runKind = statusToKind(runs.status);

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="LangGraph-style orchestration"
        title="Workflow Orchestrator"
        description="Compiled graph topology and live execution stream. Nodes are agents, edges are tool handoffs. Run history streams from the orchestrator."
      />

      {/* Toolbar */}
      <div className="paper-card px-5 py-3 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 text-sm">
          <GitBranch className="h-4 w-4 text-primary" />
          <span className="font-display italic">Parent Absence Workflow</span>
          <span className="text-muted-foreground text-xs font-mono">v3.2.1 · {nodes.length} nodes · {edges.length} edges</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-amber-glow/10 text-amber-glow border border-amber-glow/30">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-glow animate-pulse-glow" /> awaiting runtime
          </span>
          <span className="font-mono text-muted-foreground">graph.compile()</span>
        </div>
      </div>

      {/* Status legend — UI already supports all 7 node states */}
      <div className="paper-card px-4 py-3 flex items-center gap-2 flex-wrap text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        <span>Node states:</span>
        {STATUSES.map((s) => (
          <span key={s} className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full border border-border bg-secondary">
            <StatusIcon status={s} />{s}
          </span>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Canvas */}
        <div className="lg:col-span-2 paper-card-elevated p-6 relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-violet-glow/10 blur-3xl" />
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Compiled graph</p>
              <h3 className="font-display text-lg italic mt-0.5">parent_absence_workflow.graph</h3>
            </div>
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-muted-foreground">
              <Legend dot="bg-cyan-glow" label="trigger" />
              <Legend dot="bg-violet-glow" label="agent" />
              <Legend dot="bg-amber-glow" label="sink" />
            </div>
          </div>

          <div className="relative grid-bg rounded-xl border border-border overflow-hidden" style={{ height: CANVAS_H }}>
            <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 820 ${CANVAS_H}`} preserveAspectRatio="none">
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M0,0 L10,5 L0,10 z" fill="oklch(0.42 0.09 160 / 0.5)" />
                </marker>
              </defs>
              {edges.map((e, i) => {
                const a = nodes.find((n) => n.id === e.from)!;
                const b = nodes.find((n) => n.id === e.to)!;
                return (
                  <path key={i} d={edgePath(a, b)} stroke="oklch(0.22 0.03 250 / 0.18)" strokeWidth={1.25} fill="none" markerEnd="url(#arrow)" />
                );
              })}
            </svg>

            {nodes.map((n, i) => (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04, duration: 0.35 }}
                className="absolute"
                style={{ left: n.x, top: n.y, width: NODE_W, height: NODE_H }}
              >
                <div className="relative h-full rounded-xl bg-card border border-border px-3 py-2.5 hover:border-primary/40 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full opacity-70" style={{ background: accentStroke[n.accent] }} />
                    <p className="text-[9px] uppercase tracking-widest text-muted-foreground">{n.kind}</p>
                    <span className="ml-auto text-[9px] font-mono text-muted-foreground inline-flex items-center gap-1">
                      <Clock className="h-2.5 w-2.5" /> queued
                    </span>
                  </div>
                  <p className="text-xs font-medium truncate mt-1">{n.label}</p>
                  <p className="font-mono text-[10px] text-muted-foreground truncate">{n.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
            <span className="inline-flex items-center gap-1.5"><Activity className="h-3 w-3 text-primary" /> awaiting first run</span>
            <span>checkpointer: redis · concurrency: 4</span>
          </div>
        </div>

        {/* Live execution panel */}
        <div className="paper-card-elevated p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Live execution</p>
              <h3 className="font-display text-lg italic mt-0.5">
                {activeRun?.name ?? "—"}
              </h3>
            </div>
            <span className="text-[10px] font-mono text-muted-foreground">{activeRun?.id ?? "no run"}</span>
          </div>

          {runs.isLoading && (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-14 rounded-lg" />)}
            </div>
          )}

          {runKind && !runs.isLoading && (
            <StateView
              kind={runKind}
              title={runKind === "disconnected" ? "No executions streaming." : undefined}
              description={
                runKind === "disconnected"
                  ? "Each node already supports startTime, endTime, latency, tool calls, prompt version, tokens, cost, output and error. Connect the orchestrator to populate the live thread."
                  : undefined
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}

function Legend({ dot, label }: { dot: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} /> {label}
    </span>
  );
}

function StatusIcon({ status }: { status: WorkflowNodeStatus | string }) {
  const map: Record<string, React.ReactNode> = {
    completed: <Check className="h-3 w-3 text-emerald-glow" />,
    running: <Loader2 className="h-3 w-3 text-violet-glow animate-spin" />,
    retrying: <RefreshCw className="h-3 w-3 text-amber-glow" />,
    failed: <AlertTriangle className="h-3 w-3 text-rose-glow" />,
    queued: <Clock className="h-3 w-3 text-cyan-glow" />,
    waiting: <ShieldCheck className="h-3 w-3 text-cyan-glow" />,
    skipped: <SkipForward className="h-3 w-3 text-muted-foreground" />,
  };
  return <>{map[status] ?? null}</>;
}
