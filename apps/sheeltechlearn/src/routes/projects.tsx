import { createFileRoute, notFound } from "@tanstack/react-router";
import { useSection } from "@/hooks/use-deck";
import { SectionView } from "@/components/SectionView";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Signature Projects & Dishes" },
      { name: "description", content: "Portfolio-worthy builds — or signature plates — the story, the stack, the standing ovation." },
      { property: "og:title", content: "Signature Projects & Dishes" },
      { property: "og:description", content: "Portfolio-worthy builds — or signature plates — the story, the stack, the standing ovation." },
    ],
  }),
  component: () => {
    const s = useSection("projects");
    if (!s) throw notFound();
    return <SectionView section={s} />;
  },
});
