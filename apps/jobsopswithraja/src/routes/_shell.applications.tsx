import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getJobs } from "@/lib/api";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/joblook/StatusBadge";
import { SourceBadge } from "@/components/joblook/SourceBadge";
import { MatchRing } from "@/components/joblook/MatchRing";
import { CompanyMark } from "@/components/joblook/CompanyMark";
import { JobDetailDrawer } from "@/components/joblook/JobDetailDrawer";
import { useUI } from "@/lib/store";
import { timeAgo } from "@/lib/format";
import type { JobStatus } from "@/types/job";
import { JOB_STATUS_LABEL } from "@/types/job";

export const Route = createFileRoute("/_shell/applications")({
  component: ApplicationsPage,
});

const APPLIED_STATUSES: JobStatus[] = ["applied", "follow_up", "interview", "offer", "rejected"];

function ApplicationsPage() {
  const { data: jobs = [] } = useQuery({ queryKey: ["jobs", "applications"], queryFn: () => getJobs({}) });
  const { openJob } = useUI();
  const [statusF, setStatusF] = useState<string>("all");
  const [minMatch, setMinMatch] = useState("");
  const [dueOnly, setDueOnly] = useState(false);

  const list = jobs
    .filter((j) => APPLIED_STATUSES.includes(j.status))
    .filter((j) => (statusF === "all" ? true : j.status === statusF))
    .filter((j) => (minMatch ? j.matchScore >= Number(minMatch) : true))
    .filter((j) => (dueOnly ? !!j.followUpAt : true));

  return (
    <div className="px-6 pt-5 pb-10 space-y-4">
      <div>
        <h1 className="font-display text-[22px] font-semibold tracking-tight">Applications</h1>
        <p className="text-[13px] text-muted-foreground">Every application you've submitted, with next actions.</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Select value={statusF} onValueChange={setStatusF}>
          <SelectTrigger className="h-8 w-40 text-[12.5px] bg-surface"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {APPLIED_STATUSES.map((s) => <SelectItem key={s} value={s}>{JOB_STATUS_LABEL[s]}</SelectItem>)}
          </SelectContent>
        </Select>
        <Input value={minMatch} onChange={(e) => setMinMatch(e.target.value)} placeholder="Min match" className="h-8 w-28 text-[12.5px] bg-surface" />
        <label className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
          <input type="checkbox" checked={dueOnly} onChange={(e) => setDueOnly(e.target.checked)} className="accent-brand" />
          Follow-up due
        </label>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="grid grid-cols-[minmax(200px,1.4fr)_1fr_120px_120px_120px_130px_90px_1fr] gap-3 border-b border-border bg-surface px-4 py-2 text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground">
          <div>Company · Role</div>
          <div>Source</div>
          <div>Applied</div>
          <div>Status</div>
          <div>Follow-up</div>
          <div>Match</div>
          <div>Notes</div>
          <div>Next action</div>
        </div>
        {list.map((j) => (
          <div key={j.id} onClick={() => openJob(j.id)} className="grid grid-cols-[minmax(200px,1.4fr)_1fr_120px_120px_120px_130px_90px_1fr] items-center gap-3 border-b border-border px-4 py-2.5 text-[13px] hover:bg-accent/40 cursor-pointer last:border-b-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <CompanyMark name={j.company} size={30} />
              <div className="min-w-0">
                <div className="font-medium truncate">{j.company}</div>
                <div className="text-[11.5px] text-muted-foreground truncate">{j.title}</div>
              </div>
            </div>
            <SourceBadge source={j.source} />
            <div className="tabular text-[12px] text-muted-foreground">{j.appliedAt ? timeAgo(j.appliedAt) : "—"}</div>
            <StatusBadge status={j.status} />
            <div className="tabular text-[12px] text-muted-foreground">{j.followUpAt ? timeAgo(j.followUpAt) : "—"}</div>
            <div className="flex items-center gap-1.5"><MatchRing value={j.matchScore} size={26} stroke={2.5} showLabel={false} /><span className="tabular text-[12px]">{j.matchScore}</span></div>
            <div className="truncate text-[11.5px] text-muted-foreground">{j.notes || "—"}</div>
            <div>{nextAction(j.status)}</div>
          </div>
        ))}
        {!list.length && <div className="p-10 text-center text-[13px] text-muted-foreground">No applications match these filters.</div>}
      </div>
      <JobDetailDrawer />
    </div>
  );
}

function nextAction(s: JobStatus) {
  const map: Partial<Record<JobStatus, string>> = {
    applied: "Wait 3d, then nudge recruiter",
    follow_up: "Send follow-up email",
    interview: "Prep + confirm time",
    offer: "Negotiate terms",
    rejected: "Log learnings",
  };
  return <Badge variant="outline" className="rounded-full font-normal text-[11px]">{map[s]}</Badge>;
}
