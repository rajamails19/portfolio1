import { useQuery } from "@tanstack/react-query";
import { Sparkles, Send, CheckCheck, CalendarClock } from "lucide-react";
import { getJobs } from "@/lib/api";
import { useCountUp } from "@/hooks/use-count-up";
import { cn } from "@/lib/utils";

function Stat({ label, value, icon: Icon, tone }: { label: string; value: number; icon: typeof Sparkles; tone: string }) {
  const n = useCountUp(value);
  return (
    <div className="group flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 card-lift">
      <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", tone)}>
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="tabular font-display text-2xl font-semibold leading-tight">{n}</div>
      </div>
    </div>
  );
}

export function FeedStats() {
  const { data: jobs = [] } = useQuery({ queryKey: ["jobs", "all-for-stats"], queryFn: () => getJobs({}) });
  const dayMs = 86400000;
  const now = Date.now();
  const newToday = jobs.filter((j) => now - new Date(j.postedAt).getTime() < dayMs).length;
  const toApply = jobs.filter((j) => j.status === "to_apply" || j.status === "resume_tailored").length;
  const appliedWeek = jobs.filter((j) => j.appliedAt && now - new Date(j.appliedAt).getTime() < 7 * dayMs).length;
  const interviews = jobs.filter((j) => j.status === "interview" || j.status === "offer").length;

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <Stat label="New today" value={newToday} icon={Sparkles} tone="bg-brand/10 text-brand" />
      <Stat label="To apply" value={toApply} icon={Send} tone="bg-amber-accent/12 text-amber-accent" />
      <Stat label="Applied this week" value={appliedWeek} icon={CheckCheck} tone="bg-emerald-accent/12 text-emerald-accent" />
      <Stat label="Interviews" value={interviews} icon={CalendarClock} tone="bg-cyan-accent/12 text-cyan-accent" />
    </div>
  );
}
