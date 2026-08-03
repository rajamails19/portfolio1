import { createFileRoute, Link } from "@tanstack/react-router";
import { projectRegistry } from "@/lib/project-registry";
import { ArrowUpRight, MonitorDot, Sparkles } from "lucide-react";

export const Route = createFileRoute("/control-center")({
  component: ControlCenter,
  head: () => ({
    meta: [
      { title: "Control Center — Projects" },
      {
        name: "description",
        content: "A single local launch point for Raja's active projects.",
      },
    ],
  }),
});

function ControlCenter() {
  return (
    <main className="min-h-[100dvh] bg-[#f8f6ef] text-[#1f211c]">
      <header className="border-b border-black/10 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:px-5">
          <Link
            to="/"
            className="flex min-w-0 items-center gap-2 font-semibold sm:gap-2.5"
          >
            <MonitorDot className="h-5 w-5 shrink-0" />
            <span className="truncate">Control Center</span>
          </Link>
          <div className="flex shrink-0 items-center gap-1.5 text-sm sm:gap-2">
            <Link
              to="/"
              className="rounded-md px-2.5 py-2 text-black/65 transition hover:bg-black/[0.05] hover:text-black sm:px-3"
            >
              Home
            </Link>
            <Link
              to="/"
              className="rounded-md bg-black px-2.5 py-2 font-medium text-white transition hover:bg-black/80 sm:px-3"
            >
              Portal
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-black/55">
            <Sparkles className="h-3.5 w-3.5" />
            One chat, one browser, many projects
          </div>
          <h1 className="text-3xl font-bold tracking-normal sm:text-5xl">
            Switch projects without opening another workspace.
          </h1>
          <p className="mt-4 text-base leading-7 text-black/60">
            Each app stays in its own clean folder. This page is just the local
            launch surface so you can focus, switch gears, and ask Codex to work
            on any project from the same place.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {projectRegistry.map((project) => (
            <ProjectTile key={project.name} project={project} />
          ))}
        </div>
      </section>
    </main>
  );
}

function ProjectTile({
  project,
}: {
  project: (typeof projectRegistry)[number];
}) {
  const Icon = project.icon;
  const className =
    "group flex min-h-[220px] flex-col justify-between rounded-lg border border-black/10 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-black/20 hover:shadow-md";

  const content = (
    <>
      <div className="flex items-start justify-between gap-4">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-md ${project.tone}`}
        >
          <Icon className="h-6 w-6 text-white" />
        </div>
        <ArrowUpRight className="h-5 w-5 text-black/35 transition group-hover:text-black/70" />
      </div>
      <div>
        <p className="text-sm font-medium uppercase tracking-wide text-black/45">
          {project.label}
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-normal">
          {project.name}
        </h2>
        <p className="mt-3 text-sm text-black/55">{project.status}</p>
      </div>
    </>
  );

  if (project.external) {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <Link to={project.href} className={className}>
      {content}
    </Link>
  );
}
