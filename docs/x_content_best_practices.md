# AI Agent Best Practices & Actionable Information

This document compiles best practices, tips, and actionable advice extracted from X/Twitter content about Claude AI, agent automation, and AI-assisted workflows. Each item includes its source for reference.

---

## Table of Contents

1. [Claude Code Workflows](#claude-code-workflows)
2. [Planning & Strategy](#planning--strategy)
3. [Documentation & Knowledge Management](#documentation--knowledge-management)
4. [Skills Development](#skills-development)
5. [Debugging & Bug Fixing](#debugging--bug-fixing)
6. [Prompting Excellence](#prompting-excellence)
7. [Terminal & Environment Setup](#terminal--environment-setup)
8. [Subagents & Parallel Processing](#subagents--parallel-processing)
9. [Data & Analytics](#data--analytics)
10. [Learning with Claude](#learning-with-claude)
11. [Project Planning with AI](#project-planning-with-ai)
12. [Claude Skills Architecture](#claude-skills-architecture)
13. [Clawdbot Setup & Usage](#clawdbot-setup--usage)
14. [Feature-Based Development](#feature-based-development)
15. [Context Management](#context-management)
16. [Agent Automation & Loops](#agent-automation--loops)
17. [Multi-Agent Systems](#multi-agent-systems)
18. [Memory & Persistence](#memory--persistence)
19. [Security & Infrastructure](#security--infrastructure)
20. [Cost Management](#cost-management)

---

## Claude Code Workflows

### Parallel Worktrees - The Biggest Productivity Unlock
**Source:** Boris Cherny advices

- **Practice:** Spin up 3-5 git worktrees simultaneously, each running its own Claude session in parallel
- **Why it works:** Described by the Claude Code team as "the single biggest productivity unlock"
- **Setup variations:**
  - Most Claude Code team members prefer worktrees over multiple git checkouts
  - Name your worktrees and set up shell aliases (za, zb, zc) for one-keystroke switching
  - Create a dedicated "analysis" worktree only for reading logs and running BigQuery
- **Documentation:** https://code.claude.com/docs/en/common-workflows#run-parallel-claude-code-sessions-with-git-worktrees

### Status Line Configuration
**Source:** Boris Cherny advices

- **Command:** Use `/statusline` to customize your terminal status bar
- **Show:** Context usage and current git branch
- **Benefit:** Easier Claude-juggling across multiple sessions

---

## Planning & Strategy

### Start Complex Tasks in Plan Mode
**Source:** Boris Cherny advices

- **Rule:** Start every complex task in plan mode
- **Approach:** Pour your energy into the plan so Claude can 1-shot the implementation
- **Advanced technique:** Have one Claude write the plan, then spin up a second Claude to review it as a staff engineer
- **Recovery pattern:** When something goes sideways, switch back to plan mode and re-plan. Don't keep pushing.
- **Extended use:** Explicitly tell Claude to enter plan mode for verification steps, not just for the build

### Interview Mode - The Critical Practice
**Source:** How to 10x your life with Claude Code

- **Practice:** Make Claude interview you until it understands exactly what you're building
- **Prompt:** "Interview me about every detail. Ask me about technical decisions, design choices, edge cases. Don't stop until you understand exactly what I want."
- **Process:** Go through multiple rounds of questions (intentionally tedious)
- **ROI:** One 45-minute interview saved 14+ hours of debugging by catching edge cases first
- **Why it works:** Clarifying upfront prevents costly misunderstandings during implementation

### Structured Project Planning
**Source:** Best way AI

**Step-by-step workflow:**
1. Open fresh chat with Opus 4.5 and turn on extended thinking
2. Dump everything about your project
3. Ask: "Ask me 5 questions that would help you have a complete understanding of this project"
4. Spend significant time answering those questions
5. Request: "You're my co-founder. Create a master plan with a knowledge base directory for each section. Attach context markdown files to every part. You're building the skeleton that Claude Code will use to build everything 10x faster. Suggest skills to integrate, automations to build or any tool that'd 10x our speed. Suggest when to use a project or Claude Code."
6. Import all generated files into Claude Code
7. Build systems alongside Claude Code, letting it direct when to spin up Claude Projects for specific tasks

**Result:** One planning session replaces weeks of figuring things out independently

---

## Documentation & Knowledge Management

### CLAUDE.md Maintenance
**Source:** Boris Cherny advices

- **After every correction:** End with "Update your CLAUDE.md so you don't make that mistake again"
- **Key insight:** Claude is eerily good at writing rules for itself
- **Ongoing work:** Ruthlessly edit your CLAUDE.md over time
- **Success metric:** Keep iterating until Claude's mistake rate measurably drops
- **Advanced approach:** Maintain a notes directory for every task/project, updated after every PR. Point CLAUDE.md at these notes.

### Living Knowledge Base
**Source:** How to make your agent learn and ship while you sleep

- **Concept:** AGENTS.md becomes living knowledge base that grows every night
- **Mechanism:** Agent gets smarter each day because it reads updated instructions before each run
- **Compound effect:** Patterns discovered Monday inform Tuesday's work; gotchas from Wednesday avoided Thursday
- **Result:** AGENTS.md files become institutional memory

---

## Skills Development

### When to Create Skills
**Source:** Boris Cherny advices

- **Rule:** If you do something more than once a day, turn it into a skill or command
- **Tech debt skill:** Build a `/techdebt` slash command and run at end of every session to find and kill duplicated code
- **Context aggregation:** Set up a slash command that syncs 7 days of Slack, GDrive, Asana, and GitHub into one context dump
- **Analytics skills:** Build analytics-engineer-style agents that write dbt models, review code, and test changes in dev
- **Distribution:** Commit skills to git and reuse across every project

### Skill Structure Essentials
**Source:** Claude Skills Explained

**Required file:**
- Only SKILL.md is required; everything else is optional

**Frontmatter requirements:**
- name (kebab-case)
- description (CRITICAL - tells Claude when to trigger)

**Description field importance:**
- Most critical element - controls activation
- Be specific about what skill does and when it triggers
- Include variations of how someone might request it
- Good example: "Creates Word documents with tracked changes for legal review"
- Bad example: "Creates documents"

**Body best practices:**
- Be concise; Claude is smart - don't explain what it already knows
- Use examples instead of lengthy explanations
- Show, don't tell
- Front-load important content (Claude pays more attention to top)
- Keep SKILL.md under 500 lines
- Move detailed reference material to references folder

### File Organization for Skills
**Source:** Claude Skills Explained

**Scripts folder:**
- Python or Bash code Claude can actually run
- For tasks needing exact repeatability

**References folder:**
- Extra documentation Claude reads when needed
- Keeps SKILL.md lean
- Split large files by topic so Claude only loads what's relevant

**Assets folder:**
- Files used in output
- Templates, images, boilerplate code

### Built-in Skills to Leverage
**Source:** Claude Skills Explained

- **DOCX skill:** Creates Word documents with tracked changes and proper formatting
- **XLSX skill:** Builds spreadsheets with working formulas and validation
- **PDF skill:** Reading, merging, splitting, form filling, extracting tables
- **PPTX skill:** Creates professional presentations with varied layouts, proper color palettes, font pairings
- **Frontend Design skill:** Web interfaces that don't look AI-generated

### Common Skill Mistakes
**Source:** Claude Skills Explained

**What NOT to do:**
- Don't explain things Claude already knows (wastes tokens)
- Don't write vague descriptions (skill won't trigger)
- Don't cram too much into SKILL.md (use separate files)
- Don't put "when to use" in body field (put it in description - Claude looks there for triggers)
- Don't celebrate after one test - try edge cases

**Testing approach:**
- Test scripts independently before bundling
- Test with realistic use cases, not generic prompts
- Explore edge cases thoroughly

### Advanced Skill Techniques
**Source:** Claude Skills Explained

**Combining skills:**
- Brand Guidelines skill + DOCX skill = branded documents automatically

**Advanced scripting:**
- Scripts can call external APIs
- Process files before Claude works with them
- Validate outputs

**Team sharing:**
- Package as .skill files and distribute
- Everyone gets consistency

---

## Debugging & Bug Fixing

### Let Claude Fix Bugs Autonomously
**Source:** Boris Cherny advices

**Slack integration approach:**
- Enable the Slack MCP
- Paste a Slack bug thread into Claude
- Just say "fix"
- Zero context switching required

**CI/CD approach:**
- Say "Go fix the failing CI tests"
- Don't micromanage how

**Distributed systems:**
- Point Claude at docker logs to troubleshoot distributed systems
- Surprisingly capable at this

---

## Prompting Excellence

### Challenge Claude
**Source:** Boris Cherny advices

**Make Claude your reviewer:**
- Say "Grill me on these changes and don't make a PR until I pass your test"

**Demand proof:**
- Say "Prove to me this works"
- Have Claude diff behavior between main and your feature branch

**Request elegant solutions:**
- After a mediocre fix, say: "Knowing everything you know now, scrap this and implement the elegant solution"

**Reduce ambiguity:**
- Write detailed specs before handing work off
- The more specific you are, the better the output

### Being Specific with Requests
**Source:** I set up Clawdbot a few hours ago

**Good:** "Move all PDFs from downloads to Documents folder"
**Bad:** "Organize files"

**Why it matters:** Specificity eliminates ambiguity and reduces back-and-forth

---

## Terminal & Environment Setup

### Terminal Recommendations
**Source:** Boris Cherny advices

**Ghostty terminal:**
- Team loves it for synchronized rendering
- 24-bit color support
- Proper unicode support

**Terminal organization:**
- Color-code and name your terminal tabs
- Sometimes use tmux
- One tab per task/worktree

### Voice Dictation
**Source:** Boris Cherny advices

- **Command:** Hit fn x2 on macOS
- **Benefit:** You speak 3x faster than you type
- **Result:** Your prompts get way more detailed as a result
- **Documentation:** More tips at https://code.claude.com/docs/en/terminal-config

---

## Subagents & Parallel Processing

### When and How to Use Subagents
**Source:** Boris Cherny advices

**Basic usage:**
- Append "use subagents" to any request where you want Claude to throw more compute at the problem

**Context management:**
- Offload individual tasks to subagents to keep your main agent's context window clean and focused

**Permission routing:**
- Route permission requests to Opus 4.5 via a hook
- Let it scan for attacks and auto-approve the safe ones
- See: https://code.claude.com/docs/en/hooks#permissionrequest

---

## Data & Analytics

### Database CLI Integration
**Source:** Boris Cherny advices

**BigQuery example:**
- Ask Claude Code to use the "bq" CLI to pull and analyze metrics on the fly
- Create a BigQuery skill checked into the codebase
- Everyone on team uses it for analytics queries directly in Claude Code
- Result: Team members haven't written SQL in 6+ months

**General approach:**
- Works for any database that has a CLI, MCP, or API

---

## Learning with Claude

### Learning Strategies
**Source:** Boris Cherny advices

**Explanatory output:**
- Enable "Explanatory" or "Learning" output style in `/config`
- Have Claude explain the *why* behind its changes

**Visual presentations:**
- Have Claude generate a visual HTML presentation explaining unfamiliar code
- Makes surprisingly good slides

**ASCII diagrams:**
- Ask Claude to draw ASCII diagrams of new protocols and codebases
- Helps understand complex systems

**Spaced repetition:**
- Build a spaced-repetition learning skill
- You explain your understanding
- Claude asks follow-ups to fill gaps
- Stores the result for future reference

---

## Project Planning with AI

### Four Types of Knowledge Skills Provide
**Source:** Claude Skills Explained

1. **Step-by-step workflows:** Tell Claude exactly how to complete a process in order
2. **Domain expertise:** Give Claude the rules and standards for your specific field
3. **Tool integrations:** Teach Claude how to work with specific tools
4. **Reusable resources:** Provide templates, examples, reference material

### What Skills Solve
**Source:** Claude Skills Explained

1. **Consistency:** Same output every time
2. **Quality:** Includes industry best practices
3. **Efficiency:** No need to re-explain context

---

## Claude Skills Architecture

### Skill Description Best Practices
**Source:** Claude Skills Explained

**Include:**
- What skill does
- Variations of how someone might request it
- Specific use cases that should trigger the skill

**Example structure:**
"Creates Word documents with tracked changes for legal review. Use this when generating contracts, policy documents, or any legal content requiring revision tracking."

---

## Clawdbot Setup & Usage

### 30-Minute Setup Process
**Source:** Clawdbot looks intimidating

**Timeline:**
1. Get free AWS EC2 server with 8GB option (5 min)
2. Install Clawdbot: `curl -fsSL https://clawd.bot/install.sh | bash` (2 min)
3. Run wizard with quick start, select Anthropic, paste token (10 min)
4. Create Telegram bot via @BotFather with token (5 min)
5. Give bot identity: name, timezone, purpose (5 min)

### Initial Testing
**Source:** Clawdbot looks intimidating

**Test 1:** "Check my last 10 emails and tell me which ones actually need a response"
**Test 2:** "Research [company you're curious about] and give me a 3-bullet summary of what they do"
**Test 3:** "Remind me to [something you've been putting off] tomorrow at 9am"

### Scaling Your Clawdbot
**Source:** Clawdbot looks intimidating

**Add Brave Search:**
- Go to brave.com/search/api
- Get free API key
- Tell bot to set it up

**Connect tools progressively:**
- GitHub
- Google Drive
- Gmail
- Calendar

**Give real tasks:**
- Research
- Reminders
- Drafting
- Scheduling
- Summarizing

### Voice Notes for Efficiency
**Source:** Clawdbot looks intimidating

- Use voice notes on Telegram/WhatsApp
- Don't need to type
- Some people run multiple agents in Slack
- Set off one task, start another in parallel

### Mental Shift: ChatGPT vs Clawdbot
**Source:** I set up Clawdbot a few hours ago

**ChatGPT:**
- You go to app
- You type
- It responds
- You copy-paste and do work yourself

**Clawdbot:**
- Lives on your computer running 24/7
- Actually does things: moves files, runs code, sends emails, browses websites
- Remembers conversations across days/weeks
- Can message you first with updates

**Mental model shift:** ChatGPT is like googling; Clawdbot is like having an assistant who does the thing

### Memory Persistence Advantage
**Source:** I set up Clawdbot a few hours ago

- Clawdbot remembers casual mentions from hours earlier
- Builds up context over time
- Learns your preferences
- After a week, knows you better than ChatGPT ever will
- **This is surprisingly underestimated advantage**

### Infrastructure Requirements
**Source:** I set up Clawdbot a few hours ago

**You need:**
1. Server that stays on 24/7
   - Your own computer
   - Cloud server ($5-10/month)
   - Raspberry Pi
2. Anthropic API key (add payment method at console.anthropic.com)
3. Messaging app (Telegram easiest, WhatsApp works too)
4. Set budget limit in Anthropic dashboard

**Server recommendation:**
- Use separate server, not main computer
- Containment if something goes wrong
- Hetzner.com/cloud recommended (~€4-5/month)

### What Works When
**Source:** I set up Clawdbot a few hours ago

**Right now:**
- File management
- Web searches
- Reminders
- Research
- Text processing
- Running simple scripts
- Weather
- Calculations

**After setup:**
- Email
- Calendar
- Google Drive connections

**Requires real effort:**
- Complex 24/7 automations
- Monitoring websites
- Multi-step workflows
- Custom integrations

### Effective Usage Patterns
**Source:** I set up Clawdbot a few hours ago

**Give context:**
- Tell it what you're working on
- Let it remember your preferences after mentioning once

**Start routines:**
- Example: "Every morning search for news about [topic]"

**Monitor costs:**
- Check regularly, especially first week

### Troubleshooting Commands
**Source:** I set up Clawdbot a few hours ago

**Bot not responding:**
```bash
clawdbot pairing list telegram
```
Then approve pairing

**No auth configured:**
- Re-run setup wizard

**Node not found:**
- Re-run install commands

**General issues:**
```bash
clawdbot doctor
```

---

## Feature-Based Development

### Think in Features, Not Products
**Source:** How to 10x your life with Claude Code

**Anti-pattern:** "Build me an app that does X"

**Correct approach:**
- Break down into actual pieces
- Build feature 1
- Test it
- Move to feature 2
- Validate each piece before stacking next

**Key insight:** People shipping real products think in features; people in tutorial hell think in products

---

## Context Management

### Context Window Management
**Source:** How to 10x your life with Claude Code

**Rule:** Once you've used about half the context window, start a fresh session

**Process:**
1. New session needs documentation to pick up where you left off
2. Keep a progress file
3. Update after each feature
4. When starting fresh, Claude reads the file and has everything needed

---

## Agent Automation & Loops

### Nightly Automation Structure
**Source:** How to make your agent learn and ship while you sleep

**Two-part sequence:**
1. **Compound Review (10:30 PM):**
   - Load compound-engineering skill
   - Review all threads from last 24 hours
   - Extract key learnings from threads that didn't use Compound Engineering skill
   - Update relevant AGENTS.md files with patterns, gotchas, context
   - Commit and push to main

2. **Auto-Compound (11:00 PM):**
   - Full pipeline: report → PRD → tasks → implementation → PR
   - Fetch latest main (includes night's AGENTS.md updates)
   - Pick top priority from latest prioritized report
   - Create PRD and break into tasks
   - Execute tasks using loop
   - Create draft PR

**Why order matters:** Review updates instructions first, then implementation benefits from fresh learnings

### macOS Implementation
**Source:** How to make your agent learn and ship while you sleep

**Use launchd instead of cron:**
- Native macOS task scheduling
- Create two plist files for 10:30 PM and 11:00 PM execution
- Keep Mac awake during automation window using `caffeinate` command

### Self-Improving Loop Concept
**Source:** How to make your agent learn and ship while you sleep

- Every unit of work makes future work easier
- AGENTS.md files become institutional memory
- Agent becomes expert in codebase through compounding learnings

---

## Multi-Agent Systems

### Agent Architecture
**Source:** The Complete Guide to Building Mission Control

**Structure:**
- Each agent is a separate Clawdbot session with unique session key (e.g., agent:seo-analyst:main)
- Sessions are independent with separate history, context, and memory
- Cron jobs fire on schedule to wake agents every 15 minutes

### SOUL Files - Agent Identity
**Source:** The Complete Guide to Building Mission Control

**Purpose:**
- SOUL.md tells agents who they are and what they're good at
- Constraints focus performance (e.g., "skeptical tester who finds edge cases" will actually find edge cases)
- Each agent gets distinct voice and viewpoint

**Why it matters:**
- SOUL prevents "good at everything" mediocrity

### AGENTS.md - Operating Manual
**Source:** The Complete Guide to Building Mission Control

**Contents:**
- Tells agents how to operate
- Where files stored
- How memory works
- What tools available
- When to speak vs stay quiet
- How to use Mission Control

**Application:** Applied on every agent startup

### Heartbeat System
**Source:** The Complete Guide to Building Mission Control

**Process:**
1. Agents wake every 15 minutes via cron
2. Load context: Read WORKING.md, recent daily notes, check session memory
3. Check for urgent items: @mentions, assigned tasks, activity feed
4. Take action or stand down

**Why 15 minutes:**
- Sweet spot
- Not too often (expensive)
- Not too infrequent (slow)

### Shared Brain - Mission Control Database
**Source:** The Complete Guide to Building Mission Control

**Infrastructure:** Convex (real-time, serverless, TypeScript-native)

**Provides:**
- Shared task database
- Comment threads
- Activity feed
- Notification system
- Document storage
- All agents reading/writing to same context
- Real-time propagation of changes

### Notification System
**Source:** The Complete Guide to Building Mission Control

**Mechanism:**
- @mentions trigger notifications on agent's next heartbeat
- Thread subscriptions eliminate need to @mention every comment
- Daemon polls every 2 seconds for undelivered notifications
- Notification stays queued if agent is asleep; delivered on next heartbeat

### Daily Standup Automation
**Source:** The Complete Guide to Building Mission Control

**Process:**
- Cron fires at set time (11:30 PM in example)
- Gathers all agent sessions
- Gathers recent activity
- Compiles summary

**Benefits:**
- Daily snapshot without constantly monitoring Mission Control
- Accountability mechanism

### Task Flow Lifecycle
**Source:** The Complete Guide to Building Mission Control

**States:** Inbox → Assigned → In Progress → Review → Done (+ Blocked state)

**Features:**
- Full history preserved on single task
- Multiple agents can collaborate with complete transparency

### Staggered Heartbeat Schedule
**Source:** The Complete Guide to Building Mission Control

**Purpose:** Prevents resource spikes

**Example schedule:**
- :00 Pepper
- :02 Shuri
- :04 Friday
- :06 Loki
- :07 Wanda
- :08 Vision
- :10 Fury
- :12 Quill

**Result:** Agents don't all run at once

### Agent Levels
**Source:** The Complete Guide to Building Mission Control

- **Intern:** Needs approval for most actions
- **Specialist:** Works independently in domain
- **Lead:** Full autonomy, can make decisions and delegate

### Multi-Agent Lessons Learned
**Source:** The Complete Guide to Building Mission Control

1. **Start smaller:** 2-3 agents, not 10
2. **Model selection:** Use cheaper models for routine heartbeats; save expensive models for creative work
3. **Memory is hard:** More you put in files, better it works
4. **Let agents surprise you:** Sometimes they contribute to tasks they weren't assigned

---

## Memory & Persistence

### Memory Stack Architecture
**Source:** The Complete Guide to Building Mission Control

**Four layers:**

1. **Session Memory:**
   - Clawdbot built-in JSONL files
   - Conversation history

2. **Working Memory:**
   - /memory/WORKING.md
   - Updated constantly with current task state

3. **Daily Notes:**
   - /memory/YYYY-MM-DD.md
   - Raw logs of what happened each day

4. **Long-term Memory:**
   - MEMORY.md
   - Curated important stuff
   - Lessons learned, key decisions, facts

**Golden Rule:** If you want to remember something, write it to a file (mental notes don't survive)

### Trader-Specific Memory Configuration
**Source:** What 48 Hours with ClawdBot Actually Looks Like for a Trader

**Prompt 1 - Memory Flush:**
```
Enable memory flush before compaction and session memory search.
Set compaction.memoryFlush.enabled to true
Set memorySearch.experimental.sessionMemory to true
Make it permanent.
```
**Purpose:** Saves everything before context wipes; allows searching through all past conversations

**Prompt 2 - Three-Layer Self-Updating Memory System:**
- Market observations compound instead of disappearing
- Six months later: ask about theses from previous season and get answers
- Random thoughts get categorized, timestamped, connected automatically
- Creates searchable database of your own thinking

**Prompt 3 - Session Preservation:**
```
Enable session memory hook. When starting new session with /new:
- Extract last 15 messages
- Generate descriptive title
- Save to searchable memory file
- Never lose context due to new conversation
```
**Benefits:**
- 2am breakthrough ideas become searchable
- Flow analysis from before CPI becomes searchable
- 45-minute sessions on specific logic become retrievable
- Six months of conversations = indexed archive of your thinking

---

## Security & Infrastructure

### Clawdbot Security Practices
**Source:** I set up Clawdbot a few hours ago

**Best practices:**
- Use separate server (isolated blast radius)
- Don't connect sensitive accounts immediately
- Never add bot to group chats (anyone can control it)
- Use minimum permissions when connecting accounts
- Run `clawdbot security audit`
- Claude Opus recommended for resistance to prompt injection

### Dedicated Hardware for Trading
**Source:** What 48 Hours with ClawdBot Actually Looks Like for a Trader

**Non-negotiable:**
- Use separate Mac Mini ($599 base) running ONLY Clawdbot
- Don't run on same machine as brokerage, API keys, real Gmail

**Why:**
- Blast radius containment: if something goes wrong, it's isolated
- Connected to Notion with 5+ years data but READ-ONLY access (analyze but not edit/delete)

**Alternative:** $5-20/month VPS instead

**Mac Mini vs VPS trade-offs:**

**Mac Mini advantages:**
- You own the hardware (no third-party access to credentials)
- macOS integrations work natively (iMessage, Notion desktop, screen control)
- After 12-18 months, pays for itself vs monthly server fees
- Simpler: It's a Mac you already know how to use
- No SSH babysitting, no terminal maintenance

**VPS considerations:**
- Usually Linux (limits best features, adds complexity)

### Infrastructure Shift with Moltworker
**Source:** Cloudflare just made the Mac Mini optional for Moltbot

**New architecture:**
- Runs entirely on Cloudflare edge
- Eliminates hardware requirements (Mac Mini, Raspberry Pi, always-on laptop)
- State moves to R2 with proper isolation
- Sandboxed by default

**Security improvements:**
- Container model limits blast radius
- Agent can execute code but can't accidentally rm -rf your laptop
- Proper isolation and access controls

**Enterprise adoption advantage:**
- IT departments would never approve "run autonomous AI agent on developer's personal hardware"
- But they would approve "run it in Cloudflare's sandboxed infrastructure with access controls and cost tracking"
- Opens B2B enterprise market that local agents couldn't access

**Trade-off:**
- Cold start problem: 1-2 minutes to spin up container
- Requires keeping containers warm indefinitely for "always-on" feel
- Paying for idle compute to maintain assistant experience

---

## Cost Management

### Clawdbot Cost Reality
**Source:** I set up Clawdbot a few hours ago

**Server:** $5-10/month
**Claude API:** $10-100+/month depending on usage

**Recommendation:** Set $20 budget, see where you land after a week

**Realistic totals:**
- **Total for most people:** $25-50/month
- **Light use:** $10-20/month
- **Normal use:** $20-40/month
- **Heavy use:** $50-100+/month

### Trading Cost Structure
**Source:** What 48 Hours with ClawdBot Actually Looks Like for a Trader

**Hardware:** $599 upfront for Mac Mini (or $5-20/month VPS)
**Claude Max:** ~$200/month

**Frame:** Less than one good trading day

---

## Advanced Practices

### The Golden Prompt (Overnight Employee)
**Source:** What 48 Hours with ClawdBot Actually Looks Like for a Trader

```
"I'm a full-time trader. I work pre-market to close, then research until sleep.
Take everything you know about me — playbooks, journal, philosophy, watchlists — and do work that makes me a better trader.
I want to wake up thinking 'wow, you got stuff done while I slept.'

- Never execute trades or interact with brokerage
- Never delete files without approval
- If you build something, save for my review
- If unsure, leave me a note
- Every night when I go to bed, do something useful
- Surprise me."
```

**Key prerequisite:** Brain dump EVERYTHING about trading/beliefs/edge/playbooks first
**Why it matters:** More context = better overnight work
**Safety:** This is NOT your main machine (contains all your API keys, broker access)

### Mental Shift - Director vs Worker
**Source:** What 48 Hours with ClawdBot Actually Looks Like for a Trader

**Old model:** You're the worker
**New model:** You're the director

**Time allocation shift:**
- Spend 95% of time writing great prompts and ensuring AI has context
- Execution happens automatically

**Focus shift:**
- AI handles execution
- You handle discovery and guidance
- Instead of grinding through tasks, focus on finding undiscovered problems

### Manual Before Automation
**Source:** How to 10x your life with Claude Code

**Rule:** Build something manually first before automating it

**Why:**
- If you haven't built something manually, automation will destroy you
- Automation amplifies broken processes
- Get reps in first - build feature by feature, deploy something real multiple times before automating

### Tool Obsession Anti-Pattern
**Source:** How to 10x your life with Claude Code

**Wrong equation:**
- Perfect tool setup + garbage plan = garbage output

**Right equation:**
- Basic setup + great plan = something real

**Lesson:** Invest energy in the input; tooling is secondary

**Don't blame tools:**
- MCPs, skills, plugins, custom markdown aren't why product isn't working

### Taste & Intentional Thinking
**Source:** How to 10x your life with Claude Code

**Taste means:**
- Knowing what to build
- What makes it different
- When something feels right

**AI amplification:**
- Vague thinking = vague outputs
- Intentional thinking = intentional outputs

**Practice:** Make deliberate choices at every step

---

## Key Principles Summary

### From Claude Code Team
**Source:** Boris Cherny advices

1. Do more in parallel (3-5 worktrees)
2. Start complex tasks in plan mode
3. Invest in your CLAUDE.md (make Claude write its own rules)
4. Create your own skills and commit to git
5. Let Claude fix most bugs by itself
6. Level up your prompting (challenge Claude, demand proof, request elegant solutions)
7. Optimize terminal & environment
8. Use subagents strategically
9. Use Claude for data & analytics
10. Use Claude for learning

### From Practitioners
**Source:** Multiple sources

1. Think in features, not products
2. Make Claude interview you before building
3. Earn the right to automate by building manually first
4. Memory persistence is underestimated advantage
5. Dedicated infrastructure matters for safety
6. Start smaller (2-3 agents, not 10)
7. Be specific with requests
8. Invest in input quality over tooling complexity

---

Last updated: 05/02/2026 21:35 from local
