import { getSupabaseClient } from "./supabase";

const VISITOR_KEY = "mathdreams.visitor-id";
const SESSION_KEY = "mathdreams.session-id";
let fallbackVisitorId: string | undefined;
let fallbackSessionId: string | undefined;

function newId() {
  return crypto.randomUUID();
}

function getOrCreateId(storage: Storage, key: string, fallback: "visitor" | "session") {
  try {
    const existing = storage.getItem(key);
    if (existing) return existing;
    const id = newId();
    storage.setItem(key, id);
    return id;
  } catch {
    if (fallback === "visitor") return (fallbackVisitorId ??= newId());
    return (fallbackSessionId ??= newId());
  }
}

export function getAnalyticsIds() {
  if (typeof window === "undefined") return null;
  return {
    visitorId: getOrCreateId(window.localStorage, VISITOR_KEY, "visitor"),
    sessionId: getOrCreateId(window.sessionStorage, SESSION_KEY, "session"),
  };
}

export async function trackEvent(
  eventName: string,
  options: {
    path?: string;
    durationSeconds?: number;
    metadata?: Record<string, string | number | boolean | null>;
  } = {},
) {
  const client = getSupabaseClient();
  const ids = getAnalyticsIds();
  if (!client || !ids) return;

  const { error } = await client.from("mathraja_events").insert({
    event_name: eventName,
    visitor_id: ids.visitorId,
    session_id: ids.sessionId,
    path: options.path ?? window.location.pathname,
    duration_seconds: options.durationSeconds ?? null,
    metadata: options.metadata ?? {},
  });

  if (error && import.meta.env.DEV) {
    console.warn("MathDreams analytics event was not saved:", error.message);
  }
}
