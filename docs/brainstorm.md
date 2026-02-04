# Compass - Brainstorming Session

**Purpose:** Capture ideas from web sessions for later merging into PROJECT_PLAN
**Status:** Active brainstorm

---

## Ideas & Discussion

### Skills Strategy (04/02/2026)

**Context:** Skills are reusable instructions in `.claude/skills/` that teach Claude project-specific patterns.

**Decision:** Don't create skills upfront. Create them as patterns emerge from actual code.

**Workflow:**
1. Build a feature
2. Do a code review session
3. Identify repeating patterns or conventions
4. Create skill if the pattern will be reused

**Code Review Sessions - What to look for:**
- What patterns are repeating? → skill candidate
- What was confusing to implement? → document in skill
- What conventions emerged? → capture before forgotten

**Skill Guidelines:**
- Flat structure for now: `.claude/skills/skill-name.md`
- Start broad, split when too long
- Include brief "why" (rationale), not just "how" (steps)
- Create as we build, not upfront

**Potential skill categories (create when relevant):**
- Backend: endpoint patterns, DB migrations
- Frontend: components, dark theme, command palette
- AI: prompts, provider setup, coach tone
- Features: widgets, feeds, alerts, notifications

**Action:** Schedule periodic code review sessions after features are built to identify skill candidates.

---

## Questions to Resolve

*(Open questions that need answers before merging)*

---

## Ready to Merge

*(Refined ideas ready for PROJECT_PLAN - with suggested phase/section)*

---

Last updated: 04/02/2026 09:15 from web
