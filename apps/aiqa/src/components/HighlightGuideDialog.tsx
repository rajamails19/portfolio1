import { useState, type ReactNode } from "react";
import { Highlighter } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { renderInline } from "@/lib/rich-text";

// Reference sheet for the answer-formatting shorthand. Samples are rendered
// with the real renderer so they always match what the answers look like.
const ROWS: { code: string; name: string; sample: ReactNode; marker: string }[] = [
  {
    code: "GB",
    name: "Gold Bold",
    sample: renderInline("**way of building software**"),
    marker: "**text**",
  },
  {
    code: "YH",
    name: "Yellow Highlight",
    sample: renderInline("==learns a mapping from inputs to outputs=="),
    marker: "==text==",
  },
  {
    code: "RH",
    name: "Rose Highlight",
    sample: renderInline("^^rules + data → answers^^"),
    marker: "^^text^^",
  },
  {
    code: "HD",
    name: "Heading",
    sample: (
      <span className="qa-heading font-display text-base font-semibold">
        3 key pillars of ML :-
      </span>
    ),
    marker: 'type: "heading"',
  },
  {
    code: "SB",
    name: "Spotlight Box",
    sample: (
      <span className="callout-spotlight block text-sm">Key middle sentence of the answer</span>
    ),
    marker: 'callout, variant: "spotlight"',
  },
  {
    code: "BU",
    name: "Bold Underline",
    sample: renderInline("__underlined phrase__"),
    marker: "__text__",
  },
  { code: "CC", name: "Code Chip", sample: renderInline("`code chip`"), marker: "`text`" },
  { code: "PL", name: "Plain", sample: "Generalization over Memorization:", marker: "(no marker)" },
];

export function HighlightGuideDialog() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-full border border-gold/25 bg-noir/60 px-3 py-1 text-xs font-semibold text-foreground/80 transition hover:border-gold/60 hover:text-foreground"
      >
        <Highlighter className="h-3.5 w-3.5 text-gold-ink" />
        Highlight words
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90dvh] w-[calc(100vw-2rem)] max-w-3xl overflow-y-auto border border-gold/25 bg-card p-5 text-foreground sm:rounded-2xl sm:p-6">
          <DialogTitle className="font-display text-xl font-semibold">Highlight words</DialogTitle>
          <DialogDescription className="text-sm text-foreground/65">
            Say the code to tell Claude how to format a word or sentence, e.g. “make ‘we flip it’
            YH”.
          </DialogDescription>
          <div className="mt-3 overflow-x-auto rounded-2xl border border-gold/20">
            <table className="w-full text-sm">
              <thead className="bg-noir/60 text-left text-xs uppercase tracking-wider text-foreground/60">
                <tr>
                  <th className="px-3 py-2.5 font-semibold">Code</th>
                  <th className="px-3 py-2.5 font-semibold">Name</th>
                  <th className="px-3 py-2.5 font-semibold">Looks like</th>
                  <th className="hidden px-3 py-2.5 font-semibold sm:table-cell">Marker</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.code} className="border-t border-gold/10 align-middle">
                    <td className="px-3 py-3 font-bold text-gold-ink">{r.code}</td>
                    <td className="px-3 py-3 font-semibold">{r.name}</td>
                    <td className="px-3 py-3">{r.sample}</td>
                    <td className="hidden px-3 py-3 font-mono text-xs text-foreground/60 sm:table-cell">
                      {r.marker}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
