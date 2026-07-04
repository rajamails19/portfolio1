import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MessageCircleQuestion, Search, Star, GitBranch, ArrowDownNarrowWide, ArrowUpNarrowWide } from "lucide-react";
import { Input } from "@/components/ui/input";
import { qas } from "@/lib/data";
import coverInterview from "@/assets/cover-interview.jpg";

export const Route = createFileRoute("/interview")({
  head: () => ({
    meta: [
      { title: "Interview Q&A — NeuroForge" },
      { name: "description", content: "Sortable, filterable AI / DS interview questions and answers." },
    ],
  }),
  component: InterviewPage,
});

type Sort = "importance" | "shortest" | "longest";

const lenScore = { short: 1, medium: 2, long: 3 } as const;

function InterviewPage() {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("importance");
  const [onlyDiagram, setOnlyDiagram] = useState(false);
  const [minImp, setMinImp] = useState(0);
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  const list = useMemo(() => {
    let r = qas.filter((x) => (x.question + x.answer).toLowerCase().includes(q.toLowerCase()));
    if (onlyDiagram) r = r.filter((x) => x.hasDiagram);
    if (minImp) r = r.filter((x) => x.importance >= minImp);
    r = [...r].sort((a, b) => {
      if (sort === "importance") return b.importance - a.importance;
      if (sort === "shortest") return lenScore[a.length] - lenScore[b.length];
      return lenScore[b.length] - lenScore[a.length];
    });
    return r;
  }, [q, sort, onlyDiagram, minImp]);

  return (
    <div className="p-6 md:p-10 space-y-8">
      <header className="relative overflow-hidden rounded-3xl glass-strong">
        <img src={coverInterview} alt="" loading="lazy" width={1024} height={768} className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.16_0.04_280)] via-[oklch(0.16_0.04_280_/_70%)] to-transparent" />
        <div className="relative p-8 md:p-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-widest text-cyan-300 ring-1 ring-white/10">
            <MessageCircleQuestion className="h-3.5 w-3.5" /> Interview Arena
          </div>
          <h1 className="mt-3 text-3xl md:text-5xl font-black"><span className="gradient-text">Interview Q&A</span></h1>
          <p className="mt-2 text-muted-foreground max-w-xl">Tap a card to flip it. Filter and sort like you're shopping for the right answer.</p>
        </div>
      </header>

      {/* Filter bar */}
      <div className="glass rounded-2xl p-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search questions..." className="pl-10 bg-white/5 border-white/10 h-10 rounded-full" />
        </div>

        <Chip active={sort === "importance"} onClick={() => setSort("importance")} icon={<Star className="h-3.5 w-3.5" />}>Most Important</Chip>
        <Chip active={sort === "shortest"} onClick={() => setSort("shortest")} icon={<ArrowUpNarrowWide className="h-3.5 w-3.5" />}>Shortest → Longest</Chip>
        <Chip active={sort === "longest"} onClick={() => setSort("longest")} icon={<ArrowDownNarrowWide className="h-3.5 w-3.5" />}>Longest → Shortest</Chip>
        <Chip active={onlyDiagram} onClick={() => setOnlyDiagram((v) => !v)} icon={<GitBranch className="h-3.5 w-3.5" />}>With Diagrams</Chip>

        <div className="flex items-center gap-1 ml-auto">
          <span className="text-xs text-muted-foreground mr-1">Min ★</span>
          {[0, 1, 2, 3].map((n) => (
            <button
              key={n}
              onClick={() => setMinImp(n)}
              className={`h-8 w-8 rounded-full text-xs font-bold ${minImp === n ? "gradient-aurora text-white" : "bg-white/5 text-muted-foreground hover:bg-white/10"}`}
            >
              {n === 0 ? "All" : n}
            </button>
          ))}
        </div>
      </div>

      <div className="text-xs text-muted-foreground">{list.length} question{list.length === 1 ? "" : "s"}</div>

      <div className="grid md:grid-cols-2 gap-5 perspective">
        {list.map((item) => {
          const isFlip = !!flipped[item.id];
          return (
            <div key={item.id} className="relative min-h-[220px]" style={{ perspective: "1200px" }}>
              <div className={`flip-card relative h-full w-full ${isFlip ? "flipped" : ""}`}>
                {/* FRONT */}
                <button
                  onClick={() => setFlipped((s) => ({ ...s, [item.id]: true }))}
                  className="flip-face absolute inset-0 rounded-3xl glass border border-white/10 p-6 text-left hover:border-fuchsia-400/40 hover:shadow-[var(--shadow-glow)] transition-all"
                >
                  <div className="flex items-center gap-2">
                    <Stars n={item.importance} />
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{item.length}</span>
                    {item.hasDiagram && <span className="text-[10px] uppercase tracking-widest text-cyan-300 inline-flex items-center gap-1"><GitBranch className="h-3 w-3" /> diagram</span>}
                  </div>
                  <h3 className="mt-3 text-lg font-bold leading-snug">{item.question}</h3>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {item.tags.map((t) => (
                      <span key={t} className="text-[10px] uppercase tracking-widest rounded-full bg-white/5 px-2 py-0.5 ring-1 ring-white/10">{t}</span>
                    ))}
                  </div>
                  <div className="absolute bottom-4 right-5 text-xs gradient-text font-semibold">Tap to flip →</div>
                </button>
                {/* BACK */}
                <button
                  onClick={() => setFlipped((s) => ({ ...s, [item.id]: false }))}
                  className="flip-face flip-back absolute inset-0 rounded-3xl glass-strong border border-fuchsia-400/30 p-6 text-left ring-neon"
                >
                  <div className="text-xs uppercase tracking-widest text-cyan-300 mb-2">Answer</div>
                  <p className="text-sm leading-relaxed">{item.answer}</p>
                  <div className="absolute bottom-4 right-5 text-xs text-muted-foreground">← Tap to flip back</div>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 3 }).map((_, i) => (
        <Star key={i} className={`h-3.5 w-3.5 ${i < n ? "fill-fuchsia-400 text-fuchsia-400" : "text-white/20"}`} />
      ))}
    </div>
  );
}

function Chip({ active, onClick, icon, children }: { active: boolean; onClick: () => void; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition ${
        active ? "gradient-aurora text-white shadow-[var(--shadow-glow)]" : "bg-white/5 text-muted-foreground hover:bg-white/10 ring-1 ring-white/10"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}
