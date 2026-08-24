import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu as MenuIcon } from "lucide-react";
import { PageShell } from "@/components/site-layout";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { TricksSidebar } from "@/components/easy-tricks/TricksSidebar";
import { TrickLessonView } from "@/components/easy-tricks/TrickLesson";
import {
  DEFAULT_LESSON_ID,
  getAllLessons,
  getCategoryForLesson,
  getLessonById,
  isValidLessonId,
} from "@/lib/easy-tricks-data";

export const Route = createFileRoute("/easy-tricks")({
  validateSearch: (search: Record<string, unknown>): { lesson: string } => {
    const raw = typeof search.lesson === "string" ? search.lesson : undefined;
    return { lesson: isValidLessonId(raw) ? raw! : DEFAULT_LESSON_ID };
  },
  head: () => ({
    meta: [
      { title: "Easy Math Tricks — MathDreams" },
      {
        name: "description",
        content:
          "Simple mental math tricks for kids, with friendly examples and quick practice prompts.",
      },
    ],
  }),
  component: EasyTricksPage,
});

function EasyTricksPage() {
  const { lesson: activeLessonId } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const allLessons = getAllLessons();
  const lesson = getLessonById(activeLessonId);
  const category = getCategoryForLesson(lesson.id);
  const lessonIndex = allLessons.findIndex((l) => l.id === lesson.id);

  const selectLesson = (lessonId: string) => {
    navigate({ search: { lesson: lessonId } });
  };

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    document.getElementById("lesson-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [lesson.id]);

  return (
    <PageShell
      eyebrow="Easy-Tricks"
      title="The shortcut library"
      subtitle="Pick a topic from the library. Learn one friendly pattern at a time, see it in action, then try it yourself."
    >
      <MobileLibraryButton
        activeLessonId={lesson.id}
        activeLessonTitle={lesson.title}
        onSelectLesson={selectLesson}
      />

      <div className="lg:flex lg:items-start lg:gap-8">
        <div className="hidden lg:sticky lg:top-28 lg:block lg:w-[290px] lg:shrink-0">
          <TricksSidebar
            activeLessonId={lesson.id}
            onSelectLesson={selectLesson}
            className="max-h-[calc(100dvh-7rem)]"
          />
        </div>

        <div className="min-w-0 flex-1">
          <TrickLessonView
            lesson={lesson}
            category={category}
            lessonIndex={lessonIndex}
            totalLessons={allLessons.length}
            allLessons={allLessons}
            onSelectLesson={selectLesson}
          />

          <ZogRuleSection />
        </div>
      </div>
    </PageShell>
  );
}

function MobileLibraryButton({
  activeLessonId,
  activeLessonTitle,
  onSelectLesson,
}: {
  activeLessonId: string;
  activeLessonTitle: string;
  onSelectLesson: (lessonId: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-6 lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            className="flex min-h-12 w-full items-center justify-between gap-3 rounded-2xl border border-border bg-card px-4 py-3.5 text-left shadow-soft"
          >
            <span className="flex min-w-0 items-center gap-2 text-sm font-semibold text-foreground">
              <MenuIcon className="h-4 w-4 shrink-0 text-primary" />
              <span className="shrink-0">Browse shortcut library:</span>
              <span className="truncate text-primary">{activeLessonTitle}</span>
            </span>
          </button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex w-[88vw] flex-col gap-0 overflow-hidden p-0 sm:max-w-sm"
        >
          <div className="border-b border-border px-5 py-4">
            <SheetTitle className="font-display text-base font-bold text-foreground">
              Easy Tricks Library
            </SheetTitle>
          </div>
          <div className="min-h-0 flex-1 p-3">
            <TricksSidebar
              activeLessonId={activeLessonId}
              onSelectLesson={(lessonId) => {
                onSelectLesson(lessonId);
                setOpen(false);
              }}
              className="h-full border-none"
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function ZogRuleSection() {
  const [open, setOpen] = useState(false);
  const steps = [
    {
      n: "1",
      t: "Make it friendly",
      d: "Round, split, double, or turn the number into something your brain likes.",
    },
    {
      n: "2",
      t: "Do the easy math",
      d: "Use tens, halves, doubles, or near-number patterns to move quickly.",
    },
    {
      n: "3",
      t: "Fix the difference",
      d: "Add back or subtract away anything you changed at the start.",
    },
  ];

  return (
    <div className="mt-6 overflow-hidden rounded-3xl border border-border bg-card">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex min-h-14 w-full items-center justify-between gap-3 px-5 py-4 text-left"
      >
        <span className="font-display text-base font-bold text-foreground">
          Zog's 3-step shortcut rule
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="grid gap-3 border-t border-border px-5 py-5 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.n} className="min-w-0 rounded-2xl bg-muted/40 p-4">
              <div className="grid h-8 w-8 place-items-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
                {step.n}
              </div>
              <div className="mt-2 font-display text-sm font-bold text-foreground">{step.t}</div>
              <p className="mt-1 text-xs text-muted-foreground">{step.d}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
