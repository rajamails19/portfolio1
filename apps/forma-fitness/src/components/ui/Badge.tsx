import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  color?: "teal" | "amber" | "coral" | "emerald" | "purple";
  className?: string;
}

const colors = {
  teal: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300",
  amber: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  coral: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  emerald: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  purple: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
};

export function Badge({ children, color = "teal", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase ${colors[color]} ${className}`}
    >
      {children}
    </span>
  );
}
