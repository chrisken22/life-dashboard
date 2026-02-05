# Lessons Learned

**Purpose:** What worked, what didn't. Insights from experience — saves repeating mistakes.

---

## 06/02/2026 — Phase 1: Kanban Board Implementation

### What Worked Well

**Incremental implementation with user feedback**
- Built Kanban board step-by-step with visual checks at each stage
- Got user feedback on color scheme early → adjusted to twitterapi.io style
- Implemented "quick wins" (add/edit/delete/refresh) in one go after core was working
- Result: Faster iteration, fewer wrong assumptions

**Optimistic updates in React**
- Updated UI immediately on drag-and-drop, then synced with backend
- Provides instant feedback, feels snappy even with API latency
- Pattern to reuse: update state → call API → revert if API fails

**Modal for both create and edit**
- Single `TaskModal` component handles both new tasks and editing existing ones
- Pass `task` prop: if present = edit mode, if null = create mode
- Pre-fills form in edit mode, blank in create mode
- Reduces code duplication significantly

**Gradient headers for visual hierarchy**
- Purple (backlog) → Blue (in progress) → Green (done)
- Visual progression matches mental model of task flow
- Small detail but makes the board feel more polished

### What Didn't Work / Pitfalls

**React.StrictMode incompatibility**
- Broke react-beautiful-dnd silently
- Lesson: Check library compatibility with StrictMode before adding it
- StrictMode is valuable for catching issues, but not all libraries support it

**FastAPI trailing slash redirects**
- Wasted time debugging 422 errors before realizing redirects lose request body
- Lesson: Understand your framework's URL handling defaults early
- Set `redirect_slashes=False` from the start if using trailing slashes inconsistently

**Date format mismatch between frontend/backend**
- HTML date input returns `YYYY-MM-DD`, Pydantic expects full datetime
- Easy to miss because format looks "correct" at first glance
- Lesson: Test all form fields end-to-end, especially date/time inputs

**Empty string vs null**
- Empty date field sent `""` instead of `null`
- Backend rejected it because `Optional[datetime]` expects `null` for missing values
- Lesson: Explicitly convert empty form values to `null` before sending to API

### Patterns to Reuse

**API service layer structure**
```javascript
export const tasksApi = {
  getAll: () => apiFetch('/tasks/'),
  create: (data) => apiFetch('/tasks/', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiFetch(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiFetch(`/tasks/${id}`, { method: 'DELETE' }),
};
```
- Clean abstraction, easy to test, reusable for todos/notes/etc.

**Pydantic schemas for validation**
- `TaskBase` → shared fields
- `TaskCreate` → for POST (inherits from Base)
- `TaskUpdate` → for PUT/PATCH (all fields optional)
- `TaskResponse` → for GET (includes id, timestamps)
- Clear separation of concerns

**Color scheme in Tailwind config**
- Define custom colors once, reuse everywhere
- Easier to maintain consistent dark theme
- Pattern: `dark.bg`, `dark.card`, `dark.border`, `dark.text`, `dark.muted`

### Performance Notes

**Polling vs real-time updates**
- Used manual refresh button instead of polling
- Keeps server load minimal
- User controls when to fetch updates
- Can add auto-polling later if needed (every 30s or on focus)

**No virtualization needed yet**
- Kanban board handles 10-50 tasks fine without virtual scrolling
- Keep it simple until performance becomes an issue
- If we hit 100+ tasks per column, consider react-window

---

Last updated: 06/02/2026 01:00 from local
