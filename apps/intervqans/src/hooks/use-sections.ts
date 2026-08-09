import { useMemo } from "react";
import { useTheme } from "@/themes/ThemeContext";
import { noirSections, chaatSections, fifaSections, defaultSections, getSectionFrom } from "@/content";
import type { Section } from "@/content/types";

export function useSections(): Section[] {
  const { themeKey } = useTheme();
  return useMemo(() => {
    if (themeKey === "noir") return noirSections;
    if (themeKey === "chaat") return chaatSections;
    if (themeKey === "fifa") return fifaSections;
    return defaultSections;
  }, [themeKey]);
}

export function useSection(slug: string): Section | undefined {
  const sections = useSections();
  return getSectionFrom(sections, slug);
}
