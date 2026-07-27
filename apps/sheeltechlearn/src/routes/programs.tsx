import { createFileRoute, notFound } from "@tanstack/react-router";
import { useSection } from "@/hooks/use-deck";
import { SectionView } from "@/components/SectionView";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Programs & Recipes" },
      { name: "description", content: "Studio-tight code — or station-tight recipes — with copyable, richly-formatted blocks." },
      { property: "og:title", content: "Programs & Recipes" },
      { property: "og:description", content: "Studio-tight code — or station-tight recipes — with copyable, richly-formatted blocks." },
    ],
  }),
  component: () => {
    const s = useSection("programs");
    if (!s) throw notFound();
    return <SectionView section={s} />;
  },
});
