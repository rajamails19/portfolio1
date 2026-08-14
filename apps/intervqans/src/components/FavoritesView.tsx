import { BookOpen, Heart, Sparkles } from "lucide-react";
import { FavoritesTable } from "./TheoryFavorites";
import { useTheoryFavorites } from "@/hooks/use-theory-favorites";
import { useTheme } from "@/themes/ThemeContext";

export function FavoritesView() {
  const { themeKey } = useTheme();
  const enabled = themeKey === "rocky";
  const { favorites, removeFavorite } = useTheoryFavorites(enabled);

  return (
    <div className="theory-canvas relative min-h-dvh overflow-x-clip pb-24">
      <div aria-hidden className="theory-grid" />
      <div className="relative mx-auto w-full max-w-[1500px] px-4 pb-10 pt-20 sm:px-6 lg:px-8 lg:pt-10">
        <header className="relative overflow-hidden rounded-[2rem] border border-gold/20 glass p-7 shadow-[0_28px_90px_-48px_oklch(0.2_0.05_60/0.65)] sm:p-10">
          <div className="relative max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-ember/30 bg-ember/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.25em] text-ember">
              <Sparkles className="h-3.5 w-3.5" /> DAnalyst · Basics POC
            </div>
            <div className="mt-6 flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-ember/40 bg-ember/15 text-ember shadow-sm">
                <Heart className="h-7 w-7" fill="currentColor" />
              </span>
              <h1 className="font-display text-4xl font-semibold leading-none sm:text-6xl">
                <span className="gradient-text">Favorites</span>
              </h1>
            </div>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/72 sm:text-lg">
              Your hand-picked words and passages from DAnalyst Basics, kept in the order you save
              them.
            </p>
            <a
              href="/theory?topic=Basics"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-noir/60 px-4 py-2.5 text-xs font-bold text-gold-ink transition hover:border-gold/55 hover:bg-noir"
            >
              <BookOpen className="h-4 w-4" /> Open Basics to select text
            </a>
          </div>
        </header>

        <main className="mt-5">
          {enabled ? (
            <FavoritesTable favorites={favorites} onRemove={removeFavorite} />
          ) : (
            <div className="glass rounded-[2rem] border border-gold/20 px-6 py-14 text-center text-foreground/70">
              Favorites are currently available in DAnalyst as a proof of concept.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
