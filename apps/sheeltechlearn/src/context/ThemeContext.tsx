import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

export type DeckTheme = "rose" | "chaat" | "tech";
export type AppearanceTheme = "light" | "dark";

type ThemeContextValue = {
  theme: DeckTheme;
  setTheme: (theme: DeckTheme) => void;
  toggle: () => void;
  appearance: AppearanceTheme;
  setAppearance: (appearance: AppearanceTheme) => void;
  toggleAppearance: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<DeckTheme>("rose");
  const [appearance, setAppearanceState] = useState<AppearanceTheme>("light");
  const appearanceInitialized = useRef(false);

  const setTheme = useCallback((nextTheme: DeckTheme) => {
    // Persist immediately so a route change cannot race the effect below.
    window.localStorage.setItem("stage-deck-theme", nextTheme);
    setThemeState(nextTheme);
  }, []);

  const setAppearance = useCallback((nextAppearance: AppearanceTheme) => {
    window.localStorage.setItem("stage-deck-appearance", nextAppearance);
    setAppearanceState(nextAppearance);
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

  useEffect(() => {
    const root = document.documentElement;

    if (!appearanceInitialized.current) {
      appearanceInitialized.current = true;
      const storedAppearance = window.localStorage.getItem("stage-deck-appearance");
      const initialAppearance = storedAppearance === "dark" ? "dark" : "light";
      root.classList.toggle("appearance-dark", initialAppearance === "dark");
      root.style.colorScheme = initialAppearance;
      if (initialAppearance !== appearance) setAppearanceState(initialAppearance);
      return;
    }

    root.classList.toggle("appearance-dark", appearance === "dark");
    root.style.colorScheme = appearance;
    window.localStorage.setItem("stage-deck-appearance", appearance);
  }, [appearance]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      toggle: () => setTheme(theme === "rose" ? "chaat" : "rose"),
      appearance,
      setAppearance,
      toggleAppearance: () => setAppearance(appearance === "dark" ? "light" : "dark"),
    }),
    [appearance, setAppearance, setTheme, theme],
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
