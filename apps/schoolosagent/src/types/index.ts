export type AgentStatus = "active" | "idle" | "warning" | "error";

export interface Agent {
  id: string;
  name: string;
  role: string;
  status: AgentStatus;
  latencyMs: number;
  tokenCost: number;
  successRate: number;
  lastAction: string;
  icon: string;
  tools: string[];
  memory: string[];
  promptVersion: string;
  evalScore: number;
  accent: "violet" | "cyan" | "emerald" | "amber" | "rose";
}

export type ExecutionStatus = "completed" | "running" | "failed" | "approved" | "retry" | "pending";

export interface TraceStep {
  id: string;
  agent: string;
  toolCall: string;
  latencyMs: number;
  status: ExecutionStatus;
  output: string;
  tokens: number;
  cost: number;
}

export interface WorkflowExecution {
  id: string;
  name: string;
  triggeredBy: string;
  startedAt: string;
  status: ExecutionStatus;
  durationMs: number;
  steps: TraceStep[];
}

export interface CloudService {
  id: string;
  name: string;
  category: string;
  status: "healthy" | "degraded" | "down";
  latencyMs: number;
  costToday: number;
  icon: string;
}

export interface MLModel {
  id: string;
  name: string;
  version: string;
  accuracy: number;
  precision: number;
  recall: number;
  drift: "stable" | "warning" | "critical";
  lastTrained: string;
  deployment: "production" | "staging" | "canary";
  description: string;
}

export type MessageStage = "received" | "understood" | "retrieved" | "drafted" | "awaiting_approval" | "approved" | "rejected";

export interface ParentMessage {
  id: string;
  parent: string;
  student: string;
  avatar: string;
  message: string;
  receivedAt: string;
  stage: MessageStage;
  draftResponse: string;
  citations: string[];
  riskScore: number;
}

export interface KnowledgeDocument {
  id: string;
  title: string;
  category: string;
  chunks: number;
  updatedAt: string;
  snippet: string;
}
