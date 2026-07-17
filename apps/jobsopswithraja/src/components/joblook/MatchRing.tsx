import { cn } from "@/lib/utils";
import { useEffect, useRef, useState, type ReactNode } from "react";

interface Props {
  size?: number;
  stroke?: number;
  value: number;
  className?: string;
  showLabel?: boolean;
  children?: ReactNode;
  animate?: boolean;
}

function scoreColor(v: number) {
  if (v >= 80) return "var(--emerald-accent)";
  if (v >= 60) return "var(--amber-accent)";
  return "var(--rose-accent)";
}

export function MatchRing({
  size = 44,
  stroke = 4,
  value,
  className,
  showLabel = true,
  children,
  animate = true,
}: Props) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const target = c - (Math.min(100, Math.max(0, value)) / 100) * c;
  const ref = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState<number>(animate ? c : target);
  const [labelVal, setLabelVal] = useState<number>(animate ? 0 : value);

  useEffect(() => {
    if (!animate) {
      setOffset(target);
      setLabelVal(value);
      return;
    }
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            // trigger transition on next frame
            raf = requestAnimationFrame(() => setOffset(target));
            const start = performance.now();
            const dur = 700;
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / dur);
              const eased = 1 - Math.pow(1 - t, 3);
              setLabelVal(Math.round(value * eased));
              if (t < 1) raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
            io.disconnect();
          }
        });
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [animate, target, value]);

  return (
    <div
      ref={ref}
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} stroke="var(--muted)" fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={stroke}
          stroke={scoreColor(value)}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 900ms cubic-bezier(0.22,1,0.36,1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children ?? (showLabel && (
          <span className="tabular text-[11px] font-semibold" style={{ color: scoreColor(value) }}>
            {labelVal}
          </span>
        ))}
      </div>
    </div>
  );
}
