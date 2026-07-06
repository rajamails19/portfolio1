import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Upload, FileText, Search, ScissorsLineDashed, Brain, Database, Quote, Sparkles, Filter } from "lucide-react";
import { GlassCard, SectionHeader } from "@/components/common/GlassCard";
import { StateView, statusToKind } from "@/components/common/states/StateView";
import { Skeleton } from "@/components/common/states/Skeleton";
import { useApiResource } from "@/hooks/useApiResource";
import { KnowledgeService } from "@/services";
import type { KnowledgeDocument, VectorSearchResult } from "@/types/models";

export const Route = createFileRoute("/knowledge")({
  head: () => ({ meta: [{ title: "Knowledge Brain · Campus AI" }] }),
  component: KnowledgePage,
});

const pipeline = [
  { label: "Upload", icon: Upload },
  { label: "Chunk", icon: ScissorsLineDashed },
  { label: "Embed", icon: Brain },
  { label: "Store", icon: Database },
  { label: "Retrieve", icon: Search },
  { label: "Cite", icon: Quote },
];

function KnowledgePage() {
  const docs = useApiResource<KnowledgeDocument[]>(() => KnowledgeService.listDocuments());
  const index = useApiResource(() => KnowledgeService.getIndexStatus());

  const [query, setQuery] = useState("");
  const [searchTrigger, setSearchTrigger] = useState(0);
  const search = useApiResource<VectorSearchResult[]>(
    () => (searchTrigger === 0 ? Promise.resolve({ status: "idle" as const }) : KnowledgeService.search(query)),
    [searchTrigger],
  );
  const searchKind = statusToKind(search.status);
  const docsKind = statusToKind(docs.status);

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="RAG over school policies"
        title="Knowledge Brain"
        description="Parent answers, teacher questions, and principal reports are grounded in cited policy documents — never hallucinated. UI is ready for pgvector / Pinecone / Vertex Matching Engine."
      />

      {/* Pipeline */}
      <GlassCard className="p-5">
        <div className="flex flex-wrap items-center gap-2 justify-between">
          {pipeline.map((s, i) => (
            <div key={s.label} className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-xl bg-secondary border border-border flex items-center justify-center text-primary">
                <s.icon className="h-4 w-4" />
              </div>
              <span className="text-xs">{s.label}</span>
              {i < pipeline.length - 1 && <span className="text-muted-foreground mx-1">→</span>}
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Index status strip */}
      <div className="paper-card px-5 py-3 grid sm:grid-cols-4 gap-3 text-xs">
        <IndexStat label="Vector DB" value={index.data?.vectorDb ?? "—"} loading={index.isLoading} />
        <IndexStat label="Documents" value={index.data?.documents?.toLocaleString() ?? "—"} loading={index.isLoading} />
        <IndexStat label="Chunks" value={index.data?.chunks?.toLocaleString() ?? "—"} loading={index.isLoading} />
        <IndexStat label="Status" value={index.isDisconnected ? "disconnected" : index.data ? "ready" : "—"} loading={index.isLoading} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Search */}
          <div className="paper-card p-5">
            <form onSubmit={(e) => { e.preventDefault(); setSearchTrigger((n) => n + 1); }}>
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Vector search</label>
              <div className="mt-2 flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask a policy question, e.g. 'What is the absence policy beyond 3 days?'"
                    className="w-full bg-secondary border border-border rounded-lg pl-9 pr-3 py-3 text-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <button type="submit" className="px-5 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:opacity-95 transition">
                  <Sparkles className="h-4 w-4" /> Search
                </button>
              </div>
              <div className="mt-3 flex items-center gap-2 text-[11px] text-muted-foreground">
                <Filter className="h-3 w-3" />
                <span>Filters:</span>
                {["Policy", "Calendar", "Safety", "Operations"].map((f) => (
                  <button key={f} type="button" className="px-2 py-0.5 rounded-full border border-border hover:bg-secondary">{f}</button>
                ))}
              </div>
            </form>
          </div>

          {/* Search results */}
          <div className="paper-card p-5 min-h-[260px]">
            <h3 className="font-display italic text-base mb-3">Search results</h3>
            {search.status === "idle" && (
              <StateView compact kind="empty" title="Enter a query to search the knowledge base." description="Results will include chunk preview, similarity score, document source, metadata and inline citations." />
            )}
            {search.isLoading && (
              <div className="space-y-2">
                <Skeleton className="h-16" /><Skeleton className="h-16" /><Skeleton className="h-16" />
              </div>
            )}
            {searchKind && search.status !== "idle" && !search.isLoading && (
              <StateView
                compact
                kind={searchKind}
                title={searchKind === "disconnected" ? "No vector database connected." : undefined}
                description={searchKind === "disconnected" ? "Wire pgvector or a managed vector index — results with similarity scores and citations will render here." : undefined}
              />
            )}
            {search.data && search.data.length > 0 && (
              <ul className="space-y-2">
                {search.data.map((r) => (
                  <li key={r.chunkId} className="rounded-lg border border-border bg-secondary/40 p-3 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-primary font-medium">{r.documentTitle}</span>
                      <span className="font-mono text-[10px] text-muted-foreground">sim {r.similarity.toFixed(2)}</span>
                    </div>
                    <p className="text-muted-foreground">{r.chunkText}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {/* Documents */}
          <div className="paper-card p-5">
            <h3 className="font-display italic text-base mb-3">Recent uploads</h3>
            {docs.isLoading && (
              <div className="space-y-2"><Skeleton className="h-14" /><Skeleton className="h-14" /><Skeleton className="h-14" /></div>
            )}
            {docsKind && (
              <StateView
                compact
                kind={docsKind}
                title={docsKind === "disconnected" ? "No documents indexed yet." : undefined}
                description={docsKind === "disconnected" ? "Upload policies, calendars and handbooks. Each will be chunked, embedded and indexed automatically." : undefined}
              />
            )}
            {docs.data && docs.data.length > 0 && (
              <ul className="space-y-2">
                {docs.data.map((d) => (
                  <li key={d.id} className="rounded-lg border border-border bg-secondary/40 p-3 text-xs">
                    <div className="flex items-center gap-2 mb-1">
                      <FileText className="h-3.5 w-3.5 text-primary" />
                      <span className="font-medium">{d.title}</span>
                    </div>
                    <p className="text-muted-foreground truncate">{d.snippet}</p>
                    <div className="mt-1.5 flex items-center justify-between text-[10px] text-muted-foreground">
                      <span>{d.category} · {d.chunks} chunks · {d.indexStatus}</span>
                      <span>{d.updatedAt}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Upload */}
          <label className="paper-card p-5 border-dashed border border-border text-center cursor-pointer block hover:bg-secondary/30 transition">
            <input type="file" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) void KnowledgeService.upload(f); }} />
            <Upload className="h-6 w-6 mx-auto mb-2 text-primary" />
            <p className="text-sm font-medium">Upload policy</p>
            <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, MD · auto-chunked and embedded once the embedding worker is connected</p>
          </label>
        </div>
      </div>
    </div>
  );
}

function IndexStat({ label, value, loading }: { label: string; value: string; loading: boolean }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
      {loading ? <Skeleton className="h-5 w-20 mt-1" /> : <p className="font-mono text-foreground mt-1">{value}</p>}
    </div>
  );
}
