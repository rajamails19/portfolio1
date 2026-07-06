import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check } from "lucide-react";
import { SectionHeader } from "@/components/common/GlassCard";
import { StateView, statusToKind } from "@/components/common/states/StateView";
import { Skeleton } from "@/components/common/states/Skeleton";
import { useApiResource } from "@/hooks/useApiResource";
import { ParentService } from "@/services";
import type { ParentRequest, ParentRequestStage } from "@/types/models";

export const Route = createFileRoute("/parents")({
  head: () => ({ meta: [{ title: "Parent Desk · Campus AI" }] }),
  component: ParentsPage,
});

const stages: { id: ParentRequestStage; label: string }[] = [
  { id: "received", label: "Understand" },
  { id: "understood", label: "Classify" },
  { id: "retrieved", label: "Retrieve policy" },
  { id: "drafted", label: "Draft response" },
  { id: "awaiting_approval", label: "Risk check" },
  { id: "approved", label: "Human approve" },
];

function ParentsPage() {
  const messages = useApiResource<ParentRequest[]>(() => ParentService.listRequests());
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = messages.data?.find((m) => m.id === selectedId) ?? messages.data?.[0] ?? null;
  const kind = statusToKind(messages.status);

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Human-in-the-loop"
        title="Parent Communication Desk"
        description="Every message flows through Understand → Retrieve → Draft → Risk check → Human approve. The AI never sends without sign-off."
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="paper-card p-3 min-h-[320px]">
          {messages.isLoading && <div className="p-2 space-y-2">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-16" />)}</div>}
          {kind && (
            <StateView
              kind={kind}
              title={kind === "disconnected" ? "Parent inbox is empty." : undefined}
              description={kind === "disconnected" ? "Connect the messaging integration (WhatsApp / SMS / email). Inbound messages will populate this queue." : undefined}
            />
          )}
          {messages.data && messages.data.length > 0 && (
            <ul className="space-y-1">
              {messages.data.map((m) => (
                <li key={m.id}>
                  <button
                    onClick={() => setSelectedId(m.id)}
                    className={`w-full text-left p-3 rounded-lg transition ${(selectedId ?? messages.data?.[0]?.id) === m.id ? "bg-secondary rail-violet" : "hover:bg-secondary/60"}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-primary/15 text-primary flex items-center justify-center text-xs font-semibold shrink-0">
                        {m.avatar ?? m.parent[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium truncate">{m.parent}</span>
                          <span className="text-[10px] text-muted-foreground">{m.receivedAt}</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground truncate">{m.student}</p>
                        <p className="text-xs truncate mt-0.5">{m.message}</p>
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="lg:col-span-2 space-y-6">
          {!selected && (
            <div className="paper-card p-10">
              <StateView
                kind={kind === "disconnected" ? "disconnected" : "empty"}
                title={kind === "disconnected" ? "No conversation selected." : "Inbox is empty."}
                description="When a message arrives, the AI draft, policy citations, risk score and approval controls render here."
              />
            </div>
          )}

          {selected && (
            <>
              <div className="paper-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/15 text-primary flex items-center justify-center text-xs font-semibold">{selected.avatar ?? selected.parent[0]}</div>
                  <div>
                    <p className="font-medium text-sm">{selected.parent}</p>
                    <p className="text-xs text-muted-foreground">{selected.student} · {selected.receivedAt}</p>
                  </div>
                </div>
                <p className="bg-secondary border border-border rounded-xl p-4 text-sm">{selected.message}</p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {stages.map((s, i) => {
                    const reached = stages.findIndex((x) => x.id === selected.stage) >= i;
                    return (
                      <div key={s.id} className={`flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full border ${
                        reached ? "border-primary/40 text-primary bg-primary/10" : "border-border text-muted-foreground"
                      }`}>
                        {reached ? <Check className="h-3 w-3" /> : <span className="h-1 w-1 rounded-full bg-current" />}
                        {s.label}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="paper-card p-6">
                <p className="text-[10px] uppercase tracking-widest text-primary">AI-drafted response</p>
                <p className="text-sm leading-relaxed mt-2">{selected.draftResponse ?? "Draft will appear here once the agent runs."}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
