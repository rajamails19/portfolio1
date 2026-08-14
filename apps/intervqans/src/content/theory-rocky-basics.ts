import type { QAItem } from "./types";

export const theoryRockyBasicsItems: QAItem[] = [
  {
    id: "what-is-a-data-analyst",
    category: "Basics",
    question: "What exactly is a Data Analyst?",
    tags: ["Basics", "Role"],
    answer: [
      {
        type: "callout",
        variant: "tip",
        content:
          "A **Data Analyst** turns raw, messy data into clear, trustworthy answers to business questions — using existing data, not building new predictive models.",
      },
      { type: "heading", content: "What a data analyst does day to day" },
      {
        type: "list",
        items: [
          "Collects data from various sources",
          "Cleans and organizes it",
          "Explores it for patterns, trends, and anomalies",
          "Builds reports and dashboards",
          "Presents findings to stakeholders",
          "Monitors KPIs over time",
        ],
      },
      { type: "heading", content: "How this differs from adjacent roles" },
      {
        type: "table",
        headers: ["Role", "Primary focus"],
        rows: [
          ["**Data Analyst**", "Explains *what happened* and *why*, using existing data"],
          ["**Data Engineer**", "Builds and maintains the pipelines that move and store data"],
          ["**Data Scientist**", "Builds predictive/ML models to forecast *what will happen*"],
          ["**BI Developer**", "Builds and maintains the reporting/dashboard layer itself"],
        ],
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "**Analogy:** a data analyst is like a detective. The data engineer builds the filing cabinets and keeps them organized; the analyst reads the files and figures out what actually happened — and why.",
      },
    ],
  },
  {
    id: "why-data-analysts-exist",
    category: "Basics",
    question: "Why does the Data Analyst role exist?",
    tags: ["Basics", "Motivation"],
    answer: [
      {
        type: "text",
        content:
          "Organizations generate enormous amounts of data — transactions, clicks, support tickets, inventory movements. But **raw data doesn't answer questions by itself.** A spreadsheet with 2 million rows tells you nothing until someone asks it the right question.",
      },
      {
        type: "flow",
        direction: "vertical",
        nodes: [
          { label: "Raw Data", tone: "ember" },
          { label: "Data Analyst", tone: "gold" },
          { label: "Insight", tone: "sky" },
          { label: "Decision", tone: "mint" },
        ],
      },
      {
        type: "table",
        headers: ["Without a data analyst", "With a data analyst"],
        rows: [
          ["Gut-feeling decisions", "Evidence-based decisions"],
          ["Data sits unused in databases", "Data becomes insight"],
          ["Every team asks IT for a one-off export", "Self-service, reusable dashboards"],
          ["Two teams argue over whose numbers are right", "One shared, trusted definition of the truth"],
        ],
      },
      {
        type: "callout",
        variant: "tip",
        content: "Their goal is to enable **better decision-making** through data.",
      },
    ],
  },
  {
    id: "how-analysts-work-lifecycle",
    category: "Basics",
    question: "How does a data analyst actually work? The analysis lifecycle",
    tags: ["Basics", "Process"],
    answer: [
      {
        type: "text",
        content: "Good analysis follows a repeatable cycle — not a straight line, a **loop**.",
      },
      {
        type: "flow",
        direction: "vertical",
        nodes: [
          { label: "1. Ask the question", tone: "ember" },
          { label: "2. Collect the data", tone: "gold" },
          { label: "3. Clean & prepare", tone: "sky" },
          { label: "4. Explore & analyze", tone: "mint" },
          { label: "5. Visualize", tone: "gold" },
          { label: "6. Communicate", tone: "ember" },
          { label: "7. Act / decide", tone: "sky" },
          { label: "8. Monitor the result", tone: "mint" },
        ],
      },
      {
        type: "list",
        items: [
          "**Ask:** define exactly what the business needs — a vague question produces a vague answer",
          "**Collect:** pull from databases, APIs, spreadsheets, logs",
          "**Clean:** handle missing values, remove duplicates, standardize formats",
          "**Explore:** look for patterns, trends, and outliers",
          "**Visualize:** turn numbers into charts and dashboards people can actually read",
          "**Communicate:** present findings in plain language, not jargon",
          "**Act:** stakeholders make a decision based on what you found",
          "**Monitor:** track whether the decision actually worked — which often kicks off the next question",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        content: "This is a **loop, not a line** — good analysts revisit earlier steps constantly as they learn more.",
      },
    ],
  },
  {
    id: "when-descriptive-diagnostic-predictive-prescriptive",
    category: "Basics",
    question: "When do you use which type of analytics?",
    tags: ["Basics", "Analytics Maturity"],
    answer: [
      {
        type: "text",
        content: "There are four levels of analytics, each answering a different kind of question — and each harder than the last.",
      },
      {
        type: "flow",
        title: "Increasing complexity and value",
        direction: "vertical",
        nodes: [
          { label: "Descriptive", tone: "ember" },
          { label: "Diagnostic", tone: "gold" },
          { label: "Predictive", tone: "sky" },
          { label: "Prescriptive", tone: "mint" },
        ],
      },
      {
        type: "table",
        headers: ["Type", "Question it answers", "Example"],
        rows: [
          ["**Descriptive**", "What happened?", "Revenue was $2M last quarter"],
          ["**Diagnostic**", "Why did it happen?", "Revenue dropped because of a stockout in the Southeast"],
          ["**Predictive**", "What's likely to happen?", "Revenue will likely dip 5% next quarter based on the trend"],
          ["**Prescriptive**", "What should we do about it?", "Increase the inventory buffer by 15% in high-demand regions"],
        ],
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "Most data analyst roles live primarily in **Descriptive** and **Diagnostic**. Predictive and Prescriptive lean more toward Data Science — though in practice the line blurs constantly, especially as analysts pick up more statistics and Python.",
      },
    ],
  },
  {
    id: "data-analyst-toolkit",
    category: "Basics",
    question: "What's actually in a data analyst's toolkit?",
    tags: ["Basics", "Tools"],
    answer: [
      {
        type: "table",
        headers: ["Category", "Common tools"],
        rows: [
          ["Querying", "SQL — MySQL, PostgreSQL, SQL Server, BigQuery"],
          ["Spreadsheets", "Excel, Google Sheets"],
          ["Visualization", "Power BI, Tableau, Looker"],
          ["Programming", "Python (pandas), R"],
          ["Version control & collaboration", "Git, Notion, Confluence"],
          ["Cloud & data platforms", "Snowflake, Microsoft Fabric, Azure, AWS, GCP"],
        ],
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "You don't need to master all of these on day one. **SQL plus one visualization tool** covers the large majority of real analyst work — everything else layers on as projects demand it.",
      },
    ],
  },
  {
    id: "sql-for-analysts",
    category: "Basics",
    question: "Why is SQL the one skill every data analyst job requires?",
    tags: ["Basics", "SQL"],
    answer: [
      {
        type: "text",
        content:
          "SQL is the most consistently required skill across nearly every data analyst job posting — because almost all business data lives in a database, and SQL is how you ask a database precise questions.",
      },
      {
        type: "code",
        language: "sql",
        content: `SELECT
    Region,
    SUM(SalesAmount) AS TotalSales
FROM Sales
WHERE OrderDate >= '2026-01-01'
GROUP BY Region
ORDER BY TotalSales DESC;`,
      },
      {
        type: "list",
        items: [
          "**SELECT / FROM / WHERE** — filter and shape the data you want",
          "**GROUP BY + aggregations** — summarize (totals, averages, counts)",
          "**JOIN** — combine data spread across multiple tables",
          "**Window functions** — running totals, rankings, period-over-period comparisons",
          "**CTEs** — break a complex query into small, readable steps",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "**Analogy:** SQL is like asking a librarian a precise question instead of reading every book in the library yourself.",
      },
    ],
  },
  {
    id: "excel-vs-sql-vs-python",
    category: "Basics",
    question: "Excel vs SQL vs Python — when do you reach for each?",
    tags: ["Basics", "Tools"],
    answer: [
      {
        type: "table",
        headers: ["Excel", "SQL", "Python"],
        rows: [
          [
            "Best for small, ad-hoc data (thousands of rows)",
            "Best for querying large datasets directly in a database",
            "Best for repeatable, complex, or large-scale analysis",
          ],
          [
            "Manual, point-and-click",
            "Declarative — describe *what* you want, not *how*",
            "Scriptable, automatable, reusable",
          ],
          [
            "Great for quick one-off exploration",
            "Great for pulling exactly the data you need",
            "Great for statistics, automation, and chaining multiple steps together",
          ],
        ],
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "Many analysts use all three **together**: SQL to pull the data, Python to clean/transform it at scale, Excel for a quick gut-check or a one-off share with someone who doesn't have BI tool access.",
      },
    ],
  },
  {
    id: "da-real-time-scenario-sales-drop",
    category: "Basics",
    question: "Real-world scenario: diagnosing a sudden sales drop",
    tags: ["Basics", "Case Study", "Diagnostic"],
    answer: [
      {
        type: "callout",
        variant: "info",
        content: '**The ask:** "Regional sales dropped 12% last month. The VP wants to know why — by Friday."',
      },
      {
        type: "flow",
        direction: "vertical",
        nodes: [
          { label: "Confirm the drop is real", tone: "ember" },
          { label: "Segment it (region, product, channel, time)", tone: "gold" },
          { label: "Form hypotheses", tone: "sky" },
          { label: "Test each hypothesis against the data", tone: "mint" },
          { label: "Find the root cause", tone: "gold" },
          { label: "Recommend an action", tone: "ember" },
        ],
      },
      {
        type: "text",
        content:
          "First: rule out a **data problem** before chasing a business explanation — a broken pipeline or a duplicate filter can fake a drop that never happened. Once the drop is confirmed real, segment it to narrow down where it's coming from, then test specific hypotheses:",
      },
      {
        type: "table",
        headers: ["Hypothesis", "What the data showed"],
        rows: [
          ["Fewer customers", "Customer count was flat"],
          ["Lower prices", "Average price was unchanged"],
          ["Stockouts", "==3 top SKUs were out of stock for 9 days in the Southeast=="],
        ],
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "The answer wasn't a trend — it was a supply chain problem. This is why diagnostic analysis matters: **dashboards show WHAT happened, but you still have to dig for WHY.**",
      },
    ],
  },
  {
    id: "da-real-time-scenario-kpi-dashboard",
    category: "Basics",
    question: "Real-world scenario: building a KPI dashboard from scratch",
    tags: ["Basics", "Case Study", "Dashboards"],
    answer: [
      {
        type: "callout",
        variant: "info",
        content:
          '**The ask:** "Build a self-service dashboard so the sales team stops emailing us for a new export every week."',
      },
      {
        type: "flow",
        direction: "vertical",
        nodes: [
          { label: "Interview stakeholders", tone: "ember" },
          { label: "Define the KPIs precisely", tone: "gold" },
          { label: "Source and model the data", tone: "sky" },
          { label: "Build and test the dashboard", tone: "mint" },
          { label: "Ship it with documentation", tone: "gold" },
          { label: "Gather feedback and iterate", tone: "ember" },
        ],
      },
      {
        type: "text",
        content: "The step people skip — and pay for later — is nailing down exact definitions before building anything:",
      },
      {
        type: "list",
        items: [
          'What does "**Active Customer**" mean — purchased in last 30 days? 90?',
          "What timezone do dates use?",
          'What counts as a "**sale**" — booked, shipped, or paid?',
          "Who can see what data (row-level security)?",
        ],
      },
      {
        type: "callout",
        variant: "warn",
        content:
          "The biggest risk in dashboard projects isn't the visuals — it's **ambiguous definitions**. If two teams define \"Revenue\" differently, nobody trusts the dashboard, no matter how good it looks.",
      },
    ],
  },
  {
    id: "da-architecture-raw-to-decision",
    category: "Basics",
    question: "What does the architecture from raw data to business decision actually look like?",
    tags: ["Basics", "Architecture"],
    answer: [
      {
        type: "text",
        content: "Strip away any specific tool and every analytics stack — Power BI, Tableau, Fabric, or a homemade Python pipeline — follows the same shape:",
      },
      {
        type: "code",
        language: "text",
        content: `        DATA SOURCES
             │
   ┌─────────┼─────────┐
   │         │         │
Database  Spreadsheet  API / Logs
   │         │         │
   └─────────┼─────────┘
             ↓
        INGEST / ETL
             ↓
       CLEAN & MODEL
             ↓
     WAREHOUSE / TABLES
             ↓
      BI TOOL (dashboard)
             ↓
      BUSINESS DECISION`,
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "Notice this is the **same shape** as the Fabric and Power BI architectures elsewhere in this section — sources → transform → model → visualize → decide. Every analytics stack is a variation on this one pattern; only the specific tools at each step change.",
      },
    ],
  },
  {
    id: "data-quality-garbage-in-garbage-out",
    category: "Basics",
    question: "Why does data quality matter so much — \"garbage in, garbage out\"",
    tags: ["Basics", "Data Quality"],
    answer: [
      {
        type: "text",
        content:
          "No amount of clever analysis fixes bad input data. A perfectly built dashboard on top of wrong data is worse than no dashboard — because people **trust** it.",
      },
      { type: "heading", content: "Common data quality issues" },
      {
        type: "list",
        items: [
          "Missing values",
          "Duplicate records",
          "Inconsistent formats (dates, currencies, casing)",
          "Outdated or stale records",
          "Wrong data types",
          "Ambiguous or conflicting definitions",
        ],
      },
      {
        type: "table",
        headers: ["Symptom", "Likely cause"],
        rows: [
          ["Totals don't match Finance", "Different filter logic, or duplicate rows"],
          ["Numbers change every time you refresh", "Source system still processing, or a non-deterministic join"],
          ["Report looks fine but \"feels wrong\" to the business", "Silent definition mismatch"],
        ],
      },
      {
        type: "callout",
        variant: "warn",
        content:
          "Example: a dashboard silently mixing pre-tax and post-tax order totals will look completely normal — right up until someone reconciles it against Finance and loses confidence in every number you've ever shown them.",
      },
    ],
  },
  {
    id: "communicating-with-stakeholders",
    category: "Basics",
    question: "How should a data analyst communicate findings to stakeholders?",
    tags: ["Basics", "Communication"],
    answer: [
      {
        type: "text",
        content:
          "Analysis that nobody understands or acts on is wasted effort — communication is not an afterthought, it's part of the job.",
      },
      {
        type: "list",
        items: [
          "**Lead with the answer**, not the method — the headline first, the methodology second (if at all)",
          "Use **plain language**, not statistical jargon",
          "**One key number** per slide or visual, not fifteen",
          'Show the **"so what,"** not just the data',
          "Anticipate the first question they'll ask, and have the answer ready",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "**Analogy:** a good analyst is a translator — converting *\"the coefficient on region was statistically significant at p < 0.05\"* into *\"Southeast is underperforming, and here's why.\"*",
      },
    ],
  },
  {
    id: "data-analyst-10-things-to-know",
    category: "Basics",
    question: "What are the 10 things every data analyst should know?",
    tags: ["Basics", "Summary", "Interview"],
    answer: [
      { type: "heading", content: "If someone asks: \"What does a data analyst actually do?\"" },
      {
        type: "callout",
        variant: "tip",
        content:
          "**Strong answer:** A data analyst turns raw, often messy data into clear, trustworthy answers to specific business questions. That means collecting and cleaning data, analyzing it for patterns and root causes, building reports and dashboards that make the findings self-service, and communicating results in language stakeholders can act on — then monitoring whether the resulting decision actually worked.",
      },
      { type: "heading", content: "The 10 things every data analyst should know" },
      {
        type: "list",
        ordered: true,
        items: [
          "**SQL** — the baseline skill for almost every role",
          "**Spreadsheet fluency** (Excel/Sheets) for quick, small-scale work",
          "**A visualization tool** — Power BI, Tableau, or similar",
          "**Descriptive vs diagnostic vs predictive vs prescriptive** analytics",
          "**Data cleaning & quality checks** — before trusting any number",
          "**Basic data modeling** — star schema, fact vs dimension",
          "**Statistics fundamentals** — mean, median, distribution, outliers",
          "**Stakeholder communication** — plain language, lead with the answer",
          "**Root-cause / diagnostic thinking** — dashboards show *what*, you dig for *why*",
          "**Knowing when to escalate** — to a data engineer for pipeline issues, or a data scientist for predictive modeling",
        ],
      },
      { type: "heading", content: "What are we actually trying to achieve?" },
      {
        type: "flow",
        direction: "vertical",
        nodes: [
          { label: "Raw, scattered data", tone: "ember" },
          { label: "Clean, trustworthy data", tone: "gold" },
          { label: "Clear analysis", tone: "sky" },
          { label: "Plain-language insight", tone: "mint" },
          { label: "Confident business decision", tone: "gold" },
        ],
      },
      {
        type: "callout",
        variant: "info",
        content:
          "For an interview, a strong answer connects: **business question → data → cleaning → analysis → root cause → recommendation → measured impact.** If you can walk through that chain and explain *why* you made each choice along the way, you'll sound like someone who understands the job — not just someone who knows how to make a chart.",
      },
    ],
  },
];
