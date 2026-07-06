/**
 * Domain models for the Campus AI platform.
 *
 * These types are the contract the backend will fulfill. Every API service
 * in `src/services/*` returns one of these (or `ApiResponse<T>`).
 *
 * Keep this file backend-agnostic: no React, no fetch, no env access.
 */

// ============================================================================
// Observability primitives — every backend call carries these
// ============================================================================

export type RequestId = string;
export type CorrelationId = string;
export type ExecutionId = string;
export type SessionId = string;
export type TenantId = string;
export type UserId = string;
export type AgentId = string;
export type WorkflowId = string;
export type ModelId = string;
export type DocumentId = string;

export interface ObservabilityContext {
  requestId: RequestId;
  correlationId: CorrelationId;
  sessionId: SessionId;
  tenantId?: TenantId;
  userId?: UserId;
  timestamp: string; // ISO-8601
  latencyMs?: number;
  tokenCount?: number;
  estimatedCostUsd?: number;
  retryCount?: number;
}

// ============================================================================
// Connection / health
// ============================================================================

export type BackendStatus =
  | "connected"
  | "connecting"
  | "disconnected"
  | "degraded"
  | "unauthorized"
  | "unknown";

export interface BackendHealth {
  status: BackendStatus;
  region?: string;
  version?: string;
  uptimeSeconds?: number;
  checkedAt: string;
}

// ============================================================================
// Agents
// ============================================================================

export type AgentRuntimeStatus =
  | "idle"
  | "queued"
  | "running"
  | "completed"
  | "failed"
  | "offline"
  | "waiting_for_orchestrator";

export interface Agent {
  id: AgentId;
  name: string;
  role: string;
  status: AgentRuntimeStatus;
  icon: string;
  accent: "violet" | "cyan" | "emerald" | "amber" | "rose";
  promptVersion?: PromptVersion["version"];
  tools: string[];
  memory: string[];
  // Telemetry — only populated when the orchestrator emits live data.
  lastSeen?: string;
  lastAction?: string;
  metrics?: AgentMetrics;
}

export interface AgentMetrics {
  latencyMs: number;
  tokenCost: number;
  successRate: number;
  evalScore: number;
}

// ============================================================================
// Workflows / execution graphs
// ============================================================================

export type WorkflowNodeStatus =
  | "queued"
  | "running"
  | "waiting"
  | "retrying"
  | "failed"
  | "completed"
  | "skipped";

export interface WorkflowStep {
  id: string;
  agentId: AgentId;
  agentName: string;
  toolCall?: string;
  promptVersion?: string;
  status: WorkflowNodeStatus;
  startTime?: string;
  endTime?: string;
  latencyMs?: number;
  toolCalls?: ToolCall[];
  tokens?: number;
  cost?: number;
  output?: unknown;
  error?: string;
}

export interface ToolCall {
  id: string;
  name: string;
  args: Record<string, unknown>;
  result?: unknown;
  error?: string;
  latencyMs?: number;
}

export interface WorkflowEdge {
  from: string;
  to: string;
  label?: string;
}

export interface WorkflowNodeLayout {
  id: string;
  label: string;
  sub?: string;
  x: number;
  y: number;
  kind: "trigger" | "agent" | "sink";
  accent: "violet" | "cyan" | "emerald" | "amber" | "rose";
}

export interface Workflow {
  id: WorkflowId;
  name: string;
  version: string;
  description?: string;
  nodes: WorkflowNodeLayout[];
  edges: WorkflowEdge[];
  checkpointer?: "redis" | "postgres" | "memory";
  concurrency?: number;
}

export type WorkflowRunStatus =
  | "queued"
  | "running"
  | "completed"
  | "failed"
  | "approved"
  | "retry"
  | "pending";

export interface WorkflowRun {
  id: ExecutionId;
  workflowId: WorkflowId;
  name: string;
  triggeredBy: string;
  status: WorkflowRunStatus;
  startedAt: string;
  endedAt?: string;
  durationMs?: number;
  steps: WorkflowStep[];
  observability: ObservabilityContext;
}

// ============================================================================
// Traces
// ============================================================================

export type TraceEventLevel = "debug" | "info" | "warn" | "error";

export interface TraceEvent {
  id: string;
  ts: string;
  level: TraceEventLevel;
  agentId?: AgentId;
  message: string;
  attributes?: Record<string, unknown>;
}

export interface ExecutionTrace {
  id: ExecutionId;
  runId: ExecutionId;
  workflowName: string;
  status: WorkflowRunStatus;
  startedAt: string;
  durationMs: number;
  triggeredBy: string;
  steps: WorkflowStep[];
  events?: TraceEvent[];
  evaluation?: EvaluationResult;
  observability: ObservabilityContext;
}

export interface EvaluationResult {
  faithfulness?: number;
  relevance?: number;
  safety?: number;
  groundedness?: number;
  hallucinationRisk?: number;
  reviewer?: "human" | "auto" | null;
  notes?: string;
}

// ============================================================================
// Knowledge / RAG
// ============================================================================

export type IndexStatus = "not_started" | "embedding" | "ready" | "failed";

export interface KnowledgeDocument {
  id: DocumentId;
  title: string;
  category: string;
  source?: string;
  chunks: number;
  updatedAt: string;
  snippet?: string;
  indexStatus: IndexStatus;
  metadata?: Record<string, unknown>;
}

export interface VectorSearchResult {
  documentId: DocumentId;
  documentTitle: string;
  chunkId: string;
  chunkText: string;
  similarity: number;
  metadata?: Record<string, unknown>;
  citations?: string[];
}

export interface EmbeddingJob {
  id: string;
  documentId: DocumentId;
  status: "queued" | "running" | "completed" | "failed";
  model: string;
  startedAt?: string;
  endedAt?: string;
  error?: string;
}

// ============================================================================
// Prompt versions / evaluation
// ============================================================================

export interface PromptVersion {
  id: string;
  agentId: AgentId;
  version: string;
  body: string;
  createdAt: string;
  isProduction: boolean;
  evalScore?: number;
}

// ============================================================================
// Parent communication
// ============================================================================

export type ParentRequestStage =
  | "received"
  | "understood"
  | "retrieved"
  | "drafted"
  | "awaiting_approval"
  | "approved"
  | "rejected";

export interface ParentRequest {
  id: string;
  parent: string;
  student: string;
  avatar?: string;
  message: string;
  receivedAt: string;
  stage: ParentRequestStage;
  draftResponse?: string;
  citations?: string[];
  riskScore?: number;
}

// ============================================================================
// MLOps
// ============================================================================

export type ModelDeploymentChannel = "production" | "staging" | "canary" | "shadow";
export type ModelDriftLevel = "stable" | "warning" | "critical";

export interface PredictionModel {
  id: ModelId;
  name: string;
  version: string;
  description?: string;
  deployment: ModelDeploymentChannel;
  drift: ModelDriftLevel;
  metrics?: {
    accuracy: number;
    precision: number;
    recall: number;
    f1?: number;
  };
  lastTrained?: string;
}

export interface TrainingRun {
  id: string;
  modelId: ModelId;
  startedAt: string;
  endedAt?: string;
  status: "queued" | "running" | "completed" | "failed";
  epochs?: number;
  finalLoss?: number;
  datasetVersion?: string;
}

export interface InferenceResult {
  id: string;
  modelId: ModelId;
  input: Record<string, unknown>;
  output: unknown;
  confidence?: number;
  latencyMs: number;
  ts: string;
}

// ============================================================================
// Cloud / infrastructure
// ============================================================================

export type CloudConnectionStatus = "connected" | "disconnected" | "degraded" | "unauthorized";

export interface CloudServiceStatus {
  id: string;
  name: string;
  category: string;
  provider: "gcp" | "aws" | "azure" | "self_hosted";
  status: CloudConnectionStatus;
  icon: string;
  region?: string;
  metrics?: {
    latencyMs?: number;
    costToday?: number;
    p95Ms?: number;
    errorRate?: number;
  };
  lastChecked?: string;
}

// ============================================================================
// Notifications
// ============================================================================

export type NotificationSeverity = "info" | "success" | "warning" | "error";

export interface Notification {
  id: string;
  severity: NotificationSeverity;
  title: string;
  body?: string;
  createdAt: string;
  read: boolean;
}

// ============================================================================
// Attendance / Transport
// ============================================================================

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName?: string;
  grade?: string;
  date: string;
  status: "present" | "absent" | "late" | "excused";
  source: "vision" | "rfid" | "manual";
  recordedAt: string;
}

export type TransportEventKind =
  | "departed"
  | "arrived"
  | "delayed"
  | "rerouted"
  | "incident"
  | "boarding";

export interface TransportEvent {
  id: string;
  routeId: string;
  kind: TransportEventKind;
  ts: string;
  location?: { lat: number; lng: number };
  message?: string;
}
