import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  children: React.ReactNode;
  badge?: React.ReactNode;
}

export function Row({ eyebrow, title, subtitle, children, badge }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section className="relative mt-10">
      <div className="mx-auto flex max-w-[1500px] items-end justify-between gap-4 px-6">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p
              className="font-mono text-[10px] uppercase tracking-[0.28em]"
              style={{ color: "oklch(0.92 0.16 75)" }}
            >
              {eyebrow}
            </p>
            {badge}
          </div>
          <h2 className="mt-1 font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 text-sm text-foreground/70">{subtitle}</p>
          )}
        </div>
        <div className="hidden items-center gap-1.5 sm:flex">
          <button
            onClick={() => scrollBy(-1)}
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-white/5 text-white/80 transition hover:bg-white/15 hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scrollBy(1)}
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-white/5 text-white/80 transition hover:bg-white/15 hover:text-white"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="scrollbar-hide mt-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-8 pt-2"
        style={{ scrollPaddingLeft: "24px" }}
      >
        {children}
        <div className="w-2 shrink-0" />
      </div>
    </section>
  );
}
