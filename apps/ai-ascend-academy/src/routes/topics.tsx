import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Layers, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { topics } from "@/lib/data";
import coverTopics from "@/assets/cover-topics.jpg";

export const Route = createFileRoute("/topics")({
  head: () => ({
    meta: [
      { title: "Topics — NeuroForge" },
      { name: "description", content: "Every AI / DS topic with marks-wise answers, diagrams, and links." },
    ],
  }),
  component: TopicsLayout,
});

function TopicsLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isIndex = pathname === "/topics";
  if (!isIndex) return <Outlet />;
  return <TopicsIndex />;
}

function TopicsIndex() {
  const [q, setQ] = useState("");
  const filtered = topics.filter((t) =>
    (t.title + t.category + t.blurb).toLowerCase().includes(q.toLowerCase())
  );
  const byCat = filtered.reduce<Record<string, typeof topics>>((acc, t) => {
    (acc[t.category] ||= []).push(t);
    return acc;
  }, {});

  return (
    <div className="p-6 md:p-10 space-y-8">
      <header className="relative overflow-hidden rounded-3xl glass-strong">
        <img src={coverTopics} alt="" loading="lazy" width={1024} height={768} className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.16_0.04_280)] via-[oklch(0.16_0.04_280_/_70%)] to-transparent" />
        <div className="relative p-8 md:p-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-widest text-cyan-300 ring-1 ring-white/10">
            <Layers className="h-3.5 w-3.5" /> Topic Atlas
          </div>
          <h1 className="mt-3 text-3xl md:text-5xl font-black"><span className="gradient-text">Topics</span></h1>
          <p className="mt-2 text-muted-foreground max-w-xl">Click any island. Each topic has 2 / 4 / 8 mark answers, diagrams, flow charts, and links — fill them as you grow.</p>
        </div>
      </header>

      <div className="relative max-w-xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search topics..." className="pl-11 h-12 rounded-full bg-white/5 border-white/10" />
      </div>

      <div className="space-y-8">
        {Object.entries(byCat).map(([cat, list]) => (
          <section key={cat}>
            <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">{cat}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {list.map((t) => (
                <Link
                  key={t.slug}
                  to="/topics/$slug"
                  params={{ slug: t.slug }}
                  className="group relative overflow-hidden rounded-2xl glass border border-white/10 p-5 hover:border-fuchsia-400/40 hover:-translate-y-1 hover:shadow-[var(--shadow-glow)] transition-all"
                >
                  <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full gradient-aurora opacity-30 blur-2xl group-hover:opacity-60 transition-opacity" />
                  <div className="relative">
                    <div className="text-3xl">{t.emoji}</div>
                    <div className="mt-2 font-bold text-base">{t.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">{t.blurb}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
