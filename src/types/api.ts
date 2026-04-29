// src/types/api.ts

export type Token = {
  text: string
  pos: string
  dep: string
  head: string
}

// FastAPI returns
export type NLPServiceResponse = {
  text: string
  tokens: Token[]
}

// What Next.js returns to frontend
export type GenerateRequest = { text: string }

export type GenerateResponse = {
  text: string
  tokens: Token[]
}

export type GenerateErrorResponse = {
  error: string
}
