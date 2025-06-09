# nlp-service/main.py

import spacy
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from schemas.request import ParseRequest
from schemas.response import Token
from schemas.response import ParseResponse

app = FastAPI()

# CORS setup for frontend (localhost:3000)
app.add_middleware(
  CORSMiddleware,
  allow_origins=["http://localhost:3000"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

# Load English model
nlp = spacy.load("en_core_web_sm")

@app.get("/")
def root():
  return {"message": "NLP service is running."}

@app.post("/parse", response_model=ParseResponse)
async def parse_text(data: ParseRequest):
  text: str = data.text
  if not text or not isinstance(text, str):
    return {"error": "Invalid or missing text"}

  doc = nlp(text)

  tokens = [
    Token(
      text=token.text,
      pos=token.pos_,
      dep=token.dep_,
      head=token.head.text
    )
    for token in doc
  ]

  return {
    "text": text,
    "tokens": tokens,
  }