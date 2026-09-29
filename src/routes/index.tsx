import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Infinity as InfinityIcon, Menu, X } from "lucide-react";
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
import sheelTechLearnThumb from "@/assets/sheeltechlearn-thumb.png";
import seminarTeachThumb from "@/assets/seminarteach-thumb.png";
import speakPracticeTamilThumb from "@/assets/speakpracticetamil-thumb.png";
import spellBeeQuizThumb from "@/assets/external/spellbeequiz-thumb.png";
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
    name: "Sheel Tech Learn",
    href: "https://sheelteach.vercel.app/",
    image: sheelTechLearnThumb,
    alt: "Sheel Tech Learn homepage preview",
  },
  {
    name: "Jotify",
    href: "http://localhost:8080/",
    image: captureThoughtsThumb,
    alt: "Jotify daily learning tracker homepage preview",
  },
  {
    name: "Lumen",
    href: "https://seminarteachraja.vercel.app/",
    image: seminarTeachThumb,
    alt: "Lumen tutorial platform homepage preview",
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
    href: "https://learncodewithraja.vercel.app/",
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
    href: "https://resetmindproj.vercel.app/",
    image: resetMindProjThumb,
    alt: "Reset Mind homepage preview",
  },
  {
    name: "AI Ascend Academy",
    href: "https://bloglearnraja.vercel.app/",
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
    href: "https://desieventsraja.vercel.app/",
    image: desiEventsThumb,
    alt: "Desi Events homepage preview",
  },
  {
    name: "Tech Blog Raja",
    href: "https://techblograja.vercel.app/",
    image: techBlogRajaThumb,
    alt: "Tech Blog Raja homepage preview",
  },
  {
    name: "Campus AI",
    href: "https://schoolosraja.vercel.app/",
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

const usingProjectPreviews = [
  {
    name: "ABC Notes",
    href: "https://apple-notes-clone-pi.vercel.app/",
    image: abcNotesThumb,
    alt: "ABC Notes preview",
  },
  {
    name: "Lumen",
    href: "https://seminarteachraja.vercel.app/",
    image: seminarTeachThumb,
    alt: "Lumen tutorial platform homepage preview",
  },
  {
    name: "MathDreams",
    href: "https://mathraja.vercel.app/",
    image: mathRajaThumb,
    alt: "MathDreams magical math app homepage preview",
  },
  {
    name: "StudyDeck",
    href: "https://qansinterview.vercel.app/",
    image: intervQansThumb,
    alt: "StudyDeck interview question and answer prep homepage preview",
  },
  {
    name: "SpeakPracticeTamil",
    href: "https://tamilpracticespeak.vercel.app/",
    image: speakPracticeTamilThumb,
    alt: "SpeakPracticeTamil homepage preview",
  },
  {
    name: "GPTTelugu",
    href: "https://gptteluguwithraja.vercel.app/",
    image: gptTeluguThumb,
    alt: "GPTTelugu homepage preview",
  },
  {
    name: "QuestKids",
    href: "https://dadquizkids.vercel.app/",
    image: dadQuizKidsThumb,
    alt: "QuestKids quiz app homepage preview",
  },
  {
    name: "WonderWorkshop",
    href: "https://funartwithraja.vercel.app/",
    image: drawArrtThumb,
    alt: "WonderWorkshop creative app homepage preview",
  },
  {
    name: "MeenusBowWorld",
    href: "https://meenuworld.vercel.app/",
    image: kidshloMainThumb,
    alt: "MeenusBowWorld homepage preview",
  },
  {
    name: "Shruti",
    href: "https://god-pooja-songs.vercel.app/",
    image: learnPoojaThumb,
    alt: "Shruti shloka learning app homepage preview",
  },
];

function uniqueProjectsByHref<T extends { href: string }>(
  projects: readonly T[],
) {
  return projects.filter(
    (project, index) =>
      projects.findIndex((candidate) => candidate.href === project.href) ===
      index,
  );
}

const uniqueUsingProjectPreviews = uniqueProjectsByHref(usingProjectPreviews);
const heroProjects = uniqueUsingProjectPreviews.slice(0, 3);
const heroProjectHrefs = new Set(heroProjects.map((project) => project.href));
const secondaryProjects = uniqueProjectsByHref(projectPreviews).filter(
  (project) => !heroProjectHrefs.has(project.href),
);
const justForMeProjects = heroProjects.filter(
  (project) => project.name !== "Lumen",
);
const toBePublishedProjects = uniqueProjectsByHref(projectPreviews).filter(
  (project) => project.name === "Lumen" || project.name === "Tech Blog Raja",
);
const moneyReadyProjects = uniqueProjectsByHref(projectPreviews).filter(
  (project) => project.name === "Campus AI",
);

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
    href: "https://story-buddy-books.vercel.app/",
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
    path: "/Users/rajav/Documents/Coding/CGPT-help/wingsdemo-main",
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
  {
    name: "Spellwing",
    href: "https://spellbeequiz.vercel.app/",
    image: spellBeeQuizThumb,
    alt: "Spellwing spelling bee trainer homepage preview",
    path: "/Users/rajav/Documents/Coding/CGPT-help/spellbeequiz",
  },
];

function isLocalUrl(href: string) {
  return (
    href.startsWith("http://localhost") || href.startsWith("http://127.0.0.1")
  );
}

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
    <div className="min-h-[100dvh] bg-background text-foreground">
      <Hero />
      <ProjectShowcase />
      <ExternalProjects />
      <KidsProjects />
      <Footer />
    </div>
  );
}

function Hero() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
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

        <div className="hidden items-center gap-7 text-sm text-white lg:flex">
          <Link
            to="/just-for-me"
            className="transition-colors hover:text-white/70"
          >
            Just for Me
          </Link>
          <Link
            to="/to-be-published"
            className="transition-colors hover:text-white/70"
          >
            To-be-Published
          </Link>
          <Link
            to="/money-ready"
            className="transition-colors hover:text-white/70"
          >
            Money-Ready
          </Link>
          <Link to="/using" className="transition-colors hover:text-white/70">
            Using
          </Link>
        </div>

        {/* These links only vanished below sm before — nothing replaced them */}
        <button
          type="button"
          onClick={() => setMobileNavOpen((v) => !v)}
          aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileNavOpen}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-white lg:hidden"
        >
          {mobileNavOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </nav>

      {mobileNavOpen && (
        <div className="relative z-20 mx-5 mb-2 flex flex-col gap-1 rounded-2xl border border-white/15 bg-black/40 p-2 text-sm text-white backdrop-blur-md lg:hidden">
          <Link
            to="/just-for-me"
            onClick={() => setMobileNavOpen(false)}
            className="rounded-lg px-3 py-2.5 transition-colors hover:bg-white/10"
          >
            Just for Me
          </Link>
          <Link
            to="/to-be-published"
            onClick={() => setMobileNavOpen(false)}
            className="rounded-lg px-3 py-2.5 transition-colors hover:bg-white/10"
          >
            To-be-Published
          </Link>
          <Link
            to="/money-ready"
            onClick={() => setMobileNavOpen(false)}
            className="rounded-lg px-3 py-2.5 transition-colors hover:bg-white/10"
          >
            Money-Ready
          </Link>
          <Link
            to="/using"
            onClick={() => setMobileNavOpen(false)}
            className="rounded-lg px-3 py-2.5 transition-colors hover:bg-white/10"
          >
            Using
          </Link>
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-10 pt-24">
        <div className="max-w-2xl">
          <ScrollReveal delay={80}>
            <h1
              className="text-left text-3xl font-bold tracking-normal text-white sm:text-5xl md:text-6xl"
              style={{ lineHeight: "1.08" }}
            >
              One workspace for
              <br />
              every active project
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <p
              className="mt-6 text-left text-lg text-white"
              style={{ textWrap: "pretty", lineHeight: "1.6" }}
            >
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

export function UsingProjects() {
  return (
    <section id="using" className="relative overflow-hidden bg-white py-24">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `url(${shadowBg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          opacity: 0.72,
        }}
      />
      <div className="relative z-10 mx-auto max-w-6xl px-5">
        <ScrollReveal>
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
              Using
            </p>
            <h2
              className="text-3xl font-bold tracking-normal text-foreground sm:text-4xl"
              style={{ lineHeight: "1.15" }}
            >
              Frequently used, easy to reach
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              The projects you open the most, gathered into one clean shelf so
              you do not have to scroll through the full workspace every time.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-5 md:grid-cols-6">
          {uniqueUsingProjectPreviews.map((project, index) => (
            <div key={project.name} className={getUsingGridClass(index)}>
              <UsingProjectPreview project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function JustForMeProjects() {
  return (
    <CuratedProjectShelf
      eyebrow="Just for Me"
      title="My quickest shortcuts"
      description="The projects I want closest at hand, kept together in one focused shelf."
      projects={justForMeProjects}
    />
  );
}

export function ToBePublishedProjects() {
  return (
    <CuratedProjectShelf
      eyebrow="To-be-Published"
      title="Next in line to go live"
      description="Projects being polished and prepared for their next published release."
      projects={toBePublishedProjects}
    />
  );
}

export function MoneyReadyProjects() {
  return (
    <CuratedProjectShelf
      eyebrow="Money-Ready"
      title="Ready for the business stage"
      description="Projects positioned for monetization, customers, or a focused product launch."
      projects={moneyReadyProjects}
    />
  );
}

type ProjectTile = {
  name: string;
  href: string;
  image: string;
  alt: string;
};

function CuratedProjectShelf({
  eyebrow,
  title,
  description,
  projects,
}: {
  eyebrow: string;
  title: string;
  description: string;
  projects: readonly ProjectTile[];
}) {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `url(${shadowBg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          opacity: 0.72,
        }}
      />
      <div className="relative z-10 mx-auto max-w-6xl px-5">
        <ScrollReveal>
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
              {eyebrow}
            </p>
            <h2
              className="text-3xl font-bold tracking-normal text-foreground sm:text-4xl"
              style={{ lineHeight: "1.15" }}
            >
              {title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-5 md:grid-cols-3">
          {projects.map((project) => (
            <UsingProjectPreview key={project.name} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function getUsingGridClass(index: number) {
  if (index === 9) {
    return "md:col-span-2 md:col-start-3";
  }

  return "md:col-span-2";
}

function UsingProjectPreview({ project }: { project: ProjectTile }) {
  const localOnly = isLocalUrl(project.href);

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${project.name}`}
      className="group block overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xl shadow-black/10 transition duration-200 hover:-translate-y-1 hover:border-black/20"
    >
      <img
        src={project.image}
        alt={project.alt}
        className="aspect-[16/9] w-full object-cover"
      />
      <span className="flex items-center justify-between gap-3 border-t border-black/10 bg-white px-5 py-4 text-sm font-semibold text-foreground">
        <span>{project.name}</span>
        {localOnly ? (
          <span className="rounded-full bg-black/[0.06] px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground">
            Local only
          </span>
        ) : (
          <ArrowRight className="h-5 w-5 text-foreground transition group-hover:translate-x-0.5" />
        )}
      </span>
    </a>
  );
}

function ProjectPreview({
  project,
}: {
  project: (typeof projectPreviews)[number];
}) {
  const localOnly = isLocalUrl(project.href);
  const className =
    "group block overflow-hidden rounded-2xl border border-white/30 bg-white/10 shadow-2xl shadow-black/25 backdrop-blur-sm transition duration-200 hover:border-white/60 hover:bg-white/15";
  const content = (
    <>
      <img
        src={project.image}
        alt={project.alt}
        className="aspect-[16/9] w-full object-cover"
      />
      <span className="flex items-center justify-between gap-3 px-5 py-4 text-sm font-semibold text-white">
        <span>{project.name}</span>
        {localOnly ? (
          <span className="rounded-full bg-white/15 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-white/80">
            Local only
          </span>
        ) : (
          <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" />
        )}
      </span>
    </>
  );

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${project.name}`}
      className={`${className} hover:-translate-y-1`}
    >
      {content}
    </a>
  );
}

function ProjectShowcase() {
  return (
    <section
      className="relative overflow-hidden py-24"
      style={{ background: "#050d0a" }}
    >
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
            <div key={project.name} className={getProjectGridClass(index)}>
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
  project:
    | (typeof externalProjectPreviews)[number]
    | (typeof kidsProjectPreviews)[number];
  badge: string;
}) {
  const localOnly = isLocalUrl(project.href);
  const visibleBadge = localOnly ? "Local only" : badge;
  const className =
    "group block overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xl shadow-black/5 transition duration-200 hover:border-black/20";
  const content = (
    <>
      <img
        src={project.image}
        alt={project.alt}
        className="aspect-[16/9] w-full object-cover"
      />
      <span className="block px-5 py-4">
        <span className="mb-2 inline-flex rounded-full bg-black/[0.06] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-widest text-black/55">
          {visibleBadge}
        </span>
        <span className="flex items-center justify-between gap-3 text-sm font-semibold text-foreground">
          <span>{project.name}</span>
          {localOnly ? (
            <span className="text-xs font-medium text-muted-foreground">
              Not deployed yet
            </span>
          ) : (
            <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" />
          )}
        </span>
      </span>
    </>
  );

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open external project ${project.name}`}
      className={`${className} hover:-translate-y-1`}
    >
      {content}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-12">
      <div className="mx-auto max-w-5xl px-5">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <InfinityIcon
              className="h-6 w-6 text-foreground"
              strokeWidth={2.5}
            />
            <span className="text-sm font-semibold text-foreground">
              Portfolio Raja
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <Link
              to="/just-for-me"
              className="transition-colors hover:text-foreground"
            >
              Just for Me
            </Link>
            <Link
              to="/to-be-published"
              className="transition-colors hover:text-foreground"
            >
              To-be-Published
            </Link>
            <Link
              to="/money-ready"
              className="transition-colors hover:text-foreground"
            >
              Money-Ready
            </Link>
            <Link
              to="/using"
              className="transition-colors hover:text-foreground"
            >
              Using
            </Link>
          </div>

          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Portfolio Raja
          </p>
        </div>
      </div>
    </footer>
  );
}

function ScrollReveal({
  children,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return <>{children}</>;
}
