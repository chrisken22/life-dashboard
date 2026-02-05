# Compass - Brainstorming Session

**Purpose:** Capture ideas from web sessions for later merging into PROJECT_PLAN
**Status:** Active brainstorming

---

## Ideas & Discussion

### Brain Dump / Quick Capture Feature
**Core concept:** Universal inbox for capturing anything, directly in the app.

**UX:**
- "What's on your mind?" prompt on main dashboard
- Minimal friction - just type/speak and submit
- No need to categorize upfront

**AI Triage (auto-categorization):**
| Input type | AI action |
|------------|-----------|
| Development idea | → "To Review" backlog, surfaces when user has time |
| Task/action item | → Converts to todo in appropriate list |
| Random thought/note | → Stores in notes/knowledge base |
| Question | → Flags for research, could trigger web search |
| Journal/reflection | → Stores with date, links to Life Areas |

**Why this matters:**
- Reduces context-switching (no more jumping to external notes app)
- Single place for all inputs → nothing gets lost
- AI handles the "where does this go?" decision
- Perfect feed for the Life Coach to analyze patterns

**Integration points:**
- Main dashboard (prominent placement)
- Command palette (quick access from anywhere)
- Phase 3 AI features (triage + coaching)

---

### Voice Recognition Integration
**Core concept:** Speak instead of type, anywhere in the app.

**Implementation options:**
- Web Speech API (browser-native, local processing, privacy-friendly)
- Whisper API (more accurate, but cloud-based)

**Use cases:**
1. **Brain dump** - Talk through thoughts hands-free
2. **Command palette** - Voice commands ("add task buy groceries")
3. **Note dictation** - Longer form input
4. **Quick todos** - "Remind me to call mom tomorrow"

**Considerations:**
- Privacy: Prefer browser-based for sensitive content
- Fallback: Always allow typing as alternative
- Visual feedback: Show transcription in real-time

**Phase suggestion:** Could be Phase 6 (Advanced Features) or earlier if core to UX

---

## Decisions Made

**Core:**
1. **Brain Dump placement:** Persistent input on main dashboard, central position
2. **AI triage timing:** Immediate on submit, with option to review/correct. AI learns patterns over time
3. **Voice recognition scope:** Brain dump input only (v1)
4. **Privacy preference:** Browser-only (Web Speech API)

**UX Details:**
5. **Submit feedback:** Simple animation in the input box (e.g., checkmark, brief color change)
6. **Keyboard shortcut:** `Ctrl+Space` to focus from anywhere
7. **History view:** Popup showing last 10 items, scrollable. Each entry shows: text, timestamp, category, edit button
8. **AI uncertainty:** Ask user before saving ("Is this a task or a note?")
9. **Voice mode:** Toggle (click to start, click to stop)

**Input Details:**
10. **Multi-line:** Yes - Shift+Enter for new line, Enter to submit. Supports longer writing sessions
11. **Character limit:** None
12. **Edit functionality:** Can change text and category after submission (from history view)

## Questions to Resolve

*(Add new questions here)*

---

## Ready to Merge

*(Refined ideas ready for PROJECT_PLAN - with suggested phase/section)*

---

Last updated: 05/02/2026 from web (decisions added)
