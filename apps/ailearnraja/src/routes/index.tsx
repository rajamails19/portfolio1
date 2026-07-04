import { createFileRoute, Link } from "@tanstack/react-router";
import heroHome from "@/assets/hero-home.jpg";
import heroNotes from "@/assets/hero-notes.jpg";
import heroTopics from "@/assets/hero-topics.jpg";
import heroInterview from "@/assets/hero-interview.jpg";
import heroDiagrams from "@/assets/hero-diagrams.jpg";
import heroVideos from "@/assets/hero-videos.jpg";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aetheria — AI Career Codex" },
      { name: "description", content: "Cinematic personal reference for AI / Data Science career building." },
    ],
  }),
  component: Index,
});

type Realm = {
  to: "/notes" | "/topics" | "/interview" | "/diagrams" | "/videos";
  idx: string;
  name: string;
  tagline: string;
  image: string;
};

const realms: Realm[] = [
  { to: "/notes", idx: "Chapter 1 / 5", name: "Notes Codex", tagline: "Bite-sized Q&A — expand 20 at a time, brief answers ready.", image: heroNotes },
  { to: "/topics", idx: "Chapter 2 / 5", name: "Topic Spires", tagline: "Each tribe — ML, DL, NLP, MLOps — with 2/4/8 mark answers, flows, diagrams, links.", image: heroTopics },
  { to: "/interview", idx: "Chapter 3 / 5", name: "Interview Arena", tagline: "Filter by importance, length, diagrams. Sort like Carvana for questions.", image: heroInterview },
  { to: "/diagrams", idx: "Chapter 4 / 5", name: "Atlas of Diagrams", tagline: "Every architecture, every flow — one cinematic gallery.", image: heroDiagrams },
  { to: "/videos", idx: "Chapter 5 / 5", name: "Theater of Lectures", tagline: "Hand-picked YouTube, Udemy, Coursera. Click → fly out.", image: heroVideos },
];

function Index() {
  return (
    <div>
      {/* HERO */}
      <section className="relative h-[92vh] min-h-[640px] w-full overflow-hidden">
        <img src={heroHome} alt="" className="absolute inset-0 w-full h-full object-cover animate-drift" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/20 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 h-full flex flex-col justify-center">
          <span className="ember-chip mb-6">A Personal Codex · est. 2026</span>
          <h1 className="font-display text-6xl md:text-8xl font-bold leading-[1.05] text-gradient-ember max-w-4xl">
            The AI Career Codex
          </h1>
          <p className="font-serif italic text-xl md:text-2xl text-foreground/85 mt-6 max-w-2xl">
            Five realms. One climb. Notes, topics, interview lore, atlases of diagrams and a theater of teachers — bound into a single cinematic reference.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/notes" className="px-6 py-3 rounded-full bg-gradient-to-r from-[oklch(0.72_0.19_45)] to-[oklch(0.85_0.14_85)] text-[oklch(0.16_0.03_270)] font-semibold shadow-glow hover:scale-[1.02] transition">
              Enter the codex
            </Link>
            <Link to="/topics" className="px-6 py-3 rounded-full border border-[oklch(0.85_0.14_85/0.4)] text-foreground/90 hover:bg-[oklch(0.85_0.14_85/0.1)] transition">
              Browse topic spires
            </Link>
          </div>
        </div>
        {/* floating embers */}
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-[oklch(0.85_0.14_85)] blur-[1px] animate-ember pointer-events-none"
            style={{
              width: `${4 + (i % 3) * 3}px`,
              height: `${4 + (i % 3) * 3}px`,
              left: `${10 + i * 11}%`,
              top: `${30 + (i % 5) * 12}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${5 + (i % 4)}s`,
              opacity: 0.6,
            }}
          />
        ))}
      </section>

      {/* REALMS */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center mb-14">
          <span className="ember-chip">The Five Realms</span>
          <h2 className="font-display text-4xl md:text-5xl text-gradient-ember mt-4">Choose your path</h2>
          <div className="glow-divider mt-6 max-w-md mx-auto" />
        </div>

        <div className="grid gap-8">
          {realms.map((r) => (
            <Link
              key={r.to}
              to={r.to}
              className="cinematic-card group block relative h-[360px] md:h-[420px]"
            >
              <img src={r.image} alt={r.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" loading="lazy" />
              <div className="card-content absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                <span className="ember-chip mb-4 w-fit">{r.idx}</span>
                <h3 className="font-display text-4xl md:text-6xl font-bold text-gradient-ember drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)]">
                  {r.name}
                </h3>
                <p className="font-serif italic text-base md:text-lg text-foreground/85 mt-2 max-w-xl">{r.tagline}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-[oklch(0.85_0.14_85)] opacity-0 group-hover:opacity-100 transition-opacity">
                  Enter realm <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
