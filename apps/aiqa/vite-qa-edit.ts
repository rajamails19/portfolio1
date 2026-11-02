import fs from "node:fs";
import path from "node:path";
import { execFile } from "node:child_process";
import type { Plugin } from "vite";

// Dev-only: lets the in-app "Edit" toolbar write an answer's blocks back into
// src/content/qans.ts, so edits made in the browser land in source control.
export function qaEditPlugin(): Plugin {
  let queue: Promise<unknown> = Promise.resolve();

  const save = (edits: { id: string; answer: unknown[] }[]) => {
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
    fs.writeFileSync(file, src);
    return new Promise<void>((resolve, reject) => {
      const prettier = path.resolve(process.cwd(), "node_modules/.bin/prettier");
      execFile(prettier, ["--write", file], (err) => (err ? reject(err) : resolve()));
    });
  };

  return {
    name: "qa-edit",
    apply: "serve",
    configureServer(server) {
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
              const { edits } = JSON.parse(body);
              const ok =
                Array.isArray(edits) &&
                edits.length > 0 &&
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
              await save(edits);
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
