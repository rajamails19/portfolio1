import type { Profile } from "@/types/job";

export const mockProfile: Profile = {
  name: "Raja",
  headline: "Senior Full-Stack / AI Product Engineer",
  email: "raja@example.dev",
  targetRoles: [
    "Senior Full-Stack Engineer",
    "AI Product Engineer",
    "Senior AI Engineer",
    "Staff Software Engineer",
  ],
  targetKeywords: ["React", "Next.js", "TypeScript", "Python", "LangChain", "RAG", "OpenAI API"],
  preferredLocations: ["Remote (US)", "Remote (Global)", "New York, NY", "San Francisco, CA"],
  workModePreference: ["remote", "hybrid"],
  salaryExpectation: 195000,
  visaSponsorship: false,
  skills: [
    "React", "TypeScript", "Next.js", "Node.js", "Tailwind", "PostgreSQL",
    "GraphQL", "AWS", "Supabase", "OpenAI API", "Docker", "Python",
    "LangChain", "RAG",
  ],
  resumeFileName: "raja-resume.pdf",
  baseSummary:
    "Product-minded senior engineer with 7+ years shipping polished React, TypeScript, and Python systems. Currently focused on AI product surfaces — LLM apps, RAG pipelines, and agent tooling. I lead UI architecture, partner deeply with design, and care about performance, accessibility, and details.",
  dataSources: [
    { source: "linkedin", label: "LinkedIn", connected: true, requiresApiKey: false, lastSync: "2h ago" },
    { source: "indeed", label: "Indeed", connected: true, requiresApiKey: false, lastSync: "4h ago" },
    { source: "monster", label: "Monster", connected: false, requiresApiKey: false },
    { source: "company_site", label: "Company Sites", connected: true, requiresApiKey: false, lastSync: "1h ago" },
    { source: "greenhouse", label: "Greenhouse", connected: true, requiresApiKey: true, apiKeyMasked: "gh_live_••••••3f2c", lastSync: "1h ago" },
    { source: "lever", label: "Lever", connected: true, requiresApiKey: true, apiKeyMasked: "lv_••••••a91d", lastSync: "3h ago" },
    { source: "ashby", label: "Ashby", connected: false, requiresApiKey: true },
    { source: "adzuna", label: "Adzuna", connected: false, requiresApiKey: true },
    { source: "jsearch", label: "JSearch", connected: false, requiresApiKey: true },
  ],
};
