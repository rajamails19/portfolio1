import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, GraduationCap, TrendingUp } from "lucide-react";
import { GlassCard, SectionHeader } from "@/components/common/GlassCard";
import { StateView, statusToKind } from "@/components/common/states/StateView";
import { Skeleton } from "@/components/common/states/Skeleton";
import { useApiResource } from "@/hooks/useApiResource";
import { MlOpsService } from "@/services";
import type { PredictionModel, TrainingRun } from "@/types/models";

export const Route = createFileRoute("/mlops")({
  head: () => ({ meta: [{ title: "MLOps Prediction Lab · Campus AI" }] }),
  component: MLOpsPage,
});

const pipeline = ["Data Collection", "Training", "Evaluation", "Deployment", "Monitoring", "Retraining"];

function MLOpsPage() {
  const models = useApiResource<PredictionModel[]>(() => MlOpsService.listModels());
  const runs = useApiResource<TrainingRun[]>(() => MlOpsService.listTrainingRuns());
  const modelsKind = statusToKind(models.status);
  const runsKind = statusToKind(runs.status);

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Models in production"
        title="MLOps Prediction Lab"
        description="Versioned models, drift monitoring, canary deploys and retraining loops. Wire MLflow / Vertex / Weights & Biases here."
      />

      <GlassCard className="p-5">
        <div className="flex flex-wrap items-center gap-2 justify-between">
          {pipeline.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-secondary border border-border flex items-center justify-center text-emerald-glow text-xs font-semibold">{i + 1}</div>
              <span className="text-xs">{s}</span>
              {i < pipeline.length - 1 && <span className="text-muted-foreground">→</span>}
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Models */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display italic text-lg">Model registry</h3>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">{models.data?.length ?? 0} models</span>
        </div>
        {models.isLoading && (
          <div className="grid sm:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-44" />)}
          </div>
        )}
        {modelsKind && (
          <div className="paper-card p-6">
            <StateView
              kind={modelsKind}
              title={modelsKind === "disconnected" ? "No model deployed." : undefined}
              description={modelsKind === "disconnected" ? "Cards for production / staging / canary models will appear here, each with version, accuracy / precision / recall, drift level and last-trained timestamp." : undefined}
            />
          </div>
        )}
      </section>

      {/* Training runs + charts */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 paper-card-elevated p-6 min-h-[320px]">
          <h3 className="font-display italic text-lg mb-1">Train vs Test loss</h3>
          <p className="text-xs text-muted-foreground mb-4">Empty until first training run completes.</p>
          <div className="h-64 border border-dashed border-border rounded-xl bg-secondary/30 flex items-center justify-center">
            <StateView compact kind="empty" title="Waiting for first dataset." description="Loss curves render here per training run." />
          </div>
        </div>

        <div className="space-y-4">
          <GlassCard className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-amber-glow" />
              <h3 className="font-display italic text-sm">Drift detection</h3>
            </div>
            <p className="text-xs text-muted-foreground">No drift detected yet — drift telemetry needs at least one production model with live inferences.</p>
          </GlassCard>
          <GlassCard className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="h-4 w-4 text-violet-glow" />
              <h3 className="font-display italic text-sm">Inference logs</h3>
            </div>
            <p className="text-xs text-muted-foreground">When a model is deployed, every inference is logged with input hash, output, confidence, latency and cost.</p>
          </GlassCard>
          <GlassCard className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-emerald-glow" />
              <h3 className="font-display italic text-sm">Auto-retrain</h3>
            </div>
            <p className="text-xs text-muted-foreground">Drift &gt; 0.15 on production features triggers a shadow training run and a canary deployment.</p>
          </GlassCard>
        </div>
      </div>

      {/* Runs */}
      <section className="paper-card p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display italic text-lg">Training runs</h3>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">{runs.data?.length ?? 0} runs</span>
        </div>
        {runs.isLoading && <div className="space-y-2">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-10" />)}</div>}
        {runsKind && (
          <StateView
            kind={runsKind}
            title={runsKind === "disconnected" ? "No training runs." : undefined}
            description={runsKind === "disconnected" ? "Kick off the first run from the orchestrator. Status, epochs, dataset version, final loss and links to experiments will appear here." : undefined}
          />
        )}
      </section>
    </div>
  );
}
