import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type DeckTheme = "rose" | "chaat" | "tech";

type ThemeContextValue = {
  theme: DeckTheme;
  setTheme: (theme: DeckTheme) => void;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<DeckTheme>("rose");

  const setTheme = useCallback((nextTheme: DeckTheme) => {
    // Persist immediately so a route change cannot race the effect below.
    window.localStorage.setItem("stage-deck-theme", nextTheme);
    setThemeState(nextTheme);
  }, []);

  useEffect(() => {
    const stored = window.localStorage.getItem("stage-deck-theme");
    if (stored === "chaat" || stored === "rose" || stored === "tech") {
      setThemeState(stored);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("theme-chaat", theme === "chaat");
    root.classList.toggle("theme-rose", theme === "rose");
    root.classList.toggle("theme-tech", theme === "tech");
    window.localStorage.setItem("stage-deck-theme", theme);
  }, [theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      toggle: () => setTheme(theme === "rose" ? "chaat" : "rose"),
    }),
    [setTheme, theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
