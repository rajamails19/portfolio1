export type ReelFrame = {
  bg: string;
  emoji: string;
  headline: string;
  sub: string;
  code?: string;
  duration: number; // seconds
};

export type ReelData = {
  id: string;
  author: string;
  tag: string;
  title: string;
  articleId?: string;
  frames: ReelFrame[];
};

export const reels: Record<string, ReelData> = {
  "1": {
    id: "1",
    author: "lumen.daily",
    tag: "Loss Functions",
    title: "MSE vs Cross-Entropy in 60 seconds",
    articleId: "6",
    frames: [
      {
        bg: "from-purple-950 via-indigo-950 to-black",
        emoji: "🧠",
        headline: 'Your model doesn\'t know what "good" means.',
        sub: "You have to tell it.\nThat's what a loss function does.",
        duration: 5,
      },
      {
        bg: "from-blue-950 via-sky-950 to-black",
        emoji: "📐",
        headline: "MSE — Mean Squared Error",
        sub: "For predicting numbers.\nHouse prices. Temperatures. Ages.",
        code: "L = (1/n) Σ(y − ŷ)²",
        duration: 6,
      },
      {
        bg: "from-violet-950 via-fuchsia-950 to-black",
        emoji: "🎯",
        headline: "Cross-Entropy Loss",
        sub: "For classifying things.\nCat or dog. Spam or not.",
        code: "L = −Σ y × log(ŷ)",
        duration: 6,
      },
      {
        bg: "from-rose-950 via-pink-950 to-black",
        emoji: "⚠️",
        headline: "Pick wrong and your model optimises the wrong thing.",
        sub: "MSE on a classifier = broken gradients.\nCE on regression = nonsense.",
        duration: 6,
      },
      {
        bg: "from-emerald-950 via-teal-950 to-black",
        emoji: "🔥",
        headline: "Wrong AND confident?\nCE destroys you.",
        sub: "−log(0.99) = 0.01  ✅ fine\n−log(0.01) = 4.60  💀 catastrophic",
        duration: 6,
      },
      {
        bg: "from-amber-950 via-orange-950 to-black",
        emoji: "✅",
        headline: "The rule. Forever.",
        sub: "Numbers → MSE\nClasses → Cross-Entropy\nThat's literally it.",
        duration: 5,
      },
    ],
  },
};
