import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Infinity as InfinityIcon } from "lucide-react";
import { UsingProjects, Footer } from "./index";

export const Route = createFileRoute("/using")({
  head: () => ({
    meta: [
      { title: "Using — Portfolio Raja" },
      {
        name: "description",
        content: "The projects Raja opens most, gathered into one clean shelf.",
      },
    ],
  }),
  component: UsingPage,
});

function UsingPage() {
  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-2.5">
          <InfinityIcon className="h-7 w-7 text-foreground" strokeWidth={2.5} />
          <span className="text-xl font-semibold tracking-normal text-foreground/90">
            Portfolio Raja
          </span>
        </Link>
        <Link
          to="/"
          className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back home
        </Link>
      </nav>

      <UsingProjects />
      <Footer />
    </div>
  );
}
