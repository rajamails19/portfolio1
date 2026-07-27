import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type DeckTheme = "rose" | "chaat";

interface ThemeCtx {
  theme: DeckTheme;
  setTheme: (t: DeckTheme) => void;
  toggle: () => void;
}

const Ctx = createContext<ThemeCtx>({ theme: "rose", setTheme: () => {}, toggle: () => {} });

const STORAGE_KEY = "stagedeck-theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<DeckTheme>("rose");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as DeckTheme | null;
      if (stored === "chaat" || stored === "rose") setThemeState(stored);
    } catch {}
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("theme-chaat", theme === "chaat");
    root.classList.toggle("theme-rose", theme === "rose");
    try { localStorage.setItem(STORAGE_KEY, theme); } catch {}
  }, [theme]);

  const setTheme = (t: DeckTheme) => setThemeState(t);
  const toggle = () => setThemeState((t) => (t === "rose" ? "chaat" : "rose"));

  return <Ctx.Provider value={{ theme, setTheme, toggle }}>{children}</Ctx.Provider>;
}

export function useTheme() {
  return useContext(Ctx);
}
