import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { JobStatus } from "@/types/job";
import { JOB_STATUS_LABEL } from "@/types/job";

const styles: Record<JobStatus, string> = {
  new_match: "bg-brand/10 text-brand border-brand/20",
  saved: "bg-cyan-accent/10 text-cyan-accent border-cyan-accent/20",
  to_apply: "bg-amber-accent/10 text-amber-accent border-amber-accent/20",
  resume_tailored: "bg-brand/15 text-brand border-brand/25",
  applied: "bg-emerald-accent/12 text-emerald-accent border-emerald-accent/25",
  follow_up: "bg-amber-accent/12 text-amber-accent border-amber-accent/25",
  interview: "bg-cyan-accent/15 text-cyan-accent border-cyan-accent/30",
  offer: "bg-emerald-accent/20 text-emerald-accent border-emerald-accent/40",
  rejected: "bg-muted text-muted-foreground border-border",
  archived: "bg-muted text-muted-foreground border-border",
};

export function StatusBadge({ status, className }: { status: JobStatus; className?: string }) {
  return (
    <Badge variant="outline" className={cn("rounded-full font-medium text-[11px] px-2 py-0.5", styles[status], className)}>
      {JOB_STATUS_LABEL[status]}
    </Badge>
  );
}
