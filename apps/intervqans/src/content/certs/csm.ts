import type { Block, QAItem } from "../types";
import { certStudyCards, type CertStudyInput } from "./cert-cards";

const objectives = (title: string, items: string[]) => ({
  title,
  content: [{ type: "list" as const, items }],
});

/* ───────────────────────── Card 1 · official page ───────────────────────── */

const linkAnswer: Block[] = [
  {
    type: "text",
    content:
      "Entry-level Scrum Alliance certification: foundational knowledge of the Scrum framework, team accountabilities, events and artifacts. **No formal prerequisites.**",
  },
  {
    type: "table",
    headers: ["Item", "Detail"],
    rows: [
      ["Course", "16 hours of live instruction (usually 2–3 days) with a Scrum Alliance Certified Scrum Trainer"],
      ["Exam", "50 multiple-choice questions · 1 hour"],
      ["Passing score", "37 of 50 correct (74%)"],
      ["Attempts", "2 included, within 90 days of course completion"],
      ["Cost", "$250–$2,495 USD — varies by region, format and trainer"],
      ["Renewal", "Every 2 years, by earning Scrum Education Units (SEUs)"],
    ],
  },
  {
    type: "links",
    items: [
      {
        href: "https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster",
        label: "Certified ScrumMaster (CSM) — official page",
        description: "Course details, pricing and how to find a class",
      },
      {
        href: "https://assets.scrumalliance.org/media/certifications/los/csm_learning_objectives_2022.pdf",
        label: "CSM Learning Objectives (PDF)",
        description: "What every CSM course must cover — the exam blueprint",
      },
      {
        href: "https://assets.scrumalliance.org/media/certifications/los/scrum_foundations_learning_objectives_2022.pdf",
        label: "Scrum Foundations Learning Objectives (PDF)",
        description: "Prerequisite objectives covered before or during the course",
      },
      {
        href: "https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-US.pdf",
        label: "The 2020 Scrum Guide (PDF)",
        description: "The primary reference the exam is built on",
      },
      {
        href: "https://support.scrumalliance.org/hc/en-us/articles/208753776-What-to-expect-from-the-Certified-ScrumMaster-CSM-test",
        label: "What to expect from the CSM test",
        description: "Scrum Alliance help-center article",
      },
    ],
  },
  {
    type: "callout",
    variant: "tip",
    content:
      "The exam tests the **2020 Scrum Guide** plus the CSM learning objectives. You take the live course __first__ — Scrum Alliance then emails the exam link.",
  },
];

/* ───────────────────────── Card 2 · syllabus ───────────────────────── */

const syllabusAnswer: Block[] = [
  {
    type: "callout",
    variant: "info",
    content:
      "Scrum Alliance publishes learning objectives, not per-topic exam weightings. Every CSM course covers the **Scrum Foundations** objectives (before or during) plus the **CSM** objectives.",
  },
  {
    type: "accordion",
    items: [
      {
        title: "Scrum Foundations objectives",
        badge: "4 areas",
        content: [
          {
            type: "accordion",
            items: [
              objectives("1. Scrum Theory", [
                "Define Scrum",
                "List the five Scrum values",
                "Define empiricism",
                "List the three empirical Scrum pillars",
                "List at least three benefits of an iterative and incremental approach",
                "Describe at least two disadvantages of implementing Scrum only partially",
                "Describe how Scrum is aligned with the values and principles of the Manifesto for Agile Software Development",
              ]),
              objectives("2. The Scrum Team", [
                "Illustrate how the Product Owner, Developers and Scrum Master interact to deliver Increments within a Sprint",
                "Identify at least three benefits of a cross-functional, self-managing Scrum Team",
              ]),
              objectives("3. Scrum Events and Activities", [
                "Explain at least three benefits of using a timebox",
                "Define the purpose and maximum duration of a Sprint",
                "Explain how to determine a suitable Sprint duration",
                "Define Sprint Planning, Daily Scrum, Sprint Review and Sprint Retrospective — purpose, participants, sequence and maximum recommended timebox",
                "List at least three activities that may occur as part of Product Backlog refinement",
                "Repeat at least two reasons why the Scrum Team dedicates time to Product Backlog refinement",
              ]),
              objectives("4. Scrum Artifacts and Commitments", [
                "Define the purpose of, and at least three attributes of, the Product Backlog, Sprint Backlog and Increment",
                "Explain why the Product Backlog is an emergent list of what is needed to improve the product",
                "List at least three attributes of a Product Backlog item",
                "Discuss how the Sprint Backlog can change without endangering the Sprint Goal",
                "Explain how multiple Increments may be created during a Sprint",
                "Describe how the Product Goal, Sprint Goal and Definition of Done are the commitments for the three artifacts",
                "Describe why the Sprint Goal does not change during a Sprint",
                "Explain how the Definition of Done evolves over time",
                "Identify at least two reasons why multiple teams on the same Product Backlog share a consistent Definition of Done",
              ]),
            ],
          },
        ],
      },
      {
        title: "CSM objectives",
        badge: "3 areas",
        content: [
          {
            type: "accordion",
            items: [
              objectives("1. Scrum — The Scrum Team", [
                "Describe the responsibilities and accountabilities of the Scrum Team",
                "Describe the responsibilities and accountabilities of the Scrum Master",
                "Describe the responsibilities and accountabilities of the Developers",
                "Describe the responsibilities and accountabilities of the Product Owner",
                "Discuss at least two reasons why the Product Owner is a single person and neither a group nor a committee",
                "Discuss how and why the Product Owner maintains authority over the Product Backlog while working collaboratively with Developers and stakeholders",
              ]),
              objectives("1. Scrum — Events and Activities", [
                "Identify at least one example of how a Scrum Team could inspect and adapt to increase transparency at each Scrum event",
                "Perform a Sprint Planning",
                "Perform a Sprint Review",
                "Perform a Sprint Retrospective",
                "Describe at least three possible effects of skipping the Sprint Retrospective",
                "Explain how Developers conduct a Daily Scrum",
                "Discuss at least three ways the Daily Scrum differs from a status meeting, and why its constraints support the Developers",
                "Explain under what conditions a Sprint could be terminated prematurely",
                "Explain at least three advantages of a strong Definition of Done",
                "Outline at least one way to create a Definition of Done",
              ]),
              objectives("2. Scrum Master Core Competencies", [
                "Describe at least three situations in which the Scrum Master could serve the Scrum Team or organization through facilitation",
                "Demonstrate at least three techniques for facilitating group decision making",
                "Discuss how facilitating, teaching, mentoring and coaching are different",
              ]),
              objectives("3. Service to the Scrum Team, Product Owner, and Organization", [
                "Describe three scenarios where the Scrum Master acts as a leader for the Scrum Team",
                "Explain the impact of accumulating technical debt",
                "List at least three development practices that help a team deliver a high-quality Increment and reduce technical debt each Sprint",
                "Explain at least three ways the Scrum Master could support the Product Owner",
                "Describe at least three organizational impediments that can affect Scrum Teams",
                "Discuss at least two ways the Scrum Master assists the Scrum Team with impediments",
                "Apply at least one technique that could help resolve an impediment",
                "Summarize at least one organizational design change caused by adopting Scrum",
                "Discuss why Scrum does not have a project manager",
              ]),
            ],
          },
        ],
      },
    ],
  },
];

/* ───────────────────────── Cards 3 & 4 · concepts + quiz ───────────────────────── */

const csm: CertStudyInput = {
  code: "CSM",
  examName: "Certified ScrumMaster (CSM)",

  concepts: [
    {
      title: "Scrum in one page: empiricism, lean & the three pillars",
      domain: "Foundations · Theory",
      oneLiner:
        "Scrum is a lightweight framework that helps people, teams and organizations generate value through adaptive solutions for complex problems.",
      visual: {
        type: "flow",
        title: "The empirical pillars",
        direction: "horizontal",
        nodes: [
          { label: "Transparency", sub: "work is visible", tone: "sky" },
          { label: "Inspection", sub: "check progress often", tone: "gold" },
          { label: "Adaptation", sub: "adjust as soon as possible", tone: "mint" },
        ],
      },
      points: [
        "Founded on **empiricism** (knowledge comes from experience and observation) and **lean thinking** (cut waste, focus on essentials)",
        "**Iterative and incremental** to optimize predictability and control risk",
        "Each pillar enables the next: __inspection without transparency is misleading__; __inspection without adaptation is pointless__",
        "Scrum is **purposefully incomplete** — it defines only what’s needed to implement the theory, and is built on by the people using it",
        "Partial Scrum isn’t Scrum: leaving out elements hides problems and limits the benefits",
      ],
      examTip: "“Which pillar is missing?” — decisions made on hidden or stale information ⇒ **transparency**.",
    },
    {
      title: "Scrum values & the Agile Manifesto",
      domain: "Foundations · Theory",
      oneLiner: "Five values give the team direction; the Agile Manifesto is the philosophy Scrum is aligned with.",
      visual: {
        type: "table",
        headers: ["Scrum value", "In practice"],
        rows: [
          ["Commitment", "The team commits to its goals and to supporting each other"],
          ["Focus", "Primary focus is the work of the Sprint, toward the goals"],
          ["Openness", "Team and stakeholders are open about the work and challenges"],
          ["Respect", "Members respect each other as capable, independent people"],
          ["Courage", "Doing the right thing and tackling tough problems"],
        ],
      },
      points: [
        "Manifesto values: **individuals and interactions** over processes and tools · **working software** over comprehensive documentation · **customer collaboration** over contract negotiation · **responding to change** over following a plan",
        "The items on the right still have value — the ones on the left are valued **more**",
        "Behind the four values sit **12 principles**",
        "Scrum events and artifacts are how the values are learned and lived",
      ],
      examTip: "Team hides a problem to look good ⇒ violates **openness** (and courage).",
    },
    {
      title: "The Scrum Team: three accountabilities",
      domain: "Foundations · Team",
      oneLiner:
        "One small, cross-functional, self-managing team — with no sub-teams or hierarchy — accountable for a valuable, useful Increment every Sprint.",
      visual: {
        type: "table",
        headers: ["Accountability", "Accountable for"],
        rows: [
          ["Developers", "Creating the Sprint Backlog plan · instilling quality through the Definition of Done · adapting the plan daily toward the Sprint Goal · holding each other accountable as professionals"],
          ["Product Owner", "Maximizing the value of the product · effective Product Backlog management (Product Goal, clear items, ordering, transparency)"],
          ["Scrum Master", "Establishing Scrum as defined in the Guide · the Scrum Team’s effectiveness"],
        ],
      },
      points: [
        "**Cross-functional** = has all skills needed to create value each Sprint; **self-managing** = decides internally who does what, when and how",
        "Typically **10 or fewer** people; too large ⇒ split into several Scrum Teams sharing the same Product Goal, Product Backlog and Product Owner",
        "The Product Owner is **one person, not a committee** — stakeholders influence the backlog by convincing them",
        "The PO may delegate work but **remains accountable**",
      ],
      examTip: "Many stakeholders want to order the backlog ⇒ one **Product Owner**; others make their case to them.",
    },
    {
      title: "The Sprint & Sprint Planning",
      domain: "Foundations · Events",
      oneLiner: "The Sprint is the container for all other events — a fixed length of one month or less.",
      visual: {
        type: "table",
        headers: ["Sprint Planning topic", "Question", "Result"],
        rows: [
          ["One", "Why is this Sprint valuable?", "The **Sprint Goal** (finalized before planning ends)"],
          ["Two", "What can be Done this Sprint?", "Product Backlog items selected by Developers with the PO"],
          ["Three", "How will the work get done?", "A plan by the Developers — often items split into pieces of a day or less"],
        ],
      },
      points: [
        "A new Sprint starts **immediately** after the previous one ends",
        "During the Sprint: **no changes that endanger the Sprint Goal**, **quality doesn’t decrease**, backlog is refined, scope can be renegotiated with the PO as more is learned",
        "**Only the Product Owner** can cancel a Sprint — when the Sprint Goal becomes obsolete",
        "Sprint Planning is timeboxed to **8 hours max** for a one-month Sprint (shorter Sprints ⇒ shorter event)",
        "Shorter Sprints ⇒ more learning cycles and less risk; too long ⇒ the Sprint Goal may become invalid",
        "The Sprint Backlog = Sprint Goal (why) + selected items (what) + plan (how)",
      ],
      examTip: "Who decides how work becomes an Increment? **Developers, at their sole discretion.**",
    },
    {
      title: "Daily Scrum, Sprint Review & Retrospective",
      domain: "Foundations · Events",
      oneLiner: "Every event is a formal opportunity to inspect and adapt — skipping one is a lost opportunity.",
      visual: {
        type: "table",
        headers: ["Event", "Purpose", "Who", "Max (1-month Sprint)"],
        rows: [
          ["Sprint Planning", "Lay out the work for the Sprint", "Whole Scrum Team", "8 hours"],
          ["Daily Scrum", "Inspect progress toward the Sprint Goal; adapt the Sprint Backlog", "Developers", "15 minutes"],
          ["Sprint Review", "Inspect the outcome; determine future adaptations", "Scrum Team + key stakeholders", "4 hours"],
          ["Sprint Retrospective", "Plan ways to increase quality and effectiveness", "Scrum Team", "3 hours"],
        ],
      },
      points: [
        "**Daily Scrum ≠ status meeting:** focused on the Sprint Goal, produces an actionable plan for the next day, structure chosen by Developers, same time and place daily, 15 minutes",
        "PO or Scrum Master join the Daily Scrum **only as Developers** if they’re working Sprint Backlog items",
        "The Review is a **working session, not a presentation**; the Backlog may be adjusted to new opportunities",
        "The Review is **never a gate** to releasing value",
        "The Retrospective **concludes the Sprint** and inspects individuals, interactions, processes, tools and the Definition of Done",
      ],
      examTip: "Retrospective timebox for a one-month Sprint ⇒ **3 hours**. Daily Scrum ⇒ **15 minutes** regardless of Sprint length.",
    },
    {
      title: "Artifacts & their commitments",
      domain: "Foundations · Artifacts",
      oneLiner: "Each artifact carries a commitment that gives it transparency and focus.",
      visual: {
        type: "table",
        headers: ["Artifact", "Commitment", "What it is"],
        rows: [
          ["Product Backlog", "Product Goal", "An emergent, ordered list of what is needed to improve the product — the single source of work"],
          ["Sprint Backlog", "Sprint Goal", "The Sprint Goal + selected items + delivery plan; a plan by and for the Developers, updated throughout"],
          ["Increment", "Definition of Done", "A concrete, usable stepping stone toward the Product Goal"],
        ],
      },
      points: [
        "**Refinement** = breaking items into smaller, more precise ones; Developers do the **sizing**",
        "Items that can be **Done within one Sprint** are ready for selection",
        "The **Sprint Goal doesn’t change** — scope is negotiated with the PO without affecting it",
        "**Multiple Increments** may be created in one Sprint, and may be delivered before the Sprint ends",
        "Work isn’t part of an Increment **unless it meets the Definition of Done** — otherwise it returns to the Product Backlog",
        "DoD: an **organizational standard** if there is one, else the team creates it; **multiple teams on one product share the same DoD**",
      ],
      examTip: "Item doesn’t meet the DoD by Sprint end ⇒ can’t be released or shown at the Review; **back to the Product Backlog**.",
    },
    {
      title: "The Scrum Master: a true leader who serves",
      domain: "CSM · Service",
      oneLiner:
        "Accountable for establishing Scrum and for the Scrum Team’s effectiveness — by serving the team, the Product Owner and the organization.",
      visual: {
        type: "table",
        headers: ["Serves…", "By…"],
        rows: [
          ["The Scrum Team", "Coaching self-management and cross-functionality · helping create high-value Increments that meet the DoD · causing removal of impediments · ensuring events happen, are positive and productive, and stay in the timebox"],
          ["The Product Owner", "Finding techniques for Product Goal and backlog management · helping the team see the need for clear, concise items · empirical product planning · facilitating stakeholder collaboration as needed"],
          ["The organization", "Leading, training and coaching Scrum adoption · planning and advising implementations · helping people understand an empirical approach · removing barriers between stakeholders and teams"],
        ],
      },
      points: [
        "**Scrum has no project manager** — the accountabilities are spread: the PO owns what and ordering, Developers own how and the plan, the Scrum Master owns the effectiveness of the process",
        "The Scrum Master serves — they don’t assign work, approve plans or act as the team’s manager",
      ],
      examTip: "Team is blocked by something outside its control ⇒ the Scrum Master **causes the removal of the impediment**.",
    },
    {
      title: "Facilitating, teaching, mentoring & coaching",
      domain: "CSM · Core competencies",
      oneLiner: "Four different stances — a good Scrum Master picks the one the situation needs.",
      visual: {
        type: "table",
        headers: ["Stance", "What you do"],
        rows: [
          ["Facilitating", "Guide the process so the group reaches its own outcome; stay neutral on content"],
          ["Teaching", "Transfer knowledge or skills (for example, how Scrum works)"],
          ["Mentoring", "Share your own experience and advice"],
          ["Coaching", "Ask powerful questions so people find their own answers and grow"],
        ],
      },
      points: [
        "Facilitate **retrospectives, refinement, cross-team conflicts and stakeholder workshops**",
        "Group decision techniques (examples): **fist of five**, **dot voting**, **thumbs up/sideways/down**, timeboxed discussion and consent checks",
        "When a team can solve it themselves, **coach rather than tell**",
      ],
      examTip: "“Asks open questions to help the team decide” ⇒ **coaching**. “Shares how she solved it” ⇒ **mentoring**.",
    },
    {
      title: "Impediments, technical debt & quality",
      domain: "CSM · Service",
      oneLiner: "Quality is non-negotiable in a Sprint — debt slows every Sprint that follows.",
      points: [
        "**Technical debt** = shortcuts that pile up; it makes changes slower, riskier and costlier, and hurts predictability",
        "Practices that help: **automated testing, continuous integration, test-driven development, refactoring, pair/mob programming, code review, a strong DoD**",
        "Common **organizational impediments**: functional silos and hand-offs, slow approval chains, no access to customers or stakeholders, people split across many projects, incentives that reward individuals over team outcomes, restrictive tools or environments",
        "The Scrum Master helps by **making impediments transparent**, coaching the team to resolve what it can, and **escalating or working across the organization** for what it can’t",
        "Techniques for resolving impediments (examples): **5 Whys**, fishbone diagrams, or bringing the right people together to remove the barrier",
        "During the Sprint, **quality does not decrease**",
      ],
      examTip: "Team skips testing to hit the forecast ⇒ that’s **technical debt** — quality can’t be traded away.",
    },
    {
      title: "Serving the Product Owner & the organization",
      domain: "CSM · Service",
      oneLiner: "Adopting Scrum changes how the organization is designed — and the Scrum Master leads that change.",
      points: [
        "Support the PO with **backlog techniques**, clear concise items, **empirical planning** and stakeholder collaboration",
        "Scenarios where the Scrum Master **leads**: coaching the team through conflict, guiding stakeholders on Scrum, and driving adoption across the organization",
        "Typical **organizational design changes** from Scrum: functional silos give way to **cross-functional product teams**, the **project manager role isn’t carried over**, and a single empowered **Product Owner** orders the work",
        "Scrum makes the relative efficacy of current management, environment and work techniques **visible** so they can be improved",
        "The organization must **respect the Product Owner’s decisions** for Scrum to work",
      ],
      examTip: "Management wants to assign tasks to Developers ⇒ Scrum Master **coaches the organization** on self-management.",
    },
  ],

  quiz: [
    {
      q: "Which three pillars underpin Scrum’s empirical process?",
      options: [
        "Planning, execution and delivery",
        "Commitment, focus and openness",
        "Transparency, inspection and adaptation",
        "Velocity, burndown and forecasting",
      ],
      answer: 2,
      explanation:
        "Scrum’s empirical pillars are **transparency, inspection and adaptation**. Commitment, focus and openness are three of the five Scrum __values__.",
    },
    {
      q: "Halfway through a Sprint, the business changes direction and the Sprint Goal no longer makes sense. Who has the authority to cancel the Sprint?",
      options: [
        "The Scrum Master",
        "The Product Owner",
        "The Developers",
        "Any stakeholder",
      ],
      answer: 1,
      explanation:
        "A Sprint can be cancelled if the Sprint Goal becomes obsolete, and **only the Product Owner** has that authority.",
    },
    {
      q: "Who attends the Daily Scrum, and how long is it?",
      options: [
        "The whole Scrum Team plus stakeholders, up to 30 minutes",
        "The Scrum Master and Product Owner, 15 minutes",
        "Only the Developers, up to one hour",
        "The Developers, 15 minutes",
      ],
      answer: 3,
      explanation:
        "The Daily Scrum is a **15-minute event for the Developers** (the PO or Scrum Master join as Developers only if working Sprint Backlog items).",
    },
    {
      q: "What is the maximum timebox for the Sprint Retrospective in a one-month Sprint?",
      options: ["One hour", "Three hours", "Four hours", "Eight hours"],
      answer: 1,
      explanation:
        "The Retrospective is timeboxed to a maximum of **three hours** for a one-month Sprint. Planning is 8 hours; the Review is 4.",
    },
    {
      q: "Three senior managers each want their features at the top of the backlog and propose forming a committee to order it. How does Scrum handle this?",
      options: [
        "The Product Owner remains one person, and the managers make their case to the Product Owner",
        "The Scrum Master decides the order",
        "The Developers vote on the order",
        "The committee owns the backlog",
      ],
      answer: 0,
      explanation:
        "The Product Owner is **one person, not a committee**. Those wanting change do so by convincing the Product Owner.",
    },
    {
      q: "In Sprint Planning, who decides how Product Backlog items will be turned into an Increment?",
      options: [
        "The Product Owner",
        "The Scrum Master",
        "The Developers",
        "The line manager",
      ],
      answer: 2,
      explanation:
        "How the work is done is at the **sole discretion of the Developers** — no one else tells them how to turn items into Increments.",
    },
    {
      q: "At the end of the Sprint, a feature works but hasn’t met the Definition of Done. What happens to it?",
      options: [
        "It’s shown at the Review as “almost done”",
        "It’s released to stakeholders anyway",
        "The Sprint is extended until it’s done",
        "It returns to the Product Backlog for future consideration",
      ],
      answer: 3,
      explanation:
        "Work that doesn’t meet the DoD can’t be part of an Increment — it **can’t be released or even presented at the Review** and goes back to the Product Backlog.",
    },
    {
      q: "The Developers’ progress is blocked because another department takes weeks to approve access to a test environment. What best describes the Scrum Master’s role?",
      options: [
        "Nothing — the delay is outside the team",
        "Cause the removal of the impediment by working across the organization, keeping the team informed",
        "Tell the team to skip testing so the Sprint isn’t delayed",
        "Hand the problem to the Product Owner",
      ],
      answer: 1,
      explanation:
        "The Scrum Master serves by **causing the removal of impediments** and removing barriers between teams and the rest of the organization. Skipping testing would lower quality.",
    },
    {
      q: "Which part of the Sprint Backlog answers the question “Why is this Sprint valuable?”",
      options: [
        "The Sprint Goal",
        "The selected Product Backlog items",
        "The Developers’ delivery plan",
        "The Definition of Done",
      ],
      answer: 0,
      explanation:
        "The Sprint Backlog is the **Sprint Goal (why)**, the selected items (what), and the plan (how).",
    },
    {
      q: "Midway through a Sprint, the Developers realize the work is bigger than expected. What is the appropriate response?",
      options: [
        "Extend the Sprint by a few days",
        "Lower the Definition of Done to finish in time",
        "Negotiate the scope of the Sprint Backlog with the Product Owner without affecting the Sprint Goal",
        "Cancel the Sprint immediately",
      ],
      answer: 2,
      explanation:
        "Scope may be clarified and renegotiated with the Product Owner **as long as the Sprint Goal isn’t endangered**. Sprints don’t stretch, and quality doesn’t drop.",
    },
    {
      q: "A Developer asks the Scrum Master how to settle a design disagreement. Which response is coaching?",
      options: [
        "Explain the design the Scrum Master would choose",
        "Describe how another team solved the same problem",
        "Give a short lecture on design patterns",
        "Ask open questions that help the team reach its own decision",
      ],
      answer: 3,
      explanation:
        "**Coaching** uses powerful questions so people find their own answers. Telling is directing, sharing experience is mentoring, and lecturing is teaching.",
    },
    {
      q: "A stakeholder asks, “Who is the project manager of this Scrum Team?” What is the correct answer?",
      options: [
        "Scrum has no project manager — the accountabilities are spread across the Product Owner, Developers and Scrum Master",
        "The Scrum Master, because they run the Sprint",
        "The Product Owner, because they own the budget",
        "The most senior Developer",
      ],
      answer: 0,
      explanation:
        "Scrum has **no project manager**. The team is self-managing: the PO owns what and ordering, Developers own how, and the Scrum Master serves the team’s effectiveness.",
    },
    {
      q: "A team is under pressure and proposes skipping automated tests for a few Sprints to meet its forecast. What is the main risk?",
      options: [
        "The Daily Scrum will take longer",
        "The Product Owner will lose authority over the backlog",
        "Technical debt will accumulate, slowing future Sprints and reducing predictability",
        "The Sprint length will become invalid",
      ],
      answer: 2,
      explanation:
        "Cutting quality builds **technical debt**, which makes later changes slower and riskier. Quality must not decrease during the Sprint.",
    },
  ],
};

const csmStudy: QAItem[] = certStudyCards(csm);

export const csmCards: QAItem[] = [
  {
    id: "cert-csm-link",
    question: "Certified ScrumMaster (CSM) — official exam page",
    category: "CSM",
    tags: ["Scrum Alliance", "Official Page"],
    answer: linkAnswer,
  },
  {
    id: "cert-csm-syllabus",
    question: "Certified ScrumMaster (CSM) — syllabus & learning objectives",
    category: "CSM",
    tags: ["Scrum Alliance", "Syllabus"],
    answer: syllabusAnswer,
  },
  ...csmStudy,
];
