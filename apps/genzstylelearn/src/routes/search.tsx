import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { feed, topics } from "@/lib/data";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/search")({
  head: () => ({ meta: [{ title: "Search · Lumen" }] }),
  component: SearchPage,
});

const searchable = feed.filter((p) => p.kind !== "quote") as Extract<
  (typeof feed)[number],
  { title: string; img: string }
>[];

function SearchPage() {
  const [query, setQuery] = useState("");

  const results =
    query.trim().length === 0
      ? []
      : searchable.filter(
          (p) =>
            p.title.toLowerCase().includes(query.toLowerCase()) ||
            p.tag.toLowerCase().includes(query.toLowerCase()) ||
            p.author.toLowerCase().includes(query.toLowerCase()) ||
            p.caption.toLowerCase().includes(query.toLowerCase()),
        );

  const topicResults =
    query.trim().length === 0
      ? []
      : topics.filter(
          (t) =>
            t.name.toLowerCase().includes(query.toLowerCase()) ||
            t.desc.toLowerCase().includes(query.toLowerCase()),
        );

  return (
    <AppShell>
      <div className="max-w-xl mx-auto px-4 py-6">
        <h1 className="text-xl font-extrabold mb-5">Search</h1>

        {/* search input */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
          <input
            autoFocus
            type="text"
            placeholder="Search topics, posts, authors…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full glass-strong rounded-2xl pl-12 pr-12 py-3.5 text-sm font-medium placeholder:text-muted-foreground outline-none focus:ring-2 ring-primary/40 transition shadow-soft"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              <X className="size-4 text-muted-foreground hover:text-foreground transition" />
            </button>
          )}
        </div>

        {/* empty state */}
        {query.trim() === "" && (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
              Browse topics
            </p>
            <div className="flex flex-wrap gap-2">
              {topics.map((t) => (
                <button
                  key={t.name}
                  onClick={() => setQuery(t.name)}
                  className="px-4 py-2 rounded-full glass-strong text-sm font-semibold shadow-soft hover:text-primary transition"
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* results */}
        {query.trim() !== "" && results.length === 0 && topicResults.length === 0 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-bold">No results for "{query}"</p>
            <p className="text-sm text-muted-foreground mt-1">Try a different topic or keyword.</p>
          </div>
        )}

        {topicResults.length > 0 && (
          <section className="mb-6">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
              Topics
            </p>
            <div className="flex flex-col gap-2">
              {topicResults.map((t) => (
                <div
                  key={t.name}
                  className="glass-strong rounded-2xl p-4 flex items-center gap-4 shadow-soft"
                >
                  <img
                    src={t.img}
                    alt={t.name}
                    className="size-12 rounded-xl object-cover shrink-0"
                  />
                  <div>
                    <p className="font-bold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {results.length > 0 && (
          <section>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
              Posts — {results.length} found
            </p>
            <div className="flex flex-col gap-3">
              {results.map((p) => (
                <div
                  key={p.id}
                  className="glass-strong rounded-2xl overflow-hidden shadow-soft flex gap-4 items-center"
                >
                  <img src={p.img} alt={p.title} className="size-20 object-cover shrink-0" />
                  <div className="py-3 pr-4 min-w-0">
                    <p className="text-[11px] text-primary font-semibold uppercase tracking-wide">
                      #{p.tag}
                    </p>
                    <p className="font-bold text-sm leading-tight mt-0.5 line-clamp-2">{p.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {p.author} · {p.likes} learners
                    </p>
                  </div>
                  {"articleId" in p && p.articleId && (
                    <Link
                      to="/post/$postId"
                      params={{ postId: p.articleId }}
                      target="_blank"
                      className="mr-4 shrink-0 px-3 py-1.5 rounded-full dream-gradient text-white text-xs font-semibold shadow-soft"
                    >
                      Read
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </AppShell>
  );
}
