import { createFileRoute, notFound } from "@tanstack/react-router";
import { useSection } from "@/hooks/use-deck";
import { SectionView } from "@/components/SectionView";

export const Route = createFileRoute("/others")({
  head: () => ({
    meta: [
      { title: "The Deep Cuts" },
      { name: "description", content: "AI engineering B-sides — or the tapri chai and jalebi encore menu." },
      { property: "og:title", content: "The Deep Cuts" },
      { property: "og:description", content: "AI engineering B-sides — or the tapri chai and jalebi encore menu." },
    ],
  }),
  component: () => {
    const s = useSection("others");
    if (!s) throw notFound();
    return <SectionView section={s} />;
  },
});
