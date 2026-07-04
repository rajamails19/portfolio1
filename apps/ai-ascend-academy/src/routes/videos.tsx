import { createFileRoute } from "@tanstack/react-router";
import { PlayCircle, ExternalLink } from "lucide-react";
import { videos } from "@/lib/data";
import coverVideos from "@/assets/cover-videos.jpg";

export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: [
      { title: "Videos — NeuroForge" },
      { name: "description", content: "Curated AI / DS videos and courses." },
    ],
  }),
  component: VideosPage,
});

const gradients = [
  "from-fuchsia-500 to-violet-600",
  "from-cyan-400 to-blue-600",
  "from-rose-500 to-amber-400",
  "from-emerald-400 to-cyan-500",
  "from-violet-500 to-fuchsia-500",
  "from-amber-400 to-rose-500",
];

function VideosPage() {
  return (
    <div className="p-6 md:p-10 space-y-8">
      <header className="relative overflow-hidden rounded-3xl glass-strong">
        <img src={coverVideos} alt="" loading="lazy" width={1024} height={768} className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.16_0.04_280)] via-[oklch(0.16_0.04_280_/_70%)] to-transparent" />
        <div className="relative p-8 md:p-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-widest text-cyan-300 ring-1 ring-white/10">
            <PlayCircle className="h-3.5 w-3.5" /> Cinema Hall
          </div>
          <h1 className="mt-3 text-3xl md:text-5xl font-black"><span className="gradient-text">Videos</span></h1>
          <p className="mt-2 text-muted-foreground max-w-xl">Tap a thumbnail to launch the lesson on YouTube / Udemy / wherever it lives.</p>
        </div>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {videos.map((v, i) => (
          <a
            key={v.id}
            href={v.url}
            target="_blank"
            rel="noreferrer"
            className="group relative rounded-3xl overflow-hidden glass border border-white/10 hover:border-fuchsia-400/40 hover:-translate-y-1 hover:shadow-[var(--shadow-glow)] transition-all"
          >
            <div className={`relative aspect-video bg-gradient-to-br ${gradients[i % gradients.length]} overflow-hidden`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,oklch(1_0_0_/_25%),transparent_60%)]" />
              <div className="absolute top-3 right-3 text-[10px] uppercase tracking-widest rounded-full bg-black/40 px-2 py-1 text-white backdrop-blur">{v.duration}</div>
              <div className="absolute inset-0 grid place-items-center">
                <div className="h-16 w-16 rounded-full glass-strong grid place-items-center group-hover:scale-110 transition animate-pulse-glow">
                  <PlayCircle className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="absolute bottom-3 left-3 text-[10px] uppercase tracking-widest rounded-full bg-black/40 px-2 py-1 text-white backdrop-blur">{v.tag}</div>
            </div>
            <div className="p-5">
              <div className="font-bold leading-snug">{v.title}</div>
              <div className="mt-1 text-xs text-muted-foreground flex items-center justify-between">
                <span>{v.channel}</span>
                <span className="inline-flex items-center gap-1 gradient-text font-semibold">Open <ExternalLink className="h-3 w-3" /></span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
