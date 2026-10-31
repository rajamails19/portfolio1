import { qansSection } from "./qans";
import type { Section } from "./types";

export const sections: Section[] = [qansSection];

export function getSectionFrom(list: Section[], slug: string): Section | undefined {
  return list.find((s) => s.slug === slug);
}
