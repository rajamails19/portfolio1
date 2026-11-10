import { createFileRoute } from "@tanstack/react-router";
import { TermsView } from "@/components/TermsView";
import { useRequireNoir } from "@/themes/ThemeContext";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms at a Glance — StudyDeck" },
      {
        name: "description",
        content:
          "Quick tiles for the tech words you will hear in IT teams, product meetings, and real project work.",
      },
      { property: "og:title", content: "Terms at a Glance — StudyDeck" },
      {
        property: "og:description",
        content:
          "Quick tiles for the tech words you will hear in IT teams, product meetings, and real project work.",
      },
    ],
  }),
  component: () => {
    const isNoir = useRequireNoir();
    if (!isNoir) return null;
    return <TermsView />;
  },
});
