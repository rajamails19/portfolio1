import { createFileRoute, notFound } from "@tanstack/react-router";
import { ConceptsView } from "@/components/ConceptsView";
import { useTheme } from "@/themes/ThemeContext";

export const Route = createFileRoute("/concepts")({
  head: () => ({
    meta: [
      { title: "80-20 Concepts Rule — StudyDeck" },
      { property: "og:title", content: "80-20 Concepts Rule — StudyDeck" },
    ],
  }),
  component: () => {
    const { themeKey } = useTheme();
    if (themeKey !== "noir") throw notFound();
    return <ConceptsView />;
  },
});
