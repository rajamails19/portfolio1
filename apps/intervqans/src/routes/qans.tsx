import { createFileRoute, notFound } from "@tanstack/react-router";
import { useSection } from "@/hooks/use-sections";
import { SectionView } from "@/components/SectionView";

export const Route = createFileRoute("/qans")({
  head: () => ({
    meta: [
      { title: "Q & Answers — StudyDeck" },
      {
        name: "description",
        content: "Interview-grade React and engineering questions with crisp, memorable answers.",
      },
      { property: "og:title", content: "Q & Answers — StudyDeck" },
      {
        property: "og:description",
        content: "Interview-grade React and engineering questions with crisp, memorable answers.",
      },
    ],
  }),
  component: () => {
    const s = useSection("qans");
    if (!s) throw notFound();
    return <SectionView section={s} />;
  },
});
