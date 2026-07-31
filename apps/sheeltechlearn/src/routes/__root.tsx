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
import { SideNav } from "../components/SideNav";
import { ThemeProvider, useTheme } from "../context/ThemeContext";
import { ThemeToggle } from "../components/ThemeToggle";
import { SiteEditor } from "../components/SiteEditor";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass max-w-md rounded-3xl p-10 text-center">
        <h1 className="font-display text-7xl font-bold gradient-text">404</h1>
        <h2 className="mt-4 font-display text-xl font-semibold">Off-stage moment</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This track isn't on the setlist. The page you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-coral px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-95"
          >
            Back to the stage
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass max-w-md rounded-3xl p-10 text-center">
        <h1 className="font-display text-xl font-semibold">The show hit a snag</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something backstage went sideways. Refresh or head home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full bg-gradient-to-r from-primary to-coral px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow"
          >
            Try again
          </button>
          <a href="/" className="rounded-full border border-input bg-card/60 px-5 py-2.5 text-sm font-medium">
            Go home
          </a>
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
      { title: "AIML-Kpop & ChaatDeck — Two Cinematic Study Decks" },
      { name: "description", content: "Two decks, one architecture. Toggle between K-pop-mentored interview prep and India's most iconic street-food craft." },
      { name: "author", content: "AIML-Kpop" },
      { property: "og:title", content: "AIML-Kpop & ChaatDeck — Two Cinematic Study Decks" },
      { property: "og:description", content: "Two decks, one architecture. Toggle between K-pop-mentored interview prep and India's most iconic street-food craft." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "AIML-Kpop & ChaatDeck" },
      { name: "twitter:description", content: "Two decks, one architecture. Toggle between K-pop-mentored interview prep and India's most iconic street-food craft." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap",
      },
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
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppFrame />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

function AppFrame() {
  const { theme } = useTheme();
  const isTechHome = theme === "tech";

  return (
    <div className="flex min-h-screen">
      {!isTechHome && (
        <div className="hidden lg:block">
          <SideNav />
        </div>
      )}
      <main className="relative flex-1 min-w-0">
        <div className="pointer-events-auto fixed right-4 top-4 z-50 sm:right-6 sm:top-6">
          <ThemeToggle />
        </div>
        <div data-site-edit-surface="page">
          <Outlet />
        </div>
      </main>
      <SiteEditor />
    </div>
  );
}
