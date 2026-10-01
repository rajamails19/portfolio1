import type { Block, QAItem } from "../types";
import { certStudyCards, type CertStudyInput } from "./cert-cards";

const task = (title: string, enablers: string[]) => ({
  title,
  content: [{ type: "list" as const, items: enablers }],
});

/* ───────────────────────── Card 1 · official page ───────────────────────── */

const linkAnswer: Block[] = [
  {
    type: "text",
    content:
      "PMI’s entry-level project management credential. It tests project management fundamentals plus **predictive, agile, and business analysis** approaches side by side — not just one methodology.",
  },
  {
    type: "table",
    headers: ["Item", "Detail"],
    rows: [
      ["Eligibility", "High school diploma, GED, or global equivalent, **plus 23 contact hours** of project management education"],
      ["Exam", "150 questions (135 scored + 15 unscored pretest) — multiple-choice, drag-and-drop, hot spot, and animation/comic-strip items"],
      ["Duration", "3 hours, with a 10-minute break after question 75 (you can’t return to section 1 after the break)"],
      ["Eligibility window", "1 year to pass, with up to 3 attempts; a 4th requires waiting 1 year from your last attempt"],
      ["Fee", "Roughly $225 (PMI member) / $300 (non-member) — confirm on pmi.org, prices change"],
      ["Renewal", "Every 3 years via PMI’s Continuing Certification Requirements (CCR) — earn PDUs"],
      ["Based on", "The CAPM Examination Content Outline (ECO), 2023 update — aligned with, but not identical to, PMBOK Guide 7th Edition"],
    ],
  },
  {
    type: "links",
    items: [
      {
        href: "https://www.pmi.org/certifications/certified-associate-capm",
        label: "CAPM — official PMI page",
        description: "Overview, eligibility and how to apply",
      },
      {
        href: "https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm20ecofinal.pdf",
        label: "CAPM Examination Content Outline, 2023 Update (PDF)",
        description: "The authoritative source for this tab’s syllabus — all domains, tasks, and enablers",
      },
      {
        href: "https://www.pmi.org/certifications/certified-associate-capm/exam-prep",
        label: "CAPM — official exam prep page",
        description: "PMI’s own study resources and training options",
      },
      {
        href: "https://www.pmi.org/shop/p-/elearning/certified-associate-in-project-management-capm-exam-prep-course/el068",
        label: "CAPM Exam Prep Course (PMI eLearning, EL068)",
        description: "PMI’s official paid prep course — can count toward the 23-hour education requirement",
      },
    ],
  },
  {
    type: "callout",
    variant: "warn",
    content:
      "The **2023 ECO replaced the old six-knowledge-area structure** with four domains that blend predictive, agile, and business analysis content throughout. Older CAPM study guides built around the PMBOK 6th Edition knowledge areas won’t match what’s tested now.",
  },
];

/* ───────────────────────── Card 2 · syllabus ───────────────────────── */

const syllabusAnswer: Block[] = [
  {
    type: "callout",
    variant: "info",
    content:
      "Official **CAPM Examination Content Outline, 2023 Update**. Each domain lists its tasks; each task’s **enablers** (quoted below) are examples of the work, not an exhaustive list. Predictive, adaptive, and business-analysis approaches are tested __throughout__ all four domains, not boxed into one.",
  },
  {
    type: "accordion",
    items: [
      {
        title: "I. Project Management Fundamentals and Core Concepts",
        badge: "36%",
        content: [
          {
            type: "accordion",
            items: [
              task("Task 1 — Understand project life cycles and processes", [
                "Distinguish between a project, program, and a portfolio",
                "Distinguish between a project and operations",
                "Distinguish between predictive and adaptive approaches",
                "Distinguish between issues, risks, assumptions, and constraints",
                "Review/critique project scope",
                "Apply the project management code of ethics to scenarios (refer to the PMI Code of Ethics and Professional Conduct)",
                "Explain how a project can be a vehicle for change",
              ]),
              task("Task 2 — Understand project management planning", [
                "Describe the purpose and importance of cost, quality, risk, schedule, etc.",
                "Distinguish between the deliverables of a project management plan versus a product management plan",
                "Distinguish differences between a milestone and a task duration",
                "Determine the number and type of resources in a project",
                "Use a risk register in a given situation",
                "Use a stakeholder register in a given situation",
                "Explain project closure and transitions",
              ]),
              task("Task 3 — Understand project roles and responsibilities", [
                "Compare and contrast the roles and responsibilities of project managers and project sponsors",
                "Compare and contrast the roles and responsibilities of the project team and the project sponsor",
                "Explain the importance of the role the project manager plays (e.g., initiator, negotiator, listener, coach, working member, facilitator)",
                "Explain the differences between leadership and management",
                "Explain emotional intelligence (EQ) and its impact on project management",
              ]),
              task("Task 4 — Follow and execute planned strategies or frameworks", [
                "Give examples of how it is appropriate to respond to a planned strategy or framework (e.g., communication, risk, etc.)",
                "Explain project initiation and benefit planning",
              ]),
              task("Task 5 — Understand common problem-solving tools and techniques", [
                "Evaluate the effectiveness of a meeting",
                "Explain the purpose of focus groups, standup meetings, brainstorming, etc.",
              ]),
            ],
          },
        ],
      },
      {
        title: "II. Predictive, Plan-Based Methodologies",
        badge: "17%",
        content: [
          {
            type: "accordion",
            items: [
              task("Task 1 — Explain when a predictive, plan-based approach is appropriate", [
                "Identify the suitability of a predictive approach for the organizational structure (virtual, colocation, matrix, hierarchical, etc.)",
                "Determine the activities within each process",
                "Give examples of typical activities within each process",
                "Distinguish the differences between various project components",
              ]),
              task("Task 2 — Understand a project management plan schedule", [
                "Apply critical path methods",
                "Calculate schedule variance",
                "Explain work breakdown structures (WBS)",
                "Explain work packages",
                "Apply a quality management plan",
                "Apply an integration management plan",
              ]),
              task("Task 3 — Document project controls of predictive projects", [
                "Identify artifacts that are used in predictive, plan-based projects",
                "Calculate cost and schedule variances",
              ]),
            ],
          },
        ],
      },
      {
        title: "III. Agile Frameworks/Methodologies",
        badge: "20%",
        content: [
          {
            type: "accordion",
            items: [
              task("Task 1 — Explain when an adaptive approach is appropriate", [
                "Compare the pros and cons of adaptive and predictive, plan-based projects",
                "Identify the suitability of adaptive approaches for the organizational structure",
                "Identify organizational process assets and enterprise environmental factors that facilitate adaptive approaches",
              ]),
              task("Task 2 — Plan project iterations", [
                "Distinguish the logical units of iterations",
                "Interpret the pros and cons of the iteration",
                "Translate a WBS to an adaptive iteration",
                "Determine inputs for scope",
                "Explain the importance of adaptive project tracking versus predictive, plan-based tracking",
              ]),
              task("Task 3 — Document project controls for an adaptive project", [
                "Identify artifacts that are used in adaptive projects",
              ]),
              task("Task 4 — Explain the components of an adaptive plan", [
                "Distinguish between the components of different adaptive methodologies (e.g., Scrum, Extreme Programming (XP), Scaled Agile Framework (SAFe®), Kanban, etc.)",
              ]),
              task("Task 5 — Prepare and execute task management steps", [
                "Interpret success criteria of an adaptive project management task",
                "Prioritize tasks in adaptive project management",
              ]),
            ],
          },
        ],
      },
      {
        title: "IV. Business Analysis Frameworks",
        badge: "27%",
        content: [
          {
            type: "accordion",
            items: [
              task("Task 1 — Understand business analysis (BA) roles and responsibilities", [
                "Distinguish between stakeholder roles (process owner, process manager, product manager, product owner, etc.)",
                "Outline the need for roles and responsibilities",
                "Differentiate between internal and external roles",
              ]),
              task("Task 2 — Conduct stakeholder communication", [
                "Recommend the most appropriate communication channel/tool (reporting, presentation, etc.)",
                "Demonstrate why communication is important for a business analyst between various teams (features, requirements, etc.)",
              ]),
              task("Task 3 — Gather requirements", [
                "Match tools to scenarios (user stories, use cases, etc.)",
                "Identify the requirements-gathering approach for a situation (interviews, surveys, workshops, lessons learned, etc.)",
                "Explain a requirements traceability matrix/product backlog",
              ]),
              task("Task 4 — Understand product roadmaps", [
                "Explain the application of a product roadmap",
                "Determine which components go to which releases",
              ]),
              task("Task 5 — Determine how project methodologies influence business analysis processes", [
                "Determine the role of a business analyst in adaptive and/or predictive, plan-based approaches",
              ]),
              task("Task 6 — Validate requirements through product delivery", [
                "Define acceptance criteria",
                "Determine if a project/product is ready for delivery based on a requirements traceability matrix/product backlog",
              ]),
            ],
          },
        ],
      },
    ],
  },
];

/* ───────────────────────── Cards 3 & 4 · concepts + quiz ───────────────────────── */

const capm: CertStudyInput = {
  code: "CAPM",
  examName: "Certified Associate in Project Management (CAPM)",

  concepts: [
    {
      title: "Project vs. program vs. portfolio vs. operations",
      domain: "Domain 1 · 36%",
      oneLiner: "The exam tests whether you can tell these apart before anything else.",
      visual: {
        type: "table",
        headers: ["Term", "What it is"],
        rows: [
          ["Project", "A temporary effort with a defined start and end, creating a unique result"],
          ["Program", "A group of related projects managed together for benefits not available by managing them individually"],
          ["Portfolio", "Projects, programs, and other work grouped to achieve strategic objectives"],
          ["Operations", "Ongoing, repetitive work that keeps the organization running — not temporary"],
        ],
      },
      points: [
        "A project is a __vehicle for change__ — it exists to move the organization from a current state to a desired one",
        "**Predictive vs. adaptive:** predictive plans up front in detail; adaptive plans in short, iterative cycles and adjusts as it learns",
        "**Issue vs. risk vs. assumption vs. constraint:** an issue is happening __now__; a risk is an __uncertain future event__; an assumption is taken as __true without proof__; a constraint __limits your options__ (budget, schedule, resources)",
        "The **PMI Code of Ethics and Professional Conduct** rests on four values: __Responsibility, Respect, Fairness, Honesty__ — scenarios testing ethics usually hinge on one of these",
      ],
      examTip: "Scenario names a related __group__ of projects sharing a strategic goal ⇒ that’s a **program**, not a project.",
    },
    {
      title: "Planning essentials: registers, baselines & milestones",
      domain: "Domain 1 · 36%",
      oneLiner: "Know what each planning artifact is for, and the difference between a milestone and a task.",
      visual: {
        type: "table",
        headers: ["Artifact", "Purpose"],
        rows: [
          ["Risk register", "Logs identified risks, their analysis, and planned responses"],
          ["Stakeholder register", "Identifies stakeholders and their interest, influence, and engagement needs"],
          ["Project management plan", "__How__ the project will be executed, monitored, and closed"],
          ["Product management plan", "Covers the __product’s__ lifecycle, separate from a single project’s plan"],
        ],
      },
      points: [
        "A **milestone** is a significant point or event with __zero duration__; a **task/activity** has a duration and consumes resources",
        "Planning must address **cost, quality, risk, schedule** and more — and the right number and type of resources for the work",
        "**Project closure** includes confirming work is complete, formal acceptance, lessons learned, and transition of the deliverable",
      ],
      examTip: "“Zero-duration point in the schedule” ⇒ **milestone**. A duration and assigned resources ⇒ **task**.",
    },
    {
      title: "Roles, leadership & problem-solving",
      domain: "Domain 1 · 36%",
      oneLiner: "The PM wears many hats, and leadership isn’t the same thing as management.",
      visual: {
        type: "table",
        headers: ["Role", "Focus"],
        rows: [
          ["Project sponsor", "Champions the project, secures funding, and owns the business case"],
          ["Project manager", "Initiator, negotiator, listener, coach, working member, and facilitator — leads delivery"],
          ["Project team", "Does the work and contributes expertise"],
        ],
      },
      points: [
        "**Leadership** is about influencing and inspiring people toward a vision; **management** is about planning, organizing, and controlling resources and tasks — a PM needs both",
        "**Emotional intelligence (EQ)** — self-awareness, self-management, social awareness, relationship management — strongly affects how well a PM leads a team",
        "“Follow a planned strategy or framework” means __executing__ what was already planned for communication, risk, etc., not re-planning from scratch",
        "Problem-solving tools: **focus groups, standup meetings, brainstorming** — know each one’s purpose, and how to judge whether a meeting was effective",
      ],
      examTip: "“Inspires the team around a vision for change” ⇒ **leadership**. “Tracks tasks against the plan” ⇒ **management**.",
    },
    {
      title: "The plan-based toolkit: WBS, critical path & work packages",
      domain: "Domain 2 · 17%",
      oneLiner: "Predictive projects decompose the work up front, then sequence and estimate it.",
      visual: {
        type: "flow",
        title: "From scope to schedule",
        direction: "horizontal",
        nodes: [
          { label: "WBS", sub: "decompose deliverables", tone: "sky" },
          { label: "Work packages", sub: "the lowest WBS level", tone: "gold" },
          { label: "Sequence & estimate", tone: "mint" },
          { label: "Critical path", sub: "longest dependent chain", tone: "ember" },
        ],
      },
      points: [
        "**Work Breakdown Structure (WBS):** a hierarchical decomposition of the total scope into smaller, manageable pieces",
        "**Work package:** the __lowest level__ of the WBS — small enough to estimate cost and duration",
        "**Critical path:** the longest sequence of dependent tasks — it determines the __shortest possible__ project duration; a delay on it delays the whole project",
        "Predictive approaches fit structures and situations where the organization is **hierarchical or matrix**, requirements are stable, and activities within each process are well understood in advance",
        "The **quality management plan** and **integration management plan** are applied to keep deliverables meeting standards and all pieces of the project working together",
      ],
      examTip: "“Which task, if delayed, delays the whole project?” ⇒ a task on the **critical path**.",
    },
    {
      title: "Controlling a predictive project: variances & artifacts",
      domain: "Domain 2 · 17%",
      oneLiner: "Control means comparing actuals to the baseline and knowing what that gap means.",
      visual: {
        type: "table",
        headers: ["Variance", "Formula (plain terms)", "Positive means…"],
        rows: [
          ["Schedule variance (SV)", "Earned value − planned value", "Ahead of schedule"],
          ["Cost variance (CV)", "Earned value − actual cost", "Under budget"],
        ],
      },
      points: [
        "A **negative** schedule or cost variance means the project is __behind schedule__ or __over budget__",
        "Typical predictive artifacts to document controls: schedule baseline, cost baseline, status/progress reports, change logs, and the risk register",
        "Controlling isn’t only detecting variance — it’s **comparing it against the baseline** and deciding whether a corrective action or change request is needed",
      ],
      examTip: "Given planned vs. actual numbers, a **negative CV** ⇒ the project is over budget, not under.",
    },
    {
      title: "When to go adaptive — and planning iterations",
      domain: "Domain 3 · 20%",
      oneLiner: "Adaptive approaches fit uncertain, evolving work — and planning happens in short, repeated cycles.",
      visual: {
        type: "table",
        headers: ["Predictive", "Adaptive"],
        rows: [
          ["Requirements well understood up front", "Requirements expected to emerge and change"],
          ["Plan the whole project in detail", "Plan iteration by iteration"],
          ["Track against the baseline", "Track progress through iteration reviews and burndown"],
          ["Change is controlled/formal", "Change is expected and welcomed"],
        ],
      },
      points: [
        "Look for **organizational process assets** and **enterprise environmental factors** that __support__ adaptive work — e.g., a culture open to change, tooling for iterative delivery",
        "Planning an iteration: break the **WBS into iteration-sized pieces**, determine what inputs define the scope of the iteration, and weigh each iteration’s pros/cons",
        "**Adaptive tracking** (burndown/burnup, velocity) differs fundamentally from **predictive tracking** (variance against a fixed baseline)",
      ],
      examTip: "Requirements are expected to change as the team learns ⇒ favor an **adaptive** approach.",
    },
    {
      title: "Adaptive frameworks, controls & task management",
      domain: "Domain 3 · 20%",
      oneLiner: "Know the named frameworks, what artifacts an adaptive project documents, and how work gets prioritized.",
      visual: {
        type: "table",
        headers: ["Framework", "One-line identity"],
        rows: [
          ["Scrum", "Fixed-length Sprints, defined roles and events"],
          ["Extreme Programming (XP)", "Engineering-practice-heavy — pairing, TDD, continuous integration"],
          ["Scaled Agile Framework (SAFe®)", "Coordinates agile work across many teams at enterprise scale"],
          ["Kanban", "Visualize flow, limit work in progress, pull work continuously (no fixed iterations)"],
        ],
      },
      points: [
        "Artifacts used to document **adaptive project controls**: product backlog, iteration/sprint backlog, burndown chart, definition of done",
        "**Prioritizing tasks** in adaptive management weighs business value, risk, and dependencies — not just order of arrival",
        "**Success criteria** for an adaptive task should be interpretable before work starts, so the team knows what “done” looks like",
      ],
      examTip: "No fixed-length iterations, work pulled continuously ⇒ **Kanban**. Enterprise-scale coordination across teams ⇒ **SAFe**.",
    },
    {
      title: "Business analyst roles & stakeholder communication",
      domain: "Domain 4 · 27%",
      oneLiner: "Know who the BA works with, and how to pick the right way to reach each of them.",
      visual: {
        type: "table",
        headers: ["Role", "Typically owns"],
        rows: [
          ["Process owner", "A specific business process and its performance"],
          ["Process manager", "Day-to-day operation of a process"],
          ["Product manager", "The product’s overall strategy and success"],
          ["Product owner", "Ordering and clarifying the backlog for a delivery team"],
        ],
      },
      points: [
        "Stakeholders can be **internal** (employees, sponsors, teams) or **external** (customers, regulators, vendors) — the approach to engaging them differs",
        "Identifying roles and responsibilities up front prevents gaps and overlaps in who decides what",
        "**Choosing a communication channel** should match the audience and purpose — a status report for sponsors is not a stand-up for the delivery team",
        "Business analysts bridge **features and requirements** conversations between stakeholder groups and the delivery team",
      ],
      examTip: "Scenario distinguishes “owns the backlog” from “owns the business process” ⇒ **product owner** vs. **process owner**.",
    },
    {
      title: "Gathering requirements & product roadmaps",
      domain: "Domain 4 · 27%",
      oneLiner: "Match the elicitation technique to the situation, and keep the roadmap and RTM/backlog aligned.",
      visual: {
        type: "table",
        headers: ["Situation", "Technique"],
        rows: [
          ["Need detail from one person with specific expertise", "Stakeholder interview"],
          ["Need input from many people efficiently", "Survey"],
          ["Need to align a group and resolve conflicts together", "Workshop"],
          ["Need to avoid repeating past mistakes", "Lessons learned"],
          ["Express a need from a user’s perspective", "User story"],
          ["Describe a step-by-step interaction with a system", "Use case"],
        ],
      },
      points: [
        "**Requirements traceability matrix (RTM):** links each requirement to its source, design, and test — used in predictive contexts; the **product backlog** serves the equivalent role in adaptive contexts",
        "A **product roadmap** shows the high-level direction and timing of a product’s evolution — not detailed tasks",
        "Deciding **which components go into which release** balances value, dependencies, and capacity",
      ],
      examTip: "Need quick input from a large, dispersed group ⇒ **survey**. Need to resolve disagreement live ⇒ **workshop**.",
    },
    {
      title: "Methodology fit & validating requirements for delivery",
      domain: "Domain 4 · 27%",
      oneLiner: "The BA’s job flexes with the approach — and “done” isn’t real until requirements are validated against delivery.",
      points: [
        "In a **predictive** project, the BA typically elicits and documents requirements largely up front, tied to the RTM",
        "In an **adaptive** project, the BA works continuously with the team — refining backlog items just ahead of each iteration",
        "**Acceptance criteria** define the specific conditions a deliverable must meet to be accepted — write them before work starts, not after",
        "**Readiness for delivery** is checked against the **RTM or product backlog**: every requirement traced, every acceptance criterion met",
        "Validating requirements is different from **gathering** them — validation confirms the __built thing__ actually satisfies the __documented need__",
      ],
      examTip: "“Is the product ready to ship?” ⇒ check it against the **RTM/backlog**, not against the original interview notes.",
    },
  ],

  quiz: [
    {
      q: "A company is running five related initiatives together specifically because managing them as a group unlocks benefits none of them would deliver alone. What is this group called?",
      options: ["A portfolio", "A program", "A product roadmap", "A work breakdown structure"],
      answer: 1,
      explanation:
        "A **program** is a group of related projects managed together for benefits not available from managing them individually. A portfolio groups work to achieve strategic objectives more broadly.",
    },
    {
      q: "During planning, a team member says, “We don’t know yet whether the vendor will deliver on time — it could go either way.” Which term best describes this?",
      options: ["An issue", "A constraint", "A risk", "An assumption"],
      answer: 2,
      explanation:
        "An uncertain **future** event is a **risk**. An issue is already happening now; a constraint limits options; an assumption is treated as true without proof.",
    },
    {
      q: "A scheduled item in the project plan has zero duration and marks the completion of a major phase. What is it?",
      options: ["A task", "A milestone", "A work package", "A deliverable baseline"],
      answer: 1,
      explanation:
        "A **milestone** is a significant point with zero duration. A task/activity and a work package both consume time and resources.",
    },
    {
      q: "A project manager spends most of her time inspiring the team around the vision for the change, while a colleague focuses on tracking tasks, budgets, and schedules against the plan. Which pairing is correct?",
      options: [
        "She is managing; he is leading",
        "She is leading; he is managing",
        "Both are leading",
        "Both are managing",
      ],
      answer: 1,
      explanation:
        "**Leadership** is about influencing and inspiring toward a vision; **management** is about planning, organizing, and controlling. A good PM blends both, but the behaviors described map this way.",
    },
    {
      q: "On a predictive schedule, which task would delay the entire project if it slipped by two days?",
      options: [
        "Any task with slack remaining",
        "A task on the critical path",
        "A task that was recently added",
        "A task owned by the project sponsor",
      ],
      answer: 1,
      explanation:
        "The **critical path** is the longest sequence of dependent tasks — delaying any task on it delays the whole project. Tasks with slack can slip without affecting the finish date.",
    },
    {
      q: "A status report shows the project’s Cost Variance (CV) as negative. What does this mean?",
      options: [
        "The project is ahead of schedule",
        "The project is under budget",
        "The project is over budget",
        "The project has no cost baseline",
      ],
      answer: 2,
      explanation:
        "CV = Earned Value − Actual Cost. A **negative** CV means actual cost exceeds earned value — the project is **over budget**.",
    },
    {
      q: "Requirements for a new initiative are expected to change frequently as the team learns more from users. Which approach fits best?",
      options: ["Predictive, plan-based", "Adaptive", "Neither — requirements must be frozen first", "Portfolio management"],
      answer: 1,
      explanation:
        "When requirements are expected to emerge and evolve, an **adaptive** approach — planning iteration by iteration and adjusting on feedback — fits better than a fully predictive plan.",
    },
    {
      q: "A team pulls work continuously as capacity allows, visualizes flow on a board, and limits how much work is in progress at once, without using fixed-length iterations. Which framework is this?",
      options: ["Scrum", "Kanban", "Scaled Agile Framework (SAFe)", "Critical path method"],
      answer: 1,
      explanation:
        "**Kanban** is defined by visualizing flow, limiting WIP, and pulling work continuously — it does not use fixed-length iterations the way Scrum does.",
    },
    {
      q: "A business analyst needs input from a single subject-matter expert on a complex regulatory process. Which elicitation technique is most appropriate?",
      options: ["A survey sent to the whole department", "A one-on-one stakeholder interview", "A product roadmap review", "A retrospective"],
      answer: 1,
      explanation:
        "A **stakeholder interview** suits detailed input from one person with specific expertise. Surveys suit broad, lightweight input from many people.",
    },
    {
      q: "Before build starts on a new feature, the business analyst writes the specific conditions the feature must meet to be considered complete. What is she defining?",
      options: ["A product roadmap", "A risk register entry", "Acceptance criteria", "A work breakdown structure"],
      answer: 2,
      explanation:
        "**Acceptance criteria** are the specific conditions a deliverable must satisfy to be accepted — defined before work starts so “done” is unambiguous.",
    },
    {
      q: "A stakeholder asks whether the product is ready to ship. What should the business analyst check first?",
      options: [
        "Whether the sponsor is available",
        "Whether every requirement in the RTM/product backlog has been met and traced",
        "Whether the team enjoyed the project",
        "Whether the WBS has been archived",
      ],
      answer: 1,
      explanation:
        "Readiness for delivery is validated against the **requirements traceability matrix (predictive) or product backlog (adaptive)** — every requirement should be traced and satisfied.",
    },
    {
      q: "A junior team member asks why the project manager spends time identifying stakeholders at the very start of the project. What is the best answer?",
      options: [
        "It’s optional and mainly for documentation",
        "Only sponsors need to be identified, not the rest",
        "It helps determine the appropriate number of resources needed",
        "Roles and responsibilities must be clear so decisions, communication, and engagement happen with the right people",
      ],
      answer: 3,
      explanation:
        "Outlining stakeholder roles and responsibilities up front avoids gaps and confusion later about who decides, approves, or needs to be informed.",
    },
    {
      q: "A vendor invoice dispute is actively affecting delivery right now. How should this be classified?",
      options: ["A risk", "An assumption", "An issue", "A constraint"],
      answer: 2,
      explanation:
        "Something **already happening** that needs resolution is an **issue** — as opposed to a risk (uncertain future event), an assumption (unproven belief), or a constraint (a limit on options).",
    },
  ],
};

const capmStudy: QAItem[] = certStudyCards(capm);

export const capmCards: QAItem[] = [
  {
    id: "cert-capm-link",
    question: "Certified Associate in Project Management (CAPM) — official exam page",
    category: "CAPM",
    tags: ["PMI", "Official Page"],
    answer: linkAnswer,
  },
  {
    id: "cert-capm-syllabus",
    question: "CAPM — exam content outline & syllabus",
    category: "CAPM",
    tags: ["PMI", "Syllabus"],
    answer: syllabusAnswer,
  },
  ...capmStudy,
];
