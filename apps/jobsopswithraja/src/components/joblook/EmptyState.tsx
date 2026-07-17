import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Props {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
  className?: string;
  compact?: boolean;
}

export function EmptyState({ icon: Icon, title, description, action, className, compact }: Props) {
  return (
    <div
      className={cn(
        "rounded-xl border border-dashed border-border/80 bg-surface/40 text-center",
        compact ? "p-6" : "p-10",
        className,
      )}
    >
      <div className="mx-auto max-w-sm">
        <div
          className={cn(
            "mx-auto mb-3 flex items-center justify-center rounded-full bg-brand/10 ring-1 ring-brand/15",
            compact ? "h-8 w-8" : "h-11 w-11",
          )}
        >
          <Icon className={cn("text-brand", compact ? "h-3.5 w-3.5" : "h-4 w-4")} />
        </div>
        <h3 className={cn("font-display font-semibold text-foreground", compact ? "text-[13px]" : "text-[15px]")}>
          {title}
        </h3>
        {description && (
          <p className={cn("mt-1 text-muted-foreground", compact ? "text-[12px]" : "text-[13px]")}>{description}</p>
        )}
        {action && (
          <Button size="sm" variant="outline" onClick={action.onClick} className="mt-3 h-8 text-[12px]">
            {action.label}
          </Button>
        )}
      </div>
    </div>
  );
}
