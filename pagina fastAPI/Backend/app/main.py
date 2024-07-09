from fastapi import FastAPI
from Backend.app.routers.usuarios import usuario_root


main_app = FastAPI()

main_app.include_router(usuario_root)