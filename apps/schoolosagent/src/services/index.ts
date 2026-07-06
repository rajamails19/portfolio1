/**
 * Service layer — one class per domain, mirroring eventual backend boundaries.
 *
 * Backend status: ALL ENDPOINTS DISCONNECTED.
 * Each method returns a typed `ApiResponse<T>` with `status: "disconnected"`
 * so the UI renders honest empty / disconnected states until the backend ships.
 */

import { request } from "@/lib/api/client";
import type { ApiResponse } from "@/lib/api/types";
import type {
  Agent,
  AttendanceRecord,
  BackendHealth,
  CloudServiceStatus,
  EmbeddingJob,
  EvaluationResult,
  ExecutionTrace,
  KnowledgeDocument,
  Notification,
  ParentRequest,
  PredictionModel,
  PromptVersion,
  TrainingRun,
  TransportEvent,
  VectorSearchResult,
  Workflow,
  WorkflowRun,
} from "@/types/models";

// ----------------------------------------------------------------------------
// Mission Control
// ----------------------------------------------------------------------------
export interface MissionMetricSnapshot {
  studentsPresent?: number;
  teachersActive?: number;
  teachersExpected?: number;
  agentsRunning?: number;
  busesOnRoute?: number;
  busesTotal?: number;
  attendancePct?: number;
  openAlerts?: number;
  cloudHealthPct?: number;
  aiCostTodayUsd?: number;
  capturedAt: string;
}

export class MissionControlService {
  static getSnapshot(): Promise<ApiResponse<MissionMetricSnapshot>> {
    return request("/mission-control/snapshot");
  }
  static streamCampusPulse(): Promise<ApiResponse<Array<{ day: string; present: number; absent: number }>>> {
    return request("/mission-control/campus-pulse");
  }
  static listRecentRuns(): Promise<ApiResponse<WorkflowRun[]>> {
    return request("/mission-control/recent-runs");
  }
  static triggerMorningWorkflow(): Promise<ApiResponse<WorkflowRun>> {
    return request("/mission-control/morning", { method: "POST" });
  }
}

// ----------------------------------------------------------------------------
// Agents
// ----------------------------------------------------------------------------
export class AgentService {
  static list(): Promise<ApiResponse<Agent[]>> {
    return request("/agents");
  }
  static get(id: string): Promise<ApiResponse<Agent>> {
    return request(`/agents/${id}`);
  }
  static getPromptVersions(id: string): Promise<ApiResponse<PromptVersion[]>> {
    return request(`/agents/${id}/prompts`);
  }
  /** Returns a websocket URL clients can subscribe to for live agent updates. */
  static getRealtimeUrl(): string | null {
    return null;
  }
}

// ----------------------------------------------------------------------------
// Workflows
// ----------------------------------------------------------------------------
export class WorkflowService {
  static list(): Promise<ApiResponse<Workflow[]>> {
    return request("/workflows");
  }
  static get(id: string): Promise<ApiResponse<Workflow>> {
    return request(`/workflows/${id}`);
  }
  static run(id: string, input?: Record<string, unknown>): Promise<ApiResponse<WorkflowRun>> {
    return request(`/workflows/${id}/run`, { method: "POST", body: input });
  }
  static listRuns(workflowId?: string): Promise<ApiResponse<WorkflowRun[]>> {
    return request(workflowId ? `/workflows/${workflowId}/runs` : "/workflow-runs");
  }
}

// ----------------------------------------------------------------------------
// Traces / Observability
// ----------------------------------------------------------------------------
export class TraceService {
  static list(params?: { filter?: string; limit?: number }): Promise<ApiResponse<ExecutionTrace[]>> {
    return request(`/traces${params?.filter ? `?filter=${params.filter}` : ""}`);
  }
  static get(id: string): Promise<ApiResponse<ExecutionTrace>> {
    return request(`/traces/${id}`);
  }
  static getEvaluation(id: string): Promise<ApiResponse<EvaluationResult>> {
    return request(`/traces/${id}/evaluation`);
  }
  static replay(id: string): Promise<ApiResponse<ExecutionTrace>> {
    return request(`/traces/${id}/replay`, { method: "POST" });
  }
}

// ----------------------------------------------------------------------------
// Knowledge / RAG
// ----------------------------------------------------------------------------
export class KnowledgeService {
  static listDocuments(): Promise<ApiResponse<KnowledgeDocument[]>> {
    return request("/knowledge/documents");
  }
  static search(query: string, _topK = 5): Promise<ApiResponse<VectorSearchResult[]>> {
    return request(`/knowledge/search?q=${encodeURIComponent(query)}`);
  }
  static upload(_file: File): Promise<ApiResponse<EmbeddingJob>> {
    return request("/knowledge/upload", { method: "POST" });
  }
  static getIndexStatus(): Promise<ApiResponse<{ documents: number; chunks: number; vectorDb: string | null }>> {
    return request("/knowledge/index-status");
  }
}

// ----------------------------------------------------------------------------
// Cloud / Infrastructure
// ----------------------------------------------------------------------------
export class CloudService {
  static listServices(): Promise<ApiResponse<CloudServiceStatus[]>> {
    return request("/cloud/services");
  }
  static connect(serviceId: string): Promise<ApiResponse<CloudServiceStatus>> {
    return request(`/cloud/services/${serviceId}/connect`, { method: "POST" });
  }
  static getCostTrend(): Promise<ApiResponse<Array<{ hour: string; cost: number }>>> {
    return request("/cloud/cost-trend");
  }
}

// ----------------------------------------------------------------------------
// MLOps
// ----------------------------------------------------------------------------
export class MlOpsService {
  static listModels(): Promise<ApiResponse<PredictionModel[]>> {
    return request("/mlops/models");
  }
  static listTrainingRuns(modelId?: string): Promise<ApiResponse<TrainingRun[]>> {
    return request(modelId ? `/mlops/models/${modelId}/runs` : "/mlops/training-runs");
  }
  static getDrift(modelId: string): Promise<ApiResponse<{ score: number; level: "stable" | "warning" | "critical" }>> {
    return request(`/mlops/models/${modelId}/drift`);
  }
}

// ----------------------------------------------------------------------------
// Analytics
// ----------------------------------------------------------------------------
export interface ExecutiveSummary {
  automationSavingsUsd?: number;
  workflowsAutomated?: number;
  humanHoursReclaimed?: number;
  aiCostMonthUsd?: number;
  capturedAt: string;
}

export class AnalyticsService {
  static getExecutiveSummary(): Promise<ApiResponse<ExecutiveSummary>> {
    return request("/analytics/executive");
  }
  static getCostTrend(): Promise<ApiResponse<Array<{ hour: string; cost: number }>>> {
    return request("/analytics/cost-trend");
  }
}

// ----------------------------------------------------------------------------
// Domain auxiliary services
// ----------------------------------------------------------------------------
export class AttendanceService {
  static listToday(): Promise<ApiResponse<AttendanceRecord[]>> {
    return request("/attendance/today");
  }
}

export class TransportService {
  static listEvents(): Promise<ApiResponse<TransportEvent[]>> {
    return request("/transport/events");
  }
}

export class ParentService {
  static listRequests(): Promise<ApiResponse<ParentRequest[]>> {
    return request("/parent/requests");
  }
  static approve(id: string): Promise<ApiResponse<ParentRequest>> {
    return request(`/parent/requests/${id}/approve`, { method: "POST" });
  }
  static reject(id: string): Promise<ApiResponse<ParentRequest>> {
    return request(`/parent/requests/${id}/reject`, { method: "POST" });
  }
}

export class NotificationService {
  static list(): Promise<ApiResponse<Notification[]>> {
    return request("/notifications");
  }
  static markRead(id: string): Promise<ApiResponse<Notification>> {
    return request(`/notifications/${id}/read`, { method: "POST" });
  }
}

// ----------------------------------------------------------------------------
// Health
// ----------------------------------------------------------------------------
export class HealthService {
  static check(): Promise<ApiResponse<BackendHealth>> {
    return request("/health");
  }
}
