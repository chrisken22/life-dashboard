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
├── docs/               # Documentation
│   ├── PROJECT_PLAN         # Main plan file (LOCAL ONLY edits)
│   ├── web-updates.md  # Web suggestions (WEB creates, LOCAL merges)
│   └── sync-workflow.md
├── git-auto-sync.bat   # Auto-sync script (local only)
└── ... (code files)
```

## Sync Rules

### Who edits what:
| File | Local | Web |
|------|-------|-----|
| `docs/PROJECT_PLAN` | ✅ Edit | ❌ Read only |
| `docs/web-updates.md` | ❌ Merge only | ✅ Create/Edit |
| `CLAUDE.md` | ✅ Edit | ✅ Edit |
| Other docs | ✅ Edit | ✅ Edit |

### Workflow:
1. **Web** wants to update the plan → creates/updates `docs/web-updates.md` with suggestions
2. **Local** reviews and merges suggestions into `docs/PROJECT_PLAN`
3. **Local** clears `docs/web-updates.md` after merging

### Auto-sync script:
- **PULL:** from web (`claude/*` branches)
- **PUSH:** `docs/` and `CLAUDE.md` to `master`
- Runs every 1 minute

## Conventions

- Docs go in `docs/` folder
- Commit messages: descriptive for manual, "Auto-sync [date]" for auto

## Notes for Claude

- Use UTC+1 timezone for any dates/times
- User works locally at home, uses web (claude.ai/code) at work
- When changing sync behavior, update this file and `docs/sync-workflow.md`
- **When updating any synced file**, add at the bottom: `Last updated: [DD/MM/YYYY HH:MM] from [local/web]`
- **Web Claude:** Do NOT edit `docs/PROJECT_PLAN` directly. Put suggestions in `docs/web-updates.md`

---
Last updated: 04/02/2026 01:00 from local
