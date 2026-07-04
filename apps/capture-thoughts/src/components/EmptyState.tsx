import type { ReactNode } from "react";

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="glass animate-fade-up mx-auto mt-12 flex max-w-md flex-col items-center gap-4 rounded-3xl px-6 py-12 text-center">
      <div className="grid h-20 w-20 place-items-center rounded-full bg-aurora opacity-90 shadow-[var(--shadow-glow)] animate-pulse-glow">
        {icon}
      </div>
      <h3 className="font-display text-2xl">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
      {action}
    </div>
  );
}
