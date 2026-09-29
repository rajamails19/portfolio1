import { certStudyCards, type CertStudyInput } from "./cert-cards";

const ai103: CertStudyInput = {
  code: "AI-103",
  examName: "Azure AI Apps and Agents Developer (AI-103)",

  concepts: [
    {
      title: "Microsoft Foundry — the platform map",
      domain: "Plan & manage · 25–30%",
      oneLiner:
        "Foundry is the one place you pick models, build apps and agents, apply safety, and monitor them — organized as resources and projects.",
      visual: {
        type: "flow",
        title: "How the pieces fit",
        direction: "horizontal",
        nodes: [
          { label: "Foundry resource", sub: "security, networking, quota", tone: "sky" },
          { label: "Project", sub: "your app’s workspace", tone: "gold" },
          { label: "Models", sub: "catalog + deployments", tone: "mint" },
          { label: "Agents & tools", tone: "ember" },
        ],
      },
      points: [
        "A **project** groups the models, agents, data connections and evaluations for one solution; apps connect to a project endpoint",
        "**Foundry Tools** are the prebuilt AI capabilities (Vision, Language, Speech, Translator, Document Intelligence, Content Understanding)",
        "Integrate projects with **CI/CD** so model and agent configuration is versioned and promoted through environments",
        "Design infrastructure for AI apps around **regions, quotas, networking and identity** up front",
      ],
      examTip: "“Where do I manage models, agents and safety for one app?” ⇒ the Foundry **project**.",
    },
    {
      title: "Choosing the right model & deployment",
      domain: "Plan & manage · 25–30%",
      oneLiner: "Match model and deployment type to the task, latency, cost and volume — bigger isn’t automatically better.",
      visual: {
        type: "table",
        headers: ["Need", "Lean toward"],
        rows: [
          ["Complex reasoning, long context", "Large LLM / reasoning model"],
          ["Simple, high-volume, low-latency tasks", "Small language model (SLM)"],
          ["Images, audio or video in the prompt", "Multimodal model"],
          ["Predictable latency at steady high volume", "Provisioned throughput deployment"],
          ["Variable or low volume", "Pay-as-you-go (standard) deployment"],
        ],
      },
      points: [
        "Choose per task — a **hybrid** (small model for routing, large for hard cases) often beats one model everywhere",
        "Watch **quotas and rate limits** (tokens per minute); plan scaling and cost footprints before launch",
        "Configure **model and agent deployments** as code so they’re reproducible",
      ],
      examTip: "Steady, latency-sensitive production traffic ⇒ provisioned throughput. Spiky/small ⇒ standard.",
    },
    {
      title: "RAG with Azure AI Search",
      domain: "Generative AI & agents · 30–35%",
      oneLiner:
        "Retrieval-augmented generation grounds the model in your data: search first, then answer from the retrieved passages.",
      visual: {
        type: "table",
        headers: ["Search type", "Strength"],
        rows: [
          ["Keyword (full-text)", "Exact terms, IDs, product names"],
          ["Vector", "Meaning-based match via embeddings"],
          ["Hybrid", "Keyword + vector together — best default for recall"],
          ["Semantic ranking", "Re-ranks top results for relevance"],
        ],
      },
      points: [
        "**Ingest → chunk → enrich → embed → index**; **indexers and skillsets** automate ingestion and enrichment (OCR, layout, entities)",
        "Ground answers on retrieved chunks and **cite sources** to reduce fabrication",
        "Monitor **index health, ingestion quality and relevance** — a stale index quietly ruins answers",
        "Connect the retrieval pipeline directly to **agent tools** and workflows",
      ],
      examTip: "Users search with exact codes __and__ natural language ⇒ **hybrid** search (+ semantic ranking).",
    },
    {
      title: "Building agents in Foundry",
      domain: "Generative AI & agents · 30–35%",
      oneLiner: "An agent = a model + instructions + tools + memory, working toward a goal across multiple steps.",
      points: [
        "Define the agent’s **role, goal, conversation-tracking approach and tool schemas** up front",
        "Typical **tools**: function calling, file/knowledge search, Azure AI Search, code execution, web grounding, OpenAPI/MCP-style connectors",
        "Give agents **conversation memory** so context carries across turns",
        "**Multi-agent** solutions: an orchestrator delegates to specialist agents",
        "Semi-autonomous flows need **safeguards and approval steps** before high-impact actions",
        "**Trace and evaluate** deployed agents — analyze errors, wrong tool calls and loops",
      ],
      examTip: "Agent takes risky actions unsupervised ⇒ add approval flow controls and tool-access constraints.",
    },
    {
      title: "Content safety & responsible AI",
      domain: "Plan & manage · 25–30%",
      oneLiner: "Layered protection: filter inputs and outputs, detect attacks, verify grounding, and keep an audit trail.",
      visual: {
        type: "table",
        headers: ["Control", "What it does"],
        rows: [
          ["Content filters", "Block harmful categories (hate, sexual, violence, self-harm) by severity"],
          ["Prompt shields", "Detect jailbreaks and indirect prompt injection in documents/images"],
          ["Groundedness detection", "Flag answers not supported by the source material"],
          ["Protected material detection", "Catch copyrighted text/code in output"],
          ["Safety evaluations", "Test the system with adversarial and harmful prompts before release"],
        ],
      },
      points: [
        "**Indirect prompt injection** hides instructions in content the model reads (web pages, files, text inside images)",
        "Govern agents with **oversight modes, constraints and tool-access controls**",
        "Implement **auditing**: trace logging, provenance metadata, approval workflows",
      ],
      examTip: "Attack instructions embedded in a retrieved document ⇒ **prompt shields** (indirect injection).",
    },
    {
      title: "Security, identity & monitoring",
      domain: "Plan & manage · 25–30%",
      oneLiner: "Prefer identities over secrets, isolate the network, and watch quality, drift and cost in production.",
      points: [
        "Use **managed identity / Microsoft Entra ID (keyless)** instead of API keys wherever possible",
        "**Least-privilege role assignments** for people and services",
        "**Private networking** (private endpoints/VNet) keeps model and data traffic off the public internet",
        "Manage **quotas, scaling, rate limits and cost** for model and agent workloads",
        "Monitor **model performance, drift, safety events and grounding quality**, plus search **index health**",
        "Set up **observability**: tracing, token analytics, safety signals, latency breakdowns",
      ],
      examTip: "“Avoid storing keys in app config” ⇒ managed identity with keyless authentication.",
    },
    {
      title: "Evaluating & optimizing GenAI apps",
      domain: "Generative AI & agents · 30–35%",
      oneLiner: "You can’t improve what you don’t measure — evaluate quality and safety systematically, then tune.",
      visual: {
        type: "table",
        headers: ["Evaluator", "Checks"],
        rows: [
          ["Groundedness", "Is the answer supported by the provided context?"],
          ["Relevance", "Does it actually answer the question?"],
          ["Coherence / fluency", "Is it well-formed and readable?"],
          ["Similarity", "How close to a reference answer?"],
          ["Safety", "Harmful, biased or policy-violating output?"],
        ],
      },
      points: [
        "Tune generation: **prompt engineering**, temperature and other model parameters",
        "Techniques: **reflection, chain-of-thought evaluation and self-critique loops**",
        "Detect **fabrications** (hallucinations) and analyze failures with tracing",
        "Orchestrate **multiple models or hybrid LLM + rules engines** when one call isn’t enough",
      ],
      examTip: "Answers sound fluent but contradict the sources ⇒ low **groundedness**; fix retrieval/prompt.",
    },
    {
      title: "Computer vision & multimodal solutions",
      domain: "Computer vision · 10–15%",
      oneLiner: "Generate and edit images/video, understand visual content, and keep visual output safe.",
      points: [
        "**Generation:** images and video from text prompts and reference media",
        "**Editing:** inpainting, mask-based edits and prompt-driven modification",
        "**Understanding:** multimodal models produce captions, alt-text, and answer questions grounded in the image",
        "**Content Understanding** analyzers extract structured details from images and video, in single-task or pro modes",
        "**Responsible use:** filters for unsafe visuals, defense against **prompt injection hidden as text in images**, visual policy rules (watermarks, brand rules)",
      ],
      examTip: "Accessibility requirement ⇒ generate **alt-text / extended descriptions** with a multimodal model.",
    },
    {
      title: "Text analysis & speech",
      domain: "Text analysis · 10–15%",
      oneLiner: "Extract meaning from text and audio — with prebuilt language services or by prompting an LLM.",
      visual: {
        type: "table",
        headers: ["Task", "Typical approach"],
        rows: [
          ["Entities, sentiment, PII, summaries", "Azure Language, or LLM prompting to structured JSON"],
          ["Translate text", "Azure Translator, or LLM-powered translation"],
          ["Speech → text / text → speech", "Azure Speech (custom speech models for domain terms)"],
          ["Speech translation", "Speech + translation models"],
        ],
      },
      points: [
        "Prompt the LLM to return **structured JSON** for entities, topics and summaries",
        "Detect **tone, safety issues and sensitive content**",
        "Speech can be an **agent modality** — voice in, voice out",
      ],
      examTip: "Domain jargon mis-transcribed ⇒ **custom speech** model.",
    },
    {
      title: "Information extraction & document pipelines",
      domain: "Information extraction · 10–15%",
      oneLiner: "Turn documents, images, audio and video into clean, structured, grounded data for agents and RAG.",
      visual: {
        type: "flow",
        title: "Extraction to retrieval",
        direction: "horizontal",
        nodes: [
          { label: "Raw content", sub: "docs, images, audio, video", tone: "sky" },
          { label: "OCR + layout + fields", tone: "gold" },
          { label: "Structured / markdown output", tone: "mint" },
          { label: "Index & ground agents", tone: "ember" },
        ],
      },
      points: [
        "**Multimodal pipelines** combine OCR, layout analysis and field extraction",
        "**Content Understanding** analyzers output structured data or markdown for downstream reasoning",
        "Enrich at ingestion with **built-in or custom skills** for text, images and layout",
        "Feed the result into **semantic, hybrid or vector search** so agents can ground on it",
      ],
      examTip: "Scanned invoices with tables ⇒ OCR + layout + field extraction (Document Intelligence / Content Understanding).",
    },
  ],

  quiz: [
    {
      q: "A team wants one Foundry workspace that holds the models, agents, data connections and evaluations for a single application. Which construct fits?",
      options: [
        "A Foundry project",
        "A virtual network",
        "A resource group tag",
        "A search index",
      ],
      answer: 0,
      explanation:
        "A **Foundry project** groups the assets and configuration for one solution; applications connect to its endpoint.",
    },
    {
      q: "A production chatbot has steady, high, latency-sensitive traffic. Which deployment approach is the best fit?",
      options: [
        "Pay-as-you-go deployment with no quota planning",
        "Provisioned throughput",
        "Batch-only processing",
        "A larger prompt",
      ],
      answer: 1,
      explanation:
        "**Provisioned throughput** gives predictable latency and capacity for steady, high-volume workloads. Standard pay-as-you-go suits variable or low volume.",
    },
    {
      q: "Users search a product catalog with both exact part numbers and natural-language descriptions. Which Azure AI Search approach gives the best results?",
      options: [
        "Keyword search only",
        "Vector search only",
        "Hybrid search (keyword + vector), optionally with semantic ranking",
        "Sorting results alphabetically",
      ],
      answer: 2,
      explanation:
        "Exact identifiers favor keyword matching; descriptions favor vectors. **Hybrid** combines both, and semantic ranking re-orders the top results.",
    },
    {
      q: "An agent that can issue refunds runs semi-autonomously. What should be added to reduce risk?",
      options: [
        "A higher temperature",
        "More tools with broader permissions",
        "Removal of conversation memory",
        "Approval flow controls and tool-access constraints for high-impact actions",
      ],
      answer: 3,
      explanation:
        "Governing agents means **oversight modes, constraints and approval steps** before impactful actions, not more freedom.",
    },
    {
      q: "A retrieved web page contains hidden text telling the model to ignore its instructions and leak data. Which control addresses this?",
      options: [
        "Increasing max output tokens",
        "Switching to a smaller model",
        "Prompt shields for indirect prompt injection",
        "Adding a second search index",
      ],
      answer: 2,
      explanation:
        "Malicious instructions hidden in content the model reads are **indirect prompt injection**, detected by prompt shields.",
    },
    {
      q: "A team wants to avoid storing API keys in the application configuration. What should they use?",
      options: [
        "Managed identity with keyless authentication and least-privilege roles",
        "Embed the key in an environment variable in source control",
        "Share one key across all apps",
        "Disable authentication on the endpoint",
      ],
      answer: 0,
      explanation:
        "**Managed identity / Entra ID** removes secrets from configuration; pair it with least-privilege role assignments.",
    },
    {
      q: "Model answers read fluently but contradict the retrieved documents. Which evaluator best exposes this problem?",
      options: [
        "Fluency",
        "Groundedness",
        "Coherence",
        "Latency",
      ],
      answer: 1,
      explanation:
        "**Groundedness** measures whether the answer is supported by the provided context — fluency can be high even when facts are wrong.",
    },
    {
      q: "An app must generate accessible descriptions of product photos for screen-reader users. What is the best approach?",
      options: [
        "Use OCR only",
        "Store the image filenames as text",
        "Use a translation model",
        "Use a multimodal model to generate alt-text and extended descriptions",
      ],
      answer: 3,
      explanation:
        "Multimodal models analyze visual context and can produce **alt-text and extended descriptions** aligned with accessibility guidelines.",
    },
    {
      q: "A call-center assistant mis-transcribes company-specific product names. Which improvement is most direct?",
      options: [
        "Increase the temperature",
        "Use a custom speech model tuned to the vocabulary",
        "Translate the audio first",
        "Reduce audio quality",
      ],
      answer: 1,
      explanation:
        "**Custom speech** adapts recognition to domain terms, names and accents.",
    },
    {
      q: "A firm must turn thousands of scanned invoices (with tables) into structured data for an agent. Which pipeline fits best?",
      options: [
        "Copy the PDFs into a chat prompt",
        "Keyword search over image filenames",
        "A multimodal extraction pipeline combining OCR, layout analysis and field extraction",
        "Fine-tune an image-generation model",
      ],
      answer: 2,
      explanation:
        "**OCR + layout + field extraction** (Document Intelligence / Content Understanding analyzers) produces clean structured or markdown output ready for RAG and agents.",
    },
  ],
};

export const ai103StudyCards = certStudyCards(ai103);
