import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site-layout";
import { TOPICS } from "@/lib/math-data";

export const Route = createFileRoute("/topics/")({
  head: () => ({
    meta: [
      { title: "All Math Topics — MathDreams" },
      {
        name: "description",
        content:
          "Fractions, addition, subtraction, multiplication, division, geometry, word problems and pre-algebra.",
      },
    ],
  }),
  component: TopicsIndex,
});

function TopicsIndex() {
  return (
    <PageShell
      eyebrow="Topics"
      title="The whole math universe"
      subtitle="Every topic has a friendly explainer, tips & tricks, worked examples and a mini quiz."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TOPICS.map((t) => (
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
              <div className="absolute right-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-semibold text-foreground/70">
                Grades {t.grades[0]}–{t.grades[t.grades.length - 1]}
              </div>
            </div>
            <div className="px-3 py-4">
              <p className="text-sm text-foreground/70">{t.tagline}</p>
              <p className="mt-2 text-xs font-semibold text-primary">Open topic →</p>
            </div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
