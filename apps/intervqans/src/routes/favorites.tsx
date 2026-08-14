import { createFileRoute } from "@tanstack/react-router";
import { FavoritesView } from "@/components/FavoritesView";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: "Favorites — DAnalyst" },
      {
        name: "description",
        content: "Saved words and passages selected from DAnalyst Basics.",
      },
    ],
  }),
  component: FavoritesView,
});
