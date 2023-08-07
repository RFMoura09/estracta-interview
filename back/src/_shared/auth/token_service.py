import datetime
import os
import jwt
from dotenv import load_dotenv

load_dotenv()

class TokenService:
    def generate_token(self) -> str:
      return jwt.encode({"exp": datetime.datetime.now(tz=datetime.timezone.utc) + datetime.timedelta(minutes=int(os.getenv('TOKEN_EXP_MINUTES')))}, 
                        os.getenv('TOKEN_SECRET'),
                        algorithm=os.getenv('TOKEN_ALG'))
    
    def validate_token(self, token: str) -> bool:
      try: 
        decode = jwt.decode(token,
                            os.getenv('TOKEN_SECRET'),
                            algorithms=os.getenv('TOKEN_ALG'))
        return bool(decode)
      except:
        return False

tokenService = TokenService()