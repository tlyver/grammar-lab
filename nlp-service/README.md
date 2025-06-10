# NLP Service (FastAPI + spaCy)

This service powers the grammar-lab project by parsing English sentences and returning structured data (tokens, parts of speech, dependencies, etc.).

---

## Quickstart

### 1. Create a virtual environment

```
python3 -m venv venv
source venv/bin/activate   # macOS/Linux
venv\Scripts\activate      # Windows
```

### 2. Install dependencies

```
pip install -r requirements.txt
```

### 3. Download spaCy model

```
python -m spacy download en_core_web_sm
```

### 4. Run the server locally

```
uvicorn main:app --reload
```

Visit: http://localhost:8000

## Endpoints

`GET /`

Simple health check.

`POST /parse`

Parse text and return NLP analysis.

### Request

```
{
  "text": "The cat sat on the mat."
}
```

### Response

```
{
  "tokens": [
    {
      "text": "The",
      "pos": "DET",
      "dep": "det",
      "head": "cat"
    },
    {
      "text": "cat",
      "pos": "NOUN",
      "dep": "nsubj",
      "head": "sat"
    },
    {
      "text": "sat",
      "pos": "VERB",
      "dep": "ROOT",
      "head": "sat"
    },
    {
      "text": "on",
      "pos": "ADP",
      "dep": "prep",
      "head": "sat"
    },
    {
      "text": "the",
      "pos": "DET",
      "dep": "det",
      "head": "mat"
    },
    {
      "text": "mat",
      "pos": "NOUN",
      "dep": "pobj",
      "head": "on"
    },
    {
      "text": ".",
      "pos": "PUNCT",
      "dep": "punct",
      "head": "sat"
    }
  ],
  "text": "The cat sat on the mat."
}
```
