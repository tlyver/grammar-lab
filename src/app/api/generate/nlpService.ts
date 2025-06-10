// src/app/api/generate/nlpService.ts

import { GenerateResponse } from '@/types/api'

export async function callNLPService(text: string): Promise<GenerateResponse> {
  const res = await fetch('http://localhost:8000/parse', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`NLP server error: ${err}`)
  }

  return await res.json()
}
