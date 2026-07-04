import { useEffect, useRef, useState } from "react";
import { X, Upload, Camera, Clipboard } from "lucide-react";
import { vault } from "@/lib/vault-storage";
import { TagInput } from "./TagInput";

export function PicUploader({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [file, setFile] = useState<File | Blob | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (!file) return setPreview(null);
    const u = URL.createObjectURL(file);
    setPreview(u);
    return () => URL.revokeObjectURL(u);
  }, [file]);

  useEffect(() => {
    if (!open) return;
    const onPaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const it of items) {
        if (it.type.startsWith("image/")) {
          const f = it.getAsFile();
          if (f) setFile(f);
        }
      }
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [open]);

  const reset = () => {
    setFile(null);
    setTitle("");
    setTags([]);
  };

  const save = async () => {
    if (!file) return;
    await vault.add({ kind: "pic", title: title || undefined, tags, blob: file, mimeType: file.type });
    reset();
    onClose();
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-md sm:items-center sm:p-6">
      <div className="glass-strong relative w-full max-w-lg overflow-hidden rounded-t-3xl sm:rounded-3xl animate-fade-up">
        <button onClick={onClose} className="absolute right-3 top-3 z-10 rounded-full bg-black/40 p-1.5 text-white">
          <X className="h-4 w-4" />
        </button>
        <div className="p-5 sm:p-6">
          <h3 className="font-display text-2xl">Save a picture</h3>
          <p className="mt-1 text-xs text-muted-foreground">Upload, drag, paste (⌘V) or capture.</p>

          {!preview ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                const f = e.dataTransfer.files?.[0];
                if (f && f.type.startsWith("image/")) setFile(f);
              }}
              className={`mt-4 grid place-items-center rounded-3xl border-2 border-dashed p-8 text-center transition ${
                dragging ? "border-[var(--lavender)] bg-white/10" : "border-white/15 bg-white/5"
              }`}
            >
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-aurora shadow-[var(--shadow-glow)]">
                <Upload className="h-7 w-7 text-[hsl(0_0%_10%)]" />
              </div>
              <p className="mt-3 text-sm">Drop an image here</p>
              <p className="text-xs text-muted-foreground">or paste a screenshot with ⌘V / Ctrl+V</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <button onClick={() => inputRef.current?.click()} className="glass rounded-full px-4 py-2 text-sm">
                  <Upload className="mr-1 inline h-4 w-4" /> Choose file
                </button>
                <button onClick={() => cameraRef.current?.click()} className="glass rounded-full px-4 py-2 text-sm">
                  <Camera className="mr-1 inline h-4 w-4" /> Camera
                </button>
                <button
                  onClick={async () => {
                    try {
                      const items = await (navigator.clipboard as Clipboard & { read?: () => Promise<ClipboardItem[]> }).read?.();
                      if (!items) return;
                      for (const it of items) {
                        const type = it.types.find((t) => t.startsWith("image/"));
                        if (type) setFile(await it.getType(type));
                      }
                    } catch {}
                  }}
                  className="glass rounded-full px-4 py-2 text-sm"
                >
                  <Clipboard className="mr-1 inline h-4 w-4" /> Paste
                </button>
              </div>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0])}
              />
              <input
                ref={cameraRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0])}
              />
            </div>
          ) : (
            <div className="mt-4 overflow-hidden rounded-2xl">
              <img src={preview} alt="" className="max-h-64 w-full object-cover" />
            </div>
          )}

          <div className="mt-4 space-y-3">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title (optional)"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm outline-none focus:border-white/25"
            />
            <TagInput tags={tags} onChange={setTags} />
          </div>

          <div className="mt-5 flex justify-end gap-2">
            <button onClick={onClose} className="rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground">
              Cancel
            </button>
            <button
              onClick={save}
              disabled={!file}
              className="rounded-full bg-aurora px-5 py-2 text-sm font-semibold text-[hsl(0_0%_10%)] shadow-[var(--shadow-glow)] disabled:opacity-50"
            >
              Save to vault
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
