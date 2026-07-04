import fTransformer from "@/assets/feed-transformer.jpg";
import fBrain from "@/assets/feed-brain.jpg";
import fGpu from "@/assets/feed-gpu.jpg";
import tRl from "@/assets/topic-rl.jpg";
import tLlm from "@/assets/topic-llm.jpg";
import tPrompt from "@/assets/topic-prompt.jpg";

export type Article = {
  id: string;
  tag: string;
  author: string;
  readMins: number;
  title: string;
  subtitle: string;
  heroImg: string;
  likes: string;
};

export const articles: Record<string, Article> = {
  "1": {
    id: "1",
    tag: "Transformers",
    author: "founded.ai",
    readMins: 4,
    title: "Attention is all you need — visualised.",
    subtitle:
      "Why the transformer ate deep learning. A 60-second tour of Q, K, V and the magic of self-attention.",
    heroImg: fTransformer,
    likes: "12.4k",
  },
  "2": {
    id: "2",
    tag: "Foundations",
    author: "lumen.daily",
    readMins: 5,
    title: "How a neural net actually learns.",
    subtitle:
      "Backprop, gradient descent, loss functions — the engine behind every AI model you've ever used.",
    heroImg: fBrain,
    likes: "8.1k",
  },
  "3": {
    id: "3",
    tag: "ML Basics",
    author: "paperdrop",
    readMins: 4,
    title: "Supervised vs Unsupervised — what's the diff?",
    subtitle:
      "Labels or no labels? The most fundamental split in machine learning, and why it shapes everything you build.",
    heroImg: fGpu,
    likes: "21.7k",
  },
  "7": {
    id: "7",
    tag: "Batch Norm",
    author: "paperdrop",
    readMins: 5,
    title: "Batch Normalization — why it works and what it actually normalizes.",
    subtitle:
      "One trick that made training deep networks 10× faster, more stable, and less dependent on careful weight initialisation.",
    heroImg: fGpu,
    likes: "19.8k",
  },
  "6": {
    id: "6",
    tag: "Loss Functions",
    author: "lumen.daily",
    readMins: 4,
    title: "MSE vs Cross-Entropy — pick wrong and your model won't learn.",
    subtitle:
      "The loss function is the score your model lives and dies by. Wrong choice = wrong gradients = wasted training.",
    heroImg: fGpu,
    likes: "22.1k",
  },
  "5": {
    id: "5",
    tag: "Activation Fns",
    author: "lumen.daily",
    readMins: 5,
    title: "ReLU, Sigmoid, Softmax — what they do to gradients.",
    subtitle:
      "Activation functions are the non-linear gatekeepers of your network. Pick the wrong one and your gradients vanish, explode, or die. Here's the full story.",
    heroImg: fBrain,
    likes: "14.3k",
  },
  "11": {
    id: "11",
    tag: "ML Basics",
    author: "lumen.daily",
    readMins: 5,
    title: "Overfitting vs underfitting — the bias-variance tradeoff.",
    subtitle:
      "Too simple and your model misses everything. Too complex and it memorises the training set. The sweet spot is everything.",
    heroImg: tRl,
    likes: "31.2k",
  },
  "10": {
    id: "10",
    tag: "Training",
    author: "gradient.ai",
    readMins: 5,
    title: "Learning rate — the one dial that breaks everything.",
    subtitle:
      "Too small and your model never learns. Too big and it explodes. The learning rate is the most important hyperparameter in all of deep learning — here's how to get it right.",
    heroImg: tPrompt,
    likes: "29.1k",
  },
  "9": {
    id: "9",
    tag: "LLMs",
    author: "lumen.daily",
    readMins: 5,
    title: "How LLMs actually work — tokens to text.",
    subtitle:
      "Tokenise, embed, attend, repeat. The four-step loop that turns next-token prediction into something that feels like intelligence.",
    heroImg: tLlm,
    likes: "34.6k",
  },
  "8": {
    id: "8",
    tag: "Backprop",
    author: "gradient.ai",
    readMins: 6,
    title: "Backpropagation — blame assignment via chain rule.",
    subtitle:
      "How does a neural net know which weights to blame for a wrong answer? Backprop does it layer by layer, backwards, using one powerful calculus trick.",
    heroImg: fBrain,
    likes: "27.3k",
  },
  "4": {
    id: "4",
    tag: "Training",
    author: "gradient.ai",
    readMins: 5,
    title: "One equation. Every model ever trained.",
    subtitle:
      "w = w − lr × ∇L. Gradient descent is the heartbeat of all AI. Here's the full picture — SGD, mini-batch, momentum, and why loss landscapes aren't what you think.",
    heroImg: tRl,
    likes: "18.2k",
  },
};
