from sqlalchemy.orm import declarative_base, relationship, backref
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime

Base = declarative_base()

class Status(Base):
    __tablename__ = "status"

    status_id = Column(Integer, primary_key=True)
    status_name = Column(String)
    next_status_id= Column(Integer)