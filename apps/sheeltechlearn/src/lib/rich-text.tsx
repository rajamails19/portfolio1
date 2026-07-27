import { Fragment, type ReactNode } from "react";

/**
 * Parse inline markers into React nodes.
 *   ==highlight==   → rose highlight background
 *   __underline__   → wavy coral underline
 *   **bold**        → bold + rose text
 *   `code`          → inline code chip
 *   [label](url)    → external link
 */
export function renderInline(input: string): ReactNode {
  const re =
    /(\*\*[^*]+\*\*)|(==[^=]+==)|(__[^_]+__)|(`[^`]+`)|(\[[^\]]+\]\([^)]+\))/g;

  const parts: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;

  while ((m = re.exec(input)) !== null) {
    if (m.index > last) parts.push(input.slice(last, m.index));
    const token = m[0];
    const key = `k-${i++}`;

    if (token.startsWith("**")) {
      parts.push(
        <strong key={key} className="font-semibold text-rose">
          {token.slice(2, -2)}
        </strong>,
      );
    } else if (token.startsWith("==")) {
      parts.push(
        <mark
          key={key}
          className="rounded-md bg-gradient-to-r from-rose/30 to-coral/25 px-1.5 py-0.5 font-medium text-rose shadow-[0_0_12px_-4px_oklch(0.78_0.18_350/0.6)]"
        >
          {token.slice(2, -2)}
        </mark>,
      );
    } else if (token.startsWith("__")) {
      parts.push(
        <span
          key={key}
          className="underline decoration-coral decoration-wavy decoration-2 underline-offset-[6px]"
        >
          {token.slice(2, -2)}
        </span>,
      );
    } else if (token.startsWith("`")) {
      parts.push(
        <code
          key={key}
          className="rounded-md border border-rose/25 bg-noir/70 px-1.5 py-0.5 font-mono text-[0.85em] text-rose"
        >
          {token.slice(1, -1)}
        </code>,
      );
    } else if (token.startsWith("[")) {
      const match = /\[([^\]]+)\]\(([^)]+)\)/.exec(token);
      if (match) {
        const [, label, href] = match;
        parts.push(
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-rose underline decoration-rose/50 decoration-dotted underline-offset-4 transition hover:decoration-rose hover:text-[oklch(0.88_0.16_350)]"
          >
            {label}
          </a>,
        );
      }
    }
    last = m.index + token.length;
  }
  if (last < input.length) parts.push(input.slice(last));

  return parts.map((p, i) => <Fragment key={i}>{p}</Fragment>);
}
