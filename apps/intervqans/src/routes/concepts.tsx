import { createFileRoute } from "@tanstack/react-router";
import { ConceptsView } from "@/components/ConceptsView";
import { useRequireNoir } from "@/themes/ThemeContext";

export const Route = createFileRoute("/concepts")({
  head: () => ({
    meta: [
      { title: "80-20 Concepts Rule — StudyDeck" },
      { property: "og:title", content: "80-20 Concepts Rule — StudyDeck" },
    ],
  }),
  component: () => {
    const isNoir = useRequireNoir();
    if (!isNoir) return null;
    return <ConceptsView />;
  },
});
