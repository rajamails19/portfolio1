export type Framework =
  | "Next.js"
  | "Vite"
  | "TanStack Start"
  | "Node.js"
  | "Bun"
  | "Astro"
  | "Remix";

export type BackendStack = "Express" | "Supabase" | "Bun" | "FastAPI" | "Hono" | "SQLite";

export interface LocalApp {
  id: string;
  name: string;
  path: string;
  framework: Framework;
  port: number;
  uptimeSec: number;
  pid: number;
  source: "claude" | "codex" | "manual" | "lovable";
  about: string;
  features: string[];
  readmePath?: string;
  backend?: {
    stack: BackendStack;
    port?: number;
    running: boolean;
  };
  db?: BackendStack;
}

const FRAMEWORK_COLORS: Record<Framework, string> = {
  "Next.js": "oklch(0.85 0.02 250)",
  Vite: "oklch(0.7 0.2 285)",
  "TanStack Start": "oklch(0.7 0.2 25)",
  "Node.js": "oklch(0.78 0.18 145)",
  Bun: "oklch(0.88 0.13 90)",
  Astro: "oklch(0.7 0.18 30)",
  Remix: "oklch(0.85 0.02 250)",
};
export const frameworkColor = (f: Framework) => FRAMEWORK_COLORS[f];

export const MOCK_APPS: LocalApp[] = [
  {
    id: "apple-notes-clone",
    name: "apple-notes-clone",
    path: "~/Documents/Coding/Claude-help/apple-notes-clone",
    framework: "Next.js",
    port: 3000,
    uptimeSec: 60 * 60 * 2 + 60 * 23,
    pid: 48211,
    source: "claude",
    about:
      "Pixel-perfect Apple Notes clone with rich text, folders, tags, and offline sync. Built as a study in liquid-glass UI.",
    features: ["Rich text editor (Tiptap)", "Folder + tag hierarchy", "Realtime sync via Supabase", "Liquid glass UI"],
    readmePath: "README.md",
    backend: { stack: "Supabase", port: 54321, running: true },
    db: "Supabase",
  },
  {
    id: "forma-fitness",
    name: "forma-fitness",
    path: "~/Documents/Coding/Claude-help/forma-fitness",
    framework: "Next.js",
    port: 3001,
    uptimeSec: 60 * 60 + 60 * 9,
    pid: 48315,
    source: "claude",
    about: "Workout tracker focused on physical, dense UI. Snap-to-grid logging that feels like a real weight clip.",
    features: ["Workout builder", "Set progression tracking", "Apple Health import", "PWA offline mode"],
  },
  {
    id: "local-dashboard",
    name: "local-dashboard",
    path: "~/Documents/Coding/Claude-help/local-dashboard",
    framework: "Node.js",
    port: 9999,
    uptimeSec: 60 * 60 * 6 + 60 * 6,
    pid: 47002,
    source: "claude",
    about: "The local agent that scans your machine for running dev servers, ports, and stacks. Exposes /api/apps.",
    features: ["Port + process scanning", "Framework auto-detect", "README parsing", "Graceful stop endpoint"],
    backend: { stack: "Express", port: 9999, running: true },
  },
  {
    id: "telugu-trace-kids",
    name: "telugu-trace-kids",
    path: "~/Documents/Coding/Claude-help/telugu-trace-kids",
    framework: "Node.js",
    port: 3002,
    uptimeSec: 60 * 60 + 60 * 30,
    pid: 48422,
    source: "claude",
    about: "Tracing app for kids to learn Telugu script with audio prompts and stroke-order playback.",
    features: ["Canvas tracing", "Audio prompts", "Progress tracking per child", "Offline lesson packs"],
    backend: { stack: "Express", port: 5179, running: true },
    db: "SQLite",
  },
  {
    id: "tanstack_start_ts",
    name: "tanstack_start_ts",
    path: "~/Documents/Coding/CGPT-help/gpt-tanstack/tanstack_start_ts",
    framework: "TanStack Start",
    port: 8080,
    uptimeSec: 60 * 17,
    pid: 49001,
    source: "codex",
    about: "TanStack Start playground exploring SSR patterns, server functions, and edge deployment to Cloudflare.",
    features: ["SSR + streaming", "Server functions", "Edge-ready", "Supabase auth"],
    backend: { stack: "Bun", port: 8080, running: true },
    db: "Supabase",
  },
  {
    id: "quiz-kids-app",
    name: "quiz-kids-app",
    path: "~/quiz-kids-app",
    framework: "Vite",
    port: 5180,
    uptimeSec: 60 * 28,
    pid: 49210,
    source: "manual",
    about: "Adaptive quiz engine for kids with spaced-repetition card scheduling and a parent dashboard.",
    features: ["Spaced repetition", "Parent dashboard", "Animated rewards", "Multi-child profiles"],
    backend: { stack: "Express", port: 4000, running: true },
    db: "SQLite",
  },
  {
    id: "design-portfolio",
    name: "design-portfolio",
    path: "~/Documents/Coding/Codex-help/design-portfolio",
    framework: "Vite",
    port: 5174,
    uptimeSec: 60 * 7,
    pid: 49333,
    source: "codex",
    about: "Personal design portfolio with WebGL hover transitions and a custom case-study layout system.",
    features: ["WebGL transitions", "MDX case studies", "View transitions API", "Edge image optimization"],
  },
];

export interface DeployedSite {
  id: string;
  name: string;
  url: string;
  host: "vercel" | "cloudflare" | "namecheap" | "lovable" | "netlify";
  stack: string;
  tag: "production" | "staging" | "personal" | "client";
  about: string;
}

const vercelSites: DeployedSite[] = [
  "forma-fit", "apple-notes-demo", "quizkids", "design-portfolio", "telugu-trace",
  "ship-it-cafe", "edge-bench", "color-lab", "type-foundry", "wave-radio",
  "snap-receipts", "habit-orbit", "moodboard-x", "flashcards-pro", "tiny-todos",
  "split-bill", "kid-stories", "recipe-hub", "expense-jar", "scribble-pad",
  "vault-notes", "podcast-cards", "fitness-rings", "study-timer", "morning-pages",
  "gift-tracker", "trip-planner", "movie-night", "wishlist-zen", "icon-park",
].map((slug, i) => ({
  id: `v${i}`,
  name: `${slug}.vercel.app`,
  url: `https://${slug}.vercel.app`,
  host: "vercel" as const,
  stack: ["Next.js", "Vite", "Remix", "Astro"][i % 4],
  tag: (i % 3 === 0 ? "production" : i % 3 === 1 ? "staging" : "personal") as DeployedSite["tag"],
  about: "Shipped on Vercel.",
}));

const cloudflareSites: DeployedSite[] = [
  "edge-api", "tanstack-lab", "image-proxy", "dns-tools", "uptime-bot",
  "studio-aurora", "hono-bench", "telugu-trace", "kv-notes",
].map((slug, i) => ({
  id: `c${i}`,
  name: `${slug}.pages.dev`,
  url: `https://${slug}.pages.dev`,
  host: "cloudflare" as const,
  stack: ["TanStack Start", "Hono", "Astro", "Workers"][i % 4],
  tag: (i % 2 === 0 ? "production" : "personal") as DeployedSite["tag"],
  about: "Running on Cloudflare.",
}));

const domains: DeployedSite[] = ([
  { name: "rohit.dev", stack: "Next.js", tag: "personal" as const, about: "Personal site." },
  { name: "forma.fit", stack: "Next.js", tag: "production" as const, about: "Workout tracker." },
  { name: "quizkids.io", stack: "Vite", tag: "production" as const, about: "Quizzes for kids." },
  { name: "telugu-trace.app", stack: "TanStack", tag: "production" as const, about: "Tracing app." },
  { name: "notes.rohit.dev", stack: "Next.js", tag: "personal" as const, about: "Notes garden." },
  { name: "designs.rohit.dev", stack: "Vite", tag: "personal" as const, about: "Portfolio." },
  { name: "client-acme.com", stack: "Next.js", tag: "client" as const, about: "ACME site." },
  { name: "studio-aurora.co", stack: "Astro", tag: "client" as const, about: "Studio." },
]).map((s, i) => ({
  id: `d${i}`,
  url: `https://${s.name}`,
  host: "namecheap" as const,
  ...s,
}));

const lovableSites: DeployedSite[] = [
  "stage-dashboard", "kid-stories", "design-system-kit", "habit-orbit", "scribble-pad",
].map((slug, i) => ({
  id: `l${i}`,
  name: `${slug}.lovable.app`,
  url: `https://${slug}.lovable.app`,
  host: "lovable" as const,
  stack: "TanStack Start",
  tag: "personal" as const,
  about: "Built with Lovable.",
}));

export const DEPLOYED_SITES: DeployedSite[] = [
  ...vercelSites, ...cloudflareSites, ...domains, ...lovableSites,
];

export const formatUptime = (sec: number) => {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
};
