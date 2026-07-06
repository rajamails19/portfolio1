interface Props {
  tone?: "live" | "warn" | "down" | "idle";
  size?: number;
}
const COLORS: Record<NonNullable<Props["tone"]>, string> = {
  live: "var(--emerald)",
  warn: "var(--amber)",
  down: "var(--destructive)",
  idle: "oklch(0.6 0.02 260)",
};

export function StatusDot({ tone = "live", size = 8 }: Props) {
  const color = COLORS[tone];
  return (
    <span
      className="inline-block rounded-full animate-pulse-dot"
      style={{
        width: size,
        height: size,
        background: color,
        boxShadow: `0 0 12px ${color}`,
      }}
    />
  );
}
