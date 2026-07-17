# Portfolio Raja

Portfolio Raja is the home base for Raja's active projects. The goal is simple: one VS Code repo, one portal UI, and one place to launch or remember every project without opening many folders manually.

Some apps live fully inside this repo under `apps/`. Others are intentionally owned elsewhere and only appear in the portal as launcher cards or reminders. When one project becomes ready for real-world publishing, it can be separated into its own standalone repo later.

## Quick Start

Install dependencies:

```bash
npm install
```

Run the main Portfolio Raja portal:

```bash
npm run dev
```

Local portal URL:

```bash
http://localhost:8085/
```

Build the portal:

```bash
npm run build
```

## Main Portal

### Portfolio Raja

The main control center UI. It shows the full homepage, project rooms, integrated project thumbnails, and external project sections.

Run it with:

```bash
npm run dev
```

or:

```bash
npm run dev:portal
```

## Integrated Apps

These projects live inside this repo under `apps/`. Changes to these apps happen inside this same Portfolio Raja VS Code window.

### JagsRajKitchen

Restaurant website for Raja Kitchen with menu, stories, online order entry points, and hospitality-focused pages.

Run it with:

```bash
npm run dev:jagsrajkitchen
```

Local URL:

```bash
http://localhost:8086/
```

### AI Learn Raja

Learning and interview-prep style app for AI topics, concepts, practice, and guided study.

Run it with:

```bash
npm run dev:ailearnraja
```

Local URL:

```bash
http://localhost:8087/
```

### Forma Fitness

Fitness product/landing experience focused on simple, personal, real-life health and workout guidance.

Run it with:

```bash
npm run dev:forma-fitness
```

Local URL:

```bash
http://localhost:8088/
```

### GenZ Style Learn

Visual learning app with a modern social-style interface for exploring and learning in a more Gen Z-friendly format.

Run it with:

```bash
npm run dev:genzstylelearn
```

Local URL:

```bash
http://localhost:8089/
```

### Reset Mind

Mindfulness and reset-style app for calmer focus, habit support, and mental refresh flows.

Run it with:

```bash
npm run dev:resetmindproj
```

Local URL:

```bash
http://localhost:8091/
```

### Apple Notes Clone

Notes app inspired by Apple Notes. Useful for experimenting with writing, organization, and clean productivity UI.

Run it with:

```bash
npm run dev:apple-notes-clone
```

Local URL:

```bash
http://localhost:8092/
```

### AI Ascend Academy

Academy-style learning app for AI career growth, guided concepts, and structured learning paths.

Run it with:

```bash
npm run dev:ai-ascend-academy
```

Local URL:

```bash
http://localhost:8093/
```

### Capture Thoughts

Thought capture and reflection app. Good for quick notes, idea collection, and turning loose thoughts into something visible.

Run it with:

```bash
npm run dev:capture-thoughts
```

Local URL:

```bash
http://localhost:8094/
```

### Guide Learn AI

AI learning guide app with structured sections and practice-oriented learning paths.

Run it with:

```bash
npm run dev:guide-learn-ai
```

Local URL:

```bash
http://localhost:8095/
```

### Speak Practice Tamil

Tamil speaking practice app for language learning and pronunciation-style practice.

Run it with:

```bash
npm run dev:speakpracticetamil
```

Local URL:

```bash
http://localhost:8096/
```

### Desi Events

Event discovery and community-style project focused on Desi events, listings, and cultural experiences.

Run it with:

```bash
npm run dev:desievents
```

Local URL:

```bash
http://localhost:8097/
```

### Tech Blog Raja

Tech blog project for posts, technical writing, and publishing Raja's engineering or AI thoughts.

Run it with:

```bash
npm run dev:techblograja
```

Local URL:

```bash
http://localhost:8098/
```

### Math Raja

Kid-friendly math learning app with a playful elementary math experience.

Run it with:

```bash
npm run dev:mathraja
```

Local URL:

```bash
http://localhost:8118/
```

### School OS Agent

School operating-system style dashboard and agent experience. It may show a disconnected or backend-waiting state until its backend pieces are running or wired.

Run it with:

```bash
npm run dev:schoolosagent
```

Local URL:

```bash
http://localhost:8119/
```

### Server Dashboard

Dashboard-style project for viewing server/dev environment information in a polished control-room style UI.

Run it with:

```bash
npm run dev:serverdashboard
```

Local URL:

```bash
http://localhost:8120/
```

### JobsOps With Raja

Job application command center for tracking opportunities, reviewing matches, managing pipeline status, tailoring resumes, and keeping follow-ups organized.

Run it with:

```bash
npm run dev:jobsopswithraja
```

Local URL:

```bash
http://localhost:8121/
```

### IntervQAns

Interview prep and question-answer study deck experience for practicing technical topics, scenarios, project stories, and focused answer review.

Run it with:

```bash
npm run dev:intervqans
```

Local URL:

```bash
http://localhost:8122/
```

## Linked External Apps

These projects are not fully stored inside this repo. Their code lives in their own folders, but Portfolio Raja can still show them and launch them locally. If you ask Codex to change these projects, changes should happen in their own respective repo/folder.

### Telugu Trace Kids

Kids Telugu tracing and learning project. This command points to the Claude-help project folder.

Run it with:

```bash
npm run dev:telugu-trace-kids
```

### Kudos Clone

External app for a Kudos-style product experience.

Run it with:

```bash
npm run dev:kudosclone
```

Local URL:

```bash
http://localhost:8112/
```

### Learn Comics

External kids/learning app focused on comics-style learning.

Run it with:

```bash
npm run dev:learncomics
```

Local URL:

```bash
http://localhost:8113/
```

### Kids Typing

External typing practice app for kids.

Run it with:

```bash
npm run dev:kidstyping
```

Local URL:

```bash
http://localhost:8114/
```

### Piano With Raja

External music-learning app for piano practice and lessons.

Run it with:

```bash
npm run dev:pianowithraja
```

Local URL:

```bash
http://localhost:8115/
```

### Poke Chess Game

External game project combining playful chess-like interaction with a Pokemon-inspired concept.

Run it with:

```bash
npm run dev:pokechessgame
```

Local URL:

```bash
http://localhost:8116/
```

### Wheels And Machines

External kids/learning project around vehicles, machines, and mechanical curiosity.

Run it with:

```bash
npm run dev:wheelsandmachines
```

Local URL:

```bash
http://localhost:8117/
```

## Build And Check Commands

Build only the main portal:

```bash
npm run build
```

Run lint for the full repo:

```bash
npm run lint
```

Build one integrated app:

```bash
npm run build:mathraja
```

Lint one integrated app:

```bash
npm run lint:mathraja
```

Replace `mathraja` with the app script name you need.

## Deployment Notes

Vercel is configured through `vercel.json`.

The production build outputs the deployable static portal into:

```bash
dist/client
```

Vercel should use:

```bash
npm run build
```

and serve:

```bash
dist/client
```

## Repo Organization

Use this pattern for projects that should live inside Portfolio Raja:

```bash
apps/project-name
```

Use external launcher cards for projects that should remain owned by another repo or folder.

When a project becomes ready to publish as its own product, it can be split out into a separate repo and deployed with its own domain/app-store path.
