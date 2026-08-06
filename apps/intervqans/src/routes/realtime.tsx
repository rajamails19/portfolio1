import { createFileRoute, notFound } from "@tanstack/react-router";
import { useSection } from "@/hooks/use-sections";
import { SectionView } from "@/components/SectionView";

export const Route = createFileRoute("/realtime")({
  head: () => ({
    meta: [
      { title: "Real-Time Scenarios — StudyDeck" },
      {
        name: "description",
        content: "Real production scenarios and how to reason about them under pressure.",
      },
      { property: "og:title", content: "Real-Time Scenarios — StudyDeck" },
      {
        property: "og:description",
        content: "Real production scenarios and how to reason about them under pressure.",
      },
    ],
  }),
  component: () => {
    const s = useSection("realtime");
    if (!s) throw notFound();
    return <SectionView section={s} />;
  },
});
