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

### 04/02/2026 — AI Coach tone & behavior

| Decision | Chose | Why not the alternatives |
|----------|-------|--------------------------|
| **Coach tone** | Drill Sergeant + Motivational Speaker (hybrid) | Pure Drill Sergeant was too cold — no belief in the user. Pure Motivational Speaker would be too soft. The hybrid is direct and demanding but the motivational kick lands at the right moments (completions, low mood, big days). |
| **Tone switching** | Fully automatic, context-driven | Manual toggle adds UI clutter and puts the cognitive load back on the user. The whole point of the coach is that it reads the situation — let it do its job. |
| **Sarcastic Friend tone** | Kept as a possible future addition | Was a strong second. Could be added later as an optional alternate mode for specific low-stakes nudges. Not the default. |
| **Low mood handling** | Direct + acknowledging, no humor | Sarcasm on a bad day feels dismissive. The coach should be firm ("don't skip this") but acknowledge it's rough, remind user they've handled worse. |

---

Last updated: 04/02/2026 22:40 from local
