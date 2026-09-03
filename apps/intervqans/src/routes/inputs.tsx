import { createFileRoute } from "@tanstack/react-router";
import { RandomInputsView } from "@/components/RandomInputsView";

export const Route = createFileRoute("/inputs")({
  head: () => ({
    meta: [
      { title: "Your Inputs — StudyDeck" },
      {
        name: "description",
        content:
          "A running scratchpad — type or paste anything and save it, kept exactly as written.",
      },
    ],
  }),
  component: RandomInputsView,
});
