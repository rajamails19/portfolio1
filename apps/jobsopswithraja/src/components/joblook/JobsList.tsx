import { useQuery } from "@tanstack/react-query";
import { MoreHorizontal, ExternalLink, Eye, MapPin } from "lucide-react";
import { getJobs } from "@/lib/api";
import { useUI } from "@/lib/store";
import { CompanyMark } from "./CompanyMark";
import { MatchRing } from "./MatchRing";
import { SourceBadge } from "./SourceBadge";
import { StatusBadge } from "./StatusBadge";
import { JobsTableSkeleton } from "./JobsTableSkeleton";
import { EmptyState } from "./EmptyState";
import { formatSalary, timeAgo } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { updateJobStatus } from "@/lib/api";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { PIPELINE_STATUSES, JOB_STATUS_LABEL } from "@/types/job";
import { cn } from "@/lib/utils";

import type { JobStatus } from "@/types/job";

export function JobsList() {
  const { filters, view, openJob } = useUI();
  const { data: jobs, isLoading, error } = useQuery({
    queryKey: ["jobs", filters],
    queryFn: () => getJobs(filters),
  });
  const qc = useQueryClient();
  const statusMut = useMutation({
    mutationFn: ({ id, status }: { id: string; status: JobStatus }) => updateJobStatus(id, status),
    onSuccess: (_, v) => { toast.success(`Moved to ${JOB_STATUS_LABEL[v.status]}`); qc.invalidateQueries({ queryKey: ["jobs"] }); },
  });

  if (isLoading) return <JobsTableSkeleton />;
  if (error) return <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-6 text-sm text-destructive">Failed to load jobs.</div>;
  if (!jobs?.length) return (
    <EmptyState
      icon={Eye}
      title="No jobs match these filters"
      description="Loosen the match range or clear a source to see more roles."
    />
  );


  if (view === "cards") return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
      {jobs.map((j) => (
        <div
          key={j.id}
          onClick={() => openJob(j.id)}
          className="cursor-pointer rounded-xl border border-border bg-card p-4 card-lift"
        >
          <div className="flex items-start gap-3">
            <CompanyMark name={j.company} size={40} />
            <div className="min-w-0 flex-1">
              <div className="font-display font-semibold text-[14.5px] leading-tight truncate">{j.title}</div>
              <div className="mt-0.5 text-[12.5px] text-muted-foreground truncate">{j.company}</div>
            </div>
            <MatchRing value={j.matchScore} size={42} />
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[11.5px] text-muted-foreground">
            <MapPin className="h-3 w-3" /> {j.location}
            <Badge variant="outline" className="rounded-full font-normal text-[10.5px] capitalize">{j.workMode}</Badge>
            <SourceBadge source={j.source} />
          </div>
          <div className="mt-3 flex flex-wrap gap-1">
            {j.requiredSkills.slice(0, 3).map((s) => (
              <Badge key={s} variant="secondary" className="rounded-full text-[10.5px] font-normal">{s}</Badge>
            ))}
            {j.requiredSkills.length > 3 && (
              <span className="text-[10.5px] text-muted-foreground self-center">+{j.requiredSkills.length - 3}</span>
            )}
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
            <div className="tabular text-[12px] font-medium">{formatSalary(j.salaryMin, j.salaryMax)}</div>
            <div className="flex items-center gap-2">
              <StatusBadge status={j.status} />
              <span className="text-[11px] text-muted-foreground tabular">{timeAgo(j.postedAt)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden shadow-soft">
      <div className="sticky top-[132px] z-10 grid grid-cols-[minmax(200px,1.5fr)_44px_minmax(130px,1fr)_110px_minmax(130px,1fr)_120px_112px_36px] gap-3 border-b border-border bg-surface/95 backdrop-blur-md px-4 py-2 text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground">
        <div>Role · Company</div>
        <div>Match</div>
        <div>Skills</div>
        <div>Salary</div>
        <div>Location</div>
        <div>Source · Posted</div>
        <div>Status</div>
        <div></div>
      </div>
      {jobs.map((j) => {
        const low = j.matchScore < 60;
        return (
        <div
          key={j.id}
          onClick={() => openJob(j.id)}
          className={cn(
            "group relative grid grid-cols-[minmax(200px,1.5fr)_44px_minmax(130px,1fr)_110px_minmax(130px,1fr)_120px_112px_36px] items-center gap-3 border-b border-border px-4 py-2 text-[13px] cursor-pointer transition-colors hover:bg-accent/50 last:border-b-0",
            low && "opacity-70 hover:opacity-100",
          )}
        >
          <span className="pointer-events-none absolute left-0 top-0 h-full w-[2px] bg-brand opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="flex items-center gap-3 min-w-0">
            <CompanyMark name={j.company} size={34} />
            <div className="min-w-0">
              <div className="font-medium truncate" title={j.title}>{j.title}</div>
              <div className="text-[12px] text-muted-foreground truncate" title={j.company}>{j.company}</div>
            </div>
          </div>
          <MatchRing value={j.matchScore} size={36} />
          <div className="flex flex-wrap gap-1 min-w-0 overflow-hidden">
            {j.requiredSkills.slice(0, 2).map((s) => (
              <Badge key={s} variant="secondary" className="rounded-full text-[10.5px] font-normal">{s}</Badge>
            ))}
            {j.requiredSkills.length > 2 && <span className="text-[10.5px] text-muted-foreground self-center">+{j.requiredSkills.length - 2}</span>}
          </div>
          <div className="tabular text-[12.5px] whitespace-nowrap">{formatSalary(j.salaryMin, j.salaryMax)}</div>
          <div className="min-w-0 truncate text-[12.5px] text-muted-foreground" title={`${j.location} · ${j.workMode}`}>{j.location} <span className="capitalize text-foreground/70">· {j.workMode}</span></div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <SourceBadge source={j.source} />
            <span className="text-[10.5px] text-muted-foreground tabular">{timeAgo(j.postedAt)}</span>
          </div>
          <StatusBadge status={j.status} />

          <div onClick={(e) => e.stopPropagation()}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-3.5 w-3.5" /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <a href={j.applyUrl} target="_blank" rel="noreferrer"><ExternalLink className="mr-2 h-3.5 w-3.5" />Open apply link</a>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => openJob(j.id)}><Eye className="mr-2 h-3.5 w-3.5" />View details</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="text-[10.5px] uppercase tracking-wider text-muted-foreground">Move to</DropdownMenuLabel>
                {PIPELINE_STATUSES.map((s) => (
                  <DropdownMenuItem key={s} onClick={() => statusMut.mutate({ id: j.id, status: s })}>
                    {JOB_STATUS_LABEL[s]}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        );
      })}

    </div>
  );
}
