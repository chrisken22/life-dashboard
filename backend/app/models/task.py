"""
Task model for Kanban board
"""
from sqlalchemy import Column, Integer, String, DateTime, Text
from datetime import datetime
from app.database import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    status = Column(String, default="backlog")  # backlog, in_progress, done
    priority = Column(Integer, default=0)
    due_date = Column(DateTime, nullable=True)
    tags = Column(Text)  # JSON array stored as string
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
