import { useTheme } from "@/context/ThemeContext";
import { Music2, UtensilsCrossed } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isChaat = theme === "chaat";
  return (
    <div className="glass-strong inline-flex items-center gap-1 rounded-full p-1 shadow-glow">
      <button
        type="button"
        onClick={() => setTheme("rose")}
        aria-pressed={!isChaat}
        className={[
          "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all",
          !isChaat
            ? "bg-gradient-to-r from-rose to-coral text-primary-foreground shadow-glow"
            : "text-foreground/70 hover:text-foreground",
        ].join(" ")}
        title="K-Pop Study Deck"
      >
        <Music2 className="h-3.5 w-3.5" />
        StageDeck
      </button>
      <button
        type="button"
        onClick={() => setTheme("chaat")}
        aria-pressed={isChaat}
        className={[
          "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all",
          isChaat
            ? "bg-gradient-to-r from-rose to-coral text-primary-foreground shadow-glow"
            : "text-foreground/70 hover:text-foreground",
        ].join(" ")}
        title="Indian Street Food Deck"
      >
        <UtensilsCrossed className="h-3.5 w-3.5" />
        ChaatDeck
      </button>
    </div>
  );
}
