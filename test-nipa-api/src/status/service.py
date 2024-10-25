from typing import Annotated
from sqlalchemy.orm import Session, declarative_base
from .model import Status
from src.schemas.status import Status as StatusDB
from datetime import datetime

class StatusService:

    def __init__(self, db: Session):
        self.db = db

    def get_all_status(self):
        return self.db.query(StatusDB).all()