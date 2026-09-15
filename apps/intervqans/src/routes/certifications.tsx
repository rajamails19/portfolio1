import { createFileRoute, notFound } from "@tanstack/react-router";
import { useSection } from "@/hooks/use-sections";
import { SectionView } from "@/components/SectionView";

export const Route = createFileRoute("/certifications")({
  head: () => ({
    meta: [
      { title: "Certifications — StudyDeck" },
      {
        name: "description",
        content: "Exam-mapped prep for AWS, Azure, GCP, and Anthropic AI certifications.",
      },
      { property: "og:title", content: "Certifications — StudyDeck" },
      {
        property: "og:description",
        content: "Exam-mapped prep for AWS, Azure, GCP, and Anthropic AI certifications.",
      },
    ],
  }),
  component: () => {
    const s = useSection("certifications");
    if (!s) throw notFound();
    return <SectionView section={s} />;
  },
});
