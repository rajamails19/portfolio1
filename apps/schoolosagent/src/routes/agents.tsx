import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Agent } from "@/types/models";
import { AgentCard } from "@/components/common/AgentCard";
import { GlassCard, SectionHeader, StatusDot } from "@/components/common/GlassCard";
import { StateView, statusToKind } from "@/components/common/states/StateView";
import { Skeleton } from "@/components/common/states/Skeleton";
import { useApiResource } from "@/hooks/useApiResource";
import { AgentService } from "@/services";

export const Route = createFileRoute("/agents")({
  head: () => ({ meta: [{ title: "AI Agents · Campus AI" }] }),
  component: AgentsPage,
});

const RUNTIME_STATES = ["idle", "queued", "running", "completed", "failed", "offline", "waiting_for_orchestrator"] as const;

function AgentsPage() {
  const agents = useApiResource<Agent[]>(() => AgentService.list());
  const [selected, setSelected] = useState<Agent | null>(null);
  const kind = statusToKind(agents.status);

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Awaiting orchestrator"
        title="AI Agents Center"
        description="Roster of specialized agents. Each card supports live runtime states streamed over websocket. Click any agent to inspect its tools, memory, prompt version, and recent traces."
      />

      {/* Runtime state legend — UI is already wired for the full lifecycle */}
      <div className="paper-card px-4 py-3 flex items-center gap-2 flex-wrap text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        <span>Lifecycle:</span>
        {RUNTIME_STATES.map((s) => (
          <span key={s} className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full border border-border bg-secondary">
            <RuntimeDot state={s} />
            {s.replace(/_/g, " ")}
          </span>
        ))}
      </div>

      {agents.isLoading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="paper-card p-5 space-y-3">
              <div className="flex items-center gap-3">
                <Skeleton className="h-11 w-11 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-2 w-16" />
                </div>
              </div>
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-3/4" />
              <div className="grid grid-cols-3 gap-2 pt-2">
                <Skeleton className="h-6" />
                <Skeleton className="h-6" />
                <Skeleton className="h-6" />
              </div>
            </div>
          ))}
        </div>
      )}

      {kind && kind !== "loading" && (
        <StateView
          kind={kind}
          title={kind === "disconnected" ? "No agents reporting." : undefined}
          description={
            kind === "disconnected"
              ? "Agent registry is empty until the LangGraph orchestrator broadcasts agent heartbeats. Connect the orchestrator to populate this view in real time."
              : undefined
          }
        />
      )}

      {agents.data && agents.data.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {agents.data.map((a) => {
            const legacy = {
              ...a,
              status: a.status === "running" ? "active" : a.status === "failed" ? "error" : a.status === "offline" ? "idle" : "idle",
              latencyMs: a.metrics?.latencyMs ?? 0,
              tokenCost: a.metrics?.tokenCost ?? 0,
              successRate: a.metrics?.successRate ?? 0,
              evalScore: a.metrics?.evalScore ?? 0,
              lastAction: a.lastAction ?? "—",
              promptVersion: a.promptVersion ?? "—",
            } as unknown as Parameters<typeof AgentCard>[0]["agent"];
            return <AgentCard key={a.id} agent={legacy} onClick={() => setSelected(a)} />;
          })}
        </div>
      )}

      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40"
            />
            <motion.aside
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="fixed right-0 top-0 h-screen w-full sm:w-[480px] bg-card border-l border-border z-50 overflow-y-auto shadow-2xl"
            >
              <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-primary">{selected.promptVersion ?? "no prompt version"}</p>
                  <h2 className="font-display font-semibold text-lg">{selected.name}</h2>
                </div>
                <button onClick={() => setSelected(null)} className="h-8 w-8 rounded-lg hover:bg-secondary flex items-center justify-center">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="p-6 space-y-5">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">Role</p>
                  <p className="text-sm">{selected.role}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Cell label="Runtime status" value={<span className="inline-flex items-center gap-1.5"><RuntimeDot state={selected.status} /><span className="capitalize text-xs">{selected.status.replace(/_/g, " ")}</span></span>} />
                  <Cell label="Eval score" value={<span className="font-mono">{selected.metrics?.evalScore ?? "—"}</span>} />
                  <Cell label="Avg latency" value={<span className="font-mono">{selected.metrics?.latencyMs ? `${selected.metrics.latencyMs}ms` : "—"}</span>} />
                  <Cell label="Success rate" value={<span className="font-mono">{selected.metrics?.successRate ? `${selected.metrics.successRate}%` : "—"}</span>} />
                </div>
                <Block title="Tools">
                  <div className="flex flex-wrap gap-1.5">
                    {selected.tools.map((t) => (
                      <span key={t} className="font-mono text-[11px] px-2 py-1 rounded-md bg-secondary border border-border">{t}</span>
                    ))}
                  </div>
                </Block>
                <Block title="Memory scopes">
                  <ul className="space-y-1.5">
                    {selected.memory.map((m) => (
                      <li key={m} className="text-xs flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-primary" /> {m}
                      </li>
                    ))}
                  </ul>
                </Block>
                <Block title="Recent traces">
                  <StateView compact kind="disconnected" description="Trace stream not connected." />
                </Block>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function RuntimeDot({ state }: { state: string }) {
  const cls =
    state === "running" ? "bg-violet-glow animate-pulse-glow" :
    state === "completed" ? "bg-emerald-glow" :
    state === "queued" ? "bg-cyan-glow animate-pulse-glow" :
    state === "failed" ? "bg-rose-glow" :
    state === "waiting_for_orchestrator" ? "bg-amber-glow animate-pulse-glow" :
    state === "offline" ? "bg-muted-foreground/60" :
    "bg-muted-foreground";
  return <span className={`inline-block h-2 w-2 rounded-full ${cls}`} />;
}

function Cell({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <GlassCard className="p-3">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">{label}</p>
      <div className="text-sm flex items-center">{value}</div>
    </GlassCard>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">{title}</p>
      {children}
    </div>
  );
}

// Suppress unused import warning while keeping StatusDot available for future use.
void StatusDot;
