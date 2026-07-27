import { qansSection } from "./qans";
import { programsSection } from "./programs";
import { realtimeSection } from "./realtime";
import { projectsSection } from "./projects";
import { othersSection } from "./others";
import type { Section } from "./types";

export const sections: Section[] = [
  qansSection,
  programsSection,
  realtimeSection,
  projectsSection,
  othersSection,
];

export function getSection(slug: string): Section | undefined {
  return sections.find((s) => s.slug === slug);
}
