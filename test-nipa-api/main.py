from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src import routers

app = routers.app_fast_api
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
