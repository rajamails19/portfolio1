import { cn } from "@/lib/utils";
import { Skeleton } from "./states/Skeleton";

/**
 * Renders a metric value honestly:
 *  - skeleton while loading
 *  - em-dash with hint when disconnected / empty / error
 *  - actual value otherwise
 */
export function PendingValue({
  loading,
  value,
  className,
  width = "w-20",
}: {
  loading: boolean;
  value: string | number | null | undefined;
  className?: string;
  width?: string;
}) {
  if (loading) return <Skeleton className={cn("h-7 inline-block align-middle", width)} />;
  const shown = value == null || value === "" ? "—" : value;
  return <span className={className}>{shown}</span>;
}
