# Grammar Lab

Grammar Lab is a sentence diagramming tool that parses English text and returns part-of-speech tags, dependency relations, and syntax structure. It is designed as a learning tool for exploring how sentences are grammatically composed.

## Architecture

The project is split into two services:

| Service | Location | Purpose |
|---|---|---|
| Next.js app | `/` | UI, input validation, API gateway |
| NLP service | `/nlp-service` | FastAPI + spaCy text parsing |

The Next.js API layer sanitises and validates user input before forwarding it to the NLP service, then returns structured token data to the frontend.

## Getting started

### Prerequisites

- Node.js 18+
- Python 3.10+

### 1. Start the NLP service

The NLP service must be running before the Next.js app can parse text. See [nlp-service/README.md](./nlp-service/README.md) for full setup instructions.

```bash
cd nlp-service
python3 -m venv venv
source venv/bin/activate      # macOS/Linux
pip install -r requirements.txt
python -m spacy download en_core_web_sm
uvicorn main:app --reload
```

Runs on `http://localhost:8000`.

### 2. Start the Next.js app

```bash
npm install
npm run dev
```

Runs on `http://localhost:3000`.

## Tech stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS, Zustand
- **API layer:** Next.js API Routes
- **NLP backend:** FastAPI, spaCy (`en_core_web_sm`)

## Roadmap

- [ ] Visualise parse tree
- [ ] Grammar explanation feature
- [ ] User login and personalisation
- [ ] Adaptive difficulty
