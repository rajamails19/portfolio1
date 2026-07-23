import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet, Link, createRootRouteWithContext, useRouter,
  HeadContent, Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { TopNav } from "@/components/layout/TopNav";
import { ConnectionBanner } from "@/components/common/ConnectionBanner";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center paper-card-elevated p-10">
        <h1 className="text-7xl font-display font-bold italic">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Route not in the mission graph</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          That page is not registered with the orchestrator. Return to Mission Control.
        </p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition">
            Return to Mission Control
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center paper-card-elevated p-10">
        <h1 className="text-xl font-semibold">Trace failed</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message || "Retry the workflow or return home."}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">Retry</button>
          <a href="/" className="rounded-md border border-input px-4 py-2 text-sm">Home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Campus AI Mission Control" },
      { name: "description", content: "AI-first operating system for modern schools — agents, orchestration, RAG, MLOps, observability." },
      { name: "author", content: "Campus AI" },
      { property: "og:title", content: "Campus AI Mission Control" },
      { property: "og:description", content: "AI-first operating system for modern schools — agents, orchestration, RAG, MLOps, observability." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Campus AI Mission Control" },
      { name: "twitter:description", content: "AI-first operating system for modern schools — agents, orchestration, RAG, MLOps, observability." },
      { property: "og:image", content: "/og-preview.png" },
      { name: "twitter:image", content: "/og-preview.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <TopNav />
        <main className="flex-1 mx-auto w-full max-w-[1600px] px-6 lg:px-10 py-8">
          <ConnectionBanner className="mb-6" />
          <ErrorBoundary label="route">
            <Outlet />
          </ErrorBoundary>
        </main>
        <footer className="border-t border-border mt-4 py-6 px-6 lg:px-10 text-[10px] uppercase tracking-[0.22em] text-muted-foreground flex items-center justify-between">
          <span>Campus AI · The Mission Ledger</span>
          <span className="font-mono">build · prod-readiness · phase 1</span>
        </footer>
      </div>
      <Toaster position="bottom-right" />
    </QueryClientProvider>
  );
}
