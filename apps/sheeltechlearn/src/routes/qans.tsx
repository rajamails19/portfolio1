import { createFileRoute, notFound } from "@tanstack/react-router";
import { useSection } from "@/hooks/use-deck";
import { SectionView } from "@/components/SectionView";

export const Route = createFileRoute("/qans")({
  head: () => ({
    meta: [
      { title: "Q & Answers — Two Decks, One Craft" },
      { name: "description", content: "Interview-grade fundamentals — or street-food fundamentals — with crisp, camera-ready answers." },
      { property: "og:title", content: "Q & Answers" },
      { property: "og:description", content: "Interview-grade fundamentals — or street-food fundamentals — with crisp, camera-ready answers." },
    ],
  }),
  component: () => {
    const s = useSection("qans");
    if (!s) throw notFound();
    return <SectionView section={s} />;
  },
});
