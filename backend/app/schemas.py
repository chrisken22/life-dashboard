"""
Pydantic schemas for request/response validation
"""
from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List


class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: str = "backlog"  # backlog, in_progress, done
    priority: int = 0
    due_date: Optional[datetime] = None
    tags: Optional[List[str]] = None


class TaskCreate(TaskBase):
    """Schema for creating a new task"""
    pass


class TaskUpdate(BaseModel):
    """Schema for updating a task (all fields optional)"""
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    priority: Optional[int] = None
    due_date: Optional[datetime] = None
    tags: Optional[List[str]] = None


class TaskStatusUpdate(BaseModel):
    """Schema for updating just the status (for drag-drop)"""
    status: str


class TaskResponse(TaskBase):
    """Schema for task response"""
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True  # Allows SQLAlchemy model conversion
