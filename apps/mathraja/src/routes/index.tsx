import { createFileRoute, Link } from "@tanstack/react-router";
import mascot from "@/assets/mascot-hero.jpg";
import { SiteHeader, SiteFooter } from "@/components/site-layout";
import { TOPICS, GRADES, TIPS } from "@/lib/math-data";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="aurora min-h-screen">
      <SiteHeader />

      {/* HERO */}
      <section className="relative mx-auto max-w-7xl px-4 pt-10 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
              ✨ For grades 1–6
            </span>
            <h1 className="mt-4 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              <span className="text-gradient">Math that feels</span>
              <br />
              <span className="text-gradient">like a fairytale.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Meet <b>Zog</b>, our fuzzy resident math monster. He turns fractions,
              geometry, times tables and word problems into a wild little lab
              adventure — with tips, tricks, quizzes, puzzles and games.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/grades"
                className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-[1.03]"
              >
                Pick your grade →
              </Link>
              <Link
                to="/games"
                className="glass inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-foreground/80 transition hover:scale-[1.03]"
              >
                🎮 Play a game
              </Link>
              <Link
                to="/puzzles"
                className="glass inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-foreground/80 transition hover:scale-[1.03]"
              >
                🧩 Try a puzzle
              </Link>
            </div>

            <dl className="mt-10 grid max-w-md grid-cols-3 gap-2">
              {[
                { k: "6", v: "Grade levels" },
                { k: "8+", v: "Big topics" },
                { k: "∞", v: "Fun" },
              ].map((s) => (
                <div key={s.v} className="glass rounded-2xl px-3 py-3 text-center">
                  <div className="font-display text-2xl font-bold text-gradient">{s.k}</div>
                  <div className="text-xs text-muted-foreground">{s.v}</div>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-fuchsia-300/40 via-rose-200/40 to-amber-200/40 blur-2xl" />
            <div className="glass relative overflow-hidden rounded-[2.5rem] p-3 shadow-glow">
              <img
                src={mascot}
                alt="Zog the math monster holding a glowing crystal"
                width={1280}
                height={1280}
                className="h-full w-full rounded-[2rem] object-cover"
              />
            </div>
            <div className="glass animate-float absolute -left-4 top-10 rounded-2xl px-4 py-3 text-sm font-semibold">
              1/2 + 1/2 = 1 🍰
            </div>
            <div
              className="glass animate-float absolute -right-2 bottom-16 rounded-2xl px-4 py-3 text-sm font-semibold"
              style={{ animationDelay: "1.5s" }}
            >
              7 × 8 = 56 ✨
            </div>
          </div>
        </div>
      </section>

      {/* GRADES */}
      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
        <SectionHead
          eyebrow="Grades"
          title="Pick your level"
          desc="Every grade unlocks a curated set of topics with lessons, quizzes and games at the right pace."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GRADES.map((g) => (
            <Link
              key={g.grade}
              to="/grades/$grade"
              params={{ grade: String(g.grade) }}
              className="group glass relative overflow-hidden rounded-3xl p-6 transition hover:-translate-y-1 hover:shadow-glow"
            >
              <div
                className={`absolute inset-0 -z-10 bg-gradient-to-br ${g.color} opacity-60`}
              />
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-display text-4xl font-bold">{g.title}</div>
                  <div className="mt-1 text-sm font-medium text-foreground/70">
                    {g.subtitle}
                  </div>
                </div>
                <div className="glass grid h-12 w-12 place-items-center rounded-2xl text-lg font-bold">
                  {g.grade}
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {g.topics.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-white/60 px-2.5 py-1 text-[11px] font-medium capitalize text-foreground/70"
                  >
                    {t.replace("-", " ")}
                  </span>
                ))}
              </div>
              <div className="mt-5 text-sm font-semibold text-primary opacity-0 transition group-hover:opacity-100">
                Explore →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* TOPICS */}
      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
        <SectionHead
          eyebrow="Topics"
          title="Explore the math universe"
          desc="From counting pebbles to solving for x — every topic has tips, tricks, worked examples and a quick quiz."
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TOPICS.map((t) => (
            <Link
              key={t.slug}
              to="/topics/$topic"
              params={{ topic: t.slug }}
              className="group glass relative overflow-hidden rounded-3xl p-2 transition hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="relative overflow-hidden rounded-[1.4rem]">
                <img
                  src={t.image}
                  alt={t.name}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                <div className="absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-xs font-semibold">
                  {t.emoji} {t.name}
                </div>
              </div>
              <div className="px-3 py-3">
                <p className="text-sm text-foreground/70">{t.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* TIPS */}
      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
        <SectionHead
          eyebrow="For parents & kids"
          title="Tiny habits, big math brains"
          desc="Our favorite research-backed tips to raise a confident young mathematician."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {TIPS.slice(0, 6).map((tip) => (
            <div key={tip.title} className="glass rounded-3xl p-6">
              <div className="text-3xl">{tip.icon}</div>
              <h3 className="mt-3 font-display text-lg font-semibold">{tip.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{tip.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
        <div className="glass relative overflow-hidden rounded-[2.5rem] p-10 text-center shadow-glow">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-fuchsia-200/60 via-rose-200/60 to-amber-200/60" />
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            <span className="text-gradient">Ready to make numbers glow?</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Jump into a grade, chase a puzzle, or race Zog through the times-tables track.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/quiz"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow"
            >
              Start a quiz
            </Link>
            <Link to="/times-tables" className="glass rounded-full px-6 py-3 text-sm font-semibold">
              Times-tables trainer
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function SectionHead({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="max-w-2xl">
      <span className="glass inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
        {eyebrow}
      </span>
      <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
        <span className="text-gradient">{title}</span>
      </h2>
      {desc && <p className="mt-2 text-muted-foreground">{desc}</p>}
    </div>
  );
}
