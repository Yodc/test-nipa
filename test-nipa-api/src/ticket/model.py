from pydantic import BaseModel, ValidationError
from datetime import datetime

class Status(BaseModel):
    status_id: int
    status_name: str
    next_status_id: int | None = None

    class Config:
        orm_mode = True

class Ticket(BaseModel):
    ticket_id: int
    title: str
    desc: str 
    contract_info: str
    status_id: int
    created_at: datetime
    updated_at: datetime
    status: Status

    class Config:
        orm_mode = True

class TicketSearch(BaseModel):
    status_id: int | None = None

class TicketCreate(BaseModel):
    title: str
    desc: str 
    contract_info: str

class TicketUpdate(TicketCreate):
    status_id: int
