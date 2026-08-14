import type { QAItem } from "./types";

export const theoryRockyPowerBiItems: QAItem[] = [
  {
    id: "what-is-power-bi",
    category: "PowerBI",
    question: "What exactly is Power BI?",
    tags: ["Power BI", "Big Picture"],
    answer: [
      {
        type: "text",
        content:
          "At the beginner level: Power BI is Microsoft's business intelligence and analytics platform for transforming raw data into governed semantic models, interactive reports, dashboards, and business insights. But technically, Power BI is much more than a charting tool.",
      },
      {
        type: "code",
        language: "text",
        content: `                    DATA SOURCES
                         │
       ┌─────────────────┼─────────────────┐
       │                 │                 │
   SQL Server          Excel            APIs
     Oracle          SharePoint        Snowflake
       │                 │                 │
       └─────────────────┼─────────────────┘
                         ↓
                   POWER QUERY
                         │
                    M LANGUAGE
                         │
                Clean / Transform
                         ↓
                 SEMANTIC MODEL
                         │
            ┌────────────┼────────────┐
            │            │            │
       Relationships    DAX       Hierarchies
            │            │            │
            └────────────┼────────────┘
                         ↓
                    VERTIPAQ
                 Storage Engine
                         ↓
                    DAX ENGINE
                         ↓
                REPORT / VISUALS
                         ↓
                  POWER BI SERVICE
                         ↓
              Users / Apps / APIs`,
      },
      {
        type: "text",
        content:
          "Microsoft describes semantic models as the reporting-ready data layer underlying Power BI — they can store imported data, query underlying sources, or combine both approaches.",
      },
      { type: "heading", content: "The important conceptual distinction" },
      {
        type: "table",
        headers: ["A beginner thinks", "An experienced developer thinks"],
        rows: [
          [
            "Power BI = dashboard tool",
            "Power BI = analytical modeling engine + calculation engine + columnar storage engine + visualization layer + enterprise BI service",
          ],
        ],
      },
      {
        type: "callout",
        variant: "tip",
        content: "That distinction matters enormously in interviews.",
      },
    ],
  },
  {
    id: "power-bi-ecosystem-tools",
    category: "PowerBI",
    question: "The Power BI ecosystem: Desktop, Power Query, and the Semantic Model",
    tags: ["Power BI", "Architecture"],
    answer: [
      { type: "heading", content: "1. Power BI Desktop — your development environment" },
      {
        type: "flow",
        direction: "vertical",
        nodes: [
          { label: "Connect to Data", tone: "ember" },
          { label: "Power Query", tone: "gold" },
          { label: "Data Modeling", tone: "sky" },
          { label: "DAX", tone: "mint" },
          { label: "Visualizations", tone: "gold" },
          { label: ".pbix / .pbip", tone: "ember" },
        ],
      },
      { type: "heading", content: "2. Power Query — Extract + Transform + Load" },
      {
        type: "text",
        content: "Uses the **M language**. Example:",
      },
      {
        type: "code",
        language: "text",
        content: `let
    Source = Sql.Database("SQL01", "SalesDB"),
    Sales = Source{[Schema="dbo",Item="Sales"]}[Data],
    FilteredRows =
        Table.SelectRows(
            Sales,
            each [SalesAmount] > 0
        )
in
    FilteredRows`,
      },
      {
        type: "list",
        items: [
          "Get data",
          "Clean data",
          "Change types",
          "Remove columns",
          "Merge tables",
          "Append tables",
          "Filter records",
          "Create transformation columns",
        ],
      },
      { type: "heading", content: "3. Semantic Model — arguably the heart of Power BI" },
      {
        type: "list",
        items: [
          "Tables",
          "Relationships",
          "Measures",
          "Calculated Columns",
          "Hierarchies",
          "Calculation Groups",
          "Metadata",
          "Security Roles",
        ],
      },
    ],
  },
  {
    id: "power-bi-ecosystem-service",
    category: "PowerBI",
    question: "The Power BI ecosystem: Service, Gateway, and Fabric",
    tags: ["Power BI", "Architecture", "Fabric"],
    answer: [
      { type: "heading", content: "4. Power BI Service — cloud SaaS environment" },
      {
        type: "list",
        items: ["Publish", "Share", "Refresh", "Secure", "Collaborate", "Distribute", "Monitor", "Govern"],
      },
      { type: "heading", content: "5. Gateway" },
      {
        type: "text",
        content: "Connects Power BI Service to data sources that aren't directly reachable from Microsoft's cloud.",
      },
      {
        type: "flow",
        direction: "vertical",
        nodes: [
          { label: "Power BI Service", tone: "ember" },
          { label: "On-Premises Data Gateway (encrypted)", tone: "gold" },
          { label: "Corporate SQL Server", tone: "sky" },
        ],
      },
      { type: "heading", content: "6. Fabric" },
      {
        type: "text",
        content: "Today, Power BI also sits within the broader Microsoft Fabric ecosystem:",
      },
      {
        type: "code",
        language: "text",
        content: `Microsoft Fabric
      │
      ├── Data Factory
      ├── Data Engineering
      ├── Data Warehouse
      ├── Data Science
      ├── Real-Time Intelligence
      │
      └── Power BI`,
      },
      {
        type: "callout",
        variant: "tip",
        content: "Power BI is the **BI/semantic consumption layer** within the larger Fabric data platform.",
      },
    ],
  },
  {
    id: "power-query-and-query-folding",
    category: "PowerBI",
    question: "What is Query Folding, and why does it matter?",
    tags: ["Power BI", "Power Query", "Performance"],
    answer: [
      {
        type: "text",
        content: "Suppose SQL Server contains 500 million rows. You write: filter Country = \"USA\", filter Year = 2026, select 8 columns. There are two possibilities.",
      },
      { type: "heading", content: "Bad scenario" },
      {
        type: "text",
        content: "Power BI retrieves enormous amounts of data and performs transformations **locally**.",
      },
      {
        type: "flow",
        direction: "vertical",
        nodes: [
          { label: "SQL Server — 500M rows", tone: "ember" },
          { label: "Power Query Engine (filter, transform, remove columns)", tone: "gold" },
        ],
      },
      {
        type: "callout",
        variant: "warn",
        content: "Expensive.",
      },
      { type: "heading", content: "Better scenario — Query Folding" },
      {
        type: "text",
        content: "Power Query translates transformations back into something conceptually similar to:",
      },
      {
        type: "code",
        language: "sql",
        content: `SELECT
    Date,
    CustomerID,
    ProductID,
    Quantity,
    SalesAmount
FROM Sales
WHERE
    Country = 'USA'
    AND YEAR(OrderDate) = 2026;`,
      },
      {
        type: "flow",
        direction: "vertical",
        nodes: [
          { label: "Power Query generates native query", tone: "ember" },
          { label: "SQL Server performs the work", tone: "gold" },
          { label: "Only required data returned", tone: "sky" },
        ],
      },
      {
        type: "text",
        content:
          "This is called **Query Folding**. Microsoft recommends pushing as much processing as practical to the source — folding is especially important for DirectQuery/Dual tables, and generally improves relational-source refresh efficiency for Import models too.",
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "**Analogy:** Amazon has 10 million products, you need one laptop. Bad approach: Amazon ships all 10 million products to your house and you search through them. Query folding: you tell Amazon exactly what you want, and Amazon sends only the matching laptop.",
      },
    ],
  },
  {
    id: "star-schema-modeling",
    category: "PowerBI",
    question: "What is Star Schema data modeling, and why does it matter?",
    tags: ["Power BI", "Data Modeling", "Star Schema"],
    answer: [
      {
        type: "text",
        content:
          "This is probably the single most important Power BI architecture skill. Suppose we have sales. Don't build one giant flat table (OrderID, CustomerName, CustomerCity, ProductName, Category, StoreName, Region, OrderDate, Sales, Cost, Profit, ...).",
      },
      {
        type: "text",
        content: "Instead build a **Star Schema**:",
      },
      {
        type: "code",
        language: "text",
        content: `                    DimDate
                       │
                       │
DimCustomer ─────── FactSales ─────── DimProduct
                       │
                       │
                    DimStore`,
      },
      { type: "heading", content: "Fact table — contains events/transactions" },
      {
        type: "code",
        language: "text",
        content: `FactSales

DateKey
CustomerKey
ProductKey
StoreKey
Quantity
Revenue
Cost`,
        },
      {
        type: "text",
        content: "Potentially 500 million rows.",
      },
      { type: "heading", content: "Dimension tables — describe the facts" },
      {
        type: "table",
        headers: ["DimProduct", "DimCustomer"],
        rows: [["ProductKey, ProductName, Brand, Category, SubCategory", "CustomerKey, CustomerName, City, State, Country, Segment"]],
      },
      {
        type: "text",
        content:
          "Usually a **1 : many** relationship — one dimension row relates to many fact rows. Microsoft's relationship engine builds optimized mappings for regular relationships, particularly one-to-many relationships within a source group.",
      },
      { type: "heading", content: "Why Star Schema?" },
      {
        type: "list",
        items: ["Understandability", "DAX simplicity", "Relationship behavior", "Filtering", "Compression", "Performance", "Maintainability"],
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "**Analogy:** think of `FactSales` as a receipt — \"Customer #102, Product #58, Store #4, Date #20260813, Amount $499.\" Dimension tables explain who Customer 102 is, what Product 58 is, where Store 4 is. That's dimensional modeling.",
      },
    ],
  },
  {
    id: "vertipaq-engine",
    category: "PowerBI",
    question: "What is VertiPaq, and why does it make Power BI so fast?",
    tags: ["Power BI", "VertiPaq", "Performance"],
    answer: [
      {
        type: "text",
        content:
          "When using **Import mode**, Power BI doesn't simply hold your original relational table as-is. It uses an in-memory **columnar engine** called VertiPaq.",
      },
      { type: "heading", content: "Traditional row-oriented thinking" },
      {
        type: "code",
        language: "text",
        content: `Customer | Product | State | Sales
----------------------------------
Raj      | Laptop  | GA    | 1000
John     | Phone   | TX    | 800
Sam      | Laptop  | GA    | 1200`,
      },
      { type: "heading", content: "VertiPaq thinks more like this" },
      {
        type: "code",
        language: "text",
        content: `Customer: Raj, John, Sam
Product:  Laptop, Phone, Laptop
State:    GA, TX, GA
Sales:    1000, 800, 1200`,
      },
      {
        type: "text",
        content: "Columns compress extremely well when values repeat. Instead of repeatedly storing strings, values get **dictionary-encoded**:",
      },
      {
        type: "code",
        language: "text",
        content: `Dictionary
1 = Georgia
2 = Texas
3 = Florida

Data becomes: 1 1 1 1 2 1 1 2 ...`,
      },
      { type: "heading", content: "Cardinality" },
      {
        type: "table",
        headers: ["Low cardinality", "High cardinality"],
        rows: [
          ["e.g. `Gender` — only 2 unique values. Excellent compression.", "e.g. `TransactionID` — almost every value unique. Poorer compression."],
        ],
      },
      {
        type: "callout",
        variant: "warn",
        content:
          "Blindly importing columns like GUIDs, transaction UUIDs, long URLs, free-form text, or nanosecond timestamps can ==dramatically increase model size==.",
      },
      {
        type: "text",
        content:
          "Microsoft's modeling guidance emphasizes reducing unnecessary model data — it also notes that DAX calculated columns can compress less efficiently than source/Power Query-derived columns in some situations.",
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "**Power BI performance starts with the data model, not the visualization.** A beautifully designed dashboard on top of a terrible semantic model will still perform badly.",
      },
    ],
  },
  {
    id: "dax-calculation-engine",
    category: "PowerBI",
    question: "What is DAX, and how does filter context work?",
    tags: ["Power BI", "DAX", "Filter Context"],
    answer: [
      {
        type: "text",
        content: "**DAX** means Data Analysis Expressions.",
      },
      {
        type: "code",
        language: "dax",
        content: `Total Sales = SUM(FactSales[SalesAmount])

Total Profit = SUM(FactSales[SalesAmount]) - SUM(FactSales[CostAmount])

Profit Margin % = DIVIDE([Total Profit], [Total Sales])`,
        },
      {
        type: "text",
        content: "But DAX becomes powerful because of **evaluation context**.",
      },
      { type: "heading", content: "Filter Context" },
      {
        type: "table",
        headers: ["State", "Total Sales"],
        rows: [
          ["Georgia", "$8M"],
          ["Texas", "$12M"],
          ["Florida", "$7M"],
        ],
      },
      {
        type: "text",
        content: 'You did **not** write `WHERE State = "Georgia"`. Why? Because the visual creates a filter context:',
      },
      {
        type: "flow",
        direction: "vertical",
        nodes: [
          { label: "State = Georgia", tone: "ember" },
          { label: "DimState", tone: "gold" },
          { label: "Relationship", tone: "sky" },
          { label: "FactSales", tone: "mint" },
          { label: "SUM(Sales)", tone: "gold" },
        ],
      },
      {
        type: "text",
        content: "Then Texas creates another context.",
      },
      { type: "heading", content: "CALCULATE — probably the most important DAX function" },
      {
        type: "code",
        language: "dax",
        content: `Georgia Sales =
CALCULATE(
    [Total Sales],
    DimCustomer[State] = "Georgia"
)`,
        },
      {
        type: "callout",
        variant: "tip",
        content: "Conceptually: **evaluate this expression under a modified filter context.** That's why CALCULATE is so fundamental.",
      },
      { type: "heading", content: "Year-over-year" },
      {
        type: "code",
        language: "dax",
        content: `Sales LY =
CALCULATE(
    [Total Sales],
    SAMEPERIODLASTYEAR(DimDate[Date])
)

YoY Growth % =
DIVIDE(
    [Total Sales] - [Sales LY],
    [Sales LY]
)`,
        },
      {
        type: "text",
        content: "Now we're doing actual analytical modeling rather than simple arithmetic.",
      },
    ],
  },
  {
    id: "measures-vs-calculated-columns-pbi",
    category: "PowerBI",
    question: "Measures vs Calculated Columns — what's the real difference?",
    tags: ["Power BI", "DAX", "Data Modeling"],
    answer: [
      {
        type: "text",
        content: "This is an extremely common interview topic.",
      },
      {
        type: "table",
        headers: ["Calculated Column", "Measure"],
        rows: [
          [
            "Calculated **row by row**, results stored in the model",
            "Calculated **at query time**, based on context",
          ],
          [
            "`Profit = FactSales[Revenue] - FactSales[Cost]` — if FactSales has 100 million rows, you potentially store 100 million Profit values",
            "`Profit = SUM(FactSales[Revenue]) - SUM(FactSales[Cost])` — not materialized as 100 million additional values",
          ],
        ],
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "**General rule:** prefer measures for analytical aggregations. Use calculated columns when you genuinely require a persistent row-level attribute.",
      },
      {
        type: "text",
        content: "And when a transformation can sensibly happen upstream (Database → Power Query → Semantic Model), often push it upstream rather than unnecessarily expanding the semantic model.",
      },
      {
        type: "callout",
        variant: "info",
        content:
          "Microsoft explicitly recommends considering Power Query/source-side columns over DAX calculated columns where appropriate, because model calculated columns can result in less efficient compression and longer refresh processing.",
      },
    ],
  },
  {
    id: "import-directquery-composite",
    category: "PowerBI",
    question: "Import vs DirectQuery vs Composite models — how do you choose?",
    tags: ["Power BI", "Storage Modes"],
    answer: [
      {
        type: "text",
        content: "This is one of the most important Power BI architectural decisions.",
      },
      { type: "heading", content: "Import Mode" },
      {
        type: "flow",
        direction: "vertical",
        nodes: [
          { label: "Database", tone: "ember" },
          { label: "Copy Data", tone: "gold" },
          { label: "VertiPaq", tone: "sky" },
          { label: "Power BI", tone: "mint" },
        ],
      },
      {
        type: "list",
        items: [
          "Very fast queries",
          "Excellent interactive experience",
          "Full modeling flexibility",
          "Source isn't hit for every visual interaction",
        ],
      },
      {
        type: "callout",
        variant: "warn",
        content: "Disadvantage: **data freshness depends on refresh.** Microsoft describes Import as the most common/default semantic-model mode, and notes its strong performance comes from in-memory querying.",
      },
      { type: "heading", content: "DirectQuery" },
      {
        type: "flow",
        direction: "vertical",
        nodes: [
          { label: "User clicks slicer", tone: "ember" },
          { label: "Power BI generates source query", tone: "gold" },
          { label: "SQL / Snowflake / etc.", tone: "sky" },
          { label: "Result → Visual", tone: "mint" },
        ],
      },
      {
        type: "text",
        content: "Data stays primarily at source.",
      },
      {
        type: "table",
        headers: ["Advantages", "Disadvantage"],
        rows: [["Very large data, fresh/current data, less imported model storage", "Every interaction triggers a potential source query — performance depends strongly on the source"]],
      },
      {
        type: "callout",
        variant: "info",
        content: "Microsoft explicitly notes that DirectQuery visual performance depends on how quickly the underlying source can answer the generated queries.",
      },
      { type: "heading", content: "Composite Models" },
      {
        type: "code",
        language: "text",
        content: `             Semantic Model

     ┌────────────┼────────────┐
     ↓            ↓            ↓
  Import      DirectQuery     Dual`,
      },
      {
        type: "table",
        headers: ["Table", "Storage mode"],
        rows: [
          ["DimDate, DimProduct, DimCustomer", "Import / Dual"],
          ["FactSales", "DirectQuery"],
        ],
      },
      {
        type: "text",
        content: "Dimensions are small and fast in memory. Massive fact data can remain at source. Composite models support table-level storage choices such as Import, DirectQuery, and Dual in applicable scenarios.",
      },
      { type: "heading", content: "Hybrid Tables" },
      {
        type: "code",
        language: "text",
        content: `FactSales

2018 ───────────┐
2019            │
2020            │
2021            ├── IMPORT
2022            │
2023            │
2024            │
2025 ───────────┘

Recent 2026 ─────── DIRECTQUERY`,
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "Historical data is fast in memory. Latest data can remain live. Microsoft supports this pattern through hybrid tables, commonly created using **incremental refresh plus a real-time DirectQuery partition**.",
      },
    ],
  },
  {
    id: "incremental-refresh-gateway-rls",
    category: "PowerBI",
    question: "How do Incremental Refresh, Gateway, and Row-Level Security work together?",
    tags: ["Power BI", "Refresh", "Gateway", "RLS"],
    answer: [
      {
        type: "text",
        content: "Imagine `FactTransactions` has **2 billion rows**. Would you reload all 2 billion every night? Usually no.",
      },
      { type: "heading", content: "Incremental Refresh" },
      {
        type: "code",
        language: "text",
        content: `2019 ████████████ Don't refresh
2020 ████████████ Don't refresh
2021 ████████████ Don't refresh
2022 ████████████ Don't refresh
2023 ████████████ Don't refresh
2024 ████████████ Don't refresh
2025 ████████████ Historical
2026 ███████░░░░░ Refresh recent partitions`,
      },
      {
        type: "text",
        content: "Power BI partitions the data so recent periods can be refreshed without repeatedly reprocessing the entire historical table. Microsoft specifically identifies incremental refresh as a mechanism for avoiding expensive full reloads of large Import models.",
      },
      { type: "heading", content: "Gateway" },
      {
        type: "text",
        content: "Power BI Service can't simply magically access your private corporate network.",
      },
      {
        type: "flow",
        direction: "vertical",
        nodes: [
          { label: "Power BI Service (cloud)", tone: "ember" },
          { label: "Secure connection", tone: "gold" },
          { label: "On-Premises Gateway", tone: "sky" },
          { label: "Firewall", tone: "mint" },
          { label: "SQL Server", tone: "gold" },
        ],
      },
      {
        type: "text",
        content: "Gateway enables scheduled refresh, DirectQuery, and live connections for applicable private/on-premises sources.",
      },
      { type: "heading", content: "Row-Level Security" },
      {
        type: "text",
        content: "Suppose the same report serves 5,000 managers — you don't want 5,000 separate reports:",
      },
      {
        type: "flow",
        direction: "vertical",
        nodes: [
          { label: "One report", tone: "ember" },
          { label: "GA Manager / TX Manager / CA Manager", tone: "gold" },
          { label: "Georgia / Texas / California", tone: "sky" },
        ],
      },
      {
        type: "code",
        language: "dax",
        content: "DimSalesperson[Email] = USERPRINCIPALNAME()",
      },
      {
        type: "flow",
        direction: "vertical",
        nodes: [
          { label: "Raj logs in", tone: "ember" },
          { label: "Entra identity", tone: "gold" },
          { label: "RLS", tone: "sky" },
          { label: "Filter dimension → relationship → FactSales", tone: "mint" },
          { label: "Raj sees only authorized data", tone: "gold" },
        ],
      },
      {
        type: "callout",
        variant: "tip",
        content: "Power BI semantic models can enforce RLS to filter data access for users.",
      },
    ],
  },
  {
    id: "performance-optimization-architecture",
    category: "PowerBI",
    question: "How do you approach Power BI performance optimization end-to-end?",
    tags: ["Power BI", "Performance", "Architecture"],
    answer: [
      {
        type: "text",
        content: "A full enterprise architecture combines everything so far — ERP/SAP, SQL Server, Oracle, Salesforce, Excel, APIs, Fabric Warehouse, Snowflake, all flowing through ETL, curated data, Power Query with query folding, into a semantic model with dimensions, measures, DAX and RLS, then a storage mode (Import / DirectQuery / Direct Lake), then Power BI Service, then out to Apps, Reports, and APIs.",
      },
      {
        type: "callout",
        variant: "warn",
        content:
          'When someone says "My Power BI report is slow," don\'t immediately say "reduce the number of visuals." That\'s one possibility, but investigate the whole stack.',
      },
      {
        type: "flow",
        title: "Where to look, in order",
        direction: "vertical",
        nodes: [
          { label: "1. Source", tone: "ember" },
          { label: "2. Power Query", tone: "gold" },
          { label: "3. Data Model", tone: "sky" },
          { label: "4. VertiPaq", tone: "mint" },
          { label: "5. DAX", tone: "gold" },
          { label: "6. Visual", tone: "ember" },
          { label: "7. Network / Capacity", tone: "sky" },
        ],
      },
      {
        type: "table",
        headers: ["Layer", "Check"],
        rows: [
          ["Source", "Indexes, views, SQL performance, query plans, source aggregations"],
          ["Power Query", "Query folding, unnecessary columns/rows, expensive transformations"],
          ["Model", "Star schema, relationship cardinality, bi-directional relationships, high-cardinality columns, unused columns, granularity"],
          ["DAX", "Iterators, filter context, repeated calculations, expensive FILTER operations, poor measure design"],
          ["Visual layer", "Too many visuals, huge tables, high-cardinality slicers, unnecessary interactions, complex custom visuals"],
        ],
      },
      {
        type: "code",
        language: "dax",
        content: `Profit Margin =
VAR Revenue = [Total Revenue]
VAR Profit = [Total Profit]
RETURN
    DIVIDE(Profit, Revenue)`,
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "`VAR` doesn't magically make everything faster — but it can improve readability, avoid repeated evaluation in appropriate expressions, and make complex DAX easier to reason about.",
      },
      {
        type: "callout",
        variant: "info",
        content: "Microsoft maintains a dedicated Power BI optimization guidance collection covering model design, query folding, DirectQuery, relationships, and related performance concerns.",
      },
    ],
  },
  {
    id: "dax-formula-vs-storage-engine",
    category: "PowerBI",
    question: "Bonus: Formula Engine vs Storage Engine — how does a DAX query actually run?",
    tags: ["Power BI", "DAX", "Internals"],
    answer: [
      {
        type: "text",
        content: "For a more senior interview, understand this mental model — Power BI queries involve two engine concepts:",
      },
      {
        type: "flow",
        direction: "vertical",
        nodes: [
          { label: "DAX Query", tone: "ember" },
          { label: 'Formula Engine — "what calculation is required?"', tone: "gold" },
          { label: 'Storage Engine — "retrieve/aggregate the data"', tone: "sky" },
          { label: "Result", tone: "mint" },
        ],
      },
      { type: "heading", content: "Storage Engine" },
      {
        type: "text",
        content: "VertiPaq can perform highly optimized operations — SUM, COUNT, GROUP BY-like aggregations, filtering compressed columns — very efficiently.",
      },
      { type: "heading", content: "Formula Engine" },
      {
        type: "text",
        content: "Handles more sophisticated DAX logic and orchestration. Complex iterative logic can force more Formula Engine work. For example:",
      },
      {
        type: "code",
        language: "dax",
        content: `SUMX(
    FactSales,
    FactSales[Quantity] *
    FactSales[UnitPrice]
)`,
      },
      {
        type: "text",
        content: "`SUMX` is an **iterator**. Conceptually: Row 1 → Qty × Price, Row 2 → Qty × Price, Row 3 → Qty × Price... then SUM.",
      },
      {
        type: "callout",
        variant: "warn",
        content:
          "Iterators aren't inherently bad — but running expensive row-by-row expressions over enormous fact tables can become costly. Experienced DAX developers ask: **can this calculation be modeled differently, or pushed toward a more efficient storage-engine operation?**",
      },
    ],
  },
  {
    id: "row-context-vs-filter-context",
    category: "PowerBI",
    question: "Bonus: Row Context vs Filter Context — where DAX gets hard",
    tags: ["Power BI", "DAX", "Context"],
    answer: [
      {
        type: "text",
        content: "This deserves special attention because it's where DAX starts becoming difficult.",
      },
      { type: "heading", content: "Row Context — \"which row am I currently evaluating?\"" },
      {
        type: "code",
        language: "dax",
        content: `LineAmount =
FactSales[Quantity] *
FactSales[UnitPrice]`,
      },
      {
        type: "table",
        headers: ["Row", "Qty × Price", "Result"],
        rows: [
          ["Row 1", "2 × 10", "$20"],
          ["Row 2", "3 × 10", "$30"],
        ],
      },
      {
        type: "callout",
        variant: "info",
        content: "Power BI evaluates each row individually — that's **row context**.",
      },
      { type: "heading", content: "Filter Context — \"which subset of data is currently visible to this calculation?\"" },
      {
        type: "text",
        content: "Example: Year = 2026, State = Georgia, Product = Laptop. Then:",
      },
      {
        type: "code",
        language: "dax",
        content: "Total Sales = SUM(FactSales[SalesAmount])",
      },
      {
        type: "text",
        content: "...actually means, conceptually:",
      },
      {
        type: "code",
        language: "sql",
        content: `FactSales
WHERE
Year = 2026
AND State = Georgia
AND Product = Laptop
→ SUM SalesAmount`,
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "Understanding **row context + filter context + context transition + CALCULATE** is the doorway from intermediate to advanced DAX.",
      },
    ],
  },
  {
    id: "relationship-direction",
    category: "PowerBI",
    question: "Bonus: How does relationship filter direction actually work?",
    tags: ["Power BI", "Relationships", "Data Modeling"],
    answer: [
      {
        type: "text",
        content: "Suppose DimProduct is on the \"1\" side and FactSales is on the \"many\" side. Normally filtering flows one way:",
      },
      {
        type: "flow",
        direction: "vertical",
        nodes: [
          { label: "Category = Laptop", tone: "ember" },
          { label: "DimProduct filtered", tone: "gold" },
          { label: "FactSales filtered", tone: "sky" },
          { label: "Total Sales", tone: "mint" },
        ],
      },
      {
        type: "callout",
        variant: "tip",
        content: "This is why **dimensions naturally filter facts.**",
      },
      { type: "heading", content: "Why not make everything bidirectional?" },
      {
        type: "text",
        content: "Because then Table A ↔ Table B ↔ Table C ↔ Table D can create:",
      },
      {
        type: "list",
        items: ["Ambiguous filter paths", "Unexpected results", "More complex reasoning", "Potential performance issues"],
      },
      {
        type: "callout",
        variant: "warn",
        content:
          "**Use single-direction relationships by default.** Introduce bidirectional filtering only when the model genuinely requires it and you understand the consequences.",
      },
    ],
  },
  {
    id: "power-bi-real-world-project",
    category: "PowerBI",
    question: "Walk through a real-world project: retail executive analytics",
    tags: ["Power BI", "Case Study"],
    answer: [
      {
        type: "callout",
        variant: "info",
        content: 'Business requirement — the CEO asks: "I need daily revenue, margin, customer growth, regional performance, and product profitability."',
      },
      {
        type: "table",
        headers: ["Source", "Data domain"],
        rows: [
          ["SAP", "Orders, Inventory, Products"],
          ["Salesforce", "Customers"],
          ["SQL Server", "Store Transactions"],
          ["Excel", "Monthly Targets"],
        ],
      },
      { type: "heading", content: "ETL" },
      {
        type: "flow",
        direction: "vertical",
        nodes: [
          { label: "Sources", tone: "ember" },
          { label: "Power Query / Fabric ETL", tone: "gold" },
          { label: "Clean, standardize, deduplicate, transform", tone: "sky" },
          { label: "Semantic Model", tone: "mint" },
        ],
      },
      { type: "heading", content: "Model" },
      {
        type: "code",
        language: "text",
        content: `                    DimDate
                       │
                       │
DimCustomer ─────── FactSales ─────── DimProduct
                       │
                       │
                    DimStore
                       │
                       │
                   DimRegion`,
      },
      { type: "heading", content: "Measures" },
      {
        type: "code",
        language: "dax",
        content: `Revenue = SUM(FactSales[Revenue])
Cost = SUM(FactSales[Cost])
Profit = [Revenue] - [Cost]
Margin % = DIVIDE([Profit], [Revenue])

Revenue LY =
CALCULATE(
    [Revenue],
    SAMEPERIODLASTYEAR(DimDate[Date])
)

YoY % = DIVIDE([Revenue] - [Revenue LY], [Revenue LY])`,
      },
      { type: "heading", content: "Report" },
      {
        type: "code",
        language: "text",
        content: `┌──────────────────────────────────────────────┐
│             EXECUTIVE SALES                  │
│                                                │
│ Revenue    Profit     Margin      YoY         │
│ $128M      $26M       20.3%       +8.2%       │
│                                                │
│ ┌────────────────┐ ┌───────────────────────┐  │
│ │ Sales Trend    │ │ Revenue by Region      │  │
│ └────────────────┘ └───────────────────────┘  │
│                                                │
│ Top Products          Margin by Category      │
└──────────────────────────────────────────────┘`,
      },
      {
        type: "callout",
        variant: "tip",
        content:
          'Now executives don\'t need to know DAX, VertiPaq, Power Query, SQL, Gateway, or Star Schema. They simply see: **"Southeast revenue fell 11%"** — and take action. That is ultimately why all this engineering exists.',
      },
    ],
  },
  {
    id: "power-bi-deployment-architecture",
    category: "PowerBI",
    question: "What does enterprise Power BI deployment architecture look like?",
    tags: ["Power BI", "Deployment", "Enterprise"],
    answer: [
      {
        type: "callout",
        variant: "warn",
        content: 'In enterprise Power BI, don\'t think "Developer → Publish → Done." Think **SDLC**.',
      },
      {
        type: "flow",
        direction: "vertical",
        nodes: [
          { label: "Power BI Developer", tone: "ember" },
          { label: "Development Workspace", tone: "gold" },
          { label: "Testing / QA", tone: "sky" },
          { label: "Test Workspace", tone: "mint" },
          { label: "UAT", tone: "gold" },
          { label: "Production Workspace", tone: "ember" },
          { label: "Power BI App", tone: "sky" },
          { label: "Business Users", tone: "mint" },
        ],
      },
      {
        type: "text",
        content: "Then layer in:",
      },
      {
        type: "list",
        items: [
          "Git / source control",
          "Deployment pipelines",
          "Environment parameters",
          "Gateway configuration",
          "Security",
          "Monitoring",
          "Capacity management",
          "Refresh monitoring",
          "Usage analytics",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        content:
          'That\'s the difference between **"I know Power BI Desktop"** and **"I can operate Power BI in an enterprise."**',
      },
    ],
  },
  {
    id: "power-bi-fabric-architecture",
    category: "PowerBI",
    question: "How does Power BI fit into the modern Fabric architecture?",
    tags: ["Power BI", "Fabric", "Direct Lake"],
    answer: [
      {
        type: "text",
        content: "Since Power BI now sits inside Fabric, connect the two mentally:",
      },
      {
        type: "code",
        language: "text",
        content: `                         SOURCES
                            │
                            ↓
                      DATA FACTORY
                            │
                            ↓
                         ONELAKE
                            │
                 ┌──────────┴──────────┐
                 ↓                     ↓
             LAKEHOUSE             WAREHOUSE
                 │                     │
                 └──────────┬──────────┘
                            ↓
                     SEMANTIC MODEL
                            │
                       DIRECT LAKE
                            │
                            ↓
                        POWER BI
                            │
                     ┌──────┴──────┐
                     ↓             ↓
                  Reports         Apps
                     │
                     ↓
               Business Users`,
      },
      {
        type: "callout",
        variant: "tip",
        content: "This is why learning Power BI today naturally leads into Fabric.",
      },
    ],
  },
  {
    id: "power-bi-seminar-flow-and-checklist",
    category: "PowerBI",
    question: "How would a 1-hour Power BI seminar be structured, and what should a strong developer know?",
    tags: ["Power BI", "Summary"],
    answer: [
      {
        type: "table",
        headers: ["Time", "Topic"],
        rows: [
          ["0–5 min", "What Power BI actually is"],
          ["5–10 min", "Ecosystem & architecture"],
          ["10–16 min", "Power Query + Query Folding"],
          ["16–23 min", "Star Schema"],
          ["23–28 min", "VertiPaq + Cardinality"],
          ["28–38 min", "DAX + Evaluation Context"],
          ["38–43 min", "Measures vs Calculated Columns"],
          ["43–49 min", "Import / DirectQuery / Composite"],
          ["49–54 min", "Refresh / Gateway / RLS"],
          ["54–60 min", "Performance + Enterprise Architecture"],
        ],
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "For a technical audience, spend the largest chunk on **modeling + DAX** — that's where Power BI developers most often distinguish themselves.",
      },
      { type: "heading", content: "The 12 things a strong Power BI developer should know" },
      {
        type: "list",
        ordered: true,
        items: [
          "Power Query / M",
          "Query Folding",
          "Star Schema",
          "Fact vs Dimension",
          "Relationships & filter direction",
          "VertiPaq & cardinality",
          "DAX",
          "Row Context vs Filter Context",
          "CALCULATE",
          "Import vs DirectQuery vs Composite/Direct Lake",
          "RLS + Gateway + Refresh",
          "Performance optimization",
        ],
      },
      {
        type: "callout",
        variant: "info",
        content:
          "Microsoft's current semantic-model documentation essentially follows this same professional progression: transform data, model relationships, create DAX calculations, understand storage modes, then optimize and apply advanced modeling techniques.",
      },
    ],
  },
  {
    id: "power-bi-master-architecture-and-goal",
    category: "PowerBI",
    question: "The one architecture to memorize, and what Power BI is actually for",
    tags: ["Power BI", "Summary", "Interview"],
    answer: [
      {
        type: "text",
        content: "If you could remember only one Power BI diagram, it would be this one:",
      },
      {
        type: "code",
        language: "text",
        content: `                 RAW DATA
                    │
                    ↓
            POWER QUERY / M
         Clean + Transform + ETL
                    │
                    ↓
              DATA MODEL
                    │
         ┌──────────┼──────────┐
         ↓          ↓          ↓
      Tables   Relationships   DAX
         │          │          │
         └──────────┼──────────┘
                    ↓
              SEMANTIC MODEL
                    │
                    ↓
                 ENGINE
          VertiPaq / DirectQuery
                    │
                    ↓
                 REPORT
                    │
                    ↓
            POWER BI SERVICE
                    │
         ┌──────────┼───────────┐
         ↓          ↓           ↓
       Apps       Users      Embedded
                    │
                    ↓
             BUSINESS ACTION`,
      },
      { type: "heading", content: "What are we actually trying to achieve?" },
      {
        type: "callout",
        variant: "warn",
        content: "The goal of Power BI is **not** to make colorful dashboards.",
      },
      {
        type: "flow",
        direction: "vertical",
        nodes: [
          { label: "Messy Enterprise Data", tone: "ember" },
          { label: "Clean + Governed Data", tone: "gold" },
          { label: "Correct Semantic Model", tone: "sky" },
          { label: "Reusable Business Logic", tone: "mint" },
          { label: "Fast + Secure Analytics", tone: "gold" },
          { label: "Business Insight", tone: "ember" },
          { label: "Business Decision", tone: "sky" },
        ],
      },
      {
        type: "text",
        content: "A report can look beautiful and still be a terrible BI solution if:",
      },
      {
        type: "list",
        items: [
          "Revenue calculation is wrong",
          "Relationships are ambiguous",
          "Refresh fails",
          "RLS exposes sensitive data",
          "Dashboard takes 25 seconds",
          "Every report defines Profit differently",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "Conversely, a properly designed semantic model gives the organization **a single reusable definition of the business.** Revenue, Profit, Customer, Active Customer, YoY Growth should mean the same thing whether 5 people or 5,000 people consume the reports.",
      },
      { type: "heading", content: "What is the interviewer actually expecting?" },
      {
        type: "text",
        content:
          "For a senior Power BI interview, they're usually trying to determine whether you're merely a report builder, or whether you understand BI engineering. A strong answer naturally connects:",
      },
      {
        type: "callout",
        variant: "info",
        content:
          "**Business Requirement → Source → ETL/Power Query → Query Folding → Star Schema → Relationships → VertiPaq → DAX → Storage Mode → Security → Service → Performance → Business Impact.** If you can confidently walk an interviewer through that chain — and explain *why* you made each architectural decision — you'll sound much more like a senior Power BI/Data Analytics engineer than someone who has simply learned where the buttons are in Power BI Desktop.",
      },
      {
        type: "links",
        items: [
          {
            href: "https://learn.microsoft.com/en-us/power-bi/",
            label: "Microsoft's official Power BI guidance documentation",
          },
          {
            href: "https://learn.microsoft.com/en-us/power-bi/transform-model/",
            label: "Semantic Model Designer documentation",
          },
        ],
      },
    ],
  },
];
