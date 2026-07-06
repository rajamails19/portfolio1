/**
 * Transport-level types for every API service call.
 *
 * Backend status: NOT IMPLEMENTED. Every service currently returns a
 * `disconnected` ApiResponse. Wire real backends in `src/lib/api/client.ts`.
 */

import type { ObservabilityContext } from "@/types/models";

export type ApiStatus =
  | "idle"
  | "loading"
  | "refreshing"
  | "success"
  | "empty"
  | "disconnected"
  | "error"
  | "unauthorized"
  | "first_time_setup";

export interface ApiError {
  code: string;
  message: string;
  status?: number;
  cause?: unknown;
}

export interface ApiResponse<T> {
  status: ApiStatus;
  data?: T;
  error?: ApiError;
  observability?: Partial<ObservabilityContext>;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    hasMore: boolean;
  };
}

export const notImplemented = <T>(hint?: string): ApiResponse<T> => ({
  status: "disconnected",
  error: {
    code: "BACKEND_NOT_CONNECTED",
    message: hint ?? "Backend service is not connected yet.",
  },
});
