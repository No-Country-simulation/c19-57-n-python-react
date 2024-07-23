from fastapi import FastAPI
from Backend.routers.user_create_router import user_root
from Backend.routers.animals_router import animal_root
from Backend.routers.application_router import appli_root

main_app = FastAPI()

main_app.include_router(user_root)
main_app.include_router(animal_root)
main_app.include_router(appli_root)