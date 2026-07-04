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
import appleNotesCloneThumb from "@/assets/apple-notes-clone-thumb.png";
import formaFitnessThumb from "@/assets/forma-fitness-thumb.png";
import genZStyleLearnThumb from "@/assets/genzstylelearn-thumb.png";
import heroBg from "@/assets/hero-bg.jpg";
import jagsRajKitchenThumb from "@/assets/jagsrajkitchen-thumb.png";
import resetMindProjThumb from "@/assets/resetmindproj-thumb.png";
import shadowBg from "@/assets/shadow-bg.jpg";

const projectPreviews = [
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
    href: "http://localhost:8088/",
    image: formaFitnessThumb,
    alt: "Forma Fitness homepage preview",
  },
  {
    name: "GenZ Style Learn",
    href: "http://localhost:8089/",
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
    name: "Apple Notes Clone",
    href: "http://localhost:8092/",
    image: appleNotesCloneThumb,
    alt: "Apple Notes Clone homepage preview",
  },
  {
    name: "AI Ascend Academy",
    href: "http://localhost:8093/",
    image: aiAscendAcademyThumb,
    alt: "AI Ascend Academy homepage preview",
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
      <Features />
      <HowItWorks />
      <Reviews />
      <FinalCTA />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section
      className="relative overflow-hidden pb-24 pt-0 lg:pb-32 lg:pt-8 xl:pb-40 xl:pt-12"
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

      <div className="absolute right-[max(1.25rem,calc((100vw-66rem)/2))] top-24 z-30 hidden max-h-[34rem] w-[min(18rem,28vw)] flex-col gap-2 overflow-y-auto pr-1 xl:flex">
        {projectPreviews.map((project) => (
          <ProjectPreview key={project.name} project={project} />
        ))}
      </div>

      <nav className="relative z-20 mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
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

      <div className="relative z-10 mx-auto max-w-5xl px-5 pb-12 pt-24">
        <div className="max-w-xl">
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
      className="group block overflow-hidden rounded-lg border border-white/30 bg-white/10 shadow-2xl shadow-black/20 backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/15"
    >
      <img src={project.image} alt={project.alt} className="aspect-[16/5] w-full object-cover" />
      <span className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-white">
        <span>{project.name}</span>
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
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
