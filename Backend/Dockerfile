# Utiliza una imagen base de Python
FROM python:3.10

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de requerimientos y los instala
COPY ../requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Copia el resto de la aplicación
COPY . .

ARG name=defaultValue
ARG name=defaultValue
ARG name=defaultValue

ENV SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ENV ALGORITHM = "HS256"
ENV ACCESS_TOKEN_EXPIRE_MINUTES = 30
ENV IMEGEN_DIR = ${IMEGEN_DIR}
ENV IMEGEN_DIR2 = ${IMEGEN_DIR2}
ENV CORS_ORIGIN = http://localhost:5173
ENV MYSQL_USER =${MYSQL_USER}
ENV MYSQL_PASSWORD =${MYSQL_PASSWORD}
ENV MYSQL_DB =${MYSQL_DB}

COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

# Expone el puerto en el que correrá la aplicación
EXPOSE 8000

# Comando para ejecutar la aplicación
CMD ["uvicorn", "Backend.main:main_app", "--host", "0.0.0.0", "--port", "8000"]
