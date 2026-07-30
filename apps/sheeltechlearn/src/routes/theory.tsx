import { createFileRoute, notFound } from "@tanstack/react-router";
import { useSection } from "@/hooks/use-deck";
import { ArticleView } from "@/components/ArticleView";

export const Route = createFileRoute("/theory")({
  head: () => ({
    meta: [
      { title: "Conceptual Theory — Start Here" },
      {
        name: "description",
        content:
          "The AI and ML fundamentals in plain language — how the pieces fit together, what actually changes versus traditional software, and why AI is not magic.",
      },
      { property: "og:title", content: "Conceptual Theory — Start Here" },
      {
        property: "og:description",
        content:
          "The AI and ML fundamentals in plain language, built for someone starting from zero.",
      },
    ],
  }),
  component: () => {
    const s = useSection("theory");
    if (!s) throw notFound();
    return <ArticleView section={s} />;
  },
});
