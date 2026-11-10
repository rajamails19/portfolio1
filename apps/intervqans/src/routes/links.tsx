import { createFileRoute } from "@tanstack/react-router";
import { LinksView } from "@/components/LinksView";
import { useRequireNoir } from "@/themes/ThemeContext";

export const Route = createFileRoute("/links")({
  head: () => ({
    meta: [
      { title: "Handy Links-URLS — StudyDeck" },
      { property: "og:title", content: "Handy Links-URLS — StudyDeck" },
    ],
  }),
  component: () => {
    const isNoir = useRequireNoir();
    if (!isNoir) return null;
    return <LinksView />;
  },
});
