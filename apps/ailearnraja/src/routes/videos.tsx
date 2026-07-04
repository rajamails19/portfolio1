import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import heroVideos from "@/assets/hero-videos.jpg";
import { SectionHero } from "@/components/SectionHero";
import { videos } from "@/lib/content";
import { Play, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/videos")({
  head: () => ({ meta: [{ title: "Theater of Lectures — Aetheria" }, { name: "description", content: "Hand-picked YouTube, Udemy, Coursera lessons for the AI career path." }] }),
  component: VideosPage,
});

const sources = ["All", "YouTube", "Udemy", "Coursera", "DeepLearning.AI"] as const;

function VideosPage() {
  const [src, setSrc] = useState<(typeof sources)[number]>("All");
  const list = src === "All" ? videos : videos.filter((v) => v.source === src);

  return (
    <div>
      <SectionHero
        image={heroVideos}
        eyebrow="Realm 5 of 5 · The Theater"
        title="Theater of Lectures"
        subtitle="The teachers worth their salt — click any reel and fly out to YouTube, Udemy, or Coursera."
      />

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {sources.map((s) => (
            <button
              key={s}
              onClick={() => setSrc(s)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                src === s
                  ? "bg-gradient-to-r from-[oklch(0.72_0.19_45)] to-[oklch(0.85_0.14_85)] text-[oklch(0.16_0.03_270)] shadow-glow"
                  : "border border-[oklch(0.85_0.14_85/0.25)] text-foreground/80 hover:bg-[oklch(0.85_0.14_85/0.08)]"
              }`}
            >{s}</button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((v) => (
            <a
              key={v.id}
              href={v.url}
              target="_blank"
              rel="noopener noreferrer"
              className="cinematic-card group relative h-72 block"
            >
              <img src={v.image} alt={v.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" loading="lazy" />
              {/* play overlay */}
              <div className="absolute inset-0 grid place-items-center z-[2]">
                <span className="w-16 h-16 rounded-full bg-gradient-to-br from-[oklch(0.72_0.19_45)] to-[oklch(0.85_0.14_85)] shadow-glow grid place-items-center transition-transform group-hover:scale-110">
                  <Play className="w-6 h-6 text-[oklch(0.16_0.03_270)] fill-[oklch(0.16_0.03_270)] ml-1" />
                </span>
              </div>
              <div className="card-content absolute inset-0 flex flex-col justify-end p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="ember-chip">{v.source}</span>
                  <span className="text-xs text-muted-foreground">{v.duration}</span>
                </div>
                <h3 className="font-display text-lg text-gradient-ember drop-shadow-[0_4px_18px_rgba(0,0,0,0.7)] flex items-center gap-1.5">
                  {v.title} <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </h3>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
