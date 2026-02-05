# Compass

Personal life dashboard - your guide through daily life.

## Features

**Phase 1 (Current):**
- ✅ Project structure
- 🚧 Command Palette (Ctrl+K)
- 🚧 Brain Dump (Ctrl+Space)
- 🚧 Simple Todos
- 🚧 Kanban Board
- 🚧 Dashboard Layout
- 🚧 Dark Theme

**Future Phases:**
- Phase 2: Notes & Personal Knowledge Base
- Phase 3: AI Life Coach
- Phase 4: Content Aggregation (X/Twitter, Email, RSS)
- Phase 5: Life Areas & Events
- Phase 6: Advanced Features & Analytics

## Quick Start

### Backend (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Backend runs at: http://localhost:8000

### Frontend (React)

```bash
cd frontend
npm install
npm start
```

Frontend runs at: http://localhost:3000

## Tech Stack

- **Backend:** FastAPI, SQLAlchemy, SQLite
- **Frontend:** React, Tailwind CSS, React Query
- **Database:** SQLite → PostgreSQL (production)
- **Deployment:** Local → VPS (systemd + nginx)

## Documentation

- [Project Plan](docs/PROJECT_PLAN.md) - Full project vision and phases
- [Phase 1 Decisions](docs/phase1-implementation-decisions.md) - Implementation details
- [Best Practices](docs/x_content_best_practices.md) - AI agent development insights

## Development Workflow

1. Build feature by feature (not all at once)
2. Test each feature before moving to next
3. Update docs as you go
4. Run code reviews after each phase

## Keyboard Shortcuts

- `Ctrl+K` - Command Palette
- `Ctrl+Space` - Brain Dump

---

**Project Status:** Phase 1 - Foundation Setup Complete
**Next Step:** Implement Command Palette
