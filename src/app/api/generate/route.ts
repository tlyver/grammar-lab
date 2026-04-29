// src/app/api/generate/route.ts

import { GenerateErrorResponse, GenerateRequest, GenerateResponse, NLPServiceResponse } from '@/types/api'
import { MAX_INPUT_LENGTH } from '@/utils/constants'
import { sanitizeText } from '@/utils/sanitize'
import { NextResponse } from 'next/server'
import { callNLPService } from './nlpService'

export async function POST(req: Request) {
  try {
    const body: GenerateRequest = await req.json()
    const cleaned = sanitizeText(body.text)

    if (cleaned === null) {
      return NextResponse.json<GenerateErrorResponse>({ error: 'Invalid input' }, { status: 400 })
    }
    if (cleaned.length === 0) {
      return NextResponse.json<GenerateErrorResponse>({ error: 'Text cannot be empty' }, { status: 400 })
    }
    if (cleaned.length > MAX_INPUT_LENGTH) {
      return NextResponse.json<GenerateErrorResponse>(
        { error: `Text is too long (max ${MAX_INPUT_LENGTH} characters)` },
        { status: 400 }
      )
    }

    const nlp: NLPServiceResponse = await callNLPService(cleaned)
    return NextResponse.json<GenerateResponse>({ text: nlp.text, tokens: nlp.tokens })
  } catch (err) {
    console.error('API error in /generate:', err)
    return NextResponse.json<GenerateErrorResponse>(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
