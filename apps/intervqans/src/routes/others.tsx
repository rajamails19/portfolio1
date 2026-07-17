import { createFileRoute, notFound } from "@tanstack/react-router";
import { getSection } from "@/content";
import { SectionView } from "@/components/SectionView";

export const Route = createFileRoute("/others")({
  head: () => ({
    meta: [
      { title: "All Others — StudyDeck" },
      { name: "description", content: "AI engineering, systems, and everything else that didn't fit in a box." },
      { property: "og:title", content: "All Others — StudyDeck" },
      { property: "og:description", content: "AI engineering, systems, and everything else that didn't fit in a box." },
    ],
  }),
  component: () => {
    const s = getSection("others");
    if (!s) throw notFound();
    return <SectionView section={s} />;
  },
});
