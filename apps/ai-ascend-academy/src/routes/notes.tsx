import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, ChevronRight } from "lucide-react";
import { noteRanges } from "@/lib/data";
import coverNotes from "@/assets/cover-notes.jpg";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "AI Notes — NeuroForge" },
      { name: "description", content: "Expandable Q&A note ranges for AI and Data Science." },
    ],
  }),
  component: NotesPage,
});

function NotesPage() {
  const [q, setQ] = useState("");
  const [openRange, setOpenRange] = useState<string | undefined>("r1");

  const filterFn = (text: string) => text.toLowerCase().includes(q.toLowerCase());

  return (
    <div className="p-6 md:p-10 space-y-8">
      <header className="relative overflow-hidden rounded-3xl glass-strong">
        <img src={coverNotes} alt="" loading="lazy" width={1024} height={768} className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.16_0.04_280)] via-[oklch(0.16_0.04_280_/_70%)] to-transparent" />
        <div className="relative p-8 md:p-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-widest text-cyan-300 ring-1 ring-white/10">
            <BookOpen className="h-3.5 w-3.5" /> Knowledge Codex
          </div>
          <h1 className="mt-3 text-3xl md:text-5xl font-black"><span className="gradient-text">AI Notes</span></h1>
          <p className="mt-2 text-muted-foreground max-w-xl">Tap any range to unfurl brief answers. Built for spaced repetition vibes.</p>
        </div>
      </header>

      <div className="relative max-w-xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search across all notes..." className="pl-11 h-12 rounded-full bg-white/5 border-white/10 focus-visible:ring-fuchsia-400" />
      </div>

      <Accordion type="single" collapsible value={openRange} onValueChange={setOpenRange} className="space-y-4">
        {noteRanges.map((range) => {
          const matches = q ? range.notes.filter((n) => filterFn(n.q) || filterFn(n.a)) : range.notes;
          if (q && matches.length === 0) return null;
          return (
            <AccordionItem key={range.id} value={range.id} className="rounded-3xl glass border border-white/10 overflow-hidden data-[state=open]:ring-neon">
              <AccordionTrigger className="px-6 py-5 hover:no-underline group">
                <div className="flex items-center gap-4 flex-1">
                  <div className="grid place-items-center h-12 w-12 rounded-2xl gradient-aurora text-white font-bold glow">
                    {range.from}
                  </div>
                  <div className="text-left">
                    <div className="text-base md:text-lg font-bold">{range.label}</div>
                    <div className="text-xs text-muted-foreground">{matches.length} notes inside</div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid gap-2">
                  {matches.map((n, i) => (
                    <NoteItem key={i} q={n.q} a={n.a} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}

function NoteItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen(!open)}
      className="text-left w-full rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 hover:border-fuchsia-400/30 px-4 py-3 transition-all group"
    >
      <div className="flex items-center gap-3">
        <ChevronRight className={`h-4 w-4 text-fuchsia-300 transition-transform ${open ? "rotate-90" : ""}`} />
        <div className="font-medium text-sm md:text-base">{q}</div>
      </div>
      <div className={`grid transition-all ${open ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <p className="text-sm text-muted-foreground pl-7 pr-2">{a}</p>
        </div>
      </div>
    </button>
  );
}
