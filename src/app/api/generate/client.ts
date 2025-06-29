// src/app/api/generate/client.ts

import { GenerateResponse } from '@/types/api'

export async function generateText(text: string): Promise<GenerateResponse> {
  const res = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
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
