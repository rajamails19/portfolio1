import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ClipboardEvent,
  type DragEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Cloud,
  CloudOff,
  CloudUpload,
  ImagePlus,
  LogOut,
  Maximize2,
  Pencil,
  Trash2,
  X,
} from "lucide-react";
import { useCertAuth } from "@/hooks/use-cert-auth";
import { useCertNotes } from "@/hooks/use-cert-notes";
import {
  cloudStore,
  countLocalItems,
  errorMessage,
  localStore,
  uploadLocalToCloud,
} from "@/lib/cert-notes-store";
import type { CertNote, CertPhoto } from "@/lib/cert-notes-db";
import { imageFileToDataUrl } from "@/lib/image-resize";
import { renderInline } from "@/lib/rich-text";
import { PhotoLightbox } from "./PhotoLightbox";

/* ───────────────────────── note text → formatted view ───────────────────────── */

/** Turn bare URLs into markdown links, and drop links with non-http(s) schemes. */
function prepare(line: string): string {
  const safe = line.replace(/\[([^\]]+)\]\((?!https?:\/\/|mailto:)[^)]*\)/g, "$1");
  return safe.replace(/(^|\s)(https?:\/\/[^\s)]+)/g, (_m, pre: string, raw: string) => {
    const trail = /[.,;:!?]+$/.exec(raw)?.[0] ?? "";
    const url = trail ? raw.slice(0, -trail.length) : raw;
    return `${pre}[${url}](${url})${trail}`;
  });
}

function NoteText({ text }: { text: string }) {
  const lines = text.replace(/\r\n/g, "\n").replace(/\t/g, "    ").split("\n");

  return (
    <div className="min-w-0 space-y-1 break-words text-[15px] leading-relaxed text-foreground/90">
      {lines.map((raw, i) => {
        if (!raw.trim()) return <div key={i} className="h-2" />;

        const heading = /^\s{0,3}(#{1,3})\s+(.*)$/.exec(raw);
        if (heading) {
          return (
            <h5 key={i} className="pt-2 font-display text-base font-semibold text-foreground">
              {renderInline(prepare(heading[2]))}
            </h5>
          );
        }

        const bullet = /^(\s*)([*\-•–])\s+(.*)$/.exec(raw);
        const numbered = bullet ? null : /^(\s*)(\d+[.)])\s+(.*)$/.exec(raw);
        const m = bullet ?? numbered;
        if (m) {
          const level = Math.min(3, Math.ceil(m[1].length / 4));
          return (
            <div
              key={i}
              className="flex min-w-0 gap-2"
              style={{ paddingLeft: `${level * 1.1}rem` }}
            >
              {bullet ? (
                <span
                  aria-hidden
                  className={[
                    "mt-[0.62em] h-1.5 w-1.5 shrink-0 rounded-full",
                    level === 0 ? "bg-gold" : "border border-gold bg-transparent",
                  ].join(" ")}
                />
              ) : (
                <span className="shrink-0 font-semibold tabular-nums text-gold-ink">{m[2]}</span>
              )}
              <span className="min-w-0 flex-1">{renderInline(prepare(m[3]))}</span>
            </div>
          );
        }

        return <div key={i}>{renderInline(prepare(raw))}</div>;
      })}
    </div>
  );
}

/* ───────────────────────── small shared pieces ───────────────────────── */

const iconBtn =
  "inline-flex h-8 w-8 items-center justify-center rounded-full border border-gold/20 bg-noir/50 text-foreground/70 transition hover:border-gold/50 hover:text-foreground";

const primaryBtn =
  "inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-br from-gold to-ember px-5 py-2 text-sm font-bold text-primary-foreground shadow-glow transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-40";

const secondaryBtn =
  "inline-flex items-center justify-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-sm font-semibold text-gold-ink transition hover:bg-gold/20 disabled:opacity-40";

const textareaCls =
  "w-full resize-y rounded-2xl border border-gold/20 bg-noir/60 p-3 text-base leading-relaxed text-foreground placeholder:text-foreground/40 focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/30 sm:text-sm";

function DeleteButton({ onConfirm, label }: { onConfirm: () => void; label: string }) {
  const [asking, setAsking] = useState(false);
  if (!asking) {
    return (
      <button type="button" className={iconBtn} aria-label={label} onClick={() => setAsking(true)}>
        <Trash2 className="h-4 w-4" />
      </button>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-ember/40 bg-ember/10 py-0.5 pl-3 pr-1 text-xs font-semibold text-ember">
      Delete?
      <button
        type="button"
        className="rounded-full bg-ember px-2.5 py-1 text-primary-foreground"
        onClick={() => {
          setAsking(false);
          onConfirm();
        }}
      >
        Yes
      </button>
      <button
        type="button"
        className="rounded-full px-2 py-1 text-foreground/70 hover:text-foreground"
        onClick={() => setAsking(false)}
      >
        No
      </button>
    </span>
  );
}

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function Section({
  title,
  count,
  actions,
  children,
}: {
  title: string;
  count: number;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <section>
      <div className="mb-2 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex min-w-0 flex-1 items-center gap-2 text-left"
        >
          <h4 className="flex items-center gap-2 font-display text-base font-semibold text-foreground">
            {title}
            <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[11px] font-bold tabular-nums text-gold-ink">
              {count}
            </span>
          </h4>
          <ChevronDown
            className={[
              "h-4 w-4 shrink-0 text-foreground/50 transition-transform duration-200",
              open ? "" : "-rotate-90",
            ].join(" ")}
          />
        </button>
        {open && actions}
      </div>
      {open && children}
    </section>
  );
}

/** First readable line of a note, with list/heading/markdown syntax stripped. */
function previewOf(text: string): string {
  const line = text
    .split("\n")
    .map((l) =>
      l
        .replace(/^\s*([*\-•–]|#{1,3}|\d+[.)])\s+/, "")
        .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
        .replace(/\*\*|__|==|`/g, "")
        .trim(),
    )
    .find(Boolean);
  return line ?? "";
}

/* ───────────────────────── composer ───────────────────────── */

type Pending = { id: string; dataUrl: string; caption: string };

function Composer({
  cert,
  disabled,
  onSave,
}: {
  cert: string;
  disabled: boolean;
  onSave: (text: string, photos: { dataUrl: string; caption: string }[]) => Promise<void>;
}) {
  const draftKey = `studydeck:cert-notes-draft:v1:${cert}`;
  const [text, setText] = useState("");
  const [pending, setPending] = useState<Pending[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [draftRestored, setDraftRestored] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Restore an unsaved draft so switching tabs doesn't lose what you were typing.
  useEffect(() => {
    try {
      setText(localStorage.getItem(draftKey) ?? "");
    } catch {
      /* storage blocked — draft just won't persist */
    }
    setDraftRestored(true);
  }, [draftKey]);

  // Only start saving once the restore has landed in state — otherwise the
  // first pass would overwrite the stored draft with the still-empty text.
  useEffect(() => {
    if (!draftRestored) return;
    try {
      if (text) localStorage.setItem(draftKey, text);
      else localStorage.removeItem(draftKey);
    } catch {
      /* ignore */
    }
  }, [text, draftKey, draftRestored]);

  const addFiles = async (files: File[]) => {
    const images = files.filter((f) => f.type.startsWith("image/"));
    if (!images.length) return;
    setError(null);
    try {
      const next: Pending[] = [];
      for (const f of images) {
        next.push({
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          dataUrl: await imageFileToDataUrl(f),
          caption: "",
        });
      }
      setPending((p) => [...p, ...next]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't read that image.");
    }
  };

  const onPaste = (e: ClipboardEvent<HTMLTextAreaElement>) => {
    const files = [...e.clipboardData.files];
    if (files.some((f) => f.type.startsWith("image/"))) {
      e.preventDefault();
      void addFiles(files);
    }
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    void addFiles([...e.dataTransfer.files]);
  };

  const canSave = !disabled && !busy && (text.trim().length > 0 || pending.length > 0);

  const save = async () => {
    if (!canSave) return;
    setBusy(true);
    setError(null);
    try {
      await onSave(
        text,
        pending.map((p) => ({ dataUrl: p.dataUrl, caption: p.caption })),
      );
      setText("");
      setPending([]);
    } catch {
      setError("Couldn’t save — your browser’s storage may be blocked or full.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      className={[
        "rounded-2xl border bg-noir/40 p-3 transition sm:p-4",
        dragging ? "border-gold/70 ring-2 ring-gold/30" : "border-gold/15",
      ].join(" ")}
    >
      <label htmlFor={`note-${cert}`} className="sr-only">
        Write a note
      </label>
      <textarea
        id={`note-${cert}`}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onPaste={onPaste}
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            void save();
          }
        }}
        rows={6}
        disabled={disabled}
        placeholder={
          "Paste links, bullets, key lines…\n* bullets, 1. numbered lists, # headings, **bold** and [links](https://…) are formatted when saved.\nPaste or drop a screenshot to attach it."
        }
        className={textareaCls}
      />

      {pending.length > 0 && (
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {pending.map((p) => (
            <li
              key={p.id}
              className="flex items-center gap-2 rounded-xl border border-gold/15 bg-noir/50 p-2"
            >
              <img src={p.dataUrl} alt="" className="h-14 w-14 shrink-0 rounded-lg object-cover" />
              <input
                value={p.caption}
                onChange={(e) =>
                  setPending((all) =>
                    all.map((x) => (x.id === p.id ? { ...x, caption: e.target.value } : x)),
                  )
                }
                placeholder="Caption (optional)"
                aria-label="Photo caption"
                className="min-w-0 flex-1 rounded-lg border border-gold/15 bg-noir/60 px-2 py-1.5 text-base text-foreground placeholder:text-foreground/40 focus:border-gold/50 focus:outline-none sm:text-sm"
              />
              <button
                type="button"
                className={iconBtn}
                aria-label="Remove photo"
                onClick={() => setPending((all) => all.filter((x) => x.id !== p.id))}
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {error && (
        <p role="alert" className="mt-2 text-sm text-ember">
          {error}
        </p>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            void addFiles([...(e.target.files ?? [])]);
            e.target.value = "";
          }}
        />
        <button
          type="button"
          className={secondaryBtn}
          disabled={disabled}
          onClick={() => fileRef.current?.click()}
        >
          <ImagePlus className="h-4 w-4" /> Attach photo
        </button>
        <button type="button" className={`${primaryBtn} ml-auto`} disabled={!canSave} onClick={save}>
          {busy ? "Saving…" : "Save"}
        </button>
      </div>
    </div>
  );
}

/* ───────────────────────── notes list ───────────────────────── */

function NoteItem({
  note,
  index,
  collapsed,
  onToggle,
  onUpdate,
  onDelete,
}: {
  note: CertNote;
  index: number;
  collapsed: boolean;
  onToggle: () => void;
  onUpdate: (text: string) => Promise<void>;
  onDelete: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(note.text);
  const [error, setError] = useState(false);
  // Editing always shows the body, even if the note was collapsed.
  const showBody = editing || !collapsed;

  const commit = async () => {
    if (!draft.trim()) return;
    try {
      await onUpdate(draft);
      setEditing(false);
      setError(false);
    } catch {
      setError(true);
    }
  };

  return (
    <li className="rounded-2xl border border-gold/15 bg-noir/40 p-3 sm:p-4">
      <div className={["flex items-center gap-2", showBody ? "mb-2" : ""].join(" ")}>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={showBody}
          aria-label={`${showBody ? "Collapse" : "Expand"} note ${index + 1}`}
          className="flex min-w-0 flex-1 items-center gap-2 text-left"
        >
          <span className="flex h-7 min-w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-gold to-ember px-1.5 font-display text-xs font-bold text-primary-foreground">
            {index + 1}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-xs text-muted-foreground">
              {formatDate(note.createdAt)}
              {note.updatedAt !== note.createdAt && " · edited"}
            </span>
            {!showBody && (
              <span className="block truncate text-sm font-medium text-foreground/85">
                {previewOf(note.text) || "Empty note"}
              </span>
            )}
          </span>
        </button>
        {!editing && (
          <>
            <button
              type="button"
              className={iconBtn}
              aria-label={`Edit note ${index + 1}`}
              onClick={() => {
                setDraft(note.text);
                setEditing(true);
              }}
            >
              <Pencil className="h-4 w-4" />
            </button>
            <DeleteButton label={`Delete note ${index + 1}`} onConfirm={onDelete} />
            <button
              type="button"
              className={iconBtn}
              onClick={onToggle}
              aria-hidden
              tabIndex={-1}
            >
              <ChevronDown
                className={["h-4 w-4 transition-transform", collapsed ? "-rotate-90" : ""].join(" ")}
              />
            </button>
          </>
        )}
      </div>

      {!showBody ? null : editing ? (
        <div className="space-y-2">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={Math.min(14, Math.max(5, draft.split("\n").length + 1))}
            aria-label={`Edit note ${index + 1}`}
            className={textareaCls}
            autoFocus
          />
          {error && (
            <p role="alert" className="text-sm text-ember">
              Couldn’t save the change.
            </p>
          )}
          <div className="flex gap-2">
            <button type="button" className={primaryBtn} disabled={!draft.trim()} onClick={commit}>
              <Check className="h-4 w-4" /> Save changes
            </button>
            <button type="button" className={secondaryBtn} onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <NoteText text={note.text} />
      )}
    </li>
  );
}

/* ───────────────────────── photo slideshow ───────────────────────── */

function PhotoGallery({
  photos,
  onCaption,
  onDelete,
}: {
  photos: CertPhoto[];
  onCaption: (id: string, caption: string) => Promise<void>;
  onDelete: (id: string) => void;
}) {
  const [index, setIndex] = useState(0);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const [enlarged, setEnlarged] = useState(false);

  const i = Math.min(index, photos.length - 1);
  const photo = photos[i];

  // Jump to the newest photo when one is added.
  const prevCount = useRef(photos.length);
  useEffect(() => {
    if (photos.length > prevCount.current) setIndex(photos.length - 1);
    prevCount.current = photos.length;
  }, [photos.length]);

  if (!photo) return null;
  const last = photos.length - 1;

  return (
    <div className="overflow-hidden rounded-2xl border border-gold/20 bg-noir/40">
      <div className="relative flex items-center justify-center bg-[oklch(0.98_0.005_85)] p-2 sm:p-4">
        <button
          type="button"
          onClick={() => setEnlarged(true)}
          aria-label="Enlarge photo"
          className="cursor-zoom-in"
        >
          <img
            src={photo.dataUrl}
            alt={photo.caption || `Photo ${i + 1}`}
            className="max-h-[420px] w-auto max-w-full"
          />
        </button>
        <button
          type="button"
          onClick={() => setEnlarged(true)}
          aria-label="Open full-screen viewer"
          className="absolute bottom-3 right-3 inline-flex h-9 items-center gap-1.5 rounded-full bg-black/65 px-3 text-xs font-semibold text-white transition hover:bg-black/80"
        >
          <Maximize2 className="h-4 w-4" /> Enlarge
        </button>
      </div>
      <PhotoLightbox
        photos={photos}
        index={i}
        open={enlarged}
        onIndexChange={setIndex}
        onClose={() => setEnlarged(false)}
      />

      <div className="space-y-2 border-t border-gold/15 p-3">
        {editing ? (
          <div className="flex items-center gap-2">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={async (e) => {
                if (e.key === "Enter") {
                  await onCaption(photo.id, draft);
                  setEditing(false);
                } else if (e.key === "Escape") setEditing(false);
              }}
              placeholder="Caption"
              aria-label="Photo caption"
              autoFocus
              className="min-w-0 flex-1 rounded-lg border border-gold/20 bg-noir/60 px-2 py-1.5 text-base text-foreground focus:border-gold/50 focus:outline-none sm:text-sm"
            />
            <button
              type="button"
              className={iconBtn}
              aria-label="Save caption"
              onClick={async () => {
                await onCaption(photo.id, draft);
                setEditing(false);
              }}
            >
              <Check className="h-4 w-4" />
            </button>
            <button type="button" className={iconBtn} aria-label="Cancel" onClick={() => setEditing(false)}>
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <p className="min-w-0 flex-1 break-words text-sm text-foreground/85">
              {photo.caption || <span className="text-muted-foreground">No caption</span>}
            </p>
            <button
              type="button"
              className={iconBtn}
              aria-label="Edit caption"
              onClick={() => {
                setDraft(photo.caption);
                setEditing(true);
              }}
            >
              <Pencil className="h-4 w-4" />
            </button>
            <DeleteButton label="Delete photo" onConfirm={() => onDelete(photo.id)} />
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            type="button"
            className={iconBtn}
            aria-label="Previous photo"
            disabled={i === 0}
            onClick={() => setIndex(i - 1)}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex min-w-0 flex-1 flex-col items-center gap-1">
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {photos.map((p, k) => (
                <button
                  key={p.id}
                  type="button"
                  aria-label={`Go to photo ${k + 1}`}
                  aria-current={k === i ? "true" : undefined}
                  onClick={() => setIndex(k)}
                  className={[
                    "h-2 rounded-full transition-all",
                    k === i ? "w-5 bg-gold" : "w-2 bg-white/25 hover:bg-white/40",
                  ].join(" ")}
                />
              ))}
            </div>
            <span className="text-[11px] tabular-nums text-muted-foreground">
              {i + 1} / {photos.length}
            </span>
          </div>
          <button
            type="button"
            className={iconBtn}
            aria-label="Next photo"
            disabled={i === last}
            onClick={() => setIndex(i + 1)}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function GoogleLogo() {
  return (
    <svg viewBox="0 0 48 48" className="h-4 w-4 shrink-0" aria-hidden>
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.5l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z" />
      <path fill="#FBBC05" d="M10.5 28.7a14.5 14.5 0 0 1 0-9.4l-7.9-6.1a24 24 0 0 0 0 21.6l7.9-6.1z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.8 2.3-8.4 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
    </svg>
  );
}

/* ───────────────────────── sign-in / sync bar ───────────────────────── */

function CloudBar({
  auth,
  onSynced,
}: {
  auth: ReturnType<typeof useCertAuth>;
  onSynced: () => void;
}) {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [local, setLocal] = useState<{ notes: number; photos: number } | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState<string | null>(null);

  const userId = auth.user?.id;
  useEffect(() => {
    let cancelled = false;
    countLocalItems()
      .then((c) => !cancelled && setLocal(c))
      .catch(() => !cancelled && setLocal(null));
    return () => {
      cancelled = true;
    };
  }, [userId]);

  if (!auth.ready) return null;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) return;
    setBusy(true);
    setError(null);
    try {
      await auth.signIn(email.trim(), password);
      setPassword("");
      setShowForm(false);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    setError(null);
    try {
      await auth.signInWithGoogle(); // leaves the page for Google, so nothing runs after this
    } catch (err) {
      setError(errorMessage(err));
      setShowForm(true);
    }
  };

  const upload = async () => {
    if (!auth.user) return;
    setUploading(true);
    setUploadMsg(null);
    try {
      const r = await uploadLocalToCloud(auth.user.id);
      setUploadMsg(
        r.failed === 0
          ? `Uploaded ${r.uploaded} item${r.uploaded === 1 ? "" : "s"} to your account.`
          : `Uploaded ${r.uploaded}, but ${r.failed} failed: ${r.firstError ?? "unknown error"}. Nothing was lost — try again.`,
      );
      setLocal(await countLocalItems());
      onSynced();
    } catch (err) {
      setUploadMsg(`Upload failed: ${errorMessage(err)}`);
    } finally {
      setUploading(false);
    }
  };

  const pending = (local?.notes ?? 0) + (local?.photos ?? 0);
  const barCls =
    "flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl border border-gold/15 bg-noir/30 px-3 py-2 text-sm";

  return (
    <div className="space-y-2">
      {auth.user ? (
        <div className={barCls}>
          <Cloud className="h-4 w-4 shrink-0 text-gold-ink" />
          <span className="min-w-0 flex-1 break-words text-foreground/85">
            Synced to your account · <span className="text-muted-foreground">{auth.user.email}</span>
          </span>
          <button
            type="button"
            onClick={() => void auth.signOut()}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-gold/25 px-3 py-1 text-xs font-semibold text-foreground/75 transition hover:bg-white/5"
          >
            <LogOut className="h-3.5 w-3.5" /> Sign out
          </button>
        </div>
      ) : (
        <div className={barCls}>
          <CloudOff className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span className="min-w-0 flex-1 text-foreground/85">
            Saved on this device only — sign in to sync everywhere.
          </span>
          <button
            type="button"
            onClick={google}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-bold text-neutral-800 shadow-sm transition hover:bg-neutral-100"
          >
            <GoogleLogo /> Sign in with Google
          </button>
          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            aria-expanded={showForm}
            className="shrink-0 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-bold text-gold-ink transition hover:bg-gold/20"
          >
            {showForm ? "Cancel" : "Use email"}
          </button>
        </div>
      )}

      {!auth.user && showForm && (
        <form
          onSubmit={submit}
          className="grid gap-2 rounded-2xl border border-gold/15 bg-noir/40 p-3 sm:grid-cols-[1fr_1fr_auto]"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            aria-label="Email"
            autoComplete="username"
            required
            className="min-w-0 rounded-xl border border-gold/20 bg-noir/60 px-3 py-2 text-base text-foreground placeholder:text-foreground/40 focus:border-gold/50 focus:outline-none sm:text-sm"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            aria-label="Password"
            autoComplete="current-password"
            required
            className="min-w-0 rounded-xl border border-gold/20 bg-noir/60 px-3 py-2 text-base text-foreground placeholder:text-foreground/40 focus:border-gold/50 focus:outline-none sm:text-sm"
          />
          <button type="submit" className={primaryBtn} disabled={busy || !email.trim() || !password}>
            {busy ? "Signing in…" : "Sign in"}
          </button>
          {error && (
            <p role="alert" className="text-sm text-ember sm:col-span-3">
              {error}
            </p>
          )}
        </form>
      )}

      {auth.user && pending > 0 && (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl border border-gold/30 bg-gold/10 px-3 py-2 text-sm">
          <CloudUpload className="h-4 w-4 shrink-0 text-gold-ink" />
          <span className="min-w-0 flex-1 text-foreground/90">
            {local?.notes ?? 0} note{local?.notes === 1 ? "" : "s"} and {local?.photos ?? 0} photo
            {local?.photos === 1 ? "" : "s"} on this device aren’t in your account yet.
          </span>
          <button type="button" className={primaryBtn} onClick={upload} disabled={uploading}>
            {uploading ? "Uploading…" : "Upload to cloud"}
          </button>
        </div>
      )}
      {uploadMsg && (
        <p role="status" className="text-sm text-foreground/80">
          {uploadMsg}
        </p>
      )}
    </div>
  );
}

/* ───────────────────────── the block ───────────────────────── */

export function MyNotesBlock({ certCode }: { certCode: string }) {
  const auth = useCertAuth();
  const userId = auth.user?.id;
  // Signed in → your cloud account; signed out → this browser only.
  const store = useMemo(() => (userId ? cloudStore(userId) : localStore), [userId]);
  const { status, error, reload, notes, photos, addNote, addPhoto, updateNote, updateCaption, remove } =
    useCertNotes(certCode, store, auth.ready);
  const [actionError, setActionError] = useState<string | null>(null);

  const saveAll = async (text: string, newPhotos: { dataUrl: string; caption: string }[]) => {
    try {
      if (text.trim()) await addNote(text);
      for (const p of newPhotos) await addPhoto(p.dataUrl, p.caption);
    } catch (e) {
      throw new Error(
        store.mode === "cloud"
          ? `Couldn’t save to your account: ${errorMessage(e)}`
          : "Couldn’t save — your browser’s storage may be blocked or full.",
      );
    }
  };

  // Deletes/caption edits run from icon buttons, so surface failures in a banner.
  const guard = async (fn: () => Promise<void>) => {
    try {
      await fn();
      setActionError(null);
    } catch (e) {
      setActionError(errorMessage(e));
    }
  };

  // Ids of collapsed notes — anything not listed (including new notes) is expanded.
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const toggleNote = (id: string) =>
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  const allCollapsed = notes.length > 0 && notes.every((n) => collapsed.has(n.id));

  return (
    <div className="my-3 space-y-5">
      <CloudBar auth={auth} onSynced={reload} />

      {status === "error" && (
        <p role="alert" className="rounded-2xl border border-ember/40 bg-ember/10 p-3 text-sm text-ember">
          {store.mode === "cloud" ? (
            <>
              Couldn’t load your cloud notes: {error}. If you haven’t yet, run{" "}
              <code>supabase/cert-notes.sql</code> in the Supabase SQL editor.
            </>
          ) : (
            "This browser is blocking local storage (a private window can do that), so notes can’t be saved here."
          )}
        </p>
      )}
      {actionError && (
        <p role="alert" className="rounded-2xl border border-ember/40 bg-ember/10 p-3 text-sm text-ember">
          {actionError}
        </p>
      )}

      <Composer cert={certCode} disabled={status === "error"} onSave={saveAll} />

      {status === "loading" && <p className="text-sm text-muted-foreground">Loading your notes…</p>}

      {status === "ready" && (
        <>
          <Section
            title="Notes"
            count={notes.length}
            actions={
              notes.length > 1 ? (
                <button
                  type="button"
                  className="shrink-0 rounded-full border border-gold/25 px-3 py-1 text-xs font-semibold text-foreground/75 transition hover:bg-white/5"
                  onClick={() =>
                    setCollapsed(allCollapsed ? new Set() : new Set(notes.map((n) => n.id)))
                  }
                >
                  {allCollapsed ? "Expand all" : "Collapse all"}
                </button>
              ) : null
            }
          >
            {notes.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-gold/20 p-4 text-sm text-muted-foreground">
                Nothing saved yet — type or paste something above and hit Save. Your notes stay in
                order, oldest first.
              </p>
            ) : (
              <ol className="space-y-3">
                {notes.map((n, k) => (
                  <NoteItem
                    key={n.id}
                    note={n}
                    index={k}
                    collapsed={collapsed.has(n.id)}
                    onToggle={() => toggleNote(n.id)}
                    onUpdate={(t) => updateNote(n.id, t)}
                    onDelete={() => void guard(() => remove(n.id))}
                  />
                ))}
              </ol>
            )}
          </Section>

          <Section title="Photos" count={photos.length}>
            {photos.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-gold/20 p-4 text-sm text-muted-foreground">
                No photos yet — use Attach photo, or paste/drop a screenshot into the box above.
              </p>
            ) : (
              <PhotoGallery
                photos={photos}
                onCaption={(id, c) => guard(() => updateCaption(id, c))}
                onDelete={(id) => void guard(() => remove(id))}
              />
            )}
          </Section>

          <p className="text-xs text-muted-foreground">
            {store.mode === "cloud"
              ? "Saved privately to your account — available wherever you sign in."
              : "Saved privately in this browser only — it won’t appear on other devices or if you clear site data."}
          </p>
        </>
      )}
    </div>
  );
}
