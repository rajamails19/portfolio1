import { createFileRoute, notFound } from "@tanstack/react-router";
import { useSection } from "@/hooks/use-sections";
import { StoryView } from "@/components/StoryView";
import { storyOriginalSegments } from "@/content/story-original";

export const Route = createFileRoute("/story")({
  validateSearch: (search: Record<string, unknown>) => ({
    view: search.view === "original" ? ("original" as const) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Story-Based — StudyDeck" },
      {
        name: "description",
        content:
          "Your pasted story, retold concept by concept — with the original text always one click away.",
      },
    ],
  }),
  component: () => {
    const s = useSection("story");
    const { view } = Route.useSearch();
    if (!s) throw notFound();
    return (
      <StoryView
        section={s}
        showOriginalText={view === "original"}
        originalSegments={storyOriginalSegments}
      />
    );
  },
});
