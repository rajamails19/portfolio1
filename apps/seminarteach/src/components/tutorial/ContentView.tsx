import { useRef } from "react";
import { Clock, Bookmark, Share2, Heart } from "lucide-react";
import { lessons } from "@/lib/tutorial-data";
import { BlockRenderer } from "./blocks";
import { AddBlockMenu } from "./AddBlockMenu";
import { SelectionToolbar } from "./SelectionToolbar";

export function ContentView({ lessonId }: { lessonId: string }) {
  const lesson = lessons[lessonId] ?? lessons.welcome;
  const scopeRef = useRef<HTMLElement>(null);

  return (
    <>
      <SelectionToolbar scopeRef={scopeRef} />
      <article
        key={lessonId}
        ref={scopeRef}
        className="animate-slide-in-content mx-auto w-full max-w-3xl"
      >
        {/* Hero */}
        <header className="relative mb-10 overflow-hidden rounded-4xl shadow-glass ring-1 ring-white/70">
          <img
            src={lesson.cover}
            alt=""
            className="animate-ken-burns h-64 w-full object-cover md:h-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest backdrop-blur">
              {lesson.eyebrow}
            </div>
            <h2 className="font-display mt-3 text-3xl font-semibold leading-tight md:text-4xl">
              {lesson.title}
            </h2>
          </div>
        </header>

        {/* Meta bar */}
        <div className="glass mb-10 flex items-center justify-between rounded-2xl px-4 py-2.5">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary text-xs font-bold text-white shadow-glow">
              LT
            </div>
            <div className="text-sm">
              <div className="font-medium text-foreground">Lumen Team</div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {lesson.readTime} · Updated today
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <MetaBtn Icon={Heart} />
            <MetaBtn Icon={Bookmark} />
            <MetaBtn Icon={Share2} />
          </div>
        </div>

        {/* Blocks */}
        <div className="space-y-6 pb-24">
          <AddBlockMenu />
          {lesson.blocks.map((block, i) => (
            <div key={i} className="space-y-6">
              <BlockRenderer block={block} />
              <AddBlockMenu />
            </div>
          ))}
        </div>
      </article>
    </>
  );
}

function MetaBtn({ Icon }: { Icon: React.ComponentType<{ className?: string }> }) {
  return (
    <button className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition hover:bg-white/70 hover:text-primary">
      <Icon className="h-4 w-4" />
    </button>
  );
}
