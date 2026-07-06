import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Check, Loader2, RefreshCw, AlertTriangle, ShieldCheck,
  ChevronRight, Search, Code2, Copy, Activity, Zap, DollarSign, Clock, SkipForward,
} from "lucide-react";
import { SectionHeader } from "@/components/common/GlassCard";
import { StateView, statusToKind } from "@/components/common/states/StateView";
import { Skeleton } from "@/components/common/states/Skeleton";
import { useApiResource } from "@/hooks/useApiResource";
import { TraceService } from "@/services";
import type { ExecutionTrace } from "@/types/models";
import { shortId } from "@/lib/utils/ids";

export const Route = createFileRoute("/traces")({
  head: () => ({ meta: [{ title: "Trace Debugger · Campus AI" }] }),
  component: TracesPage,
});

const filters = ["All", "Success", "Failed", "Warning", "Human Review"] as const;

function TracesPage() {
  const traces = useApiResource<ExecutionTrace[]>(() => TraceService.list());
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = traces.data?.find((t) => t.id === selectedId) ?? null;

  const listKind = statusToKind(traces.status);

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="LangSmith-grade observability"
        title="Trace Debugger"
        description="Inspect every agent step — inputs, outputs, prompts, tool calls, tokens, latency, cost and evaluations. Replay any execution. Frontend is ready for OpenTelemetry traces."
      />

      {/* Filter + search */}
      <div className="paper-card px-4 py-3 flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[220px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            placeholder="trace_id, request_id, correlation_id, agent…"
            className="w-full pl-9 pr-3 py-1.5 bg-secondary border border-border rounded-md text-xs focus:outline-none focus:border-primary"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-[11px] px-3 py-1.5 rounded-md border transition ${
                filter === f
                  ? "border-primary text-primary-foreground bg-primary"
                  : "border-border text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >{f}</button>
          ))}
        </div>
        <div className="ml-auto text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
          {traces.data?.length ?? 0} traces · last 24h
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Queue */}
        <div className="lg:col-span-4 paper-card overflow-hidden min-h-[400px]">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Trace queue</span>
            <span className="text-[10px] font-mono text-muted-foreground">{traces.data?.length ?? 0}</span>
          </div>
          {traces.isLoading && (
            <div className="p-4 space-y-2">
              {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-16" />)}
            </div>
          )}
          {listKind && !traces.isLoading && (
            <StateView
              kind={listKind}
              title={listKind === "disconnected" ? "No workflow executions recorded yet." : undefined}
              description={listKind === "disconnected" ? "Connect the trace service (OpenTelemetry + your store of choice). Every run will appear here with full step-by-step replay." : undefined}
            />
          )}
          {traces.data && traces.data.length > 0 && (
            <ul className="divide-y divide-border">
              {traces.data.map((e) => (
                <li key={e.id}>
                  <button
                    onClick={() => setSelectedId(e.id)}
                    className={`w-full text-left px-4 py-3 transition ${
                      selectedId === e.id ? "bg-secondary rail-violet" : "hover:bg-secondary/60"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[11px] text-primary">{shortId(e.id)}</span>
                      <StatusIcon status={e.status} />
                    </div>
                    <p className="text-sm font-medium truncate">{e.workflowName}</p>
                    <div className="flex items-center justify-between mt-1.5 text-[10px] text-muted-foreground font-mono">
                      <span>{e.steps.length} steps · {e.triggeredBy}</span>
                      <span>{(e.durationMs / 1000).toFixed(2)}s</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Detail */}
        <div className="lg:col-span-8 space-y-5">
          {!selected && (
            <div className="paper-card-elevated p-10">
              <StateView
                kind={listKind === "disconnected" ? "disconnected" : "empty"}
                title={listKind === "disconnected" ? "Trace inspector idle." : "Select a trace from the queue."}
                description={
                  listKind === "disconnected"
                    ? "Once executions arrive, the inspector will surface request_id, correlation_id, execution_id, session_id, timestamps, latency, token count, estimated cost and retry count for every step."
                    : "The waterfall, evaluation scores, prompt, tool calls, inputs and outputs render here."
                }
              />
            </div>
          )}

          {selected && (
            <>
              <div className="paper-card-elevated p-5 relative overflow-hidden">
                <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-violet-glow/10 blur-3xl" />
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-2 flex-wrap">
                      <span className="font-mono text-primary">trace · {shortId(selected.id)}</span>
                      <ChevronRight className="h-3 w-3" />
                      <span className="font-mono">req · {shortId(selected.observability.requestId)}</span>
                      <ChevronRight className="h-3 w-3" />
                      <span className="font-mono">corr · {shortId(selected.observability.correlationId)}</span>
                    </div>
                    <h3 className="font-display text-xl italic">{selected.workflowName}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => TraceService.replay(selected.id)} className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1.5 rounded-md border border-border hover:bg-secondary">
                      <RefreshCw className="h-3 w-3" /> Replay
                    </button>
                    <button onClick={() => navigator.clipboard?.writeText(selected.id)} className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1.5 rounded-md border border-border hover:bg-secondary">
                      <Copy className="h-3 w-3" /> Copy ID
                    </button>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Stat icon={Activity} label="Duration" value={`${(selected.durationMs / 1000).toFixed(2)}s`} />
                  <Stat icon={Zap} label="Steps" value={`${selected.steps.length}`} />
                  <Stat icon={Code2} label="Tokens" value={selected.observability.tokenCount?.toLocaleString() ?? "—"} />
                  <Stat icon={DollarSign} label="Cost" value={selected.observability.estimatedCostUsd ? `$${selected.observability.estimatedCostUsd.toFixed(2)}` : "—"} />
                </div>
              </div>

              <div className="paper-card p-5">
                <h4 className="font-display italic text-base mb-3">Step waterfall</h4>
                <StateView compact kind="empty" description="Step waterfall renders here once trace data arrives." />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="paper-card p-3">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground">
        <Icon className="h-3 w-3" /> {label}
      </div>
      <p className="font-display text-lg mt-1">{value}</p>
    </div>
  );
}

function StatusIcon({ status }: { status: string }) {
  const map: Record<string, React.ReactNode> = {
    completed: <Check className="h-3.5 w-3.5 text-emerald-glow" />,
    approved: <ShieldCheck className="h-3.5 w-3.5 text-cyan-glow" />,
    running: <Loader2 className="h-3.5 w-3.5 text-violet-glow animate-spin" />,
    retry: <RefreshCw className="h-3.5 w-3.5 text-amber-glow" />,
    failed: <AlertTriangle className="h-3.5 w-3.5 text-rose-glow" />,
    queued: <Clock className="h-3.5 w-3.5 text-cyan-glow" />,
    skipped: <SkipForward className="h-3.5 w-3.5 text-muted-foreground" />,
  };
  return <>{map[status] ?? <span className="h-2 w-2 rounded-full bg-muted-foreground inline-block" />}</>;
}
