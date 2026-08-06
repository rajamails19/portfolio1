import { useMemo } from "react";
import { useTheme } from "@/themes/ThemeContext";
import { noirSections, chaatSections, defaultSections, getSectionFrom } from "@/content";
import type { Section } from "@/content/types";

export function useSections(): Section[] {
  const { themeKey } = useTheme();
  return useMemo(() => {
    if (themeKey === "noir") return noirSections;
    if (themeKey === "chaat") return chaatSections;
    return defaultSections;
  }, [themeKey]);
}

export function useSection(slug: string): Section | undefined {
  const sections = useSections();
  return getSectionFrom(sections, slug);
}
