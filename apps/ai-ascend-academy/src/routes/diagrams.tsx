import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GitBranch, X } from "lucide-react";
import { diagrams } from "@/lib/data";
import coverDiagrams from "@/assets/cover-diagrams.jpg";

export const Route = createFileRoute("/diagrams")({
  head: () => ({
    meta: [
      { title: "Diagrams — NeuroForge" },
      { name: "description", content: "Visual library of AI / DS diagrams and flow charts." },
    ],
  }),
  component: DiagramsPage,
});

function DiagramsPage() {
  const [open, setOpen] = useState<string | null>(null);
  const active = diagrams.find((d) => d.id === open);

  return (
    <div className="p-6 md:p-10 space-y-8">
      <header className="relative overflow-hidden rounded-3xl glass-strong">
        <img src={coverDiagrams} alt="" loading="lazy" width={1024} height={768} className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.16_0.04_280)] via-[oklch(0.16_0.04_280_/_70%)] to-transparent" />
        <div className="relative p-8 md:p-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-widest text-cyan-300 ring-1 ring-white/10">
            <GitBranch className="h-3.5 w-3.5" /> Visual Vault
          </div>
          <h1 className="mt-3 text-3xl md:text-5xl font-black"><span className="gradient-text">Diagrams</span></h1>
          <p className="mt-2 text-muted-foreground max-w-xl">Every diagram in one place. Click a tile to peek inside.</p>
        </div>
      </header>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {diagrams.map((d, i) => (
          <button
            key={d.id}
            onClick={() => setOpen(d.id)}
            className="group relative aspect-square overflow-hidden rounded-2xl glass border border-white/10 hover:border-fuchsia-400/40 hover:-translate-y-1 hover:shadow-[var(--shadow-glow)] transition-all p-5 text-left"
          >
            <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full gradient-aurora opacity-40 blur-2xl group-hover:opacity-70 transition" />
            <div className="relative h-full flex flex-col justify-between">
              <div className="text-[10px] uppercase tracking-widest text-cyan-300">{d.category}</div>
              <div>
                <div className="text-3xl mb-2">{["🧠","🤖","📚","⚙️","🖼️","📉","🌳","🧩"][i % 8]}</div>
                <div className="font-bold leading-tight">{d.title}</div>
                <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{d.description}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/70 backdrop-blur-lg" onClick={() => setOpen(null)}>
          <div className="relative w-full max-w-2xl rounded-3xl glass-strong border border-white/15 p-8" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setOpen(null)} className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/5 grid place-items-center hover:bg-white/10">
              <X className="h-4 w-4" />
            </button>
            <div className="text-xs uppercase tracking-widest text-cyan-300">{active.category}</div>
            <h2 className="mt-1 text-2xl font-bold gradient-text">{active.title}</h2>
            <p className="mt-2 text-muted-foreground">{active.description}</p>
            <div className="mt-6 aspect-[16/10] rounded-2xl border border-dashed border-white/15 grid place-items-center text-muted-foreground">
              Drop the actual diagram image / SVG here.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
