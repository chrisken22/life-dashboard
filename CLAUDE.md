# Life Dashboard - Project Context

## Project Overview
Personal life dashboard project synced between local (Windows) and web (claude.ai/code).

## Key Settings

| Setting | Value |
|---------|-------|
| Timezone | UTC+1 (Central European Time) |
| Language | English |
| Date format | DD/MM/YYYY |

## Project Structure

```
life-dashboard/
├── CLAUDE.md           # This file - project context for Claude
├── docs/               # Documentation (synced between local & web)
│   └── sync-workflow.md
├── git-auto-sync.bat   # Auto-sync script (local only)
└── ... (code files)
```

## Sync Setup

- **Local** pushes to `master` branch
- **Web** pushes to `claude/*` branches
- Auto-sync script runs every 1 minute, pulls from `claude/*`
- See `docs/sync-workflow.md` for details

## Conventions

- Docs go in `docs/` folder
- Code stays local (not synced via auto-sync)
- Commit messages: descriptive for manual, "Auto-sync docs [date]" for auto

## Notes for Claude

- When working on this project, use UTC+1 timezone for any dates/times
- User works locally at home, uses web (claude.ai/code) at work
- Only `docs/` folder is auto-synced; code changes need manual push
