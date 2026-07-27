import { createFileRoute, notFound } from "@tanstack/react-router";
import { useSection } from "@/hooks/use-deck";
import { SectionView } from "@/components/SectionView";

export const Route = createFileRoute("/realtime")({
  head: () => ({
    meta: [
      { title: "Real-Time Scenarios" },
      { name: "description", content: "What actually breaks under pressure — production incidents or peak-hour stall chaos." },
      { property: "og:title", content: "Real-Time Scenarios" },
      { property: "og:description", content: "What actually breaks under pressure — production incidents or peak-hour stall chaos." },
    ],
  }),
  component: () => {
    const s = useSection("realtime");
    if (!s) throw notFound();
    return <SectionView section={s} />;
  },
});
