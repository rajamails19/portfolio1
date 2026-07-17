import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ExternalLink, Copy, RefreshCw, Sparkles, MapPin, Building2, Briefcase, DollarSign, CheckCircle2, XCircle, Clock } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUI } from "@/lib/store";
import { getJob, updateJobStatus, updateJobNotes, generateCoverLetter, generateResumeSuggestions } from "@/lib/api";
import { MatchRing } from "./MatchRing";
import { SourceBadge } from "./SourceBadge";
import { StatusBadge } from "./StatusBadge";
import { CompanyMark } from "./CompanyMark";
import { formatSalary, timeAgo } from "@/lib/format";
import type { JobStatus } from "@/types/job";

export function JobDetailDrawer() {
  const { selectedJobId, openJob } = useUI();
  const qc = useQueryClient();
  const { data: job } = useQuery({
    queryKey: ["job", selectedJobId],
    queryFn: () => getJob(selectedJobId!),
    enabled: !!selectedJobId,
  });
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (job) setNotes(job.notes ?? "");
  }, [job?.id]);

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["jobs"] });
    qc.invalidateQueries({ queryKey: ["job", selectedJobId] });
  };

  const statusMut = useMutation({
    mutationFn: (s: JobStatus) => updateJobStatus(selectedJobId!, s),
    onSuccess: (_, s) => { toast.success(`Moved to ${s.replace("_", " ")}`); invalidate(); },
  });
  const notesMut = useMutation({
    mutationFn: (n: string) => updateJobNotes(selectedJobId!, n),
    onSuccess: invalidate,
  });
  const coverMut = useMutation({
    mutationFn: () => generateCoverLetter(selectedJobId!),
    onSuccess: () => { toast.success("Cover letter regenerated"); invalidate(); },
  });
  const suggMut = useMutation({
    mutationFn: () => generateResumeSuggestions(selectedJobId!),
    onSuccess: () => { toast.success("Resume suggestions refreshed"); invalidate(); },
  });

  const copy = async (t: string, msg = "Copied") => {
    try { await navigator.clipboard.writeText(t); toast.success(msg); } catch { toast.error("Copy failed"); }
  };

  return (
    <Sheet open={!!selectedJobId} onOpenChange={(o) => !o && openJob(null)}>
      <SheetContent side="right" className="w-full sm:max-w-[620px] p-0 flex flex-col">
        {job ? (
          <>
            <SheetHeader className="px-6 pt-5 pb-4 border-b border-border">
              <div className="flex items-start gap-3">
                <CompanyMark name={job.company} size={44} />
                <div className="flex-1 min-w-0">
                  <SheetTitle className="font-display text-[17px] leading-tight text-left">{job.title}</SheetTitle>
                  <div className="mt-1 flex items-center gap-2 text-[12.5px] text-muted-foreground">
                    <Building2 className="h-3.5 w-3.5" /> {job.company}
                    <span>·</span>
                    <MapPin className="h-3.5 w-3.5" /> {job.location}
                    <span>·</span>
                    <Briefcase className="h-3.5 w-3.5" /> {job.workMode}
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <SourceBadge source={job.source} />
                    <StatusBadge status={job.status} />
                    <span className="text-[12px] tabular text-foreground/80 inline-flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />{formatSalary(job.salaryMin, job.salaryMax, job.currency)}
                    </span>
                    <span className="text-[11.5px] text-muted-foreground inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" />{timeAgo(job.postedAt)}
                    </span>
                  </div>
                </div>
                <MatchRing value={job.matchScore} size={56} stroke={5} />
              </div>
            </SheetHeader>

            <ScrollArea className="flex-1">
              <div className="px-6 py-5 space-y-6">
                <section className="rounded-lg border border-border bg-surface p-3">
                  <div className="flex items-center gap-2 text-[12px] font-semibold">
                    <Sparkles className="h-3.5 w-3.5 text-brand" /> Why this role matches you
                  </div>
                  <p className="mt-1.5 text-[13px] text-muted-foreground leading-relaxed">
                    {job.matchedSkills.length} of {job.requiredSkills.length} required skills matched. Your background in {job.matchedSkills.slice(0, 3).join(", ") || "adjacent stacks"} aligns with the team's current focus.
                  </p>
                </section>

                <section>
                  <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Job description</h4>
                  <div className="text-[13.5px] leading-relaxed whitespace-pre-wrap text-foreground/90">{job.description}</div>
                </section>

                <section>
                  <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Requirements vs you</h4>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1.5">
                      {job.matchedSkills.map((s) => (
                        <Badge key={s} className="rounded-full bg-emerald-accent/12 text-emerald-accent border border-emerald-accent/30 hover:bg-emerald-accent/12">
                          <CheckCircle2 className="mr-1 h-3 w-3" />{s}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {job.missingSkills.map((s) => (
                        <Badge key={s} variant="outline" className="rounded-full text-muted-foreground border-dashed">
                          <XCircle className="mr-1 h-3 w-3" />{s}
                        </Badge>
                      ))}
                    </div>
                    {job.niceToHaveSkills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <span className="text-[11px] text-muted-foreground mr-1">Nice to have:</span>
                        {job.niceToHaveSkills.map((s) => (
                          <Badge key={s} variant="secondary" className="rounded-full font-normal text-[11px]">{s}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </section>

                <section>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Resume keyword gap</h4>
                    <span className="text-[11px] tabular text-muted-foreground">{job.missingSkills.length} keywords missing</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(job.resumeSuggestions?.keywordsToAdd ?? job.missingSkills).map((k) => (
                      <Badge key={k} className="rounded-full bg-brand/10 text-brand border border-brand/20 hover:bg-brand/10">+ {k}</Badge>
                    ))}
                  </div>
                </section>

                <section className="rounded-xl border border-border bg-card">
                  <div className="flex items-center justify-between border-b border-border px-3 py-2">
                    <h4 className="text-[12.5px] font-semibold">Cover letter</h4>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="h-7 text-[11.5px]" onClick={() => copy(job.coverLetter ?? "", "Cover letter copied")}>
                        <Copy className="mr-1 h-3 w-3" />Copy
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 text-[11.5px]" onClick={() => coverMut.mutate()} disabled={coverMut.isPending}>
                        <RefreshCw className={cnPending(coverMut.isPending)} />Regenerate
                      </Button>
                    </div>
                  </div>
                  <pre className="whitespace-pre-wrap px-3 py-2.5 text-[12.5px] leading-relaxed text-foreground/90 font-sans">{job.coverLetter}</pre>
                </section>

                <section className="rounded-xl border border-border bg-card">
                  <div className="flex items-center justify-between border-b border-border px-3 py-2">
                    <h4 className="text-[12.5px] font-semibold">Resume suggestions</h4>
                    <Button variant="ghost" size="sm" className="h-7 text-[11.5px]" onClick={() => suggMut.mutate()} disabled={suggMut.isPending}>
                      <RefreshCw className={cnPending(suggMut.isPending)} />Refresh
                    </Button>
                  </div>
                  <div className="p-3 space-y-3">
                    {job.resumeSuggestions?.summary && (
                      <div>
                        <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">Suggested summary</div>
                        <p className="text-[12.5px] leading-relaxed">{job.resumeSuggestions.summary}</p>
                      </div>
                    )}
                    <div className="space-y-2.5">
                      {job.resumeSuggestions?.bulletRewrites.map((b, i) => (
                        <div key={i} className="rounded-lg border border-border bg-surface p-2.5 text-[12.5px]">
                          <div className="text-muted-foreground line-through decoration-muted-foreground/40">{b.original}</div>
                          <div className="mt-1 text-foreground font-medium">→ {b.improved}</div>
                          <div className="mt-1 text-[11px] text-brand">{b.reason}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <section>
                  <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Notes</h4>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    onBlur={() => notesMut.mutate(notes)}
                    placeholder="Recruiter contact, follow-ups, gut feelings…"
                    className="min-h-[80px] text-[13px] bg-surface"
                  />
                </section>

                <section>
                  <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Activity</h4>
                  <div className="space-y-1.5">
                    {job.activity.map((a, i) => (
                      <div key={i} className="flex items-center gap-2 text-[12px]">
                        <div className="h-1.5 w-1.5 rounded-full bg-brand" />
                        <span className="text-foreground">{a.event}</span>
                        <span className="ml-auto text-muted-foreground tabular">{timeAgo(a.at)}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </ScrollArea>

            <div className="border-t border-border px-6 py-3 flex flex-wrap items-center gap-2 bg-background">
              {job.matchScore >= 60 ? (
                <>
                  <Button asChild className="bg-brand hover:bg-brand/90 text-brand-foreground">
                    <a href={job.applyUrl} target="_blank" rel="noreferrer">
                      <ExternalLink className="mr-1.5 h-3.5 w-3.5" />Apply on {job.sourceLabel}
                    </a>
                  </Button>
                  <Separator orientation="vertical" className="h-6" />
                  <Button variant="outline" size="sm" onClick={() => statusMut.mutate("saved")}>Save</Button>
                  <Button variant="outline" size="sm" onClick={() => statusMut.mutate("to_apply")}>To Apply</Button>
                  <Button variant="outline" size="sm" onClick={() => statusMut.mutate("applied")}>Mark Applied</Button>
                  <Button variant="ghost" size="sm" onClick={() => statusMut.mutate("rejected")} className="text-muted-foreground">Reject</Button>
                </>
              ) : (
                <>
                  <div className="text-[11.5px] text-muted-foreground mr-1">Low match ({job.matchScore}) — recommended:</div>
                  <Button size="sm" onClick={() => statusMut.mutate("rejected")} className="bg-rose-500 hover:bg-rose-500/90 text-white">Reject</Button>
                  <Button size="sm" variant="outline" onClick={() => statusMut.mutate("archived")}>Archive</Button>
                  <Button size="sm" variant="outline" onClick={() => statusMut.mutate("saved")}>Review later</Button>
                  <Separator orientation="vertical" className="h-6" />
                  <Button asChild size="sm" variant="ghost" className="text-muted-foreground">
                    <a href={job.applyUrl} target="_blank" rel="noreferrer">
                      <ExternalLink className="mr-1.5 h-3.5 w-3.5" />Apply anyway
                    </a>
                  </Button>
                </>
              )}
            </div>

          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}

function cnPending(pending: boolean) {
  return `mr-1 h-3 w-3 ${pending ? "animate-spin" : ""}`;
}
