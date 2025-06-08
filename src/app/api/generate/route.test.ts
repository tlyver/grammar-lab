// src/app/api/generate/route.test.ts

import { describe, expect, test } from 'vitest'
import { POST } from './route'
import { GenerateRequest } from '@/app/types/api'

function createMockRequest(body: GenerateRequest): Request {
  return new Request('http://localhost/api/generate', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
}

describe('POST /api/generate', () => {
  test('returns message for valid sentence', async () => {
    const sentence = 'The quick brown fox jumps over the lazy dog.'
    const req = createMockRequest({ sentence })
    const res = await POST(req)
    const json = await res.json()

    expect(res.status).toBe(200)
    expect(json.message).toBe(sentence)
    expect(json.submitted).toBe(sentence)
  })

  test('returns 400 for missing sentence', async () => {
    const req = createMockRequest({ sentence: '' })
    const res = await POST(req)
    const json = await res.json()

    expect(res.status).toBe(400)
    expect(json.error).toBe('Invalid or missing sentence')
  })

  test('returns 400 for non-string input', async () => {
    const req = createMockRequest({ sentence: 12345 as unknown as string })
    const res = await POST(req)
    const json = await res.json()

    expect(res.status).toBe(400)
    expect(json.error).toBe('Invalid or missing sentence')
  })

  test('returns 500 on unexpected server error', async () => {
    const brokenRequest = {
      json: () => {
        throw new Error('Unexpected error')
      },
    } as unknown as Request

    const res = await POST(brokenRequest)
    const json = await res.json()

    expect(res.status).toBe(500)
    expect(json.error).toBe('Internal server error')
  })
})
