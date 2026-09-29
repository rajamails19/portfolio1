import { certStudyCards, type CertStudyInput } from "./cert-cards";

const ccarF: CertStudyInput = {
  code: "CCA-F",
  label: "CCAR-F",
  examName: "Claude Certified Architect – Foundations (CCAR-F)",

  concepts: [
    {
      title: "The agentic loop",
      domain: "Domain 1 · 27%",
      oneLiner:
        "An agent is just a loop: call the model, run the tools it asks for, feed the results back, repeat until it says it’s done.",
      visual: {
        type: "flow",
        title: "Agentic loop",
        direction: "horizontal",
        nodes: [
          { label: "Gather context", tone: "sky" },
          { label: "Take action", sub: "tool call", tone: "gold" },
          { label: "Verify result", tone: "mint" },
          { label: "Repeat or finish", sub: "stop_reason", tone: "ember" },
        ],
      },
      points: [
        "Every response has a **stop_reason**: `tool_use` ⇒ run the tool(s) and send back a `tool_result`; `end_turn` ⇒ the model is finished; `max_tokens` ⇒ output was cut off",
        "Loop control lives in **your code** — set an iteration cap and a timeout so a confused agent can’t spin forever",
        "Append the assistant turn **and** the matching `tool_result` each round — the model only remembers what you send",
        "**Verify** before finishing: re-query or run tests instead of trusting the model’s claim that it worked",
      ],
      examTip:
        "A loop that stalls or repeats ⇒ look for a missing `tool_result`, no iteration cap, or `stop_reason` being ignored.",
    },
    {
      title: "Single agent vs. multi-agent (hub-and-spoke)",
      domain: "Domain 1 · 27%",
      oneLiner:
        "Start with one agent; add a coordinator plus specialist subagents only when tasks are separable or context would overflow.",
      visual: {
        type: "table",
        headers: ["Pattern", "Use when", "Trade-off"],
        rows: [
          ["Single agent + tools", "One coherent task, modest tool set", "Simplest, cheapest, easiest to debug"],
          ["Hub-and-spoke", "Distinct specialties or parallel research", "More tokens and latency; needs clear handoffs"],
          ["Sequential pipeline", "Fixed stages (extract → validate → summarize)", "Predictable but rigid"],
        ],
      },
      points: [
        "The **coordinator** decomposes the task, delegates, and merges results; each **subagent** has its own focused prompt, tools and context window",
        "Subagents return **summaries, not transcripts** — keep the coordinator’s context small",
        "Give each subagent **only the tools it needs**",
        "Independent subtasks can run in **parallel**",
      ],
      examTip:
        "Research across several independent sources ⇒ coordinator + parallel subagents. One linear task ⇒ don’t add agents.",
    },
    {
      title: "Escalation, handoffs & human-in-the-loop",
      domain: "Domain 1 & 5",
      oneLiner: "Good agents know when to stop and hand over — for risk, ambiguity, or repeated failure.",
      points: [
        "Escalate on **policy exceptions**, **high-impact or irreversible actions**, a **customer asking for a human**, **repeated failed attempts**, or missing authority/data",
        "Aim for **first-contact resolution** on routine cases — escalating everything defeats the agent; escalating nothing is unsafe",
        "A handoff must carry **context**: what was asked, what was tried, current state, recommended next step",
        "Put **approval gates in code** before destructive actions (large refunds, deletes, payments) — don’t rely on the prompt alone",
      ],
      examTip: "Refund above the policy limit, or a tool that keeps failing ⇒ escalate with a structured summary.",
    },
    {
      title: "Designing tools Claude can use well",
      domain: "Domain 2 · 18%",
      oneLiner:
        "The tool name, description and schema are the model’s only instructions — write them like API docs for a new hire.",
      points: [
        "The **description is the selector**: say what it does, when to use it, and when __not__ to",
        "Use a strict **JSON Schema** for inputs: typed fields, enums, required vs. optional",
        "**Fewer, sharper tools** per agent — a bloated tool list causes wrong picks (“reasoning overload”); split tools across subagents",
        "Return only the **fields needed**, in a readable form — not raw multi-megabyte payloads",
        "Return **structured errors** (what failed, why, retryable?, what to try next) and flag them with `is_error` so the model can recover",
        "Make write-tools **idempotent** where possible so retries are safe",
      ],
      examTip: "Agent keeps calling the wrong tool ⇒ fix names and descriptions first, before touching the prompt or the model.",
    },
    {
      title: "MCP — one protocol for tools & data",
      domain: "Domain 2 · 18%",
      oneLiner:
        "Model Context Protocol is an open standard: any MCP client (Claude Code, the Agent SDK, your app) can use the tools, resources and prompts an MCP server exposes.",
      visual: {
        type: "table",
        headers: ["Primitive", "What it is"],
        rows: [
          ["Tools", "Actions the model can call (search, create a ticket)"],
          ["Resources", "Read-only data or context a client can load (files, records)"],
          ["Prompts", "Reusable prompt templates a user can invoke"],
        ],
      },
      points: [
        "**Transports:** local **stdio** servers vs. remote **HTTP** servers",
        "In Claude Code a server can be scoped **local**, **project** (shared via `.mcp.json`) or **user**",
        "Build a server when **many apps or agents** need the same integration; use a plain custom tool for a one-off",
        "Keep each server’s tool set **small and well-scoped**; never leak secrets in tool output",
      ],
      examTip: "Same integration needed by many clients/teams ⇒ MCP server. One app, quick action ⇒ custom tool.",
    },
    {
      title: "CLAUDE.md, slash commands & project config",
      domain: "Domain 3 · 20%",
      oneLiner: "Persistent instructions live in files, not in chat — so every teammate and every CI run behaves the same.",
      visual: {
        type: "table",
        headers: ["File / feature", "Purpose"],
        rows: [
          ["CLAUDE.md", "Project memory: conventions, commands, architecture notes loaded into context"],
          ["~/.claude/CLAUDE.md", "Personal preferences across all your projects"],
          [".claude/commands/*.md", "Custom slash commands — reusable prompts that accept arguments"],
          [".claude/settings.json", "Permissions (allow/deny), hooks and env — shared with the team"],
          [".claude/agents/", "Custom subagents with their own prompt and tools"],
        ],
      },
      points: [
        "Keep CLAUDE.md **short and specific** — build/test commands, style rules, gotchas; bloat wastes context",
        "**Hooks** run deterministic scripts on events (before/after a tool call) — use them for rules that must **always** happen",
        "Commit shared config to the repo; keep personal overrides local",
      ],
      examTip: "A rule that must ALWAYS be enforced ⇒ a hook or permission, not a sentence in CLAUDE.md.",
    },
    {
      title: "Plan mode, direct execution & CI/CD",
      domain: "Domain 3 · 20%",
      oneLiner: "Match the workflow to the risk: plan first for big or unclear changes, execute directly for small, well-defined ones.",
      visual: {
        type: "table",
        headers: ["Situation", "Use"],
        rows: [
          ["Large refactor, unfamiliar code, many files", "Plan mode — explore read-only, agree the plan, then execute"],
          ["Small, well-scoped fix", "Direct execution"],
          ["Automated pipeline (PR review, test generation)", "Headless mode (`claude -p`) with a tightly scoped prompt"],
        ],
      },
      points: [
        "Plan mode lets Claude **read and propose** without editing — review the plan before any change",
        "In CI run **non-interactively** and request machine-readable (JSON) output so later steps can parse it",
        "Limit tool permissions in CI to what the job needs",
        "Use Claude for **automated code review, test generation and PR feedback** — keep a human approving merges",
      ],
      examTip: "Unclear scope across many files ⇒ plan mode. Well-defined one-file change ⇒ direct execution.",
    },
    {
      title: "Prompting for reliable behavior",
      domain: "Domain 4 · 20%",
      oneLiner: "Be explicit — role, task, rules, format — and show examples for anything subtle.",
      points: [
        "Put **stable instructions in the system prompt**, variable data in the user turn",
        "Use **XML-style tags** (e.g. `<document>`, `<rules>`) to separate instructions from data",
        "Add **few-shot examples** that include edge cases, not just the happy path",
        "State **what to do** (not only what to avoid) and define **criteria**: “flag only if… cite file and line”",
        "For long inputs, put the **document first and the question last**",
        "For automated feedback (e.g. CI review) **minimize false positives**: require evidence, severity, and a suggested fix",
      ],
      examTip: "Review output is noisy ⇒ tighten the criteria and add examples of what NOT to flag.",
    },
    {
      title: "Structured output & validation loops",
      domain: "Domain 4 · 20%",
      oneLiner: "Don’t parse free text — force a schema, validate it, and feed errors back for a retry.",
      visual: {
        type: "flow",
        title: "Extraction pipeline",
        direction: "horizontal",
        nodes: [
          { label: "Define JSON schema", tone: "sky" },
          { label: "Force structured output", sub: "tool_choice", tone: "gold" },
          { label: "Validate in code", tone: "mint" },
          { label: "Retry with error", sub: "1–2 times", tone: "ember" },
          { label: "Accept or escalate", tone: "gold" },
        ],
      },
      points: [
        "Model the output as a **tool with a JSON Schema** and force it with `tool_choice` (or use the API’s structured-output support) so replies conform",
        "Make uncertain fields **nullable** — required fields push the model to invent values",
        "**Validate** with a schema library; on failure send back the exact error for one or two retries, then escalate",
        "Add a `source_quote` or confidence field so extracted values can be audited",
      ],
      examTip: "Model invents values that aren’t in the document ⇒ make the field nullable and say “null if not stated”.",
    },
    {
      title: "Context management & reliability",
      domain: "Domain 5 · 15%",
      oneLiner: "Context is a budget: spend it on what the next step needs, cache what repeats, and design for failure.",
      points: [
        "Long conversations: **summarize or compact** old turns — keep decisions and open items, drop chatter",
        "Multi-agent handoffs: pass **only the relevant slice** of context",
        "**Prompt caching** makes a repeated prefix (system prompt, tools, big documents) cheaper and faster — keep it stable and first",
        "Errors: **retry with exponential backoff** on rate-limit/overload, fail fast on invalid requests, set timeouts",
        "Add **self-evaluation or a second-pass review** for high-stakes output and **human-in-the-loop** for irreversible actions",
        "Choose models by **cost, latency, reliability**: small fast model for routing/classification, larger for complex reasoning, batch processing for non-urgent bulk",
      ],
      examTip: "Repeated large prompts are expensive ⇒ prompt caching. Non-urgent bulk jobs ⇒ batch processing.",
    },
  ],

  quiz: [
    {
      q: "In an agentic loop the API response comes back with `stop_reason: tool_use`. What should the application do next?",
      options: [
        "Treat the task as complete and show the text to the user",
        "Execute the requested tool(s), append the `tool_result` to the conversation, and call the model again",
        "Restart the conversation with a new system prompt",
        "Increase `max_tokens` and resend the same request",
      ],
      answer: 1,
      explanation:
        "`tool_use` means the model is asking for a tool. Run it, return a **tool_result**, and call again. `end_turn` is the signal that the model is finished.",
    },
    {
      q: "A support agent handles returns, billing and account questions. Each area needs different tools and policies, and the single agent often picks the wrong tool. What is the best architectural change?",
      options: [
        "Give the single agent every tool and a much longer prompt",
        "Lower the temperature",
        "Add a coordinator that routes to specialist subagents, each with only its own domain’s tools",
        "Replace all tools with one generic “do_anything” tool",
      ],
      answer: 2,
      explanation:
        "**Hub-and-spoke** gives each specialist a focused prompt and a small tool set, which avoids reasoning overload and wrong-tool picks. More tools in one agent makes it worse.",
    },
    {
      q: "Which situation most clearly warrants escalating to a human?",
      options: [
        "A customer asks for an order’s delivery status",
        "A customer asks for the store’s opening hours",
        "A customer says thanks and ends the chat",
        "A customer requests a refund above the policy limit that the agent has no authority to approve",
      ],
      answer: 3,
      explanation:
        "Escalate for **policy exceptions and actions beyond the agent’s authority**. Routine lookups should be resolved at first contact.",
    },
    {
      q: "An agent keeps calling `search_orders` when it should call `search_returns`. Both tools are described only as “Search records.” What is the best first fix?",
      options: [
        "Rewrite the descriptions to state each tool’s purpose, when to use it, and when not to",
        "Increase the temperature",
        "Add three more general-purpose search tools",
        "Fine-tune the model on the two tool names",
      ],
      answer: 0,
      explanation:
        "The **description is the selector**. Vague, near-identical descriptions cause confusion; make them distinct and explicit before changing anything else.",
    },
    {
      q: "A company wants the same internal ticketing integration available to Claude Code, its custom agents, and a third-party chat client — maintained once. What should it build?",
      options: [
        "A separate custom tool inside each application",
        "An MCP server that exposes the ticketing tools",
        "A CLAUDE.md file describing the ticketing API",
        "A slash command",
      ],
      answer: 1,
      explanation:
        "**MCP** is the open standard for exposing tools once to many clients. Per-app tools duplicate work; CLAUDE.md and slash commands don’t provide a callable integration.",
    },
    {
      q: "A team requires that code is auto-formatted after Claude edits any file — with no exceptions. Which mechanism is most reliable?",
      options: [
        "A sentence in CLAUDE.md asking Claude to format code",
        "A slash command that developers must remember to run",
        "A hook that runs the formatter after file-edit tool calls",
        "A longer system prompt",
      ],
      answer: 2,
      explanation:
        "Instructions can be ignored; **hooks are deterministic**. Anything that must always happen belongs in a hook or permission rule.",
    },
    {
      q: "A developer must refactor authentication across many files in an unfamiliar codebase. Which approach fits best?",
      options: [
        "Plan mode first: explore read-only and agree on a plan before any edits",
        "Direct execution immediately, then review afterwards",
        "Headless mode with no human review",
        "One giant prompt asking for the entire rewrite without exploring",
      ],
      answer: 0,
      explanation:
        "Large, unclear changes call for **plan mode** — read and propose first, then execute. Direct execution suits small, well-scoped changes.",
    },
    {
      q: "An automated PR-review job built on Claude posts many low-value comments. What most directly reduces the false positives?",
      options: [
        "Raise the temperature for more variety",
        "Send a larger diff each time",
        "Remove the system prompt",
        "Define explicit criteria (evidence, file/line, severity) and add examples of what not to flag",
      ],
      answer: 3,
      explanation:
        "Noisy reviews come from vague criteria. **Explicit rules plus negative examples** make the reviewer selective and its feedback actionable.",
    },
    {
      q: "An extraction pipeline sometimes returns invented values for fields that are absent from the source document. What is the best fix?",
      options: [
        "Make the field required so the model always fills it in",
        "Make the field nullable, instruct “null if not stated”, and validate the output",
        "Increase `max_tokens`",
        "Remove the JSON schema",
      ],
      answer: 1,
      explanation:
        "Required fields pressure the model to guess. **Nullable fields + validation** let it say “not present” honestly.",
    },
    {
      q: "An app sends the same 30k-token policy document and tool definitions on every request; cost and latency are high. Which change helps most?",
      options: [
        "Lower the temperature",
        "Randomly truncate the document",
        "Use prompt caching for the stable prefix",
        "Split every request into two calls",
      ],
      answer: 2,
      explanation:
        "**Prompt caching** reuses a repeated, stable prefix at lower cost and latency. Keep that prefix identical and at the start of the prompt.",
    },
  ],
};

export const ccarFStudyCards = certStudyCards(ccarF);
