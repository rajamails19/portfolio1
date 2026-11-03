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
import { hashAnswer } from "@/lib/answer-hash";
import { applyOrder, moveId } from "@/lib/answer-order";
import {
  fetchRemoteEdits,
  fetchRemoteOrder,
  remoteConfigured,
  saveRemoteEdits,
  saveRemoteOrder,
  type RemoteEdit,
} from "@/lib/answer-edits";

// Edits go live through Supabase (see answer-edits.ts), so they show up on the
// deployed site and in local dev alike. On the dev server they are also written
// into src/content/qans.ts (qa-edit Vite plugin) so they land in git.
// This is a personal app: the pencil is always there when Supabase is configured.
const DEV = import.meta.env.DEV;

const hashCache = new WeakMap<Block[], string>();
function hashOf(answer: Block[]): string {
  let h = hashCache.get(answer);
  if (!h) {
    h = hashAnswer(answer);
    hashCache.set(answer, h);
  }
  return h;
}

interface EditCtx {
  enabled: boolean;
  editing: boolean;
  setEditing: (v: boolean) => void;
  answerFor: (item: QAItem) => Block[];
  /** Items in the current (staged / live / file) order. */
  orderItems: <T extends QAItem>(items: T[]) => T[];
  /** Move a question to another question's slot; that one shifts along. */
  moveItem: (movedId: string, targetId: string) => void;
}

const Ctx = createContext<EditCtx>({
  enabled: false,
  editing: false,
  setEditing: () => {},
  answerFor: (item) => item.answer,
  orderItems: (items) => items,
  moveItem: () => {},
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
// One undo step: staged answer edits plus a staged question order (null = unchanged).
type Snap = { answers: Overrides; order: string[] | null };
const EMPTY: Snap = { answers: {}, order: null };
const MAX_HISTORY = 100;

export function EditProvider({ children }: { children: ReactNode }) {
  const [editing, setEditingState] = useState(false);
  // Edits are staged in memory (with undo/redo) and only written on Save.
  const [hist, setHist] = useState<{ stack: Snap[]; i: number }>({ stack: [EMPTY], i: 0 });
  const [message, setMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [remote, setRemote] = useState<Record<string, RemoteEdit>>({});
  const enabled = DEV || remoteConfigured;
  const registry = useRef(new Map<string, Block[]>());
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const overrides = hist.stack[hist.i].answers;
  const stagedOrder = hist.stack[hist.i].order;
  const [remoteOrder, setRemoteOrder] = useState<string[] | null>(null);
  const baselineIds = useRef<string[]>([]);
  const currentIds = useRef<string[]>([]);

  // Only edits made against the answer currently in qans.ts count; if the file
  // changed underneath (HMR), those stale edits drop out automatically.
  const pending = useMemo(
    () => Object.entries(overrides).filter(([id, o]) => registry.current.get(id) === o.base),
    [overrides],
  );
  const orderDirty = !!stagedOrder && stagedOrder.join("|") !== baselineIds.current.join("|");
  const dirty = pending.length + (orderDirty ? 1 : 0);

  // Everyone (not just editors) loads the live edits so the deployed site shows them.
  useEffect(() => {
    let cancelled = false;
    fetchRemoteEdits()
      .then((r) => !cancelled && setRemote(r))
      .catch((e) => console.error(e));
    fetchRemoteOrder()
      .then((o) => !cancelled && setRemoteOrder(o))
      .catch((e) => console.error(e));
    return () => {
      cancelled = true;
    };
  }, []);

  const flash = useCallback((m: string) => {
    setMessage(m);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(null), 2600);
  }, []);

  const reset = useCallback(() => setHist({ stack: [EMPTY], i: 0 }), []);

  const setEditing = useCallback(
    (v: boolean) => {
      if (
        !v &&
        dirty > 0 &&
        !window.confirm(`Discard ${dirty} unsaved edit${dirty > 1 ? "s" : ""}?`)
      )
        return;
      if (!v) reset();
      setEditingState(enabled && v);
    },
    [dirty, reset, enabled],
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

  // Staged edit → live edit (only while the file answer is unchanged) → file answer.
  const effective = useCallback(
    (id: string, base: Block[]) => {
      const o = overrides[id];
      if (o && o.base === base) return o.answer;
      const r = remote[id];
      return r && r.baseHash === hashOf(base) ? r.answer : base;
    },
    [overrides, remote],
  );

  const answerFor = useCallback(
    (item: QAItem) => {
      registry.current.set(item.id, item.answer);
      return effective(item.id, item.answer);
    },
    [effective],
  );

  const apply = useCallback(
    (op: EditOp) => {
      const sel = readSelection();
      if (typeof sel === "string") return flash(sel);
      const base = registry.current.get(sel.itemId);
      if (!base) return flash("Couldn't find that answer.");
      const current = effective(sel.itemId, base);
      const result = applyEdit(current, sel, op);
      if ("error" in result) return flash(result.error);
      window.getSelection()?.removeAllRanges();
      setHist(({ stack, i }) => {
        const next: Snap = {
          answers: { ...stack[i].answers, [sel.itemId]: { base, answer: result.answer } },
          order: stack[i].order,
        };
        const trimmed = [...stack.slice(0, i + 1), next].slice(-MAX_HISTORY);
        return { stack: trimmed, i: trimmed.length - 1 };
      });
    },
    [effective, flash],
  );

  const orderItems = useCallback(
    <T extends QAItem>(items: T[]): T[] => {
      const base = remoteOrder ? applyOrder(items, remoteOrder) : items;
      baselineIds.current = base.map((i) => i.id);
      const out = stagedOrder ? applyOrder(items, stagedOrder) : base;
      currentIds.current = out.map((i) => i.id);
      return out;
    },
    [remoteOrder, stagedOrder],
  );

  const moveItem = useCallback((movedId: string, targetId: string) => {
    const next = moveId(currentIds.current, movedId, targetId);
    if (!next) return;
    setHist(({ stack, i }) => {
      const snap: Snap = { answers: stack[i].answers, order: next };
      const trimmed = [...stack.slice(0, i + 1), snap].slice(-MAX_HISTORY);
      return { stack: trimmed, i: trimmed.length - 1 };
    });
  }, []);

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
      if (DEV) {
        const res = await fetch("/__qa-edit", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            edits: pending.map(([id, o]) => ({ id, answer: o.answer })),
            order: orderDirty ? stagedOrder : undefined,
          }),
        });
        if (!res.ok) throw new Error((await res.json()).error ?? "Save failed");
      }
      const live: Record<string, RemoteEdit> = {};
      for (const [id, o] of pending) live[id] = { baseHash: hashOf(o.base), answer: o.answer };
      let liveOk = true;
      try {
        if (pending.length) {
          await saveRemoteEdits(live);
          setRemote((r) => ({ ...r, ...live }));
        }
        if (orderDirty && stagedOrder) {
          await saveRemoteOrder(stagedOrder);
          setRemoteOrder(stagedOrder);
        }
      } catch (e) {
        liveOk = false;
        if (!DEV) throw e;
      }
      reset();
      const n = `${dirty} change${dirty > 1 ? "s" : ""}`;
      flash(
        DEV
          ? liveOk
            ? `Saved ${n} to qans.ts and live`
            : `Saved ${n} to qans.ts (live save failed)`
          : `Saved ${n} — live now`,
      );
    } catch (e) {
      flash(`Not saved: ${(e as Error).message}`);
    } finally {
      setSaving(false);
    }
  }, [dirty, saving, pending, orderDirty, stagedOrder, reset, flash]);

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
    () => ({ enabled, editing, setEditing, answerFor, orderItems, moveItem }),
    [enabled, editing, setEditing, answerFor, orderItems, moveItem],
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      {enabled && editing && (
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
          title="Save (Ctrl/Cmd+S)"
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
