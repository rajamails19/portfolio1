import { useCallback, useEffect, useRef, useState } from "react";
import type { ApiResponse, ApiStatus } from "@/lib/api/types";

export interface UseApiResourceState<T> {
  status: ApiStatus;
  data?: T;
  error?: ApiResponse<T>["error"];
  isLoading: boolean;
  isRefreshing: boolean;
  isDisconnected: boolean;
  isEmpty: boolean;
  refetch: () => Promise<void>;
}

/**
 * Generic hook that drives the loading / refreshing / empty / disconnected /
 * error lifecycle for any service call returning `ApiResponse<T>`.
 *
 * Intentionally minimal — sufficient for the prototype, and the API matches
 * what TanStack Query would expose, so future migration is mechanical.
 */
export function useApiResource<T>(
  fetcher: () => Promise<ApiResponse<T>>,
  deps: ReadonlyArray<unknown> = [],
): UseApiResourceState<T> {
  const [status, setStatus] = useState<ApiStatus>("loading");
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<ApiResponse<T>["error"]>();
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const load = useCallback(async (mode: "initial" | "refresh") => {
    setStatus(mode === "initial" ? "loading" : "refreshing");
    try {
      const res = await fetcherRef.current();
      setError(res.error);
      setData(res.data);
      if (res.status === "success" && Array.isArray(res.data) && res.data.length === 0) {
        setStatus("empty");
      } else {
        setStatus(res.status);
      }
    } catch (e) {
      setError({ code: "CLIENT_EXCEPTION", message: e instanceof Error ? e.message : "Unknown error" });
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    void load("initial");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  const refetch = useCallback(() => load("refresh"), [load]);

  return {
    status,
    data,
    error,
    isLoading: status === "loading",
    isRefreshing: status === "refreshing",
    isDisconnected: status === "disconnected",
    isEmpty: status === "empty",
    refetch,
  };
}
