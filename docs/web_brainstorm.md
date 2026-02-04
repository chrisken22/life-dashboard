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

### Agents Strategy (04/02/2026)

**Context:** Agents are autonomous subprocesses for complex, multi-step tasks. Useful when tasks require multiple tool calls, decision-making, or specialized context.

**Planned Agents:**

#### 1. `quick-scaffold` (Learning / Simple)
**Purpose:** Simple agent to learn how agents work.
**What it does:**
- Before codebase exists: Creates a feature plan/spec (what files, endpoints, components needed)
- After Phase 1: Creates actual skeleton files following established patterns
**When to use:** Starting a new feature, learning agent patterns
**Build when:** Now (for learning) or after Phase 1 (for actual scaffolding)

#### 2. `code-reviewer`
**Purpose:** Reviews code, suggests improvements, identifies skill candidates.
**What it does:**
- Reviews changed files or specified paths
- Checks against established patterns
- Identifies code smells, inconsistencies, missing tests
- Suggests skills for repeating patterns
- Optionally updates docs (lessons-learned, troubleshooting)
**When to use:** After each phase, ad-hoc code reviews
**Build when:** After Phase 1 (need code to review)

#### 3. `dashboard-feature`
**Purpose:** End-to-end feature creation from idea to working widget.
**What it does:**
- Takes a feature idea (e.g., "show mood history on dashboard")
- Analyzes data needs
- Creates backend: DB model, API endpoint, tests
- Creates frontend: widget component with privacy mode support
- Registers widget in dashboard layout
- Runs tests and reports status
**When to use:** Adding new dashboard features
**Build when:** After Phase 1 (need established patterns)

#### 4. `feed-curator`
**Purpose:** Manages content feeds - setup, review, and tuning.
**What it does:**
- Add sources: Configure new Twitter accounts, RSS feeds, etc.
- Review feeds: Summarize fetched content, highlight important items
- Tune relevance: Adjust AI filtering based on feedback
- Debug: Check why sources aren't working
**Note:** The actual fetching runs as a background Python service (systemd). This agent helps configure and review it.
**When to use:** Managing content aggregation
**Build when:** Phase 4 (when feeds feature exists)

**Agent Guidelines:**
- Build agents as patterns emerge, not upfront
- Start simple (`quick-scaffold`), add complexity as needed
- Agents complement skills - skills teach patterns, agents apply them

---

## Questions to Resolve

*(Open questions that need answers before merging)*

---

## Ready to Merge

*(Refined ideas ready for PROJECT_PLAN - with suggested phase/section)*

---

Last updated: 04/02/2026 10:15 from web
