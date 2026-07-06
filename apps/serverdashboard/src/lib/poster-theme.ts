import type { LocalApp, Framework } from "./mock-data";

export type Pattern = "dots" | "stripe" | "wave" | "grid" | "blob";

export interface PosterTheme {
  gradient: string;
  accent: string;
  pattern: Pattern;
  emoji: string;
  label: string;
}

const PALETTES: PosterTheme[] = [
  { gradient: "var(--gradient-coral)", accent: "var(--coral)", pattern: "blob", emoji: "🌋", label: "Coral" },
  { gradient: "var(--gradient-mint)", accent: "var(--mint)", pattern: "wave", emoji: "🌊", label: "Mint" },
  { gradient: "var(--gradient-gold)", accent: "var(--gold)", pattern: "dots", emoji: "🌞", label: "Sunshine" },
  { gradient: "var(--gradient-grape)", accent: "var(--grape)", pattern: "stripe", emoji: "🍇", label: "Grape" },
  { gradient: "var(--gradient-sky)", accent: "var(--sky)", pattern: "grid", emoji: "🪁", label: "Sky" },
  { gradient: "var(--gradient-magenta)", accent: "var(--magenta)", pattern: "blob", emoji: "🌸", label: "Magenta" },
  { gradient: "var(--gradient-lime)", accent: "oklch(0.85 0.2 140)", pattern: "dots", emoji: "🍋", label: "Lime" },
  { gradient: "var(--gradient-sunset)", accent: "oklch(0.78 0.22 50)", pattern: "wave", emoji: "🌅", label: "Sunset" },
  { gradient: "var(--gradient-aurora)", accent: "oklch(0.75 0.22 305)", pattern: "blob", emoji: "🌌", label: "Aurora" },
];

// Per-app overrides for stronger personality
const APP_OVERRIDES: Record<string, Partial<PosterTheme>> = {
  "apple-notes-clone": { emoji: "📝", gradient: "var(--gradient-gold)", pattern: "dots" },
  "forma-fitness": { emoji: "💪", gradient: "var(--gradient-coral)", pattern: "stripe" },
  "local-dashboard": { emoji: "🛰️", gradient: "var(--gradient-aurora)", pattern: "grid" },
  "telugu-trace-kids": { emoji: "✍️", gradient: "var(--gradient-magenta)", pattern: "blob" },
  "tanstack_start_ts": { emoji: "🚀", gradient: "var(--gradient-grape)", pattern: "wave" },
  "quiz-kids-app": { emoji: "🧠", gradient: "var(--gradient-mint)", pattern: "dots" },
  "design-portfolio": { emoji: "🎨", gradient: "var(--gradient-sunset)", pattern: "wave" },
};

function hashString(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function posterTheme(app: Pick<LocalApp, "id" | "framework">): PosterTheme {
  const base = PALETTES[hashString(app.id) % PALETTES.length];
  const override = APP_OVERRIDES[app.id] ?? {};
  return { ...base, ...override };
}

export const FRAMEWORK_EMOJI: Record<Framework, string> = {
  "Next.js": "▲",
  Vite: "⚡",
  "TanStack Start": "🥞",
  "Node.js": "⬢",
  Bun: "🥟",
  Astro: "🚀",
  Remix: "💿",
};
