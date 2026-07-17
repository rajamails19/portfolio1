import type {
  Analytics,
  Job,
  JobFilters,
  JobStatus,
  Profile,
  ResumeSuggestions,
} from "@/types/job";
import { mockJobs } from "./mock/jobs";
import { mockProfile } from "./mock/profile";

// In-memory store simulating a backend. Components must NOT import mocks directly.
let jobs: Job[] = mockJobs.map((j) => ({ ...j }));
let profile: Profile = { ...mockProfile };

const delay = (ms = 180) => new Promise((r) => setTimeout(r, ms));

function withinPosted(iso: string, window: JobFilters["postedWithin"]) {
  if (!window || window === "all") return true;
  const hrs = (Date.now() - new Date(iso).getTime()) / 36e5;
  if (window === "24h") return hrs <= 24;
  if (window === "3d") return hrs <= 72;
  if (window === "week") return hrs <= 24 * 7;
  return true;
}

export async function getJobs(filters: JobFilters = {}): Promise<Job[]> {
  await delay();
  let list = [...jobs];
  const f = filters;
  if (f.search) {
    const q = f.search.toLowerCase();
    list = list.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.requiredSkills.some((s) => s.toLowerCase().includes(q)),
    );
  }
  if (f.skills?.length) {
    list = list.filter((j) => f.skills!.every((s) => j.requiredSkills.includes(s)));
  }
  if (typeof f.minMatch === "number") list = list.filter((j) => j.matchScore >= f.minMatch!);
  if (typeof f.maxMatch === "number") list = list.filter((j) => j.matchScore <= f.maxMatch!);
  if (f.sources?.length) list = list.filter((j) => f.sources!.includes(j.source));
  if (f.workModes?.length) list = list.filter((j) => f.workModes!.includes(j.workMode));
  if (typeof f.minSalary === "number")
    list = list.filter((j) => (j.salaryMax ?? j.salaryMin ?? 0) >= f.minSalary!);
  list = list.filter((j) => withinPosted(j.postedAt, f.postedWithin));
  if (f.fullTimeOnly) list = list.filter((j) => j.employmentType === "full_time");
  if (f.visaOnly) list = list.filter((j) => j.visaSponsorship);
  if (f.statuses?.length) list = list.filter((j) => f.statuses!.includes(j.status));

  const sortBy = f.sortBy ?? "match";
  list.sort((a, b) => {
    if (sortBy === "match") return b.matchScore - a.matchScore;
    if (sortBy === "newest")
      return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
    if (sortBy === "salary") return (b.salaryMax ?? 0) - (a.salaryMax ?? 0);
    return 0;
  });
  return list;
}

export async function getJob(id: string): Promise<Job | null> {
  await delay(80);
  return jobs.find((j) => j.id === id) ?? null;
}

export async function updateJobStatus(id: string, status: JobStatus): Promise<Job> {
  await delay(120);
  jobs = jobs.map((j) =>
    j.id === id
      ? {
          ...j,
          status,
          appliedAt: status === "applied" && !j.appliedAt ? new Date().toISOString() : j.appliedAt,
          activity: [
            { at: new Date().toISOString(), event: `Moved to ${status.replace("_", " ")}` },
            ...j.activity,
          ],
        }
      : j,
  );
  return jobs.find((j) => j.id === id)!;
}

export async function updateJobNotes(id: string, notes: string): Promise<Job> {
  await delay(60);
  jobs = jobs.map((j) => (j.id === id ? { ...j, notes } : j));
  return jobs.find((j) => j.id === id)!;
}

export async function generateCoverLetter(id: string): Promise<string> {
  await delay(650);
  const j = jobs.find((x) => x.id === id);
  if (!j) throw new Error("Not found");
  const letter = `Hi ${j.company} team,

The ${j.title} posting caught my eye — the combination of ${j.requiredSkills.slice(0, 2).join(" + ")} work and your product velocity is exactly where I want to spend the next few years.

At my current role I ship ${j.requiredSkills.slice(0, 3).join(", ")} systems in production, own architecture end-to-end, and pair closely with design. Recent wins include a rewrite that cut initial load 3× and a component system now used across the org.

Would love to compare notes.

Raja`;
  jobs = jobs.map((x) => (x.id === id ? { ...x, coverLetter: letter } : x));
  return letter;
}

export async function generateResumeSuggestions(id: string): Promise<ResumeSuggestions> {
  await delay(700);
  const j = jobs.find((x) => x.id === id)!;
  const suggestions: ResumeSuggestions = {
    summary: `Senior engineer specializing in ${j.requiredSkills.slice(0, 3).join(", ")}. ${j.yearsExperience} of shipping polished, performant product surfaces.`,
    bulletRewrites: [
      {
        original: "Improved app performance",
        improved: `Reduced p95 interaction latency 80% by rearchitecting the ${j.requiredSkills[0]} render pipeline`,
        reason: "Quantifies impact and names the exact stack the role asks for",
      },
      {
        original: "Led team of engineers",
        improved: `Led a team of 4 engineers shipping ${j.requiredSkills.slice(0, 2).join(" / ")} platform features used by 50k+ weekly active users`,
        reason: "Adds scope, scale, and matched keywords",
      },
      {
        original: "Worked on internal tools",
        improved: `Built a ${j.requiredSkills[1] ?? "TypeScript"} internal platform that cut engineering onboarding from 2 weeks to 3 days`,
        reason: "Turns a vague action into a measurable outcome",
      },
    ],
    keywordsToAdd: j.missingSkills.length ? j.missingSkills : j.niceToHaveSkills,
  };
  jobs = jobs.map((x) => (x.id === id ? { ...x, resumeSuggestions: suggestions } : x));
  return suggestions;
}

export async function getProfile(): Promise<Profile> {
  await delay(80);
  return profile;
}

export async function updateProfile(patch: Partial<Profile>): Promise<Profile> {
  await delay(120);
  profile = { ...profile, ...patch };
  return profile;
}

export async function getAnalytics(): Promise<Analytics> {
  await delay(180);
  const applied = jobs.filter((j) => j.appliedAt);
  const interviews = jobs.filter((j) => j.status === "interview" || j.status === "offer");
  const offers = jobs.filter((j) => j.status === "offer");

  const bySource: Record<string, { applications: number; interviews: number }> = {};
  applied.forEach((j) => {
    bySource[j.sourceLabel] ??= { applications: 0, interviews: 0 };
    bySource[j.sourceLabel].applications++;
    if (j.status === "interview" || j.status === "offer") bySource[j.sourceLabel].interviews++;
  });

  const skillCounts: Record<string, number> = {};
  jobs.forEach((j) => j.requiredSkills.forEach((s) => (skillCounts[s] = (skillCounts[s] ?? 0) + 1)));

  const gapCounts: Record<string, number> = {};
  jobs.forEach((j) => j.missingSkills.forEach((s) => (gapCounts[s] = (gapCounts[s] ?? 0) + 1)));

  const buckets = { "35-49": 0, "50-64": 0, "65-79": 0, "80-89": 0, "90-100": 0 };
  jobs.forEach((j) => {
    if (j.matchScore < 50) buckets["35-49"]++;
    else if (j.matchScore < 65) buckets["50-64"]++;
    else if (j.matchScore < 80) buckets["65-79"]++;
    else if (j.matchScore < 90) buckets["80-89"]++;
    else buckets["90-100"]++;
  });

  const byMode: Record<string, number> = { remote: 0, hybrid: 0, onsite: 0 };
  jobs.forEach((j) => byMode[j.workMode]++);

  return {
    applicationsPerWeek: [
      { week: "W-5", count: 3 },
      { week: "W-4", count: 6 },
      { week: "W-3", count: 4 },
      { week: "W-2", count: 8 },
      { week: "W-1", count: 11 },
      { week: "This", count: applied.length },
    ],
    funnel: [
      { stage: "Applied", count: applied.length },
      { stage: "Interview", count: interviews.length },
      { stage: "Offer", count: offers.length },
    ],
    responseRate: applied.length ? Math.round((interviews.length / applied.length) * 100) : 0,
    interviewsBooked: interviews.length,
    bestSources: Object.entries(bySource)
      .map(([source, v]) => ({ source, ...v }))
      .sort((a, b) => b.applications - a.applications),
    topRequestedSkills: Object.entries(skillCounts)
      .map(([skill, count]) => ({ skill, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10),
    mySkillGaps: Object.entries(gapCounts)
      .map(([skill, count]) => ({ skill, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8),
    matchDistribution: Object.entries(buckets).map(([bucket, count]) => ({ bucket, count })),
    byWorkMode: Object.entries(byMode).map(([mode, count]) => ({ mode, count })),
    avgDaysSavedToApplied: 2.4,
  };
}
