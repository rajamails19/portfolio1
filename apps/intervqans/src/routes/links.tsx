import { createFileRoute, notFound } from "@tanstack/react-router";
import { LinksView } from "@/components/LinksView";
import { useTheme } from "@/themes/ThemeContext";

export const Route = createFileRoute("/links")({
  head: () => ({
    meta: [
      { title: "Handy Links-URLS — StudyDeck" },
      { property: "og:title", content: "Handy Links-URLS — StudyDeck" },
    ],
  }),
  component: () => {
    const { themeKey } = useTheme();
    if (themeKey !== "noir") throw notFound();
    return <LinksView />;
  },
});
