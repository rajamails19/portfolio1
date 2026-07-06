/**
 * Base API client. All real HTTP calls flow through here so observability
 * (request ids, correlation ids, retries) lives in one place.
 *
 * Currently a placeholder: no backend is wired yet. When the backend is
 * available, set `API_BASE_URL` and replace `disconnected()` with a real fetch.
 */

import type { ApiResponse } from "./types";
import { notImplemented } from "./types";

export const API_BASE_URL =
  (typeof window !== "undefined" && (window as unknown as { __API_BASE__?: string }).__API_BASE__) ||
  ""; // empty = no backend configured

const newId = (prefix: string) =>
  `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36).slice(-4)}`;

export const newRequestId = () => newId("req");
export const newCorrelationId = () => newId("corr");
export const newSessionId = () => newId("sess");

export interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  signal?: AbortSignal;
  correlationId?: string;
}

/**
 * Issue a typed request. While `API_BASE_URL` is empty this is a typed no-op
 * returning a `disconnected` ApiResponse — every page renders honest empty /
 * disconnected states instead of fake data.
 */
export async function request<T>(
  path: string,
  _options: RequestOptions = {},
): Promise<ApiResponse<T>> {
  if (!API_BASE_URL) {
    return notImplemented<T>(`Endpoint ${path} is not connected.`);
  }

  // TODO: real fetch with retry, abort, auth, OpenTelemetry tracing.
  return notImplemented<T>(`Endpoint ${path} is not implemented yet.`);
}
