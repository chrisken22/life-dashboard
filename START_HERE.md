# 🚀 START HERE - First Time Setup

Welcome to Compass! Follow these steps to get running.

## Step 1: Install Backend Dependencies

```bash
cd backend
python -m venv venv
```

**Windows:**
```bash
venv\Scripts\activate
```

**Mac/Linux:**
```bash
source venv/bin/activate
```

Then install:
```bash
pip install -r requirements.txt
```

## Step 2: Install Frontend Dependencies

Open a NEW terminal window (keep backend terminal open):

```bash
cd frontend
npm install
```

## Step 3: Start Both Servers

**Terminal 1 (Backend):**
```bash
cd backend
# Make sure venv is activated
uvicorn app.main:app --reload --port 8000
```

You should see: "Uvicorn running on http://127.0.0.1:8000"

**Terminal 2 (Frontend):**
```bash
cd frontend
npm start
```

Your browser should automatically open to: http://localhost:3000

## Step 4: Verify It Works

1. Backend health check: http://localhost:8000/health
   - Should see: `{"status": "healthy"}`

2. Frontend: http://localhost:3000
   - Should see dark-themed "Welcome to Compass" page

3. API docs: http://localhost:8000/docs
   - Interactive Swagger documentation

## What's Next?

Now that the structure is set up, we'll build features in this order:

1. ✅ Project structure (DONE!)
2. 🔜 Command Palette (Ctrl+K) - next up
3. 🔜 Brain Dump (Ctrl+Space)
4. 🔜 Simple Todos
5. 🔜 Kanban Board
6. 🔜 Dashboard Layout
7. 🔜 Privacy Mode

## Troubleshooting

**Python not found?**
- Make sure Python 3.8+ is installed
- Try `python3` instead of `python`

**npm not found?**
- Install Node.js from https://nodejs.org/

**Port 8000 already in use?**
- Kill the process or use a different port:
  ```bash
  uvicorn app.main:app --reload --port 8001
  ```
  Then update `frontend/package.json` proxy to `http://localhost:8001`

**Port 3000 already in use?**
- React will prompt you to use a different port (just say yes)

## Need Help?

Check the docs:
- `docs/PROJECT_PLAN.md` - Full project vision
- `docs/phase1-implementation-decisions.md` - Phase 1 details
- `backend/README.md` - Backend specifics
- `frontend/README.md` - Frontend specifics
