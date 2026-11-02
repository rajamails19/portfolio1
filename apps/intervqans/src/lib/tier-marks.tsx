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
import type { QAItem } from "@/content/types";
import {
  fetchMarkRows,
  readUnlocked,
  remoteConfigured,
  saveMarkRow,
  type MarkRow,
} from "@/lib/answer-edits";

// Per-question study marks: heart → Super Important tab, "+" → Important tab,
// independently; every question always stays in All.
//
// Where they live:
//  • the owner (dev server, or a browser unlocked with ?edit=1) writes them to
//    Supabase, so localhost and the deployed site show the same marks;
//  • everyone else sees the owner's marks as a starting point and keeps their
//    own changes in this browser only.
// An entry's `tiers` in qans.ts is just the default before anything is marked.
export type Marks = MarkRow;

const LOCAL_KEY = "aiqa.marks";
const DEV = import.meta.env.DEV;

const defaultsFor = (item: QAItem): Marks => ({
  plus: !!item.tiers?.includes("imp"),
  heart: !!item.tiers?.includes("simp"),
});

interface Ctx {
  marksFor: (item: QAItem) => Marks;
  toggle: (item: QAItem, which: keyof Marks) => void;
}

const TierMarksCtx = createContext<Ctx>({ marksFor: defaultsFor, toggle: () => {} });
export const useTierMarks = () => useContext(TierMarksCtx);

export function TierMarksProvider({ children }: { children: ReactNode }) {
  const [local, setLocal] = useState<Record<string, Marks>>({});
  const [remote, setRemote] = useState<Record<string, Marks>>({});
  const [owner, setOwner] = useState(false);
  const loaded = useRef(false);

  useEffect(() => {
    setOwner((DEV || readUnlocked()) && remoteConfigured);
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      if (raw) setLocal(JSON.parse(raw));
    } catch {
      /* storage blocked or corrupt — start from the defaults */
    }
    loaded.current = true;
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(local));
    } catch {
      /* storage blocked — marks last for this visit only */
    }
  }, [local]);

  // Load the owner's marks, and again whenever the tab regains focus so edits
  // made on the other side (localhost ↔ deployed) show up without a reload.
  useEffect(() => {
    let cancelled = false;
    const load = () =>
      fetchMarkRows()
        .then((r) => !cancelled && setRemote(r))
        .catch((e) => console.error(e));
    load();
    const onVisible = () => document.visibilityState === "visible" && load();
    window.addEventListener("focus", load);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      cancelled = true;
      window.removeEventListener("focus", load);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  const marksFor = useCallback(
    (item: QAItem) =>
      (owner ? remote[item.id] : (local[item.id] ?? remote[item.id])) ?? defaultsFor(item),
    [owner, local, remote],
  );

  const toggle = useCallback(
    (item: QAItem, which: keyof Marks) => {
      const cur = marksFor(item);
      const next = { ...cur, [which]: !cur[which] };
      if (owner) {
        setRemote((r) => ({ ...r, [item.id]: next }));
        saveMarkRow(item.id, next).catch((e) => console.error(e));
      } else {
        setLocal((s) => ({ ...s, [item.id]: next }));
      }
    },
    [marksFor, owner],
  );

  const value = useMemo(() => ({ marksFor, toggle }), [marksFor, toggle]);
  return <TierMarksCtx.Provider value={value}>{children}</TierMarksCtx.Provider>;
}
