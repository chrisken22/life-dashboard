# Local ↔ Web Sync Workflow

## Overview

This project syncs between two environments:
- **Local (Windows)** - Claude Code CLI, full file access
- **Web (claude.ai/code)** - Browser-based, works via GitHub

## How It Works

```
┌─────────────┐      push       ┌─────────────┐      pull        ┌─────────────┐
│   Local     │ ───────────────►│   GitHub    │◄─────────────────│    Web      │
│  (master)   │◄─────────────── │    Repo     │ ─────────────────►│ (claude/*)  │
└─────────────┘      pull       └─────────────┘      push        └─────────────┘
```

- **Local** pushes to `master` branch
- **Web** pushes to `claude/*` branches (auto-generated names)
- **Auto-sync script** pulls from `claude/*` branches every 1 minute

## Branches

| Environment | Branch | Notes |
|-------------|--------|-------|
| Local | `master` | Main working branch |
| Web (browser) | `claude/*` | Auto-created by claude.ai/code |

## Auto-Sync Script

Location: `git-auto-sync.bat`

**What it does:**
1. Fetches remote branches
2. Finds latest `claude/*` branch
3. Pulls changes from it (if any)
4. Pushes local changes to `master` (only `docs/` and `CLAUDE.md`)
5. Repeats every 60 seconds

**To start:** Double-click `Life-Dashboard-Sync.bat` on Desktop

**To stop:** Press `Ctrl+C` or close the window

## Daily Workflow

### Working at Home (Local)
1. Start the sync script
2. Edit files normally
3. Changes auto-push to GitHub every minute

### Working at Work (Web)
1. Go to claude.ai/code
2. Select `life-dashboard` repo
3. Edit files - they save to a `claude/*` branch
4. When you get home, sync script pulls the changes

## Troubleshooting

### Merge conflicts
If you edited the same file in both places:
```
git status              # see conflicted files
git checkout --theirs <file>   # keep web version
# OR
git checkout --ours <file>     # keep local version
git add .
git commit -m "Resolve conflict"
```

### Sync script not pulling changes
1. Check if `claude/*` branch exists: `git branch -r`
2. Manually pull: `git pull origin claude/branch-name`

### Web doesn't see local changes
Make sure you pushed: `git push origin master`
