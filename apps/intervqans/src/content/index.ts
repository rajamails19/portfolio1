import { theorySection } from "./theory";
import { qansSection } from "./qans";
import { qansDefaultSection } from "./qans-default";
import { qansChaatSection } from "./qans-chaat";
import { programsSection } from "./programs";
import { realtimeSection } from "./realtime";
import { projectsSection } from "./projects";
import { othersSection } from "./others";
import type { Section } from "./types";

// Noir has its own content (Conceptual Theory + the AI/ML question bank).
// Chaat has its own question bank (Playwright / Selenium / Basics). The
// remaining themes fall back to the original, generic content until each
// one gets its own subject-specific set.
export const noirSections: Section[] = [
  theorySection,
  qansSection,
  programsSection,
  realtimeSection,
  projectsSection,
  othersSection,
];

export const chaatSections: Section[] = [
  qansChaatSection,
  programsSection,
  realtimeSection,
  projectsSection,
  othersSection,
];

export const defaultSections: Section[] = [
  qansDefaultSection,
  programsSection,
  realtimeSection,
  projectsSection,
  othersSection,
];

export function getSectionFrom(sections: Section[], slug: string): Section | undefined {
  return sections.find((s) => s.slug === slug);
}
