import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Boxes,
  Braces,
  CalendarClock,
  Code2,
  Container,
  Database,
  FileJson,
  GitBranch,
  GitPullRequest,
  Globe2,
  Gauge,
  KeyRound,
  Layers,
  LayoutTemplate,
  ListTodo,
  MonitorSmartphone,
  Music2,
  Network,
  PanelsTopLeft,
  Quote,
  Rocket,
  ScanSearch,
  Send,
  Server,
  ServerCog,
  ShieldAlert,
  Sparkles,
  Star,
  Table2,
  Target,
  Users,
  UtensilsCrossed,
  Workflow,
  Wrench,
  Zap,
} from "lucide-react";
import { QuotesTicker } from "@/components/QuotesTicker";
import { useTheme } from "@/context/ThemeContext";
import { useDeck } from "@/hooks/use-deck";

const sectionIcons = { theory: BookOpen, qans: Sparkles, programs: Music2, realtime: Zap, projects: Star, others: Layers };

const termTiles = [
  { term: "JIRA", icon: CalendarClock, short: "A tool teams use to track tasks, bugs, and project work.", why: "It keeps every ticket visible: who owns it, what status it is in, and what needs to happen next.", example: "A bug becomes a JIRA ticket assigned to a developer." },
  { term: "GitHub", icon: GitBranch, short: "A place to store code, review changes, and collaborate with a team.", why: "It gives the project a shared source of truth, with history for every change.", example: "You push code to GitHub, then Vercel deploys it." },
  { term: "Sprint Planning", icon: Rocket, short: "A meeting where the team chooses what to build in the next sprint.", why: "It turns a big backlog into focused work for the next one or two weeks.", example: "The team picks login fixes, dashboard polish, and two new reports." },
  { term: "Agile", icon: Workflow, short: "A flexible way of building software in small, useful increments.", why: "Teams can learn, adjust, and ship improvements without waiting months.", example: "Build a small version, test it, improve it, repeat." },
  { term: "Waterfall", icon: Layers, short: "A step-by-step project method where each phase finishes before the next starts.", why: "It works best when requirements are clear and changes are expected to be low.", example: "Plan, design, build, test, then release." },
  { term: "P1 / P2", icon: ShieldAlert, short: "Priority labels for incidents, bugs, or urgent work.", why: "They help teams decide what must be handled first.", example: "P1 means production is badly broken. P2 means important, but less urgent." },
  { term: "Microservices", icon: Boxes, short: "An app split into smaller services that each own one job.", why: "Teams can change, scale, and deploy one service without touching everything else.", example: "Payments, users, and notifications can each be separate services." },
  { term: "API", icon: Network, short: "A contract that lets two systems talk to each other.", why: "It allows a frontend, mobile app, or another service to request data or actions.", example: "The app calls an API to fetch your saved notes." },
  { term: "Postman", icon: Send, short: "A tool for testing APIs without needing to build a full UI first.", why: "It helps developers confirm requests, responses, tokens, and errors quickly.", example: "Send a GET request and inspect the JSON response." },
  { term: "UI", icon: MonitorSmartphone, short: "User Interface: the screens, buttons, forms, and visuals people use.", why: "Good UI makes the app easier to understand and operate.", example: "A clean dashboard with clear buttons and readable labels." },
  { term: "UX", icon: Sparkles, short: "User Experience: how smooth, clear, and useful the full journey feels.", why: "UX decides whether people can finish their task without confusion.", example: "A checkout flow that feels simple from cart to payment." },
  { term: "HTML", icon: Code2, short: "The structure of a web page: headings, paragraphs, links, forms, and sections.", why: "It gives content meaning before styling or behavior is added.", example: "A button, a title, and a card all start as HTML elements." },
  { term: "CSS", icon: LayoutTemplate, short: "The styling language for colors, spacing, layout, fonts, and responsiveness.", why: "It turns plain structure into a polished interface.", example: "CSS makes a card rounded, aligned, and mobile friendly." },
  { term: "JavaScript", icon: Braces, short: "The language that adds behavior and logic to websites and apps.", why: "It powers clicks, forms, dynamic data, animations, and app state.", example: "Click a tab and JavaScript shows the matching content." },
  { term: "Database", icon: Database, short: "A structured place where app data is stored and queried.", why: "Apps need reliable storage for users, orders, lessons, posts, and progress.", example: "A users table stores name, email, and role." },
  { term: "DevOps", icon: UtensilsCrossed, short: "The practice of building, shipping, monitoring, and running software smoothly.", why: "It connects development work with real production reliability.", example: "Automated deploys, logs, alerts, and rollback plans." },
  { term: "CI / CD", icon: Workflow, short: "Automation that tests and deploys code after changes are pushed.", why: "It reduces manual steps and catches issues earlier.", example: "GitHub push triggers build, tests, and deployment." },
  { term: "Cloud", icon: Globe2, short: "Internet-based servers and services used to host apps and data.", why: "It lets products scale without buying and managing physical machines.", example: "Vercel hosts the frontend, Supabase stores app data." },
  { term: "Frontend", icon: PanelsTopLeft, short: "The part of an app users see and interact with in the browser.", why: "It turns data and logic into screens people can actually use.", example: "React components render the dashboard you click through." },
  { term: "Backend", icon: Server, short: "The server-side part that handles logic, data, and security.", why: "It does the heavy lifting the user never sees: auth, storage, and rules.", example: "The backend checks your password and returns your profile." },
  { term: "Pull Request", icon: GitPullRequest, short: "A request to merge your code changes into the main codebase.", why: "It gives teammates a chance to review before the change goes live.", example: "You open a PR, a teammate approves it, then it merges to main." },
  { term: "Code Review", icon: ScanSearch, short: "A teammate reading your changes to catch issues and share feedback.", why: "A second pair of eyes finds bugs, gaps, and better approaches early.", example: "A reviewer spots a missing null check before the PR merges." },
  { term: "Standup", icon: Users, short: "A short daily meeting where each person shares progress and blockers.", why: "It keeps the team aligned without long status meetings.", example: "Yesterday I fixed login, today I start reports, no blockers." },
  { term: "Backlog", icon: ListTodo, short: "The ordered list of everything the team may build or fix later.", why: "It captures ideas and bugs so nothing gets lost, then priority sorts them.", example: "The dark mode request sits in the backlog until it's picked for a sprint." },
  { term: "MVP", icon: Target, short: "Minimum Viable Product: the smallest version that delivers real value.", why: "Shipping small first gets real feedback before investing months.", example: "Launch notes with just create and search, then add folders later." },
  { term: "QA / Testing", icon: ShieldAlert, short: "Checking that software works as expected before users see it.", why: "It catches broken flows early, when fixes are cheap.", example: "QA finds that checkout fails when the cart is empty." },
  { term: "Staging vs Production", icon: ServerCog, short: "Staging is the safe rehearsal copy; production is the live app.", why: "Testing in staging protects real users from unfinished changes.", example: "The new feature runs on staging for a day before going to production." },
  { term: "JSON", icon: FileJson, short: "A simple text format apps use to send and store structured data.", why: "Nearly every API speaks JSON, so reading it is a daily skill.", example: '{ "name": "Raja", "role": "developer" }' },
  { term: "SQL", icon: Table2, short: "The language for asking a database questions and updating its data.", why: "Most business data lives in tables, and SQL is how you reach it.", example: "SELECT name FROM users WHERE active = true;" },
  { term: "Authentication", icon: KeyRound, short: "Proving who a user is, usually with a password, code, or provider login.", why: "Apps must know who you are before showing your private data.", example: "Sign in with Google, get a session, see your own notes." },
  { term: "Docker", icon: Container, short: "A tool that packages an app and everything it needs into one container.", why: "The app runs the same on any laptop or server, ending works-on-my-machine bugs.", example: "The API ships as a Docker image that runs identically everywhere." },
  { term: "Caching", icon: Gauge, short: "Keeping a copy of data close by so it loads faster next time.", why: "Serving saved results is far faster and cheaper than recomputing them.", example: "The homepage loads instantly because its data was cached." },
  { term: "Tech Debt", icon: Wrench, short: "Shortcuts in code that save time now but cost more effort later.", why: "Naming it helps teams schedule cleanup before it slows everyone down.", example: "The quick login hack works, but each new feature around it takes longer." },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AIML-Kpop, ChaatDeck & TechHome" },
      { name: "description", content: "Three learning modes in one polished app: stage-style interview prep, chaat-inspired lessons, and simple technical vocabulary." },
      { property: "og:title", content: "AIML-Kpop, ChaatDeck & TechHome" },
      { property: "og:description", content: "Switch between cinematic learning decks and a clean glossary of everyday technical terms." },
    ],
  }),
  component: Home,
});

function Home() {
  const { theme } = useTheme();
  const deck = useDeck();

  if (theme === "tech") {
    return <TechHome />;
  }

  return <DeckHome deck={deck} />;
}

function DeckHome({ deck }: { deck: ReturnType<typeof useDeck> }) {
  const total = deck.sections.reduce((n, section) => n + section.items.length, 0);
  const heroFounder = deck.foundersBySection.qans;

  return (
    <div className="mx-auto w-full max-w-5xl px-6 pb-16 pt-8">
      <section className="relative overflow-hidden rounded-4xl shadow-glow ring-1 ring-rose/20">
        <img src={deck.heroImage} alt="" width={1600} height={912} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-noir/95 via-noir/80 to-noir/40" />
        <div className="relative grid gap-8 p-8 sm:p-12 lg:grid-cols-[1.4fr,1fr] lg:items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-rose/30 bg-noir/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-rose backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> {deck.heroBadge}
            </div>
            <h1 className="font-display text-5xl font-semibold leading-[1.02] text-foreground sm:text-6xl">
              {deck.heroTitleA}<span className="gradient-text">{deck.heroTitleAccent}</span>{deck.heroTitleB}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-foreground/75">{deck.heroSubtitle}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/qans" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose to-coral px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-95">
                {deck.ctaPrimary} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/programs" className="inline-flex items-center gap-2 rounded-full border border-rose/30 bg-noir/50 px-5 py-3 text-sm font-semibold text-foreground backdrop-blur transition hover:bg-noir/80">
                {deck.ctaSecondary}
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-8 text-sm text-foreground/70">
              <div><span className="font-display text-2xl font-bold text-rose">{total}</span> tracks</div>
              <div><span className="font-display text-2xl font-bold text-rose">{deck.sections.length}</span> decks</div>
              <div><span className="font-display text-2xl font-bold text-rose">∞</span> encore energy</div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="animate-float relative mx-auto">
              <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-rose/40 to-coral/30 blur-2xl" />
              <img src={heroFounder.image} alt={heroFounder.name} width={800} height={800} className="relative h-72 w-72 rounded-[2rem] object-cover shadow-glow ring-2 ring-rose/40" />
              <div className="glass-strong absolute -bottom-4 -left-4 max-w-[220px] rounded-2xl p-3">
                <Quote className="mb-1 h-3.5 w-3.5 text-rose" />
                <p className="font-display text-xs italic leading-snug text-foreground/90">"{deck.homeQuote}"</p>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">{deck.homeQuoteBy}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-8"><QuotesTicker /></div>

      <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {deck.sections.map((section, index) => {
          const Icon = sectionIcons[section.slug as keyof typeof sectionIcons] ?? Sparkles;
          const founder = deck.foundersBySection[section.slug];
          return (
            <Link key={section.slug} to={("/" + section.slug) as "/qans"} className="group animate-pop-in relative overflow-hidden rounded-3xl ring-1 ring-rose/15 transition-all hover:-translate-y-1 hover:ring-rose/40 hover:shadow-glow" style={{ animationDelay: String(index * 80) + "ms" }}>
              <img src={founder.image} alt={founder.name} className="absolute inset-0 h-full w-full object-cover opacity-40 transition group-hover:opacity-55" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/85 to-noir/40" />
              <div className="relative flex h-full flex-col p-6">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-rose/30 bg-noir/70 backdrop-blur"><Icon className="h-5 w-5 text-rose" /></span>
                  <span className="rounded-full border border-rose/25 bg-noir/60 px-2.5 py-1 text-xs font-semibold text-foreground/80">{section.items.length}</span>
                </div>
                <div className="mt-16">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-rose/80">{founder.name}</div>
                  <h3 className="mt-1 font-display text-2xl font-semibold text-foreground">{section.title}</h3>
                  <p className="mt-1 text-sm text-foreground/70">{section.tagline}</p>
                </div>
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-rose transition group-hover:gap-2.5">Open deck <ArrowRight className="h-4 w-4" /></div>
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}

function TechHome() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 pb-16 pt-10 sm:px-6 lg:pt-14">
      <section className="glass-strong overflow-hidden rounded-4xl p-6 sm:p-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-rose/25 bg-background/70 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.25em] text-rose"><Sparkles className="h-3.5 w-3.5" /> Tech Vocabulary</div>
        <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">Simple tech terms,<span className="gradient-text"> explained clearly.</span></h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">Quick tiles for the words you will hear in IT teams, product meetings, engineering chats, and real project work.</p>
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {termTiles.map((tile, index) => {
          const Icon = tile.icon;
          return (
            <article key={tile.term} className="animate-pop-in rounded-3xl bg-background/78 p-6 shadow-soft ring-1 ring-rose/10 backdrop-blur transition hover:-translate-y-1 hover:ring-rose/35 hover:shadow-glow" style={{ animationDelay: String(index * 45) + "ms" }}>
              <div className="flex items-start justify-between gap-4">
                <div><div className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">IT Term</div><h2 className="mt-2 font-display text-2xl font-semibold text-foreground">{tile.term}</h2></div>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose to-coral text-primary-foreground shadow-glow"><Icon className="h-5 w-5" /></span>
              </div>
              <p className="mt-5 text-sm font-semibold leading-6 text-foreground/85">{tile.short}</p>
              <p className="mt-4 text-sm leading-6 text-muted-foreground"><span className="font-bold text-foreground">Why:</span> {tile.why}</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground"><span className="font-bold text-foreground">Example:</span> {tile.example}</p>
            </article>
          );
        })}
      </section>
    </div>
  );
}
