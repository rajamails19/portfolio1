import type { Section } from "./types";

export const programsSection: Section = {
  slug: "programs",
  title: "Programs",
  tagline: "Studio-tight snippets & patterns you can steal into your next PR.",
  emoji: "♪",
  gradient: "from-[oklch(0.9_0.09_320)] via-[oklch(0.92_0.09_350)] to-[oklch(0.9_0.09_15)]",
  items: [
    {
      id: "react-debounced-search",
      question: "Build a debounced search input as a custom React hook",
      tags: ["React", "Hooks", "Performance"],
      difficulty: "Medium",
      answer: [
        { type: "text", content: "A reusable `useDebouncedValue` hook — perfect for search boxes, autosave, and expensive filters." },
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
        { type: "text", content: "A skeleton retrieval-augmented generation loop. Swap the fake embedder & LLM with real provider calls." },
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
    {
      id: "python-word-frequency",
      question: "Count Word Frequency ⭐⭐⭐",
      tags: ["Python", "Text Processing", "Dictionaries"],
      difficulty: "Easy",
      answer: [
        { type: "text", content: "Given a paragraph, build a **frequency dictionary** and return the ==top 5 most frequent words==." },
        {
          type: "code",
          language: "python",
          content: `text = """
AI is amazing.
AI is changing software.
Software is evolving.
"""

words = text.lower().replace(".", "").split()

freq = {}

for word in words:
    freq[word] = freq.get(word, 0) + 1

top_5 = sorted(freq.items(), key=lambda item: item[1], reverse=True)[:5]

for word, count in top_5:
    print(f"{word} : {count}")`,
        },
        { type: "heading", content: "Test" },
        {
          type: "table",
          tone: "sky",
          headers: ["Input", "Output"],
          rows: [["AI AI ML AI Python", "AI : 3 · ML : 1 · Python : 1"]],
        },
        { type: "callout", variant: "tip", content: "`freq.get(word, 0) + 1` starts unseen words at zero, then increments their count." },
      ],
    },
    {
      id: "python-cosine-similarity",
      question: "Cosine Similarity ⭐⭐⭐⭐",
      tags: ["Python", "NumPy", "Vectors", "AI"],
      difficulty: "Medium",
      answer: [
        { type: "text", content: "Given two vectors `A = [1, 2, 3]` and `B = [2, 4, 6]`, calculate their similarity using a **dot product** and **vector magnitude**." },
        {
          type: "code",
          language: "python",
          content: `import numpy as np

A = np.array([1, 2, 3])
B = np.array([2, 4, 6])

similarity = np.dot(A, B) / (np.linalg.norm(A) * np.linalg.norm(B))

print(similarity)`,
        },
        {
          type: "table",
          tone: "sky",
          headers: ["Vector A", "Vector B", "Similarity"],
          rows: [["[1, 2, 3]", "[2, 4, 6]", "1.0"]],
        },
        { type: "callout", variant: "info", content: "The vectors point in the same direction, so their cosine similarity is `1.0` — a perfect directional match." },
      ],
    },
    {
      id: "python-mini-chatbot",
      question: "Mini Chatbot",
      tags: ["Python", "Chatbot", "Loops", "Dictionaries"],
      difficulty: "Easy",
      answer: [
        { type: "text", content: "A tiny **rule-based chatbot** that looks up a response and keeps running until the user says `bye`." },
        {
          type: "table",
          headers: ["You", "Bot"],
          rows: [
            ["Hello", "Hi!"],
            ["Bye", "Goodbye"],
          ],
        },
        { type: "heading", content: "Program" },
        {
          type: "code",
          language: "python",
          content: `responses = {
    "hello": "Hi!",
    "bye": "Goodbye"
}

while True:
    q = input()

    if q in responses:
        print(responses[q])

    if q == "bye":
        break`,
        },
        { type: "callout", variant: "tip", content: "Use `q = input().lower()` if you want `Hello`, `HELLO`, and `hello` to behave the same way." },
      ],
    },
    {
      id: "python-tiny-vector-search",
      question: "Build a Tiny Vector Search",
      tags: ["Python", "Embeddings", "Vector Search", "AI"],
      difficulty: "Medium",
      answer: [
        { type: "text", content: "Imagine the **embeddings** are already given. Find the nearest vector using ==Euclidean distance== or cosine similarity." },
        {
          type: "code",
          language: "python",
          content: `import math

docs = {
    "Apple": [1, 2],
    "Banana": [5, 6],
    "Orange": [2, 3]
}

query = [2, 2]

def euclidean(a, b):
    return math.sqrt(sum((x - y) ** 2 for x, y in zip(a, b)))

distances = {name: euclidean(vector, query) for name, vector in docs.items()}
best_distance = min(distances.values())
nearest = [name for name, distance in distances.items() if distance == best_distance]

print(nearest)`,
        },
        {
          type: "table",
          tone: "sky",
          headers: ["Query", "Nearest document", "Why"],
          rows: [["[2, 2]", "Apple and Orange", "Both have distance = 1.0"]],
        },
        { type: "callout", variant: "info", content: "This teaches the core idea behind a ==vector database==: compare an input vector with stored vectors and return the closest match." },
      ],
    },
    {
      id: "python-csv-data-analysis",
      question: "CSV Data Analysis",
      tags: ["Python", "Pandas", "CSV", "Data Analysis"],
      difficulty: "Easy",
      answer: [
        { type: "text", content: "Read employee data from a CSV file and calculate the **average salary**, **highest salary**, and **lowest salary**." },
        { type: "heading", content: "Given" },
        {
          type: "table",
          tone: "sky",
          headers: ["Name", "Salary"],
          rows: [
            ["John", "5000"],
            ["Alice", "7000"],
            ["Bob", "9000"],
          ],
        },
        { type: "heading", content: "Find" },
        {
          type: "flow",
          direction: "horizontal",
          nodes: [
            { label: "Average Salary", sub: "7000", tone: "sky" },
            { label: "Highest Salary", sub: "9000", tone: "mint" },
            { label: "Lowest Salary", sub: "5000", tone: "coral" },
          ],
        },
        { type: "heading", content: "Program" },
        {
          type: "code",
          language: "python",
          content: `import pandas as pd

df = pd.read_csv("employees.csv")

print(df["Salary"].mean())
print(df["Salary"].max())
print(df["Salary"].min())`,
        },
        { type: "callout", variant: "tip", content: "Pandas gives each CSV column a `Series`; methods such as `.mean()`, `.max()`, and `.min()` summarize it directly." },
      ],
    },
    {
      id: "python-call-llm-api",
      question: "Call an LLM API",
      tags: ["Python", "OpenAI", "LLM", "API"],
      difficulty: "Medium",
      answer: [
        { type: "text", content: "Send an instruction to an **LLM API** and print the generated response text." },
        { type: "heading", content: "Program" },
        {
          type: "code",
          language: "python",
          content: `from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-5",
    input="Summarize this paragraph"
)

print(response.output_text)`,
        },
        {
          type: "flow",
          direction: "horizontal",
          title: "Request journey",
          nodes: [
            { label: "Create client", sub: "OpenAI()", tone: "rose" },
            { label: "Send input", sub: "responses.create", tone: "sky" },
            { label: "Receive answer", sub: "output_text", tone: "mint" },
          ],
        },
        { type: "callout", variant: "info", content: "The response object contains the model output; `response.output_text` provides the combined text result for this example." },
      ],
    },
    {
      id: "python-age-classification",
      question: "Age Classification with if / else",
      tags: ["Python", "Conditionals", "Basics"],
      difficulty: "Easy",
      answer: [
        { type: "text", content: "Use a simple **conditional statement** to classify a person as a child or an adult." },
        {
          type: "flow",
          direction: "horizontal",
          title: "Decision path",
          nodes: [
            { label: "Read age", sub: "age = 10", tone: "sky" },
            { label: "Check condition", sub: "age < 18", tone: "rose" },
            { label: "Print result", sub: "Child", tone: "mint" },
          ],
        },
        { type: "heading", content: "Program" },
        {
          type: "code",
          language: "python",
          content: `age = 10

if age < 18:
    print("Child")
else:
    print("Adult")`,
        },
        { type: "callout", variant: "tip", content: "Try changing `age` to `18`. Because the condition uses `< 18`, the program prints `Adult`." },
      ],
    },
    {
      id: "python-simple-linear-regression",
      question: "Simple Linear Regression",
      tags: ["Python", "Machine Learning", "Regression", "scikit-learn"],
      difficulty: "Medium",
      answer: [
        { type: "text", content: "Train a **linear regression model** to predict a house price from its size." },
        {
          type: "table",
          tone: "sky",
          headers: ["House size", "Price"],
          rows: [
            ["800", "150"],
            ["1000", "180"],
            ["1200", "220"],
            ["1500", "280"],
          ],
        },
        { type: "heading", content: "Program" },
        {
          type: "code",
          language: "python",
          content: `from sklearn.linear_model import LinearRegression
import numpy as np

X = np.array([[800], [1000], [1200], [1500]])
y = np.array([150, 180, 220, 280])

model = LinearRegression()
model.fit(X, y)

print(model.predict([[1300]]))`,
        },
        {
          type: "flow",
          direction: "horizontal",
          nodes: [
            { label: "Training data", sub: "X and y", tone: "sky" },
            { label: "Learn a line", sub: "model.fit", tone: "rose" },
            { label: "Predict", sub: "size = 1300", tone: "mint" },
          ],
        },
        { type: "callout", variant: "info", content: "`X` is two-dimensional because scikit-learn expects rows of samples and columns of features. Here, each house has one feature: size." },
      ],
    },
    {
      id: "python-spam-detector",
      question: "Spam Detector",
      tags: ["Python", "Text Classification", "NLP", "Naive Bayes"],
      difficulty: "Medium",
      answer: [
        { type: "text", content: "Build a small **text classifier** that learns to distinguish spam messages from normal messages." },
        {
          type: "table",
          headers: ["Training email", "Label"],
          rows: [
            ["Win money now", "1 · Spam"],
            ["Meeting at 10 AM", "0 · Not spam"],
            ["Claim your prize", "1 · Spam"],
            ["Project update", "0 · Not spam"],
          ],
        },
        { type: "heading", content: "Program" },
        {
          type: "code",
          language: "python",
          content: `from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB

emails = [
    "Win money now",
    "Meeting at 10 AM",
    "Claim your prize",
    "Project update"
]

labels = [1, 0, 1, 0]

vectorizer = CountVectorizer()
X = vectorizer.fit_transform(emails)

model = MultinomialNB()
model.fit(X, labels)

print(model.predict(
    vectorizer.transform(["Win a free iPhone"])
))`,
        },
        { type: "callout", variant: "tip", content: "The vectorizer converts words into numeric counts. The model never reads raw text directly—it learns from those numbers." },
      ],
    },
    {
      id: "python-image-classifier",
      question: "Image Classifier",
      tags: ["Python", "Computer Vision", "Random Forest", "scikit-learn"],
      difficulty: "Medium",
      answer: [
        { type: "text", content: "Train a **Random Forest classifier** using scikit-learn’s handwritten digits dataset, then predict one digit." },
        {
          type: "flow",
          direction: "horizontal",
          title: "Classification journey",
          nodes: [
            { label: "Load digits", sub: "8 × 8 images", tone: "sky" },
            { label: "Train forest", sub: "pixels → labels", tone: "mint" },
            { label: "Predict digit", sub: "one image", tone: "rose" },
          ],
        },
        { type: "heading", content: "Program" },
        {
          type: "code",
          language: "python",
          content: `from sklearn.datasets import load_digits
from sklearn.ensemble import RandomForestClassifier

digits = load_digits()

model = RandomForestClassifier(random_state=42)
model.fit(digits.data, digits.target)

print(model.predict([digits.data[0]]))`,
        },
        { type: "callout", variant: "info", content: "Each image is flattened into 64 pixel values. `digits.target` contains the correct digit labels from `0` to `9`." },
      ],
    },
    {
      id: "python-first-neural-network",
      question: "Neural Network",
      tags: ["Python", "Deep Learning", "Neural Network", "scikit-learn"],
      difficulty: "Medium",
      answer: [
        { type: "text", content: "Create your first **neural network classifier** and train it on the XOR pattern." },
        {
          type: "table",
          tone: "sky",
          headers: ["Input X", "Target y"],
          rows: [
            ["[0, 0]", "0"],
            ["[0, 1]", "1"],
            ["[1, 0]", "1"],
            ["[1, 1]", "0"],
          ],
        },
        { type: "heading", content: "Program" },
        {
          type: "code",
          language: "python",
          content: `from sklearn.neural_network import MLPClassifier

X = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1]
]

y = [0, 1, 1, 0]

model = MLPClassifier(max_iter=2000, random_state=42)

model.fit(X, y)

print(model.predict([[1, 0]]))`,
        },
        { type: "callout", variant: "tip", content: "This is a learning demo with only four samples. Real neural networks need much larger datasets plus separate validation and test data." },
      ],
    },
    {
      id: "python-chat-with-openai",
      question: "Chat with OpenAI",
      tags: ["Python", "OpenAI", "LLM", "API"],
      difficulty: "Medium",
      answer: [
        { type: "text", content: "Send a question to an **OpenAI model** and print its text response." },
        { type: "heading", content: "Program" },
        {
          type: "code",
          language: "python",
          content: `from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-5",
    input="Explain Machine Learning"
)

print(response.output_text)`,
        },
        {
          type: "flow",
          direction: "horizontal",
          nodes: [
            { label: "Question", sub: "Explain ML", tone: "sky" },
            { label: "Model", sub: "gpt-5", tone: "rose" },
            { label: "Answer", sub: "output_text", tone: "mint" },
          ],
        },
      ],
    },
    {
      id: "python-simple-ai-chatbot",
      question: "Simple AI Chatbot",
      tags: ["Python", "OpenAI", "Chatbot", "Loops"],
      difficulty: "Medium",
      answer: [
        { type: "text", content: "Combine a **while loop** with an LLM API to create a simple conversational chatbot. Enter `bye` to stop it." },
        { type: "heading", content: "Program" },
        {
          type: "code",
          language: "python",
          content: `from openai import OpenAI

client = OpenAI()

while True:
    question = input("You: ")

    if question.lower() == "bye":
        break

    response = client.responses.create(
        model="gpt-5",
        input=question
    )

    print("Bot:", response.output_text)`,
        },
        { type: "callout", variant: "warn", content: "This basic version sends each question independently, so it does not remember earlier turns. Conversation history can be added later." },
        { type: "callout", variant: "tip", content: "Keep API keys in environment variables—never paste them directly into source code." },
      ],
    },
  ],
};
