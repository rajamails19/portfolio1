import { useMemo, useState } from "react";
import { Code2, Gem, Image as ImageIcon, Lightbulb, StickyNote, ZoomIn } from "lucide-react";
import { handPicked, type Pick } from "@/content/hand-picked";
import { conceptGroups } from "@/content/concepts-8020";
import { ConceptCard } from "@/components/ConceptCard";
import type { Block } from "@/content/types";
import { renderInline } from "@/lib/rich-text";
import { AnswerBlocks } from "@/components/AnswerBlocks";
import { CodeBlock } from "@/components/CodeBlock";
import { PhotoLightbox, type LightboxPhoto } from "@/components/PhotoLightbox";
import { SimpleHero } from "@/components/SimpleHero";

// Card accents cycle yellow → green → blue, like the rest of the section pages.
const TONES = [
  {
    rail: "bg-[oklch(0.82_0.14_88)]",
    chip: "text-[oklch(0.86_0.13_88)] bg-[oklch(0.82_0.14_88/0.12)]",
    ring: "ring-[oklch(0.82_0.14_88/0.28)] hover:ring-[oklch(0.82_0.14_88/0.55)]",
    glow: "bg-[oklch(0.82_0.14_88/0.12)]",
  },
  {
    rail: "bg-[oklch(0.7_0.13_160)]",
    chip: "text-[oklch(0.82_0.13_160)] bg-[oklch(0.7_0.13_160/0.12)]",
    ring: "ring-[oklch(0.7_0.13_160/0.28)] hover:ring-[oklch(0.7_0.13_160/0.55)]",
    glow: "bg-[oklch(0.7_0.13_160/0.12)]",
  },
  {
    rail: "bg-[oklch(0.72_0.12_240)]",
    chip: "text-[oklch(0.84_0.1_240)] bg-[oklch(0.72_0.12_240/0.12)]",
    ring: "ring-[oklch(0.72_0.12_240/0.28)] hover:ring-[oklch(0.72_0.12_240/0.55)]",
    glow: "bg-[oklch(0.72_0.12_240/0.12)]",
  },
];

const KINDS = {
  note: { label: "Note", Icon: StickyNote },
  image: { label: "Image", Icon: ImageIcon },
  code: { label: "Code", Icon: Code2 },
} as const;

const HEAD_COLORS = ["oklch(0.84 0.14 88)", "oklch(0.8 0.1 240)"];

function NoteBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="text-[15px] leading-relaxed text-foreground/85">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "text":
            return (
              <p key={i} className="my-3 first:mt-0">
                {renderInline(b.content)}
              </p>
            );
          case "heading":
            return (
              <h4 key={i} className="qa-heading mb-3 mt-6 font-display text-lg font-semibold">
                {b.content}
              </h4>
            );
          case "list":
            return (
              <ul key={i} className="my-3 grid gap-x-6 gap-y-1.5 @md:grid-cols-2">
                {b.items.map((it) => (
                  <li key={it} className="flex min-w-0 items-start gap-2.5">
                    <span
                      aria-hidden
                      className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold-ink/80"
                    />
                    <span className="min-w-0 break-words">{renderInline(it)}</span>
                  </li>
                ))}
              </ul>
            );
          case "table":
            return (
              <div key={i} className="my-4 overflow-hidden rounded-2xl border border-gold/20">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-black/30">
                      <tr>
                        {b.headers.map((h, k) => (
                          <th
                            key={h}
                            className="px-4 py-2.5 text-left font-bold"
                            style={{ color: HEAD_COLORS[k % HEAD_COLORS.length] }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {b.rows.map((row) => (
                        <tr key={row[0]} className="border-t border-gold/10 odd:bg-white/[0.03]">
                          {row.map((c, k) => (
                            <td
                              key={c}
                              className={
                                k === 0
                                  ? "px-4 py-2.5 align-top font-semibold text-gold-ink"
                                  : "px-4 py-2.5 align-top text-foreground/85"
                              }
                            >
                              {renderInline(c)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          case "callout": {
            if (b.variant !== "tip") return <AnswerBlocks key={i} blocks={[b]} />;
            // The pasted text starts with "Tip:" — show it as the label, keep the rest as sent.
            const rest = b.content.replace(/^Tip:\s*/, "");
            return (
              <div
                key={i}
                className="my-4 flex gap-3 rounded-2xl bg-[oklch(0.28_0.08_155)]/50 p-4 ring-1 ring-[oklch(0.6_0.15_155)]/40"
              >
                <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-[oklch(0.85_0.13_160)]" />
                <p className="min-w-0 break-words text-sm leading-relaxed text-foreground/90">
                  <span className="mr-1 font-bold text-[oklch(0.85_0.13_160)]">Tip:</span>
                  {renderInline(rest)}
                </p>
              </div>
            );
          }
          default:
            return <AnswerBlocks key={i} blocks={[b]} />;
        }
      })}
    </div>
  );
}

function PickCard({
  pick,
  index,
  onOpenImage,
}: {
  pick: Exclude<Pick, { kind: "concept" }>;
  index: number;
  onOpenImage: () => void;
}) {
  const tone = TONES[index % TONES.length];
  const { label, Icon } = KINDS[pick.kind];
  return (
    <article
      className={`animate-pop-in relative overflow-hidden rounded-3xl bg-noir/50 p-5 ring-1 backdrop-blur transition duration-300 hover:-translate-y-0.5 sm:p-6 ${tone.ring}`}
      style={{ animationDelay: `${Math.min(index, 8) * 55}ms` }}
    >
      <span
        aria-hidden
        className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-2xl ${tone.glow}`}
      />
      <span aria-hidden className={`absolute left-0 top-6 h-8 w-1 rounded-r-full ${tone.rail}`} />
      <div
        className={`relative inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.25em] ${tone.chip}`}
      >
        <Icon className="h-3 w-3" /> {label}
      </div>
      {pick.title && (
        <h3 className="relative mt-3 break-words font-display text-xl font-semibold leading-snug text-foreground">
          {pick.title}
        </h3>
      )}
      <div className="relative mt-3">
        {pick.kind === "note" && <NoteBlocks blocks={pick.blocks} />}
        {pick.kind === "code" && <CodeBlock language={pick.language} code={pick.code} />}
        {pick.kind === "image" && (
          <button
            type="button"
            onClick={onOpenImage}
            aria-label={`Enlarge: ${pick.alt}`}
            className="group relative block w-full overflow-hidden rounded-2xl ring-1 ring-white/10"
          >
            <img src={pick.src} alt={pick.alt} loading="lazy" className="block h-auto w-full" />
            <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/55 text-white backdrop-blur transition group-hover:scale-110 group-hover:bg-black/75">
              <ZoomIn className="h-4 w-4" />
            </span>
          </button>
        )}
      </div>
    </article>
  );
}

function findConcept(name: string) {
  for (const g of conceptGroups) {
    const concept = g.concepts.find((c) => c.name === name);
    if (concept) return { concept, icon: g.icon };
  }
  return null;
}

// Concept picks get the full page width (like the 80-20 cards); everything else keeps the
// two-column scrapbook layout. Consecutive picks of the same kind share one block.
function toSegments(picks: Pick[]) {
  const out: { concepts: boolean; start: number; items: Pick[] }[] = [];
  picks.forEach((p, i) => {
    const concepts = p.kind === "concept";
    const last = out[out.length - 1];
    if (last && last.concepts === concepts) last.items.push(p);
    else out.push({ concepts, start: i, items: [p] });
  });
  return out;
}

export function PicksView() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const segments = useMemo(() => toSegments(handPicked), []);

  const photos = useMemo<LightboxPhoto[]>(
    () =>
      handPicked.flatMap((p) =>
        p.kind === "image" ? [{ id: p.src, dataUrl: p.src, caption: p.alt }] : [],
      ),
    [],
  );

  return (
    <div className="mx-auto w-full max-w-[var(--page-max)] px-6 pb-16 pt-8 transition-[max-width] duration-300 lg:px-8">
      <SimpleHero icon={Gem} plain="Hand-Picked" accent="By Me" />

      {segments.map((seg, si) =>
        seg.concepts ? (
          <ul key={si} className="mt-10 flex flex-col gap-8 sm:gap-10">
            {seg.items.map((pick, i) => {
              const found = findConcept(pick.kind === "concept" ? pick.name : "");
              if (!found) return null;
              return (
                <ConceptCard
                  key={pick.kind === "concept" ? pick.name : i}
                  id={`pick-concept-${si}-${i}`}
                  concept={found.concept}
                  index={i}
                  fallbackIcon={found.icon}
                />
              );
            })}
          </ul>
        ) : (
          <div key={si} className="@container mt-10">
            <ul className="columns-1 gap-6 @3xl:columns-2 @6xl:columns-3">
              {seg.items.map((pick, i) => {
                if (pick.kind === "concept") return null;
                return (
                  <li key={i} className="mb-6 min-w-0 break-inside-avoid">
                    <PickCard
                      pick={pick}
                      index={seg.start + i}
                      onOpenImage={() => {
                        setIndex(
                          photos.findIndex((ph) => pick.kind === "image" && ph.id === pick.src),
                        );
                        setOpen(true);
                      }}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        ),
      )}

      <PhotoLightbox
        photos={photos}
        index={Math.max(index, 0)}
        open={open}
        onIndexChange={setIndex}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
