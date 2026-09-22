import type { Section } from "./types";
import tipRoadmapTable from "@/assets/certs/tip-roadmap-table.png";
import tipThink from "@/assets/certs/tip-think.png";
import tipAzureAi300 from "@/assets/certs/tip-azure-ai-300.png";
import tipRoadmapOrder from "@/assets/certs/tip-roadmap-order.png";

export const certificationsSection: Section = {
  slug: "certifications",
  title: "Certifications",
  tagline: "Exam-mapped prep — AWS, Azure, GCP, and Anthropic AI credentials.",
  emoji: "🎓",
  gradient: "from-[oklch(0.92_0.08_265)] via-[oklch(0.92_0.09_320)] to-[oklch(0.92_0.08_350)]",
  items: [
    {
      id: "cert-tips-slideshow",
      question: "Certification roadmap & tips",
      category: "Tips",
      tags: ["Tips", "Roadmap"],
      answer: [
        {
          type: "slideshow",
          slides: [
            {
              src: tipRoadmapTable,
              alt: "Table of six certifications with order, difficulty stars, and why",
              caption: "Order, difficulty, and why — AIF-C01 up to GCP PMLE.",
            },
            {
              src: tipThink,
              alt: "What each certification says about you: AIF-C01, MLA, AIP-C01",
              caption: "How to think about it: understand AI, build/deploy ML, build production GenAI.",
            },
            {
              src: tipAzureAi300,
              alt: "Azure AI-300 — Operationalizing ML and GenAI",
              caption: "Azure AI-300 — MLOps + GenAIOps/AIOps, Microsoft's newer certification.",
            },
            {
              src: tipRoadmapOrder,
              alt: "Refined roadmap: AIF-C01, CCA-F, AI-103, MLA-C02, PMLE, AIP-C01",
              caption: "Refined roadmap: AIF-C01 → CCA-F → AI-103 → MLA-C02 → PMLE → AIP-C01.",
            },
          ],
        },
      ],
    },
    {
      id: "cert-aip-c01-link",
      question: "AWS Certified Generative AI Developer – Professional (AIP-C01) — official exam page",
      category: "AIP-C01",
      tags: ["AWS", "Official Page"],
      answer: [
        {
          type: "text",
          content:
            "Professional-level. Validates the ability to integrate foundation models into applications and business workflows. 65 scored + 10 unscored questions.",
        },
        {
          type: "link",
          href: "https://docs.aws.amazon.com/aws-certification/latest/ai-professional-01/ai-professional-01.html",
          label: "AWS Certified Generative AI Developer – Professional — official exam guide",
        },
      ],
    },
    {
      id: "cert-aip-c01-syllabus",
      question: "AWS Certified Generative AI Developer – Professional (AIP-C01) — syllabus & domains",
      category: "AIP-C01",
      tags: ["AWS", "Syllabus"],
      answer: [
        {
          type: "accordion",
          items: [
            {
              title: "1. Foundation Model Integration, Data Management, and Compliance",
              badge: "31%",
              content: [{ type: "text", content: "Task-level detail coming soon." }],
            },
            {
              title: "2. Implementation and Integration",
              badge: "26%",
              content: [{ type: "text", content: "Task-level detail coming soon." }],
            },
            {
              title: "3. AI Safety, Security, and Governance",
              badge: "20%",
              content: [{ type: "text", content: "Task-level detail coming soon." }],
            },
            {
              title: "4. Operational Efficiency and Optimization for GenAI Applications",
              badge: "12%",
              content: [{ type: "text", content: "Task-level detail coming soon." }],
            },
            {
              title: "5. Testing, Validation, and Troubleshooting",
              badge: "11%",
              content: [{ type: "text", content: "Task-level detail coming soon." }],
            },
          ],
        },
      ],
    },
    {
      id: "cert-aif-c01-link",
      question: "AWS Certified AI Practitioner (AIF-C01) — official exam page",
      category: "AIF-C01",
      tags: ["AWS", "Official Page"],
      answer: [
        {
          type: "text",
          content:
            "Foundational-level, 90 minutes, 65 questions, $100 USD. Validates foundational knowledge of AI, ML, and generative AI concepts and use cases on AWS.",
        },
        {
          type: "link",
          href: "https://aws.amazon.com/certification/certified-ai-practitioner/",
          label: "AWS Certified AI Practitioner — official certification page",
        },
      ],
    },
    {
      id: "cert-aif-c01-syllabus",
      question: "AWS Certified AI Practitioner (AIF-C01) — syllabus & domains",
      category: "AIF-C01",
      tags: ["AWS", "Syllabus"],
      answer: [
        {
          type: "text",
          content: "Tap a domain, then a task statement, to see its exact exam objectives.",
        },
        {
          type: "accordion",
          items: [
            {
              title: "1. Fundamentals of AI and ML",
              badge: "20%",
              content: [
                {
                  type: "accordion",
                  items: [
                    {
                      title: "1.1 Explain basic AI concepts and terminologies",
                      content: [
                        {
                          type: "list",
                          items: [
                            "Define basic AI terms (AI, ML, deep learning, neural networks, computer vision, NLP, model, algorithm, training and inferencing, bias, fairness, fit, LLM, GenAI, agentic AI)",
                            "Describe the similarities and differences between AI, ML, GenAI, deep learning, and agentic AI",
                            "Describe various types of inferencing (batch, real-time, asynchronous, serverless)",
                            "Describe the different types of data in AI models (labeled/unlabeled, tabular, time-series, image, text, structured/unstructured)",
                            "Describe different types of AI/ML learning (supervised, unsupervised, reinforcement learning methods)",
                          ],
                        },
                      ],
                    },
                    {
                      title: "1.2 Identify practical use cases for AI",
                      content: [
                        {
                          type: "list",
                          items: [
                            "Recognize applications where AI/ML can provide value (assist human decision making, solution scalability, automation)",
                            "Determine when AI/ML solutions are not appropriate (cost-benefit analyses, when a specific outcome is needed instead of a prediction)",
                            "Select the appropriate AI/ML techniques for specific use cases (regression, classification, clustering)",
                            "Identify examples of real-world AI applications (computer vision, NLP, speech recognition, recommendation systems, fraud detection, forecasting, knowledge bases, agentic AI)",
                            "Explain the capabilities of AWS managed AI/ML services (SageMaker AI, Transcribe, Translate, Comprehend, Lex, Polly)",
                            "Identify when traditional ML models or foundation models (FMs) are appropriate (regulatory concerns, explainability requirements, operational constraints)",
                          ],
                        },
                      ],
                    },
                    {
                      title: "1.3 Describe the AI/ML development lifecycle",
                      content: [
                        {
                          type: "list",
                          items: [
                            "Describe and differentiate components of an AI/ML pipeline",
                            "Describe sources of FM models (open source pre-trained models, training custom models)",
                            "Describe methods to use a model in production (managed API service, self-hosted API)",
                            "Identify relevant AWS services and features for each stage of an AI/ML pipeline (Bedrock, Amazon Quick, Kiro, SageMaker AI)",
                            "Describe fundamental MLOps concepts (experimentation, repeatable processes, scalable systems, managing technical debt, production readiness, model monitoring, re-training)",
                            "Describe model performance metrics (accuracy, precision, recall, F1) and business metrics (cost per user, development costs, customer feedback, ROI)",
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              title: "2. Fundamentals of Generative AI",
              badge: "24%",
              content: [
                {
                  type: "accordion",
                  items: [
                    {
                      title: "2.1 Explain the basic concepts of generative AI",
                      content: [
                        {
                          type: "list",
                          items: [
                            "Define foundational GenAI concepts (tokens, chunking, embeddings, vectors, prompt engineering, transformer-based LLMs, FMs, multi-modal models, diffusion models)",
                            "Identify potential use cases for GenAI models (image/video/audio generation, summarization, AI assistants, translation, code generation, customer service agents, search, recommendation engines)",
                            "Describe the FM lifecycle (data selection, model selection, pre-training, fine-tuning, evaluation, deployment, feedback)",
                            "Describe the token-based pricing model and its effect on cost and performance for inference",
                            "Describe the role of context engineering in FM applications",
                            "Define foundational agentic AI concepts (multi-agent system patterns, MCP, multi-agent communication, memory management, tool usage, workflow orchestration)",
                          ],
                        },
                      ],
                    },
                    {
                      title: "2.2 Understand the capabilities and limitations of GenAI for solving business problems",
                      content: [
                        {
                          type: "list",
                          items: [
                            "Describe the advantages of GenAI (adaptability, responsiveness, conversational capabilities, ability to generate content)",
                            "Identify disadvantages of GenAI solutions (hallucinations, interpretability, inaccuracy, nondeterminism)",
                            "Identify factors to consider when selecting GenAI models (model types, performance requirements, capabilities, constraints, compliance, cost, latency, model complexity)",
                            "Determine business value and metrics for GenAI applications (cross-domain performance, ROI, efficiency, conversion rate, ARPU, accuracy, customer lifetime value)",
                          ],
                        },
                      ],
                    },
                    {
                      title: "2.3 Describe AWS infrastructure and technologies for building GenAI applications",
                      content: [
                        {
                          type: "list",
                          items: [
                            "Identify AWS services and features to develop GenAI applications (Amazon Bedrock, SageMaker AI, SageMaker JumpStart, Amazon Quick, Kiro, Strands Agents, Bedrock AgentCore)",
                            "Describe the advantages of using AWS GenAI services (accessibility, lower barrier to entry, efficiency, cost-effectiveness, speed to market)",
                            "Describe the benefits of AWS infrastructure for GenAI applications (security, compliance, responsibility, safety)",
                            "Describe cost tradeoffs of AWS GenAI services (responsiveness, availability, redundancy, performance, regional coverage, token-based pricing, provisioned throughput, custom models)",
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              title: "3. Applications of Foundation Models",
              badge: "28%",
              content: [
                {
                  type: "callout",
                  variant: "tip",
                  content: "==The single heaviest domain on the exam== — prioritize it.",
                },
                {
                  type: "accordion",
                  items: [
                    {
                      title: "3.1 Describe design considerations for applications that use FMs",
                      content: [
                        {
                          type: "list",
                          items: [
                            "Identify selection criteria to choose FMs (cost, modality, latency, multi-lingual, model size, complexity, customization, input/output length, prompt caching)",
                            "Describe the effect of inference parameters on model responses (temperature, input/output length)",
                            "Define Retrieval Augmented Generation (RAG) and describe its business applications (Amazon Bedrock Knowledge Bases)",
                            "Identify AWS services that help store embeddings within vector databases (OpenSearch Service, Aurora, Neptune, RDS for PostgreSQL)",
                            "Explain the cost tradeoffs of various approaches to FM customization (pre-training, fine-tuning, in-context learning, RAG, model distillation)",
                            "Define the role of AI agents and describe AI agents' business applications",
                          ],
                        },
                      ],
                    },
                    {
                      title: "3.2 Choose effective prompt engineering techniques",
                      content: [
                        {
                          type: "list",
                          items: [
                            "Define the concepts and constructs of prompt engineering (context, instruction, negative prompts)",
                            "Define techniques for prompt engineering (chain-of-thought, zero-shot, single-shot, few-shot, prompt templates)",
                            "Identify and describe the benefits and best practices for prompt engineering (response quality improvement, experimentation, guardrails, discovery, specificity and concision)",
                            "Define potential risks and limitations of prompt engineering (exposure, poisoning, hijacking, jailbreaking)",
                            "Describe prompt versioning and management strategies using Amazon Bedrock Prompt Management",
                          ],
                        },
                      ],
                    },
                    {
                      title: "3.3 Describe the training and fine-tuning process for FMs",
                      content: [
                        {
                          type: "list",
                          items: [
                            "Describe the key elements of training an FM (pre-training, fine-tuning, continuous pre-training, distillation)",
                            "Define methods for fine-tuning an FM (instruction tuning, adapting models for specific domains, transfer learning, continuous pre-training)",
                            "Describe how to prepare data to fine-tune an FM (data curation, governance, size, labeling, representativeness, RLHF)",
                          ],
                        },
                      ],
                    },
                    {
                      title: "3.4 Describe methods to evaluate FM performance",
                      content: [
                        {
                          type: "list",
                          items: [
                            "Determine approaches to evaluate FM performance (human-in-the-loop evaluation, benchmark datasets, Amazon Bedrock Model Evaluation)",
                            "Identify relevant metrics to assess FM performance (ROUGE, BLEU, BERTScore, LLM-as-a-judge)",
                            "Determine whether an FM effectively meets business objectives (productivity, user engagement, task engineering)",
                            "Identify approaches to evaluate the performance of applications built with FMs (RAG, agents, workflows)",
                            "Identify business objective alignment metrics for AI applications (task completion rate, user satisfaction, cost per interaction)",
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              title: "4. Guidelines for Responsible AI",
              badge: "14%",
              content: [
                {
                  type: "accordion",
                  items: [
                    {
                      title: "4.1 Explain the development of AI systems that are responsible",
                      content: [
                        {
                          type: "list",
                          items: [
                            "Identify features of responsible AI (bias, fairness, inclusivity, robustness, safety, veracity)",
                            "Explain how to use tools to identify features of responsible AI (Amazon Bedrock Guardrails)",
                            "Define responsible practices to select a model (environmental considerations, sustainability)",
                            "Identify legal risks of working with GenAI (IP infringement claims, biased model outputs, loss of customer trust, end user risk, hallucinations)",
                            "Identify characteristics of datasets (inclusivity, diversity, curated data sources, balanced datasets)",
                            "Describe effects of bias and variance (demographic groups, inaccuracy, overfitting, underfitting)",
                            "Describe tools to detect and monitor bias, trustworthiness, and truthfulness (label quality analysis, human audits, subgroup analysis)",
                          ],
                        },
                      ],
                    },
                    {
                      title: "4.2 Recognize the importance of transparent and explainable models",
                      content: [
                        {
                          type: "list",
                          items: [
                            "Describe the differences between models that are transparent/explainable and those that are not",
                            "Describe tools to identify transparent and explainable models (SageMaker Model Cards, Bedrock Model Evaluations, open source models, data, licensing)",
                            "Identify tradeoffs between model safety and transparency (measuring interpretability and performance)",
                            "Describe principles of human-centered design for explainable AI (user-feedback mechanisms, AI decision transparency)",
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              title: "5. Security, Compliance, and Governance for AI Solutions",
              badge: "14%",
              content: [
                {
                  type: "accordion",
                  items: [
                    {
                      title: "5.1 Explain methods to secure AI systems",
                      content: [
                        {
                          type: "list",
                          items: [
                            "Identify AWS services and features to secure AI systems (IAM roles/policies/permissions, encryption, Amazon Macie, AWS PrivateLink, shared responsibility model, Bedrock AgentCore Identity, Policy in AgentCore, Bedrock Guardrails)",
                            "Describe the concept of source citation and documenting data origins (data lineage, data cataloging, SageMaker Model Cards)",
                            "Describe best practices for secure data engineering (assessing data quality, privacy-enhancing technologies, data access control, data integrity)",
                            "Describe security and privacy considerations for AI systems (application security, threat detection, vulnerability management, infrastructure protection, prompt injection, encryption at rest/in transit, data leakage prevention, output filtering/validation, audit trail and logging, toxicity)",
                            "Describe hallucination detection methods and grounding techniques (RAG grounding, output validation, confidence scoring)",
                          ],
                        },
                      ],
                    },
                    {
                      title: "5.2 Recognize governance and compliance regulations for AI systems",
                      content: [
                        {
                          type: "list",
                          items: [
                            "Identify AWS services and features to assist with governance and regulation compliance (AWS Config, Amazon Inspector, AWS Artifact, AWS CloudTrail, AWS Trusted Advisor)",
                            "Describe data governance strategies (data lifecycles, logging, residency, monitoring, observation, retention)",
                            "Describe processes to follow governance protocols (policies, review cadence, review strategies, governance frameworks such as the Generative AI Security Scoping Matrix, transparency standards, team training requirements)",
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "cert-mla-c01-link",
      question: "AWS Certified Machine Learning Engineer – Associate (MLA-C01) — official exam page",
      category: "MLA-C01",
      tags: ["AWS", "Official Page"],
      answer: [
        {
          type: "text",
          content:
            "Associate-level. Validates the ability to build, operationalize, deploy, and maintain ML solutions and pipelines on AWS. 50 scored questions + 15 unscored, scaled score 100–1,000, passing score 720.",
        },
        {
          type: "link",
          href: "https://aws.amazon.com/certification/certified-machine-learning-engineer-associate/",
          label: "AWS Certified Machine Learning Engineer – Associate — official certification page",
        },
        {
          type: "callout",
          variant: "warn",
          content:
            "==Being retired:== the last day to take MLA-C01 in English is __September 28, 2026__ — it's being replaced by MLA-C02.",
        },
      ],
    },
    {
      id: "cert-mla-c01-syllabus",
      question: "AWS Certified Machine Learning Engineer – Associate (MLA-C01) — syllabus & domains",
      category: "MLA-C01",
      tags: ["AWS", "Syllabus"],
      answer: [
        {
          type: "text",
          content: "Tap a domain, then a task, to see its Knowledge and Skills breakdown.",
        },
        {
          type: "accordion",
          items: [
            {
              title: "1. Data Preparation for Machine Learning (ML)",
              badge: "28%",
              content: [
                {
                  type: "accordion",
                  items: [
                    {
                      title: "1.1 Ingest and store data",
                      content: [
                        { type: "heading", content: "Knowledge of" },
                        {
                          type: "list",
                          items: [
                            "Data formats and ingestion mechanisms (validated/non-validated formats, Parquet, JSON, CSV, ORC, Avro, RecordIO)",
                            "How to use the core AWS data sources (Amazon S3, Amazon EFS, Amazon FSx for NetApp ONTAP)",
                            "How to use AWS streaming data sources to ingest data (Kinesis, Apache Flink, Apache Kafka)",
                            "AWS storage options, including use cases and tradeoffs",
                          ],
                        },
                        { type: "heading", content: "Skills in" },
                        {
                          type: "list",
                          items: [
                            "Extracting data from storage (S3, EBS, EFS, RDS, DynamoDB) using relevant AWS service options",
                            "Choosing appropriate data formats based on data access patterns",
                            "Ingesting data into SageMaker Data Wrangler and SageMaker Feature Store",
                            "Merging data from multiple sources (programming techniques, AWS Glue, Apache Spark)",
                            "Troubleshooting and debugging data ingestion and storage issues involving capacity and scalability",
                            "Making initial storage decisions based on cost, performance, and data structure",
                          ],
                        },
                      ],
                    },
                    {
                      title: "1.2 Transform data and perform feature engineering",
                      content: [
                        { type: "heading", content: "Knowledge of" },
                        {
                          type: "list",
                          items: [
                            "Data cleaning and transformation techniques (detecting/treating outliers, imputing missing data, combining, deduplication)",
                            "Feature engineering techniques (scaling, standardization, feature splitting, binning, log transformation, normalization)",
                            "Encoding techniques (one-hot, binary, label encoding, tokenization)",
                            "Tools to explore, visualize, or transform data and features (SageMaker Data Wrangler, AWS Glue, DataBrew)",
                            "Services that transform streaming data (AWS Lambda, Spark)",
                            "Data annotation and labeling services that create high-quality labeled datasets",
                          ],
                        },
                        { type: "heading", content: "Skills in" },
                        {
                          type: "list",
                          items: [
                            "Transforming data using AWS tools (Glue, DataBrew, Spark on EMR, SageMaker Data Wrangler)",
                            "Creating and managing features using AWS tools (SageMaker Feature Store)",
                            "Validating and labeling data using AWS services (SageMaker Ground Truth, Amazon Mechanical Turk)",
                          ],
                        },
                      ],
                    },
                    {
                      title: "1.3 Ensure data integrity and prepare data for modeling",
                      content: [
                        { type: "heading", content: "Knowledge of" },
                        {
                          type: "list",
                          items: [
                            "Pre-training bias metrics for numeric, text, and image data (class imbalance, difference in proportions of labels)",
                            "Strategies to address class imbalance in numeric, text, and image datasets (synthetic data generation, resampling)",
                            "Techniques to encrypt data",
                            "Data classification, anonymization, and masking",
                            "Implications of compliance requirements (PII, PHI, data residency)",
                          ],
                        },
                        { type: "heading", content: "Skills in" },
                        {
                          type: "list",
                          items: [
                            "Validating data quality (DataBrew, AWS Glue Data Quality)",
                            "Identifying and mitigating sources of bias in data (selection bias, measurement bias) using AWS tools (SageMaker Clarify)",
                            "Preparing data to reduce prediction bias (dataset splitting, shuffling, augmentation)",
                            "Configuring data to load into the model training resource (EFS, FSx)",
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              title: "2. ML Model Development",
              badge: "26%",
              content: [
                {
                  type: "accordion",
                  items: [
                    {
                      title: "2.1 Choose a modeling approach",
                      content: [
                        { type: "heading", content: "Knowledge of" },
                        {
                          type: "list",
                          items: [
                            "Capabilities and appropriate uses of ML algorithms to solve business problems",
                            "How to use AWS AI services (Translate, Transcribe, Rekognition, Bedrock) to solve specific business problems",
                            "How to consider interpretability during model or algorithm selection",
                            "SageMaker AI built-in algorithms and when to apply them",
                          ],
                        },
                        { type: "heading", content: "Skills in" },
                        {
                          type: "list",
                          items: [
                            "Assessing available data and problem complexity to determine ML solution feasibility",
                            "Comparing and selecting appropriate ML models or algorithms for specific problems",
                            "Choosing built-in algorithms, foundation models, and solution templates (SageMaker JumpStart, Amazon Bedrock)",
                            "Selecting models or algorithms based on cost",
                            "Selecting AI services to solve common business needs",
                          ],
                        },
                      ],
                    },
                    {
                      title: "2.2 Train and refine models",
                      content: [
                        { type: "heading", content: "Knowledge of" },
                        {
                          type: "list",
                          items: [
                            "Elements in the training process (epoch, steps, batch size)",
                            "Methods to reduce model training time (early stopping, distributed training)",
                            "Factors that influence model size",
                            "Methods to improve model performance",
                            "Benefits of regularization techniques (dropout, weight decay, L1/L2)",
                            "Hyperparameter tuning techniques (random search, Bayesian optimization)",
                            "Model hyperparameters and their effects on performance (trees in a tree-based model, layers in a neural network)",
                            "Methods to integrate models built outside SageMaker AI into SageMaker AI",
                          ],
                        },
                        { type: "heading", content: "Skills in" },
                        {
                          type: "list",
                          items: [
                            "Using SageMaker AI built-in algorithms and common ML libraries to develop ML models",
                            "Using SageMaker AI script mode with supported frameworks to train models (TensorFlow, PyTorch)",
                            "Using custom datasets to fine-tune pre-trained models (Bedrock, SageMaker JumpStart)",
                            "Performing hyperparameter tuning (SageMaker AI automatic model tuning)",
                            "Integrating automated hyperparameter optimization capabilities",
                            "Preventing overfitting, underfitting, and catastrophic forgetting (regularization, feature selection)",
                            "Combining multiple training models to improve performance (ensembling, stacking, boosting)",
                            "Reducing model size (altering data types, pruning, feature selection, compression)",
                            "Managing model versions for repeatability and audits (SageMaker Model Registry)",
                          ],
                        },
                      ],
                    },
                    {
                      title: "2.3 Analyze model performance",
                      content: [
                        { type: "heading", content: "Knowledge of" },
                        {
                          type: "list",
                          items: [
                            "Model evaluation techniques and metrics (confusion matrix, heat maps, F1, accuracy, precision, recall, RMSE, ROC, AUC)",
                            "Methods to create performance baselines",
                            "Methods to identify model overfitting and underfitting",
                            "Metrics available in SageMaker Clarify to gain insights into ML training data and models",
                            "Convergence issues",
                          ],
                        },
                        { type: "heading", content: "Skills in" },
                        {
                          type: "list",
                          items: [
                            "Selecting and interpreting evaluation metrics and detecting model bias",
                            "Assessing tradeoffs between model performance, training time, and cost",
                            "Performing reproducible experiments using AWS services",
                            "Comparing shadow variant performance to production variant performance",
                            "Using SageMaker Clarify to interpret model outputs",
                            "Using SageMaker Model Debugger to debug model convergence",
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              title: "3. Deployment and Orchestration of ML Workflows",
              badge: "22%",
              content: [
                {
                  type: "accordion",
                  items: [
                    {
                      title: "3.1 Select deployment infrastructure based on existing architecture and requirements",
                      content: [
                        { type: "heading", content: "Knowledge of" },
                        {
                          type: "list",
                          items: [
                            "Deployment best practices (versioning, rollback strategies)",
                            "AWS deployment services (SageMaker AI)",
                            "Methods to serve ML models in real time and in batches",
                            "How to provision compute resources in production and test environments (CPU, GPU)",
                            "Model/endpoint requirements for deployment (serverless, real-time, asynchronous endpoints, batch inference)",
                            "How to choose appropriate containers (provided or customized)",
                            "Methods to optimize models on edge devices (SageMaker Neo)",
                          ],
                        },
                        { type: "heading", content: "Skills in" },
                        {
                          type: "list",
                          items: [
                            "Evaluating performance, cost, and latency tradeoffs",
                            "Choosing the appropriate compute environment for training/inference (GPU/CPU, processor family, networking bandwidth)",
                            "Selecting the correct deployment orchestrator (Apache Airflow, SageMaker Pipelines)",
                            "Selecting multi-model or multi-container deployments",
                            "Selecting the correct deployment target (SageMaker AI endpoints, Kubernetes, ECS, EKS, Lambda)",
                            "Choosing model deployment strategies (real time, batch)",
                          ],
                        },
                      ],
                    },
                    {
                      title: "3.2 Create and script infrastructure based on existing architecture and requirements",
                      content: [
                        { type: "heading", content: "Knowledge of" },
                        {
                          type: "list",
                          items: [
                            "Difference between on-demand and provisioned resources",
                            "How to compare scaling policies",
                            "Tradeoffs and use cases of IaC options (CloudFormation, AWS CDK)",
                            "Containerization concepts and AWS container services",
                            "How to use SageMaker AI endpoint auto scaling policies to meet scalability requirements",
                          ],
                        },
                        { type: "heading", content: "Skills in" },
                        {
                          type: "list",
                          items: [
                            "Applying best practices for maintainable, scalable, cost-effective ML solutions (auto scaling, Spot Instances, Lambda behind endpoints)",
                            "Automating provisioning of compute resources, including communication between stacks (CloudFormation, AWS CDK)",
                            "Building and maintaining containers (ECR, EKS, ECS, BYOC with SageMaker AI)",
                            "Configuring SageMaker AI endpoints within the VPC network",
                            "Deploying and hosting models using the SageMaker AI SDK",
                            "Choosing specific metrics for auto scaling (model latency, CPU utilization, invocations per instance)",
                          ],
                        },
                      ],
                    },
                    {
                      title: "3.3 Use automated orchestration tools to set up CI/CD pipelines",
                      content: [
                        { type: "heading", content: "Knowledge of" },
                        {
                          type: "list",
                          items: [
                            "Capabilities and quotas for AWS CodePipeline, AWS CodeBuild, and AWS CodeDeploy",
                            "Automation and integration of data ingestion with orchestration services",
                            "Version control systems and basic usage (Git)",
                            "CI/CD principles and how they fit into ML workflows",
                            "Deployment strategies and rollback actions (blue/green, canary, linear)",
                            "How code repositories and pipelines work together",
                          ],
                        },
                        { type: "heading", content: "Skills in" },
                        {
                          type: "list",
                          items: [
                            "Configuring and troubleshooting CodeBuild, CodeDeploy, and CodePipeline, including stages",
                            "Applying continuous deployment flow structures (Gitflow, GitHub Flow)",
                            "Using AWS services to automate orchestration (deploying ML models, automating model building)",
                            "Configuring training and inference jobs (EventBridge rules, SageMaker Pipelines, CodePipeline)",
                            "Creating automated tests in CI/CD pipelines (integration, unit, end-to-end tests)",
                            "Building and integrating mechanisms to retrain models",
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              title: "4. ML Solution Monitoring, Maintenance, and Security",
              badge: "24%",
              content: [
                {
                  type: "accordion",
                  items: [
                    {
                      title: "4.1 Monitor model inference",
                      content: [
                        { type: "heading", content: "Knowledge of" },
                        {
                          type: "list",
                          items: [
                            "Drift in ML models",
                            "Techniques to monitor data quality and model performance",
                            "Design principles for ML lenses relevant to monitoring",
                          ],
                        },
                        { type: "heading", content: "Skills in" },
                        {
                          type: "list",
                          items: [
                            "Monitoring models in production (SageMaker Model Monitor)",
                            "Monitoring workflows to detect anomalies or errors in data processing or model inference",
                            "Detecting changes in the distribution of data that can affect model performance (SageMaker Clarify)",
                            "Monitoring model performance in production using A/B testing",
                          ],
                        },
                      ],
                    },
                    {
                      title: "4.2 Monitor and optimize infrastructure and costs",
                      content: [
                        { type: "heading", content: "Knowledge of" },
                        {
                          type: "list",
                          items: [
                            "Key performance metrics for ML infrastructure (utilization, throughput, availability, scalability, fault tolerance)",
                            "Monitoring and observability tools (AWS X-Ray, CloudWatch Lambda Insights, CloudWatch Logs Insights)",
                            "How to use AWS CloudTrail to log, monitor, and invoke re-training activities",
                            "Differences between instance types and how they affect performance",
                            "Capabilities of cost analysis tools (Cost Explorer, Billing and Cost Management, Trusted Advisor)",
                            "Cost tracking and allocation techniques (resource tagging)",
                          ],
                        },
                        { type: "heading", content: "Skills in" },
                        {
                          type: "list",
                          items: [
                            "Configuring and using tools to troubleshoot and analyze resources (CloudWatch Logs, alarms)",
                            "Creating CloudTrail trails",
                            "Setting up dashboards to monitor performance metrics (Amazon Quick Sight, CloudWatch dashboards)",
                            "Monitoring infrastructure (EventBridge events)",
                            "Rightsizing instance families and sizes (SageMaker AI Inference Recommender, AWS Compute Optimizer)",
                            "Monitoring and resolving latency and scaling issues",
                            "Preparing infrastructure for cost monitoring (tagging strategy)",
                            "Troubleshooting capacity concerns involving cost and performance (provisioned concurrency, service quotas, auto scaling)",
                            "Optimizing costs and setting cost quotas (Cost Explorer, Trusted Advisor, AWS Budgets)",
                            "Optimizing infrastructure costs by selecting purchasing options (Spot, On-Demand, Reserved Instances, SageMaker AI Savings Plans)",
                          ],
                        },
                      ],
                    },
                    {
                      title: "4.3 Secure AWS resources",
                      content: [
                        { type: "heading", content: "Knowledge of" },
                        {
                          type: "list",
                          items: [
                            "IAM roles, policies, and groups that control access to AWS services (IAM, bucket policies, SageMaker Role Manager)",
                            "SageMaker AI security and compliance features",
                            "Controls for network access to ML resources",
                            "Security best practices for CI/CD pipelines",
                          ],
                        },
                        { type: "heading", content: "Skills in" },
                        {
                          type: "list",
                          items: [
                            "Configuring least privilege access to ML artifacts",
                            "Configuring IAM policies and roles for users and applications that interact with ML systems",
                            "Monitoring, auditing, and logging ML systems to ensure continued security and compliance",
                            "Troubleshooting and debugging security issues",
                            "Building VPCs, subnets, and security groups to securely isolate ML systems",
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "cert-ai-103-link",
      question: "Azure AI-103 — Developing AI Apps and Agents on Azure — official exam page",
      category: "AI-103",
      tags: ["Azure", "Official Page"],
      answer: [
        {
          type: "text",
          content:
            'Officially titled "Developing AI Apps and Agents on Azure," leading to the **Microsoft Certified: Azure AI Apps and Agents Developer Associate** credential. 120 minutes, 700/1000 to pass, $165 USD.',
        },
        {
          type: "link",
          href: "https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-apps-and-agents-developer-associate/",
          label: "Microsoft Certified: Azure AI Apps and Agents Developer Associate — official page",
        },
        {
          type: "callout",
          variant: "info",
          content:
            "AI-103 is the __successor to AI-102__ (Azure AI Engineer Associate), which retired June 30, 2026.",
        },
      ],
    },
    {
      id: "cert-ai-103-syllabus",
      question: "Azure AI-103 — syllabus & domains",
      category: "AI-103",
      tags: ["Azure", "Syllabus"],
      answer: [
        {
          type: "callout",
          variant: "tip",
          content:
            "Built around **Microsoft Foundry** — RAG pipelines, tool-calling agents, multi-agent orchestration, and production guardrails are the center of gravity now, not classic Cognitive Services.",
        },
        {
          type: "accordion",
          items: [
            {
              title: "Plan and manage an Azure AI solution",
              badge: "25–30%",
              content: [
                {
                  type: "accordion",
                  items: [
                    {
                      title: "Choose the appropriate Foundry services for generative AI and agents",
                      content: [
                        {
                          type: "list",
                          items: [
                            "Choose an appropriate model for each task, including LLMs, small language models, multimodal models, and Foundry Tools",
                            "Choose the appropriate Foundry services for generative tasks, grounding, vector search, agent workflows, or multimodal processing",
                            "Choose an appropriate method for retrieval and indexing",
                            "Choose appropriate memory, tool, and knowledge integration services for agent solutions",
                          ],
                        },
                      ],
                    },
                    {
                      title: "Set up AI solutions in Foundry",
                      content: [
                        {
                          type: "list",
                          items: [
                            "Design Azure infrastructure for AI apps and agent-based solutions",
                            "Choose appropriate deployment options",
                            "Configure model and agent deployments",
                            "Integrate Foundry projects with CI/CD pipelines",
                          ],
                        },
                      ],
                    },
                    {
                      title: "Manage, monitor, and secure AI systems",
                      content: [
                        {
                          type: "list",
                          items: [
                            "Manage quotas, scaling, rate limits, and cost footprints for model and agent workloads",
                            "Monitor model performance, drift, safety events, and grounding quality",
                            "Monitor data ingestion quality, search index health, and relevance performance",
                            "Configure security, including managed identity, private networking, keyless credentials, and role policies",
                          ],
                        },
                      ],
                    },
                    {
                      title: "Implement responsible AI across generative AI and agentic systems",
                      content: [
                        {
                          type: "list",
                          items: [
                            "Configure safety filters, guardrails, risk detection, and content moderation",
                            "Apply responsible AI instrumentation, including evaluators, safety evaluations, and explanation tooling",
                            "Implement auditing through trace logging, provenance metadata, and approval workflows",
                            "Govern agent behavior with oversight modes, constraints, and tool-access controls",
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              title: "Implement generative AI and agentic solutions",
              badge: "30–35%",
              content: [
                {
                  type: "callout",
                  variant: "tip",
                  content: "==The largest domain on the exam.==",
                },
                {
                  type: "accordion",
                  items: [
                    {
                      title: "Build generative applications by using Foundry",
                      content: [
                        {
                          type: "list",
                          items: [
                            "Deploy and consume LLMs, small models, code models, and multimodal models",
                            "Implement retrieval-augmented generation (RAG) in an application",
                            "Design workflows, tool-augmented flows, and multistep reasoning pipelines",
                            "Evaluate models and apps, including detecting fabrications, relevance, quality, and safety",
                            "Integrate generative workflows into applications using Foundry SDKs and connectors",
                            "Configure an application to connect to a Foundry project",
                          ],
                        },
                      ],
                    },
                    {
                      title: "Build agents by using Foundry",
                      content: [
                        {
                          type: "list",
                          items: [
                            "Define agent roles, goals, conversation-tracking approach, and tool schemas",
                            "Build agents that integrate retrieval, function-calling, and conversation memory",
                            "Integrate agent tools, including APIs, knowledge stores, search, content understanding, and custom functions",
                            "Implement orchestrated multi-agent solutions",
                            "Build autonomous or semiautonomous workflows with safeguards and approval flow controls",
                            "Integrate monitoring into deployed agents, evaluate agent behavior, and perform error analysis",
                          ],
                        },
                      ],
                    },
                    {
                      title: "Optimize and operationalize generative AI systems",
                      content: [
                        {
                          type: "list",
                          items: [
                            "Tune generation behavior, such as prompt engineering and adjusting model parameters",
                            "Implement model reflection, chain-of-thought evaluations, and self-critique loops",
                            "Set up observability by implementing tracing, token analytics, safety signals, and latency breakdowns",
                            "Orchestrate multiple models, flows, or hybrid LLM and rules engines",
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              title: "Implement computer vision solutions",
              badge: "10–15%",
              content: [
                {
                  type: "accordion",
                  items: [
                    {
                      title: "Design and implement image- and video-generation solutions",
                      content: [
                        {
                          type: "list",
                          items: [
                            "Implement a solution that generates images from text prompts and reference media",
                            "Implement a solution that generates videos from text prompts and reference media",
                            "Configure image-editing workflows, including inpainting, mask-based edits, and prompt-driven modifications",
                            "Implement workflows to edit generated videos",
                            "Select and apply appropriate generation and editing controls provided by the platform",
                          ],
                        },
                      ],
                    },
                    {
                      title: "Design and implement multimodal understanding workflows",
                      content: [
                        {
                          type: "list",
                          items: [
                            "Build a solution that analyzes visual context using multimodal models",
                            "Configure apps to produce concise or detailed captions for single or multiple images",
                            "Implement a solution that enables question-answering grounded in visual evidence",
                            "Configure generation of alt-text and extended image descriptions aligned to accessibility guidelines",
                            "Implement visual understanding by configuring Azure Content Understanding in Foundry Tools to extract visual characteristics",
                            "Implement video analysis workflows to process and interpret video segments",
                            "Configure single-task and pro-mode Content Understanding pipelines",
                            "Implement solutions that identify objects, components, or regions within images or video",
                          ],
                        },
                      ],
                    },
                    {
                      title: "Implement responsible AI for multimodal content",
                      content: [
                        {
                          type: "list",
                          items: [
                            "Implement filters to classify unsafe or disallowed visual content",
                            "Detect and mitigate indirect prompt injection using embedded text in images",
                            "Enforce visual policy rules (watermarks, prohibited symbols, brand usage, inappropriate content detection)",
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              title: "Implement text analysis solutions",
              badge: "10–15%",
              content: [
                {
                  type: "accordion",
                  items: [
                    {
                      title: "Apply language model text analysis",
                      content: [
                        {
                          type: "list",
                          items: [
                            "Implement solutions to extract entities, topics, summaries, and structured JSON outputs using generative prompting and Foundry Tools",
                            "Configure detection of sentiment, tone, safety issues, and sensitive content",
                            "Build solutions that translate text using Azure Translator in Foundry Tools or LLM-powered translation flows",
                            "Customize language model outputs for domain tasks (compliance summarization, domain extraction)",
                          ],
                        },
                      ],
                    },
                    {
                      title: "Implement speech solutions",
                      content: [
                        {
                          type: "list",
                          items: [
                            "Implement workflows to convert speech to text and text to speech for agentic interactions",
                            "Integrate speech as an agent modality, including custom speech models",
                            "Enable multimodal reasoning from audio inputs",
                            "Translate speech into other languages using language models and Foundry Tools",
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              title: "Implement information extraction solutions",
              badge: "10–15%",
              content: [
                {
                  type: "accordion",
                  items: [
                    {
                      title: "Build retrieval and grounding pipelines",
                      content: [
                        {
                          type: "list",
                          items: [
                            "Ingest and index content, such as documents, images, audio, and video",
                            "Configure semantic search, hybrid search, and vector search for grounding",
                            "Implement enrichment using custom or built-in skills for text, images, and layout",
                            "Configure RAG ingestion flow, including documents and OCR",
                            "Connect retrieval pipelines directly to workflows and agent tools",
                          ],
                        },
                      ],
                    },
                    {
                      title: "Extract content from documents",
                      content: [
                        {
                          type: "list",
                          items: [
                            "Extract information using multimodal pipelines that combine OCR, layout analysis, and field extraction",
                            "Produce clean, grounded representations for agents and RAG using Content Understanding",
                            "Implement analyzers for generating structured or markdown outputs for downstream reasoning using Content Understanding",
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "cert-pmle-link",
      question: "Google Cloud Professional Machine Learning Engineer (PMLE) — official exam page",
      category: "PMLE",
      tags: ["GCP", "Official Page"],
      answer: [
        {
          type: "text",
          content:
            "2 hours, 50–60 multiple choice/multiple select questions, $200 USD. Recommended: 3+ years industry experience, 1+ year on Google Cloud.",
        },
        {
          type: "link",
          href: "https://cloud.google.com/learn/certification/machine-learning-engineer",
          label: "Professional ML Engineer Certification — official Google Cloud page",
        },
      ],
    },
    {
      id: "cert-pmle-syllabus",
      question: "Google Cloud PMLE — syllabus & domains",
      category: "PMLE",
      tags: ["GCP", "Syllabus"],
      answer: [
        {
          type: "callout",
          variant: "info",
          content:
            "Google's own exam guide doesn't publish per-domain weightings — it lists 6 sections with task-level detail instead.",
        },
        {
          type: "accordion",
          items: [
            {
              title: "1. ML Problem Framing",
              content: [
                {
                  type: "list",
                  items: [
                    "Translate business challenge into ML use case",
                    "Define ML problem",
                    "Define business success criteria",
                    "Identify risks to feasibility and implementation of ML solution",
                  ],
                },
              ],
            },
            {
              title: "2. ML Solution Architecture",
              content: [
                {
                  type: "list",
                  items: [
                    "Design reliable, scalable, highly available ML solutions",
                    "Choose appropriate Google Cloud software components",
                    "Choose appropriate Google Cloud hardware components",
                    "Design architecture that complies with regulatory and security concerns",
                  ],
                },
              ],
            },
            {
              title: "3. Data Preparation and Processing",
              content: [
                {
                  type: "list",
                  items: [
                    "Data ingestion",
                    "Data exploration (EDA)",
                    "Design data pipelines",
                    "Build data pipelines",
                    "Feature engineering",
                  ],
                },
              ],
            },
            {
              title: "4. ML Model Development",
              content: [
                {
                  type: "list",
                  items: ["Build a model", "Train a model", "Test a model", "Scale model training and serving"],
                },
              ],
            },
            {
              title: "5. ML Pipeline Automation & Orchestration",
              content: [
                {
                  type: "list",
                  items: [
                    "Design pipeline",
                    "Implement training pipeline",
                    "Implement serving pipeline",
                    "Track and audit metadata",
                    "Use CI/CD to test and deploy models",
                  ],
                },
              ],
            },
            {
              title: "6. ML Solution Monitoring, Optimization, and Maintenance",
              content: [
                {
                  type: "list",
                  items: [
                    "Monitor ML solutions",
                    "Troubleshoot ML solutions",
                    "Tune performance of ML solutions for training & serving in production",
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "cert-ccar-f-link",
      question: "Claude Certified Architect – Foundations (CCAR-F) — official access page",
      category: "CCA-F",
      tags: ["Anthropic", "Official Page"],
      answer: [
        {
          type: "callout",
          variant: "warn",
          content:
            '==Code correction:== "CCA-F" isn\'t a real Anthropic exam code — the actual credential is __CCAR-F__ (Claude Certified Architect – Foundations). Kept this tab labeled CCA-F so the link stays put; the content below is for the real CCAR-F exam.',
        },
        {
          type: "text",
          content:
            "Scenario-based, 60 questions, 120 minutes, scaled passing score 720/1000, $125 USD, valid 12 months. Tests Claude Code, the Claude Agent SDK, the Claude API, and MCP.",
        },
        {
          type: "link",
          href: "https://anthropic.skilljar.com/claude-certified-architect-foundations-access-request",
          label: "Claude Certified Architect – Foundations — official Anthropic access request page",
        },
      ],
    },
    {
      id: "cert-ccar-f-syllabus",
      question: "Claude Certified Architect – Foundations (CCAR-F) — syllabus & domains",
      category: "CCA-F",
      tags: ["Anthropic", "Syllabus"],
      answer: [
        {
          type: "callout",
          variant: "warn",
          content:
            "Anthropic's own exam guide doesn't publish task-level detail the way AWS does — the sub-topics below are drawn from community study guides that track the published blueprint, not the official guide itself.",
        },
        {
          type: "accordion",
          items: [
            {
              title: "1. Agentic Architecture & Orchestration",
              badge: "27%",
              content: [
                {
                  type: "callout",
                  variant: "tip",
                  content: "==The single heaviest domain across all four Claude certifications.==",
                },
                {
                  type: "list",
                  items: [
                    "Foundations of agentic systems",
                    "Task decomposition and planning",
                    "Multi-agent system patterns (hub-and-spoke orchestration, subagent coordination)",
                    "Designing and implementing agentic loops with the Claude Agent SDK",
                    "Reliability patterns for autonomous systems",
                  ],
                },
              ],
            },
            {
              title: "2. Tool Design & MCP Integration",
              badge: "18%",
              content: [
                {
                  type: "list",
                  items: [
                    "Model Context Protocol (MCP) foundations",
                    "Designing effective MCP tool interfaces and MCP servers",
                    "Managing tool boundaries to prevent reasoning overload",
                    "Implementing structured error responses",
                    "Distributing tools across agents",
                  ],
                },
              ],
            },
            {
              title: "3. Claude Code Configuration & Workflows",
              badge: "20%",
              content: [
                {
                  type: "text",
                  content:
                    "Weighted notably higher on the Architect exam (20%) than on the Developer exam (3.1%) — configuring and working with Claude Code as part of a production agentic workflow.",
                },
              ],
            },
            {
              title: "4. Prompt Engineering & Structured Output",
              badge: "20%",
              content: [
                {
                  type: "list",
                  items: [
                    "Prompt engineering techniques for agentic and production contexts",
                    "Designing structured output for reliable downstream consumption",
                  ],
                },
              ],
            },
            {
              title: "5. Context Management & Reliability",
              badge: "15%",
              content: [
                {
                  type: "text",
                  content:
                    "Managing context windows and session state, and applying reliability patterns so agentic systems behave predictably in production.",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "cert-mla-c02-link",
      question: "AWS Certified Machine Learning Engineer – Associate (MLA-C02) — official exam page",
      category: "MLA-C02",
      tags: ["AWS", "Official Page"],
      answer: [
        {
          type: "callout",
          variant: "warn",
          content:
            "==In beta:== registration for the MLA-C02 beta opened September 1, 2026; the beta exam (English only) goes live __September 29, 2026__ — the day after MLA-C01 retires.",
        },
        {
          type: "text",
          content:
            "Replaces MLA-C01. Adds generative AI (Amazon Bedrock, RAG), agentic AI, foundation model selection/fine-tuning, and responsible AI across traditional ML and GenAI — the 4-domain structure stays the same.",
        },
        {
          type: "link",
          href: "https://docs.aws.amazon.com/aws-certification/latest/machine-learning-engineer-associate-02/machine-learning-engineer-associate-02.html",
          label: "AWS Certified Machine Learning Engineer – Associate (MLA-C02) — official exam guide",
        },
      ],
    },
    {
      id: "cert-mla-c02-syllabus",
      question: "AWS Certified Machine Learning Engineer – Associate (MLA-C02) — syllabus & domains",
      category: "MLA-C02",
      tags: ["AWS", "Syllabus"],
      answer: [
        {
          type: "text",
          content: "Tap a domain, then a task, to see its exact skill statements.",
        },
        {
          type: "accordion",
          items: [
            {
              title: "1. Data Preparation for ML and AI",
              badge: "28%",
              content: [
                {
                  type: "accordion",
                  items: [
                    {
                      title: "1.1 Collect and store data",
                      content: [
                        {
                          type: "list",
                          items: [
                            "Extract data from data sources (S3, EBS, EFS, RDS, DynamoDB, OpenSearch Service)",
                            "Make storage decisions and configure storage services based on cost, performance, data structure, and data compliance",
                            "Troubleshoot and debug data ingestion and storage issues involving capacity and scalability",
                            "Use AWS streaming data sources to ingest data (Kinesis, Apache Flink, Apache Kafka)",
                            "Ingest from and write by using appropriate data formats (Parquet, JSON, CSV, ORC) based on data access patterns",
                            "Merge data from multiple sources (programming techniques, AWS Glue, Apache Spark)",
                            "Configure scalable vector databases for AI applications (OpenSearch Service, RDS with pgvector, S3) based on specifications",
                            "Ingest and store diverse data types (text, images, audio) for AI and ML applications",
                            "Ingest data into SageMaker Feature Store",
                          ],
                        },
                      ],
                    },
                    {
                      title: "1.2 Perform data transformation, feature engineering, and pre-processing",
                      content: [
                        {
                          type: "list",
                          items: [
                            "Transform data using AWS tools (AWS Glue, DataBrew, Spark on EMR, SageMaker Data Wrangler)",
                            "Create and manage features using AWS tools (SageMaker Feature Store)",
                            "Transform streaming data (AWS Lambda, Spark)",
                            "Perform feature engineering (scaling, standardization, feature splitting, binning, log transformation, normalization)",
                            "Configure and use embedding models to transform text and image data into numerical representations",
                            "Apply advanced text pre-processing techniques (tokenization, domain-specific augmentation)",
                            "Prepare documents for RAG applications (chunking strategies, metadata extraction)",
                            "Mask, redact, and anonymize data",
                            "Prepare data for FM fine-tuning, continuous pre-training, and model distillation",
                          ],
                        },
                      ],
                    },
                    {
                      title: "1.3 Validate data quality and manage bias",
                      content: [
                        {
                          type: "list",
                          items: [
                            "Validate data quality (DataBrew, AWS Glue Data Quality)",
                            "Label and annotate data",
                            "Identify and mitigate sources of bias in data using AWS tools and techniques (dataset splitting, shuffling, augmentation)",
                            "Optimize multimodal data distributions by applying bias metrics across numeric, text, and image assets",
                            "Resolve class imbalance in numeric, text, and image datasets",
                            "Validate AI training data integrity (prompt-response pair validation, content safety screening)",
                            "Clean data (detecting outliers, imputing missing data, deduplication)",
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              title: "2. ML Model and Foundation Model (FM) Development",
              badge: "24%",
              content: [
                {
                  type: "accordion",
                  items: [
                    {
                      title: "2.1 Choose appropriate modeling approaches for ML and AI solutions",
                      content: [
                        {
                          type: "list",
                          items: [
                            "Evaluate and select appropriate FMs from Amazon Bedrock based on task requirements and performance criteria",
                            "Identify fine-tuning strategies for pre-trained FMs to meet business needs",
                            "Compare and select appropriate ML models, GenAI models, algorithms, and solution templates (interpretability, domain-specific performance, latency)",
                            "Evaluate tradeoffs between custom solutions, managed services, pre-trained models, and FMs",
                            "Select RAG architecture patterns based on use case requirements",
                            "Assess tradeoffs between ML model performance, training time, and cost",
                            "Assess tradeoffs between AI model performance, latency, and cost",
                            "Apply AWS AI services to solve specific business problems (Textract, Rekognition, Comprehend, Transcribe)",
                          ],
                        },
                      ],
                    },
                    {
                      title: "2.2 Train, fine-tune, and customize models for ML and AI solutions",
                      content: [
                        {
                          type: "list",
                          items: [
                            "Apply SageMaker AI built-in algorithms and common ML libraries",
                            "Configure SageMaker AI script mode with supported frameworks for simplicity and performance",
                            "Implement hyperparameter optimization (SageMaker AI automatic model tuning)",
                            "Implement training time reduction techniques (early stopping, distributed training)",
                            "Prevent model overfitting, underfitting, and catastrophic forgetting",
                            "Combine multiple ML models to improve performance or reduce cost",
                            "Adjust fundamental hyperparameters (epoch, steps, batch size)",
                            "Apply customization techniques for AI solutions (task-specific prompt engineering, fine-tuning)",
                            "Optimize retrieval components and embedding models",
                          ],
                        },
                      ],
                    },
                    {
                      title: "2.3 Analyze and evaluate the performance of ML and AI systems",
                      content: [
                        {
                          type: "list",
                          items: [
                            "Perform reproducible experiments (MLflow on SageMaker AI, Bedrock evaluations, Bedrock Prompt Management)",
                            "Create model performance baselines and implement drift detection",
                            "Compare shadow variant performance to production variant performance",
                            "Explain model outputs",
                            "Debug model convergence issues",
                            "Apply comprehensive model evaluation techniques for traditional ML and GenAI models",
                            "Implement integrated human evaluation frameworks (human-in-the-loop workflows, text generation quality assessment)",
                            "Apply NLP evaluation metrics (BLEU, ROUGE, BERTScore, semantic similarity)",
                            "Perform AI evaluation (model output assessment, content quality validation, bias detection, LLM-as-a-judge frameworks)",
                            "Configure RAG system monitoring, including retrieval accuracy assessment",
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              title: "3. Deployment and Orchestration of ML and AI Workflows",
              badge: "24%",
              content: [
                {
                  type: "accordion",
                  items: [
                    {
                      title: "3.1 Manage deployment infrastructure for ML and AI model types",
                      content: [
                        {
                          type: "list",
                          items: [
                            "Select appropriate compute environments and deployment targets",
                            "Select deployment orchestrators and multi-model or multi-container deployment strategies",
                            "Select model inference strategies (real-time and batch processing)",
                            "Evaluate and select appropriate FM deployment options",
                            "Deploy models that were built outside AWS into AWS environments (SageMaker AI, Bedrock Custom Model Import)",
                            "Deploy and configure agents for specific tasks, integration with other services and tools, and agent communication protocols",
                            "Configure FM deployment, model hosting, and resource allocation",
                            "Apply RAG system configurations (retrieval strategies, reranking)",
                          ],
                        },
                      ],
                    },
                    {
                      title: "3.2 Provision and configure resources for ML and AI workloads",
                      content: [
                        {
                          type: "list",
                          items: [
                            "Optimize resource provisioning between on-demand and provisioned resources for performance and cost efficiency",
                            "Automate compute resource provisioning with integrated communication between stacks and orchestration services",
                            "Build and maintain containers for ML and AI workloads",
                            "Configure SageMaker AI endpoints within VPC network environments",
                            "Deploy and host models programmatically (SageMaker AI SDK for Python, AWS CLI, Boto3)",
                            "Select specific metrics for auto scaling implementations",
                            "Create and manage Bedrock knowledge bases with vector database configurations, document indexing, and retrieval optimization",
                            "Implement retrieval pipelines to meet business needs",
                            "Implement agent state management systems",
                            "Implement AI-specific resource scaling for GPU workloads",
                            "Deploy agentic workflow infrastructure",
                          ],
                        },
                      ],
                    },
                    {
                      title: "3.3 Implement automated orchestration and CI/CD pipelines for MLOps and AI workloads",
                      content: [
                        {
                          type: "list",
                          items: [
                            "Implement automated deployment strategies and rollback actions",
                            "Configure and troubleshoot AWS CodeBuild, CodeCommit, CodeDeploy, CodePipeline, and CodeConnections",
                            "Configure training and inference jobs",
                            "Configure automated testing strategies within CI/CD pipelines for traditional ML and AI workloads",
                            "Build and integrate mechanisms to re-train models",
                            "Manage model versions for repeatability and audits (SageMaker Model Registry, MLflow on SageMaker AI)",
                            "Manage prompts (Amazon Bedrock Prompt Management)",
                            "Implement automated agent deployment pipelines and agent version management",
                            "Implement AI model testing frameworks, including prompt testing",
                            "Configure FM deployment automation with fine-tuned model versioning",
                            "Configure AI-specific pipeline orchestration for RAG system updates and knowledge base refresh cycles",
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              title: "4. Operating, Monitoring, and Securing ML and AI Solutions",
              badge: "24%",
              content: [
                {
                  type: "accordion",
                  items: [
                    {
                      title: "4.1 Monitor ML and AI model inference and performance",
                      content: [
                        {
                          type: "list",
                          items: [
                            "Monitor model performance in production using Amazon CloudWatch generative AI observability, Bedrock Model Evaluation, and drift detection pipelines",
                            "Monitor workflows to detect anomalies or errors in data processing or model inference",
                            "Detect changes in data distribution that can affect model performance",
                            "Monitor model performance in production using A/B testing",
                            "Monitor and automate the management of agent performance and coordination (coordination failure detection, truncated streaming, tool failures)",
                            "Configure AI-specific performance monitoring for FMs (Amazon Bedrock evaluations)",
                          ],
                        },
                      ],
                    },
                    {
                      title: "4.2 Optimize and manage ML and AI infrastructure costs and performance",
                      content: [
                        {
                          type: "list",
                          items: [
                            "Select inference instance families to optimize performance and cost",
                            "Configure and use tools to troubleshoot and analyze resources (CloudWatch, Bedrock AgentCore Observability, AWS X-Ray)",
                            "Set up dashboards to monitor performance metrics",
                            "Optimize capacity for cost, performance, and reliability",
                            "Optimize costs and set cost quotas using appropriate cost management tools",
                            "Optimize infrastructure costs by selecting purchasing options",
                            "Evaluate cost implications of using FMs for inference in production",
                            "Monitor agent resource consumption patterns",
                            "Manage FM inference costs with usage optimization",
                            "Monitor AI-specific cost patterns (token usage optimization, embedding computation costs, vector database storage optimization)",
                          ],
                        },
                      ],
                    },
                    {
                      title: "4.3 Secure ML and AI workloads and model endpoints",
                      content: [
                        {
                          type: "list",
                          items: [
                            "Secure CI/CD pipelines by checking for code and image vulnerabilities (Amazon CodeGuru, Amazon Inspector)",
                            "Configure least privilege access to ML and AI artifacts",
                            "Configure IAM policies and roles for users and applications in ML and AI systems",
                            "Configure comprehensive monitoring, auditing, compliance, and logging for ML and AI systems (AWS CloudTrail, AWS Config)",
                            "Troubleshoot and debug security issues in ML and AI systems",
                            "Create VPCs, subnets, and security groups to securely isolate ML and AI systems",
                            "Identify and mitigate security risks and vulnerabilities in ML and AI systems",
                            "Select the appropriate credential type to access FMs (Bedrock API keys, IAM credentials)",
                            "Implement safeguards and sensitive data protection to meet application requirements and responsible AI policies (Amazon Bedrock Guardrails)",
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
