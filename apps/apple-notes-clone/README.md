# ABC Notes

ABC Notes is the private notes and folders app used in Raja's portfolio.

## Source Of Truth

This app now lives inside the portfolio monorepo. Keep future product changes in this app folder so Vercel and local development stay aligned.

The old standalone folder is archive-only. Do not edit it unless intentionally recovering old history.

## Data Safety

Raja has important notes in the already signed-in production account. Do not run destructive database commands, destructive Supabase migrations, folder/note deletion scripts, or data reset scripts against production data. Code changes are fine; production note data is protected.

## Documentation Rule

Always update this README when changing app behavior, commands, deployment settings, environment flags, data-safety assumptions, or public-launch/security posture. The README is the handoff note for future work.

## Local Development

From this app folder:

```bash
npm run dev
npm run lint
npm run build
```

From the portfolio root:

```bash
npm run dev:abc-notes
npm run lint:abc-notes
npm run build:abc-notes
```

The dev command first checks whether ABC Notes is already running from this folder and responding. If it is, it prints the existing local URL and exits successfully. If a stale server lock is present but the app is not responding, it removes that local dev lock and starts a fresh server on another open port. If not already running, it starts at port `8092` and automatically moves upward until it finds an open port. If `8092` is busy, it will try `8093`, then `8094`, and so on. Local dev uses Next webpack mode by default because Turbopack was causing very slow/hanging page loads for this app. You can also choose a starting port:

```bash
START_PORT=8200 npm run dev
```

## Rendering Notes

The main app and login route show a tiny loading shell during SSR and mount the heavy interactive client UI only after the browser is ready. This keeps local dev responsive and avoids the browser sitting on a blank loading tab while Next compiles the editor shell.

## Production Notes

Migration tooling is disabled by default. Keep these unset or `false` in public deployments:

```text
ENABLE_MIGRATION_TOOLS=false
NEXT_PUBLIC_ENABLE_MIGRATION_TOOLS=false
```

Only enable them temporarily from a trusted session if old local notes need to be migrated into Supabase.

Image uploads accept only JPEG, PNG, GIF, and WebP files up to 10 MB. SVG uploads are intentionally disabled for public launch. New uploaded images use authenticated app URLs (`/api/images/:id`) instead of public Supabase Storage URLs. The `note-images` bucket should be private in Supabase.

Production API routes fail closed when Supabase environment variables are missing, instead of falling back to local SQLite. Note create/move operations verify that the target folder belongs to the signed-in user before writing.
