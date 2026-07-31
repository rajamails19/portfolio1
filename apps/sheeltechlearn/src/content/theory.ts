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
    {
      id: "what-is-the-computer-doing",
      question: "What exactly is the computer doing?",
      tags: ["Training", "Parameters"],
      answer: [
        {
          type: "text",
          content: "we'll answer a deeper question.",
        },
        {
          type: "text",
          content:
            "Imagine you walk into the office and see a **GPU server training a model**. Millions of numbers are changing every second. You might naturally wonder:",
        },
        {
          type: "callout",
          variant: "info",
          content: "What exactly is the computer doing?",
        },
        {
          type: "list",
          items: [
            "Is it reading books?",
            "Is it memorizing Wikipedia?",
            "Is it downloading knowledge?",
          ],
        },
        {
          type: "text",
          content: "Not really.",
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "What it's actually doing is adjusting **millions—or even billions—of tiny numerical parameters** until it becomes good at making predictions.",
        },
        {
          type: "text",
          content: "That may sound abstract, so let's step away from computers for a moment.",
        },
      ],
    },
    {
      id: "opening-an-indian-restaurant",
      question: "Opening an Indian Restaurant",
      tags: ["Analogy", "Feedback Loop"],
      answer: [
        {
          type: "text",
          content:
            "Suppose you've always wanted to open a restaurant. You're an excellent software engineer, but you've never cooked professionally.",
        },
        {
          type: "text",
          content:
            "On opening day, your first customer orders **Butter Chicken**. You prepare it using a recipe you found online. The customer takes one bite and says,",
        },
        {
          type: "callout",
          variant: "warn",
          content: "It's good... but it's too salty.",
        },
        {
          type: "text",
          content:
            "What do you do? You don't throw away the entire recipe. You simply reduce the salt slightly.",
        },
        {
          type: "text",
          content: "The next customer says,",
        },
        {
          type: "callout",
          variant: "info",
          content: "Better, but now it needs a little more cream.",
        },
        {
          type: "text",
          content: "Again, you don't start over. You make another small adjustment.",
        },
        {
          type: "flow",
          title: "Day after day... Customer after customer... Dish after dish...",
          nodes: [
            { label: "Cook", sub: "Try the recipe", tone: "rose" },
            { label: "Taste", sub: "Hear the feedback", tone: "coral" },
            { label: "Adjust", sub: "Make a tiny change", tone: "sky" },
            { label: "Improve", sub: "Repeat again", tone: "mint" },
          ],
        },
        {
          type: "text",
          content: "Tiny improvements slowly accumulate. Eventually people start saying,",
        },
        {
          type: "callout",
          variant: "tip",
          content: "This is the best Butter Chicken in town.",
        },
        {
          type: "text",
          content:
            "At no point did someone hand you the perfect recipe. You learned through feedback.",
        },
        {
          type: "callout",
          variant: "info",
          content: "That is the essence of **Machine Learning**.",
        },
      ],
    },
    {
      id: "what-is-a-model",
      question: "What Is a Model?",
      tags: ["Models", "Decision-Making"],
      answer: [
        {
          type: "text",
          content:
            "Let's return to our restaurant. People often hear the word model and imagine something mysterious.",
        },
        {
          type: "callout",
          variant: "tip",
          content: "In reality, a model is simply **the thing making decisions**.",
        },
        {
          type: "text",
          content:
            "In our restaurant, that's the chef. Customers don't interact with recipes directly. They interact with the chef's decisions.",
        },
        {
          type: "list",
          items: [
            "Should this dish be spicy?",
            "Should it contain garlic?",
            "Should the sauce be thicker?",
          ],
        },
        {
          type: "text",
          content:
            "The chef combines experience to make those choices. An AI model plays the same role. It receives an input and produces an output based on everything it learned during training.",
        },
        {
          type: "callout",
          variant: "info",
          content:
            "The model isn't the data. It isn't the training process. It's the **decision-maker that emerges after learning**.",
        },
      ],
    },
    {
      id: "where-is-the-knowledge-stored",
      question: "Where Is the Knowledge Stored?",
      tags: ["Weights", "Representation"],
      answer: [
        {
          type: "text",
          content:
            "Now comes an interesting question. If the chef has cooked for ten years, where is that experience stored?",
        },
        {
          type: "list",
          items: ["Not in a notebook.", "Not in a recipe book."],
        },
        {
          type: "text",
          content: "It's stored in thousands of tiny instincts developed over time.",
        },
        {
          type: "list",
          items: [
            "Maybe they instinctively know when onions are perfectly browned.",
            "Maybe they recognize the smell of burnt spices before anyone else.",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content: "Experience becomes internal.",
        },
        {
          type: "text",
          content:
            "AI stores experience in a surprisingly similar way. Instead of instincts, it stores **billions of numerical values called weights**.",
        },
        {
          type: "text",
          content:
            "Weights are simply numbers. But together, they represent everything the model has learned.",
        },
        {
          type: "callout",
          variant: "warn",
          content: "No single weight means, 'This is how to answer questions about cricket.'",
        },
        {
          type: "text",
          content:
            "Instead, knowledge is distributed across an enormous network of numbers working together.",
        },
      ],
    },
    {
      id: "the-goal-isnt-perfection",
      question: "The goal isn't perfection",
      tags: ["Generalization", "Underfitting", "Overfitting"],
      answer: [
        {
          type: "text",
          content:
            "The goal isn't perfection. The goal is producing consistently good results across many different situations.",
        },
        {
          type: "text",
          content:
            "That is why machine learning focuses on **generalization rather than memorization**. A model that memorizes its training data may appear brilliant during practice but perform poorly on real-world problems.",
        },
        {
          type: "callout",
          variant: "info",
          content:
            "Remember this principle: The goal is never to minimize training error—it's to minimize **generalization error**.",
        },
        { type: "heading", content: "A simple analogy:" },
        {
          type: "table",
          headers: ["Learning pattern", "Student analogy"],
          rows: [
            [
              "**Underfitting**",
              "A student who barely studied and performs poorly on both the practice quiz and the final exam.",
            ],
            [
              "**Overfitting**",
              "A student who memorized the exact practice questions but struggles on the final because the questions are different.",
            ],
            [
              "**Good learning**",
              "A student who understands the concepts and performs consistently well on both.",
            ],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content: "That's exactly what AI training aims for.",
        },
      ],
    },
    {
      id: "three-different-classrooms",
      question: "Supervised, unsupervised, and reinforcement — three different classrooms",
      tags: ["Learning Types", "Foundations"],
      answer: [
        {
          type: "text",
          content:
            "Think of these as three completely different teaching setups for the same student.",
        },
        { type: "heading", content: "Supervised learning" },
        {
          type: "text",
          content:
            "Supervised learning is the most common one, and it's like a teacher who gives you a worksheet with the answer key already filled in for practice problems. You study the worked examples — here's the input, here's the correct output — and your job is to get good enough at spotting the pattern that when a new, unlabeled problem shows up, you can produce the right answer yourself.",
        },
        {
          type: "text",
          content:
            "Almost everything you'll build early in your career is supervised: predicting house prices from square footage (that's regression — predicting a number), or predicting whether an email is spam (that's classification — predicting a category).",
        },
        {
          type: "callout",
          variant: "info",
          content:
            'The QA parallel here is almost exact: you\'re training on a labeled bug database where every ticket already says "this was a real bug" or "this was user error," and the model learns to make that same call on new tickets.',
        },
        { type: "heading", content: "Unsupervised learning" },
        {
          type: "text",
          content:
            "Unsupervised learning is the opposite situation — there's no answer key at all. Imagine handing a new employee a giant pile of unsorted customer support tickets with no categories assigned, and asking them to just start noticing which ones seem to cluster together naturally, without telling them in advance what the categories should even be.",
        },
        {
          type: "text",
          content:
            "The model isn't predicting a known right answer — it's finding structure that wasn't labeled for it. This is how customer segmentation works, or anomaly detection — flagging \"this transaction doesn't look like the others\" without ever having been told what fraud looks like beforehand.",
        },
        { type: "heading", content: "Reinforcement learning" },
        {
          type: "text",
          content:
            "Reinforcement learning is a different setup entirely — there's no dataset at all upfront. Instead, imagine training a dog with treats: the model takes an action, gets a reward or penalty based on the outcome, and gradually learns a strategy that maximizes reward over time, purely through trial and consequence.",
        },
        {
          type: "text",
          content:
            "This is how game-playing AI and robotics are often trained, and it's a smaller slice of what you'll likely touch early on, but it's worth knowing it exists as its own category.",
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "Almost every job posting you'll see is asking for supervised learning skill first, so that's rightly where your 90-concept list and study time should be weighted.",
        },
      ],
    },
    {
      id: "features-and-labels",
      question: "What a model is actually looking at: features and labels",
      tags: ["Data", "Data Leakage", "QA"],
      answer: [
        {
          type: "text",
          content:
            "Here's a concept that sounds simple but is worth sitting with, because getting it wrong is the single most common beginner mistake, and it's very QA-adjacent.",
        },
        {
          type: "table",
          headers: ["Concept", "What it means"],
          rows: [
            [
              "**Feature**",
              "One piece of input information the model gets to look at — think of it like one column in a spreadsheet.",
            ],
            [
              "**Label**",
              "The correct answer you're trying to predict — the thing you're asking the model to figure out.",
            ],
          ],
        },
        {
          type: "text",
          content:
            "If you're predicting house prices, the features are square footage, number of bedrooms, location, age of the house — and the label is the actual sale price.",
        },
        { type: "heading", content: "The subtle trap: data leakage" },
        {
          type: "text",
          content:
            "The subtle trap here is something ML engineers call data leakage, and it's basically the ML equivalent of a test environment that accidentally has production data seeded into it, making your tests pass for the wrong reasons.",
        },
        {
          type: "text",
          content:
            'Data leakage happens when one of your features accidentally contains information that wouldn\'t actually be available at prediction time — for instance, if you\'re predicting whether a loan will default, and one of your "features" is actually "was this loan sent to collections," that\'s cheating, because that fact only exists after the default already happened.',
        },
        {
          type: "callout",
          variant: "warn",
          content:
            "Your model will look breathtakingly accurate in testing and then fail completely in the real world, because it learned to peek at the answer instead of learning the actual pattern.",
        },
        {
          type: "callout",
          variant: "tip",
          content:
            'Catching this kind of thing is exactly the instinct a QA background gives you — you\'re used to asking "wait, how would this actually behave in the real environment, not just in this convenient test setup?"',
        },
      ],
    },
    {
      id: "classification-vs-regression",
      question: "Classification vs. regression — the two most common jobs you'll be asked to do",
      tags: ["Classification", "Regression", "Evaluation"],
      answer: [
        {
          type: "text",
          content:
            "It's worth being precise about this distinction early, because people mix up the vocabulary constantly.",
        },
        {
          type: "table",
          headers: ["Job", "What you predict", "Examples"],
          rows: [
            [
              "**Regression**",
              "A continuous number — there's no fixed set of possible answers; it could be any value on a scale.",
              "A price, a temperature, a probability, a duration.",
            ],
            [
              "**Classification**",
              "A category from a fixed, known set of choices — the possible answers are a closed list, not an open range.",
              "Spam or not spam, cat or dog, approve or deny.",
            ],
          ],
        },
        {
          type: "text",
          content:
            "Even when there are many categories, the key trait is that the possible answers are a closed list, not an open range.",
        },
        {
          type: "callout",
          variant: "info",
          content:
            "The reason this distinction matters so much is that it decides your entire evaluation toolkit.",
        },
        {
          type: "text",
          content:
            'You can\'t use "accuracy" to judge a regression model predicting house prices — there\'s no such thing as "exactly right" when predicting a continuous number, so you instead measure how far off the prediction was, on average, across all your test cases.',
        },
        {
          type: "text",
          content:
            "Meanwhile, for classification, you're back in the wolf-and-village world from yesterday — false alarms versus missed detections — because there genuinely are discrete right and wrong categories to be right or wrong about.",
        },
      ],
    },
    {
      id: "how-can-a-machine-understand-language",
      question: "How Can a Machine Understand Language?",
      tags: ["Language", "Tokens", "Foundations"],
      answer: [
        {
          type: "text",
          content:
            'Imagine I type this into ChatGPT. "Tell me a joke." Within seconds it replies. Now imagine I ask, "Explain Quantum Physics to a ten-year-old." Again, it answers.',
        },
        {
          type: "callout",
          variant: "info",
          content: "How is that possible?",
        },
        {
          type: "text",
          content: "Inside the computer there are only two things.",
        },
        {
          type: "list",
          items: ["Electricity", "0", "1"],
        },
        {
          type: "text",
          content: "That's it. No English. No Spanish. No Java.",
        },
        { type: "heading", content: "Break Everything Into Pieces" },
        {
          type: "text",
          content:
            "Suppose I give you a giant pizza. Would you eat it whole? Of course not. You slice it. Language works the same way.",
        },
        {
          type: "text",
          content:
            "Instead of processing an entire sentence at once... AI cuts it into smaller pieces. These pieces are called Tokens.",
        },
        {
          type: "callout",
          variant: "tip",
          content: "Notice... Not necessarily words. Tokens.",
        },
      ],
    },
    {
      id: "why-not-simply-use-words",
      question: "Why Not Simply Use Words?",
      tags: ["Tokenization", "LEGO Analogy"],
      answer: [
        {
          type: "text",
          content: "Great question. Imagine creating a dictionary.",
        },
        {
          type: "text",
          content: "English has hundreds of thousands of words. Now add:",
        },
        {
          type: "list",
          items: [
            "French.",
            "Spanish.",
            "Hindi.",
            "Japanese.",
            "Chinese.",
            "Programming languages.",
            "Medical terminology.",
            "Company names.",
            "Product names.",
            "New slang every week.",
          ],
        },
        {
          type: "callout",
          variant: "warn",
          content: "The dictionary would never stop growing.",
        },
        {
          type: "text",
          content: "Instead... AI learns smaller building blocks. Very similar to Lego bricks.",
        },
        {
          type: "table",
          headers: ["With enough Lego pieces...", "With enough tokens..."],
          rows: [
            ["You can build a house.", "AI can represent almost any sentence."],
            ["You can build a car.", "AI can represent almost any sentence."],
            ["You can build a castle.", "AI can represent almost any sentence."],
            ["You can build a spaceship.", "AI can represent almost any sentence."],
          ],
        },
        { type: "heading", content: "Tokens Are Like LEGO Pieces" },
        {
          type: "text",
          content:
            "Imagine your child has a LEGO box. The box doesn't contain Hospital, Airport, Police Station. Instead it contains small blocks.",
        },
        {
          type: "text",
          content:
            "Those tiny blocks combine into thousands of creations. Tokens are exactly the same. Instead of memorizing every possible sentence... AI learns reusable language pieces. That's far more efficient.",
        },
      ],
    },
    {
      id: "embedding-space",
      question: "But Tokens Still Don't Mean Anything",
      tags: ["Embeddings", "Meaning", "Representation"],
      answer: [
        {
          type: "text",
          content:
            "Suppose I give you three words: Dog, Cat, Car. To a computer... Initially... All three are equally meaningless. Just labels.",
        },
        {
          type: "list",
          items: [
            'Should "Dog" live next to "Car"? Probably not.',
            'Should "Doctor" live near "Hospital"? Absolutely.',
            'Should "Pizza" live near "Restaurant"? Definitely.',
          ],
        },
        {
          type: "text",
          content:
            "Slowly... A beautiful city begins to emerge. Related concepts naturally become neighbors. Unrelated concepts end up on opposite sides of town.",
        },
        {
          type: "callout",
          variant: "tip",
          content: "That city is called an **Embedding Space**.",
        },
        {
          type: "text",
          content:
            "An embedding is simply a numerical representation of meaning. Not spelling. Not pronunciation. Meaning.",
        },
        {
          type: "text",
          content:
            "Think of every word, sentence, paragraph, image, or even an entire document as being assigned a location in a huge multi-dimensional map.",
        },
        {
          type: "callout",
          variant: "info",
          content:
            "Things with similar meanings end up close together. Things with different meanings end up farther apart.",
        },
      ],
    },
    {
      id: "semantic-similarity",
      question: "Semantic similarity rather than exact wording",
      tags: ["Semantic Search", "Retrieval", "Embeddings"],
      answer: [
        {
          type: "text",
          content: 'Suppose someone asks, "Where can I adopt a puppy?"',
        },
        {
          type: "text",
          content: "Your company knowledge base contains: Local dog shelters.",
        },
        {
          type: "text",
          content:
            "Notice something. The question never used dog shelters. The document never used adopt puppy. Yet AI still finds the right document.",
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "Why? Because puppy, dog, adoption, and pet shelter all live close together in embedding space.",
        },
        {
          type: "text",
          content:
            "This ability to understand semantic similarity rather than exact wording is what makes modern AI systems feel intelligent.",
        },
        { type: "heading", content: "Why This Changed Everything" },
        {
          type: "text",
          content:
            "Before embeddings, search engines mostly relied on keywords. If your document contained the exact word you searched for, you had a good chance of finding it. If it didn't, you might miss the relevant information entirely.",
        },
        {
          type: "text",
          content:
            "Embeddings transformed this. Now systems can retrieve information based on meaning rather than literal word matches.",
        },
        {
          type: "callout",
          variant: "info",
          content:
            'That\'s why asking: "How do I reset my password?" can still find a document titled: "Account credential recovery." Different words. Same intent.',
        },
      ],
    },
    {
      id: "why-engineers-need-embeddings",
      question: "Why Every AI Engineer Needs to Understand Embeddings",
      tags: ["Embeddings", "RAG", "Vector Database"],
      answer: [
        {
          type: "text",
          content:
            "AI doesn't experience language the way humans do. It doesn't have memories, emotions, or consciousness tied to words.",
        },
        {
          type: "text",
          content:
            "What it does have is an extraordinarily sophisticated statistical representation of relationships between concepts. For engineering purposes, that's often enough to solve remarkably complex problems.",
        },
        {
          type: "text",
          content: "You will hear this word constantly:",
        },
        {
          type: "list",
          items: [
            "Vector Database",
            "Similarity Search",
            "RAG",
            "Semantic Search",
            "Recommendation Systems",
            "Memory",
            "Retrieval",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "At the heart of all of them is one idea: Represent information as embeddings, then compare those embeddings to find related meaning.",
        },
        {
          type: "callout",
          variant: "info",
          content:
            'Once you understand embeddings, many "advanced" AI concepts suddenly become much easier to grasp.',
        },
      ],
    },
    {
      id: "bias-and-variance",
      question: "Bias and variance — two different kinds of wrong",
      tags: ["Bias", "Variance", "Evaluation"],
      answer: [
        {
          type: "text",
          content:
            "Imagine four different archers shooting at a target, and you're watching where their arrows land.",
        },
        { type: "heading", content: "High bias" },
        {
          type: "text",
          content:
            "One archer's arrows all cluster tightly together, but way off to the left of the bullseye — consistent, but consistently wrong. That's high bias: the model has a systematic, repeated error because it's too simple to capture what's actually going on. It's making the same kind of mistake over and over, no matter what data you give it.",
        },
        {
          type: "callout",
          variant: "warn",
          content:
            "This is the underfitting archer — think of a model trying to predict house prices using only \"number of bedrooms\" and ignoring everything else. It'll be wrong in the same direction again and again, because it's missing too much information to ever get close.",
        },
        { type: "heading", content: "High variance" },
        {
          type: "text",
          content:
            "A second archer's arrows are scattered wildly all over the target — sometimes near the bullseye, sometimes far in any direction, no consistent pattern. That's high variance: the model is too sensitive to the specific data it was trained on. Show it a slightly different training set, and it produces a wildly different model.",
        },
        {
          type: "callout",
          variant: "warn",
          content:
            "This is your overfitting student from Day 1 — the one who memorized the practice quiz's exact wording. Change the practice quiz even slightly, and their performance swings wildly, because they never learned anything stable.",
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "The best archer's arrows cluster tightly, right around the bullseye — that's what you're actually chasing: low bias and low variance at once.",
        },
      ],
    },
    {
      id: "bias-variance-tradeoff",
      question: "The uncomfortable truth: bias and variance trade off",
      tags: ["Tradeoff", "Model Selection"],
      answer: [
        {
          type: "text",
          content:
            "The uncomfortable truth of ML, though, is that these two things trade off against each other.",
        },
        {
          type: "text",
          content:
            "Make a model simpler to reduce its wild variance, and you usually push it toward more consistent bias.",
        },
        {
          type: "text",
          content:
            "Make it more complex to capture more nuance and reduce bias, and it usually becomes more sensitive to the noise in whatever data it happened to see, increasing variance.",
        },
        {
          type: "callout",
          variant: "info",
          content:
            'Almost every technique you\'ll learn in ML is, underneath, a tool for walking this tightrope — and every single "which model should I use" decision quietly involves this tradeoff whether people say so out loud or not.',
        },
      ],
    },
    {
      id: "regularization",
      question: "Regularization — deliberately handicapping the model so it doesn't cheat",
      tags: ["Regularization", "L1", "L2"],
      answer: [
        {
          type: "text",
          content:
            'Once you understand overfitting as "the model latched onto noise instead of signal," the fix becomes intuitive: you need some way to actively discourage the model from getting too clever, too confident, too complex.',
        },
        {
          type: "callout",
          variant: "info",
          content:
            "Regularization is exactly this — a deliberate penalty added during training that punishes the model for becoming overly complex or overly confident in any single feature, even if that complexity temporarily makes it look better on the training data.",
        },
        {
          type: "table",
          headers: ["Regularization", "What it does", "Manager analogy"],
          rows: [
            [
              "**L2**",
              "Gently shrinks all the model's internal weights toward zero, spreading influence more evenly and discouraging any single feature from dominating.",
              "A manager who insists no one team gets to hoard all the credit, so decisions stay balanced across the whole group.",
            ],
            [
              "**L1**",
              "More aggressive — it can push some weights all the way to exactly zero, effectively deciding certain features don't matter at all and cutting them out entirely.",
              'A manager who looks at a bloated process and says "we don\'t need this step at all," removing it rather than just diluting it.',
            ],
          ],
        },
      ],
    },
    {
      id: "train-validation-test-splits",
      question: "How you actually catch this in practice: train/validation/test splits",
      tags: ["Training Set", "Validation Set", "Test Set"],
      answer: [
        {
          type: "text",
          content:
            "You never train and evaluate on the same data — we touched on this on Day 1 — but in practice, you actually need three separate pools, not two.",
        },
        {
          type: "table",
          headers: ["Pool", "How it is used"],
          rows: [
            ["**Training set**", "What the model directly learns from."],
            [
              "**Validation set**",
              'A separate pool you use while building, to make decisions like "should I add more regularization?" or "is this model or that one better?" — it\'s your internal testing environment, used repeatedly during development.',
            ],
            [
              "**Test set**",
              "The one you touch only once, right at the very end, to get an honest, final read on how the model will perform in the real world — the equivalent of a final UAT sign-off that you don't want contaminated by earlier rounds of tweaking.",
            ],
          ],
        },
        {
          type: "callout",
          variant: "warn",
          content:
            "The test set stays untouched specifically so you always have one clean, honest measurement left, no matter how much tuning happened before it.",
        },
        { type: "heading", content: "Cross-validation" },
        {
          type: "text",
          content:
            "When you don't have a lot of data to spare for a validation set, there's a technique called cross-validation — instead of carving out one fixed validation slice, you rotate through the data, using a different slice as validation each time and averaging the results.",
        },
      ],
    },
  ],
};
