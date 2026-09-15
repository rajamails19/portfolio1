import type { Section } from "./types";

export const storySection: Section = {
  slug: "story",
  title: "Story-Based",
  tagline: "Whatever you paste, retold as a guided walk-through — concept by concept.",
  emoji: "📖",
  gradient: "from-[oklch(0.92_0.08_265)] via-[oklch(0.92_0.09_320)] to-[oklch(0.92_0.08_350)]",
  items: [
    {
      id: "what-does-the-python-ai-service-do",
      question: "What does an AI Engineer's Python service actually do?",
      tags: ["AI Engineer", "Architecture"],
      answer: [
        {
          type: "text",
          content:
            "Typically the model or AI functionality gets exposed through a ==Python API==, and then frontend or backend applications consume that service. In this story, __FastAPI__ is used for those Python services.",
        },
        {
          type: "callout",
          variant: "tip",
          content: '"We take an existing powerful model and make it useful for our company."',
        },
        {
          type: "text",
          content:
            "That means the Python AI service handles **business logic, prompts, input validation, tool calls, security, structured output, retries**, and integration with the rest of the application.",
        },
        { type: "heading", content: "Where it sits" },
        {
          type: "code",
          language: "text",
          content: `Java Backend
     ↓
JSON Request
     ↓
┌───────────────────────────┐
│   ⭐ PYTHON AI SERVICE      │
│                            │
│  1. Receive request        │
│  2. Validate input         │
│  3. Prepare data           │
│  4. Call model / LLM       │
│  5. Process model response │
│  6. Apply business rules   │
│  7. Return JSON response   │
└───────────────────────────┘
     ↓
Java Backend`,
        },
      ],
    },
    {
      id: "validate-before-touching-the-model",
      question: "Why validate input before it ever touches the model",
      tags: ["Validation", "FastAPI"],
      answer: [
        { type: "text", content: "If Java accidentally sends:" },
        {
          type: "code",
          language: "json",
          content: `{
  "transaction_amount": "HELLO"
}`,
        },
        {
          type: "text",
          content:
            "==we don't want that reaching the model==. With FastAPI, you'll commonly use **Pydantic models** for this validation.",
        },
        { type: "heading", content: "Two places the model can come from" },
        {
          type: "code",
          language: "text",
          content: `⭐ YOUR PYTHON AI SERVICE
        ↓
Which model are we using?
        ↓
   ┌────────────┴────────────┐
   ↓                         ↓
Traditional ML             GenAI
   ↓                         ↓
Model WE trained          GPT / Claude
sklearn/XGBoost/etc.      model THEY built`,
        },
        { type: "heading", content: "Getting the phrasing right" },
        {
          type: "text",
          content: "So when I said:",
        },
        {
          type: "callout",
          variant: "warn",
          content: '"Before touching AI, we validate the input."',
        },
        { type: "text", content: "More precisely I should have said:" },
        {
          type: "callout",
          variant: "tip",
          content:
            '"Before sending the request to the underlying model, our Python AI service validates and prepares the input."',
        },
      ],
    },
    {
      id: "calling-an-llm-for-genai",
      question: "Calling an LLM for GenAI use cases",
      tags: ["GenAI", "LLM"],
      answer: [
        {
          type: "text",
          content: "For GenAI, the Python service could call an existing LLM:",
        },
        {
          type: "code",
          language: "text",
          content: `Python AI Service
       ↓
OpenAI / Claude / Gemini
       ↓
LLM Response`,
        },
        {
          type: "text",
          content: "For example, the company might send customer complaint text:",
        },
        {
          type: "callout",
          variant: "info",
          content: '"My card was charged twice and nobody has refunded me."',
        },
        {
          type: "text",
          content:
            "The Python service constructs the appropriate instruction and sends it to the LLM.",
        },
      ],
    },
    {
      id: "making-ai-output-usable",
      question: "We usually don't blindly return whatever AI gives us",
      tags: ["Structured Output"],
      answer: [
        {
          type: "text",
          content:
            "This is another important AI Engineer responsibility. Suppose the model returns:",
        },
        { type: "code", language: "text", content: "0.87342917" },
        {
          type: "text",
          content: "Java doesn't necessarily want that. The Python code can translate it into:",
        },
        {
          type: "code",
          language: "json",
          content: `{
  "risk": "HIGH",
  "confidence": 0.87
}`,
        },
        {
          type: "text",
          content: "Or suppose Claude returns a long paragraph. The application needs:",
        },
        {
          type: "code",
          language: "json",
          content: `{
  "category": "DUPLICATE_CHARGE",
  "priority": "HIGH"
}`,
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "The service makes the AI output ==predictable and usable== by another application.",
        },
      ],
    },
    {
      id: "business-rules-around-the-model",
      question: "Business rules can also sit around the AI",
      tags: ["Business Logic"],
      answer: [
        { type: "text", content: "Suppose:" },
        { type: "code", language: "text", content: "Model confidence = 0.94" },
        { type: "text", content: "Maybe your business says:" },
        {
          type: "table",
          headers: ["Confidence", "Decision"],
          rows: [
            ["> 0.90", "**HIGH RISK**"],
            ["0.60 – 0.90", "MANUAL REVIEW"],
            ["< 0.60", "LOW RISK"],
          ],
        },
        {
          type: "text",
          content: "The Python service can apply those rules.",
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "So the model provides ==intelligence==. Your code controls __how that intelligence is used__.",
        },
      ],
    },
    {
      id: "service-model-result-layers",
      question: "The layered picture: service → model → result",
      tags: ["Architecture", "Monitoring"],
      answer: [
        {
          type: "text",
          content:
            "A good portion of the work is on the Python AI service layer. The functionality is normally exposed using **FastAPI**: handle the incoming request validation and preprocessing, invoke either the ML model or the appropriate LLM depending on the use case, process the model output, apply application-level business rules, and return a structured JSON response that application teams can consume.",
        },
        {
          type: "code",
          language: "text",
          content: `1. YOUR COMPANY'S AI SERVICE
   Python + FastAPI + your business code
       ↓
2. MODEL
   The actual intelligence
       ↓
3. RESULT`,
        },
        {
          type: "callout",
          variant: "info",
          content:
            '"The consuming Java/React application doesn\'t care what algorithm is behind the endpoint. We expose a stable API contract."',
        },
        { type: "heading", content: "The API can be healthy while the AI isn't" },
        {
          type: "text",
          content:
            "The API can technically be 100% healthy while the AI behavior is becoming questionable. That's why we also monitor things like ==feature distributions, prediction distributions and model performance== over time.",
        },
        {
          type: "text",
          content: "We don't automatically retrain the model just because one metric moved.",
        },
        {
          type: "list",
          items: [
            "First we try to understand why.",
            "Maybe customer behavior genuinely changed.",
            "Maybe an upstream team changed the meaning of one database field.",
            "Maybe a new customer category was introduced.",
          ],
        },
        {
          type: "text",
          content:
            "If the features are correct but predictions have degraded over time, then we start looking more seriously at __model performance or drift__.",
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "That's probably one of the biggest practical things learned working with AI applications: getting a model to work in Python is one problem; getting the same model to ==behave reliably with real production application data== is a completely different problem.",
        },
      ],
    },
    {
      id: "ai-engineer-technical-territory",
      question: "Where the AI Engineer's technical territory goes deeper",
      tags: ["Career", "Scope"],
      answer: [
        {
          type: "text",
          content: "Then, as we go deeper, the **AI Engineer technical territory** becomes:",
        },
        {
          type: "code",
          language: "text",
          content: `Python AI Service
       ↓
LLM Integration
       ↓
Prompt / Context Management
       ↓
Structured Outputs
       ↓
Tool Calling
       ↓
Agents / Workflows
       ↓
Guardrails / HITL
       ↓
Evaluation
       ↓
Monitoring`,
        },
        {
          type: "callout",
          variant: "tip",
          content: "That's the lane I recommend we stay in now.",
        },
      ],
    },
    {
      id: "ml-engineer-vs-ai-engineer",
      question: "ML Engineer vs AI / GenAI Engineer — telling the story right",
      tags: ["Career", "Positioning"],
      answer: [
        {
          type: "text",
          content: "For the AI Engineer story, don't spend much time saying:",
        },
        {
          type: "callout",
          variant: "warn",
          content:
            '"I trained Random Forest, normalized features, tuned XGBoost, optimized F1 score..."',
        },
        {
          type: "text",
          content:
            "That pulls the conversation toward __ML Engineer__. Instead, the natural story should gradually sound like:",
        },
        {
          type: "callout",
          variant: "tip",
          content:
            '"Most of my work is on the Python AI-service side. Our existing enterprise applications are primarily Java/React, and they call our AI services through APIs. Within our service, we handle the application context and instructions, interact with LLMs such as GPT or Claude, process and validate their responses, and return structured results back to the application."',
        },
        { type: "heading", content: "The difference, side by side" },
        {
          type: "code",
          language: "text",
          content: `ML ENGINEER
───────────
Application
     ↓
Python Service
     ↓
ML model your team trained
     ↓
Prediction


AI ENGINEER / GENAI ENGINEER
─────────────────────────────
Application
     ↓
⭐ Python AI Service — YOU
     ↓
GPT / Claude / Gemini
     ↓
LLM response
     ↓
⭐ Your code processes it
     ↓
Application`,
        },
      ],
    },
    {
      id: "embeddings-turning-meaning-into-coordinates",
      question: "Embeddings — turning meaning into coordinates",
      tags: ["Embeddings", "Vector Search"],
      answer: [
        {
          type: "text",
          content:
            "Models only understand numbers, not words. Embeddings are the modern, much richer answer to that same problem — instead of a crude one-hot column per word, an embedding represents a word, sentence, or document as a long list of numbers (a **vector**) that captures its actual meaning, positioned in a kind of imaginary space.",
        },
        { type: "heading", content: "The meaning-map picture" },
        {
          type: "text",
          content:
            'imagine a giant map where every word or sentence gets placed somewhere based on its meaning, not its spelling. =="King" and "queen"== end up near each other on this map, because they\'re conceptually related. =="Dog" and "puppy"== land close together too.',
        },
        {
          type: "callout",
          variant: "tip",
          content: '"Find me the most relevant document" becomes "find me the nearest points on the map."',
        },
        {
          type: "text",
          content:
            "This is the exact mechanism your **TableMind pgvector** setup relies on: every piece of text gets converted into one of these coordinate vectors.",
        },
      ],
    },
    {
      id: "vector-databases-search-built-for-meaning",
      question: "Vector databases — a search engine built for meaning, not keywords",
      tags: ["pgvector", "Retrieval"],
      answer: [
        {
          type: "text",
          content:
            "A traditional database search (like a SQL `WHERE` clause, or even old-school search engines) matches __exact words__. If a customer asks \"how do I get my money back,\" a keyword search fails to find a document titled \"refund policy\" unless it happens to share exact words.",
        },
        {
          type: "callout",
          variant: "info",
          content:
            "A **vector database** — pgvector being exactly this — stores all your documents as embeddings instead of raw text.",
        },
        {
          type: "text",
          content:
            "When a new query comes in, it also converts that query into an embedding, then finds the ==nearest stored points== on the meaning-map, regardless of whether any words actually match.",
        },
        { type: "heading", content: "How \"nearest\" is actually measured" },
        {
          type: "text",
          content:
            "The actual search operation being run under the hood is usually **cosine similarity** — measuring the angle between two vectors rather than their raw distance, which turns out to be a more robust way of comparing meaning regardless of how \"long\" or emphatic the text is.",
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "You don't need to compute this by hand, but knowing it's angle-based rather than pure distance is a good interview detail — it explains why two vectors can be similar even with different magnitudes.",
        },
      ],
    },
    {
      id: "chunking-the-detail-that-makes-or-breaks-rag",
      question: "Chunking — the unglamorous detail that quietly makes or breaks RAG quality",
      tags: ["RAG", "Chunking"],
      answer: [
        {
          type: "text",
          content:
            "One practical wrinkle worth knowing, since it's the kind of detail that separates someone who's read about RAG from someone who's actually built it: you can't just throw an entire long document into the vector database as one giant embedding — it gets too vague and unfocused to match well against specific questions.",
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "Instead, documents get broken into ==smaller chunks== — a paragraph or a few sentences at a time — each with its own embedding, so retrieval can pinpoint the specific relevant passage rather than returning an entire vague document.",
        },
      ],
    },
    {
      id: "what-evals-actually-means",
      question: "What does \"evals\" actually mean?",
      tags: ["Evals", "Testing"],
      answer: [
        { type: "text", content: "Instead of judging one single perfect action, you evaluate important behaviors:" },
        {
          type: "list",
          items: [
            "Did they obey signals?",
            "Did they stay in the lane?",
            "Did they check mirrors?",
            "Did they drive safely?",
            "Did they reach the destination?",
          ],
        },
        {
          type: "text",
          content:
            "**AI evaluation works similarly.** We don't always test one exact output — we test whether the output satisfies the required behavior.",
        },
        { type: "heading", content: "This is what \"evals\" means" },
        {
          type: "text",
          content:
            'In AI Engineering, you\'ll constantly hear the word ==Evals==. An evaluation is simply a systematic way of answering: "Is this AI system performing the way we expect?"',
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
        {
          type: "callout",
          variant: "info",
          content: "So evals are essentially the **test strategy** of an AI system.",
        },
        { type: "heading", content: "Start with the simplest possible eval" },
        {
          type: "text",
          content:
            'Suppose we\'re building a customer-support assistant. User asks: "I forgot my password. What should I do?" We expect the AI to:',
        },
        {
          type: "list",
          items: [
            "Explain password reset.",
            "Not ask for the password.",
            "Not invent a support phone number.",
            "Give a concise response.",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content:
            'Notice — we are __not__ defining one exact answer. We\'re defining **acceptance criteria**. That\'s very similar to manual QA: instead of "Expected output = exact sentence," we say "Expected behavior = satisfies these conditions."',
        },
      ],
    },
    {
      id: "rule-based-evals",
      question: "Rule-based evals — deterministic checks you should always use first",
      tags: ["Evals", "JSON Validation"],
      answer: [
        {
          type: "text",
          content: "Some AI outputs can still be tested deterministically. For example, your application requires JSON:",
        },
        {
          type: "code",
          language: "json",
          content: `{
  "name": "John",
  "age": 42
}`,
        },
        { type: "text", content: "You can validate:" },
        {
          type: "list",
          items: ["Is it valid JSON?", "Does `name` exist?", "Is `age` numeric?", "Is `age` >= 0?"],
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "This is traditional automation testing — ==very reliable, very cheap==. Use deterministic checks whenever possible.",
        },
      ],
    },
    {
      id: "semantic-evaluation",
      question: "Semantic evaluation — same meaning, different words",
      tags: ["Evals", "Semantic Similarity"],
      answer: [
        {
          type: "text",
          content: 'Now consider this question: "Why was my insurance claim rejected?"',
        },
        {
          type: "callout",
          variant: "info",
          content:
            'Expected answer: "The claim was rejected because the procedure required preauthorization."',
        },
        {
          type: "callout",
          variant: "tip",
          content:
            'Generated answer: "Your insurer denied the claim because prior approval was required before the procedure."',
        },
        {
          type: "text",
          content:
            "Different words. Same meaning. A **string comparison would fail**. A ==semantic evaluator should pass it==. This is one major difference between conventional QA and AI evaluation.",
        },
      ],
    },
    {
      id: "precision-vs-recall-fishing-analogy",
      question: "Precision vs Recall — the fishing net analogy",
      tags: ["Retrieval", "Precision & Recall"],
      answer: [
        {
          type: "text",
          content:
            "Now imagine ten chunks are retrieved. Only two are relevant. The system technically found the answer... but also dumped eight irrelevant chunks into the prompt. That hurts **precision**.",
        },
        {
          type: "table",
          headers: ["Metric", "What it tells you"],
          rows: [
            ["High recall", '"We didn\'t miss useful information."'],
            ["High precision", '"Most of what we retrieved was useful."'],
          ],
        },
        { type: "text", content: "Good retrieval tries to balance both." },
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
        {
          type: "callout",
          variant: "tip",
          content:
            "A good retrieval system wants to catch the ==useful information without bringing in too much garbage==.",
        },
      ],
    },
    {
      id: "groundedness",
      question: "Groundedness — are the claims actually supported by the evidence?",
      tags: ["Evals", "Groundedness"],
      answer: [
        {
          type: "text",
          content: 'Suppose the retrieved document says: "Employees may carry over five vacation days."',
        },
        {
          type: "callout",
          variant: "warn",
          content:
            'The model answers: "Employees can carry over five days **and receive a cash payout for anything above five.**"',
        },
        {
          type: "text",
          content:
            "Where did the cash payout come from? Nowhere. Part of the answer is correct. Part is invented. This is a ==groundedness failure==.",
        },
        {
          type: "callout",
          variant: "tip",
          content: "Groundedness asks: are the claims in the answer actually supported by the provided evidence?",
        },
      ],
    },
    {
      id: "model-upgrade-testing",
      question: "Model upgrade testing — newer isn't automatically better",
      tags: ["Evals", "Model Comparison"],
      answer: [
        {
          type: "text",
          content:
            'Suppose your system currently uses **Model A**. A new model, **Model B**, arrives. Someone says: "It\'s newer. Let\'s switch."',
        },
        {
          type: "callout",
          variant: "tip",
          content: 'A good AI engineer says: "Let\'s evaluate it first."',
        },
        { type: "text", content: "Maybe Model B:" },
        {
          type: "list",
          items: [
            "Has better reasoning",
            "Costs more",
            "Responds slower",
            "Uses tools differently",
            "Produces longer answers",
            "Performs worse on your specific domain",
          ],
        },
        {
          type: "callout",
          variant: "warn",
          content: "==Newer doesn't automatically mean better== for your application.",
        },
      ],
    },
    {
      id: "why-every-ai-engineer-needs-embeddings",
      question: "Why every AI Engineer needs to understand embeddings",
      tags: ["Embeddings", "RAG"],
      answer: [
        { type: "text", content: "You will hear this word constantly, attached to ideas like:" },
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
        {
          type: "callout",
          variant: "tip",
          content:
            "At the heart of all of them is one idea: ==represent information as embeddings, then compare those embeddings to find related meaning==.",
        },
        {
          type: "text",
          content:
            'Once you understand embeddings, many "advanced" AI concepts suddenly become much easier to grasp.',
        },
        { type: "heading", content: "A typical AI document-ingestion pipeline" },
        {
          type: "code",
          language: "text",
          content: `PDF / Word / Web page
        ↓
Extract text
        ↓
Clean the text
        ↓
Split into chunks
        ↓
Create embeddings
        ↓
Store in a vector database`,
        },
        { type: "text", content: "Let's walk through each stage." },
      ],
    },
    {
      id: "rag-step-2-cleaning-the-text",
      question: "Step 2 — Cleaning the text",
      tags: ["RAG", "Data Cleaning"],
      answer: [
        { type: "text", content: "Suppose the extracted document looks like this:" },
        {
          type: "code",
          language: "text",
          content: `EMPLOYEE HANDBOOK 2026

Page 17 of 92

Vacation days may be carried...

CONFIDENTIAL

EMPLOYEE HANDBOOK 2026`,
        },
        {
          type: "text",
          content: "The useful information is mixed with noise. Cleaning may involve:",
        },
        {
          type: "list",
          items: [
            "Removing repeated headers and footers",
            "Fixing broken sentences",
            "Removing unnecessary whitespace",
            "Preserving headings",
            "Preserving table meaning",
            "Detecting document sections",
            "Removing duplicate content",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "The goal is not to make the text beautiful. The goal is to ==preserve the meaning and structure needed for retrieval==.",
        },
      ],
    },
    {
      id: "rag-step-3-chunking",
      question: "Step 3 — Chunking",
      tags: ["RAG", "Chunking"],
      answer: [
        {
          type: "text",
          content:
            "Now we reach one of the most important practical decisions in RAG. You usually do __not__ store an entire 200-page document as one single searchable item — instead, you divide it into smaller sections called **chunks**.",
        },
        { type: "heading", content: "Why chunk the document?" },
        {
          type: "text",
          content:
            "Because when a user asks about carryover, the system should retrieve the carryover section — not the entire handbook. Similarly, if the model needs one policy paragraph, we should not send a 200-page document.",
        },
        {
          type: "callout",
          variant: "warn",
          content: "Too much context creates problems: ==higher token cost== among them.",
        },
      ],
    },
    {
      id: "rag-step-4-embeddings",
      question: "Step 4 — Turning chunks into embeddings",
      tags: ["RAG", "Embeddings"],
      answer: [
        {
          type: "text",
          content:
            "After chunking, each chunk is converted into an embedding — a numerical representation of meaning. Each chunk receives a **vector**, a list of numbers representing its semantic meaning.",
        },
        {
          type: "text",
          content: 'The user\'s question is also converted into a vector: "Can unused PTO move to next year?"',
        },
        {
          type: "callout",
          variant: "tip",
          content:
            'Even though the user says __PTO__ and the document says __vacation days__, their meanings are close — so their vectors should also be close. ==That allows semantic retrieval.==',
        },
      ],
    },
    {
      id: "rag-step-5-vector-database",
      question: "Step 5 — Where the embeddings get stored",
      tags: ["RAG", "Vector Database"],
      answer: [
        {
          type: "text",
          content:
            "The embeddings must be stored somewhere. That storage system is commonly called a **vector database**. Popular examples include:",
        },
        {
          type: "list",
          items: ["Pinecone", "Weaviate", "Milvus", "Qdrant", "Chroma", "PostgreSQL with pgvector"],
        },
      ],
    },
    {
      id: "rag-what-happens-at-query-time",
      question: "What happens at query time?",
      tags: ["RAG", "Retrieval"],
      answer: [
        {
          type: "text",
          content:
            'Now the knowledge base is ready. A user asks: "Can unused PTO be transferred to next year?" The system performs several steps.',
        },
        {
          type: "list",
          ordered: true,
          items: [
            "**Embed the question** — the question becomes a vector.",
            "**Search for similar chunks** — the vector database compares the question vector against stored chunk vectors.",
            "**Retrieve the closest matches** — the most semantically related chunks come back.",
          ],
        },
        { type: "heading", content: "Two intelligence layers" },
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
      id: "rag-reranking",
      question: "Reranking — a second, more careful pass over retrieved chunks",
      tags: ["RAG", "Reranking"],
      answer: [
        {
          type: "callout",
          variant: "warn",
          content:
            "A retrieved chunk can look close on the meaning-map but still answer the wrong benefit category — ==vector similarity is powerful, but imperfect==. This is why advanced RAG systems may add a reranker.",
        },
        { type: "heading", content: "What is reranking?" },
        {
          type: "text",
          content:
            "The initial vector search may retrieve ten possible chunks quickly. Then a reranker examines the question and each result more carefully, and rearranges them based on actual relevance.",
        },
        { type: "heading", content: "Think of it like hiring" },
        {
          type: "table",
          headers: ["Round", "What happens"],
          rows: [
            ["First round", "A recruiter selects ten resumes using keywords and broad matching."],
            ["Second round", "A hiring manager reads those ten resumes closely and ranks the best candidates."],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content: "**Vector search** is the fast recruiter. **Reranking** is the careful hiring manager.",
        },
      ],
    },
    {
      id: "rag-hybrid-search",
      question: "Hybrid search — combining keyword and vector search",
      tags: ["RAG", "Hybrid Search"],
      answer: [
        {
          type: "callout",
          variant: "info",
          content: 'One engineer asks: "Should we always use a vector database?"',
        },
        {
          type: "callout",
          variant: "tip",
          content: 'The architect answers: "No. Use the simplest retrieval method that solves the problem."',
        },
        {
          type: "text",
          content:
            "For a small knowledge base, full-text search may be enough. For exact product names or error codes, keyword search may outperform embeddings. For many systems, the strongest approach is __hybrid search__:",
        },
        {
          type: "code",
          language: "text",
          content: `Keyword search
      +
Vector search
      ↓
Combined results`,
        },
        {
          type: "text",
          content:
            "Keyword search is good at exact matches. Vector search is good at semantic meaning. ==Together, they cover each other's weaknesses.==",
        },
      ],
    },
    {
      id: "rag-demo-level-vs-production-level",
      question: "RAG at demo level vs production level",
      tags: ["RAG", "Production"],
      answer: [
        {
          type: "callout",
          variant: "info",
          content: 'A junior engineer says: "So RAG is basically giving ChatGPT some documents?"',
        },
        {
          type: "callout",
          variant: "tip",
          content: 'The senior engineer replies: "At demo level, yes."',
        },
        {
          type: "callout",
          variant: "warn",
          content:
            'Then the architect adds: "At production level, RAG is information retrieval, data engineering, prompt engineering, security, evaluation, and observability working together."',
        },
        {
          type: "text",
          content:
            "That is the real difference. ==Uploading a PDF is easy. Building a reliable enterprise knowledge system is engineering.==",
        },
      ],
    },
    {
      id: "where-rag-stops-and-agents-begin",
      question: "Where RAG stops and agents begin",
      tags: ["RAG", "Agents", "Tool Calling"],
      answer: [
        {
          type: "text",
          content: "RAG allows an AI system to read company knowledge. But what if the user asks:",
        },
        {
          type: "callout",
          variant: "info",
          content: '"Check my vacation balance and submit a leave request for next Friday."',
        },
        { type: "text", content: "Reading a policy is not enough. The AI must:" },
        {
          type: "list",
          items: [
            "Check a live system",
            "Verify available balance",
            "Ask for missing details",
            "Call an API",
            "Submit a request",
            "Return confirmation",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content: "That takes us beyond RAG. It takes us into **tool calling and AI agents**.",
        },
      ],
    },
    {
      id: "most-of-ml-time-goes-into-data",
      question: "Why most of an ML engineer's time goes into the data, not the model",
      tags: ["ML Engineering", "Data Quality"],
      answer: [
        {
          type: "text",
          content:
            "Most of an ML engineer's actual time goes into ==getting the data into a shape the model can even learn from properly==.",
        },
      ],
    },
    {
      id: "missing-data-silent-quality-bug",
      question: "Missing data — the silent data-quality bug",
      tags: ["Data Quality", "Imputation"],
      answer: [
        {
          type: "text",
          content:
            "Real-world data is never clean. Someone skipped a form field, a sensor glitched for an hour, a survey respondent left a question blank. You're rarely handed a spreadsheet of the kind of pristine, complete data used in tutorials, and __how you handle the gaps genuinely changes your results__.",
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "A common fix is **imputation** — filling in a reasonable estimated value instead of deleting the row, commonly the column's average or median.",
        },
      ],
    },
    {
      id: "mean-squared-error-for-regression",
      question: "Mean squared error — the default loss for regression",
      tags: ["Loss Functions", "Regression"],
      answer: [
        {
          type: "text",
          content:
            "For regression problems (predicting a number), the most common loss is **mean squared error** — take the difference between predicted and actual for every example, square it, and average across all examples.",
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "The squaring is deliberate, not incidental: it ==punishes big misses far more harshly than small ones==.",
        },
      ],
    },
    {
      id: "cross-entropy-for-classification",
      question: "Cross-entropy — punishing confident wrongness in classification",
      tags: ["Loss Functions", "Classification"],
      answer: [
        {
          type: "text",
          content:
            "For classification problems, the common loss is **cross-entropy**, which specifically punishes _confident wrongness_ far more than _hesitant wrongness_.",
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
      id: "parameters-vs-hyperparameters",
      question: "Parameters vs. hyperparameters — a distinction that trips everyone up early",
      tags: ["ML Engineering", "Hyperparameters"],
      answer: [
        {
          type: "text",
          content:
            "Hyperparameters, and the practical workflow of actually building a model, start with one distinction: these two terms sound almost identical, but they mean very different things.",
        },
        {
          type: "callout",
          variant: "info",
          content:
            "**Parameters** are the values the model learns _by itself_ during training — the weights in a neural network, the slope in linear regression. You never set these directly; gradient descent finds them for you.",
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "**Hyperparameters** are the settings _you_ choose before training even begins — things like how many trees to build in a random forest, how deep to let a decision tree grow, or how big a step gradient descent takes at each nudge (the **learning rate**).",
        },
        { type: "heading", content: "The student analogy" },
        {
          type: "text",
          content:
            "Think of it like the difference between a student's actual knowledge (**parameters** — built through studying) and the study plan you set for them beforehand: how many hours a day, which textbook, how many practice tests (**hyperparameters** — decided in advance, and they heavily influence how well the studying goes, but they aren't the knowledge itself).",
        },
      ],
    },
    {
      id: "bayesian-optimization-for-hyperparameter-search",
      question: "Bayesian optimization — searching hyperparameters intelligently, not blindly",
      tags: ["Hyperparameters", "Optimization"],
      answer: [
        {
          type: "callout",
          variant: "tip",
          content:
            "**Bayesian optimization** uses the results of earlier trials to intelligently decide which settings to try next, rather than searching blindly.",
        },
      ],
    },
    {
      id: "always-start-with-a-dumb-baseline",
      question: "Always start with a dumb baseline model",
      tags: ["ML Engineering", "Workflow"],
      answer: [
        {
          type: "text",
          content:
            "You pick a baseline model, usually something simple like logistic regression or a small decision tree, and get it working end to end before reaching for anything fancy — this baseline becomes your reference point, so you can actually tell whether a more complex model is ==earning its added complexity== or just adding noise.",
        },
        {
          type: "text",
          content:
            "You train that baseline, evaluate it on the validation set using metrics appropriate to the problem — precision/recall for imbalanced classification, mean squared error for regression — and only then do you start experimenting with more powerful algorithms, tuning hyperparameters, and comparing against that baseline.",
        },
        {
          type: "callout",
          variant: "tip",
          content:
            'The discipline of "get a dumb baseline working first" is one of the most underrated habits in ML, and it\'s deeply QA-flavored: you wouldn\'t write elaborate edge-case tests before confirming the basic happy path even works.',
        },
      ],
    },
    {
      id: "basic-tool-calling-flow",
      question: "A basic tool-calling flow",
      tags: ["Tool Calling", "Agents"],
      answer: [
        {
          type: "text",
          content:
            'Suppose the user asks: "What is the weather in Atlanta?" The model itself may not know the current weather — instead, the application gives it access to a weather tool.',
        },
        {
          type: "code",
          language: "text",
          content: `User request
      ↓
LLM understands the intent
      ↓
LLM chooses the weather tool
      ↓
Application calls weather API
      ↓
Weather API returns data
      ↓
LLM explains the result`,
        },
        { type: "text", content: "The model may receive tool output such as:" },
        {
          type: "code",
          language: "json",
          content: `{
  "city": "Atlanta",
  "temperature_f": 86,
  "condition": "Partly cloudy"
}`,
        },
        {
          type: "text",
          content: "It then converts that structured information into a natural response:",
        },
        {
          type: "callout",
          variant: "info",
          content: "Atlanta is currently 86°F and partly cloudy.",
        },
        {
          type: "callout",
          variant: "tip",
          content: "The model handled ==language==. The API handled ==real-world data==.",
        },
      ],
    },
    {
      id: "cosine-similarity-is-everywhere",
      question: "Cosine similarity is everywhere in AI engineering — not just RAG",
      tags: ["Cosine Similarity", "Vector Search"],
      answer: [
        {
          type: "text",
          content:
            "It's not just a RAG thing. The same one calculation quietly powers a surprising amount of the AI stack:",
        },
        {
          type: "list",
          items: [
            'Every "vector database" you\'ll hear about (Pinecone, Weaviate, pgvector, FAISS) — its entire job, under the hood, is doing this exact calculation, just very fast, across millions of dots instead of 3.',
            'Recommendation systems ("users who liked this also liked...") — same math, comparing a user\'s taste-dot to product-dots.',
            "Semantic search, duplicate-detection, plagiarism checkers, face recognition matching — all secretly running this same formula.",
          ],
        },
        { type: "heading", content: "The graph-paper picture" },
        {
          type: "text",
          content:
            "Picture graph paper. Draw an arrow from the center (0,0) to each of those points. You'll see: Chunk A's arrow points in the exact same direction as the question's arrow, just longer. Chunk B's arrow points somewhere completely different.",
        },
        {
          type: "callout",
          variant: "tip",
          content:
            'That visual — "same direction" vs "different direction" — is the whole ballgame. We want to know ==which chunk\'s arrow points the same way as the question\'s arrow, regardless of length==.',
        },
        { type: "heading", content: "The one sentence that proves you get it" },
        {
          type: "callout",
          variant: "info",
          content:
            "\"Cosine similarity ignores magnitude and only measures the angle between vectors, which is important because it means a short, highly relevant chunk won't lose to a long, loosely related one just because it has bigger numbers.\"",
        },
      ],
    },
  ],
};
