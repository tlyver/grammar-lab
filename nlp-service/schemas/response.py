# nlp-service/schemas/response.py

# from dataclasses import dataclass
from pydantic import BaseModel
from typing import List

# @dataclass
class Token(BaseModel):
  text: str
  pos: str
  dep: str
  head: str

class ParseResponse(BaseModel):
  text: str
  tokens: List[Token]
