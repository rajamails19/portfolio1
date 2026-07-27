import { useState } from "react";
import { Plus, Image, Video, Code2, Type, Quote as QuoteIcon, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const options = [
  { icon: Type, label: "Heading" },
  { icon: Image, label: "Image" },
  { icon: Video, label: "Video / GIF" },
  { icon: Code2, label: "Code block" },
  { icon: QuoteIcon, label: "Quote" },
  { icon: Minus, label: "Divider" },
];

export function AddBlockMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="group relative flex h-8 items-center">
      <div className="absolute inset-y-0 left-0 right-0 flex items-center opacity-0 transition group-hover:opacity-100">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>
      <div className="relative flex w-full items-center justify-center">
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Add a new block"
          className={cn(
            "relative flex h-8 w-8 items-center justify-center rounded-full border border-primary/40 bg-white text-primary transition-all",
            "opacity-0 group-hover:opacity-100 hover:scale-110 hover:shadow-glow",
            open && "rotate-45 opacity-100 shadow-glow",
          )}
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} />
        </button>

        {open && (
          <div className="animate-slide-in-content absolute top-10 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-white p-1.5 shadow-glow ring-1 ring-primary/20">
            {options.map((opt) => (
              <button
                key={opt.label}
                onClick={() => setOpen(false)}
                title={opt.label}
                className="group/opt relative flex h-9 w-9 items-center justify-center rounded-full border border-transparent text-primary/70 transition hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
              >
                <opt.icon className="h-4 w-4" />
                <span className="pointer-events-none absolute -bottom-9 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-[10px] font-medium text-background opacity-0 shadow transition group-hover/opt:opacity-100">
                  {opt.label}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
