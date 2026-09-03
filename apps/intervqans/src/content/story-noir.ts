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
  ],
};
