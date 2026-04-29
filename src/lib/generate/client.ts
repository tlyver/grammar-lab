// src/lib/api/generate/client.ts

import { GenerateErrorResponse, GenerateResponse } from '@/types/api'

export async function generateText(text: string): Promise<GenerateResponse> {
  const res = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  })

  if (!res.ok) {
    const contentType = res.headers.get('Content-Type') || ''
    if (contentType.includes('application/json')) {
      const data = (await res.json()) as GenerateErrorResponse
      throw new Error(data.error)
    }
    const errText = await res.text()
    throw new Error(`Server error: ${res.status} - ${errText}`)
  }

  return res.json()
}
