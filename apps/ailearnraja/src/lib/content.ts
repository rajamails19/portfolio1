import tileMl from "@/assets/tile-ml.jpg";
import tileDl from "@/assets/tile-dl.jpg";
import tileNlp from "@/assets/tile-nlp.jpg";
import tileStats from "@/assets/tile-stats.jpg";
import tileMlops from "@/assets/tile-mlops.jpg";
import tileData from "@/assets/tile-data.jpg";

export type Note = { id: number; q: string; a: string };

// dummy seed — fill more later
const noteSeed: [string, string][] = [
  ["What is supervised learning?", "Learning a mapping from inputs to known outputs using labeled examples."],
  ["What is unsupervised learning?", "Discovering structure in data without labels — clustering, density, dimensionality."],
  ["Bias vs variance?", "Bias = error from wrong assumptions; variance = sensitivity to training fluctuations."],
  ["What is overfitting?", "Model memorizes training data and fails to generalize to unseen samples."],
  ["Regularization in one line?", "Adds a penalty on model complexity (L1/L2) to discourage overfitting."],
  ["Why use cross-validation?", "More reliable performance estimate by training/validating on multiple folds."],
  ["Precision vs recall?", "Precision = how many predicted positives are correct. Recall = how many actual positives we caught."],
  ["What is F1 score?", "Harmonic mean of precision and recall; useful for imbalanced classes."],
  ["ROC-AUC in plain English?", "Probability a random positive is ranked above a random negative."],
  ["What is gradient descent?", "Iteratively step in the negative gradient direction to minimize a loss."],
  ["SGD vs Adam?", "SGD: vanilla momentum; Adam: adaptive per-parameter learning rates with moments."],
  ["What is a confusion matrix?", "Table of TP/FP/FN/TN counts to inspect classification performance."],
  ["What is feature engineering?", "Crafting input variables that expose patterns to the model."],
  ["Curse of dimensionality?", "As dimensions grow, data sparsity explodes and distance metrics weaken."],
  ["PCA in one line?", "Linear projection onto directions of maximum variance."],
  ["What is a decision tree?", "Recursive splits on features that maximize information gain / reduce impurity."],
  ["Bagging vs boosting?", "Bagging: parallel models on bootstrapped data. Boosting: sequential, each fixes prior errors."],
  ["Random forest in one line?", "Bagged decision trees with random feature subsets per split."],
  ["What is XGBoost?", "Optimized gradient-boosted trees with regularization and clever tree construction."],
  ["What is a neural network?", "Stacked nonlinear transformations of inputs learned by backpropagation."],
];

const dlSeed: [string, string][] = [
  ["What is backpropagation?", "Reverse-mode autodiff applying the chain rule to compute gradients efficiently."],
  ["Vanishing gradients?", "Gradients shrink through deep layers, stalling learning — use ReLU, residuals, batch norm."],
  ["What is batch normalization?", "Normalize activations per mini-batch to stabilize and speed training."],
  ["Dropout in one line?", "Randomly zero activations during training to prevent co-adaptation."],
  ["Convolution vs dense?", "Convolutions share weights spatially; dense layers connect every input to every output."],
  ["What is an embedding?", "Dense vector representation of discrete tokens learned to capture similarity."],
  ["Attention mechanism?", "Weighted combination of values, weighted by query-key similarity."],
  ["Self-attention vs cross-attention?", "Self: queries/keys/values from same sequence. Cross: queries from one, K/V from another."],
  ["What is a transformer?", "Stack of self-attention + feed-forward blocks with residuals and layer norm."],
  ["RNN vs Transformer?", "RNN processes sequentially; Transformer processes in parallel via attention."],
  ["What is LoRA?", "Low-rank adapters injected into weights for cheap fine-tuning."],
  ["What is RAG?", "Retrieval-Augmented Generation — fetch context first, generate answer second."],
  ["Quantization in one line?", "Use lower-precision weights/activations (int8/int4) to shrink and speed models."],
  ["What is RLHF?", "Reinforcement learning from human feedback to align model outputs to preferences."],
  ["Diffusion models in one line?", "Learn to denoise random noise step by step into a target distribution."],
  ["What is a token?", "Sub-word unit produced by a tokenizer (BPE / sentencepiece)."],
  ["Temperature in sampling?", "Scales logits; higher = more random, lower = more deterministic."],
  ["Top-k vs top-p?", "Top-k: keep k highest-prob tokens. Top-p (nucleus): keep smallest set summing to p."],
  ["What is a context window?", "Maximum number of tokens a model can attend to in a single pass."],
  ["What is fine-tuning?", "Continue training a pretrained model on task-specific data."],
];

function buildBatches(): { label: string; range: string; notes: Note[] }[] {
  const all: [string, string][] = [...noteSeed, ...dlSeed];
  const groups: { label: string; range: string; notes: Note[] }[] = [];
  const groupSize = 20;
  for (let i = 0; i < 7; i++) {
    const start = i * groupSize + 1;
    const end = start + groupSize - 1;
    const slice = all.slice(i * groupSize, (i + 1) * groupSize);
    const notes: Note[] = slice.length
      ? slice.map(([q, a], idx) => ({ id: start + idx, q, a }))
      : Array.from({ length: groupSize }, (_, idx) => ({
          id: start + idx,
          q: `Coming soon — Q${start + idx}`,
          a: "Drop your answer here. This slot is reserved and will be filled in soon.",
        }));
    groups.push({ label: `Notes ${start}–${end}`, range: `${start}-${end}`, notes });
  }
  return groups;
}

export const noteBatches = buildBatches();

export type Topic = {
  slug: string;
  title: string;
  tagline: string;
  image: string;
  realm: string;
};

export const topics: Topic[] = [
  { slug: "machine-learning", title: "Machine Learning", tagline: "The foundational tribe — supervised, unsupervised, ensemble.", image: tileMl, realm: "Realm of Patterns" },
  { slug: "deep-learning", title: "Deep Learning", tagline: "Neural architectures, attention, and the modern stack.", image: tileDl, realm: "Realm of Neurons" },
  { slug: "nlp-and-llms", title: "NLP & LLMs", tagline: "Tokens, transformers, RAG, fine-tuning.", image: tileNlp, realm: "Realm of Tongues" },
  { slug: "statistics", title: "Statistics & Probability", tagline: "Distributions, inference, hypothesis tests.", image: tileStats, realm: "Realm of Chance" },
  { slug: "mlops", title: "MLOps & Deployment", tagline: "Pipelines, registries, monitoring, scaling.", image: tileMlops, realm: "Realm of Forges" },
  { slug: "data-engineering", title: "Data Engineering & SQL", tagline: "Warehouses, ETL, joins, windows, query plans.", image: tileData, realm: "Realm of Streams" },
];

export type InterviewQA = {
  id: string;
  topic: string;
  question: string;
  answer: string;
  difficulty: "Easy" | "Medium" | "Hard";
  importance: 1 | 2 | 3 | 4 | 5;
  hasDiagram: boolean;
  minutes: number;
};

export const interviewQAs: InterviewQA[] = [
  { id: "iq1", topic: "ML", question: "Explain bias-variance tradeoff with a real example.", answer: "Bias is error from oversimplifying assumptions; variance is error from sensitivity to noise. A linear model on a nonlinear problem = high bias. A deep tree memorizing data = high variance. We balance them via regularization, ensembles, more data.", difficulty: "Medium", importance: 5, hasDiagram: true, minutes: 6 },
  { id: "iq2", topic: "DL", question: "Walk me through a transformer block.", answer: "Input embeddings + positional encoding → multi-head self-attention → residual + layer norm → feed-forward MLP → residual + layer norm. Attention computes softmax(QK^T/√d)V.", difficulty: "Hard", importance: 5, hasDiagram: true, minutes: 10 },
  { id: "iq3", topic: "Stats", question: "What is a p-value?", answer: "Probability of observing data at least as extreme as ours assuming the null hypothesis is true. It's NOT the probability the null is true.", difficulty: "Easy", importance: 4, hasDiagram: false, minutes: 3 },
  { id: "iq4", topic: "NLP", question: "How does RAG differ from fine-tuning?", answer: "RAG injects external context at query time without changing weights. Fine-tuning updates weights to bake knowledge or behavior in. RAG = fresh, cheap, auditable. FT = stylistic, latency-friendly.", difficulty: "Medium", importance: 5, hasDiagram: true, minutes: 5 },
  { id: "iq5", topic: "MLOps", question: "Design a model deployment pipeline.", answer: "Source: model registry → CI build → containerize → canary deploy → shadow traffic → full rollout. Add feature store, online/offline parity checks, drift monitoring, rollback hooks.", difficulty: "Hard", importance: 4, hasDiagram: true, minutes: 12 },
  { id: "iq6", topic: "SQL", question: "Difference between WHERE and HAVING?", answer: "WHERE filters rows before aggregation; HAVING filters groups after aggregation.", difficulty: "Easy", importance: 3, hasDiagram: false, minutes: 2 },
  { id: "iq7", topic: "ML", question: "How would you handle class imbalance?", answer: "Resampling (SMOTE, undersampling), class weights, threshold tuning, focal loss, and evaluating with PR-AUC rather than ROC-AUC.", difficulty: "Medium", importance: 5, hasDiagram: false, minutes: 4 },
  { id: "iq8", topic: "DL", question: "Why use residual connections?", answer: "They let gradients flow directly through deep networks, mitigating vanishing gradients and enabling training of very deep models.", difficulty: "Medium", importance: 4, hasDiagram: true, minutes: 4 },
  { id: "iq9", topic: "Stats", question: "Central Limit Theorem in plain words?", answer: "The mean of many independent samples is approximately normal, regardless of the underlying distribution, given enough samples.", difficulty: "Easy", importance: 4, hasDiagram: true, minutes: 3 },
  { id: "iq10", topic: "NLP", question: "What is BPE tokenization?", answer: "Byte-Pair Encoding starts with characters and iteratively merges the most frequent adjacent pair to form subword units.", difficulty: "Medium", importance: 3, hasDiagram: false, minutes: 4 },
  { id: "iq11", topic: "ML", question: "Explain k-fold cross-validation.", answer: "Split data into k folds; train on k-1, validate on 1; rotate; average. Reduces variance of performance estimate.", difficulty: "Easy", importance: 4, hasDiagram: true, minutes: 3 },
  { id: "iq12", topic: "MLOps", question: "What is feature drift vs concept drift?", answer: "Feature drift = input distribution changes. Concept drift = the relationship P(y|x) changes. Both demand retraining strategies.", difficulty: "Hard", importance: 4, hasDiagram: true, minutes: 6 },
];

export type Diagram = {
  id: string;
  title: string;
  caption: string;
  category: "Architecture" | "Flow" | "Math" | "System";
  image: string;
};

export const diagrams: Diagram[] = [
  { id: "d1", title: "Transformer Block", caption: "Attention + FFN with residuals", category: "Architecture", image: tileDl },
  { id: "d2", title: "Bias–Variance Curve", caption: "Total error decomposition", category: "Math", image: tileStats },
  { id: "d3", title: "RAG Pipeline", caption: "Retrieve → Rerank → Generate", category: "Flow", image: tileNlp },
  { id: "d4", title: "Model Deployment", caption: "Registry → CI → Canary → Prod", category: "System", image: tileMlops },
  { id: "d5", title: "Random Forest", caption: "Bagged trees voting", category: "Architecture", image: tileMl },
  { id: "d6", title: "SQL Join Types", caption: "Inner, left, right, full", category: "Flow", image: tileData },
];

export type Video = {
  id: string;
  title: string;
  source: "YouTube" | "Udemy" | "Coursera" | "DeepLearning.AI";
  duration: string;
  url: string;
  image: string;
};

export const videos: Video[] = [
  { id: "v1", title: "Attention Is All You Need — Explained", source: "YouTube", duration: "27 min", url: "https://www.youtube.com/results?search_query=attention+is+all+you+need", image: tileDl },
  { id: "v2", title: "Andrew Ng — ML Specialization", source: "Coursera", duration: "60 hr", url: "https://www.coursera.org/specializations/machine-learning-introduction", image: tileMl },
  { id: "v3", title: "Building LLM Apps with RAG", source: "DeepLearning.AI", duration: "1.5 hr", url: "https://www.deeplearning.ai/", image: tileNlp },
  { id: "v4", title: "StatQuest — Bias & Variance", source: "YouTube", duration: "11 min", url: "https://www.youtube.com/@statquest", image: tileStats },
  { id: "v5", title: "MLOps Zoomcamp", source: "YouTube", duration: "30 hr", url: "https://github.com/DataTalksClub/mlops-zoomcamp", image: tileMlops },
  { id: "v6", title: "Advanced SQL for Data Analysis", source: "Udemy", duration: "8 hr", url: "https://www.udemy.com/", image: tileData },
];
