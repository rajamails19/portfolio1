import type { Section } from "./types";

export const qansSection: Section = {
  slug: "qans",
  title: "Q & Answers",
  tagline: "Core interview questions with crisp, memorable answers.",
  emoji: "💡",
  gradient: "from-[oklch(0.92_0.09_305)] via-[oklch(0.92_0.08_340)] to-[oklch(0.92_0.08_45)]",
  items: [
    {
      id: "virtual-dom",
      question: "What is the Virtual DOM and why does React use it?",
      tags: ["React", "Fundamentals"],
      difficulty: "Easy",
      answer: [
        {
          type: "text",
          content:
            "The ==Virtual DOM (VDOM)== is an in-memory JavaScript representation of the real DOM. React keeps a lightweight tree of nodes and, on every render, produces a __new tree__ that gets diffed against the previous one.",
        },
        { type: "heading", content: "The render → commit pipeline" },
        {
          type: "flow",
          title: "One React update, end to end",
          nodes: [
            { label: "setState()", sub: "Trigger", tone: "ember" },
            { label: "Render", sub: "Build new VDOM", tone: "gold" },
            { label: "Reconcile", sub: "Diff old vs new", tone: "gold" },
            { label: "Commit", sub: "Minimal DOM ops", tone: "mint" },
            { label: "Paint", sub: "Browser draws", tone: "sky" },
          ],
        },
        {
          type: "list",
          ordered: true,
          items: [
            "You call `setState` or a hook updater — React re-runs the component and builds a **new VDOM tree**.",
            "React diffs the new tree against the previous tree (==reconciliation==).",
            "Only the __minimal set__ of real DOM operations required to match the new tree is committed to the browser.",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "The VDOM isn't magically fast — it's fast because **batched, minimal DOM writes** are cheaper than ad-hoc imperative writes we would otherwise write by hand.",
        },
        { type: "heading", content: "Dig deeper" },
        {
          type: "links",
          items: [
            {
              href: "https://react.dev/learn/preserving-and-resetting-state",
              label: "React docs — Preserving and Resetting State",
              description: "The mental model behind reconciliation with real examples.",
            },
            {
              href: "https://github.com/acdlite/react-fiber-architecture",
              label: "React Fiber Architecture (Andrew Clark)",
              description: "Why Fiber replaced the old stack reconciler.",
            },
          ],
        },
      ],
    },
    {
      id: "useeffect-vs-uselayouteffect",
      question: "useEffect vs useLayoutEffect — when do you reach for which?",
      tags: ["React", "Hooks"],
      difficulty: "Medium",
      answer: [
        {
          type: "text",
          content:
            "Both run side effects after render, but they fire at ==different points== in the commit phase. Picking the wrong one causes either __layout flicker__ or __jank__.",
        },
        {
          type: "flow",
          title: "Where each effect fires in the commit phase",
          nodes: [
            { label: "Render", sub: "Pure computation", tone: "gold" },
            { label: "DOM Mutation", sub: "React writes DOM", tone: "gold" },
            { label: "useLayoutEffect", sub: "Sync — before paint", tone: "ember" },
            { label: "Paint", sub: "Browser draws frame", tone: "sky" },
            { label: "useEffect", sub: "Async — after paint", tone: "mint" },
          ],
        },
        {
          type: "table",
          headers: ["", "useEffect", "useLayoutEffect"],
          rows: [
            ["Timing", "==After paint== (async)", "==Before paint== (sync)"],
            ["Blocks paint?", "No", "**Yes**"],
            [
              "Typical use",
              "Data fetch, subscriptions, logging",
              "Measure DOM, sync layout, prevent flicker",
            ],
            ["SSR", "Safe", "Warns — no DOM to measure"],
          ],
        },
        { type: "heading", content: "Rule of thumb" },
        {
          type: "text",
          content:
            "**Default to `useEffect`.** Reach for `useLayoutEffect` only when you must __read layout__ (`getBoundingClientRect`, scroll position) and __write to the DOM__ before the user sees the frame.",
        },
        {
          type: "code",
          language: "tsx",
          content: `import { useLayoutEffect, useRef, useState } from "react";

function Tooltip({ target }: { target: HTMLElement }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    const rect = target.getBoundingClientRect();
    setPos({ top: rect.bottom + 8, left: rect.left });
  }, [target]);

  return <div ref={ref} style={pos} className="fixed">Hi!</div>;
}`,
        },
        {
          type: "links",
          items: [
            {
              href: "https://react.dev/reference/react/useLayoutEffect",
              label: "React docs — useLayoutEffect",
              description: "Official reference with SSR caveats.",
            },
            {
              href: "https://kentcdodds.com/blog/useeffect-vs-uselayouteffect",
              label: "Kent C. Dodds — useEffect vs useLayoutEffect",
              description: "The canonical explainer.",
            },
          ],
        },
      ],
    },
    {
      id: "keys-in-lists",
      question: "Why do keys matter in React lists?",
      tags: ["React", "Reconciliation"],
      difficulty: "Easy",
      answer: [
        {
          type: "text",
          content:
            "Keys are React's ==identity hint== for children in a list. During reconciliation, React uses them to match old and new elements __instead of comparing by index__.",
        },
        {
          type: "flow",
          title: "How React matches list items",
          direction: "vertical",
          nodes: [
            { label: "New render", sub: "todos.map(...)", tone: "gold" },
            { label: "Match by key", sub: "Same key = same instance", tone: "mint" },
            { label: "Reuse state + DOM", sub: "Only patch what changed", tone: "sky" },
          ],
        },
        {
          type: "list",
          items: [
            "**Stable keys** → React preserves ==component state== and DOM nodes across reorders.",
            "**Index keys** → State can __'stick' to the wrong item__ after insertion, deletion, or sort.",
            "**Missing keys** → Full re-mount of the list on every change (bad perf + lost state).",
          ],
        },
        {
          type: "code",
          language: "tsx",
          content: `// ❌ Loses focus/state when the list reorders
todos.map((t, i) => <TodoRow key={i} todo={t} />)

// ✅ Stable across reorders
todos.map((t) => <TodoRow key={t.id} todo={t} />)`,
        },
        {
          type: "callout",
          variant: "warn",
          content:
            "Never use `Math.random()` as a key — a **new key on every render** forces a full re-mount.",
        },
        {
          type: "link",
          href: "https://react.dev/learn/rendering-lists#why-does-react-need-keys",
          label: "React docs — Why does React need keys?",
        },
      ],
    },
    {
      id: "what-is-machine-learning",
      question: "What is Machine Learning?",
      tags: ["AI/ML", "Fundamentals"],
      difficulty: "Easy",
      answer: [
        {
          type: "text",
          content:
            "Machine Learning is a subset of AI where computers ==learn from data== instead of being explicitly programmed.",
        },
        {
          type: "callout",
          variant: "info",
          content:
            "Machine Learning is a technique where a **model** learns patterns from historical data and uses those patterns to make predictions on new data.",
        },
      ],
    },
    {
      id: "what-is-deep-learning",
      question: "What is Deep Learning?",
      tags: ["AI/ML", "Fundamentals"],
      difficulty: "Easy",
      answer: [
        {
          type: "text",
          content:
            "Deep Learning is ==Machine Learning using neural networks with many layers==. It is especially good for:",
        },
        {
          type: "list",
          items: ["Images", "Speech", "Language", "Video"],
        },
        { type: "heading", content: "Analogy" },
        {
          type: "callout",
          variant: "tip",
          content:
            "Machine Learning is like a **chef**. Deep Learning is like an __entire kitchen staff__ working together — many people (layers) work together before the final dish reaches the customer.",
        },
      ],
    },
    {
      id: "what-is-a-model",
      question: "What is a Model?",
      tags: ["AI/ML", "Fundamentals"],
      difficulty: "Easy",
      answer: [
        {
          type: "text",
          content: "A model is the thing that ==learns from data== and later makes predictions.",
        },
        { type: "heading", content: "Restaurant Analogy" },
        {
          type: "list",
          items: [
            "The chef is the model.",
            "The chef learns recipes.",
            "Later the chef cooks food for new customers.",
          ],
        },
        {
          type: "callout",
          variant: "info",
          content:
            "A model is a **mathematical function** that learns relationships from training data and uses that knowledge to make predictions on unseen data.",
        },
      ],
    },
    {
      id: "training-data-vs-test-data",
      question: "What is Training Data and What is Test Data?",
      tags: ["AI/ML", "Data"],
      difficulty: "Easy",
      answer: [
        {
          type: "table",
          headers: ["", "Training Data", "Test Data"],
          rows: [
            ["Role", "==Teaches== the model", "==Checks== whether the model learned correctly"],
            [
              "Definition",
              "The dataset used by a model to learn patterns during training.",
              "Unseen data used to evaluate how well a trained model generalizes to new examples.",
            ],
          ],
        },
      ],
    },
    {
      id: "overfitting-vs-underfitting",
      question: "What is Overfitting and What is Underfitting?",
      tags: ["AI/ML", "Generalization"],
      difficulty: "Medium",
      answer: [
        { type: "heading", content: "Overfitting" },
        {
          type: "text",
          content:
            "The model **memorizes** the training data instead of learning general patterns.",
        },
        {
          type: "callout",
          variant: "warn",
          content:
            "A student memorizes every answer — the real exam changes the questions, and the student fails. That's overfitting.",
        },
        {
          type: "text",
          content:
            "Formally: when a model learns the training data too closely, __including noise__, causing poor performance on unseen data.",
        },
        { type: "heading", content: "Underfitting" },
        {
          type: "text",
          content: "The model **never learns enough**.",
        },
        {
          type: "callout",
          variant: "warn",
          content: "A student hardly studies and fails the practice test too. That's underfitting.",
        },
        {
          type: "text",
          content:
            "Formally: when a model is too simple to capture the underlying patterns in the data, leading to poor performance on __both training and test datasets__.",
        },
        {
          type: "table",
          headers: ["", "Overfitting", "Underfitting"],
          rows: [
            ["Cause", "Model too complex — memorizes noise", "Model too simple — misses patterns"],
            ["Training performance", "Very good (misleadingly)", "Poor"],
            ["Test performance", "Poor", "Poor"],
          ],
        },
      ],
    },
    {
      id: "what-is-an-llm",
      question: "What is an LLM?",
      tags: ["AI/ML", "GenAI"],
      difficulty: "Easy",
      answer: [
        {
          type: "text",
          content:
            "LLM stands for **Large Language Model** — a deep learning model trained on ==enormous amounts of text== to understand and generate human language.",
        },
        { type: "heading", content: "Examples" },
        {
          type: "list",
          items: ["ChatGPT", "Claude", "Gemini"],
        },
        { type: "heading", content: "Restaurant Analogy" },
        {
          type: "text",
          content:
            'Imagine a chef who has learned recipes from almost every cuisine in the world. Now you ask: "Make me a spicy vegetarian Italian dish." The chef combines everything learned to create a suitable dish.',
        },
      ],
    },
    {
      id: "ai-vs-ml-vs-dl",
      question: "AI vs ML vs DL — What's the difference?",
      tags: ["AI/ML", "Fundamentals"],
      difficulty: "Easy",
      answer: [
        {
          type: "text",
          content:
            "Think of ==Russian nesting dolls==. Each one sits inside the larger one — every DL model is ML, and every ML model is AI, but __not the other way around__.",
        },
        {
          type: "flow",
          title: "Each field nests inside the one before it",
          nodes: [
            { label: "AI", sub: "Any 'smart' machine", tone: "gold" },
            { label: "ML", sub: "Learns from data", tone: "ember" },
            { label: "DL", sub: "Deep neural networks", tone: "mint" },
          ],
        },
        {
          type: "table",
          headers: ["", "AI", "ML", "DL"],
          rows: [
            ["Doll size", "Biggest", "Middle", "Smallest"],
            [
              "What it means",
              "Any machine trying to act **smart**",
              "Machines that **learn patterns from data**",
              "ML using **neural networks with many layers**",
            ],
            [
              "Rules come from",
              "Can be hand-coded `if/else`",
              "Learned from examples",
              "Learned automatically across layers",
            ],
            [
              "Best at",
              "Broad umbrella term",
              "Structured, tabular data",
              "Messy data — images, text, speech",
            ],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "Even a simple **if-else rule engine** counts as AI. That is why 'AI-powered' on a product page tells you __almost nothing__ on its own.",
        },
      ],
    },
    {
      id: "supervised-unsupervised-reinforcement",
      question: "Supervised vs Unsupervised vs Reinforcement Learning",
      tags: ["AI/ML", "Learning Types"],
      difficulty: "Easy",
      answer: [
        {
          type: "text",
          content:
            "Imagine teaching a kid to ==sort fruit==. The three styles differ in __what the kid is given__ to learn from.",
        },
        {
          type: "table",
          headers: ["", "Supervised", "Unsupervised", "Reinforcement"],
          rows: [
            [
              "The fruit lesson",
              "You show **labeled** fruit — 'this is an apple, this is a mango'",
              "You dump **unlabeled** mixed fruit — 'group similar ones together'",
              "The kid sorts, gets **candy for correct** sorts and nothing for wrong",
            ],
            ["Data has labels?", "==Yes==", "==No==", "No — only rewards"],
            [
              "Learns by",
              "Copying known answers",
              "Discovering categories on its own",
              "Trial and reward",
            ],
            [
              "Typical use",
              "Spam detection, price prediction",
              "Customer segmentation, anomaly detection",
              "Game AI, robotics, recommendations",
            ],
          ],
        },
        {
          type: "callout",
          variant: "info",
          content:
            "Most real business problems start as **supervised** — because someone already has a spreadsheet of __past outcomes__ to learn from.",
        },
      ],
    },
    {
      id: "train-validation-test-split",
      question: "Why split data into Train / Validation / Test?",
      tags: ["AI/ML", "Data"],
      difficulty: "Easy",
      answer: [
        {
          type: "text",
          content:
            "Extending the ==student== idea — each split answers a different question, and mixing them up is how you __fool yourself__ into thinking a model is good.",
        },
        {
          type: "flow",
          title: "Three splits, used in order",
          nodes: [
            { label: "Training set", sub: "The textbook", tone: "gold" },
            { label: "Validation set", sub: "Practice quizzes", tone: "ember" },
            { label: "Test set", sub: "Final exam — once", tone: "mint" },
          ],
        },
        {
          type: "table",
          headers: ["Split", "Analogy", "What it is for"],
          rows: [
            ["**Training**", "The textbook they study from", "The model learns patterns here"],
            [
              "**Validation**",
              "Practice quizzes",
              "Tune how the model studies — catch mistakes ==early==",
            ],
            ["**Test**", "The final exam", "Touched ==only once==, at the very end"],
          ],
        },
        {
          type: "callout",
          variant: "warn",
          content:
            "Never tune on the test set. The moment you peek and adjust, it stops being an honest exam — this is called **data leakage**.",
        },
      ],
    },
    {
      id: "bias-variance-tradeoff",
      question: "What is the Bias-Variance Tradeoff?",
      tags: ["AI/ML", "Generalization"],
      difficulty: "Medium",
      answer: [
        {
          type: "text",
          content:
            "Picture a ==dartboard==. Where your darts land tells you __which problem you have__.",
        },
        {
          type: "table",
          headers: ["", "High Bias", "High Variance"],
          rows: [
            [
              "Dartboard",
              "Darts land **far from the bullseye**, but clustered together",
              "Darts **scatter wildly** all over the board",
            ],
            ["Meaning", "Systematically wrong", "Overreacting to noise"],
            ["Maps to", "==Underfitting==", "==Overfitting=="],
            ["Model is", "Too simple", "Too complex"],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "The sweet spot: darts land **close together AND near the bullseye**. Pushing one down usually pushes the other up — which is exactly why it is a __tradeoff__.",
        },
      ],
    },
    {
      id: "what-is-a-loss-function",
      question: "What is a Loss Function?",
      tags: ["AI/ML", "Training"],
      difficulty: "Easy",
      answer: [
        {
          type: "text",
          content:
            "A loss function measures the ==gap between prediction and reality==. The bigger the gap, the __louder the correction signal__ pushing the model to fix itself.",
        },
        {
          type: "flow",
          title: "The correction loop",
          nodes: [
            { label: "Predict", sub: "Model guesses", tone: "gold" },
            { label: "Compare", sub: "Guess vs truth", tone: "ember" },
            { label: "Loss", sub: "How wrong, as a number", tone: "sky" },
            { label: "Adjust", sub: "Nudge the model", tone: "mint" },
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "Think of a **GPS** recalculating: 'you are this far off route.' Every wrong turn produces a bigger signal, and the model steers back toward the correct path.",
        },
      ],
    },
    {
      id: "what-is-gradient-descent",
      question: "What is Gradient Descent?",
      tags: ["AI/ML", "Optimization"],
      difficulty: "Medium",
      answer: [
        {
          type: "text",
          content:
            "You are on a ==foggy mountain at night==, trying to reach the valley (the lowest loss). You cannot see the whole landscape — but you can __feel which direction slopes downward__ under your feet, so you take small steps downhill, repeatedly, until you reach the bottom.",
        },
        { type: "heading", content: "Learning rate — how big your steps are" },
        {
          type: "table",
          headers: ["Learning rate", "What happens on the mountain", "Result"],
          rows: [
            [
              "**Too big**",
              "You overshoot the valley and stumble around",
              "Never settles — loss bounces",
            ],
            ["**Too small**", "You inch downhill forever", "Takes ==far too long== to train"],
            ["**Just right**", "Steady steps toward the bottom", "Converges smoothly"],
          ],
        },
        {
          type: "callout",
          variant: "info",
          content:
            "The slope you feel underfoot is the **gradient** — the direction of steepest increase. __Descent__ simply means stepping the opposite way.",
        },
      ],
    },
    {
      id: "what-is-regularization",
      question: "What is Regularization (L1 / L2)?",
      tags: ["AI/ML", "Regularization"],
      difficulty: "Medium",
      answer: [
        {
          type: "text",
          content:
            "Back to the ==overfitting student== — regularization is the __strict teacher__ who penalizes overly complicated, over-memorized answers, nudging them toward simpler reasoning that actually generalizes.",
        },
        {
          type: "table",
          headers: ["", "L1 (Lasso)", "L2 (Ridge)"],
          rows: [
            [
              "Teacher says",
              "'Just **drop** that irrelevant point completely.'",
              "'**Tone down** all your points, do not rely too heavily on any one.'",
            ],
            [
              "Effect on features",
              "Can ==zero out== unimportant features entirely",
              "Shrinks every feature, ==rarely to zero==",
            ],
            [
              "Good for",
              "Feature selection — a sparser, simpler model",
              "Keeping all features but limiting their influence",
            ],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "Both fight **overfitting** by adding a penalty for complexity. L1 makes the model __shorter__; L2 makes it __calmer__.",
        },
      ],
    },
    {
      id: "precision-recall-f1",
      question: "Precision, Recall, and F1 — What's the difference?",
      tags: ["AI/ML", "Metrics"],
      difficulty: "Medium",
      answer: [
        {
          type: "text",
          content:
            "A village has a ==wolf alarm== system. Precision and recall ask __two different questions__ about how well that alarm works.",
        },
        {
          type: "table",
          headers: ["Metric", "The wolf question", "When it is low"],
          rows: [
            [
              "**Precision**",
              "Of all the times the alarm rang, how often was it a ==real wolf==?",
              "'Boy who cried wolf' — __false alarms everywhere__",
            ],
            [
              "**Recall**",
              "Of all the actual wolf attacks, how many did the alarm ==catch==?",
              "Wolves __sneak past undetected__",
            ],
            [
              "**F1 Score**",
              "The balanced compromise between the two",
              "Neither side is good enough to trust",
            ],
          ],
        },
        {
          type: "callout",
          variant: "warn",
          content:
            "You can get **100% recall** by ringing the alarm constantly, and **100% precision** by only ringing when absolutely certain. F1 exists because chasing __one at the other's expense__ is easy and useless.",
        },
      ],
    },
  ],
};
