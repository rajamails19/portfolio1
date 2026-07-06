import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site-layout";
import { GAMES } from "@/lib/math-data";
import gamesHero from "@/assets/hero-games.jpg";

export const Route = createFileRoute("/games")({
  head: () => ({
    meta: [
      { title: "Math Games — MathDreams" },
      { name: "description", content: "Kid-friendly math games to build skills through play." },
    ],
  }),
  component: GamesPage,
});

function GamesPage() {
  return (
    <PageShell
      eyebrow="Games"
      title="The MathDreams Arcade"
      subtitle="Sneak learning into playtime. Every game is designed to reinforce one math skill in a joyful, low-pressure way."
    >
      <div className="glass mb-10 overflow-hidden rounded-[2rem] p-3 shadow-glow">
        <img
          src={gamesHero}
          alt="Magical math arcade"
          loading="lazy"
          className="h-64 w-full rounded-[1.7rem] object-cover sm:h-80"
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {GAMES.map((g) => (
          <div
            key={g.title}
            className="glass rounded-3xl p-6 transition hover:-translate-y-1 hover:shadow-glow"
          >
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/70 text-3xl">
              {g.emoji}
            </div>
            <h3 className="mt-4 font-display text-xl font-bold">{g.title}</h3>
            <p className="mt-1 text-sm text-foreground/70">{g.desc}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              <span className="rounded-full bg-white/70 px-2.5 py-1 text-[11px] font-semibold">
                {g.topic}
              </span>
              <span className="rounded-full bg-white/70 px-2.5 py-1 text-[11px] font-semibold text-primary">
                {g.difficulty}
              </span>
            </div>
            <button
              disabled
              className="mt-5 w-full rounded-full bg-primary/90 px-4 py-2 text-sm font-semibold text-primary-foreground opacity-90"
            >
              Coming soon ✨
            </button>
          </div>
        ))}
      </div>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Meanwhile, warm up with a{" "}
        <Link to="/quiz" className="font-semibold text-primary underline">
          quiz
        </Link>{" "}
        or a{" "}
        <Link to="/puzzles" className="font-semibold text-primary underline">
          puzzle
        </Link>
        .
      </p>
    </PageShell>
  );
}
