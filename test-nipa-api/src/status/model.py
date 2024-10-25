from pydantic import BaseModel, ValidationError
from datetime import datetime

class Status(BaseModel):
    status_id: int
    status_name: str
    next_status_id: int