import { createFileRoute } from "@tanstack/react-router";
import { FeedStats } from "@/components/joblook/FeedStats";
import { FiltersBar } from "@/components/joblook/FiltersBar";
import { JobsList } from "@/components/joblook/JobsList";
import { JobDetailDrawer } from "@/components/joblook/JobDetailDrawer";

export const Route = createFileRoute("/_shell/")({
  component: FeedPage,
});

function FeedPage() {
  return (
    <div className="px-6 pt-5 pb-10 space-y-5">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-display text-[22px] font-semibold tracking-tight">Feed</h1>
          <p className="text-[13px] text-muted-foreground">Fresh matches ranked for you — filter, decide, apply.</p>
        </div>
      </div>
      <FeedStats />
      <FiltersBar />
      <JobsList />
      <JobDetailDrawer />
    </div>
  );
}
