import { createFileRoute, notFound } from "@tanstack/react-router";
import { useSection } from "@/hooks/use-sections";
import { SectionView } from "@/components/SectionView";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — StudyDeck" },
      {
        name: "description",
        content: "Portfolio-worthy project ideas with stack, schema, and gotchas.",
      },
      { property: "og:title", content: "Projects — StudyDeck" },
      {
        property: "og:description",
        content: "Portfolio-worthy project ideas with stack, schema, and gotchas.",
      },
    ],
  }),
  component: () => {
    const s = useSection("projects");
    if (!s) throw notFound();
    return <SectionView section={s} />;
  },
});
