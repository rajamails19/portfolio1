import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getAnalytics } from "@/lib/api";
import {
  Bar, BarChart, CartesianGrid, Cell, Funnel, FunnelChart, LabelList, PieChart, Pie,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";

export const Route = createFileRoute("/_shell/analytics")({
  component: AnalyticsPage,
});

const brand = "var(--brand)";
const cyan = "var(--cyan-accent)";
const emerald = "var(--emerald-accent)";
const amber = "var(--amber-accent)";
const rose = "var(--rose-accent)";

function Card({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-border bg-card p-4 ${className}`}>
      <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">{title}</h3>
      {children}
    </div>
  );
}

function AnalyticsPage() {
  const { data } = useQuery({ queryKey: ["analytics"], queryFn: getAnalytics });
  if (!data) return <div className="p-10 text-muted-foreground text-sm">Loading…</div>;

  return (
    <div className="px-6 pt-5 pb-10 space-y-4">
      <div>
        <h1 className="font-display text-[22px] font-semibold tracking-tight">Analytics</h1>
        <p className="text-[13px] text-muted-foreground">Where your effort is landing.</p>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        {[
          { label: "Response rate", value: `${data.responseRate}%`, tone: "text-emerald-accent" },
          { label: "Interviews booked", value: data.interviewsBooked, tone: "text-cyan-accent" },
          { label: "Applied total", value: data.applicationsPerWeek.reduce((a, b) => a + b.count, 0), tone: "text-foreground" },
          { label: "Avg saved → applied", value: `${data.avgDaysSavedToApplied}d`, tone: "text-brand" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-4">
            <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{s.label}</div>
            <div className={`mt-1 tabular font-display text-2xl font-semibold ${s.tone}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        <Card title="Applications per week" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data.applicationsPerWeek}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
              <YAxis tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="count" fill={brand} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Funnel">
          <ResponsiveContainer width="100%" height={220}>
            <FunnelChart>
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
              <Funnel data={data.funnel} dataKey="count" nameKey="stage" isAnimationActive>
                {[brand, cyan, emerald].map((c, i) => <Cell key={i} fill={c} />)}
                <LabelList position="right" fill="var(--foreground)" style={{ fontSize: 11 }} dataKey="stage" />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Best performing sources" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data.bestSources} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
              <YAxis dataKey="source" type="category" tick={{ fontSize: 11 }} width={80} stroke="var(--muted-foreground)" />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="applications" fill={brand} radius={[0, 6, 6, 0]} />
              <Bar dataKey="interviews" fill={cyan} radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Match distribution">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data.matchDistribution}>
              <XAxis dataKey="bucket" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
              <YAxis tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {data.matchDistribution.map((d, i) => (
                  <Cell key={i} fill={d.bucket === "35-49" ? rose : d.bucket === "50-64" ? rose : d.bucket === "65-79" ? amber : emerald} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Most requested skills">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data.topRequestedSkills} layout="vertical">
              <XAxis type="number" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
              <YAxis dataKey="skill" type="category" tick={{ fontSize: 11 }} width={90} stroke="var(--muted-foreground)" />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="count" fill={brand} radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="My skill gaps">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data.mySkillGaps} layout="vertical">
              <XAxis type="number" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
              <YAxis dataKey="skill" type="category" tick={{ fontSize: 11 }} width={90} stroke="var(--muted-foreground)" />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="count" fill={rose} radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Applications by work mode">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={data.byWorkMode} dataKey="count" nameKey="mode" innerRadius={45} outerRadius={80} paddingAngle={2}>
                {data.byWorkMode.map((_, i) => <Cell key={i} fill={[brand, cyan, amber][i % 3]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
