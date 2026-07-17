import { cn } from "@/lib/utils";

export function CompanyMark({ name, size = 32, className }: { name: string; size?: number; className?: string }) {
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  const hue = hash % 360;
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-lg border border-border font-semibold tracking-tight",
        className,
      )}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.38,
        background: `oklch(0.96 0.04 ${hue} / 1)`,
        color: `oklch(0.42 0.14 ${hue})`,
        boxShadow: "inset 0 0 0 1px var(--border)",
      }}
    >
      {initials}
    </span>
  );
}
