import { useTheme } from "@/themes/ThemeContext";
import { themeKeys, themes } from "@/themes/themes";

export function ThemeSwitcher() {
  const { themeKey, setThemeKey } = useTheme();
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
    </div>
  );
}
