import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { VIDEOS } from "@/lib/data";
import mascotVideos from "@/assets/mascot-videos.jpg";
import { Play } from "lucide-react";

export const Route = createFileRoute("/videos")({
  head: () => ({ meta: [{ title: "Videos — NeuroNext" }] }),
  component: VideosPage,
});

function VideosPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Watch & learn"
        title={<><span className="text-grad">Videos</span> playlist</>}
        subtitle="Curated YouTube, Udemy, and DeepLearning.AI picks. Tap a thumbnail to open the source."
        mascotSrc={mascotVideos}
        gradient="grad-sunset"
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {VIDEOS.map((v) => (
          <a
            key={v.id}
            href={v.url}
            target="_blank"
            rel="noreferrer"
            className="group glass rounded-3xl overflow-hidden hover:-translate-y-1 transition"
          >
            <div className="relative h-52 overflow-hidden">
              <img
                src={v.cover}
                alt={v.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition" />
              <div className="absolute inset-0 grid place-items-center">
                <div className="h-16 w-16 rounded-full glass-strong grid place-items-center group-hover:scale-110 transition shadow-xl">
                  <Play size={28} className="ml-1 fill-foreground" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 glass-strong text-[10px] font-bold px-2 py-1 rounded-full">
                {v.duration}
              </div>
            </div>
            <div className="p-4">
              <div className="font-bold leading-tight">{v.title}</div>
              <div className="text-xs text-muted-foreground mt-1">{v.channel}</div>
            </div>
          </a>
        ))}
      </div>
    </AppShell>
  );
}
