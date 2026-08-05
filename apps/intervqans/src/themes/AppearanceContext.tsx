import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Appearance = "dark" | "light";

interface AppearanceCtx {
  appearance: Appearance;
  toggleAppearance: () => void;
}

const Ctx = createContext<AppearanceCtx | null>(null);

const STORAGE_KEY = "studydeck.appearance";

export function AppearanceProvider({ children }: { children: ReactNode }) {
  const [appearance, setAppearance] = useState<Appearance>("dark");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Appearance | null;
      if (stored === "light" || stored === "dark") setAppearance(stored);
    } catch (error) {
      console.warn("Failed to read appearance from localStorage", error);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-appearance", appearance);
    }
  }, [appearance]);

  const toggleAppearance = () => {
    setAppearance((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch (error) {
        console.warn("Failed to save appearance to localStorage", error);
      }
      return next;
    });
  };

  return <Ctx.Provider value={{ appearance, toggleAppearance }}>{children}</Ctx.Provider>;
}

export function useAppearance() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAppearance must be used inside AppearanceProvider");
  return v;
}
