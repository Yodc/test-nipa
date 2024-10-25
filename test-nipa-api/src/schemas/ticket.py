from sqlalchemy.orm import declarative_base, relationship, backref
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
Base = declarative_base()

class Status(Base):
    __tablename__ = "status"

    status_id = Column(Integer, ForeignKey('ticket.status_id'), primary_key=True)
    status_name = Column(String)
    next_status_id= Column(Integer)


class Ticket(Base):
    __tablename__ = "ticket"

    ticket_id = Column(Integer, primary_key=True)
    title = Column(String)
    desc = Column(String)
    contract_info= Column(String)
    status_id= Column(Integer, ForeignKey("status.status_id"))
    created_at= Column(DateTime)
    updated_at= Column(DateTime)

    status = relationship("Status", primaryjoin="Status.status_id == Ticket.status_id", uselist=False)