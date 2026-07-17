export function formatSalary(min?: number, max?: number, currency = "USD"): string {
  if (!min && !max) return "—";
  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
      notation: n >= 1000 ? "compact" : "standard",
    }).format(n);
  if (min && max) return `${fmt(min)} – ${fmt(max)}`;
  return fmt(min ?? max ?? 0);
}

export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${Math.max(1, m)}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return new Date(iso).toLocaleDateString();
}

export function daysBetween(a: string, b: string = new Date().toISOString()): number {
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86400000);
}
