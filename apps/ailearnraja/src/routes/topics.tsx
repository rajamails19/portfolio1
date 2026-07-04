import { createFileRoute, Link } from "@tanstack/react-router";
import heroTopics from "@/assets/hero-topics.jpg";
import { SectionHero } from "@/components/SectionHero";
import { topics } from "@/lib/content";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/topics")({
  head: () => ({ meta: [{ title: "Topic Spires — Aetheria" }, { name: "description", content: "Topic subpages with 2/4/8 mark answers, diagrams, and resource links." }] }),
  component: TopicsPage,
});

function TopicsPage() {
  return (
    <div>
      <SectionHero
        image={heroTopics}
        eyebrow="Realm 2 of 5 · Crystal Spires"
        title="Topic Spires"
        subtitle="Each tribe its own kingdom — open a spire to find 2 / 4 / 8 mark answers, flowcharts, diagrams, and curated links."
      />

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {topics.map((t) => (
            <Link
              key={t.slug}
              to="/topics/$slug"
              params={{ slug: t.slug }}
              className="cinematic-card group block relative h-[400px]"
            >
              <img src={t.image} alt={t.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" loading="lazy" />
              <div className="card-content absolute inset-0 flex flex-col justify-end p-6">
                <span className="ember-chip mb-3 w-fit">{t.realm}</span>
                <h3 className="font-display text-3xl font-bold text-gradient-ember drop-shadow-[0_4px_18px_rgba(0,0,0,0.7)]">{t.title}</h3>
                <p className="font-serif italic text-foreground/85 mt-1.5">{t.tagline}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs text-[oklch(0.85_0.14_85)] opacity-0 group-hover:opacity-100 transition-opacity">
                  Open spire <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
