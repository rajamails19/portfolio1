import type { Section } from "./types";

export const qansChaatSection: Section = {
  slug: "qans",
  title: "Chaat Q & Answers",
  tagline: "Street-food fundamentals — every question is a tasting note.",
  emoji: "◈",
  gradient: "from-[oklch(0.92_0.13_60)] via-[oklch(0.9_0.14_35)] to-[oklch(0.9_0.13_20)]",
  items: [
    {
      id: "playwright-vs-selenium-cypress",
      category: "Playwright",
      question: "What is Playwright and how is it different from Selenium and Cypress?",
      tags: ["Playwright", "Comparison"],
      difficulty: "Easy",
      answer: [
        {
          type: "list",
          items: [
            "**Auto-wait mechanism:** Built-in waits for elements to be actionable",
            "**Multi-tab/window:** Native support for multiple contexts",
            "**Modern architecture:** Direct browser protocol communication (CDP, WebKit protocol)",
            "**Rich Debugging Tools:** Includes Playwright Inspector, VSCode Debugger, and Trace Viewer",
          ],
        },
      ],
    },
    {
      id: "playwright-architecture",
      category: "Playwright",
      question: "Explain Playwright architecture",
      tags: ["Playwright", "Architecture"],
      difficulty: "Easy",
      answer: [
        {
          type: "list",
          items: [
            "**Browser contexts:** Isolated incognito-like sessions",
            "**No WebDriver:** Direct browser automation via native protocols",
          ],
        },
      ],
    },
    {
      id: "page-vs-browser-context",
      category: "Playwright",
      question:
        "What is the primary difference between a Page object and a BrowserContext object in Playwright?",
      tags: ["Playwright", "Browser Context"],
      difficulty: "Medium",
      answer: [
        { type: "heading", content: "Page vs BrowserContext in Playwright" },
        {
          type: "heading",
          content: "BrowserContext = An isolated browser session (like an incognito window)",
        },
        {
          type: "list",
          items: [
            "Contains cookies, storage, permissions, cache",
            "Can have multiple pages/tabs within it",
            "Isolated from other contexts (separate sessions)",
          ],
        },
        { type: "heading", content: "Page = A single tab/window within a context" },
        {
          type: "list",
          items: [
            "Where you actually interact with web content",
            "Multiple pages can exist in one context (sharing session state)",
          ],
        },
      ],
    },
    {
      id: "five-pillars-of-playwright",
      category: "Playwright",
      question: "What are the 5 Pillars of Playwright?",
      tags: ["Playwright", "Core Concepts"],
      difficulty: "Easy",
      answer: [
        {
          type: "list",
          items: [
            "🔹 **Locators** — The Foundation of Stable Tests",
            "🔹 **Actions** — Simulating Real User Behavior",
            "🔹 **Assertions** — Verifying Expected Outcomes",
            "🔹 **Navigation** — Managing Page Lifecycle",
            "🔹 **Contexts** — Isolated Testing Environments",
          ],
        },
      ],
    },
    {
      id: "brief-playwright-concepts",
      category: "Playwright",
      question: "Brief Playwright Concepts",
      tags: ["Playwright", "Quick Reference"],
      difficulty: "Easy",
      answer: [
        {
          type: "image",
          src: "/images/playwright-concepts-reference.png",
          alt: "Brief Playwright Concepts reference table covering browsers, contexts, pages, locators, actions, assertions, and waiting",
        },
      ],
    },
    {
      id: "playwright-interactions-and-assertions",
      category: "Playwright",
      question: "Interactions and Assertions",
      tags: ["Playwright", "Interactions"],
      difficulty: "Easy",
      answer: [
        {
          type: "image",
          src: "/images/playwright-interactions.png",
          alt: "Basic Playwright interactions showing clicking, typing, and navigation examples",
        },
      ],
    },
    {
      id: "playwright-configuration-file",
      category: "Playwright",
      question: "Explain Playwright configuration file",
      tags: ["Playwright", "Configuration"],
      difficulty: "Medium",
      answer: [
        {
          type: "image",
          src: "/images/playwright-configuration.png",
          alt: "Playwright configuration file example with test settings, reporters, use options, and projects",
        },
      ],
    },
    {
      id: "playwright-api-assertions",
      category: "Playwright",
      question: "API Assertions how to check?",
      tags: ["Playwright", "API Assertions"],
      difficulty: "Medium",
      answer: [
        { type: "heading", content: "Common Assertions" },
        {
          type: "image",
          src: "/images/playwright-api-assertions.png",
          alt: "Common Playwright API assertions for status code, response body, headers, and response time",
        },
      ],
    },
    {
      id: "playwright-locator-strategies",
      category: "Playwright",
      question: "What are different locator strategies in Playwright?",
      tags: ["Playwright", "Locators"],
      difficulty: "Medium",
      answer: [
        {
          type: "image",
          src: "/images/playwright-locator-strategies.png",
          alt: "Playwright locator strategies showing recommended user-facing locators, CSS and XPath locators, and combined locators",
        },
      ],
    },
    {
      id: "playwright-common-actions",
      category: "Playwright",
      question: "What are common actions in Playwright?",
      tags: ["Playwright", "Actions"],
      difficulty: "Medium",
      answer: [
        {
          type: "image",
          src: "/images/playwright-common-actions-1.png",
          alt: "Common Playwright click, input, keyboard, and select actions",
        },
        {
          type: "image",
          src: "/images/playwright-common-actions-2.png",
          alt: "Common Playwright checkbox, radio, hover, and file upload actions",
        },
      ],
    },
    {
      id: "playwright-assertion-types",
      category: "Playwright",
      question: "What are different assertion types in Playwright?",
      tags: ["Playwright", "Assertions"],
      difficulty: "Medium",
      answer: [
        {
          type: "image",
          src: "/images/playwright-assertion-types.png",
          alt: "Playwright web-first, text, and attribute assertion examples",
        },
      ],
    },
    {
      id: "playwright-fixtures",
      category: "Playwright",
      question: "Explain what is Fixtures in PW?",
      tags: ["Playwright", "Fixtures"],
      difficulty: "Medium",
      answer: [
        {
          type: "text",
          content:
            "Playwright fixtures are a core, powerful concept in the Playwright Test runner. They are reusable components that **set up the necessary environment or state** for your tests and automatically handle the **teardown** (cleanup) afterward.",
        },
        {
          type: "text",
          content:
            "They are the primary mechanism for dependency injection, promoting code reuse, test isolation, and cleaner test code by abstracting common setup logic.",
        },
        { type: "heading", content: "✨ Why Use Fixtures?" },
        {
          type: "text",
          content:
            "Fixtures are a significant step up from traditional `beforeEach/afterEach` hooks in several key ways:",
        },
        {
          type: "image",
          src: "/images/playwright-fixtures-vs-hooks.png",
          alt: "Comparison of Playwright fixtures and beforeEach hooks across on-demand execution, setup and teardown, reusability, and isolation",
        },
      ],
    },
    {
      id: "playwright-parallel-execution",
      category: "Playwright",
      question: "How does Playwright support parallel execution?",
      tags: ["Playwright", "Parallel Execution"],
      difficulty: "Medium",
      answer: [
        {
          type: "list",
          items: [
            "Playwright uses worker processes for parallel execution.",
            "Configured via `playwright.config.ts` using workers.",
            "Each worker runs in an isolated browser context.",
          ],
        },
      ],
    },
    {
      id: "playwright-authentication",
      category: "Playwright",
      question: "How do you handle authentication in Playwright?",
      tags: ["Playwright", "Authentication"],
      difficulty: "Medium",
      answer: [
        { type: "text", content: "Authentication can be handled using:" },
        {
          type: "list",
          items: [
            "Storage State (`storageState.json`)",
            "API-based login using `request.newContext()`",
          ],
        },
      ],
    },
    {
      id: "what-is-selenium",
      category: "Selenium",
      question: "What is Selenium?",
      tags: ["Selenium", "Fundamentals"],
      difficulty: "Easy",
      answer: [
        {
          type: "callout",
          variant: "info",
          content:
            "**Selenium** is an open-source automation tool used to automate web browsers.",
        },
        {
          type: "text",
          content:
            "It supports multiple browsers (==Chrome, Firefox, Edge, Safari==) and multiple programming languages such as **Java, Python, C#, and JavaScript**.",
        },
        { type: "heading", content: "It is mainly used for" },
        {
          type: "flow",
          title: "Core testing uses",
          nodes: [
            { label: "Functional Testing", sub: "Validate application behavior", tone: "ember" },
            { label: "Regression Testing", sub: "Protect existing functionality", tone: "mint" },
            { label: "Cross-Browser Testing", sub: "Check browser compatibility", tone: "sky" },
          ],
        },
      ],
    },
    {
      id: "selenium-components",
      category: "Selenium",
      question: "What are the components of Selenium?",
      tags: ["Selenium", "Components"],
      difficulty: "Easy",
      answer: [
        {
          type: "table",
          headers: ["Component", "Purpose"],
          rows: [
            ["**Selenium IDE**", "Record and playback."],
            ["**Selenium WebDriver**", "Browser automation API."],
            ["**Selenium Grid**", "Parallel and distributed execution."],
          ],
        },
        {
          type: "callout",
          variant: "warn",
          content: "**Selenium RC is obsolete.**",
        },
      ],
    },
    {
      id: "selenium-page-object-model",
      category: "Selenium",
      question: "What is Page Object Model (POM)?",
      tags: ["Selenium", "Design Pattern", "POM"],
      difficulty: "Medium",
      answer: [
        {
          type: "text",
          content: "**POM** is a design pattern where:",
        },
        {
          type: "flow",
          title: "Separation of responsibilities",
          nodes: [
            {
              label: "Page Locators",
              sub: "Page Locators are stored separately.",
              tone: "sky",
            },
            {
              label: "Page Classes",
              sub: "Business methods are written inside page classes.",
              tone: "mint",
            },
            {
              label: "Test Scripts",
              sub: "Test scripts only call those methods.",
              tone: "ember",
            },
          ],
        },
      ],
    },
    {
      id: "selenium-dynamic-elements",
      category: "Selenium",
      question: "How do you handle dynamic elements?",
      tags: ["Selenium", "Dynamic Elements"],
      difficulty: "Medium",
      answer: [
        { type: "heading", content: "Common approaches" },
        {
          type: "flow",
          title: "A reliable dynamic-element strategy",
          nodes: [
            { label: "Relative XPath", sub: "Locate by stable relationships", tone: "ember" },
            { label: "CSS Selectors", sub: "Target stable attributes", tone: "sky" },
            { label: "Explicit Waits", sub: "Synchronize before interaction", tone: "mint" },
          ],
        },
      ],
    },
    {
      id: "selenium-alerts-frames-windows",
      category: "Selenium",
      question: "How do you handle alerts, frames, and windows?",
      tags: ["Selenium", "Browser Context"],
      difficulty: "Medium",
      answer: [
        { type: "heading", content: "Alert" },
        {
          type: "code",
          language: "java",
          content: "driver.switchTo().alert().accept();",
        },
        { type: "heading", content: "Frame" },
        {
          type: "code",
          language: "java",
          content: 'driver.switchTo().frame("frameName");',
        },
        { type: "heading", content: "Window" },
        {
          type: "code",
          language: "java",
          content: "driver.getWindowHandles();\ndriver.switchTo().window(windowID);",
        },
        { type: "heading", content: "Easy way to remember" },
        {
          type: "table",
          headers: ["Target", "Meaning"],
          rows: [
            ["**Alert**", "Pop-up"],
            ["**Frame**", "Inside the page"],
            ["**Window**", "New browser tab/window"],
          ],
        },
      ],
    },
    {
      id: "what-is-selenium-grid",
      category: "Selenium",
      question: "What is Selenium Grid?",
      tags: ["Selenium", "Grid", "Parallel Testing"],
      difficulty: "Easy",
      answer: [
        {
          type: "callout",
          variant: "info",
          content: "**Selenium Grid** allows tests to run:",
        },
        {
          type: "flow",
          title: "Distributed execution",
          nodes: [
            { label: "Multiple browsers", tone: "sky" },
            { label: "Multiple operating systems", tone: "mint" },
            { label: "Multiple machines", tone: "ember" },
            { label: "In parallel", tone: "gold" },
          ],
        },
      ],
    },
    {
      id: "selenium-locator-strategies",
      category: "Selenium",
      question: "What locator strategies does Selenium support?",
      tags: ["Selenium", "Locators"],
      difficulty: "Easy",
      answer: [
        { type: "text", content: "Selenium supports:" },
        {
          type: "table",
          headers: ["Locator strategy", "Note"],
          rows: [
            ["**id**", "==Fastest & preferred=="],
            ["**className**", "Locate using the element class name"],
            ["**linkText**", "Locate using visible link text"],
            ["**CSS Selector**", "Flexible CSS-based selection"],
            ["**XPath**", "Flexible path-based selection"],
          ],
        },
      ],
    },
    {
      id: "xpath-vs-css-selector",
      category: "Selenium",
      question: "XPath vs CSS Selector",
      tags: ["Selenium", "Locators", "Comparison"],
      difficulty: "Medium",
      answer: [
        {
          type: "table",
          headers: ["XPath", "CSS Selector"],
          rows: [
            ["More flexible", "Faster"],
            ["Can move both up & down DOM", "Moves downward only"],
            ["Supports text matching", "No direct text matching"],
            ["Slightly slower", "Slightly faster"],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "**When to use:** CSS for simple locators. XPath for complex or dynamic elements.",
        },
      ],
    },
    {
      id: "selenium-actions",
      category: "Selenium",
      question: "What are Actions in Selenium?",
      tags: ["Selenium", "Actions", "Interactions"],
      difficulty: "Easy",
      answer: [
        {
          type: "callout",
          variant: "info",
          content: "The **Actions class** is used for advanced user interactions.",
        },
        { type: "heading", content: "Examples" },
        {
          type: "flow",
          title: "Advanced user interactions",
          nodes: [
            { label: "Mouse Hover", tone: "sky" },
            { label: "Right Click", tone: "ember" },
            { label: "Double Click", tone: "mint" },
            { label: "Drag and Drop", tone: "gold" },
            { label: "Click and Hold", tone: "sky" },
          ],
        },
      ],
    },
    {
      id: "selenium-dropdowns",
      category: "Selenium",
      question: "How do you handle dropdowns?",
      tags: ["Selenium", "Select", "Dropdowns"],
      difficulty: "Medium",
      answer: [
        { type: "text", content: "Using the **Select class**." },
        {
          type: "code",
          language: "java",
          content:
            'Select select = new Select(dropdown);\n\nselect.selectByVisibleText("India");',
        },
        { type: "heading", content: "Methods" },
        {
          type: "list",
          items: ["`selectByVisibleText()`", "`selectByValue()`", "`selectByIndex()`"],
        },
      ],
    },
    {
      id: "selenium-scroll-webpage",
      category: "Selenium",
      question: "How do you scroll a webpage?",
      tags: ["Selenium", "JavaScriptExecutor", "Scrolling"],
      difficulty: "Medium",
      answer: [
        { type: "text", content: "Using **JavaScriptExecutor**." },
        {
          type: "code",
          language: "java",
          content:
            'JavascriptExecutor js =\n(JavascriptExecutor)driver;\n\njs.executeScript(\n  "window.scrollBy(0,500)"\n);',
        },
        { type: "heading", content: "Useful for" },
        {
          type: "table",
          headers: ["Scenario", "Why scrolling helps"],
          rows: [
            ["**Infinite scrolling**", "Loads the next section of content"],
            ["**Lazy loading**", "Triggers deferred content or images"],
            ["**Hidden elements**", "Brings off-screen elements into view"],
          ],
        },
      ],
    },
    {
      id: "selenium-exceptions-handled",
      category: "Selenium",
      question: "What exceptions have you handled in Selenium?",
      tags: ["Selenium", "Exceptions"],
      difficulty: "Medium",
      answer: [
        { type: "heading", content: "Common exceptions" },
        {
          type: "list",
          items: [
            "**NoSuchElementException**",
            "**StaleElementReferenceException**",
            "**TimeoutException**",
            "**NoSuchWindowException**",
          ],
        },
      ],
    },
    {
      id: "maintainable-selenium-framework",
      category: "Selenium",
      question: "How do you make your Selenium framework maintainable?",
      tags: ["Selenium", "Framework Design", "Maintainability"],
      difficulty: "Medium",
      answer: [
        { type: "heading", content: "Best practices" },
        {
          type: "flow",
          title: "Maintainable framework foundations",
          nodes: [
            { label: "Page Object Model (POM)", tone: "sky" },
            { label: "Reusable utility classes", tone: "mint" },
            { label: "Data-driven testing", tone: "ember" },
            { label: "Modular design", tone: "gold" },
          ],
        },
      ],
    },
    {
      id: "reduce-automation-execution-time",
      category: "Selenium",
      question: "How do you reduce automation execution time?",
      tags: ["Selenium", "Performance", "Execution"],
      difficulty: "Medium",
      answer: [
        { type: "heading", content: "Methods" },
        {
          type: "table",
          headers: ["Method", "Focus"],
          rows: [
            ["**Parallel execution**", "Run more tests at the same time"],
            ["**Selenium Grid**", "Distribute execution across environments"],
            ["**Execute only impacted tests**", "Avoid unnecessary test runs"],
            ["**Independent test cases**", "Remove ordering and shared-state bottlenecks"],
          ],
        },
      ],
    },
    {
      id: "selenium-locators",
      category: "Basics",
      question:
        "What is meant by a locator and name a few different types of locators present in Selenium.",
      tags: ["Selenium", "Locators"],
      difficulty: "Easy",
      answer: [
        {
          type: "callout",
          variant: "info",
          content:
            "A locator is an **address** for ==uniquely identifying web elements== within a web page.",
        },
        { type: "heading", content: "Selenium locator families" },
        {
          type: "text",
          content:
            "There are different types of locators present in Selenium to identify web elements **uniquely and accurately** like:",
        },
        {
          type: "table",
          headers: ["Locator family", "Types"],
          rows: [
            ["Attribute-based", "**ID**, **Name**, **ClassName**"],
            ["Element & link text", "**TagName**, **LinkText**, **PartialLinkText**"],
            ["Structure & query", "**Xpath**, **CSS Selector**, **DOM**"],
          ],
        },
      ],
    },
    {
      id: "automated-vs-manual-testing",
      category: "Basics",
      question:
        "What are the cases when you’ll consider to choose automated testing over manual testing?",
      tags: ["Automation", "Testing Basics"],
      difficulty: "Easy",
      answer: [
        {
          type: "callout",
          variant: "tip",
          content:
            "**Automated testing** can be considered over ==manual testing== during the following situations:",
        },
        { type: "heading", content: "When automation is the better fit" },
        {
          type: "table",
          headers: ["Execution needs", "Delivery needs"],
          rows: [
            [
              "When tests require **periodic execution**",
              "When you have **less time** to complete the testing phase",
            ],
            [
              "Tests include **repetitive steps**",
              "When there is a lot of code that needs to be **repeatedly tested**",
            ],
            [
              "Tests need to be executed in a **standard runtime environment**",
              "Reports are required for **every execution**",
            ],
          ],
        },
      ],
    },
    {
      id: "software-testing-types",
      category: "Basics",
      question: "What are the different types of testing?",
      tags: ["Testing Basics", "Classification"],
      difficulty: "Medium",
      answer: [
        { type: "heading", content: "Classification of Software testing types" },
        {
          type: "link",
          href: "https://www.geeksforgeeks.org/types-software-testing/",
          label: "Reference: Types of Software Testing",
        },
        { type: "heading", content: "By purpose" },
        {
          type: "flow",
          title: "Testing can broadly be defined into two types",
          nodes: [
            {
              label: "Functional testing",
              sub: "Validates what the system should do",
              tone: "ember",
            },
            {
              label: "Non Functional testing",
              sub: "Validates how well the system operates",
              tone: "mint",
            },
          ],
        },
        {
          type: "text",
          content:
            "**Functional testing** – Functional testing involves validating the functional specifications of the system.",
        },
        {
          type: "text",
          content:
            "**Non Functional testing** – Non-functional testing is a type of testing that involves testing of non-functional requirements of the system such as ==performance, scalability, security, endurance, portability==, etc.",
        },
        { type: "heading", content: "By visibility into the system" },
        {
          type: "flow",
          title: "Going by the way the testing is done",
          nodes: [
            { label: "Black box", sub: "No internal knowledge", tone: "gold" },
            { label: "White box", sub: "Full internal analysis", tone: "sky" },
            { label: "Gray box", sub: "Partial internal access", tone: "mint" },
          ],
        },
        {
          type: "text",
          content:
            "**Black box testing** – In black-box testing, the tester need not have any knowledge of the internal architecture or implementation of the system. The tester interacts with the system through the interface providing input and validating the received output.",
        },
        {
          type: "text",
          content:
            "**White box testing** – In white box testing, the tester analyses the internal architecture of the system as well as the quality of source code on different parameters like ==code optimization, code coverage, reusability==, etc.",
        },
        {
          type: "text",
          content:
            "**Gray box testing** – In gray box testing, the tester has partial access to the internal architecture of the system e.g. the tester may have access to the design documents or database structure. This information helps the tester to test the application better.",
        },
      ],
    },
    {
      id: "test-case-attributes",
      category: "Basics",
      question: "What are some attributes of a test case?",
      tags: ["Testing Basics", "Test Cases"],
      difficulty: "Easy",
      answer: [
        {
          type: "callout",
          variant: "tip",
          content: "A **test case** can have the following attributes:",
        },
        {
          type: "table",
          headers: ["Attribute", "What it captures"],
          rows: [
            ["**1. TestCaseId**", "A unique identifier of the test case."],
            ["**2. Test Summary**", "One-liner summary of the test case."],
            ["**3. Description**", "Detailed description of the test case."],
            [
              "**4. Prerequisite or pre-condition**",
              "A set of prerequisites that must be followed before executing the test steps.",
            ],
            ["**5. Test Steps**", "Detailed steps for performing the test case."],
            ["**6. Expected result**", "The expected result in order to pass the test."],
            ["**7. Actual result**", "The actual result after executing the test steps."],
            ["**8. Test Result**", "Pass/Fail status of the test execution."],
          ],
        },
      ],
    },
    {
      id: "automation-framework-types",
      category: "Basics",
      question: "Types Of Automation Framework",
      tags: ["Automation", "Frameworks"],
      difficulty: "Medium",
      answer: [
        {
          type: "callout",
          variant: "warn",
          content:
            "It is very important to **choose the type of framework** while chalking out the test plan.",
        },
        {
          type: "text",
          content: "Enlisted below are the most common types of test automation frameworks.",
        },
        {
          type: "flow",
          title: "The framework spectrum",
          nodes: [
            { label: "Linear", sub: "Record & playback", tone: "ember" },
            { label: "Modular", sub: "Test modules separately", tone: "sky" },
            { label: "Data-Driven", sub: "External test data", tone: "mint" },
            { label: "Keyword-Driven", sub: "Action keywords", tone: "gold" },
            { label: "Hybrid", sub: "Combines frameworks", tone: "ember" },
          ],
        },
        {
          type: "list",
          ordered: true,
          items: [
            "**Linear Automation Framework:** Record and playback framework, ==no coding is required==.",
            "**Modular Based Testing Framework:** Application is divided into individual modules and then tested separately. These modules are then combined to build larger tests.",
            "**Data-Driven Testing Framework:** Here, test data is stored externally in the form of Excel spreadsheets, Text files, CSV files, etc. Test scripts are connected to these files and the application is tested using these files multiple times with different test data sets.",
            "**Keyword-Drive Testing Framework:** This framework utilizes data tables and self-descriptive keywords that are also stored in the external files. Keywords represent various actions like click, login, etc. Keywords are stored in a sequential manner with the required object and testing is done accordingly.",
            "**Hybrid Test Automation Framework:** This framework is a combination of one or more frameworks mentioned above.",
          ],
        },
      ],
    },
    {
      id: "selenium-navigation-commands",
      category: "Basics",
      question: "What are the different types of navigation commands?",
      tags: ["Selenium", "Navigation"],
      difficulty: "Easy",
      answer: [
        {
          type: "image",
          src: "/images/selenium-navigation-commands.png",
          alt: "Selenium navigation commands with back, forward, refresh, and navigate-to examples",
        },
      ],
    },
    {
      id: "selenium-common-exceptions",
      category: "Basics",
      question: "What are some commonly encountered exceptions in Selenium?",
      tags: ["Selenium", "Exceptions"],
      difficulty: "Medium",
      answer: [
        { type: "heading", content: "Common WebDriver exceptions" },
        {
          type: "list",
          items: [
            "**NoSuchElementException** – When no element could be located by the locator provided.",
            "**ElementNotVisibleException** – When an element is present in the DOM but is not visible.",
            "**NoAlertPresentException** – When we try to switch to an alert box but the targetted alert is not present.",
            "**NoSuchFrameException** – When we try to switch to a frame but the targetted frame is not present.",
            "**NoSuchWindowException** – When we try to switch to a window but the targetted window is not present.",
            "**UnexpectedAlertPresentException** – When an unexpected alert blocks the normal interaction of the driver.",
            "**TimeoutException** – When a command execution gets a timeout.",
            "**InvalidElementStateException** – When the state of an element is not appropriate for the desired action.",
            "**NoSuchAttributeException** – When we are trying to fetch an attribute’s value but the attribute is not correct.",
            "**WebDriverException** – When there is some issue with the driver instance preventing it from getting launched.",
          ],
        },
      ],
    },
    {
      id: "what-is-xpath",
      category: "Basics",
      question: "What is an XPath?",
      tags: ["Selenium", "XPath"],
      difficulty: "Easy",
      answer: [
        {
          type: "callout",
          variant: "info",
          content: "**XPath** is used to locate a web element based on its ==XML path==.",
        },
        {
          type: "text",
          content:
            "XML stands for Extensible Markup Language and is used to store, organize and transport arbitrary data. It stores data in a key-value pair which is very much similar to HTML tags.",
        },
        {
          type: "text",
          content:
            "Both being markup languages and since they fall under the same umbrella, XPath can be used to locate **HTML elements**.",
        },
        {
          type: "flow",
          title: "How XPath finds an element",
          nodes: [
            { label: "Reference element", sub: "Start from a known point", tone: "ember" },
            { label: "Traverse the page", sub: "Move across the XML/HTML tree", tone: "sky" },
            { label: "Target element", sub: "Locate the required element", tone: "mint" },
          ],
        },
        {
          type: "text",
          content:
            "The fundamental behind locating elements using XPath is the traversing between various elements across the entire page and thus enabling a user to find an element with the reference of another element.",
        },
      ],
    },
    {
      id: "webdriver-waits",
      category: "Basics",
      question: "What are the different types of waits available in WebDriver?",
      tags: ["Selenium", "Waits"],
      difficulty: "Medium",
      answer: [
        {
          type: "text",
          content:
            "There are two **types of waits** available in WebDriver: ==Implicit Wait== and ==Explicit Wait==.",
        },
        {
          type: "table",
          headers: ["Implicit Wait", "Explicit Wait"],
          rows: [
            [
              "Implicit waits are used to provide a default waiting time (say 30 seconds) between each consecutive test step/command across the entire test script.",
              "Explicit waits are used to halt the execution till the time a particular condition is met or the maximum time has elapsed.",
            ],
            [
              "Thus, the subsequent test step would only execute when the 30 seconds have elapsed after executing the previous test step/command.",
              "Unlike Implicit waits, explicit waits are applied for a particular instance only.",
            ],
          ],
        },
      ],
    },
    {
      id: "software-testing-life-cycle",
      category: "Basics",
      question: "What are the phases involved in Software Testing Life Cycle?",
      tags: ["Testing Basics", "STLC"],
      difficulty: "Medium",
      answer: [
        {
          type: "image",
          src: "/images/software-testing-life-cycle.png",
          alt: "Software Testing Life Cycle phases from requirement analysis through test cycle closure",
        },
      ],
    },
    {
      id: "five-popular-automation-frameworks",
      category: "Basics",
      question: "What are the five popular frameworks in test automation?",
      tags: ["Automation", "Frameworks"],
      difficulty: "Easy",
      answer: [
        {
          type: "flow",
          title: "Five popular frameworks in test automation",
          nodes: [
            { label: "Linear", tone: "ember" },
            { label: "Modularity", tone: "sky" },
            { label: "Data Driven", tone: "mint" },
            { label: "Keyword Driven", tone: "gold" },
            { label: "Hybrid", tone: "ember" },
          ],
        },
      ],
    },
    {
      id: "defect-life-cycle",
      category: "Basics",
      question: "Explain the defect life cycle.",
      tags: ["Testing Basics", "Defects"],
      difficulty: "Medium",
      answer: [
        {
          type: "text",
          content:
            "A **defect life cycle** is a process in which a defect goes through various phases during its whole lifetime.",
        },
        {
          type: "text",
          content:
            "The cycle starts when a defect is ==found== and ends when a defect is ==closed==, after ensuring it’s not reproduced.",
        },
        {
          type: "text",
          content: "Bug or defect life cycle includes the steps as shown in the below figure.",
        },
        {
          type: "image",
          src: "/images/defect-life-cycle.png",
          alt: "Defect life cycle showing new, assign, active, test, verified, closed, reopened, rejected, and deferred states",
        },
      ],
    },
    {
      id: "software-automation-testing-issues",
      category: "Basics",
      question: "What are the common issues encountered in Software Automation Testing?",
      tags: ["Automation", "Challenges"],
      difficulty: "Medium",
      answer: [
        {
          type: "callout",
          variant: "warn",
          content: "The most common **challenges in automation testing** are:",
        },
        {
          type: "table",
          headers: ["Common issue", "Why it becomes a challenge"],
          rows: [
            [
              "**1. Flaky Tests**",
              "Tests pass sometimes and fail randomly due to timing issues, unstable environments, or dynamic elements.",
            ],
            [
              "**2. Test Data Management**",
              "Creating and maintaining reliable, reusable, and realistic test data is often difficult.",
            ],
            [
              "**3. Dynamic UI Elements**",
              "Modern web applications use ==AJAX, React, Angular==, etc., making element handling and synchronization challenging.",
            ],
            [
              "**4. Cross-Browser & Cross-Platform Testing**",
              "Ensuring tests run consistently across different browsers, devices, and operating systems.",
            ],
            [
              "**5. Reporting & Debugging**",
              "Without good reports and logs, identifying the root cause of failures becomes difficult.",
            ],
            [
              "**6. Parallel Execution Challenges**",
              "Running tests simultaneously requires proper setup to avoid conflicts.",
            ],
          ],
        },
      ],
    },
    {
      id: "complex-automation-testing-project",
      category: "Basics",
      question:
        "Describe a complex automation testing project you've worked on. What were the specific challenges you faced, and how did you overcome them?",
      tags: ["Automation", "Project Experience"],
      difficulty: "Hard",
      answer: [
        {
          type: "callout",
          variant: "info",
          content:
            "One of the most complex projects I worked on was automating the testing of a **large e-commerce application** with thousands of products, multiple user roles, payment gateways, and order workflows.",
        },
        { type: "heading", content: "Challenges & Solutions" },
        {
          type: "table",
          headers: ["Challenge", "How I overcame it"],
          rows: [
            [
              "**1. Dynamic Web Elements**\n\nMany elements had dynamic IDs and changing attributes.",
              "**Solution:** Used reliable XPath/CSS locators, explicit waits, and reusable locator methods.",
            ],
            [
              "**2. Large Test Data**\n\nNeeded to validate many products, users, and payment scenarios.",
              "**Solution:** Implemented data-driven testing using Excel/JSON to reuse the same scripts with different datasets.",
            ],
            [
              "**3. Cross-Browser Testing**\n\nApplication had to work on Chrome, Firefox, Edge, and Safari.",
              "**Solution:** Used Selenium Grid to execute tests in parallel across multiple browsers.",
            ],
            [
              "**4. Script Maintenance**\n\nUI changes frequently broke automation scripts.",
              "**Solution:** Followed the Page Object Model (POM), reusable utilities, and centralized locators, making maintenance much easier.",
            ],
          ],
        },
        { type: "heading", content: "Result" },
        {
          type: "flow",
          title: "Project outcomes",
          nodes: [
            { label: "More coverage", sub: "Increased regression coverage", tone: "mint" },
            { label: "Less manual effort", sub: "Reduced manual testing effort", tone: "sky" },
            {
              label: "Stronger automation",
              sub: "Improved test stability and maintainability",
              tone: "ember",
            },
          ],
        },
      ],
    },
    {
      id: "automation-framework-tools-libraries",
      category: "Basics",
      question: "What tools and libraries have you used in your automation framework?",
      tags: ["Automation", "Toolchain"],
      difficulty: "Medium",
      answer: [
        {
          type: "text",
          content:
            "In my **Testing automation framework**, I have used the following tools and libraries:",
        },
        {
          type: "table",
          headers: ["Tool or library", "How it is used"],
          rows: [
            [
              "**1. Selenium WebDriver**",
              "To automate browser actions and validate web application functionality.",
            ],
            [
              "**2. TestNG / JUnit**",
              "To organize test cases, manage test execution, dependencies, assertions, grouping, and parallel testing.",
            ],
            [
              "**3. Maven / Gradle**",
              "For dependency management, project build, and test execution.",
            ],
            [
              "**4. Page Object Model**",
              "To separate page elements and business actions from test cases, improving readability and maintenance.",
            ],
            [
              "**5. Log4j / Logback**",
              "To capture execution logs and help with debugging test failures.",
            ],
            [
              "**6. Extent Reports / Allure Reports**",
              "To generate detailed reports with test status, screenshots, logs, and failure reasons.",
            ],
            [
              "**7. Jenkins / GitHub Actions**",
              "To integrate automated tests into the CI/CD pipeline and trigger execution after code changes.",
            ],
            [
              "**8. REST Assured / Postman**",
              "For API automation and validating backend services.",
            ],
            [
              "**9. SonarQube / Checkstyle**",
              "To maintain code quality, coding standards, and identify technical issues.",
            ],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "I have also created **reusable utilities** for screenshots, browser setup, waits, test data, reporting, logging, and configuration management.",
        },
      ],
    },
    {
      id: "what-is-chaat",
      category: "Basics",
      question: "What actually makes something a 'chaat'?",
      tags: ["Fundamentals", "Chaat"],
      difficulty: "Easy",
      answer: [
        {
          type: "text",
          content:
            "==Chaat== is not a single dish — it's a **flavor architecture**. Every real chaat balances __six sensations at once__: sweet, sour, salty, spicy, crunchy, and creamy. Miss one and the plate falls flat.",
        },
        { type: "heading", content: "The six-layer stack" },
        {
          type: "flow",
          title: "How a plate of chaat is built",
          direction: "vertical",
          nodes: [
            { label: "Base", sub: "Puri, papdi, tikki, sev", tone: "ember" },
            { label: "Cool", sub: "Yogurt / dahi", tone: "sky" },
            { label: "Sweet-sour", sub: "Imli (tamarind) chutney", tone: "ember" },
            { label: "Green heat", sub: "Mint-coriander chutney", tone: "mint" },
            { label: "Spice dust", sub: "Chaat masala, chilli, jeera", tone: "gold" },
            { label: "Crunch", sub: "Sev, pomegranate, onion", tone: "ember" },
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "Golden rule: **assemble to order**. A chaat that sits for two minutes is a chaat that surrendered — the base goes soggy, the crunch dies, the plate loses its voice.",
        },
      ],
    },
    {
      id: "chaat-masala",
      category: "Basics",
      question: "What's actually inside chaat masala?",
      tags: ["Spices", "Fundamentals"],
      difficulty: "Easy",
      answer: [
        {
          type: "text",
          content:
            "The signature funk of chaat masala comes from ==black salt (kala namak)== — that eggy, sulfurous note that makes tamarind and yogurt taste ten times louder.",
        },
        {
          type: "table",
          headers: ["Ingredient", "What it brings"],
          rows: [
            ["Black salt (kala namak)", "==The signature funk== — sulfurous, savory"],
            ["Amchur (dried mango)", "Sharp, fruity sourness"],
            ["Roasted cumin", "Earthy, warm base note"],
            ["Black pepper + red chilli", "Slow-building heat"],
            ["Ajwain, hing, ginger powder", "Digestive lift"],
          ],
        },
        {
          type: "callout",
          variant: "warn",
          content:
            "If you skip **kala namak**, it's not chaat masala — it's just spice mix. That one ingredient is the whole personality.",
        },
      ],
    },
    {
      id: "chutney-trio",
      category: "Basics",
      question: "The two chutneys every chaat needs — and why.",
      tags: ["Chutney", "Balance"],
      difficulty: "Medium",
      answer: [
        {
          type: "text",
          content:
            "Chaat runs on ==contrast==. You need __one sweet-sour__ and __one hot-fresh__ chutney, sitting side by side, doing opposite jobs.",
        },
        { type: "heading", content: "Imli (tamarind) chutney" },
        {
          type: "list",
          items: [
            "Soak seedless tamarind in warm water, mash, strain the pulp.",
            "Simmer with jaggery/gur, roasted cumin, red chilli, black salt, and a pinch of ginger powder.",
            "Cook until it coats a spoon — thick, dark, glossy.",
          ],
        },
        { type: "heading", content: "Hari (green) chutney" },
        {
          type: "list",
          items: [
            "Blend fresh **coriander + mint** with green chilli, garlic, ginger, lemon, salt.",
            "Add a spoon of yogurt or roasted chana to keep the color from oxidizing.",
            "Keep it __thick__ — a watery green chutney drowns the puri.",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "Make both fresh in the morning. Store in glass, not steel — metal dulls the mint within a day.",
        },
      ],
    },
  ],
};
