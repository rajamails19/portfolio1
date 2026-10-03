import type { AccordionItem, Block, QAItem, QuizQuestion } from "../types";

/**
 * Study-card architecture for a certification tab.
 *
 * To add study material for a new cert, create `certs/<code>.ts` exporting
 * `{ concepts, quiz }` and spread `certStudyCards(...)` into the section's
 * items. No component or block changes needed.
 */

export interface CertConcept {
  title: string;
  /** Exam domain this concept belongs to — shown as the row badge, e.g. "Domain 3". */
  domain: string;
  /** The whole idea in one sentence. */
  oneLiner: string;
  /** Precise bullets. Inline markers work: **bold**, ==highlight==, `code`. */
  points?: string[];
  /** Optional table / flow / code block for visual learners. */
  visual?: Block;
  /** The "how the exam asks it" hook. */
  examTip?: string;
}

export interface CertStudyInput {
  /** Tab name the cards appear under, e.g. "AIF-C01". Must match the tab. */
  code: string;
  /** Code shown in card titles when it differs from the tab label (e.g. tab "CCA-F" → "CCAR-F"). */
  label?: string;
  /** Short exam name, e.g. "AWS Certified AI Practitioner". */
  examName: string;
  concepts: CertConcept[];
  quiz: QuizQuestion[];
}

function conceptToRow(c: CertConcept, i: number): AccordionItem {
  const content: Block[] = [{ type: "text", content: `**${c.oneLiner}**` }];
  if (c.points?.length) content.push({ type: "list", items: c.points });
  if (c.visual) content.push(c.visual);
  if (c.examTip) content.push({ type: "callout", variant: "tip", content: c.examTip });
  return { title: `${i + 1}. ${c.title}`, badge: c.domain, content };
}

export function certStudyCards({ code, label, examName, concepts, quiz }: CertStudyInput): QAItem[] {
  const slug = code.toLowerCase();
  const shown = label ?? code;
  return [
    {
      id: `cert-${slug}-concepts`,
      question: `${shown} — ${concepts.length} core concepts (coach mode)`,
      category: code,
      tags: ["Concepts", "Coach"],
      answer: [
        {
          type: "text",
          content: `The ${concepts.length} ideas that carry the most weight on **${examName}**. Open one, read the one-liner, then the bullets — the tip shows how the exam usually asks it.`,
        },
        { type: "accordion", items: concepts.map(conceptToRow) },
      ],
    },
    {
      id: `cert-${slug}-quiz`,
      question: `${shown} — ${quiz.length}-question quiz (quiz master)`,
      category: code,
      tags: ["Quiz", "Practice"],
      answer: [
        {
          type: "text",
          content:
            "Answer in your head first. Then **tap an option** to lock it in, or hit **Show answer** to peek — the explanation tells you why.",
        },
        { type: "quiz", questions: quiz },
      ],
    },
  ];
}

/**
 * A "My Notes" card for a cert tab. The notes themselves live in the browser
 * (see MyNotesBlock), keyed by `code`, so this card is identical for every cert.
 */
export function certNotesCard(code: string, label?: string): QAItem {
  return {
    id: `cert-${code.toLowerCase()}-notes`,
    question: `${label ?? code} — My Notes`,
    category: code,
    tags: ["My Notes", "Personal"],
    answer: [
      {
        type: "text",
        content:
          "Your own space for this cert — save links, key lines and screenshots to revisit later. **Edit or delete** anything, any time.",
      },
      { type: "notes", certCode: code },
    ],
  };
}
