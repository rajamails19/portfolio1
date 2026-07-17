import type { Job, JobSource, JobStatus, WorkMode } from "@/types/job";
import { SOURCE_LABEL } from "@/types/job";

// Deterministic seeded PRNG (mulberry32). Same output every reload.
function makeRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6D2B79F5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const now = Date.now();
const daysAgo = (d: number) => new Date(now - d * 24 * 60 * 60 * 1000).toISOString();
const hoursAgo = (h: number) => new Date(now - h * 60 * 60 * 1000).toISOString();

const companies = [
  "Linear", "Vercel", "Stripe", "Notion", "Figma", "Ramp", "Retool", "Anthropic",
  "OpenAI", "Perplexity", "Cursor", "Supabase", "PlanetScale", "Neon", "Airtable",
  "Loom", "Framer", "Arc", "Raycast", "Warp", "Modal", "Replicate", "Hex",
  "Mercury", "Brex", "Plaid", "Airbnb", "Shopify", "Cloudflare", "Datadog",
  "Snowflake", "Databricks", "MongoDB", "HashiCorp", "GitLab", "Postman",
  "Zapier", "Webflow", "Contentful", "Sanity", "Scale AI", "Hugging Face",
  "LangChain", "Mistral", "Runway", "ElevenLabs",
];

const roles = [
  "Senior Full-Stack Engineer", "Staff Software Engineer", "AI Product Engineer",
  "Senior AI Engineer", "Full-Stack Engineer", "Senior Frontend Engineer",
  "Platform Engineer", "Senior Software Engineer", "Frontend Platform Engineer",
  "Product Engineer", "Senior React Engineer", "Applied AI Engineer",
  "ML Platform Engineer", "Growth Engineer", "Backend Engineer",
];

const locations = [
  "San Francisco, CA", "New York, NY", "Remote (US)", "Remote (Global)",
  "Seattle, WA", "Austin, TX", "Boston, MA", "London, UK", "Berlin, DE",
  "Toronto, CA", "Amsterdam, NL",
];

const sources: JobSource[] = [
  "linkedin", "indeed", "monster", "company_site", "greenhouse",
  "lever", "ashby", "adzuna", "jsearch",
];

const workModes: WorkMode[] = ["remote", "hybrid", "onsite"];

const allSkills = [
  "React", "TypeScript", "Next.js", "Node.js", "GraphQL", "PostgreSQL",
  "AWS", "Tailwind", "Python", "OpenAI API", "Supabase", "Docker", "CI/CD",
  "Redis", "Kubernetes", "Rust", "Go", "tRPC", "Prisma", "Vite",
  "LangChain", "Vector DBs", "RAG", "LLM Ops",
];

const mySkills = new Set([
  "React", "TypeScript", "Next.js", "Node.js", "Tailwind", "PostgreSQL",
  "GraphQL", "AWS", "Supabase", "OpenAI API", "Docker", "Python",
  "LangChain", "RAG",
]);

function pick<T>(arr: T[], n: number, rng: () => number): T[] {
  const out: T[] = [];
  const copy = [...arr];
  for (let i = 0; i < n && copy.length; i++) {
    out.push(copy.splice(Math.floor(rng() * copy.length), 1)[0]);
  }
  return out;
}

// Deterministic status plan (46 slots), applied AFTER sorting by matchScore desc.
// Guarantees 8 to_apply, 5 resume_tailored, plus a healthy pipeline.
const STATUS_PLAN: JobStatus[] = [
  "offer",
  "interview", "interview",
  "resume_tailored", "resume_tailored", "resume_tailored", "resume_tailored", "resume_tailored",
  "to_apply", "to_apply", "to_apply", "to_apply", "to_apply", "to_apply", "to_apply", "to_apply",
  "applied", "applied", "applied", "applied", "applied", "applied",
  "follow_up", "follow_up", "follow_up",
  "saved", "saved", "saved", "saved", "saved",
  "new_match", "new_match", "new_match", "new_match", "new_match",
  "new_match", "new_match", "new_match", "new_match", "new_match",
  "rejected", "rejected", "rejected",
  "archived", "archived",
  "new_match",
];

function coverLetterFor(job: Partial<Job>): string {
  return `Hi ${job.company} team,

I'm Raja — reaching out about the ${job.title} role. Over the last several years I've shipped production ${job.requiredSkills?.slice(0, 3).join(", ")} systems that map closely to what you're building, from AI-assisted product surfaces to performance-critical UI used by tens of thousands of users daily.

What draws me to ${job.company} is your focus on craft and velocity. I'd love to bring the same discipline to your team: fast iteration, strong systems thinking, and a bias toward shipping.

Happy to walk through relevant work whenever you have time.

Best,
Raja`;
}

interface DraftJob extends Omit<Job, "status" | "activity" | "appliedAt" | "followUpAt" | "notes" | "coverLetter" | "resumeSuggestions"> {}

function makeJob(i: number): DraftJob {
  const rng = makeRng(1000 + i * 97);
  const company = companies[i % companies.length];
  const title = roles[Math.floor(rng() * roles.length)];
  const source = sources[Math.floor(rng() * sources.length)];
  const location = locations[Math.floor(rng() * locations.length)];
  const workMode: WorkMode = location.includes("Remote") ? "remote" : workModes[Math.floor(rng() * workModes.length)];
  const required = pick(allSkills, 4 + Math.floor(rng() * 3), rng);
  const nice = pick(allSkills.filter((s) => !required.includes(s)), 2 + Math.floor(rng() * 2), rng);
  const matched = required.filter((s) => mySkills.has(s));
  const missing = required.filter((s) => !mySkills.has(s));
  const matchScore = Math.min(
    98,
    Math.max(35, Math.round((matched.length / required.length) * 65 + rng() * 33)),
  );
  const salaryMin = 130 + Math.floor(rng() * 80);
  const salaryMax = salaryMin + 30 + Math.floor(rng() * 80);
  const postedHoursAgo = Math.floor(rng() * 14 * 24);

  return {
    id: `job_${i + 1}`,
    title,
    company,
    source,
    sourceLabel: SOURCE_LABEL[source],
    location,
    workMode,
    employmentType: "full_time",
    salaryMin: salaryMin * 1000,
    salaryMax: salaryMax * 1000,
    currency: "USD",
    postedAt: postedHoursAgo < 24 ? hoursAgo(postedHoursAgo) : daysAgo(Math.floor(postedHoursAgo / 24)),
    applyUrl: `https://example.com/apply/${i + 1}`,
    description: `We're looking for a ${title} to join ${company}. You'll partner closely with design and product to ship polished, high-performance experiences.

**What you'll do**
- Own significant surfaces end-to-end across our web application
- Architect and evolve a ${required[0]} / ${required[1] ?? "TypeScript"} codebase used by our fastest-growing customers
- Collaborate with a small, senior team to raise the quality bar

**About you**
- Deep experience with ${required.slice(0, 3).join(", ")}
- Strong product sense and a bias toward shipping
- You care about craft — animations, accessibility, and the small details`,
    requiredSkills: required,
    niceToHaveSkills: nice,
    yearsExperience: `${3 + (i % 5)}+ years`,
    matchScore,
    matchedSkills: matched,
    missingSkills: missing,
    visaSponsorship: i % 3 === 0,
  };
}

// Build drafts, sort by match desc, assign status plan, then finalize.
const drafts = Array.from({ length: 46 }, (_, i) => makeJob(i));
drafts.sort((a, b) => b.matchScore - a.matchScore);

export const mockJobs: Job[] = drafts.map((d, i) => {
  const status = STATUS_PLAN[i] ?? "new_match";
  const applied = ["applied", "follow_up", "interview", "offer", "rejected"].includes(status);
  const appliedDaysAgo = 2 + (i % 12);
  const job: Job = {
    ...d,
    status,
    activity: [
      { at: daysAgo(1), event: "Job discovered via " + d.sourceLabel },
      ...(applied ? [{ at: daysAgo(appliedDaysAgo), event: "Application submitted" }] : []),
      ...(status === "interview" ? [{ at: daysAgo(1), event: "Interview scheduled" }] : []),
      ...(status === "offer" ? [{ at: daysAgo(1), event: "Offer extended 🎉" }] : []),
    ],
    appliedAt: applied ? daysAgo(appliedDaysAgo) : undefined,
    followUpAt:
      status === "applied" || status === "follow_up"
        ? daysAgo(-((i % 5) - 2))
        : undefined,
    notes: applied ? "Recruiter mentioned they're moving fast — worth a nudge." : "",
  };

  job.coverLetter = coverLetterFor(job);
  job.resumeSuggestions = {
    summary: `Product-minded senior engineer with ${job.yearsExperience} shipping ${job.requiredSkills.slice(0, 3).join(", ")} at scale. Track record of leading UI architecture and partnering deeply with design.`,
    bulletRewrites: [
      {
        original: "Built dashboard for internal tool",
        improved: `Architected a ${job.requiredSkills[0]} + ${job.requiredSkills[1] ?? "TypeScript"} dashboard used by 40+ teams, reducing time-to-insight by 62%`,
        reason: `Adds impact metric and pulls in the top required stack (${job.requiredSkills[0]})`,
      },
      {
        original: "Worked on performance improvements",
        improved: `Cut p95 render time from 480ms → 90ms via ${job.requiredSkills.includes("React") ? "React Server Components + streaming" : "targeted rendering pipeline rewrites"}`,
        reason: "Replaces vague verb with quantified outcome",
      },
      {
        original: "Helped ship AI features",
        improved: `Shipped a ${job.requiredSkills.includes("OpenAI API") ? "GPT-powered" : "LLM-backed"} assistant used by 12k weekly users, cutting support volume 34%`,
        reason: "Adds AI keyword + measurable business impact",
      },
    ],
    keywordsToAdd: job.missingSkills.length ? job.missingSkills : job.niceToHaveSkills,
  };
  return job;
});
