import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Bell,
  CalendarDays,
  CheckCircle2,
  CloudUpload,
  Flame,
  Infinity as InfinityIcon,
  Moon,
  Quote,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";
import aiAscendAcademyThumb from "@/assets/ai-ascend-academy-thumb.png";
import aiLearnRajaThumb from "@/assets/ailearnraja-thumb.png";
import abcNotesThumb from "@/assets/abc-notes-thumb.png";
import captureThoughtsThumb from "@/assets/capture-thoughts-thumb.png";
import chessForFunThumb from "@/assets/external/chess-for-fun-thumb.png";
import dadQuizKidsThumb from "@/assets/external/dad-quiz-kids-thumb.png";
import desiEventsThumb from "@/assets/desievents-thumb.png";
import drawArrtThumb from "@/assets/external/draw-arrt-thumb.png";
import gptTeluguThumb from "@/assets/external/gpttelugu-thumb.png";
import gptOmniAgentsThumb from "@/assets/external/gptomniagents-thumb.png";
import formaFitnessThumb from "@/assets/forma-fitness-thumb.png";
import genZStyleLearnThumb from "@/assets/genzstylelearn-thumb.png";
import guideLearnAiThumb from "@/assets/guide-learn-ai-thumb.png";
import heroBg from "@/assets/hero-bg.jpg";
import intervQansThumb from "@/assets/intervqans-thumb.png";
import jagsRajKitchenThumb from "@/assets/jagsrajkitchen-thumb.png";
import jobsOpsWithRajaThumb from "@/assets/jobsopswithraja-thumb.png";
import kidshloMainThumb from "@/assets/external/kidshlo-main-thumb.png";
import kidsTypingThumb from "@/assets/external/kidstyping-thumb.png";
import kudosCloneThumb from "@/assets/external/kudosclone-thumb.png";
import learnComicsThumb from "@/assets/external/learncomics-thumb.png";
import learnPoojaThumb from "@/assets/external/learnpooja-thumb.png";
import mathRajaThumb from "@/assets/mathraja-thumb.png";
import pianoWithRajaThumb from "@/assets/external/pianowithraja-thumb.png";
import pokeChessGameThumb from "@/assets/external/pokechessgame-thumb.png";
import resetMindProjThumb from "@/assets/resetmindproj-thumb.png";
import schoolOsAgentThumb from "@/assets/schoolosagent-thumb.png";
import shadowBg from "@/assets/shadow-bg.jpg";
import speakPracticeTamilThumb from "@/assets/speakpracticetamil-thumb.png";
import storyBuddyAiThumb from "@/assets/external/story-buddy-ai-thumb.png";
import techBlogRajaThumb from "@/assets/techblograja-thumb.png";
import teluguTalesThumb from "@/assets/external/telugu-tales-thumb.png";
import teluguTraceKidsThumb from "@/assets/external/telugu-trace-kids-thumb.png";
import ticTacToeThumb from "@/assets/external/tic-tac-toe-thumb.png";
import typingKidsAppThumb from "@/assets/external/typing-kids-app-thumb.png";
import serverDashboardThumb from "@/assets/serverdashboard-thumb.png";
import wheelsAndMachinesThumb from "@/assets/external/wheelsandmachines-thumb.png";
import wingsDemoMainThumb from "@/assets/external/wingsdemo-main-thumb.png";

const projectPreviews = [
  {
    name: "ABC Notes",
    href: "https://apple-notes-clone-pi.vercel.app/",
    image: abcNotesThumb,
    alt: "ABC Notes preview",
  },
  {
    name: "Capture Thoughts",
    href: "https://capturethoughts.vercel.app/",
    image: captureThoughtsThumb,
    alt: "Capture Thoughts homepage preview",
  },
  {
    name: "Guide Learn AI",
    href: "https://guide-learn-ai.vercel.app/",
    image: guideLearnAiThumb,
    alt: "Guide Learn AI homepage preview",
  },
  {
    name: "MathDreams",
    href: "https://mathraja.vercel.app/",
    image: mathRajaThumb,
    alt: "MathDreams magical math app homepage preview",
  },
  {
    name: "JobOps",
    href: "https://jobopsraja.vercel.app/",
    image: jobsOpsWithRajaThumb,
    alt: "JobOps job application command center homepage preview",
  },
  {
    name: "StudyDeck",
    href: "https://qansinterview.vercel.app/",
    image: intervQansThumb,
    alt: "StudyDeck interview question and answer prep homepage preview",
  },
  {
    name: "JagsRajKitchen",
    href: "http://localhost:8086/",
    image: jagsRajKitchenThumb,
    alt: "JagsRajKitchen homepage preview",
  },
  {
    name: "AI Learn Raja",
    href: "http://localhost:8087/",
    image: aiLearnRajaThumb,
    alt: "AI Learn Raja homepage preview",
  },
  {
    name: "Forma Fitness",
    href: "https://formafitness-nine.vercel.app/",
    image: formaFitnessThumb,
    alt: "Forma Fitness homepage preview",
  },
  {
    name: "GenZ Style Learn",
    href: "https://genzstylelearn.vercel.app/",
    image: genZStyleLearnThumb,
    alt: "GenZ Style Learn homepage preview",
  },
  {
    name: "Reset Mind",
    href: "http://localhost:8091/",
    image: resetMindProjThumb,
    alt: "Reset Mind homepage preview",
  },
  {
    name: "AI Ascend Academy",
    href: "http://localhost:8093/",
    image: aiAscendAcademyThumb,
    alt: "AI Ascend Academy homepage preview",
  },
  {
    name: "Speak Practice Tamil",
    href: "https://tamilpracticespeak.vercel.app/",
    image: speakPracticeTamilThumb,
    alt: "Speak Practice Tamil homepage preview",
  },
  {
    name: "Desi Events",
    href: "http://localhost:8097/",
    image: desiEventsThumb,
    alt: "Desi Events homepage preview",
  },
  {
    name: "Tech Blog Raja",
    href: "http://localhost:8098/",
    image: techBlogRajaThumb,
    alt: "Tech Blog Raja homepage preview",
  },
  {
    name: "Campus AI",
    href: "http://localhost:8119/",
    image: schoolOsAgentThumb,
    alt: "Campus AI school operating system dashboard preview",
  },
  {
    name: "Stage",
    href: "http://localhost:8120/",
    image: serverDashboardThumb,
    alt: "Stage server dashboard homepage preview",
  },
];

const heroProjects = projectPreviews.slice(0, 3);
const secondaryProjects = projectPreviews.slice(3);

const externalProjectPreviews = [
  {
    name: "GPT Omni Agents",
    href: "https://gptomniagentswithraja.vercel.app/",
    image: gptOmniAgentsThumb,
    alt: "GPT Omni Agents dashboard preview",
    path: "/Users/rajav/Documents/Coding/CGPT-help/gptomniagents",
  },
  {
    name: "GPT Telugu",
    href: "https://gptteluguwithraja.vercel.app/",
    image: gptTeluguThumb,
    alt: "GPT Telugu homepage preview",
    path: "/Users/rajav/Documents/Coding/CGPT-help/gpttelugu",
  },
];

const kidsProjectPreviews = [
  {
    name: "QuestKid",
    href: "https://dadquizkids.vercel.app/",
    image: dadQuizKidsThumb,
    alt: "QuestKid quiz app homepage preview",
    path: "/Users/rajav/Documents/Coding/Claude-help/dad-quiz-kids",
  },
  {
    name: "Wonder Workshop",
    href: "https://funartwithraja.vercel.app/",
    image: drawArrtThumb,
    alt: "Wonder Workshop creative app homepage preview",
    path: "/Users/rajav/Documents/Coding/Claude-help/draw-arrt",
  },
  {
    name: "Chess for Fun",
    href: "http://localhost:8103/",
    image: chessForFunThumb,
    alt: "Chess for Fun app homepage preview",
    path: "/Users/rajav/Documents/Coding/Claude-help/chess-for-fun",
  },
  {
    name: "Meenu's Bow World",
    href: "https://meenuworld.vercel.app/",
    image: kidshloMainThumb,
    alt: "Meenu's Bow World homepage preview",
    path: "/Users/rajav/Documents/Coding/CGPT-help/kidshlo",
  },
  {
    name: "Shruti",
    href: "https://god-pooja-songs.vercel.app/",
    image: learnPoojaThumb,
    alt: "Shruti shloka learning app homepage preview",
    path: "/Users/rajav/Documents/Coding/Claude-help/learnpooja",
  },
  {
    name: "Story Buddy AI",
    href: "http://localhost:8106/",
    image: storyBuddyAiThumb,
    alt: "Story Buddy AI homepage preview",
    path: "/Users/rajav/Documents/Coding/Claude-help/story-buddy-ai",
  },
  {
    name: "Telugu Tales",
    href: "http://localhost:8107/",
    image: teluguTalesThumb,
    alt: "Telugu Tales story library homepage preview",
    path: "/Users/rajav/Documents/Coding/Claude-help/telugu-tales",
  },
  {
    name: "Telugu Trace Kids",
    href: "https://telugutraceraja.vercel.app/",
    image: teluguTraceKidsThumb,
    alt: "Telugu Trace Kids homepage preview",
    path: "/Users/rajav/Documents/Coding/Claude-help/telugu-trace-kids",
  },
  {
    name: "Tic Tac Toe",
    href: "http://localhost:8109/",
    image: ticTacToeThumb,
    alt: "Tic Tac Toe game homepage preview",
    path: "/Users/rajav/Documents/Coding/Claude-help/tic-tac-toe",
  },
  {
    name: "KeyQuest",
    href: "https://typing-kids-app.vercel.app/",
    image: typingKidsAppThumb,
    alt: "KeyQuest typing app homepage preview",
    path: "/Users/rajav/Documents/Coding/Claude-help/typing-kids-app",
  },
  {
    name: "DragonHub",
    href: "https://wofirekids.vercel.app/",
    image: wingsDemoMainThumb,
    alt: "DragonHub homepage preview",
    path: "/Users/rajav/Documents/Coding/Claude-help/wingsdemo-main",
  },
  {
    name: "Kudos",
    href: "https://kidshabits-tan.vercel.app/",
    image: kudosCloneThumb,
    alt: "Kudos child development app homepage preview",
    path: "/Users/rajav/Documents/Coding/CGPT-help/kudosclone",
  },
  {
    name: "DragonDex",
    href: "https://learncomics.vercel.app/",
    image: learnComicsThumb,
    alt: "DragonDex learning comics app homepage preview",
    path: "/Users/rajav/Documents/Coding/CGPT-help/learncomics",
  },
  {
    name: "Tappy",
    href: "https://kidstypingraja-eight.vercel.app/",
    image: kidsTypingThumb,
    alt: "Tappy typing playground homepage preview",
    path: "/Users/rajav/Documents/Coding/CGPT-help/kidstyping",
  },
  {
    name: "Ocean Symphony",
    href: "https://pianowithraja.vercel.app/",
    image: pianoWithRajaThumb,
    alt: "Ocean Symphony piano learning app homepage preview",
    path: "/Users/rajav/Documents/Coding/CGPT-help/pianowithraja",
  },
  {
    name: "PokéChess",
    href: "https://pokemanchessraja.vercel.app/",
    image: pokeChessGameThumb,
    alt: "PokéChess chess learning game homepage preview",
    path: "/Users/rajav/Documents/Coding/CGPT-help/pokechessgame-main",
  },
  {
    name: "VroomVerse",
    href: "https://wheelsmachineswithraja.vercel.app/",
    image: wheelsAndMachinesThumb,
    alt: "VroomVerse machines learning app homepage preview",
    path: "/Users/rajav/Documents/Coding/CGPT-help/wheelsandmachines-main",
  },
];

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      { title: "Portfolio Raja — Project Home" },
      {
        name: "description",
        content: "A single local home base for Raja's active projects.",
      },
    ],
  }),
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero />
      <ProjectShowcase />
      <Features />
      <HowItWorks />
      <ExternalProjects />
      <Reviews />
      <KidsProjects />
      <FinalCTA />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section
      className="relative overflow-hidden pb-24 pt-0 lg:pb-28 lg:pt-8 xl:pt-12"
      style={{ background: "#050d0a" }}
    >
      <img
        src={heroBg}
        alt=""
        width={1920}
        height={1080}
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover object-right"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(5,13,10,0.5), rgba(5,13,10,0.13), transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.26), transparent, rgba(5,13,10,0))",
        }}
      />

      <nav className="relative z-20 mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-2.5">
          <InfinityIcon className="h-7 w-7 text-white" strokeWidth={2.5} />
          <span className="text-xl font-semibold tracking-normal text-white/90">
            Portfolio Raja
          </span>
        </Link>

        <div className="hidden items-center gap-8 text-sm text-white sm:flex">
          <a href="#features" className="transition-colors hover:text-white/70">
            Features
          </a>
          <a href="#how-it-works" className="transition-colors hover:text-white/70">
            How it works
          </a>
          <a href="#reviews" className="transition-colors hover:text-white/70">
            Reviews
          </a>
        </div>
      </nav>

      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-10 pt-24">
        <div className="max-w-2xl">
          <ScrollReveal delay={80}>
            <h1
              className="text-left text-4xl font-bold tracking-normal text-white sm:text-5xl md:text-6xl"
              style={{ lineHeight: "1.08" }}
            >
              One workspace for
              <br />
              every active project
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <p className="mt-6 text-left text-lg text-white" style={{ textWrap: "pretty", lineHeight: "1.6" }}>
              Keep each app cleanly separated, switch between them from one
              place, and let this repo stay the home base until a project is
              ready to become its own product.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={240}>
            <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row">
              <button
                type="button"
                className="inline-flex cursor-default items-center gap-2 rounded-xl bg-[#FDAA3E] px-7 py-3.5 text-sm font-bold text-[#1a1a1a] shadow-lg shadow-[#FDAA3E]/25"
              >
                Get started free
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </ScrollReveal>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {heroProjects.map((project) => (
            <ProjectPreview key={project.name} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectPreview({ project }: { project: (typeof projectPreviews)[number] }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${project.name}`}
      className="group block overflow-hidden rounded-2xl border border-white/30 bg-white/10 shadow-2xl shadow-black/25 backdrop-blur-sm transition duration-200 hover:-translate-y-1 hover:border-white/60 hover:bg-white/15"
    >
      <img src={project.image} alt={project.alt} className="aspect-[16/9] w-full object-cover" />
      <span className="flex items-center justify-between px-5 py-4 text-sm font-semibold text-white">
        <span>{project.name}</span>
        <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" />
      </span>
    </a>
  );
}

function ProjectShowcase() {
  return (
    <section className="relative overflow-hidden py-24" style={{ background: "#050d0a" }}>
      <img
        src={heroBg}
        alt=""
        width={1920}
        height={1080}
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover object-right opacity-45"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-[#050d0a]/55" />

      <div className="relative z-10 mx-auto max-w-6xl px-5">
        <ScrollReveal>
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#FDAA3E]">
              Project rooms
            </p>
            <h2
              className="text-3xl font-bold tracking-normal text-white sm:text-4xl"
              style={{ lineHeight: "1.15" }}
            >
              More apps, same clean workspace
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/85">
              Keep adding projects without squeezing them into one corner. Each
              card stays big enough to recognize, and each app still opens in
              its own tab.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-5 md:grid-cols-6">
          {secondaryProjects.map((project, index) => (
            <div
              key={project.name}
              className={getProjectGridClass(index)}
            >
              <ProjectPreview project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function getProjectGridClass(index: number) {
  const lastRowCount = secondaryProjects.length % 3;
  const firstLastRowIndex = secondaryProjects.length - lastRowCount;

  if (lastRowCount === 1 && index === firstLastRowIndex) {
    return "md:col-span-2 md:col-start-3";
  }

  if (lastRowCount === 2 && index === firstLastRowIndex) {
    return "md:col-span-2 md:col-start-2";
  }

  return "md:col-span-2";
}

function ExternalProjects() {
  return (
    <section className="bg-[#f5f0e8] py-24">
      <div className="mx-auto max-w-6xl px-5">
        <ScrollReveal>
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
              External ready projects
            </p>
            <h2
              className="text-3xl font-bold tracking-normal text-foreground sm:text-4xl"
              style={{ lineHeight: "1.15" }}
            >
              Visible here, owned elsewhere
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              These projects stay in their own repos. The portal only keeps a
              visual doorway so they remain easy to find.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-3">
          {externalProjectPreviews.map((project) => (
            <ExternalProjectCard
              key={project.name}
              project={project}
              badge="External repo"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function KidsProjects() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-5">
        <ScrollReveal>
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
              Kids apps
            </p>
            <h2
              className="text-3xl font-bold tracking-normal text-foreground sm:text-4xl"
              style={{ lineHeight: "1.15" }}
            >
              Playful apps, living elsewhere
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              A separate shelf for kid-focused projects that stay in their own
              repos while remaining easy to open from the same home base.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-3">
          {kidsProjectPreviews.map((project) => (
            <ExternalProjectCard
              key={project.name}
              project={project}
              badge="Kids repo"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExternalProjectCard({
  project,
  badge,
}: {
  project: (typeof externalProjectPreviews)[number] | (typeof kidsProjectPreviews)[number];
  badge: string;
}) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open external project ${project.name}`}
      className="group block overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xl shadow-black/5 transition duration-200 hover:-translate-y-1 hover:border-black/20"
    >
      <img src={project.image} alt={project.alt} className="aspect-[16/9] w-full object-cover" />
      <span className="block px-5 py-4">
        <span className="mb-2 inline-flex rounded-full bg-black/[0.06] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-widest text-black/55">
          {badge}
        </span>
        <span className="flex items-center justify-between text-sm font-semibold text-foreground">
          <span>{project.name}</span>
          <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" />
        </span>
      </span>
    </a>
  );
}

const features = [
  {
    icon: Flame,
    title: "Project momentum",
    desc: "Keep the active ideas visible so nothing gets lost between folders, tabs, and chats.",
  },
  {
    icon: CalendarDays,
    title: "Clean separation",
    desc: "Each product keeps its own folder, assets, scripts, and future path to extraction.",
  },
  {
    icon: BarChart3,
    title: "One control surface",
    desc: "Use one home page to see what is alive locally and switch focus quickly.",
  },
  {
    icon: Bell,
    title: "Fast context switching",
    desc: "Move from a restaurant site to a learning app without opening new VS Code windows.",
  },
  {
    icon: Moon,
    title: "Calm workspace",
    desc: "A focused interface that stays quiet while the individual projects do the real work.",
  },
  {
    icon: CloudUpload,
    title: "Ready to separate",
    desc: "When a project matures, it can be split into its own repo and published on its own.",
  },
];

function Features() {
  return (
    <section id="features" className="relative bg-white py-28">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `url(${shadowBg})`,
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "cover",
          opacity: 0.75,
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5">
        <div className="flex flex-col items-start gap-12 lg:flex-row lg:gap-16">
          <div className="w-full flex-shrink-0 lg:w-[420px]">
            <div className="relative">
              <div className="overflow-hidden rounded-xl border border-black/[0.06] bg-white shadow-xl">
                <div className="flex items-center gap-3 border-b border-black/5 bg-gray-50/80 px-5 py-3">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-black/10" />
                    <div className="h-2.5 w-2.5 rounded-full bg-black/10" />
                    <div className="h-2.5 w-2.5 rounded-full bg-black/10" />
                  </div>
                  <div className="flex-1" />
                </div>

                <div className="space-y-4 p-6">
                  <div>
                    <p className="text-xs text-black/40">Good morning</p>
                    <p className="mt-0.5 text-lg font-semibold text-black/90">
                      Project dashboard
                    </p>
                    <p className="mt-1 text-xs text-black/40">
                      Friday, July 3 - 2 active apps
                    </p>
                  </div>

                  <div className="flex justify-center py-3">
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-[4px] border-black/[0.06]">
                      <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 80 80">
                        <circle
                          cx="40"
                          cy="40"
                          r="35"
                          fill="none"
                          stroke="#FDAA3E"
                          strokeDasharray="220"
                          strokeDashoffset="92"
                          strokeLinecap="round"
                          strokeWidth="4"
                        />
                      </svg>
                      <span className="text-lg font-bold text-black/80">58%</span>
                    </div>
                  </div>

                  {[
                    { name: "Portfolio Raja", color: "#FDAA3E", done: true },
                    { name: "JagsRajKitchen", color: "hsl(84, 30%, 35%)", done: true },
                    { name: "Next idea space", color: "hsl(217, 91%, 60%)", done: false },
                    { name: "Future mobile build", color: "hsl(270, 95%, 75%)", done: false },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center gap-3 rounded-xl border border-black/[0.06] bg-black/[0.02] px-4 py-3"
                    >
                      <div
                        className="h-2 w-2 flex-shrink-0 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className={`flex-1 text-sm ${item.done ? "text-black/70" : "text-black/45"}`}>
                        {item.name}
                      </span>
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                          item.done ? "border-primary bg-primary" : "border-black/15"
                        }`}
                      >
                        {item.done && <CheckCircle2 className="h-3.5 w-3.5 text-white" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <ScrollReveal>
              <div className="mb-10">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
                  Features
                </p>
                <h2
                  className="text-3xl font-bold tracking-normal text-foreground sm:text-4xl"
                  style={{ lineHeight: "1.15" }}
                >
                  Everything organized,
                  <br />
                  nothing tangled
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid gap-5 sm:grid-cols-2">
              {features.map((feature, index) => (
                <ScrollReveal key={feature.title} delay={index * 70}>
                  <div className="group rounded-2xl border border-black/[0.04] bg-black/[0.03] p-5 transition-all duration-300 hover:border-black/[0.08] hover:bg-black/[0.05]">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 transition-transform duration-300 group-hover:scale-105">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="mb-1 font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {feature.desc}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    num: "1",
    icon: CheckCircle2,
    title: "Add a project",
    desc: "Place each new app under its own folder so the repo stays easy to reason about.",
  },
  {
    num: "2",
    icon: Sparkles,
    title: "Work from one repo",
    desc: "Keep VS Code, Codex, and the local browser focused on this one home base.",
  },
  {
    num: "3",
    icon: TrendingUp,
    title: "Split when ready",
    desc: "When a product is mature, detach it cleanly into a separate repo and publish.",
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="border-y border-border/30 bg-white py-28">
      <div className="mx-auto max-w-4xl px-5">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
              How it works
            </p>
            <h2
              className="text-3xl font-bold tracking-normal text-foreground sm:text-4xl"
              style={{ lineHeight: "1.15" }}
            >
              One home base, many products
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative grid gap-8 md:grid-cols-3">
          <div className="absolute left-[calc(16.67%+28px)] right-[calc(16.67%+28px)] top-7 hidden h-px border-t-2 border-dashed border-primary/20 md:block" />

          {steps.map((step, index) => (
            <ScrollReveal key={step.num} delay={index * 100}>
              <div className="relative text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-primary-foreground shadow-lg shadow-primary/15">
                  {step.num}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mx-auto max-w-xs text-sm leading-relaxed text-muted-foreground">
                  {step.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const reviews = [
  {
    name: "Raja",
    role: "Builder",
    initials: "RJ",
    tone: "bg-[#FDAA3E]",
    quote: "I can switch projects without reopening folders, terminals, and new chats.",
    rating: 5,
  },
  {
    name: "Kitchen Launch",
    role: "Restaurant site",
    initials: "JK",
    tone: "bg-[#5c6b3a]",
    quote: "The app can live inside the workspace now and still become its own product later.",
    rating: 5,
  },
  {
    name: "Future Apps",
    role: "Weekly ideas",
    initials: "FA",
    tone: "bg-[#3f6ea5]",
    quote: "New projects can be added without turning one src folder into a mess.",
    rating: 5,
  },
  {
    name: "Codex",
    role: "Workspace partner",
    initials: "CX",
    tone: "bg-[#8a6bb3]",
    quote: "One repo gives the conversation enough context to help across every active build.",
    rating: 5,
  },
];

function Reviews() {
  return (
    <section id="reviews" className="py-28">
      <div className="mx-auto max-w-5xl px-5">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
              Reviews
            </p>
            <h2
              className="text-3xl font-bold tracking-normal text-foreground sm:text-4xl"
              style={{ lineHeight: "1.15" }}
            >
              Built for weekly momentum
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid gap-5 sm:grid-cols-2">
          {reviews.map((review, index) => (
            <ScrollReveal key={review.name} delay={index * 80}>
              <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6">
                <Quote className="absolute right-4 top-4 h-10 w-10 rotate-180 text-primary/[0.06]" />

                <div className="mb-4 flex gap-0.5">
                  {Array.from({ length: review.rating }).map((_, starIndex) => (
                    <Star key={starIndex} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="relative mb-5 text-sm leading-relaxed text-foreground">
                  "{review.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full text-base font-bold text-white ${review.tone}`}
                    aria-hidden="true"
                  >
                    {review.initials}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.role}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-28" style={{ background: "#050d0a" }}>
      <img
        src={heroBg}
        alt=""
        width={1920}
        height={1080}
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover opacity-25"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050d0a] via-transparent to-[#050d0a]" />

      <div className="relative z-10 mx-auto max-w-2xl px-5 text-center">
        <ScrollReveal>
          <h2
            className="text-3xl font-bold tracking-normal text-white sm:text-4xl"
            style={{ lineHeight: "1.15" }}
          >
            Ready for the next project?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-white" style={{ textWrap: "pretty" }}>
            Add it cleanly, keep it visible, and only separate it when it is
            ready for the real world.
          </p>
          <button
            type="button"
            className="mt-8 inline-flex cursor-default items-center gap-2 rounded-xl bg-[#FDAA3E] px-8 py-4 text-sm font-semibold text-[#1a1a1a] shadow-lg shadow-[#FDAA3E]/25"
          >
            Get started free
            <ArrowRight className="h-4 w-4" />
          </button>
        </ScrollReveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/40 py-12">
      <div className="mx-auto max-w-5xl px-5">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <InfinityIcon className="h-6 w-6 text-foreground" strokeWidth={2.5} />
            <span className="text-sm font-semibold text-foreground">Portfolio Raja</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#how-it-works" className="transition-colors hover:text-foreground">
              How it works
            </a>
            <a href="#reviews" className="transition-colors hover:text-foreground">
              Reviews
            </a>
          </div>

          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Portfolio Raja
          </p>
        </div>
      </div>
    </footer>
  );
}

function ScrollReveal({ children }: { children: React.ReactNode; delay?: number }) {
  return <>{children}</>;
}
