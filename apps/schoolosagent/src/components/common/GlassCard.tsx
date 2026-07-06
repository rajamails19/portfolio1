import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Accent = "violet" | "cyan" | "emerald" | "amber" | "rose";

const accentMap: Record<Accent, string> = {
  violet: "from-violet-glow/30 to-transparent",
  cyan: "from-cyan-glow/30 to-transparent",
  emerald: "from-emerald-glow/30 to-transparent",
  amber: "from-amber-glow/30 to-transparent",
  rose: "from-rose-glow/30 to-transparent",
};

const glowMap: Record<Accent, string> = {
  violet: "glow-violet",
  cyan: "glow-cyan",
  emerald: "glow-emerald",
  amber: "glow-amber",
  rose: "glow-rose",
};

export function GlassCard({
  children, className, accent, hover = false, glow = false,
}: { children: ReactNode; className?: string; accent?: Accent; hover?: boolean; glow?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={cn(
        "relative rounded-2xl glass overflow-hidden",
        glow && accent && glowMap[accent],
        className,
      )}
    >
      {accent && (
        <div className={cn("pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60", accentMap[accent])} />
      )}
      <div className="relative">{children}</div>
    </motion.div>
  );
}

export function SectionHeader({ eyebrow, title, description, action }: {
  eyebrow?: string; title: string; description?: string; action?: ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-4 mb-6 flex-wrap">
      <div>
        {eyebrow && <p className="text-[10px] uppercase tracking-[0.2em] text-primary mb-2">{eyebrow}</p>}
        <h1 className="text-3xl md:text-4xl font-display font-semibold text-gradient">{title}</h1>
        {description && <p className="text-sm text-muted-foreground mt-2 max-w-2xl">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatusDot({ status }: { status: "active" | "idle" | "warning" | "error" | "healthy" | "degraded" | "down" }) {
  const color = ({
    active: "bg-emerald-glow shadow-[0_0_10px] shadow-emerald-glow",
    healthy: "bg-emerald-glow shadow-[0_0_10px] shadow-emerald-glow",
    idle: "bg-muted-foreground",
    warning: "bg-amber-glow shadow-[0_0_10px] shadow-amber-glow",
    degraded: "bg-amber-glow shadow-[0_0_10px] shadow-amber-glow",
    error: "bg-rose-glow shadow-[0_0_10px] shadow-rose-glow",
    down: "bg-rose-glow shadow-[0_0_10px] shadow-rose-glow",
  } as const)[status];
  return <span className={cn("inline-block h-2 w-2 rounded-full animate-pulse-glow", color)} />;
}
