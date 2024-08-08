# FastAPI

Application focused on the adoption of animals, this allows users to enter and adopt the pet you like, you can also apply to adopt the pet or be a temporary home.

## Installation

1. Clone the repository

```bash
git clone https://github.com/No-Country-simulation/c19-57-n-python-react.git
```

2. Select branch

```bash
git chekout branch
```

3. Install requirements

```bash
pip install -r <paht/path>requirements.txt
```

4. Configure database credentials

```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

engine = create_engine("mysql+pymysql://<user>:<password>@localhost/<name_database>")

localsesion = sessionmaker(autoflush=False, autocommit=False, bind=engine)

base = declarative_base()
```

5. Execute application

```bash
uvicorn Backend.main:main_app --reload
```

### Application design

The application is based on the RESTful (Representational State Transfer) architectural model, which performs operations on resources:

- GET
- POST
- PUT
- DELETE

![Design](readme/design-api.png)

#### Model Database

It is an entity-relationship model

![Database](readme/model-database.png)

### Migration in FastAPI

Make changes to the models and execute them in the database.

**Install Alembic:**

```bash
pip install alembic
```

**Init Alembic:**

```bash
alembic init alembic
```

**Configure alembic.ini:**

```bash
sqlalchemy.url = driver://user:password@localhost/dbname
```

**Create a migration:**

```bash
alembic revision --autogenerate -m "Cambiar nombre de columna"
```

**Execute migration:**

```bash
alembic upgrade head
```
