import type { Section } from "./types";

export const qansRockySection: Section = {
  slug: "qans",
  title: "RingDeck Q & Answers",
  tagline: "Roadwork for data analysts — before dawn, no shortcuts.",
  emoji: "🏃",
  gradient: "from-[oklch(0.62_0.2_25)] via-[oklch(0.58_0.18_15)] to-[oklch(0.5_0.16_350)]",
  items: [
    // ── Basics ────────────────────────────────────────────────────────────
    {
      id: "data-analyst-responsibilities",
      category: "Basics",
      question: "What are the key responsibilities of a data analyst?",
      tags: ["Fundamentals", "Role"],
      difficulty: "Easy",
      answer: [
        {
          type: "list",
          items: [
            "**Collecting data** from various sources",
            "**Cleaning and organizing** it",
            "**Conducting analysis** and building reports",
            "**Presenting** findings to clients and stakeholders",
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
      id: "handling-missing-values",
      category: "Basics",
      question: "How can you handle missing values in a dataset?",
      tags: ["Data Cleaning", "Statistics"],
      difficulty: "Medium",
      answer: [
        {
          type: "text",
          content: "There are four common ways to handle missing values in a dataset:",
        },
        {
          type: "flow",
          title: "Four ways to handle missing data",
          direction: "vertical",
          nodes: [
            {
              label: "Listwise Deletion",
              sub: "Drop any row with a missing value",
              tone: "ember",
            },
            {
              label: "Mean / Median / Mode Imputation",
              sub: "Replace with the observed average",
              tone: "gold",
            },
            {
              label: "Regression Substitution",
              sub: "Predict the missing value from other variables",
              tone: "sky",
            },
            {
              label: "Multiple Imputation",
              sub: "Simulate several plausible datasets and average them",
              tone: "mint",
            },
          ],
        },
        { type: "heading", content: "1. Listwise Deletion (Complete Case Analysis)" },
        {
          type: "text",
          content:
            "An entire observation (row) is excluded from the analysis if it contains **any** missing value.",
        },
        {
          type: "callout",
          variant: "warn",
          content:
            "Simple and straightforward, but ==highly inefficient== and can introduce significant selection bias — only appropriate when the percentage of missing data is very small (**<5%**).",
        },
        { type: "heading", content: "2. Mean / Median / Mode Imputation (Single Imputation)" },
        {
          type: "text",
          content:
            "The missing value in a specific variable is replaced by the **mean** (or median/mode) of the observed values for that same variable.",
        },
        { type: "heading", content: "3. Regression Substitution (Single Regression Imputation)" },
        {
          type: "text",
          content:
            "A predictive model (e.g., linear regression) is built using the non-missing variables to estimate the missing value in the target variable. The missing values are then replaced by the predicted values (ŷ) from this model.",
        },
        { type: "heading", content: "4. Multiple Imputation (MI)" },
        {
          type: "callout",
          variant: "tip",
          content:
            "**MI is the most robust technique.** It creates plausible values based on the correlations in the data, then averages several simulated datasets while incorporating random error in the predictions.",
        },
      ],
    },
    {
      id: "fact-vs-dimension-tables",
      category: "Basics",
      question:
        "Explain the difference between Fact Tables and Dimension Tables in a data warehouse (Star Schema).",
      tags: ["Data Warehousing", "Star Schema"],
      difficulty: "Medium",
      answer: [
        {
          type: "text",
          content: "In a Star Schema data warehouse, tables split into two roles:",
        },
        {
          type: "table",
          headers: ["Fact Table", "Dimension Table"],
          rows: [
            [
              "Contains the **quantitative, measurable data** — the metrics and business events you want to analyze",
              "Contains the **descriptive attributes** used to filter, group, or label the measures in the fact table",
            ],
            [
              "Records specific transactions or observations",
              'Provides the "who, what, where, when, and how" context',
            ],
            [
              "Generally ==very large== (millions/billions of rows)",
              "Relatively small — designed for usability and readability in reporting",
            ],
            [
              "Numeric, additive values (e.g., sales amount, quantity)",
              "Descriptive text or categorical data (e.g., Customer Name, Product Color, Store Location, Calendar Date)",
            ],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "**Star Schema:** the central Fact Table is joined to multiple Dimension Tables — one hub, many descriptive spokes.",
        },
      ],
    },
    {
      id: "calculated-column-vs-measure",
      category: "Basics",
      question: "Calculated Column vs. Measure — what's the difference?",
      tags: ["Data Modeling", "DAX"],
      difficulty: "Medium",
      answer: [
        {
          type: "table",
          headers: ["Calculated Column", "Measure"],
          rows: [
            [
              "Added to a table in the data model, calculated **row-by-row** (like a calculated field in Excel)",
              "A dynamic formula calculated **at query time** (on the fly)",
            ],
            [
              "Consumes memory and disk space",
              "Does **not** consume physical storage in the model",
            ],
            [
              "Use when the result needs to work as a **filter or slicer**",
              "Use to **aggregate data** (`SUM()`, `AVERAGE()`) — essential for most KPIs",
            ],
          ],
        },
      ],
    },
    {
      id: "outlier-detection",
      category: "Basics",
      question: "What is Outlier Detection, and what methods do analysts use?",
      tags: ["Statistics", "Data Quality"],
      difficulty: "Medium",
      answer: [
        {
          type: "text",
          content:
            "Outlier detection identifies extreme values that don't follow the general pattern of the data and may distort analysis.",
        },
        {
          type: "list",
          items: [
            "**Z-score** — how many standard deviations a point sits from the mean",
            "**IQR (Interquartile Range)** — flags points outside 1.5× the IQR",
            "**Boxplot analysis** — visual summary of spread and extremes",
            "**Visual inspection** — scatterplots or histograms",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "Analysts decide whether to **keep, remove, or cap** outliers based on business logic and impact on model accuracy.",
        },
      ],
    },
    {
      id: "measures-of-central-tendency",
      category: "Basics",
      question: "What are Measures of Central Tendency, and when do you use each?",
      tags: ["Statistics", "Fundamentals"],
      difficulty: "Easy",
      answer: [
        {
          type: "text",
          content: "Central tendency includes **Mean**, **Median**, and **Mode**.",
        },
        {
          type: "table",
          headers: ["Measure", "When to use it"],
          rows: [
            ["**Mean**", "Normally distributed numerical data"],
            ["**Median**", "Data with outliers or skew (e.g., income distributions)"],
            ["**Mode**", "Categorical or high-frequency repeating values"],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content: "Analysts choose based on **distribution shape** and business context.",
        },
      ],
    },
    {
      id: "time-series-trends-seasonality",
      category: "Basics",
      question: "How do you analyze time-series data and identify trends or seasonality?",
      tags: ["Time Series", "Analysis"],
      difficulty: "Hard",
      answer: [
        {
          type: "text",
          content:
            "I start by ensuring the data has a consistent time grain (daily, weekly, monthly). My approach:",
        },
        {
          type: "flow",
          title: "Time-series analysis, step by step",
          direction: "vertical",
          nodes: [
            {
              label: "Trend Analysis",
              sub: "Line charts + rolling averages; compare MoM, QoQ, YoY",
              tone: "gold",
            },
            {
              label: "Seasonality Detection",
              sub: "Segment by month/week/weekday, look for repeating patterns",
              tone: "sky",
            },
            {
              label: "Anomaly Detection",
              sub: "Flag sudden spikes or drops via thresholds or Z-scores",
              tone: "ember",
            },
            {
              label: "Business Context Validation",
              sub: "Correlate with known events — promotions, holidays, outages",
              tone: "mint",
            },
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "**Bottom line:** trends explain direction, seasonality explains patterns, and context explains why.",
        },
      ],
    },
    {
      id: "chart-selection-framework",
      category: "Basics",
      question: "How do you decide which chart or visualization to use for a given dataset?",
      tags: ["Visualization", "Fundamentals"],
      difficulty: "Medium",
      answer: [
        {
          type: "text",
          content:
            "The key is to show that the choice is driven by two factors: the **type of data relationship** and the **business question** you're trying to answer.",
        },
        {
          type: "text",
          content:
            "I use a simple two-step framework: identify the relationship, then select the chart that conveys it most clearly and accurately.",
        },
        { type: "heading", content: "Comparison & composition (static)" },
        {
          type: "list",
          items: [
            "**Bar/Column Chart** — comparing values across categories (use horizontal bars if category names are long)",
            "**Stacked Column/Bar Chart** — comparison across categories *and* the breakdown within each one",
          ],
        },
        { type: "heading", content: "Trend (change over time)" },
        {
          type: "list",
          items: [
            "**Line Chart** — changes in one or more continuous variables over time",
            "**Area Chart** — good for cumulative totals",
          ],
        },
        { type: "heading", content: "Distribution" },
        {
          type: "list",
          items: [
            "**Histogram** — frequency distribution (e.g., grouping ages to see where most customers fall)",
            "**Box Plot** — comparing distribution across categories, highlighting median, quartiles, and outliers",
          ],
        },
        { type: "heading", content: "Relationship (correlation)" },
        {
          type: "list",
          items: [
            "**Scatter Plot** — investigating the relationship between two numerical variables; reveals correlation and outliers",
            "**Bubble Chart** — a scatter plot variant that compares three variables (X, Y, and bubble size)",
          ],
        },
        { type: "heading", content: "Final consideration: audience & context" },
        {
          type: "table",
          headers: ["Audience", "Best fit"],
          rows: [
            ["**Executive**", "Simple, high-level — single KPI cards or a line chart with one clear takeaway"],
            ["**Analyst**", "Can handle more — box plots or heatmaps that show statistical detail and density"],
            [
              "**Large datasets**",
              "Prioritize interactivity — e.g., treemaps for drilling into hierarchical composition",
            ],
          ],
        },
      ],
    },
    {
      id: "m-query-language",
      category: "Basics",
      question: "What is M Query Language?",
      tags: ["Power Query", "Fundamentals"],
      difficulty: "Easy",
      answer: [
        {
          type: "text",
          content:
            "**M Language (Power Query Formula Language)** is the functional language used inside the Power Query Editor in Power BI and Excel to perform data transformation, cleaning, and wrangling — ==unpivoting columns, merging tables==, and more.",
        },
      ],
    },
    {
      id: "kpi-design",
      category: "Basics",
      question: "What is a KPI, and how do you design a good KPI for a business?",
      tags: ["KPIs", "Fundamentals"],
      difficulty: "Easy",
      answer: [
        {
          type: "text",
          content:
            "A **KPI (Key Performance Indicator)** is a quantifiable metric that measures progress toward a business goal.",
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "A strong KPI must be **Specific, Measurable, Actionable, Relevant, and Time-bound (SMART)** and tied directly to decision-making.",
        },
        {
          type: "text",
          content:
            "I design KPIs by aligning with business stakeholders, validating data sources, defining calculation logic in SQL/DAX, and ensuring consistent use across dashboards.",
        },
      ],
    },
    {
      id: "data-profiling",
      category: "Basics",
      question: "What is Data Profiling?",
      tags: ["Data Quality", "EDA"],
      difficulty: "Easy",
      answer: [
        {
          type: "text",
          content:
            "Systematic analysis of a dataset to gather stats on its **quality, structure, and content**.",
        },
        {
          type: "text",
          content:
            "Done early in EDA — before cleaning or modeling — to spot issues and plan fixes.",
        },
      ],
    },
    {
      id: "data-transformation",
      category: "Basics",
      question: "What is Data Transformation, and why is it essential in analytics?",
      tags: ["Data Cleaning", "Fundamentals"],
      difficulty: "Easy",
      answer: [
        {
          type: "text",
          content:
            "Data transformation converts raw data into a consistent structure suitable for analysis — cleaning, standardizing, aggregating, encoding, or reshaping.",
        },
        {
          type: "list",
          items: ["Scaling", "Normalizing", "Encoding categorical variables", "Binning", "Merging/splitting fields"],
        },
      ],
    },
    {
      id: "report-vs-dashboard-vs-dataset",
      category: "Basics",
      question: "What is the difference between Report, Dashboard, and Dataset?",
      tags: ["Power BI", "Fundamentals"],
      difficulty: "Easy",
      answer: [
        {
          type: "table",
          headers: ["Term", "What it is"],
          rows: [
            ["**Dataset**", "Data model with tables, relationships, and measures"],
            ["**Report**", "Interactive visuals built on a dataset"],
            ["**Dashboard**", "Single-page view combining visuals from multiple reports"],
          ],
        },
      ],
    },

    // ── PowerBI ───────────────────────────────────────────────────────────
    {
      id: "what-is-power-bi",
      category: "PowerBI",
      question: "What is Power BI and why is it used in enterprises?",
      tags: ["Power BI", "Fundamentals"],
      difficulty: "Easy",
      answer: [
        {
          type: "list",
          items: [
            "Power BI is **Microsoft's** business intelligence and data visualization platform",
            "It converts raw data from multiple sources into interactive dashboards and reports",
            "Enterprises use it for real-time decision-making, KPI tracking, and self-service analytics",
            "It integrates tightly with **Azure, SQL Server, Excel, and Microsoft Fabric**",
          ],
        },
      ],
    },
    {
      id: "power-bi-components",
      category: "PowerBI",
      question: "Explain the main components of Power BI.",
      tags: ["Power BI", "Architecture"],
      difficulty: "Easy",
      answer: [
        {
          type: "table",
          headers: ["Component", "Purpose"],
          rows: [
            ["**Power BI Desktop**", "Data modeling, DAX, and report creation"],
            ["**Power Query**", "ETL layer for data cleaning, transformation, and shaping"],
            ["**Power BI Service**", "Cloud platform for publishing, sharing, and collaboration"],
            ["**Power BI Gateway**", "Enables secure on-premises data refresh"],
            ["**Power BI Mobile**", "Access reports on mobile devices"],
          ],
        },
      ],
    },
    {
      id: "what-is-dax",
      category: "PowerBI",
      question: "What is DAX and where is it used?",
      tags: ["Power BI", "DAX"],
      difficulty: "Medium",
      answer: [
        {
          type: "list",
          items: [
            "**DAX (Data Analysis Expressions)** is a formula language used in Power BI",
            "Mainly used for calculated columns, measures, and KPIs",
            "DAX works on **filter context** and **row context**",
            "Common use cases: YTD calculations, running totals, rankings, and time intelligence",
          ],
        },
      ],
    },
    {
      id: "explaining-power-bi-project-in-interview",
      category: "PowerBI",
      question: "How do you explain a Power BI project in an interview?",
      tags: ["Power BI", "Interview"],
      difficulty: "Medium",
      answer: [
        {
          type: "list",
          ordered: true,
          items: [
            "Start with the **business problem**",
            "Explain **data sources and modeling**",
            "Highlight **DAX complexity and performance tuning**",
            "End with **business impact and adoption metrics**",
          ],
        },
      ],
    },
    {
      id: "power-query-vs-dax",
      category: "PowerBI",
      question: "What is Power Query and how is it different from DAX?",
      tags: ["Power BI", "Power Query", "DAX"],
      difficulty: "Medium",
      answer: [
        {
          type: "table",
          headers: ["Power Query", "DAX"],
          rows: [
            ["Used for data extraction, cleaning, and transformation (**ETL**)", "Used for calculations and analytics"],
            ["Runs **before** data is loaded into the model", "Runs **after** data is loaded"],
            ["Uses **M language**", "Works on the data model"],
          ],
        },
      ],
    },
    {
      id: "power-bi-performance-optimization",
      category: "PowerBI",
      question: "How does Power BI handle performance optimization?",
      tags: ["Power BI", "Performance"],
      difficulty: "Hard",
      answer: [
        {
          type: "list",
          items: [
            "Use **Import mode** when possible",
            "Prefer **measures** over calculated columns",
            "Reduce **column cardinality**",
            "Use **star schema** modeling",
            "Optimize DAX using **VAR** and avoid unnecessary iterators",
          ],
        },
      ],
    },
    {
      id: "power-bi-gateway",
      category: "PowerBI",
      question: "What is the role of Power BI Gateway?",
      tags: ["Power BI", "Architecture"],
      difficulty: "Medium",
      answer: [
        {
          type: "list",
          items: [
            "Acts as a secure bridge between **on-premises data sources** and Power BI Service",
            "Enables scheduled refresh and DirectQuery",
            "No inbound firewall ports required",
            "Essential for enterprise hybrid architectures",
          ],
        },
      ],
    },
    {
      id: "publish-share-power-bi-reports",
      category: "PowerBI",
      question: "How do you publish and share reports in Power BI?",
      tags: ["Power BI", "Collaboration"],
      difficulty: "Easy",
      answer: [
        {
          type: "list",
          items: [
            "Reports are published from **Power BI Desktop** to **Power BI Service**",
            "Sharing is done via workspaces, apps, or direct user access",
            "Permissions are managed using **Viewer, Member, Contributor, Admin** roles",
            "Apps are used for controlled, read-only distribution to business users",
          ],
        },
      ],
    },
    {
      id: "power-bi-enterprise-security",
      category: "PowerBI",
      question: "How do you secure Power BI reports at an enterprise level?",
      tags: ["Power BI", "Security"],
      difficulty: "Hard",
      answer: [
        {
          type: "list",
          items: [
            "Implement **Row-Level Security (RLS)**",
            "Use workspace **role-based access control**",
            "Leverage **Microsoft Entra ID (Azure AD)** groups",
            "Secure datasets separately from reports",
          ],
        },
      ],
    },
    {
      id: "design-power-bi-dashboard",
      category: "PowerBI",
      question: "How do you design a Power BI dashboard from scratch?",
      tags: ["Power BI", "Dashboard Design"],
      difficulty: "Medium",
      answer: [
        {
          type: "list",
          ordered: true,
          items: [
            "Start with **business requirements and KPIs**",
            "Identify **data sources and refresh frequency**",
            "Design a **star schema** data model",
            "Build **measures** using DAX, not calculated columns",
            "Validate with users and iterate based on feedback",
          ],
        },
      ],
    },
    {
      id: "power-bi-changing-requirements",
      category: "PowerBI",
      question: "How do you handle changing business requirements in Power BI?",
      tags: ["Power BI", "Stakeholder Management"],
      difficulty: "Medium",
      answer: [
        {
          type: "list",
          items: [
            "Start by **revalidating KPIs and definitions** with stakeholders",
            "Adjust **measures (DAX)** instead of restructuring the model",
            "Keep visuals flexible using **field parameters**",
            "Communicate changes through **versioned deployments**",
          ],
        },
      ],
    },

    // ── Tableau ───────────────────────────────────────────────────────────
    {
      id: "dimension-vs-measure-tableau",
      category: "Tableau",
      question: "What is the difference between a Dimension and a Measure in Tableau?",
      tags: ["Tableau", "Fundamentals"],
      difficulty: "Easy",
      answer: [
        {
          type: "table",
          headers: ["Dimension", "Measure"],
          rows: [
            ["Categorical fields used to **slice and group** data", "Numeric fields used for calculations and aggregations"],
            ["Typically define the level of detail in a visualization", "Usually aggregated using `SUM`, `AVG`, `MIN`, `MAX`, etc."],
          ],
        },
      ],
    },
    {
      id: "live-connection-vs-extract",
      category: "Tableau",
      question: "What is the difference between a Live Connection and an Extract in Tableau?",
      tags: ["Tableau", "Performance"],
      difficulty: "Medium",
      answer: [
        {
          type: "table",
          headers: ["Live Connection", "Extract"],
          rows: [
            ["Queries the source database **in real time**", "Stores a snapshot of data in Tableau's optimized **Hyper** format"],
            [
              "Provides current data but depends on source performance",
              "Generally faster dashboard performance — can be refreshed on a schedule",
            ],
          ],
        },
      ],
    },
    {
      id: "tableau-dashboard-performance",
      category: "Tableau",
      question: "How do you improve Tableau dashboard performance?",
      tags: ["Tableau", "Performance"],
      difficulty: "Hard",
      answer: [
        {
          type: "list",
          items: [
            "Use **extracts** when real-time data isn't required",
            "Reduce unnecessary filters, marks, and complex calculations",
            "Optimize database queries and data sources",
            "Use **context filters** carefully",
            "Analyze slow dashboards using **Performance Recording**",
          ],
        },
      ],
    },
    {
      id: "lod-expressions",
      category: "Tableau",
      question: "What are LOD expressions in Tableau?",
      tags: ["Tableau", "Calculations"],
      difficulty: "Hard",
      answer: [
        {
          type: "text",
          content:
            "**LOD (Level of Detail)** expressions control the level at which calculations are performed — a different granularity from the visualization itself.",
        },
        {
          type: "table",
          headers: ["LOD type", "What it does"],
          rows: [
            ["**FIXED**", "Calculates using a specified dimension, regardless of the visualization level"],
            ["**INCLUDE**", "Adds dimensions to the calculation"],
            ["**EXCLUDE**", "Removes dimensions from the calculation"],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "**Analogy:** Your dashboard shows sales by city, but you still want to calculate something at the state level. LOD lets you say, \"Regardless of what the chart is showing, calculate this at the state level.\"",
        },
      ],
    },
    {
      id: "tableau-enterprise-security",
      category: "Tableau",
      question: "How do you secure Tableau dashboards at an enterprise level?",
      tags: ["Tableau", "Security"],
      difficulty: "Hard",
      answer: [
        {
          type: "list",
          items: [
            "Use **users, groups, roles, and project-level permissions**",
            "Implement **Row-Level Security** for restricting data by user",
            "Integrate with enterprise authentication such as **SSO**",
            "Control access to projects, workbooks, views, and data sources",
            "Apply **least-privilege access** based on business requirements",
          ],
        },
      ],
    },
    {
      id: "discrete-vs-continuous-tableau",
      category: "Tableau",
      question: "What is the difference between Discrete and Continuous fields in Tableau?",
      tags: ["Tableau", "Fundamentals"],
      difficulty: "Medium",
      answer: [
        {
          type: "table",
          headers: ["Discrete", "Continuous"],
          rows: [
            ["Creates **headers**, displays individual values", "Creates **axes**, displays a range of values"],
            ["Appears as ==blue pills== in Tableau", "Appears as ==green pills== in Tableau"],
          ],
        },
        {
          type: "text",
          content: "The choice affects how Tableau structures and displays the visualization.",
        },
      ],
    },
    {
      id: "tableau-filters",
      category: "Tableau",
      question: "What are filters in Tableau and what are the different types?",
      tags: ["Tableau", "Filters"],
      difficulty: "Medium",
      answer: [
        {
          type: "text",
          content: "Filters control which data is included in a visualization. Common types:",
        },
        {
          type: "list",
          items: ["**Extract**", "**Data Source**", "**Context**", "**Dimension**", "**Measure**"],
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "**Context filters** create a subset that other filters can operate on — understanding Tableau's filter order of operations matters for complex dashboards.",
        },
      ],
    },
    {
      id: "tableau-calculated-field",
      category: "Tableau",
      question: "What is a calculated field in Tableau?",
      tags: ["Tableau", "Calculations"],
      difficulty: "Easy",
      answer: [
        {
          type: "text",
          content:
            "Calculated fields create new values using existing data — mathematical, logical, string, date, and aggregation calculations, reusable across multiple visualizations.",
        },
        {
          type: "text",
          content: "Examples: **Profit Margin**, **Sales Growth**, and custom business KPIs.",
        },
      ],
    },
    {
      id: "relationships-vs-joins-tableau",
      category: "Tableau",
      question: "What is the difference between Relationships and Joins in Tableau?",
      tags: ["Tableau", "Data Modeling"],
      difficulty: "Hard",
      answer: [
        {
          type: "table",
          headers: ["Relationships", "Joins"],
          rows: [
            ["Connect tables at the **logical layer** while keeping them separate", "**Physically combine** tables into a single table at the data layer"],
            [
              "Preserve each table's level of detail until the query is executed",
              "Can create duplicate records when tables have different levels of granularity",
            ],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "**Analogy:** Relationships are like keeping two Excel sheets separate but telling Tableau how they're connected. A Join is like physically combining both sheets into one large sheet. Relationships are generally preferred when working with multiple fact and dimension tables.",
        },
      ],
    },
    {
      id: "publish-share-tableau-dashboards",
      category: "Tableau",
      question: "How do you publish and share dashboards in Tableau?",
      tags: ["Tableau", "Collaboration"],
      difficulty: "Easy",
      answer: [
        {
          type: "list",
          items: [
            "Publish workbooks from **Tableau Desktop** to **Tableau Server** or **Tableau Cloud**",
            "Organize content using **projects and sites**",
            "Assign permissions to users and groups",
            "Share dashboards through links, subscriptions, or embedded views",
            "Manage refresh schedules for published data sources and extracts",
          ],
        },
      ],
    },

    // ── MS Fabric ─────────────────────────────────────────────────────────
    {
      id: "what-is-microsoft-fabric",
      category: "MS Fabric",
      question: "What is Microsoft Fabric?",
      tags: ["Fabric", "Fundamentals"],
      difficulty: "Easy",
      answer: [
        {
          type: "list",
          items: [
            "Microsoft Fabric is an **end-to-end cloud analytics platform**",
            "It brings data engineering, data integration, data science, real-time analytics, data warehousing, and Power BI into **one platform**",
            "It uses **OneLake** as a unified data storage layer",
            "It reduces the need to integrate multiple separate analytics services",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "**Analogy:** Fabric is like a shopping mall for data — instead of visiting separate locations for engineering, analytics, warehousing, and BI, everything is available under one roof.",
        },
      ],
    },
    {
      id: "what-is-onelake",
      category: "MS Fabric",
      question: "What is OneLake in Microsoft Fabric?",
      tags: ["Fabric", "OneLake"],
      difficulty: "Easy",
      answer: [
        {
          type: "list",
          items: [
            "OneLake is the **unified data lake** for the entire Microsoft Fabric organization",
            "It provides a single logical storage layer for Fabric workloads",
            "Data can be stored in open formats such as **Delta Parquet**",
            "**OneLake Shortcuts** can reference data in other locations without creating unnecessary copies",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "**Analogy:** Think of OneLake like OneDrive for enterprise data — different teams work with the same centralized storage instead of maintaining separate copies.",
        },
      ],
    },
    {
      id: "lakehouse-vs-warehouse",
      category: "MS Fabric",
      question: "What is the difference between a Lakehouse and a Warehouse in Microsoft Fabric?",
      tags: ["Fabric", "Data Modeling"],
      difficulty: "Medium",
      answer: [
        {
          type: "table",
          headers: ["Lakehouse", "Warehouse"],
          rows: [
            [
              "Combines data lake **flexibility** with data warehouse capabilities",
              "Optimized for **structured relational data** and SQL-based analytics",
            ],
            [
              "Ideal for engineering, Spark, notebooks, and structured or semi-structured data",
              "Fits traditional BI and SQL workloads",
            ],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "**Lakehouse** is commonly preferred for engineering and data science, while **Warehouse** fits traditional BI and SQL workloads.",
        },
      ],
    },
    {
      id: "fabric-power-bi-integration",
      category: "MS Fabric",
      question: "How does Microsoft Fabric integrate with Power BI?",
      tags: ["Fabric", "Power BI"],
      difficulty: "Medium",
      answer: [
        {
          type: "list",
          items: [
            "Power BI is **natively integrated** into Microsoft Fabric",
            "Fabric data from Lakehouses and Warehouses can be used directly for reporting",
            "**Direct Lake** allows Power BI to query OneLake data without traditional data import",
            "This can provide near Import-mode performance while avoiding unnecessary data duplication",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "**Analogy:** Instead of copying the data into Power BI, Direct Lake lets Power BI work much closer to where the data already lives.",
        },
      ],
    },
    {
      id: "what-is-direct-lake",
      category: "MS Fabric",
      question: "What is Direct Lake in Microsoft Fabric?",
      tags: ["Fabric", "Power BI", "Performance"],
      difficulty: "Hard",
      answer: [
        {
          type: "list",
          items: [
            "Direct Lake is a **Power BI connectivity mode** designed for Fabric data in OneLake",
            "It reads data directly from Delta tables without a traditional Import refresh",
            "It avoids many performance limitations associated with DirectQuery",
            "It's useful for large-scale Fabric analytics where fast reporting and fresh data are required",
          ],
        },
      ],
    },
    {
      id: "fabric-architecture-flow",
      category: "MS Fabric",
      question: "How do the core Microsoft Fabric concepts fit together end-to-end?",
      tags: ["Fabric", "Architecture", "Big Picture"],
      difficulty: "Medium",
      answer: [
        {
          type: "text",
          content:
            "For a Fabric interview, five concepts are foundational — the interviewer wants to see that you understand **why Fabric exists architecturally**, not just the individual product names.",
        },
        {
          type: "flow",
          title: "The five foundational concepts",
          direction: "vertical",
          nodes: [
            { label: "Fabric", tone: "gold" },
            { label: "OneLake", tone: "sky" },
            { label: "Lakehouse / Warehouse", tone: "mint" },
            { label: "Power BI", tone: "ember" },
            { label: "Direct Lake", tone: "gold" },
          ],
        },
        { type: "heading", content: "In a real project" },
        {
          type: "text",
          content: "You should be able to connect the pieces into a full pipeline:",
        },
        {
          type: "flow",
          title: "The end-to-end pipeline",
          direction: "vertical",
          nodes: [
            { label: "Source Systems", tone: "ember" },
            { label: "Data Factory / Pipelines", tone: "gold" },
            { label: "OneLake", tone: "sky" },
            { label: "Lakehouse / Warehouse", tone: "mint" },
            { label: "Semantic Model", tone: "gold" },
            { label: "Power BI", tone: "ember" },
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "That end-to-end flow — not the individual product names — is what the interviewer is actually trying to understand.",
        },
      ],
    },
    {
      id: "fabric-data-pipelines",
      category: "MS Fabric",
      question: "What are Data Pipelines in Microsoft Fabric?",
      tags: ["Fabric", "Data Factory"],
      difficulty: "Medium",
      answer: [
        {
          type: "list",
          items: [
            "Data Pipelines are used to **ingest, move, and orchestrate** data across different sources",
            "They're part of the **Data Factory** experience in Fabric",
            "Pipelines can perform scheduled and dependency-based data workflows",
            "They support activities such as Copy Data, notebooks, stored procedures, and data transformations",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "**Analogy:** A pipeline is like an automated delivery route — pick up data from different locations, process it, and deliver it to the right destination.",
        },
      ],
    },
    {
      id: "fabric-notebooks",
      category: "MS Fabric",
      question: "What is a Notebook in Microsoft Fabric?",
      tags: ["Fabric", "Data Engineering"],
      difficulty: "Easy",
      answer: [
        {
          type: "list",
          items: [
            "Notebooks provide an **interactive environment** for data engineering and data science",
            "They support languages such as **Python, SQL, and Spark**",
            "Commonly used for data transformation, exploration, and machine learning",
            "Notebooks can read and write data directly from Fabric **Lakehouses**",
          ],
        },
      ],
    },
    {
      id: "onelake-shortcuts",
      category: "MS Fabric",
      question: "What are OneLake Shortcuts?",
      tags: ["Fabric", "OneLake"],
      difficulty: "Medium",
      answer: [
        {
          type: "list",
          items: [
            "Shortcuts provide **references** to data without physically copying it into OneLake",
            "They can connect to data stored in other Fabric locations and supported external storage",
            "This reduces unnecessary data duplication",
            "Applications can work with the referenced data as though it exists within OneLake",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "**Analogy:** A Shortcut is like a desktop shortcut to a file — you can access the file without making another copy of it.",
        },
      ],
    },
    {
      id: "fabric-semantic-model",
      category: "MS Fabric",
      question: "What is a Semantic Model in Microsoft Fabric?",
      tags: ["Fabric", "Power BI", "Data Modeling"],
      difficulty: "Medium",
      answer: [
        {
          type: "list",
          items: [
            "A Semantic Model provides the **business layer** between raw data and Power BI reports",
            "It defines relationships, measures, calculations, and business-friendly structures",
            "DAX measures can be created within the semantic model",
            "Multiple Power BI reports can reuse the **same centralized** semantic model",
          ],
        },
      ],
    },
    {
      id: "fabric-data-security",
      category: "MS Fabric",
      question: "How do you secure data in Microsoft Fabric?",
      tags: ["Fabric", "Security"],
      difficulty: "Hard",
      answer: [
        {
          type: "list",
          items: [
            "Use **workspace roles and permissions** to control access",
            "Apply **Row-Level Security (RLS)** where users should see different subsets of data",
            "Use **Microsoft Entra ID** for identity and access management",
            "Apply appropriate permissions across Fabric items, semantic models, and Power BI reports",
            "Follow **least-privilege access** for enterprise environments",
          ],
        },
      ],
    },
  ],
};
