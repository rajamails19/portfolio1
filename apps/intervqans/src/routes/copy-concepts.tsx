import { createFileRoute } from "@tanstack/react-router";
import { ConceptsViewCopy } from "@/components/ConceptsViewCopy";
import { useRequireNoir } from "@/themes/ThemeContext";

export const Route = createFileRoute("/copy-concepts")({
  head: () => ({
    meta: [
      { title: "80-20 Concepts Rule (Copy) — StudyDeck" },
      { property: "og:title", content: "80-20 Concepts Rule (Copy) — StudyDeck" },
    ],
  }),
  component: () => {
    const isNoir = useRequireNoir();
    if (!isNoir) return null;
    return <ConceptsViewCopy />;
  },
});
