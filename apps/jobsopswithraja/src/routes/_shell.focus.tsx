import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { getJobs, updateJobStatus } from "@/lib/api";
import { MatchRing } from "@/components/joblook/MatchRing";
import { SourceBadge } from "@/components/joblook/SourceBadge";
import { CompanyMark } from "@/components/joblook/CompanyMark";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { formatSalary } from "@/lib/format";
import { ExternalLink, Copy, ChevronLeft, ChevronRight, SkipForward, Clock3, CheckCheck, FileEdit, Keyboard } from "lucide-react";
import { toast } from "sonner";
import type { JobStatus } from "@/types/job";

export const Route = createFileRoute("/_shell/focus")({
  component: FocusPage,
});

function FocusPage() {
  const { data: allJobs = [] } = useQuery({ queryKey: ["jobs", "focus"], queryFn: () => getJobs({ statuses: ["to_apply", "resume_tailored"] as JobStatus[] }) });
  const queue = useMemo(
    () => [...allJobs].sort((a, b) => b.matchScore - a.matchScore),
    [allJobs],
  );
  const qc = useQueryClient();
  const mut = useMutation({
    mutationFn: ({ id, status }: { id: string; status: JobStatus }) => updateJobStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["jobs"] }),
  });

  const [idx, setIdx] = useState(0);
  const [applied, setApplied] = useState(0);
  const [skipped, setSkipped] = useState(0);
  const [snoozed, setSnoozed] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [start] = useState(Date.now());

  const visible = queue.filter((j) => !snoozed.includes(j.id));
  const current = visible[idx];
  const done = idx >= visible.length;

  const advance = () => setIdx((i) => i + 1);

  const apply = () => {
    if (!current) return;
    window.open(current.applyUrl, "_blank");
    mut.mutate({ id: current.id, status: "applied" });
    setApplied((a) => a + 1);
    toast.success(`Applied to ${current.company}`);
    advance();
  };
  const skip = () => { setSkipped((s) => s + 1); advance(); };
  const snooze = () => { if (current) { setSnoozed((s) => [...s, current.id]); toast("Snoozed for this session"); advance(); } };
  const markTailored = () => {
    if (!current) return;
    mut.mutate({ id: current.id, status: "resume_tailored" });
    toast.success("Marked resume tailored");
    advance();
  };
  const copyCover = async () => {
    if (!current?.coverLetter) return;
    await navigator.clipboard.writeText(current.coverLetter);
    toast.success("Cover letter copied");
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) return;
      if (e.key === "a" || e.key === "A") apply();
      else if (e.key === "c" || e.key === "C") copyCover();
      else if (e.key === "s" || e.key === "S") skip();
      else if (e.key === "r" || e.key === "R") markTailored();
      else if (e.key === "ArrowRight") advance();
      else if (e.key === "ArrowLeft") setIdx((i) => Math.max(0, i - 1));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current]);

  if (!queue.length) return (
    <div className="p-10 text-center">
      <h1 className="font-display text-xl font-semibold">Nothing in the apply queue</h1>
      <p className="mt-1 text-sm text-muted-foreground">Move jobs to "To Apply" or "Resume Tailored" to focus.</p>
    </div>
  );

  if (done) {
    const mins = Math.round((Date.now() - start) / 60000);
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-emerald-accent/15 flex items-center justify-center">
          <CheckCheck className="h-6 w-6 text-emerald-accent" />
        </div>
        <h1 className="font-display text-2xl font-semibold">Session complete</h1>
        <p className="mt-1 text-sm text-muted-foreground">Nice momentum today.</p>
        <div className="mt-6 grid grid-cols-4 gap-3 text-sm">
          {[["Applied", applied], ["Skipped", skipped], ["Snoozed", snoozed.length], [`Min`, mins]].map(([l, v]) => (
            <div key={l as string} className="rounded-lg border border-border p-3">
              <div className="tabular font-display text-xl">{v as number}</div>
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{l}</div>
            </div>
          ))}
        </div>
        <Button className="mt-6" onClick={() => { setIdx(0); setApplied(0); setSkipped(0); setSnoozed([]); }}>Start another session</Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-6 space-y-5">
      <div>
        <div className="flex items-center justify-between text-[12px] text-muted-foreground mb-1.5">
          <span className="tabular font-medium">{idx + 1} of {visible.length}</span>
          <span className="inline-flex items-center gap-2"><Keyboard className="h-3.5 w-3.5" /> A apply · C copy · R tailored · S skip · ← →</span>
        </div>
        <Progress value={((idx + 1) / visible.length) * 100} className="h-1.5" />
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 space-y-5 shadow-elevated">
        <div className="flex items-start gap-4">
          <CompanyMark name={current.company} size={52} />
          <div className="flex-1 min-w-0">
            <h2 className="font-display text-xl font-semibold leading-tight">{current.title}</h2>
            <div className="mt-1 text-[13px] text-muted-foreground">{current.company} · {current.location} · <span className="capitalize">{current.workMode}</span></div>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-[12px]">
              <SourceBadge source={current.source} />
              <span className="tabular font-medium">{formatSalary(current.salaryMin, current.salaryMax)}</span>
            </div>
          </div>
          <MatchRing value={current.matchScore} size={80} stroke={7}>
            <div className="text-center">
              <div className="tabular font-display text-xl font-semibold" style={{ color: current.matchScore >= 80 ? "var(--emerald-accent)" : current.matchScore >= 60 ? "var(--amber-accent)" : "var(--rose-accent)" }}>{current.matchScore}</div>
              <div className="text-[9px] uppercase tracking-wider text-muted-foreground">match</div>
            </div>
          </MatchRing>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Requirements vs you</h4>
            <div className="flex flex-wrap gap-1.5">
              {current.matchedSkills.map((s) => <Badge key={s} className="rounded-full bg-emerald-accent/12 text-emerald-accent border border-emerald-accent/30 hover:bg-emerald-accent/12">✓ {s}</Badge>)}
              {current.missingSkills.map((s) => <Badge key={s} variant="outline" className="rounded-full border-dashed text-muted-foreground">{s}</Badge>)}
            </div>
          </div>
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Missing keywords</h4>
            <div className="flex flex-wrap gap-1.5">
              {(current.resumeSuggestions?.keywordsToAdd ?? current.missingSkills).map((k) => (
                <Badge key={k} className="rounded-full bg-brand/10 text-brand border border-brand/20 hover:bg-brand/10">+ {k}</Badge>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Highlights</h4>
          <p className="text-[13px] leading-relaxed text-foreground/90 line-clamp-4">{current.description}</p>
        </div>

        <div className="rounded-xl border border-border bg-surface p-3">
          <div className="flex items-center justify-between mb-1.5">
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Ready cover letter</h4>
            <Button size="sm" onClick={copyCover} className="h-7"><Copy className="mr-1 h-3 w-3" />Copy (C)</Button>
          </div>
          <pre className="whitespace-pre-wrap text-[12.5px] leading-relaxed max-h-40 overflow-auto">{current.coverLetter}</pre>
        </div>

        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Notes for this application</h4>
          <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="min-h-[60px] text-[13px] bg-surface" placeholder="Anything worth remembering…" />
        </div>
      </div>

      <div className="sticky bottom-4 flex flex-wrap items-center justify-center gap-2 rounded-xl border border-border bg-background/90 backdrop-blur-md p-2">
        <Button size="sm" variant="ghost" onClick={() => setIdx((i) => Math.max(0, i - 1))}><ChevronLeft className="h-4 w-4" /></Button>
        <Button size="sm" variant="outline" onClick={skip}><SkipForward className="mr-1 h-3.5 w-3.5" />Skip (S)</Button>
        <Button size="sm" variant="outline" onClick={snooze}><Clock3 className="mr-1 h-3.5 w-3.5" />Snooze</Button>
        <Button size="sm" variant="outline" onClick={markTailored}><FileEdit className="mr-1 h-3.5 w-3.5" />Tailored (R)</Button>
        <Button size="sm" onClick={apply} className="bg-brand hover:bg-brand/90 text-brand-foreground"><ExternalLink className="mr-1 h-3.5 w-3.5" />Apply (A)</Button>
        <Button size="sm" variant="ghost" onClick={advance}><ChevronRight className="h-4 w-4" /></Button>
      </div>
    </div>
  );
}
