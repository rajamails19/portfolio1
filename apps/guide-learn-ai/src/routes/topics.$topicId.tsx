import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { TOPICS } from "@/lib/data";
import mascotTopics from "@/assets/mascot-topics.jpg";
import { useState } from "react";

export const Route = createFileRoute("/topics/$topicId")({
  head: ({ params }) => ({
    meta: [{ title: `${params.topicId} — NeuroNext` }],
  }),
  component: TopicDetail,
  notFoundComponent: () => (
    <AppShell>
      <div className="glass rounded-3xl p-10 text-center">
        <h2 className="text-2xl font-bold">Topic not found</h2>
        <Link to="/topics" className="mt-4 inline-block px-4 py-2 rounded-full grad-primary text-white">Back to topics</Link>
      </div>
    </AppShell>
  ),
  errorComponent: () => (
    <AppShell>
      <div className="glass rounded-3xl p-10 text-center">Something went wrong.</div>
    </AppShell>
  ),
});

const TABS = [
  { id: "2", label: "2 Marks", short: "2", grad: "grad-mint" },
  { id: "4", label: "4 Marks", short: "4", grad: "grad-peach" },
  { id: "8", label: "8 Marks", short: "8", grad: "grad-ocean" },
  { id: "16", label: "16 Marks", short: "16", grad: "grad-sunset" },
  { id: "diag", label: "Diagrams", short: "✦", grad: "grad-aurora" },
  { id: "flow", label: "Flow Chart", short: "↝", grad: "grad-primary" },
  { id: "links", label: "Links", short: "∞", grad: "grad-mint" },
] as const;

type TabId = typeof TABS[number]["id"];

function TopicDetail() {
  const { topicId } = Route.useParams();
  const topic = TOPICS.find((t) => t.id === topicId);
  if (!topic) throw notFound();

  const [tab, setTab] = useState<TabId>("2");

  const sixteenMark = topic.sixteenMark ?? [
    `Long-form essay: explain ${topic.title} end-to-end with derivations, assumptions, trade-offs, real-world deployment notes and a worked numerical example.`,
    `Compare ${topic.title} against two competing approaches — accuracy, complexity, interpretability, and when to pick which.`,
  ];

  return (
    <AppShell>
      <Link to="/topics" className="mb-4 inline-flex rounded-full glass-strong px-4 py-2 text-sm font-semibold text-foreground/70 hover:scale-[1.02] transition">
        ← All topics
      </Link>

      <div className="relative overflow-hidden rounded-3xl mb-6 glow-purple min-h-[310px] md:min-h-[360px] grad-peach">
        <div className="absolute inset-0 bg-card/25 backdrop-blur-[2px]" />
        <div className="absolute -left-20 -top-16 h-56 w-56 rounded-full grad-aurora opacity-70 blur-3xl animate-blob" />
        <div className="absolute left-1/2 bottom-0 h-56 w-72 rounded-full grad-ocean opacity-60 blur-3xl animate-blob" style={{ animationDelay: "-6s" }} />
        <div className="absolute right-8 top-10 hidden h-52 w-52 overflow-hidden rounded-3xl glass md:block rotate-3">
          <img src={topic.cover} alt={topic.title} className="h-full w-full object-cover" />
        </div>
        <div className="absolute right-40 bottom-8 hidden h-28 w-28 overflow-hidden rounded-3xl glass-strong md:block -rotate-6 animate-float">
          <img src={mascotTopics} alt="NeuroNext study mascot" className="h-full w-full object-cover" />
        </div>

        <div className="relative z-10 p-6 md:p-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur text-[11px] font-bold uppercase tracking-wider text-foreground/70">
            <span className="h-4 w-4 rounded-full grad-primary shadow-sm" /> {topic.category}
          </div>
          <h1 className="mt-5 text-4xl md:text-6xl font-extrabold leading-tight">
            <span className="text-grad">{topic.title}</span>
          </h1>
          <p className="mt-3 max-w-2xl text-base md:text-lg font-medium text-foreground/70">
            A complete exam-ready studio for quick answers, long essays, diagrams, flows and references — all in one pastel glass workspace.
          </p>

          <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
            <MiniStat label="2 marks" value={topic.twoMark.length} grad="grad-mint" />
            <MiniStat label="4 marks" value={topic.fourMark.length} grad="grad-peach" />
            <MiniStat label="8 marks" value={topic.eightMark.length} grad="grad-ocean" />
            <MiniStat label="diagrams" value={topic.diagrams.length} grad="grad-aurora" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="glass rounded-3xl p-2 mb-5 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-7 gap-2">
        {TABS.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={[
                "group relative overflow-hidden rounded-2xl p-2 text-left transition hover:scale-[1.02]",
                active ? "glass-strong shadow-lg scale-[1.02]" : "bg-card/40 hover:bg-card/70",
              ].join(" ")}
            >
              <span className={`absolute inset-0 ${t.grad} opacity-${active ? "70" : "35"}`} />
              <span className="relative flex items-center gap-2">
                <span className="h-11 w-11 shrink-0 overflow-hidden rounded-xl glass-strong grid place-items-center text-lg font-extrabold text-foreground">
                  {t.id === "diag" ? <img src={topic.diagrams[0]?.cover ?? topic.cover} alt="" className="h-full w-full object-cover" /> : t.id === "flow" ? <img src={mascotTopics} alt="" className="h-full w-full object-cover" /> : t.short}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-extrabold text-foreground leading-tight">{t.label}</span>
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-foreground/60">open section</span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="relative overflow-hidden glass rounded-3xl p-5 md:p-7 min-h-[360px] animate-slide-up" key={tab}>
        <div className="absolute -right-12 -top-16 h-52 w-52 rounded-full grad-aurora opacity-50 blur-3xl" />
        <div className="absolute -left-14 bottom-0 h-56 w-56 rounded-full grad-ocean opacity-40 blur-3xl" />
        <div className="relative z-10">
        {tab === "2" && <QuestionList items={topic.twoMark} grad="grad-mint" />}
        {tab === "4" && <QuestionList items={topic.fourMark} grad="grad-peach" />}
        {tab === "8" && <QuestionList items={topic.eightMark} grad="grad-ocean" />}
        {tab === "16" && <QuestionList items={sixteenMark} grad="grad-sunset" longForm />}

        {tab === "diag" && (
          <div className="grid sm:grid-cols-2 gap-5">
            {topic.diagrams.map((d, i) => (
              <div key={i} className="rounded-3xl overflow-hidden glass-strong group hover:-translate-y-1 transition">
                <div className="relative h-60 overflow-hidden">
                  <img src={d.cover} alt={d.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                </div>
                <div className="p-4">
                  <div className="font-extrabold text-lg">{d.title}</div>
                  <div className="text-sm text-muted-foreground">{d.note}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "flow" && (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {topic.flow.map((step, i) => (
              <div key={i} className="relative overflow-hidden rounded-3xl glass-strong p-4 min-h-28 animate-slide-up" style={{ animationDelay: `${i * 55}ms` }}>
                <div className={`absolute inset-0 ${i % 2 ? "grad-peach" : topic.gradient} opacity-45`} />
                <div className="relative flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl glass grid place-items-center text-xl font-extrabold text-grad">{i + 1}</div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-foreground/55 font-bold">Step {i + 1}</div>
                    <div className="text-lg font-extrabold">{step}</div>
                  </div>
                </div>
                {i < topic.flow.length - 1 && <div className="absolute right-4 bottom-3 text-2xl text-foreground/25">↝</div>}
              </div>
            ))}
          </div>
        )}

        {tab === "links" && (
          <ul className="grid gap-3">
            {topic.links.length === 0 && (
              <li className="glass-strong rounded-3xl p-6 text-sm font-medium text-muted-foreground">No links yet. Add references as you study.</li>
            )}
            {topic.links.map((l, i) => (
              <li key={i}>
                <a href={l.url} target="_blank" rel="noreferrer" className="glass-strong rounded-3xl p-4 flex items-center gap-3 hover:scale-[1.01] transition">
                  <span className="h-14 w-14 shrink-0 rounded-2xl grad-ocean grid place-items-center text-xl font-extrabold text-grad">∞</span>
                  <span className="min-w-0">
                    <span className="block text-sm font-extrabold">{l.label}</span>
                    <span className="block truncate text-xs text-muted-foreground">{l.url}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
        </div>
      </div>
    </AppShell>
  );
}

function MiniStat({ label, value, grad }: { label: string; value: number; grad: string }) {
  return (
    <div className="glass-strong rounded-2xl p-3 relative overflow-hidden">
      <div className={`absolute -right-6 -top-6 h-16 w-16 rounded-full ${grad} opacity-70 blur-xl`} />
      <div className="relative text-2xl font-extrabold text-grad">{value}</div>
      <div className="relative text-[10px] uppercase tracking-wider font-bold text-foreground/60">{label}</div>
    </div>
  );
}

function QuestionList({ items, grad, longForm }: { items: string[]; grad: string; longForm?: boolean }) {
  return (
    <ul className="grid lg:grid-cols-2 gap-4">
      {items.map((q, i) => (
        <li key={i} className={["relative overflow-hidden glass-strong rounded-3xl p-5 animate-slide-up hover:-translate-y-1 transition", longForm ? "lg:col-span-2" : ""].join(" ")} style={{ animationDelay: `${i * 60}ms` }}>
          <div className={`absolute inset-x-0 top-0 h-1.5 ${grad}`} />
          <div className="flex gap-4 items-start">
            <span className={`h-14 w-14 shrink-0 rounded-2xl ${grad} glass grid place-items-center text-sm font-extrabold text-foreground shadow-lg`}>Q{i + 1}</span>
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Prompt card</div>
              <p className="mt-1 text-base font-bold leading-relaxed">{q}</p>
              <div className="mt-4 rounded-2xl bg-card/45 border border-border p-4 text-sm text-muted-foreground">
                Write your answer here — bullets, formula, intuition, tiny example, and final exam phrase.
              </div>
            </div>
          </div>
        </li>
      ))}
      <li className="glass rounded-3xl p-5 text-sm font-semibold text-muted-foreground lg:col-span-2">Fill in answers over time.</li>
    </ul>
  );
}

