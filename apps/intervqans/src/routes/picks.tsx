import { createFileRoute, notFound } from "@tanstack/react-router";
import { PicksView } from "@/components/PicksView";
import { useTheme } from "@/themes/ThemeContext";

export const Route = createFileRoute("/picks")({
  head: () => ({
    meta: [
      { title: "Hand-Picked By Me — StudyDeck" },
      { property: "og:title", content: "Hand-Picked By Me — StudyDeck" },
    ],
  }),
  component: () => {
    const { themeKey } = useTheme();
    if (themeKey !== "noir") throw notFound();
    return <PicksView />;
  },
});
