from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

engine = create_engine("postgresql+psycopg2://notebook:masteruser@localhost:5432/notebook_db")
Session = sessionmaker(bind=engine)

def get_db():
    db = Session()
    try:
        yield db
    finally:
        db.close()

if __name__ == "__main__":
    # Test the database connection. Please ensure your PostgreSQL server is running. Run the file with `python database.py`
    try:
        with engine.connect() as connection:
            print("Database connection successful")
    except Exception as e:
        print("Database connection failed:", e)