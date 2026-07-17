import { cn } from "@/lib/utils";
import type { JobSource } from "@/types/job";
import { SOURCE_LABEL } from "@/types/job";

const styles: Record<JobSource, string> = {
  linkedin: "bg-[oklch(0.94_0.05_240)] text-[oklch(0.35_0.12_240)] dark:bg-[oklch(0.28_0.06_240)] dark:text-[oklch(0.85_0.08_240)]",
  indeed: "bg-[oklch(0.94_0.05_260)] text-[oklch(0.35_0.12_260)] dark:bg-[oklch(0.28_0.06_260)] dark:text-[oklch(0.85_0.08_260)]",
  monster: "bg-[oklch(0.94_0.05_290)] text-[oklch(0.4_0.12_290)] dark:bg-[oklch(0.28_0.06_290)] dark:text-[oklch(0.85_0.08_290)]",
  company_site: "bg-muted text-muted-foreground",
  greenhouse: "bg-[oklch(0.94_0.06_155)] text-[oklch(0.4_0.14_155)] dark:bg-[oklch(0.28_0.06_155)] dark:text-[oklch(0.85_0.08_155)]",
  lever: "bg-[oklch(0.94_0.06_25)] text-[oklch(0.45_0.15_25)] dark:bg-[oklch(0.28_0.06_25)] dark:text-[oklch(0.85_0.08_25)]",
  ashby: "bg-[oklch(0.94_0.05_210)] text-[oklch(0.4_0.12_210)] dark:bg-[oklch(0.28_0.06_210)] dark:text-[oklch(0.85_0.08_210)]",
  adzuna: "bg-[oklch(0.94_0.05_75)] text-[oklch(0.45_0.14_75)] dark:bg-[oklch(0.28_0.06_75)] dark:text-[oklch(0.85_0.08_75)]",
  jsearch: "bg-[oklch(0.94_0.05_180)] text-[oklch(0.4_0.12_180)] dark:bg-[oklch(0.28_0.06_180)] dark:text-[oklch(0.85_0.08_180)]",
};

export function SourceBadge({ source, className }: { source: JobSource; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-md px-1.5 py-0.5 text-[10.5px] font-medium tracking-tight", styles[source], className)}>
      {SOURCE_LABEL[source]}
    </span>
  );
}
