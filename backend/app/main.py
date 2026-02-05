"""
Compass - FastAPI Backend Entry Point
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base
from app.routers import tasks

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Compass API", version="0.1.0", redirect_slashes=False)

# CORS configuration for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Compass API is running"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

# Include routers
app.include_router(tasks.router, prefix="/api/tasks", tags=["tasks"])
# TODO: Add other routers when ready
# app.include_router(todos.router, prefix="/api/todos", tags=["todos"])
# app.include_router(brain_dump.router, prefix="/api/brain-dump", tags=["brain-dump"])
