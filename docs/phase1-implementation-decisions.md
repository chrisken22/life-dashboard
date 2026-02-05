# Phase 1 Implementation Decisions

Decisions made during pre-implementation interview (05/02/2026)

---

## Command Palette Behavior

**Question:** What should the command palette show first and how should it behave?

**Decisions:**
- Show suggested actions when opened (not empty, not recent items)
- No persistence of last searches between sessions (for now)
- Stay open after quick-add for rapid-fire adding multiple items
- Close only when user hits Escape or clicks outside

**Implementation notes:**
- Suggested actions could be: "Add task", "Add todo", "Add brain dump", "Search"
- Consider arrow key navigation through suggestions
- Enter on suggestion triggers that action

---

## Brain Dump vs Command Palette Workflow

**Question:** What's the difference between Ctrl+Space (Brain Dump) vs Ctrl+K (Command Palette)?

**Confirmed distinction:**
- **Brain Dump (Ctrl+Space):** Random stuff, stream of consciousness, unstructured thoughts
- **Command Palette (Ctrl+K):** Concrete actions, structured tasks, finding things

**User mental model:**
- Brain Dump = "I just need to get this out of my head"
- Command Palette = "I need to do something specific"

---

## Privacy Mode Scope

**Question:** What should Privacy Mode hide/show?

**Decision:**
- Simple approach: Hide personal things
- AI Coach widget should be hidden (future Phase 3 feature)
- Keep it minimal for Phase 1

**Phase 1 scope:**
- Privacy Mode toggle button in header
- For now, just visual indicator (no widgets to hide yet in Phase 1)
- Build the toggle mechanism so we can expand what it hides in later phases

**Future considerations (Phase 2+):**
- Hide personal notes
- Hide AI Coach conversations
- Hide specific task categories/tags marked as "personal"
- No URL changes needed (runs on localhost anyway)

---

## Kanban Board Columns

**Question:** How do tasks move between columns, especially "Today"?

**Decision:**
- Skip the "Today" column entirely
- Simplified columns: **Backlog | In Progress | Done**
- User manually drags tasks from Backlog → In Progress when starting work
- Cleaner, simpler workflow

**Rationale:**
- "Today" column adds complexity without clear value at this stage
- User has better intuition for "I'm working on this now" (In Progress) vs "Not yet" (Backlog)
- Can always add "Today" or other columns later if needed

**Updated Phase 1 checklist:**
- [ ] Kanban board with 3 columns: Backlog | In Progress | Done
- [ ] Drag-and-drop between columns
- [ ] Tasks can move: Backlog → In Progress → Done
- [ ] Can also move backwards (Done → In Progress if needed to reopen)

---

## Implementation Priority Changes

Based on interview, recommend building in this order:

1. **Database + Backend API** (foundation)
2. **Command Palette** (core interaction model - test it early)
3. **Brain Dump** (simplest feature, validates command palette)
4. **Simple Todos** (next simplest)
5. **Kanban Board** (most complex - drag & drop)
6. **Dashboard layout** (brings everything together)
7. **Privacy Mode toggle** (just the UI mechanism for now)
8. **Dark theme polish** (final touches)

---

## Quick Wins & Simplifications

**Things we simplified:**
- ✅ Removed "Today" column from Kanban
- ✅ No search persistence in command palette (keep it simple)
- ✅ Privacy Mode is just a toggle for now (no complex hiding logic)
- ✅ Command palette stays open for rapid adding (UX win)

**Things we clarified:**
- ✅ Brain Dump vs Command Palette have distinct purposes
- ✅ Command palette shows suggestions, not blank
- ✅ Kanban workflow is manual (user drags when ready)

---

## Next Steps

1. Set up project structure (backend + frontend folders)
2. Initialize FastAPI + React + Tailwind
3. Create SQLite database with tables for: tasks, todos, brain_dump
4. Build command palette component first (validates core interaction)
5. Build from simple → complex: Brain Dump → Todos → Kanban

---

Last updated: 05/02/2026 22:10 from local
