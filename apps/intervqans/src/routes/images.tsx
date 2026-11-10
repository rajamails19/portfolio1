import { createFileRoute } from "@tanstack/react-router";
import { ImagesView } from "@/components/ImagesView";
import { useRequireNoir } from "@/themes/ThemeContext";

export const Route = createFileRoute("/images")({
  head: () => ({
    meta: [
      { title: "Quick-Images — StudyDeck" },
      { property: "og:title", content: "Quick-Images — StudyDeck" },
    ],
  }),
  component: () => {
    const isNoir = useRequireNoir();
    if (!isNoir) return null;
    return <ImagesView />;
  },
});
