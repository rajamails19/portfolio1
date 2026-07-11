# Notes & Folders App

This is the Apple Notes-style notes and folders app used in Raja's portfolio.

## Source Of Truth

Canonical local folder:

```bash
/Users/rajav/Documents/Coding/CGPT-help/portfolioraja/apps/apple-notes-clone
```

Old standalone folder, kept only until Vercel is repointed and verified:

```bash
/Users/rajav/Documents/Coding/Claude-help/inport-apple-notes-clone
```

Current production URL:

```text
https://apple-notes-clone-pi.vercel.app/
```

Important: production still deploys from the standalone Git repository until the Vercel project is reconnected to `rajamails19/portfolio1` with root directory `apps/apple-notes-clone` and the same environment variables.

## Local Development

From the portfolio root:

```bash
npm run dev:apple-notes-clone
npm run lint:apple-notes-clone
npm run build:apple-notes-clone
```

Or from this app folder:

```bash
npm run dev
npm run lint
npm run build
```
