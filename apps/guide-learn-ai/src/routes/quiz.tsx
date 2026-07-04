import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import mascotQuiz from "@/assets/mascot-quiz.jpg";
import mascotNotes from "@/assets/mascot-notes.jpg";
import mascotTopics from "@/assets/mascot-topics.jpg";
import mascotInterview from "@/assets/mascot-interview.jpg";
import mascotDiagrams from "@/assets/mascot-diagrams.jpg";
import mascotVideos from "@/assets/mascot-videos.jpg";
import mascotLogo from "@/assets/mascot-logo.png";
import diagramCnn from "@/assets/diagram-cnn.jpg";
import diagramTransformer from "@/assets/diagram-transformer.jpg";
import { useMemo, useState, useEffect } from "react";
import {
  Sparkles, Zap, Brain, Trophy, Timer, Layers, Shuffle, Code2,
  MessageSquare, Image as ImageIcon, Target, Crown, Play,
  ChevronRight, CheckCircle2, XCircle, RotateCcw, Flame, Star,
} from "lucide-react";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Quiz Arena — NeuroNext" },
      { name: "description", content: "12 addictive quiz modes for 5-minute AI/ML revision — MCQs, flash cards, rapid fire, boss battles and more." },
      { property: "og:title", content: "Quiz Arena — NeuroNext" },
      { property: "og:description", content: "Refresh your AI knowledge in 5 minutes with cinematic quiz modes." },
    ],
  }),
  component: QuizArena,
});

type Difficulty = "Easy" | "Medium" | "Hard" | "Insane";
type Mode = {
  id: string;
  title: string;
  desc: string;
  time: string;
  difficulty: Difficulty;
  grad: string;
  image: string;
  icon: any;
  progress: number;
  badge?: string;
};

const MODES: Mode[] = [
  { id: "mcq",       title: "MCQ Challenge",       desc: "Classic 4-option quiz with instant explanations.",        time: "5 min", difficulty: "Easy",   grad: "grad-aurora",  image: mascotQuiz,       icon: Brain,         progress: 62 },
  { id: "fill",      title: "Fill in the Blanks",  desc: "Type the missing keyword. Active recall mode.",            time: "4 min", difficulty: "Medium", grad: "grad-sunset",  image: mascotNotes,      icon: Target,        progress: 40 },
  { id: "flash",     title: "Flash Cards",         desc: "Flip premium cards. Mark known vs review.",                time: "3 min", difficulty: "Easy",   grad: "grad-peach",   image: mascotTopics,     icon: Layers,        progress: 78 },
  { id: "match",     title: "Drag & Drop Match",   desc: "Pair concepts with definitions.",                          time: "6 min", difficulty: "Medium", grad: "grad-ocean",   image: mascotDiagrams,   icon: Shuffle,       progress: 25, badge: "New" },
  { id: "rapid",     title: "Rapid Fire",          desc: "10 sec per question. No mercy. No thinking.",              time: "2 min", difficulty: "Hard",   grad: "grad-primary", image: mascotInterview,  icon: Zap,           progress: 18, badge: "🔥 Hot" },
  { id: "diagram",   title: "Diagram Quiz",        desc: "Identify components in CNNs, Transformers, RAG.",          time: "5 min", difficulty: "Medium", grad: "grad-mint",    image: mascotDiagrams,   icon: ImageIcon,     progress: 50 },
  { id: "sim",       title: "Interview Simulator", desc: "Type your answer. Get instant AI-style feedback.",         time: "10 min", difficulty: "Hard",  grad: "grad-ocean",   image: mascotInterview,  icon: MessageSquare, progress: 12 },
  { id: "memory",    title: "Memory Match",        desc: "Flip pairs. Train concept recognition speed.",             time: "4 min", difficulty: "Easy",   grad: "grad-peach",   image: mascotLogo,       icon: Sparkles,      progress: 33 },
  { id: "scenario",  title: "Scenario Challenge",  desc: "Real ML problems. Diagnose what went wrong.",              time: "7 min", difficulty: "Hard",   grad: "grad-sunset",  image: mascotTopics,     icon: Trophy,        progress: 8 },
  { id: "code",      title: "Code Completion",     desc: "Fill in missing sklearn / PyTorch lines.",                 time: "6 min", difficulty: "Medium", grad: "grad-aurora",  image: mascotVideos,     icon: Code2,         progress: 45 },
  { id: "rev",       title: "One Minute Revision", desc: "Rotating mini cards. Perfect for a coffee break.",         time: "1 min", difficulty: "Easy",   grad: "grad-mint",    image: mascotNotes,      icon: Timer,         progress: 90, badge: "Daily" },
  { id: "boss",      title: "Boss Battle",         desc: "Weekly mixed-mode gauntlet. Top the leaderboard.",         time: "15 min", difficulty: "Insane", grad: "grad-primary", image: mascotQuiz,       icon: Crown,         progress: 5, badge: "Weekly" },
];

const diffColor: Record<Difficulty, string> = {
  Easy:   "bg-emerald-100 text-emerald-700 ring-emerald-200",
  Medium: "bg-amber-100 text-amber-700 ring-amber-200",
  Hard:   "bg-rose-100 text-rose-700 ring-rose-200",
  Insane: "bg-fuchsia-100 text-fuchsia-700 ring-fuchsia-200",
};

function QuizArena() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname !== "/quiz" && pathname !== "/quiz/") {
    return <Outlet />;
  }
  return (
    <AppShell>
      <PageHeader
        eyebrow="Quiz Arena"
        title={<>5 minutes. <span className="text-grad">12 ways</span> to get sharper.</>}
        subtitle="Active recall, rapid fire, boss battles — pick a mode, refresh fast, and stack streaks."
        mascotSrc={mascotQuiz}
        gradient="grad-primary"
      />

      {/* Top stat strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatTile icon={<Flame className="h-5 w-5" />} label="Day Streak" value="12" grad="grad-sunset" />
        <StatTile icon={<Trophy className="h-5 w-5" />} label="XP this week" value="2,480" grad="grad-aurora" />
        <StatTile icon={<Star className="h-5 w-5" />}  label="Avg Accuracy" value="84%" grad="grad-mint" />
        <StatTile icon={<Crown className="h-5 w-5" />} label="Rank" value="Gold III" grad="grad-primary" />
      </div>

      {/* Mode cards */}
      <section className="mb-10">
        <SectionTitle title="Pick your arena" subtitle="12 modes. Same content, fresh angle every time." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {MODES.map((m, i) => <ModeCard key={m.id} mode={m} delay={i * 40} />)}
        </div>
      </section>

      {/* Demo panels */}
      <section className="space-y-8">
        <SectionTitle title="Live previews" subtitle="Tap through real samples of every mode." />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DemoMCQ />
          <DemoFill />
          <DemoFlash />
          <DemoMatch />
          <DemoRapid />
          <DemoDiagram />
          <DemoInterview />
          <DemoScenario />
          <DemoCode />
          <DemoRevision />
          <DemoMemory />
          <DemoBoss />
        </div>
      </section>
    </AppShell>
  );
}

/* ---------- shared bits ---------- */

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl md:text-3xl font-extrabold">{title}</h2>
        <p className="text-foreground/60 text-sm mt-1">{subtitle}</p>
      </div>
      <div className="hidden sm:flex items-center gap-1 text-xs text-foreground/50">
        <Sparkles className="h-3.5 w-3.5" /> tap any card to play
      </div>
    </div>
  );
}

function StatTile({ icon, label, value, grad }: { icon: any; label: string; value: string; grad: string }) {
  return (
    <div className="glass rounded-2xl p-4 flex items-center gap-3">
      <div className={`h-10 w-10 rounded-xl ${grad} text-white grid place-items-center shadow-md`}>{icon}</div>
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-wider text-foreground/50">{label}</div>
        <div className="text-lg font-extrabold leading-tight">{value}</div>
      </div>
    </div>
  );
}

function ModeCard({ mode, delay }: { mode: Mode; delay: number }) {
  const Icon = mode.icon;
  return (
    <Link
      to="/quiz/$modeId"
      params={{ modeId: mode.id }}
      className="group relative block text-left rounded-3xl glass p-4 overflow-hidden transition-all hover:-translate-y-1 hover:shadow-2xl animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* glow */}
      <div className={`absolute -top-16 -right-16 h-40 w-40 ${mode.grad} rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition-opacity`} />
      {mode.badge && (
        <span className="absolute top-3 right-3 z-10 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-white/80 backdrop-blur ring-1 ring-black/5">
          {mode.badge}
        </span>
      )}
      <div className="relative flex items-start gap-3">
        <div className={`relative h-16 w-16 shrink-0 rounded-2xl ${mode.grad} overflow-hidden shadow-lg ring-2 ring-white/60`}>
          <img src={mode.image} alt="" loading="lazy" className="h-full w-full object-cover mix-blend-luminosity opacity-90" />
          <div className="absolute inset-0 grid place-items-center">
            <Icon className="h-7 w-7 text-white drop-shadow" />
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-bold leading-tight">{mode.title}</div>
          <div className="mt-1 text-xs text-foreground/60 line-clamp-2">{mode.desc}</div>
        </div>
      </div>

      <div className="relative mt-4 flex items-center gap-2 text-[11px]">
        <span className={`px-2 py-0.5 rounded-full ring-1 font-semibold ${diffColor[mode.difficulty]}`}>{mode.difficulty}</span>
        <span className="px-2 py-0.5 rounded-full bg-white/70 ring-1 ring-black/5 font-medium text-foreground/70 flex items-center gap-1">
          <Timer className="h-3 w-3" /> {mode.time}
        </span>
      </div>

      <div className="relative mt-3">
        <div className="h-1.5 rounded-full bg-white/60 overflow-hidden">
          <div className={`h-full ${mode.grad} rounded-full`} style={{ width: `${mode.progress}%` }} />
        </div>
        <div className="mt-1 flex items-center justify-between text-[10px] text-foreground/50">
          <span>Mastery {mode.progress}%</span>
          <span className="inline-flex items-center gap-1 font-semibold text-foreground/70 group-hover:text-foreground">
            Start <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function DemoCard({
  title, tag, grad, children,
}: { title: string; tag: string; grad: string; children: React.ReactNode }) {
  return (
    <div className="relative rounded-3xl glass p-5 overflow-hidden">
      <div className={`absolute -top-20 -left-20 h-48 w-48 ${grad} rounded-full blur-3xl opacity-30`} />
      <div className="relative flex items-center justify-between mb-3">
        <div>
          <div className="text-[11px] uppercase tracking-wider text-foreground/50">{tag}</div>
          <div className="text-lg font-extrabold">{title}</div>
        </div>
        <div className={`h-9 w-9 rounded-xl ${grad} text-white grid place-items-center shadow`}>
          <Play className="h-4 w-4" />
        </div>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

/* ---------- demos ---------- */

function DemoMCQ() {
  const options = [
    { t: "Reduces overfitting via random weight pruning", correct: true },
    { t: "Increases model capacity", correct: false },
    { t: "Speeds up convergence guaranteed", correct: false },
    { t: "Replaces batch normalization", correct: false },
  ];
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <DemoCard title="MCQ Challenge" tag="Mode 01 · 4 options" grad="grad-aurora">
      <div className="font-semibold mb-3">What does Dropout do in a neural network?</div>
      <div className="grid gap-2">
        {options.map((o, i) => {
          const state = picked === null ? "idle" : o.correct ? "right" : picked === i ? "wrong" : "dim";
          return (
            <button
              key={i}
              onClick={() => setPicked(i)}
              className={[
                "text-left rounded-2xl px-3 py-2.5 ring-1 transition-all text-sm flex items-center gap-2",
                state === "idle"  && "bg-white/70 ring-black/5 hover:bg-white",
                state === "right" && "bg-emerald-50 ring-emerald-200 text-emerald-800",
                state === "wrong" && "bg-rose-50 ring-rose-200 text-rose-800",
                state === "dim"   && "bg-white/40 ring-black/5 text-foreground/50",
              ].filter(Boolean).join(" ")}
            >
              <span className="h-5 w-5 grid place-items-center rounded-full bg-white ring-1 ring-black/10 text-[10px] font-bold">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1">{o.t}</span>
              {state === "right" && <CheckCircle2 className="h-4 w-4" />}
              {state === "wrong" && <XCircle className="h-4 w-4" />}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div className="mt-3 rounded-2xl bg-white/80 ring-1 ring-black/5 p-3 text-xs text-foreground/70">
          <span className="font-bold text-foreground">Explanation · </span>
          Dropout randomly zeroes activations during training, forcing the network to learn redundant, robust features — reducing overfitting.
        </div>
      )}
    </DemoCard>
  );
}

function DemoFill() {
  const answer = "gradient";
  const [val, setVal] = useState("");
  const ok = val.trim().toLowerCase() === answer;
  return (
    <DemoCard title="Fill in the Blanks" tag="Mode 02 · type the keyword" grad="grad-sunset">
      <div className="text-sm leading-relaxed">
        Backpropagation computes the{" "}
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder="_______"
          className={[
            "inline-block w-32 rounded-xl px-3 py-1.5 mx-1 ring-1 outline-none text-sm font-semibold transition-colors",
            ok ? "bg-emerald-50 ring-emerald-300 text-emerald-800" : "bg-white/80 ring-black/10 focus:ring-primary",
          ].join(" ")}
        />{" "}
        of the loss with respect to every weight using the chain rule.
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs">
        <span className="px-2 py-0.5 rounded-full bg-white/70 ring-1 ring-black/5">Hint: starts with G</span>
        {ok && <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200 font-semibold">✓ Correct</span>}
      </div>
    </DemoCard>
  );
}

function DemoFlash() {
  const [flipped, setFlipped] = useState(false);
  return (
    <DemoCard title="Flash Cards" tag="Mode 03 · click to flip" grad="grad-peach">
      <button
        onClick={() => setFlipped((f) => !f)}
        className="w-full h-44 [perspective:1000px]"
      >
        <div
          className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : ""}`}
        >
          <div className="absolute inset-0 grad-peach rounded-2xl grid place-items-center p-4 [backface-visibility:hidden] shadow-lg">
            <div className="text-center">
              <div className="text-xs uppercase tracking-wider text-foreground/60">Term</div>
              <div className="text-2xl font-extrabold mt-1">Overfitting</div>
              <div className="mt-3 text-[11px] text-foreground/60">tap to reveal</div>
            </div>
          </div>
          <div className="absolute inset-0 glass rounded-2xl grid place-items-center p-4 [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-lg">
            <div className="text-center text-sm">
              When a model memorizes training data — high train accuracy, poor test accuracy. Fix with regularization, dropout, more data.
            </div>
          </div>
        </div>
      </button>
      <div className="mt-3 flex gap-2 text-xs">
        <button className="px-3 py-1.5 rounded-full bg-rose-50 ring-1 ring-rose-200 text-rose-700 font-semibold">Review again</button>
        <button className="px-3 py-1.5 rounded-full bg-emerald-50 ring-1 ring-emerald-200 text-emerald-700 font-semibold">I know this</button>
      </div>
    </DemoCard>
  );
}

function DemoMatch() {
  const pairs = [
    { l: "Precision", r: "TP / (TP + FP)" },
    { l: "Recall",    r: "TP / (TP + FN)" },
    { l: "F1 Score",  r: "Harmonic mean of P & R" },
  ];
  return (
    <DemoCard title="Drag & Drop Match" tag="Mode 04 · pair them up" grad="grad-ocean">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          {pairs.map((p) => (
            <div key={p.l} className="rounded-2xl bg-white/80 ring-1 ring-black/5 px-3 py-2 text-sm font-semibold cursor-grab shadow-sm hover:-translate-y-0.5 transition-transform">
              {p.l}
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {pairs.map((p) => (
            <div key={p.r} className="rounded-2xl grad-ocean text-white px-3 py-2 text-sm shadow-sm">
              {p.r}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 text-[11px] text-foreground/60">Drag a term onto its definition. Connects with a glowing line.</div>
    </DemoCard>
  );
}

function DemoRapid() {
  const [t, setT] = useState(10);
  useEffect(() => {
    const id = setInterval(() => setT((x) => (x <= 0 ? 10 : x - 1)), 1000);
    return () => clearInterval(id);
  }, []);
  const pct = (t / 10) * 100;
  return (
    <DemoCard title="Rapid Fire" tag="Mode 05 · 10s per question" grad="grad-primary">
      <div className="flex items-center gap-3">
        <div className="relative h-16 w-16 shrink-0">
          <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90">
            <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="3" />
            <circle cx="18" cy="18" r="16" fill="none" stroke="url(#g)" strokeWidth="3" strokeLinecap="round"
              strokeDasharray={`${pct} 100`} pathLength={100} />
            <defs>
              <linearGradient id="g" x1="0" x2="1">
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#f472b6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 grid place-items-center font-extrabold text-lg">{t}</div>
        </div>
        <div className="min-w-0">
          <div className="font-semibold">Is ReLU differentiable at 0?</div>
          <div className="mt-2 flex gap-2 text-xs">
            <button className="px-3 py-1.5 rounded-full bg-white/80 ring-1 ring-black/5 font-semibold">Yes</button>
            <button className="px-3 py-1.5 rounded-full grad-primary text-white font-semibold">No</button>
            <button className="px-3 py-1.5 rounded-full bg-white/80 ring-1 ring-black/5 font-semibold">Subgradient</button>
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 text-[11px] text-foreground/60">
        <Flame className="h-3.5 w-3.5 text-orange-500" /> 7-question streak · +120 XP
      </div>
    </DemoCard>
  );
}

function DemoDiagram() {
  return (
    <DemoCard title="Diagram Quiz" tag="Mode 06 · identify the part" grad="grad-mint">
      <div className="grid grid-cols-[1fr_auto] gap-3 items-center">
        <div className="relative rounded-2xl overflow-hidden ring-1 ring-black/5">
          <img src={diagramCnn} alt="CNN diagram" loading="lazy" className="h-32 w-full object-cover" />
          <span className="absolute top-2 left-2 h-6 w-6 rounded-full bg-white text-foreground grid place-items-center text-xs font-bold ring-2 ring-primary animate-pulse">?</span>
        </div>
        <div className="grid gap-1.5 text-xs">
          <button className="px-3 py-1.5 rounded-full bg-white/80 ring-1 ring-black/5 font-semibold text-left">Conv layer</button>
          <button className="px-3 py-1.5 rounded-full grad-mint text-white font-semibold text-left">Pooling</button>
          <button className="px-3 py-1.5 rounded-full bg-white/80 ring-1 ring-black/5 font-semibold text-left">Dense</button>
        </div>
      </div>
    </DemoCard>
  );
}

function DemoInterview() {
  const [v, setV] = useState("");
  return (
    <DemoCard title="Interview Simulator" tag="Mode 07 · type your answer" grad="grad-ocean">
      <div className="text-sm font-semibold mb-2">Explain bias–variance tradeoff in 2 sentences.</div>
      <textarea
        value={v}
        onChange={(e) => setV(e.target.value)}
        rows={3}
        placeholder="Type your answer like in a real interview…"
        className="w-full rounded-2xl bg-white/80 ring-1 ring-black/10 p-3 text-sm outline-none focus:ring-primary resize-none"
      />
      <div className="mt-3 rounded-2xl grad-ocean text-white p-3 text-xs">
        <div className="font-bold mb-1">AI Feedback</div>
        {v.length < 20
          ? "Add more depth — mention the tradeoff and one mitigation technique."
          : "Solid! You named both ends of the tradeoff. Bonus: mention how ensembles reduce variance."}
      </div>
    </DemoCard>
  );
}

function DemoScenario() {
  return (
    <DemoCard title="Scenario Challenge" tag="Mode 08 · diagnose it" grad="grad-sunset">
      <div className="rounded-2xl bg-white/80 ring-1 ring-black/5 p-3 text-sm">
        <span className="font-bold">Case · </span>
        Train accuracy <b>99%</b>, test accuracy <b>62%</b>. The model is a deep MLP with no regularization. What happened?
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <button className="rounded-2xl px-3 py-2 bg-white/80 ring-1 ring-black/5 font-semibold">Underfitting</button>
        <button className="rounded-2xl px-3 py-2 grad-sunset text-white font-semibold">Overfitting</button>
        <button className="rounded-2xl px-3 py-2 bg-white/80 ring-1 ring-black/5 font-semibold">Data leakage</button>
        <button className="rounded-2xl px-3 py-2 bg-white/80 ring-1 ring-black/5 font-semibold">Bad metric</button>
      </div>
    </DemoCard>
  );
}

function DemoCode() {
  return (
    <DemoCard title="Code Completion" tag="Mode 09 · fill the blank" grad="grad-aurora">
      <pre className="rounded-2xl bg-[oklch(0.18_0.05_290)] text-[oklch(0.92_0.04_310)] p-4 text-xs leading-relaxed overflow-x-auto">
{`from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import `}<span className="px-1.5 py-0.5 rounded bg-fuchsia-500/30 text-fuchsia-200 font-bold">______</span>{`

model = RandomForestClassifier(n_estimators=200)
scores = cross_val_score(model, X, y, cv=5)`}
      </pre>
      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        {["train_test_split", "cross_val_score", "GridSearchCV", "KFold"].map((c, i) => (
          <button key={c} className={`px-3 py-1.5 rounded-full font-mono font-semibold ${i === 1 ? "grad-aurora text-white" : "bg-white/80 ring-1 ring-black/5"}`}>
            {c}
          </button>
        ))}
      </div>
    </DemoCard>
  );
}

function DemoRevision() {
  const cards = useMemo(() => ([
    { t: "Bias", d: "Error from wrong assumptions in the model." },
    { t: "Variance", d: "Sensitivity to small data fluctuations." },
    { t: "Entropy", d: "Measure of uncertainty in a distribution." },
    { t: "Softmax", d: "Turns logits into a probability distribution." },
  ]), []);
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % cards.length), 2200);
    return () => clearInterval(id);
  }, [cards.length]);
  return (
    <DemoCard title="One Minute Revision" tag="Mode 10 · auto-rotating" grad="grad-mint">
      <div className="relative h-32 rounded-2xl glass overflow-hidden">
        {cards.map((c, idx) => (
          <div key={c.t}
            className={`absolute inset-0 p-4 flex flex-col justify-center transition-all duration-500 ${idx === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
            <div className="text-[11px] uppercase tracking-wider text-foreground/50">Concept {idx + 1}/{cards.length}</div>
            <div className="text-xl font-extrabold">{c.t}</div>
            <div className="text-sm text-foreground/70 mt-1">{c.d}</div>
          </div>
        ))}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/40">
          <div className="h-full grad-mint" style={{ width: `${((i + 1) / cards.length) * 100}%`, transition: "width 0.5s" }} />
        </div>
      </div>
    </DemoCard>
  );
}

function DemoMemory() {
  const tiles = ["CNN", "RNN", "GAN", "RAG", "CNN", "RNN", "GAN", "RAG"];
  const [open, setOpen] = useState<Set<number>>(new Set([0, 4]));
  return (
    <DemoCard title="Memory Match" tag="Mode 11 · flip pairs" grad="grad-peach">
      <div className="grid grid-cols-4 gap-2">
        {tiles.map((t, i) => {
          const shown = open.has(i);
          return (
            <button
              key={i}
              onClick={() => setOpen((s) => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n; })}
              className={`aspect-square rounded-xl text-sm font-extrabold grid place-items-center transition-all ${shown ? "grad-peach text-white shadow-md" : "bg-white/80 ring-1 ring-black/5 text-transparent"}`}
            >
              {shown ? t : "?"}
            </button>
          );
        })}
      </div>
      <div className="mt-3 text-[11px] text-foreground/60">2 / 4 pairs found · 14s elapsed</div>
    </DemoCard>
  );
}

function DemoBoss() {
  return (
    <DemoCard title="Boss Battle" tag="Mode 12 · weekly gauntlet" grad="grad-primary">
      <div className="flex items-center gap-3">
        <div className="relative h-20 w-20 rounded-2xl grad-primary overflow-hidden ring-2 ring-white/60 shadow-lg">
          <img src={diagramTransformer} alt="" loading="lazy" className="h-full w-full object-cover mix-blend-luminosity opacity-80" />
          <Crown className="absolute inset-0 m-auto h-8 w-8 text-white drop-shadow" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-extrabold">Transformer Titan · Lvl 4</div>
          <div className="mt-1 text-xs text-foreground/60">25 mixed questions · 15 min · ends Sunday</div>
          <div className="mt-2 h-2 rounded-full bg-white/60 overflow-hidden">
            <div className="h-full grad-primary rounded-full animate-shimmer" style={{ width: "60%" }} />
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs">
        <span className="text-foreground/60">Reward · <b className="text-foreground">+500 XP, Gold badge</b></span>
        <button className="px-3 py-1.5 rounded-full grad-primary text-white font-semibold inline-flex items-center gap-1">
          Enter <RotateCcw className="h-3 w-3" />
        </button>
      </div>
    </DemoCard>
  );
}
