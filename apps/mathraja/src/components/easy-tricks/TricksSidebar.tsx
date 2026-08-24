import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { TRICK_CATEGORIES, getAllLessons, getCategoryForLesson } from "@/lib/easy-tricks-data";

export function TricksSidebar({
  activeLessonId,
  onSelectLesson,
  className,
}: {
  activeLessonId: string;
  onSelectLesson: (lessonId: string) => void;
  className?: string;
}) {
  const activeCategory = getCategoryForLesson(activeLessonId);
  const [openCategories, setOpenCategories] = useState<string[]>(() => [
    activeCategory?.id ?? TRICK_CATEGORIES[0].id,
  ]);

  useEffect(() => {
    if (activeCategory) {
      setOpenCategories((prev) =>
        prev.includes(activeCategory.id) ? prev : [...prev, activeCategory.id],
      );
    }
  }, [activeCategory]);

  const totalLessons = getAllLessons().length;

  return (
    <div
      className={cn(
        "flex h-full min-h-0 flex-col rounded-3xl border border-border bg-card",
        className,
      )}
    >
      <div className="shrink-0 border-b border-border px-5 py-4">
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-primary">
          <BookOpen className="h-3.5 w-3.5" />
          Easy Tricks
        </div>
        <h2 className="mt-1 font-display text-lg font-bold text-foreground">Shortcut Library</h2>
        <p className="mt-1 text-xs text-muted-foreground">{totalLessons} lessons available</p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <nav aria-label="Easy Tricks library" className="p-3">
          <Accordion type="multiple" value={openCategories} onValueChange={setOpenCategories}>
            {TRICK_CATEGORIES.map((category) => {
              const CategoryIcon = category.icon;
              const isComingSoon = category.status === "coming-soon";

              return (
                <AccordionItem key={category.id} value={category.id} className="border-none">
                  <AccordionTrigger className="rounded-xl px-2 py-3 hover:no-underline hover:bg-muted/60">
                    <span className="flex flex-1 items-center gap-2.5">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-muted text-foreground/70">
                        <CategoryIcon className="h-4 w-4" />
                      </span>
                      <span className="flex-1 text-sm font-semibold text-foreground">
                        {category.title}
                      </span>
                      {!isComingSoon && (
                        <span className="text-[11px] font-medium text-muted-foreground">
                          {category.lessons.length}
                        </span>
                      )}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-2 pb-2 pt-0">
                    {isComingSoon ? (
                      <p className="rounded-xl bg-muted/50 px-3 py-2.5 text-xs text-muted-foreground">
                        Lessons coming soon
                      </p>
                    ) : (
                      <ul className="space-y-1">
                        {category.lessons.map((lesson) => {
                          const active = lesson.id === activeLessonId;
                          return (
                            <li key={lesson.id}>
                              <button
                                type="button"
                                onClick={() => onSelectLesson(lesson.id)}
                                aria-current={active ? "page" : undefined}
                                className={cn(
                                  "block min-h-11 w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium transition",
                                  active
                                    ? "bg-primary text-primary-foreground shadow-soft"
                                    : "text-foreground/70 hover:bg-muted/70 hover:text-foreground",
                                )}
                              >
                                {lesson.title}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </nav>
      </div>
    </div>
  );
}
