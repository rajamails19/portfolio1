import { useState } from "react";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import type { TrickPhoto } from "@/lib/easy-tricks-data";
import { cn } from "@/lib/utils";

export function PhotoSlideshow({ photos }: { photos: TrickPhoto[] }) {
  const [index, setIndex] = useState(0);

  if (photos.length === 0) {
    return (
      <div className="mt-5 flex flex-col items-center gap-3 rounded-3xl border border-dashed border-border bg-card px-6 py-16 text-center">
        <ImageOff className="h-8 w-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">More photos are coming soon.</p>
      </div>
    );
  }

  const photo = photos[Math.min(index, photos.length - 1)];
  const goPrev = () => setIndex((i) => Math.max(0, i - 1));
  const goNext = () => setIndex((i) => Math.min(photos.length - 1, i + 1));

  return (
    <div className="mt-5 overflow-hidden rounded-3xl border border-border bg-card">
      <div className="relative">
        <img
          src={photo.src}
          alt={photo.alt}
          className="aspect-[4/3] w-full min-w-0 bg-muted object-contain sm:aspect-[16/10]"
        />

        {photos.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              disabled={index === 0}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground shadow-soft backdrop-blur transition hover:bg-background disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={index === photos.length - 1}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground shadow-soft backdrop-blur transition hover:bg-background disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-4">
        <p className="min-w-0 flex-1 break-words text-sm font-medium text-foreground/80">
          {photo.caption}
        </p>
        <span className="shrink-0 text-xs font-bold text-muted-foreground">
          {index + 1} / {photos.length}
        </span>
      </div>

      {photos.length > 1 && (
        <div className="flex items-center justify-center gap-1.5 pb-4">
          {photos.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to photo ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              className={cn(
                "h-2 w-2 rounded-full transition",
                i === index
                  ? "w-5 bg-primary"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/60",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
