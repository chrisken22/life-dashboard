# Compass - Quick Start Guide

**For:** Getting up and running fast after a break or in a new session

---

## 🚀 Start the App (2 commands)

### Terminal 1 - Backend:
```bash
cd backend
uvicorn app.main:app --reload
```
✅ Backend running at: http://localhost:8000

### Terminal 2 - Frontend:
```bash
cd frontend
npm start
```
✅ Frontend running at: http://localhost:3000

### Open Browser:
http://localhost:3000

---

## ✅ What Currently Works

**Kanban Board:**
- ✅ Create tasks (click "+" in any column)
- ✅ Edit tasks (click on any card)
- ✅ Delete tasks (hover over card, click trash icon)
- ✅ Drag-and-drop between columns
- ✅ Set due dates, priority, tags, description
- ✅ Manual refresh to sync

**Development:**
- ✅ Hot reload on code changes
- ✅ Dark theme
- ✅ Full backend API at `/docs`

---

## 📂 Key Files to Know

| File | What it does |
|------|--------------|
| `backend/app/main.py` | FastAPI app entry point |
| `backend/app/routers/tasks.py` | Task CRUD endpoints |
| `backend/app/models.py` | Database models (Task) |
| `backend/app/schemas.py` | Pydantic validation |
| `frontend/src/components/KanbanBoard.jsx` | Main Kanban UI |
| `frontend/src/services/api.js` | API client |
| `docs/PROJECT_PLAN.md` | Full roadmap |
| `docs/STATUS.md` | Current status + what's next |

---

## 🐛 Common Issues

### Drag-and-drop not working?
**Fix:** Make sure `<React.StrictMode>` is removed from `frontend/src/index.js`

### 422 errors on save?
**Check:** Date format - should be `YYYY-MM-DDTHH:MM:SS` or `null`

### Backend not starting?
**Try:**
```bash
cd backend
pip install -r requirements.txt
```

### Frontend not starting?
**Try:**
```bash
cd frontend
npm install
```

---

## 📖 Documentation

- **PROJECT_PLAN.md** - Complete roadmap (6 phases)
- **STATUS.md** - What works now + next steps
- **troubleshooting.md** - Bug fixes we've made
- **lessons-learned.md** - What worked, what didn't
- **decision-log.md** - Why we chose X over Y
- **kanban-technical-reference.md** - Deep dive on Kanban code

---

## 🎯 Current Phase: Phase 1 (~40% complete)

**Done:**
- ✅ Project setup
- ✅ Kanban board

**Next:**
- ⏳ Simple todo list
- ⏳ Command palette (Ctrl+K)
- ⏳ Dashboard view
- ⏳ Brain Dump widget
- ⏳ Privacy mode

---

## 🔧 Quick Commands

### View API docs:
http://localhost:8000/docs (when backend running)

### Check database:
```bash
sqlite3 backend/compass.db
.tables
SELECT * FROM tasks;
```

### Reset database (caution!):
```bash
rm backend/compass.db
# Restart backend - tables auto-created
```

### Run tests (when we add them):
```bash
cd backend
pytest
```

---

## 💡 Next Session Checklist

1. [ ] Pull latest from git
2. [ ] Start backend + frontend
3. [ ] Check STATUS.md for what's next
4. [ ] Review session notes if needed
5. [ ] Start coding!

---

Last updated: 06/02/2026 01:00 from local
