import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/site-layout";
import { GRADES, TOPICS } from "@/lib/math-data";
import { TESTS } from "@/lib/test-data";

export const Route = createFileRoute("/grades/$grade")({
  loader: ({ params }): (typeof GRADES)[number] => {
    const g = GRADES.find((x) => String(x.grade) === params.grade);
    if (!g) throw notFound();
    return g;
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.title} — ${loaderData.subtitle} · MathDreams`
          : "Grade · MathDreams",
      },
      {
        name: "description",
        content: loaderData
          ? `${loaderData.title} math: ${loaderData.topics.join(", ")}.`
          : "Grade-level math lessons.",
      },
    ],
  }),
  component: GradeDetail,
});

function GradeDetail() {
  const g = Route.useLoaderData() as (typeof GRADES)[number];
  const topics = TOPICS.filter((t) => (g.topics as string[]).includes(t.slug));
  const tests = TESTS.filter((t) => (g.tests as string[]).includes(t.slug));
  const showTests = tests.length > 0;


  return (
    <PageShell
      eyebrow={`Grade ${g.grade}`}
      title={g.subtitle}
      subtitle={`Everything a ${g.title.toLowerCase()} student needs — hand-picked topics, warm-ups, tips and a mini quiz for each.`}
    >
      <div className="mb-8 flex flex-wrap gap-2">
        <Link to="/grades" className="glass rounded-full px-4 py-2 text-sm font-semibold">
          ← All grades
        </Link>
        <Link to="/quiz" className="glass rounded-full px-4 py-2 text-sm font-semibold">
          Quick quiz
        </Link>
        <Link to="/games" className="glass rounded-full px-4 py-2 text-sm font-semibold">
          Play a game
        </Link>
      </div>

      {showTests ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tests.map((t, i) => (
            <Link
              key={t.slug}
              to="/tests/$test"
              params={{ test: t.slug }}
              className="group glass overflow-hidden rounded-3xl p-6 transition hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/15 font-display text-xl font-bold text-primary">
                  {i + 1}
                </span>
                <div>
                  <p className="font-display text-2xl font-bold">{t.title}</p>
                  <p className="text-sm text-foreground/60">
                    {t.sections.reduce((n, s) => n + s.problems.length, 0)} problems · {t.sections.length} sections
                  </p>
                </div>
              </div>
              <p className="mt-3 text-xs font-semibold text-primary">Open test →</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((t) => (
            <Link
              key={t.slug}
              to="/topics/$topic"
              params={{ topic: t.slug }}
              className="group glass overflow-hidden rounded-3xl p-2 transition hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="relative overflow-hidden rounded-[1.3rem]">
                <img
                  src={t.image}
                  alt={t.name}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-xs font-semibold">
                  {t.emoji} {t.name}
                </div>
              </div>
              <div className="px-3 py-4">
                <p className="text-sm text-foreground/70">{t.tagline}</p>
                <p className="mt-2 text-xs font-semibold text-primary">Open topic →</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </PageShell>
  );
}
