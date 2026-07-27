import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sidebar } from "@/components/tutorial/Sidebar";
import { ContentView } from "@/components/tutorial/ContentView";
import { defaultLessonId } from "@/lib/tutorial-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumen — Tutorials that feel alive" },
      {
        name: "description",
        content:
          "A cinematic tutorial platform with living diagrams, floating code, and lessons that glide into focus.",
      },
      { property: "og:title", content: "Lumen — Tutorials that feel alive" },
      {
        property: "og:description",
        content:
          "A cinematic tutorial platform with living diagrams, floating code, and lessons that glide into focus.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [activeId, setActiveId] = useState<string>(defaultLessonId);
  const [transitioning, setTransitioning] = useState(false);

  const handleSelect = (lessonId: string, sourceEl: HTMLElement) => {
    if (lessonId === activeId) return;
    // Fly the source pill toward the sidebar rail as a delightful flourish.
    const rect = sourceEl.getBoundingClientRect();
    const ghost = sourceEl.cloneNode(true) as HTMLElement;
    ghost.style.position = "fixed";
    ghost.style.left = rect.left + "px";
    ghost.style.top = rect.top + "px";
    ghost.style.width = rect.width + "px";
    ghost.style.height = rect.height + "px";
    ghost.style.pointerEvents = "none";
    ghost.style.zIndex = "60";
    ghost.style.margin = "0";
    ghost.style.setProperty("--fly-x", `-${rect.left * 0.1}px`);
    ghost.style.setProperty("--fly-y", `-${rect.top * 0.2}px`);
    ghost.classList.add("animate-fly-to-sidebar");
    document.body.appendChild(ghost);
    setTimeout(() => ghost.remove(), 650);

    setTransitioning(true);
    // small delay so content unmounts smoothly with fade
    setTimeout(() => {
      setActiveId(lessonId);
      setTransitioning(false);
    }, 120);
  };

  return (
    <div className="relative min-h-screen">
      {/* Ambient floating orbs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="animate-float-slow absolute -top-20 left-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-primary/30 to-blush/30 blur-3xl" />
        <div
          className="animate-float-slow absolute top-1/3 right-0 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-peach/40 to-accent/30 blur-3xl"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="animate-float-slow absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-gradient-to-br from-lavender/40 to-primary/20 blur-3xl"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Top glass pill nav */}
      <div className="sticky top-4 z-40 mx-auto flex w-fit items-center gap-1 rounded-full glass-strong px-2 py-1.5 text-sm">
        <NavPill label="Learn" active />
        <NavPill label="Playground" />
        <NavPill label="Community" />
        <NavPill label="Changelog" />
        <div className="mx-1 h-6 w-px bg-primary/20" />
        <button className="rounded-full bg-gradient-primary px-4 py-1.5 text-sm font-medium text-white shadow-glow transition hover:scale-105">
          Sign in
        </button>
      </div>

      <div className="mx-auto flex max-w-[1400px] gap-6 px-4 pt-6 pb-16">
        <Sidebar activeId={activeId} onSelect={handleSelect} />
        <main
          className="min-w-0 flex-1 transition-all duration-300"
          style={{ opacity: transitioning ? 0 : 1, transform: transitioning ? "translateY(8px)" : "none" }}
        >
          <ContentView lessonId={activeId} />
        </main>
      </div>
    </div>
  );
}

function NavPill({ label, active }: { label: string; active?: boolean }) {
  return (
    <button
      className={
        "rounded-full px-4 py-1.5 text-sm font-medium transition " +
        (active
          ? "bg-white text-foreground shadow-sm"
          : "text-foreground/70 hover:bg-white/50 hover:text-foreground")
      }
    >
      {label}
    </button>
  );
}
