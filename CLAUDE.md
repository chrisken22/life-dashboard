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
- **Auto-synced:** `docs/` folder and `CLAUDE.md`
- **Not synced:** code files (manual push only)
- See `docs/sync-workflow.md` for details

## Conventions

- Docs go in `docs/` folder
- Commit messages: descriptive for manual, "Auto-sync [date]" for auto

## Notes for Claude

- Use UTC+1 timezone for any dates/times
- User works locally at home, uses web (claude.ai/code) at work
- When changing sync behavior, update this file and `docs/sync-workflow.md`
