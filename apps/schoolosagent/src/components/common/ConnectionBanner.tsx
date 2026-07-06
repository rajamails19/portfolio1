import { CloudOff, CheckCircle2 } from "lucide-react";
import { useBackendConnection } from "@/hooks/useBackendConnection";
import { cn } from "@/lib/utils";

/**
 * Slim banner advertising current backend connection status. While the
 * backend is not wired, every page shows the "awaiting backend" notice so
 * stakeholders understand metrics are placeholders, not fabrications.
 */
export function ConnectionBanner({ className }: { className?: string }) {
  const { status } = useBackendConnection();
  const isUp = status === "connected";

  return (
    <div
      role="status"
      className={cn(
        "flex items-center gap-2.5 rounded-lg border px-3 py-1.5 text-[11px] font-medium",
        isUp
          ? "border-emerald-glow/30 bg-emerald-glow/8 text-emerald-glow"
          : "border-amber-glow/30 bg-amber-glow/8 text-amber-glow",
        className,
      )}
    >
      {isUp ? (
        <CheckCircle2 className="h-3.5 w-3.5" />
      ) : (
        <CloudOff className="h-3.5 w-3.5 animate-pulse-glow" />
      )}
      <span className="uppercase tracking-[0.18em] text-[10px]">
        {isUp ? "Backend connected" : "Awaiting backend · UI in disconnected mode"}
      </span>
      <span className="ml-auto font-mono text-[10px] text-muted-foreground hidden sm:inline">
        status: {status}
      </span>
    </div>
  );
}
