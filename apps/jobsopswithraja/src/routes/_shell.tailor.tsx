import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useMemo, useEffect } from "react";
import { getJobs, generateResumeSuggestions, updateJobStatus } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UploadCloud, Copy, Download, Sparkles, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { CompanyMark } from "@/components/joblook/CompanyMark";
import { MatchRing } from "@/components/joblook/MatchRing";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_shell/tailor")({
  component: TailorPage,
});

const BASE_BULLETS = [
  "Built internal analytics dashboard used by ops team",
  "Improved React app performance",
  "Led a team of engineers on the platform",
  "Owned frontend architecture across products",
  "Shipped design system used across the org",
  "Prototyped LLM-powered features for support workflows",
];

function TailorPage() {
  const { data: jobs = [] } = useQuery({ queryKey: ["jobs", "tailor"], queryFn: () => getJobs({}) });
  const eligible = useMemo(
    () =>
      jobs
        .filter((j) => ["to_apply", "resume_tailored", "saved", "new_match"].includes(j.status))
        .sort((a, b) => b.matchScore - a.matchScore),
    [jobs],
  );
  const [selectedId, setSelectedId] = useState<string>("");
  useEffect(() => {
    if (!selectedId && eligible.length) setSelectedId(eligible[0].id);
  }, [eligible, selectedId]);
  const job = jobs.find((j) => j.id === selectedId) ?? eligible[0];
  const qc = useQueryClient();

  const genMut = useMutation({
    mutationFn: () => generateResumeSuggestions(job!.id),
    onSuccess: () => { toast.success("Suggestions refreshed"); qc.invalidateQueries({ queryKey: ["jobs"] }); },
  });

  const tailoredMut = useMutation({
    mutationFn: () => updateJobStatus(job!.id, "resume_tailored"),
    onSuccess: () => { toast.success("Marked as Resume Tailored"); qc.invalidateQueries({ queryKey: ["jobs"] }); },
  });

  if (!job) return <div className="p-10 text-center text-muted-foreground">Loading roles…</div>;

  const gapScore = Math.round((job.matchedSkills.length / Math.max(1, job.requiredSkills.length)) * 100);


  return (
    <div className="px-6 pt-5 pb-10">
      <div className="mb-4">
        <h1 className="font-display text-[22px] font-semibold tracking-tight">Resume Tailor</h1>
        <p className="text-[13px] text-muted-foreground">Reshape your resume for one role at a time. Copy the diff, ship the version.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)_360px]">
        {/* Left */}
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Base resume</h4>
            <Select defaultValue="v1">
              <SelectTrigger className="h-8 text-[12.5px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="v1">raja-resume.pdf</SelectItem>
                <SelectItem value="v2">raja-resume-ai.pdf</SelectItem>
                <SelectItem value="v3">raja-resume-fullstack.pdf</SelectItem>
              </SelectContent>
            </Select>
            <label className="mt-3 flex flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-border bg-surface p-4 text-center text-[11.5px] text-muted-foreground cursor-pointer hover:bg-accent/40">
              <UploadCloud className="h-4 w-4" />
              Drop new resume PDF
            </label>

          </div>
          <div className="rounded-xl border border-border bg-card p-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Current bullets</h4>
            <ul className="space-y-1.5 text-[12.5px] text-foreground/90">
              {BASE_BULLETS.map((b) => <li key={b} className="flex gap-1.5"><span className="text-muted-foreground">•</span>{b}</li>)}
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-card p-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Target role</h4>
            <Select value={selectedId || job.id} onValueChange={setSelectedId}>
              <SelectTrigger className="h-8 text-[12.5px]"><SelectValue placeholder="Choose a role" /></SelectTrigger>
              <SelectContent>
                {eligible.map((j) => <SelectItem key={j.id} value={j.id}>{j.title} · {j.company} · {j.matchScore}%</SelectItem>)}
              </SelectContent>
            </Select>

          </div>
        </div>

        {/* Center */}
        <div className="rounded-xl border border-border bg-card p-5 space-y-4">
          <div className="flex items-start gap-3">
            <CompanyMark name={job.company} size={40} />
            <div className="flex-1">
              <div className="font-display font-semibold text-[16px] leading-tight">{job.title}</div>
              <div className="text-[12.5px] text-muted-foreground">{job.company} · {job.location}</div>
            </div>
            <MatchRing value={job.matchScore} size={44} />
          </div>
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Required skills</h4>
            <div className="flex flex-wrap gap-1.5">
              {job.requiredSkills.map((s) => (
                <Badge key={s} variant={job.matchedSkills.includes(s) ? "default" : "outline"} className={cn("rounded-full text-[11px]", job.matchedSkills.includes(s) ? "bg-emerald-accent/12 text-emerald-accent border border-emerald-accent/30 hover:bg-emerald-accent/12" : "border-dashed text-muted-foreground")}>
                  {s}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Missing keywords</h4>
            <div className="flex flex-wrap gap-1.5">
              {job.missingSkills.map((s) => <Badge key={s} className="rounded-full bg-brand/10 text-brand border border-brand/20 hover:bg-brand/10">+ {s}</Badge>)}
              {!job.missingSkills.length && <span className="text-[12px] text-muted-foreground">No gaps 🎯</span>}
            </div>
          </div>
          <div className="rounded-lg border border-border bg-surface p-3">
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-muted-foreground">Keyword gap score</span>
              <span className="tabular font-semibold" style={{ color: gapScore >= 80 ? "var(--emerald-accent)" : gapScore >= 60 ? "var(--amber-accent)" : "var(--rose-accent)" }}>{gapScore}%</span>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="rounded-xl border border-border bg-card p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-[12.5px] font-semibold">Tailored version</h4>
            <Button size="sm" variant="ghost" onClick={() => genMut.mutate()} disabled={genMut.isPending} className="h-7 text-[11.5px]">
              <Sparkles className="mr-1 h-3 w-3" />Regenerate
            </Button>
          </div>
          {job.resumeSuggestions?.summary && (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">Professional summary</div>
              <p className="text-[12.5px] leading-relaxed rounded-lg border border-border bg-surface p-2.5">{job.resumeSuggestions.summary}</p>
            </div>
          )}
          <div className="space-y-2">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Before → After</div>
            {job.resumeSuggestions?.bulletRewrites.map((b, i) => (
              <div key={i} className="rounded-lg border border-border bg-surface p-2.5 text-[12px]">
                <div className="text-muted-foreground line-through decoration-muted-foreground/40">{b.original}</div>
                <div className="mt-1 font-medium">→ {b.improved}</div>
                <div className="mt-1 text-[11px] text-brand">{b.reason}</div>
              </div>
            ))}
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Keywords to add</div>
            <div className="flex flex-wrap gap-1.5">
              {job.resumeSuggestions?.keywordsToAdd.map((k) => <Badge key={k} variant="secondary" className="rounded-full font-normal">{k}</Badge>)}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
            <Button size="sm" variant="outline" onClick={() => { navigator.clipboard.writeText((job.resumeSuggestions?.bulletRewrites ?? []).map((b) => "• " + b.improved).join("\n")); toast.success("Bullets copied"); }}><Copy className="mr-1 h-3 w-3" />Copy bullets</Button>
            <Button size="sm" variant="outline" onClick={() => toast("Export coming soon")}><Download className="mr-1 h-3 w-3" />Export</Button>
            <Button size="sm" onClick={() => tailoredMut.mutate()} className="bg-brand hover:bg-brand/90 text-brand-foreground"><CheckCircle2 className="mr-1 h-3 w-3" />Mark tailored</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
