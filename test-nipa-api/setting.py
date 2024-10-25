from pydantic_settings  import BaseSettings, SettingsConfigDict
from typing import Any, Dict, List, Optional, Union
import os

class Settings(BaseSettings):
    
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_HOST: str
    POSTGRES_PORT: int
    POSTGRES_DB: str
    model_config = SettingsConfigDict(env_file='.env')


settings: Settings = Settings(_env_file='.env')