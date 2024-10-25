from fastapi import FastAPI
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from setting import settings


# Define the database URL (replace with your actual database credentials)
database_url = f"postgresql://{settings.POSTGRES_USER}:{settings.POSTGRES_PASSWORD}@{settings.POSTGRES_HOST}:{settings.POSTGRES_PORT}/{settings.POSTGRES_DB}"

# Create the SQLAlchemy engine
engine = create_engine(database_url, echo=False)

# Create a session factory using the engine
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# Dependency function to provide a database session to routes
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()