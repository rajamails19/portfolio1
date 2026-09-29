import type { Block, QAItem } from "../types";
import { certStudyCards, type CertStudyInput } from "./cert-cards";

const statements = (title: string, badge: string, source: string, items: string[]) => ({
  title,
  badge,
  content: [
    { type: "text" as const, content: source },
    { type: "list" as const, items },
  ],
});

/* ───────────────────────── Card 1 · official page ───────────────────────── */

const linkAnswer: Block[] = [
  {
    type: "text",
    content:
      "IIBA’s foundational business analysis credential. It focuses on the **practical application** of job-ready competencies, using situation-based questions. The exam is based on **The Business Analysis Standard** and the **BABOK Guide**.",
  },
  {
    type: "table",
    headers: ["Item", "Detail"],
    rows: [
      ["Exam", "50 situation-based and standard multiple-choice questions"],
      ["Duration", "75 minutes"],
      ["Delivery", "Online, remote proctored (PSI) — personal computer, webcam, microphone and government photo ID required"],
      ["Result", "Pass/fail shown on screen; IIBA emails confirmation within 48 hours. The handbook doesn’t publish a passing score"],
      ["Cost", "$395 or less — includes IIBA membership, the exam, a practice exam and the learning journey. Student pricing $315 or less (varies by region)"],
      ["Time limit", "Six months from payment to schedule and take the exam"],
      ["Refund", "30 days from payment; the refundable amount is $145 USD"],
      ["Rescheduling", "48 hours’ notice required, or the exam fee is forfeited"],
      ["Practice exam", "Included — up to two attempts within your six-month term"],
    ],
  },
  {
    type: "links",
    items: [
      {
        href: "https://www.iiba.org/business-analysis-certifications/ecba/",
        label: "ECBA — official IIBA page",
        description: "Overview, pricing and how to start",
      },
      {
        href: "https://www.iiba.org/globalassets/certification/ecba/files/ecba-exam-blueprint.pdf",
        label: "ECBA Exam Blueprint (PDF)",
        description: "The 9 domains, weights, activity statements, 20 techniques, 29 competencies",
      },
      {
        href: "https://www.iiba.org/globalassets/certification/ecba/files/ecba-reference-map.pdf",
        label: "ECBA Reference Map (PDF)",
        description: "What to study — maps each activity statement to the Standard and BABOK Guide",
      },
      {
        href: "https://www.iiba.org/globalassets/certification/ecba/files/ecba-handbook.pdf",
        label: "ECBA Handbook, May 2026 (PDF)",
        description: "Exam policies, scheduling and exam-day rules",
      },
      {
        href: "https://www.iiba.org/globalassets/certification/ecba/files/ecba-sample-questions.pdf",
        label: "ECBA Sample Questions (PDF)",
        description: "Official examples of both question types",
      },
      {
        href: "https://www.iiba.org/globalassets/business-analysis-resources/the-business-analysis-standard/files/the-business-analysis-standard.pdf",
        label: "The Business Analysis Standard (PDF)",
        description: "Source for Domains 1–3",
      },
    ],
  },
  {
    type: "callout",
    variant: "warn",
    content:
      "The current blueprint (V1.1) is organized into **nine domains**, not the six BABOK knowledge areas. Older study guides built around the six knowledge areas may not match what’s tested now.",
  },
];

/* ───────────────────────── Card 2 · syllabus ───────────────────────── */

const syllabusAnswer: Block[] = [
  {
    type: "callout",
    variant: "info",
    content:
      "Official **ECBA Exam Blueprint V1.1**. The first three domains come from **The Business Analysis Standard**; the next six apply the **BACCM** using the **BABOK Guide**. Activity statements don’t appear on the exam — they describe what each question is testing.",
  },
  {
    type: "accordion",
    items: [
      statements("1. Understanding Business Analysis", "20%", "Source: The Business Analysis Standard", [
        "1.1 Define business analysis, describe its role in enabling change, and outline key activities across contexts",
        "1.2 Describe the six BACCM concepts, explain how they relate, and use them to support structured thinking",
        "1.3 Explain how business analysis supports value creation and benefits organizations in various industries",
        "1.4 Define value in business analysis and explain how outcomes are assessed to support value realization",
      ]),
      statements("2. Mindset for Effective Business Analysis", "14%", "Source: The Business Analysis Standard", [
        "2.1 Explain how mindset influences your effectiveness and identify ways to adopt an empowering mindset",
        "2.2 Recognize the shared values that drive work and explain how those values support the work to be done",
        "2.3 Identify core business analysis principles and apply them to guide your work and improve outcomes",
        "2.4 Recognize foundational competencies and assess when to apply them in your work",
      ]),
      statements("3. Implementing Business Analysis", "6%", "Source: The Business Analysis Standard", [
        "3.1 Identify roles that perform business analysis and describe how responsibilities vary across contexts",
        "3.2 Compare business analysis approaches and explain how to choose an approach based on the situation",
        "3.3 Identify organizational considerations that influence your work and explain their potential impact",
        "3.4 Describe the difference between requirements and designs and explain how they evolve throughout the initiative",
      ]),
      statements("4. Change", "10%", "Source: BABOK Guide — applying the BACCM", [
        "4.1 Recognize how key organizational, environmental, and stakeholder factors can influence your work",
        "4.2 Describe processes and systems to identify areas impacted by changes, and evaluate the impacts",
        "4.3 Track progress toward goals and support teams in adapting to changes, under direction",
        "4.4 Suggest and help implement simple improvements, working within clear guidelines",
      ]),
      statements("5. Need", "10%", "Source: BABOK Guide — applying the BACCM", [
        "5.1 Use basic elicitation methods and build positive rapport with stakeholders to elicit information",
        "5.2 Document requirements clearly and collaborate with stakeholders to validate needs, under guidance",
        "5.3 Compare stakeholder needs with outcomes to check alignment and flag conflicts for review",
        "5.4 Support stakeholders in prioritizing needs, considering business value and urgency",
      ]),
      statements("6. Solution", "10%", "Source: BABOK Guide — applying the BACCM", [
        "6.1 Explain basic solution validation concepts and record findings",
        "6.2 Assist in evaluating solution options, considering feasibility and risks, and contribute to preparing recommendations",
        "6.3 Support defining scope and collaborate on planning and monitoring implementation activities",
        "6.4 Support preparation and updating of design artifacts to maintain clarity",
      ]),
      statements("7. Stakeholder", "10%", "Source: BABOK Guide — applying the BACCM", [
        "7.1 Communicate with stakeholders using tailored messages to maintain engagement",
        "7.2 Identify stakeholder roles and interests, and support analysis of their impact",
        "7.3 Facilitate stakeholder collaboration and feedback throughout the initiative",
        "7.4 Identify key stakeholder motivations, drivers, and concerns to understand their decisions",
      ]),
      statements("8. Value", "10%", "Source: BABOK Guide — applying the BACCM", [
        "8.1 Confirm understanding of desired outcomes aligned with business objectives",
        "8.2 Support identification of value opportunities and help address barriers to delivery",
        "8.3 Describe how solutions meet business goals and relay information effectively for stakeholders",
        "8.4 Support defining key performance indicators (KPIs) aligned with value to measure success",
      ]),
      statements("9. Context", "10%", "Source: BABOK Guide — applying the BACCM", [
        "9.1 Assist in validating information quality and alignment to your situation, and document those validation outcomes",
        "9.2 Support recognizing constraints and adapt plans to maintain alignment",
        "9.3 Assist in analyzing technology trends and support technology integration",
        "9.4 Apply relevant industry standards and frameworks to guide the work to be done",
      ]),
      {
        title: "20 techniques assessed (BABOK Guide, Chapter 10)",
        badge: "20",
        content: [
          {
            type: "text",
            content: "Study each technique’s **purpose, description and usage considerations**.",
          },
          {
            type: "list",
            items: [
              "10.2 Backlog Management",
              "10.5 Brainstorming",
              "10.6 Business Capability Analysis",
              "10.9 Business Rules Analysis",
              "10.10 Collaborative Games",
              "10.15 Data Modelling",
              "10.18 Document Analysis",
              "10.25 Interviews",
              "10.27 Lessons Learned",
              "10.28 Metrics and Key Performance Indicators (KPIs)",
              "10.32 Organizational Modelling",
              "10.34 Process Analysis",
              "10.35 Process Modelling",
              "10.38 Risk Analysis and Management",
              "10.40 Root Cause Analysis",
              "10.41 Scope Modelling",
              "10.43 Stakeholder List, Map, or Personas",
              "10.46 SWOT Analysis",
              "10.48 User Stories",
              "10.50 Workshops",
            ],
          },
        ],
      },
      {
        title: "29 underlying competencies (BABOK Guide, Chapter 9)",
        badge: "29",
        content: [
          {
            type: "text",
            content: "All 29 are important — study each one’s **purpose, definition and effectiveness measures**.",
          },
          {
            type: "accordion",
            items: [
              {
                title: "Analytical Thinking and Problem Solving",
                content: [
                  {
                    type: "list",
                    items: [
                      "Creative Thinking",
                      "Decision Making",
                      "Learning",
                      "Problem Solving",
                      "Systems Thinking",
                      "Conceptual Thinking",
                      "Visual Thinking",
                    ],
                  },
                ],
              },
              {
                title: "Behavioural Characteristics",
                content: [
                  {
                    type: "list",
                    items: [
                      "Ethics",
                      "Personal Accountability",
                      "Trustworthiness",
                      "Organization and Time Management",
                      "Adaptability",
                    ],
                  },
                ],
              },
              {
                title: "Business Knowledge",
                content: [
                  {
                    type: "list",
                    items: [
                      "Business Acumen",
                      "Industry Knowledge",
                      "Organization Knowledge",
                      "Solution Knowledge",
                      "Methodology Knowledge",
                    ],
                  },
                ],
              },
              {
                title: "Communication Skills",
                content: [
                  {
                    type: "list",
                    items: ["Verbal Communication", "Non-Verbal Communication", "Written Communication", "Listening"],
                  },
                ],
              },
              {
                title: "Interaction Skills",
                content: [
                  {
                    type: "list",
                    items: [
                      "Facilitation",
                      "Leadership and Influencing",
                      "Teamwork",
                      "Negotiation and Conflict Resolution",
                      "Teaching",
                    ],
                  },
                ],
              },
              {
                title: "Tools and Technology",
                content: [
                  {
                    type: "list",
                    items: [
                      "Office Productivity Tools and Technology",
                      "Business Analysis Tools and Technology",
                      "Communication Tools and Technology",
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

/* ───────────────────────── Cards 3 & 4 · concepts + quiz ───────────────────────── */

const ecba: CertStudyInput = {
  code: "ECBA",
  examName: "Entry Certificate in Business Analysis (ECBA)",

  concepts: [
    {
      title: "What business analysis is — and the BACCM",
      domain: "Domain 1 · 20%",
      oneLiner:
        "Business analysis is the practice of enabling change in an enterprise by defining needs and recommending solutions that deliver value to stakeholders within a given context.",
      visual: {
        type: "table",
        headers: ["Core concept", "Definition"],
        rows: [
          ["Change", "The act of transformation in response to a need"],
          ["Need", "A problem or opportunity to be addressed"],
          ["Solution", "A specific way of satisfying one or more needs in a context"],
          ["Stakeholder", "A group or individual with a relationship to the change, the need, or the solution"],
          ["Value", "The worth, importance, or usefulness of something to a stakeholder within a context"],
          ["Context", "The circumstances that influence, are influenced by, and provide an understanding of the change"],
        ],
      },
      points: [
        "The **Business Analysis Core Concept Model (BACCM)** is a __thinking model__ and an __organizing model__ — a common language for describing business analysis",
        "Its power is in the **relationships** between the six concepts — ignoring any concept or connection reduces its effectiveness",
        "Business analysis goes past symptoms to **underlying causes**, helps **prioritize needs**, and keeps solutions **centered on value**",
        "A **solution** isn’t only technology — it can be a process change, a manual procedure, a business model update or a capability improvement",
      ],
      examTip: "Given a scenario, name the BACCM concept: a problem or opportunity ⇒ **need**; a way to satisfy it ⇒ **solution**.",
    },
    {
      title: "Value, outcomes & KPIs",
      domain: "Domain 1 · 20% & Domain 8",
      oneLiner: "Value is the worth of something to a stakeholder in a context — and you assess outcomes to see whether it was realized.",
      visual: {
        type: "table",
        headers: ["Lens", "Meaning"],
        rows: [
          ["Realized vs. preserved", "Value can come from returns, gains and improvements — or from mitigating losses, risks and costs"],
          ["Tangible", "Directly measurable, often with a significant monetary component"],
          ["Intangible", "Measured indirectly, often motivational — e.g. reputation or employee morale"],
          ["Absolute vs. relative", "Valuable in itself, or more valuable than another option to a group of stakeholders"],
        ],
      },
      points: [
        "It may **not be possible to deliver value for every stakeholder** — maximize it for the majority while addressing the concerns of others",
        "Confirm the **desired outcomes** align with business objectives before building anything",
        "**KPIs** are defined to be aligned with the value you expect, so success can be measured",
        "When describing a solution to stakeholders, **quantify the value** (cost saved, time reduced) rather than listing features or effort",
      ],
      examTip: "“Improved brand reputation” ⇒ **intangible** value. “Saves $200k a year” ⇒ **tangible**.",
    },
    {
      title: "Mindset, shared values & the seven principles",
      domain: "Domain 2 · 14%",
      oneLiner:
        "A mindset is the mental framework that guides decisions, behaviour and team dynamics — an empowering one is built through deliberate practice.",
      visual: {
        type: "table",
        headers: ["Principle", "In short"],
        rows: [
          ["See the whole", "Analyze needs in the big-picture context and why the change is necessary"],
          ["Think as a customer", "Understand the customer experience needs the solution must address"],
          ["Analyze to determine what is valuable", "Continuously assess and prioritize to maximize value delivered"],
          ["Get real using examples", "Use real examples to build shared understanding and derive acceptance criteria"],
          ["Understand what is doable", "Deliver within constraints, including the operational environment"],
          ["Stimulate collaboration and continuous improvement", "Create an environment where all stakeholders contribute; adapt on feedback"],
          ["Avoid waste", "Remove activities that don’t contribute to satisfying the need"],
        ],
      },
      points: [
        "**Shared values:** Respect, Courage, Collaboration, Ethics, Curiosity, Continuous learning, Improvement, Customer focus, Value maximization",
        "There is **no single analysis approach** — techniques, processes and tools are combined depending on context",
        "An empowering mindset is developed by achieving outcomes, discovering value, adopting the principles, deciding how to approach the work, and building competencies and techniques",
      ],
      examTip: "Discussion stuck in abstractions ⇒ **Get real using examples**. Effort adds nothing to the need ⇒ **Avoid waste**.",
    },
    {
      title: "Foundational competencies",
      domain: "Domain 2 · 14%",
      oneLiner: "There are 29 underlying competencies in six groups — and five that every business analysis professional should build.",
      visual: {
        type: "table",
        headers: ["Group", "Examples"],
        rows: [
          ["Analytical Thinking and Problem Solving", "Creative thinking, decision making, learning, problem solving, systems thinking, conceptual and visual thinking"],
          ["Behavioural Characteristics", "Ethics, personal accountability, trustworthiness, time management, adaptability"],
          ["Business Knowledge", "Business acumen, industry, organization, solution and methodology knowledge"],
          ["Communication Skills", "Verbal, non-verbal, written, listening"],
          ["Interaction Skills", "Facilitation, leadership and influencing, teamwork, negotiation and conflict resolution, teaching"],
          ["Tools and Technology", "Office productivity, business analysis and communication tools"],
        ],
      },
      points: [
        "**Adaptability** — adjusting behavioural style to increase effectiveness",
        "**Facilitation** — running workshops, negotiating, helping resolve conflicts",
        "**Leadership and Influencing** — building consensus, recommending solutions, guiding stakeholders to the desired value",
        "**Problem Solving** — making sure the value created addresses the root cause",
        "**Systems Thinking** — holistically understanding the enterprise and context",
      ],
      examTip: "Question asks which competency fits ⇒ match the verb: **facilitate ⇒ Facilitation**, **understand the whole enterprise ⇒ Systems Thinking**.",
    },
    {
      title: "Roles, approaches & organizational considerations",
      domain: "Domain 3 · 6%",
      oneLiner: "Business analysis is a skill set, not a job title — and the approach you take should fit the situation.",
      visual: {
        type: "table",
        headers: ["Approach", "How it works", "Choose it when work is…"],
        rows: [
          ["Predictive", "Plan everything up front, then work the plan and track against it", "Well-defined, heavily regulated, straightforward or sequential"],
          ["Adaptive", "Deliver value in small, prioritized increments; learn and adapt from feedback", "Complex, poorly defined, uncertain, or with emerging needs"],
          ["Hybrid", "Use what works best — different initiatives, or different parts of one", "Mixed"],
        ],
      },
      points: [
        "Anyone doing work like **analyzing needs, designing solutions, facilitating collaboration or improving processes** benefits from business analysis — whatever their title",
        "Sometimes the approach is **imposed** on the team; when you can choose, weigh the nature of the work",
        "Organizational considerations that shape the work: **security integration, ethical analysis, inclusion and representation, sustainability practices**",
        "When the “best” choice and the **ethical** choice differ, IIBA’s Code of Ethical Conduct guides the decision",
      ],
      examTip: "Heavily regulated, well-understood work ⇒ **predictive**. Poorly defined, evolving needs ⇒ **adaptive**.",
    },
    {
      title: "Requirements vs. designs",
      domain: "Domain 3 · 6%",
      oneLiner: "A requirement is a usable representation of a need; a design is a usable representation of a solution.",
      visual: {
        type: "table",
        headers: ["", "Requirements", "Designs"],
        rows: [
          ["Focus", "What kind of value could be delivered", "How value might be realized if built"],
          ["Represents", "The need", "The potential solution"],
          ["Example", "“Reduce the time to pick and pack an order”", "A process model of the new pick-and-pack flow"],
          ["Example", "“Provide information in English and French”", "A prototype showing text in both languages"],
        ],
      },
      points: [
        "They’re **interdependent and cyclical** — designs reveal new requirement insights, and changing requirements update designs",
        "**Business** requirements: goals and outcomes for __why__ a change was initiated",
        "**Stakeholder** requirements: needs that must be met to achieve the business requirements",
        "**Solution** requirements: capabilities and qualities of a solution — **functional** (behaviour, information) and **non-functional** (quality of service)",
        "**Transition** requirements: temporary — data conversion, training, business continuity",
        "**Traceability** tracks each requirement **backward** to its origin need and **forward** to solution components — it supports change control and impact analysis",
      ],
      examTip: "Mock-up, prototype, process model of the future ⇒ **design**. Statement of what stakeholders need ⇒ **requirement**.",
    },
    {
      title: "Change & context",
      domain: "Domain 4 & 9 · 20%",
      oneLiner: "Understand the current state and the circumstances around it before recommending anything.",
      visual: {
        type: "table",
        headers: ["Factor type", "Examples"],
        rows: [
          ["Organizational", "Strategy, goals, culture, structure, processes"],
          ["Environmental", "Market trends, competitors, regulations, technology"],
          ["Stakeholder", "Attitudes, beliefs, resistance or lack of engagement"],
        ],
      },
      points: [
        "**Analyze the current state** to identify the areas a change would impact, and evaluate those impacts",
        "Check alignment with **business objectives** — they are the benchmark for judging a solution",
        "Track progress toward goals; when milestones slip, **adjust the plan and communicate updated timelines**",
        "Suggest **simple improvements** within clear guidelines",
        "**Context:** validate the **quality and relevance** of information and document the outcome; recognize **constraints** and adapt plans to stay aligned",
        "For emerging technology, start with a **risk–benefit analysis** of its relevance; apply relevant **industry standards and frameworks**",
        "Techniques: **SWOT** (internal strengths/weaknesses, external opportunities/threats), **Process Analysis**, **Root Cause Analysis**",
      ],
      examTip: "Recommending changes to a process you haven’t studied ⇒ **analyze the current state first**.",
    },
    {
      title: "Need — elicitation, documentation & prioritization",
      domain: "Domain 5 · 10%",
      oneLiner: "Draw out what stakeholders really need, write it down clearly, confirm it, and rank it by value and urgency.",
      visual: {
        type: "flow",
        title: "From conversation to priority",
        direction: "horizontal",
        nodes: [
          { label: "Prepare", tone: "sky" },
          { label: "Elicit", sub: "build rapport", tone: "gold" },
          { label: "Document", sub: "clearly", tone: "mint" },
          { label: "Confirm", sub: "validate with stakeholders", tone: "ember" },
          { label: "Prioritize", sub: "value + urgency", tone: "gold" },
        ],
      },
      points: [
        "Basic methods: **interviews, workshops, brainstorming, document analysis, collaborative games**",
        "A stakeholder struggles to articulate needs ⇒ a **follow-up interview with targeted, clarifying questions**",
        "A requirement is unclear ⇒ **collaborate with the stakeholder to refine and confirm it** — don’t guess, drop it, or pass it up unresolved",
        "**Compare needs with outcomes** to check alignment, and flag conflicts for review",
        "Support prioritization by weighing **business value and urgency**",
      ],
      examTip: "Vague requirement ⇒ **clarify with the stakeholder** first. Competing requests ⇒ **business value and urgency**.",
    },
    {
      title: "Solution — options, validation, scope & design",
      domain: "Domain 6 · 10%",
      oneLiner: "Help evaluate options honestly — feasibility, risks, value — and keep design artifacts current.",
      points: [
        "**Evaluate options** on feasibility, cost/benefit and risk, then contribute to a **recommendation** with rationale",
        "**Verification** checks requirements meet quality standards; **validation** checks the solution really meets the business need",
        "When solution testing finds a defect, **document the finding** and discuss next steps with the team — record it transparently",
        "**Scope modelling** shows the boundary of a business domain or solution (e.g. a context diagram)",
        "Risk responses to know: **avoid, mitigate, transfer, accept**",
        "Keep **design artifacts** (models, mock-ups, prototypes) updated so they stay clear and accurate",
        "Support defining scope and planning/monitoring the implementation activities",
      ],
      examTip: "Two options meet the need but one is riskier ⇒ **assess feasibility and risks, then recommend** with reasons.",
    },
    {
      title: "Stakeholders — analysis, communication & collaboration",
      domain: "Domain 7 · 10%",
      oneLiner: "Know who they are, what drives them, and tailor how you engage each.",
      visual: {
        type: "table",
        headers: ["Typical stakeholder role", "Cares about"],
        rows: [
          ["Sponsor", "Funding, business case, return on the change"],
          ["Customer / end user", "How the solution affects their day-to-day experience"],
          ["Domain / implementation SME", "Accuracy of the business or technical detail"],
          ["Project manager", "Scope, schedule, cost"],
          ["Regulator", "Compliance with rules and standards"],
          ["Tester", "Clear, testable requirements and expected behaviour"],
        ],
      },
      points: [
        "Stakeholders are often defined by their **interest, impact and influence** over the change",
        "**Tailor messages** — concise impact and decisions for executives, detail for delivery teams",
        "Understand **motivations, drivers and concerns** to understand their decisions",
        "**Facilitate collaboration and feedback** throughout the initiative",
        "Techniques: **Stakeholder List, Map, or Personas**; **Workshops**; **Interviews**",
        "A request that exceeds budget and timeline ⇒ **assess feasibility and recommend a viable alternative** rather than approving or flatly rejecting it",
      ],
      examTip: "Different audiences ⇒ **tailor** the message; one detailed report for everyone is the wrong answer.",
    },
    {
      title: "The 20 techniques — cheat sheet",
      domain: "Techniques · BABOK Ch. 10",
      oneLiner: "The exam assesses these 20 techniques — know each one’s purpose.",
      visual: {
        type: "table",
        headers: ["Technique", "Use it to…"],
        rows: [
          ["Backlog Management", "Record, track and prioritize remaining work items"],
          ["Brainstorming", "Generate many ideas from a group quickly"],
          ["Business Capability Analysis", "Describe what the business can do, to plan change and find gaps"],
          ["Business Rules Analysis", "Identify, express and organize the rules governing business behaviour"],
          ["Collaborative Games", "Use structured games to build shared understanding and elicit information"],
          ["Data Modelling", "Describe entities, attributes and relationships"],
          ["Document Analysis", "Examine existing documentation for information"],
          ["Interviews", "Ask questions of a person or small group to elicit information"],
          ["Lessons Learned", "Capture successes, failures and improvement opportunities"],
          ["Metrics and KPIs", "Measure the performance of a solution or of work"],
          ["Organizational Modelling", "Show roles, responsibilities and reporting structures"],
          ["Process Analysis", "Assess a process’s effectiveness and efficiency; find improvements"],
          ["Process Modelling", "Show graphically how work is carried out (flowcharts, swimlanes)"],
          ["Risk Analysis and Management", "Identify, assess and manage uncertainties"],
          ["Root Cause Analysis", "Find underlying causes (e.g. fishbone, 5 Whys)"],
          ["Scope Modelling", "Show the boundary of a domain or solution (e.g. context diagram)"],
          ["Stakeholder List, Map, or Personas", "Identify and analyze stakeholders; represent user types"],
          ["SWOT Analysis", "Assess strengths, weaknesses, opportunities and threats"],
          ["User Stories", "Express a need briefly: “As a…, I want…, so that…” with acceptance criteria"],
          ["Workshops", "Bring stakeholders together in a structured event to collaborate"],
        ],
      },
      examTip: "Match verb to technique: **find underlying cause ⇒ Root Cause Analysis**; **show what’s in/out of scope ⇒ Scope Modelling**.",
    },
  ],

  quiz: [
    {
      q: "A retail manager tells you customers abandon their carts because checkout takes too long. In BACCM terms, the slow checkout is best described as which core concept?",
      options: ["Change", "Need", "Solution", "Context"],
      answer: 1,
      explanation:
        "A **need** is a problem or opportunity to be addressed. A change is the act of transformation, a solution is a way of satisfying the need, and context is the surrounding circumstances.",
    },
    {
      q: "Which of the following is the best example of intangible value from a new customer portal?",
      options: [
        "A 30% reduction in support calls, saving $200,000 per year",
        "Lower printing costs",
        "Improved customer trust and brand reputation",
        "Invoices processed in fewer hours",
      ],
      answer: 2,
      explanation:
        "**Intangible value** is measured indirectly and is often motivational — like reputation or morale. The other options are directly measurable.",
    },
    {
      q: "Stakeholders keep discussing a vague requirement in generalities and can’t agree what it means. Which principle helps most?",
      options: [
        "Avoid waste",
        "See the whole",
        "Think as a customer",
        "Get real using examples",
      ],
      answer: 3,
      explanation:
        "**Get real using examples** builds shared understanding of the need and helps derive acceptance criteria. Concrete scenarios cut through abstract debate.",
    },
    {
      q: "You can choose the approach for an initiative that is well-defined, heavily regulated and can be completed sequentially. Which approach fits best?",
      options: ["Predictive", "Adaptive", "Whichever the team prefers", "No defined approach"],
      answer: 0,
      explanation:
        "**Predictive** suits work that is well-defined, heavily regulated, relatively straightforward or sequential. Adaptive suits complex, poorly defined or uncertain work.",
    },
    {
      q: "Which of these is a design rather than a requirement?",
      options: [
        "“Reduce the time it takes to pack a customer order”",
        "“Record and access a patient’s history”",
        "A screen mock-up showing the fields of a patient record",
        "“Provide information in two languages”",
      ],
      answer: 2,
      explanation:
        "A **design** is a usable representation of a solution (mock-up, prototype, process model). The others state needs — **requirements**.",
    },
    {
      q: "A sponsor asks you to recommend improvements to an order-handling process you have never studied. What is the most appropriate first step?",
      options: [
        "Draft the future-state process",
        "Analyze the current state to understand how it works and which areas would be impacted",
        "Select a vendor for a new system",
        "Write the test cases for the new process",
      ],
      answer: 1,
      explanation:
        "Before recommending change, **analyze the current state** — it reveals the areas impacted and what needs to improve.",
    },
    {
      q: "In an interview, a stakeholder says only “the system needs to be user-friendly.” What should you do next?",
      options: [
        "Record it as stated",
        "Substitute your own interpretation",
        "Drop the statement as too vague",
        "Ask targeted, clarifying follow-up questions and for examples",
      ],
      answer: 3,
      explanation:
        "Vague statements are clarified through **targeted follow-up questions and examples** so the underlying need is understood.",
    },
    {
      q: "Two stakeholders each insist their request is the top priority. What should guide the support you provide in prioritizing?",
      options: [
        "The business value and urgency of each need",
        "The seniority of the requester",
        "Which request is easiest to document",
        "The order the requests arrived",
      ],
      answer: 0,
      explanation:
        "Support prioritization by considering **business value and urgency** — not seniority, convenience or arrival order.",
    },
    {
      q: "Two solution options both meet the need, but one is cheaper with significantly higher delivery risk. What should you do?",
      options: [
        "Recommend the cheaper option without comment",
        "Let the developers choose",
        "Wait until a risk-free option exists",
        "Assess feasibility and risks of both and contribute a recommendation with rationale",
      ],
      answer: 3,
      explanation:
        "Evaluating options means weighing **feasibility and risk**, then contributing a reasoned recommendation.",
    },
    {
      q: "You must update executive sponsors and delivery-team members about a schedule delay. Which approach best maintains engagement?",
      options: [
        "Send the same detailed technical report to everyone",
        "Tailor the message: concise impact and decisions for sponsors, detail for the delivery team",
        "Wait until someone asks",
        "Tell only the delivery team",
      ],
      answer: 1,
      explanation:
        "**Tailor communication** to each audience’s needs — sponsors need impact and decisions, the team needs the detail.",
    },
    {
      q: "A team wants to know whether a new self-service tool is delivering value. What should you support first?",
      options: [
        "Adding more features to the tool",
        "Counting pages of project documentation",
        "Training the developers",
        "Defining KPIs aligned with the intended value so success can be measured",
      ],
      answer: 3,
      explanation:
        "Support **defining KPIs aligned with value** so success can actually be measured against what was intended.",
    },
    {
      q: "Two departmental reports give conflicting monthly sales totals, and you need a figure for your analysis. What should you do first?",
      options: [
        "Average the two figures",
        "Use the higher figure",
        "Validate the quality and source of both, and document the outcome",
        "Ignore both reports",
      ],
      answer: 2,
      explanation:
        "Information must be **validated for quality and alignment** before it’s used — and the outcome documented.",
    },
  ],
};

const ecbaStudy: QAItem[] = certStudyCards(ecba);

export const ecbaCards: QAItem[] = [
  {
    id: "cert-ecba-link",
    question: "Entry Certificate in Business Analysis (ECBA) — official exam page",
    category: "ECBA",
    tags: ["IIBA", "Official Page"],
    answer: linkAnswer,
  },
  {
    id: "cert-ecba-syllabus",
    question: "ECBA — exam blueprint & syllabus",
    category: "ECBA",
    tags: ["IIBA", "Syllabus"],
    answer: syllabusAnswer,
  },
  ...ecbaStudy,
];
