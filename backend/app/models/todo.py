"""
Todo model for simple checkbox tasks
"""
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from datetime import datetime
from app.database import Base

class Todo(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True, index=True)
    task_id = Column(Integer, ForeignKey("tasks.id"), nullable=True)  # Optional link to task
    text = Column(String, nullable=False)
    completed = Column(Boolean, default=False)
    category = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
