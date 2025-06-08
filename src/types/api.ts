export type GenerateRequest = { sentence: string }

export type GenerateResponse = {
  message: string,
  submitted: string
} | { error: string }
