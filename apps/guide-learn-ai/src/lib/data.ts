import topicLinear from "@/assets/topic-linear-regression.jpg";
import topicLogistic from "@/assets/topic-logistic-regression.jpg";
import topicTrees from "@/assets/topic-decision-trees.jpg";
import topicNN from "@/assets/topic-neural-networks.jpg";
import topicCNN from "@/assets/topic-cnn.jpg";
import topicTransformers from "@/assets/topic-transformers.jpg";
import topicLLM from "@/assets/topic-llm-finetune.jpg";
import topicMLOps from "@/assets/topic-mlops.jpg";

import diagMlp from "@/assets/diagram-mlp.jpg";
import diagCnn from "@/assets/diagram-cnn.jpg";
import diagTransformer from "@/assets/diagram-transformer.jpg";
import diagRag from "@/assets/diagram-rag.jpg";
import diagMlops from "@/assets/diagram-mlops.jpg";
import diagKmeans from "@/assets/diagram-kmeans.jpg";

import vidTransformers from "@/assets/video-transformers.jpg";
import vidRag from "@/assets/video-rag.jpg";
import vidDeep from "@/assets/video-deeplearning.jpg";
import vidMlops from "@/assets/video-mlops.jpg";
import vidLora from "@/assets/video-lora.jpg";
import vidSystem from "@/assets/video-systemdesign.jpg";

export type NoteEntry = { id: number; q: string; a: string };
export type NoteRange = { label: string; from: number; to: number; entries: NoteEntry[] };

const sampleAnswers = [
  "A supervised learning algorithm that fits a linear relationship between inputs and a continuous target.",
  "Bias measures systematic error; variance measures sensitivity to fluctuations. The tradeoff balances under- and over-fitting.",
  "Gradient descent iteratively updates parameters in the direction that most reduces the loss function.",
  "Regularization penalizes large weights (L1/L2) to reduce overfitting and improve generalization.",
  "Cross validation partitions data into folds to estimate model performance more robustly than a single train/test split.",
  "Precision is TP/(TP+FP), recall is TP/(TP+FN). F1 is the harmonic mean and balances both.",
  "PCA projects data onto orthogonal components ranked by explained variance.",
  "Convolutions share weights across spatial locations, capturing local patterns with translation equivariance.",
  "Attention computes weighted combinations of values using query-key similarities, enabling long-range context.",
  "Transformers stack multi-head self-attention and feed-forward layers with residuals and layer norm.",
];

function makeEntries(from: number, to: number): NoteEntry[] {
  const out: NoteEntry[] = [];
  for (let i = from; i <= to; i++) {
    out.push({
      id: i,
      q: `Note ${i} — ${["What is", "Explain", "Compare", "Derive", "Implement"][i % 5]} concept #${i}?`,
      a: sampleAnswers[i % sampleAnswers.length],
    });
  }
  return out;
}

export const NOTE_RANGES: NoteRange[] = [
  { label: "1 — 20", from: 1, to: 20, entries: makeEntries(1, 20) },
  { label: "20 — 40", from: 20, to: 40, entries: makeEntries(20, 40) },
  { label: "40 — 60", from: 40, to: 60, entries: makeEntries(40, 60) },
  { label: "60 — 80", from: 60, to: 80, entries: makeEntries(60, 80) },
  { label: "80 — 100", from: 80, to: 100, entries: makeEntries(80, 100) },
  { label: "100 — 120", from: 100, to: 120, entries: makeEntries(100, 120) },
  { label: "120 — 140", from: 120, to: 140, entries: makeEntries(120, 140) },
];

export type Topic = {
  id: string;
  title: string;
  category: string;
  gradient: string;
  cover: string;
  twoMark: string[];
  fourMark: string[];
  eightMark: string[];
  sixteenMark?: string[];
  diagrams: { title: string; note: string; cover: string }[];
  flow: string[];
  links: { label: string; url: string }[];
};

export const TOPICS: Topic[] = [
  {
    id: "linear-regression",
    title: "Linear Regression",
    category: "Classical ML",
    gradient: "grad-sunset",
    cover: topicLinear,
    twoMark: ["Define linear regression.", "What is the cost function (MSE)?"],
    fourMark: ["Derive the normal equation.", "Explain gradient descent for OLS."],
    eightMark: ["Compare OLS vs Ridge vs Lasso with assumptions.", "End-to-end implementation walk-through."],
    diagrams: [{ title: "Hypothesis line over scatter", note: "Show residuals.", cover: topicLinear }],
    flow: ["Load data", "EDA", "Feature engineering", "Fit", "Evaluate", "Tune", "Deploy"],
    links: [{ label: "Scikit-learn docs", url: "https://scikit-learn.org/stable/modules/linear_model.html" }],
  },
  {
    id: "logistic-regression",
    title: "Logistic Regression",
    category: "Classical ML",
    gradient: "grad-ocean",
    cover: topicLogistic,
    twoMark: ["What is the sigmoid function?", "Binary vs multinomial."],
    fourMark: ["Derive log-loss.", "Decision boundary intuition."],
    eightMark: ["Maximum likelihood estimation walkthrough.", "Regularized logistic regression."],
    diagrams: [{ title: "Sigmoid curve", note: "0 → 1 squashing.", cover: topicLogistic }],
    flow: ["Encode", "Scale", "Fit", "Threshold", "ROC"],
    links: [],
  },
  {
    id: "decision-trees",
    title: "Decision Trees & Random Forests",
    category: "Classical ML",
    gradient: "grad-mint",
    cover: topicTrees,
    twoMark: ["What is entropy?", "Gini vs entropy."],
    fourMark: ["How does information gain work?", "Bagging intuition."],
    eightMark: ["Random Forest vs Gradient Boosting deep dive."],
    diagrams: [{ title: "Tree split diagram", note: "Show root → leaves.", cover: topicTrees }],
    flow: ["Split", "Grow", "Prune", "Ensemble"],
    links: [],
  },
  {
    id: "neural-networks",
    title: "Neural Networks 101",
    category: "Deep Learning",
    gradient: "grad-aurora",
    cover: topicNN,
    twoMark: ["What is a perceptron?", "Define activation function."],
    fourMark: ["Backpropagation in 4 lines.", "Vanishing gradients."],
    eightMark: ["Full forward + backward pass derivation for a 2-layer MLP."],
    diagrams: [{ title: "MLP graph", note: "Inputs → hidden → output.", cover: diagMlp }],
    flow: ["Init", "Forward", "Loss", "Backward", "Update"],
    links: [],
  },
  {
    id: "cnn",
    title: "Convolutional Networks",
    category: "Deep Learning",
    gradient: "grad-peach",
    cover: topicCNN,
    twoMark: ["What is a convolution?", "Define pooling."],
    fourMark: ["Receptive field.", "Stride and padding."],
    eightMark: ["ResNet skip connections — why they work."],
    diagrams: [{ title: "Conv kernel sliding", note: "3x3 over feature map.", cover: diagCnn }],
    flow: ["Conv", "Activate", "Pool", "Flatten", "Dense"],
    links: [],
  },
  {
    id: "transformers",
    title: "Transformers & Attention",
    category: "NLP / LLM",
    gradient: "grad-sunset",
    cover: topicTransformers,
    twoMark: ["What is self-attention?", "Define multi-head attention."],
    fourMark: ["Q, K, V intuition.", "Why positional encodings?"],
    eightMark: ["Full transformer block walkthrough."],
    diagrams: [{ title: "Attention heatmap", note: "Token-to-token weights.", cover: diagTransformer }],
    flow: ["Embed", "Position", "Attend", "FFN", "Norm", "Repeat"],
    links: [{ label: "Attention Is All You Need", url: "https://arxiv.org/abs/1706.03762" }],
  },
  {
    id: "llm-finetune",
    title: "LLM Fine-Tuning & RAG",
    category: "NLP / LLM",
    gradient: "grad-ocean",
    cover: topicLLM,
    twoMark: ["What is RAG?", "Define LoRA."],
    fourMark: ["PEFT vs full fine-tune.", "Chunking strategies."],
    eightMark: ["RAG pipeline end-to-end with eval."],
    diagrams: [{ title: "RAG architecture", note: "Retriever + reader.", cover: diagRag }],
    flow: ["Ingest", "Chunk", "Embed", "Retrieve", "Augment", "Generate"],
    links: [],
  },
  {
    id: "mlops",
    title: "MLOps & Deployment",
    category: "Production",
    gradient: "grad-mint",
    cover: topicMLOps,
    twoMark: ["What is MLOps?", "Model registry."],
    fourMark: ["CI/CD for ML.", "Drift monitoring."],
    eightMark: ["Full MLOps stack — Airflow, MLflow, Seldon."],
    diagrams: [{ title: "MLOps loop", note: "Data → train → deploy → monitor.", cover: diagMlops }],
    flow: ["Version", "Build", "Test", "Deploy", "Monitor", "Retrain"],
    links: [],
  },
];

export type Question = {
  id: number;
  q: string;
  a: string;
  difficulty: "Easy" | "Medium" | "Hard";
  importance: number;
  length: "Short" | "Medium" | "Long";
  hasDiagram: boolean;
  tags: string[];
};

export const QUESTIONS: Question[] = [
  { id: 1, q: "Explain the bias-variance tradeoff.", a: "Bias is error from wrong assumptions; variance is error from sensitivity to noise. We want both low — but reducing one usually grows the other. Regularization, more data, and ensembling help balance them.", difficulty: "Medium", importance: 5, length: "Medium", hasDiagram: true, tags: ["ML", "Theory"] },
  { id: 2, q: "What is gradient descent?", a: "An iterative optimization algorithm that updates parameters in the direction of the negative gradient of a loss function.", difficulty: "Easy", importance: 5, length: "Short", hasDiagram: true, tags: ["Optimization"] },
  { id: 3, q: "Difference between L1 and L2 regularization?", a: "L1 (Lasso) adds |w| penalty — produces sparse weights. L2 (Ridge) adds w² penalty — shrinks weights smoothly without zeroing them.", difficulty: "Medium", importance: 4, length: "Short", hasDiagram: false, tags: ["ML"] },
  { id: 4, q: "Walk through a Transformer block.", a: "Input embeddings + positional encodings → multi-head self-attention → add & layer norm → feed-forward (2 dense layers) → add & layer norm. Stack N times.", difficulty: "Hard", importance: 5, length: "Long", hasDiagram: true, tags: ["LLM", "NLP"] },
  { id: 5, q: "What is overfitting and how to fix it?", a: "Model memorizes training data and fails on new data. Fixes: more data, regularization, dropout, early stopping, simpler model, cross-validation.", difficulty: "Easy", importance: 5, length: "Medium", hasDiagram: false, tags: ["ML"] },
  { id: 6, q: "Explain RAG (Retrieval Augmented Generation).", a: "Retrieve relevant context from a vector store using embedding similarity, then prepend it to the LLM prompt so generation is grounded in external knowledge.", difficulty: "Medium", importance: 5, length: "Medium", hasDiagram: true, tags: ["LLM", "RAG"] },
  { id: 7, q: "Precision vs Recall — when do you care about which?", a: "Precision matters when false positives are costly (spam filter). Recall matters when false negatives are costly (cancer screening).", difficulty: "Easy", importance: 4, length: "Short", hasDiagram: false, tags: ["Metrics"] },
  { id: 8, q: "What is batch normalization?", a: "Normalizes layer activations per mini-batch with learnable scale/shift, stabilizing training and allowing higher learning rates.", difficulty: "Medium", importance: 3, length: "Short", hasDiagram: true, tags: ["DL"] },
  { id: 9, q: "Explain PCA in one paragraph.", a: "PCA finds orthogonal axes (principal components) that maximize variance. Projecting onto top-K reduces dimensionality while preserving most signal.", difficulty: "Medium", importance: 3, length: "Short", hasDiagram: true, tags: ["ML"] },
  { id: 10, q: "How would you deploy an ML model to production?", a: "Package model (ONNX/Pickle) → wrap in API (FastAPI) → containerize (Docker) → serve (Kubernetes/Seldon) → monitor latency, drift, and accuracy. Add CI/CD and a model registry.", difficulty: "Hard", importance: 5, length: "Long", hasDiagram: true, tags: ["MLOps"] },
  { id: 11, q: "What is attention exactly?", a: "A weighted sum of values, where weights come from softmax over query-key similarities. It lets a model focus on relevant parts of the input.", difficulty: "Medium", importance: 5, length: "Medium", hasDiagram: true, tags: ["LLM", "NLP"] },
  { id: 12, q: "Bagging vs Boosting?", a: "Bagging trains models in parallel on bootstrap samples and averages — reduces variance. Boosting trains sequentially, each model correcting prior errors — reduces bias.", difficulty: "Medium", importance: 4, length: "Medium", hasDiagram: false, tags: ["ML"] },
];

export type Diagram = { id: string; title: string; category: string; gradient: string; description: string; cover: string };
export const DIAGRAMS: Diagram[] = [
  { id: "mlp", title: "Multi-Layer Perceptron", category: "Deep Learning", gradient: "grad-aurora", description: "Inputs → hidden layers → output, with activations.", cover: diagMlp },
  { id: "cnn", title: "CNN Pipeline", category: "Computer Vision", gradient: "grad-peach", description: "Conv → pool → flatten → dense.", cover: diagCnn },
  { id: "transformer", title: "Transformer Block", category: "NLP", gradient: "grad-sunset", description: "Self-attention + FFN with residuals.", cover: diagTransformer },
  { id: "rag", title: "RAG Architecture", category: "LLM", gradient: "grad-ocean", description: "Retriever + LLM + vector store.", cover: diagRag },
  { id: "mlops", title: "MLOps Lifecycle", category: "Production", gradient: "grad-mint", description: "Data → train → deploy → monitor loop.", cover: diagMlops },
  { id: "kmeans", title: "K-Means Clustering", category: "Unsupervised", gradient: "grad-aurora", description: "Centroids and assignments over iterations.", cover: diagKmeans },
];

export type Video = { id: string; title: string; channel: string; duration: string; url: string; gradient: string; cover: string };
export const VIDEOS: Video[] = [
  { id: "v1", title: "Transformers from Scratch", channel: "3Blue1Brown", duration: "26:10", url: "https://youtube.com/watch?v=wjZofJX0v4M", gradient: "grad-sunset", cover: vidTransformers },
  { id: "v2", title: "Build a RAG App in 1 Hour", channel: "Andrej Karpathy", duration: "1:02:30", url: "https://youtube.com/watch?v=zjkBMFhNj_g", gradient: "grad-ocean", cover: vidRag },
  { id: "v3", title: "Deep Learning Crash Course", channel: "freeCodeCamp", duration: "4:12:00", url: "https://youtube.com/watch?v=VyWAvY2CF9c", gradient: "grad-mint", cover: vidDeep },
  { id: "v4", title: "MLOps End-to-End", channel: "Udemy", duration: "8h", url: "https://udemy.com/course/mlops", gradient: "grad-peach", cover: vidMlops },
  { id: "v5", title: "LLM Fine-Tuning with LoRA", channel: "DeepLearning.AI", duration: "1:15:00", url: "https://youtube.com/watch?v=Us5ZFp16PaU", gradient: "grad-aurora", cover: vidLora },
  { id: "v6", title: "System Design for ML", channel: "ByteByteGo", duration: "32:00", url: "https://youtube.com/watch?v=", gradient: "grad-sunset", cover: vidSystem },
];
