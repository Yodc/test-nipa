from typing import Annotated
from sqlalchemy import select
from sqlalchemy.orm import Session, declarative_base
from .model import TicketCreate, TicketUpdate, TicketSearch
from src.schemas.ticket import Ticket as TicketDB
from src.schemas.status import Status as StatusDB
from datetime import datetime

class TickethService:

    def __init__(self, db: Session):
        self.db = db

    def get_default_status_id(self,):
        item = self.db.query(StatusDB).filter(StatusDB.status_name == "pending").first()
        return item.status_id

    def store_ticket_service(self, data: TicketCreate):
        item = TicketDB(**data.__dict__)
        item.status_id = self.get_default_status_id()
        item.created_at = datetime.now()
        item.updated_at = datetime.now()

        self.db.add(item)
        self.db.commit()
        self.db.refresh(item)

        return item
    
    def update_ticket_service(self,ticket_id: int ,data: TicketUpdate):
        self.db.query(TicketDB).filter(TicketDB.ticket_id == ticket_id).update({**data.__dict__, 'updated_at': datetime.now()})

        self.db.commit()

        return self.db.query(TicketDB).get(ticket_id)
    
    def get_all_ticket(self, params:TicketSearch):
        query = self.db.query(TicketDB).join(TicketDB.status).order_by(StatusDB.status_name).order_by(TicketDB.updated_at.desc())

        if params.status_id:
            query = query.filter(TicketDB.status_id == params.status_id)

        return query.all()