# Compass - Project Plan

## Project Vision

**Compass** - A personal web application that serves as your **guide through daily life** - reducing time spent on distracting websites while surfacing what matters. The app combines task management, curated content aggregation, personal knowledge capture, and AI-powered life coaching.

**Design:** Minimal dark theme (Notion-like, easy on eyes)
**AI Coach Tone:** Challenging/direct (pushes you, calls out excuses)

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
| **Database** | SQLite (start) → PostgreSQL | Simple start, easy migration when needed |
| **AI Layer** | LiteLLM | Unified API for OpenAI/Claude/Ollama/etc. |
| **Auth** | Simple token (self-hosted) | No complex auth needed for personal use |
| **Deployment** | Docker + Docker Compose | Easy self-hosting on VPS |

---

## Development Phases

### Phase 1: Foundation + Task Management (MVP)
**Goal:** Working task manager with Kanban + simple todos

**Features:**
- [ ] Project setup (FastAPI backend, React frontend, SQLite)
- [ ] Kanban board with drag-and-drop
  - Columns: Backlog | Today | In Progress | Done
  - Cards with title, description, due date, priority, tags
- [ ] Simple todo lists (checkbox style)
  - Quick-add from anywhere in the app
  - Group by category/project
- [ ] Basic dashboard view
- [ ] Docker setup for deployment

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
**Goal:** Capture and organize thoughts, quotes, learnings

**Features:**
- [ ] Quick note capture (text, with optional source)
- [ ] Book quotes with source tracking
- [ ] Tags and categories
- [ ] Full-text search
- [ ] "Random knowledge" widget - surfaces random past notes
- [ ] Language learning snippets section
- [ ] Basic "brain map" visualization (linked notes)

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
**Goal:** AI-powered insights and coaching

**Features:**
- [ ] AI provider abstraction (switch between OpenAI/Claude/Ollama)
- [ ] Chat interface for AI conversations
- [ ] "Devil's Advocate" mode - challenges your beliefs
- [ ] Life Coach personality with memory
  - Learns your patterns from notes/mood entries
  - Asks follow-up questions
  - Gives bold/sarcastic/encouraging suggestions (configurable tone)
- [ ] Daily/weekly check-ins prompted by AI
- [ ] Profile builder from diary/notes (import from OneNote)

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
**Goal:** Reduce mindless scrolling by curating content for you

**Features:**
- [ ] X/Twitter integration (via API or scraping)
  - Follow specific topics: crypto regulation, trading ideas
  - Filter and summarize relevant posts
- [ ] Email scanning (Gmail API)
  - Extract action items and interesting content
- [ ] RSS/News aggregation
- [ ] "Trading ideas" tracker
  - Capture "if X happens, buy Y" conditions
  - Track and follow up on outcomes
- [ ] Sale/price alerts (GymBeam, groceries)

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

### Phase 5: Events & Social
**Goal:** Track events, community happenings, social opportunities

**Features:**
- [ ] Event calendar integration
- [ ] Community events aggregation
- [ ] "Fun" section with parties, meetups
- [ ] Relationship reminders (birthdays, follow-ups)
- [ ] "How to find a partner" actionable suggestions
- [ ] Categorized recommendations: Fun | Work | Sports | Social

---

### Phase 6: Advanced Features
**Goal:** Polish and power-user features

**Features:**
- [ ] Dashboard widgets (customizable layout)
- [ ] Pattern detection (mood vs activities correlation)
- [ ] Weekly/monthly reports generated by AI
- [ ] Mobile-responsive design
- [ ] Browser extension for quick capture
- [ ] Export/backup functionality

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
1. Open the app in a browser
2. Create a task on a Kanban board
3. Drag task between columns
4. Create quick todos with checkboxes
5. See a basic dashboard with today's tasks
6. Deploy to your VPS with Docker

---

## Decisions Made

| Decision | Choice |
|----------|--------|
| **App Name** | Compass |
| **Design** | Minimal dark theme |
| **AI Coach Tone** | Challenging/direct |
| **Tech Stack** | FastAPI + React + SQLite |
| **AI Providers** | Flexible (OpenAI/Claude/Ollama via LiteLLM) |
| **Hosting** | Self-hosted on VPS via Docker |

---

## Open Questions (Future Phases)

1. **AI persona:** Should the coach have a name/character?
2. **Data privacy:** Anonymization strategy for diary imports?
3. **Mobile:** PWA or native app eventually?

---

## Next Steps

Once this plan is approved:
1. Set up the project structure
2. Create the backend skeleton with FastAPI
3. Set up the frontend with React
4. Implement the Task/Kanban feature
5. Add Docker configuration
6. Deploy MVP to test on your server

---

*Plan created: 2025-02-03*
*Last updated: 2026-02-03*
