import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

export interface LightboxPhoto {
  id: string;
  dataUrl: string;
  caption: string;
}

const ZOOMS = [1, 1.5, 2, 3, 4];

const barBtn =
  "inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10";

export function PhotoLightbox({
  photos,
  index,
  open,
  onIndexChange,
  onClose,
}: {
  photos: LightboxPhoto[];
  index: number;
  open: boolean;
  onIndexChange: (i: number) => void;
  onClose: () => void;
}) {
  const [zoomIdx, setZoomIdx] = useState(0);
  const touchX = useRef<number | null>(null);
  const photo = photos[index];
  const zoom = ZOOMS[zoomIdx];
  const last = photos.length - 1;

  // Every photo opens fitted to the screen.
  useEffect(() => {
    setZoomIdx(0);
  }, [index, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && index > 0) onIndexChange(index - 1);
      else if (e.key === "ArrowRight" && index < last) onIndexChange(index + 1);
      else if (e.key === "+" || e.key === "=") setZoomIdx((z) => Math.min(ZOOMS.length - 1, z + 1));
      else if (e.key === "-") setZoomIdx((z) => Math.max(0, z - 1));
      else if (e.key === "0") setZoomIdx(0);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, index, last, onIndexChange]);

  if (!photo) return null;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="left-0 top-0 flex h-[100dvh] w-screen max-w-none translate-x-0 translate-y-0 flex-col gap-0 rounded-none border-none bg-black/95 p-0 text-white sm:rounded-none [&>button:last-child]:hidden">
        <DialogTitle className="sr-only">
          Photo {index + 1} of {photos.length}
        </DialogTitle>
        <DialogDescription className="sr-only">{photo.caption || "Enlarged photo"}</DialogDescription>

        <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
          <span className="text-sm font-semibold tabular-nums text-white/80">
            {index + 1} / {photos.length}
          </span>
          <div className="ml-auto flex items-center gap-1.5">
            <button
              type="button"
              className={barBtn}
              aria-label="Zoom out"
              disabled={zoomIdx === 0}
              onClick={() => setZoomIdx((z) => Math.max(0, z - 1))}
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="h-9 min-w-12 rounded-full bg-white/10 px-2 text-xs font-semibold tabular-nums text-white transition hover:bg-white/20"
              aria-label="Reset zoom"
              onClick={() => setZoomIdx(0)}
            >
              {zoomIdx === 0 ? "Fit" : `${Math.round(zoom * 100)}%`}
            </button>
            <button
              type="button"
              className={barBtn}
              aria-label="Zoom in"
              disabled={zoomIdx === ZOOMS.length - 1}
              onClick={() => setZoomIdx((z) => Math.min(ZOOMS.length - 1, z + 1))}
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <button type="button" className={`${barBtn} ml-2`} aria-label="Close" onClick={onClose}>
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="relative min-h-0 flex-1">
          <div
            className="absolute inset-0 flex overflow-auto p-2 sm:p-4"
            onTouchStart={(e) => {
              touchX.current = zoomIdx === 0 ? e.touches[0].clientX : null;
            }}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              touchX.current = null;
              if (dx > 60 && index > 0) onIndexChange(index - 1);
              else if (dx < -60 && index < last) onIndexChange(index + 1);
            }}
          >
            <img
              src={photo.dataUrl}
              alt={photo.caption || `Photo ${index + 1}`}
              onClick={() => setZoomIdx((z) => (z === 0 ? 2 : 0))}
              draggable={false}
              className={[
                "m-auto select-none",
                zoomIdx === 0
                  ? "max-h-full max-w-full cursor-zoom-in object-contain"
                  : "cursor-zoom-out",
              ].join(" ")}
              style={
                zoomIdx === 0
                  ? undefined
                  : { width: `${zoom * 100}%`, maxWidth: "none", maxHeight: "none", height: "auto" }
              }
            />
          </div>

          {index > 0 && (
            <button
              type="button"
              aria-label="Previous photo"
              onClick={() => onIndexChange(index - 1)}
              className={`${barBtn} absolute left-2 top-1/2 h-11 w-11 -translate-y-1/2 bg-black/50 sm:left-4`}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}
          {index < last && (
            <button
              type="button"
              aria-label="Next photo"
              onClick={() => onIndexChange(index + 1)}
              className={`${barBtn} absolute right-2 top-1/2 h-11 w-11 -translate-y-1/2 bg-black/50 sm:right-4`}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}
        </div>

        <div className="space-y-2 border-t border-white/10 px-4 py-3">
          {photo.caption && (
            <p className="break-words text-center text-sm text-white/85">{photo.caption}</p>
          )}
          {photos.length > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {photos.map((p, k) => (
                <button
                  key={p.id}
                  type="button"
                  aria-label={`Go to photo ${k + 1}`}
                  aria-current={k === index ? "true" : undefined}
                  onClick={() => onIndexChange(k)}
                  className={[
                    "h-2 rounded-full transition-all",
                    k === index ? "w-5 bg-gold" : "w-2 bg-white/30 hover:bg-white/50",
                  ].join(" ")}
                />
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
