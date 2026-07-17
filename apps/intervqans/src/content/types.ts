/**
 * Rich text supports inline markers (works in "text", "list" items, "callout"):
 *   ==highlight==   → gold highlight background
 *   __underline__   → wavy gold underline
 *   **bold**        → bold + gold color
 *   `code`          → inline code chip
 *   [label](url)    → external link
 */
export type Block =
  | { type: "text"; content: string }
  | { type: "heading"; content: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "code"; language: string; content: string }
  | { type: "callout"; variant?: "info" | "warn" | "tip"; content: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "link"; href: string; label: string }
  | { type: "links"; items: { href: string; label: string; description?: string }[] }
  | {
      type: "flow";
      title?: string;
      direction?: "horizontal" | "vertical";
      nodes: { label: string; sub?: string; tone?: "gold" | "ember" | "mint" | "sky" }[];
    };

export interface QAItem {
  id: string;
  question: string;
  tags?: string[];
  difficulty?: "Easy" | "Medium" | "Hard";
  answer: Block[];
}

export interface Section {
  slug: string;
  title: string;
  tagline: string;
  emoji: string;
  gradient: string;
  items: QAItem[];
}
