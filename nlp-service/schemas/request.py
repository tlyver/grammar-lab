# nlp-service/schemas/request.py

from pydantic import BaseModel

class ParseRequest(BaseModel):
  text: str