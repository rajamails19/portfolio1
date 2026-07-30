import type { Section } from "./types";

export const theorySection: Section = {
  slug: "theory",
  title: "Conceptual Theory",
  tagline: "Start here — what the AI fuss actually means, in plain language.",
  emoji: "◐",
  gradient: "from-[oklch(0.92_0.08_265)] via-[oklch(0.92_0.09_320)] to-[oklch(0.92_0.08_350)]",
  items: [
    {
      id: "ai-engineering-is-a-team-sport",
      question: "Who actually builds AI? (It is a team sport)",
      tags: ["Foundations", "Big Picture"],
      answer: [
        {
          type: "text",
          content:
            "There are ==hundreds of engineers== working on dozens of different things. Nobody does all of it, and __nobody is expected to__.",
        },
        {
          type: "list",
          items: [
            "Some people are **training models**.",
            "Some are **collecting data**.",
            "Some are **building chatbots**.",
            "Some are **evaluating AI**.",
            "Some are **monitoring production systems**.",
            "Some are **designing prompts**.",
            "Some are **building autonomous agents**.",
          ],
        },
        {
          type: "text",
          content:
            "The important thing is not doing all of it. It is understanding ==how all these pieces fit together==.",
        },
        { type: "heading", content: "Think of it like building a modern car" },
        {
          type: "table",
          headers: ["Role", "Does NOT need to", "But does understand"],
          rows: [
            [
              "**Driver**",
              "Understand how fuel injectors work",
              "How to operate the complete vehicle",
            ],
            ["**Mechanic**", "Design engines", "How to diagnose and repair what breaks"],
            ["**Engine designer**", "Manufacture tires", "How the engine serves the whole car"],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "Every one of them understands how __their piece contributes to the complete vehicle__. **AI Engineering works exactly the same way.**",
        },
      ],
    },
    {
      id: "predictable-software-vs-learned-behaviour",
      question: "How is this different from the software you already know?",
      tags: ["Foundations", "Mental Model"],
      answer: [
        {
          type: "text",
          content:
            "If you have spent years in ==QA or software engineering==, you are used to systems that behave __predictably__.",
        },
        {
          type: "flow",
          title: "Traditional software — the same chain, every single time",
          nodes: [
            { label: "Click a button", sub: "User action", tone: "rose" },
            { label: "Calls an API", sub: "Request", tone: "coral" },
            { label: "Queries a database", sub: "Lookup", tone: "sky" },
            { label: "Returns a record", sub: "Same result", tone: "mint" },
          ],
        },
        {
          type: "text",
          content:
            "Every time you repeat the same action, you expect the same result. That ==predictability== is the foundation of traditional software.",
        },
        { type: "heading", content: "AI changes one important assumption" },
        {
          type: "table",
          headers: ["", "Traditional Software", "Artificial Intelligence"],
          rows: [
            [
              "Behaviour comes from",
              "Every case **explicitly programmed**",
              "Patterns **learned from data**",
            ],
            [
              "You give the computer",
              "Every answer, spelled out",
              "A way to ==discover answers== itself",
            ],
            ["Same input twice", "Same output, reliably", "Output may __vary__"],
          ],
        },
        {
          type: "callout",
          variant: "info",
          content:
            "Instead of explicitly programming every possible behaviour, we allow the system to **learn patterns from data**. Instead of telling the computer every answer, we teach it __how to discover answers__.",
        },
      ],
    },
    {
      id: "the-question-you-ask-changes",
      question: "The question you ask about quality changes",
      tags: ["Foundations", "Evaluation"],
      answer: [
        {
          type: "text",
          content:
            "In traditional testing there is usually ==one expected output==. In AI, the bar moves — and so does the question you ask.",
        },
        {
          type: "table",
          headers: ["", "The question you used to ask", "The question you start asking"],
          rows: [
            [
              "Wording",
              "'Did the application produce the **expected output**?'",
              "'Was this response **reasonable, accurate, helpful, and grounded in evidence**?'",
            ],
            ["Answer shape", "==Pass or fail==", "==A judgement call=="],
          ],
        },
        { type: "heading", content: "What each part actually checks" },
        {
          type: "table",
          headers: ["You ask", "You are checking"],
          rows: [
            ["**Reasonable?**", "Does the response make sense for the question asked"],
            ["**Accurate?**", "Are the facts actually correct"],
            ["**Helpful?**", "Does it solve the real problem the user had"],
            ["**Grounded in evidence?**", "Can it be traced back to a __real source__"],
          ],
        },
        {
          type: "callout",
          variant: "warn",
          content:
            "There may not always be a **single correct answer**. That is not a bug in your testing — it is the nature of the system.",
        },
      ],
    },
    {
      id: "ai-is-not-magic",
      question: "AI Is Not Magic",
      tags: ["Foundations", "Myth-busting"],
      answer: [
        {
          type: "text",
          content:
            "One of the biggest misconceptions about AI is that it somehow ==understands== like a human. It does not.",
        },
        {
          type: "list",
          items: [
            "AI does **not** wake up every morning with ideas.",
            "AI does **not** have curiosity.",
            "AI does **not** suddenly become creative on its own.",
          ],
        },
        {
          type: "text",
          content:
            "Instead, it has seen an ==enormous amount of information== during training. When you ask a question, it __predicts what should come next__ based on everything it has learned.",
        },
        { type: "heading", content: "The library analogy" },
        {
          type: "callout",
          variant: "tip",
          content:
            "Imagine meeting someone who has read **every book in the world's largest library**. When you ask them a question, they do not invent knowledge — they __combine what they have already learned__ to produce the best possible answer.",
        },
        {
          type: "text",
          content:
            "Modern AI does something remarkably similar — but at a **much larger scale** and __much faster__.",
        },
      ],
    },
    {
      id: "journey-of-an-ai-system",
      question: "The Journey of an AI System",
      tags: ["Foundations", "Architecture"],
      answer: [
        {
          type: "text",
          content:
            "Every AI application — whether it is ==ChatGPT, GitHub Copilot, Cursor, or a customer support chatbot== — follows the same broad journey.",
        },
        {
          type: "flow",
          title: "From raw data to a working product",
          nodes: [
            { label: "Data", sub: "Where it begins", tone: "rose" },
            { label: "Training", sub: "Data trains a model", tone: "coral" },
            { label: "The model learns", sub: "Relationships & patterns", tone: "sky" },
            { label: "Engineers build", sub: "Software around the model", tone: "mint" },
          ],
        },
        {
          type: "callout",
          variant: "info",
          content:
            "From a distance, AI looks like **one intelligent application**. Behind the scenes, it is an __entire ecosystem of specialised components__ working together.",
        },
      ],
    },
    {
      id: "certainty-vs-probably-correct",
      question: "Certainty vs. Probably Correct",
      tags: ["Foundations", "Mental Model"],
      answer: [
        {
          type: "text",
          content:
            "Traditional software is built on ==certainty==. If the same inputs are provided, the same outputs should appear every time.",
        },
        {
          type: "text",
          content:
            "AI systems are different. They often produce outputs that are **likely to be correct** rather than __guaranteed to be correct__.",
        },
        { type: "heading", content: "Ask three doctors" },
        {
          type: "callout",
          variant: "tip",
          content:
            "Think about asking **three experienced doctors** for an opinion. All three may recommend slightly different treatments. None of them are necessarily wrong. Each is making a judgment based on ==experience and probabilities==.",
        },
      ],
    },
    {
      id: "what-you-will-learn",
      question: "What you'll learn on this trail",
      tags: ["Foundations", "Roadmap"],
      answer: [
        {
          type: "list",
          items: [
            "You'll learn how machines **learn from data**.",
            "You'll understand why models **make mistakes**.",
            "You'll see why some prompts produce ==brilliant answers== while others fail.",
            "You'll explore how AI **retrieves information**, **remembers conversations**, **calls external tools**, and **collaborates with other agents**.",
          ],
        },
      ],
    },
    {
      id: "fitting-vs-generalizing",
      question: "The central tension: fitting vs. generalizing",
      tags: ["Foundations", "Generalization"],
      answer: [
        {
          type: "text",
          content: "Here's the idea ==almost everything else in ML sits on top of==.",
        },
        {
          type: "callout",
          variant: "warn",
          content:
            "When a model learns from examples, there's a real risk it learns the **wrong lesson** from those examples — it learns the __noise__ instead of the **pattern**.",
        },
      ],
    },
    {
      id: "how-learning-actually-happens",
      question: "How learning actually happens — nudge by nudge",
      tags: ["Foundations", "Training"],
      answer: [
        {
          type: "text",
          content:
            "A model starts out with random, meaningless internal settings — like a ==new employee== who's never seen the job before and is just guessing. You show it an example, it makes a prediction, and that prediction is almost certainly wrong at first. But you can measure **how wrong** — mathematically, as a number.",
        },
        {
          type: "text",
          content:
            "The model then nudges its internal settings slightly in the direction that would have made that particular guess **less wrong**. Do this over millions of examples, ==nudge after nudge after nudge==, and the settings slowly converge toward values that consistently produce good predictions.",
        },
        {
          type: "flow",
          title: "One nudge, repeated millions of times",
          nodes: [
            { label: "Guess", sub: "Almost certainly wrong", tone: "rose" },
            { label: "Measure", sub: "How wrong, as a number", tone: "coral" },
            { label: "Nudge", sub: "Settings shift slightly", tone: "sky" },
            { label: "Repeat", sub: "Millions of examples", tone: "mint" },
          ],
        },
        { type: "heading", content: "The foggy valley" },
        {
          type: "text",
          content:
            "This nudging process is called **gradient descent**, and the useful mental picture is someone trying to walk down into a valley in ==thick fog==, unable to see the bottom, but able to feel which direction the ground slopes beneath their feet at each step. They keep taking small steps downhill, direction by direction, until they can't feel any more downhill slope — that's the model reaching a good (though not necessarily perfect) set of internal settings.",
        },
        {
          type: "callout",
          variant: "info",
          content:
            "The 'learning' isn't insight or reasoning in any human sense — it's this slow, mechanical process of **trial, measured error, and adjustment**, repeated an enormous number of times.",
        },
      ],
    },
    {
      id: "goal-is-generalization",
      question: "The goal: generalization, not memorization",
      tags: ["Foundations", "Evaluation"],
      answer: [
        {
          type: "text",
          content:
            "The goal is never to minimize ==training error== — it's to minimize **generalization error**.",
        },
        {
          type: "table",
          headers: ["", "Model A", "Model B"],
          rows: [
            ["Training score", "99%", "85%"],
            ["Test score", "60%", "85%"],
            ["Verdict", "Memorized — **worse**", "==Generalizes — better=="],
          ],
        },
        {
          type: "callout",
          variant: "warn",
          content:
            "A model that scores **99% on training but 60% on test** is worse than a model scoring **85% on both**. That ==gap between train and test performance== is your first clue to what's going wrong.",
        },
      ],
    },
  ],
};
