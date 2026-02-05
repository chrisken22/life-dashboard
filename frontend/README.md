# Compass Frontend

React frontend for Compass life dashboard with Tailwind CSS.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm start
```

Frontend will run at: http://localhost:3000

## Development

- Backend API proxy is configured in `package.json`
- API calls to `/api/*` are automatically proxied to `http://localhost:8000`
- Make sure backend is running on port 8000

## Keyboard Shortcuts

- `Ctrl+K` - Open command palette
- `Ctrl+Space` - Focus brain dump input

## Components

- `CommandPalette` - Universal command interface (Ctrl+K)
- `BrainDump` - Quick capture for random thoughts (Ctrl+Space)
- `TodoList` - Simple checkbox todos
- `KanbanBoard` - Project task management with drag-drop
- `Dashboard` - Main dashboard layout

## Tech Stack

- React 18
- Tailwind CSS (dark theme)
- React Query (server state management)
- React Beautiful DnD (drag and drop)
- Fuse.js (client-side search)
