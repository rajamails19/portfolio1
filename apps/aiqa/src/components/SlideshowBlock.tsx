import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function SlideshowBlock({
  slides,
}: {
  slides: { src: string; alt: string; caption?: string }[];
}) {
  const [i, setI] = useState(0);
  const slide = slides[i];
  if (!slide) return null;
  const last = slides.length - 1;

  return (
    <div className="my-4 overflow-hidden rounded-2xl border border-gold/20 bg-noir/40">
      <div className="flex items-center justify-center bg-[oklch(0.98_0.005_85)] p-3 sm:p-6">
        <img src={slide.src} alt={slide.alt} className="max-h-[420px] w-auto max-w-full" />
      </div>
      <div className="flex items-center gap-3 border-t border-gold/15 px-3 py-3">
        <button
          type="button"
          onClick={() => setI((v) => Math.max(0, v - 1))}
          disabled={i === 0}
          aria-label="Previous slide"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-noir/60 text-foreground/80 transition hover:bg-noir disabled:opacity-30"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="min-w-0 flex-1 text-center">
          {slide.caption && (
            <p className="text-sm leading-snug text-foreground/85">{slide.caption}</p>
          )}
          <div className="mt-2 flex items-center justify-center gap-1.5">
            {slides.map((_, k) => (
              <button
                key={k}
                type="button"
                onClick={() => setI(k)}
                aria-label={`Go to slide ${k + 1}`}
                aria-current={k === i ? "true" : undefined}
                className={[
                  "h-2 rounded-full transition-all",
                  k === i ? "w-5 bg-gold" : "w-2 bg-white/25 hover:bg-white/40",
                ].join(" ")}
              />
            ))}
          </div>
          <div className="mt-1 text-[11px] tabular-nums text-muted-foreground">
            {i + 1} / {slides.length}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setI((v) => Math.min(last, v + 1))}
          disabled={i === last}
          aria-label="Next slide"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-noir/60 text-foreground/80 transition hover:bg-noir disabled:opacity-30"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
