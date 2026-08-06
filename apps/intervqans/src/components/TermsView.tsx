import { Sparkles } from "lucide-react";
import { termTiles } from "@/content/terms";

export function TermsView() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 pb-16 pt-8">
      <section className="glass-strong relative overflow-hidden rounded-4xl p-6 sm:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gold/15 blur-3xl"
        />
        <div className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-noir/60 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.25em] text-gold-ink">
          <Sparkles className="h-3.5 w-3.5" /> Tech Vocabulary
        </div>
        <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
          Simple tech terms,
          <span className="gradient-text"> explained clearly.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
          Quick tiles for the words you will hear in IT teams, product meetings, engineering
          chats, and real project work.
        </p>
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {termTiles.map((tile, index) => {
          const Icon = tile.icon;
          return (
            <article
              key={tile.term}
              className="animate-pop-in rounded-3xl bg-noir/45 p-6 shadow-soft ring-1 ring-gold/10 backdrop-blur transition hover:-translate-y-1 hover:ring-gold/35 hover:shadow-glow"
              style={{ animationDelay: `${index * 45}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
                    IT Term
                  </div>
                  <h2 className="mt-2 font-display text-2xl font-semibold text-foreground">
                    {tile.term}
                  </h2>
                </div>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold to-ember text-primary-foreground shadow-glow">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
              <p className="mt-5 text-sm font-semibold leading-6 text-foreground/85">
                {tile.short}
              </p>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                <span className="font-bold text-foreground">Why:</span> {tile.why}
              </p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                <span className="font-bold text-foreground">Example:</span> {tile.example}
              </p>
            </article>
          );
        })}
      </section>
    </div>
  );
}
