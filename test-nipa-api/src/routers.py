from fastapi import Depends, FastAPI

app_fast_api = FastAPI()

from .ticket import ticket_api
from .status import status_api

app_fast_api.include_router(ticket_api.router)
app_fast_api.include_router(status_api.router)