import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import heroInterview from "@/assets/hero-interview.jpg";
import { SectionHero } from "@/components/SectionHero";
import { interviewQAs } from "@/lib/content";
import { Star, ChevronDown, Clock, ImageIcon, Search } from "lucide-react";

export const Route = createFileRoute("/interview")({
  head: () => ({ meta: [{ title: "Interview Arena — Aetheria" }, { name: "description", content: "Filter & sort interview questions like a marketplace." }] }),
  component: InterviewPage,
});

type SortKey = "importance" | "shortest" | "longest" | "diagrams";

function InterviewPage() {
  const [topic, setTopic] = useState<string>("All");
  const [difficulty, setDifficulty] = useState<string>("All");
  const [sort, setSort] = useState<SortKey>("importance");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(null);

  const topics = useMemo(() => ["All", ...Array.from(new Set(interviewQAs.map((q) => q.topic)))], []);
  const difficulties = ["All", "Easy", "Medium", "Hard"];

  const list = useMemo(() => {
    let l = interviewQAs.slice();
    if (topic !== "All") l = l.filter((q) => q.topic === topic);
    if (difficulty !== "All") l = l.filter((q) => q.difficulty === difficulty);
    if (query) {
      const s = query.toLowerCase();
      l = l.filter((q) => q.question.toLowerCase().includes(s) || q.answer.toLowerCase().includes(s));
    }
    switch (sort) {
      case "importance": l.sort((a, b) => b.importance - a.importance); break;
      case "shortest": l.sort((a, b) => a.minutes - b.minutes); break;
      case "longest": l.sort((a, b) => b.minutes - a.minutes); break;
      case "diagrams": l.sort((a, b) => Number(b.hasDiagram) - Number(a.hasDiagram)); break;
    }
    return l;
  }, [topic, difficulty, sort, query]);

  return (
    <div>
      <SectionHero
        image={heroInterview}
        eyebrow="Realm 3 of 5 · The Arena"
        title="Interview Arena"
        subtitle="Filter by importance, length, diagrams. Sort the way you want — sharpest blade first."
      />

      <section className="mx-auto max-w-6xl px-6 py-12">
        {/* filter bar */}
        <div className="rounded-2xl border border-[oklch(0.85_0.14_85/0.2)] bg-gradient-to-b from-[oklch(0.22_0.04_270/0.7)] to-[oklch(0.16_0.03_270/0.85)] backdrop-blur-md p-4 shadow-cinematic">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search questions…"
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[oklch(0.14_0.03_270/0.7)] border border-[oklch(0.85_0.14_85/0.15)] text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[oklch(0.85_0.14_85/0.4)]"
              />
            </div>
            <Select value={topic} onChange={setTopic} options={topics} label="Topic" />
            <Select value={difficulty} onChange={setDifficulty} options={difficulties} label="Difficulty" />
            <Select
              value={sort}
              onChange={(v) => setSort(v as SortKey)}
              options={["importance", "shortest", "longest", "diagrams"]}
              labelMap={{ importance: "Most important", shortest: "Shortest first", longest: "Longest first", diagrams: "With diagrams" }}
              label="Sort"
            />
          </div>
          <div className="mt-3 text-xs text-muted-foreground font-serif italic">
            {list.length} {list.length === 1 ? "question" : "questions"} matching
          </div>
        </div>

        {/* list */}
        <div className="mt-8 space-y-4">
          {list.map((q) => {
            const isOpen = open === q.id;
            return (
              <article key={q.id} className="rounded-2xl border border-[oklch(0.85_0.14_85/0.18)] bg-gradient-to-b from-[oklch(0.22_0.04_270/0.7)] to-[oklch(0.16_0.03_270/0.85)] backdrop-blur-sm overflow-hidden">
                <button onClick={() => setOpen(isOpen ? null : q.id)} className="w-full text-left px-6 py-5 flex items-start gap-4 hover:bg-[oklch(0.85_0.14_85/0.05)] transition-colors">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="ember-chip">{q.topic}</span>
                      <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-[oklch(0.14_0.03_270/0.7)] border border-[oklch(0.85_0.14_85/0.15)] text-muted-foreground">
                        {q.difficulty}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[oklch(0.85_0.14_85)]">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < q.importance ? "fill-[oklch(0.85_0.14_85)]" : "opacity-30"}`} />
                        ))}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><Clock className="w-3 h-3" /> {q.minutes} min</span>
                      {q.hasDiagram && (
                        <span className="inline-flex items-center gap-1 text-xs text-[oklch(0.78_0.16_165)]"><ImageIcon className="w-3 h-3" /> diagram</span>
                      )}
                    </div>
                    <h3 className="font-display text-xl text-foreground">{q.question}</h3>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-[oklch(0.85_0.14_85)] mt-2 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <div className={`grid transition-[grid-template-rows] duration-400 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 font-serif italic text-foreground/85 leading-relaxed border-t border-[oklch(0.85_0.14_85/0.12)] pt-4">{q.answer}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function Select<T extends string>({ value, onChange, options, label, labelMap }: { value: T; onChange: (v: T) => void; options: readonly T[]; label: string; labelMap?: Record<string, string> }) {
  return (
    <label className="relative inline-flex items-center">
      <span className="absolute left-3 text-[10px] uppercase tracking-widest text-muted-foreground pointer-events-none top-1">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="appearance-none pl-3 pr-8 pt-5 pb-1.5 rounded-full bg-[oklch(0.14_0.03_270/0.7)] border border-[oklch(0.85_0.14_85/0.15)] text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[oklch(0.85_0.14_85/0.4)] min-w-[170px]"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-[oklch(0.16_0.03_270)]">{labelMap?.[o] ?? o}</option>
        ))}
      </select>
      <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-[oklch(0.85_0.14_85)] pointer-events-none" />
    </label>
  );
}
