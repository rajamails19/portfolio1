import type { ReactNode } from "react";
import { AlertCircle, CloudOff, Inbox, Loader2, Lock, Plug, RefreshCw, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ApiStatus } from "@/lib/api/types";

type Kind =
  | "loading"
  | "refreshing"
  | "empty"
  | "disconnected"
  | "error"
  | "unauthorized"
  | "first_time_setup";

const ICON: Record<Kind, React.ComponentType<{ className?: string }>> = {
  loading: Loader2,
  refreshing: RefreshCw,
  empty: Inbox,
  disconnected: CloudOff,
  error: AlertCircle,
  unauthorized: Lock,
  first_time_setup: Sparkles,
};

const TONE: Record<Kind, string> = {
  loading: "text-primary",
  refreshing: "text-primary",
  empty: "text-muted-foreground",
  disconnected: "text-amber-glow",
  error: "text-rose-glow",
  unauthorized: "text-cyan-glow",
  first_time_setup: "text-violet-glow",
};

const DEFAULT_TITLES: Record<Kind, string> = {
  loading: "Loading…",
  refreshing: "Refreshing…",
  empty: "Nothing to show yet.",
  disconnected: "Backend not connected.",
  error: "Something went wrong.",
  unauthorized: "Permission denied.",
  first_time_setup: "First-time setup required.",
};

export function StateView({
  kind,
  title,
  description,
  action,
  className,
  compact = false,
}: {
  kind: Kind;
  title?: string;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
  compact?: boolean;
}) {
  const Icon = ICON[kind];
  const tone = TONE[kind];
  const spin = kind === "loading" || kind === "refreshing";

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex flex-col items-center justify-center text-center",
        compact ? "py-6 px-4" : "py-12 px-6",
        className,
      )}
    >
      <div className={cn(
        "relative h-12 w-12 rounded-2xl border border-border bg-card flex items-center justify-center shadow-sm",
        tone,
      )}>
        <Icon className={cn("h-5 w-5", spin && "animate-spin")} />
        <span className={cn(
          "absolute inset-0 rounded-2xl opacity-30 blur-xl -z-10",
          kind === "disconnected" && "bg-amber-glow/40",
          kind === "error" && "bg-rose-glow/40",
          kind === "loading" && "bg-violet-glow/30",
        )} />
      </div>
      <h3 className="mt-4 font-display text-base italic">{title ?? DEFAULT_TITLES[kind]}</h3>
      {description && (
        <p className="mt-1.5 text-xs text-muted-foreground max-w-sm leading-relaxed">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </motion.div>
  );
}

/** Map an `ApiStatus` to a StateView kind (returns null for success). */
export function statusToKind(status: ApiStatus): Kind | null {
  switch (status) {
    case "loading":
      return "loading";
    case "refreshing":
      return "refreshing";
    case "empty":
      return "empty";
    case "disconnected":
      return "disconnected";
    case "error":
      return "error";
    case "unauthorized":
      return "unauthorized";
    case "first_time_setup":
      return "first_time_setup";
    case "idle":
    case "success":
    default:
      return null;
  }
}

export function ConnectButton({ label = "Connect backend" }: { label?: string }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-md border border-primary/40 bg-primary/10 text-primary px-3 py-1.5 text-xs font-medium hover:bg-primary/15 transition"
    >
      <Plug className="h-3.5 w-3.5" /> {label}
    </button>
  );
}
