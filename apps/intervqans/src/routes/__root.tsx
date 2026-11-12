import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SideNav } from "../components/SideNav";
import { MobileNav } from "../components/MobileNav";
import { SiteEditor } from "../components/SiteEditor";
import { ThemeProvider } from "../themes/ThemeContext";
import { AppearanceProvider } from "../themes/AppearanceContext";
import { TierMarksProvider } from "../lib/tier-marks";
import { ThemeSwitcher } from "../components/ThemeSwitcher";

function NotFoundComponent() {
  return (
    <div className="flex min-h-dvh items-center justify-center px-4">
      <div className="glass max-w-md rounded-3xl p-10 text-center">
        <h1 className="font-display text-7xl font-bold gradient-text">404</h1>
        <h2 className="mt-4 font-display text-xl font-semibold">This page went for a snack</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-[oklch(0.7_0.2_340)] px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow transition hover:opacity-95"
          >
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error: caught, reset }: ErrorComponentProps) {
  // The router types the caught value as `unknown`; normalise it to an Error.
  const error = caught instanceof Error ? caught : new Error(String(caught));
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [caught]);

  return (
    <div className="flex min-h-dvh items-center justify-center px-4">
      <div className="glass max-w-md rounded-3xl p-10 text-center">
        <h1 className="font-display text-xl font-semibold">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. Try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-gradient-to-r from-primary to-[oklch(0.7_0.2_340)] px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-full border border-input bg-white/60 px-5 py-2.5 text-sm font-medium"
          >
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
      { title: "StudyDeck — Prep. Practice. Ship." },
      {
        name: "description",
        content:
          "A cinematic study companion for React, AI engineering, and system design — Q&A, programs, real-time scenarios, and portfolio projects.",
      },
      { name: "author", content: "StudyDeck" },
      { property: "og:title", content: "StudyDeck — Prep. Practice. Ship." },
      {
        property: "og:description",
        content:
          "A cinematic study companion for React, AI engineering, and system design — Q&A, programs, real-time scenarios, and portfolio projects.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "StudyDeck — Prep. Practice. Ship." },
      {
        name: "twitter:description",
        content:
          "A cinematic study companion for React, AI engineering, and system design — Q&A, programs, real-time scenarios, and portfolio projects.",
      },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/5143169b-41b6-4727-a567-eb7af303a266/id-preview-93ddb96d--0ac61ac5-6fc0-4d1c-8ca4-d46121a56a90.lovable.app-1783832012264.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/5143169b-41b6-4727-a567-eb7af303a266/id-preview-93ddb96d--0ac61ac5-6fc0-4d1c-8ca4-d46121a56a90.lovable.app-1783832012264.png",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
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

/**
 * On wide screens the left menu scrolls away with the page. Once it is fully out of view its
 * column would stay empty, so collapse it and let the page use the full width. Scrolling back
 * near the top brings it back. Different thresholds avoid flicker when the layout re-flows.
 */
function useCollapseNavWhenScrolledPast(navRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = document.documentElement;
    const wide = window.matchMedia("(min-width: 1024px)");
    let away = false;
    const update = () => {
      const navHeight = navRef.current?.firstElementChild?.getBoundingClientRect().height ?? 0;
      const y = window.scrollY;
      let next = away;
      if (!wide.matches) next = false;
      else if (!away && y > navHeight + 16) next = true;
      else if (away && y < navHeight * 0.4) next = false;
      if (next !== away) {
        away = next;
        if (away) root.setAttribute("data-nav", "away");
        else root.removeAttribute("data-nav");
      }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      root.removeAttribute("data-nav");
    };
  }, [navRef]);
}

function RootComponent() {
  const navRef = useRef<HTMLDivElement>(null);
  useCollapseNavWhenScrolledPast(navRef);
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <AppearanceProvider>
        <ThemeProvider>
          <TierMarksProvider>
            <ThemeSwitcher />
            <MobileNav />
            <div className="flex min-h-dvh">
              <div ref={navRef} className="shell-nav hidden lg:block">
                <SideNav />
              </div>
              <main className="min-w-0 flex-1 pt-14 lg:pt-0">
                <div data-site-edit-surface="page">
                  <Outlet />
                </div>
              </main>
            </div>
            <SiteEditor />
          </TierMarksProvider>
        </ThemeProvider>
      </AppearanceProvider>
    </QueryClientProvider>
  );
}
