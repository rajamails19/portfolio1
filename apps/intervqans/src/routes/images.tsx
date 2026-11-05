import { createFileRoute, notFound } from "@tanstack/react-router";
import { ImagesView } from "@/components/ImagesView";
import { useTheme } from "@/themes/ThemeContext";

export const Route = createFileRoute("/images")({
  head: () => ({
    meta: [
      { title: "Quick-Images — StudyDeck" },
      { property: "og:title", content: "Quick-Images — StudyDeck" },
    ],
  }),
  component: () => {
    const { themeKey } = useTheme();
    if (themeKey !== "noir") throw notFound();
    return <ImagesView />;
  },
});
