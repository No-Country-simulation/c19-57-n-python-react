from fastapi import FastAPI
from Backend.routers.user_create_router import user_root
from Backend.routers.animals_router import animal_root
from Backend.routers.application_router import appli_root
from fastapi.middleware.cors import CORSMiddleware

main_app = FastAPI()

origins = [
    "http://localhost:5173",
]

main_app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

main_app.include_router(user_root)
main_app.include_router(animal_root)
main_app.include_router(appli_root)