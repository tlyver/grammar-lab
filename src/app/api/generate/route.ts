// src/app/api/generate/route.ts

import { GenerateRequest, GenerateResponse } from '@/types/api'
import { sanitizeSentence } from '@/utils/sanitize'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body: GenerateRequest = await req.json()
    const { sentence } = body

    const cleaned = sanitizeSentence(sentence)

    if (!cleaned) {
      return NextResponse.json<GenerateResponse>(
        { error: 'Invalid or missing sentence' },
        { status: 400 }
      )
    }

    return NextResponse.json<GenerateResponse>({
      message: cleaned,
      submitted: sentence,
    })
  } catch (err) {
    console.error('API error in /generate:', err)
    return NextResponse.json<GenerateResponse>({ error: 'Internal server error' }, { status: 500 })
  }
}
