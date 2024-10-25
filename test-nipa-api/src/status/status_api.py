from typing import Annotated
from src.databases import get_db
from fastapi import Depends, APIRouter
from sqlalchemy.orm import Session
from .service import StatusService

router = APIRouter(
    prefix="/status",
    tags=["Status"],
    responses={404: {"description": "Not found"}},
)

@router.get("")
async def get_all(
    db: Annotated[Session, Depends(get_db)],
):
    return StatusService(db).get_all_status()