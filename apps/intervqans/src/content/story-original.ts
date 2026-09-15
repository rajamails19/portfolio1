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
  {
    type: "text",
    content: `Embeddings — turning meaning into coordinates

models only understand numbers, not words.

Embeddings are the modern, much richer answer to that same problem — instead of a crude one-hot column per word, an embedding represents a word, sentence, or document as a long list of numbers (a vector) that captures its actual meaning, positioned in a kind of imaginary space.


imagine a giant map where every word or sentence gets placed somewhere based on its meaning, not its spelling. "King" and "queen" end up near each other on this map, because they're conceptually related. "Dog" and "puppy" land close together too.

exact mechanism your TableMind pgvector setup relies on: every piece of text gets converted into one of these coordinate vectors, and "find me the most relevant document" becomes "find me the nearest points on the map."


Vector databases — a search engine built for meaning, not keywords

A traditional database search (like a SQL WHERE clause, or even old-school search engines) matches exact words. If a customer asks "how do I get my money back," a keyword search fails to find a document titled "refund policy" unless it happens to share exact words.


A vector database — pgvector being exactly this — stores all your documents as embeddings instead of raw text, and when a new query comes in, it also converts that query into an embedding, then finds the nearest stored points on the meaning-map, regardless of whether any words actually match.


The actual search operation being run under the hood is usually cosine similarity — measuring the angle between two vectors rather than their raw distance, which turns out to be a more robust way of comparing meaning regardless of how "long" or emphatic the text is.


You don't need to compute this by hand, but knowing it's angle-based rather than pure distance is a good interview detail

because it explains why two vectors can be similar even with different magnitudes.


Chunking — the unglamorous detail that quietly makes or breaks RAG quality

One practical wrinkle worth knowing, since it's the kind of detail that separates someone who's read about RAG from someone who's actually built it: you can't just throw an entire long document into the vector database as one giant embedding — it gets too vague and unfocused to match well against specific questions. Instead, documents get broken into smaller chunks — a paragraph or a few sentences at a time — each with its own embedding, so retrieval can pinpoint the specific relevant passage rather than returning an entire vague document.


Instead, you evaluate important behaviors:
• Did they obey signals?
• Did they stay in the lane?
• Did they check mirrors?
• Did they drive safely?
• Did they reach the destination?
AI evaluation works similarly.
We don't always test one exact output.
We test whether the output satisfies the required behavior.


This Is What "Evals" Means
In AI Engineering, you'll constantly hear:
Evals
An evaluation is simply a systematic way of answering:
"Is this AI system performing the way we expect?"

That might include testing:
• Correctness
• Relevance
• Groundedness
• Safety
• Tool selection
• Formatting
• Latency
• Cost
• Task completion
So evals are essentially the test strategy of an AI system.


Start With the Simplest Possible Eval
Suppose we're building a customer-support assistant.
User asks:
"I forgot my password. What should I do?"
We expect the AI to:
• Explain password reset.
• Not ask for the password.
• Not invent a support phone number.
• Give a concise response.
Notice.
We are not defining one exact answer.
We're defining acceptance criteria.
That's very similar to manual QA.
Instead of:
Expected output = exact sentence
we say:
Expected behavior = satisfies these conditions.


Rule-Based Evals
Some AI outputs can still be tested deterministically.
For example, your application requires JSON:

{
  "name": "John",
  "age": 42
}

You can validate:
• Is it valid JSON?
• Does name exist?
• Is age numeric?
• Is age >= 0?
This is traditional automation testing.
Very reliable.
Very cheap.
Use deterministic checks whenever possible.


Semantic Evaluation
Now consider this question:
"Why was my insurance claim rejected?"
Expected answer:
The claim was rejected because the procedure required preauthorization.
Generated answer:
Your insurer denied the claim because prior approval was required before the procedure.
Different words.
Same meaning.
A string comparison would fail.
A semantic evaluator should pass it.
This is one major difference between conventional QA and AI evaluation.


Precision
Now imagine ten chunks are retrieved.
Only two are relevant.
The system technically found the answer...
but also dumped eight irrelevant chunks into the prompt.
That hurts precision.
High recall says:
"We didn't miss useful information."
High precision says:
"Most of what we retrieved was useful."
Good retrieval tries to balance both.


A Fishing Analogy
Imagine fishing with a net.
High recall
You catch nearly every fish...
but also:
• Boots
• Plastic
• Seaweed
• Bottles
High precision
Almost everything you catch is fish...
but many fish escape.
A good retrieval system wants:
Catch the useful information without bringing in too much garbage.


Groundedness
Suppose the retrieved document says:
Employees may carry over five vacation days.
The model answers:
Employees can carry over five days and receive a cash payout for anything above five.
Where did the cash payout come from?
Nowhere.
Part of the answer is correct.
Part is invented.
This is a groundedness failure.
Groundedness asks:
Are the claims in the answer actually supported by the provided evidence?


Model Upgrade Testing
Suppose your system currently uses:

Model A

A new model arrives.

Model B

Someone says:
"It's newer. Let's switch."
A good AI engineer says:
"Let's evaluate it first."
Maybe Model B:
• Has better reasoning
• Costs more
• Responds slower
• Uses tools differently
• Produces longer answers
• Performs worse on your specific domain
Newer doesn't automatically mean better for your application.`,
  },
  {
    type: "text",
    content: `Why Every AI Engineer Needs to Understand Embeddings
You will hear this word constantly:
• Vector Database
• Similarity Search
• RAG
• Semantic Search
• Recommendation Systems
• Memory
• Retrieval
At the heart of all of them is one idea:
Represent information as embeddings, then compare those embeddings to find related meaning.
Once you understand embeddings, many "advanced" AI concepts suddenly become much easier to grasp.


A typical AI document-ingestion pipeline looks like this:

PDF / Word / Web page
        ↓
Extract text
        ↓
Clean the text
        ↓
Split into chunks
        ↓
Create embeddings
        ↓
Store in a vector database

Let us understand each stage.


Step 2 — Cleaning the Text
Suppose the extracted document looks like this:

EMPLOYEE HANDBOOK 2026

Page 17 of 92

Vacation days may be carried...

CONFIDENTIAL

EMPLOYEE HANDBOOK 2026

The useful information is mixed with noise.
Cleaning may involve:
• Removing repeated headers and footers
• Fixing broken sentences
• Removing unnecessary whitespace
• Preserving headings
• Preserving table meaning
• Detecting document sections
• Removing duplicate content
The goal is not to make the text beautiful.
The goal is to preserve the meaning and structure needed for retrieval.


Step 3 — Chunking
Now we reach one of the most important practical decisions in RAG.
You usually do not store an entire 200-page document as one single searchable item.
Instead, you divide it into smaller sections called chunks.

Why chunk the document?
Because when a user asks about carryover, the system should retrieve the carryover section—not the entire handbook.

Similarly, if the model needs one policy paragraph, we should not send a 200-page document.
Too much context creates problems:
• Higher token cost


Step 4 — Embeddings
After chunking, each chunk is converted into an embedding.
We discussed embeddings earlier:
An embedding is a numerical representation of meaning.

Each chunk receives a vector—a list of numbers representing its semantic meaning.
The user's question is also converted into a vector:
"Can unused PTO move to next year?"
Even though the user says PTO and the document says vacation days, their meanings are close.
Therefore, their vectors should also be close.
That allows semantic retrieval.


Step 5 — Vector Database
The embeddings must be stored somewhere.
That storage system is commonly called a vector database.
Popular examples include:
• Pinecone
• Weaviate
• Milvus
• Qdrant
• Chroma
• PostgreSQL with pgvector


What Happens at Query Time?
Now the knowledge base is ready.
A user asks:
"Can unused PTO be transferred to next year?"
The system performs several steps.
1. Embed the question
The question becomes a vector.
2. Search for similar chunks
The vector database compares the question vector against stored chunk vectors.
3. Retrieve the closest matches
Perhaps it returns:


A RAG application has two major intelligence layers.
Retrieval layer
Finds the relevant information.
Generation layer
Uses that information to produce an answer.


====

But the chunk answers the wrong benefit category.
Vector similarity is powerful, but imperfect.
This is why advanced RAG systems may add a reranker.


What Is Reranking?
The initial vector search may retrieve ten possible chunks quickly.
Then a reranker examines the question and each result more carefully.
It rearranges them based on actual relevance.
Think of it like hiring.
First round
A recruiter selects ten resumes using keywords and broad matching.
Second round
A hiring manager reads those ten resumes closely and ranks the best candidates.
Vector search is the fast recruiter.
Reranking is the careful hiring manager.


One engineer asks:
"Should we always use a vector database?"
The architect answers:
"No. Use the simplest retrieval method that solves the problem."
For a small knowledge base, full-text search may be enough.
For exact product names or error codes, keyword search may outperform embeddings.
For many systems, the strongest approach is hybrid search:

Keyword search
      +
Vector search
      ↓
Combined results

Keyword search is good at exact matches.
Vector search is good at semantic meaning.
Together, they cover each other's weaknesses.`,
  },
  {
    type: "text",
    content: `A junior engineer says:
"So RAG is basically giving ChatGPT some documents?"
The senior engineer replies:
"At demo level, yes."
Then the architect adds:
"At production level, RAG is information retrieval, data engineering, prompt engineering, security, evaluation, and observability working together."
That is the real difference.
Uploading a PDF is easy.
Building a reliable enterprise knowledge system is engineering.


RAG allows an AI system to read company knowledge.
But what if the user asks:
"Check my vacation balance and submit a leave request for next Friday."
Reading a policy is not enough.
The AI must:
• Check a live system
• Verify available balance
• Ask for missing details
• Call an API
• Submit a request
• Return confirmation
That takes us beyond RAG.
It takes us into tool calling and AI agents.


Most of an ML engineer's actual time goes into getting the data into a shape the model can even learn from properly.


Missing data — the silent data-quality bug
Real-world data is never clean. Someone skipped a form field, a sensor glitched for an hour, a survey respondent left a question blank. You're rarely handed a spreadsheet of the kind of pristine, complete data used in tutorials, and how you handle the gaps genuinely changes your results.

A common fix is imputation — filling in a reasonable estimated value instead of deleting the row, commonly the column's average or median.`,
  },
  {
    type: "text",
    content: `For regression problems (predicting a number), the most common loss is mean squared error — take the difference between predicted and actual for every example, square it, and average across all examples.

The squaring is deliberate, not incidental: it punishes big misses far more harshly than small ones.


For classification problems, the common loss is cross-entropy, which specifically punishes confident wrongness far more than hesitant wrongness. A model that says "I'm 51% sure this is spam" and turns out wrong gets a mild penalty; a model that says "I'm 99% sure this is spam" and turns out wrong gets a much steeper penalty.


Hyperparameters, and the practical workflow of actually building a model


Parameters vs. hyperparameters — a distinction that trips everyone up early
These two terms sound almost identical, but they mean very different things,

Parameters are the values the model learns by itself during training — the weights in a neural network, the slope in linear regression. You never set these directly; gradient descent finds them for you.

Hyperparameters are the settings you choose before training even begins — things like how many trees to build in a random forest, how deep to let a decision tree grow, or how big a step gradient descent takes at each nudge (the learning rate).

Think of it like the difference between a student's actual knowledge (parameters — built through studying) and the study plan you set for them beforehand — how many hours a day, which textbook, how many practice tests (hyperparameters — decided in advance, and they heavily influence how well the studying goes, but they aren't the knowledge itself).


approach called Bayesian optimization, which uses the results of earlier trials to intelligently decide which settings to try next, rather than searching blindly


You pick a baseline model, usually something simple like logistic regression or a small decision tree, and get it working end to end before reaching for anything fancy — this baseline becomes your reference point, so you can actually tell whether a more complex model is earning its added complexity or just adding noise.

You train that baseline, evaluate it on the validation set using metrics appropriate to the problem — precision/recall for imbalanced classification, mean squared error for regression — and only then do you start experimenting with more powerful algorithms, tuning hyperparameters, and comparing against that baseline.


The discipline of "get a dumb baseline working first" is one of the most underrated habits in ML, and it's deeply QA-flavored: you wouldn't write elaborate edge-case tests before confirming the basic happy path even works.


A Basic Tool-Calling Flow
Suppose the user asks:
"What is the weather in Atlanta?"
The model itself may not know the current weather.
Instead, the application gives it access to a weather tool.

User request
      ↓
LLM understands the intent
      ↓
LLM chooses the weather tool
      ↓
Application calls weather API
      ↓
Weather API returns data
      ↓
LLM explains the result

The model may receive tool output such as:

{
  "city": "Atlanta",
  "temperature_f": 86,
  "condition": "Partly cloudy"
}

It then converts that structured information into a natural response:
Atlanta is currently 86°F and partly cloudy.
The model handled language.
The API handled real-world data.`,
  },
  {
    type: "text",
    content: `Just TOPIC Names


• Supervised vs. Unsupervised Learning
• Convolutional Neural Network (CNN)
• Recurrent Neural Network (RNN)
• TensorFlow
• PyTorch
• Overfitting & Underfitting
• Regularization ( L1, L2 )
• Gradient Descent (Batch GD), Stochastic Gradient Descent (SGD), Mini Batch GD
• Evaluation Metrics - Accuracy, Precision, F1-Score, AUC-ROC
• Mean Squared Error (MSE), Root Mean SE
• Confusion Matrix
• Epoch, Batch, Iteration
• Activation Functions ( Sigmoid, ReLU, SoftMax )
• Handle Categorical Variables ( One-Hot Encoding, Lable-Encoding,Target / Mean Encoding )
• Forward & Backward Pass
• Loss Functions
• Optimizers
• Attention Mechanism
• Model
• Features
• Labels/Targets
• Training, Testing, Validation
• Supervised - Linear Reg, Logistic, Decision Trees, Random Forest,….
• UnSupervised - K-Means, Hierarchial, PCA,
• Reinforcement - Q-Learning, Deep Q-Networks, Policy Gradient
• Elastic Net, Dropout, Early Stopping, Batch Normalization
• Hyperparameter Tuning Strategies
• Bayesian Optimization
• Learning Curves
• Data Collection and Exploration ( EDA )
• Data Preprocessing
• Feature Engineering
• Model Selection and Training
• Hyperparameter Tuning
• Deployment
• Monitoring
• Data Processing - Pandas, NumPy
• Visualization - Matplotlib, Seaborn
• ML Libraries - Scikit-learn, XGBoost, LightGBM
• Deep Learning - TensorFlow/Keras, PyTorch
• MLOps - Mlflow
• Weights & Biases
• Spam Detection Application project
• Fraud Detection
• Recommendation Systems
• Customer Churn Prediction
• Speech Recognition
• Ingest, Transform
• Hyperparameters
• provisioning and monitoring cloud
• SageMaker capabilities
• model building and deployment
• Orchestration of ML Workflows
• AWS streaming - Kinesis, Flink, Kafka
• Transforming data by using AWS tools - AWS Glue, DataBrew, Spark, EMR, Data Wrangler
• reduce model training time
• improve model performance
• Using SageMaker & ML libraries to develop ML models
• multiple training models to improve performance (for example, ensembling, stacking, boosting)
• Reducing model size (for example, by altering data types, pruning, updating feature selection, compression)
• create performance baselines
• Convergence issues
• How to choose appropriate containers (for example, provided or customized)
• Evaluating performance, cost, and latency tradeoffs
• Choosing the appropriate compute environment (for example, GPU or CPU specifications, processor )
• correct deployment orchestrator (for example, Apache Airflow, SageMaker Pipelines)
• multi-model or multi-container deployments
• model deployment strategies (for example, real time, batch)
• compare scaling policies
• quotas for AWS CodePipeline, AWS CodeBuild, and AWS CodeDeploy
• principles for ML lenses relevant to monitoring
• use AWS CloudTrail to log, monitor,
• cost analysis tools (for example, AWS Cost Explorer, AWS Billing and Cost Management )
• analyze resources (for example, CloudWatch Logs, )
• Creating CloudTrail trails
• monitor performance metrics (for example, by using Amazon QuickSight, CloudWatch dashboards)
• IAM roles, policies, and groups that control access to AWS services
• Security best practices for CI/CD pipelines
• Configuring least privilege access to ML artifacts
• debugging security issues
• Building VPCs, subnets, and security groups to securely isolate ML systems


Math/Stats Foundation (the "grammar" layer)
• Probability distributions (Gaussian, Bernoulli)
• Bayes' theorem
• Linear algebra: vectors, dot product, matrix multiplication
• Gradient descent & derivatives/chain rule
• Loss functions: MSE, Cross-Entropy
• Bias-Variance tradeoff


Classic ML (still asked constantly)
• Supervised vs Unsupervised vs Reinforcement Learning
• Linear Regression, Logistic Regression
• Decision Trees, Random Forest, Gradient Boosting (XGBoost/LightGBM)
• SVM, KNN
• K-Means clustering, Hierarchical clustering
• PCA (dimensionality reduction)
• Regularization: L1 (Lasso), L2 (Ridge), Dropout
• Cross-validation, Train/Val/Test split
• Precision, Recall, F1, ROC-AUC, Confusion Matrix
• Overfitting/Underfitting (your student analogy nails this one already)
• Feature engineering & feature scaling


Deep Learning Core
• Neural net anatomy: layers, weights, biases
• Activation functions: ReLU, Sigmoid, Softmax, Tanh
• Backpropagation
• Optimizers: SGD, Adam, learning rate
• Batch Normalization
• Dropout
• Vanishing/Exploding gradients
• Epochs, batch size, iterations


NLP & Transformers (the heart of modern AI)
• Tokenization (BPE, subword tokenization)
• Embeddings (turning words into vectors)
• Attention mechanism
• Self-attention & Multi-head attention
• Positional encoding
• Transformer architecture: Encoder-only (BERT), Decoder-only (GPT), Encoder-Decoder (T5)
• Context window
• Autoregressive generation (next-token prediction)


LLM-Specific Concepts (2024-2026 core, very high interview weight)
• Pretraining vs Fine-tuning
• Instruction tuning
• RLHF / DPO (aligning model to human preference)
• PEFT: LoRA, QLoRA
• Quantization (INT8, INT4, GGUF, GPTQ)
• Sampling params: Temperature, Top-k, Top-p
• Prompt engineering: Zero-shot, Few-shot, Chain-of-Thought
• In-context learning
• Hallucination
• Mixture of Experts (MoE)
• Model distillation
• Long-context handling


RAG (Retrieval-Augmented Generation)
• Embeddings for retrieval
• Vector databases (Pinecone, Weaviate, FAISS, pgvector)
• Chunking strategies (fixed-size, semantic, sliding window)
• Cosine similarity / ANN search (HNSW)
• Reranking
• Hybrid search (keyword + semantic)
• Retrieval evaluation (recall@k)


Agents & Orchestration
• Function calling / tool use
• ReAct pattern (Reason + Act loop)
• Planning & task decomposition
• Short-term vs long-term memory
• Multi-agent systems
• Frameworks: LangChain/LlamaIndex concepts (chains, agents, tools)


Evaluation & Safety
• LLM-as-judge
• Benchmarks (MMLU, HumanEval — conceptually, not memorized numbers)
• Guardrails / content filtering
• Bias & fairness in outputs
• Human-in-the-loop evaluation
• A/B testing for models


MLOps / Production & Deployment
• Model serving, batching, latency vs throughput
• Semantic caching
• Monitoring & drift detection
• Cost optimization (token costs, model routing, caching)
• Model versioning / CI-CD for ML
• GPU vs CPU inference, horizontal vs vertical scaling
• Streaming responses (token-by-token)


Practical tasks of AI engineering


1. Data Pipeline & Preprocessing Tickets
• Built a data ingestion pipeline pulling from S3/BigQuery/Postgres into a training-ready format
• Wrote deduplication logic (exact match + fuzzy/semantic dedup using embeddings)
• PII scrubbing / data anonymization before training
• Built chunking logic for documents (fixed-size vs recursive vs semantic chunking) — grill point: "why did you choose 512 tokens with 50 overlap instead of 1000 with no overlap?"
• Handled multi-format ingestion (PDF, HTML, DOCX, scanned images with OCR)
• Data labeling/annotation pipeline setup (human-in-loop or weak supervision)
• Class imbalance handling (oversampling, SMOTE, weighted loss)
• Built a data validation layer (schema checks, null handling, outlier detection)
• Version-controlled datasets (DVC or similar)


2. Embeddings & Vector DB Tickets
• Chose and benchmarked an embedding model (OpenAI vs Cohere vs open-source like BGE/E5) — grill: "why not just use the same LLM to embed?"
• Set up a vector DB (Pinecone/Weaviate/pgvector/FAISS) — index tuning
• Built re-embedding pipeline when source docs update (incremental vs full re-index)
• Tuned HNSW parameters (ef_construction, M) for latency vs recall tradeoff
• Implemented metadata filtering alongside vector search (hybrid filter + semantic)
• Built hybrid search (BM25 + vector) and tuned the weighting between them


3. RAG System Build Tickets
• Designed and built the full RAG pipeline end-to-end (ingest → chunk → embed → retrieve → generate)
• Implemented reranking layer (cross-encoder rerank after initial retrieval) — grill: "why rerank instead of just retrieving more accurately upfront?"
• Tuned top-k retrieval count (tested k=3 vs k=10, measured hallucination rate)
• Built citation/source-attribution so answers reference exact retrieved chunks
• Handled "no relevant context found" fallback gracefully instead of hallucinating
• Built query rewriting/expansion step before retrieval (HyDE, multi-query)
• A/B tested chunk size and overlap against answer quality metrics
• Built a caching layer for repeated queries (semantic cache, not just exact match)


5. Fine-tuning & Model Customization Tickets
• Fine-tuned an open-source model (LoRA/QLoRA) on domain-specific data — grill: "why fine-tune instead of RAG — what was the actual failure mode RAG couldn't fix?"
• Built the instruction-tuning dataset (prompt-response pairs) from raw support tickets/docs
• Ran quantization (INT8/INT4/GGUF) to fit model on target hardware
• Distilled a large model into a smaller one for latency-sensitive use case
• Set up RLHF/DPO pipeline or used a preference dataset to align outputs
• Benchmarked fine-tuned model vs base model + prompt engineering (cost/quality tradeoff)


6. Agent & Orchestration Tickets
• Built a tool-calling agent (function calling schema definitions for internal APIs)
• Implemented ReAct loop (reason → act → observe → repeat) for multi-step tasks
• Built agent memory (short-term conversation buffer + long-term vector-based memory)
• Handled infinite-loop protection (max iteration limits, fallback to human)
• Built multi-agent handoff (e.g., router agent → specialist agent) — grill: "how did you decide which agent handles what — hardcoded routing or model-decided?"
• Debugged an agent that kept calling the wrong tool — fixed via better tool descriptions/schema naming
• Built guardrails so agent couldn't execute destructive actions without confirmation


15. Workflow & Orchestration Tickets
• Built multi-step workflows using LangGraph/state machines instead of a single prompt
• Designed conditional branching in workflows (if retrieval confidence low → ask clarifying question)
• Built human-in-the-loop checkpoints (workflow pauses for approval before executing an action)
• Implemented parallel execution of independent steps (fan-out/fan-in) to cut latency
• Built retry/error-recovery logic at the workflow level, not just per API call
• Orchestrated a pipeline mixing deterministic code + LLM calls (not everything needs to be "agentic") — grill: "when did you decide NOT to use an LLM and just write regular code?"


16. Multi-Agent System Tickets
• Built a supervisor/orchestrator agent that delegates to specialist sub-agents
• Designed inter-agent communication protocol (shared state vs message passing)
• Handled agent disagreement/conflict resolution (two agents give contradictory outputs)
• Built a critique/reviewer agent that checks another agent's output before it's finalized
• Prevented redundant work across agents (agent A already fetched data agent B is about to re-fetch)
• Debugged a multi-agent loop where two agents kept passing the task back and forth — grill: "how did you detect and break that loop?"


17. ML + LLM Hybrid Integration Tickets
• Combined a classic ML classifier (fast, cheap) as a pre-filter before routing to LLM (only ambiguous cases go to the expensive model)
• Used embeddings from an LLM as input features for a downstream classical ML model
• Built an intent classifier (traditional ML) to route requests before LLM processing
• Used LLM to generate synthetic training data for a smaller supervised model
• Integrated anomaly detection (statistical/ML-based) to flag LLM outputs needing human review


"without using LangChain" → don't just import a framework and call .run(). They want to see that you understand what's happening underneath —

chunking,
embeddings,
similarity search


cosine similarity is everywhere in AI engineering. It's not just a RAG thing.

• Every "vector database" you'll hear about (Pinecone, Weaviate, pgvector, FAISS) — its entire job, under the hood, is doing this exact calculation, just very fast, across millions of dots instead of 3.
• Recommendation systems ("users who liked this also liked...") — same math, comparing a user's taste-dot to product-dots.
• Semantic search, duplicate-detection, plagiarism checkers, face recognition matching — all secretly running this same formula.


Picture graph paper. Draw an arrow from the center (0,0) to each of those points. You'll see: Chunk A's arrow points in the exact same direction as the question's arrow, just longer. Chunk B's arrow points somewhere completely different.

That visual — "same direction" vs "different direction" — is the whole ballgame. We want to know which chunk's arrow points the same way as the question's arrow, regardless of length.


If you can say this one sentence confidently, you've passed this sub-topic:

"Cosine similarity ignores magnitude and only measures the angle between vectors,
which is important because it means a short, highly relevant chunk won't lose to a long,
loosely related one just because it has bigger numbers."`,
  },
];
