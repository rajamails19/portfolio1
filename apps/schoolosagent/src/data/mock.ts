import type { Agent, WorkflowExecution, CloudService, MLModel, ParentMessage, KnowledgeDocument } from "@/types";

export const agents: Agent[] = [
  { id: "attendance", name: "Attendance Agent", role: "Tracks and reconciles daily attendance using gate vision, RFID and teacher inputs.", status: "active", latencyMs: 142, tokenCost: 0.84, successRate: 99.2, lastAction: "Marked 238 students present in 4.2s", icon: "UserCheck", tools: ["query_db", "vision.classify", "notify_parent"], memory: ["Holiday calendar", "Class rosters", "Last 30d attendance"], promptVersion: "v3.2.1", evalScore: 96, accent: "violet" },
  { id: "parent", name: "Parent Communication Agent", role: "Understands parent messages and drafts policy-grounded replies with human approval.", status: "active", latencyMs: 980, tokenCost: 2.41, successRate: 97.8, lastAction: "Generated 17 responses in last hour", icon: "MessageSquareHeart", tools: ["rag.search", "policy.lookup", "draft_message", "request_approval"], memory: ["Parent history", "Student profile", "Policy KB"], promptVersion: "v4.0.0", evalScore: 94, accent: "cyan" },
  { id: "bus", name: "Bus Route Agent", role: "Monitors GPS, predicts delays and reroutes buses in real time.", status: "warning", latencyMs: 320, tokenCost: 0.52, successRate: 95.1, lastAction: "Detected 2 delayed routes on NH-44", icon: "Bus", tools: ["gps.stream", "traffic.predict", "reroute"], memory: ["Route history", "Traffic patterns"], promptVersion: "v2.7.0", evalScore: 91, accent: "amber" },
  { id: "timetable", name: "Timetable Agent", role: "Optimizes class schedules around teacher availability and lab constraints.", status: "idle", latencyMs: 1240, tokenCost: 1.12, successRate: 98.4, lastAction: "Replanned Grade 9 Friday schedule", icon: "CalendarClock", tools: ["solver.optimize", "calendar.write"], memory: ["Teacher prefs", "Lab availability"], promptVersion: "v1.9.0", evalScore: 92, accent: "violet" },
  { id: "teacher", name: "Teacher Assistant Agent", role: "Generates lesson plans, quizzes and grades short-answer responses.", status: "active", latencyMs: 1640, tokenCost: 3.21, successRate: 96.0, lastAction: "Generated 12 quiz questions for Grade 7 Science", icon: "GraduationCap", tools: ["llm.generate", "rubric.grade"], memory: ["Curriculum", "Past quizzes"], promptVersion: "v3.4.0", evalScore: 93, accent: "emerald" },
  { id: "homework", name: "Homework Agent", role: "Assigns adaptive homework based on student mastery and absence patterns.", status: "active", latencyMs: 420, tokenCost: 0.94, successRate: 98.7, lastAction: "Assigned makeup work to 14 absent students", icon: "BookOpen", tools: ["mastery.lookup", "assign_task"], memory: ["Mastery vectors"], promptVersion: "v2.1.0", evalScore: 95, accent: "cyan" },
  { id: "fee", name: "Fee Agent", role: "Sends reminders, predicts default risk and reconciles payments.", status: "idle", latencyMs: 210, tokenCost: 0.31, successRate: 99.6, lastAction: "Sent 42 fee reminders", icon: "Wallet", tools: ["payments.query", "send_reminder"], memory: ["Payment history"], promptVersion: "v2.0.0", evalScore: 97, accent: "emerald" },
  { id: "vision", name: "Vision Agent", role: "Processes gate camera frames for entry/exit and uniform compliance.", status: "active", latencyMs: 88, tokenCost: 0.18, successRate: 99.9, lastAction: "Processed 1,284 gate frames", icon: "Eye", tools: ["vision.detect", "face.match"], memory: ["Face embeddings"], promptVersion: "v5.1.0", evalScore: 98, accent: "violet" },
  { id: "speech", name: "Speech Agent", role: "Transcribes parent calls and routes them to the right desk.", status: "idle", latencyMs: 540, tokenCost: 0.62, successRate: 96.5, lastAction: "Transcribed 8 parent calls", icon: "Mic", tools: ["stt.stream", "intent.classify"], memory: ["Voice prints"], promptVersion: "v2.3.0", evalScore: 90, accent: "cyan" },
  { id: "safety", name: "Safety Agent", role: "Detects anomalies on campus — crowding, intrusions, fire alarms.", status: "warning", latencyMs: 64, tokenCost: 0.22, successRate: 99.4, lastAction: "Flagged crowding near cafeteria", icon: "ShieldAlert", tools: ["anomaly.detect", "alert.dispatch"], memory: ["Floor plan", "Past incidents"], promptVersion: "v3.0.0", evalScore: 95, accent: "rose" },
  { id: "principal", name: "Principal Analytics Agent", role: "Summarizes school-wide KPIs and surfaces weekly insights.", status: "active", latencyMs: 2100, tokenCost: 4.12, successRate: 97.2, lastAction: "Delivered Monday briefing to Principal", icon: "BarChart3", tools: ["bigquery.read", "summarize", "chart.render"], memory: ["KPI history"], promptVersion: "v2.5.0", evalScore: 94, accent: "violet" },
  { id: "mlops", name: "MLOps Prediction Agent", role: "Monitors model drift, triggers retraining and promotes models.", status: "active", latencyMs: 760, tokenCost: 0.78, successRate: 98.0, lastAction: "Promoted Absenteeism v4.2 to production", icon: "Brain", tools: ["mlflow.compare", "deploy.canary"], memory: ["Model registry"], promptVersion: "v1.4.0", evalScore: 96, accent: "emerald" },
];

export const executions: WorkflowExecution[] = [
  {
    id: "exec_8421",
    name: "Morning Campus Workflow",
    triggeredBy: "principal@school.ai",
    startedAt: "08:02:11",
    status: "completed",
    durationMs: 4820,
    steps: [
      { id: "s1", agent: "Vision Agent", toolCall: "vision.detect(gate_cam_1)", latencyMs: 88, status: "completed", output: "{ entries: 312, exits: 0 }", tokens: 0, cost: 0.02 },
      { id: "s2", agent: "Attendance Agent", toolCall: "reconcile(grade=all)", latencyMs: 240, status: "completed", output: "{ present: 1184, absent: 96 }", tokens: 1840, cost: 0.18 },
      { id: "s3", agent: "Parent Communication Agent", toolCall: "draft_absence_replies", latencyMs: 1640, status: "approved", output: "17 drafts ready for review", tokens: 8240, cost: 0.82 },
      { id: "s4", agent: "Bus Route Agent", toolCall: "predict_delays", latencyMs: 320, status: "completed", output: "{ delayed: 2, on_time: 18 }", tokens: 420, cost: 0.04 },
      { id: "s5", agent: "Principal Analytics Agent", toolCall: "summarize_morning", latencyMs: 2100, status: "completed", output: "Briefing delivered", tokens: 6200, cost: 0.62 },
    ],
  },
  {
    id: "exec_8420",
    name: "Parent Absence Workflow",
    triggeredBy: "parent.app",
    startedAt: "07:48:02",
    status: "approved",
    durationMs: 3210,
    steps: [
      { id: "s1", agent: "Parent Auth Agent", toolCall: "verify_parent(uid)", latencyMs: 142, status: "completed", output: "verified", tokens: 200, cost: 0.01 },
      { id: "s2", agent: "Attendance Agent", toolCall: "mark_absent(student_id)", latencyMs: 92, status: "completed", output: "ok", tokens: 0, cost: 0.0 },
      { id: "s3", agent: "Teacher Notification Agent", toolCall: "notify(class_teacher)", latencyMs: 210, status: "completed", output: "notified", tokens: 320, cost: 0.02 },
      { id: "s4", agent: "Homework Agent", toolCall: "assign_makeup", latencyMs: 480, status: "completed", output: "3 tasks queued", tokens: 1200, cost: 0.11 },
      { id: "s5", agent: "Bus Agent", toolCall: "cancel_pickup", latencyMs: 88, status: "completed", output: "ok", tokens: 0, cost: 0.0 },
      { id: "s6", agent: "Cafeteria Agent", toolCall: "adjust_count(-1)", latencyMs: 64, status: "completed", output: "ok", tokens: 0, cost: 0.0 },
      { id: "s7", agent: "Parent Confirmation Agent", toolCall: "send_confirmation", latencyMs: 1840, status: "approved", output: "Reply sent with citation", tokens: 1640, cost: 0.16 },
    ],
  },
  {
    id: "exec_8419",
    name: "Bus Delay Mitigation",
    triggeredBy: "bus_agent.cron",
    startedAt: "07:31:55",
    status: "retry",
    durationMs: 1820,
    steps: [
      { id: "s1", agent: "Bus Route Agent", toolCall: "detect_delay(route_04)", latencyMs: 320, status: "completed", output: "delay=12min", tokens: 240, cost: 0.02 },
      { id: "s2", agent: "Bus Route Agent", toolCall: "reroute(route_04)", latencyMs: 540, status: "failed", output: "traffic API timeout", tokens: 320, cost: 0.03 },
      { id: "s3", agent: "Bus Route Agent", toolCall: "reroute(route_04)", latencyMs: 410, status: "retry", output: "retrying with cached graph", tokens: 320, cost: 0.03 },
    ],
  },
];

export const cloudServices: CloudService[] = [
  { id: "api", name: "API Gateway", category: "Edge", status: "healthy", latencyMs: 42, costToday: 1.84, icon: "Network" },
  { id: "run", name: "Cloud Run", category: "Compute", status: "healthy", latencyMs: 88, costToday: 12.4, icon: "Server" },
  { id: "pubsub", name: "Pub/Sub", category: "Messaging", status: "healthy", latencyMs: 18, costToday: 0.62, icon: "Radio" },
  { id: "firestore", name: "Firestore", category: "Database", status: "healthy", latencyMs: 24, costToday: 3.12, icon: "Database" },
  { id: "storage", name: "Cloud Storage", category: "Storage", status: "healthy", latencyMs: 56, costToday: 0.41, icon: "HardDrive" },
  { id: "vector", name: "Vector DB", category: "ML", status: "healthy", latencyMs: 38, costToday: 2.18, icon: "Boxes" },
  { id: "bigquery", name: "BigQuery", category: "Analytics", status: "healthy", latencyMs: 240, costToday: 4.81, icon: "BarChart3" },
  { id: "logging", name: "Cloud Logging", category: "Observability", status: "healthy", latencyMs: 12, costToday: 0.84, icon: "ScrollText" },
  { id: "monitoring", name: "Monitoring", category: "Observability", status: "degraded", latencyMs: 320, costToday: 1.12, icon: "Activity" },
  { id: "gemini", name: "Gemini / LLM", category: "ML", status: "healthy", latencyMs: 980, costToday: 18.42, icon: "Sparkles" },
];

export const mlModels: MLModel[] = [
  { id: "absent", name: "Absenteeism Predictor", version: "v4.2", accuracy: 0.912, precision: 0.88, recall: 0.84, drift: "stable", lastTrained: "2d ago", deployment: "production", description: "Predicts probability a student will be absent in next 7 days." },
  { id: "bus", name: "Bus Delay Predictor", version: "v2.7", accuracy: 0.873, precision: 0.81, recall: 0.79, drift: "warning", lastTrained: "11d ago", deployment: "production", description: "Predicts route-level ETA delays from traffic and weather." },
  { id: "fee", name: "Fee Delay Predictor", version: "v1.9", accuracy: 0.94, precision: 0.92, recall: 0.86, drift: "stable", lastTrained: "5d ago", deployment: "production", description: "Predicts likelihood of late or missed fee payment." },
  { id: "cafe", name: "Cafeteria Demand Predictor", version: "v3.1", accuracy: 0.89, precision: 0.85, recall: 0.83, drift: "stable", lastTrained: "1d ago", deployment: "canary", description: "Forecasts per-meal demand to reduce food waste." },
];

export const parentMessages: ParentMessage[] = [
  { id: "m1", parent: "Anita Sharma", student: "Riya Sharma · Grade 7B", avatar: "AS", message: "My daughter will be absent tomorrow due to a dental appointment.", receivedAt: "08:14", stage: "awaiting_approval", draftResponse: "Hi Anita — noted. Riya is marked absent for tomorrow. Homework for Math and Science will be auto-assigned per the Attendance Policy §3.2. Bus pickup is cancelled.", citations: ["Attendance Policy §3.2", "Transport Rules §1.4"], riskScore: 0.04 },
  { id: "m2", parent: "Rohit Verma", student: "Aarav Verma · Grade 5A", avatar: "RV", message: "Why was my son marked absent yesterday? He attended school.", receivedAt: "08:02", stage: "drafted", draftResponse: "Hi Rohit — we re-checked gate vision logs and confirm Aarav entered at 08:11. Attendance has been corrected. Apologies for the confusion.", citations: ["Gate Vision Log 2026-06-27", "Attendance Reconciliation SOP"], riskScore: 0.18 },
  { id: "m3", parent: "Meera Iyer", student: "Kabir Iyer · Grade 9C", avatar: "MI", message: "When is the next school holiday?", receivedAt: "07:51", stage: "approved", draftResponse: "Hi Meera — next holiday is Friday, July 3 (Founders' Day). Full calendar attached.", citations: ["Holiday Calendar 2026-27"], riskScore: 0.01 },
  { id: "m4", parent: "Sanjay Patel", student: "Diya Patel · Grade 6B", avatar: "SP", message: "Can I change Diya's bus route to Route 08 from next Monday?", receivedAt: "07:42", stage: "awaiting_approval", draftResponse: "Hi Sanjay — Route 08 has 2 seats open from Monday. To confirm the switch, transport fee differential is ₹240/mo. Reply YES to confirm.", citations: ["Transport Rules §4.1", "Route 08 Capacity"], riskScore: 0.22 },
];

export const knowledgeDocs: KnowledgeDocument[] = [
  { id: "att", title: "Attendance Policy", category: "Policy", chunks: 42, updatedAt: "2026-06-12", snippet: "Students marked absent for >3 consecutive days require principal review and parent intervention…" },
  { id: "trans", title: "Transport Rules", category: "Operations", chunks: 28, updatedAt: "2026-05-30", snippet: "Bus route changes require 48h notice. Differential fees apply per zone band…" },
  { id: "hol", title: "Holiday Calendar 2026-27", category: "Calendar", chunks: 12, updatedAt: "2026-04-01", snippet: "Founders' Day — July 3. Mid-term break — Aug 14-22. Diwali break — Oct 28 - Nov 5…" },
  { id: "fee", title: "Fee Policy", category: "Policy", chunks: 36, updatedAt: "2026-04-15", snippet: "Term fees are due by the 10th. Late fee of 2% applies thereafter. Hardship waivers per §6…" },
  { id: "emg", title: "Emergency Procedure", category: "Safety", chunks: 51, updatedAt: "2026-06-01", snippet: "On fire alarm activation, evacuation order is: ground floor first, then ascending floors via Stair A…" },
  { id: "hand", title: "Student Handbook", category: "Policy", chunks: 184, updatedAt: "2026-03-10", snippet: "Uniform standards, code of conduct, academic integrity, device usage policy…" },
];

export const activityFeed = [
  { id: 1, agent: "Attendance Agent", message: "Marked 238 students present", time: "just now", accent: "violet" as const },
  { id: 2, agent: "Bus Agent", message: "Detected 2 delayed routes on NH-44", time: "1m", accent: "amber" as const },
  { id: 3, agent: "Parent Agent", message: "Generated 17 parent responses", time: "3m", accent: "cyan" as const },
  { id: 4, agent: "Vision Agent", message: "Processed 1,284 gate entry frames", time: "4m", accent: "violet" as const },
  { id: 5, agent: "Safety Agent", message: "Flagged crowding near cafeteria", time: "6m", accent: "rose" as const },
  { id: 6, agent: "MLOps Agent", message: "Promoted Absenteeism v4.2 to production", time: "12m", accent: "emerald" as const },
  { id: 7, agent: "Fee Agent", message: "Sent 42 fee reminders", time: "18m", accent: "emerald" as const },
];

export const attendanceTrend = Array.from({ length: 14 }, (_, i) => ({
  day: `D${i + 1}`, present: 1100 + Math.round(Math.sin(i / 2) * 60 + Math.random() * 40), absent: 80 + Math.round(Math.cos(i / 3) * 20 + Math.random() * 20),
}));

export const gradeAttendance = [
  { grade: "G1", rate: 96 }, { grade: "G2", rate: 94 }, { grade: "G3", rate: 95 }, { grade: "G4", rate: 92 },
  { grade: "G5", rate: 93 }, { grade: "G6", rate: 91 }, { grade: "G7", rate: 89 }, { grade: "G8", rate: 90 },
  { grade: "G9", rate: 87 }, { grade: "G10", rate: 88 }, { grade: "G11", rate: 92 }, { grade: "G12", rate: 94 },
];

export const trainTestCurve = Array.from({ length: 20 }, (_, i) => ({
  epoch: i + 1,
  train: +(0.12 + Math.exp(-i / 3) * 0.3 + Math.random() * 0.01).toFixed(3),
  test: +(0.18 + Math.exp(-i / 4) * 0.28 + (i > 12 ? (i - 12) * 0.006 : 0) + Math.random() * 0.015).toFixed(3),
}));

export const costTrend = Array.from({ length: 12 }, (_, i) => ({
  hour: `${i * 2}:00`, cost: +(2 + Math.sin(i / 2) * 1.4 + Math.random()).toFixed(2),
}));

export const busRoutes = [
  { id: "R04", name: "Route 04 · Sector 12", status: "delayed", eta: "+12m", driver: "Anil K.", students: 32 },
  { id: "R12", name: "Route 12 · Greenwood", status: "on-time", eta: "08:42", driver: "Manoj P.", students: 28 },
  { id: "R08", name: "Route 08 · Hillview", status: "rerouted", eta: "08:55", driver: "Priya S.", students: 24 },
  { id: "R02", name: "Route 02 · Riverside", status: "on-time", eta: "08:38", driver: "Ravi M.", students: 30 },
  { id: "R15", name: "Route 15 · Tech Park", status: "on-time", eta: "08:40", driver: "Sneha R.", students: 26 },
];
