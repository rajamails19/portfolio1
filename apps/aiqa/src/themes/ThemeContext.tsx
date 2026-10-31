import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { themes, type ThemeDef, type ThemeKey } from "./themes";

interface ThemeCtx {
  themeKey: ThemeKey;
  setThemeKey: (k: ThemeKey) => void;
  theme: ThemeDef;
}

const Ctx = createContext<ThemeCtx | null>(null);

const STORAGE_KEY = "studydeck.theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeKey, setThemeKeyState] = useState<ThemeKey>("noir");

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", themeKey);
    }
  }, [themeKey]);

  const setThemeKey = (k: ThemeKey) => {
    setThemeKeyState(k);
    try {
      window.localStorage.setItem(STORAGE_KEY, k);
    } catch (error) {
      console.warn("Failed to save theme to localStorage", error);
    }
  };

  return (
    <Ctx.Provider value={{ themeKey, setThemeKey, theme: themes[themeKey] }}>
      {children}
    </Ctx.Provider>
  );
}

export function useTheme() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useTheme must be used inside ThemeProvider");
  return v;
}
