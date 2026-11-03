import fs from "node:fs";
import path from "node:path";
import { execFile } from "node:child_process";
import { loadEnv, type Plugin, type ViteDevServer } from "vite";
import { hashAnswer } from "./src/lib/answer-hash";
import { applyOrder } from "./src/lib/answer-order";

// Dev-only: lets the in-app "Edit" toolbar write an answer's blocks back into
// src/content/qans.ts, so edits made in the browser land in source control.
export function qaEditPlugin(): Plugin {
  let queue: Promise<unknown> = Promise.resolve();

  const save = (edits: { id: string; answer: unknown[] }[], order?: string[]) => {
    const file = path.resolve(process.cwd(), "src/content/qans.ts");
    let src = fs.readFileSync(file, "utf8");
    for (const { id, answer } of edits) {
      const idPos = src.indexOf(`id: "${id}"`);
      if (idPos === -1) throw new Error(`No entry with id "${id}"`);
      const itemEnd = src.indexOf("\n    },\n", idPos);
      const start = src.indexOf("      answer: [", idPos);
      const closing = "\n      ],";
      const end = src.indexOf(closing, start);
      if (start === -1 || end === -1 || start > itemEnd)
        throw new Error("Couldn't locate the answer");
      src = `${src.slice(0, start)}      answer: ${JSON.stringify(answer)},${src.slice(end + closing.length)}`;
    }
    if (order) src = reorderItems(src, order);
    fs.writeFileSync(file, src);
    return new Promise<void>((resolve, reject) => {
      const prettier = path.resolve(process.cwd(), "node_modules/.bin/prettier");
      execFile(prettier, ["--write", file], (err) => (err ? reject(err) : resolve()));
    });
  };

  // Re-sequence the entries in qans.ts to match `order`; entries it doesn't list
  // (e.g. the hidden 5M/16M placeholders) keep their relative place at the end.
  const reorderItems = (src: string, order: string[]) => {
    const head = src.indexOf("  items: [\n");
    const tail = src.lastIndexOf("\n  ],\n");
    if (head === -1 || tail === -1) throw new Error("Couldn't locate the items list");
    const bodyStart = head + "  items: [\n".length;
    const body = src.slice(bodyStart, tail + 1);
    const blocks = body.match(/ {4}\{\n {6}id: "[^"]+"[\s\S]*?\n {4}\},\n/g);
    if (!blocks || blocks.join("") !== body) throw new Error("Couldn't parse the items list");
    const byId = new Map(blocks.map((b) => [/id: "([^"]+)"/.exec(b)?.[1] as string, b]));
    const used = new Set<string>();
    const sorted = order.flatMap((id) =>
      byId.has(id) && !used.has(id) ? (used.add(id), [byId.get(id) as string]) : [],
    );
    const rest = blocks.filter((b) => !used.has(/id: "([^"]+)"/.exec(b)?.[1] as string));
    return src.slice(0, bodyStart) + [...sorted, ...rest].join("") + src.slice(tail + 1);
  };

  // Supabase's jsonb hands keys back sorted by length, which would shuffle every
  // block's fields in qans.ts. Put them back in the order the file already uses.
  const keepKeyOrder = (b: unknown, template: unknown): unknown => {
    const block = b as Record<string, unknown>;
    const t = template as Record<string, unknown> | undefined;
    const keys = Object.keys(block);
    const order =
      t && t.type === block.type
        ? [...Object.keys(t).filter((k) => k in block), ...keys.filter((k) => !(k in t))]
        : ["type", ...keys.filter((k) => k !== "type")];
    return Object.fromEntries(order.map((k) => [k, block[k]]));
  };

  // Edits made on the deployed site live in Supabase. When the dev server starts,
  // fold any that still match the file's current answer into qans.ts, so local
  // and live stay in step (and the changes show up in git).
  const pull = async (server: ViteDevServer, url: string, key: string) => {
    try {
      const res = await fetch(
        `${url}/rest/v1/intervqans_page_edits?select=pathname,edits&pathname=like.${encodeURIComponent("aiqa-answer:*")}`,
        { headers: { apikey: key, Authorization: `Bearer ${key}` } },
      );
      if (!res.ok) return;
      const rows = (await res.json()) as {
        pathname: string;
        edits: { baseHash: string; answer: unknown[] };
      }[];
      const mod = await server.ssrLoadModule("/src/content/qans.ts");
      const current = new Map<string, unknown[]>(
        (mod.qansSection.items as { id: string; answer: unknown[] }[]).map((i) => [i.id, i.answer]),
      );
      const edits = rows.flatMap((r) => {
        const id = r.pathname.slice("aiqa-answer:".length);
        const file = current.get(id);
        return file && r.edits?.baseHash === hashAnswer(file) && Array.isArray(r.edits.answer)
          ? [{ id, answer: r.edits.answer.map((b, i) => keepKeyOrder(b, file[i])) }]
          : [];
      });
      // Question order saved from the live site: fold it into the file too.
      let order: string[] | undefined;
      const orderRes = await fetch(
        `${url}/rest/v1/intervqans_page_edits?select=edits&pathname=eq.aiqa-order`,
        { headers: { apikey: key, Authorization: `Bearer ${key}` } },
      );
      if (orderRes.ok) {
        const ids = ((await orderRes.json()) as { edits?: { ids?: unknown } }[])[0]?.edits?.ids;
        if (Array.isArray(ids) && ids.every((x) => typeof x === "string")) {
          const fileIds = (mod.qansSection.items as { id: string }[]).map((i) => i.id);
          const wanted = applyOrder(
            fileIds.map((id) => ({ id })),
            ids as string[],
          ).map((i) => i.id);
          if (wanted.join("|") !== fileIds.join("|")) order = wanted;
        }
      }
      if (!edits.length && !order) return;
      await (queue = queue.then(() => save(edits, order)));
      server.config.logger.info(
        `[qa-edit] pulled ${edits.length} live edit(s)${order ? " and the question order" : ""} into qans.ts`,
      );
    } catch {
      /* offline or no table access — local content is unaffected */
    }
  };

  return {
    name: "qa-edit",
    apply: "serve",
    configureServer(server) {
      const env = loadEnv(server.config.mode, process.cwd(), "");
      if (env.VITE_SUPABASE_URL && env.VITE_SUPABASE_ANON_KEY) {
        server.httpServer?.once("listening", () => {
          void pull(server, env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);
        });
      }
      server.middlewares.use("/__qa-edit", (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.end();
          return;
        }
        let body = "";
        req.on("data", (c) => (body += c));
        req.on("end", () => {
          queue = queue
            .then(async () => {
              const { edits, order } = JSON.parse(body);
              const orderOk =
                order === undefined ||
                (Array.isArray(order) &&
                  order.length < 1000 &&
                  order.every((x: unknown) => typeof x === "string"));
              const ok =
                orderOk &&
                Array.isArray(edits) &&
                (edits.length > 0 || order !== undefined) &&
                edits.length < 200 &&
                edits.every(
                  (e) =>
                    typeof e?.id === "string" &&
                    /^[a-z0-9-]+$/.test(e.id) &&
                    Array.isArray(e.answer) &&
                    e.answer.length < 80 &&
                    e.answer.every((b: { type?: unknown }) => b && typeof b.type === "string"),
                );
              if (!ok) throw new Error("Bad request");
              await save(edits, order);
              res.setHeader("content-type", "application/json");
              res.end('{"ok":true}');
            })
            .catch((e: Error) => {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: e.message }));
            });
        });
      });
    },
  };
}
