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

### Documentation Strategy (04/02/2026)

**Context:** Need structured docs beyond CLAUDE.md and PROJECT_PLAN to capture different types of information.

**Primary Docs (create now):**

| Doc | Purpose |
|-----|---------|
| `docs/decision-log.md` | Why we chose X over Y - architectural choices, tech decisions |
| `docs/lessons-learned.md` | What worked, what didn't - insights from experience |
| `docs/troubleshooting.md` | Common problems + solutions - save future debugging time |

**Optional Docs (create when needed):**

| Doc | Purpose | Create when... |
|-----|---------|----------------|
| `docs/issue-log.md` | Track bugs/problems during dev | If not using GitHub Issues |
| `docs/changelog.md` | Version history | If Change Log in PROJECT_PLAN grows too large |
| `docs/quick-reference.md` | Cheat sheet for commands | Once there are recurring commands to remember |

**Rules for CLAUDE.md (add when merging):**

```markdown
## Documentation Rules

| Situation | Action |
|-----------|--------|
| Made an architectural choice | Add to `docs/decision-log.md` |
| Learned something the hard way | Add to `docs/lessons-learned.md` |
| Fixed a tricky bug | Add to `docs/troubleshooting.md` |
| Have ideas for the plan | Web: `docs/brainstorm.md` / Local: edit `PROJECT_PLAN.md` directly |
| Code review after feature/phase | Look for skill candidates, update docs |
```

**Code Review Sessions (add to CLAUDE.md):**
- Frequency: After each phase completion + ad-hoc as needed
- Purpose: Identify patterns for skills, update documentation, capture lessons learned

---

## Questions to Resolve

*(Open questions that need answers before merging)*

---

## Ready to Merge

*(Refined ideas ready for PROJECT_PLAN - with suggested phase/section)*

---

Last updated: 04/02/2026 09:45 from web
