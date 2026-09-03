export type StorySegment = { type: "text"; content: string } | { type: "diagram"; content: string };

// Verbatim source text for the Story-Based section, split only at the
// exact spots where a diagram/image belongs — the wording itself is never
// touched, edited, or reformatted.
export const storyOriginalSegments: StorySegment[] = [
  {
    type: "text",
    content: `the model, typically the model or AI functionality gets exposed through a Python API, and then our frontend or backend applications consume that service.

In our case, we were using FastAPI for some of those Python services.

job as an AI Engineer is more like:
"We take an existing powerful model and make it useful for our company."


That means your Python AI service handles things like business logic, prompts, input validation, tool calls, security, structured output, retries, and integration with the rest of the application.`,
  },
  {
    type: "diagram",
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
  {
    type: "text",
    content: `If Java accidentally sends:

{
  "transaction_amount": "HELLO"
}

we don't want that reaching the model.
With FastAPI, you'll commonly use Pydantic models for this validation.


for GenAI, your Python service could call an existing LLM:

Python AI Service
       ↓
OpenAI / Claude / Gemini
       ↓
LLM Response

For example, your company might send customer complaint text:
"My card was charged twice and nobody has refunded me."
Your Python service constructs the appropriate instruction and sends it to the LLM.


We usually don't blindly return whatever AI gives us
This is another important AI Engineer responsibility.
Suppose the model returns:

0.87342917

Java doesn't necessarily want that.
Your Python code can translate it into:

{
  "risk": "HIGH",
  "confidence": 0.87
}

Or suppose Claude returns a long paragraph.
Your application needs:

{
  "category": "DUPLICATE_CHARGE",
  "priority": "HIGH"
}

Your service makes the AI output predictable and usable by another application.


Business rules can also sit around the AI
Suppose:

Model confidence = 0.94

Maybe your business says:

> 0.90       → HIGH RISK
0.60 - 0.90 → MANUAL REVIEW
< 0.60       → LOW RISK

Your Python service can apply those rules.
So the model provides intelligence.
Your code controls how that intelligence is used.


A good portion of my work is on the Python AI service layer. We normally expose our AI functionality using FastAPI. I handle the incoming request validation and preprocessing, invoke either our ML model or the appropriate LLM depending on the use case, process the model output, apply some application-level business rules, and return a structured JSON response that our application teams can consume.

1. YOUR COMPANY'S AI SERVICE Python + FastAPI + your business code
↓
 2. MODEL The actual intelligence
↓
3. RESULT`,
  },
  {
    type: "diagram",
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
  {
    type: "text",
    content: `The API can technically be 100% healthy while the AI behavior is becoming questionable.
That's why we also monitor things like feature distributions, prediction distributions and model performance over time.



We don't automatically retrain the model just because one metric moved.

First we try to understand why.
Maybe customer behavior genuinely changed.
Maybe an upstream team changed the meaning of one database field.
Maybe a new customer category was introduced.


If the features are correct but predictions have degraded over time, then we start looking more seriously at model performance or drift.

That's probably one of the biggest practical things I've learned working with AI applications:
getting a model to work in Python is one problem; getting the same model to behave reliably with real production application data is a completely different problem.


"The consuming Java/React application doesn't care what algorithm is behind the endpoint. We expose a stable API contract."


For the AI Engineer story, don't spend much time saying:
"I trained Random Forest, normalized features, tuned XGBoost, optimized F1 score..."
That pulls the conversation toward ML Engineer.
Instead, your natural story should gradually sound like:
"Most of my work is on the Python AI-service side. Our existing enterprise applications are primarily Java/React, and they call our AI services through APIs. Within our service, we handle the application context and instructions, interact with LLMs such as GPT or Claude, process and validate their responses, and return structured results back to the application."`,
  },
  {
    type: "diagram",
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
    type: "text",
    content: `Difference is`,
  },
  {
    type: "diagram",
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
];
