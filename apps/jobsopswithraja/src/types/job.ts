export type JobStatus =
  | "new_match"
  | "saved"
  | "to_apply"
  | "resume_tailored"
  | "applied"
  | "follow_up"
  | "interview"
  | "offer"
  | "rejected"
  | "archived";

export type JobSource =
  | "linkedin"
  | "indeed"
  | "monster"
  | "company_site"
  | "jsearch"
  | "adzuna"
  | "greenhouse"
  | "lever"
  | "ashby";

export type WorkMode = "remote" | "hybrid" | "onsite";
export type EmploymentType = "full_time" | "contract" | "part_time";

export interface BulletRewrite {
  original: string;
  improved: string;
  reason: string;
}

export interface ResumeSuggestions {
  summary?: string;
  bulletRewrites: BulletRewrite[];
  keywordsToAdd: string[];
}

export interface ActivityEvent {
  at: string;
  event: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogoUrl?: string;
  source: JobSource;
  sourceLabel: string;
  location: string;
  workMode: WorkMode;
  employmentType: EmploymentType;
  salaryMin?: number;
  salaryMax?: number;
  currency: string;
  postedAt: string;
  applyUrl: string;
  description: string;
  requiredSkills: string[];
  niceToHaveSkills: string[];
  yearsExperience?: string;
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  status: JobStatus;
  coverLetter?: string;
  resumeSuggestions?: ResumeSuggestions;
  notes?: string;
  appliedAt?: string;
  followUpAt?: string;
  visaSponsorship?: boolean;
  activity: ActivityEvent[];
}

export interface JobFilters {
  search?: string;
  skills?: string[];
  minMatch?: number;
  maxMatch?: number;
  sources?: JobSource[];
  workModes?: WorkMode[];
  minSalary?: number;
  postedWithin?: "24h" | "3d" | "week" | "all";
  sortBy?: "match" | "newest" | "salary";
  fullTimeOnly?: boolean;
  visaOnly?: boolean;
  statuses?: JobStatus[];
}

export interface Profile {
  name: string;
  headline: string;
  email: string;
  avatarUrl?: string;
  targetRoles: string[];
  targetKeywords: string[];
  preferredLocations: string[];
  workModePreference: WorkMode[];
  salaryExpectation: number;
  visaSponsorship: boolean;
  skills: string[];
  resumeFileName?: string;
  baseSummary: string;
  dataSources: DataSourceConfig[];
}

export interface DataSourceConfig {
  source: JobSource;
  label: string;
  connected: boolean;
  requiresApiKey: boolean;
  apiKeyMasked?: string;
  lastSync?: string;
}

export interface Analytics {
  applicationsPerWeek: { week: string; count: number }[];
  funnel: { stage: string; count: number }[];
  responseRate: number;
  interviewsBooked: number;
  bestSources: { source: string; applications: number; interviews: number }[];
  topRequestedSkills: { skill: string; count: number }[];
  mySkillGaps: { skill: string; count: number }[];
  matchDistribution: { bucket: string; count: number }[];
  byWorkMode: { mode: string; count: number }[];
  avgDaysSavedToApplied: number;
}

export const JOB_STATUS_LABEL: Record<JobStatus, string> = {
  new_match: "New Match",
  saved: "Saved",
  to_apply: "To Apply",
  resume_tailored: "Resume Tailored",
  applied: "Applied",
  follow_up: "Follow Up",
  interview: "Interview",
  offer: "Offer",
  rejected: "Rejected",
  archived: "Archived",
};

export const PIPELINE_STATUSES: JobStatus[] = [
  "new_match",
  "saved",
  "to_apply",
  "resume_tailored",
  "applied",
  "follow_up",
  "interview",
  "offer",
  "rejected",
];

export const SOURCE_LABEL: Record<JobSource, string> = {
  linkedin: "LinkedIn",
  indeed: "Indeed",
  monster: "Monster",
  company_site: "Company Site",
  jsearch: "JSearch",
  adzuna: "Adzuna",
  greenhouse: "Greenhouse",
  lever: "Lever",
  ashby: "Ashby",
};
