import { createFileRoute, notFound } from "@tanstack/react-router";
import { useSection } from "@/hooks/use-sections";
import { SectionView } from "@/components/SectionView";

export const Route = createFileRoute("/qans")({
  head: () => ({
    meta: [
      { title: "AIML Q&A" },
      {
        name: "description",
        content: "Crisp, memorable answers to AI and machine learning interview questions.",
      },
      { property: "og:title", content: "AIML Q&A" },
      {
        property: "og:description",
        content: "Crisp, memorable answers to AI and machine learning interview questions.",
      },
    ],
  }),
  component: () => {
    const s = useSection("qans");
    if (!s) throw notFound();
    return <SectionView section={s} />;
  },
});
