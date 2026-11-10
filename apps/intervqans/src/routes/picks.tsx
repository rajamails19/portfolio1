import { createFileRoute } from "@tanstack/react-router";
import { PicksView } from "@/components/PicksView";
import { useRequireNoir } from "@/themes/ThemeContext";

export const Route = createFileRoute("/picks")({
  head: () => ({
    meta: [
      { title: "Hand-Picked By Me — StudyDeck" },
      { property: "og:title", content: "Hand-Picked By Me — StudyDeck" },
    ],
  }),
  component: () => {
    const isNoir = useRequireNoir();
    if (!isNoir) return null;
    return <PicksView />;
  },
});
