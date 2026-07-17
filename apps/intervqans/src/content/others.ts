import type { Section } from "./types";

export const othersSection: Section = {
  slug: "others",
  title: "All Others",
  tagline: "AI engineering, systems, tools — everything that doesn't fit elsewhere.",
  emoji: "🌌",
  gradient: "from-[oklch(0.92_0.09_305)] via-[oklch(0.9_0.09_235)] to-[oklch(0.9_0.09_165)]",
  items: [
    {
      id: "what-is-rag",
      question: "What is RAG and when should I NOT use it?",
      tags: ["AI", "Architecture"],
      difficulty: "Medium",
      answer: [
        { type: "text", content: "Retrieval-Augmented Generation grounds an LLM in your data: retrieve relevant chunks from a vector store, stuff them into the prompt, let the model answer." },
        { type: "heading", content: "Great fit" },
        {
          type: "list",
          items: [
            "Domain Q&A over docs that change often (support KBs, product manuals).",
            "Citations required — the user needs to see the source.",
            "Data that's too big to fit in the context window.",
          ],
        },
        { type: "heading", content: "Bad fit" },
        {
          type: "list",
          items: [
            "Small, stable corpora — just paste them into the system prompt.",
            "Tasks that need reasoning across the whole corpus (RAG only sees top-k).",
            "Anything where fine-tuning or a tool call would be dramatically better.",
          ],
        },
        {
          type: "table",
          headers: ["Option", "Best when"],
          rows: [
            ["Prompt stuffing", "< 50k tokens of stable context"],
            ["RAG", "Large, evolving knowledge base"],
            ["Fine-tuning", "You need style/format, not new facts"],
            ["Tools / function calling", "Live data or actions (DB, API)"],
          ],
        },
      ],
    },
    {
      id: "embeddings-explained",
      question: "Embeddings in one paragraph, please.",
      tags: ["AI", "Fundamentals"],
      difficulty: "Easy",
      answer: [
        { type: "text", content: "An embedding is a fixed-length vector of floats that represents the *meaning* of a piece of text. Two texts with similar meaning land close together in the vector space (small cosine distance); unrelated texts land far apart. That's it — the whole magic of semantic search, recommendations, clustering, and dedup falls out of that one property." },
        { type: "callout", variant: "info", content: "Typical dims: 384 (small, fast), 1536 (OpenAI text-embedding-3-small), 3072 (large). Bigger ≠ always better — match model to task and budget." },
        {
          type: "link",
          href: "https://platform.openai.com/docs/guides/embeddings",
          label: "OpenAI Embeddings guide",
        },
      ],
    },
    {
      id: "prompt-vs-context-engineering",
      question: "Prompt engineering vs context engineering — what's the difference?",
      tags: ["AI"],
      difficulty: "Medium",
      answer: [
        { type: "text", content: "Prompt engineering is picking the right words in your instruction. Context engineering is deciding what information gets into the model's window in the first place — and just as importantly, what stays out." },
        {
          type: "list",
          items: [
            "Prompt engineering: 'Answer step-by-step, be concise, output JSON.'",
            "Context engineering: which docs to retrieve, how to chunk them, what history to keep, when to summarize, what tools to expose.",
          ],
        },
        { type: "callout", variant: "tip", content: "For production LLM apps, context engineering is 80% of the quality lift. Prompts help — but you can't out-prompt a bad context." },
      ],
    },
  ],
};
