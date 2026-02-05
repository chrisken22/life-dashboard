# Compass Backend

FastAPI backend for Compass life dashboard.

## Setup

1. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run development server:
```bash
uvicorn app.main:app --reload --port 8000
```

Server will run at: http://localhost:8000

## API Documentation

Once running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Database

SQLite database file: `compass.db` (created automatically on first run)

## Project Structure

```
backend/
├── app/
│   ├── main.py           # FastAPI app entry point
│   ├── database.py       # Database config
│   ├── models/           # SQLAlchemy models
│   ├── routers/          # API endpoints
│   └── services/         # Business logic
└── requirements.txt      # Python dependencies
```
