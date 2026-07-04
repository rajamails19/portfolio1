import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, FileText, GitBranch, Link2, Workflow } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { topics } from "@/lib/data";

export const Route = createFileRoute("/topics/$slug")({
  loader: ({ params }) => {
    const topic = topics.find((t) => t.slug === params.slug);
    if (!topic) throw notFound();
    return { topic };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.topic.title ?? "Topic"} — NeuroForge` },
      { name: "description", content: loaderData?.topic.blurb ?? "Topic detail page." },
    ],
  }),
  component: TopicPage,
  notFoundComponent: () => (
    <div className="p-10">
      <Link to="/topics" className="text-fuchsia-300 underline">← Back to topics</Link>
      <p className="mt-4 text-muted-foreground">Topic not found.</p>
    </div>
  ),
});

function TopicPage() {
  const { topic } = Route.useLoaderData();
  return (
    <div className="p-6 md:p-10 space-y-8">
      <Link to="/topics" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> All topics
      </Link>

      <header className="relative overflow-hidden rounded-3xl glass-strong p-8 md:p-10">
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full gradient-aurora opacity-30 blur-3xl" />
        <div className="relative flex items-start gap-5">
          <div className="text-6xl md:text-7xl animate-float">{topic.emoji}</div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-cyan-300">{topic.category}</div>
            <h1 className="mt-1 text-3xl md:text-5xl font-black"><span className="gradient-text">{topic.title}</span></h1>
            <p className="mt-2 text-muted-foreground max-w-2xl">{topic.blurb}</p>
          </div>
        </div>
      </header>

      <Tabs defaultValue="2" className="w-full">
        <TabsList className="glass rounded-full p-1 h-auto flex-wrap gap-1">
          {[
            { v: "2", l: "2 Marks", icon: FileText },
            { v: "4", l: "4 Marks", icon: FileText },
            { v: "8", l: "8 Marks", icon: FileText },
            { v: "diagrams", l: "Diagrams", icon: GitBranch },
            { v: "flow", l: "Flow Charts", icon: Workflow },
            { v: "links", l: "Links", icon: Link2 },
          ].map(({ v, l, icon: Icon }) => (
            <TabsTrigger
              key={v}
              value={v}
              className="rounded-full px-4 py-2 text-sm data-[state=active]:gradient-aurora data-[state=active]:text-white data-[state=active]:shadow-[var(--shadow-glow)]"
            >
              <Icon className="h-3.5 w-3.5 mr-1.5" />
              {l}
            </TabsTrigger>
          ))}
        </TabsList>

        {(["2", "4", "8"] as const).map((m) => (
          <TabsContent key={m} value={m} className="mt-6">
            <Placeholder title={`${m}-mark answer`} body={`Write your ${m}-mark answer for "${topic.title}" here. Use bullets, formulas, intuition — whatever helps it stick.`} />
          </TabsContent>
        ))}

        <TabsContent value="diagrams" className="mt-6">
          <Placeholder title="Diagrams" body="Drop labeled architecture diagrams, network graphs, decision boundaries, etc." />
        </TabsContent>
        <TabsContent value="flow" className="mt-6">
          <Placeholder title="Flow Charts" body="Sketch out training loops, data pipelines, evaluation flows." />
        </TabsContent>
        <TabsContent value="links" className="mt-6">
          <Placeholder title="Links & Resources" body="Drop papers, YouTube videos, GitHub repos, blog posts." />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Placeholder({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-3xl glass border border-dashed border-white/15 p-8 md:p-12 text-center">
      <div className="mx-auto h-14 w-14 rounded-2xl gradient-aurora grid place-items-center glow">
        <FileText className="h-6 w-6 text-white" />
      </div>
      <h3 className="mt-4 text-xl font-bold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">{body}</p>
      <button className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm font-medium ring-1 ring-white/10 hover:bg-white/10">
        + Add content
      </button>
    </div>
  );
}
