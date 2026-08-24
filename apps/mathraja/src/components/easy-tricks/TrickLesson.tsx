import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Eye, EyeOff, Lightbulb, Sparkles } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import type { Trick, TrickCategory, TrickLesson as TrickLessonType } from "@/lib/easy-tricks-data";

const DIFFICULTY_STYLES: Record<Trick["difficulty"], string> = {
  Easy: "bg-primary/10 text-primary",
  Medium: "bg-secondary/50 text-secondary-foreground",
  "Fast Pattern": "bg-accent/15 text-accent",
};

const DIFFICULTY_DOT_STYLES: Record<Trick["difficulty"], string> = {
  Easy: "bg-primary",
  Medium: "bg-secondary",
  "Fast Pattern": "bg-accent",
};

export function TrickLessonView({
  lesson,
  category,
  lessonIndex,
  totalLessons,
  allLessons,
  onSelectLesson,
}: {
  lesson: TrickLessonType;
  category: TrickCategory | undefined;
  lessonIndex: number;
  totalLessons: number;
  allLessons: TrickLessonType[];
  onSelectLesson: (lessonId: string) => void;
}) {
  const Icon = lesson.icon;
  const [openTrickId, setOpenTrickId] = useState(lesson.tricks[0]?.id ?? "");

  useEffect(() => {
    setOpenTrickId(lesson.tricks[0]?.id ?? "");
  }, [lesson.id, lesson.tricks]);

  const prevLesson = lessonIndex > 0 ? allLessons[lessonIndex - 1] : undefined;
  const nextLesson = lessonIndex < totalLessons - 1 ? allLessons[lessonIndex + 1] : undefined;

  return (
    <div id="lesson-panel" className="scroll-mt-28">
      <div className="rounded-3xl border border-border bg-card px-5 py-5 sm:px-7 sm:py-6">
        <div className="flex flex-wrap items-center gap-2">
          {category && (
            <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary">
              {category.title}
            </span>
          )}
          <span className="text-xs font-semibold text-muted-foreground">
            Lesson {lessonIndex + 1} of {totalLessons}
          </span>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground">
            <Icon className="h-5 w-5" />
          </div>
          <h2 className="font-display text-xl font-bold text-foreground sm:text-2xl">
            {lesson.title}
          </h2>
        </div>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{lesson.description}</p>

        <div className="mt-5 flex flex-wrap items-center gap-2 rounded-2xl border border-border bg-muted/40 px-4 py-3">
          <span className="shrink-0 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
            What you'll learn
          </span>
          {lesson.tricks.map((trick) => (
            <span
              key={trick.id}
              className="rounded-full border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground/70"
            >
              {trick.title}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-3xl border border-border bg-card">
        <Accordion type="single" collapsible value={openTrickId} onValueChange={setOpenTrickId}>
          {lesson.tricks.map((trick, i) => (
            <TrickRow key={trick.id} trick={trick} n={i + 1} />
          ))}
        </Accordion>
      </div>

      <LessonPager
        prevLesson={prevLesson}
        nextLesson={nextLesson}
        lessonIndex={lessonIndex}
        totalLessons={totalLessons}
        onSelectLesson={onSelectLesson}
      />
    </div>
  );
}

function TrickRow({ trick, n }: { trick: Trick; n: number }) {
  return (
    <AccordionItem value={trick.id} className="border-b border-border last:border-b-0">
      <AccordionTrigger className="min-h-[72px] min-w-0 px-4 py-3.5 hover:no-underline sm:px-6">
        <span className="flex min-w-0 flex-1 items-center gap-2.5 text-left sm:gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-muted font-display text-sm font-bold text-foreground/70">
            {String(n).padStart(2, "0")}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate font-display text-base font-bold text-foreground">
              {trick.title}
            </span>
            <span className="block truncate text-xs text-muted-foreground">{trick.summary}</span>
          </span>
          <span
            className={cn(
              "hidden shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide sm:block",
              DIFFICULTY_STYLES[trick.difficulty],
            )}
          >
            {trick.difficulty}
          </span>
          <span
            className={cn(
              "block h-2.5 w-2.5 shrink-0 rounded-full sm:hidden",
              DIFFICULTY_DOT_STYLES[trick.difficulty],
            )}
            aria-label={trick.difficulty}
          />
        </span>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-6 sm:px-6">
        <div className="space-y-5">
          <section>
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Why it works
            </h4>
            <p className="mt-2 rounded-2xl border border-primary/15 bg-primary/5 px-4 py-3 text-sm leading-relaxed text-foreground/80">
              {trick.explanation}
            </p>
          </section>

          <section>
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Steps
            </h4>
            <ol className="mt-2 space-y-2.5">
              {trick.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <span className="min-w-0 break-words text-sm text-foreground/80">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Worked example
            </h4>
            <div className="mt-2 overflow-hidden rounded-2xl bg-[oklch(0.22_0.04_220)] text-white">
              <div className="border-b border-white/10 px-4 py-3">
                <p className="break-words font-mono text-sm font-semibold text-white/95">
                  {trick.example.question}
                </p>
              </div>
              <div className="space-y-1.5 px-4 py-3">
                {trick.example.working.map((line, i) => (
                  <p key={i} className="break-words font-mono text-sm text-white/75">
                    {line}
                  </p>
                ))}
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-white/5 px-4 py-3">
                <span className="text-[11px] font-bold uppercase tracking-wide text-white/50">
                  Answer
                </span>
                <span className="break-words font-mono text-base font-bold text-secondary">
                  {trick.example.answer}
                </span>
              </div>
            </div>
          </section>

          <TrickPractice practice={trick.practice} />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

function TrickPractice({ practice }: { practice: Trick["practice"] }) {
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <section className="rounded-2xl border border-accent/25 bg-accent/10 px-4 py-4">
      <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-accent">
        <Sparkles className="h-3.5 w-3.5" />
        Try it yourself
      </h4>
      <p className="mt-2 break-words font-mono text-base font-bold text-foreground">
        {practice.question}
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setShowHint((v) => !v)}
          className="flex min-h-11 items-center gap-1.5 rounded-full border border-accent/30 bg-card px-4 py-2 text-xs font-bold text-accent transition hover:bg-accent/10"
        >
          <Lightbulb className="h-3.5 w-3.5" />
          {showHint ? "Hide hint" : "Show hint"}
        </button>
        <button
          type="button"
          onClick={() => setShowAnswer((v) => !v)}
          className="flex min-h-11 items-center gap-1.5 rounded-full border border-accent/30 bg-card px-4 py-2 text-xs font-bold text-accent transition hover:bg-accent/10"
        >
          {showAnswer ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          {showAnswer ? "Hide answer" : "Reveal answer"}
        </button>
      </div>

      {showHint && (
        <p className="mt-3 break-words rounded-xl bg-card px-3.5 py-2.5 text-sm text-foreground/75">
          💡 {practice.hint}
        </p>
      )}
      {showAnswer && (
        <p className="mt-3 break-words rounded-xl bg-card px-3.5 py-2.5 font-mono text-sm font-bold text-primary">
          {practice.answer}
        </p>
      )}
    </section>
  );
}

function LessonPager({
  prevLesson,
  nextLesson,
  lessonIndex,
  totalLessons,
  onSelectLesson,
}: {
  prevLesson?: TrickLessonType;
  nextLesson?: TrickLessonType;
  lessonIndex: number;
  totalLessons: number;
  onSelectLesson: (lessonId: string) => void;
}) {
  return (
    <div className="mt-6 flex items-center justify-between gap-3">
      <button
        type="button"
        disabled={!prevLesson}
        onClick={() => prevLesson && onSelectLesson(prevLesson.id)}
        className="flex min-h-11 min-w-0 flex-1 items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 text-left transition hover:border-primary/40 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border"
      >
        <ChevronLeft className="h-4 w-4 shrink-0 text-muted-foreground" />
        <span className="min-w-0">
          <span className="block text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
            Previous
          </span>
          <span className="block truncate text-sm font-semibold text-foreground">
            {prevLesson ? prevLesson.title : "—"}
          </span>
        </span>
      </button>

      <span className="shrink-0 text-xs font-bold text-muted-foreground">
        {lessonIndex + 1} of {totalLessons}
      </span>

      <button
        type="button"
        disabled={!nextLesson}
        onClick={() => nextLesson && onSelectLesson(nextLesson.id)}
        className="flex min-h-11 min-w-0 flex-1 items-center justify-end gap-2 rounded-2xl border border-border bg-card px-4 py-3 text-right transition hover:border-primary/40 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border"
      >
        <span className="min-w-0">
          <span className="block text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
            Next
          </span>
          <span className="block truncate text-sm font-semibold text-foreground">
            {nextLesson ? nextLesson.title : "—"}
          </span>
        </span>
        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
      </button>
    </div>
  );
}
