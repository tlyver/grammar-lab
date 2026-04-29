# nlp-service/main.py

import spacy
import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from schemas.request import ParseRequest
from schemas.response import Token, ParseResponse

load_dotenv()

app = FastAPI()

# CORS setup for frontend (localhost:3000)
app.add_middleware(
  CORSMiddleware,
  allow_origins=["http://localhost:3000"],
  allow_credentials=True,
  allow_methods=["POST"],
  allow_headers=["Content-Type"],
)

# Load English model
nlp = spacy.load("en_core_web_sm")

@app.get("/")
def root():
  return {"status": "ok"}

@app.post("/parse", response_model=ParseResponse)
async def parse_text(data: ParseRequest):
  doc = nlp(data.text)

  tokens = [
    Token(
      text=token.text,
      pos=token.pos_,
      dep=token.dep_,
      head=token.head.text
    )
    for token in doc
  ]

  return {"text": data.text, "tokens": tokens}
