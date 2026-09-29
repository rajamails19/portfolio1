import { certStudyCards, type CertStudyInput } from "./cert-cards";

const mlaC02: CertStudyInput = {
  code: "MLA-C02",
  examName: "AWS Certified Machine Learning Engineer – Associate (MLA-C02)",

  concepts: [
    {
      title: "Data formats & ingestion",
      domain: "Domain 1 · 28%",
      oneLiner: "Pick the storage and format for how the data will be read — and stream it when it arrives continuously.",
      visual: {
        type: "table",
        headers: ["Format", "Type", "Best for"],
        rows: [
          ["Parquet / ORC", "Columnar, compressed", "Analytics and ML reads that touch a few columns (Athena, Spark)"],
          ["CSV / JSON", "Row-based text", "Simple exchange; human-readable; slower and larger"],
          ["Avro", "Row-based, schema included", "Streaming and schema evolution"],
          ["RecordIO-protobuf", "Binary", "SageMaker built-in algorithms (fast streaming)"],
        ],
      },
      points: [
        "Sources: **Amazon S3** (default data lake), **EFS**, **FSx** (shared file systems for training), RDS, DynamoDB",
        "Streaming ingestion: **Kinesis**, **Apache Flink**, **Apache Kafka (MSK)**",
        "Merge sources with **AWS Glue** or **Spark on EMR**",
        "For GenAI: configure **vector databases** (OpenSearch, RDS/Aurora with pgvector) and ingest text, images and audio",
      ],
      examTip: "Analytics queries reading a few columns ⇒ **Parquet** (columnar). Real-time events ⇒ Kinesis/Kafka.",
    },
    {
      title: "Feature engineering & Feature Store",
      domain: "Domain 1 · 28%",
      oneLiner: "Turn raw data into model-ready features — and share them consistently between training and inference.",
      visual: {
        type: "table",
        headers: ["Technique", "What it does"],
        rows: [
          ["Scaling / standardization / normalization", "Put numeric features on comparable ranges"],
          ["One-hot / label / binary encoding", "Convert categories to numbers"],
          ["Binning, log transform, feature splitting", "Reshape skewed or composite values"],
          ["Tokenization / embeddings", "Convert text and images to numeric form"],
        ],
      },
      points: [
        "**SageMaker Data Wrangler** — visual data prep; **AWS Glue DataBrew** — no-code cleaning; **Glue / Spark on EMR** — scalable ETL",
        "**SageMaker Feature Store** stores features once and serves them to both **training (offline)** and **inference (online)**",
        "For RAG: **chunking strategies and metadata extraction** when preparing documents",
        "Handle missing values by **imputing**, outliers by detecting/treating, and remove **duplicates**",
      ],
      examTip: "Same features needed for training and low-latency inference ⇒ **Feature Store**.",
    },
    {
      title: "Data integrity, bias & privacy",
      domain: "Domain 1 · 28%",
      oneLiner: "Bad or biased data breaks models before training starts — validate, balance and protect it.",
      points: [
        "**Class imbalance (CI)** and **difference in proportions of labels (DPL)** are common pre-training bias metrics",
        "Fix imbalance with **resampling** (over/under-sampling), **synthetic data (e.g. SMOTE)** or class weights",
        "**SageMaker Clarify** detects bias in data and models; **Glue Data Quality / DataBrew** validate data",
        "**SageMaker Ground Truth** and Mechanical Turk create labeled datasets",
        "Prevent leakage: **split before transforming**, shuffle, and keep test data untouched",
        "Protect sensitive data: **mask, redact, anonymize**; know PII/PHI and **data residency** requirements; encrypt at rest and in transit",
      ],
      examTip: "Rare-class problem (fraud) with a skewed dataset ⇒ resample/SMOTE and judge with **recall/F1**, not accuracy.",
    },
    {
      title: "Choosing an approach & algorithm",
      domain: "Domain 2 · 24%",
      oneLiner: "Use the simplest option that works: AI service → built-in algorithm → custom model → foundation model.",
      visual: {
        type: "table",
        headers: ["Task", "SageMaker built-in / service"],
        rows: [
          ["Tabular classification/regression", "XGBoost, Linear Learner"],
          ["Clustering / dimensionality reduction", "K-means / PCA"],
          ["Anomaly detection", "Random Cut Forest"],
          ["Time-series forecasting", "DeepAR"],
          ["Text classification / embeddings", "BlazingText"],
          ["Images", "Image classification, object detection, semantic segmentation"],
          ["Common tasks (OCR, translate, speech)", "AI services: Textract, Translate, Transcribe, Rekognition"],
        ],
      },
      points: [
        "**Interpretability** requirements can rule out deep networks — prefer linear/tree models",
        "**Foundation models:** Amazon Bedrock or SageMaker **JumpStart** — choose between prompting, **RAG**, or **fine-tuning**",
        "Compare on **cost, latency and accuracy** — not accuracy alone",
      ],
      examTip: "Standard task with no ML team ⇒ managed **AI service**. Tabular data ⇒ **XGBoost**.",
    },
    {
      title: "Training, tuning & preventing overfit",
      domain: "Domain 2 · 24%",
      oneLiner: "Control training cost and time, tune hyperparameters automatically, and stop the model memorizing.",
      points: [
        "Key knobs: **epochs, batch size, learning rate**; **early stopping** ends training when validation stops improving",
        "**Distributed training:** __data parallelism__ splits the data across workers; __model parallelism__ splits a model too big for one GPU",
        "**Managed Spot Training** cuts training cost dramatically — use **checkpointing** so interruptions resume",
        "**Automatic Model Tuning (AMT)** searches hyperparameters (random, Bayesian, Hyperband, grid)",
        "**Overfitting** (great on train, poor on validation) ⇒ regularization (L1/L2, dropout), more data, feature selection, early stopping",
        "**Underfitting** ⇒ more capacity or better features. **Catastrophic forgetting** when fine-tuning ⇒ lower learning rate / regularization",
        "Reduce model size: **pruning, quantization/data types, compression**; combine models with **ensembling, stacking, boosting**",
      ],
      examTip: "Cut training cost without much risk ⇒ **Managed Spot Training** with checkpoints.",
    },
    {
      title: "Evaluating & explaining models",
      domain: "Domain 2 · 24%",
      oneLiner: "Choose the metric that matches the business cost, compare against a baseline, and explain the result.",
      visual: {
        type: "table",
        headers: ["Metric", "Use when"],
        rows: [
          ["Accuracy", "Balanced classes"],
          ["Precision", "False positives are costly"],
          ["Recall", "False negatives are costly"],
          ["F1", "Balance of both on imbalanced data"],
          ["ROC-AUC", "Class separation across thresholds"],
          ["RMSE", "Regression error size"],
          ["BLEU / ROUGE / BERTScore", "GenAI text quality vs. reference"],
        ],
      },
      points: [
        "Always set a **performance baseline** before tuning",
        "**SageMaker Clarify** explains predictions (feature importance/SHAP) and checks bias; **Model Debugger** diagnoses convergence problems",
        "Compare a **shadow variant** against production before switching traffic",
        "GenAI: **LLM-as-a-judge**, human evaluation, and **Bedrock evaluations** — plus RAG retrieval-accuracy checks",
        "Track experiments for reproducibility (**MLflow on SageMaker**)",
      ],
      examTip: "Test a new model on live traffic without affecting users ⇒ **shadow variant**.",
    },
    {
      title: "Deployment options & endpoints",
      domain: "Domain 3 · 24%",
      oneLiner: "Pick the inference mode from the traffic pattern, payload size and latency needs.",
      visual: {
        type: "table",
        headers: ["Option", "Use when"],
        rows: [
          ["Real-time endpoint", "Persistent, low-latency, steady traffic"],
          ["Serverless inference", "Intermittent/unpredictable traffic; scale to zero"],
          ["Asynchronous inference", "Large payloads or long processing; queued results"],
          ["Batch transform", "Score a whole dataset offline"],
          ["Multi-model endpoint", "Many similar models on one endpoint to save cost"],
          ["Multi-container endpoint", "Different frameworks/containers behind one endpoint"],
        ],
      },
      points: [
        "**SageMaker Neo** compiles models for edge devices; **Inference Recommender** helps right-size instances",
        "Place endpoints in a **VPC**; use **auto scaling** on metrics such as invocations per instance or latency",
        "Bring your own container (**BYOC**) via ECR when built-in containers don’t fit",
        "Deploy external models to **SageMaker AI** or with **Bedrock Custom Model Import**; agents need **state management** and integration",
      ],
      examTip: "Sporadic traffic, tolerate cold start ⇒ **serverless**. Nightly scoring of millions of rows ⇒ **batch transform**.",
    },
    {
      title: "MLOps — pipelines & CI/CD",
      domain: "Domain 3 · 24%",
      oneLiner: "Automate the path from data to a versioned, tested, deployed model — including retraining.",
      visual: {
        type: "flow",
        title: "ML delivery pipeline",
        direction: "horizontal",
        nodes: [
          { label: "Code + data change", tone: "sky" },
          { label: "Build & test", sub: "CodeBuild", tone: "gold" },
          { label: "Train & evaluate", sub: "SageMaker Pipelines", tone: "mint" },
          { label: "Register version", sub: "Model Registry", tone: "ember" },
          { label: "Deploy", sub: "blue/green · canary", tone: "gold" },
        ],
      },
      points: [
        "**SageMaker Pipelines** orchestrates ML steps; **Model Registry** versions models and tracks approval status",
        "AWS developer tools: **CodePipeline, CodeBuild, CodeDeploy** (plus CodeCommit/CodeConnections for source)",
        "**EventBridge** can trigger pipelines/retraining on schedules or events",
        "Deployment strategies with rollback: **blue/green, canary, linear**",
        "**Infrastructure as code:** CloudFormation or CDK; automate tests (unit, integration, end-to-end); for GenAI also **prompt testing and prompt/agent versioning**",
      ],
      examTip: "Roll out a new model to 10% of traffic first ⇒ **canary** deployment.",
    },
    {
      title: "Monitoring, drift & cost",
      domain: "Domain 4 · 24%",
      oneLiner: "Models decay in production — watch data, quality and infrastructure, and keep costs in check.",
      visual: {
        type: "table",
        headers: ["SageMaker Model Monitor type", "Detects"],
        rows: [
          ["Data quality", "Input data drifting from the training baseline"],
          ["Model quality", "Accuracy/metrics degrading (needs ground truth)"],
          ["Bias drift", "Fairness metrics shifting over time"],
          ["Feature attribution drift", "Feature importance changing"],
        ],
      },
      points: [
        "**CloudWatch** for metrics, logs, alarms and dashboards; **X-Ray** for tracing; **CloudTrail** for API auditing",
        "Right-size with **Inference Recommender / Compute Optimizer**; tag resources for **cost allocation**; use **Cost Explorer and Budgets**",
        "Purchasing: **Spot, On-Demand, Reserved, SageMaker AI Savings Plans**",
        "GenAI cost: track **token usage**, embedding compute and vector storage",
      ],
      examTip: "Model accuracy slowly drops after launch ⇒ enable **Model Monitor** and retrain on drift.",
    },
    {
      title: "Securing ML workloads",
      domain: "Domain 4 · 24%",
      oneLiner: "Least privilege, isolated networks, encrypted data, and audit trails — for data, models and endpoints.",
      points: [
        "**IAM roles and policies** with least privilege for users, notebooks, training jobs and endpoints (**SageMaker Role Manager** helps)",
        "**VPC, subnets, security groups, VPC endpoints** isolate training and inference; use **network isolation** for sensitive jobs",
        "**Encrypt** with **KMS** at rest and TLS in transit; control S3 with bucket policies",
        "Audit with **CloudTrail** and **AWS Config**; scan CI/CD artifacts (**CodeGuru, Inspector**) for vulnerabilities",
        "For foundation models choose the right **credential type** (IAM credentials vs. Bedrock API keys) and use **Bedrock Guardrails** for sensitive-data protection",
      ],
      examTip: "Training job must not reach the internet ⇒ VPC with **network isolation** and VPC endpoints.",
    },
  ],

  quiz: [
    {
      q: "A data scientist mostly queries a few columns from very large tables for training data. Which storage format is most efficient?",
      options: ["CSV", "JSON", "Parquet", "Plain text logs"],
      answer: 2,
      explanation:
        "**Parquet** is columnar and compressed, so reading a few columns scans far less data than row-based CSV or JSON.",
    },
    {
      q: "The same computed features must be available for both batch training and low-latency online inference, consistently. Which service fits?",
      options: [
        "SageMaker Feature Store",
        "AWS Glue crawlers",
        "Amazon Athena",
        "SageMaker Ground Truth",
      ],
      answer: 0,
      explanation:
        "**Feature Store** keeps an offline store for training and an online store for inference so both use identical feature values.",
    },
    {
      q: "A fraud-detection dataset has only 0.5% positive examples. Which combination is most appropriate?",
      options: [
        "Train as-is and evaluate with accuracy",
        "Delete all negative examples",
        "Use a larger learning rate",
        "Resample or use SMOTE, and evaluate with recall and F1",
      ],
      answer: 3,
      explanation:
        "With severe **class imbalance**, accuracy is misleading (99.5% by predicting “no fraud”). Rebalance and judge with **recall/F1**.",
    },
    {
      q: "A team needs to forecast demand from historical time-series data using a SageMaker built-in algorithm. Which should they choose?",
      options: ["K-means", "DeepAR", "PCA", "BlazingText"],
      answer: 1,
      explanation:
        "**DeepAR** is SageMaker’s built-in algorithm for probabilistic time-series forecasting.",
    },
    {
      q: "A long training job can tolerate interruption. Which option lowers cost the most with minimal risk?",
      options: [
        "Use larger On-Demand instances",
        "Disable checkpointing",
        "Managed Spot Training with checkpointing",
        "Train on a laptop",
      ],
      answer: 2,
      explanation:
        "**Managed Spot Training** uses spare capacity at a steep discount; **checkpoints** let the job resume after an interruption.",
    },
    {
      q: "A model scores 99% on training data but only 70% on validation data. What is the most likely issue and a suitable fix?",
      options: [
        "Underfitting — remove regularization",
        "Overfitting — add regularization (L1/L2, dropout) or more data",
        "Data leakage from the endpoint — add instances",
        "Latency — use a GPU",
      ],
      answer: 1,
      explanation:
        "A large train–validation gap signals **overfitting**. Regularization, more data, feature selection or early stopping help.",
    },
    {
      q: "A team wants to test a new model on real production traffic without affecting user responses. What should they use?",
      options: [
        "A shadow variant",
        "A batch transform job",
        "A multi-model endpoint",
        "SageMaker Neo",
      ],
      answer: 0,
      explanation:
        "A **shadow variant** receives a copy of live traffic so you can compare results while users are served only by the production variant.",
    },
    {
      q: "Payloads are large and inference takes several minutes; clients can wait for results. Which inference option fits?",
      options: [
        "Real-time endpoint",
        "Serverless inference",
        "Edge deployment with Neo",
        "Asynchronous inference",
      ],
      answer: 3,
      explanation:
        "**Asynchronous inference** queues requests and suits large payloads and long processing times.",
    },
    {
      q: "A team wants to release a new model version to a small percentage of traffic first and roll back automatically on problems. Which strategy?",
      options: [
        "Delete the old endpoint first",
        "Canary deployment",
        "Increase batch size",
        "Retrain from scratch",
      ],
      answer: 1,
      explanation:
        "A **canary** deployment shifts a small share of traffic to the new version and supports automatic rollback (as do blue/green and linear strategies).",
    },
    {
      q: "Model accuracy gradually declines months after deployment because input data changed. Which service should be enabled to detect this?",
      options: [
        "AWS Budgets",
        "Amazon Macie",
        "AWS Config",
        "SageMaker Model Monitor",
      ],
      answer: 3,
      explanation:
        "**Model Monitor** compares production data and metrics to a baseline to detect data-quality, model-quality, bias and feature-attribution drift.",
    },
  ],
};

export const mlaC02StudyCards = certStudyCards(mlaC02);
