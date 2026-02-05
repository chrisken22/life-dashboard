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

## Questions to Resolve

1. **Brain Dump placement:** Should it be a persistent input on dashboard, or a modal/overlay triggered by shortcut?
2. **AI triage timing:** Immediate (on submit) or batch (review queue)?
3. **Voice recognition scope:** Start with brain dump only, or all text inputs?
4. **Privacy preference:** Browser-only speech recognition, or option for cloud (better accuracy)?

---

## Ready to Merge

*(Refined ideas ready for PROJECT_PLAN - with suggested phase/section)*

---

Last updated: 05/02/2026 from web
