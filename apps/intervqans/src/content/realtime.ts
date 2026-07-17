import type { Section } from "./types";

export const realtimeSection: Section = {
  slug: "realtime",
  title: "Real-Time Scenarios",
  tagline: "What actually breaks in production — and how to reason about it.",
  emoji: "🎯",
  gradient: "from-[oklch(0.9_0.09_45)] via-[oklch(0.9_0.09_355)] to-[oklch(0.92_0.09_305)]",
  items: [
    {
      id: "list-of-10k",
      question: "Your React table renders 10,000 rows and the browser freezes. How do you fix it?",
      tags: ["React", "Performance"],
      difficulty: "Medium",
      answer: [
        { type: "heading", content: "Diagnose first" },
        {
          type: "list",
          ordered: true,
          items: [
            "Open React DevTools Profiler → confirm the render cost is in the row list, not a parent.",
            "Check the DOM node count — 10k rows × N cells each often means 100k+ nodes.",
            "Look at re-render triggers: is a parent passing a new object/function reference every render?",
          ],
        },
        { type: "heading", content: "Fixes, in order of impact" },
        {
          type: "list",
          items: [
            "Virtualize the list with @tanstack/react-virtual or react-window — only render what's visible (~30 rows).",
            "Memoize row components with React.memo and pass primitive props (id) instead of full objects.",
            "Move filters/sorting to useMemo so they don't recompute on unrelated state changes.",
            "For huge datasets, paginate on the server — never ship 10k rows over the wire.",
          ],
        },
        { type: "callout", variant: "tip", content: "Virtualization alone typically drops render time from ~800ms to <16ms. Do it first, optimize second." },
      ],
    },
    {
      id: "flaky-api",
      question: "A third-party API you depend on is flaky (5% failure). How do you design around it?",
      tags: ["Architecture", "Resilience"],
      difficulty: "Hard",
      answer: [
        {
          type: "list",
          ordered: true,
          items: [
            "Retries with exponential backoff + jitter (not tight-loop retries — you'll DDoS them).",
            "Circuit breaker: after N consecutive failures, fail fast for a cooldown window.",
            "Timeouts on every call — never inherit the default of 'forever'.",
            "Idempotency keys for writes so retries don't double-charge / double-send.",
            "Cache last-good responses for reads; serve stale-while-revalidate.",
            "Queue non-urgent work (webhooks, emails) so failures retry off the request path.",
          ],
        },
        {
          type: "code",
          language: "ts",
          content: `async function withRetry<T>(fn: () => Promise<T>, tries = 4): Promise<T> {
  let lastErr: unknown;
  for (let i = 0; i < tries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      const backoff = 200 * 2 ** i + Math.random() * 100; // jitter
      await new Promise((r) => setTimeout(r, backoff));
    }
  }
  throw lastErr;
}`,
        },
      ],
    },
  ],
};
