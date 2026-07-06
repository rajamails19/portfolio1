/**
 * Shared formatters. No fake fallbacks — return em-dash for missing values
 * so the UI is honest about what the backend has and has not delivered.
 */

const MISSING = "—";

export function formatNumber(value: number | null | undefined, fractionDigits = 0): string {
  if (value == null || Number.isNaN(value)) return MISSING;
  return value.toLocaleString(undefined, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
}

export function formatPercent(value: number | null | undefined, fractionDigits = 1): string {
  if (value == null || Number.isNaN(value)) return MISSING;
  return `${value.toFixed(fractionDigits)}%`;
}

export function formatCurrency(value: number | null | undefined, currency = "USD"): string {
  if (value == null || Number.isNaN(value)) return MISSING;
  return value.toLocaleString(undefined, { style: "currency", currency });
}

export function formatLatency(ms: number | null | undefined): string {
  if (ms == null || Number.isNaN(ms)) return MISSING;
  if (ms < 1000) return `${Math.round(ms)}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

export function formatDuration(ms: number | null | undefined): string {
  if (ms == null || Number.isNaN(ms)) return MISSING;
  if (ms < 1000) return `${ms}ms`;
  const s = ms / 1000;
  if (s < 60) return `${s.toFixed(2)}s`;
  const m = Math.floor(s / 60);
  const rs = Math.round(s - m * 60);
  return `${m}m ${rs}s`;
}

export function formatRelativeTime(iso: string | null | undefined): string {
  if (!iso) return MISSING;
  const ts = new Date(iso).getTime();
  if (Number.isNaN(ts)) return MISSING;
  const diff = Date.now() - ts;
  const s = Math.floor(diff / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

export { MISSING };
