import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

class _DbService:
  def connect(self):
    return psycopg2.connect(database=os.getenv("DB_DATABASE"),
                            host=os.getenv("DB_HOST"),
                            user=os.getenv("DB_USER"),
                            password=os.getenv("DB_PASSWORD"),
                            port=os.getenv("DB_PORT"))


DbService = _DbService()