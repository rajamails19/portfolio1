import type { Block, QAItem } from "@/content/types";
import { CodeBlock } from "./CodeBlock";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Columns3 } from "lucide-react";

type CodeAnswer = Extract<Block, { type: "code" }>;

const LANGUAGE_ORDER = ["Java", "JScript", "Python", ".NET"] as const;

const LANGUAGE_META: Record<
  (typeof LANGUAGE_ORDER)[number],
  { label: string; eyebrow: string; accent: string }
> = {
  Java: { label: "Java", eyebrow: "JVM", accent: "oklch(0.76 0.16 55)" },
  JScript: { label: "JScript", eyebrow: "JavaScript", accent: "oklch(0.84 0.16 95)" },
  Python: { label: "Python", eyebrow: "Python 3", accent: "oklch(0.72 0.13 235)" },
  ".NET": { label: ".NET", eyebrow: "C#", accent: "oklch(0.7 0.18 300)" },
};

function mainCode(item: QAItem): CodeAnswer | undefined {
  return item.answer.find(
    (block): block is CodeAnswer => block.type === "code" && block.language !== "text",
  );
}

function outputCode(item: QAItem): CodeAnswer | undefined {
  return item.answer.find(
    (block): block is CodeAnswer => block.type === "code" && block.language === "text",
  );
}

export function ProgramComparisonDialog({
  open,
  onOpenChange,
  items,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: QAItem[];
}) {
  const orderedItems = LANGUAGE_ORDER.map((language) => ({
    language,
    item: items.find((candidate) => candidate.category === language),
  })).filter((entry): entry is { language: (typeof LANGUAGE_ORDER)[number]; item: QAItem } =>
    Boolean(entry.item),
  );
  const title = orderedItems.find((entry) => entry.language === "Java")?.item.question ?? "Program";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="grid h-[96dvh] w-[98vw] max-w-[98vw] grid-rows-[auto_minmax(0,1fr)] gap-0 overflow-hidden border border-gold/25 p-0 shadow-[0_35px_120px_-35px_oklch(0.35_0.18_35/0.9)] sm:rounded-2xl"
        style={{ backgroundColor: "oklch(0.12 0.025 35)" }}
      >
        <div className="flex min-w-0 items-center gap-2 border-b border-gold/15 bg-gradient-to-r from-gold/10 via-noir to-ember/5 px-3 py-2 pr-12 sm:px-4 sm:pr-14">
          <Columns3 className="h-3.5 w-3.5 shrink-0 text-gold-ink/60" />
          <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.18em] text-gold-ink/55">
            Compare
          </span>
          <span className="h-3 w-px shrink-0 bg-gold/20" />
          <DialogTitle className="min-w-0 truncate text-xs font-medium text-foreground/75 sm:text-sm">
            {title}
          </DialogTitle>
          <span className="ml-auto hidden shrink-0 text-[9px] uppercase tracking-wider text-foreground/35 sm:inline">
            Java · JScript · Python · .NET
          </span>
        </div>

        <div className="grid min-h-0 grid-cols-1 gap-2 overflow-y-auto p-2 md:grid-cols-2 2xl:grid-cols-4 2xl:grid-rows-1">
          {orderedItems.map(({ language, item }) => {
            const meta = LANGUAGE_META[language];
            const code = mainCode(item);
            const output = outputCode(item);

            return (
              <section
                key={language}
                className="flex min-h-[20rem] min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/30 2xl:min-h-0"
                style={{ boxShadow: `inset 0 3px 0 ${meta.accent}` }}
                aria-label={`${meta.label} implementation`}
              >
                <div className="flex h-8 shrink-0 items-center justify-between gap-2 border-b border-white/10 px-3">
                  <div className="flex min-w-0 items-baseline gap-2">
                    <div className="font-display text-sm font-semibold text-foreground/85">
                      {meta.label}
                    </div>
                    <div
                      className="text-[8px] font-bold uppercase tracking-[0.16em]"
                      style={{ color: meta.accent }}
                    >
                      {meta.eyebrow}
                    </div>
                  </div>
                  <span className="shrink-0 text-[8px] font-medium text-foreground/35">
                    {code?.content.split("\n").length ?? 0} lines
                  </span>
                </div>

                <div className="min-h-0 flex-1 overflow-auto px-2 [&_.code-block-shell]:shadow-none">
                  {code && (
                    <CodeBlock
                      language={code.language}
                      code={code.content}
                      wrapLongLines={false}
                      compact
                    />
                  )}
                </div>

                {output && (
                  <div className="shrink-0 border-t border-white/10 bg-black/20 px-3 py-1.5 text-[10px]">
                    <span className="mr-1.5 font-bold uppercase tracking-wider text-foreground/30">
                      Output
                    </span>
                    <code className="whitespace-pre-wrap font-mono text-foreground/80">
                      {output.content}
                    </code>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
