import type { Block } from "../types";
import { certStudyCards, type CertStudyInput } from "./cert-cards";

const task = (title: string, items: string[]) => ({
  title,
  content: [{ type: "list" as const, items }],
});

/** Official exam guide (as of June 1, 2026): 6 sections, each with tasks and "considerations". */
export const pmleSyllabus: Block[] = [
  {
    type: "callout",
    variant: "info",
    content:
      "Weights are the approximate percentages Google publishes per section. The guide calls the platform **Gemini Enterprise Agent Platform** (formerly Vertex AI).",
  },
  {
    type: "accordion",
    items: [
      {
        title: "1. Architecting low-code AI solutions",
        badge: "~13%",
        content: [
          {
            type: "accordion",
            items: [
              task("1.1 Develop ML models using BigQuery ML or AutoML", [
                "Build models in BigQuery ML or Agent Platform AutoML (classification, regression, forecasting, clustering) based on the business problem",
                "Perform feature engineering or selection using BigQuery ML",
                "Generate predictions using BigQuery ML",
                "Train models using Agent Platform AutoML",
                "Fine-tune Gemini models using BigQuery",
              ]),
              task("1.2 Build AI solutions using Google Cloud AI APIs or foundation models", [
                "Evaluate and select the appropriate model for a task from Model Garden",
                "Build applications using industry-specific APIs (Document AI, Vision, Translate)",
                "Build solutions and tune models for specific use cases (Gemini, Imagen, Veo, models as a service in Model Garden)",
                "Optimize Gemini-based applications for cost, latency and availability",
              ]),
            ],
          },
        ],
      },
      {
        title: "2. Collaborating within and across teams to manage data and models",
        badge: "~16%",
        content: [
          {
            type: "accordion",
            items: [
              task("2.1 Explore and preprocess data for ML", [
                "Organize and explore different data types (tabular, text, images) for efficient experimenting, training and serving",
                "Choose the right preprocessing tool for scale and complexity (BigQuery SQL, Dataflow, Apache Spark, in-memory Python)",
                "Create and consolidate features in Agent Platform Feature Store",
                "Ensure data privacy and handle sensitive information (PII)",
              ]),
              task("2.2 Prototype models using notebooks", [
                "Apply collaboration and security best practices when setting up and running notebook environments",
                "Develop models in Workbench or Colab Enterprise using common frameworks (PyTorch, scikit-learn, JAX)",
                "Use foundational and open-source models in Model Garden to create prototypes",
              ]),
              task("2.3 Track and run ML experiments", [
                "Choose the appropriate Google Cloud environment for development and experimentation (Experiments, Agent Platform Pipelines, Kubeflow Pipelines)",
                "Evaluate predictive and gen AI solutions (evaluation metrics, LLM-as-a-judge)",
                "Track and compare model artifacts, versions and lineage (Experiments, ML Metadata)",
              ]),
            ],
          },
        ],
      },
      {
        title: "3. Scaling prototypes into ML models",
        badge: "~21%",
        content: [
          {
            type: "accordion",
            items: [
              task("3.1 Build models considering cost, complexity, latency and scalability", [
                "Choose the model type (ARIMA, DNN, LLM)",
                "Choose the product (AutoML, BigQuery ML, Agent Platform Pipelines)",
                "Choose the deployment strategy",
                "Select modeling techniques given interpretability requirements",
              ]),
              task("3.2 Train models", [
                "Organize training data (tabular, text, speech, images, video) in Cloud Storage and BigQuery",
                "Ingest structured and unstructured data from various sources into training pipelines",
                "Train using different SDKs (Agent Platform custom training, Kubeflow on GKE, AutoML, Tabular Workflows)",
                "Troubleshoot ML model training failures",
                "Perform hyperparameter tuning",
                "Fine-tune foundational models from Agent Platform and Model Garden — and know when tuning should be considered",
              ]),
              task("3.3 Choose appropriate hardware for training", [
                "Evaluate compute and accelerator options (CPU, GPU, TPU)",
                "Understand distributed training on GPUs and TPUs using data and model parallelism strategies",
              ]),
            ],
          },
        ],
      },
      {
        title: "4. Serving and scaling models",
        badge: "~20%",
        content: [
          {
            type: "accordion",
            items: [
              task("4.1 Serve models", [
                "Deploy for batch and online inference using appropriate services (Agent Platform, Model Garden, Cloud Run, GKE)",
                "Package and serve models from different frameworks (PyTorch, XGBoost) using prebuilt and custom containers",
                "Organize and version models in Model Registry",
                "Implement rollout strategies (A/B testing, canary deployments) to compare model versions",
                "Develop solutions for inference preprocessing and postprocessing",
              ]),
              task("4.2 Scale online model serving", [
                "Manage and serve features using Agent Platform Feature Store",
                "Deploy models to public and private endpoints",
                "Choose appropriate hardware (CPU, GPU, TPU, edge)",
                "Scale the serving backend based on throughput (Agent Platform Inference, containerized serving)",
                "Tune ML models for training and serving in production",
              ]),
            ],
          },
        ],
      },
      {
        title: "5. Automating and orchestrating ML pipelines",
        badge: "~18%",
        content: [
          {
            type: "accordion",
            items: [
              task("5.1 Develop end-to-end ML pipelines", [
                "Validate data and models",
                "Build and orchestrate pipelines using managed or unmanaged services (Agent Platform Pipelines, Managed Service for Apache Airflow, Ray), from templates or custom solutions",
                "Ensure consistent data preprocessing between training and serving",
              ]),
              task("5.2 Automate model retraining", [
                "Determine an appropriate retraining policy",
                "Deploy models in CI/CD/CT pipelines (Cloud Build)",
              ]),
            ],
          },
        ],
      },
      {
        title: "6. Monitoring AI solutions",
        badge: "~13%",
        content: [
          {
            type: "accordion",
            items: [
              task("6.1 Identify risks to AI solutions", [
                "Build secure AI systems that protect against exploitation and leaks of data or models (data exfiltration, malicious prompting, sharing sensitive data with LLMs) using appropriate tools (regex, safety filters, Model Armor)",
                "Align with responsible AI practices (monitoring for bias)",
                "Use model explainability on Agent Platform",
              ]),
              task("6.2 Monitor, test, and troubleshoot AI solutions", [
                "Configure and use Model Monitoring to establish continuous evaluation metrics for production models",
                "Monitor for common issues (training-serving skew, data drift, concept drift, feature attribution drift)",
                "Monitor, test and evaluate gen AI solutions",
              ]),
            ],
          },
        ],
      },
    ],
  },
];

/**
 * Product naming note: the June 2026 exam guide calls the platform
 * "Gemini Enterprise Agent Platform" (formerly Vertex AI). Cards say "Agent Platform".
 */
const pmle: CertStudyInput = {
  code: "PMLE",
  examName: "Google Cloud Professional Machine Learning Engineer",

  concepts: [
    {
      title: "Low-code first: BigQuery ML & AutoML",
      domain: "Section 1 · ~13%",
      oneLiner: "When the data is already in BigQuery or the problem is standard, build models with SQL or AutoML instead of custom code.",
      visual: {
        type: "table",
        headers: ["Tool", "Use when"],
        rows: [
          ["BigQuery ML", "Data lives in BigQuery; you want to train and predict with SQL (classification, regression, forecasting, clustering)"],
          ["Agent Platform AutoML", "You want a strong model with minimal ML code from your dataset"],
          ["Custom training", "You need full control over architecture or framework"],
        ],
      },
      points: [
        "BigQuery ML also does **feature engineering/selection** in SQL and **generates predictions** where the data sits",
        "You can **fine-tune Gemini models using BigQuery**",
        "Fewer moving parts ⇒ faster delivery and lower ops burden",
      ],
      examTip: "Analysts, data already in BigQuery, standard problem ⇒ **BigQuery ML**.",
    },
    {
      title: "Foundation models & Google AI APIs",
      domain: "Section 1 · ~13%",
      oneLiner: "Before training anything, check whether an API or a foundation model already solves the task.",
      visual: {
        type: "table",
        headers: ["Need", "Reach for"],
        rows: [
          ["Extract data from documents/forms", "Document AI API"],
          ["Detect objects / labels / OCR in images", "Vision API"],
          ["Translate text", "Translate API"],
          ["Generate text, code, images, video", "Gemini, Imagen, Veo from Model Garden"],
          ["Browse and compare models", "Model Garden"],
        ],
      },
      points: [
        "**Model Garden** is the catalog of Google, open and third-party models — evaluate and select for the task",
        "Tune models for a use case only when prompting isn’t enough",
        "Optimize Gemini apps for **cost, latency and availability** (model size, caching, quotas)",
      ],
      examTip: "Standard document/vision/translation task ⇒ use the **API**, don’t train a model.",
    },
    {
      title: "Preparing data at scale & Feature Store",
      domain: "Section 2 · ~16%",
      oneLiner: "Match the preprocessing tool to the scale and complexity, and share features consistently.",
      visual: {
        type: "table",
        headers: ["Scale / need", "Tool"],
        rows: [
          ["Tabular data already in the warehouse", "BigQuery (SQL)"],
          ["Large batch or streaming transformation pipelines", "Dataflow (Apache Beam)"],
          ["Existing Spark workloads", "Apache Spark"],
          ["Small data, exploration", "In-memory Python (pandas)"],
        ],
      },
      points: [
        "Organize tabular, text and image data for efficient experimenting, training and serving",
        "**Agent Platform Feature Store** creates, consolidates and serves features — same definitions for training and serving",
        "Protect **PII and sensitive data** (de-identify, restrict access) before it reaches models or LLMs",
      ],
      examTip: "Streaming or very large transformations ⇒ **Dataflow**. Warehouse tables ⇒ **BigQuery SQL**.",
    },
    {
      title: "Notebooks & experiment tracking",
      domain: "Section 2 · ~16%",
      oneLiner: "Prototype in managed notebooks, then track every run so results are comparable and reproducible.",
      points: [
        "**Agent Platform Workbench** and **Colab Enterprise** are managed notebook environments — apply collaboration and security best practices",
        "Use common frameworks: **PyTorch, scikit-learn, JAX**; prototype with Model Garden models",
        "**Experiments** and **ML Metadata** track parameters, metrics, artifacts, versions and **lineage**",
        "Evaluate predictive **and** gen AI solutions: metrics for classic models, **LLM-as-a-judge** for generative ones",
      ],
      examTip: "Need to compare runs and trace which data produced a model ⇒ **Experiments + ML Metadata**.",
    },
    {
      title: "Choosing model type, product & training method",
      domain: "Section 3 · ~21%",
      oneLiner: "Balance cost, complexity, latency, scalability and interpretability — then choose the product.",
      visual: {
        type: "table",
        headers: ["Signal", "Lean toward"],
        rows: [
          ["Time-series forecasting, simple structure", "ARIMA-style models (e.g. BigQuery ML)"],
          ["Complex patterns, lots of data", "DNN"],
          ["Language / generative tasks", "LLM (prompt, tune, or fine-tune)"],
          ["Need to explain each prediction", "Interpretable models (linear/trees)"],
          ["Minimal code, standard data", "AutoML or BigQuery ML"],
        ],
      },
      points: [
        "Training options: **custom training**, **Kubeflow on GKE**, **AutoML**, **Tabular Workflows**",
        "Use **hyperparameter tuning** to optimize; **troubleshoot training failures** systematically",
        "**Fine-tune a foundation model** only when prompting/RAG can’t reach the quality needed",
      ],
      examTip: "Regulators need explanations ⇒ favor an **interpretable** model over a deep network.",
    },
    {
      title: "Hardware & distributed training",
      domain: "Section 3 · ~21%",
      oneLiner: "Pick the accelerator to fit the workload, and split work across devices when one isn’t enough.",
      visual: {
        type: "table",
        headers: ["Hardware", "Good for"],
        rows: [
          ["CPU", "Classical ML, small models, preprocessing"],
          ["GPU", "Deep learning, flexible frameworks, fine-tuning"],
          ["TPU", "Very large matrix-heavy training (TensorFlow/JAX-style workloads)"],
        ],
      },
      points: [
        "**Data parallelism:** every device holds the model, each processes different data shards",
        "**Model parallelism:** the model is split across devices because it doesn’t fit on one",
        "Compare accelerators on **cost and throughput**, not just raw speed",
      ],
      examTip: "Model too large for one GPU’s memory ⇒ **model parallelism**.",
    },
    {
      title: "Serving models: batch vs. online",
      domain: "Section 4 · ~20%",
      oneLiner: "Choose the serving pattern from latency needs and traffic — then version and roll out safely.",
      visual: {
        type: "table",
        headers: ["Pattern", "Use when"],
        rows: [
          ["Batch prediction", "Score large datasets on a schedule; no real-time need"],
          ["Online prediction (endpoints)", "Low-latency requests per user/event"],
          ["Cloud Run / GKE", "Custom serving stacks or containers you manage"],
        ],
      },
      points: [
        "Package models from PyTorch, XGBoost etc. in **prebuilt or custom containers**",
        "**Model Registry** organizes and versions models",
        "Rollouts: **A/B testing and canary deployments** compare versions on live traffic",
        "Add **pre- and post-processing** around inference; keep it identical to training",
      ],
      examTip: "Predictions needed nightly for millions of rows ⇒ **batch prediction**, not an endpoint.",
    },
    {
      title: "Scaling online serving",
      domain: "Section 4 · ~20%",
      oneLiner: "Serve features fast, choose the right hardware, and scale the backend with throughput.",
      points: [
        "**Feature Store** serves online features at low latency",
        "Deploy to **public or private endpoints** depending on network/security requirements",
        "Choose hardware — **CPU, GPU, TPU, edge** — to match model size and latency budget",
        "**Autoscale** the serving backend on throughput; use containerized serving where needed",
        "Tune models for production: smaller/optimized models reduce cost and latency",
      ],
      examTip: "Sensitive data must not traverse the public internet ⇒ **private endpoint**.",
    },
    {
      title: "Pipelines, consistency & continuous training",
      domain: "Section 5 · ~18%",
      oneLiner: "Automate the whole workflow, and keep training and serving preprocessing identical.",
      visual: {
        type: "flow",
        title: "CI/CD/CT for ML",
        direction: "horizontal",
        nodes: [
          { label: "Validate data", tone: "sky" },
          { label: "Train & evaluate", tone: "gold" },
          { label: "Validate model", tone: "mint" },
          { label: "Deploy", sub: "Cloud Build", tone: "ember" },
          { label: "Monitor → retrain", tone: "gold" },
        ],
      },
      points: [
        "Build pipelines with **Agent Platform Pipelines**, **Managed Service for Apache Airflow**, or **Ray**",
        "**Validate data and models** as pipeline steps — fail fast on bad data",
        "Avoid **training-serving skew** by reusing the same preprocessing code/logic in both",
        "Decide a **retraining policy** (schedule, drift-triggered, performance-triggered); deploy via **CI/CD/CT** (e.g. Cloud Build)",
      ],
      examTip: "Predictions differ from offline results because of preprocessing mismatch ⇒ **training-serving skew**.",
    },
    {
      title: "Monitoring, drift & securing AI",
      domain: "Section 6 · ~13%",
      oneLiner: "Watch models in production for decay and misuse, and protect against leaks and attacks.",
      visual: {
        type: "table",
        headers: ["Issue", "Meaning"],
        rows: [
          ["Training-serving skew", "Serving data differs from training data or processing"],
          ["Data drift", "Input distribution changes over time"],
          ["Concept drift", "The input → target relationship changes"],
          ["Feature attribution drift", "Which features matter shifts"],
        ],
      },
      points: [
        "**Model Monitoring** sets up continuous evaluation metrics for production models",
        "Secure AI: guard against **data exfiltration, malicious prompting and sharing sensitive data with LLMs** — use safety filters, regex/DLP and **Model Armor**",
        "Follow **responsible AI** (monitor for bias) and use **explainability** to justify predictions",
        "Monitor, test and evaluate **gen AI** solutions, not just predictive ones",
      ],
      examTip: "Users try to trick the LLM into revealing data ⇒ **Model Armor / safety filters**.",
    },
  ],

  quiz: [
    {
      q: "An analytics team has years of sales data in BigQuery and wants a demand-forecasting model without writing training code. Which is the best fit?",
      options: [
        "Build a custom TensorFlow model on GKE",
        "Export the data to CSV and train locally",
        "BigQuery ML",
        "Hire a labeling vendor",
      ],
      answer: 2,
      explanation:
        "**BigQuery ML** trains and serves models with SQL right where the data lives — forecasting is a supported model type.",
    },
    {
      q: "A company must extract fields from thousands of scanned forms. Which approach is best?",
      options: [
        "Document AI API",
        "Train an image classifier from scratch",
        "Use BigQuery ML clustering",
        "Manually type the data",
      ],
      answer: 0,
      explanation:
        "For standard document extraction use the **Document AI API** — no custom model training required.",
    },
    {
      q: "A team must transform terabytes of streaming events into training features. Which tool suits large-scale stream and batch processing?",
      options: [
        "In-memory pandas on a notebook",
        "Dataflow",
        "A spreadsheet",
        "Cloud Storage alone",
      ],
      answer: 1,
      explanation:
        "**Dataflow** (Apache Beam) handles large-scale batch and streaming transformations. pandas is for data that fits in memory.",
    },
    {
      q: "Data scientists need to compare many training runs and trace which data and parameters produced each model. What should they use?",
      options: [
        "Email attachments of results",
        "Local text notes",
        "A shared drive of screenshots",
        "Experiments and ML Metadata on Agent Platform",
      ],
      answer: 3,
      explanation:
        "**Experiments** track parameters and metrics, and **ML Metadata** records artifacts, versions and lineage.",
    },
    {
      q: "A regulated lender must explain each credit decision. Which modeling approach best fits the requirement?",
      options: [
        "A very deep neural network",
        "An interpretable model such as a linear or tree-based model",
        "A random guess with logging",
        "An LLM with high temperature",
      ],
      answer: 1,
      explanation:
        "When **interpretability** is required, prefer models whose decisions can be explained rather than opaque deep networks.",
    },
    {
      q: "A model is too large to fit into a single GPU’s memory. Which distributed strategy applies?",
      options: [
        "Data parallelism only",
        "Reduce the dataset size",
        "Model parallelism",
        "Use a CPU",
      ],
      answer: 2,
      explanation:
        "**Model parallelism** splits the model across devices. Data parallelism replicates the whole model on each device.",
    },
    {
      q: "A retailer needs product recommendations recomputed for all users every night. Which serving pattern is most appropriate?",
      options: [
        "Batch prediction",
        "A public online endpoint kept always on",
        "Edge deployment",
        "Manual scoring",
      ],
      answer: 0,
      explanation:
        "No real-time requirement and a large volume ⇒ **batch prediction** is simpler and cheaper than online serving.",
    },
    {
      q: "A team wants to compare a new model version against the current one using a small share of live traffic. Which approach should they use?",
      options: [
        "Replace the old model immediately",
        "Train longer",
        "Delete the Model Registry",
        "A canary or A/B rollout with traffic splitting",
      ],
      answer: 3,
      explanation:
        "**Canary / A-B rollouts** send a fraction of traffic to the new version to compare before full promotion.",
    },
    {
      q: "Online predictions differ from offline evaluation because features are computed differently at training and serving. What is this problem called?",
      options: [
        "Concept drift",
        "Training-serving skew",
        "Overfitting",
        "Underfitting",
      ],
      answer: 1,
      explanation:
        "**Training-serving skew** occurs when data or preprocessing at serving differs from training. Reusing the same logic (and a Feature Store) prevents it.",
    },
    {
      q: "Users are crafting prompts to make a deployed LLM reveal sensitive data. Which control directly addresses this?",
      options: [
        "A bigger training set",
        "More GPUs",
        "Lower learning rate",
        "Safety filters and Model Armor to screen prompts and responses",
      ],
      answer: 3,
      explanation:
        "Malicious prompting and data leakage are mitigated by **safety filters and Model Armor** applied to inputs and outputs.",
    },
  ],
};

export const pmleStudyCards = certStudyCards(pmle);
