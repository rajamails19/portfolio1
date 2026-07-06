import { motion, AnimatePresence } from "framer-motion";
import { activityFeed } from "@/data/mock";
import { GlassCard } from "./GlassCard";
import { cn } from "@/lib/utils";

const dotMap = {
  violet: "bg-violet-glow", cyan: "bg-cyan-glow",
  emerald: "bg-emerald-glow", amber: "bg-amber-glow", rose: "bg-rose-glow",
};

export function ActivityFeed({ extra = [] }: { extra?: typeof activityFeed }) {
  const items = [...extra, ...activityFeed];
  return (
    <GlassCard className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold">Live Activity</h3>
        <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-emerald-glow">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-glow animate-pulse-glow" />
          Streaming
        </span>
      </div>
      <ul className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
              className="flex items-start gap-3 text-sm"
            >
              <span className={cn(
                "mt-1 h-2 w-2 rounded-full shrink-0",
                dotMap[item.accent], "animate-pulse-glow",
              )} />
              <div className="flex-1 min-w-0">
                <p className="text-xs">
                  <span className="text-foreground font-medium">{item.agent}</span>
                  <span className="text-muted-foreground"> · {item.message}</span>
                </p>
                <p className="text-[10px] text-muted-foreground/70 mt-0.5">{item.time}</p>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </GlassCard>
  );
}
