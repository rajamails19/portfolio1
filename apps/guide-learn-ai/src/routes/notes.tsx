import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { NOTE_RANGES } from "@/lib/data";
import mascotNotes from "@/assets/mascot-notes.jpg";
import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

export const Route = createFileRoute("/notes")({
  head: () => ({ meta: [{ title: "AI Notes — NeuroNext" }] }),
  component: NotesPage,
});

function NotesPage() {
  const [openRange, setOpenRange] = useState<string | null>(NOTE_RANGES[0].label);
  const [openEntry, setOpenEntry] = useState<number | null>(null);
  const [query, setQuery] = useState("");

  return (
    <AppShell>
      <PageHeader
        eyebrow="Bite-sized memory"
        title={<><span className="text-grad">AI Notes</span> in ranges</>}
        subtitle="Open a range, then tap any note to reveal a quick answer. Perfect for spaced repetition before interviews."
        mascotSrc={mascotNotes}
        gradient="grad-sunset"
      />

      <div className="glass rounded-2xl p-3 mb-6 flex items-center gap-2">
        <Search size={18} className="text-muted-foreground ml-2" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search notes by keyword..."
          className="flex-1 bg-transparent outline-none px-2 py-1.5 text-sm"
        />
        {query && <button onClick={() => setQuery("")} className="text-xs text-muted-foreground px-2">clear</button>}
      </div>

      <div className="space-y-4">
        {NOTE_RANGES.map((r, idx) => {
          const isOpen = openRange === r.label;
          const filtered = query
            ? r.entries.filter((e) => (e.q + e.a).toLowerCase().includes(query.toLowerCase()))
            : r.entries;
          const grads = ["grad-aurora", "grad-sunset", "grad-peach", "grad-ocean", "grad-mint"];
          const grad = grads[idx % grads.length];
          return (
            <div key={r.label} className="glass rounded-3xl overflow-hidden">
              <button
                onClick={() => setOpenRange(isOpen ? null : r.label)}
                className="w-full flex items-center gap-4 p-4 text-left hover:bg-white/30 transition"
              >
                <div className={`h-12 w-12 rounded-2xl ${grad} grid place-items-center text-white font-bold shadow-lg`}>
                  {r.from}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-lg">Notes {r.label}</div>
                  <div className="text-xs text-muted-foreground">{filtered.length} entries</div>
                </div>
                <ChevronDown
                  className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                  size={20}
                />
              </button>

              <div
                className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="p-4 pt-0 grid sm:grid-cols-2 gap-2">
                    {filtered.map((e) => {
                      const open = openEntry === e.id;
                      return (
                        <button
                          key={e.id}
                          onClick={() => setOpenEntry(open ? null : e.id)}
                          className="text-left glass-strong rounded-2xl p-3 hover:scale-[1.01] transition"
                        >
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${grad} text-white`}>
                              #{e.id}
                            </span>
                            <span className="text-sm font-semibold flex-1">{e.q}</span>
                            <ChevronDown size={14} className={`transition ${open ? "rotate-180" : ""}`} />
                          </div>
                          <div
                            className={`grid transition-[grid-template-rows] duration-300 ${
                              open ? "grid-rows-[1fr] mt-2" : "grid-rows-[0fr]"
                            }`}
                          >
                            <div className="overflow-hidden">
                              <p className="text-xs text-foreground/70 leading-relaxed">{e.a}</p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
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
