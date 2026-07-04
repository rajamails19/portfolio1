import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useMemo, useState } from "react";
import {
  ArrowLeft, ChevronLeft, ChevronRight, CheckCircle2, XCircle,
  Flag, Trophy, Timer, Sparkles, RotateCcw,
} from "lucide-react";
import mascotQuiz from "@/assets/mascot-quiz.jpg";

export const Route = createFileRoute("/quiz/$modeId")({
  head: () => ({
    meta: [
      { title: "Quiz · Play — NeuroNext" },
      { name: "description", content: "Active recall quiz session with paginated questions and instant feedback." },
    ],
  }),
  component: QuizPlay,
});

/* ---------- dummy bank ---------- */

type Q = {
  id: number;
  q: string;
  options: string[];
  answer: number;
  explain: string;
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
};

const TOPICS = ["Neural Nets", "Transformers", "Regression", "MLOps", "CNN", "LLM", "Trees", "Stats"];
const DIFFS: Q["difficulty"][] = ["Easy", "Medium", "Hard"];

const POOL: Omit<Q, "id" | "topic" | "difficulty">[] = [
  { q: "What does Dropout do in a neural network?", options: ["Reduces overfitting via random activation masking", "Increases model capacity", "Guarantees faster convergence", "Replaces batch normalization"], answer: 0, explain: "Dropout randomly zeroes activations during training, forcing the network to learn redundant, robust features." },
  { q: "Which activation outputs values between -1 and 1?", options: ["ReLU", "Sigmoid", "Tanh", "Softmax"], answer: 2, explain: "Tanh is a zero-centered squashing function bounded in (-1, 1)." },
  { q: "What is the purpose of an embedding layer?", options: ["Normalize inputs", "Map discrete tokens to dense vectors", "Reduce learning rate", "Apply dropout"], answer: 1, explain: "Embeddings convert sparse categorical IDs into learned dense vector representations." },
  { q: "Self-attention complexity with sequence length n is:", options: ["O(n)", "O(n log n)", "O(n²)", "O(1)"], answer: 2, explain: "Vanilla self-attention computes pairwise scores → quadratic in sequence length." },
  { q: "Which optimizer adapts learning rate per parameter using moment estimates?", options: ["SGD", "Adam", "Momentum", "Rprop"], answer: 1, explain: "Adam uses first and second moment estimates of gradients to adapt step size." },
  { q: "Cross-entropy loss is typically used for:", options: ["Regression", "Classification", "Clustering", "Dimensionality reduction"], answer: 1, explain: "It measures divergence between predicted probability and true class distribution." },
  { q: "L2 regularization penalizes:", options: ["Weight magnitude (squared)", "Number of layers", "Batch size", "Learning rate"], answer: 0, explain: "L2 adds λ·Σw² to the loss → prefers small, spread-out weights." },
  { q: "Which is NOT a property of a good train/test split?", options: ["Random sampling", "Same distribution", "Identical examples", "Stratification when imbalanced"], answer: 2, explain: "Identical samples in train and test cause data leakage." },
  { q: "Vanishing gradients are most associated with:", options: ["ReLU", "Sigmoid/Tanh in deep nets", "Batch norm", "Adam"], answer: 1, explain: "Saturating activations like sigmoid/tanh shrink gradients exponentially in depth." },
  { q: "Which metric handles class imbalance better than accuracy?", options: ["MSE", "F1 score", "RMSE", "Log loss"], answer: 1, explain: "F1 balances precision and recall, robust to skewed class distributions." },
  { q: "Positional encoding in Transformers exists because:", options: ["Tokens need IDs", "Attention is permutation-invariant", "GPU needs it", "It speeds up softmax"], answer: 1, explain: "Without positional info, the model can't tell token order — attention is set-based." },
  { q: "Batch Normalization normalizes activations across:", options: ["Channels", "Time", "Mini-batch", "Parameters"], answer: 2, explain: "BN normalizes each feature over the mini-batch dimension during training." },
  { q: "Which loss is used for binary classification?", options: ["MSE", "Hinge or BCE", "KL only", "Huber"], answer: 1, explain: "Binary cross-entropy (or hinge in SVMs) is standard for two-class problems." },
  { q: "What is gradient clipping for?", options: ["Speed", "Avoiding exploding gradients", "Sparsity", "Data augmentation"], answer: 1, explain: "Clipping caps gradient norm to stabilize RNN/Transformer training." },
  { q: "Which is true about LoRA fine-tuning?", options: ["Trains all weights", "Adds low-rank adapters", "Replaces tokenizer", "Removes attention"], answer: 1, explain: "LoRA injects small low-rank matrices, drastically cutting trainable params." },
  { q: "Bias-Variance: a very deep, unregularized model usually has:", options: ["High bias, low variance", "Low bias, high variance", "Low bias, low variance", "High bias, high variance"], answer: 1, explain: "Capacity fits training data well (low bias) but overfits (high variance)." },
  { q: "Which is a generative model?", options: ["Logistic regression", "k-NN", "VAE", "SVM"], answer: 2, explain: "Variational Autoencoders learn p(x) and can sample new data." },
  { q: "PCA finds directions of:", options: ["Maximum variance", "Minimum mean", "Maximum entropy", "Minimum gradient"], answer: 0, explain: "PCA projects onto orthogonal axes that maximize retained variance." },
  { q: "ROC-AUC of 0.5 means:", options: ["Perfect", "Random", "Inverted", "Overfit"], answer: 1, explain: "0.5 AUC = no discrimination, equivalent to random guessing." },
  { q: "Which is a strength of decision trees?", options: ["Smooth boundaries", "Interpretability", "Low variance", "Probabilistic outputs always"], answer: 1, explain: "Trees produce human-readable if/then rules." },
  { q: "Bagging primarily reduces:", options: ["Bias", "Variance", "Compute", "Latency"], answer: 1, explain: "Averaging many high-variance learners reduces variance (random forest)." },
  { q: "Boosting fits new learners on:", options: ["Random subsets", "Residuals/errors", "All zeros", "Random labels"], answer: 1, explain: "Each weak learner targets the residual error of the previous ensemble." },
  { q: "Which is a sequence model?", options: ["CNN", "MLP", "LSTM", "k-Means"], answer: 2, explain: "LSTMs maintain hidden state across time steps for sequence data." },
  { q: "Word2Vec's CBOW predicts:", options: ["Next sentence", "Target word from context", "Context from word", "POS tag"], answer: 1, explain: "Continuous-Bag-of-Words predicts the center word given surrounding context." },
  { q: "Which keeps a model in production healthy?", options: ["No monitoring", "Drift detection", "Hardcoded outputs", "Disabling logs"], answer: 1, explain: "Tracking data/concept drift catches silent model degradation." },
  { q: "What does a confusion matrix show?", options: ["Loss curves", "TP/FP/TN/FN counts", "Feature importance", "Hyperparameters"], answer: 1, explain: "It tabulates predicted vs actual classes for diagnostic analysis." },
  { q: "Which is true of k-fold CV?", options: ["Trains once", "Averages k held-out scores", "Needs no test set", "Increases bias"], answer: 1, explain: "Each fold is held out once; performance is averaged for a stable estimate." },
  { q: "Softmax outputs:", options: ["Logits", "Probabilities summing to 1", "One-hot", "Embeddings"], answer: 1, explain: "Exponentiates and normalizes logits into a probability distribution." },
  { q: "Which reduces inference latency?", options: ["Quantization", "Adding layers", "Higher precision", "Wider attention"], answer: 0, explain: "Quantizing to int8/4 shrinks memory and speeds up matmuls." },
  { q: "RAG augments LLMs by:", options: ["Larger weights", "Retrieving external context", "Hard-coding answers", "Disabling tokenizer"], answer: 1, explain: "Retrieval-Augmented Generation injects fresh documents into the prompt." },
  { q: "A high learning rate often causes:", options: ["Slow convergence", "Loss spikes / divergence", "Overfitting only", "No effect"], answer: 1, explain: "Large steps overshoot minima, producing unstable or diverging loss." },
  { q: "Early stopping monitors:", options: ["Train loss", "Validation loss", "Weight norm", "Epoch count only"], answer: 1, explain: "Training halts when validation loss stops improving to prevent overfitting." },
  { q: "Which framework is PyTorch's eager tensor library?", options: ["torch", "jax", "tf", "onnx"], answer: 0, explain: "PyTorch exposes tensors and autograd through the `torch` module." },
  { q: "BLEU evaluates:", options: ["Image quality", "Translation overlap", "Audio quality", "Speed"], answer: 1, explain: "BLEU scores n-gram overlap between candidate and reference translations." },
  { q: "Which is a hyperparameter?", options: ["Weights", "Biases", "Learning rate", "Activations"], answer: 2, explain: "Hyperparameters are set before training; weights/biases are learned." },
  { q: "Vision Transformers split images into:", options: ["Pixels", "Patches", "Channels", "FFTs"], answer: 1, explain: "ViTs tokenize images into fixed-size patches treated as a sequence." },
  { q: "Which is a contrastive learning loss?", options: ["MSE", "InfoNCE", "MAE", "Huber"], answer: 1, explain: "InfoNCE pulls positives together and pushes negatives apart in embedding space." },
  { q: "Catastrophic forgetting happens during:", options: ["Pretraining", "Continual fine-tuning", "Inference", "Quantization"], answer: 1, explain: "New tasks overwrite previously learned representations without rehearsal." },
  { q: "Which is the role of a learning rate scheduler?", options: ["Pick optimizer", "Adjust LR over time", "Pick model", "Pick loss"], answer: 1, explain: "Schedulers anneal or warm up the learning rate for better convergence." },
  { q: "Which embedding distance suits semantic search?", options: ["Manhattan", "Cosine similarity", "Hamming", "Chebyshev"], answer: 1, explain: "Cosine compares direction, robust to magnitude — standard for text embeddings." },
  { q: "What is a token in NLP?", options: ["A pixel", "A unit of text (word/subword)", "A gradient", "A layer"], answer: 1, explain: "Tokens are the atomic units the model consumes (subword BPE, WordPiece, etc.)." },
  { q: "Which is true of zero-shot classification?", options: ["No training data needed at inference time", "Requires labels at inference", "Only for images", "Always supervised"], answer: 0, explain: "The model classifies into novel labels using a pretrained semantic mapping." },
  { q: "Mixed-precision training mainly improves:", options: ["Accuracy", "Throughput and memory", "Interpretability", "Bias"], answer: 1, explain: "FP16/BF16 ops are faster and use less memory on modern GPUs." },
  { q: "Which is a vector database?", options: ["Postgres only", "Pinecone / pgvector", "Redis Streams", "S3"], answer: 1, explain: "Vector DBs index embeddings for approximate nearest-neighbour search." },
  { q: "Why use beam search for generation?", options: ["Strict greedy", "Explore multiple high-probability sequences", "Speed only", "To shuffle tokens"], answer: 1, explain: "Beam search keeps top-k hypotheses, improving output quality over greedy decoding." },
];

const TOTAL = 45;
const PER_PAGE = 15;

function buildBank(seedKey: string): Q[] {
  // simple deterministic shuffle so each mode feels different
  let h = 0;
  for (let i = 0; i < seedKey.length; i++) h = (h * 31 + seedKey.charCodeAt(i)) >>> 0;
  const arr = POOL.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    h = (h * 1664525 + 1013904223) >>> 0;
    const j = h % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  const out: Q[] = [];
  for (let i = 0; i < TOTAL; i++) {
    const base = arr[i % arr.length];
    out.push({
      ...base,
      id: i + 1,
      topic: TOPICS[(i + h) % TOPICS.length],
      difficulty: DIFFS[(i * 7 + h) % DIFFS.length],
    });
  }
  return out;
}

const MODE_TITLES: Record<string, string> = {
  mcq: "MCQ Challenge",
  fill: "Fill in the Blanks",
  flash: "Flash Cards",
  match: "Drag & Drop Match",
  rapid: "Rapid Fire",
  diagram: "Diagram Quiz",
  sim: "Interview Simulator",
  memory: "Memory Match",
  scenario: "Scenario Challenge",
  code: "Code Completion",
  rev: "One Minute Revision",
  boss: "Boss Battle",
};

const diffColor: Record<Q["difficulty"], string> = {
  Easy: "bg-emerald-100 text-emerald-700 ring-emerald-200",
  Medium: "bg-amber-100 text-amber-700 ring-amber-200",
  Hard: "bg-rose-100 text-rose-700 ring-rose-200",
};

function QuizPlay() {
  const { modeId } = Route.useParams();
  const navigate = useNavigate();
  const title = MODE_TITLES[modeId] ?? "Quiz";

  const questions = useMemo(() => buildBank(modeId), [modeId]);
  const pages = Math.ceil(questions.length / PER_PAGE);

  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submittedPages, setSubmittedPages] = useState<Record<number, boolean>>({});
  const [finished, setFinished] = useState(false);

  const start = page * PER_PAGE;
  const slice = questions.slice(start, start + PER_PAGE);
  const pageSubmitted = !!submittedPages[page];

  const answeredCount = Object.keys(answers).length;
  const correctCount = questions.reduce(
    (acc, q) => acc + (answers[q.id] === q.answer ? 1 : 0),
    0
  );
  const accuracy = answeredCount ? Math.round((correctCount / answeredCount) * 100) : 0;

  const pageAnswered = slice.every((q) => answers[q.id] !== undefined);

  function pick(qid: number, idx: number) {
    if (pageSubmitted) return;
    setAnswers((a) => ({ ...a, [qid]: idx }));
  }

  function submitPage() {
    setSubmittedPages((s) => ({ ...s, [page]: true }));
  }

  function nextPage() {
    if (page < pages - 1) {
      setPage(page + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setFinished(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function restart() {
    setAnswers({});
    setSubmittedPages({});
    setPage(0);
    setFinished(false);
  }

  return (
    <AppShell>
      {/* floating blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 -left-20 w-96 h-96 grad-aurora rounded-full blur-3xl opacity-30 animate-blob" />
        <div className="absolute bottom-10 right-0 w-80 h-80 grad-peach rounded-full blur-3xl opacity-30 animate-blob" style={{ animationDelay: "2s" }} />
      </div>

      {/* top bar */}
      <div className="mb-6 flex flex-wrap items-center gap-3 justify-between">
        <Link to="/quiz" className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/70 hover:text-foreground glass rounded-full px-3 py-1.5">
          <ArrowLeft className="h-4 w-4" /> Back to arena
        </Link>
        <div className="flex items-center gap-2 text-xs">
          <span className="glass rounded-full px-3 py-1.5 inline-flex items-center gap-1 font-semibold">
            <Timer className="h-3.5 w-3.5" /> Page {page + 1} / {pages}
          </span>
          <span className="glass rounded-full px-3 py-1.5 inline-flex items-center gap-1 font-semibold">
            <Sparkles className="h-3.5 w-3.5" /> {answeredCount}/{questions.length} answered
          </span>
          <span className="glass rounded-full px-3 py-1.5 inline-flex items-center gap-1 font-semibold">
            <Trophy className="h-3.5 w-3.5 text-amber-500" /> {accuracy}% acc
          </span>
        </div>
      </div>

      {/* header */}
      <div className="glass rounded-3xl p-5 md:p-6 mb-6 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-56 h-56 grad-primary rounded-full blur-3xl opacity-30" />
        <div className="relative flex items-center gap-4">
          <img src={mascotQuiz} alt="" className="h-16 w-16 rounded-2xl object-cover ring-2 ring-white/60 shadow-lg" />
          <div className="flex-1 min-w-0">
            <div className="text-[11px] uppercase tracking-wider text-foreground/50">Quiz Session</div>
            <h1 className="text-2xl md:text-3xl font-extrabold leading-tight">
              {title} <span className="text-grad">· Live</span>
            </h1>
            <p className="text-sm text-foreground/60 mt-1">
              {questions.length} questions across {pages} pages — answer all on a page, then submit to see results.
            </p>
          </div>
        </div>
        {/* progress bar */}
        <div className="relative mt-5">
          <div className="h-2 rounded-full bg-white/60 overflow-hidden">
            <div className="h-full grad-primary rounded-full transition-all" style={{ width: `${(answeredCount / questions.length) * 100}%` }} />
          </div>
        </div>
      </div>

      {finished ? (
        <ResultScreen total={questions.length} correct={correctCount} onRestart={restart} onBackArena={() => navigate({ to: "/quiz" })} />
      ) : (
        <>
          {/* page pills */}
          <div className="mb-5 flex flex-wrap gap-2">
            {Array.from({ length: pages }).map((_, p) => {
              const isActive = p === page;
              const done = !!submittedPages[p];
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={[
                    "px-3 py-1.5 rounded-full text-xs font-bold ring-1 transition-all",
                    isActive
                      ? "grad-primary text-white shadow-md ring-transparent scale-105"
                      : done
                      ? "bg-emerald-100 text-emerald-700 ring-emerald-200"
                      : "glass ring-black/5 text-foreground/70 hover:text-foreground",
                  ].join(" ")}
                >
                  Page {p + 1}
                  {done && <CheckCircle2 className="inline h-3.5 w-3.5 ml-1 -mt-0.5" />}
                </button>
              );
            })}
          </div>

          {/* questions */}
          <div className="grid gap-4">
            {slice.map((q, idx) => (
              <QuestionCard
                key={q.id}
                q={q}
                number={start + idx + 1}
                picked={answers[q.id]}
                submitted={pageSubmitted}
                onPick={(i) => pick(q.id, i)}
              />
            ))}
          </div>

          {/* footer controls */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="inline-flex items-center gap-1 px-4 py-2 rounded-full glass font-semibold text-sm disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </button>

            <div className="text-xs text-foreground/60">
              {pageAnswered ? "All answered on this page." : `Answer ${slice.length - slice.filter(q => answers[q.id] !== undefined).length} more to submit.`}
            </div>

            {!pageSubmitted ? (
              <button
                onClick={submitPage}
                disabled={!pageAnswered}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full grad-primary text-white font-bold text-sm shadow-lg disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 transition-transform"
              >
                <Flag className="h-4 w-4" /> Submit page
              </button>
            ) : (
              <button
                onClick={nextPage}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full grad-aurora text-white font-bold text-sm shadow-lg hover:scale-105 transition-transform"
              >
                {page < pages - 1 ? "Next page" : "Finish quiz"} <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </>
      )}
    </AppShell>
  );
}

function QuestionCard({
  q, number, picked, submitted, onPick,
}: {
  q: Q;
  number: number;
  picked: number | undefined;
  submitted: boolean;
  onPick: (i: number) => void;
}) {
  return (
    <div className="glass rounded-3xl p-5 relative overflow-hidden animate-slide-up">
      <div className="absolute -top-16 -left-16 h-40 w-40 grad-peach rounded-full blur-3xl opacity-20" />
      <div className="relative flex items-start gap-3 mb-4">
        <div className="h-9 w-9 shrink-0 rounded-xl grad-primary text-white grid place-items-center font-extrabold text-sm shadow">
          {number}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ring-1 ${diffColor[q.difficulty]}`}>{q.difficulty}</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/70 ring-1 ring-black/5 text-foreground/70">{q.topic}</span>
          </div>
          <div className="font-bold text-foreground">{q.q}</div>
        </div>
      </div>

      <div className="relative grid gap-2">
        {q.options.map((o, i) => {
          const isPicked = picked === i;
          const isCorrect = i === q.answer;
          let cls = "bg-white/70 ring-black/5 hover:bg-white";
          if (submitted) {
            if (isCorrect) cls = "bg-emerald-50 ring-emerald-200 text-emerald-800";
            else if (isPicked) cls = "bg-rose-50 ring-rose-200 text-rose-800";
            else cls = "bg-white/40 ring-black/5 text-foreground/60";
          } else if (isPicked) {
            cls = "bg-indigo-50 ring-indigo-200 text-indigo-900";
          }
          return (
            <button
              key={i}
              onClick={() => onPick(i)}
              disabled={submitted}
              className={`text-left rounded-2xl px-3 py-2.5 ring-1 transition-all text-sm flex items-center gap-2 ${cls}`}
            >
              <span className="h-5 w-5 grid place-items-center rounded-full bg-white ring-1 ring-black/10 text-[10px] font-bold">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1">{o}</span>
              {submitted && isCorrect && <CheckCircle2 className="h-4 w-4" />}
              {submitted && !isCorrect && isPicked && <XCircle className="h-4 w-4" />}
            </button>
          );
        })}
      </div>

      {submitted && (
        <div className="relative mt-3 rounded-2xl bg-white/80 ring-1 ring-black/5 p-3 text-xs text-foreground/70">
          <span className="font-bold text-foreground">Why · </span>
          {q.explain}
        </div>
      )}
    </div>
  );
}

function ResultScreen({
  total, correct, onRestart, onBackArena,
}: { total: number; correct: number; onRestart: () => void; onBackArena: () => void }) {
  const pct = Math.round((correct / total) * 100);
  const tier =
    pct >= 90 ? { label: "Legendary", grad: "grad-primary" } :
    pct >= 75 ? { label: "Sharp",     grad: "grad-aurora" } :
    pct >= 50 ? { label: "Solid",     grad: "grad-mint" } :
                { label: "Keep going", grad: "grad-sunset" };

  return (
    <div className="relative glass rounded-3xl p-8 md:p-10 text-center overflow-hidden">
      <div className="absolute -top-20 -left-20 h-72 w-72 grad-aurora rounded-full blur-3xl opacity-40" />
      <div className="absolute -bottom-20 -right-20 h-72 w-72 grad-peach rounded-full blur-3xl opacity-40" />
      <div className="relative">
        <div className={`mx-auto h-20 w-20 rounded-3xl ${tier.grad} grid place-items-center text-white shadow-xl mb-4`}>
          <Trophy className="h-9 w-9" />
        </div>
        <div className="text-xs uppercase tracking-wider text-foreground/50">Session complete</div>
        <h2 className="text-3xl md:text-4xl font-extrabold mt-1">{tier.label}!</h2>
        <p className="text-foreground/60 mt-1">You scored <span className="font-bold text-foreground">{correct} / {total}</span> ({pct}%).</p>

        <div className="grid grid-cols-3 max-w-md mx-auto gap-3 mt-6">
          <Tile label="Correct" value={`${correct}`} grad="grad-mint" />
          <Tile label="Wrong" value={`${total - correct}`} grad="grad-sunset" />
          <Tile label="Accuracy" value={`${pct}%`} grad="grad-aurora" />
        </div>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button onClick={onRestart} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass font-bold text-sm hover:scale-105 transition-transform">
            <RotateCcw className="h-4 w-4" /> Restart
          </button>
          <button onClick={onBackArena} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full grad-primary text-white font-bold text-sm shadow-lg hover:scale-105 transition-transform">
            Back to arena <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Tile({ label, value, grad }: { label: string; value: string; grad: string }) {
  return (
    <div className="glass rounded-2xl p-3">
      <div className={`h-1.5 w-10 rounded-full ${grad} mb-2 mx-auto`} />
      <div className="text-xl font-extrabold">{value}</div>
      <div className="text-[11px] uppercase tracking-wider text-foreground/50">{label}</div>
    </div>
  );
}
