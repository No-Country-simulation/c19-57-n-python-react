from fastapi import FastAPI
from Backend.routers.user_router import user_root


main_app = FastAPI()

main_app.include_router(user_root)
