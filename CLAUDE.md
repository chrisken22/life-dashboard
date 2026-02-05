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
├── CLAUDE.md              # This file - project context (LOCAL ONLY edits)
├── docs/               # Documentation
│   ├── PROJECT_PLAN.md    # Main plan file (LOCAL ONLY edits)
│   ├── web_brainstorm.md  # Web suggestions (WEB creates, LOCAL merges + archives)
│   └── sync-workflow.md   # Sync docs (LOCAL ONLY edits)
├── git-auto-sync.bat   # Auto-sync script (local only)
└── ... (code files)
```

## Sync Rules

### Core documents — LOCAL only:
These files must **never** be edited from web. They are the source of truth.

| File | Reason |
|------|--------|
| `CLAUDE.md` | Project context — changes here affect all sessions |
| `docs/PROJECT_PLAN.md` | Main plan — merges happen here locally after review |
| `docs/sync-workflow.md` | Sync rules themselves |

### Who edits what:
| File | Local | Web |
|------|-------|-----|
| `CLAUDE.md` | ✅ Edit | ❌ Read only |
| `docs/PROJECT_PLAN.md` | ✅ Edit | ❌ Read only |
| `docs/sync-workflow.md` | ✅ Edit | ❌ Read only |
| `docs/web_brainstorm.md` | ✅ Merge + archive | ✅ Create/Edit |
| New files (web-created) | ✅ Edit | ✅ Create (prefix with `web_`) |

### Web file naming convention:
- Any file **created by web** gets a `web_` prefix: e.g. `web_brainstorm.md`, `web_notes.md`
- This makes it clear at a glance what originated from web and what local owns
- Local can rename or move `web_` files after reviewing

### Workflow:
1. **Web** wants to suggest changes → writes into `docs/web_brainstorm.md`
2. **Web** needs a new file → creates it with `web_` prefix in `docs/`
3. **Local** reviews `web_` files, merges relevant parts into core docs
4. **Local** moves merged items from `web_brainstorm.md` to `docs/web_brainstorm_archive.md` (append-only)
5. **Local** cleans up `web_brainstorm.md` (remove archived items, keep only active ones)

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
- **Web Claude:** Do NOT edit core documents (`CLAUDE.md`, `PROJECT_PLAN.md`, `sync-workflow.md`). Write suggestions into `docs/web_brainstorm.md`. If creating a new file, prefix it with `web_`.
- **Session note:** `CLAUDE.md` is read at session start only. If it changes while a session is open (e.g. updated from web or another local edit), start a new session to pick up the changes.
- **Self-improvement:** After every correction, end with: "Update your CLAUDE.md so you don't make that mistake again." Claude is effective at writing rules for itself.

## Documentation Rules

When something happens during development, log it in the right place:

| Situation | Action |
|-----------|--------|
| Made an architectural choice | Add to `docs/decision-log.md` |
| Learned something the hard way | Add to `docs/lessons-learned.md` |
| Fixed a tricky bug | Add to `docs/troubleshooting.md` |
| Have ideas for the plan | Web: `docs/web_brainstorm.md` / Local: edit `PROJECT_PLAN.md` directly |
| Code review after feature/phase | Look for skill candidates, update docs as above |

### Code Reviews
- **When:** After each phase completion + ad-hoc as needed
- **Purpose:** Identify repeating patterns for skills, capture lessons learned, update docs

---
Last updated: 05/02/2026 22:00 from local
