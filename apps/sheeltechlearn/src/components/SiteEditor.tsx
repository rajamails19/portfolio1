import {
  AlignLeft,
  Bold,
  Check,
  Eraser,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  Link2,
  List,
  ListOrdered,
  Palette,
  Pencil,
  Plus,
  Quote,
  Redo2,
  RotateCcw,
  SquarePlus,
  Strikethrough,
  TableProperties,
  Trash2,
  Underline,
  Undo2,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

type SavedBlock = { html: string; style?: string };
type CustomBlock = { id: string; anchorKey: string; html: string };
type PageEdits = { blocks: Record<string, SavedBlock>; customBlocks: CustomBlock[] };

const EMPTY_EDITS: PageEdits = { blocks: {}, customBlocks: [] };
const EDITABLE_SELECTOR = "p,h1,h2,h3,h4,h5,h6,li,td,th,blockquote,pre,[data-site-editor-custom-id]";

function storageKey() {
  return `sheeltech:page-edits:${window.location.pathname}`;
}

function loadEdits(): PageEdits {
  try {
    const saved = window.localStorage.getItem(storageKey());
    return saved ? { ...EMPTY_EDITS, ...JSON.parse(saved) } : { blocks: {}, customBlocks: [] };
  } catch {
    return { blocks: {}, customBlocks: [] };
  }
}

function saveEdits(edits: PageEdits) {
  window.localStorage.setItem(storageKey(), JSON.stringify(edits));
}

function isEditableBlock(element: Element): element is HTMLElement {
  if (!(element instanceof HTMLElement)) return false;
  if (element.closest("[data-site-editor-ui],button,a,input,select,textarea")) return false;
  const customParent = element.parentElement?.closest("[data-site-editor-custom-id]");
  return !customParent || customParent === element;
}

function ToolbarButton({
  label,
  onClick,
  children,
  danger = false,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition hover:-translate-y-0.5 ${danger ? "border-red-400/30 bg-red-500/10 text-red-500 hover:bg-red-500/20" : "border-border/70 bg-background/75 text-foreground hover:border-rose/50 hover:bg-rose/10 hover:text-rose"}`}
    >
      {children}
    </button>
  );
}

export function SiteEditor() {
  const [editing, setEditing] = useState(false);
  const [hasSelection, setHasSelection] = useState(false);
  const [saved, setSaved] = useState(true);
  const rangeRef = useRef<Range | null>(null);

  const persistBlock = useCallback((block: HTMLElement) => {
    const key = block.dataset.siteEditorKey;
    if (!key) return;
    const edits = loadEdits();
    edits.blocks[key] = { html: block.innerHTML, style: block.getAttribute("style") ?? "" };
    const customId = block.dataset.siteEditorCustomId;
    if (customId) {
      const custom = edits.customBlocks.find((item) => item.id === customId);
      if (custom) custom.html = block.outerHTML;
    }
    saveEdits(edits);
    setSaved(true);
  }, []);

  const prepareSurfaces = useCallback(() => {
    const surfaces = Array.from(document.querySelectorAll<HTMLElement>("[data-site-edit-surface],[role='dialog']"));
    const edits = loadEdits();

    surfaces.forEach((surface, surfaceIndex) => {
      surface.dataset.siteEditorActive = "true";
      const surfaceName = surface.dataset.siteEditSurface ?? `dialog-${surfaceIndex}`;
      const blocks = Array.from(surface.querySelectorAll(EDITABLE_SELECTOR)).filter(isEditableBlock);

      blocks.forEach((block, blockIndex) => {
        const customId = block.dataset.siteEditorCustomId;
        const key = customId ? `custom:${customId}` : `${surfaceName}:${blockIndex}`;
        block.dataset.siteEditorKey = key;
        block.contentEditable = editing ? "true" : "false";
        block.spellcheck = editing;
        block.classList.toggle("site-editor-block", editing);
        const savedBlock = edits.blocks[key];
        if (savedBlock && block.innerHTML !== savedBlock.html) {
          block.innerHTML = savedBlock.html;
          if (savedBlock.style) block.setAttribute("style", savedBlock.style);
        }
      });

      edits.customBlocks.forEach((custom) => {
        if (surface.querySelector(`[data-site-editor-custom-id="${custom.id}"]`)) return;
        const anchor = surface.querySelector<HTMLElement>(`[data-site-editor-key="${custom.anchorKey}"]`);
        if (!anchor) return;
        const template = document.createElement("template");
        template.innerHTML = custom.html.trim();
        const block = template.content.firstElementChild as HTMLElement | null;
        if (!block) return;
        anchor.insertAdjacentElement("afterend", block);
        block.dataset.siteEditorKey = `custom:${custom.id}`;
        block.contentEditable = editing ? "true" : "false";
        block.spellcheck = editing;
        block.classList.toggle("site-editor-block", editing);
        const savedBlock = edits.blocks[`custom:${custom.id}`];
        if (savedBlock) block.innerHTML = savedBlock.html;
      });
    });
  }, [editing]);

  useEffect(() => {
    let observer: MutationObserver | null = null;
    const timer = window.setTimeout(() => {
      prepareSurfaces();
      observer = new MutationObserver(() => prepareSurfaces());
      observer.observe(document.body, { childList: true, subtree: true });
    }, 500);
    return () => {
      window.clearTimeout(timer);
      observer?.disconnect();
    };
  }, [prepareSurfaces]);

  useEffect(() => {
    if (!editing) {
      document.documentElement.classList.remove("site-editing");
      document.querySelectorAll<HTMLElement>("[data-site-editor-key]").forEach((block) => {
        block.contentEditable = "false";
        block.classList.remove("site-editor-block");
      });
      return;
    }

    document.documentElement.classList.add("site-editing");
    prepareSurfaces();

    const handleInput = (event: Event) => {
      const target = event.target instanceof HTMLElement ? event.target.closest<HTMLElement>("[data-site-editor-key]") : null;
      if (!target) return;
      setSaved(false);
      persistBlock(target);
    };
    const handleSelection = () => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) {
        setHasSelection(false);
        return;
      }
      const range = selection.getRangeAt(0);
      const node = range.commonAncestorContainer instanceof HTMLElement ? range.commonAncestorContainer : range.commonAncestorContainer.parentElement;
      if (!node?.closest("[data-site-editor-key]")) {
        setHasSelection(false);
        return;
      }
      rangeRef.current = range.cloneRange();
      setHasSelection(!selection.isCollapsed);
    };
    document.addEventListener("input", handleInput, true);
    document.addEventListener("selectionchange", handleSelection);
    return () => {
      document.removeEventListener("input", handleInput, true);
      document.removeEventListener("selectionchange", handleSelection);
    };
  }, [editing, persistBlock, prepareSurfaces]);

  const restoreSelection = () => {
    const range = rangeRef.current;
    if (!range) return null;
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
    const node = range.commonAncestorContainer instanceof HTMLElement ? range.commonAncestorContainer : range.commonAncestorContainer.parentElement;
    return node?.closest<HTMLElement>("[data-site-editor-key]") ?? null;
  };

  const runCommand = (command: string, value?: string) => {
    const block = restoreSelection();
    const originalKey = block?.dataset.siteEditorKey;
    document.execCommand(command, false, value);
    const selection = window.getSelection();
    const selectionNode = selection?.anchorNode instanceof HTMLElement ? selection.anchorNode : selection?.anchorNode?.parentElement;
    const resultingBlock = selectionNode?.closest<HTMLElement>(EDITABLE_SELECTOR) ?? block;
    if (resultingBlock && originalKey && !resultingBlock.dataset.siteEditorKey) resultingBlock.dataset.siteEditorKey = originalKey;
    if (resultingBlock) persistBlock(resultingBlock);
  };

  const insertCustomBlock = (kind: "text" | "box" | "table") => {
    const anchor = restoreSelection() ?? document.querySelector<HTMLElement>("[data-site-edit-surface] [data-site-editor-key]:last-of-type");
    if (!anchor) return;
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const content =
      kind === "table"
        ? `<div data-site-editor-custom-id="${id}" class="site-editor-table-wrap"><table><thead><tr><th>Heading 1</th><th>Heading 2</th><th>Heading 3</th></tr></thead><tbody><tr><td>Type here</td><td>Type here</td><td>Type here</td></tr><tr><td>Type here</td><td>Type here</td><td>Type here</td></tr></tbody></table></div>`
        : kind === "box"
          ? `<aside data-site-editor-custom-id="${id}" class="site-editor-callout"><strong>Highlighted note</strong><br>Type your callout here…</aside>`
          : `<p data-site-editor-custom-id="${id}" class="site-editor-added-text">Type your new text here…</p>`;
    anchor.insertAdjacentHTML("afterend", content);
    const edits = loadEdits();
    edits.customBlocks.push({ id, anchorKey: anchor.dataset.siteEditorKey ?? "", html: content });
    saveEdits(edits);
    prepareSurfaces();
    document.querySelector<HTMLElement>(`[data-site-editor-custom-id="${id}"]`)?.focus();
  };

  const deleteSelection = () => {
    const block = restoreSelection();
    if (hasSelection) document.execCommand("delete");
    else if (block?.dataset.siteEditorCustomId) {
      const edits = loadEdits();
      const customId = block.dataset.siteEditorCustomId;
      edits.customBlocks = edits.customBlocks.filter((item) => item.id !== customId);
      delete edits.blocks[`custom:${customId}`];
      saveEdits(edits);
      block.remove();
    }
    if (block?.isConnected) persistBlock(block);
  };

  const addLink = () => {
    const url = window.prompt("Paste a link URL");
    if (url) runCommand("createLink", url);
  };

  const resetPage = () => {
    if (!window.confirm("Remove your saved edits from this page and restore the original content?")) return;
    window.localStorage.removeItem(storageKey());
    window.location.reload();
  };

  return (
    <div data-site-editor-ui contentEditable={false}>
      {!editing ? (
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="fixed bottom-5 right-5 z-[90] inline-flex items-center gap-2 rounded-full border border-rose/35 bg-background/95 px-4 py-3 text-sm font-bold text-foreground shadow-[0_18px_55px_-20px_oklch(0.55_0.2_345/0.8)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-rose hover:text-rose"
        >
          <Pencil className="h-4 w-4" /> Edit site
        </button>
      ) : (
        <>
          <div className="fixed bottom-20 right-5 z-[89] rounded-full border border-rose/25 bg-background/90 px-3 py-1.5 text-xs font-semibold text-muted-foreground shadow-soft backdrop-blur-xl">
            {hasSelection ? "Text selected — choose a style" : "Select text or place your cursor"}
          </div>
          <div className="fixed inset-x-3 bottom-3 z-[90] mx-auto flex max-w-[1180px] items-center gap-1.5 overflow-x-auto rounded-2xl border border-rose/25 bg-background/95 p-2 shadow-[0_24px_80px_-24px_oklch(0.45_0.15_280/0.75)] backdrop-blur-xl">
            <div className="sticky left-0 z-10 flex shrink-0 items-center gap-2 border-r border-border bg-background/95 pr-2 text-xs font-bold text-foreground">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-solid-rose to-solid-coral text-on-solid"><Pencil className="h-4 w-4" /></span>
              <span className="hidden sm:block">Page editor</span>
              <span className={`rounded-full px-2 py-1 text-[10px] ${saved ? "bg-emerald-500/12 text-emerald-600" : "bg-amber-500/12 text-amber-600"}`}>{saved ? "Saved" : "Saving…"}</span>
            </div>

            <ToolbarButton label="Undo" onClick={() => runCommand("undo")}><Undo2 className="h-4 w-4" /></ToolbarButton>
            <ToolbarButton label="Redo" onClick={() => runCommand("redo")}><Redo2 className="h-4 w-4" /></ToolbarButton>
            <select
              aria-label="Text style"
              defaultValue="p"
              onMouseDown={() => restoreSelection()}
              onChange={(event) => runCommand("formatBlock", event.target.value)}
              className="h-9 shrink-0 rounded-xl border border-border bg-background px-2 text-xs font-semibold text-foreground"
            >
              <option value="p">Normal text</option><option value="h1">Heading 1</option><option value="h2">Heading 2</option><option value="h3">Heading 3</option><option value="blockquote">Quote</option>
            </select>
            <ToolbarButton label="Bold" onClick={() => runCommand("bold")}><Bold className="h-4 w-4" /></ToolbarButton>
            <ToolbarButton label="Italic" onClick={() => runCommand("italic")}><Italic className="h-4 w-4" /></ToolbarButton>
            <ToolbarButton label="Underline" onClick={() => runCommand("underline")}><Underline className="h-4 w-4" /></ToolbarButton>
            <ToolbarButton label="Strikethrough" onClick={() => runCommand("strikeThrough")}><Strikethrough className="h-4 w-4" /></ToolbarButton>

            <label title="Text color" className="relative flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-border bg-background text-foreground hover:text-rose">
              <Palette className="h-4 w-4" /><input type="color" defaultValue="#2563eb" onChange={(event) => runCommand("foreColor", event.target.value)} className="absolute inset-0 cursor-pointer opacity-0" aria-label="Text color" />
            </label>
            <label title="Highlight color" className="relative flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-border bg-background text-foreground hover:text-rose">
              <Highlighter className="h-4 w-4" /><input type="color" defaultValue="#fde68a" onChange={(event) => runCommand("hiliteColor", event.target.value)} className="absolute inset-0 cursor-pointer opacity-0" aria-label="Highlight color" />
            </label>
            <ToolbarButton label="Heading 1" onClick={() => runCommand("formatBlock", "h1")}><Heading1 className="h-4 w-4" /></ToolbarButton>
            <ToolbarButton label="Heading 2" onClick={() => runCommand("formatBlock", "h2")}><Heading2 className="h-4 w-4" /></ToolbarButton>
            <ToolbarButton label="Heading 3" onClick={() => runCommand("formatBlock", "h3")}><Heading3 className="h-4 w-4" /></ToolbarButton>
            <ToolbarButton label="Quote" onClick={() => runCommand("formatBlock", "blockquote")}><Quote className="h-4 w-4" /></ToolbarButton>
            <ToolbarButton label="Bulleted list" onClick={() => runCommand("insertUnorderedList")}><List className="h-4 w-4" /></ToolbarButton>
            <ToolbarButton label="Numbered list" onClick={() => runCommand("insertOrderedList")}><ListOrdered className="h-4 w-4" /></ToolbarButton>
            <ToolbarButton label="Align left" onClick={() => runCommand("justifyLeft")}><AlignLeft className="h-4 w-4" /></ToolbarButton>
            <ToolbarButton label="Add link" onClick={addLink}><Link2 className="h-4 w-4" /></ToolbarButton>
            <ToolbarButton label="Clear formatting" onClick={() => runCommand("removeFormat")}><Eraser className="h-4 w-4" /></ToolbarButton>

            <div className="mx-1 h-7 w-px shrink-0 bg-border" />
            <ToolbarButton label="Add text" onClick={() => insertCustomBlock("text")}><Plus className="h-4 w-4" /></ToolbarButton>
            <ToolbarButton label="Insert highlighted box" onClick={() => insertCustomBlock("box")}><SquarePlus className="h-4 w-4" /></ToolbarButton>
            <ToolbarButton label="Insert table" onClick={() => insertCustomBlock("table")}><TableProperties className="h-4 w-4" /></ToolbarButton>
            <ToolbarButton label="Delete selected text or inserted block" onClick={deleteSelection} danger><Trash2 className="h-4 w-4" /></ToolbarButton>
            <ToolbarButton label="Reset this page" onClick={resetPage} danger><RotateCcw className="h-4 w-4" /></ToolbarButton>
            <button type="button" onClick={() => setEditing(false)} className="sticky right-0 z-10 ml-1 inline-flex h-9 shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-solid-rose to-solid-coral px-3 text-xs font-bold text-on-solid shadow-soft"><Check className="h-4 w-4" /> Done</button>
          </div>
        </>
      )}
    </div>
  );
}
