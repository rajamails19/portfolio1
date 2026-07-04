export type Topic = {
  slug: string;
  title: string;
  category: string;
  emoji: string;
  blurb: string;
};

export const topics: Topic[] = [
  { slug: "linear-regression", title: "Linear Regression", category: "ML Foundations", emoji: "📈", blurb: "Predict continuous values from features." },
  { slug: "logistic-regression", title: "Logistic Regression", category: "ML Foundations", emoji: "🎯", blurb: "Binary classification with a sigmoid kick." },
  { slug: "decision-trees", title: "Decision Trees & Random Forest", category: "ML Foundations", emoji: "🌳", blurb: "Splits, entropy, ensembles." },
  { slug: "svm", title: "Support Vector Machines", category: "ML Foundations", emoji: "⚔️", blurb: "Maximum-margin hyperplanes." },
  { slug: "knn", title: "K-Nearest Neighbors", category: "ML Foundations", emoji: "📍", blurb: "Lazy learner based on distances." },
  { slug: "kmeans", title: "K-Means Clustering", category: "Unsupervised", emoji: "🧩", blurb: "Centroid-based clustering." },
  { slug: "pca", title: "PCA & Dimensionality", category: "Unsupervised", emoji: "🔭", blurb: "Find directions of max variance." },
  { slug: "neural-nets", title: "Neural Networks", category: "Deep Learning", emoji: "🧠", blurb: "Stacked nonlinear layers." },
  { slug: "cnn", title: "Convolutional Neural Nets", category: "Deep Learning", emoji: "🖼️", blurb: "Vision powerhouse." },
  { slug: "rnn-lstm", title: "RNN / LSTM / GRU", category: "Deep Learning", emoji: "🔁", blurb: "Sequence modeling." },
  { slug: "transformers", title: "Transformers & Attention", category: "Deep Learning", emoji: "🤖", blurb: "Self-attention all the way down." },
  { slug: "llm", title: "LLMs & Prompting", category: "GenAI", emoji: "💬", blurb: "Foundation models in production." },
  { slug: "rag", title: "RAG Systems", category: "GenAI", emoji: "📚", blurb: "Retrieval-augmented generation." },
  { slug: "fine-tuning", title: "Fine-tuning & LoRA", category: "GenAI", emoji: "🧪", blurb: "Adapting models to your data." },
  { slug: "stats", title: "Probability & Statistics", category: "Math", emoji: "🎲", blurb: "The language of ML." },
  { slug: "linalg", title: "Linear Algebra", category: "Math", emoji: "➗", blurb: "Vectors, matrices, eigenstuff." },
  { slug: "sql", title: "SQL for Data Science", category: "Engineering", emoji: "🗄️", blurb: "Joins, windows, CTEs." },
  { slug: "mlops", title: "MLOps & Deployment", category: "Engineering", emoji: "🚀", blurb: "Ship, monitor, retrain." },
];

export type Note = { q: string; a: string };
export type NoteRange = { id: string; label: string; from: number; to: number; notes: Note[] };

const sample = (from: number) => Array.from({ length: 20 }, (_, i) => ({
  q: `Q${from + i}. Topic placeholder ${from + i}`,
  a: `Short, sharp answer for note ${from + i}. Replace this with your actual content as you build it up.`,
}));

export const noteRanges: NoteRange[] = [
  { id: "r1", label: "Notes 1 – 20", from: 1, to: 20, notes: sample(1) },
  { id: "r2", label: "Notes 21 – 40", from: 21, to: 40, notes: sample(21) },
  { id: "r3", label: "Notes 41 – 60", from: 41, to: 60, notes: sample(41) },
  { id: "r4", label: "Notes 61 – 80", from: 61, to: 80, notes: sample(61) },
  { id: "r5", label: "Notes 81 – 100", from: 81, to: 100, notes: sample(81) },
  { id: "r6", label: "Notes 101 – 120", from: 101, to: 120, notes: sample(101) },
  { id: "r7", label: "Notes 121 – 140", from: 121, to: 140, notes: sample(121) },
];

export type QA = {
  id: string;
  question: string;
  answer: string;
  importance: 1 | 2 | 3; // 3 = most important
  length: "short" | "medium" | "long";
  hasDiagram: boolean;
  tags: string[];
};

export const qas: QA[] = [
  { id: "q1", question: "Explain bias-variance tradeoff.", answer: "Bias is error from wrong assumptions; variance is sensitivity to data. Lower one usually raises the other — aim for the sweet spot.", importance: 3, length: "short", hasDiagram: true, tags: ["ML"] },
  { id: "q2", question: "What is overfitting and how do you prevent it?", answer: "Model memorizes training data and fails to generalize. Use regularization, cross-validation, dropout, early stopping, more data.", importance: 3, length: "medium", hasDiagram: false, tags: ["ML"] },
  { id: "q3", question: "Walk through how a transformer works.", answer: "Tokens → embeddings → multi-head self-attention → feed-forward → residual + layernorm, stacked. Attention computes Q·Kᵀ / √d softmax · V for context.", importance: 3, length: "long", hasDiagram: true, tags: ["DL", "NLP"] },
  { id: "q4", question: "Precision vs Recall?", answer: "Precision = TP/(TP+FP). Recall = TP/(TP+FN). Choose based on cost of false positives vs false negatives.", importance: 2, length: "short", hasDiagram: true, tags: ["ML"] },
  { id: "q5", question: "What is RAG?", answer: "Retrieval-Augmented Generation: retrieve relevant docs from a vector DB, stuff them into the LLM prompt, get grounded answers.", importance: 3, length: "medium", hasDiagram: true, tags: ["GenAI"] },
  { id: "q6", question: "Explain gradient descent.", answer: "Iterative optimization: w ← w − η ∇L(w). Variants: SGD, momentum, Adam.", importance: 3, length: "medium", hasDiagram: true, tags: ["DL"] },
  { id: "q7", question: "L1 vs L2 regularization?", answer: "L1 (lasso) drives weights to zero → sparsity. L2 (ridge) shrinks all weights smoothly. Elastic Net combines both.", importance: 2, length: "short", hasDiagram: false, tags: ["ML"] },
  { id: "q8", question: "How does a CNN extract features?", answer: "Stacked conv filters detect edges → textures → parts → objects. Pooling reduces spatial dims; deeper layers see larger receptive fields.", importance: 2, length: "medium", hasDiagram: true, tags: ["DL", "CV"] },
  { id: "q9", question: "What is attention?", answer: "A weighted sum where weights depend on query-key similarity. Lets the model focus on relevant tokens.", importance: 3, length: "short", hasDiagram: true, tags: ["DL", "NLP"] },
  { id: "q10", question: "Difference between bagging and boosting?", answer: "Bagging trains parallel models on bootstraps and averages (Random Forest). Boosting trains sequentially, each fixing prior errors (XGBoost).", importance: 2, length: "medium", hasDiagram: true, tags: ["ML"] },
  { id: "q11", question: "Explain ROC-AUC.", answer: "ROC plots TPR vs FPR across thresholds. AUC = probability a random positive ranks above a random negative.", importance: 2, length: "short", hasDiagram: true, tags: ["ML"] },
  { id: "q12", question: "What's the curse of dimensionality?", answer: "As dimensions grow, data becomes sparse, distances meaningless, models overfit. Mitigate with feature selection or dimensionality reduction.", importance: 1, length: "short", hasDiagram: false, tags: ["ML"] },
];

export type Diagram = { id: string; title: string; category: string; description: string };

export const diagrams: Diagram[] = [
  { id: "d1", title: "Neural Network Architecture", category: "Deep Learning", description: "Input → hidden layers → output with activations." },
  { id: "d2", title: "Transformer Block", category: "NLP", description: "Multi-head attention + FFN + residual." },
  { id: "d3", title: "RAG Pipeline", category: "GenAI", description: "Query → embed → vector search → context → LLM." },
  { id: "d4", title: "Gradient Descent", category: "Optimization", description: "Stepping down the loss surface." },
  { id: "d5", title: "CNN Filter Stack", category: "Computer Vision", description: "Conv → pool → conv → flatten → dense." },
  { id: "d6", title: "Bias-Variance Tradeoff", category: "ML Foundations", description: "U-curve of total error." },
  { id: "d7", title: "Random Forest", category: "Ensembles", description: "Bagged decision trees voting." },
  { id: "d8", title: "K-Means Iteration", category: "Clustering", description: "Assign → update centroids → repeat." },
];

export type Video = { id: string; title: string; channel: string; duration: string; url: string; tag: string };

export const videos: Video[] = [
  { id: "v1", title: "But what is a neural network?", channel: "3Blue1Brown", duration: "19:13", url: "https://youtu.be/aircAruvnKk", tag: "Deep Learning" },
  { id: "v2", title: "Attention is All You Need (paper walkthrough)", channel: "Yannic Kilcher", duration: "27:07", url: "https://youtu.be/iDulhoQ2pro", tag: "Transformers" },
  { id: "v3", title: "Machine Learning Crash Course", channel: "Google Developers", duration: "Series", url: "https://developers.google.com/machine-learning/crash-course", tag: "Foundations" },
  { id: "v4", title: "Building LLM Applications", channel: "Andrej Karpathy", duration: "1:56:20", url: "https://youtu.be/zjkBMFhNj_g", tag: "GenAI" },
  { id: "v5", title: "Practical Deep Learning for Coders", channel: "fast.ai", duration: "Series", url: "https://course.fast.ai/", tag: "Deep Learning" },
  { id: "v6", title: "MLOps Specialization", channel: "DeepLearning.AI", duration: "Series", url: "https://www.coursera.org/specializations/machine-learning-engineering-for-production-mlops", tag: "MLOps" },
];
