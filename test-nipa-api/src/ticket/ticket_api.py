from typing import Annotated
from src.databases import get_db
from fastapi import Depends, APIRouter, Depends
from typing import List
from sqlalchemy.orm import Session
from.service import TickethService
from .model import TicketCreate, Ticket, TicketUpdate, TicketSearch

router = APIRouter(
    prefix="/ticket",
    tags=["Ticket"],
    responses={404: {"description": "Not found"}},
)
@router.get("", response_model=List[Ticket])
async def get_all_pagination(
    db: Annotated[Session, Depends(get_db)],
    params: Annotated[TicketSearch, Depends()]
):
    return TickethService(db).get_all_ticket(params)

@router.post("")
async def store(
    db: Annotated[Session, Depends(get_db)],
    data: TicketCreate
):
    return TickethService(db).store_ticket_service(data)

@router.patch("/{ticket_id}")
async def update(
    db: Annotated[Session, Depends(get_db)],
    ticket_id: int,
    data: TicketUpdate
):
    return TickethService(db).update_ticket_service(ticket_id, data)