import type { Section } from "./types";

export const theoryRockySection: Section = {
  slug: "theory",
  title: "Conceptual Theory",
  tagline: "Start here — what the data-platform fuss actually means, in plain language.",
  emoji: "◐",
  gradient: "from-[oklch(0.62_0.2_25)] via-[oklch(0.58_0.18_15)] to-[oklch(0.5_0.16_350)]",
  items: [
    {
      id: "what-is-microsoft-fabric",
      category: "MS Fabric",
      question: "What exactly is Microsoft Fabric?",
      tags: ["Fabric", "Big Picture"],
      answer: [
        {
          type: "text",
          content:
            "Microsoft introduced Fabric publicly at Microsoft Build on **May 23, 2023** (initially in preview) and it became generally available in **November 2023**. The core idea: bring Microsoft's previously separate analytics technologies — Power BI, Data Factory, Synapse-style engineering/warehousing, real-time analytics, and data science — into **one SaaS analytics platform** centered around OneLake.",
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "The simplest definition: **Microsoft Fabric is Microsoft's unified, end-to-end data and analytics platform.** It lets an organization collect → store → clean → transform → analyze → model → visualize → monitor → act on data, ==without stitching together many separate platforms==.",
        },
        {
          type: "text",
          content:
            "Microsoft describes Fabric as a SaaS analytics platform supporting ingestion, transformation, real-time processing, analytics and reporting — with experiences including Data Factory, Data Engineering, Data Science, Data Warehouse, Real-Time Intelligence, Databases, and Power BI.",
        },
        { type: "heading", content: "Before Fabric" },
        {
          type: "flow",
          title: "A typical pre-Fabric analytics chain",
          direction: "vertical",
          nodes: [
            { label: "SQL Server", tone: "ember" },
            { label: "Azure Data Factory", tone: "gold" },
            { label: "Azure Data Lake", tone: "sky" },
            { label: "Databricks / Synapse Spark", tone: "mint" },
            { label: "Synapse Warehouse", tone: "gold" },
            { label: "Power BI Dataset", tone: "ember" },
            { label: "Power BI Report", tone: "sky" },
          ],
        },
        {
          type: "text",
          content: "Technically, this works. But now you have:",
        },
        {
          type: "list",
          items: [
            "Different services",
            "Different security models",
            "Different billing",
            "Different administration",
            "Different storage locations",
            "Data copies",
            "Separate monitoring",
            "Separate development experiences",
          ],
        },
        { type: "heading", content: "Fabric's idea" },
        {
          type: "flow",
          title: "All under one platform",
          direction: "vertical",
          nodes: [
            { label: "Data Factory", tone: "ember" },
            { label: "Data Engineering", tone: "gold" },
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
            "**Analogy:** Think about smartphones before the iPhone — camera, GPS, MP3 player, phone, calculator, and browser as separate devices. The smartphone didn't invent those capabilities; it **unified** them into one platform. Fabric is trying to do the same for enterprise analytics.",
        },
      ],
    },
    {
      id: "why-fabric-exists",
      category: "MS Fabric",
      question: "Why did Microsoft introduce Fabric?",
      tags: ["Fabric", "Motivation"],
      answer: [
        {
          type: "text",
          content:
            "The problem wasn't *\"companies don't have enough data tools.\"* It was almost the opposite — companies had **too many disconnected data tools**. Microsoft itself described the analytics landscape at Fabric's introduction as fragmented, with specialized services that organizations had to integrate themselves.",
        },
        { type: "heading", content: "Imagine a retail company" },
        {
          type: "table",
          headers: ["Data domain", "Source system"],
          rows: [
            ["Customers", "Salesforce"],
            ["Orders", "SQL Server"],
            ["Website", "Application logs"],
            ["Finance", "SAP"],
            ["Inventory", "Oracle"],
            ["Marketing", "Excel"],
            ["IoT", "Event streams"],
          ],
        },
        {
          type: "text",
          content:
            "Now management asks: *\"Show me today's sales, current inventory, customer behavior, and expected demand.\"* Suddenly several teams get pulled in:",
        },
        {
          type: "flow",
          title: "One question, one long relay",
          direction: "vertical",
          nodes: [
            { label: "Data Engineer", tone: "ember" },
            { label: "Data Warehouse Developer", tone: "gold" },
            { label: "Data Scientist", tone: "sky" },
            { label: "BI Developer", tone: "mint" },
            { label: "Power BI Developer", tone: "gold" },
            { label: "Business Analyst", tone: "ember" },
          ],
        },
        { type: "heading", content: "Fabric attempts to create one ecosystem" },
        {
          type: "code",
          language: "text",
          content: `                     MICROSOFT FABRIC

                 ┌────── OneLake ──────┐
                 │                     │
       Data Factory              Data Engineering
                 │                     │
            Data Science          Data Warehouse
                 │                     │
          Real-Time Intelligence
                 │
             Semantic Models
                 │
               Power BI`,
        },
        {
          type: "callout",
          variant: "info",
          content:
            "Fabric is delivered as **SaaS** — Microsoft manages much of the underlying infrastructure rather than making teams provision and integrate every component themselves.",
        },
      ],
    },
    {
      id: "onelake-heart-of-fabric",
      category: "MS Fabric",
      question: "OneLake: the heart of Fabric",
      tags: ["Fabric", "OneLake"],
      answer: [
        {
          type: "callout",
          variant: "tip",
          content: "If you remember only one Fabric concept: **OneLake is to enterprise data what OneDrive is to files.**",
        },
        {
          type: "text",
          content:
            "OneLake is the **unified logical data lake** for a Fabric organization, built on Azure Data Lake Storage technology. It's provisioned as part of Fabric rather than requiring every team to build its own separate lake infrastructure.",
        },
        {
          type: "code",
          language: "text",
          content: `                    COMPANY

                     OneLake
                        │
        ┌───────────────┼────────────────┐
        │               │                │
      Sales          Finance             HR
        │               │                │
   Lakehouse         Warehouse       Lakehouse`,
        },
        {
          type: "text",
          content: "Instead of:",
        },
        {
          type: "list",
          items: ["Sales Lake", "Finance Lake", "Marketing Lake", "HR Lake", "Analytics Lake", "AI Lake"],
        },
        {
          type: "text",
          content: "...you get a **common logical storage foundation**. Why does that matter? Because traditionally:",
        },
        {
          type: "flow",
          title: "The old copy chain",
          direction: "vertical",
          nodes: [
            { label: "Original Data", tone: "ember" },
            { label: "Copy for Data Lake", tone: "gold" },
            { label: "Copy for Warehouse", tone: "sky" },
            { label: "Copy for Analytics", tone: "mint" },
            { label: "Copy for Power BI", tone: "gold" },
          ],
        },
        {
          type: "callout",
          variant: "warn",
          content:
            "...creates ==data duplication + storage cost + synchronization problems + governance problems==.",
        },
        {
          type: "text",
          content:
            "Fabric's architecture is designed so multiple workloads can operate over OneLake instead. Microsoft states that Fabric workloads can **read and write the same underlying OneLake data** without repeatedly moving it between engines.",
        },
      ],
    },
    {
      id: "fabric-workloads-ingestion-engineering",
      category: "MS Fabric",
      question: "The Fabric workloads: getting and preparing data",
      tags: ["Fabric", "Data Factory", "Data Engineering", "Warehouse"],
      answer: [
        {
          type: "text",
          content:
            "Don't memorize the workload names independently — think of each as a specialist working inside the same company.",
        },
        { type: "heading", content: "1. Data Factory — \"Bring me the data\"" },
        {
          type: "list",
          items: ["Ingestion", "ETL/ELT", "Pipelines", "Dataflow Gen2", "Orchestration", "Scheduling"],
        },
        {
          type: "flow",
          direction: "vertical",
          nodes: [
            { label: "Oracle / SQL Server / Salesforce / CSV / API", tone: "ember" },
            { label: "Data Factory", tone: "gold" },
            { label: "OneLake", tone: "sky" },
          ],
        },
        { type: "heading", content: "2. Data Engineering — \"Prepare the data\"" },
        {
          type: "list",
          items: ["Lakehouse", "Spark", "Notebooks", "Python", "PySpark", "SQL", "Delta tables"],
        },
        {
          type: "code",
          language: "python",
          content: `df = spark.read.format("delta").load("/Tables/Sales")

clean_df = df.filter(df.amount > 0)

clean_df.write.mode("overwrite").format("delta").saveAsTable("CleanSales")`,
        },
        { type: "heading", content: "3. Data Warehouse — \"Give SQL people an analytics warehouse\"" },
        {
          type: "code",
          language: "sql",
          content: `SELECT
    Region,
    SUM(SalesAmount) AS TotalSales
FROM Sales
GROUP BY Region;`,
        },
        {
          type: "text",
          content:
            "Fabric Warehouse provides relational, SQL-oriented analytics while storing its data in OneLake using Delta-based storage. Microsoft's architecture includes distributed query processing, SQL execution, transaction/metadata management, and OneLake storage.",
        },
      ],
    },
    {
      id: "fabric-workloads-science-realtime-bi",
      category: "MS Fabric",
      question: "The Fabric workloads: science, real-time, and BI",
      tags: ["Fabric", "Data Science", "Real-Time Intelligence", "Power BI"],
      answer: [
        { type: "heading", content: "4. Data Science — \"Build predictive models\"" },
        {
          type: "flow",
          direction: "vertical",
          nodes: [
            { label: "Historical Customer Data", tone: "ember" },
            { label: "ML Training", tone: "gold" },
            { label: "Churn Model", tone: "sky" },
            { label: '"82% probability of leaving"', tone: "mint" },
          ],
        },
        {
          type: "text",
          content:
            "Data scientists can work with notebooks, Python, and ML workflows without building a completely separate data platform.",
        },
        { type: "heading", content: "5. Real-Time Intelligence — \"What's happening right now?\"" },
        {
          type: "flow",
          direction: "vertical",
          nodes: [
            { label: "IoT sensors / clicks / machines / logs / events / GPS", tone: "ember" },
            { label: "Eventstream", tone: "gold" },
            { label: "Eventhouse", tone: "sky" },
            { label: "KQL / Real-Time Analysis", tone: "mint" },
            { label: "Dashboard / Alert", tone: "gold" },
          ],
        },
        {
          type: "text",
          content: "Fabric's Real-Time capabilities are designed for continuously arriving event and time-series data.",
        },
        { type: "heading", content: "6. Power BI — \"Show humans what the data means\"" },
        {
          type: "flow",
          direction: "vertical",
          nodes: [
            { label: "Data", tone: "ember" },
            { label: "Semantic Model", tone: "gold" },
            { label: "DAX", tone: "sky" },
            { label: "Reports", tone: "mint" },
            { label: "Dashboards", tone: "gold" },
            { label: "Business Decision", tone: "ember" },
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "This is why Fabric matters for Power BI professionals specifically. Power BI isn't merely something you attach afterward — **it's part of the Fabric ecosystem itself.**",
        },
      ],
    },
    {
      id: "lakehouse-vs-warehouse-fabric",
      category: "MS Fabric",
      question: "Lakehouse vs Warehouse in Microsoft Fabric",
      tags: ["Fabric", "Lakehouse", "Warehouse"],
      answer: [
        { type: "heading", content: "Traditional Data Lake" },
        {
          type: "text",
          content:
            "Very flexible — CSV, JSON, Images, Logs, Parquet, Documents. But historically less convenient for classic BI.",
        },
        { type: "heading", content: "Traditional Data Warehouse" },
        {
          type: "text",
          content:
            "Very structured — Customers, Products, Sales, Orders, Dates. Excellent for SQL and BI, but less flexible for raw/semi-structured data and data-science workflows.",
        },
        { type: "heading", content: "Lakehouse: the best of both" },
        {
          type: "callout",
          variant: "tip",
          content: "The idea: **Data Lake flexibility + Data Warehouse structure.**",
        },
        {
          type: "code",
          language: "text",
          content: `Lakehouse
│
├── Files
│   ├── CSV
│   ├── JSON
│   └── Parquet
│
└── Tables
    ├── Customers
    ├── Products
    └── Sales`,
        },
        {
          type: "text",
          content:
            "Fabric commonly stores analytical tables using **Delta + Parquet** — Parquet provides efficient columnar storage, Delta adds capabilities around transactional table management.",
        },
        {
          type: "table",
          headers: ["When to choose", "Reasoning"],
          rows: [
            ["**Lakehouse**", "My engineers use Spark/Python and we're working with raw + structured data"],
            ["**Warehouse**", "My team primarily thinks in relational tables, T-SQL, dimensional models, and BI"],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content: "In real enterprise architectures, you may use **both**.",
        },
      ],
    },
    {
      id: "medallion-architecture",
      category: "MS Fabric",
      question: "What is Medallion Architecture (Bronze, Silver, Gold)?",
      tags: ["Fabric", "Data Engineering", "Medallion"],
      answer: [
        {
          type: "text",
          content: "Microsoft recommends the **Medallion architecture** as a design approach for Fabric lakehouses.",
        },
        {
          type: "flow",
          direction: "vertical",
          nodes: [
            { label: "Raw Data", tone: "ember" },
            { label: "🥉 Bronze — raw data", tone: "gold" },
            { label: "🥈 Silver — cleaned data", tone: "sky" },
            { label: "🥇 Gold — business-ready", tone: "mint" },
            { label: "Power BI", tone: "ember" },
          ],
        },
        { type: "heading", content: "Bronze" },
        {
          type: "text",
          content: "Store data basically as received — don't aggressively modify it.",
        },
        {
          type: "code",
          language: "text",
          content: `Customer_ID = "001"
Country = "usa"
Date = "8/12/26"`,
        },
        {
          type: "callout",
          variant: "info",
          content: "Bronze is your **historical/raw reference**.",
        },
        { type: "heading", content: "Silver" },
        {
          type: "text",
          content: "Clean and standardize:",
        },
        {
          type: "code",
          language: "text",
          content: `Customer_ID = 1
Country = "United States"
Date = 2026-08-12`,
        },
        {
          type: "list",
          items: [
            "Remove duplicates",
            "Handle nulls",
            "Standardize dates",
            "Validate records",
            "Join reference data",
            "Correct data types",
          ],
        },
        { type: "heading", content: "Gold" },
        {
          type: "text",
          content: "Business-ready data, for example:",
        },
        {
          type: "list",
          items: ["FactSales", "DimCustomer", "DimProduct", "DimDate", "DimStore"],
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "**Analogy:** cooking vegetables. Bronze = straight from the grocery bag. Silver = washed, peeled, and chopped. Gold = cooked, seasoned, and plated. Power BI shouldn't be spending its time washing vegetables — it should receive the finished plate.",
        },
      ],
    },
    {
      id: "direct-lake-explained",
      category: "MS Fabric",
      question: "What is Direct Lake, and how is it different from Import and DirectQuery?",
      tags: ["Fabric", "Power BI", "Direct Lake"],
      answer: [
        { type: "heading", content: "Import" },
        {
          type: "flow",
          direction: "vertical",
          nodes: [
            { label: "Database", tone: "ember" },
            { label: "Copy Data", tone: "gold" },
            { label: "Power BI Memory", tone: "sky" },
          ],
        },
        {
          type: "text",
          content: "Advantage: very fast. Problem: another copy that needs refreshes.",
        },
        { type: "heading", content: "DirectQuery" },
        {
          type: "flow",
          direction: "vertical",
          nodes: [
            { label: "Power BI", tone: "ember" },
            { label: "SQL Query", tone: "gold" },
            { label: "Database", tone: "sky" },
          ],
        },
        {
          type: "text",
          content: "Advantage: fresh data. Problem: performance depends heavily on the underlying source/query path.",
        },
        { type: "heading", content: "Direct Lake" },
        {
          type: "flow",
          direction: "vertical",
          nodes: [
            { label: "Power BI", tone: "ember" },
            { label: "Semantic Model", tone: "gold" },
            { label: "Direct Lake", tone: "sky" },
            { label: "OneLake", tone: "mint" },
            { label: "Delta / Parquet", tone: "gold" },
          ],
        },
        {
          type: "text",
          content:
            "Direct Lake is designed for Power BI semantic models over Delta tables in OneLake. Queries use the **VertiPaq engine**, while required columns can be loaded from OneLake on demand — unlike Import, it doesn't require copying the entire model into an imported dataset during each refresh.",
        },
        {
          type: "table",
          headers: ["", "Import", "DirectQuery", "Direct Lake"],
          rows: [
            ["Copies entire data", "Yes", "No", "No traditional full import"],
            ["VertiPaq", "Yes", "No", "Yes"],
            ["Large data", "Limited by model/capacity", "Good", "Designed for it"],
            ["Refresh dependency", "Yes", "Less", "Metadata/framing model"],
            ["Typical interactive performance", "Excellent", "Source-dependent", "Often close to Import"],
          ],
        },
        {
          type: "callout",
          variant: "warn",
          content:
            "Important nuance: **Direct Lake isn't magic.** Performance still depends on good Delta-table design, file organization, row groups, semantic-model design, and capacity sizing.",
        },
      ],
    },
    {
      id: "fabric-real-world-project",
      category: "MS Fabric",
      question: "Walk through a complete real-world Fabric project.",
      tags: ["Fabric", "Case Study"],
      answer: [
        {
          type: "text",
          content: "Let's imagine Walmart-like retail analytics. The company has:",
        },
        {
          type: "table",
          headers: ["Source system", "Data domain"],
          rows: [
            ["SQL Server", "Orders"],
            ["Salesforce", "Customers"],
            ["SAP", "Inventory"],
            ["Website", "Clickstream"],
            ["IoT", "Store Sensors"],
            ["CSV", "Monthly Targets"],
          ],
        },
        { type: "heading", content: "Step 1 — Ingestion" },
        {
          type: "flow",
          direction: "vertical",
          nodes: [
            { label: "SQL / Salesforce / SAP / CSV / API", tone: "ember" },
            { label: "Data Factory", tone: "gold" },
          ],
        },
        { type: "heading", content: "Step 2 — Storage" },
        {
          type: "flow",
          direction: "vertical",
          nodes: [
            { label: "OneLake", tone: "sky" },
            { label: "Bronze Lakehouse", tone: "gold" },
          ],
        },
        { type: "heading", content: "Step 3 — Transformation" },
        {
          type: "list",
          items: ["Spark", "Python", "SQL", "Notebooks", "Dataflows"],
        },
        {
          type: "flow",
          direction: "vertical",
          nodes: [
            { label: "Bronze", tone: "ember" },
            { label: "Silver", tone: "gold" },
            { label: "Gold", tone: "mint" },
          ],
        },
        { type: "heading", content: "Step 4 — Business Model" },
        {
          type: "code",
          language: "text",
          content: `             DimCustomer
                  |
DimProduct — FactSales — DimDate
                  |
               DimStore`,
        },
        {
          type: "text",
          content: "Classic star schema.",
        },
        { type: "heading", content: "Step 5 — Semantic Model" },
        {
          type: "code",
          language: "dax",
          content: `Total Sales = SUM(FactSales[SalesAmount])

Profit = SUM(FactSales[Revenue]) - SUM(FactSales[Cost])

Profit Margin = DIVIDE([Profit], [Total Sales])`,
        },
        { type: "heading", content: "Step 6 — Power BI" },
        {
          type: "code",
          language: "text",
          content: `Revenue             $125M
Profit                $22M
Margin                17.6%
Orders                1.8M
────────────────────────────

Sales by Region
Sales by Product
YoY Growth
Inventory Risk
Customer Segments`,
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "Now imagine the CEO asks: *\"Why did Southeast sales fall yesterday?\"* The goal is to reduce the distance between **business question → trustworthy data → analysis → decision**.",
        },
      ],
    },
    {
      id: "fabric-real-time-analytics",
      category: "MS Fabric",
      question: "How does Fabric handle real-time data?",
      tags: ["Fabric", "Real-Time Intelligence", "IoT"],
      answer: [
        {
          type: "text",
          content: "Suppose we're operating factories. Every machine sends events like:",
        },
        {
          type: "code",
          language: "json",
          content: `{
  "machineId": "M102",
  "temperature": 91.4,
  "pressure": 62.1,
  "timestamp": "2026-08-12T18:30:00"
}`,
        },
        {
          type: "text",
          content: "Millions of these events may arrive. Fabric can conceptually process:",
        },
        {
          type: "flow",
          direction: "vertical",
          nodes: [
            { label: "Factory Sensors", tone: "ember" },
            { label: "Eventstream", tone: "gold" },
            { label: "Eventhouse", tone: "sky" },
            { label: "KQL", tone: "mint" },
            { label: "Real-Time Dashboard", tone: "gold" },
            { label: "Alert", tone: "ember" },
          ],
        },
        {
          type: "flow",
          title: "For example",
          direction: "vertical",
          nodes: [
            { label: "IF temperature > threshold", tone: "ember" },
            { label: "Potential overheating", tone: "gold" },
            { label: "Alert maintenance team", tone: "sky" },
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "This moves analytics from *\"What happened last month?\"* toward *\"What is happening right now, and should we act?\"*",
        },
        {
          type: "callout",
          variant: "info",
          content:
            "Microsoft's current connected-factory reference architecture demonstrates Fabric processing more than **one million industrial IoT events per hour** across 30,000 tags and 40 factories — combining streaming data, contextual business data, ML, real-time dashboards, and notifications. This isn't just a prettier Power BI environment — it can be an **enterprise-scale data platform architecture**.",
        },
      ],
    },
    {
      id: "onelake-shortcuts-and-governance",
      category: "MS Fabric",
      question: "What are OneLake Shortcuts, and how does Fabric handle security and governance?",
      tags: ["Fabric", "OneLake", "Security", "Governance"],
      answer: [
        { type: "heading", content: "Shortcuts" },
        {
          type: "text",
          content: "Suppose your organization already has data in Azure Data Lake, Amazon S3, or Google Cloud Storage. The old mindset:",
        },
        {
          type: "flow",
          direction: "vertical",
          nodes: [
            { label: "S3", tone: "ember" },
            { label: "Copy", tone: "gold" },
            { label: "Azure", tone: "sky" },
            { label: "Copy", tone: "gold" },
            { label: "Analytics", tone: "mint" },
          ],
        },
        {
          type: "text",
          content:
            "Fabric OneLake **Shortcuts** can provide references to supported external storage so Fabric workloads can access data without first creating another physical copy through traditional ETL. Microsoft currently documents shortcut support including ADLS, Amazon S3, and Google Cloud Storage scenarios.",
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "**Analogy:** think of a Windows shortcut. The shortcut doesn't duplicate your 20 GB movie — it points to where the movie already exists.",
        },
        { type: "heading", content: "Security and governance" },
        {
          type: "text",
          content:
            "Enterprise analytics isn't just *\"Can we make a dashboard?\"* It's also *\"Should Raja be allowed to see Finance payroll?\"*",
        },
        {
          type: "text",
          content:
            "Fabric has platform-level governance and security capabilities, including integration with **Microsoft Entra** identity and **Microsoft Purview**-backed governance. The **OneLake Catalog** provides centralized discovery and governance of Fabric data and analytics artifacts.",
        },
        {
          type: "flow",
          title: "Levels to think about",
          direction: "vertical",
          nodes: [
            { label: "Organization / Tenant", tone: "ember" },
            { label: "Capacity", tone: "gold" },
            { label: "Workspace", tone: "sky" },
            { label: "Fabric Item", tone: "mint" },
            { label: "OneLake", tone: "gold" },
            { label: "Semantic Model", tone: "ember" },
            { label: "RLS", tone: "sky" },
            { label: "Report", tone: "gold" },
          ],
        },
        {
          type: "table",
          headers: ["Role", "Access"],
          rows: [
            ["**CEO**", "All regions"],
            ["**US Manager**", "United States only"],
            ["**Georgia Manager**", "Georgia only"],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content: "**RLS (Row-Level Security)** can enforce those business boundaries at the semantic-model level.",
        },
      ],
    },
    {
      id: "fabric-capacity-and-ai",
      category: "MS Fabric",
      question: "How does Fabric Capacity work, and where does AI fit in?",
      tags: ["Fabric", "Capacity", "AI"],
      answer: [
        { type: "heading", content: "Fabric Capacity — how compute fits in" },
        {
          type: "callout",
          variant: "tip",
          content:
            "A common beginner confusion: **OneLake is storage. Fabric Capacity is compute.** OneLake = the warehouse where your goods are stored. Fabric Capacity = the workers and machines processing those goods.",
        },
        {
          type: "text",
          content:
            "Fabric capacities use **Capacity Units (CUs)**, with SKUs such as F2, F4, F8, F16, F32, F64, and larger. Different workloads — Power BI queries, Spark jobs, pipelines, warehouse queries, etc. — consume capacity resources. This is why enterprise Fabric architecture also involves performance engineering, workload management, capacity planning, and cost governance.",
        },
        { type: "heading", content: "Where does AI fit?" },
        {
          type: "text",
          content:
            "Modern Fabric isn't only traditional BI. Microsoft is increasingly positioning Fabric as a **data foundation for analytics and AI**, with Copilot capabilities across parts of the platform and integration with Microsoft's AI ecosystem.",
        },
        {
          type: "code",
          language: "text",
          content: `                    ONE LAKE
                       │
       ┌───────────────┼──────────────┐
       ↓               ↓              ↓
     BI/SQL           ML             AI
       ↓               ↓              ↓
   Power BI       Data Science     AI Apps`,
        },
        {
          type: "callout",
          variant: "warn",
          content: "This matters because enterprise AI has a fundamental dependency: **good AI requires good data.**",
        },
        {
          type: "text",
          content: "You can't build trustworthy enterprise AI on:",
        },
        {
          type: "list",
          items: [
            "Duplicate customer records",
            "Outdated transactions",
            "Unknown data ownership",
            "Inconsistent definitions",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "Fabric's strategic value is partly about creating a **governed data foundation** that BI, analytics, ML, and AI systems can share.",
        },
      ],
    },
    {
      id: "fabric-whiteboard-architecture",
      category: "MS Fabric",
      question: "What's the one architecture diagram worth memorizing?",
      tags: ["Fabric", "Architecture", "Big Picture"],
      answer: [
        {
          type: "text",
          content: "For a seminar, this is the diagram I'd actually draw on a whiteboard:",
        },
        {
          type: "code",
          language: "text",
          content: `                        DATA SOURCES
                             │
       ┌─────────────────────┼─────────────────────┐
       │                     │                     │
   SQL / Oracle          SaaS / APIs          Events / IoT
       │                     │                     │
       └──────────────┬──────┴─────────────┬──────┘
                      ↓                    ↓
                DATA FACTORY          EVENTSTREAM
                      │                    │
                      └─────────┬──────────┘
                                ↓
                    ┌────────────────────┐
                    │      ONELAKE       │
                    └────────────────────┘
                                │
                     🥉 BRONZE — RAW
                                ↓
                     🥈 SILVER — CLEAN
                                ↓
                     🥇 GOLD — CURATED
                                │
               ┌────────────────┼─────────────────┐
               ↓                ↓                 ↓
           Lakehouse        Warehouse        Eventhouse
               │                │                 │
               └────────────────┼─────────────────┘
                                ↓
                         SEMANTIC MODEL
                                │
                           DIRECT LAKE
                                │
                             POWER BI
                                │
                                ↓
                       BUSINESS DECISIONS`,
        },
        {
          type: "callout",
          variant: "tip",
          content: "That diagram alone explains a large portion of Fabric.",
        },
        { type: "heading", content: "Who uses what?" },
        {
          type: "table",
          headers: ["Person", "Fabric area"],
          rows: [
            ["Data Integration Engineer", "Data Factory"],
            ["Data Engineer", "Lakehouse / Spark"],
            ["SQL Developer", "Warehouse"],
            ["Data Scientist", "Data Science / Notebooks"],
            ["Streaming Engineer", "Real-Time Intelligence"],
            ["BI Developer", "Semantic Models / Power BI"],
            ["Business Analyst", "Power BI"],
            ["Data Architect", "Entire Fabric architecture"],
            ["Administrator", "Capacity / governance / security"],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "The important thing: they aren't supposed to operate as isolated islands anymore. **They're working within the same Fabric ecosystem.**",
        },
      ],
    },
    {
      id: "fabric-vs-traditional-azure",
      category: "MS Fabric",
      question: "How is Fabric different from traditional Azure analytics?",
      tags: ["Fabric", "Azure", "Operating Model"],
      answer: [
        {
          type: "callout",
          variant: "warn",
          content: 'Don\'t interpret Fabric as "Azure Synapse renamed" — that\'s too simplistic. The strategic change is the **operating model**.',
        },
        { type: "heading", content: "Traditional Azure analytics often feels like" },
        {
          type: "list",
          ordered: true,
          items: [
            "Provision service A",
            "Configure networking",
            "Connect storage",
            "Configure permissions",
            "Connect service B",
            "Configure integration",
            "Connect Power BI",
            "Manage everything",
          ],
        },
        { type: "heading", content: "Fabric pushes toward" },
        {
          type: "flow",
          direction: "vertical",
          nodes: [
            { label: "Open Fabric", tone: "ember" },
            { label: "Create Workspace", tone: "gold" },
            { label: "Create Fabric Items", tone: "sky" },
            { label: "Work against shared OneLake data", tone: "mint" },
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content: 'That\'s the SaaS philosophy. Less **"build and integrate infrastructure."** More **"build the data product."**',
        },
      ],
    },
    {
      id: "fabric-end-to-end-example",
      category: "MS Fabric",
      question: "Show me a very simple end-to-end Fabric example.",
      tags: ["Fabric", "Walkthrough"],
      answer: [
        {
          type: "text",
          content: "Suppose we receive `sales.csv`:",
        },
        {
          type: "table",
          headers: ["Date", "Product", "Qty", "Price"],
          rows: [
            ["08/10/26", "iPhone", "2", "999"],
            ["08/10/26", "Laptop", "1", "1200"],
            ["08/11/26", "iPhone", "3", "999"],
          ],
        },
        { type: "heading", content: "Data Factory" },
        {
          type: "text",
          content: "Ingest it:",
        },
        {
          type: "flow",
          direction: "horizontal",
          nodes: [
            { label: "CSV", tone: "ember" },
            { label: "OneLake", tone: "gold" },
          ],
        },
        { type: "heading", content: "Lakehouse" },
        {
          type: "text",
          content: "Store: `BronzeSales`",
        },
        { type: "heading", content: "Notebook" },
        {
          type: "text",
          content: "Transform:",
        },
        {
          type: "code",
          language: "python",
          content: `from pyspark.sql.functions import col

sales = spark.table("BronzeSales")
clean_sales = sales.withColumn(
    "Revenue",
    col("Qty") * col("Price")
)
clean_sales.write.mode("overwrite").saveAsTable("GoldSales")`,
        },
        { type: "heading", content: "Power BI" },
        {
          type: "code",
          language: "dax",
          content: `Total Revenue = SUM(GoldSales[Revenue])`,
        },
        {
          type: "code",
          language: "text",
          content: `TOTAL REVENUE
$6,195`,
        },
        {
          type: "callout",
          variant: "tip",
          content: "That's Fabric in miniature.",
        },
        {
          type: "flow",
          direction: "vertical",
          nodes: [
            { label: "Raw Data", tone: "ember" },
            { label: "Ingestion", tone: "gold" },
            { label: "OneLake", tone: "sky" },
            { label: "Engineering", tone: "mint" },
            { label: "Business Model", tone: "gold" },
            { label: "Power BI", tone: "ember" },
            { label: "Insight", tone: "sky" },
          ],
        },
      ],
    },
    {
      id: "fabric-restaurant-analogy",
      category: "MS Fabric",
      question: "The restaurant analogy — the one I'd use in a seminar",
      tags: ["Fabric", "Analogy"],
      answer: [
        {
          type: "text",
          content: "Imagine a large restaurant. Previously:",
        },
        {
          type: "table",
          headers: ["Department", "Location"],
          rows: [
            ["Vegetables", "Building A"],
            ["Meat", "Building B"],
            ["Cooking", "Building C"],
            ["Billing", "Building D"],
            ["Waiters", "Building E"],
          ],
        },
        {
          type: "callout",
          variant: "warn",
          content:
            "Every department keeps transporting things between buildings. **That's fragmented analytics.**",
        },
        {
          type: "text",
          content: "Fabric says: build one large restaurant. Inside it you still have specialists:",
        },
        {
          type: "table",
          headers: ["Fabric component", "Restaurant role"],
          rows: [
            ["Data Factory", "Delivery / loading dock"],
            ["OneLake", "Central pantry"],
            ["Data Engineering", "Preparation kitchen"],
            ["Warehouse", "Organized ingredient shelves"],
            ["Data Science", "Experimental chef"],
            ["Real-Time Intelligence", "Kitchen monitoring system"],
            ["Power BI", "Waiter presenting the finished meal"],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content: "Different jobs. **Same restaurant.**",
        },
      ],
    },
    {
      id: "fabric-30-second-explanation",
      category: "MS Fabric",
      question: "What are the 10 concepts to walk away knowing?",
      tags: ["Fabric", "Summary", "Interview"],
      answer: [
        { type: "heading", content: "If someone asks: \"What is Microsoft Fabric?\"" },
        {
          type: "callout",
          variant: "tip",
          content:
            "**Strong answer:** Microsoft Fabric is Microsoft's unified SaaS platform for end-to-end data and analytics. It brings capabilities such as Data Factory, Data Engineering, Lakehouse, Data Warehouse, Data Science, Real-Time Intelligence, and Power BI into a common environment built around OneLake. The major architectural benefit is that different analytics workloads can work against a shared data foundation instead of organizations constantly copying data and integrating separate services. Fabric can take data from ingestion through transformation, modeling, and ultimately Power BI reporting or real-time analytics.",
        },
        {
          type: "text",
          content:
            'That sounds much stronger than *"Fabric is a new Microsoft BI tool"* — because Fabric is much bigger than Power BI.',
        },
        { type: "heading", content: "The 10 concepts to leave knowing" },
        {
          type: "list",
          ordered: true,
          items: [
            "**Fabric** = unified analytics SaaS platform.",
            "**OneLake** = common organizational data lake.",
            "**Data Factory** = ingestion/orchestration.",
            "**Lakehouse** = lake flexibility + structured analytics.",
            "**Warehouse** = SQL-centric enterprise analytics.",
            "**Spark/Notebooks** = engineering and transformation.",
            "**Bronze → Silver → Gold** = progressive data refinement.",
            "**Semantic Model** = business meaning and analytics layer.",
            "**Direct Lake** = Power BI accessing OneLake-backed Delta data without traditional full Import copying.",
            "**Power BI** = consumption/analytics layer inside the broader Fabric ecosystem.",
          ],
        },
        { type: "heading", content: "What are we actually trying to achieve?" },
        {
          type: "flow",
          direction: "vertical",
          nodes: [
            { label: "Many Data Sources", tone: "ember" },
            { label: "ONE governed data platform", tone: "gold" },
            { label: "Reliable, reusable data", tone: "sky" },
            { label: "Engineering + SQL + ML + Real-Time", tone: "mint" },
            { label: "Power BI / AI", tone: "gold" },
            { label: "Fast, trustworthy business decisions", tone: "ember" },
          ],
        },
        {
          type: "callout",
          variant: "info",
          content:
            "That's also what an interviewer wants to hear. They don't just want *\"OneLake is a data lake.\"* They want to see whether you can connect: business requirement → ingestion → OneLake → transformation → Lakehouse/Warehouse → semantic model → Power BI → security/performance → business outcome. Once you can tell that story, you understand Fabric at a much more useful level than someone who simply memorized 50 definitions.",
        },
        { type: "heading", content: "Good official resources" },
        {
          type: "links",
          items: [
            {
              href: "https://learn.microsoft.com/en-us/fabric/fundamentals/microsoft-fabric-overview",
              label: "Microsoft Fabric overview",
            },
            {
              href: "https://learn.microsoft.com/en-us/fabric/fundamentals/",
              label: "Microsoft Fabric fundamentals learning path",
            },
            {
              href: "https://azure.microsoft.com/en-us/blog/introducing-microsoft-fabric-data-analytics-for-the-era-of-ai/",
              label: "Microsoft's original Fabric announcement",
            },
            {
              href: "https://learn.microsoft.com/en-us/fabric/fundamentals/direct-lake-overview",
              label: "Direct Lake technical overview",
            },
            {
              href: "https://learn.microsoft.com/en-us/fabric/onelake/onelake-medallion-lakehouse-architecture",
              label: "Fabric Medallion architecture guidance",
            },
          ],
        },
      ],
    },
  ],
};
