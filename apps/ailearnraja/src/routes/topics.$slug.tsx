import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { topics } from "@/lib/content";
import { ArrowLeft, FileText, Workflow, ImageIcon, Link2 } from "lucide-react";

export const Route = createFileRoute("/topics/$slug")({
  loader: ({ params }) => {
    const topic = topics.find((t) => t.slug === params.slug);
    if (!topic) throw notFound();
    return { topic };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.topic.title ?? "Topic"} — Aetheria` },
      { name: "description", content: loaderData?.topic.tagline ?? "Topic spire" },
      { property: "og:image", content: loaderData?.topic.image },
    ],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="font-display text-4xl text-gradient-ember">Spire not found</h1>
      <Link to="/topics" className="mt-6 inline-block text-[oklch(0.85_0.14_85)]">← back to topics</Link>
    </div>
  ),
  component: TopicDetail,
});

const tabs = [
  { id: "2", label: "2 Marks", icon: FileText },
  { id: "4", label: "4 Marks", icon: FileText },
  { id: "8", label: "8 Marks", icon: FileText },
  { id: "diagrams", label: "Diagrams", icon: ImageIcon },
  { id: "flow", label: "Flowcharts", icon: Workflow },
  { id: "links", label: "Links", icon: Link2 },
] as const;

function TopicDetail() {
  const { topic } = Route.useLoaderData();
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("2");

  return (
    <div>
      {/* topic hero */}
      <section className="relative h-[50vh] min-h-[380px] overflow-hidden">
        <img src={topic.image} alt={topic.title} className="absolute inset-0 w-full h-full object-cover animate-drift" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
        <div className="relative z-10 mx-auto max-w-6xl px-6 h-full flex flex-col justify-end pb-12">
          <Link to="/topics" className="ember-chip mb-4 w-fit hover:bg-[oklch(0.85_0.14_85/0.15)] transition">
            <ArrowLeft className="w-3 h-3" /> All spires
          </Link>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-gradient-ember">{topic.title}</h1>
          <p className="font-serif italic text-lg text-foreground/85 mt-3 max-w-2xl">{topic.tagline}</p>
        </div>
      </section>

      {/* tabs */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-wrap gap-2 p-1.5 rounded-full bg-[oklch(0.20_0.035_270/0.7)] border border-[oklch(0.85_0.14_85/0.18)] backdrop-blur-sm w-fit mx-auto">
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium inline-flex items-center gap-1.5 transition-all ${
                  active
                    ? "bg-gradient-to-r from-[oklch(0.72_0.19_45)] to-[oklch(0.85_0.14_85)] text-[oklch(0.16_0.03_270)] shadow-glow"
                    : "text-foreground/70 hover:text-foreground hover:bg-[oklch(0.85_0.14_85/0.08)]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" /> {t.label}
              </button>
            );
          })}
        </div>

        <div className="mt-10 animate-fade-in">
          {tab === "2" && <PlaceholderList label="2-mark answer" count={6} marks="Short, sharp, definition-level." />}
          {tab === "4" && <PlaceholderList label="4-mark answer" count={5} marks="Mid-depth, include one example." />}
          {tab === "8" && <PlaceholderList label="8-mark answer" count={4} marks="Long-form with structure, diagram, and example." />}
          {tab === "diagrams" && <PlaceholderGrid label="Diagram" count={4} image={topic.image} />}
          {tab === "flow" && <PlaceholderGrid label="Flowchart" count={3} image={topic.image} />}
          {tab === "links" && <LinkList />}
        </div>
      </section>
    </div>
  );
}

function PlaceholderList({ label, count, marks }: { label: string; count: number; marks: string }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <article key={i} className="rounded-2xl border border-[oklch(0.85_0.14_85/0.18)] bg-gradient-to-b from-[oklch(0.22_0.04_270/0.7)] to-[oklch(0.16_0.03_270/0.85)] backdrop-blur-sm p-6 shadow-cinematic hover:translate-y-[-2px] transition-transform">
          <div className="flex items-start gap-4">
            <span className="font-display text-3xl text-gradient-ember">{String(i + 1).padStart(2, "0")}</span>
            <div className="flex-1">
              <div className="ember-chip mb-2">{label}</div>
              <h3 className="font-display text-xl text-foreground/95">Coming soon — Question {i + 1}</h3>
              <p className="font-serif italic text-foreground/70 mt-2">{marks} Drop your content here over the next days.</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function PlaceholderGrid({ label, count, image }: { label: string; count: number; image: string }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="cinematic-card relative h-64 group">
          <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms]" loading="lazy" />
          <div className="card-content absolute inset-0 flex flex-col justify-end p-5">
            <span className="ember-chip mb-2 w-fit">{label} {i + 1}</span>
            <h4 className="font-display text-lg text-gradient-ember">Coming soon</h4>
          </div>
        </div>
      ))}
    </div>
  );
}

function LinkList() {
  const links = [
    { title: "Reference paper / blog #1", url: "#" },
    { title: "Reference paper / blog #2", url: "#" },
    { title: "Reference paper / blog #3", url: "#" },
  ];
  return (
    <ul className="space-y-3 max-w-3xl mx-auto">
      {links.map((l, i) => (
        <li key={i}>
          <a href={l.url} className="flex items-center justify-between rounded-xl px-5 py-4 border border-[oklch(0.85_0.14_85/0.18)] bg-[oklch(0.20_0.035_270/0.7)] hover:bg-[oklch(0.85_0.14_85/0.08)] transition-colors">
            <span className="font-serif italic text-foreground/90">{l.title}</span>
            <Link2 className="w-4 h-4 text-[oklch(0.85_0.14_85)]" />
          </a>
        </li>
      ))}
    </ul>
  );
}
