import type { Block } from "../types";
import { certStudyCards, type CertStudyInput } from "./cert-cards";

const task = (title: string, items: string[]) => ({
  title,
  content: [{ type: "list" as const, items }],
});

/** Official exam guide skills, lightly condensed. */
export const aipC01Syllabus: Block[] = [
  {
    type: "text",
    content: "Tap a domain, then a task, to see its exact skill statements.",
  },
  {
    type: "accordion",
    items: [
      {
        title: "1. Foundation Model Integration, Data Management, and Compliance",
        badge: "31%",
        content: [
          {
            type: "accordion",
            items: [
              task("1.1 Analyze requirements and design GenAI solutions", [
                "Create architectural designs that align with business needs and technical constraints (FMs, integration patterns, deployment strategies)",
                "Develop technical proof-of-concept implementations to validate feasibility, performance and business value (Amazon Bedrock)",
                "Create standardized technical components for consistent implementation (Well-Architected Framework, Generative AI Lens)",
              ]),
              task("1.2 Select and configure FMs", [
                "Assess and choose FMs using performance benchmarks, capability analysis and limitation evaluation",
                "Create architecture patterns for dynamic model selection and provider switching without code changes (Lambda, API Gateway, AWS AppConfig)",
                "Design resilient AI systems (Step Functions circuit breakers, Bedrock Cross-Region Inference, cross-Region deployment, graceful degradation)",
                "Implement FM customization deployment and lifecycle (SageMaker AI fine-tuned models, LoRA/adapters, Model Registry, automated pipelines, rollback, retirement)",
              ]),
              task("1.3 Implement data validation and processing pipelines for FM consumption", [
                "Create data validation workflows (Glue Data Quality, Data Wrangler, Lambda, CloudWatch metrics)",
                "Process complex data types — text, image, audio, tabular (Bedrock multimodal models, SageMaker Processing, Transcribe)",
                "Format input data per model-specific requirements (JSON for Bedrock API requests, conversation formatting)",
                "Enhance input data quality (Bedrock to reformat text, Comprehend to extract entities, Lambda to normalize)",
              ]),
              task("1.4 Design and implement vector store solutions", [
                "Create vector database architectures for semantic retrieval (Bedrock Knowledge Bases, OpenSearch with Neural plugin, RDS + S3, DynamoDB)",
                "Develop metadata frameworks to improve search precision (S3 object metadata, custom attributes, tagging)",
                "Implement high-performance architectures (OpenSearch sharding, multi-index, hierarchical indexing)",
                "Create integration components for document systems, knowledge bases and internal wikis",
                "Design data maintenance systems: incremental updates, change detection, automated sync, scheduled refresh",
              ]),
              task("1.5 Design retrieval mechanisms for FM augmentation", [
                "Develop document segmentation approaches (Bedrock chunking, fixed-size chunking in Lambda, hierarchical chunking)",
                "Select and configure embedding solutions (Amazon Titan embeddings by dimensionality and domain fit; batch embeddings with Lambda)",
                "Deploy vector search (OpenSearch Service, Aurora with pgvector, Bedrock Knowledge Bases)",
                "Create advanced search architectures (semantic, hybrid keyword + vector, Bedrock reranker models)",
                "Develop query handling (Bedrock query expansion, Lambda decomposition, Step Functions transformation)",
                "Create consistent access mechanisms (function calling, MCP clients for vector queries)",
              ]),
              task("1.6 Implement prompt engineering strategies and governance", [
                "Create model instruction frameworks (Bedrock Prompt Management for roles, Guardrails, response templates)",
                "Build interactive systems that maintain context (Step Functions clarification, Comprehend intent, DynamoDB history)",
                "Implement prompt management and governance (parameterized templates, approval workflows, S3 template repos, CloudTrail, CloudWatch Logs)",
                "Develop QA for prompts (Lambda output checks, Step Functions edge-case tests, CloudWatch prompt regression tests)",
                "Refine prompts iteratively (structured inputs, output format specs, chain-of-thought, feedback loops)",
                "Design complex prompt systems (Bedrock Prompt Flows: sequential chains, conditional branching, reusable components)",
              ]),
            ],
          },
        ],
      },
      {
        title: "2. Implementation and Integration",
        badge: "26%",
        content: [
          {
            type: "accordion",
            items: [
              task("2.1 Implement agentic AI solutions and tool integrations", [
                "Develop autonomous systems with memory and state management (Strands Agents, AWS Agent Squad, MCP)",
                "Give FMs structured reasoning (Step Functions to implement ReAct and chain-of-thought)",
                "Develop safeguarded workflows (Step Functions stopping conditions, Lambda timeouts, IAM boundaries, circuit breakers)",
                "Create model coordination systems (specialized FMs, ensemble aggregation, model selection frameworks)",
                "Develop human-collaboration systems (Step Functions review/approval, API Gateway feedback collection)",
                "Implement intelligent tool integrations (Strands API, standardized function definitions, Lambda error handling and parameter validation)",
                "Develop model extension frameworks (stateless MCP servers on Lambda, complex MCP servers on ECS, MCP client libraries)",
              ]),
              task("2.2 Implement model deployment strategies", [
                "Deploy FMs to fit the application (Lambda on-demand invocation, Bedrock provisioned throughput, SageMaker AI endpoints for hybrid)",
                "Address LLM-specific deployment challenges (container patterns optimized for memory, GPU utilization and token processing; model loading strategies)",
                "Balance performance and resources (smaller pre-trained models for specific tasks, API-based model cascading for routine queries)",
              ]),
              task("2.3 Design and implement enterprise integration architectures", [
                "Create enterprise connectivity (API integrations with legacy systems, event-driven architectures, data synchronization)",
                "Enhance existing applications with GenAI (API Gateway microservices, Lambda webhook handlers, EventBridge)",
                "Create secure access frameworks (identity federation, role-based access control, least-privilege API access)",
                "Develop cross-environment solutions for data compliance across jurisdictions (Outposts, Wavelength, secure routing)",
                "Implement CI/CD pipelines and GenAI gateway architectures with security scans and rollback (CodePipeline, CodeBuild)",
              ]),
              task("2.4 Implement FM API integrations", [
                "Create flexible model interaction systems (Bedrock synchronous APIs, SDKs and SQS for asynchronous work, API Gateway request validation)",
                "Develop real-time interaction (Bedrock streaming APIs, WebSockets or server-sent events, chunked transfer encoding)",
                "Create resilient FM systems (SDK exponential backoff, API Gateway rate limiting, fallbacks, X-Ray)",
                "Develop intelligent model routing (static config, Step Functions content-based routing, metric-based routing)",
              ]),
              task("2.5 Implement application integration patterns and development tools", [
                "Create FM API interfaces for GenAI needs (streaming responses, token limit management, retry strategies)",
                "Develop accessible AI interfaces (AWS Amplify, OpenAPI specs, Bedrock Prompt Flows as no-code builders)",
                "Create business system enhancements (CRM via Lambda, Step Functions document processing, Bedrock Data Automation)",
                "Enhance developer productivity (Amazon Q Developer for code generation, refactoring and testing)",
                "Develop advanced GenAI applications (Strands Agents, Agent Squad, Step Functions agent patterns, prompt chaining)",
                "Improve troubleshooting efficiency (CloudWatch Logs Insights on prompts/responses, X-Ray tracing of FM calls)",
              ]),
            ],
          },
        ],
      },
      {
        title: "3. AI Safety, Security, and Governance",
        badge: "20%",
        content: [
          {
            type: "accordion",
            items: [
              task("3.1 Implement input and output safety controls", [
                "Develop content safety systems for harmful inputs (Bedrock Guardrails, custom moderation with Step Functions and Lambda)",
                "Prevent harmful outputs (Guardrails filtering, specialized FM evaluations for toxicity, text-to-SQL for deterministic results)",
                "Reduce hallucinations (Knowledge Base grounding, fact-checking, confidence scoring, semantic similarity, JSON Schema)",
                "Create defense-in-depth safety (Comprehend pre-filters, model-based guardrails, Lambda post-processing, API Gateway response filtering)",
                "Implement advanced threat detection (prompt injection and jailbreak detection, input sanitization, safety classifiers, adversarial testing)",
              ]),
              task("3.2 Implement data security and privacy controls", [
                "Develop protected AI environments (VPC endpoints, IAM policies, Lake Formation, CloudWatch)",
                "Develop privacy-preserving systems (Comprehend and Macie PII detection, Bedrock data privacy features, Guardrails, S3 Lifecycle retention)",
                "Create privacy-focused systems that keep FM utility (data masking, PII detection, anonymization)",
              ]),
              task("3.3 Implement AI governance and compliance mechanisms", [
                "Develop compliance frameworks (SageMaker programmatic model cards, Glue lineage, metadata tagging, CloudWatch decision logs)",
                "Implement data source tracking (Glue Data Catalog, source attribution tags, CloudTrail audit logging)",
                "Create organizational governance aligned with policy, regulation and responsible AI principles",
                "Implement continuous monitoring: misuse/drift/policy violation detection, bias drift monitoring, alerting, token-level redaction, response logging",
              ]),
              task("3.4 Implement responsible AI principles", [
                "Develop transparent AI (reasoning displays, CloudWatch confidence metrics, evidence presentation, Bedrock agent tracing)",
                "Apply fairness evaluations (CloudWatch fairness metrics, Prompt Management/Flows A/B testing, LLM-as-a-judge)",
                "Develop policy-compliant systems (Guardrails per policy, model cards for FM limitations, Lambda compliance checks)",
              ]),
            ],
          },
        ],
      },
      {
        title: "4. Operational Efficiency and Optimization for GenAI Applications",
        badge: "12%",
        content: [
          {
            type: "accordion",
            items: [
              task("4.1 Implement cost optimization and resource efficiency strategies", [
                "Token efficiency: estimation and tracking, context window optimization, prompt compression, context pruning, response limiting",
                "Cost-effective model selection: cost-capability tradeoffs, tiered FM usage by query complexity, price-to-performance measurement",
                "High-performance systems: batching, capacity planning, utilization monitoring, auto-scaling, provisioned throughput optimization",
                "Intelligent caching: semantic caching, result fingerprinting, edge caching, deterministic request hashing, prompt caching",
              ]),
              task("4.2 Optimize application performance", [
                "Responsive AI systems: pre-computation, latency-optimized Bedrock models, parallel requests, response streaming, benchmarking",
                "Enhance retrieval performance: index optimization, query preprocessing, hybrid search with custom scoring",
                "FM throughput optimization: token processing optimization, batch inference, concurrent invocation management",
                "Enhance FM performance: model-specific parameters, A/B testing, temperature and top-k/top-p selection",
                "Efficient resource allocation: token capacity planning, prompt/completion utilization monitoring, GenAI-optimized auto-scaling",
                "Optimize workflows: API call profiling, vector DB query optimization, LLM latency reduction, efficient service communication",
              ]),
              task("4.3 Implement monitoring systems for GenAI applications", [
                "Holistic observability: operational metrics, performance tracing, FM interaction tracing, business impact dashboards",
                "GenAI monitoring: CloudWatch token usage, prompt effectiveness, hallucination rates, response quality; anomaly detection; Bedrock Model Invocation Logs; cost anomaly detection",
                "Integrated observability: dashboards, compliance monitoring, forensic traceability, user interaction and model behavior tracking",
                "Tool performance frameworks: call pattern tracking, tool-calling observability, multi-agent coordination tracking, usage baselines",
                "Vector store operations: performance monitoring, automated index optimization, data quality validation",
                "FM troubleshooting frameworks: golden datasets to detect hallucinations, output diffing, reasoning path tracing",
              ]),
            ],
          },
        ],
      },
      {
        title: "5. Testing, Validation, and Troubleshooting",
        badge: "11%",
        content: [
          {
            type: "accordion",
            items: [
              task("5.1 Implement evaluation systems for GenAI", [
                "Assessment frameworks beyond traditional ML: relevance, factual accuracy, consistency, fluency",
                "Systematic model evaluation: Bedrock Model Evaluations, A/B and canary testing, multi-model evaluation, cost-performance analysis",
                "User-centered evaluation: feedback interfaces, rating systems, annotation workflows",
                "QA processes: continuous evaluation, regression testing for outputs, automated quality gates for deployments",
                "Multi-perspective assessment: RAG evaluation, LLM-as-a-judge, human feedback collection",
                "Retrieval quality testing: relevance scoring, context matching verification, retrieval latency",
                "Agent performance frameworks: task completion rate, tool usage effectiveness, Bedrock Agent evaluations, reasoning quality",
                "Reporting systems: visualization, automated reporting, model comparison views",
                "Deployment validation: synthetic user workflows, hallucination-rate and semantic-drift validation, response consistency checks",
              ]),
              task("5.2 Troubleshoot GenAI applications", [
                "Resolve content handling issues: context window overflow diagnostics, dynamic chunking, truncation error analysis",
                "Diagnose FM integration issues: error logging, request validation, response analysis",
                "Troubleshoot prompt engineering problems: prompt testing frameworks, version comparison, systematic refinement",
                "Troubleshoot retrieval issues: relevance analysis, embedding quality diagnostics, drift monitoring, chunking and preprocessing remediation",
                "Troubleshoot prompt maintenance: template testing, CloudWatch Logs, X-Ray prompt observability, schema validation",
              ]),
            ],
          },
        ],
      },
    ],
  },
];

const aipC01: CertStudyInput = {
  code: "AIP-C01",
  examName: "AWS Certified Generative AI Developer – Professional (AIP-C01)",

  concepts: [
    {
      title: "Designing GenAI solutions & proving them with a PoC",
      domain: "Domain 1 · 31%",
      oneLiner: "Start from business needs and constraints, validate feasibility cheaply, then standardize what works.",
      visual: {
        type: "flow",
        title: "From idea to standard",
        direction: "horizontal",
        nodes: [
          { label: "Requirements", sub: "business + technical", tone: "sky" },
          { label: "Architecture", sub: "FMs, patterns, deployment", tone: "gold" },
          { label: "PoC on Bedrock", sub: "feasibility, performance, value", tone: "mint" },
          { label: "Standard components", sub: "Well-Architected GenAI Lens", tone: "ember" },
        ],
      },
      points: [
        "Architect around **FMs, integration patterns and deployment strategy** that fit constraints (cost, latency, compliance)",
        "Build a **proof of concept** before full deployment to check feasibility, performance and business value",
        "Create **reusable, standardized components** guided by the **AWS Well-Architected Framework and its Generative AI Lens**",
      ],
      examTip: "“Validate before committing budget” ⇒ a scoped **PoC on Amazon Bedrock**.",
    },
    {
      title: "Model selection, switching & resilience",
      domain: "Domain 1 · 31%",
      oneLiner: "Don’t hard-code one model — make selection dynamic and keep serving through outages.",
      points: [
        "Choose FMs with **benchmarks, capability analysis and limitation evaluation** against the use case",
        "**Dynamic model selection / provider switching without code changes:** Lambda + API Gateway + **AWS AppConfig**",
        "Resilience: **Step Functions circuit breakers**, **Bedrock Cross-Region Inference** (for models with limited regional availability), cross-Region deployment, **graceful degradation**",
        "Customized models: deploy **fine-tuned models on SageMaker AI**, use **LoRA/adapters** (parameter-efficient), version in **Model Registry**, automate updates with **rollback** and retire old models",
      ],
      examTip: "Change the model without redeploying code ⇒ configuration-driven routing with **AppConfig**.",
    },
    {
      title: "RAG architecture end to end",
      domain: "Domain 1 · 31%",
      oneLiner: "Quality RAG is chunking + embeddings + the right store + smart retrieval — not just “add a vector DB”.",
      visual: {
        type: "table",
        headers: ["Layer", "Options & considerations"],
        rows: [
          ["Chunking", "Bedrock chunking (fixed-size, hierarchical), custom Lambda for structure-aware splits"],
          ["Embeddings", "Amazon Titan embeddings — choose by dimensionality and domain fit; batch-generate with Lambda"],
          ["Vector store", "Bedrock Knowledge Bases (managed), OpenSearch Service, Aurora with pgvector, RDS + S3, DynamoDB for metadata"],
          ["Search", "Semantic, **hybrid** (keyword + vector), **Bedrock reranker models**"],
          ["Query handling", "Query expansion (Bedrock), decomposition (Lambda), transformation (Step Functions)"],
          ["Access", "Function calling or **MCP** clients for vector queries"],
        ],
      },
      points: [
        "**Metadata** (timestamps, author, domain tags) improves precision and context",
        "**Keep it fresh:** incremental updates, change detection, scheduled refresh",
        "Scale OpenSearch with **sharding and multi-index/hierarchical indexing**",
      ],
      examTip: "Users search both exact terms and concepts ⇒ **hybrid search + a reranker**.",
    },
    {
      title: "Prompt engineering & governance at scale",
      domain: "Domain 1 · 31%",
      oneLiner: "Treat prompts like code: templated, versioned, approved, tested — and composed into flows.",
      points: [
        "**Bedrock Prompt Management:** parameterized templates, role definitions, versions and **approval workflows**",
        "**Bedrock Guardrails** enforce responsible-AI rules; templates enforce response formats",
        "**Prompt Flows:** sequential prompt chains, **conditional branching**, reusable components, pre/post-processing",
        "Improve beyond basics: structured inputs, **output format specs, chain-of-thought patterns, feedback loops**",
        "Govern: templates in **S3**, usage tracked with **CloudTrail**, access logged in **CloudWatch Logs**",
        "Quality assurance: **Lambda output checks, Step Functions edge-case tests, CloudWatch prompt regression tests**",
        "Multi-turn systems: keep **conversation history in DynamoDB**, use Comprehend for intent, Step Functions for clarification flows",
      ],
      examTip: "Need approvals and version history for prompts ⇒ **Bedrock Prompt Management**.",
    },
    {
      title: "Agents, tools & MCP",
      domain: "Domain 2 · 26%",
      oneLiner: "Agents plan and act — so give them memory, tools, coordination and hard safety limits.",
      points: [
        "Frameworks: **Strands Agents** and **AWS Agent Squad** (multi-agent); **MCP** standardizes agent–tool interaction",
        "**ReAct and chain-of-thought** patterns can be implemented with **Step Functions**",
        "Safeguards: **stopping conditions, Lambda timeouts, IAM policies as resource boundaries, circuit breakers**",
        "**Stateless MCP servers on Lambda** for lightweight tools; **MCP servers on ECS** for complex tools",
        "Tools need **standardized function definitions**, parameter validation and error handling",
        "**Human-in-the-loop:** Step Functions review/approval steps and feedback collection via API Gateway",
        "Coordinate **multiple specialized FMs** with model-selection frameworks or ensemble/aggregation logic",
      ],
      examTip: "Agent must never run forever or exceed permissions ⇒ **stop conditions + timeouts + IAM boundaries**.",
    },
    {
      title: "Deployment & API integration patterns",
      domain: "Domain 2 · 26%",
      oneLiner: "Pick the invocation and deployment model from the workload — and make the API layer resilient.",
      visual: {
        type: "table",
        headers: ["Need", "Pattern"],
        rows: [
          ["Sporadic, on-demand calls", "Lambda invoking Bedrock on demand"],
          ["Consistent high throughput / custom models", "Bedrock **provisioned throughput**"],
          ["Hybrid or self-hosted control", "SageMaker AI endpoints"],
          ["Immediate incremental output", "Bedrock **streaming APIs** + WebSockets/SSE"],
          ["Non-blocking work", "SQS + SDK for asynchronous processing"],
          ["Survive throttling", "Exponential backoff, rate limiting, fallbacks, X-Ray tracing"],
        ],
      },
      points: [
        "**LLM deployments differ from classic ML:** memory, GPU use and token-processing capacity drive container design",
        "Reduce cost: **smaller task-specific models**, and **cascading** — cheap model for routine queries, escalate to a larger one",
        "**Model routing:** static config, Step Functions content-based routing, or metric-driven",
        "**Enterprise integration:** API Gateway and Lambda webhooks, **EventBridge** event-driven loose coupling, identity federation, least-privilege API access, **Outposts/Wavelength** for data residency and edge",
        "**CI/CD and GenAI gateways** (CodePipeline, CodeBuild) with security scans and rollback",
      ],
      examTip: "Users need words to appear as they’re generated ⇒ **streaming API** (WebSockets/SSE).",
    },
    {
      title: "Safety controls & defense in depth",
      domain: "Domain 3 · 20%",
      oneLiner: "No single filter is enough — layer input checks, model guardrails, and output validation.",
      visual: {
        type: "flow",
        title: "Defense in depth",
        direction: "horizontal",
        nodes: [
          { label: "Pre-filter", sub: "Comprehend, API Gateway", tone: "sky" },
          { label: "Guardrails", sub: "model-based controls", tone: "gold" },
          { label: "Post-validation", sub: "Lambda checks", tone: "mint" },
          { label: "Response filtering", tone: "ember" },
        ],
      },
      points: [
        "**Bedrock Guardrails** filter harmful inputs and outputs; custom moderation via **Step Functions + Lambda**",
        "**Reduce hallucinations:** ground with **Knowledge Bases**, fact-check, **confidence scoring**, semantic similarity checks, **JSON Schema** to enforce structure",
        "**Text-to-SQL** patterns give deterministic results for data questions",
        "**Threat detection:** prompt-injection and jailbreak detection, input sanitization, safety classifiers, **automated adversarial testing**",
      ],
      examTip: "Bedrock Guardrails can protect content from any model or agent flow — apply them at input **and** output.",
    },
    {
      title: "Privacy, governance & responsible AI",
      domain: "Domain 3 · 20%",
      oneLiner: "Protect data, prove where answers came from, and keep decisions auditable and fair.",
      points: [
        "**Protected environments:** **VPC endpoints**, IAM policies, **Lake Formation** for granular data access, CloudWatch monitoring",
        "**PII:** detect with **Comprehend and Macie**, filter with guardrails, mask/anonymize, enforce retention via **S3 lifecycle**",
        "**Compliance & lineage:** SageMaker **programmatic model cards**, **AWS Glue** lineage and Data Catalog, metadata tagging for source attribution, **CloudTrail** audit logs",
        "**Continuous governance:** misuse/drift/policy-violation detection, **bias drift monitoring**, alerting and remediation, token-level redaction",
        "**Transparency:** reasoning displays, confidence metrics, evidence/source citations, **Bedrock agent tracing**",
        "**Fairness:** metrics in CloudWatch, **A/B testing with Prompt Management/Flows**, **LLM-as-a-judge** evaluations",
      ],
      examTip: "Show users which document an answer came from ⇒ **source attribution** via metadata + citations.",
    },
    {
      title: "Cost & performance optimization",
      domain: "Domain 4 · 12%",
      oneLiner: "Tokens are the meter — cut waste, right-size models, cache, and balance latency against cost.",
      points: [
        "**Token efficiency:** estimate and track tokens, **prompt compression, context pruning, response limits**",
        "**Tiered model use:** cheap model for simple queries, stronger model for complex ones; measure **price-to-performance**",
        "**Caching:** **prompt caching, semantic caching**, request fingerprinting/hashing, edge caching — avoid unnecessary invocations",
        "**Throughput:** batching, capacity planning, autoscaling, **provisioned throughput** optimization",
        "**Latency:** pre-computation, latency-optimized Bedrock models, **parallel requests**, response streaming",
        "**Tune parameters:** temperature, top-k/top-p; verify improvements with **A/B testing**",
        "Optimize retrieval: index optimization, query preprocessing, hybrid search scoring",
      ],
      examTip: "Repeated similar questions driving cost ⇒ **semantic caching** (and prompt caching for shared prefixes).",
    },
    {
      title: "Evaluate, monitor & troubleshoot",
      domain: "Domain 4 & 5 · 23%",
      oneLiner: "GenAI needs its own evaluation, observability and failure-mode playbook — beyond classic ML metrics.",
      points: [
        "**Evaluate:** relevance, factual accuracy, consistency, fluency; **Bedrock Model Evaluations**, **A/B and canary testing**, **LLM-as-a-judge**, human feedback and rating interfaces",
        "**RAG evaluation:** relevance scoring, context matching, retrieval latency; **agents:** task completion rate, tool-usage effectiveness, reasoning quality",
        "**Quality gates:** regression tests, continuous evaluation, automated checks before deployment; synthetic user workflows to validate updates",
        "**Observe:** CloudWatch token usage, prompt effectiveness, hallucination rate; **Bedrock Model Invocation Logs**; X-Ray and FM interaction tracing; cost and anomaly detection",
        "**Unique GenAI failures:** use **golden datasets** to catch hallucinations, output diffing for consistency, reasoning-path tracing",
        "**Troubleshoot:** context-window overflow and truncation, API integration errors, prompt regressions, retrieval issues (embedding quality, chunking, drift)",
      ],
      examTip: "Suspect hallucinations after a change ⇒ run a **golden dataset** regression before and after.",
    },
  ],

  quiz: [
    {
      q: "A company is unsure a GenAI assistant can meet accuracy and latency goals. What should it do before full-scale development?",
      options: [
        "Build a scoped proof of concept on Amazon Bedrock",
        "Buy provisioned throughput for the whole company",
        "Fine-tune a model immediately",
        "Skip validation and launch",
      ],
      answer: 0,
      explanation:
        "A **PoC** validates feasibility, performance and business value cheaply before committing to full deployment.",
    },
    {
      q: "A team wants to switch between foundation models per request without redeploying application code. Which approach fits?",
      options: [
        "Hard-code each model ID in the source",
        "Configuration-driven model selection using Lambda, API Gateway and AWS AppConfig",
        "Rebuild the container each time",
        "Use a single model forever",
      ],
      answer: 1,
      explanation:
        "**AppConfig** (with Lambda/API Gateway) makes model selection a runtime configuration change, enabling dynamic switching and provider changes.",
    },
    {
      q: "Users search a knowledge base using both exact product codes and natural-language questions. Which retrieval design best improves relevance?",
      options: [
        "Vector search only with no metadata",
        "Keyword search only",
        "Hybrid search (keyword + vector) with a reranker model",
        "Random document sampling",
      ],
      answer: 2,
      explanation:
        "**Hybrid search** combines exact and semantic matching; a **reranker** reorders results for relevance.",
    },
    {
      q: "A compliance team needs approval workflows and version history for prompts used across applications. Which service fits?",
      options: [
        "Amazon Macie",
        "AWS Config",
        "Amazon Comprehend",
        "Amazon Bedrock Prompt Management",
      ],
      answer: 3,
      explanation:
        "**Prompt Management** provides parameterized templates, versioning and approval workflows for governed prompt use.",
    },
    {
      q: "An autonomous agent must never loop indefinitely or access resources outside its scope. Which combination enforces this?",
      options: [
        "Higher temperature and larger context",
        "Stopping conditions, timeouts, and IAM policies as resource boundaries",
        "More agents running in parallel",
        "Removing tool validation",
      ],
      answer: 1,
      explanation:
        "Safeguarded workflows use **Step Functions stopping conditions, Lambda timeouts, IAM boundaries and circuit breakers**.",
    },
    {
      q: "A chat app should display model text as it is generated. Which approach should the developer use?",
      options: [
        "Bedrock batch inference",
        "A single blocking request with a long timeout",
        "Bedrock streaming APIs delivered over WebSockets or server-sent events",
        "Nightly report generation",
      ],
      answer: 2,
      explanation:
        "**Streaming APIs** deliver incremental output, and WebSockets/SSE push it to the client in real time.",
    },
    {
      q: "A team wants layered protection against harmful prompts and unsafe answers. Which design is best?",
      options: [
        "A single keyword blocklist",
        "Trust the model to self-police",
        "Disable logging",
        "Pre-filtering, Bedrock Guardrails, and post-processing validation",
      ],
      answer: 3,
      explanation:
        "**Defense in depth** layers input pre-filters, model-based guardrails and output validation so no single control is a single point of failure.",
    },
    {
      q: "A company must detect PII in documents stored in S3 and in text sent to a model. Which services help?",
      options: [
        "Amazon Macie for S3 data and Amazon Comprehend for PII detection in text",
        "AWS Budgets and Cost Explorer",
        "Amazon Polly and Transcribe",
        "AWS CodeBuild",
      ],
      answer: 0,
      explanation:
        "**Macie** discovers sensitive data in S3; **Comprehend** detects PII in text. Guardrails can also filter outputs.",
    },
    {
      q: "An application sends many near-identical questions and Bedrock costs are rising. What most directly reduces invocations?",
      options: [
        "Increase the temperature",
        "Semantic caching of prior responses",
        "Use a larger model",
        "Remove response limits",
      ],
      answer: 1,
      explanation:
        "**Semantic caching** returns stored answers for equivalent queries, avoiding unnecessary FM invocations (prompt caching also cuts repeated-prefix cost).",
    },
    {
      q: "After a prompt change the team suspects more hallucinations. What is the most reliable way to check?",
      options: [
        "Ask a few colleagues informally",
        "Look at latency dashboards only",
        "Increase max tokens",
        "Run a golden dataset regression and compare outputs before and after",
      ],
      answer: 3,
      explanation:
        "**Golden datasets and regression tests** with output comparison reveal hallucination and consistency changes objectively.",
    },
  ],
};

export const aipC01StudyCards = certStudyCards(aipC01);
