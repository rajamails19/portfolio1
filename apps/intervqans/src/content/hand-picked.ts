import type { Block } from "./types";

/**
 * Scrapbook of things picked up from random places. Add new ones to the END:
 *  - note:  words kept exactly as sent; markers (==, **, ^^, __) only add colour
 *  - image: drop the file in public/hand-picked and list it here
 *  - code:  language + code
 */
export type Pick =
  | { kind: "note"; title?: string; blocks: Block[] }
  | { kind: "image"; src: string; alt: string; title?: string }
  | { kind: "code"; title?: string; language: string; code: string }
  /** Shown like an 80-20 card (name + one line), looked up by name from the 80-20 data. */
  | { kind: "concept"; name: string };

export const handPicked: Pick[] = [
  {
    kind: "note",
    title: "Vector databases",
    blocks: [
      {
        type: "text",
        content:
          "When a new query comes in, it also converts that query into an embedding, then finds the ==nearest stored points on the meaning-map==, ^^regardless of whether any words actually match^^.",
      },
    ],
  },
  {
    kind: "note",
    title: 'What does "evals" actually mean?',
    blocks: [
      {
        type: "text",
        content:
          'In AI Engineering, you\'ll constantly hear the word **Evals**. An evaluation is simply a ==systematic way of answering==: "Is this AI system performing the way we expect?"',
      },
      {
        type: "list",
        items: [
          "Correctness",
          "Relevance",
          "Groundedness",
          "Safety",
          "Tool selection",
          "Formatting",
          "Latency",
          "Cost",
          "Task completion",
        ],
      },
    ],
  },
  {
    kind: "note",
    title: "Precision vs Recall",
    blocks: [
      {
        type: "text",
        content:
          "Now imagine ten chunks are retrieved. Only two are relevant. The system technically found the answer... but also dumped eight irrelevant chunks into the prompt. That ^^hurts precision^^.",
      },
      {
        type: "table",
        headers: ["Metric", "What it tells you"],
        rows: [
          ["High recall", '"We didn\'t miss useful information."'],
          ["High precision", '"Most of what we retrieved was useful."'],
        ],
      },
      { type: "text", content: "Good retrieval tries to **balance both**." },
      { type: "heading", content: "A fishing analogy" },
      { type: "text", content: "Imagine fishing with a net." },
      {
        type: "table",
        headers: ["Net type", "You catch"],
        rows: [
          ["High recall net", "Nearly every fish... but also boots, plastic, seaweed, bottles"],
          ["High precision net", "Almost everything you catch is fish... but many fish escape"],
        ],
      },
    ],
  },
  {
    kind: "note",
    title: "Groundedness",
    blocks: [
      {
        type: "text",
        content:
          "Where did the cash payout come from? Nowhere. Part of the answer is correct. Part is invented. This is a ^^groundedness failure^^.",
      },
    ],
  },
  {
    kind: "note",
    blocks: [
      {
        type: "text",
        content: "AI Engineer constantly, attached to ideas like:",
      },
      {
        type: "list",
        items: [
          "Vector Database",
          "Similarity Search",
          "RAG",
          "Semantic Search",
          "Recommendation Systems",
          "Memory",
          "Retrieval",
        ],
      },
    ],
  },
  {
    kind: "note",
    title: "Turning chunks into embeddings",
    blocks: [
      {
        type: "text",
        content:
          "After chunking, each chunk is converted into an **embedding** — a ==numerical representation of meaning==. Each chunk receives a vector, a list of numbers representing its semantic meaning.",
      },
    ],
  },
  {
    kind: "note",
    title: "Two intelligence layers",
    blocks: [
      {
        type: "table",
        headers: ["Layer", "Role"],
        rows: [
          ["Retrieval layer", "Finds the relevant information."],
          ["Generation layer", "Uses that information to produce an answer."],
        ],
      },
    ],
  },
  {
    kind: "image",
    src: "/hand-picked/where-it-sits.png",
    alt: "Where it sits: Java Backend sends a JSON request to the Python AI service, which receives, validates, prepares data, calls the model, processes the response, applies business rules and returns a JSON response",
  },
  {
    kind: "image",
    src: "/hand-picked/java-sends-bad-json.png",
    alt: "If Java accidentally sends a JSON transaction_amount of HELLO, we don't want that reaching the model — with FastAPI you'll commonly use Pydantic models for this validation",
  },
  {
    kind: "image",
    src: "/hand-picked/confidence-decision-table.png",
    alt: "Model confidence = 0.94, with a Confidence to Decision table and the tip: the model provides intelligence, your code controls how that intelligence is used",
  },
  {
    kind: "image",
    src: "/hand-picked/python-ai-service-layers.png",
    alt: "Python AI Service, LLM Integration, Prompt / Context Management, Structured Outputs, Tool Calling, Agents / Workflows, Guardrails / HITL, Evaluation, Monitoring",
  },
  {
    kind: "image",
    src: "/hand-picked/ml-vs-ai-engineer.png",
    alt: "The difference, side by side: ML Engineer versus AI Engineer / GenAI Engineer",
  },
  {
    kind: "image",
    src: "/hand-picked/document-ingestion-pipeline.png",
    alt: "A typical AI document-ingestion pipeline: PDF / Word / Web page, extract text, clean the text, split into chunks, create embeddings, store in a vector database",
  },
  {
    kind: "note",
    blocks: [
      {
        type: "text",
        content: "most of an ML engineer's time goes into ==the data, not the model==",
      },
    ],
  },
  {
    kind: "note",
    title: "Missing data — the silent data-quality bug",
    blocks: [
      {
        type: "text",
        content:
          "Real-world data is never clean. Someone skipped a form field, a sensor glitched for an hour, a survey respondent left a question blank. You're rarely handed a spreadsheet of the kind of pristine, complete data used in tutorials, and how you handle the gaps ==genuinely changes your results==.",
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "Tip:A common fix is **imputation** — filling in a reasonable estimated value instead of deleting the row, commonly the column's average or median.",
      },
    ],
  },
  {
    kind: "note",
    blocks: [
      {
        type: "text",
        content:
          "For regression problems (predicting a number), the most common loss is ==mean squared error==",
      },
    ],
  },
  {
    kind: "note",
    blocks: [
      {
        type: "text",
        content:
          "For classification problems, the common loss is **cross-entropy**, which specifically punishes ^^confident wrongness^^ far more than ^^hesitant wrongness^^.",
      },
      {
        type: "table",
        headers: ["Model says", "Turns out wrong →"],
        rows: [
          ['"I\'m 51% sure this is spam"', "Mild penalty"],
          ['"I\'m 99% sure this is spam"', "Much steeper penalty"],
        ],
      },
    ],
  },
  {
    kind: "note",
    blocks: [
      {
        type: "text",
        content:
          "**Parameters** are the values the model learns ^^by itself^^ during training — the weights in a neural network, the slope in linear regression. You never set these directly; gradient descent finds them for you.",
      },
    ],
  },
  {
    kind: "note",
    blocks: [
      {
        type: "text",
        content:
          "**Hyperparameters** are the settings ^^you^^ choose before training even begins — things like how many trees to build in a random forest, how deep to let a decision tree grow, or how big a step gradient descent takes at each nudge (the ==learning rate==).",
      },
    ],
  },
  {
    kind: "note",
    title: "The student analogy",
    blocks: [
      {
        type: "text",
        content:
          "Think of it like the difference between a student's actual knowledge (==parameters== — built through studying) and the study plan you set for them beforehand: how many hours a day, which textbook, how many practice tests (^^hyperparameters^^ — decided in advance, and they heavily influence how well the studying goes, but they aren't the knowledge itself).",
      },
    ],
  },
  {
    kind: "note",
    blocks: [
      {
        type: "text",
        content:
          "**Bayesian optimization** uses the results of earlier trials to intelligently decide which settings to try next, rather than searching blindly.",
      },
    ],
  },
  {
    kind: "note",
    blocks: [
      {
        type: "text",
        content:
          "You pick a ==baseline model==, usually something simple like logistic regression or a small decision tree, and get it working end to end before reaching for anything fancy — this baseline becomes your ^^reference point^^",
      },
    ],
  },
  {
    kind: "note",
    blocks: [
      {
        type: "text",
        content:
          "You train that baseline, evaluate it on the validation set using metrics appropriate to the problem — precision/recall for imbalanced classification, mean squared error for regression — and only then do you start experimenting with more powerful algorithms, tuning hyperparameters, and comparing against that baseline.",
      },
    ],
  },
  {
    kind: "note",
    title: "Cosine similarity is everywhere in AI engineering",
    blocks: [
      {
        type: "list",
        items: [
          'Every "vector database" you\'ll hear about (Pinecone, Weaviate, pgvector, FAISS) — its entire job, under the hood, is doing this exact calculation, just very fast, across millions of dots instead of 3.',
        ],
      },
      {
        type: "callout",
        variant: "tip",
        content:
          'Tip:That visual — "same direction" vs "different direction" — is the ==whole ballgame==. We want to know which chunk\'s arrow points the same way as the question\'s arrow, regardless of length.',
      },
    ],
  },
  { kind: "concept", name: "Regression vs Classification" },
  { kind: "concept", name: "Features, Labels, Predictions" },
  { kind: "concept", name: "Model Parameters vs Hyperparameters" },
  { kind: "concept", name: "Gradient Descent" },
  { kind: "concept", name: "Learning Rate" },
  { kind: "concept", name: "Epochs, Batches, Iterations" },
  { kind: "concept", name: "Bias-Variance Tradeoff" },
  { kind: "concept", name: "Regularization — L1 and L2" },
];
