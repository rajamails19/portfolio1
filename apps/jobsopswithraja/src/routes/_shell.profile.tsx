import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { UploadCloud, RefreshCw, Plug, PlugZap, X } from "lucide-react";
import { toast } from "sonner";
import type { Profile } from "@/types/job";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_shell/profile")({
  component: ProfilePage,
});

function ChipList({ items, onChange, placeholder }: { items: string[]; onChange: (v: string[]) => void; placeholder: string }) {
  const [input, setInput] = useState("");
  return (
    <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-border bg-surface p-2 min-h-[42px]">
      {items.map((it) => (
        <Badge key={it} variant="secondary" className="rounded-full font-normal">
          {it}
          <button className="ml-1 opacity-60 hover:opacity-100" onClick={() => onChange(items.filter((x) => x !== it))}><X className="h-3 w-3" /></button>
        </Badge>
      ))}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === ",") && input.trim()) {
            e.preventDefault();
            if (!items.includes(input.trim())) onChange([...items, input.trim()]);
            setInput("");
          }
        }}
        placeholder={placeholder}
        className="flex-1 min-w-[120px] bg-transparent text-[12.5px] outline-none placeholder:text-muted-foreground"
      />
    </div>
  );
}

function ProfilePage() {
  const { data } = useQuery({ queryKey: ["profile"], queryFn: getProfile });
  const qc = useQueryClient();
  const mut = useMutation({
    mutationFn: (patch: Partial<Profile>) => updateProfile(patch),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["profile"] }); toast.success("Profile saved"); },
  });

  const [local, setLocal] = useState<Profile | null>(null);
  useEffect(() => { if (data) setLocal(data); }, [data]);
  if (!local) return <div className="p-10 text-muted-foreground text-sm">Loading…</div>;
  const set = <K extends keyof Profile>(k: K, v: Profile[K]) => setLocal({ ...local, [k]: v });

  return (
    <div className="px-6 pt-5 pb-10 space-y-6 max-w-5xl">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-[22px] font-semibold tracking-tight">Profile</h1>
          <p className="text-[13px] text-muted-foreground">The signal we use to rank and tailor.</p>
        </div>
        <Button onClick={() => mut.mutate(local)} disabled={mut.isPending} className="bg-brand hover:bg-brand/90 text-brand-foreground">Save changes</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <section className="rounded-xl border border-border bg-card p-4 space-y-3">
          <h3 className="text-[12.5px] font-semibold">Search preferences</h3>
          <div>
            <label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Target roles</label>
            <ChipList items={local.targetRoles} onChange={(v) => set("targetRoles", v)} placeholder="Add role, press Enter" />
          </div>
          <div>
            <label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Target keywords</label>
            <ChipList items={local.targetKeywords} onChange={(v) => set("targetKeywords", v)} placeholder="React, Next.js…" />
          </div>
          <div>
            <label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Preferred locations</label>
            <ChipList items={local.preferredLocations} onChange={(v) => set("preferredLocations", v)} placeholder="Remote, NYC…" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Salary expectation</label>
              <Input type="number" value={local.salaryExpectation} onChange={(e) => set("salaryExpectation", Number(e.target.value))} className="mt-1 h-9 text-[13px] tabular" />
            </div>
            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-2 text-[12.5px]">
                <Switch checked={local.visaSponsorship} onCheckedChange={(v) => set("visaSponsorship", v)} />
                Needs visa sponsorship
              </label>
            </div>
          </div>
          <div className="flex gap-1.5">
            {(["remote", "hybrid", "onsite"] as const).map((m) => {
              const on = local.workModePreference.includes(m);
              return (
                <button key={m} onClick={() => set("workModePreference", on ? local.workModePreference.filter((x) => x !== m) : [...local.workModePreference, m])}
                  className={cn("rounded-full px-3 py-1 text-[11.5px] font-medium border transition-colors capitalize", on ? "bg-brand text-brand-foreground border-brand" : "border-border text-muted-foreground hover:text-foreground")}
                >{m}</button>
              );
            })}
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-4 space-y-3">
          <h3 className="text-[12.5px] font-semibold">Resume & skills</h3>
          <div>
            <label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">My skills</label>
            <ChipList items={local.skills} onChange={(v) => set("skills", v)} placeholder="Add skill" />
          </div>
          <label className="flex flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-border bg-surface p-5 text-center text-[12px] text-muted-foreground cursor-pointer hover:bg-accent/40">
            <UploadCloud className="h-5 w-5" />
            <span>{local.resumeFileName ?? "Drop resume PDF here"}</span>
          </label>
          <div>
            <label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Base resume summary</label>
            <Textarea value={local.baseSummary} onChange={(e) => set("baseSummary", e.target.value)} className="mt-1 min-h-[100px] text-[13px] bg-surface" />
          </div>
        </section>
      </div>

      <section className="rounded-xl border border-border bg-card p-4">
        <h3 className="text-[12.5px] font-semibold mb-3">Data sources</h3>
        <div className="grid gap-2 md:grid-cols-2">
          {local.dataSources.map((ds) => (
            <div key={ds.source} className="flex items-center gap-3 rounded-lg border border-border bg-surface p-3">
              <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg", ds.connected ? "bg-emerald-accent/12 text-emerald-accent" : "bg-muted text-muted-foreground")}>
                {ds.connected ? <PlugZap className="h-4 w-4" /> : <Plug className="h-4 w-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="font-medium text-[13px]">{ds.label}</div>
                  <Badge variant="outline" className={cn("rounded-full text-[10px] font-normal", ds.connected ? "border-emerald-accent/40 text-emerald-accent" : "text-muted-foreground")}>
                    {ds.connected ? "Connected" : "Disconnected"}
                  </Badge>
                </div>
                {ds.requiresApiKey && (
                  <Input defaultValue={ds.apiKeyMasked ?? ""} placeholder="API key" type="password" className="mt-1.5 h-7 text-[12px] bg-background" />
                )}
                <div className="mt-1 text-[11px] text-muted-foreground">{ds.lastSync ? `Last sync ${ds.lastSync}` : "Never synced"}</div>
              </div>
              <Button size="sm" variant="ghost" className="h-7" onClick={() => toast("Sync started")}><RefreshCw className="h-3.5 w-3.5" /></Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
