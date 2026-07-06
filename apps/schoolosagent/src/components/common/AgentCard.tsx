import * as Icons from "lucide-react";
import { motion } from "framer-motion";
import type { Agent } from "@/types";
import { GlassCard, StatusDot } from "./GlassCard";
import { cn } from "@/lib/utils";

export function AgentCard({ agent, onClick }: { agent: Agent; onClick?: () => void }) {
  const Icon = (Icons[agent.icon as keyof typeof Icons] ?? Icons.Bot) as Icons.LucideIcon;
  const accentText = {
    violet: "text-violet-glow", cyan: "text-cyan-glow",
    emerald: "text-emerald-glow", amber: "text-amber-glow", rose: "text-rose-glow",
  }[agent.accent];

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -4 }}
      className="text-left group"
    >
      <GlassCard accent={agent.accent} className="p-5 h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={cn(
              "relative h-11 w-11 rounded-xl glass-strong flex items-center justify-center",
              accentText,
            )}>
              <Icon className="h-5 w-5" />
              {agent.status === "active" && (
                <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-glow ring-2 ring-background animate-pulse-glow" />
              )}
            </div>
            <div>
              <h3 className="font-display font-semibold text-sm">{agent.name}</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <StatusDot status={agent.status} />
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {agent.status}
                </span>
              </div>
            </div>
          </div>
          <span className="text-[10px] text-muted-foreground font-mono">{agent.promptVersion}</span>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-4">{agent.role}</p>
        <div className="grid grid-cols-3 gap-2 mb-3">
          <Stat label="Latency" value={`${agent.latencyMs}ms`} />
          <Stat label="Cost" value={`$${agent.tokenCost.toFixed(2)}`} />
          <Stat label="Success" value={`${agent.successRate}%`} />
        </div>
        <div className="pt-3 border-t border-glass-border">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Last action</p>
          <p className="text-xs truncate">{agent.lastAction}</p>
        </div>
      </GlassCard>
    </motion.button>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="text-xs font-mono font-medium">{value}</p>
    </div>
  );
}
