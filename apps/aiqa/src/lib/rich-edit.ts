import type { Block } from "@/content/types";

// Inline styles an answer's text can carry. Each run carries at most one.
export type InlineStyle = "bold" | "mark" | "rose" | "under" | "code";
type RunStyle = InlineStyle | "link" | null;
interface Run {
  text: string;
  style: RunStyle;
  raw?: string; // original markup, kept verbatim for links
}

// Same markers (and order) as renderInline in rich-text.tsx.
const RE = /(\*\*[^*]+\*\*)|(==[^=]+==)|(__[^_]+__)|(\^\^.+?\^\^)|(`[^`]+`)|(\[[^\]]+\]\([^)]+\))/g;
const WRAP: Record<InlineStyle, [string, string]> = {
  bold: ["**", "**"],
  mark: ["==", "=="],
  under: ["__", "__"],
  rose: ["^^", "^^"],
  code: ["`", "`"],
};

function styleOf(token: string): { style: RunStyle; text: string } {
  if (token.startsWith("**")) return { style: "bold", text: token.slice(2, -2) };
  if (token.startsWith("==")) return { style: "mark", text: token.slice(2, -2) };
  if (token.startsWith("__")) return { style: "under", text: token.slice(2, -2) };
  if (token.startsWith("^^")) return { style: "rose", text: token.slice(2, -2) };
  if (token.startsWith("`")) return { style: "code", text: token.slice(1, -1) };
  const label = /\[([^\]]+)\]/.exec(token)?.[1] ?? token;
  return { style: "link", text: label };
}

export function parseRuns(src: string): Run[] {
  const runs: Run[] = [];
  let last = 0;
  for (const m of src.matchAll(RE)) {
    const idx = m.index ?? 0;
    if (idx > last) runs.push({ text: src.slice(last, idx), style: null });
    const { style, text } = styleOf(m[0]);
    runs.push(style === "link" ? { text, style, raw: m[0] } : { text, style });
    last = idx + m[0].length;
  }
  if (last < src.length) runs.push({ text: src.slice(last), style: null });
  return runs;
}

export const plainText = (runs: Run[]) => runs.map((r) => r.text).join("");

export function serializeRuns(runs: Run[]): string {
  const merged: Run[] = [];
  for (const r of runs) {
    const prev = merged[merged.length - 1];
    if (prev && r.style !== "link" && prev.style === r.style) prev.text += r.text;
    else merged.push({ ...r });
  }
  return merged
    .map((r) => {
      if (r.style === "link") return r.raw ?? r.text;
      if (!r.style) return r.text;
      const [open, close] = WRAP[r.style];
      return `${open}${r.text}${close}`;
    })
    .join("");
}

/** Toggle `target` on the plain-text range [start, end). "clear" removes any style. */
export function applyStyle(
  runs: Run[],
  start: number,
  end: number,
  target: InlineStyle | "clear",
): Run[] {
  const parts: (Run & { inside: boolean })[] = [];
  let pos = 0;
  for (const r of runs) {
    const rs = pos;
    const re = pos + r.text.length;
    pos = re;
    const a = Math.max(start, rs);
    const b = Math.min(end, re);
    if (r.style === "link" || a >= b) {
      parts.push({ ...r, inside: false });
      continue;
    }
    if (a > rs) parts.push({ text: r.text.slice(0, a - rs), style: r.style, inside: false });
    parts.push({ text: r.text.slice(a - rs, b - rs), style: r.style, inside: true });
    if (b < re) parts.push({ text: r.text.slice(b - rs), style: r.style, inside: false });
  }
  const targets = parts.filter((p) => p.inside);
  const next: RunStyle =
    target === "clear" ? null : targets.every((p) => p.style === target) ? null : target;
  return parts.map(({ inside, ...r }) => (inside ? { ...r, style: next } : r));
}

export type EditOp = InlineStyle | "clear" | "heading" | "spotlight";
export type EditTarget = { block: number; listItem: number | null; start: number; end: number };
export type EditResult = { answer: Block[] } | { error: string };

/** Apply one toolbar action to an answer, returning a new answer array. */
export function applyEdit(answer: Block[], t: EditTarget, op: EditOp): EditResult {
  const b = answer[t.block];
  if (!b) return { error: "Couldn't find that line." };
  const out = answer.slice();

  // Block-level actions: HD / SB toggle, PL with a caret turns the block back to text.
  if (op === "heading" || op === "spotlight" || (op === "clear" && t.start === t.end)) {
    if (b.type === "list") return { error: "Bullets can only take word styles." };
    if (b.type !== "text" && b.type !== "heading" && b.type !== "callout")
      return { error: "That block can't be restyled." };
    const content = b.content;
    const plain = plainText(parseRuns(content));
    if (op === "heading") {
      out[t.block] =
        b.type === "heading" ? { type: "text", content } : { type: "heading", content: plain };
    } else if (op === "spotlight") {
      if (b.type === "heading") return { error: "Turn the heading back to plain first (PL)." };
      out[t.block] =
        b.type === "callout" && b.variant === "spotlight"
          ? { type: "text", content }
          : { type: "callout", variant: "spotlight", content };
    } else {
      out[t.block] = { type: "text", content };
    }
    return { answer: out };
  }

  if (t.start === t.end) return { error: "Select some words first." };
  if (b.type === "heading") return { error: "Headings can't take word styles." };

  const source =
    b.type === "list"
      ? b.items[t.listItem ?? -1]
      : b.type === "text" || b.type === "callout"
        ? b.content
        : undefined;
  if (source === undefined) return { error: "That block can't take word styles." };

  let { start, end } = t;
  const runs = parseRuns(source);
  const plain = plainText(runs);
  while (start < end && /\s/.test(plain[start])) start++;
  while (end > start && /\s/.test(plain[end - 1])) end--;
  if (start === end) return { error: "Select some words first." };

  const updated = serializeRuns(applyStyle(runs, start, end, op as InlineStyle | "clear"));
  if (b.type === "list") {
    const items = b.items.slice();
    items[t.listItem as number] = updated;
    out[t.block] = { ...b, items };
  } else if (b.type === "text") {
    out[t.block] = { ...b, content: updated };
  } else if (b.type === "callout") {
    out[t.block] = { ...b, content: updated };
  }
  return { answer: out };
}
