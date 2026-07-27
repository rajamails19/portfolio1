import { useState } from "react";
import { ChevronRight, Sparkles, BookOpen, Search } from "lucide-react";
import { nav, type NavItem } from "@/lib/tutorial-data";
import { cn } from "@/lib/utils";

export function Sidebar({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (lessonId: string, sourceEl: HTMLElement) => void;
}) {
  const [open, setOpen] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    nav.forEach((n) => (initial[n.id] = true));
    return initial;
  });
  const [query, setQuery] = useState("");

  const matches = (t: string) => t.toLowerCase().includes(query.toLowerCase());

  return (
    <aside className="glass-strong sticky top-4 flex h-[calc(100vh-2rem)] w-[300px] shrink-0 flex-col overflow-hidden rounded-4xl">
      <div className="flex items-center gap-3 border-b border-white/40 px-5 py-4">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow">
          <Sparkles className="h-5 w-5 text-white" strokeWidth={2.5} />
          <span className="absolute -inset-1 -z-10 rounded-2xl bg-gradient-primary opacity-40 blur-lg" />
        </div>
        <div>
          <div className="font-display text-lg font-semibold text-foreground">Lumen</div>
          <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
            Tutorials · v2.4
          </div>
        </div>
      </div>

      <div className="px-4 pt-4">
        <div className="glass flex items-center gap-2 rounded-2xl px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lessons…"
            className="w-full bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
          />
          <kbd className="hidden rounded-md bg-white/60 px-1.5 py-0.5 text-[10px] text-muted-foreground sm:inline">
            ⌘K
          </kbd>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {nav.map((section) => {
          const filtered = query
            ? section.children?.filter((c) => matches(c.title))
            : section.children;
          if (query && (!filtered || filtered.length === 0)) return null;
          const isOpen = open[section.id] ?? true;
          return (
            <div key={section.id} className="mb-2">
              <button
                onClick={() => setOpen((o) => ({ ...o, [section.id]: !isOpen }))}
                className="group flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left transition hover:bg-white/50"
              >
                <ChevronRight
                  className={cn(
                    "h-3.5 w-3.5 text-muted-foreground transition-transform duration-300",
                    isOpen && "rotate-90",
                  )}
                />
                <BookOpen className="h-3.5 w-3.5 text-primary/70" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground group-hover:text-foreground">
                  {section.title}
                </span>
              </button>
              <div
                className={cn(
                  "grid transition-all duration-500 ease-out",
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="overflow-hidden">
                  <ul className="ml-4 mt-1 space-y-0.5 border-l border-white/60 pl-2">
                    {filtered?.map((child) => (
                      <SidebarLink
                        key={child.id}
                        item={child}
                        active={activeId === child.lessonId}
                        onSelect={onSelect}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </nav>

      <div className="glass mx-3 mb-3 rounded-2xl p-3 text-xs text-muted-foreground">
        <span className="font-medium text-foreground">Tip · </span>
        Select any text to bookmark, highlight, or ask the AI tutor.
      </div>
    </aside>
  );
}

function SidebarLink({
  item,
  active,
  onSelect,
}: {
  item: NavItem;
  active: boolean;
  onSelect: (lessonId: string, el: HTMLElement) => void;
}) {
  return (
    <li>
      <button
        onClick={(e) => item.lessonId && onSelect(item.lessonId, e.currentTarget)}
        className={cn(
          "group relative flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm transition-all duration-300",
          active
            ? "bg-gradient-primary text-white shadow-glow"
            : "text-foreground/80 hover:bg-white/60 hover:text-foreground",
        )}
      >
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full transition-all",
            active ? "bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.7)]" : "bg-primary/30 group-hover:bg-primary/70",
          )}
        />
        <span className="truncate">{item.title}</span>
        {active && (
          <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
            <span className="animate-shimmer absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          </span>
        )}
      </button>
    </li>
  );
}
