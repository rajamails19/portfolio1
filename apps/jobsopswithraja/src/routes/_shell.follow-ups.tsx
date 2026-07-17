import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getJobs, updateJobStatus } from "@/lib/api";
import { CompanyMark } from "@/components/joblook/CompanyMark";
import { EmptyState } from "@/components/joblook/EmptyState";
import { Button } from "@/components/ui/button";
import { Copy, CheckCheck } from "lucide-react";
import { toast } from "sonner";
import { daysBetween, timeAgo } from "@/lib/format";
import type { Job } from "@/types/job";

export const Route = createFileRoute("/_shell/follow-ups")({
  component: FollowUpsPage,
});

function suggested(job: Job): string {
  return `Hi — just circling back on my application for the ${job.title} role at ${job.company} from ${job.appliedAt ? timeAgo(job.appliedAt) : "last week"}. Really excited about the team's direction and would love to know if next steps are moving. Happy to share more context on the ${job.requiredSkills[0]} work I've been shipping recently.`;
}

function FollowUpsPage() {
  const { data: jobs = [] } = useQuery({ queryKey: ["jobs", "follow"], queryFn: () => getJobs({}) });
  const qc = useQueryClient();
  const mut = useMutation({
    mutationFn: (id: string) => updateJobStatus(id, "follow_up"),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["jobs"] }); toast.success("Marked followed up"); },
  });

  const applied = jobs.filter((j) => j.appliedAt);
  const today = applied.filter((j) => daysBetween(j.appliedAt!) === 7);
  const week = applied.filter((j) => { const d = daysBetween(j.appliedAt!); return d > 7 && d <= 14; });
  const overdue = applied.filter((j) => daysBetween(j.appliedAt!) > 14 && j.status !== "interview" && j.status !== "offer" && j.status !== "rejected");
  const waiting = jobs.filter((j) => j.status === "follow_up");
  const interviews = jobs.filter((j) => j.status === "interview");

  const sections: { title: string; items: Job[]; tone: string }[] = [
    { title: "Overdue", items: overdue, tone: "text-rose-accent" },
    { title: "Due today", items: today, tone: "text-amber-accent" },
    { title: "Due this week", items: week, tone: "text-foreground" },
    { title: "Waiting on recruiter", items: waiting, tone: "text-muted-foreground" },
    { title: "Interview pending", items: interviews, tone: "text-cyan-accent" },
  ];

  return (
    <div className="px-6 pt-5 pb-10 space-y-6">
      <div>
        <h1 className="font-display text-[22px] font-semibold tracking-tight">Follow Ups</h1>
        <p className="text-[13px] text-muted-foreground">Stay on top of every application without living in your inbox.</p>
      </div>
      {sections.map((s) => (
        <section key={s.title}>
          <h3 className={`text-[12px] font-semibold uppercase tracking-wider mb-2 ${s.tone}`}>{s.title} · {s.items.length}</h3>
          {s.items.length ? (
            <div className="grid gap-2 md:grid-cols-2">
              {s.items.map((j) => (
                <div key={j.id} className="rounded-xl border border-border bg-card p-3 space-y-2 card-lift">
                  <div className="flex items-start gap-2.5">
                    <CompanyMark name={j.company} size={32} />
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-[13px] truncate">{j.title}</div>
                      <div className="text-[11.5px] text-muted-foreground truncate">{j.company} · applied {j.appliedAt ? timeAgo(j.appliedAt) : "—"}</div>
                    </div>
                  </div>
                  <div className="rounded-lg border border-border bg-surface p-2 text-[12px] leading-relaxed">{suggested(j)}</div>
                  <div className="flex justify-end gap-1.5">
                    <Button size="sm" variant="ghost" className="h-7 text-[11.5px]" onClick={() => { navigator.clipboard.writeText(suggested(j)); toast.success("Message copied"); }}>
                      <Copy className="mr-1 h-3 w-3" />Copy
                    </Button>
                    <Button size="sm" className="h-7 text-[11.5px] bg-brand hover:bg-brand/90 text-brand-foreground" onClick={() => mut.mutate(j.id)}>
                      <CheckCheck className="mr-1 h-3 w-3" />Mark followed up
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState icon={CheckCheck} title="You're clear" description="Nothing needs a nudge in this bucket." compact />
          )}
        </section>
      ))}
    </div>
  );
}
