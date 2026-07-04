import { cn } from "@/lib/utils";

export function Waveform({
  bars = 5,
  className,
  active = true,
}: {
  bars?: number;
  className?: string;
  active?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-end gap-[3px] h-4", className)} aria-hidden>
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className="wave-bar h-full"
          style={{
            animationDelay: `${(i * 0.13) % 0.6}s`,
            animationDuration: `${0.8 + ((i * 0.17) % 0.7)}s`,
            animationPlayState: active ? "running" : "paused",
          }}
        />
      ))}
    </span>
  );
}