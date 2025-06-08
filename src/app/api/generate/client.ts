// src/app/api/generate/client.ts

import { GenerateResponse } from '@/app/types/api'

export async function generateSentence(sentence: string): Promise<GenerateResponse> {
  const res = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sentence }),
  })

  const data: GenerateResponse = await res.json()

  if (!res.ok) {
    let errMsg
    if ('error' in data) {
      errMsg = data?.error
    } else {
      errMsg = `Server error: ${res.status}`
    }
    throw new Error(errMsg)
  }

  return data
}
