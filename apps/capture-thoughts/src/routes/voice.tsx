import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { AddButton } from "@/components/AddButton";
import { EmptyState } from "@/components/EmptyState";
import { TagInput } from "@/components/TagInput";
import { useVaultItems, useBlobUrl, filterItems } from "@/hooks/use-vault";
import { vault, type VaultItem } from "@/lib/vault-storage";
import { Mic, Play, Pause, Square, Upload, Star, Trash2, X } from "lucide-react";

export const Route = createFileRoute("/voice")({
  head: () => ({ meta: [{ title: "Voice — My Capture Vault" }, { name: "description", content: "Record voice notes before they vanish." }] }),
  component: VoicePage,
});

function VoicePage() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const items = filterItems(useVaultItems("voice"), q);

  return (
    <AppShell search={q} onSearch={setQ}>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="font-display text-4xl">Voice</h1>
          <p className="text-sm text-muted-foreground">Speak it. Save it. Find it later.</p>
        </div>
        <span className="text-xs text-muted-foreground">{items.length} clips</span>
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon={<Mic className="h-8 w-8 text-[hsl(0_0%_10%)]" />}
          title="Nothing recorded yet"
          description="Tap the glowing button to start your first voice memo."
          action={
            <button onClick={() => setOpen(true)} className="rounded-full bg-aurora px-5 py-2.5 text-sm font-semibold text-[hsl(0_0%_10%)] shadow-[var(--shadow-glow)]">
              Record voice note
            </button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {items.map((item) => <VoiceCard key={item.id} item={item} />)}
        </div>
      )}

      <AddButton onClick={() => setOpen(true)} label="New voice note" />
      {open && <VoiceRecorder onClose={() => setOpen(false)} />}
    </AppShell>
  );
}

function Waveform({ playing }: { playing: boolean }) {
  return (
    <div className="flex h-10 items-center gap-[3px]">
      {Array.from({ length: 32 }).map((_, i) => {
        const h = 20 + Math.abs(Math.sin(i * 0.7)) * 70;
        return (
          <span
            key={i}
            className="w-[3px] rounded-full bg-aurora transition-all"
            style={{
              height: `${h}%`,
              opacity: playing ? 0.9 : 0.55,
              animation: playing ? `pulse 1.${i % 9}s ease-in-out infinite` : undefined,
            }}
          />
        );
      })}
    </div>
  );
}

function VoiceCard({ item }: { item: VaultItem }) {
  const url = useBlobUrl(item.blobKey);
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onEnd = () => setPlaying(false);
    el.addEventListener("ended", onEnd);
    return () => el.removeEventListener("ended", onEnd);
  }, []);
  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (playing) { el.pause(); setPlaying(false); }
    else { el.play(); setPlaying(true); }
  };
  return (
    <div className="glass animate-fade-up flex items-center gap-4 rounded-3xl p-5">
      <button
        onClick={toggle}
        className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-aurora text-[hsl(0_0%_10%)] shadow-[var(--shadow-glow)]"
      >
        {playing ? <Pause className="h-6 w-6" /> : <Play className="ml-0.5 h-6 w-6" />}
      </button>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate font-medium">{item.title || "Voice note"}</p>
          <div className="flex gap-1">
            <button onClick={() => vault.toggleFavorite(item.id)} className="rounded-full p-1.5 hover:bg-white/10">
              <Star className={`h-3.5 w-3.5 ${item.favorite ? "fill-[var(--peach)] text-[var(--peach)]" : ""}`} />
            </button>
            <button onClick={() => vault.remove(item.id)} className="rounded-full p-1.5 hover:bg-white/10">
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
        <Waveform playing={playing} />
        <div className="mt-1 flex items-center justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
          <span>{new Date(item.createdAt).toLocaleString()}</span>
          {item.durationMs ? <span>{Math.round(item.durationMs / 1000)}s</span> : null}
        </div>
      </div>
      {url && <audio ref={ref} src={url} preload="metadata" />}
    </div>
  );
}

function VoiceRecorder({ onClose }: { onClose: () => void }) {
  const [recording, setRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const recRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const startRef = useRef(0);
  const timerRef = useRef<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!blob) return setPreview(null);
    const u = URL.createObjectURL(blob);
    setPreview(u);
    return () => URL.revokeObjectURL(u);
  }, [blob]);

  const start = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      chunksRef.current = [];
      rec.ondataavailable = (e) => e.data.size && chunksRef.current.push(e.data);
      rec.onstop = () => {
        const b = new Blob(chunksRef.current, { type: "audio/webm" });
        setBlob(b);
        stream.getTracks().forEach((t) => t.stop());
      };
      rec.start();
      recRef.current = rec;
      startRef.current = Date.now();
      setRecording(true);
      timerRef.current = window.setInterval(() => setElapsed(Date.now() - startRef.current), 100);
    } catch {
      alert("Microphone permission was denied.");
    }
  };
  const stop = () => {
    recRef.current?.stop();
    setRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };
  const save = async () => {
    if (!blob) return;
    await vault.add({ kind: "voice", title: title || undefined, tags, blob, mimeType: blob.type, durationMs: elapsed });
    onClose();
  };

  const secs = Math.floor(elapsed / 1000);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-md sm:items-center sm:p-6">
      <div className="glass-strong relative w-full max-w-lg rounded-t-3xl p-6 sm:rounded-3xl animate-fade-up">
        <button onClick={onClose} className="absolute right-3 top-3 rounded-full bg-black/40 p-1.5"><X className="h-4 w-4" /></button>
        <h3 className="font-display text-2xl">Voice memo</h3>

        <div className="mt-6 grid place-items-center gap-3">
          <button
            onClick={recording ? stop : start}
            className={`grid h-28 w-28 place-items-center rounded-full text-[hsl(0_0%_10%)] shadow-[var(--shadow-glow)] transition ${
              recording ? "bg-[var(--blush)] animate-pulse-glow" : "bg-aurora hover:scale-105"
            }`}
          >
            {recording ? <Square className="h-9 w-9 fill-current" /> : <Mic className="h-10 w-10" />}
          </button>
          <p className="font-mono text-xl tabular-nums">
            {String(Math.floor(secs / 60)).padStart(2, "0")}:{String(secs % 60).padStart(2, "0")}
          </p>
          <p className="text-xs text-muted-foreground">{recording ? "Recording… tap to stop" : blob ? "Recorded — review below" : "Tap the mic to start"}</p>
          {!recording && !blob && (
            <>
              <button onClick={() => fileRef.current?.click()} className="glass rounded-full px-4 py-2 text-sm">
                <Upload className="mr-1 inline h-4 w-4" /> Or upload audio file
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && setBlob(e.target.files[0])}
              />
            </>
          )}
        </div>

        {preview && <audio src={preview} controls className="mt-4 w-full" />}

        {blob && (
          <div className="mt-4 space-y-3">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title (optional)"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm outline-none focus:border-white/25"
            />
            <TagInput tags={tags} onChange={setTags} />
          </div>
        )}

        <div className="mt-5 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground">Cancel</button>
          <button
            onClick={save}
            disabled={!blob}
            className="rounded-full bg-aurora px-5 py-2 text-sm font-semibold text-[hsl(0_0%_10%)] shadow-[var(--shadow-glow)] disabled:opacity-50"
          >
            Save voice note
          </button>
        </div>
      </div>
    </div>
  );
}
