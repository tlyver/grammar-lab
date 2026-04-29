# nlp-service/schemas/request.py

from pydantic import BaseModel, field_validator

MAX_TEXT_LENGTH = 300

class ParseRequest(BaseModel):
  text: str

  @field_validator("text")
  @classmethod
  def text_must_be_valid(cls, v: str) -> str:
    v = v.strip()
    if not v:
      raise ValueError("text cannot be empty")
    if len(v) > MAX_TEXT_LENGTH:
      raise ValueError(f"text exceeds maximum length of {MAX_TEXT_LENGTH} characters")
    return v
