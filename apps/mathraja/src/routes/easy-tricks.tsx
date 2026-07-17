import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site-layout";

const TRICK_SECTIONS = [
  {
    title: "Multiplication Shortcuts",
    intro: "Use friendly numbers first, then fix the extra part.",
    tricks: [
      {
        name: "Close to 10, 20, 50, or 100",
        idea: "Round one number to an easier neighbor, multiply, then subtract or add the difference.",
        example: "18 x 19 = 18 x 20 - 18 = 360 - 18 = 342",
        tryIt: "Try: 24 x 29",
      },
      {
        name: "Double, then double again",
        idea: "Multiplying by 4 is just doubling twice.",
        example: "23 x 4 = 46 x 2 = 92",
        tryIt: "Try: 37 x 4",
      },
      {
        name: "Half, then times 10",
        idea: "To multiply by 5, multiply by 10 and take half.",
        example: "48 x 5 = 480 ÷ 2 = 240",
        tryIt: "Try: 86 x 5",
      },
      {
        name: "Times 9 is times 10 minus one group",
        idea: "Nine groups are almost ten groups.",
        example: "34 x 9 = 34 x 10 - 34 = 340 - 34 = 306",
        tryIt: "Try: 27 x 9",
      },
    ],
  },
  {
    title: "Number Sense Tricks",
    intro: "Break numbers into pieces your brain likes.",
    tricks: [
      {
        name: "Split and multiply",
        idea: "Break the bigger number into tens and ones.",
        example: "16 x 7 = 10 x 7 + 6 x 7 = 70 + 42 = 112",
        tryIt: "Try: 18 x 6",
      },
      {
        name: "Make a ten",
        idea: "Move a little from one number to another so addition becomes easier.",
        example: "38 + 27 = 40 + 25 = 65",
        tryIt: "Try: 49 + 36",
      },
      {
        name: "Subtract by adding up",
        idea: "For subtraction, count the jump from the smaller number to the bigger number.",
        example: "92 - 67: 67 to 70 is 3, 70 to 92 is 22, so 25",
        tryIt: "Try: 84 - 58",
      },
      {
        name: "Same difference",
        idea: "Add or subtract the same amount from both numbers to make subtraction friendlier.",
        example: "73 - 39 = 74 - 40 = 34",
        tryIt: "Try: 96 - 48",
      },
    ],
  },
  {
    title: "Fast Patterns",
    intro: "Some number patterns save a lot of scratch work.",
    tricks: [
      {
        name: "Multiply by 11",
        idea: "For a two-digit number, add the digits and place the sum in the middle.",
        example: "32 x 11: 3 + 2 = 5, so 352",
        tryIt: "Try: 45 x 11",
      },
      {
        name: "Square numbers ending in 5",
        idea: "Multiply the first digit by the next number, then add 25.",
        example: "35 x 35: 3 x 4 = 12, so 1225",
        tryIt: "Try: 65 x 65",
      },
      {
        name: "Near 100",
        idea: "For numbers close to 100, use how far each number is from 100.",
        example: "98 x 97: 98 - 3 = 95, and 2 x 3 = 6, so 9506",
        tryIt: "Try: 96 x 98",
      },
      {
        name: "Even number times 15",
        idea: "Times 15 means times 10 plus half of that again.",
        example: "28 x 15 = 280 + 140 = 420",
        tryIt: "Try: 46 x 15",
      },
    ],
  },
];

export const Route = createFileRoute("/easy-tricks")({
  head: () => ({
    meta: [
      { title: "Easy Math Tricks — MathDreams" },
      {
        name: "description",
        content: "Simple mental math tricks for kids, with friendly examples and quick practice prompts.",
      },
    ],
  }),
  component: EasyTricksPage,
});

function EasyTricksPage() {
  return (
    <PageShell
      eyebrow="Easy-Tricks"
      title="Tiny tricks for faster math"
      subtitle="Friendly shortcuts for multiplication, addition, and subtraction. Learn the pattern, see one example, then try one yourself."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {TRICK_SECTIONS.map((section) => (
          <section key={section.title} className="glass rounded-3xl p-6 shadow-soft">
            <div className="mb-5">
              <h2 className="font-display text-2xl font-bold text-gradient">{section.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{section.intro}</p>
            </div>
            <div className="space-y-3">
              {section.tricks.map((trick) => (
                <article key={trick.name} className="rounded-2xl bg-white/70 p-4 transition hover:bg-white">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-lg font-bold text-foreground">{trick.name}</h3>
                    <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-bold uppercase tracking-wide text-primary">
                      trick
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-foreground/75">{trick.idea}</p>
                  <div className="mt-3 rounded-2xl bg-primary/10 px-3 py-2 font-mono text-sm font-bold text-primary">
                    {trick.example}
                  </div>
                  <p className="mt-3 text-xs font-semibold text-accent">{trick.tryIt}</p>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="glass mt-10 rounded-3xl p-8 shadow-soft">
        <h2 className="font-display text-2xl font-bold text-gradient">
          Zog's rule for every shortcut
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {[
            {
              n: "1",
              t: "Make it friendly",
              d: "Round, split, double, or turn the number into something your brain likes.",
            },
            {
              n: "2",
              t: "Do the easy math",
              d: "Use tens, halves, doubles, or near-number patterns to move quickly.",
            },
            {
              n: "3",
              t: "Fix the difference",
              d: "Add back or subtract away anything you changed at the start.",
            },
          ].map((step) => (
            <div key={step.n} className="rounded-2xl bg-white/70 p-5">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-lg font-bold text-primary-foreground">
                {step.n}
              </div>
              <div className="mt-2 font-display text-lg font-bold">{step.t}</div>
              <p className="mt-1 text-sm text-foreground/70">{step.d}</p>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
