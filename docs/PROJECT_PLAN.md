# Compass - Project Plan

## Project Vision

**Compass** - A personal web application that serves as your **guide through daily life** - reducing time spent on distracting websites while surfacing what matters. The app combines task management, curated content aggregation, personal knowledge capture, and AI-powered life coaching.

**Design:** Minimal dark theme (Notion-like, easy on eyes)
**AI Coach Tone:** Challenging/direct (pushes you, calls out excuses)

---

## User Context & Pain Points

### Current Situation
- Tasks scattered across: calendar, to-do apps, note apps
- No single system - things fall through cracks
- Time wasted scrolling X/Twitter, email, etc. looking for relevant info
- Wants to track patterns but manual journaling is inconsistent

### Success Looks Like
- Open Compass all day as main hub (personal + company laptop)
- Morning: See dashboard with everything that matters today
- During day: Quick capture thoughts, track mood, see curated content
- Evening: AI coach reviews day, suggests improvements
- Weekly: AI spots patterns, challenges assumptions, recommends actions

### Key Constraints
- Must work on both personal laptop (flexible) and company laptop (can't install things)
- VPS has limited storage - no local AI models
- Needs privacy mode to hide personal tabs at work
- Quick capture without installing browser extensions

### Differentiator from Existing Tools
- **vs Notion:** AI-native, challenging coach, automated content aggregation
- **vs Todoist:** Integrated knowledge base, mood tracking, cross-domain view
- **vs Obsidian:** Less manual linking, AI finds connections
- **vs ChatGPT:** Persistent memory, integrated with your life data, proactive

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (React)                        │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │  Tasks   │ │  Notes   │ │  Feeds   │ │ AI Chat  │       │
│  │ (Kanban) │ │ (Brain)  │ │ (Curated)│ │ (Coach)  │       │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Backend (FastAPI/Python)                   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │ Task API │ │ Notes API│ │ Feed API │ │  AI API  │       │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘       │
│                              │                               │
│  ┌───────────────────────────┴───────────────────────┐     │
│  │              AI Provider Abstraction               │     │
│  │   (OpenAI / Claude / Ollama / etc.)               │     │
│  └───────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Database (SQLite → PostgreSQL)            │
│  Tasks | Notes | Feeds | UserProfile | Mood | Patterns      │
└─────────────────────────────────────────────────────────────┘
```

---

## Tech Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Backend** | FastAPI (Python) | You know Python, great for AI integrations, async support |
| **Frontend** | React + Tailwind CSS | Modern, component-based, great ecosystem |
| **Database** | SQLite | Simple, no separate server needed, easy backup |
| **AI Layer** | LiteLLM | Unified API for OpenAI/Claude (cloud APIs due to VPS storage limits) |
| **Auth** | Simple token (self-hosted) | No complex auth needed for personal use |
| **Notifications** | Desktop: browser notifications / Telegram: Bot API |
| **Deployment** | Local first → systemd + nginx on VPS (no Docker) |

### Deployment Path
1. **Phase 1:** Run locally on personal laptop (development + daily use)
2. **Later:** Deploy to Debian VPS with systemd services + nginx reverse proxy
3. **If needed:** Migrate DB to cloud service (Supabase/PlanetScale) if storage is tight

---

## Development Phases

### Phase 1: Foundation + Task Management (MVP)
**Goal:** Working task manager with Kanban + simple todos - enough to use daily

**Features:**
- [ ] Project setup (FastAPI backend, React frontend, SQLite)
- [ ] **Dashboard home view** - everything at a glance
  - Today's tasks widget
  - Quick add widget
  - Upcoming deadlines
- [ ] **Kanban board** for projects (multi-step work)
  - Columns: Backlog | Today | In Progress | Done
  - Cards with: title, description, due date, priority, tags
  - Drag-and-drop between columns
- [ ] **Simple todo lists** for quick tasks
  - Checkbox style
  - Group by category (categories emerge from usage)
  - Quick-add from command palette (Ctrl+K)
- [ ] **Command palette** (Ctrl+K)
  - Search everything
  - Quick add task/todo/note
  - Navigate between views
  - Works in browser - no extension needed
- [ ] **Dark theme** from day 1
- [ ] **Privacy mode** - one-click hide personal content
- [ ] Local development setup (runs on localhost)

**Database Schema (Phase 1):**
```sql
-- Tasks (Kanban cards)
CREATE TABLE tasks (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'backlog',  -- backlog, today, in_progress, done
    priority INTEGER DEFAULT 0,
    due_date DATETIME,
    tags TEXT,  -- JSON array
    created_at DATETIME,
    updated_at DATETIME
);

-- Todos (simple checkboxes)
CREATE TABLE todos (
    id INTEGER PRIMARY KEY,
    task_id INTEGER,  -- optional link to kanban task
    text TEXT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    category TEXT,
    created_at DATETIME
);
```

---

### Phase 2: Notes & Personal Knowledge Base
**Goal:** Capture and organize thoughts, quotes, learnings - become your second brain

**Features:**
- [ ] **Quick note capture** via command palette (Ctrl+K → "note: ...")
- [ ] **Book quotes** with source tracking (e.g., "Untethered Soul" quotes)
- [ ] **Tags and categories** (emerge from usage, not predefined)
- [ ] **Full-text search** across all notes
- [ ] **"Random knowledge" widget** - surfaces random past notes on dashboard
- [ ] **Language learning** section for vocabulary/phrases
- [ ] **AI-generated connections** - AI suggests related notes (not manual graph)
- [ ] **Note types**: quote, thought, learning, language snippet, idea

**New Tables:**
```sql
CREATE TABLE notes (
    id INTEGER PRIMARY KEY,
    content TEXT NOT NULL,
    source TEXT,  -- book title, URL, etc.
    note_type TEXT,  -- quote, thought, learning, language
    tags TEXT,
    created_at DATETIME
);

CREATE TABLE note_links (
    note_id INTEGER,
    linked_note_id INTEGER,
    link_type TEXT  -- related, contradicts, supports
);
```

---

### Phase 3: AI Integration (Life Coach)
**Goal:** AI-powered insights and coaching - the "killer feature"

**Features:**
- [ ] **AI provider abstraction** (LiteLLM - switch between OpenAI/Claude)
- [ ] **Chat interface** for AI conversations
- [ ] **Devil's Advocate mode**
  - Challenges beliefs, opinions, assumptions
  - Questions your decisions and plans
  - Pokes holes in trading/investment thesis
  - Configurable intensity
- [ ] **Life Coach with memory**
  - Challenging/direct tone (default)
  - Learns patterns from notes/mood (selective access - you control what it sees)
  - Asks follow-up questions when you have time
  - Gives bold, actionable suggestions
- [ ] **Flexible mood check-ins**
  - Quick: 1-click emoji mood capture
  - Expanded: AI asks follow-up questions (optional)
- [ ] **Profile builder**
  - Import from diary (text files)
  - Import from OneNote notes
  - Build "who am I" profile for AI context
- [ ] **Daily/weekly AI prompts**
  - Morning: "What are you focusing on today?"
  - Evening: "How did it go? What did you learn?"
  - Weekly: Pattern review and challenges

**New Tables:**
```sql
CREATE TABLE ai_conversations (
    id INTEGER PRIMARY KEY,
    mode TEXT,  -- coach, devils_advocate, general
    created_at DATETIME
);

CREATE TABLE ai_messages (
    id INTEGER PRIMARY KEY,
    conversation_id INTEGER,
    role TEXT,  -- user, assistant, system
    content TEXT,
    created_at DATETIME
);

CREATE TABLE user_profile (
    id INTEGER PRIMARY KEY,
    profile_data TEXT,  -- JSON: personality traits, patterns, struggles
    updated_at DATETIME
);

CREATE TABLE mood_entries (
    id INTEGER PRIMARY KEY,
    mood_score INTEGER,  -- 1-10
    energy_level INTEGER,
    notes TEXT,
    tags TEXT,
    created_at DATETIME
);
```

---

### Phase 4: Content Aggregation (Curated Feeds)
**Goal:** Stop scrolling, start seeing - AI curates what matters

**Features:**
- [ ] **X/Twitter integration**
  - Follow specific accounts (e.g., trading influencers like @elikiwy)
  - Topic keyword monitoring: Hungary crypto regulation, trading setups, etc.
  - AI filters and summarizes - only shows what's relevant
  - No more scrolling through noise
- [ ] **Email scanning** (Gmail API)
  - Extract action items and deadlines
  - Surface interesting content worth reading
- [ ] **RSS/News aggregation** for curated sources
- [ ] **Trading ideas tracker**
  - Capture: "If BTC breaks 50k → buy ETH"
  - Status: watching | triggered | completed
  - Track outcomes and learn from results
  - (Integration with your trading app: decide later)
- [ ] **Sale/price alerts**
  - GymBeam products on sale
  - Grocery deals
  - Configurable product + price threshold
- [ ] **Notifications** (added in this phase)
  - Desktop push notifications
  - Telegram bot integration
  - Per-item notification settings

**New Tables:**
```sql
CREATE TABLE feed_items (
    id INTEGER PRIMARY KEY,
    source TEXT,  -- twitter, email, rss
    source_id TEXT,
    content TEXT,
    summary TEXT,
    relevance_score FLOAT,
    category TEXT,
    action_required BOOLEAN,
    created_at DATETIME
);

CREATE TABLE trading_ideas (
    id INTEGER PRIMARY KEY,
    condition TEXT,  -- "if BTC breaks 50k"
    action TEXT,     -- "buy ETH"
    source TEXT,
    status TEXT,     -- watching, triggered, completed
    outcome TEXT,
    created_at DATETIME
);

CREATE TABLE price_alerts (
    id INTEGER PRIMARY KEY,
    product_name TEXT,
    target_price FLOAT,
    url TEXT,
    triggered BOOLEAN,
    created_at DATETIME
);
```

---

### Phase 5: Life Areas & Events
**Goal:** Separate views for different life domains + social/event tracking

**Features:**
- [ ] **Life Area tabs** (tailored layouts per area)
  - Work: Kanban-heavy, project focused
  - Fun: Calendar/events heavy, social focused
  - Sports: Schedule + tracking focused
  - Health: Habits + mood focused
  - (More areas added as needed - emergent categories)
- [ ] **Calendar integration** (Google Calendar sync)
- [ ] **Community events** aggregation
  - Parties, meetups, conferences
  - Local events in your area
- [ ] **Relationship reminders**
  - Birthdays (from existing to-do apps)
  - Follow-up reminders ("check in with X")
  - Contact lenses reorder reminder
- [ ] **AI-powered recommendations**
  - "What can I do this weekend?" based on events + your interests
  - "How to meet new people?" actionable suggestions
  - Categorized by: Fun | Work | Sports | Social

---

### Phase 6: Advanced Features & Polish
**Goal:** Power-user features, analytics, and long-term patterns

**Features:**
- [ ] **Customizable dashboard** - drag-and-drop widget arrangement
- [ ] **Pattern detection & analytics**
  - Mood vs activities correlation
  - Productivity patterns (when do you work best?)
  - What activities improve your mood?
- [ ] **AI-generated reports**
  - Weekly summary: wins, misses, patterns
  - Monthly review: progress on goals, life area balance
  - Challenges assumptions: "You said X but did Y"
- [ ] **Time tracking** (optional, for those who want it)
  - Website time tracking
  - Focus time stats
- [ ] **Mobile-responsive design** (PWA later if needed)
- [ ] **Export/backup**
  - JSON export of all data
  - Scheduled cloud backup to personal storage
- [ ] **VPS deployment**
  - systemd service setup
  - nginx reverse proxy
  - SSL via Let's Encrypt

---

## Folder Structure (Initial)

```
life-dashboard/
├── docs/
│   └── PROJECT_PLAN.md          # This file
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI entry point
│   │   ├── models/              # Database models
│   │   ├── routers/             # API routes
│   │   ├── services/            # Business logic
│   │   └── ai/                  # AI provider abstraction
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## MVP Success Criteria

Phase 1 is complete when you can:
1. Open the app in browser at localhost:3000
2. See a dashboard with widgets (tasks, todos, quick add)
3. Press Ctrl+K to open command palette
4. Add a task to the Kanban board via command palette
5. Drag tasks between Kanban columns
6. Add quick todos via command palette
7. Check off completed todos
8. Toggle privacy mode to hide personal content
9. Everything persists in SQLite (survives restart)
10. Dark theme looks good and is usable all day

**NOT in MVP:** VPS deployment, AI features, content aggregation, notifications

---

## Decisions Made

| Decision | Choice |
|----------|--------|
| **App Name** | Compass |
| **Design** | Minimal dark theme |
| **AI Coach Tone** | Challenging/direct |
| **Tech Stack** | FastAPI + React + SQLite |
| **AI Providers** | Cloud APIs (OpenAI/Claude) - VPS storage too limited for local models |
| **Hosting** | Local first → VPS later (Debian, no Docker initially) |
| **Mobile** | Not priority - desktop focus |
| **Home View** | Everything dashboard - widgets for all areas at a glance |
| **Life Areas** | Start minimal, let categories emerge from usage |
| **Tab Layouts** | Tailored per area (Work = Kanban heavy, Fun = Calendar heavy, etc.) |
| **Notifications** | Desktop + Telegram, configurable per item |
| **Quick Capture** | Command palette (Ctrl+K) - works in browser, no install needed |
| **Privacy Mode** | One-click hide personal tabs (for company laptop use) |
| **AI Data Access** | Selective - user chooses what AI can see |
| **Devil's Advocate** | Challenges everything: beliefs, decisions, trading ideas |
| **Mood Check-ins** | Flexible: quick 1-click available, AI follow-ups optional |
| **Content Strategy** | Aggregate X/Twitter (specific accounts + topic keywords) |
| **Brain Map** | AI-generated connections (not manual graph building) |
| **Backups** | Local exports first → cloud backup when on VPS |
| **Database** | SQLite on VPS, migrate to cloud DB if storage becomes issue |

---

## Open Questions (To Discuss)

1. **AI persona:** Should the coach have a name/character?
2. **Data privacy:** Anonymization strategy for diary imports?
3. **Mobile:** PWA or native app eventually?

---

## Ideas Backlog (Unassigned)

*New ideas go here first, then get assigned to phases during planning sessions*

| Idea | Source | Notes |
|------|--------|-------|
| *(empty - add ideas here)* | | |

---

## Change Log

| Date | Change | Impact |
|------|--------|--------|
| 2026-02-04 | Initial plan created | - |

---

## How We Manage This Plan

### Adding New Ideas
1. New idea comes up → Add to "Ideas Backlog" section
2. During planning sessions → Assign to appropriate phase or keep in backlog
3. Ideas can span multiple phases (e.g., "brain map" touches Phase 2, 3, and 6)

### Changing Completed Phases
- **Small changes:** Just modify the code, update the plan to reflect reality
- **Medium changes:** Discuss trade-offs first, then implement
- **Big architectural changes:** May require refactoring - we assess cost/benefit together

### Version Control Strategy
- Plan changes get noted in Change Log
- Code changes get proper git commits
- If we need to "undo" a phase, git history helps

---

## Next Steps

Once this plan is approved:
1. Set up project structure (folders, configs)
2. Create backend skeleton with FastAPI + SQLite
3. Set up frontend with React + Tailwind (dark theme)
4. Implement command palette (Ctrl+K)
5. Implement Kanban board with drag-and-drop
6. Implement simple todos
7. Build dashboard home view
8. Add privacy mode toggle
9. Test locally, use daily, iterate

---

*Plan created: 2025-02-03*
*Last updated: 2026-02-03 23:27 via Claude Code (Web)*
