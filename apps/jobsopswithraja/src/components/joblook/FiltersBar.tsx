import { Rows3, LayoutGrid, X, SlidersHorizontal, Sparkles, DollarSign, Clock, ArrowUpDown, Radio } from "lucide-react";
import { useUI } from "@/lib/store";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { JobFilters, JobSource, WorkMode } from "@/types/job";
import { SOURCE_LABEL } from "@/types/job";

const SKILLS = ["React", "TypeScript", "Next.js", "Node.js", "GraphQL", "PostgreSQL", "AWS", "Tailwind", "Python", "OpenAI API", "Supabase"];
const SOURCES: JobSource[] = ["linkedin", "indeed", "monster", "company_site", "greenhouse", "lever", "ashby", "adzuna", "jsearch"];
const MODES: { v: WorkMode; label: string }[] = [
  { v: "remote", label: "Remote" }, { v: "hybrid", label: "Hybrid" }, { v: "onsite", label: "On-site" },
];

function Divider() {
  return <span aria-hidden className="mx-0.5 h-5 w-px bg-border" />;
}

function ControlLabel({ icon: Icon, children }: { icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1 text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground">
      <Icon className="h-3 w-3" />
      {children}
    </span>
  );
}

export function FiltersBar() {
  const { filters, setFilters, resetFilters, view, setView } = useUI();

  const toggle = <T extends string>(list: T[] | undefined, v: T): T[] => {
    const set = new Set(list ?? []);
    set.has(v) ? set.delete(v) : set.add(v);
    return Array.from(set);
  };

  const activeCount =
    (filters.skills?.length ?? 0) +
    (filters.sources?.length ?? 0) +
    (filters.workModes?.length ?? 0) +
    (filters.minSalary ? 1 : 0) +
    (filters.visaOnly ? 1 : 0);

  return (
    <div className="sticky top-14 z-20 -mx-6 border-b border-border bg-background/80 backdrop-blur-xl px-6 py-2.5 shadow-[0_1px_0_0_var(--border)]">
      <div className="flex flex-wrap items-center gap-1.5">
        <div className="flex items-center gap-1.5 pr-1">
          <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Filters</span>
          {activeCount > 0 && (
            <Badge className="h-4 min-w-4 rounded-full bg-brand px-1 text-[10px] font-semibold text-brand-foreground">
              {activeCount}
            </Badge>
          )}
        </div>

        <Divider />

        {/* Skills */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "h-8 rounded-md bg-surface text-[12.5px] transition-colors",
                filters.skills?.length && "border-brand/50 bg-brand/5 text-foreground",
              )}
            >
              Skills{filters.skills?.length ? ` · ${filters.skills.length}` : ""}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-52">
            {SKILLS.map((s) => (
              <DropdownMenuCheckboxItem
                key={s}
                checked={filters.skills?.includes(s)}
                onCheckedChange={() => setFilters({ skills: toggle(filters.skills, s) })}
              >{s}</DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Match slider */}
        <div className="flex items-center gap-2 rounded-md border border-border bg-surface px-3 h-8 min-w-[230px] shadow-[inset_0_1px_0_0_oklch(1_0_0/0.5)]">
          <ControlLabel icon={Sparkles}>Match</ControlLabel>
          <Slider
            min={0} max={100} step={5}
            value={[filters.minMatch ?? 0, filters.maxMatch ?? 100]}
            onValueChange={(v) => setFilters({ minMatch: v[0], maxMatch: v[1] })}
            className="w-28"
          />
          <span className="tabular text-[11.5px] font-medium text-foreground">{filters.minMatch ?? 0}–{filters.maxMatch ?? 100}</span>
        </div>

        {/* Sources */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "h-8 rounded-md bg-surface text-[12.5px]",
                filters.sources?.length && "border-brand/50 bg-brand/5 text-foreground",
              )}
            >
              Sources{filters.sources?.length ? ` · ${filters.sources.length}` : ""}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            {SOURCES.map((s) => (
              <DropdownMenuCheckboxItem
                key={s}
                checked={filters.sources?.includes(s)}
                onCheckedChange={() => setFilters({ sources: toggle(filters.sources, s) })}
              >{SOURCE_LABEL[s]}</DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Work mode segmented */}
        <div className="flex items-center rounded-md border border-border bg-surface p-0.5 shadow-[inset_0_1px_0_0_oklch(1_0_0/0.5)]">
          {MODES.map((m) => {
            const on = filters.workModes?.includes(m.v);
            return (
              <button
                key={m.v}
                onClick={() => setFilters({ workModes: toggle(filters.workModes, m.v) })}
                className={cn(
                  "px-2.5 py-1 text-[11.5px] font-medium rounded transition-all",
                  on ? "bg-background text-foreground shadow-soft" : "text-muted-foreground hover:text-foreground",
                )}
              >{m.label}</button>
            );
          })}
        </div>

        <Divider />

        {/* Min salary */}
        <div className="flex items-center gap-1 rounded-md border border-border bg-surface px-2 h-8 shadow-[inset_0_1px_0_0_oklch(1_0_0/0.5)]">
          <DollarSign className="h-3 w-3 text-muted-foreground" />
          <Input
            type="number"
            value={filters.minSalary ?? ""}
            onChange={(e) => setFilters({ minSalary: e.target.value ? Number(e.target.value) : undefined })}
            placeholder="Min salary"
            className="h-6 w-24 border-0 bg-transparent px-1 text-[12px] tabular focus-visible:ring-0 placeholder:text-muted-foreground/70"
          />
        </div>

        {/* Posted within */}
        <Select value={filters.postedWithin ?? "all"} onValueChange={(v) => setFilters({ postedWithin: v as JobFilters["postedWithin"] })}>
          <SelectTrigger className="h-8 w-[120px] bg-surface text-[12.5px]">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Past 24h</SelectItem>
            <SelectItem value="3d">Past 3 days</SelectItem>
            <SelectItem value="week">Past week</SelectItem>
            <SelectItem value="all">Any time</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select value={filters.sortBy ?? "match"} onValueChange={(v) => setFilters({ sortBy: v as JobFilters["sortBy"] })}>
          <SelectTrigger className="h-8 w-[140px] bg-surface text-[12.5px]">
            <ArrowUpDown className="h-3 w-3 text-muted-foreground" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="match">Best match</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="salary">Salary</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2 ml-auto">
          {activeCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="h-8 gap-1 px-2 text-[11.5px] font-medium text-muted-foreground hover:text-foreground"
            >
              <X className="h-3 w-3" />
              Clear
            </Button>
          )}
          <label className="flex items-center gap-1.5 rounded-md border border-border bg-surface px-2 h-8 text-[12px] text-muted-foreground">
            <Radio className="h-3 w-3" />
            <span className="font-medium">Visa</span>
            <Switch checked={!!filters.visaOnly} onCheckedChange={(v) => setFilters({ visaOnly: v })} className="scale-90" />
          </label>
          <div className="flex items-center rounded-md border border-border bg-surface p-0.5 shadow-[inset_0_1px_0_0_oklch(1_0_0/0.5)]">
            <button
              onClick={() => setView("table")}
              className={cn(
                "p-1.5 rounded transition-all",
                view === "table" ? "bg-background shadow-soft text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
              title="Table view"
            ><Rows3 className="h-3.5 w-3.5" /></button>
            <button
              onClick={() => setView("cards")}
              className={cn(
                "p-1.5 rounded transition-all",
                view === "cards" ? "bg-background shadow-soft text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
              title="Card view"
            ><LayoutGrid className="h-3.5 w-3.5" /></button>
          </div>
        </div>
      </div>

      {(filters.skills?.length || filters.sources?.length || filters.workModes?.length) ? (
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {filters.skills?.map((s) => (
            <Badge key={`sk-${s}`} variant="secondary" className="rounded-full text-[10.5px] font-normal gap-1 pl-2 pr-1">
              {s}
              <button
                className="rounded-full p-0.5 hover:bg-background/60"
                onClick={() => setFilters({ skills: toggle(filters.skills, s) })}
              ><X className="h-2.5 w-2.5" /></button>
            </Badge>
          ))}
          {filters.sources?.map((s) => (
            <Badge key={`sr-${s}`} variant="secondary" className="rounded-full text-[10.5px] font-normal gap-1 pl-2 pr-1">
              {SOURCE_LABEL[s]}
              <button
                className="rounded-full p-0.5 hover:bg-background/60"
                onClick={() => setFilters({ sources: toggle(filters.sources, s) })}
              ><X className="h-2.5 w-2.5" /></button>
            </Badge>
          ))}
          {filters.workModes?.map((m) => (
            <Badge key={`wm-${m}`} variant="secondary" className="rounded-full text-[10.5px] font-normal capitalize gap-1 pl-2 pr-1">
              {m}
              <button
                className="rounded-full p-0.5 hover:bg-background/60"
                onClick={() => setFilters({ workModes: toggle(filters.workModes, m) })}
              ><X className="h-2.5 w-2.5" /></button>
            </Badge>
          ))}
        </div>
      ) : null}
    </div>
  );
}
