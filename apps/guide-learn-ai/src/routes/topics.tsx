import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { TOPICS } from "@/lib/data";
import mascotTopics from "@/assets/mascot-topics.jpg";

export const Route = createFileRoute("/topics")({
  component: TopicsLayout,
});

function TopicsLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return pathname === "/topics" ? <TopicsPage /> : <Outlet />;
}

function TopicsPage() {
  const cats = Array.from(new Set(TOPICS.map((t) => t.category)));
  return (
    <AppShell>
      <PageHeader
        eyebrow="The big map"
        title={<><span className="text-grad">Topics</span> & deep dives</>}
        subtitle="Click any topic to open its subpage — 2 marks, 4 marks, 8 marks, diagrams, flow charts and links. Fill them in over time."
        mascotSrc={mascotTopics}
        gradient="grad-peach"
      />

      {cats.map((cat) => (
        <section key={cat} className="mb-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3 px-1">
            {cat}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TOPICS.filter((t) => t.category === cat).map((t) => (
              <Link
                key={t.id}
                to="/topics/$topicId"
                params={{ topicId: t.id }}
                className="flip-card h-64"
              >
                <div className="flip-inner h-full">
                  <div className="flip-face rounded-3xl overflow-hidden glass shadow-xl">
                    <img src={t.cover} alt={t.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
                    <div className="absolute top-3 right-3 glass-strong text-[10px] font-bold px-2 py-1 rounded-full">
                      {t.category}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <div className="text-lg font-extrabold leading-tight drop-shadow">{t.title}</div>
                      <div className="text-[11px] opacity-90">Tap to open subpage</div>
                    </div>
                  </div>
                  <div className="flip-face flip-back rounded-3xl glass-dark p-5 flex flex-col">
                    <div className="text-xs uppercase tracking-wider text-white/70">Inside</div>
                    <ul className="mt-2 text-sm space-y-1.5 text-white/95">
                      <li>• {t.twoMark.length} two-mark Qs</li>
                      <li>• {t.fourMark.length} four-mark Qs</li>
                      <li>• {t.eightMark.length} eight-mark Qs</li>
                      <li>• {t.diagrams.length} diagram(s)</li>
                      <li>• {t.flow.length}-step flow</li>
                    </ul>
                    <div className="mt-auto text-sm font-semibold">Open subpage →</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </AppShell>
  );
}