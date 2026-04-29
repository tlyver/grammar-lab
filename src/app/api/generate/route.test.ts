// src/app/api/generate/route.test.ts

import { describe, expect, test, vi } from 'vitest'
import { POST } from './route'
import { GenerateRequest } from '@/types/api'
import { MAX_INPUT_LENGTH } from '@/utils/constants'
import { mockNlpResponse } from '@/__fixtures__/nlp'

function createMockRequest(body: GenerateRequest): Request {
  return new Request('http://localhost/api/generate', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
}

global.fetch = vi.fn()

describe('POST /api/generate', () => {
  test('returns text and tokens for valid request', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockNlpResponse,
    } as Response)

    const req = createMockRequest({ text: mockNlpResponse.text })
    const res = await POST(req)
    const json = await res.json()

    expect(res.status).toBe(200)
    expect(json.text).toBe(mockNlpResponse.text)
    expect(json.tokens).toEqual(mockNlpResponse.tokens)
  })

  test('returns 400 with empty-text message for blank input', async () => {
    const req = createMockRequest({ text: '' })
    const res = await POST(req)
    const json = await res.json()

    expect(res.status).toBe(400)
    expect(json.error).toBe('Text cannot be empty')
  })

  test('returns 400 with invalid-input message for non-string input', async () => {
    const req = createMockRequest({ text: 12345 as unknown as string })
    const res = await POST(req)
    const json = await res.json()

    expect(res.status).toBe(400)
    expect(json.error).toBe('Invalid input')
  })

  test('returns 400 with too-long message when text exceeds 300 characters', async () => {
    const req = createMockRequest({ text: 'a'.repeat(301) })
    const res = await POST(req)
    const json = await res.json()

    expect(res.status).toBe(400)
    expect(json.error).toBe(`Text is too long (max ${MAX_INPUT_LENGTH} characters)`)
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
