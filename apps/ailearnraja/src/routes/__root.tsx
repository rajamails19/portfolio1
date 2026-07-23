import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/SiteHeader";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl text-gradient-ember">404</h1>
        <h2 className="mt-4 font-serif italic text-2xl">Lost in the nebula</h2>
        <p className="mt-2 text-sm text-muted-foreground">This page drifted beyond the map.</p>
        <Link to="/" className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">
          Return to the codex
        </Link>
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
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl text-gradient-ember">The flame flickered</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong rendering this page.</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
        >Try again</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Aetheria — AI Career Codex" },
      { name: "description", content: "A cinematic reference codex for an AI Engineering & Data Science career — notes, topics, interview prep, diagrams, and curated videos." },
      { property: "og:title", content: "Aetheria — AI Career Codex" },
      { property: "og:description", content: "A cinematic reference codex for an AI Engineering & Data Science career — notes, topics, interview prep, diagrams, and curated videos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Aetheria — AI Career Codex" },
      { name: "twitter:description", content: "A cinematic reference codex for an AI Engineering & Data Science career — notes, topics, interview prep, diagrams, and curated videos." },
      { property: "og:image", content: "/og-preview.png" },
      { name: "twitter:image", content: "/og-preview.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@400;500;600;700&display=swap" },
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
      <SiteHeader />
      <main className="min-h-[calc(100vh-4rem)]"><Outlet /></main>
      <footer className="border-t border-[oklch(0.85_0.14_85/0.15)] mt-24 py-10 text-center text-xs text-muted-foreground font-serif italic">
        Built for the long climb. Aetheria · AI Career Codex
      </footer>
    </QueryClientProvider>
  );
}
