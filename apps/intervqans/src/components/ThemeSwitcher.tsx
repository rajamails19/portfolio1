import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/themes/ThemeContext";
import { useAppearance } from "@/themes/AppearanceContext";
import { themeKeys, themes } from "@/themes/themes";

export function ThemeSwitcher() {
  const { themeKey, setThemeKey } = useTheme();
  const { appearance, toggleAppearance } = useAppearance();
  return (
    <div className="glass-strong fixed right-4 top-4 z-50 flex items-center gap-1 rounded-full p-1 shadow-glow">
      {themeKeys.map((k) => {
        const t = themes[k];
        const active = themeKey === k;
        return (
          <button
            key={k}
            onClick={() => setThemeKey(k)}
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
        {appearance === "dark" ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
        <span className="hidden sm:inline">{appearance === "dark" ? "Dark" : "Light"}</span>
      </button>
    </div>
  );
}
