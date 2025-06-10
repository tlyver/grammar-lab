// src/app/api/generate/route.ts

import { GenerateRequest, GenerateResponse } from '@/types/api'
import { sanitizeText } from '@/utils/sanitize'
import { NextResponse } from 'next/server'
import { callNLPService } from './nlpService'

export async function POST(req: Request) {
  try {
    const body: GenerateRequest = await req.json()
    const cleaned = sanitizeText(body.text)

    if (!cleaned) {
      return NextResponse.json<GenerateResponse>(
        { error: 'Invalid or missing text' },
        { status: 400 }
      )
    }

    const nlp = await callNLPService(cleaned)
    return NextResponse.json<GenerateResponse>(nlp)
  } catch (err) {
    console.error('API error in /generate:', err)
    return NextResponse.json<GenerateResponse>({ error: 'Internal server error' }, { status: 500 })
  }
}
