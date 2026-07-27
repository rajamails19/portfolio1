import heroLearning from "@/assets/hero-learning.jpg";
import neuralNet from "@/assets/neural-net.jpg";
import codingScene from "@/assets/coding-scene.jpg";
import componentsScene from "@/assets/components-scene.jpg";
import dataFlow from "@/assets/data-flow.jpg";

export type Block =
  | { type: "h1"; text: string; eyebrow?: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "callout"; title: string; text: string; tone?: "info" | "tip" | "warn" }
  | { type: "image"; src: string; caption?: string; alt: string }
  | { type: "gif"; src: string; caption?: string; alt: string; motion?: "kenburns" | "drift" }
  | { type: "code"; lang: string; code: string; filename?: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "divider" };

export type Lesson = {
  id: string;
  title: string;
  eyebrow: string;
  readTime: string;
  cover: string;
  blocks: Block[];
};

export type NavItem = {
  id: string;
  title: string;
  icon?: string;
  children?: NavItem[];
  lessonId?: string;
};

export const nav: NavItem[] = [
  {
    id: "start",
    title: "Get Started",
    children: [
      { id: "welcome", title: "Welcome to Lumen", lessonId: "welcome" },
      { id: "install", title: "Installation", lessonId: "install" },
      { id: "editor", title: "Editor Setup", lessonId: "editor" },
      { id: "first-project", title: "Your First Project", lessonId: "first-project" },
    ],
  },
  {
    id: "foundations",
    title: "Foundations",
    children: [
      { id: "components", title: "Thinking in Components", lessonId: "components" },
      { id: "props", title: "Props & Composition", lessonId: "props" },
      { id: "state", title: "State & Lifecycle", lessonId: "state" },
      { id: "effects", title: "Effects & Side-effects", lessonId: "effects" },
      { id: "hooks", title: "Custom Hooks", lessonId: "hooks" },
    ],
  },
  {
    id: "ai",
    title: "AI & Machine Learning",
    children: [
      { id: "ai-overview", title: "AI vs ML vs Deep Learning", lessonId: "ai-overview" },
      { id: "ai-models", title: "What is a Model?", lessonId: "ai-models" },
      { id: "ai-training", title: "How Training Works", lessonId: "ai-training" },
      { id: "ai-rag", title: "Retrieval Augmented Gen", lessonId: "ai-rag" },
      { id: "ai-agents", title: "Agents & Tool Use", lessonId: "ai-agents" },
    ],
  },
  {
    id: "design",
    title: "Design & Craft",
    children: [
      { id: "design-tokens", title: "Design Tokens", lessonId: "design-tokens" },
      { id: "typography", title: "Typography Systems", lessonId: "typography" },
      { id: "motion", title: "Motion & Animation", lessonId: "motion" },
    ],
  },
  {
    id: "deploy",
    title: "Ship & Scale",
    children: [
      { id: "deploy-basics", title: "Deploy in 60 seconds", lessonId: "deploy-basics" },
      { id: "observability", title: "Observability", lessonId: "observability" },
      { id: "scaling", title: "Scaling Patterns", lessonId: "scaling" },
    ],
  },
];

const codeExample = `import { useState, useEffect } from "react";

export function useGlow(intensity = 0.6) {
  const [glow, setGlow] = useState(intensity);

  useEffect(() => {
    const id = setInterval(() => {
      setGlow((g) => 0.4 + Math.sin(Date.now() / 800) * 0.3);
    }, 60);
    return () => clearInterval(id);
  }, []);

  return glow;
}`;

const codePython = `# A tiny neural net in ~10 lines
import torch, torch.nn as nn

class Tiny(nn.Module):
    def __init__(self):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(2, 8), nn.ReLU(),
            nn.Linear(8, 1), nn.Sigmoid(),
        )
    def forward(self, x):
        return self.net(x)`;

export const lessons: Record<string, Lesson> = {
  welcome: {
    id: "welcome",
    title: "Welcome to Lumen",
    eyebrow: "Get Started · 4 min read",
    readTime: "4 min",
    cover: heroLearning,
    blocks: [
      {
        type: "h1",
        text: "Learning, but make it magical.",
        eyebrow: "Chapter 01 · Welcome",
      },
      {
        type: "p",
        text: "Lumen is a tutorial platform built for people who think books should breathe. Every lesson is a small, cinematic story — with living diagrams, playful code, and just enough theory to feel dangerous.",
      },
      {
        type: "image",
        src: heroLearning,
        alt: "Dreamy library",
        caption: "Somewhere between a library and a spaceship — that's the vibe.",
      },
      { type: "h2", text: "What you'll build" },
      {
        type: "p",
        text: "By the end of this track, you'll ship a full-stack, animated, delightful app — the kind users screenshot without being asked.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Pro tip",
        text: "Select any text in a lesson to bookmark, highlight, or ask the AI tutor. Hover between blocks to add your own notes with the + button.",
      },
      { type: "h2", text: "How lessons work" },
      {
        type: "p",
        text: "Each chapter is a stack of blocks — headings, text, images, short looping visuals, and runnable code. Click a topic in the sidebar and it will glide into focus.",
      },
      {
        type: "quote",
        text: "The best tutorials don't teach you — they invite you into a world.",
        cite: "The Lumen Team",
      },
    ],
  },
  install: {
    id: "install",
    title: "Installation",
    eyebrow: "Get Started · 3 min read",
    readTime: "3 min",
    cover: componentsScene,
    blocks: [
      { type: "h1", text: "Install in 60 seconds", eyebrow: "Setup" },
      { type: "p", text: "One command. No config. No tears. Copy, paste, ship." },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `# Create a new Lumen project
npx create-lumen@latest my-app
cd my-app
npm run dev`,
      },
      { type: "h3", text: "Requirements" },
      { type: "p", text: "Node 20+, a modern browser, and roughly 3 minutes of your undivided attention." },
      {
        type: "gif",
        src: componentsScene,
        alt: "Floating components",
        caption: "Your components, stacking themselves. Not really — but almost.",
        motion: "kenburns",
      },
    ],
  },
  editor: {
    id: "editor",
    title: "Editor Setup",
    eyebrow: "Get Started · 2 min read",
    readTime: "2 min",
    cover: codingScene,
    blocks: [
      { type: "h1", text: "Set up your editor", eyebrow: "Setup" },
      { type: "p", text: "We recommend VS Code with the Lumen extension for inline previews and one-key formatting." },
      { type: "gif", src: codingScene, alt: "Coding scene", motion: "drift", caption: "Your future workspace." },
      {
        type: "code",
        lang: "json",
        filename: ".vscode/settings.json",
        code: `{
  "editor.formatOnSave": true,
  "editor.fontFamily": "JetBrains Mono, monospace",
  "workbench.colorTheme": "Lumen Lavender"
}`,
      },
    ],
  },
  "first-project": {
    id: "first-project",
    title: "Your First Project",
    eyebrow: "Get Started · 6 min read",
    readTime: "6 min",
    cover: dataFlow,
    blocks: [
      { type: "h1", text: "Your first Lumen app", eyebrow: "Hands-on" },
      { type: "p", text: "We'll build a tiny mood tracker in three steps. No setup, no drama." },
      { type: "h2", text: "1. Scaffold" },
      { type: "code", lang: "bash", code: `npx create-lumen@latest mood-app --template=starter` },
      { type: "h2", text: "2. Add a feeling" },
      {
        type: "code",
        lang: "tsx",
        filename: "src/App.tsx",
        code: `export default function App() {
  const [mood, setMood] = useState("dreamy");
  return <Card>{mood}</Card>;
}`,
      },
      { type: "h2", text: "3. Ship it" },
      { type: "p", text: "One command deploys to the edge. That's it. You're live." },
      { type: "image", src: dataFlow, alt: "Data droplets", caption: "Every state change is a droplet in the river." },
    ],
  },
  components: {
    id: "components",
    title: "Thinking in Components",
    eyebrow: "Foundations · 5 min read",
    readTime: "5 min",
    cover: componentsScene,
    blocks: [
      { type: "h1", text: "Thinking in Components", eyebrow: "Foundations" },
      {
        type: "p",
        text: "A component is the smallest thing that has an opinion. It knows what it looks like, what it does, and — most importantly — what it refuses to do.",
      },
      { type: "image", src: componentsScene, alt: "Component towers", caption: "Every UI is a city made of components." },
      { type: "h2", text: "The three rules" },
      { type: "h3", text: "Rule 1 — One job, done well" },
      { type: "p", text: "A component that does two things does neither. Split it." },
      { type: "h3", text: "Rule 2 — Props in, JSX out" },
      { type: "p", text: "Treat it like a pure function of its inputs. Predictable is beautiful." },
      { type: "h3", text: "Rule 3 — Composition over configuration" },
      { type: "p", text: "Twenty props is a design smell. Slots and children are your friends." },
      {
        type: "code",
        lang: "tsx",
        filename: "Card.tsx",
        code: `export function Card({ children }: { children: React.ReactNode }) {
  return <div className="glass rounded-3xl p-6">{children}</div>;
}`,
      },
      {
        type: "callout",
        tone: "info",
        title: "Mental model",
        text: "If you can describe a component in one sentence, it's probably the right size.",
      },
    ],
  },
  props: {
    id: "props",
    title: "Props & Composition",
    eyebrow: "Foundations · 4 min",
    readTime: "4 min",
    cover: componentsScene,
    blocks: [
      { type: "h1", text: "Props & Composition", eyebrow: "Foundations" },
      { type: "p", text: "Props are how components talk. Composition is how they dance." },
      { type: "code", lang: "tsx", code: `<Card title="Hello" tone="lavender" />` },
    ],
  },
  state: {
    id: "state",
    title: "State & Lifecycle",
    eyebrow: "Foundations · 6 min",
    readTime: "6 min",
    cover: dataFlow,
    blocks: [
      { type: "h1", text: "State & Lifecycle", eyebrow: "Foundations" },
      { type: "p", text: "State is memory. Lifecycle is rhythm. Together, they're music." },
      { type: "gif", src: dataFlow, alt: "Data droplets", motion: "kenburns" },
    ],
  },
  effects: {
    id: "effects",
    title: "Effects & Side-effects",
    eyebrow: "Foundations · 5 min",
    readTime: "5 min",
    cover: neuralNet,
    blocks: [
      { type: "h1", text: "Effects & Side-effects", eyebrow: "Foundations" },
      { type: "p", text: "Effects reach out into the world. Use them carefully — the world reaches back." },
      { type: "code", lang: "tsx", code: codeExample, filename: "useGlow.ts" },
    ],
  },
  hooks: {
    id: "hooks",
    title: "Custom Hooks",
    eyebrow: "Foundations · 7 min",
    readTime: "7 min",
    cover: codingScene,
    blocks: [
      { type: "h1", text: "Custom Hooks", eyebrow: "Foundations" },
      { type: "p", text: "A hook is a reusable piece of behavior. Naming them is half the work." },
    ],
  },
  "ai-overview": {
    id: "ai-overview",
    title: "AI vs ML vs Deep Learning",
    eyebrow: "AI · 5 min read",
    readTime: "5 min",
    cover: neuralNet,
    blocks: [
      { type: "h1", text: "AI vs ML vs Deep Learning vs GenAI", eyebrow: "AI · Day 1" },
      {
        type: "p",
        text: "Think of them like nested boxes. AI is the outermost dream — make computers behave intelligently. ML is a technique inside it. Deep Learning is a technique inside ML. GenAI is a category inside Deep Learning.",
      },
      { type: "image", src: neuralNet, alt: "Neural network", caption: "A neural network, imagined as a constellation." },
      { type: "h2", text: "The nesting, in one glance" },
      {
        type: "code",
        lang: "text",
        code: `Artificial Intelligence
  └─ Machine Learning
        └─ Deep Learning
              └─ Generative AI`,
      },
      { type: "h3", text: "AI" },
      { type: "p", text: "Make computers behave intelligently — a very old, very ambitious idea." },
      { type: "h3", text: "ML" },
      { type: "p", text: "Instead of programming every rule, let the computer learn patterns from examples." },
      { type: "h3", text: "Deep Learning" },
      { type: "p", text: "ML using large neural networks — many layers, lots of data, lots of compute." },
      { type: "h3", text: "Generative AI" },
      { type: "p", text: "Models that generate new content: text, images, audio, video, code." },
      {
        type: "callout",
        tone: "tip",
        title: "Restaurant analogy",
        text: "Predict how many biryanis to prepare tonight. Data → Model → Prediction → Error → Adjust → Repeat.",
      },
    ],
  },
  "ai-models": {
    id: "ai-models",
    title: "What is a Model?",
    eyebrow: "AI · 4 min read",
    readTime: "4 min",
    cover: neuralNet,
    blocks: [
      { type: "h1", text: "What is a Model, really?", eyebrow: "AI · Day 2" },
      { type: "p", text: "A model is a very opinionated function. You feed it inputs, it hands you a guess." },
      { type: "gif", src: neuralNet, alt: "Neural constellations", motion: "drift" },
      { type: "code", lang: "python", filename: "tiny.py", code: codePython },
    ],
  },
  "ai-training": {
    id: "ai-training",
    title: "How Training Works",
    eyebrow: "AI · 6 min",
    readTime: "6 min",
    cover: dataFlow,
    blocks: [
      { type: "h1", text: "How training works", eyebrow: "AI · Day 3" },
      { type: "p", text: "Training is the model tasting its own mistakes, over and over, until they taste less bad." },
      { type: "image", src: dataFlow, alt: "Data droplets", caption: "Every training step is a droplet of feedback." },
    ],
  },
  "ai-rag": {
    id: "ai-rag",
    title: "Retrieval Augmented Generation",
    eyebrow: "AI · 5 min",
    readTime: "5 min",
    cover: neuralNet,
    blocks: [
      { type: "h1", text: "RAG in plain English", eyebrow: "AI · Day 4" },
      { type: "p", text: "Give the model a library card. Now it can look things up before it speaks." },
    ],
  },
  "ai-agents": {
    id: "ai-agents",
    title: "Agents & Tool Use",
    eyebrow: "AI · 6 min",
    readTime: "6 min",
    cover: codingScene,
    blocks: [
      { type: "h1", text: "Agents & tool use", eyebrow: "AI · Day 5" },
      { type: "p", text: "An agent is a model with hands. Hands that call functions, browse the web, and email your mom." },
      { type: "gif", src: codingScene, alt: "Coding scene", motion: "drift" },
    ],
  },
  "design-tokens": {
    id: "design-tokens",
    title: "Design Tokens",
    eyebrow: "Design · 4 min",
    readTime: "4 min",
    cover: heroLearning,
    blocks: [
      { type: "h1", text: "Design tokens are your dictionary", eyebrow: "Design" },
      { type: "p", text: "Every color, every radius, every shadow — one source of truth. Change one variable, the whole app leans in." },
      {
        type: "code",
        lang: "css",
        filename: "tokens.css",
        code: `:root {
  --primary: oklch(0.62 0.18 310);
  --radius: 1rem;
  --shadow-glow: 0 20px 60px -20px oklch(0.55 0.2 315 / 0.4);
}`,
      },
    ],
  },
  typography: {
    id: "typography",
    title: "Typography Systems",
    eyebrow: "Design · 5 min",
    readTime: "5 min",
    cover: heroLearning,
    blocks: [
      { type: "h1", text: "Typography is 80% of the vibe", eyebrow: "Design" },
      { type: "p", text: "Pick two typefaces. One with a soul, one that gets out of the way. That's it." },
    ],
  },
  motion: {
    id: "motion",
    title: "Motion & Animation",
    eyebrow: "Design · 6 min",
    readTime: "6 min",
    cover: dataFlow,
    blocks: [
      { type: "h1", text: "Motion is meaning", eyebrow: "Design" },
      { type: "p", text: "Every transition tells the user what came from where. Silent, obvious, quick." },
      { type: "gif", src: dataFlow, alt: "Data droplets", motion: "kenburns" },
    ],
  },
  "deploy-basics": {
    id: "deploy-basics",
    title: "Deploy in 60 seconds",
    eyebrow: "Ship · 3 min",
    readTime: "3 min",
    cover: componentsScene,
    blocks: [
      { type: "h1", text: "Deploy in 60 seconds", eyebrow: "Ship" },
      { type: "code", lang: "bash", code: `lumen deploy --prod` },
    ],
  },
  observability: {
    id: "observability",
    title: "Observability",
    eyebrow: "Ship · 5 min",
    readTime: "5 min",
    cover: neuralNet,
    blocks: [
      { type: "h1", text: "Observability", eyebrow: "Ship" },
      { type: "p", text: "You can't fix what you can't see. Traces, metrics, logs — in that order." },
    ],
  },
  scaling: {
    id: "scaling",
    title: "Scaling Patterns",
    eyebrow: "Ship · 7 min",
    readTime: "7 min",
    cover: componentsScene,
    blocks: [
      { type: "h1", text: "Scaling patterns", eyebrow: "Ship" },
      { type: "p", text: "Cache aggressively, queue everything, and never trust the network." },
    ],
  },
};

export const defaultLessonId = "welcome";
