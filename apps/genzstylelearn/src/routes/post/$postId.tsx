import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Bookmark,
  Heart,
  Send,
  Sparkles,
  Clock,
  Zap,
  Brain,
  Eye,
  TrendingDown,
  BarChart2,
  Repeat,
  Mountain,
  Gauge,
  GitCompare,
  FlaskConical,
  Activity,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import { articles } from "@/lib/articles";

export const Route = createFileRoute("/post/$postId")({
  head: ({ params }) => {
    const article = articles[params.postId];
    return {
      meta: [
        { title: article ? `${article.title} · Lumen` : "Article · Lumen" },
        { name: "description", content: article?.subtitle ?? "" },
      ],
    };
  },
  component: ArticlePage,
});

/* ── shared chrome ── */

function ArticleChrome({
  children,
  liked,
  saved,
  onLike,
  onSave,
}: {
  children: React.ReactNode;
  liked: boolean;
  saved: boolean;
  onLike: () => void;
  onSave: () => void;
}) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 glass border-b border-white/40 px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm font-semibold hover:text-primary transition"
        >
          <ArrowLeft className="size-5" />
          <span className="hidden sm:inline">Back to feed</span>
        </Link>
        <div className="flex items-center gap-2">
          <Sparkles className="size-5 text-primary" />
          <span
            className="text-lg font-bold tracking-tight bg-clip-text text-transparent dream-gradient"
            style={{ WebkitBackgroundClip: "text" }}
          >
            Lumen
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onLike} className="hover:scale-110 transition">
            <Heart
              className={`size-6 ${liked ? "fill-rose-500 text-rose-500" : ""}`}
              strokeWidth={1.8}
            />
          </button>
          <button onClick={onSave} className="hover:scale-110 transition">
            <Bookmark
              className={`size-6 ${saved ? "fill-primary text-primary" : ""}`}
              strokeWidth={1.8}
            />
          </button>
        </div>
      </header>
      {children}
    </div>
  );
}

function ArticleHero({
  article,
  liked,
  saved,
  onLike,
  onSave,
}: {
  article: (typeof articles)[string];
  liked: boolean;
  saved: boolean;
  onLike: () => void;
  onSave: () => void;
}) {
  return (
    <>
      <div className="relative w-full max-h-[55vh] overflow-hidden">
        <img
          src={article.heroImg}
          alt={article.title}
          className="w-full object-cover max-h-[55vh]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 text-white max-w-3xl mx-auto">
          <span className="text-[11px] uppercase tracking-widest opacity-70 font-semibold">
            #{article.tag}
          </span>
          <h1 className="mt-2 text-3xl sm:text-5xl font-extrabold leading-tight drop-shadow">
            {article.title}
          </h1>
          <p className="mt-3 text-sm sm:text-base opacity-80 max-w-xl">{article.subtitle}</p>
          <div className="mt-4 flex items-center gap-4 text-xs opacity-70">
            <span className="font-semibold">{article.author}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="size-3" /> {article.readMins} min read
            </span>
            <span>·</span>
            <span>{article.likes} learners</span>
          </div>
        </div>
      </div>

      {/* footer actions */}
      <div className="max-w-2xl mx-auto px-5 sm:px-8 pt-6 flex items-center justify-between border-b border-white/20 pb-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onLike}
            className="flex items-center gap-2 text-sm font-semibold hover:text-rose-500 transition"
          >
            <Heart
              className={`size-5 ${liked ? "fill-rose-500 text-rose-500" : ""}`}
              strokeWidth={1.8}
            />
            {article.likes}
          </button>
          <button className="hover:scale-110 transition">
            <Send className="size-5" strokeWidth={1.8} />
          </button>
        </div>
        <button
          onClick={onSave}
          className="flex items-center gap-2 text-sm font-semibold hover:text-primary transition"
        >
          <Bookmark
            className={`size-5 ${saved ? "fill-primary text-primary" : ""}`}
            strokeWidth={1.8}
          />
          {saved ? "Saved" : "Save"}
        </button>
      </div>
    </>
  );
}

/* ── small reusable UI bits ── */

function SectionLabel({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="size-7 rounded-lg dream-gradient grid place-items-center shadow-soft">
        <Icon className="size-3.5 text-white" />
      </div>
      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

function Callout({ emoji, children }: { emoji: string; children: React.ReactNode }) {
  return (
    <div className="mt-5 glass rounded-2xl p-4 flex gap-3 items-start border-l-4 border-primary/50">
      <span className="text-xl shrink-0">{emoji}</span>
      <p className="text-sm leading-relaxed text-foreground/80">{children}</p>
    </div>
  );
}

function ConceptCard({
  letter,
  color,
  label,
  analogy,
  explain,
}: {
  letter: string;
  color: string;
  label: string;
  analogy: string;
  explain: string;
}) {
  return (
    <div className="glass-strong rounded-2xl p-5 shadow-soft flex gap-4 items-start">
      <div
        className={`size-12 shrink-0 rounded-2xl bg-gradient-to-br ${color} grid place-items-center shadow-glow`}
      >
        <span className="text-white text-xl font-black">{letter}</span>
      </div>
      <div>
        <div className="flex items-baseline gap-2 flex-wrap">
          <p className="font-extrabold text-base">{label}</p>
          <p className="text-xs text-muted-foreground italic">"{analogy}"</p>
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-foreground/75">{explain}</p>
      </div>
    </div>
  );
}

function NextSteps({ steps }: { steps: { step: string; label: string; note: string }[] }) {
  return (
    <section>
      <h2 className="text-xl font-extrabold mb-4">What to learn next 🗺️</h2>
      <div className="space-y-3">
        {steps.map((item) => (
          <div key={item.step} className="flex gap-4 items-start glass rounded-2xl p-4">
            <span className="text-xs font-black text-primary/60 shrink-0 pt-0.5">{item.step}</span>
            <div>
              <p className="font-semibold text-sm">{item.label}</p>
              <p className="text-xs text-foreground/60 mt-0.5">{item.note}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   ARTICLE 1 — Attention / Transformers
══════════════════════════════════════════ */

function Article1() {
  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 py-10 space-y-10">
      {/* TL;DR */}
      <div className="glass-strong rounded-3xl p-5 shadow-soft border border-white/50">
        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">TL;DR</p>
        <p className="text-sm leading-relaxed text-foreground/80">
          Transformers replaced RNNs by letting every word look at every other word{" "}
          <span className="font-semibold text-foreground">at the same time</span>. The trick? Three
          tiny matrices — <span className="font-semibold">Q, K, V</span> — that turn a sentence into
          a smart attention map. That's literally it. The rest is just math and scale.
        </p>
      </div>

      <section>
        <SectionLabel icon={Brain} label="The old world" />
        <h2 className="text-2xl font-extrabold mt-2 mb-3">
          RNNs were reading one word at a time. That was the problem.
        </h2>
        <p className="text-base leading-relaxed text-foreground/80">
          Before 2017, the go-to architecture for language was the RNN. Imagine reading a book but
          you're only allowed to look at one word, remember something about it, and move to the
          next. By the time you reach word 500 you've basically forgotten word 1.
        </p>
        <p className="mt-4 text-base leading-relaxed text-foreground/80">
          That's the{" "}
          <span className="font-semibold text-foreground">vanishing gradient problem</span>. Long
          dependencies were nearly impossible to learn. LSTMs helped a bit, but they were still
          sequential. Slow. No parallelism.
        </p>
        <Callout emoji="💡">
          Sequential = you can't parallelize. No parallelism = GPUs are bored. Bored GPUs = slow
          training = sad AI researcher.
        </Callout>
      </section>

      <section>
        <SectionLabel icon={Zap} label="The 2017 paper" />
        <h2 className="text-2xl font-extrabold mt-2 mb-3">
          "Attention Is All You Need" — the paper that changed everything.
        </h2>
        <p className="text-base leading-relaxed text-foreground/80">
          Vaswani et al. at Google asked: what if every word could attend to every other word
          simultaneously? No sequential steps. Pure parallel attention. Powered by three learnable
          matrices: <strong>Q</strong> (Query), <strong>K</strong> (Key), <strong>V</strong>{" "}
          (Value).
        </p>
      </section>

      <section>
        <SectionLabel icon={Eye} label="The magic" />
        <h2 className="text-2xl font-extrabold mt-2 mb-5">Q, K, V — explained with a vibe.</h2>
        <div className="space-y-4">
          <ConceptCard
            letter="Q"
            color="from-violet-400 to-fuchsia-400"
            label="Query"
            analogy="What am I looking for?"
            explain="Each word broadcasts a Query — 'I'm searching for THIS kind of context.' Like a search bar."
          />
          <ConceptCard
            letter="K"
            color="from-pink-400 to-rose-400"
            label="Key"
            explain="Every word has a Key — 'here's what I'm about.' It gets matched against Queries to compute relevance scores."
            analogy="What do I offer?"
          />
          <ConceptCard
            letter="V"
            color="from-amber-400 to-orange-400"
            label="Value"
            analogy="My actual content."
            explain="Once relevance is scored via Q·K, we pull the Values of relevant words and mix them. That's your attention output."
          />
        </div>
      </section>

      <div className="glass-strong rounded-3xl p-6 shadow-soft">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
          The formula
        </p>
        <div className="bg-black/10 rounded-2xl p-4 font-mono text-sm text-center leading-loose">
          Attention(Q, K, V) = softmax<span className="text-primary font-bold">(QKᵀ / √dₖ)</span> ·
          V
        </div>
        <p className="mt-4 text-sm leading-relaxed text-foreground/70">
          Q × Kᵀ = raw scores → divide by √dₖ to stop explosions → softmax to get probabilities →
          multiply by V to get the weighted output.
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-extrabold mb-3">Why this ate everything before it.</h2>
        <div className="space-y-3">
          {[
            {
              emoji: "⚡",
              point: "Fully parallelizable",
              detail: "Every token's attention computed at once. GPUs go brrr.",
            },
            {
              emoji: "🔗",
              point: "Handles long-range dependencies",
              detail: "Word 1 and word 500 can directly attend to each other.",
            },
            {
              emoji: "📈",
              point: "Scales insanely well",
              detail: "Bigger model + more data = better. That's why GPT-4, Claude, Gemini exist.",
            },
            {
              emoji: "🧩",
              point: "Works beyond text",
              detail: "ViT, AlphaFold, music gen — attention generalises everywhere.",
            },
          ].map((item) => (
            <div key={item.point} className="glass rounded-2xl p-4 flex gap-4 items-start">
              <span className="text-2xl shrink-0">{item.emoji}</span>
              <div>
                <p className="font-semibold text-sm">{item.point}</p>
                <p className="text-sm text-foreground/70 mt-0.5">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="dream-gradient rounded-3xl p-8 text-center shadow-soft">
        <p className="text-2xl sm:text-3xl font-serif italic leading-snug text-foreground/90">
          "Attention isn't a trick. It's a fundamental rethinking of how neural nets process
          information."
        </p>
      </div>

      <NextSteps
        steps={[
          {
            step: "01",
            label: "Positional Encoding",
            note: "Transformers have no sense of order by default. How do they fix that?",
          },
          {
            step: "02",
            label: "Encoder–Decoder Stack",
            note: "The original had both. GPT kept only decoder. Why?",
          },
          {
            step: "03",
            label: "Flash Attention",
            note: "Hardware-aware rewrite. Made long contexts (128k+) possible.",
          },
          {
            step: "04",
            label: "Build a mini-GPT",
            note: "Karpathy's nanoGPT. 200 lines. The fastest way to truly get it.",
          },
        ]}
      />
    </div>
  );
}

/* ══════════════════════════════════════════
   ARTICLE 2 — Backprop + Gradient Descent
══════════════════════════════════════════ */

function Article2() {
  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 py-10 space-y-10">
      {/* TL;DR */}
      <div className="glass-strong rounded-3xl p-5 shadow-soft border border-white/50">
        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">TL;DR</p>
        <p className="text-sm leading-relaxed text-foreground/80">
          A neural net learns by making a guess, measuring how wrong it was (the{" "}
          <span className="font-semibold text-foreground">loss</span>), then nudging every weight
          slightly in the direction that reduces that wrongness. That nudging process is called{" "}
          <span className="font-semibold text-foreground">gradient descent</span>. The math that
          figures out which direction to nudge is called{" "}
          <span className="font-semibold text-foreground">backpropagation</span>. Everything else is
          detail.
        </p>
      </div>

      {/* section 1 */}
      <section>
        <SectionLabel icon={Brain} label="The core idea" />
        <h2 className="text-2xl font-extrabold mt-2 mb-3">
          A neural net doesn't start knowing anything. It guesses — badly.
        </h2>
        <p className="text-base leading-relaxed text-foreground/80">
          When a neural net is initialized, its weights are random. Feed it an image of a cat and it
          might say "99% truck." That's expected. The whole point is what happens{" "}
          <span className="font-semibold text-foreground">after</span> that wrong guess: the network
          looks at how wrong it was, traces that wrongness back through every layer, and updates
          every single weight to be slightly less wrong next time.
        </p>
        <p className="mt-4 text-base leading-relaxed text-foreground/80">
          Do this millions of times on millions of examples — and you get a model that actually
          works. That's the entire training loop in one sentence.
        </p>
        <Callout emoji="🎯">
          Training = (forward pass → compute loss → backprop → update weights) × millions.
          Everything else in AI research is optimizing one of these four steps.
        </Callout>
      </section>

      {/* three concepts */}
      <section>
        <SectionLabel icon={BarChart2} label="The three pieces" />
        <h2 className="text-2xl font-extrabold mt-2 mb-5">Loss, Gradient Descent, Backprop.</h2>
        <div className="space-y-4">
          <ConceptCard
            letter="L"
            color="from-rose-400 to-pink-400"
            label="Loss Function"
            analogy="How wrong were you?"
            explain="A single number that measures the gap between your prediction and the truth. Low loss = good model. High loss = model is still guessing. Common ones: MSE for regression, cross-entropy for classification."
          />
          <ConceptCard
            letter="∇"
            color="from-violet-400 to-indigo-400"
            label="Gradient Descent"
            analogy="Walk downhill, eyes closed."
            explain="The gradient of the loss tells you which direction makes things worse. Gradient descent goes the opposite direction — slightly adjusting every weight to reduce loss. Repeat until you hit a minimum."
          />
          <ConceptCard
            letter="⬅"
            color="from-amber-400 to-orange-400"
            label="Backpropagation"
            analogy="Who's responsible for this mistake?"
            explain="Once you have the loss, backprop uses the chain rule of calculus to figure out exactly how much each weight contributed to the error. It propagates that blame signal backwards through every layer."
          />
        </div>
      </section>

      {/* gradient descent visual */}
      <section className="glass-strong rounded-3xl p-6 shadow-soft">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
          Gradient Descent — the hiking analogy
        </p>
        <div className="space-y-3">
          {[
            {
              emoji: "⛰️",
              step: "You're on a hill (high loss). Fog everywhere — you can't see the bottom.",
            },
            {
              emoji: "👣",
              step: "You feel the slope under your feet (the gradient). You take a small step in the direction that goes downhill.",
            },
            { emoji: "🔁", step: "Repeat thousands of times. Each step = one weight update." },
            { emoji: "🏁", step: "You reach a valley (low loss). The model has learned." },
          ].map((item, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="text-xl shrink-0">{item.emoji}</span>
              <p className="text-sm leading-relaxed text-foreground/80 pt-0.5">{item.step}</p>
            </div>
          ))}
        </div>
        <Callout emoji="⚠️">
          The step size is the <span className="font-semibold">learning rate</span> — the single
          most important hyperparameter. Too big = you overshoot the valley. Too small = training
          takes forever. Most of AI research is finding better ways to set this.
        </Callout>
      </section>

      {/* backprop deeper */}
      <section>
        <SectionLabel icon={Repeat} label="Backprop, demystified" />
        <h2 className="text-2xl font-extrabold mt-2 mb-3">
          The chain rule — one idea from calculus that runs modern AI.
        </h2>
        <p className="text-base leading-relaxed text-foreground/80">
          A neural net is just a chain of functions: input → Layer 1 → Layer 2 → … → output → loss.
          To know how to change a weight in Layer 1, you need to know how that weight affects the
          output, which requires knowing how Layer 2 affects the output… all the way through.
        </p>
        <p className="mt-4 text-base leading-relaxed text-foreground/80">
          The <span className="font-semibold text-foreground">chain rule</span> says: the derivative
          of a composed function = product of derivatives at each step. Backprop just applies this
          efficiently, starting from the loss and working backwards — hence "back" propagation.
        </p>
        <div className="mt-5 bg-black/10 rounded-2xl p-4 font-mono text-sm text-center leading-loose glass-strong">
          ∂Loss/∂w₁ ={" "}
          <span className="text-primary font-bold">
            (∂Loss/∂out) · (∂out/∂layer2) · (∂layer2/∂w₁)
          </span>
        </div>
        <p className="mt-3 text-sm text-foreground/60 text-center">
          Each · is one step backwards through the network.
        </p>
      </section>

      {/* why it matters */}
      <section>
        <SectionLabel icon={TrendingDown} label="Why it matters for you" />
        <h2 className="text-2xl font-extrabold mt-2 mb-4">
          Every AI model you use was built with this.
        </h2>
        <div className="space-y-3">
          {[
            {
              emoji: "🤖",
              point: "GPT, Claude, Gemini",
              detail: "Trillions of gradient descent steps on text. Same math, insane scale.",
            },
            {
              emoji: "🖼️",
              point: "Stable Diffusion, DALL·E",
              detail: "Backprop on images. Loss = how different your output is from the target.",
            },
            {
              emoji: "♟️",
              point: "AlphaGo, AlphaFold",
              detail: "Backprop combined with reinforcement signals. Same engine, different loss.",
            },
            {
              emoji: "🔧",
              point: "Fine-tuning & LoRA",
              detail:
                "Backprop on a pretrained model with a tiny dataset. Most practical AI work lives here.",
            },
          ].map((item) => (
            <div key={item.point} className="glass rounded-2xl p-4 flex gap-4 items-start">
              <span className="text-2xl shrink-0">{item.emoji}</span>
              <div>
                <p className="font-semibold text-sm">{item.point}</p>
                <p className="text-sm text-foreground/70 mt-0.5">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="dream-gradient rounded-3xl p-8 text-center shadow-soft">
        <p className="text-2xl sm:text-3xl font-serif italic leading-snug text-foreground/90">
          "Backprop is the algorithm that lets us teach machines by showing them examples instead of
          writing rules."
        </p>
        <p className="mt-4 text-sm font-semibold text-foreground/60">
          — the insight behind all of modern AI
        </p>
      </div>

      <NextSteps
        steps={[
          {
            step: "01",
            label: "Optimizers (Adam, SGD, AdamW)",
            note: "Gradient descent has many flavors. Adam is the default for most models — understand why.",
          },
          {
            step: "02",
            label: "Vanishing & Exploding Gradients",
            note: "What happens when gradients get too small or too big across layers. ReLU and batch norm exist because of this.",
          },
          {
            step: "03",
            label: "Automatic Differentiation",
            note: "PyTorch & JAX compute gradients automatically. Understanding autograd makes you a better engineer.",
          },
          {
            step: "04",
            label: "Implement backprop from scratch",
            note: "Karpathy's micrograd. 100 lines. Build your own autograd engine and you'll never be confused again.",
          },
        ]}
      />
    </div>
  );
}

/* ══════════════════════════════════════════
   ARTICLE 3 — Supervised vs Unsupervised
══════════════════════════════════════════ */

function Article3() {
  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 py-10 space-y-10">
      {/* TL;DR */}
      <div className="glass-strong rounded-3xl p-5 shadow-soft border border-white/50">
        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">TL;DR</p>
        <p className="text-sm leading-relaxed text-foreground/80">
          <span className="font-semibold text-foreground">Supervised learning</span> = you give the
          model examples with answers. It learns to predict.{" "}
          <span className="font-semibold text-foreground">Unsupervised learning</span> = no answers,
          just raw data. The model finds hidden structure on its own. Most of modern AI is some mix
          of both — and knowing which to reach for is one of the most practical skills you can
          build.
        </p>
      </div>

      {/* section 1 */}
      <section>
        <SectionLabel icon={Brain} label="The core split" />
        <h2 className="text-2xl font-extrabold mt-2 mb-3">
          It all comes down to one question: do you have labels?
        </h2>
        <p className="text-base leading-relaxed text-foreground/80">
          A <span className="font-semibold text-foreground">label</span> is the answer you're trying
          to predict — the "cat" in an image, the "spam" on an email, the price of a house. If your
          dataset has labels attached to every example, you're doing supervised learning. If it's
          just raw data with no annotations, unsupervised.
        </p>
        <p className="mt-4 text-base leading-relaxed text-foreground/80">
          This sounds simple but it shapes everything: your model architecture, your loss function,
          how you evaluate success, and how much labelled data you need to collect (or pay humans to
          annotate).
        </p>
        <Callout emoji="💡">
          Labelling data is expensive and slow. That's why unsupervised and self-supervised methods
          became so important — they let you learn from the internet without paying anyone to tag
          it.
        </Callout>
      </section>

      {/* two concept cards */}
      <section>
        <SectionLabel icon={Zap} label="Side by side" />
        <h2 className="text-2xl font-extrabold mt-2 mb-5">
          Supervised vs Unsupervised — the breakdown.
        </h2>
        <div className="space-y-4">
          <ConceptCard
            letter="S"
            color="from-violet-400 to-fuchsia-400"
            label="Supervised Learning"
            analogy="Learning with a teacher."
            explain="You have (input, correct answer) pairs. The model learns a mapping: given X, predict Y. Training signal comes from comparing predictions to known labels. Examples: image classifiers, spam filters, price predictors."
          />
          <ConceptCard
            letter="U"
            color="from-pink-400 to-rose-400"
            label="Unsupervised Learning"
            analogy="Learning without a teacher."
            explain="Just raw inputs — no labels. The model learns patterns, structure, or representations from the data itself. Examples: clustering customers, compressing data, generating new samples."
          />
        </div>
      </section>

      {/* real examples */}
      <section className="glass-strong rounded-3xl p-6 shadow-soft">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
          Real examples
        </p>
        <div className="space-y-3">
          {[
            {
              kind: "S",
              color: "bg-violet-400",
              label: "Email spam filter",
              detail:
                "Trained on emails labelled spam/not-spam. Classic supervised classification.",
            },
            {
              kind: "S",
              color: "bg-violet-400",
              label: "House price prediction",
              detail: "Features (size, location) → price. Supervised regression.",
            },
            {
              kind: "S",
              color: "bg-violet-400",
              label: "ImageNet classifiers",
              detail: "1M images, each labelled with a category. Supervised at massive scale.",
            },
            {
              kind: "U",
              color: "bg-pink-400",
              label: "Customer segmentation",
              detail: "Group users by behaviour patterns. No labels — just clusters.",
            },
            {
              kind: "U",
              color: "bg-pink-400",
              label: "Topic modelling",
              detail:
                "Find hidden themes across 10,000 articles. No one told it what themes to find.",
            },
            {
              kind: "U",
              color: "bg-pink-400",
              label: "Autoencoders",
              detail:
                "Compress data into a small representation. Reconstruction is its own loss signal.",
            },
          ].map((item) => (
            <div key={item.label} className="flex gap-3 items-start">
              <span
                className={`${item.color} text-white text-[10px] font-black px-2 py-1 rounded-full shrink-0 mt-0.5`}
              >
                {item.kind}
              </span>
              <div>
                <p className="font-semibold text-sm">{item.label}</p>
                <p className="text-xs text-foreground/65 mt-0.5">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* bonus: self-supervised */}
      <section>
        <SectionLabel icon={Eye} label="The twist" />
        <h2 className="text-2xl font-extrabold mt-2 mb-3">
          Self-supervised learning — the reason GPT exists.
        </h2>
        <p className="text-base leading-relaxed text-foreground/80">
          There's a third category that changed everything:{" "}
          <span className="font-semibold text-foreground">self-supervised learning</span>. The model
          generates its own labels from the raw data.
        </p>
        <p className="mt-4 text-base leading-relaxed text-foreground/80">
          GPT is trained by predicting the next word in a sentence. The label is just the next word
          — which already exists in the text. No human annotation needed. BERT masks random words
          and predicts them. Same idea.
        </p>
        <p className="mt-4 text-base leading-relaxed text-foreground/80">
          This is why LLMs can train on the entire internet. The supervision signal is free — it's
          baked into the data itself.
        </p>
        <Callout emoji="🔥">
          Self-supervised pretraining → then supervised fine-tuning = the modern AI recipe. GPT,
          CLIP, BERT, Whisper — all of them.
        </Callout>
      </section>

      {/* when to use which */}
      <section>
        <h2 className="text-2xl font-extrabold mb-4">Which one do you reach for?</h2>
        <div className="space-y-3">
          {[
            {
              emoji: "🏷️",
              point: "You have labelled data",
              detail: "→ Supervised. Straightforward. More labels = better model.",
            },
            {
              emoji: "🗂️",
              point: "You have tons of raw data, no labels",
              detail: "→ Unsupervised or self-supervised. Let the model find structure.",
            },
            {
              emoji: "🤏",
              point: "You have a little labelled + lots of unlabelled",
              detail:
                "→ Semi-supervised or fine-tune a pretrained model. This is 90% of real-world ML.",
            },
            {
              emoji: "🌐",
              point: "You have internet-scale text or images",
              detail: "→ Self-supervised pretraining. Then fine-tune on your specific task.",
            },
          ].map((item) => (
            <div key={item.point} className="glass rounded-2xl p-4 flex gap-4 items-start">
              <span className="text-2xl shrink-0">{item.emoji}</span>
              <div>
                <p className="font-semibold text-sm">{item.point}</p>
                <p className="text-sm text-foreground/70 mt-0.5">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="dream-gradient rounded-3xl p-8 text-center shadow-soft">
        <p className="text-2xl sm:text-3xl font-serif italic leading-snug text-foreground/90">
          "The best label is one you don't have to write — because the data already contains it."
        </p>
        <p className="mt-4 text-sm font-semibold text-foreground/60">
          — the insight behind self-supervised learning
        </p>
      </div>

      <NextSteps
        steps={[
          {
            step: "01",
            label: "Semi-supervised learning",
            note: "What if you have 100 labels and 100,000 unlabelled examples? Techniques like pseudo-labelling bridge the gap.",
          },
          {
            step: "02",
            label: "Contrastive learning (SimCLR, CLIP)",
            note: "Unsupervised but powerful. Learns by pulling similar things together and pushing different things apart.",
          },
          {
            step: "03",
            label: "Transfer learning & fine-tuning",
            note: "Pretrain on big unlabelled data → fine-tune on small labelled data. The dominant paradigm in 2024.",
          },
          {
            step: "04",
            label: "Reinforcement Learning from Human Feedback (RLHF)",
            note: "A third type: learn from reward signals. How ChatGPT went from good to great.",
          },
        ]}
      />
    </div>
  );
}

/* ══════════════════════════════════════════
   ROUTER — picks the right article
══════════════════════════════════════════ */

/* ══════════════════════════════════════════
   ARTICLE 4 — Gradient Descent
══════════════════════════════════════════ */

function Article4() {
  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 py-10 space-y-10">
      {/* TL;DR — different style: dark pill */}
      <div className="rounded-3xl p-5 shadow-soft border border-white/30 bg-black/10 backdrop-blur">
        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
          The one rule
        </p>
        <div className="font-mono text-center text-lg sm:text-2xl font-black py-3 text-foreground tracking-tight">
          w &nbsp;=&nbsp; w &nbsp;−&nbsp; <span className="text-primary">lr</span> &nbsp;×&nbsp;{" "}
          <span className="text-rose-500">∇L</span>
        </div>
        <p className="text-sm leading-relaxed text-foreground/75 mt-3">
          <span className="font-semibold text-foreground">w</span> = weight &nbsp;·&nbsp;{" "}
          <span className="font-semibold text-primary">lr</span> = learning rate &nbsp;·&nbsp;{" "}
          <span className="font-semibold text-rose-500">∇L</span> = gradient of the loss. Every
          training loop in every model runs this, billions of times.
        </p>
      </div>

      {/* Section 1 — The mountain */}
      <section>
        <SectionLabel icon={Mountain} label="The intuition" />
        <h2 className="text-2xl font-extrabold mt-2 mb-3">
          You're blindfolded on a mountain. Your job: get to the bottom.
        </h2>
        <p className="text-base leading-relaxed text-foreground/80">
          Picture the <span className="font-semibold text-foreground">loss function</span> as a
          hilly landscape. Every point on that landscape is a different set of weight values. High
          altitude = high loss = bad model. Low altitude = low loss = good model.
        </p>
        <p className="mt-4 text-base leading-relaxed text-foreground/80">
          You can't see the whole landscape. You're blindfolded. But you can feel the slope under
          your feet — that's the <span className="font-semibold text-foreground">gradient</span>.
          Gradient descent says: take a small step in the direction that goes downhill. Repeat until
          you stop moving.
        </p>
        <div className="mt-5 space-y-2">
          {[
            { n: "1", text: "Compute a prediction (forward pass)" },
            { n: "2", text: "Measure how wrong it was (loss)" },
            { n: "3", text: "Compute the gradient — which direction is uphill?" },
            { n: "4", text: "Step downhill by a tiny amount (update weights)" },
            { n: "5", text: "Repeat millions of times" },
          ].map((s) => (
            <div key={s.n} className="flex gap-3 items-center glass rounded-xl px-4 py-2.5">
              <span className="size-6 rounded-full dream-gradient grid place-items-center text-white text-xs font-black shrink-0">
                {s.n}
              </span>
              <p className="text-sm font-medium">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2 — The three flavours */}
      <section>
        <SectionLabel icon={GitCompare} label="Three flavours" />
        <h2 className="text-2xl font-extrabold mt-2 mb-5">
          Batch, Stochastic, Mini-batch — pick your poison.
        </h2>
        <div className="space-y-4">
          <ConceptCard
            letter="B"
            color="from-teal-400 to-cyan-400"
            label="Batch Gradient Descent"
            analogy="Use every example, every step."
            explain="Computes the gradient over the entire dataset before updating weights once. Super accurate direction — but insanely slow and can't fit in memory at scale. Basically never used for large models."
          />
          <ConceptCard
            letter="S"
            color="from-cyan-400 to-sky-400"
            label="Stochastic GD (SGD)"
            analogy="One example, one update."
            explain="Updates weights after every single training example. Fast and noisy — the randomness actually helps escape bad local minima. But the path to the bottom is very zigzaggy."
          />
          <ConceptCard
            letter="M"
            color="from-indigo-400 to-violet-400"
            label="Mini-batch GD"
            analogy="Best of both worlds."
            explain="Updates weights on a small batch (32, 64, 256 examples). Noisy enough to escape local minima, stable enough to converge. This is what every modern model uses. When people say 'SGD', they usually mean this."
          />
        </div>
      </section>

      {/* Comparison table */}
      <div className="glass-strong rounded-3xl p-5 shadow-soft overflow-x-auto">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
          At a glance
        </p>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground border-b border-white/20">
              <th className="pb-2 font-bold">Type</th>
              <th className="pb-2 font-bold">Speed</th>
              <th className="pb-2 font-bold">Noise</th>
              <th className="pb-2 font-bold">Used in</th>
            </tr>
          </thead>
          <tbody className="space-y-1">
            {[
              { type: "Batch", speed: "🐢 Slow", noise: "None", used: "Tiny datasets" },
              { type: "SGD", speed: "⚡ Fast", noise: "High", used: "Online learning" },
              { type: "Mini-batch", speed: "🚀 Best", noise: "Low-med", used: "Everything" },
            ].map((r) => (
              <tr key={r.type} className="border-b border-white/10 last:border-0">
                <td className="py-2.5 font-semibold">{r.type}</td>
                <td className="py-2.5 text-foreground/70">{r.speed}</td>
                <td className="py-2.5 text-foreground/70">{r.noise}</td>
                <td className="py-2.5 text-foreground/70">{r.used}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 3 — learning rate */}
      <section>
        <SectionLabel icon={Gauge} label="The dial" />
        <h2 className="text-2xl font-extrabold mt-2 mb-3">
          The learning rate — the one knob that breaks everything.
        </h2>
        <p className="text-base leading-relaxed text-foreground/80">
          The learning rate <span className="font-semibold text-foreground">(lr)</span> controls how
          big each step is. It's the most important hyperparameter in training. Get it wrong in
          either direction and your model either never converges or explodes.
        </p>
        <div className="mt-5 grid grid-cols-3 gap-3 text-center">
          {[
            { emoji: "🐌", label: "Too small", desc: "Takes forever. Gets stuck in flat regions." },
            { emoji: "✅", label: "Just right", desc: "Converges smoothly. Loss curves go down." },
            {
              emoji: "💥",
              label: "Too big",
              desc: "Overshoots the valley. Loss explodes or oscillates.",
            },
          ].map((item) => (
            <div key={item.label} className="glass-strong rounded-2xl p-4 shadow-soft">
              <p className="text-3xl mb-2">{item.emoji}</p>
              <p className="font-bold text-xs">{item.label}</p>
              <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 glass rounded-2xl p-4 flex gap-3 items-start border-l-4 border-teal-400/60">
          <span className="text-xl shrink-0">💡</span>
          <p className="text-sm leading-relaxed text-foreground/80">
            Most teams use a <span className="font-semibold">learning rate scheduler</span> — start
            high to move fast, decay it over time to land precisely. Cosine annealing and warmup
            schedules are the most common.
          </p>
        </div>
      </section>

      {/* Section 4 — Local minima myth */}
      <section>
        <SectionLabel icon={FlaskConical} label="The myth" />
        <h2 className="text-2xl font-extrabold mt-2 mb-3">
          "Local minima will trap your model." — actually, not really.
        </h2>
        <p className="text-base leading-relaxed text-foreground/80">
          For years people worried gradient descent would get stuck in local minima — points that
          look like the bottom but aren't the global bottom. In practice, this is rarely the real
          problem for large neural nets.
        </p>
        <p className="mt-4 text-base leading-relaxed text-foreground/80">
          Research (Goodfellow, Dauphin et al.) found that in high-dimensional spaces, most critical
          points are <span className="font-semibold text-foreground">saddle points</span>, not local
          minima. And the local minima that do exist often have nearly the same loss as the global
          minimum — so you're fine landing there.
        </p>
        <div className="mt-4 glass rounded-2xl p-4 flex gap-3 items-start border-l-4 border-rose-400/60">
          <span className="text-xl shrink-0">🔥</span>
          <p className="text-sm leading-relaxed text-foreground/80">
            The real enemy is <span className="font-semibold">saddle points</span> and{" "}
            <span className="font-semibold">plateaus</span> — flat regions where the gradient is
            near zero and learning slows to a crawl. That's why momentum and Adam exist.
          </p>
        </div>
      </section>

      {/* Quote */}
      <div className="rounded-3xl p-8 text-center shadow-soft bg-gradient-to-br from-teal-100/60 via-cyan-50/60 to-indigo-100/60 border border-white/50">
        <p className="text-2xl sm:text-3xl font-serif italic leading-snug text-foreground/90">
          "Gradient descent is the algo that turns dumb random weights into something that can
          diagnose cancer, translate languages, and write code."
        </p>
        <p className="mt-4 text-sm font-semibold text-foreground/50">
          — every AI engineer, eventually
        </p>
      </div>

      <NextSteps
        steps={[
          {
            step: "01",
            label: "Momentum & Nesterov",
            note: "Adds a velocity term so you don't stop at every flat patch. The 'physics' trick that made deep learning feasible.",
          },
          {
            step: "02",
            label: "Adam optimizer",
            note: "Adaptive learning rates per parameter. Momentum + RMSProp combined. Default choice for 90% of models.",
          },
          {
            step: "03",
            label: "LR schedulers (cosine, warmup)",
            note: "Start fast, end precise. Nearly every SOTA training run uses a schedule.",
          },
          {
            step: "04",
            label: "Loss landscape visualisation",
            note: "Li et al. 2018 — 'Visualizing the Loss Landscape of Neural Nets'. Stunning paper. Makes the mountain analogy real.",
          },
        ]}
      />
    </div>
  );
}

/* ══════════════════════════════════════════
   ARTICLE 5 — Activation Functions
══════════════════════════════════════════ */

function Article5() {
  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 py-10 space-y-10">
      {/* TL;DR — warm amber style */}
      <div className="rounded-3xl p-5 shadow-soft border border-amber-200/60 bg-gradient-to-br from-amber-50/80 to-orange-50/80">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2">TL;DR</p>
        <p className="text-sm leading-relaxed text-foreground/80">
          Without activation functions, a neural net is just a{" "}
          <span className="font-semibold text-foreground">single linear equation</span> no matter
          how many layers you stack. Activations add non-linearity — the ability to learn curves,
          not just lines. But each one has a dark side: sigmoid{" "}
          <span className="font-semibold">kills gradients</span>, ReLU{" "}
          <span className="font-semibold">kills neurons</span>, and softmax{" "}
          <span className="font-semibold">turns scores into probabilities</span>.
        </p>
      </div>

      {/* Why they exist */}
      <section>
        <SectionLabel icon={Activity} label="The why" />
        <h2 className="text-2xl font-extrabold mt-2 mb-3">
          Without activations, deep learning is just... algebra.
        </h2>
        <p className="text-base leading-relaxed text-foreground/80">
          Stack 100 linear layers together:{" "}
          <span className="font-mono text-sm bg-amber-100/60 px-1.5 py-0.5 rounded">
            y = W₁(W₂(W₃x))
          </span>{" "}
          — that collapses into a single matrix multiply. You haven't gained anything. The whole
          network is still just drawing a straight line.
        </p>
        <p className="mt-4 text-base leading-relaxed text-foreground/80">
          Activation functions break linearity. Applied after each layer, they let the network learn
          complex shapes — curves, boundaries, patterns that no straight line could capture. That's
          what makes depth useful.
        </p>
        <div className="mt-4 glass rounded-2xl p-4 flex gap-3 items-start border-l-4 border-amber-400/60">
          <span className="text-xl shrink-0">💡</span>
          <p className="text-sm leading-relaxed text-foreground/80">
            The universal approximation theorem says a network with one hidden layer and a
            non-linear activation can approximate{" "}
            <span className="font-semibold">any function</span>. Activation functions make that
            theorem true.
          </p>
        </div>
      </section>

      {/* The three */}
      <section>
        <SectionLabel icon={Zap} label="The big three" />
        <h2 className="text-2xl font-extrabold mt-2 mb-5">
          ReLU, Sigmoid, Softmax — know the difference.
        </h2>
        <div className="space-y-4">
          <ConceptCard
            letter="R"
            color="from-amber-400 to-orange-400"
            label="ReLU — Rectified Linear Unit"
            analogy="max(0, x) — stupidly simple, surprisingly powerful."
            explain="If the input is negative, output is 0. If positive, pass it through unchanged. That's it. No expensive exponentials. Trains fast, works well for most hidden layers. Used in basically every modern deep net."
          />
          <ConceptCard
            letter="σ"
            color="from-orange-400 to-rose-400"
            label="Sigmoid"
            analogy="Squishes everything into (0, 1)."
            explain="Maps any real number to a value between 0 and 1. Looks like an S-curve. Used for binary classification outputs (is this a cat? yes/no → probability). But dangerous in hidden layers — it's the source of the vanishing gradient problem."
          />
          <ConceptCard
            letter="S"
            color="from-rose-400 to-pink-400"
            label="Softmax"
            analogy="Turns a list of scores into a probability distribution."
            explain="Takes a vector of raw scores (logits) and normalises them so they all sum to 1. Used exclusively at the output layer for multi-class classification. 'Which of these 1000 ImageNet classes is this?' → softmax gives you the probability for each."
          />
        </div>
      </section>

      {/* What they do to gradients */}
      <section>
        <SectionLabel icon={TrendingDown} label="The gradient story" />
        <h2 className="text-2xl font-extrabold mt-2 mb-3">
          What they actually do during backprop.
        </h2>
        <p className="text-base leading-relaxed text-foreground/80">
          This is the part that matters most for training. Gradients flow{" "}
          <span className="font-semibold text-foreground">backwards</span> through each activation
          during backprop. If that gradient gets tiny, learning slows to nothing.
        </p>

        <div className="mt-6 space-y-5">
          {/* ReLU gradient */}
          <div className="glass-strong rounded-2xl p-5 shadow-soft">
            <div className="flex items-center gap-3 mb-3">
              <span className="size-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-400 grid place-items-center shadow-glow">
                <span className="text-white text-sm font-black">R</span>
              </span>
              <p className="font-extrabold">ReLU gradient</p>
              <span className="ml-auto text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700 font-semibold">
                gradient = 0 or 1
              </span>
            </div>
            <p className="text-sm leading-relaxed text-foreground/75">
              For positive inputs: gradient is exactly 1 — signal passes through perfectly. For
              negative inputs: gradient is 0 — complete block. This is why ReLU trains fast (no
              gradient compression for positive activations). But it causes the{" "}
              <span className="font-semibold text-foreground">dying ReLU problem</span>: neurons
              stuck at 0 forever learn nothing.
            </p>
            <div className="mt-3 flex items-start gap-2">
              <AlertTriangle className="size-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs text-foreground/65">
                Fix: use <strong>Leaky ReLU</strong> (small negative slope instead of 0) or{" "}
                <strong>ELU/GELU</strong> for smoother gradients everywhere.
              </p>
            </div>
          </div>

          {/* Sigmoid gradient */}
          <div className="glass-strong rounded-2xl p-5 shadow-soft">
            <div className="flex items-center gap-3 mb-3">
              <span className="size-8 rounded-xl bg-gradient-to-br from-orange-400 to-rose-400 grid place-items-center shadow-glow">
                <span className="text-white text-sm font-black">σ</span>
              </span>
              <p className="font-extrabold">Sigmoid gradient</p>
              <span className="ml-auto text-xs px-2 py-1 rounded-full bg-rose-100 text-rose-700 font-semibold">
                gradient ≤ 0.25
              </span>
            </div>
            <p className="text-sm leading-relaxed text-foreground/75">
              The sigmoid's derivative maxes out at 0.25 — right at the center. For large positive
              or negative inputs, the gradient approaches 0. Stack 10 sigmoid layers and multiply
              those 0.25s: 0.25¹⁰ = 0.000001. The gradient{" "}
              <span className="font-semibold text-foreground">vanishes</span>. Early layers learn
              nothing. This is the famous vanishing gradient problem that made deep networks
              untrainable before ReLU.
            </p>
            <div className="mt-3 flex items-start gap-2">
              <AlertTriangle className="size-4 text-rose-500 shrink-0 mt-0.5" />
              <p className="text-xs text-foreground/65">
                Don't use sigmoid in hidden layers of deep nets.{" "}
                <strong>Only use it at the output for binary classification.</strong>
              </p>
            </div>
          </div>

          {/* Softmax gradient */}
          <div className="glass-strong rounded-2xl p-5 shadow-soft">
            <div className="flex items-center gap-3 mb-3">
              <span className="size-8 rounded-xl bg-gradient-to-br from-rose-400 to-pink-400 grid place-items-center shadow-glow">
                <span className="text-white text-sm font-black">S</span>
              </span>
              <p className="font-extrabold">Softmax gradient</p>
              <span className="ml-auto text-xs px-2 py-1 rounded-full bg-pink-100 text-pink-700 font-semibold">
                output layer only
              </span>
            </div>
            <p className="text-sm leading-relaxed text-foreground/75">
              Softmax is almost always paired with{" "}
              <span className="font-semibold text-foreground">cross-entropy loss</span>. Together
              they have a beautifully clean gradient: predicted_probability − true_label. The
              gradient is just the error between what you predicted and what was correct. Clean,
              stable, works great. Never put softmax in a hidden layer — its normalisation across
              all outputs creates weird interactions.
            </p>
            <div className="mt-3 flex items-start gap-2">
              <CheckCircle2 className="size-4 text-pink-500 shrink-0 mt-0.5" />
              <p className="text-xs text-foreground/65">
                Softmax + cross-entropy = the standard recipe for classification. The math works out
                beautifully. Just use it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick ref table */}
      <div className="glass-strong rounded-3xl p-5 shadow-soft overflow-x-auto">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
          Quick reference
        </p>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground border-b border-white/20">
              <th className="pb-2 font-bold">Activation</th>
              <th className="pb-2 font-bold">Output range</th>
              <th className="pb-2 font-bold">Use it for</th>
              <th className="pb-2 font-bold">Avoid for</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                name: "ReLU",
                range: "[0, ∞)",
                use: "Hidden layers",
                avoid: "Dying neurons risk",
              },
              {
                name: "Sigmoid",
                range: "(0, 1)",
                use: "Binary output",
                avoid: "Deep hidden layers",
              },
              {
                name: "Softmax",
                range: "(0, 1) sums to 1",
                use: "Multi-class output",
                avoid: "Hidden layers",
              },
              {
                name: "Tanh",
                range: "(-1, 1)",
                use: "RNNs, LSTMs",
                avoid: "Very deep nets",
              },
              {
                name: "GELU",
                range: "≈ ReLU but smooth",
                use: "Transformers (GPT)",
                avoid: "—",
              },
            ].map((r) => (
              <tr key={r.name} className="border-b border-white/10 last:border-0">
                <td className="py-2.5 font-semibold">{r.name}</td>
                <td className="py-2.5 text-foreground/70 font-mono text-xs">{r.range}</td>
                <td className="py-2.5 text-foreground/70">{r.use}</td>
                <td className="py-2.5 text-foreground/70 text-xs">{r.avoid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modern activations */}
      <section>
        <SectionLabel icon={Brain} label="Modern era" />
        <h2 className="text-2xl font-extrabold mt-2 mb-3">
          What GPT, BERT, and Llama actually use.
        </h2>
        <p className="text-base leading-relaxed text-foreground/80">
          The transformer era moved past ReLU for the feedforward blocks inside each layer. The
          winner? <span className="font-semibold text-foreground">GELU</span> (Gaussian Error Linear
          Unit) and its cousin <span className="font-semibold text-foreground">SwiGLU</span>.
        </p>
        <p className="mt-4 text-base leading-relaxed text-foreground/80">
          GELU is like ReLU but smooth — no hard cutoff at 0. It lets a tiny bit of signal through
          for negative inputs, weighted by how negative they are. This smooth curve means{" "}
          <span className="font-semibold">gradients never die completely</span>. GPT-2, GPT-3, BERT
          all use GELU. Llama uses SwiGLU (a gated variant). You'll rarely use plain ReLU in
          transformer architectures.
        </p>
        <div className="mt-4 glass rounded-2xl p-4 flex gap-3 items-start border-l-4 border-amber-400/60">
          <span className="text-xl shrink-0">🔥</span>
          <p className="text-sm leading-relaxed text-foreground/80">
            Rule of thumb: <span className="font-semibold">CNNs/ResNets → ReLU or Leaky ReLU</span>.{" "}
            <span className="font-semibold">Transformers → GELU or SwiGLU</span>.{" "}
            <span className="font-semibold">Output for binary → Sigmoid</span>.{" "}
            <span className="font-semibold">Output for multi-class → Softmax</span>.
          </p>
        </div>
      </section>

      {/* Quote */}
      <div className="rounded-3xl p-8 text-center shadow-soft bg-gradient-to-br from-amber-100/60 via-orange-50/60 to-rose-100/60 border border-amber-200/40">
        <p className="text-2xl sm:text-3xl font-serif italic leading-snug text-foreground/90">
          "Sigmoid was the activation of the 90s. ReLU unlocked the 2010s. GELU is writing the
          2020s."
        </p>
        <p className="mt-4 text-sm font-semibold text-foreground/50">
          — the arc of activation function history
        </p>
      </div>

      <NextSteps
        steps={[
          {
            step: "01",
            label: "Vanishing & exploding gradients",
            note: "The full story of why gradients die or blow up — and how batch norm, residual connections, and careful init fix it.",
          },
          {
            step: "02",
            label: "Batch Normalisation",
            note: "Normalises layer inputs so activations don't saturate. Works hand-in-hand with activation choice.",
          },
          {
            step: "03",
            label: "Weight initialisation (He, Xavier)",
            note: "The activation function you choose changes how you should initialise weights. He init for ReLU. Xavier for tanh/sigmoid.",
          },
          {
            step: "04",
            label: "GELU, SwiGLU, Mish",
            note: "The modern activation zoo. Read the GELU paper (Hendrycks & Gimpel, 2016) — it's short and elegant.",
          },
        ]}
      />
    </div>
  );
}

/* ══════════════════════════════════════════
   ARTICLE 6 — Loss Functions (story-slide format)
══════════════════════════════════════════ */

function Slide({ n, accent, children }: { n: string; accent: string; children: React.ReactNode }) {
  return (
    <div className={`rounded-3xl p-6 sm:p-8 shadow-soft border border-white/40 ${accent}`}>
      <span className="text-[11px] font-black uppercase tracking-widest opacity-50">{n}</span>
      {children}
    </div>
  );
}

function Article6() {
  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 py-10 space-y-6">
      {/* Hook */}
      <Slide n="01 / 08" accent="bg-gradient-to-br from-emerald-50/90 to-teal-50/90">
        <p className="mt-2 text-3xl sm:text-4xl font-black leading-tight">
          Your model doesn't know what "good" means.
        </p>
        <p className="mt-4 text-base text-foreground/70 leading-relaxed">
          You have to tell it — with a{" "}
          <span className="font-semibold text-foreground">loss function</span>. It's the only number
          your model ever optimises. Get it wrong and all that gradient descent is chasing the wrong
          target.
        </p>
      </Slide>

      {/* What is a loss function */}
      <Slide n="02 / 08" accent="glass-strong">
        <p className="mt-2 text-2xl font-extrabold leading-snug">
          A loss function = the gap between what you predicted and what actually happened.
        </p>
        <div className="mt-5 flex flex-col gap-3">
          {[
            { emoji: "🎯", text: "Model predicts: cat (92% confident)" },
            { emoji: "✅", text: "Truth: actually a cat" },
            { emoji: "📉", text: "Loss: tiny — model was right and sure" },
          ].map((r) => (
            <div key={r.text} className="flex items-center gap-3 glass rounded-2xl px-4 py-3">
              <span className="text-2xl">{r.emoji}</span>
              <p className="text-sm font-medium">{r.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-foreground/60">
          Backprop uses this number to nudge every weight. Smaller loss → better model.
        </p>
      </Slide>

      {/* MSE */}
      <Slide n="03 / 08" accent="bg-gradient-to-br from-sky-50/90 to-blue-50/90">
        <div className="flex items-start justify-between">
          <p className="mt-2 text-2xl font-extrabold">Mean Squared Error</p>
          <span className="mt-2 shrink-0 px-3 py-1 rounded-full bg-sky-200/60 text-sky-700 text-xs font-bold">
            Regression
          </span>
        </div>
        <div className="mt-4 font-mono text-center text-xl font-black py-4 bg-white/50 rounded-2xl tracking-tight">
          L = (1/n) × Σ (yᵢ − ŷᵢ)²
        </div>
        <p className="mt-4 text-base text-foreground/75 leading-relaxed">
          Squares the error between prediction and truth. Big mistakes get{" "}
          <span className="font-semibold text-foreground">punished hard</span> — a 10× bigger error
          means 100× bigger loss.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="glass rounded-2xl p-3 text-center">
            <p className="text-xs font-bold text-muted-foreground mb-1">USE FOR</p>
            <p className="text-sm font-semibold">Predicting numbers</p>
            <p className="text-xs text-foreground/60 mt-1">house prices, temperatures, ages</p>
          </div>
          <div className="glass rounded-2xl p-3 text-center">
            <p className="text-xs font-bold text-muted-foreground mb-1">AVOID FOR</p>
            <p className="text-sm font-semibold">Classification</p>
            <p className="text-xs text-foreground/60 mt-1">probabilities don't square cleanly</p>
          </div>
        </div>
      </Slide>

      {/* Cross-entropy */}
      <Slide n="04 / 08" accent="bg-gradient-to-br from-violet-50/90 to-fuchsia-50/90">
        <div className="flex items-start justify-between">
          <p className="mt-2 text-2xl font-extrabold">Cross-Entropy Loss</p>
          <span className="mt-2 shrink-0 px-3 py-1 rounded-full bg-violet-200/60 text-violet-700 text-xs font-bold">
            Classification
          </span>
        </div>
        <div className="mt-4 font-mono text-center text-lg font-black py-4 bg-white/50 rounded-2xl tracking-tight">
          L = −Σ yᵢ × log(ŷᵢ)
        </div>
        <p className="mt-4 text-base text-foreground/75 leading-relaxed">
          Measures how surprised your model is by the truth. If it was 99% sure about the right
          answer → tiny loss. If it was 1% sure →{" "}
          <span className="font-semibold text-foreground">massive loss</span>. That's the log.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="glass rounded-2xl p-3 text-center">
            <p className="text-xs font-bold text-muted-foreground mb-1">USE FOR</p>
            <p className="text-sm font-semibold">Classifying things</p>
            <p className="text-xs text-foreground/60 mt-1">
              cats vs dogs, spam vs not, 1000 classes
            </p>
          </div>
          <div className="glass rounded-2xl p-3 text-center">
            <p className="text-xs font-bold text-muted-foreground mb-1">AVOID FOR</p>
            <p className="text-sm font-semibold">Regression tasks</p>
            <p className="text-xs text-foreground/60 mt-1">log of a continuous value is weird</p>
          </div>
        </div>
      </Slide>

      {/* Head to head */}
      <Slide n="05 / 08" accent="glass-strong">
        <p className="mt-2 text-2xl font-extrabold">Head to head.</p>
        <div className="mt-5 space-y-3">
          {[
            { q: "Output is a number?", mse: "✅ Use MSE", ce: "❌ Don't" },
            { q: "Output is a class?", mse: "❌ Don't", ce: "✅ Use CE" },
            { q: "Outlier-sensitive?", mse: "⚠️ Very", ce: "🟡 Less so" },
            { q: "Paired with?", mse: "Linear output", ce: "Softmax / Sigmoid" },
            { q: "Gradient when wrong?", mse: "Grows with error", ce: "Grows with surprise" },
          ].map((row) => (
            <div key={row.q} className="grid grid-cols-[1fr_auto_auto] gap-3 items-center text-sm">
              <p className="font-medium text-foreground/80">{row.q}</p>
              <span className="text-xs px-2 py-1 rounded-full bg-sky-100/80 text-sky-700 font-semibold whitespace-nowrap">
                {row.mse}
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-violet-100/80 text-violet-700 font-semibold whitespace-nowrap">
                {row.ce}
              </span>
            </div>
          ))}
        </div>
      </Slide>

      {/* The log trick */}
      <Slide n="06 / 08" accent="bg-gradient-to-br from-rose-50/90 to-orange-50/90">
        <p className="mt-2 text-2xl font-extrabold leading-snug">
          Why log? Because confidence matters more than distance.
        </p>
        <p className="mt-4 text-base text-foreground/75 leading-relaxed">
          MSE treats error linearly — off by 2 is twice as bad as off by 1. But for probabilities,
          that's wrong. Being 50% confident on the right answer is{" "}
          <span className="font-semibold text-foreground">very different</span> from being 1%
          confident — even though the numeric distance is small.
        </p>
        <div className="mt-5 space-y-3">
          {[
            {
              conf: "99% confident ✅ correct",
              loss: "−log(0.99) = 0.01",
              pill: "bg-emerald-100 text-emerald-700",
            },
            {
              conf: "50% confident ✅ correct",
              loss: "−log(0.50) = 0.69",
              pill: "bg-amber-100 text-amber-700",
            },
            {
              conf: "1% confident ✅ correct",
              loss: "−log(0.01) = 4.60",
              pill: "bg-rose-100 text-rose-700",
            },
          ].map((r) => (
            <div
              key={r.conf}
              className="flex items-center justify-between glass rounded-xl px-4 py-3 gap-3"
            >
              <p className="text-xs font-medium text-foreground/70">{r.conf}</p>
              <span className={`text-xs font-black px-2 py-1 rounded-full shrink-0 ${r.pill}`}>
                {r.loss}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-foreground/60">
          The log explodes as confidence approaches 0. Your model gets{" "}
          <span className="font-semibold">heavily penalised</span> for being wrong AND confident —
          exactly what you want.
        </p>
      </Slide>

      {/* Beyond the basics */}
      <Slide n="07 / 08" accent="glass-strong">
        <p className="mt-2 text-2xl font-extrabold">Beyond MSE and CE.</p>
        <p className="mt-3 text-sm text-foreground/65">The loss zoo gets wild fast.</p>
        <div className="mt-4 space-y-3">
          {[
            {
              name: "MAE (L1 Loss)",
              color: "bg-sky-400",
              desc: "Mean absolute error. Less sensitive to outliers than MSE. Use when big errors shouldn't dominate.",
            },
            {
              name: "Huber Loss",
              color: "bg-teal-400",
              desc: "MSE for small errors, MAE for large ones. Best of both worlds. Used in object detection.",
            },
            {
              name: "Binary CE",
              color: "bg-violet-400",
              desc: "Cross-entropy for 2-class problems (sigmoid output). Is this a cat? Yes/no.",
            },
            {
              name: "KL Divergence",
              color: "bg-fuchsia-400",
              desc: "How different is one probability distribution from another? Used in VAEs, knowledge distillation.",
            },
            {
              name: "Contrastive / Triplet",
              color: "bg-rose-400",
              desc: "Pulls similar embeddings together, pushes different ones apart. Used in face recognition, CLIP.",
            },
          ].map((item) => (
            <div key={item.name} className="flex gap-3 items-start">
              <div className={`size-2.5 rounded-full ${item.color} shrink-0 mt-1.5`} />
              <div>
                <p className="text-sm font-bold">{item.name}</p>
                <p className="text-xs text-foreground/60 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Slide>

      {/* The one rule */}
      <Slide
        n="08 / 08"
        accent="bg-gradient-to-br from-emerald-400/20 via-teal-300/20 to-cyan-400/20 border-emerald-200/60"
      >
        <p className="mt-2 text-3xl font-black leading-tight text-center py-4">
          "The loss function is your model's only goal in life. Make sure it's the right goal."
        </p>
        <div className="mt-6 space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground text-center">
            The 30-second cheat sheet
          </p>
          {[
            { emoji: "🔢", rule: "Predicting a number → MSE (or MAE if outliers are noisy)" },
            { emoji: "🏷️", rule: "Classifying into categories → Cross-Entropy" },
            { emoji: "0️⃣1️⃣", rule: "Binary yes/no → Binary Cross-Entropy + Sigmoid" },
            { emoji: "🧲", rule: "Learning embeddings → Contrastive or Triplet loss" },
            { emoji: "🎨", rule: "Generating images → Perceptual + adversarial loss (GANs)" },
          ].map((item) => (
            <div key={item.rule} className="flex gap-3 items-start glass rounded-xl px-4 py-3">
              <span className="text-xl shrink-0">{item.emoji}</span>
              <p className="text-sm leading-relaxed">{item.rule}</p>
            </div>
          ))}
        </div>
      </Slide>

      <NextSteps
        steps={[
          {
            step: "01",
            label: "KL Divergence & information theory",
            note: "Why cross-entropy is actually measuring information. The connection to entropy and bits.",
          },
          {
            step: "02",
            label: "Focal Loss",
            note: "Used in RetinaNet. Downweights easy examples so the model focuses on hard ones. Big in object detection.",
          },
          {
            step: "03",
            label: "RLHF reward modelling",
            note: "In LLMs, the 'loss' becomes a learned reward model from human preferences. The bridge between loss functions and alignment.",
          },
          {
            step: "04",
            label: "Multi-task losses",
            note: "Training on two objectives at once? You need to balance them. Loss weighting and gradient surgery.",
          },
        ]}
      />
    </div>
  );
}

/* ══════════════════════════════════════════
   ARTICLE 7 — Batch Normalisation
   Format: before/after visual explainer, lime/green palette
══════════════════════════════════════════ */

function Article7() {
  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 py-10 space-y-10">
      {/* TL;DR */}
      <div className="rounded-3xl p-5 shadow-soft border border-lime-200/60 bg-gradient-to-br from-lime-50/90 to-green-50/90">
        <p className="text-xs font-bold uppercase tracking-widest text-lime-600 mb-2">TL;DR</p>
        <p className="text-sm leading-relaxed text-foreground/80">
          Every layer in your network sees inputs with a shifting mean and variance — called{" "}
          <span className="font-semibold text-foreground">internal covariate shift</span>. Batch
          Norm fixes this by normalising each layer's inputs to mean 0, variance 1, then letting the
          network re-scale them with learnable parameters. Result: faster training, higher learning
          rates, less sensitivity to weight init.
        </p>
      </div>

      {/* The problem: before/after */}
      <section>
        <SectionLabel icon={Zap} label="The problem" />
        <h2 className="text-2xl font-extrabold mt-2 mb-4">
          Without Batch Norm, every layer is fighting a moving target.
        </h2>
        <p className="text-base leading-relaxed text-foreground/80">
          Picture a 10-layer network. Layer 1 outputs values between 0 and 1. Layer 4 outputs values
          between −100 and 100. Layer 7 might explode to thousands. Each layer has to constantly
          re-adapt to the distribution of the layer before it — that's internal covariate shift.
        </p>

        {/* Before / After visual */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-2xl p-4 bg-rose-50/80 border border-rose-200/60">
            <p className="text-xs font-black uppercase tracking-widest text-rose-500 mb-3">
              ❌ Without BN
            </p>
            <div className="space-y-2">
              {[
                { label: "Layer 1 output", bar: "w-[30%]", val: "0.3", color: "bg-rose-300" },
                { label: "Layer 3 output", bar: "w-[90%]", val: "89", color: "bg-rose-400" },
                { label: "Layer 6 output", bar: "w-[15%]", val: "0.001", color: "bg-rose-200" },
                { label: "Layer 9 output", bar: "w-[75%]", val: "−42", color: "bg-rose-500" },
              ].map((r) => (
                <div key={r.label}>
                  <div className="flex justify-between text-[10px] text-foreground/50 mb-0.5">
                    <span>{r.label}</span>
                    <span className="font-mono">{r.val}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-rose-100 overflow-hidden">
                    <div className={`h-full ${r.bar} ${r.color} rounded-full`} />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-rose-500 mt-3 font-semibold">
              Wildly different scales → gradients vanish or explode
            </p>
          </div>

          <div className="rounded-2xl p-4 bg-lime-50/80 border border-lime-200/60">
            <p className="text-xs font-black uppercase tracking-widest text-lime-600 mb-3">
              ✅ With BN
            </p>
            <div className="space-y-2">
              {[
                { label: "Layer 1 output", bar: "w-[48%]", val: "≈0", color: "bg-lime-400" },
                { label: "Layer 3 output", bar: "w-[52%]", val: "≈0", color: "bg-lime-400" },
                { label: "Layer 6 output", bar: "w-[47%]", val: "≈0", color: "bg-lime-400" },
                { label: "Layer 9 output", bar: "w-[51%]", val: "≈0", color: "bg-lime-400" },
              ].map((r) => (
                <div key={r.label}>
                  <div className="flex justify-between text-[10px] text-foreground/50 mb-0.5">
                    <span>{r.label}</span>
                    <span className="font-mono">{r.val}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-lime-100 overflow-hidden">
                    <div className={`h-full ${r.bar} ${r.color} rounded-full`} />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-lime-600 mt-3 font-semibold">
              Normalised at every layer → stable gradients everywhere
            </p>
          </div>
        </div>
      </section>

      {/* What it actually does */}
      <section>
        <SectionLabel icon={Brain} label="The mechanics" />
        <h2 className="text-2xl font-extrabold mt-2 mb-3">
          What Batch Norm actually does — step by step.
        </h2>
        <p className="text-base leading-relaxed text-foreground/80">
          For each mini-batch, Batch Norm applies four operations to the layer's input{" "}
          <span className="font-mono text-sm bg-lime-100/60 px-1.5 py-0.5 rounded">x</span>:
        </p>
        <div className="mt-5 space-y-3">
          {[
            {
              n: "1",
              op: "Compute batch mean",
              formula: "μ = (1/m) Σ xᵢ",
              desc: "Average over all examples in the mini-batch.",
              color: "from-lime-400 to-green-400",
            },
            {
              n: "2",
              op: "Compute batch variance",
              formula: "σ² = (1/m) Σ (xᵢ − μ)²",
              desc: "How spread out the values are.",
              color: "from-green-400 to-teal-400",
            },
            {
              n: "3",
              op: "Normalise",
              formula: "x̂ = (x − μ) / √(σ² + ε)",
              desc: "Shift to mean 0, scale to variance 1. ε prevents divide-by-zero.",
              color: "from-teal-400 to-cyan-400",
            },
            {
              n: "4",
              op: "Scale and shift",
              formula: "y = γ × x̂ + β",
              desc: "γ and β are learnable parameters. The network can undo the normalisation if needed.",
              color: "from-cyan-400 to-sky-400",
            },
          ].map((s) => (
            <div key={s.n} className="glass-strong rounded-2xl p-4 shadow-soft flex gap-4">
              <div
                className={`size-10 shrink-0 rounded-xl bg-gradient-to-br ${s.color} grid place-items-center shadow-glow`}
              >
                <span className="text-white font-black text-sm">{s.n}</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-bold text-sm">{s.op}</p>
                  <code className="text-xs font-mono bg-lime-100/60 px-2 py-0.5 rounded text-lime-700">
                    {s.formula}
                  </code>
                </div>
                <p className="text-xs text-foreground/60 mt-1">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 glass rounded-2xl p-4 flex gap-3 items-start border-l-4 border-lime-400/60">
          <span className="text-xl shrink-0">💡</span>
          <p className="text-sm leading-relaxed text-foreground/80">
            γ and β are the magic. Without them, BN would force all activations to the same
            distribution, killing the network's expressive power. With them, the network{" "}
            <span className="font-semibold">chooses</span> how much normalisation to apply.
          </p>
        </div>
      </section>

      {/* Training vs inference */}
      <section>
        <SectionLabel icon={GitCompare} label="Train vs inference" />
        <h2 className="text-2xl font-extrabold mt-2 mb-3">
          Batch Norm behaves differently at inference time.
        </h2>
        <p className="text-base leading-relaxed text-foreground/80">
          During <span className="font-semibold text-foreground">training</span>, the mean and
          variance are computed from the current mini-batch. But at inference time you might predict
          one example at a time — there is no batch to compute stats from.
        </p>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="glass-strong rounded-2xl p-4 shadow-soft">
            <p className="text-xs font-bold text-lime-600 uppercase tracking-widest mb-2">
              🏋️ Training
            </p>
            <p className="text-sm text-foreground/75 leading-relaxed">
              μ and σ² are computed fresh for each mini-batch. Also maintains a running average of
              both stats across all batches (exponential moving average).
            </p>
          </div>
          <div className="glass-strong rounded-2xl p-4 shadow-soft">
            <p className="text-xs font-bold text-sky-600 uppercase tracking-widest mb-2">
              🚀 Inference
            </p>
            <p className="text-sm text-foreground/75 leading-relaxed">
              Uses the stored running mean and variance from training. This is why BN layers have a
              "training mode" flag — forgetting to set{" "}
              <code className="text-xs bg-sky-100/60 px-1 rounded">model.eval()</code> in PyTorch is
              a common bug.
            </p>
          </div>
        </div>
        <div className="mt-4 glass rounded-2xl p-4 flex gap-3 items-start border-l-4 border-rose-400/60">
          <span className="text-xl shrink-0">⚠️</span>
          <p className="text-sm leading-relaxed text-foreground/80">
            Classic bug: left model in{" "}
            <code className="text-xs bg-rose-100/60 px-1 rounded">model.train()</code> mode during
            evaluation. BN uses batch stats instead of running stats → results change every time you
            call the model. Always call{" "}
            <code className="text-xs bg-lime-100/60 px-1 rounded">model.eval()</code> before
            inference.
          </p>
        </div>
      </section>

      {/* Why it actually works */}
      <section>
        <SectionLabel icon={FlaskConical} label="Why it works" />
        <h2 className="text-2xl font-extrabold mt-2 mb-3">
          The real reasons it works (it's not just covariate shift).
        </h2>
        <p className="text-base leading-relaxed text-foreground/80">
          The original 2015 paper (Ioffe & Szegedy) attributed BN's effectiveness to reducing
          internal covariate shift. Later research found the story is more nuanced — BN works for
          multiple reasons:
        </p>
        <div className="mt-5 space-y-3">
          {[
            {
              emoji: "📐",
              title: "Smoother loss landscape",
              desc: "Santurkar et al. (2018) showed BN makes the loss surface smoother and more predictable — gradients are more consistent, enabling larger learning rates.",
            },
            {
              emoji: "🎲",
              title: "Slight regularisation effect",
              desc: "Because BN computes stats over a random mini-batch, each example is normalised slightly differently each time — acting like a very mild noise injection.",
            },
            {
              emoji: "🚀",
              title: "Allows higher learning rates",
              desc: "Without BN you have to be careful — too high and you diverge. With BN the landscape is more forgiving, so you can crank up the lr and train 5–10× faster.",
            },
            {
              emoji: "🎯",
              title: "Less sensitive to weight init",
              desc: "Bad weight init used to break training. BN re-centres activations every layer, so even a poor initialisation gets corrected quickly.",
            },
          ].map((item) => (
            <div key={item.title} className="flex gap-4 items-start glass rounded-2xl p-4">
              <span className="text-2xl shrink-0">{item.emoji}</span>
              <div>
                <p className="font-bold text-sm">{item.title}</p>
                <p className="text-xs text-foreground/65 mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BN vs Layer Norm */}
      <section>
        <SectionLabel icon={Eye} label="Modern context" />
        <h2 className="text-2xl font-extrabold mt-2 mb-3">
          Why transformers use Layer Norm instead.
        </h2>
        <p className="text-base leading-relaxed text-foreground/80">
          Batch Norm normalises{" "}
          <span className="font-semibold text-foreground">across the batch</span> (over examples).
          This works brilliantly for CNNs processing images in large batches. But for transformers
          processing variable-length sequences — often one at a time — batch statistics are
          unreliable or undefined.
        </p>
        <div className="mt-5 glass-strong rounded-3xl p-5 shadow-soft overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-muted-foreground border-b border-white/20">
                <th className="pb-2 font-bold">—</th>
                <th className="pb-2 font-bold">Batch Norm</th>
                <th className="pb-2 font-bold">Layer Norm</th>
              </tr>
            </thead>
            <tbody>
              {[
                { q: "Normalises over", bn: "Batch dimension", ln: "Feature dimension" },
                { q: "Works with batch=1?", bn: "❌ Unstable", ln: "✅ Always fine" },
                { q: "Used in", bn: "CNNs, ResNets", ln: "Transformers, LLMs" },
                { q: "Train vs eval diff?", bn: "Yes (running stats)", ln: "No difference" },
              ].map((r) => (
                <tr key={r.q} className="border-b border-white/10 last:border-0">
                  <td className="py-2.5 font-semibold text-foreground/70 text-xs">{r.q}</td>
                  <td className="py-2.5 text-foreground/70">{r.bn}</td>
                  <td className="py-2.5 text-foreground/70">{r.ln}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Quote */}
      <div className="rounded-3xl p-8 text-center shadow-soft bg-gradient-to-br from-lime-100/60 via-green-50/60 to-teal-100/60 border border-lime-200/40">
        <p className="text-2xl sm:text-3xl font-serif italic leading-snug text-foreground/90">
          "Batch normalisation is what allowed us to train neural networks that are actually deep."
        </p>
        <p className="mt-4 text-sm font-semibold text-foreground/50">
          — the quiet revolution of 2015
        </p>
      </div>

      <NextSteps
        steps={[
          {
            step: "01",
            label: "Layer Normalisation",
            note: "The transformer version. Same idea, different axis. Read the original Ba et al. 2016 paper — it's short.",
          },
          {
            step: "02",
            label: "Group Norm & Instance Norm",
            note: "Variants for small batches (Group) and style transfer (Instance). Each normalises over different subsets.",
          },
          {
            step: "03",
            label: "Why BN helps: the landscape view",
            note: "'How Does Batch Normalization Help Optimization?' — Santurkar et al. 2018. The real mechanistic explanation.",
          },
          {
            step: "04",
            label: "Residual connections + BN",
            note: "BN and skip connections (ResNets) work synergistically. Understanding both unlocks the full picture of why deep networks train.",
          },
        ]}
      />
    </div>
  );
}

/* ══════════════════════════════════════════
   ARTICLE 10 — Learning Rate
   Format: spectrum / dial cards, orange/red/amber palette
══════════════════════════════════════════ */

function Article10() {
  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 py-10 space-y-10">
      {/* TL;DR */}
      <div className="rounded-3xl p-5 shadow-soft border border-orange-200/60 bg-gradient-to-br from-orange-50/90 to-amber-50/90">
        <p className="text-xs font-bold uppercase tracking-widest text-orange-600 mb-2">TL;DR</p>
        <p className="text-sm leading-relaxed text-foreground/80">
          The learning rate controls how big each weight update is. Set it too small and training
          takes forever — or gets permanently stuck. Set it too large and the loss explodes. There
          is a <span className="font-semibold text-foreground">Goldilocks zone</span>, and modern
          training doesn't use a fixed rate at all — it uses a{" "}
          <span className="font-semibold text-foreground">schedule</span> that changes it over time.
        </p>
      </div>

      {/* What it actually is */}
      <section>
        <SectionLabel icon={Gauge} label="The formula" />
        <h2 className="text-2xl font-extrabold mt-2 mb-3">
          One number. Every weight update in every model ever trained.
        </h2>
        <div className="mt-2 font-mono text-center text-xl font-black py-5 bg-gradient-to-br from-orange-50/90 to-amber-50/90 border border-orange-200/60 rounded-2xl tracking-tight">
          w ← w − <span className="text-orange-600">lr</span> × ∇L
        </div>
        <p className="mt-4 text-base leading-relaxed text-foreground/80">
          The gradient{" "}
          <span className="font-mono text-sm bg-orange-100/60 px-1.5 py-0.5 rounded">∇L</span> tells
          you the direction to move. The learning rate{" "}
          <span className="font-mono text-sm bg-orange-100/60 px-1.5 py-0.5 rounded">lr</span> tells
          you how far. That's it. But "how far" is everything — get it wrong and nothing else
          matters.
        </p>
      </section>

      {/* The spectrum — three zones */}
      <section>
        <SectionLabel icon={Zap} label="The spectrum" />
        <h2 className="text-2xl font-extrabold mt-2 mb-5">Three zones. Only one of them works.</h2>

        <div className="space-y-4">
          {/* Too small */}
          <div className="rounded-2xl overflow-hidden shadow-soft border border-blue-200/50">
            <div className="bg-gradient-to-r from-blue-400 to-sky-400 px-5 py-3 flex items-center gap-3">
              <span className="text-2xl">🐌</span>
              <p className="text-white font-extrabold">Too Small</p>
              <span className="ml-auto font-mono text-white/80 text-xs">lr = 0.000001</span>
            </div>
            <div className="p-5 bg-gradient-to-br from-blue-50/80 to-sky-50/80">
              <p className="text-sm leading-relaxed text-foreground/80 mb-4">
                Each step barely moves the weights. The loss curve ticks down so slowly it looks
                flat. Training takes 10× longer than it should — or stalls completely in a flat
                plateau where gradients are near zero.
              </p>
              {/* Loss curve simulation */}
              <div className="bg-white/70 rounded-xl p-4">
                <p className="text-[10px] text-foreground/40 uppercase tracking-widest mb-2">
                  Loss curve (steps →)
                </p>
                <div className="flex items-end gap-1 h-10">
                  {[100, 99, 98, 97, 97, 96, 96, 95, 95, 94, 94, 93, 93, 93, 92].map((v, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-blue-300 rounded-sm"
                      style={{ height: `${v}%` }}
                    />
                  ))}
                </div>
                <p className="text-[10px] text-blue-500 font-semibold mt-2">
                  Barely moves. Looks converged but isn't.
                </p>
              </div>
            </div>
          </div>

          {/* Just right */}
          <div className="rounded-2xl overflow-hidden shadow-soft border border-emerald-200/50">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-3 flex items-center gap-3">
              <span className="text-2xl">✅</span>
              <p className="text-white font-extrabold">Just Right</p>
              <span className="ml-auto font-mono text-white/80 text-xs">lr = 0.001</span>
            </div>
            <div className="p-5 bg-gradient-to-br from-emerald-50/80 to-teal-50/80">
              <p className="text-sm leading-relaxed text-foreground/80 mb-4">
                Loss drops steadily and smoothly. The model is learning fast enough to converge but
                not so fast it overshoots. This is what a healthy training run looks like.
              </p>
              <div className="bg-white/70 rounded-xl p-4">
                <p className="text-[10px] text-foreground/40 uppercase tracking-widest mb-2">
                  Loss curve (steps →)
                </p>
                <div className="flex items-end gap-1 h-10">
                  {[100, 88, 75, 63, 53, 44, 37, 31, 26, 22, 19, 17, 15, 14, 13].map((v, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-emerald-400 rounded-sm"
                      style={{ height: `${v}%` }}
                    />
                  ))}
                </div>
                <p className="text-[10px] text-emerald-600 font-semibold mt-2">
                  Smooth descent. Converges cleanly.
                </p>
              </div>
            </div>
          </div>

          {/* Too large */}
          <div className="rounded-2xl overflow-hidden shadow-soft border border-rose-200/50">
            <div className="bg-gradient-to-r from-rose-500 to-red-500 px-5 py-3 flex items-center gap-3">
              <span className="text-2xl">💥</span>
              <p className="text-white font-extrabold">Too Large</p>
              <span className="ml-auto font-mono text-white/80 text-xs">lr = 0.1</span>
            </div>
            <div className="p-5 bg-gradient-to-br from-rose-50/80 to-red-50/80">
              <p className="text-sm leading-relaxed text-foreground/80 mb-4">
                Each step overshoots the valley. The weights bounce around wildly, never settling.
                The loss oscillates or diverges to NaN. Classic symptom: loss starts dropping then
                suddenly spikes to infinity.
              </p>
              <div className="bg-white/70 rounded-xl p-4">
                <p className="text-[10px] text-foreground/40 uppercase tracking-widest mb-2">
                  Loss curve (steps →)
                </p>
                <div className="flex items-end gap-1 h-10">
                  {[100, 60, 95, 45, 110, 70, 130, 55, 140, 80, 160, 90, 180, 110, 200].map(
                    (v, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-rose-400 rounded-sm"
                        style={{ height: `${Math.min(v, 100)}%` }}
                      />
                    ),
                  )}
                </div>
                <p className="text-[10px] text-rose-600 font-semibold mt-2">
                  Diverges. Loss explodes to NaN.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedulers */}
      <section>
        <SectionLabel icon={TrendingDown} label="The fix" />
        <h2 className="text-2xl font-extrabold mt-2 mb-3">
          Nobody uses a fixed learning rate anymore.
        </h2>
        <p className="text-base leading-relaxed text-foreground/80">
          A fixed learning rate is a compromise — too high for the end of training, too low for the
          beginning. Modern training uses a{" "}
          <span className="font-semibold text-foreground">scheduler</span>: start high to move fast,
          decay over time to land precisely. Almost every SOTA run uses one.
        </p>

        <div className="mt-5 space-y-3">
          {[
            {
              name: "Warmup + Cosine Decay",
              color: "from-orange-400 to-amber-400",
              badge: "Standard for LLMs",
              badgeColor: "bg-orange-100 text-orange-700",
              desc: "Start from near-zero lr, ramp up over the first ~1000 steps (warmup), then decay following a cosine curve to near-zero. Used in GPT-3, LLaMA, everything. The warmup prevents gradient explosions from random initial weights.",
            },
            {
              name: "Step Decay",
              color: "from-amber-400 to-yellow-400",
              badge: "Classic CNNs",
              badgeColor: "bg-amber-100 text-amber-700",
              desc: "Drop lr by a fixed factor (e.g. ×0.1) at preset milestones — epoch 30, 60, 90. Simple, predictable. Still used for ResNets and classic vision models.",
            },
            {
              name: "Cyclical LR (CLR)",
              color: "from-rose-400 to-pink-400",
              badge: "Exploration trick",
              badgeColor: "bg-rose-100 text-rose-700",
              desc: "Oscillate the lr between a low and high bound. The high end helps escape saddle points; the low end refines. Works surprisingly well and was popularised by fastai.",
            },
            {
              name: "1-Cycle Policy",
              color: "from-violet-400 to-purple-400",
              badge: "fastai favourite",
              badgeColor: "bg-violet-100 text-violet-700",
              desc: "Ramp up to a max lr then decay all the way down in one smooth cycle. Reaches high accuracy faster than fixed schedules. Pairs well with Adam.",
            },
          ].map((item) => (
            <div key={item.name} className="glass-strong rounded-2xl p-5 shadow-soft flex gap-4">
              <div
                className={`size-10 shrink-0 rounded-xl bg-gradient-to-br ${item.color} grid place-items-center shadow-glow`}
              >
                <span className="text-white font-black text-lg">↓</span>
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <p className="font-extrabold text-sm">{item.name}</p>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs text-foreground/65 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Finding the right lr */}
      <section>
        <SectionLabel icon={FlaskConical} label="How to find it" />
        <h2 className="text-2xl font-extrabold mt-2 mb-3">
          The LR range test — find your sweet spot in minutes.
        </h2>
        <p className="text-base leading-relaxed text-foreground/80">
          Leslie Smith (2017) proposed a dead-simple technique: run a short training loop, starting
          with a tiny lr and increasing it exponentially each step. Plot loss vs lr. The best lr is
          just before the loss starts rising.
        </p>
        <div className="mt-5 space-y-3">
          {[
            { n: "1", text: "Start training with lr = 1e-7" },
            { n: "2", text: "Multiply lr by a small factor each mini-batch (e.g. ×1.3)" },
            { n: "3", text: "Record the loss at each step" },
            { n: "4", text: "Plot loss vs lr on a log scale" },
            { n: "5", text: "Pick the lr where loss is steepest (dropping fastest)" },
            { n: "6", text: "Use that as your max lr — or ÷10 as a safe starting lr" },
          ].map((s) => (
            <div
              key={s.n}
              className="flex gap-4 items-center glass-strong rounded-2xl px-4 py-3 shadow-soft"
            >
              <span className="size-6 shrink-0 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 grid place-items-center text-white text-xs font-black">
                {s.n}
              </span>
              <p className="text-sm leading-relaxed text-foreground/80">{s.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 glass rounded-2xl p-4 flex gap-3 items-start border-l-4 border-orange-400/60">
          <span className="text-xl shrink-0">🔥</span>
          <p className="text-sm leading-relaxed text-foreground/80">
            This is built into fastai as{" "}
            <code className="text-xs bg-orange-100/60 px-1 rounded">learn.lr_find()</code> and into
            PyTorch Lightning. Run it before any serious training job.
          </p>
        </div>
      </section>

      {/* Adam note */}
      <section>
        <SectionLabel icon={Brain} label="Modern context" />
        <h2 className="text-2xl font-extrabold mt-2 mb-3">
          Adam uses per-parameter learning rates — but you still set the base.
        </h2>
        <p className="text-base leading-relaxed text-foreground/80">
          Adam doesn't use one lr for all weights — it maintains an adaptive lr per parameter,
          scaled by a running average of past gradients. This makes it less sensitive to your
          initial lr choice. But you still set a base lr, and getting it in the right ballpark
          matters just as much.
        </p>
        <div className="mt-4 glass-strong rounded-2xl p-5 shadow-soft overflow-x-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
            Common starting points
          </p>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-muted-foreground border-b border-white/20">
                <th className="pb-2 font-bold">Setup</th>
                <th className="pb-2 font-bold">Typical lr</th>
              </tr>
            </thead>
            <tbody>
              {[
                { setup: "Adam (general)", lr: "3e-4 (Karpathy's constant)" },
                { setup: "SGD + momentum (ResNets)", lr: "0.1 → decay" },
                { setup: "LLM pre-training", lr: "1e-4 to 3e-4 + warmup" },
                { setup: "Fine-tuning (LLM)", lr: "1e-5 to 5e-5" },
                { setup: "LoRA / PEFT", lr: "1e-4 to 3e-4" },
              ].map((r) => (
                <tr key={r.setup} className="border-b border-white/10 last:border-0">
                  <td className="py-2.5 font-semibold text-sm">{r.setup}</td>
                  <td className="py-2.5 font-mono text-xs text-orange-600 font-bold">{r.lr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 glass rounded-2xl p-4 flex gap-3 items-start border-l-4 border-amber-400/60">
          <span className="text-xl shrink-0">💡</span>
          <p className="text-sm leading-relaxed text-foreground/80">
            3e-4 is sometimes called <span className="font-semibold">"Karpathy's constant"</span> —
            Andrej Karpathy has said it's his default Adam lr. It works surprisingly often as a
            starting point.
          </p>
        </div>
      </section>

      {/* Quote */}
      <div className="rounded-3xl p-8 text-center shadow-soft bg-gradient-to-br from-orange-100/60 via-amber-50/60 to-yellow-100/60 border border-orange-200/40">
        <p className="text-2xl sm:text-3xl font-serif italic leading-snug text-foreground/90">
          "3e-4 is the best learning rate for Adam, hands down."
        </p>
        <p className="mt-4 text-sm font-semibold text-foreground/50">— Andrej Karpathy</p>
      </div>

      <NextSteps
        steps={[
          {
            step: "01",
            label: "Adam optimizer (deep dive)",
            note: "Momentum + RMSProp combined. Per-parameter adaptive lr. Why it's the default for 90% of models.",
          },
          {
            step: "02",
            label: "Cosine annealing with warm restarts",
            note: "SGDR — the paper by Loshchilov & Hutter. Restarts help escape local minima at the end of each cycle.",
          },
          {
            step: "03",
            label: "LR range test (Smith, 2017)",
            note: "The original paper: 'Cyclical Learning Rates for Training Neural Networks.' Short, practical, and immediately useful.",
          },
          {
            step: "04",
            label: "Learning rate in RL & fine-tuning",
            note: "During RLHF fine-tuning, lr is tiny (1e-5) to avoid catastrophic forgetting of pre-trained knowledge.",
          },
        ]}
      />
    </div>
  );
}

/* ══════════════════════════════════════════
   ARTICLE 9 — How LLMs Work
   Format: pipeline stage cards, cyan/violet/fuchsia palette
══════════════════════════════════════════ */

function Article9() {
  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 py-10 space-y-10">
      {/* TL;DR */}
      <div className="rounded-3xl p-5 shadow-soft border border-cyan-200/60 bg-gradient-to-br from-cyan-50/90 to-violet-50/90">
        <p className="text-xs font-bold uppercase tracking-widest text-cyan-600 mb-2">TL;DR</p>
        <p className="text-sm leading-relaxed text-foreground/80">
          An LLM is a{" "}
          <span className="font-semibold text-foreground">next-token prediction machine</span>. Give
          it text, it guesses what comes next — one token at a time. That single trick, trained on
          trillions of words, produces something that can code, reason, translate, and explain.
          Here's exactly how it happens, step by step.
        </p>
      </div>

      {/* The pipeline — 4 stage cards */}
      <section>
        <SectionLabel icon={Zap} label="The pipeline" />
        <h2 className="text-2xl font-extrabold mt-2 mb-6">
          Four stages. One forward pass. One new token.
        </h2>

        <div className="space-y-4">
          {/* Stage 1 */}
          <div className="rounded-2xl overflow-hidden shadow-soft border border-cyan-200/50">
            <div className="bg-gradient-to-r from-cyan-500 to-sky-500 px-5 py-3 flex items-center gap-3">
              <span className="size-7 rounded-full bg-white/20 grid place-items-center text-white font-black text-sm">
                1
              </span>
              <p className="text-white font-extrabold">Tokenisation</p>
              <span className="ml-auto text-white/70 text-xs font-semibold">~50k vocab</span>
            </div>
            <div className="p-5 bg-gradient-to-br from-cyan-50/80 to-sky-50/80">
              <p className="text-sm leading-relaxed text-foreground/80 mb-4">
                Raw text is split into <span className="font-semibold">tokens</span> — chunks of
                roughly 4 characters. Every token maps to an integer ID. The model never sees
                letters — only numbers.
              </p>
              <div className="font-mono text-xs bg-white/70 rounded-xl p-4 space-y-2">
                <p className="text-foreground/50"># Input</p>
                <p className="text-cyan-700 font-semibold">"How do LLMs work?"</p>
                <p className="text-foreground/50 mt-2"># Tokens → IDs</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {[
                    ["How", "4570"],
                    ["▁do", "437"],
                    ["▁LL", "2520"],
                    ["Ms", "10730"],
                    ["▁work", "1816"],
                    ["?", "30"],
                  ].map(([tok, id]) => (
                    <div key={tok} className="flex flex-col items-center">
                      <span className="px-2 py-1 rounded-lg bg-cyan-100 text-cyan-800 font-semibold text-xs">
                        {tok}
                      </span>
                      <span className="text-[10px] text-foreground/40 mt-0.5">{id}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-xs text-foreground/55 mt-3">
                "LLMs" splits into two tokens — the model doesn't see whole words, just subword
                pieces.
              </p>
            </div>
          </div>

          {/* Stage 2 */}
          <div className="rounded-2xl overflow-hidden shadow-soft border border-violet-200/50">
            <div className="bg-gradient-to-r from-violet-500 to-purple-500 px-5 py-3 flex items-center gap-3">
              <span className="size-7 rounded-full bg-white/20 grid place-items-center text-white font-black text-sm">
                2
              </span>
              <p className="text-white font-extrabold">Embedding</p>
              <span className="ml-auto text-white/70 text-xs font-semibold">
                meaning as vectors
              </span>
            </div>
            <div className="p-5 bg-gradient-to-br from-violet-50/80 to-purple-50/80">
              <p className="text-sm leading-relaxed text-foreground/80 mb-4">
                Each token ID → a dense vector of ~1024–12 288 numbers. These are learned, not
                hand-crafted. Similar tokens end up with similar vectors. The sentence becomes a{" "}
                <span className="font-semibold">matrix of floats</span>.
              </p>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  {
                    word: '"king"',
                    vec: "[0.82, −0.31 …]",
                    color: "bg-violet-100 text-violet-700",
                  },
                  {
                    word: '"queen"',
                    vec: "[0.79, −0.28 …]",
                    color: "bg-purple-100 text-purple-700",
                  },
                  { word: '"rock"', vec: "[0.11, 0.74 …]", color: "bg-slate-100 text-slate-600" },
                ].map((e) => (
                  <div key={e.word} className="glass-strong rounded-xl p-3 shadow-soft">
                    <p className="font-bold text-xs mb-1">{e.word}</p>
                    <p className={`text-[10px] font-mono px-1.5 py-1 rounded-lg ${e.color}`}>
                      {e.vec}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-foreground/55 mt-3">
                king ≈ queen in vector space. rock is far away. Geometry encodes meaning.
              </p>
            </div>
          </div>

          {/* Stage 3 */}
          <div className="rounded-2xl overflow-hidden shadow-soft border border-fuchsia-200/50">
            <div className="bg-gradient-to-r from-fuchsia-500 to-pink-500 px-5 py-3 flex items-center gap-3">
              <span className="size-7 rounded-full bg-white/20 grid place-items-center text-white font-black text-sm">
                3
              </span>
              <p className="text-white font-extrabold">Transformer Blocks × N</p>
              <span className="ml-auto text-white/70 text-xs font-semibold">
                96 layers in GPT-4
              </span>
            </div>
            <div className="p-5 bg-gradient-to-br from-fuchsia-50/80 to-pink-50/80">
              <p className="text-sm leading-relaxed text-foreground/80 mb-4">
                The matrix passes through N identical blocks. Each block runs two operations:
              </p>
              <div className="space-y-3">
                <div className="glass-strong rounded-xl p-4 shadow-soft">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-full bg-fuchsia-100 text-fuchsia-700 text-xs font-bold">
                      A
                    </span>
                    <p className="font-bold text-sm">Self-Attention</p>
                  </div>
                  <p className="text-xs text-foreground/70 leading-relaxed">
                    Every token asks: <em>"which other tokens matter to me right now?"</em> Q/K/V
                    matrices compute pairwise scores, softmax normalises them, values get mixed.
                    "The bank by the river" → "bank" attends strongly to "river", not "money."
                  </p>
                </div>
                <div className="glass-strong rounded-xl p-4 shadow-soft">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 text-xs font-bold">
                      B
                    </span>
                    <p className="font-bold text-sm">Feed-Forward Network</p>
                  </div>
                  <p className="text-xs text-foreground/70 leading-relaxed">
                    A small MLP on each token independently. If attention routes information between
                    tokens, the FFN processes each token's meaning. Thought to be where factual
                    knowledge lives.
                  </p>
                </div>
              </div>
              <div className="mt-3 glass rounded-xl p-3 flex gap-2 items-start border-l-4 border-fuchsia-400/60">
                <span className="text-lg shrink-0">🔁</span>
                <p className="text-xs text-foreground/70 leading-relaxed">
                  Repeat 32–96 times. Each pass refines every token's representation. By the final
                  layer, each vector encodes its full contextual meaning.
                </p>
              </div>
            </div>
          </div>

          {/* Stage 4 */}
          <div className="rounded-2xl overflow-hidden shadow-soft border border-emerald-200/50">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-3 flex items-center gap-3">
              <span className="size-7 rounded-full bg-white/20 grid place-items-center text-white font-black text-sm">
                4
              </span>
              <p className="text-white font-extrabold">Next Token Prediction</p>
              <span className="ml-auto text-white/70 text-xs font-semibold">
                one token at a time
              </span>
            </div>
            <div className="p-5 bg-gradient-to-br from-emerald-50/80 to-teal-50/80">
              <p className="text-sm leading-relaxed text-foreground/80 mb-4">
                Final layer output → a linear head → scores for every vocab token → softmax →
                probabilities. Sample one token. Append. Repeat from step 1.
              </p>
              <div className="font-mono text-xs bg-white/70 rounded-xl p-4">
                <p className="text-foreground/50 mb-2"># Prompt: "The capital of France is"</p>
                <div className="space-y-1.5">
                  {[
                    { tok: '"Paris"', prob: "68%", w: "w-[68%]", color: "bg-emerald-400" },
                    { tok: '"Lyon"', prob: "9%", w: "w-[9%]", color: "bg-teal-300" },
                    { tok: '"a"', prob: "7%", w: "w-[7%]", color: "bg-teal-200" },
                    { tok: '"the"', prob: "4%", w: "w-[4%]", color: "bg-teal-100" },
                  ].map((r) => (
                    <div key={r.tok} className="flex items-center gap-2">
                      <span className="w-16 text-right font-semibold text-foreground/80">
                        {r.tok}
                      </span>
                      <div className="flex-1 h-2 bg-emerald-50 rounded-full overflow-hidden">
                        <div className={`h-full ${r.w} ${r.color} rounded-full`} />
                      </div>
                      <span className="w-8 text-foreground/50">{r.prob}</span>
                    </div>
                  ))}
                </div>
                <p className="text-foreground/40 mt-3">→ "Paris" sampled. Appended. Loop again.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training stages */}
      <section>
        <SectionLabel icon={Brain} label="How it learned" />
        <h2 className="text-2xl font-extrabold mt-2 mb-5">
          Three training stages that built the LLMs you use today.
        </h2>
        <div className="space-y-3">
          {[
            {
              n: "1",
              stage: "Pre-training",
              color: "from-cyan-400 to-sky-400",
              badge: "Self-supervised",
              badgeColor: "bg-cyan-100 text-cyan-700",
              desc: "Train on trillions of tokens — predict the next word, everywhere, constantly. No labels needed. The model learns grammar, facts, and reasoning purely from text. Costs tens of millions of dollars.",
            },
            {
              n: "2",
              stage: "Supervised Fine-Tuning (SFT)",
              color: "from-violet-400 to-purple-400",
              badge: "Human demos",
              badgeColor: "bg-violet-100 text-violet-700",
              desc: "Show the model thousands of (prompt → ideal response) pairs written by humans. Teaches it to follow instructions and be helpful. Turns a next-token predictor into an assistant.",
            },
            {
              n: "3",
              stage: "RLHF",
              color: "from-fuchsia-400 to-pink-400",
              badge: "Human preference",
              badgeColor: "bg-fuchsia-100 text-fuchsia-700",
              desc: "Humans rank pairs of responses (A vs B). A reward model learns those preferences. The LLM is fine-tuned to maximise reward. This is what makes Claude, GPT-4, and Gemini feel polished.",
            },
          ].map((item) => (
            <div key={item.n} className="glass-strong rounded-2xl p-5 shadow-soft flex gap-4">
              <div
                className={`size-10 shrink-0 rounded-xl bg-gradient-to-br ${item.color} grid place-items-center shadow-glow`}
              >
                <span className="text-white font-black">{item.n}</span>
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <p className="font-extrabold text-sm">{item.stage}</p>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs text-foreground/65 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why surprisingly good */}
      <section>
        <SectionLabel icon={Sparkles} label="The mystery" />
        <h2 className="text-2xl font-extrabold mt-2 mb-3">
          Why does next-token prediction produce intelligence?
        </h2>
        <p className="text-base leading-relaxed text-foreground/80">
          Nobody fully knows. The leading theory: to predict the next token well across all of human
          writing, you must{" "}
          <span className="font-semibold text-foreground">implicitly model the world</span> that
          produced that writing — facts, causality, code, psychology, everything.
        </p>
        <div className="mt-5 space-y-3">
          {[
            {
              emoji: "⚡",
              title: "Emergent abilities",
              desc: "At scale, capabilities appear that weren't trained for — arithmetic, multi-step reasoning, code. They just emerge as parameters grow.",
            },
            {
              emoji: "📝",
              title: "In-context learning",
              desc: "Give examples in the prompt, the model adapts — no retraining. It learns within the context window itself.",
            },
            {
              emoji: "🌍",
              title: "World model compression",
              desc: "Billions of parameters compress trillions of words into a lookup for 'what plausibly comes next' — which encodes enormous knowledge.",
            },
          ].map((item) => (
            <div key={item.title} className="flex gap-4 items-start glass rounded-2xl p-4">
              <span className="text-2xl shrink-0">{item.emoji}</span>
              <div>
                <p className="font-bold text-sm">{item.title}</p>
                <p className="text-xs text-foreground/65 mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quote */}
      <div className="rounded-3xl p-8 text-center shadow-soft bg-gradient-to-br from-cyan-100/60 via-violet-50/60 to-fuchsia-100/60 border border-cyan-200/40">
        <p className="text-2xl sm:text-3xl font-serif italic leading-snug text-foreground/90">
          "The hottest new programming language is English."
        </p>
        <p className="mt-4 text-sm font-semibold text-foreground/50">— Andrej Karpathy</p>
      </div>

      <NextSteps
        steps={[
          {
            step: "01",
            label: "Transformers & self-attention (deep dive)",
            note: "The Q, K, V mechanism in full detail. 'Attention Is All You Need' — the 2017 paper that started it all.",
          },
          {
            step: "02",
            label: "Tokenisation & BPE",
            note: "How Byte Pair Encoding builds a vocabulary. Why tokenisation choices affect math and code performance.",
          },
          {
            step: "03",
            label: "Scaling laws",
            note: "Kaplan et al. showed compute, data, and parameters follow power laws. Bigger = better, predictably.",
          },
          {
            step: "04",
            label: "RLHF & Constitutional AI",
            note: "How human preferences get baked in. The difference between a base model and Claude / ChatGPT.",
          },
        ]}
      />
    </div>
  );
}

/* ══════════════════════════════════════════
   ARTICLE 8 — Backpropagation (chain rule / blame assignment)
   Format: numbered "blame chain" layer cards, deep blue/indigo palette
══════════════════════════════════════════ */

function Article8() {
  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 py-10 space-y-10">
      {/* TL;DR */}
      <div className="rounded-3xl p-5 shadow-soft border border-indigo-200/60 bg-gradient-to-br from-indigo-50/90 to-blue-50/90">
        <p className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-2">TL;DR</p>
        <p className="text-sm leading-relaxed text-foreground/80">
          After a forward pass produces a wrong answer, backprop asks:{" "}
          <span className="font-semibold text-foreground">which weights caused this?</span> It
          answers by applying the chain rule backwards through every layer — computing how much each
          weight contributed to the error. That gradient is then used by gradient descent to nudge
          each weight in the right direction.
        </p>
      </div>

      {/* Why it exists */}
      <section>
        <SectionLabel icon={Brain} label="The problem" />
        <h2 className="text-2xl font-extrabold mt-2 mb-3">
          Your network made a mistake. Who's to blame?
        </h2>
        <p className="text-base leading-relaxed text-foreground/80">
          A neural net with 3 layers and 1 million weights just predicted the wrong class. The loss
          spiked. Now what? You need to know how much{" "}
          <span className="font-semibold text-foreground">each of those million weights</span>{" "}
          contributed to the error — so you can adjust them by exactly the right amount.
        </p>
        <p className="mt-4 text-base leading-relaxed text-foreground/80">
          Doing this naively (perturbing every weight one at a time to see what changes) would take
          millions of forward passes per training step. Impossible at scale. Backpropagation solves
          this in{" "}
          <span className="font-semibold text-foreground">
            one efficient backwards pass using calculus
          </span>
          .
        </p>
        <div className="mt-4 glass rounded-2xl p-4 flex gap-3 items-start border-l-4 border-indigo-400/60">
          <span className="text-xl shrink-0">💡</span>
          <p className="text-sm leading-relaxed text-foreground/80">
            Backprop was described in the 1986 Rumelhart, Hinton & Williams paper. It didn't invent
            the chain rule — it just showed you could apply it efficiently to neural networks. That
            insight unlocked modern deep learning.
          </p>
        </div>
      </section>

      {/* Chain rule primer */}
      <section>
        <SectionLabel icon={Zap} label="The tool" />
        <h2 className="text-2xl font-extrabold mt-2 mb-3">
          The chain rule — one calculus fact that runs everything.
        </h2>
        <p className="text-base leading-relaxed text-foreground/80">
          If output{" "}
          <span className="font-mono text-sm bg-indigo-100/60 px-1.5 py-0.5 rounded">L</span>{" "}
          depends on{" "}
          <span className="font-mono text-sm bg-indigo-100/60 px-1.5 py-0.5 rounded">z</span>, and{" "}
          <span className="font-mono text-sm bg-indigo-100/60 px-1.5 py-0.5 rounded">z</span>{" "}
          depends on{" "}
          <span className="font-mono text-sm bg-indigo-100/60 px-1.5 py-0.5 rounded">w</span>, then:
        </p>
        <div className="mt-4 font-mono text-center text-xl font-black py-5 bg-gradient-to-br from-indigo-50/90 to-blue-50/90 border border-indigo-200/60 rounded-2xl tracking-tight">
          ∂L/∂w = (∂L/∂z) × (∂z/∂w)
        </div>
        <p className="mt-4 text-base leading-relaxed text-foreground/80">
          That's it. Multiply the "how much does the loss change if z changes" by "how much does z
          change if w changes." The product tells you how the loss changes when you tweak w. Chain
          them through 100 layers and you have backprop.
        </p>
      </section>

      {/* The blame chain — layer by layer visual */}
      <section>
        <SectionLabel icon={TrendingDown} label="The blame chain" />
        <h2 className="text-2xl font-extrabold mt-2 mb-5">
          A 3-layer network, backward. Step by step.
        </h2>

        {/* Forward pass summary */}
        <div className="rounded-2xl p-4 bg-slate-50/80 border border-slate-200/60 mb-6">
          <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">
            Forward pass (what just happened)
          </p>
          <div className="flex items-center gap-2 flex-wrap text-sm font-semibold">
            {["Input x", "→ Layer 1 (W₁)", "→ Layer 2 (W₂)", "→ Layer 3 (W₃)", "→ Loss L"].map(
              (step, i) => (
                <span
                  key={step}
                  className={`px-3 py-1 rounded-full text-xs font-bold ${i === 4 ? "bg-rose-100 text-rose-700" : "bg-indigo-100 text-indigo-700"}`}
                >
                  {step}
                </span>
              ),
            )}
          </div>
          <p className="text-xs text-foreground/50 mt-3">
            Model predicted class A. Truth was class B. Loss is high. Backprop starts.
          </p>
        </div>

        {/* Backward steps */}
        <div className="space-y-4">
          {[
            {
              step: "Step 1",
              layer: "Loss → Layer 3",
              color: "from-rose-500 to-pink-500",
              bg: "from-rose-50/90 to-pink-50/90",
              border: "border-rose-200/60",
              formula: "∂L/∂W₃ = ∂L/∂ŷ × ∂ŷ/∂W₃",
              desc: "Start at the loss. How does L change as we tweak the output layer weights W₃? This gradient flows directly from the loss function — for cross-entropy + softmax it simplifies beautifully to (ŷ − y): just prediction minus truth.",
              badge: "Easiest gradient",
              badgeColor: "bg-rose-100 text-rose-700",
            },
            {
              step: "Step 2",
              layer: "Layer 3 → Layer 2",
              color: "from-violet-500 to-purple-500",
              bg: "from-violet-50/90 to-purple-50/90",
              border: "border-violet-200/60",
              formula: "∂L/∂W₂ = (∂L/∂a₃) × (∂a₃/∂z₂) × (∂z₂/∂W₂)",
              desc: "Now chain backwards through layer 3's activation. The gradient from step 1 gets multiplied by the activation function's derivative at this point. This is where dying ReLU or vanishing sigmoid starts to matter — if that derivative is near 0, the gradient shrinks.",
              badge: "Activation derivative",
              badgeColor: "bg-violet-100 text-violet-700",
            },
            {
              step: "Step 3",
              layer: "Layer 2 → Layer 1",
              color: "from-blue-500 to-indigo-500",
              bg: "from-blue-50/90 to-indigo-50/90",
              border: "border-blue-200/60",
              formula: "∂L/∂W₁ = (∂L/∂a₂) × (∂a₂/∂z₁) × (∂z₁/∂W₁)",
              desc: "Same chain rule, applied again. Each layer multiplies in another activation derivative. In a 100-layer network this product can become astronomically small (vanishing) or large (exploding). This is why deep networks were untrainable before ReLU, residual connections, and careful initialisation.",
              badge: "Where vanishing hits",
              badgeColor: "bg-blue-100 text-blue-700",
            },
          ].map((item) => (
            <div
              key={item.step}
              className={`rounded-2xl p-5 shadow-soft border ${item.border} bg-gradient-to-br ${item.bg}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`px-3 py-1 rounded-full bg-gradient-to-br ${item.color} text-white text-xs font-black`}
                >
                  {item.step}
                </div>
                <p className="font-extrabold text-sm">{item.layer}</p>
                <span
                  className={`ml-auto text-[10px] px-2 py-1 rounded-full font-semibold ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
              </div>
              <code className="block text-xs font-mono bg-white/60 px-3 py-2 rounded-xl mb-3 text-foreground/80">
                {item.formula}
              </code>
              <p className="text-sm leading-relaxed text-foreground/70">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vanishing gradient callout */}
      <section>
        <SectionLabel icon={AlertTriangle} label="The dark side" />
        <h2 className="text-2xl font-extrabold mt-2 mb-3">
          Why early layers get the least blame — and why that's a problem.
        </h2>
        <p className="text-base leading-relaxed text-foreground/80">
          Each backward step multiplies by an activation derivative. For sigmoid, that derivative is
          at most 0.25. Stack 10 sigmoid layers:
        </p>
        <div className="mt-4 font-mono text-center text-lg font-black py-4 bg-gradient-to-br from-rose-50/90 to-pink-50/90 border border-rose-200/60 rounded-2xl">
          0.25 × 0.25 × 0.25 × ... (10 times) = 0.000001
        </div>
        <p className="mt-4 text-base leading-relaxed text-foreground/80">
          The gradient reaching layer 1 is a millionth of what it started as. The first layers learn
          essentially nothing. That's the{" "}
          <span className="font-semibold text-foreground">vanishing gradient problem</span> — the
          direct consequence of chaining small numbers through backprop.
        </p>
        <div className="mt-5 space-y-3">
          {[
            {
              emoji: "✅",
              fix: "ReLU activation",
              detail: "Gradient is 1 for positive inputs — no shrinkage. Gradient flows freely.",
              color: "border-l-indigo-400/60",
            },
            {
              emoji: "✅",
              fix: "Residual connections (ResNets)",
              detail:
                "Skip connections create a gradient highway directly to early layers. The chain rule gives a sum, not just a product.",
              color: "border-l-violet-400/60",
            },
            {
              emoji: "✅",
              fix: "Gradient clipping",
              detail:
                "Caps the gradient magnitude if it explodes. Used in LSTMs and transformers during pretraining.",
              color: "border-l-blue-400/60",
            },
            {
              emoji: "✅",
              fix: "Careful weight init (He, Xavier)",
              detail:
                "Initialises weights so that activations and gradients start with healthy variance — giving backprop a fighting chance.",
              color: "border-l-sky-400/60",
            },
          ].map((item) => (
            <div
              key={item.fix}
              className={`glass rounded-2xl p-4 flex gap-3 items-start border-l-4 ${item.color}`}
            >
              <span className="text-xl shrink-0">{item.emoji}</span>
              <div>
                <p className="font-semibold text-sm">{item.fix}</p>
                <p className="text-xs text-foreground/65 mt-0.5 leading-relaxed">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Concrete numbers */}
      <section>
        <SectionLabel icon={Eye} label="With numbers" />
        <h2 className="text-2xl font-extrabold mt-2 mb-3">
          Backprop with actual values — so it clicks.
        </h2>
        <div className="space-y-3">
          {[
            { n: "1", text: "Forward: x=2, w=0.5 → z=1.0 → sigmoid → a=0.731 → loss=0.314" },
            { n: "2", text: "∂L/∂a = −0.686 (from cross-entropy derivative)" },
            { n: "3", text: "∂a/∂z = 0.731×(1−0.731) = 0.197 (sigmoid derivative)" },
            { n: "4", text: "∂z/∂w = x = 2 (linear layer derivative)" },
            { n: "5", text: "∂L/∂w = −0.686 × 0.197 × 2 = −0.270" },
            { n: "6", text: "Weight update: w ← 0.5 − (lr × −0.270) = 0.527" },
          ].map((s) => (
            <div
              key={s.n}
              className="flex gap-4 items-start glass-strong rounded-2xl px-4 py-3 shadow-soft"
            >
              <span className="size-6 shrink-0 rounded-full bg-gradient-to-br from-indigo-400 to-blue-400 grid place-items-center text-white text-xs font-black">
                {s.n}
              </span>
              <p className="text-sm font-mono leading-relaxed text-foreground/80">{s.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 glass rounded-2xl p-4 flex gap-3 items-start border-l-4 border-indigo-400/60">
          <span className="text-xl shrink-0">🔥</span>
          <p className="text-sm leading-relaxed text-foreground/80">
            The weight moved from 0.5 → 0.527. Small. But do this for a million weights, across
            10,000 batches — and you get GPT.
          </p>
        </div>
      </section>

      {/* Quote */}
      <div className="rounded-3xl p-8 text-center shadow-soft bg-gradient-to-br from-indigo-100/60 via-blue-50/60 to-violet-100/60 border border-indigo-200/40">
        <p className="text-2xl sm:text-3xl font-serif italic leading-snug text-foreground/90">
          "Backpropagation is just the chain rule, applied systematically and efficiently. Once you
          see it, you can't unsee it."
        </p>
        <p className="mt-4 text-sm font-semibold text-foreground/50">
          — Andrej Karpathy, micrograd walkthrough
        </p>
      </div>

      <NextSteps
        steps={[
          {
            step: "01",
            label: "Build micrograd (Karpathy)",
            note: "A 100-line backprop engine from scratch. Nothing makes backprop click faster than implementing it yourself.",
          },
          {
            step: "02",
            label: "Vanishing & exploding gradients (deep dive)",
            note: "Why they happen, how to detect them in training curves, and every technique used to fix them.",
          },
          {
            step: "03",
            label: "Automatic differentiation (autograd)",
            note: "PyTorch / JAX don't run backprop manually — they use autograd: a computation graph that differentiates itself.",
          },
          {
            step: "04",
            label: "Second-order optimisers",
            note: "Backprop gives first-order gradients. Second-order methods (like K-FAC, Shampoo) use curvature too. Faster convergence, more compute.",
          },
        ]}
      />
    </div>
  );
}

/* ══════════════════════════════════════════
   ARTICLE 11 — Overfitting vs Underfitting
   Format: traffic-light three-zone cards + bias-variance table
   Palette: rose / emerald / slate
══════════════════════════════════════════ */

function Article11() {
  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 py-10 space-y-10">
      {/* TL;DR */}
      <div className="rounded-3xl p-5 shadow-soft border border-emerald-200/60 bg-gradient-to-br from-emerald-50/90 to-teal-50/90">
        <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">TL;DR</p>
        <p className="text-sm leading-relaxed text-foreground/80">
          Every ML model sits on a spectrum between two failure modes.{" "}
          <span className="font-semibold text-foreground">Underfitting</span>: too simple to capture
          the pattern — fails on both training and test data.{" "}
          <span className="font-semibold text-foreground">Overfitting</span>: too complex —
          memorises the training set including its noise, fails on new data. The bias-variance
          tradeoff is the formal name for this tension.
        </p>
      </div>

      {/* The three zones */}
      <section>
        <SectionLabel icon={Zap} label="The spectrum" />
        <h2 className="text-2xl font-extrabold mt-2 mb-6">Every model is in one of three zones.</h2>

        <div className="space-y-4">
          {/* Underfitting */}
          <div className="rounded-2xl overflow-hidden shadow-soft border border-rose-200/50">
            <div className="bg-gradient-to-r from-rose-500 to-red-500 px-5 py-3 flex items-center gap-3">
              <span className="text-2xl">📉</span>
              <p className="text-white font-extrabold">Underfitting</p>
              <span className="ml-auto text-white/70 text-xs font-semibold">high bias</span>
            </div>
            <div className="p-5 bg-gradient-to-br from-rose-50/80 to-red-50/80">
              <p className="text-sm leading-relaxed text-foreground/80 mb-4">
                The model is <span className="font-semibold">too simple</span> — it hasn't learned
                the pattern at all. Like trying to fit a straight line through data that curves. It
                gets the training set wrong <em>and</em> the test set wrong.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="glass-strong rounded-xl p-3 shadow-soft text-center">
                  <p className="text-xs text-muted-foreground mb-1">Training loss</p>
                  <p className="text-2xl font-black text-rose-500">High</p>
                </div>
                <div className="glass-strong rounded-xl p-3 shadow-soft text-center">
                  <p className="text-xs text-muted-foreground mb-1">Test loss</p>
                  <p className="text-2xl font-black text-rose-500">High</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  "Model too shallow",
                  "Too few features",
                  "Trained too few epochs",
                  "LR too high",
                ].map((t) => (
                  <span
                    key={t}
                    className="text-[11px] px-2 py-1 rounded-full bg-rose-100 text-rose-700 font-semibold"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Just right */}
          <div className="rounded-2xl overflow-hidden shadow-soft border border-emerald-200/50">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-3 flex items-center gap-3">
              <span className="text-2xl">✅</span>
              <p className="text-white font-extrabold">Just Right</p>
              <span className="ml-auto text-white/70 text-xs font-semibold">
                low bias + low variance
              </span>
            </div>
            <div className="p-5 bg-gradient-to-br from-emerald-50/80 to-teal-50/80">
              <p className="text-sm leading-relaxed text-foreground/80 mb-4">
                The model has learned the <span className="font-semibold">actual pattern</span>, not
                the noise. Training loss is low. Test loss is also low and close to training loss.
                This is the goal.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="glass-strong rounded-xl p-3 shadow-soft text-center">
                  <p className="text-xs text-muted-foreground mb-1">Training loss</p>
                  <p className="text-2xl font-black text-emerald-500">Low</p>
                </div>
                <div className="glass-strong rounded-xl p-3 shadow-soft text-center">
                  <p className="text-xs text-muted-foreground mb-1">Test loss</p>
                  <p className="text-2xl font-black text-emerald-500">Low ≈ train</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Right model size", "Enough data", "Good regularisation", "Early stopping"].map(
                  (t) => (
                    <span
                      key={t}
                      className="text-[11px] px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 font-semibold"
                    >
                      {t}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Overfitting */}
          <div className="rounded-2xl overflow-hidden shadow-soft border border-violet-200/50">
            <div className="bg-gradient-to-r from-violet-500 to-purple-500 px-5 py-3 flex items-center gap-3">
              <span className="text-2xl">🧠💥</span>
              <p className="text-white font-extrabold">Overfitting</p>
              <span className="ml-auto text-white/70 text-xs font-semibold">high variance</span>
            </div>
            <div className="p-5 bg-gradient-to-br from-violet-50/80 to-purple-50/80">
              <p className="text-sm leading-relaxed text-foreground/80 mb-4">
                The model is <span className="font-semibold">too complex</span> — it has memorised
                the training data, including random noise and quirks. Performs perfectly on training
                data but falls apart on anything new.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="glass-strong rounded-xl p-3 shadow-soft text-center">
                  <p className="text-xs text-muted-foreground mb-1">Training loss</p>
                  <p className="text-2xl font-black text-emerald-500">Very low</p>
                </div>
                <div className="glass-strong rounded-xl p-3 shadow-soft text-center">
                  <p className="text-xs text-muted-foreground mb-1">Test loss</p>
                  <p className="text-2xl font-black text-violet-500">Much higher</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  "Model too large",
                  "Too little data",
                  "Trained too long",
                  "No regularisation",
                ].map((t) => (
                  <span
                    key={t}
                    className="text-[11px] px-2 py-1 rounded-full bg-violet-100 text-violet-700 font-semibold"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bias-Variance explained */}
      <section>
        <SectionLabel icon={Brain} label="The tradeoff" />
        <h2 className="text-2xl font-extrabold mt-2 mb-3">
          Bias vs variance — what these words actually mean.
        </h2>
        <p className="text-base leading-relaxed text-foreground/80">
          These are the two components of your model's error on unseen data:
        </p>
        <div className="mt-5 space-y-4">
          <div className="glass-strong rounded-2xl p-5 shadow-soft flex gap-4">
            <div className="size-12 shrink-0 rounded-2xl bg-gradient-to-br from-rose-400 to-red-400 grid place-items-center shadow-glow">
              <span className="text-white font-black text-lg">B</span>
            </div>
            <div>
              <p className="font-extrabold text-base">Bias — "systematically wrong"</p>
              <p className="text-sm leading-relaxed text-foreground/70 mt-1">
                High bias = the model makes the same kind of mistake regardless of which training
                data you give it. It has a built-in incorrect assumption. A linear model on
                non-linear data will always be wrong in the same predictable way — that's bias.
              </p>
              <p className="text-xs text-rose-600 font-semibold mt-2">→ Symptom: underfitting</p>
            </div>
          </div>
          <div className="glass-strong rounded-2xl p-5 shadow-soft flex gap-4">
            <div className="size-12 shrink-0 rounded-2xl bg-gradient-to-br from-violet-400 to-purple-400 grid place-items-center shadow-glow">
              <span className="text-white font-black text-lg">V</span>
            </div>
            <div>
              <p className="font-extrabold text-base">Variance — "too sensitive"</p>
              <p className="text-sm leading-relaxed text-foreground/70 mt-1">
                High variance = the model's output changes wildly depending on which training data
                it saw. Train it on a slightly different sample and you get a completely different
                model. It's fitting the noise, not the signal.
              </p>
              <p className="text-xs text-violet-600 font-semibold mt-2">→ Symptom: overfitting</p>
            </div>
          </div>
        </div>
        <div className="mt-4 glass rounded-2xl p-4 flex gap-3 items-start border-l-4 border-emerald-400/60">
          <span className="text-xl shrink-0">💡</span>
          <p className="text-sm leading-relaxed text-foreground/80">
            Total error = Bias² + Variance + irreducible noise. You can't eliminate all three —
            reducing bias tends to increase variance and vice versa. That's the tradeoff.
          </p>
        </div>
      </section>

      {/* The dartboard analogy */}
      <section>
        <SectionLabel icon={Eye} label="The analogy" />
        <h2 className="text-2xl font-extrabold mt-2 mb-4">Think of it as a dartboard.</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              title: "High bias, low variance",
              desc: "Darts all land in the same wrong spot. Consistently wrong.",
              emoji: "🎯❌",
              color: "from-rose-50/90 to-red-50/90",
              border: "border-rose-200/60",
              label: "Underfitting",
              labelColor: "bg-rose-100 text-rose-700",
            },
            {
              title: "Low bias, low variance",
              desc: "Darts all cluster in the bullseye. This is the goal.",
              emoji: "🎯✅",
              color: "from-emerald-50/90 to-teal-50/90",
              border: "border-emerald-200/60",
              label: "Just right",
              labelColor: "bg-emerald-100 text-emerald-700",
            },
            {
              title: "High bias, high variance",
              desc: "Darts scattered AND off-centre. Worst case.",
              emoji: "🎯💥",
              color: "from-orange-50/90 to-amber-50/90",
              border: "border-orange-200/60",
              label: "Both broken",
              labelColor: "bg-orange-100 text-orange-700",
            },
            {
              title: "Low bias, high variance",
              desc: "Darts average to centre but spread widely. Overfitting.",
              emoji: "🎯🌀",
              color: "from-violet-50/90 to-purple-50/90",
              border: "border-violet-200/60",
              label: "Overfitting",
              labelColor: "bg-violet-100 text-violet-700",
            },
          ].map((card) => (
            <div
              key={card.title}
              className={`rounded-2xl p-4 shadow-soft border ${card.border} bg-gradient-to-br ${card.color}`}
            >
              <p className="text-2xl mb-2">{card.emoji}</p>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest ${card.labelColor}`}
              >
                {card.label}
              </span>
              <p className="font-bold text-xs mt-2">{card.title}</p>
              <p className="text-[11px] text-foreground/60 mt-1 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How to fix each */}
      <section>
        <SectionLabel icon={FlaskConical} label="The fixes" />
        <h2 className="text-2xl font-extrabold mt-2 mb-5">
          Diagnosed the problem? Here's what to do.
        </h2>
        <div className="glass-strong rounded-3xl p-5 shadow-soft overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-muted-foreground border-b border-white/20">
                <th className="pb-2 font-bold">Problem</th>
                <th className="pb-2 font-bold">Fix</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  problem: "Underfitting",
                  fixes:
                    "Bigger model · More features · Train longer · Lower regularisation · Better architecture",
                  color: "text-rose-500",
                },
                {
                  problem: "Overfitting",
                  fixes:
                    "More data · Dropout · L1/L2 regularisation · Early stopping · Data augmentation · Simpler model",
                  color: "text-violet-500",
                },
              ].map((r) => (
                <tr key={r.problem} className="border-b border-white/10 last:border-0">
                  <td className={`py-3 font-black text-sm w-32 shrink-0 ${r.color}`}>
                    {r.problem}
                  </td>
                  <td className="py-3 text-foreground/70 text-xs leading-relaxed">{r.fixes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Regularisation quick hits */}
      <section>
        <SectionLabel icon={Gauge} label="Regularisation" />
        <h2 className="text-2xl font-extrabold mt-2 mb-3">The toolkit for fighting overfitting.</h2>
        <div className="space-y-3">
          {[
            {
              name: "Dropout",
              color: "from-violet-400 to-purple-400",
              desc: "Randomly zero out neurons during training. Forces the network not to rely on any single path. Like training 100 slightly different networks at once.",
            },
            {
              name: "L2 regularisation (weight decay)",
              color: "from-indigo-400 to-blue-400",
              desc: "Add a penalty to the loss proportional to the sum of squared weights. Keeps weights small and smooth. Standard in almost every modern model via optimiser weight_decay param.",
            },
            {
              name: "Data augmentation",
              color: "from-teal-400 to-cyan-400",
              desc: "Artificially expand your dataset by flipping, rotating, cropping, colour-jittering images. The model sees more diversity and stops memorising exact training examples.",
            },
            {
              name: "Early stopping",
              color: "from-emerald-400 to-green-400",
              desc: "Monitor validation loss during training. Stop when it starts rising even though training loss keeps falling. That inflection point is where overfitting begins.",
            },
          ].map((item) => (
            <div key={item.name} className="glass-strong rounded-2xl p-5 shadow-soft flex gap-4">
              <div
                className={`size-10 shrink-0 rounded-xl bg-gradient-to-br ${item.color} grid place-items-center shadow-glow`}
              >
                <span className="text-white font-black text-sm">✓</span>
              </div>
              <div>
                <p className="font-extrabold text-sm">{item.name}</p>
                <p className="text-xs text-foreground/65 leading-relaxed mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modern context */}
      <section>
        <SectionLabel icon={TrendingDown} label="Modern twist" />
        <h2 className="text-2xl font-extrabold mt-2 mb-3">
          LLMs broke the classic tradeoff — and nobody fully understands why.
        </h2>
        <p className="text-base leading-relaxed text-foreground/80">
          Classical theory says: bigger model = more overfitting. But GPT-4 has billions of
          parameters, is trained on the entire internet, and{" "}
          <span className="font-semibold text-foreground">generalises surprisingly well</span>. This
          broke the conventional wisdom.
        </p>
        <p className="mt-4 text-base leading-relaxed text-foreground/80">
          The phenomenon is called{" "}
          <span className="font-semibold text-foreground">double descent</span>: as model size grows
          past the interpolation threshold (where it perfectly fits the training data), test error
          starts <em>decreasing again</em> instead of staying high. We're in a new regime where
          scale + data + the right architecture produce generalisation that the bias-variance
          tradeoff alone doesn't predict.
        </p>
        <div className="mt-4 glass rounded-2xl p-4 flex gap-3 items-start border-l-4 border-emerald-400/60">
          <span className="text-xl shrink-0">🔥</span>
          <p className="text-sm leading-relaxed text-foreground/80">
            The classical tradeoff still applies to small/medium models. But for foundation models,
            the rules changed. More parameters + more data is almost always better — until you hit
            compute budget limits.
          </p>
        </div>
      </section>

      {/* Quote */}
      <div className="rounded-3xl p-8 text-center shadow-soft bg-gradient-to-br from-emerald-100/60 via-teal-50/60 to-violet-100/60 border border-emerald-200/40">
        <p className="text-2xl sm:text-3xl font-serif italic leading-snug text-foreground/90">
          "All models are wrong, but some are useful. The goal is to be usefully wrong."
        </p>
        <p className="mt-4 text-sm font-semibold text-foreground/50">— George Box, adapted</p>
      </div>

      <NextSteps
        steps={[
          {
            step: "01",
            label: "Cross-validation (k-fold)",
            note: "The standard way to estimate true generalisation error without burning your test set. Split training data into k folds, train k times.",
          },
          {
            step: "02",
            label: "Dropout (deep dive)",
            note: "Srivastava et al. 2014. The original paper is short and clear. Understand how dropout approximates an ensemble at inference time.",
          },
          {
            step: "03",
            label: "Double descent",
            note: "Belkin et al. 2019 — 'Reconciling modern machine-learning practice and the bias-variance trade-off.' The paper that showed the classical curve has a second dip.",
          },
          {
            step: "04",
            label: "Regularisation in practice",
            note: "L1 vs L2 vs elastic net. When weight decay alone is enough vs needing dropout. Practical rules for CNNs, transformers, and tabular models.",
          },
        ]}
      />
    </div>
  );
}

const articleContent: Record<string, React.FC> = {
  "1": Article1,
  "2": Article2,
  "3": Article3,
  "4": Article4,
  "5": Article5,
  "6": Article6,
  "7": Article7,
  "8": Article8,
  "9": Article9,
  "10": Article10,
  "11": Article11,
};

function ArticlePage() {
  const { postId } = Route.useParams();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const article = articles[postId];
  const Content = articleContent[postId];

  if (!article || !Content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-strong rounded-3xl p-10 text-center shadow-soft max-w-sm mx-4">
          <p className="text-4xl mb-4">📭</p>
          <h2 className="text-xl font-extrabold mb-2">Article not found</h2>
          <p className="text-sm text-muted-foreground mb-6">This one's still being written.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full dream-gradient text-white font-semibold shadow-soft"
          >
            <ArrowLeft className="size-4" /> Back to feed
          </Link>
        </div>
      </div>
    );
  }

  return (
    <ArticleChrome
      liked={liked}
      saved={saved}
      onLike={() => setLiked(!liked)}
      onSave={() => setSaved(!saved)}
    >
      <ArticleHero
        article={article}
        liked={liked}
        saved={saved}
        onLike={() => setLiked(!liked)}
        onSave={() => setSaved(!saved)}
      />
      <Content />
      <div className="max-w-2xl mx-auto px-5 sm:px-8 pb-16">
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full dream-gradient text-white font-semibold shadow-soft hover:opacity-90 transition"
          >
            <ArrowLeft className="size-4" /> Back to feed
          </Link>
        </div>
      </div>
    </ArticleChrome>
  );
}
