import { useDeck } from "@/hooks/use-deck";

export function QuotesTicker() {
  const deck = useDeck();
  const loop = [...deck.marqueeQuotes, ...deck.marqueeQuotes];
  return (
    <div className="glass relative overflow-hidden rounded-full px-1 py-2">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
        {loop.map((q, i) => (
          <span key={i} className="inline-flex items-center gap-3 text-sm">
            <span className="text-rose">✦</span>
            <span className="font-display italic text-foreground/90">"{q.text}"</span>
            <span className="text-xs uppercase tracking-widest text-muted-foreground">— {q.author}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
