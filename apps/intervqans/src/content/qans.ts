import type { Section } from "./types";

export const qansSection: Section = {
  slug: "qans",
  title: "Q & Answers",
  tagline: "Core interview questions with crisp, memorable answers.",
  emoji: "💡",
  gradient: "from-[oklch(0.92_0.09_305)] via-[oklch(0.92_0.08_340)] to-[oklch(0.92_0.08_45)]",
  items: [
    {
      id: "virtual-dom",
      question: "What is the Virtual DOM and why does React use it?",
      tags: ["React", "Fundamentals"],
      difficulty: "Easy",
      answer: [
        {
          type: "text",
          content:
            "The ==Virtual DOM (VDOM)== is an in-memory JavaScript representation of the real DOM. React keeps a lightweight tree of nodes and, on every render, produces a __new tree__ that gets diffed against the previous one.",
        },
        { type: "heading", content: "The render → commit pipeline" },
        {
          type: "flow",
          title: "One React update, end to end",
          nodes: [
            { label: "setState()", sub: "Trigger", tone: "ember" },
            { label: "Render", sub: "Build new VDOM", tone: "gold" },
            { label: "Reconcile", sub: "Diff old vs new", tone: "gold" },
            { label: "Commit", sub: "Minimal DOM ops", tone: "mint" },
            { label: "Paint", sub: "Browser draws", tone: "sky" },
          ],
        },
        {
          type: "list",
          ordered: true,
          items: [
            "You call `setState` or a hook updater — React re-runs the component and builds a **new VDOM tree**.",
            "React diffs the new tree against the previous tree (==reconciliation==).",
            "Only the __minimal set__ of real DOM operations required to match the new tree is committed to the browser.",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "The VDOM isn't magically fast — it's fast because **batched, minimal DOM writes** are cheaper than ad-hoc imperative writes we would otherwise write by hand.",
        },
        { type: "heading", content: "Dig deeper" },
        {
          type: "links",
          items: [
            {
              href: "https://react.dev/learn/preserving-and-resetting-state",
              label: "React docs — Preserving and Resetting State",
              description: "The mental model behind reconciliation with real examples.",
            },
            {
              href: "https://github.com/acdlite/react-fiber-architecture",
              label: "React Fiber Architecture (Andrew Clark)",
              description: "Why Fiber replaced the old stack reconciler.",
            },
          ],
        },
      ],
    },
    {
      id: "useeffect-vs-uselayouteffect",
      question: "useEffect vs useLayoutEffect — when do you reach for which?",
      tags: ["React", "Hooks"],
      difficulty: "Medium",
      answer: [
        {
          type: "text",
          content:
            "Both run side effects after render, but they fire at ==different points== in the commit phase. Picking the wrong one causes either __layout flicker__ or __jank__.",
        },
        {
          type: "flow",
          title: "Where each effect fires in the commit phase",
          nodes: [
            { label: "Render", sub: "Pure computation", tone: "gold" },
            { label: "DOM Mutation", sub: "React writes DOM", tone: "gold" },
            { label: "useLayoutEffect", sub: "Sync — before paint", tone: "ember" },
            { label: "Paint", sub: "Browser draws frame", tone: "sky" },
            { label: "useEffect", sub: "Async — after paint", tone: "mint" },
          ],
        },
        {
          type: "table",
          headers: ["", "useEffect", "useLayoutEffect"],
          rows: [
            ["Timing", "==After paint== (async)", "==Before paint== (sync)"],
            ["Blocks paint?", "No", "**Yes**"],
            ["Typical use", "Data fetch, subscriptions, logging", "Measure DOM, sync layout, prevent flicker"],
            ["SSR", "Safe", "Warns — no DOM to measure"],
          ],
        },
        { type: "heading", content: "Rule of thumb" },
        {
          type: "text",
          content:
            "**Default to `useEffect`.** Reach for `useLayoutEffect` only when you must __read layout__ (`getBoundingClientRect`, scroll position) and __write to the DOM__ before the user sees the frame.",
        },
        {
          type: "code",
          language: "tsx",
          content: `import { useLayoutEffect, useRef, useState } from "react";

function Tooltip({ target }: { target: HTMLElement }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    const rect = target.getBoundingClientRect();
    setPos({ top: rect.bottom + 8, left: rect.left });
  }, [target]);

  return <div ref={ref} style={pos} className="fixed">Hi!</div>;
}`,
        },
        {
          type: "links",
          items: [
            {
              href: "https://react.dev/reference/react/useLayoutEffect",
              label: "React docs — useLayoutEffect",
              description: "Official reference with SSR caveats.",
            },
            {
              href: "https://kentcdodds.com/blog/useeffect-vs-uselayouteffect",
              label: "Kent C. Dodds — useEffect vs useLayoutEffect",
              description: "The canonical explainer.",
            },
          ],
        },
      ],
    },
    {
      id: "keys-in-lists",
      question: "Why do keys matter in React lists?",
      tags: ["React", "Reconciliation"],
      difficulty: "Easy",
      answer: [
        {
          type: "text",
          content:
            "Keys are React's ==identity hint== for children in a list. During reconciliation, React uses them to match old and new elements __instead of comparing by index__.",
        },
        {
          type: "flow",
          title: "How React matches list items",
          direction: "vertical",
          nodes: [
            { label: "New render", sub: "todos.map(...)", tone: "gold" },
            { label: "Match by key", sub: "Same key = same instance", tone: "mint" },
            { label: "Reuse state + DOM", sub: "Only patch what changed", tone: "sky" },
          ],
        },
        {
          type: "list",
          items: [
            "**Stable keys** → React preserves ==component state== and DOM nodes across reorders.",
            "**Index keys** → State can __'stick' to the wrong item__ after insertion, deletion, or sort.",
            "**Missing keys** → Full re-mount of the list on every change (bad perf + lost state).",
          ],
        },
        {
          type: "code",
          language: "tsx",
          content: `// ❌ Loses focus/state when the list reorders
todos.map((t, i) => <TodoRow key={i} todo={t} />)

// ✅ Stable across reorders
todos.map((t) => <TodoRow key={t.id} todo={t} />)`,
        },
        {
          type: "callout",
          variant: "warn",
          content:
            "Never use `Math.random()` as a key — a **new key on every render** forces a full re-mount.",
        },
        {
          type: "link",
          href: "https://react.dev/learn/rendering-lists#why-does-react-need-keys",
          label: "React docs — Why does React need keys?",
        },
      ],
    },
  ],
};
