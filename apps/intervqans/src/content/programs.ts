import type { Section } from "./types";

export const programsSection: Section = {
  slug: "programs",
  title: "Programs",
  tagline: "Bite-sized programs & patterns you can steal into your next PR.",
  emoji: "⚡",
  gradient: "from-[oklch(0.9_0.09_235)] via-[oklch(0.92_0.09_305)] to-[oklch(0.9_0.09_340)]",
  items: [
    {
      id: "react-debounced-search",
      question: "Build a debounced search input as a custom React hook",
      tags: ["React", "Hooks", "Performance"],
      difficulty: "Medium",
      answer: [
        { type: "text", content: "A reusable useDebouncedValue hook — perfect for search boxes, autosave, and expensive filters." },
        {
          type: "code",
          language: "tsx",
          content: `import { useEffect, useState } from "react";

export function useDebouncedValue<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

// Usage
function SearchBox() {
  const [q, setQ] = useState("");
  const debounced = useDebouncedValue(q, 400);

  useEffect(() => {
    if (!debounced) return;
    fetch(\`/api/search?q=\${debounced}\`);
  }, [debounced]);

  return <input value={q} onChange={(e) => setQ(e.target.value)} />;
}`,
        },
        { type: "callout", variant: "tip", content: "Return the cleanup from useEffect — that's what cancels the pending timeout when the user keeps typing." },
      ],
    },
    {
      id: "python-fibonacci-memo",
      question: "Fibonacci in Python — recursive, memoized, iterative",
      tags: ["Python", "Algorithms"],
      difficulty: "Easy",
      answer: [
        { type: "text", content: "Three flavors, from textbook to production-safe." },
        {
          type: "code",
          language: "python",
          content: `from functools import lru_cache

# 1. Naive recursion — O(2^n), don't ship this
def fib_naive(n: int) -> int:
    if n < 2:
        return n
    return fib_naive(n - 1) + fib_naive(n - 2)

# 2. Memoized — O(n) time, O(n) space
@lru_cache(maxsize=None)
def fib_memo(n: int) -> int:
    if n < 2:
        return n
    return fib_memo(n - 1) + fib_memo(n - 2)

# 3. Iterative — O(n) time, O(1) space (interview favorite)
def fib(n: int) -> int:
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a

print(fib(50))  # 12586269025`,
        },
        {
          type: "table",
          headers: ["Version", "Time", "Space"],
          rows: [
            ["Naive recursion", "O(2^n)", "O(n) stack"],
            ["Memoized", "O(n)", "O(n)"],
            ["Iterative", "O(n)", "O(1)"],
          ],
        },
      ],
    },
    {
      id: "python-simple-rag",
      question: "Minimal RAG pipeline in Python (embed → retrieve → answer)",
      tags: ["AI", "RAG", "Python"],
      difficulty: "Hard",
      answer: [
        { type: "text", content: "A skeleton retrieval-augmented generation loop. Swap the fake embedder & LLM with OpenAI, Anthropic, or your LLM gateway calls." },
        {
          type: "code",
          language: "python",
          content: `import numpy as np
from dataclasses import dataclass

@dataclass
class Doc:
    id: str
    text: str
    embedding: np.ndarray

def embed(text: str) -> np.ndarray:
    # Replace with a real embedding model
    rng = np.random.default_rng(abs(hash(text)) % (2**32))
    return rng.random(1536)

def cosine(a, b):
    return float(a @ b / (np.linalg.norm(a) * np.linalg.norm(b)))

class TinyVectorStore:
    def __init__(self):
        self.docs: list[Doc] = []

    def add(self, id: str, text: str):
        self.docs.append(Doc(id, text, embed(text)))

    def search(self, query: str, k: int = 3) -> list[Doc]:
        q = embed(query)
        return sorted(self.docs, key=lambda d: -cosine(q, d.embedding))[:k]

def answer(query: str, store: TinyVectorStore) -> str:
    context = "\\n\\n".join(d.text for d in store.search(query, k=3))
    prompt = f"Answer using ONLY the context.\\n\\nContext:\\n{context}\\n\\nQ: {query}\\nA:"
    return call_llm(prompt)  # your LLM call here

def call_llm(prompt: str) -> str:
    return "…"  # wire to your provider`,
        },
        { type: "callout", variant: "info", content: "Real RAG needs chunking, hybrid search (BM25 + vectors), and a rerank step before the LLM. This is the mental model." },
      ],
    },
  ],
};
