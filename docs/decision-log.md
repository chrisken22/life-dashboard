# Decision Log

**Purpose:** Record why we chose X over Y. Saves re-arguing old decisions.

---

*(Decisions made during planning are tracked in PROJECT_PLAN.md → "Decisions Made". Log new ones here as they come up during development.)*

---

### 04/02/2026 — Tech stack details (Phase 1 planning)

| Decision | Chose | Why not the alternatives |
|----------|-------|--------------------------|
| **API style** | REST + polling | WebSockets add complexity. AI chat, feeds, coach all work fine with polling. Can add WS later if needed. |
| **DB layer** | SQLAlchemy ORM + Alembic | Raw SQL gives more control but more boilerplate, especially for migrations across 6 phases. ORM handles 95% of cases; raw SQL still available when needed. |
| **State management** | React Query + useState | Redux is overkill for single-user app. Zustand would be fine but adds a library for no current benefit. |
| **Command palette search** | Fuse.js (client-side) | Server-side search adds latency and complexity. SQLite FTS is good for notes but too slow for the command palette "feel". Client-side is instant and works offline. |
| **Kanban DnD** | React Beautiful DnD | DnD Kit is newer and more flexible but less "out of the box". HTML5 native is too clunky for daily use. |
| **Dev setup** | Monorepo, two dev servers | One server hurts dev experience (no hot-reload). Separate repos add friction for solo project. Prod: FastAPI serves built frontend — best of both worlds. |

---

Last updated: 04/02/2026 22:35 from local
