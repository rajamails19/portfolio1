import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { DIAGRAMS } from "@/lib/data";
import mascotDiagrams from "@/assets/mascot-diagrams.jpg";

export const Route = createFileRoute("/diagrams")({
  head: () => ({ meta: [{ title: "Diagrams — NeuroNext" }] }),
  component: DiagramsPage,
});

function DiagramsPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Visual library"
        title={<><span className="text-grad">Diagrams</span> & architectures</>}
        subtitle="A growing gallery of architectures, flows, and intuition sketches you can reference in interviews."
        mascotSrc={mascotDiagrams}
        gradient="grad-mint"
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {DIAGRAMS.map((d) => (
          <div key={d.id} className="glass rounded-3xl overflow-hidden hover:-translate-y-1 transition group">
            <div className="relative h-56 overflow-hidden">
              <img
                src={d.cover}
                alt={d.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-3 right-3 glass-strong text-[10px] font-bold px-2 py-1 rounded-full">
                {d.category}
              </div>
            </div>
            <div className="p-4">
              <div className="font-bold">{d.title}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{d.description}</div>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
