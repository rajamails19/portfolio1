import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Pencil, Redo2, Save, Undo2, X } from "lucide-react";
import type { Block, QAItem } from "@/content/types";
import { applyEdit, type EditOp } from "@/lib/rich-edit";

// Editing is a local authoring tool: it only exists on the dev server, where
// the qa-edit Vite plugin can write the result back into src/content/qans.ts.
const ENABLED = import.meta.env.DEV;

interface EditCtx {
  enabled: boolean;
  editing: boolean;
  setEditing: (v: boolean) => void;
  answerFor: (item: QAItem) => Block[];
}

const Ctx = createContext<EditCtx>({
  enabled: false,
  editing: false,
  setEditing: () => {},
  answerFor: (item) => item.answer,
});

export const useEditMode = () => useContext(Ctx);

type Selection_ = {
  itemId: string;
  block: number;
  listItem: number | null;
  start: number;
  end: number;
};

function blockEl(node: Node | null): Element | null {
  const el = node && node.nodeType === 1 ? (node as Element) : (node?.parentElement ?? null);
  return el?.closest("[data-qa-b]") ?? null;
}

function readSelection(): Selection_ | string {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return "Select some text in an answer first.";
  const range = sel.getRangeAt(0);
  const a = blockEl(range.startContainer);
  const b = blockEl(range.endContainer);
  if (!a || !b) return "Select text inside an answer.";
  if (a !== b) return "Select inside one paragraph or bullet.";
  const itemId = a.closest("[data-qa-item]")?.getAttribute("data-qa-item");
  if (!itemId) return "Select text inside an answer.";
  const offset = (container: Node, off: number) => {
    const r = document.createRange();
    r.selectNodeContents(a);
    r.setEnd(container, off);
    return r.toString().length;
  };
  const listAttr = a.getAttribute("data-qa-l");
  return {
    itemId,
    block: Number(a.getAttribute("data-qa-b")),
    listItem: listAttr === null ? null : Number(listAttr),
    start: offset(range.startContainer, range.startOffset),
    end: offset(range.endContainer, range.endOffset),
  };
}

type Overrides = Record<string, { base: Block[]; answer: Block[] }>;
const MAX_HISTORY = 100;

export function EditProvider({ children }: { children: ReactNode }) {
  const [editing, setEditingState] = useState(false);
  // Edits are staged in memory (with undo/redo) and only written on Save.
  const [hist, setHist] = useState<{ stack: Overrides[]; i: number }>({ stack: [{}], i: 0 });
  const [message, setMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const registry = useRef(new Map<string, Block[]>());
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const overrides = hist.stack[hist.i];

  // Only edits made against the answer currently in qans.ts count; if the file
  // changed underneath (HMR), those stale edits drop out automatically.
  const pending = useMemo(
    () => Object.entries(overrides).filter(([id, o]) => registry.current.get(id) === o.base),
    [overrides],
  );
  const dirty = pending.length;

  const flash = useCallback((m: string) => {
    setMessage(m);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(null), 2600);
  }, []);

  const reset = useCallback(() => setHist({ stack: [{}], i: 0 }), []);

  const setEditing = useCallback(
    (v: boolean) => {
      if (
        !v &&
        dirty > 0 &&
        !window.confirm(`Discard ${dirty} unsaved edit${dirty > 1 ? "s" : ""}?`)
      )
        return;
      if (!v) reset();
      setEditingState(ENABLED && v);
    },
    [dirty, reset],
  );

  useEffect(() => {
    document.body.classList.toggle("qa-editing", editing);
    return () => document.body.classList.remove("qa-editing");
  }, [editing]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const answerFor = useCallback(
    (item: QAItem) => {
      registry.current.set(item.id, item.answer);
      const o = overrides[item.id];
      return o && o.base === item.answer ? o.answer : item.answer;
    },
    [overrides],
  );

  const apply = useCallback(
    (op: EditOp) => {
      const sel = readSelection();
      if (typeof sel === "string") return flash(sel);
      const base = registry.current.get(sel.itemId);
      if (!base) return flash("Couldn't find that answer.");
      const current = overrides[sel.itemId]?.base === base ? overrides[sel.itemId].answer : base;
      const result = applyEdit(current, sel, op);
      if ("error" in result) return flash(result.error);
      window.getSelection()?.removeAllRanges();
      setHist(({ stack, i }) => {
        const next = { ...stack[i], [sel.itemId]: { base, answer: result.answer } };
        const trimmed = [...stack.slice(0, i + 1), next].slice(-MAX_HISTORY);
        return { stack: trimmed, i: trimmed.length - 1 };
      });
    },
    [overrides, flash],
  );

  const undo = useCallback(() => setHist((h) => ({ ...h, i: Math.max(0, h.i - 1) })), []);
  const redo = useCallback(
    () => setHist((h) => ({ ...h, i: Math.min(h.stack.length - 1, h.i + 1) })),
    [],
  );

  const discard = useCallback(() => {
    if (dirty && window.confirm(`Discard ${dirty} unsaved edit${dirty > 1 ? "s" : ""}?`)) {
      reset();
      flash("Edits discarded");
    }
  }, [dirty, reset, flash]);

  const save = useCallback(async () => {
    if (!dirty || saving) return;
    setSaving(true);
    try {
      const res = await fetch("/__qa-edit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ edits: pending.map(([id, o]) => ({ id, answer: o.answer })) }),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? "Save failed");
      reset();
      flash(`Saved ${dirty} answer${dirty > 1 ? "s" : ""} to qans.ts`);
    } catch (e) {
      flash(`Not saved: ${(e as Error).message}`);
    } finally {
      setSaving(false);
    }
  }, [dirty, saving, pending, reset, flash]);

  // Ctrl/Cmd+Z, Shift+Z (or Y), Ctrl/Cmd+S while editing.
  useEffect(() => {
    if (!editing) return;
    const onKey = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey)) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      const k = e.key.toLowerCase();
      if (k === "z") {
        e.preventDefault();
        if (e.shiftKey) redo();
        else undo();
      } else if (k === "y") {
        e.preventDefault();
        redo();
      } else if (k === "s") {
        e.preventDefault();
        void save();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [editing, undo, redo, save]);

  const value = useMemo(
    () => ({ enabled: ENABLED, editing, setEditing, answerFor }),
    [editing, setEditing, answerFor],
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      {ENABLED && editing && (
        <EditToolbar
          onApply={apply}
          message={message}
          onClose={() => setEditing(false)}
          dirty={dirty}
          saving={saving}
          canUndo={hist.i > 0}
          canRedo={hist.i < hist.stack.length - 1}
          onUndo={undo}
          onRedo={redo}
          onSave={save}
          onDiscard={discard}
        />
      )}
    </Ctx.Provider>
  );
}

const TOOLS: { op: EditOp; code: string; name: string; face: string }[] = [
  { op: "bold", code: "GB", name: "Gold Bold", face: "font-bold text-gold-ink" },
  {
    op: "mark",
    code: "YH",
    name: "Yellow Highlight",
    face: "hl bg-gold text-[oklch(0.2_0.03_85)]",
  },
  { op: "rose", code: "RH", name: "Rose Highlight", face: "hl hl-rose" },
  {
    op: "under",
    code: "BU",
    name: "Bold Underline",
    face: "underline decoration-[oklch(0.76_0.16_160)] decoration-[3px] underline-offset-4",
  },
  {
    op: "code",
    code: "CC",
    name: "Code Chip",
    face: "rounded-md border border-gold/25 bg-noir/70 px-1.5 font-mono text-gold-ink",
  },
  {
    op: "heading",
    code: "HD",
    name: "Heading (toggle) — click inside a line",
    face: "font-display font-semibold text-gold-ink",
  },
  {
    op: "spotlight",
    code: "SB",
    name: "Spotlight Box (toggle) — click inside a line",
    face: "rounded-md px-1.5 ring-1 ring-[oklch(0.72_0.14_295)]/60 bg-[oklch(0.72_0.14_295)]/20",
  },
  {
    op: "clear",
    code: "PL",
    name: "Plain — clears the selection, or resets the line",
    face: "text-foreground/80",
  },
];

function EditToolbar({
  onApply,
  message,
  onClose,
  dirty,
  saving,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onSave,
  onDiscard,
}: {
  onApply: (op: EditOp) => void;
  message: string | null;
  onClose: () => void;
  dirty: number;
  saving: boolean;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onSave: () => void;
  onDiscard: () => void;
}) {
  // Keep the text selection alive while a toolbar button is pressed.
  const keepSelection = (e: React.MouseEvent) => e.preventDefault();
  const iconBtn =
    "flex h-9 w-9 items-center justify-center rounded-xl border border-gold/20 bg-noir/50 text-foreground/80 transition hover:border-gold/60 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-gold/20";
  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[calc(100vw-2rem)] max-w-xl -translate-x-1/2 rounded-2xl border border-gold/30 bg-card/95 p-2.5 shadow-glow backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-center gap-1">
        {TOOLS.map((t) => (
          <button
            key={t.op}
            type="button"
            title={t.name}
            onMouseDown={keepSelection}
            onClick={() => onApply(t.op)}
            className="flex h-9 min-w-[3rem] items-center justify-center rounded-xl border border-gold/20 bg-noir/50 px-2 text-xs transition hover:border-gold/60 hover:bg-noir/80"
          >
            <span className={`${t.face} leading-none`}>{t.code}</span>
          </button>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-1.5 border-t border-gold/15 pt-2">
        <button
          type="button"
          title="Undo (Ctrl/Cmd+Z)"
          aria-label="Undo"
          disabled={!canUndo}
          onMouseDown={keepSelection}
          onClick={onUndo}
          className={iconBtn}
        >
          <Undo2 className="h-4 w-4" />
        </button>
        <button
          type="button"
          title="Redo (Ctrl/Cmd+Shift+Z)"
          aria-label="Redo"
          disabled={!canRedo}
          onMouseDown={keepSelection}
          onClick={onRedo}
          className={iconBtn}
        >
          <Redo2 className="h-4 w-4" />
        </button>
        <p className="min-w-0 flex-1 truncate px-1 text-center text-[11px] text-foreground/60">
          {message ??
            (dirty
              ? `${dirty} unsaved — click Save to keep`
              : "Select words, then tap a code. Tap again to undo.")}
        </p>
        <button
          type="button"
          onClick={onDiscard}
          disabled={!dirty}
          className="h-9 rounded-xl border border-gold/20 bg-noir/50 px-3 text-xs font-semibold text-foreground/80 transition hover:border-ember/70 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-gold/20"
        >
          Discard
        </button>
        <button
          type="button"
          onClick={onSave}
          disabled={!dirty || saving}
          title="Save to qans.ts (Ctrl/Cmd+S)"
          className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-gradient-to-br from-gold to-ember px-3 text-xs font-bold text-primary-foreground shadow-glow transition disabled:cursor-not-allowed disabled:opacity-35 disabled:shadow-none"
        >
          <Save className="h-3.5 w-3.5" />
          {saving ? "Saving…" : dirty ? `Save (${dirty})` : "Save"}
        </button>
        <button
          type="button"
          onClick={onClose}
          title="Close editor"
          aria-label="Close editor"
          className={iconBtn}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function EditToggle() {
  const { enabled, editing, setEditing } = useEditMode();
  if (!enabled) return null;
  return (
    <button
      type="button"
      onClick={() => setEditing(!editing)}
      aria-pressed={editing}
      aria-label="Edit answers"
      title="Edit answers"
      className={[
        "inline-flex h-[26px] w-[26px] items-center justify-center rounded-full border transition",
        editing
          ? "border-transparent bg-gradient-to-br from-gold to-ember text-primary-foreground shadow-glow"
          : "border-gold/25 bg-noir/60 text-foreground/80 hover:border-gold/60 hover:text-foreground",
      ].join(" ")}
    >
      <Pencil className="h-3.5 w-3.5" />
    </button>
  );
}
