import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "studydeck:noir:random-inputs:v1";
const CHANGE_EVENT = "studydeck:random-inputs-changed";

export type RandomInput = {
  id: string;
  text: string;
  createdAt: string;
};

function readInputs(): RandomInput[] {
  if (typeof window === "undefined") return [];

  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]") as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (entry): entry is RandomInput =>
        typeof entry === "object" &&
        entry !== null &&
        typeof entry.id === "string" &&
        typeof entry.text === "string" &&
        typeof entry.createdAt === "string",
    );
  } catch {
    return [];
  }
}

function writeInputs(inputs: RandomInput[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(inputs));
  } catch {
    // Keep the in-memory experience working if storage is unavailable.
  }
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: inputs }));
}

export function useRandomInputs() {
  const [inputs, setInputs] = useState<RandomInput[]>([]);

  useEffect(() => {
    setInputs(readInputs());

    const syncStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) setInputs(readInputs());
    };
    const syncCurrentWindow = (event: Event) => {
      const detail = (event as CustomEvent<RandomInput[]>).detail;
      setInputs(Array.isArray(detail) ? detail : readInputs());
    };
    window.addEventListener("storage", syncStorage);
    window.addEventListener(CHANGE_EVENT, syncCurrentWindow);
    return () => {
      window.removeEventListener("storage", syncStorage);
      window.removeEventListener(CHANGE_EVENT, syncCurrentWindow);
    };
  }, []);

  const addInput = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const current = readInputs();
    const entry: RandomInput = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      text,
      createdAt: new Date().toISOString(),
    };
    writeInputs([...current, entry]);
  }, []);

  const removeInput = useCallback((id: string) => {
    writeInputs(readInputs().filter((entry) => entry.id !== id));
  }, []);

  return { inputs, addInput, removeInput };
}
