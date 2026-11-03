// Question order. The order lives in qans.ts and, for the live site, as an id list
// in Supabase; the id list wins, and entries it doesn't mention (e.g. new ones
// added to the file) slot in right after the entry that preceded them in the file.
export function applyOrder<T extends { id: string }>(items: T[], ids: string[]): T[] {
  const byId = new Map(items.map((i) => [i.id, i]));
  const out: T[] = [];
  const seen = new Set<string>();
  for (const id of ids) {
    const it = byId.get(id);
    if (it && !seen.has(id)) {
      out.push(it);
      seen.add(id);
    }
  }
  let prev: string | null = null;
  for (const it of items) {
    if (!seen.has(it.id)) {
      const at = prev === null ? -1 : out.findIndex((o) => o.id === prev);
      out.splice(at + 1, 0, it);
      seen.add(it.id);
    }
    prev = it.id;
  }
  return out;
}

/** Move `movedId` to the slot `targetId` occupies; whatever was there shifts along. */
export function moveId(ids: string[], movedId: string, targetId: string): string[] | null {
  const from = ids.indexOf(movedId);
  const to = ids.indexOf(targetId);
  if (from === -1 || to === -1 || from === to) return null;
  const next = ids.slice();
  next.splice(from, 1);
  next.splice(to, 0, movedId);
  return next;
}
