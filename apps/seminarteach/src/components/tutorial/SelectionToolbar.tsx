import { useEffect, useRef, useState } from "react";
import { Bold, Italic, Link2, Quote, Heading1, Heading2, Highlighter, Sparkles } from "lucide-react";

type Pos = { x: number; y: number } | null;

export function SelectionToolbar({ scopeRef }: { scopeRef: React.RefObject<HTMLElement | null> }) {
  const [pos, setPos] = useState<Pos>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onUp = () => {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || !sel.rangeCount) {
        setPos(null);
        return;
      }
      const range = sel.getRangeAt(0);
      const container = scopeRef.current;
      if (!container) return;
      if (!container.contains(range.commonAncestorContainer)) {
        setPos(null);
        return;
      }
      const rect = range.getBoundingClientRect();
      if (rect.width < 4 && rect.height < 4) {
        setPos(null);
        return;
      }
      setPos({
        x: rect.left + rect.width / 2 + window.scrollX,
        y: rect.top + window.scrollY,
      });
    };
    const onDown = (e: MouseEvent) => {
      if (barRef.current?.contains(e.target as Node)) return;
    };
    document.addEventListener("mouseup", onUp);
    document.addEventListener("keyup", onUp);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("scroll", () => setPos(null), true);
    return () => {
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("keyup", onUp);
      document.removeEventListener("mousedown", onDown);
    };
  }, [scopeRef]);

  if (!pos) return null;

  const items = [
    { Icon: Bold, label: "Bold" },
    { Icon: Italic, label: "Italic" },
    { Icon: Link2, label: "Link" },
    { divider: true },
    { Icon: Heading1, label: "H1" },
    { Icon: Heading2, label: "H2" },
    { Icon: Quote, label: "Quote" },
    { divider: true },
    { Icon: Highlighter, label: "Highlight" },
    { Icon: Sparkles, label: "Ask AI" },
  ] as const;

  return (
    <div
      ref={barRef}
      style={{ left: pos.x, top: pos.y - 56 }}
      className="animate-slide-in-content pointer-events-auto fixed z-50 flex -translate-x-1/2 items-center gap-0.5 rounded-2xl bg-foreground p-1.5 shadow-glow ring-1 ring-white/10"
    >
      {items.map((it, i) =>
        "divider" in it ? (
          <span key={i} className="mx-1 h-5 w-px bg-white/15" />
        ) : (
          <button
            key={it.label}
            title={it.label}
            onMouseDown={(e) => e.preventDefault()}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            <it.Icon className="h-4 w-4" />
          </button>
        ),
      )}
      <span
        className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 rounded-sm bg-foreground"
        aria-hidden
      />
    </div>
  );
}
