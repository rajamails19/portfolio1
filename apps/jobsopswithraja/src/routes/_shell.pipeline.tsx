import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  DndContext, DragOverlay, PointerSensor, useSensor, useSensors, closestCorners,
  type DragEndEvent, type DragStartEvent,
} from "@dnd-kit/core";
import { useDroppable, useDraggable } from "@dnd-kit/core";
import { useState } from "react";
import { getJobs, updateJobStatus } from "@/lib/api";
import { PIPELINE_STATUSES, JOB_STATUS_LABEL } from "@/types/job";
import type { Job, JobStatus } from "@/types/job";
import { MatchRing } from "@/components/joblook/MatchRing";
import { SourceBadge } from "@/components/joblook/SourceBadge";
import { CompanyMark } from "@/components/joblook/CompanyMark";
import { JobDetailDrawer } from "@/components/joblook/JobDetailDrawer";
import { useUI } from "@/lib/store";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";
import { daysBetween } from "@/lib/format";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_shell/pipeline")({
  component: PipelinePage,
});

function JobCard({ job }: { job: Job }) {
  const { openJob } = useUI();
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: job.id });
  const daysApplied = job.appliedAt ? daysBetween(job.appliedAt) : null;
  const needsNudge = job.status === "applied" && daysApplied !== null && daysApplied > 7;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onClick={() => openJob(job.id)}
      className={cn(
        "cursor-grab active:cursor-grabbing rounded-lg border border-border bg-card p-2.5 space-y-2 card-lift",
        isDragging && "opacity-40",
      )}
    >
      <div className="flex items-start gap-2">
        <CompanyMark name={job.company} size={28} />
        <div className="min-w-0 flex-1">
          <div className="font-medium text-[12.5px] leading-tight truncate">{job.title}</div>
          <div className="text-[11px] text-muted-foreground truncate">{job.company}</div>
        </div>
        <MatchRing value={job.matchScore} size={30} stroke={3} showLabel={false} />
      </div>
      <div className="flex flex-wrap gap-1">
        {job.requiredSkills.slice(0, 3).map((s) => (
          <Badge key={s} variant="secondary" className="rounded-full text-[10px] font-normal px-1.5 py-0">{s}</Badge>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <SourceBadge source={job.source} />
        {daysApplied !== null && <span className="text-[10.5px] tabular text-muted-foreground">{daysApplied}d in col</span>}
      </div>
      {needsNudge && (
        <div className="flex items-center gap-1 rounded-md bg-amber-accent/10 px-1.5 py-1 text-[10.5px] text-amber-accent">
          <AlertCircle className="h-3 w-3" /> Follow-up nudge
        </div>
      )}
    </div>
  );
}

function Column({ status, jobs }: { status: JobStatus; jobs: Job[] }) {
  const { setNodeRef, isOver } = useDroppable({ id: status });
  return (
    <div className="flex w-72 shrink-0 flex-col rounded-xl border border-border bg-surface">
      <div className="flex items-center justify-between px-3 py-2 border-b border-border">
        <div className="flex items-center gap-2">
          <div className={cn("h-1.5 w-1.5 rounded-full", statusDot(status))} />
          <span className="text-[12px] font-semibold">{JOB_STATUS_LABEL[status]}</span>
        </div>
        <span className="tabular text-[11px] text-muted-foreground">{jobs.length}</span>
      </div>
      <div ref={setNodeRef} className={cn("flex-1 min-h-[200px] p-2 space-y-2 transition-colors", isOver && "bg-brand/5")}>
        {jobs.map((j) => <JobCard key={j.id} job={j} />)}
        {!jobs.length && <div className="text-center text-[11.5px] text-muted-foreground py-6">Empty</div>}
      </div>
    </div>
  );
}

function statusDot(s: JobStatus): string {
  const map: Partial<Record<JobStatus, string>> = {
    new_match: "bg-brand",
    saved: "bg-cyan-accent",
    to_apply: "bg-amber-accent",
    resume_tailored: "bg-brand",
    applied: "bg-emerald-accent",
    follow_up: "bg-amber-accent",
    interview: "bg-cyan-accent",
    offer: "bg-emerald-accent",
    rejected: "bg-muted-foreground",
  };
  return map[s] ?? "bg-muted-foreground";
}

function PipelinePage() {
  const { data: jobs = [] } = useQuery({ queryKey: ["jobs", "pipeline"], queryFn: () => getJobs({}) });
  const qc = useQueryClient();
  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  const mut = useMutation({
    mutationFn: ({ id, status }: { id: string; status: JobStatus }) => updateJobStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["jobs"] }),
  });

  const grouped = PIPELINE_STATUSES.reduce<Record<JobStatus, Job[]>>((acc, s) => {
    acc[s] = jobs.filter((j) => j.status === s);
    return acc;
  }, {} as Record<JobStatus, Job[]>);

  const onDragStart = (e: DragStartEvent) => setActiveId(String(e.active.id));
  const onDragEnd = (e: DragEndEvent) => {
    setActiveId(null);
    if (!e.over) return;
    const id = String(e.active.id);
    const newStatus = String(e.over.id) as JobStatus;
    const job = jobs.find((j) => j.id === id);
    if (job && job.status !== newStatus) {
      mut.mutate({ id, status: newStatus });
      toast.success(`${job.company} → ${JOB_STATUS_LABEL[newStatus]}`);
    }
  };

  const activeJob = jobs.find((j) => j.id === activeId);

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col">
      <div className="px-6 pt-5 pb-3">
        <h1 className="font-display text-[22px] font-semibold tracking-tight">Pipeline</h1>
        <p className="text-[13px] text-muted-foreground">Drag jobs across stages. Follow-ups nudge automatically after 7 days.</p>
      </div>
      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <div className="flex-1 overflow-x-auto px-6 pb-6">
          <div className="flex gap-3 h-full">
            {PIPELINE_STATUSES.map((s) => <Column key={s} status={s} jobs={grouped[s]} />)}
          </div>
        </div>
        <DragOverlay>{activeJob ? <div className="w-72"><JobCard job={activeJob} /></div> : null}</DragOverlay>
      </DndContext>
      <JobDetailDrawer />
    </div>
  );
}
