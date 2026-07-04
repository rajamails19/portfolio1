import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import heroDiagrams from "@/assets/hero-diagrams.jpg";
import { SectionHero } from "@/components/SectionHero";
import { diagrams } from "@/lib/content";

export const Route = createFileRoute("/diagrams")({
  head: () => ({ meta: [{ title: "Atlas of Diagrams — Aetheria" }, { name: "description", content: "Every architecture, flow, and math diagram in one cinematic gallery." }] }),
  component: DiagramsPage,
});

const categories = ["All", "Architecture", "Flow", "Math", "System"] as const;

function DiagramsPage() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const filtered = cat === "All" ? diagrams : diagrams.filter((d) => d.category === cat);

  return (
    <div>
      <SectionHero
        image={heroDiagrams}
        eyebrow="Realm 4 of 5 · The Observatory"
        title="Atlas of Diagrams"
        subtitle="Every architecture, every flow — projected on the walls of the great observatory."
      />

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                cat === c
                  ? "bg-gradient-to-r from-[oklch(0.72_0.19_45)] to-[oklch(0.85_0.14_85)] text-[oklch(0.16_0.03_270)] shadow-glow"
                  : "border border-[oklch(0.85_0.14_85/0.25)] text-foreground/80 hover:bg-[oklch(0.85_0.14_85/0.08)]"
              }`}
            >{c}</button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((d) => (
            <div key={d.id} className="flip-card h-80">
              <div className="flip-inner w-full h-full">
                {/* front */}
                <div className="flip-face cinematic-card relative">
                  <img src={d.image} alt={d.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                  <div className="card-content absolute inset-0 flex flex-col justify-end p-5">
                    <span className="ember-chip mb-2 w-fit">{d.category}</span>
                    <h3 className="font-display text-2xl text-gradient-ember drop-shadow-[0_4px_18px_rgba(0,0,0,0.7)]">{d.title}</h3>
                  </div>
                </div>
                {/* back */}
                <div className="flip-face flip-back bg-gradient-to-b from-[oklch(0.22_0.06_280)] to-[oklch(0.12_0.03_270)] p-6 flex flex-col justify-center text-center shadow-cinematic">
                  <span className="ember-chip mx-auto mb-3">{d.category}</span>
                  <h3 className="font-display text-2xl text-gradient-ember">{d.title}</h3>
                  <p className="font-serif italic text-foreground/80 mt-3">{d.caption}</p>
                  <p className="mt-4 text-xs text-muted-foreground uppercase tracking-widest">Detailed view coming soon</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
