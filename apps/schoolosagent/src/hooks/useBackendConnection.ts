import { useEffect, useState } from "react";
import { HealthService } from "@/services";
import type { BackendStatus } from "@/types/models";

/**
 * App-wide backend connection status. While no backend is wired we report
 * "disconnected" — pages consult this to render Connect / Disconnected UI.
 */
export function useBackendConnection(): { status: BackendStatus; checkedAt: string } {
  const [state, setState] = useState<{ status: BackendStatus; checkedAt: string }>({
    status: "connecting",
    checkedAt: new Date().toISOString(),
  });

  useEffect(() => {
    let cancelled = false;
    HealthService.check().then((res) => {
      if (cancelled) return;
      const status: BackendStatus =
        res.status === "success" ? res.data?.status ?? "connected" : "disconnected";
      setState({ status, checkedAt: new Date().toISOString() });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
