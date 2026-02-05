"""
Brain Dump model for universal quick capture
"""
from sqlalchemy import Column, Integer, Text, DateTime
from datetime import datetime
from app.database import Base

class BrainDump(Base):
    __tablename__ = "brain_dump"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    edited_at = Column(DateTime, nullable=True)
