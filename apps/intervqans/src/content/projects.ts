import type { Section } from "./types";

export const projectsSection: Section = {
  slug: "projects",
  title: "Projects",
  tagline: "Portfolio-worthy builds — scope, stack, and gotchas.",
  emoji: "🚀",
  gradient: "from-[oklch(0.9_0.09_165)] via-[oklch(0.92_0.09_235)] to-[oklch(0.92_0.09_305)]",
  items: [
    {
      id: "ai-notes-app",
      question: "AI-powered notes app with semantic search",
      tags: ["Full-stack", "AI", "React"],
      difficulty: "Medium",
      answer: [
        { type: "heading", content: "What it does" },
        { type: "text", content: "Write notes in markdown. Every save embeds the note and stores the vector. A search bar retrieves by meaning, not keywords." },
        { type: "heading", content: "Stack" },
        {
          type: "list",
          items: [
            "React + TanStack Router (frontend)",
            "Lovable Cloud (Postgres + auth + edge functions)",
            "pgvector for embeddings",
            "Lovable AI Gateway (embeddings + chat)",
          ],
        },
        { type: "heading", content: "Data model" },
        {
          type: "code",
          language: "sql",
          content: `create table notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade,
  title text not null,
  body text not null,
  embedding vector(1536),
  created_at timestamptz default now()
);

create index on notes using ivfflat (embedding vector_cosine_ops);`,
        },
        { type: "callout", variant: "tip", content: "Debounce the embed-on-save (2–3s) — otherwise every keystroke burns tokens." },
      ],
    },
    {
      id: "realtime-collab-board",
      question: "Realtime collaborative Kanban board",
      tags: ["Full-stack", "Realtime"],
      difficulty: "Hard",
      answer: [
        { type: "heading", content: "The interesting bits" },
        {
          type: "list",
          items: [
            "Optimistic UI: apply the drag locally, then reconcile with the server broadcast.",
            "Conflict resolution: last-write-wins on card position; CRDT (Yjs) if you need offline editing.",
            "Presence: broadcast cursors + avatars on a low-frequency channel (throttle to 20Hz).",
            "Auth: row-level security so users only see their boards.",
          ],
        },
        {
          type: "code",
          language: "ts",
          content: `// Broadcast a move optimistically
function moveCard(cardId: string, toColumn: string, toIndex: number) {
  setBoard((b) => applyMove(b, cardId, toColumn, toIndex)); // local
  channel.send({ type: "card:move", cardId, toColumn, toIndex, at: Date.now() });
  supabase.from("cards").update({ column_id: toColumn, position: toIndex }).eq("id", cardId);
}`,
        },
      ],
    },
  ],
};
