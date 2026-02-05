"""
Task API endpoints
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import json

from app.database import get_db
from app.models.task import Task
from app.schemas import TaskCreate, TaskUpdate, TaskStatusUpdate, TaskResponse

router = APIRouter()


@router.get("/", response_model=List[TaskResponse])
def get_all_tasks(db: Session = Depends(get_db)):
    """Get all tasks"""
    tasks = db.query(Task).all()

    # Convert tags from JSON string to list
    for task in tasks:
        if task.tags:
            task.tags = json.loads(task.tags)
        else:
            task.tags = []

    return tasks


@router.get("/{task_id}", response_model=TaskResponse)
def get_task(task_id: int, db: Session = Depends(get_db)):
    """Get a single task by ID"""
    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    # Convert tags from JSON string to list
    if task.tags:
        task.tags = json.loads(task.tags)
    else:
        task.tags = []

    return task


@router.post("/", response_model=TaskResponse, status_code=201)
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    """Create a new task"""
    # Convert tags list to JSON string for storage
    task_data = task.model_dump()
    if task_data.get("tags"):
        task_data["tags"] = json.dumps(task_data["tags"])
    else:
        task_data["tags"] = json.dumps([])

    db_task = Task(**task_data)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)

    # Convert back to list for response
    if db_task.tags:
        db_task.tags = json.loads(db_task.tags)
    else:
        db_task.tags = []

    return db_task


@router.put("/{task_id}", response_model=TaskResponse)
def update_task(task_id: int, task_update: TaskUpdate, db: Session = Depends(get_db)):
    """Update a task"""
    db_task = db.query(Task).filter(Task.id == task_id).first()

    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")

    # Update only provided fields
    update_data = task_update.model_dump(exclude_unset=True)

    # Convert tags list to JSON string if provided
    if "tags" in update_data:
        update_data["tags"] = json.dumps(update_data["tags"])

    for field, value in update_data.items():
        setattr(db_task, field, value)

    db.commit()
    db.refresh(db_task)

    # Convert back to list for response
    if db_task.tags:
        db_task.tags = json.loads(db_task.tags)
    else:
        db_task.tags = []

    return db_task


@router.patch("/{task_id}/status", response_model=TaskResponse)
def update_task_status(
    task_id: int,
    status_update: TaskStatusUpdate,
    db: Session = Depends(get_db)
):
    """Update task status (for drag-drop between columns)"""
    db_task = db.query(Task).filter(Task.id == task_id).first()

    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")

    # Validate status
    valid_statuses = ["backlog", "in_progress", "done"]
    if status_update.status not in valid_statuses:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid status. Must be one of: {', '.join(valid_statuses)}"
        )

    db_task.status = status_update.status
    db.commit()
    db.refresh(db_task)

    # Convert tags for response
    if db_task.tags:
        db_task.tags = json.loads(db_task.tags)
    else:
        db_task.tags = []

    return db_task


@router.delete("/{task_id}", status_code=204)
def delete_task(task_id: int, db: Session = Depends(get_db)):
    """Delete a task"""
    db_task = db.query(Task).filter(Task.id == task_id).first()

    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(db_task)
    db.commit()

    return None
