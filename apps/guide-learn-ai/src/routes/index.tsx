import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import mascotHero from "@/assets/mascot-hero.jpg";
import mascotLogo from "@/assets/mascot-logo.png";
import mascotNotes from "@/assets/mascot-notes.jpg";
import mascotTopics from "@/assets/mascot-topics.jpg";
import mascotInterview from "@/assets/mascot-interview.jpg";
import mascotDiagrams from "@/assets/mascot-diagrams.jpg";
import mascotVideos from "@/assets/mascot-videos.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NeuroNext — AI Career Command Center" },
      { name: "description", content: "Your cinematic one-stop reference for AI Engineering & Data Science." },
    ],
  }),
  component: Dashboard,
});

const tiles = [
  { to: "/notes", label: "AI Notes", desc: "1 → 140+ concise Q&A bursts", img: mascotNotes, grad: "grad-sunset", count: "140" },
  { to: "/topics", label: "Topics", desc: "2/4/8-mark breakdowns + diagrams", img: mascotTopics, grad: "grad-peach", count: "8" },
  { to: "/interview", label: "Interview Q&A", desc: "Filter, sort, master", img: mascotInterview, grad: "grad-ocean", count: "12" },
  { to: "/diagrams", label: "Diagrams", desc: "Architectures at a glance", img: mascotDiagrams, grad: "grad-mint", count: "6" },
  { to: "/videos", label: "Videos", desc: "Curated learning playlists", img: mascotVideos, grad: "grad-sunset", count: "6" },
];

function Dashboard() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const heights = [55, 75, 90, 70, 85, 45, 60];

  return (
    <AppShell>
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl grad-aurora p-6 md:p-10 mb-6 glow-purple">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />
        <div className="relative flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 backdrop-blur text-[11px] font-semibold uppercase tracking-wider">
              <span className="h-4 w-4 overflow-hidden rounded-full grad-primary shadow-sm" /> Welcome back
            </div>
            <h1 className="mt-3 text-3xl md:text-5xl font-extrabold leading-tight">
              Hello Josh!
              <br />
              Ready to continue your <span className="text-grad">AI journey?</span>
            </h1>
            <p className="mt-3 text-foreground/70 max-w-lg">
              Your cinematic career vault — notes, topics, interview prep, diagrams, and curated videos in one glass-smooth dashboard.
            </p>
            <div className="mt-5 flex gap-3 flex-wrap">
              <Link to="/notes" className="px-5 py-2.5 rounded-full grad-primary text-white font-semibold shadow-lg glow-purple hover:scale-[1.03] transition">
                Continue Learning →
              </Link>
              <Link to="/interview" className="px-5 py-2.5 rounded-full glass-strong font-semibold hover:scale-[1.03] transition">
                Quiz me
              </Link>
            </div>
          </div>
          <img src={mascotHero} alt="" className="h-56 md:h-72 w-auto rounded-3xl shadow-2xl animate-float" />
        </div>
      </section>

      {/* Stat row */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Notes Mastered", value: "32", image: mascotNotes, grad: "grad-mint" },
            { label: "In Progress", value: "18", image: mascotInterview, grad: "grad-peach" },
            { label: "Day Streak", value: "12", image: mascotLogo, grad: "grad-sunset" },
            { label: "Topics Covered", value: "8", image: mascotTopics, grad: "grad-ocean" },
          ].map((s) => (
            <div key={s.label} className="glass rounded-3xl p-5 relative overflow-hidden">
              <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full ${s.grad} opacity-60 blur-2xl`} />
              <img src={s.image} alt="" loading="lazy" className="h-12 w-12 rounded-2xl object-cover shadow-lg" />
              <div className="text-3xl font-extrabold mt-2">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
      </section>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Activity chart */}
        <div className="glass rounded-3xl p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">This week</div>
              <h3 className="text-xl font-bold">Learning Activity</h3>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold glass-strong">Weekly</span>
          </div>
          <div className="flex items-end gap-3 h-44 px-2">
            {heights.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full grad-primary rounded-t-xl glow-purple transition-all hover:scale-105" style={{ height: `${h}%` }} />
                <div className="text-[11px] text-muted-foreground">{days[i]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Study buddy */}
        <div className="glass rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 h-40 w-40 rounded-full grad-sunset opacity-50 blur-2xl" />
          <h3 className="text-xl font-bold mb-2">Study Buddy</h3>
          <img src={mascotInterview} alt="" className="w-full h-32 object-cover rounded-2xl mb-3" />
          <div className="glass-strong rounded-2xl p-3 text-sm">
            Hey Josh! You're doing great today. Let's crush a few interview Qs.
          </div>
          <Link to="/interview" className="mt-3 inline-block px-4 py-2 rounded-full grad-primary text-white text-sm font-semibold">
            Let's Go →
          </Link>
        </div>
      </div>

      {/* Section tiles */}
      <h2 className="text-2xl font-bold mb-4 px-1">Explore your vault</h2>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tiles.map((t) => (
          <Link key={t.to} to={t.to} className="group relative rounded-3xl glass overflow-hidden hover:-translate-y-1 transition">
            <div className={`absolute inset-0 ${t.grad} opacity-40 group-hover:opacity-60 transition`} />
            <div className="relative p-5">
              <div className="flex items-start justify-between">
                <img src={t.img} alt="" loading="lazy" className="h-24 w-24 rounded-2xl object-cover shadow-lg" />
                <span className="text-3xl font-extrabold text-grad">{t.count}</span>
              </div>
              <div className="mt-4 text-lg font-bold">{t.label}</div>
              <div className="text-xs text-foreground/70">{t.desc}</div>
            </div>
          </Link>
        ))}
      </section>
    </AppShell>
  );
}
