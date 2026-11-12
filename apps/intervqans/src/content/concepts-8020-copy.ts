import {
  Bot,
  BrainCircuit,
  ClipboardCheck,
  Database,
  FileCode2,
  Flag,
  Gauge,
  Globe,
  Layers,
  Mountain,
  Network,
  PieChart,
  Repeat,
  Rocket,
  RotateCw,
  Scale,
  Shapes,
  ShieldAlert,
  ShieldCheck,
  Sigma,
  SlidersHorizontal,
  Sparkles,
  Table2,
  Tag,
  Tags,
  TrendingDown,
  TrendingUp,
  Trophy,
  Waves,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export interface Concept {
  name: string;
  /** One-line definition shown beside the topic. */
  definition: string;
  /** Phrase inside `definition` to emphasise in the row's colour. */
  key: string;
  /** Falls back to the group's icon. */
  icon?: LucideIcon;
}

export interface ConceptGroup {
  title: string;
  icon: LucideIcon;
  concepts: Concept[];
}

const group = (
  title: string,
  icon: LucideIcon,
  rows: [name: string, definition: string, key: string][],
): ConceptGroup => ({
  title,
  icon,
  concepts: rows.map(([name, definition, key]) => ({ name, definition, key })),
});

export const conceptGroups: ConceptGroup[] = [
  {
    title: "Machine Learning Fundamentals — 20 concepts",
    icon: Layers,
    concepts: [
      {
        name: "Artificial Intelligence vs Machine Learning vs Deep Learning",
        definition:
          "AI is the broad goal of smart machines, ML is AI that learns from data, and DL is ML built on deep neural networks.",
        key: "ML is AI that learns from data",
        icon: Layers,
      },
      {
        name: "Supervised Learning",
        definition: "Learns from labelled examples — every input comes with the correct answer.",
        key: "labelled examples",
        icon: Tags,
      },
      {
        name: "Unsupervised Learning",
        definition: "Finds hidden patterns or groups in data that has no labels.",
        key: "hidden patterns or groups",
        icon: Shapes,
      },
      {
        name: "Reinforcement Learning",
        definition:
          "An agent learns by trial and error, earning rewards for good actions and penalties for bad ones.",
        key: "rewards",
        icon: Trophy,
      },
      {
        name: "Regression vs Classification",
        definition: "Regression predicts a number; classification predicts a category.",
        key: "a number",
        icon: TrendingUp,
      },
      {
        name: "Features, Labels, Predictions",
        definition:
          "Features are the inputs, the label is the correct answer, and the prediction is the model's output.",
        key: "Features are the inputs",
        icon: Tag,
      },
      {
        name: "Training, Validation, Test Split",
        definition:
          "Train to learn, validate to tune, and test once at the very end to measure real performance.",
        key: "test once at the very end",
        icon: PieChart,
      },
      {
        name: "Cross-Validation",
        definition:
          "Rotates which slice of the data is held out, so the score doesn't depend on one lucky split.",
        key: "rotates which slice",
        icon: Repeat,
      },
      {
        name: "Model Parameters vs Hyperparameters",
        definition:
          "Parameters are learned from the data during training; hyperparameters are set by you before it starts.",
        key: "set by you",
        icon: SlidersHorizontal,
      },
      {
        name: "Loss Functions",
        definition:
          "A score of how wrong the predictions are — training is the job of pushing it down.",
        key: "how wrong the predictions are",
        icon: TrendingDown,
      },
      {
        name: "Gradient Descent",
        definition:
          "Repeatedly nudges the parameters in the direction that reduces the loss the most.",
        key: "reduces the loss",
        icon: Mountain,
      },
      {
        name: "Learning Rate",
        definition:
          "The size of each gradient descent step — too big overshoots, too small crawls.",
        key: "size of each gradient descent step",
        icon: Gauge,
      },
      {
        name: "Epochs, Batches, Iterations",
        definition:
          "An epoch is one full pass over the data, split into batches; each batch update is one iteration.",
        key: "one full pass",
        icon: RotateCw,
      },
      {
        name: "Overfitting vs Underfitting",
        definition:
          "Overfitting memorises the training data; underfitting is too simple to learn the pattern.",
        key: "memorises",
        icon: Waves,
      },
      {
        name: "Bias-Variance Tradeoff",
        definition:
          "Simple models miss patterns (high bias), complex ones chase noise (high variance) — aim for the balance.",
        key: "aim for the balance",
        icon: Scale,
      },
      {
        name: "Regularization — L1 and L2",
        definition:
          "Adds a penalty on large weights to curb overfitting; L1 can zero weights out, L2 shrinks them.",
        key: "penalty on large weights",
        icon: ShieldCheck,
      },
      {
        name: "Generalization Error",
        definition: "The error on new, unseen data — the true measure of how well a model learned.",
        key: "unseen data",
        icon: Globe,
      },
      {
        name: "Hyperparameter Tuning",
        definition:
          "Searching for the best hyperparameter settings, with validation performance as the judge.",
        key: "best hyperparameter settings",
        icon: Wrench,
      },
      {
        name: "Baseline Models",
        definition:
          "A simple reference model that any fancier model has to beat to be worth using.",
        key: "simple reference model",
        icon: Flag,
      },
      {
        name: "Scikit-learn Pipelines",
        definition:
          "Chain preprocessing and the model into one object, so the exact same steps run in training and prediction.",
        key: "one object",
        icon: Workflow,
      },
    ],
  },
  group("Essential ML Algorithms — 15 concepts", Network, [
    [
      "Linear Regression",
      "Fits a straight line (or plane) through the data to predict a number.",
      "straight line",
    ],
    [
      "Logistic Regression",
      "Predicts the probability of a class by passing a linear score through a sigmoid — used for classification.",
      "probability of a class",
    ],
    [
      "Decision Trees",
      "Splits the data with a series of if-else questions until each branch gives a prediction.",
      "if-else questions",
    ],
    [
      "Random Forest",
      "Many decision trees trained on random slices of the data and features, then voted together.",
      "voted together",
    ],
    [
      "Gradient Boosting",
      "Builds trees one after another, each one correcting the errors of the ones before.",
      "correcting the errors",
    ],
    [
      "XGBoost / LightGBM",
      "Fast, heavily tuned gradient boosting libraries — the go-to choice for tabular data.",
      "tabular data",
    ],
    [
      "K-Nearest Neighbors (KNN)",
      "Predicts from the K closest examples — the neighbours vote.",
      "K closest examples",
    ],
    [
      "K-Means Clustering",
      "Groups unlabelled data into K clusters around moving centre points.",
      "K clusters",
    ],
    [
      "Principal Component Analysis (PCA)",
      "Squeezes many features into fewer new ones that keep most of the variation.",
      "keep most of the variation",
    ],
    [
      "Naive Bayes",
      "A fast probabilistic classifier built on Bayes' theorem, assuming features are independent.",
      "assuming features are independent",
    ],
    [
      "Support Vector Machines (SVM)",
      "Finds the boundary with the widest margin between classes.",
      "widest margin",
    ],
    [
      "Ensemble Learning",
      "Combines several models so the group beats any single one.",
      "beats any single one",
    ],
    [
      "Bagging vs Boosting",
      "Bagging trains models in parallel to cut variance; boosting trains them in sequence to cut bias.",
      "in parallel to cut variance",
    ],
    [
      "Anomaly Detection",
      "Spots rare data points that don't fit the normal pattern — fraud, faults, intrusions.",
      "rare data points",
    ],
    [
      "Recommendation Systems",
      "Suggest items a user is likely to want, using past behaviour and similar users or items.",
      "likely to want",
    ],
  ]),
  group("Model Evaluation — 15 concepts", ClipboardCheck, [
    [
      "Confusion Matrix",
      "A table of right and wrong predictions: true and false positives and negatives.",
      "true and false positives and negatives",
    ],
    [
      "Accuracy",
      "The share of all predictions that are correct — misleading when classes are imbalanced.",
      "misleading when classes are imbalanced",
    ],
    [
      "Precision",
      "Of everything predicted positive, how much really was positive.",
      "predicted positive",
    ],
    ["Recall", "Of everything actually positive, how much the model caught.", "actually positive"],
    [
      "F1 Score",
      "The harmonic mean of precision and recall — one number that balances both.",
      "harmonic mean",
    ],
    [
      "ROC-AUC",
      "How well the model ranks positives above negatives across all thresholds; 1.0 is perfect, 0.5 is guessing.",
      "ranks positives above negatives",
    ],
    [
      "Precision-Recall Curve / PR-AUC",
      "Plots precision against recall across thresholds — the better view when positives are rare.",
      "when positives are rare",
    ],
    [
      "MAE, MSE, RMSE",
      "Regression error scores: average absolute error, average squared error, and its square root.",
      "Regression error scores",
    ],
    [
      "R² Score",
      "The share of the target's variation the model explains; 1.0 is perfect.",
      "share of the target's variation",
    ],
    [
      "Classification Threshold Tuning",
      "Moving the cut-off that turns a probability into a class, to trade misses against false alarms.",
      "cut-off",
    ],
    [
      "Precision-Recall Tradeoff",
      "Raising one usually lowers the other, so pick the balance your use case can live with.",
      "Raising one usually lowers the other",
    ],
    [
      "Stratified Sampling",
      "Splits that keep the same class proportions as the full data in every set or fold.",
      "same class proportions",
    ],
    [
      "Learning Curves",
      "Plot training and validation score against data size or epochs to spot over- or underfitting.",
      "training and validation score",
    ],
    [
      "Error Analysis",
      "Studying the examples the model gets wrong to find the patterns worth fixing.",
      "gets wrong",
    ],
    [
      "Model Calibration",
      "Checks that a predicted 80% really means right about 80% of the time.",
      "predicted 80%",
    ],
  ]),
  group("Deep Learning and Neural Networks — 20 concepts", BrainCircuit, [
    [
      "Artificial Neural Networks (ANN)",
      "Layers of connected neurons that learn patterns by adjusting their weights.",
      "Layers of connected neurons",
    ],
    [
      "Perceptron",
      "The simplest neuron: a weighted sum of inputs passed through a threshold.",
      "weighted sum",
    ],
    [
      "Weights and Biases",
      "Weights set how much each input matters; the bias shifts the output — both are learned.",
      "both are learned",
    ],
    [
      "Activation Functions — ReLU, Sigmoid, Softmax",
      "Add non-linearity so networks can learn curves: ReLU in hidden layers, sigmoid and softmax for probabilities.",
      "non-linearity",
    ],
    [
      "Forward Propagation",
      "Passing the input through the layers, left to right, to produce a prediction.",
      "produce a prediction",
    ],
    [
      "Backpropagation",
      "Sends the error backwards through the network to work out how to change each weight.",
      "error backwards",
    ],
    [
      "Computational Graphs",
      "A map of every operation in the model, which lets gradients be computed automatically.",
      "gradients be computed automatically",
    ],
    [
      "Gradient-Based Optimization",
      "Uses the slope of the loss to move the weights toward lower error.",
      "slope of the loss",
    ],
    [
      "SGD and Adam Optimizers",
      "SGD updates on small batches with a fixed step; Adam adapts the step for every weight.",
      "adapts the step",
    ],
    [
      "Vanishing and Exploding Gradients",
      "Gradients that shrink to nothing or blow up in deep networks, stalling training.",
      "shrink to nothing or blow up",
    ],
    [
      "Batch Normalization and Layer Normalization",
      "Normalize activations inside the network to make training faster and steadier.",
      "faster and steadier",
    ],
    [
      "Dropout",
      "Randomly switches off neurons during training so the network can't over-rely on any of them.",
      "Randomly switches off neurons",
    ],
    [
      "Embeddings",
      "Dense number vectors that place similar things close together.",
      "similar things close together",
    ],
    [
      "Convolutional Neural Networks (CNN)",
      "Slide small filters over an image to pick up edges, then shapes, then objects.",
      "small filters",
    ],
    [
      "Recurrent Neural Networks (RNN/LSTM)",
      "Process sequences step by step with a memory; LSTM gates stop that memory from fading.",
      "LSTM gates",
    ],
    [
      "Attention Mechanism",
      "Lets the model weigh which parts of the input matter most for each output.",
      "weigh which parts",
    ],
    [
      "Transformer Architecture",
      "Stacks attention and feed-forward layers and reads the whole sequence in parallel.",
      "in parallel",
    ],
    [
      "Transfer Learning",
      "Start from a pretrained model and adapt it to your task with far less data.",
      "pretrained model",
    ],
    [
      "PyTorch — Tensors, Autograd, Training Loops",
      "Tensors hold the data, autograd computes gradients, and the training loop repeats forward, loss, backward, update.",
      "autograd computes gradients",
    ],
    [
      "GPU Training and Inference",
      "GPUs run thousands of matrix operations at once, making training and serving fast.",
      "thousands of matrix operations at once",
    ],
  ]),
  group("Generative AI and LLMs — 20 concepts", Sparkles, [
    [
      "Generative AI vs Predictive AI",
      "Generative AI creates new content; predictive AI labels or forecasts from existing data.",
      "creates new content",
    ],
    [
      "Large Language Models (LLMs)",
      "Huge transformer models trained on text to predict the next token.",
      "predict the next token",
    ],
    [
      "Tokenization",
      "Chopping text into tokens — words or word pieces — that the model can read as numbers.",
      "word pieces",
    ],
    [
      "Token Embeddings",
      "Each token is mapped to a vector that carries its meaning.",
      "vector that carries its meaning",
    ],
    [
      "Self-Attention",
      "Every token looks at every other token to decide what is relevant to it.",
      "looks at every other token",
    ],
    [
      "Positional Encoding / RoPE",
      "Adds word-order information, since attention alone can't tell position; RoPE does it by rotating the vectors.",
      "word-order information",
    ],
    [
      "Transformer Encoder vs Decoder",
      "Encoders read and understand a whole input; decoders generate output one token at a time.",
      "generate output one token at a time",
    ],
    [
      "Pretraining vs Fine-Tuning",
      "Pretraining teaches general language on huge data; fine-tuning specialises the model for a task.",
      "specialises the model",
    ],
    [
      "Instruction Tuning",
      "Fine-tuning on instruction and answer pairs so the model follows directions.",
      "follows directions",
    ],
    [
      "RLHF and DPO",
      "Align the model with human preferences — RLHF through a reward model, DPO directly from preferred vs rejected answers.",
      "human preferences",
    ],
    [
      "Prompt Engineering",
      "Crafting the instructions and context you give a model to get better outputs.",
      "instructions and context",
    ],
    [
      "System, Developer, User Messages",
      "Message roles: system sets the rules, developer adds app instructions, user asks the question.",
      "Message roles",
    ],
    [
      "Zero-Shot and Few-Shot Prompting",
      "Zero-shot gives only the task; few-shot adds a few worked examples.",
      "a few worked examples",
    ],
    [
      "Temperature, Top-p, Max Tokens",
      "Sampling controls: how random the output is, how much probability to sample from, and how long it can run.",
      "how random the output is",
    ],
    [
      "Context Window",
      "The most tokens a model can see at once — prompt plus answer.",
      "most tokens a model can see at once",
    ],
    [
      "Structured Outputs / JSON Schema",
      "Forces the model's reply into a fixed format that code can parse.",
      "fixed format",
    ],
    [
      "Tool Calling / Function Calling",
      "The model asks your code to run a function, then uses the result.",
      "asks your code to run a function",
    ],
    [
      "Hallucinations and Grounding",
      "Hallucinations are confident wrong answers; grounding ties answers to real sources.",
      "grounding ties answers to real sources",
    ],
    [
      "Open-Weight vs Proprietary Models",
      "Open-weight models can be downloaded and self-hosted; proprietary ones are reached only through a vendor's API.",
      "self-hosted",
    ],
    [
      "LLM API Integration",
      "Calling a hosted model from your app — auth, requests, streaming, retries and errors.",
      "Calling a hosted model",
    ],
  ]),
  group("RAG and Vector Databases — 15 concepts", Database, [
    [
      "Retrieval-Augmented Generation (RAG)",
      "Fetch relevant documents first, then have the LLM answer using them.",
      "Fetch relevant documents first",
    ],
    [
      "Document Loading and Parsing",
      "Reading PDFs, web pages and files into clean text the pipeline can use.",
      "clean text",
    ],
    [
      "Text Chunking and Overlap",
      "Cutting documents into pieces, with a little overlap so ideas aren't split in half.",
      "a little overlap",
    ],
    [
      "Embedding Models",
      "Turn each chunk and query into vectors so meaning can be compared.",
      "meaning can be compared",
    ],
    [
      "Vector Similarity — Cosine Similarity",
      "Measures how closely two vectors point the same way; near 1 means very similar.",
      "point the same way",
    ],
    [
      "Vector Databases — FAISS, pgvector",
      "Store embeddings and find nearest neighbours fast — FAISS is a library, pgvector adds it to Postgres.",
      "find nearest neighbours fast",
    ],
    ["Semantic Search", "Finds results by meaning, not exact words.", "by meaning"],
    [
      "Keyword Search — BM25",
      "Classic keyword ranking that rewards exact term matches.",
      "exact term matches",
    ],
    [
      "Hybrid Search",
      "Combines keyword and semantic search to get the best of both.",
      "best of both",
    ],
    [
      "Metadata Filtering",
      "Narrows results by fields like date, source or user before or during search.",
      "date, source or user",
    ],
    [
      "Reranking",
      "A second, smarter model reorders the top results so the best come first.",
      "reorders the top results",
    ],
    [
      "Query Rewriting",
      "Rephrases or expands the user's question so retrieval finds better matches.",
      "Rephrases or expands",
    ],
    [
      "Context Construction",
      "Choosing and ordering the retrieved chunks that go into the prompt, within the token limit.",
      "within the token limit",
    ],
    [
      "Grounded Answers and Citations",
      "Answers based only on the retrieved sources, with references the user can check.",
      "references the user can check",
    ],
    [
      "RAG Evaluation — Retrieval Recall, Faithfulness",
      "Retrieval recall asks whether the right chunks were found; faithfulness asks whether the answer sticks to them.",
      "faithfulness",
    ],
  ]),
  group("AI Agents and Agentic AI — 15 concepts", Bot, [
    [
      "AI Agents vs LLM Workflows",
      "Workflows follow a fixed path you wrote; agents decide their own next step.",
      "decide their own next step",
    ],
    [
      "Agent Architecture",
      "The parts of an agent: the LLM, tools, memory, a planner and the loop that ties them together.",
      "the loop that ties them together",
    ],
    [
      "Reasoning and Acting — ReAct",
      "The agent alternates between reasoning about what to do and acting with a tool.",
      "alternates between reasoning",
    ],
    [
      "Tool-Using Agents",
      "Agents call APIs, search, code or databases to do things the LLM can't do alone.",
      "do things the LLM can't do alone",
    ],
    [
      "Planning and Task Decomposition",
      "Breaks a big goal into smaller steps and works through them.",
      "smaller steps",
    ],
    [
      "Agent Memory — Short-Term and Long-Term",
      "Short-term holds the current conversation; long-term stores facts across sessions.",
      "across sessions",
    ],
    [
      "Agent State Management",
      "Tracking what the agent has done and knows so far, so it can pause, resume and recover.",
      "pause, resume and recover",
    ],
    [
      "Multi-Agent Systems",
      "Several specialised agents collaborate on one task.",
      "specialised agents",
    ],
    [
      "Agent Orchestration",
      "Controls which agent or step runs when, and how results flow between them.",
      "which agent or step runs when",
    ],
    [
      "Human-in-the-Loop (HITL)",
      "A person reviews or approves risky actions before the agent carries them out.",
      "approves risky actions",
    ],
    [
      "Model Context Protocol (MCP)",
      "An open standard for connecting AI apps to tools and data through one common interface.",
      "one common interface",
    ],
    [
      "LangChain / LangGraph",
      "Frameworks for building LLM apps; LangGraph models agents as stateful graphs.",
      "stateful graphs",
    ],
    [
      "Agent Guardrails",
      "Rules and checks that keep an agent's inputs, actions and outputs within safe limits.",
      "safe limits",
    ],
    [
      "Agent Observability and Tracing",
      "Recording every step, tool call and token so you can see why an agent did what it did.",
      "every step, tool call and token",
    ],
    [
      "Agent Failure Recovery and Retry Logic",
      "Catch errors, retry with backoff, and fall back or escalate instead of crashing.",
      "retry with backoff",
    ],
  ]),
  group("MLOps and Production AI — 20 concepts", Rocket, [
    [
      "ML Lifecycle",
      "The full loop: data, training, evaluation, deployment, monitoring, and retraining.",
      "full loop",
    ],
    [
      "Data Pipelines — ETL/ELT",
      "Automated flows that Extract, Transform and Load data (ETL) — or load first, then transform (ELT).",
      "Extract, Transform and Load",
    ],
    [
      "Model Training Pipelines",
      "Repeatable, automated steps from raw data to a trained model.",
      "Repeatable, automated steps",
    ],
    [
      "Experiment Tracking — MLflow",
      "Logs parameters, metrics and artifacts for every run — MLflow is the common tool.",
      "parameters, metrics and artifacts",
    ],
    [
      "Model Versioning and Registry",
      "A catalogue of trained model versions and their stage, so you know what's in production.",
      "what's in production",
    ],
    [
      "Data Versioning",
      "Tracks dataset versions so any model can be reproduced from the exact data it used.",
      "reproduced",
    ],
    [
      "Model Serialization",
      "Saving a trained model to a file (pickle, ONNX, SavedModel) so it can be loaded elsewhere.",
      "Saving a trained model to a file",
    ],
    [
      "REST APIs — FastAPI",
      "Expose the model over HTTP so any app can request predictions; FastAPI is the popular Python way.",
      "over HTTP",
    ],
    [
      "Docker and Containers",
      "Package code and dependencies together so it runs the same everywhere.",
      "runs the same everywhere",
    ],
    [
      "CI/CD for ML",
      "Automatically test, build and deploy code, data and models on every change.",
      "Automatically test, build and deploy",
    ],
    [
      "Batch vs Real-Time Inference",
      "Batch scores many records on a schedule; real-time answers each request instantly.",
      "real-time answers each request instantly",
    ],
    [
      "Model Serving",
      "Running the model behind an endpoint that handles live requests reliably at scale.",
      "behind an endpoint",
    ],
    [
      "Cloud Deployment — AWS SageMaker / Azure ML / Vertex AI",
      "Managed platforms that train, host and scale models for you.",
      "train, host and scale",
    ],
    [
      "Data Drift vs Concept Drift",
      "Data drift: the inputs change. Concept drift: the link between inputs and answers changes.",
      "the inputs change",
    ],
    [
      "Model Monitoring",
      "Watching accuracy, data quality, latency and errors after deployment.",
      "after deployment",
    ],
    [
      "Model Retraining",
      "Updating the model on fresh data — on a schedule or when monitoring shows decay.",
      "fresh data",
    ],
    [
      "A/B Testing and Canary Deployments",
      "Try a new model on some users first — A/B compares versions, canary rolls out to a small slice.",
      "small slice",
    ],
    [
      "Latency, Throughput, Cost Optimization",
      "How fast one answer returns, how many you can serve per second, and what each costs.",
      "how many you can serve per second",
    ],
    [
      "Logging, Metrics, Traces",
      "Logs say what happened, metrics show the numbers, traces follow one request end to end.",
      "traces follow one request end to end",
    ],
    [
      "Rollback and Incident Handling",
      "Quickly return to the last good version and follow a plan when production breaks.",
      "last good version",
    ],
  ]),
  group("LLMOps, Evaluation and AI Security — 15 concepts", ShieldAlert, [
    [
      "LLM Evaluation Frameworks",
      "Tools and methods for scoring LLM outputs consistently — quality, accuracy, safety.",
      "scoring LLM outputs consistently",
    ],
    [
      "Golden Datasets / Evaluation Sets",
      "A trusted set of inputs with ideal answers used to test every change.",
      "trusted set",
    ],
    [
      "Human Evaluation vs LLM-as-a-Judge",
      "People judge best but slowly; another LLM scores quickly and cheaply, with its own biases.",
      "scores quickly and cheaply",
    ],
    [
      "Prompt Versioning",
      "Treat prompts like code: store, review, and roll back each version.",
      "like code",
    ],
    [
      "Prompt Injection",
      "Hidden instructions in input or documents that hijack the model's behaviour.",
      "hijack",
    ],
    [
      "Jailbreaking and Adversarial Inputs",
      "Crafted prompts that trick a model into breaking its safety rules.",
      "trick a model",
    ],
    [
      "PII Detection and Data Privacy",
      "Finding and masking personal data before it reaches the model or the logs.",
      "masking personal data",
    ],
    [
      "Authentication and Authorization",
      "Authentication proves who you are; authorization decides what you're allowed to do.",
      "what you're allowed to do",
    ],
    [
      "Tool Permissions and Least Privilege",
      "Give an agent only the access its task needs — nothing more.",
      "only the access its task needs",
    ],
    [
      "Output Validation",
      "Check the model's reply for format, safety and correctness before using it.",
      "before using it",
    ],
    [
      "Content Safety and Guardrails",
      "Filters and policies that block harmful, off-topic or non-compliant inputs and outputs.",
      "block harmful",
    ],
    [
      "Token Usage and Cost Tracking",
      "Measuring tokens per request, user and feature so spend stays under control.",
      "spend stays under control",
    ],
    [
      "Caching and Rate Limiting",
      "Reuse repeated answers to save cost and time; cap requests to protect the system.",
      "Reuse repeated answers",
    ],
    [
      "Fallback Models and Resilience",
      "If the main model fails or is slow, switch to a backup so users still get an answer.",
      "switch to a backup",
    ],
    [
      "Production AI Testing — Regression, Safety, Reliability",
      "Regression tests catch quality drops, safety tests catch harm, reliability tests catch failures.",
      "Regression tests catch quality drops",
    ],
  ]),
  group("Python Programming — 15 concepts", FileCode2, [
    [
      "Variables and Data Types",
      "Names that hold values — int, float, str, bool — and Python works out the type for you.",
      "Names that hold values",
    ],
    [
      "Lists, Tuples, Sets, Dictionaries",
      "Ordered changeable list, ordered fixed tuple, unique-only set, and key-value dictionary.",
      "key-value dictionary",
    ],
    [
      "Mutable vs Immutable Objects",
      "Mutable objects can change in place (list, dict); immutable ones can't (str, tuple, int).",
      "change in place",
    ],
    [
      "Loops and Conditional Statements",
      "for and while repeat work; if, elif and else choose between paths.",
      "repeat work",
    ],
    [
      "Functions, *args, **kwargs",
      "Reusable blocks of code; *args takes extra positional arguments, **kwargs takes extra keyword ones.",
      "Reusable blocks of code",
    ],
    [
      "List and Dictionary Comprehensions",
      "A compact one-line way to build a list or dictionary from a loop.",
      "one-line",
    ],
    ["Lambda Functions", "A small anonymous function written inline.", "anonymous function"],
    [
      "Classes and Objects",
      "A class is the blueprint; an object is one instance built from it.",
      "blueprint",
    ],
    [
      "OOP — Inheritance, Polymorphism, Encapsulation",
      "Inheritance reuses a parent class, polymorphism lets different classes share an interface, encapsulation hides internals.",
      "Inheritance reuses a parent class",
    ],
    [
      "Exception Handling",
      "try/except catches errors so the program can recover instead of crashing.",
      "try/except",
    ],
    [
      "File Handling — JSON, CSV",
      "Read and write files with open() or with-blocks, and parse JSON and CSV with the standard library.",
      "with-blocks",
    ],
    [
      "Modules, Packages, Imports",
      "Split code across files (modules) and folders (packages), then bring it in with import.",
      "bring it in with import",
    ],
    [
      "Virtual Environments and pip",
      "Keep each project's libraries separate; pip installs them.",
      "separate",
    ],
    [
      "Decorators and Generators",
      "Decorators wrap a function to add behaviour; generators yield values one at a time to save memory.",
      "yield values one at a time",
    ],
    [
      "Type Hints and Async/Await",
      "Type hints label expected types; async/await lets a program wait on slow I/O without blocking.",
      "without blocking",
    ],
  ]),
  group("Mathematics and Statistics — 15 concepts", Sigma, [
    [
      "Linear Algebra — Vectors and Matrices",
      "Vectors and matrices are how data and model weights are stored and transformed.",
      "how data and model weights are stored",
    ],
    [
      "Matrix Multiplication",
      "Combines rows and columns to apply a layer's weights to inputs — the core operation of neural networks.",
      "core operation of neural networks",
    ],
    [
      "Dot Product",
      "Multiply two vectors element by element and add up — a measure of how aligned they are.",
      "how aligned they are",
    ],
    [
      "Derivatives and Gradients",
      "A derivative is the slope of a function; a gradient collects the slopes for every variable.",
      "the slope of a function",
    ],
    [
      "Chain Rule",
      "How to take the derivative of functions nested inside each other — the maths behind backpropagation.",
      "behind backpropagation",
    ],
    [
      "Probability Fundamentals",
      "A number from 0 to 1 for how likely an event is.",
      "how likely an event is",
    ],
    [
      "Conditional Probability",
      "The chance of A happening once you know B has happened.",
      "once you know B has happened",
    ],
    [
      "Bayes' Theorem",
      "Updates the probability of a hypothesis when new evidence arrives.",
      "new evidence",
    ],
    [
      "Mean, Median, Mode",
      "The average, the middle value, and the most frequent value.",
      "middle value",
    ],
    [
      "Variance and Standard Deviation",
      "How spread out the data is — standard deviation is the square root of variance.",
      "spread out",
    ],
    [
      "Probability Distributions",
      "Describe how likely each outcome is — normal, binomial, uniform and so on.",
      "how likely each outcome is",
    ],
    [
      "Correlation vs Causation",
      "Two things moving together doesn't mean one causes the other.",
      "doesn't mean one causes the other",
    ],
    [
      "Hypothesis Testing and p-values",
      "A p-value says how surprising your data would be if there were no real effect.",
      "no real effect",
    ],
    [
      "Confidence Intervals",
      "A range that likely contains the true value, given the sample.",
      "range that likely contains the true value",
    ],
    [
      "Optimization Fundamentals",
      "Finding the inputs that minimise or maximise a function — what training does.",
      "minimise or maximise",
    ],
  ]),
  group("Data Handling and Feature Engineering — 15 concepts", Table2, [
    ["NumPy", "Fast arrays and vectorised maths — the base of Python's data stack.", "Fast arrays"],
    [
      "Pandas",
      "DataFrames for loading, filtering, joining and summarising tables of data.",
      "DataFrames",
    ],
    [
      "SQL — Joins, Group By, Window Functions",
      "Joins combine tables, GROUP BY summarises, window functions compute across related rows.",
      "window functions",
    ],
    [
      "Exploratory Data Analysis (EDA)",
      "Looking at distributions, relationships and oddities in the data before modelling.",
      "before modelling",
    ],
    [
      "Missing Value Handling",
      "Drop, fill (mean, median, mode) or flag blanks so they don't break the model.",
      "Drop, fill",
    ],
    [
      "Duplicate and Outlier Handling",
      "Remove repeated rows and decide whether extreme values are errors or real signals.",
      "extreme values",
    ],
    [
      "Data Cleaning and Preprocessing",
      "Fix types, typos and formats so raw data becomes model-ready.",
      "model-ready",
    ],
    [
      "Normalization vs Standardization",
      "Normalization rescales to a range like 0–1; standardization centres at 0 with unit spread.",
      "rescales to a range",
    ],
    [
      "Categorical Encoding",
      "Turn categories into numbers — one-hot, label or target encoding.",
      "one-hot, label or target encoding",
    ],
    [
      "Feature Selection",
      "Keep the features that help and drop the ones that add noise.",
      "drop the ones that add noise",
    ],
    [
      "Feature Extraction",
      "Create a smaller set of new features from the raw data, like PCA components or text embeddings.",
      "smaller set of new features",
    ],
    [
      "Feature Engineering",
      "Craft new inputs from existing data — ratios, dates, counts — that make patterns easier to learn.",
      "make patterns easier to learn",
    ],
    [
      "Class Imbalance",
      "When one class is rare, models ignore it — fix with resampling, class weights or better metrics.",
      "resampling, class weights",
    ],
    [
      "Data Leakage",
      "When information from the test set or the future sneaks into training, making scores falsely high.",
      "falsely high",
    ],
    [
      "Data Visualization — Matplotlib, Seaborn",
      "Plot data with Matplotlib (full control) and Seaborn (quick statistical charts) to see patterns.",
      "see patterns",
    ],
  ]),
];

export const conceptCount = conceptGroups.reduce((n, g) => n + g.concepts.length, 0);
