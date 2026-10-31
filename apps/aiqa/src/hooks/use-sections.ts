import { sections, getSectionFrom } from "@/content";
import type { Section } from "@/content/types";

export function useSections(): Section[] {
  return sections;
}

export function useSection(slug: string): Section | undefined {
  return getSectionFrom(sections, slug);
}
