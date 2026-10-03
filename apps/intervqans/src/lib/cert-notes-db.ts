/**
 * Personal notes + photos for each certification tab, kept in this browser's
 * IndexedDB (localStorage is too small for screenshots). Nothing leaves the device.
 */

export interface CertNote {
  id: string;
  cert: string;
  kind: "note";
  text: string;
  createdAt: number;
  updatedAt: number;
}

export interface CertPhoto {
  id: string;
  cert: string;
  kind: "photo";
  /** What the <img> shows: a data: URL when local, a signed https URL when from the cloud. */
  dataUrl: string;
  /** Cloud only: object path inside the photos bucket. */
  path?: string;
  caption: string;
  createdAt: number;
  updatedAt: number;
}

export type CertItem = CertNote | CertPhoto;

const DB_NAME = "studydeck-cert-notes";
const STORE = "items";

let dbPromise: Promise<IDBDatabase> | null = null;

function openDb(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;
  const p = new Promise<IDBDatabase>((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(new Error("IndexedDB is unavailable"));
      return;
    }
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      const store = req.result.createObjectStore(STORE, { keyPath: "id" });
      store.createIndex("cert", "cert");
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  p.catch(() => {
    dbPromise = null;
  });
  dbPromise = p;
  return p;
}

function done(tx: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
}

export function newId(): string {
  // Cloud rows use UUID primary keys, so prefer a real UUID everywhere.
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export async function listItems(cert: string): Promise<CertItem[]> {
  const db = await openDb();
  const tx = db.transaction(STORE, "readonly");
  const req = tx.objectStore(STORE).index("cert").getAll(cert);
  const items = await new Promise<CertItem[]>((resolve, reject) => {
    req.onsuccess = () => resolve(req.result as CertItem[]);
    req.onerror = () => reject(req.error);
  });
  return items.sort((a, b) => a.createdAt - b.createdAt);
}

export async function putItem(item: CertItem): Promise<void> {
  const db = await openDb();
  const tx = db.transaction(STORE, "readwrite");
  tx.objectStore(STORE).put(item);
  await done(tx);
}

export async function removeItem(id: string): Promise<void> {
  const db = await openDb();
  const tx = db.transaction(STORE, "readwrite");
  tx.objectStore(STORE).delete(id);
  await done(tx);
}

/** Every local item across all certs (used by the one-time "upload to cloud"). */
export async function listAllItems(): Promise<CertItem[]> {
  const db = await openDb();
  const tx = db.transaction(STORE, "readonly");
  const req = tx.objectStore(STORE).getAll();
  const items = await new Promise<CertItem[]>((resolve, reject) => {
    req.onsuccess = () => resolve(req.result as CertItem[]);
    req.onerror = () => reject(req.error);
  });
  return items.sort((a, b) => a.createdAt - b.createdAt);
}
