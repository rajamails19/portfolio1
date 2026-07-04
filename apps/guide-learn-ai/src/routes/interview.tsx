import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { QUESTIONS } from "@/lib/data";
import mascotInterview from "@/assets/mascot-interview.jpg";
import { useMemo, useState } from "react";
import { ChevronDown, Filter, Star, Sparkles, Check, Flame } from "lucide-react";

export const Route = createFileRoute("/interview")({
  head: () => ({ meta: [{ title: "Interview Q&A — NeuroNext" }] }),
  component: InterviewPage,
});

type Sort = "importance" | "shortest" | "longest" | "diagrams";

function InterviewPage() {
  const [difficulty, setDifficulty] = useState<"All" | "Easy" | "Medium" | "Hard">("All");
  const [tag, setTag] = useState<string>("All");
  const [sort, setSort] = useState<Sort>("importance");
  const [open, setOpen] = useState<number | null>(QUESTIONS[0].id);
  const [mastered, setMastered] = useState<Set<number>>(new Set());

  const tags = Array.from(new Set(QUESTIONS.flatMap((q) => q.tags)));
  const filtered = useMemo(() => {
    let xs = QUESTIONS.slice();
    if (difficulty !== "All") xs = xs.filter((q) => q.difficulty === difficulty);
    if (tag !== "All") xs = xs.filter((q) => q.tags.includes(tag));
    if (sort === "importance") xs.sort((a, b) => b.importance - a.importance);
    if (sort === "shortest") xs.sort((a, b) => a.a.length - b.a.length);
    if (sort === "longest") xs.sort((a, b) => b.a.length - a.a.length);
    if (sort === "diagrams") xs = xs.filter((q) => q.hasDiagram);
    return xs;
  }, [difficulty, tag, sort]);

  const toggleMastered = (id: number) => {
    setMastered((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };
  const progress = Math.round((mastered.size / QUESTIONS.length) * 100);

  return (
    <AppShell>
      {/* Animated ambient background */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 -left-20 w-[420px] h-[420px] rounded-full opacity-50 blur-3xl grad-aurora animate-blob" />
        <div className="absolute top-40 -right-20 w-[380px] h-[380px] rounded-full opacity-40 blur-3xl grad-ocean animate-blob" style={{ animationDelay: "-6s" }} />
        <div className="absolute bottom-0 left-1/3 w-[460px] h-[460px] rounded-full opacity-40 blur-3xl grad-peach animate-blob" style={{ animationDelay: "-12s" }} />
        {Array.from({ length: 16 }).map((_, i) => (
          <Sparkles
            key={i}
            size={8 + (i % 4) * 4}
            className="absolute text-white/70 animate-twinkle"
            style={{
              top: `${(i * 53) % 95}%`,
              left: `${(i * 37) % 95}%`,
              animationDelay: `${(i % 5) * 0.6}s`,
            }}
          />
        ))}
      </div>

      <PageHeader
        eyebrow="Crush the interview"
        title={<><span className="text-grad">Interview</span> Q&A</>}
        subtitle="Filter like Carvana — by difficulty, tag, length or diagrams. Tap a card to peek the answer, hit ✓ to mark mastered."
        mascotSrc={mascotInterview}
        gradient="grad-ocean"
      />

      {/* Stat strip — progress ring + counts */}
      <div className="glass rounded-3xl p-4 mb-4 flex flex-wrap items-center gap-5">
        <div className="flex items-center gap-3">
          <div
            className="ring-conic rounded-full grid place-items-center shadow"
            style={{ width: 52, height: 52, ['--p' as any]: `${progress}%` }}
          >
            <div className="bg-white rounded-full w-[40px] h-[40px] grid place-items-center text-[11px] font-black text-grad">
              {progress}%
            </div>
          </div>
          <div className="text-xs leading-tight">
            <div className="font-black text-base">{mastered.size}<span className="text-muted-foreground font-semibold">/{QUESTIONS.length}</span></div>
            <div className="text-muted-foreground">mastered</div>
          </div>
        </div>
        <Stat label="Showing" value={filtered.length} grad="grad-mint" />
        <Stat label="Hard" value={QUESTIONS.filter(q => q.difficulty === "Hard").length} grad="grad-sunset" icon={<Flame size={12} />} />
        <Stat label="With diagrams" value={QUESTIONS.filter(q => q.hasDiagram).length} grad="grad-ocean" />
        <div className="ml-auto hidden md:flex items-center gap-2 text-[11px] text-muted-foreground">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Live study session
        </div>
      </div>

      {/* Filters */}
      <div className="glass rounded-3xl p-4 mb-5 grid md:grid-cols-4 gap-3">
        <Pill label="Difficulty" icon={<Filter size={14} />}>
          {(["All", "Easy", "Medium", "Hard"] as const).map((d) => (
            <Chip key={d} active={difficulty === d} onClick={() => setDifficulty(d)}>{d}</Chip>
          ))}
        </Pill>
        <Pill label="Tag">
          <Chip active={tag === "All"} onClick={() => setTag("All")}>All</Chip>
          {tags.map((t) => (
            <Chip key={t} active={tag === t} onClick={() => setTag(t)}>{t}</Chip>
          ))}
        </Pill>
        <Pill label="Sort">
          {(["importance", "shortest", "longest"] as Sort[]).map((s) => (
            <Chip key={s} active={sort === s} onClick={() => setSort(s)}>{s}</Chip>
          ))}
        </Pill>
        <Pill label="View">
          <Chip active={sort === "diagrams"} onClick={() => setSort(sort === "diagrams" ? "importance" : "diagrams")}>
            With diagrams only
          </Chip>
        </Pill>
      </div>

      <div className="text-xs text-muted-foreground mb-3 px-1">{filtered.length} questions</div>

      <div className="space-y-3">
        {filtered.map((q, i) => {
          const isOpen = open === q.id;
          const diffColor =
            q.difficulty === "Easy" ? "grad-mint" : q.difficulty === "Medium" ? "grad-peach" : "grad-sunset";
          const isM = mastered.has(q.id);
          return (
            <div
              key={q.id}
              className="group relative glass rounded-2xl overflow-hidden animate-slide-up transition hover:-translate-y-0.5 hover:shadow-glow"
              style={{ animationDelay: `${i * 35}ms` }}
            >
              {/* Animated gradient hover sheen */}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 -z-0">
                <div className="absolute inset-0 grad-aurora animate-gradient opacity-30" />
              </div>
              {/* Left accent bar */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${diffColor}`} />

              <button
                onClick={() => setOpen(isOpen ? null : q.id)}
                className="relative w-full flex items-center gap-3 p-4 pl-5 text-left"
              >
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${diffColor} text-white shadow`}>
                  {q.difficulty}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold flex items-center gap-2">
                    <span className="text-muted-foreground/50 font-mono text-[11px]">Q{String(i + 1).padStart(2, "0")}</span>
                    {q.q}
                  </div>
                  <div className="text-[11px] text-muted-foreground flex gap-1.5 items-center mt-1 flex-wrap">
                    {q.tags.map((t) => (
                      <span key={t} className="px-1.5 py-0.5 rounded-md bg-white/60">{t}</span>
                    ))}
                    {q.hasDiagram && <span className="px-1.5 py-0.5 rounded-md bg-white/60">📊 diagram</span>}
                  </div>
                </div>
                <div className="hidden sm:flex">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} size={12} className={k < q.importance ? "text-amber-500 fill-amber-500" : "text-muted-foreground/30"} />
                  ))}
                </div>
                <span
                  onClick={(e) => { e.stopPropagation(); toggleMastered(q.id); }}
                  role="button"
                  className={`w-7 h-7 grid place-items-center rounded-full transition ${isM ? "grad-mint text-white scale-110" : "bg-white/60 text-muted-foreground hover:bg-white"}`}
                  title="Mark mastered"
                >
                  <Check size={14} />
                </span>
                <ChevronDown size={18} className={`transition ${isOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`grid transition-[grid-template-rows] duration-500 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <div className="relative px-5 pb-4 pt-1 text-sm text-foreground/85 leading-relaxed">
                    <div className="border-l-2 border-dashed border-primary/40 pl-3 italic">
                      {q.a}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}

function Stat({ label, value, grad, icon }: { label: string; value: number; grad: string; icon?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-9 h-9 rounded-xl ${grad} grid place-items-center text-white shadow font-black text-sm`}>
        {icon ?? value}
      </div>
      <div className="text-xs leading-tight">
        <div className="font-black text-base">{value}</div>
        <div className="text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

function Pill({ label, icon, children }: { label: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1">
        {icon}{label}
      </div>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}
function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={[
        "text-xs px-2.5 py-1 rounded-full font-semibold transition",
        active ? "grad-primary text-white shadow" : "bg-white/60 text-foreground/70 hover:bg-white/80",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
