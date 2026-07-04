import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Layers, MessageCircleQuestion, GitBranch, PlayCircle, ArrowRight, Flame, Zap, Brain } from "lucide-react";
import heroDragon from "@/assets/hero-dragon.jpg";
import coverNotes from "@/assets/cover-notes.jpg";
import coverTopics from "@/assets/cover-topics.jpg";
import coverInterview from "@/assets/cover-interview.jpg";
import coverDiagrams from "@/assets/cover-diagrams.jpg";
import coverVideos from "@/assets/cover-videos.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NeuroForge — AI & DS Career Hub" },
      { name: "description", content: "Your cinematic one-stop hub for AI and Data Science career building." },
    ],
  }),
  component: Dashboard,
});

const sections = [
  { to: "/notes", title: "AI Notes", desc: "Bite-sized Q&A in expandable ranges of 20.", img: coverNotes, icon: BookOpen, accent: "from-fuchsia-500 to-violet-500" },
  { to: "/topics", title: "Topics", desc: "Every concept with 2 / 4 / 8 mark answers, diagrams, links.", img: coverTopics, icon: Layers, accent: "from-cyan-400 to-fuchsia-500" },
  { to: "/interview", title: "Interview Q&A", desc: "Filter by importance, length, diagrams.", img: coverInterview, icon: MessageCircleQuestion, accent: "from-pink-500 to-violet-600" },
  { to: "/diagrams", title: "Diagrams", desc: "Flowcharts and architectures, all in one place.", img: coverDiagrams, icon: GitBranch, accent: "from-cyan-400 to-blue-500" },
  { to: "/videos", title: "Videos", desc: "Curated lectures from the best on YouTube & Udemy.", img: coverVideos, icon: PlayCircle, accent: "from-rose-500 to-amber-400" },
];

function Dashboard() {
  return (
    <div className="p-6 md:p-10 space-y-10">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl glass-strong glow">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 self-start rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-widest text-cyan-300 ring-1 ring-white/10">
              <Flame className="h-3.5 w-3.5" /> Forge your AI mind
            </div>
            <h1 className="mt-4 text-4xl md:text-6xl font-black leading-[1.05]">
              <span className="gradient-text">Neuro</span>
              <span className="text-white">Forge</span>
            </h1>
            <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-md">
              The cinematic one-stop reference for your AI Engineering & Data Science journey. Notes, topics, interview prep, diagrams, and videos — all in one neon-charged dojo.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/notes" className="inline-flex items-center gap-2 rounded-full gradient-aurora px-5 py-2.5 text-sm font-semibold text-white shadow-[var(--shadow-glow)] hover:scale-[1.03] transition">
                <Zap className="h-4 w-4" /> Start with Notes
              </Link>
              <Link to="/topics" className="inline-flex items-center gap-2 rounded-full bg-white/5 px-5 py-2.5 text-sm font-semibold text-foreground ring-1 ring-white/10 hover:bg-white/10 transition">
                <Brain className="h-4 w-4" /> Explore Topics <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3 max-w-md">
              {[
                { k: "140+", v: "Notes" },
                { k: "18", v: "Topics" },
                { k: "12", v: "Q&A" },
              ].map((s) => (
                <div key={s.v} className="rounded-2xl glass p-3 text-center">
                  <div className="text-xl font-bold gradient-text">{s.k}</div>
                  <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative min-h-[300px] md:min-h-[460px]">
            <img src={heroDragon} alt="Cyber dragon mascot" width={1600} height={1024} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.16_0.04_280)] via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.16_0.04_280)] via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* SECTION CARDS */}
      <section>
        <div className="flex items-end justify-between mb-5">
          <h2 className="text-2xl md:text-3xl font-bold">Pick your portal</h2>
          <span className="text-xs uppercase tracking-widest text-muted-foreground">5 realms</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sections.map(({ to, title, desc, img, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="group relative overflow-hidden rounded-3xl glass border border-white/10 hover:border-white/30 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={img} alt={title} loading="lazy" width={1024} height={640} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.14_0.04_280)] via-[oklch(0.14_0.04_280_/_40%)] to-transparent" />
                <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full glass px-2.5 py-1 text-[11px] font-medium">
                  <Icon className="h-3.5 w-3.5" /> {title}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold gradient-text">
                  Enter <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
