import { Code2, Music2, UtensilsCrossed } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const activeClass = "bg-gradient-to-r from-rose to-coral text-primary-foreground shadow-glow";
const idleClass = "text-foreground/70 hover:text-foreground";
const baseClass = "inline-flex items-center gap-1.5 rounded-full px-2.5 py-2 text-[10px] font-bold uppercase tracking-wider transition sm:px-3 sm:text-xs";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isStage = theme === "rose";
  const isChaat = theme === "chaat";
  const isTech = theme === "tech";

  return (
    <div className="glass-strong inline-flex max-w-[calc(100vw-2rem)] flex-wrap items-center justify-end gap-1 rounded-full p-1 shadow-glow">
      <button
        type="button"
        onClick={() => setTheme("rose")}
        aria-pressed={isStage}
        className={baseClass + " " + (isStage ? activeClass : idleClass)}
      >
        <Music2 className="h-4 w-4" />
        AIML-Kpop
      </button>
      <button
        type="button"
        onClick={() => setTheme("chaat")}
        aria-pressed={isChaat}
        className={baseClass + " " + (isChaat ? activeClass : idleClass)}
      >
        <UtensilsCrossed className="h-4 w-4" />
        ChaatDeck
      </button>
      <button
        type="button"
        onClick={() => setTheme("tech")}
        aria-pressed={isTech}
        className={baseClass + " " + (isTech ? activeClass : idleClass)}
      >
        <Code2 className="h-4 w-4" />
        TechHome
      </button>
    </div>
  );
}
