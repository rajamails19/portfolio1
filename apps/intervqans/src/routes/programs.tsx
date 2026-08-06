import { createFileRoute, notFound } from "@tanstack/react-router";
import { useSection } from "@/hooks/use-sections";
import { SectionView } from "@/components/SectionView";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Programs — StudyDeck" },
      {
        name: "description",
        content: "Bite-sized React and Python programs with dark, copyable code snippets.",
      },
      { property: "og:title", content: "Programs — StudyDeck" },
      {
        property: "og:description",
        content: "Bite-sized React and Python programs with dark, copyable code snippets.",
      },
    ],
  }),
  component: () => {
    const s = useSection("programs");
    if (!s) throw notFound();
    return <SectionView section={s} />;
  },
});
