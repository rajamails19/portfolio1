import { createFileRoute } from "@tanstack/react-router";
import { MetricCard } from "@/components/common/MetricCard";
import { SectionHeader } from "@/components/common/GlassCard";
import { StateView, statusToKind } from "@/components/common/states/StateView";
import { Skeleton } from "@/components/common/states/Skeleton";
import { useApiResource } from "@/hooks/useApiResource";
import { AnalyticsService, type ExecutiveSummary } from "@/services";
import { formatCurrency, formatNumber } from "@/lib/utils/format";

export const Route = createFileRoute("/analytics")({
  head: () => ({ meta: [{ title: "Executive Analytics · Campus AI" }] }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const summary = useApiResource<ExecutiveSummary>(() => AnalyticsService.getExecutiveSummary());
  const costs = useApiResource(() => AnalyticsService.getCostTrend());
  const chartKind = statusToKind(costs.status);

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Board · investor · principal view"
        title="Executive Analytics"
        description="The KPIs that matter — academic, operational, financial. Continuously summarized by the Principal Analytics Agent once the data warehouse is connected."
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ExecMetric loading={summary.isLoading} label="AI Automation Savings" value={formatCurrency(summary.data?.automationSavingsUsd)} suffix="/mo" icon="Sparkles" accent="violet" />
        <ExecMetric loading={summary.isLoading} label="Workflows Automated" value={formatNumber(summary.data?.workflowsAutomated)} icon="Bot" accent="emerald" />
        <ExecMetric loading={summary.isLoading} label="Human Hours Reclaimed" value={formatNumber(summary.data?.humanHoursReclaimed)} icon="Clock" accent="cyan" />
        <ExecMetric loading={summary.isLoading} label="Monthly AI Cost" value={formatCurrency(summary.data?.aiCostMonthUsd)} icon="Wallet" accent="violet" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <ChartPlaceholder title="Attendance trend" subtitle="Last 14 days · target 95%" className="lg:col-span-2" kind={chartKind} />
        <ChartPlaceholder title="AI savings · YTD" subtitle="$ thousands / month" kind={chartKind} />
        <ChartPlaceholder title="Bus delay · 7 days" subtitle="Average minutes / route" kind={chartKind} />
        <ChartPlaceholder title="AI cost · 24h" subtitle="LLM + embeddings + vector" className="lg:col-span-2" kind={chartKind} />
      </div>

      <div className="paper-card p-6">
        <p className="text-[10px] uppercase tracking-widest text-primary mb-1">AI-generated insights</p>
        <h3 className="font-display italic text-lg">Weekly digest</h3>
        <p className="text-xs text-muted-foreground mt-2">
          When the warehouse is connected, the Principal Analytics Agent will surface 3–5 insights here each week (e.g. attendance shifts, cost regressions, model behavior).
        </p>
        <div className="mt-4">
          <StateView compact kind="disconnected" description="No insights generated yet." />
        </div>
      </div>
    </div>
  );
}

function ExecMetric({ loading, ...rest }: { loading: boolean } & Parameters<typeof MetricCard>[0]) {
  if (loading) {
    return (
      <div className="paper-card p-5">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-8 w-28 mt-3" />
        <Skeleton className="h-3 w-32 mt-2" />
      </div>
    );
  }
  return <MetricCard {...rest} delta="awaiting backend" />;
}

function ChartPlaceholder({
  title, subtitle, className, kind,
}: { title: string; subtitle: string; className?: string; kind: ReturnType<typeof statusToKind> }) {
  return (
    <div className={`paper-card p-6 min-h-[280px] ${className ?? ""}`}>
      <h3 className="font-display italic text-lg mb-1">{title}</h3>
      <p className="text-xs text-muted-foreground mb-4">{subtitle}</p>
      <div className="h-56 border border-dashed border-border rounded-xl bg-secondary/30 flex items-center justify-center">
        <StateView compact kind={kind ?? "disconnected"} title={undefined} description="Chart renders here once the analytics service is connected." />
      </div>
    </div>
  );
}
