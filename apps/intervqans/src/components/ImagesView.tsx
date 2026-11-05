import { useMemo, useState } from "react";
import { Images, ZoomIn } from "lucide-react";
import { quickImages } from "@/content/quick-images";
import { PhotoLightbox, type LightboxPhoto } from "@/components/PhotoLightbox";
import { SimpleHero } from "@/components/SimpleHero";

// Accent rail colour per card: yellow → green → blue.
const RAILS = ["bg-[oklch(0.82_0.14_88)]", "bg-[oklch(0.7_0.13_160)]", "bg-[oklch(0.72_0.12_240)]"];
const RINGS = [
  "ring-[oklch(0.82_0.14_88/0.3)] hover:ring-[oklch(0.82_0.14_88/0.6)]",
  "ring-[oklch(0.7_0.13_160/0.3)] hover:ring-[oklch(0.7_0.13_160/0.6)]",
  "ring-[oklch(0.72_0.12_240/0.3)] hover:ring-[oklch(0.72_0.12_240/0.6)]",
];

export function ImagesView() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const photos = useMemo<LightboxPhoto[]>(
    () => quickImages.map((img) => ({ id: img.src, dataUrl: img.src, caption: img.title })),
    [],
  );

  return (
    <div className="mx-auto w-full max-w-5xl px-6 pb-16 pt-8">
      <SimpleHero icon={Images} plain="Quick-" accent="Images" joined />

      <ul className="mt-10 grid gap-8 sm:grid-cols-2">
        {quickImages.map((img, i) => (
          <li
            key={img.src}
            className="animate-pop-in min-w-0"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <button
              type="button"
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
              aria-label={`Enlarge: ${img.title}`}
              className={`group block w-full overflow-hidden rounded-3xl bg-noir/50 p-3 text-left ring-1 backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-glow ${RINGS[i % RINGS.length]}`}
            >
              <span className="relative block overflow-hidden rounded-2xl bg-white">
                <img src={img.src} alt={img.title} loading="lazy" className="block h-auto w-full" />
                <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/55 text-white opacity-90 backdrop-blur transition group-hover:scale-110 group-hover:bg-black/75">
                  <ZoomIn className="h-4 w-4" />
                </span>
              </span>
              <span className="mt-4 flex items-start gap-3 px-2 pb-2">
                <span
                  aria-hidden
                  className={`mt-1 h-5 w-1 shrink-0 rounded-full ${RAILS[i % RAILS.length]}`}
                />
                <span className="min-w-0 break-words font-display text-lg font-semibold leading-snug text-foreground">
                  {img.title}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <PhotoLightbox
        photos={photos}
        index={index}
        open={open}
        onIndexChange={setIndex}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
