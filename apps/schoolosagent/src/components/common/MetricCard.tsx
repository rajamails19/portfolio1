import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { GlassCard } from "./GlassCard";
import { cn } from "@/lib/utils";

type Accent = "violet" | "cyan" | "emerald" | "amber" | "rose";

export function MetricCard({
  label, value, delta, icon = "Activity", accent = "violet", suffix,
}: {
  label: string; value: string | number; delta?: string;
  icon?: keyof typeof Icons; accent?: Accent; suffix?: string;
}) {
  const Icon = (Icons[icon] ?? Icons.Activity) as Icons.LucideIcon;
  const accentText: Record<Accent, string> = {
    violet: "text-violet-glow", cyan: "text-cyan-glow",
    emerald: "text-emerald-glow", amber: "text-amber-glow", rose: "text-rose-glow",
  };
  return (
    <GlassCard accent={accent} hover className="p-5">
      <div className="flex items-start justify-between mb-4">
        <span className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</span>
        <div className={cn("h-8 w-8 rounded-lg glass-strong flex items-center justify-center", accentText[accent])}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="flex items-baseline gap-1.5">
        <motion.span
          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-display font-semibold tracking-tight"
        >
          {value}
        </motion.span>
        {suffix && <span className="text-sm text-muted-foreground">{suffix}</span>}
      </div>
      {delta && <p className={cn("text-xs mt-1.5", accentText[accent])}>{delta}</p>}
    </GlassCard>
  );
}
