// src/types/api.ts

type Token = {
  text: string
  pos: string
  dep: string
  head: string
}

export type GenerateRequest = { text: string }

export type GenerateResponse =
  | {
      text: string
      tokens: Token[]
    }
  | { error: string }
