from jwt import encode, decode
from jwt import exceptions
from datetime import datetime, timedelta
from fastapi.responses import JSONResponse
#secret_key momentaneo
SECRET_KEY_JWT = "secret_key"

def expire_time(days: int):
    date = datetime.now()
    new_date = date + timedelta(days)
    return new_date

def w_token(data:dict):
    token = encode(payload={**data, "exp": expire_time(2)}, key=SECRET_KEY_JWT, algorithm="HS256")
    return token
    
def validate_token(token, output=False):
    try:
        if output:
            return decode(token, key=SECRET_KEY_JWT, algorithms=["HS256"])
        decode(token, key=SECRET_KEY_JWT, algorithms=["HS256"])
            
    except exceptions.DecodeError:
        return JSONResponse(content={"message": "Token Invalido"}, status_code=401)
    except exceptions.ExpiredSignatureError:
        return JSONResponse(content={"message": "Token expirado"}, status_code=401)