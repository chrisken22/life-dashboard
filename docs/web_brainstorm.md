# Compass - Brainstorming Session

**Purpose:** Capture ideas from web sessions for later merging into PROJECT_PLAN
**Status:** Has items ready to merge

---

## Ideas & Discussion

*(New ideas go here)*

---

## Questions to Resolve

*(Add new questions here)*

---

## Ready to Merge

### Brain Dump / Quick Capture Feature
**Suggested phase:** Phase 1 (Foundation) or early Phase 3 (AI Integration)

**Summary:** Universal inbox on main dashboard for capturing anything. AI auto-categorizes on submit.

**Full Spec:**

| Aspect | Decision |
|--------|----------|
| **Location** | Center of main dashboard, persistent |
| **Prompt** | "What's on your mind?" |
| **Input** | Multi-line (Shift+Enter), no character limit |
| **Submit** | Enter key, animation feedback in box |
| **Focus shortcut** | `Ctrl+Space` from anywhere in app |
| **AI triage** | Immediate on submit, asks if uncertain, learns patterns |
| **Categories** | Task, Note, Dev idea (To Review), Question, Journal |
| **History** | Popup, last 10 items scrollable, shows timestamp + category |
| **Edit** | Text and category editable from history |
| **Voice** | Toggle button, Web Speech API (browser-only) |

**Integration points:**
- Main dashboard (primary placement)
- Command palette (quick access)
- Phase 3 AI Life Coach (pattern analysis)

---

### Voice Recognition (for Brain Dump)
**Suggested phase:** Phase 6 or alongside Brain Dump

**Summary:** Toggle-based voice input for brain dump. Browser-only for privacy.

| Aspect | Decision |
|--------|----------|
| **Scope** | Brain dump input only (v1) |
| **Mode** | Toggle (click start, click stop) |
| **Tech** | Web Speech API (local, private) |
| **Feedback** | Real-time transcription |

---

Last updated: 05/02/2026 from web (ready to merge)
