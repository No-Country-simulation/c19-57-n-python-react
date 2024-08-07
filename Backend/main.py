from fastapi import FastAPI
from Backend.routers.user_create_router import user_root
from Backend.routers.animals_router import animal_root
from Backend.routers.application_router import appli_root
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from dotenv import load_dotenv

load_dotenv()

main_app = FastAPI()

CORS_ORIGIN = os.getenv('CORS_ORIGIN')

origins = [
    CORS_ORIGIN,
]

main_app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

main_app.mount("/static", StaticFiles(directory="/app/frontend/public"), name="static")

main_app.include_router(user_root)
main_app.include_router(animal_root)
main_app.include_router(appli_root)