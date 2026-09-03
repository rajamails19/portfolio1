import { theorySection } from "./theory";
import { storySection } from "./story-noir";
import { qansSection } from "./qans";
import { qansDefaultSection } from "./qans-default";
import { qansChaatSection } from "./qans-chaat";
import { qansFifaSection } from "./qans-fifa";
import { qansRockySection } from "./qans-rocky";
import { theoryRockySection } from "./theory-rocky";
import { programsSection } from "./programs";
import { programsNoirSection } from "./programs-noir";
import { programsChaatSection } from "./programs-chaat";
import { realtimeSection } from "./realtime";
import { realtimeNoirSection } from "./realtime-noir";
import { projectsSection } from "./projects";
import { othersSection } from "./others";
import type { Section } from "./types";

// Noir has its own content (Conceptual Theory + the AI/ML question bank).
// Chaat has its own question bank (Playwright / Selenium / Basics). Fifa has
// its own question bank (React / Java / Angular). Rocky has its own question
// bank (Data Analysis). defaultSections is now unused by any theme but kept
// as a safe fallback.
export const noirSections: Section[] = [
  theorySection,
  storySection,
  qansSection,
  programsNoirSection,
  realtimeNoirSection,
  projectsSection,
  othersSection,
];

export const chaatSections: Section[] = [
  qansChaatSection,
  programsChaatSection,
  realtimeSection,
  projectsSection,
  othersSection,
];

export const fifaSections: Section[] = [
  qansFifaSection,
  programsSection,
  realtimeSection,
  projectsSection,
  othersSection,
];

export const rockySections: Section[] = [
  theoryRockySection,
  qansRockySection,
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
