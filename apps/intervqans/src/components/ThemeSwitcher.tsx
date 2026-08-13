import { Moon, Sun } from "lucide-react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useTheme } from "@/themes/ThemeContext";
import { useAppearance } from "@/themes/AppearanceContext";
import { themeKeys, themes, type ThemeKey } from "@/themes/themes";

// Routes gated to specific themes' content sets.
const RESTRICTED_PATHS: Partial<Record<string, ThemeKey[]>> = {
  "/theory": ["noir", "rocky"],
  "/terms": ["noir"],
};

export function ThemeSwitcher() {
  const { themeKey, setThemeKey } = useTheme();
  const { appearance, toggleAppearance } = useAppearance();
  const { location } = useRouterState();
  const navigate = useNavigate();

  const chooseTheme = async (nextTheme: ThemeKey) => {
    const restriction = Object.entries(RESTRICTED_PATHS).find(([path]) =>
      location.pathname.startsWith(path),
    )?.[1];
    if (restriction && !restriction.includes(nextTheme)) {
      await navigate({ to: "/qans" });
    }
    setThemeKey(nextTheme);
  };

  return (
    <div className="glass-strong fixed right-4 top-4 z-50 flex items-center gap-1 rounded-full p-1 shadow-glow">
      {themeKeys.map((k) => {
        const t = themes[k];
        const active = themeKey === k;
        return (
          <button
            key={k}
            onClick={() => chooseTheme(k)}
            title={`${t.brandName} — ${t.brandKicker}`}
            className={[
              "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all",
              active
                ? "bg-gradient-to-r from-gold to-ember text-primary-foreground shadow-glow"
                : "text-foreground/75 hover:bg-white/10 hover:text-foreground",
            ].join(" ")}
          >
            <span className="text-sm">{t.short}</span>
            <span className="hidden sm:inline">{t.label}</span>
          </button>
        );
      })}
      <span className="mx-0.5 h-4 w-px bg-white/15" aria-hidden />
      <button
        onClick={toggleAppearance}
        title={appearance === "dark" ? "Switch to light appearance" : "Switch to dark appearance"}
        className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-foreground/75 transition-all hover:bg-white/10 hover:text-foreground"
      >
        {appearance === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
        <span className="hidden sm:inline">{appearance === "dark" ? "Light" : "Dark"}</span>
      </button>
    </div>
  );
}
