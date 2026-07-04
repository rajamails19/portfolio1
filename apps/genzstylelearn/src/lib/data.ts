import tNeural from "@/assets/topic-neural.jpg";
import tLlm from "@/assets/topic-llm.jpg";
import tVision from "@/assets/topic-vision.jpg";
import tRl from "@/assets/topic-rl.jpg";
import tPrompt from "@/assets/topic-prompt.jpg";
import tMlops from "@/assets/topic-mlops.jpg";
import fTransformer from "@/assets/feed-transformer.jpg";
import fBrain from "@/assets/feed-brain.jpg";
import fGpu from "@/assets/feed-gpu.jpg";
import fEmbed from "@/assets/feed-embed.jpg";
import fLibrary from "@/assets/feed-library.jpg";
import fLossGuide from "@/assets/loss-guide.png";

export const topics = [
  {
    name: "Neural Nets",
    img: tNeural,
    live: true,
    slug: "neural-nets",
    desc: "Backprop, activations, layers — the foundation of everything.",
  },
  {
    name: "LLMs",
    img: tLlm,
    slug: "llms",
    desc: "Large language models, tokenization, scaling laws.",
  },
  {
    name: "Vision",
    img: tVision,
    slug: "vision",
    desc: "CNNs, ViTs, diffusion — teaching machines to see.",
  },
  {
    name: "RL",
    img: tRl,
    slug: "rl",
    desc: "Reward signals, policies, agents that learn by doing.",
  },
  {
    name: "Prompting",
    img: tPrompt,
    slug: "prompting",
    desc: "Chain-of-thought, few-shot, system prompts that actually work.",
  },
  {
    name: "MLOps",
    img: tMlops,
    slug: "mlops",
    desc: "Deployment, monitoring, CI/CD for models in production.",
  },
  {
    name: "Agents",
    img: tNeural,
    slug: "agents",
    desc: "Tool use, memory, multi-agent systems — AI that acts.",
  },
  {
    name: "Diffusion",
    img: tVision,
    slug: "diffusion",
    desc: "Stable Diffusion, DALL·E, how noise becomes art.",
  },
  {
    name: "RAG",
    img: tLlm,
    slug: "rag",
    desc: "Retrieval-Augmented Generation — grounding LLMs in facts.",
  },
];

export type Post =
  | {
      kind: "image";
      id: string;
      author: string;
      time: string;
      img: string;
      title: string;
      caption: string;
      tag: string;
      likes: string;
      articleId?: string;
      cardAccent?: string;
    }
  | {
      kind: "reel";
      id: string;
      author: string;
      time: string;
      img: string;
      title: string;
      caption: string;
      tag: string;
      likes: string;
      duration: string;
      articleId?: string;
      reelId?: string;
    }
  | {
      kind: "quote";
      id: string;
      author: string;
      time: string;
      quote: string;
      by: string;
      tag: string;
      likes: string;
    }
  | {
      kind: "carousel";
      id: string;
      author: string;
      time: string;
      img: string;
      title: string;
      caption: string;
      tag: string;
      likes: string;
      slides: number;
      articleId?: string;
    };

export const feed: Post[] = [
  {
    kind: "image",
    id: "1",
    author: "founded.ai",
    time: "1h",
    img: fTransformer,
    tag: "Transformers",
    title: "Attention is all you need — visualised.",
    caption:
      "Why the transformer ate deep learning. A 60-second tour of Q, K, V and the magic of self-attention.",
    likes: "12.4k",
    articleId: "1",
  },
  {
    kind: "reel",
    id: "2",
    author: "lumen.daily",
    time: "2h",
    img: fBrain,
    tag: "Foundations",
    duration: "0:47",
    title: "How a neural net actually learns",
    caption: "Backprop, but make it cinematic. Save this before your next interview.",
    likes: "8.1k",
    articleId: "2",
  },
  {
    kind: "quote",
    id: "3",
    author: "@karpathy",
    time: "3h",
    quote: "The hottest new programming language is English.",
    by: "Andrej Karpathy",
    tag: "Prompting",
    likes: "44k",
  },
  {
    kind: "carousel",
    id: "4",
    author: "paperdrop",
    time: "5h",
    img: fGpu,
    tag: "ML Basics",
    slides: 7,
    title: "Supervised vs Unsupervised — what's the diff?",
    caption:
      "Labels or no labels? The most fundamental split in all of machine learning, explained simply.",
    likes: "21.7k",
    articleId: "3",
  },
  {
    kind: "image",
    id: "15",
    author: "lumen.daily",
    time: "1h",
    img: tRl,
    tag: "ML Basics",
    title: "Overfitting vs underfitting — the bias-variance tradeoff.",
    caption:
      "Too simple = misses everything. Too complex = memorises noise. The sweet spot is the whole game.",
    likes: "31.2k",
    articleId: "11",
  },
  {
    kind: "carousel",
    id: "14",
    author: "gradient.ai",
    time: "1h",
    img: tPrompt,
    tag: "Training",
    slides: 5,
    title: "Learning rate — the one dial that breaks everything.",
    caption:
      "Too small: never converges. Too big: explodes. The learning rate is the most important hyperparameter in deep learning.",
    likes: "29.1k",
    articleId: "10",
  },
  {
    kind: "image",
    id: "13",
    author: "lumen.daily",
    time: "2h",
    img: tLlm,
    tag: "LLMs",
    title: "How LLMs actually work — tokens to text.",
    caption:
      "Tokenise, embed, attend, repeat. The four-step loop that turns next-token prediction into something that feels like intelligence.",
    likes: "34.6k",
    articleId: "9",
  },
  {
    kind: "carousel",
    id: "12",
    author: "gradient.ai",
    time: "3h",
    img: fBrain,
    tag: "Backprop",
    slides: 6,
    title: "Backpropagation — how your network assigns blame.",
    caption:
      "Every wrong prediction triggers a blame chain. The chain rule fires backwards through every layer. That's backprop.",
    likes: "27.3k",
    articleId: "8",
  },
  {
    kind: "image",
    id: "7",
    author: "gradient.ai",
    time: "4h",
    img: tRl,
    tag: "Gradient Descent",
    title: "Gradient Descent — the one rule that trains every AI model.",
    caption:
      "w = w − lr × ∇L. This single update rule powers GPT, Stable Diffusion, AlphaGo — every model ever trained.",
    likes: "18.2k",
    articleId: "4",
  },
  {
    kind: "carousel",
    id: "8",
    author: "lumen.daily",
    time: "5h",
    img: tNeural,
    tag: "Activation Fns",
    slides: 3,
    title: "ReLU, Sigmoid, Softmax — what they actually do to gradients.",
    caption:
      "Not all activations are equal. One kills neurons, one kills gradients, one turns numbers into probabilities. Here's what you need to know.",
    likes: "14.3k",
    articleId: "5",
  },
  {
    kind: "reel",
    id: "9",
    author: "lumen.daily",
    time: "6h",
    img: tMlops,
    tag: "Loss Functions",
    duration: "0:58",
    title: "MSE vs Cross-Entropy — pick wrong and your model won't learn.",
    caption:
      "The loss function is the only thing your model actually optimises for. Here's how to choose correctly every time.",
    likes: "22.1k",
    reelId: "1",
  },
  {
    kind: "image",
    id: "10",
    author: "founded.ai",
    time: "7h",
    img: fLossGuide,
    tag: "Loss Functions",
    title: "Cross-Entropy vs MSE — the full visual breakdown.",
    caption:
      "Save this. Classification → Cross-Entropy. Regression → MSE. The decision point is always the nature of your output.",
    likes: "31.4k",
    articleId: "6",
    cardAccent: "from-indigo-500/30 via-violet-400/20 to-teal-400/30",
  },
  {
    kind: "carousel",
    id: "11",
    author: "paperdrop",
    time: "9h",
    img: tMlops,
    tag: "Batch Norm",
    slides: 5,
    title: "Batch Normalization — why it works and what it actually normalizes.",
    caption:
      "Without it: training is slow, finicky, and sensitive to every weight init choice. With it: suddenly you can go 10× faster. Here's the full picture.",
    likes: "19.8k",
    articleId: "7",
  },
  {
    kind: "image",
    id: "5",
    author: "vector.club",
    time: "8h",
    img: fEmbed,
    tag: "Embeddings",
    title: "What does 'king − man + woman' look like?",
    caption: "Embeddings are vibes encoded as numbers. Here's how to feel them in 3D.",
    likes: "6.3k",
  },
  {
    kind: "reel",
    id: "6",
    author: "lumen.daily",
    time: "12h",
    img: fLibrary,
    tag: "Reading list",
    duration: "1:12",
    title: "5 papers that built modern AI",
    caption: "If you only read five — read these. Saved in the Library category for you.",
    likes: "15.9k",
  },
];

import { Bookmark, BookOpen, Code2, Brain, Cpu, Wand2 } from "lucide-react";

export const categories = [
  { name: "Saved", icon: Bookmark, color: "from-pink-300 to-rose-300", count: 124 },
  { name: "Papers", icon: BookOpen, color: "from-violet-300 to-fuchsia-300", count: 38 },
  { name: "Snippets", icon: Code2, color: "from-amber-200 to-pink-300", count: 56 },
  { name: "Models", icon: Cpu, color: "from-rose-300 to-orange-300", count: 17 },
  { name: "Prompts", icon: Wand2, color: "from-purple-300 to-pink-300", count: 92 },
  { name: "Brain food", icon: Brain, color: "from-fuchsia-300 to-violet-300", count: 41 },
];
