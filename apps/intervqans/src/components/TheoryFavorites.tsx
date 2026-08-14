import { Heart, Sparkles, Trash2 } from "lucide-react";
import type { TheoryFavorite } from "@/hooks/use-theory-favorites";

export function FavoriteHeart({ active, onClick }: { active: boolean; onClick: () => void }) {
  const label = active ? "Remove from Favorites" : "Add to Favorites";

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      title={label}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      className={[
        "inline-flex shrink-0 items-center justify-center rounded-full border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember/70",
        "h-10 gap-2 px-3 text-xs font-bold",
        active
          ? "border-ember/60 bg-ember text-white shadow-[0_8px_24px_-10px_var(--ember)]"
          : "border-gold/25 bg-noir/75 text-foreground/70 hover:border-ember/55 hover:text-ember",
      ].join(" ")}
    >
      <Heart className="h-4 w-4" fill={active ? "currentColor" : "none"} />
      {active ? "Saved" : "Favorite"}
    </button>
  );
}

export function FavoritesTable({
  favorites,
  onRemove,
}: {
  favorites: TheoryFavorite[];
  onRemove: (id: string) => void;
}) {
  if (favorites.length === 0) {
    return (
      <div className="glass rounded-[2rem] border border-gold/20 px-5 py-14 text-center sm:px-8">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/25 bg-gold/10 text-gold-ink">
          <Heart className="h-6 w-6" />
        </span>
        <h2 className="mt-5 font-display text-2xl font-semibold">
          Your Favorites will collect here
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-foreground/65">
          Open DAnalyst Basics and highlight any useful text—even a single word. A Favorite button
          will appear beside your selection, and each saved snippet will be appended as a new row.
        </p>
      </div>
    );
  }

  return (
    <section className="overflow-hidden rounded-[2rem] border border-gold/20 bg-noir/55 shadow-[0_24px_70px_-45px_var(--ember)]">
      <header className="flex items-center justify-between gap-4 border-b border-gold/15 px-5 py-5 sm:px-7">
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-gold-ink">
            <Sparkles className="h-3.5 w-3.5" /> DAnalyst · Basics
          </p>
          <h2 className="mt-1 font-display text-2xl font-semibold">Saved Favorites</h2>
        </div>
        <span className="shrink-0 rounded-full border border-ember/35 bg-ember/15 px-3 py-1.5 text-xs font-bold text-ember">
          {favorites.length} {favorites.length === 1 ? "item" : "items"}
        </span>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] table-fixed text-left text-sm">
          <thead className="bg-[oklch(0.16_0.02_20)] text-[10px] uppercase tracking-[0.18em] text-gold-ink/80">
            <tr>
              <th className="w-14 px-4 py-3 text-center">#</th>
              <th className="w-52 px-4 py-3">Source</th>
              <th className="px-4 py-3">Favorite</th>
              <th className="w-32 px-4 py-3">Type</th>
              <th className="w-16 px-4 py-3 text-center">Remove</th>
            </tr>
          </thead>
          <tbody>
            {favorites.map((favorite, index) => (
              <tr
                key={favorite.id}
                className="border-t border-gold/10 align-top odd:bg-white/[0.025]"
              >
                <td className="px-4 py-4 text-center font-display text-lg font-semibold text-ember">
                  {String(index + 1).padStart(2, "0")}
                </td>
                <td className="px-4 py-4">
                  <a
                    href={`/theory?topic=Basics#${favorite.sourceId}`}
                    className="break-words text-left font-semibold leading-snug text-gold-ink underline decoration-gold/35 decoration-dotted underline-offset-4 transition hover:decoration-gold"
                  >
                    {favorite.sourceTitle}
                  </a>
                </td>
                <td className="px-4 py-4">
                  <p className="whitespace-pre-wrap break-words leading-relaxed text-foreground/82">
                    {favorite.content}
                  </p>
                </td>
                <td className="px-4 py-4">
                  <span className="inline-flex rounded-full border border-gold/20 bg-gold/10 px-2.5 py-1 text-[11px] font-semibold text-foreground/72">
                    {favorite.kind}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <button
                    type="button"
                    aria-label={`Remove favorite from ${favorite.sourceTitle}`}
                    title="Remove favorite"
                    onClick={() => onRemove(favorite.id)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ember/25 bg-ember/10 text-ember transition hover:border-ember/55 hover:bg-ember/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember/70"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
