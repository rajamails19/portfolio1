import { createServerFn } from "@tanstack/react-start";

export type UptimeStatus = "up" | "down" | "slow" | "unknown";

export interface UptimeResult {
  url: string;
  status: UptimeStatus;
  ms: number;
  code?: number;
  checkedAt: number;
}

async function ping(url: string): Promise<UptimeResult> {
  const start = Date.now();
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(url, { method: "GET", redirect: "follow", signal: controller.signal });
    clearTimeout(timer);
    const ms = Date.now() - start;
    const ok = res.status < 500;
    return {
      url,
      status: !ok ? "down" : ms > 1500 ? "slow" : "up",
      ms,
      code: res.status,
      checkedAt: Date.now(),
    };
  } catch {
    return { url, status: "down", ms: Date.now() - start, checkedAt: Date.now() };
  }
}

export const pingSites = createServerFn({ method: "POST" })
  .inputValidator((data: { urls: string[] }) => {
    if (!data || !Array.isArray(data.urls)) throw new Error("urls required");
    return { urls: data.urls.slice(0, 64) };
  })
  .handler(async ({ data }) => {
    const results = await Promise.all(data.urls.map(ping));
    return { results };
  });
