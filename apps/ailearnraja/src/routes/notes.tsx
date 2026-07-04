import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, BookOpen } from "lucide-react";
import heroNotes from "@/assets/hero-notes.jpg";
import { SectionHero } from "@/components/SectionHero";
import { noteBatches } from "@/lib/content";

export const Route = createFileRoute("/notes")({
  head: () => ({ meta: [{ title: "Notes Codex — Aetheria" }, { name: "description", content: "Bite-sized AI/DS notes in expandable batches of 20." }] }),
  component: NotesPage,
});

function NotesPage() {
  const [openBatch, setOpenBatch] = useState<number | null>(0);
  const [openNote, setOpenNote] = useState<number | null>(null);

  return (
    <div>
      <SectionHero
        image={heroNotes}
        eyebrow="Realm 1 of 5 · The Floating Library"
        title="Notes Codex"
        subtitle="Bite-sized questions and brief answers. Open a tome, then unfurl one scroll at a time."
      />

      <section className="mx-auto max-w-5xl px-6 py-14 space-y-5">
        {noteBatches.map((batch, bi) => {
          const isOpen = openBatch === bi;
          return (
            <div key={batch.range} className="rounded-2xl border border-[oklch(0.85_0.14_85/0.18)] bg-gradient-to-b from-[oklch(0.22_0.04_270/0.7)] to-[oklch(0.16_0.03_270/0.85)] backdrop-blur-sm shadow-cinematic overflow-hidden">
              <button
                onClick={() => { setOpenBatch(isOpen ? null : bi); setOpenNote(null); }}
                className="w-full flex items-center gap-4 px-6 py-5 text-left hover:bg-[oklch(0.85_0.14_85/0.06)] transition-colors"
              >
                <span className="w-12 h-12 rounded-full grid place-items-center bg-gradient-to-br from-[oklch(0.72_0.19_45)] to-[oklch(0.85_0.14_85)] shadow-glow">
                  <BookOpen className="w-5 h-5 text-[oklch(0.16_0.03_270)]" />
                </span>
                <div className="flex-1">
                  <div className="ember-chip mb-1">Tome {bi + 1}</div>
                  <h3 className="font-display text-2xl text-gradient-ember">{batch.label}</h3>
                </div>
                <ChevronDown className={`w-6 h-6 text-[oklch(0.85_0.14_85)] transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`} />
              </button>

              <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <div className="px-4 md:px-6 pb-6 space-y-2 border-t border-[oklch(0.85_0.14_85/0.12)] pt-4">
                    {batch.notes.map((n) => {
                      const noteOpen = openNote === n.id;
                      return (
                        <div key={n.id} className="rounded-xl border border-[oklch(0.85_0.14_85/0.12)] bg-[oklch(0.14_0.03_270/0.55)]">
                          <button
                            onClick={() => setOpenNote(noteOpen ? null : n.id)}
                            className="w-full flex items-start gap-4 px-5 py-3.5 text-left hover:bg-[oklch(0.85_0.14_85/0.06)] transition-colors"
                          >
                            <span className="font-display text-sm text-[oklch(0.85_0.14_85)] mt-0.5 w-8 shrink-0">{String(n.id).padStart(3, "0")}</span>
                            <span className="flex-1 text-foreground/90 font-medium">{n.q}</span>
                            <ChevronDown className={`w-4 h-4 text-muted-foreground mt-1 transition-transform duration-300 ${noteOpen ? "rotate-180" : ""}`} />
                          </button>
                          <div className={`grid transition-[grid-template-rows] duration-300 ${noteOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                            <div className="overflow-hidden">
                              <p className="px-5 pb-4 pt-1 pl-[3.6rem] font-serif italic text-foreground/80 leading-relaxed">{n.a}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
