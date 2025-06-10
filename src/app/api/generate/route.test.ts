// src/app/api/generate/route.test.ts

import { describe, expect, test, vi } from 'vitest'
import { POST } from './route'
import { GenerateRequest, GenerateResponse } from '@/types/api'

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
    const text = 'The quick brown fox jumps over the lazy dog.'
    const tokens = [
      {
        text: 'The',
        pos: 'DET',
        dep: 'det',
        head: 'fox',
      },
      {
        text: 'quick',
        pos: 'ADJ',
        dep: 'amod',
        head: 'fox',
      },
      {
        text: 'brown',
        pos: 'ADJ',
        dep: 'amod',
        head: 'fox',
      },
      {
        text: 'fox',
        pos: 'NOUN',
        dep: 'nsubj',
        head: 'jumps',
      },
      {
        text: 'jumps',
        pos: 'VERB',
        dep: 'ROOT',
        head: 'jumps',
      },
      {
        text: 'over',
        pos: 'ADP',
        dep: 'prep',
        head: 'jumps',
      },
      {
        text: 'the',
        pos: 'DET',
        dep: 'det',
        head: 'dog',
      },
      {
        text: 'lazy',
        pos: 'ADJ',
        dep: 'amod',
        head: 'dog',
      },
      {
        text: 'dog',
        pos: 'NOUN',
        dep: 'pobj',
        head: 'over',
      },
      {
        text: '.',
        pos: 'PUNCT',
        dep: 'punct',
        head: 'jumps',
      },
    ]
    const mockNlpResponse: GenerateResponse = { text, tokens }

    const mockedFetch = vi.mocked(fetch, true)
    mockedFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockNlpResponse,
    } as Response)

    const req = createMockRequest({ text })
    const res = await POST(req)
    const json = await res.json()

    expect(res.status).toBe(200)
    expect(json.text).toBe(text)
    expect(json.tokens).toEqual(tokens)
  })

  test('returns 400 for missing text', async () => {
    const req = createMockRequest({ text: '' })
    const res = await POST(req)
    const json = await res.json()

    expect(res.status).toBe(400)
    expect(json.error).toBe('Invalid or missing text')
  })

  test('returns 400 for non-string input', async () => {
    const req = createMockRequest({ text: 12345 as unknown as string })
    const res = await POST(req)
    const json = await res.json()

    expect(res.status).toBe(400)
    expect(json.error).toBe('Invalid or missing text')
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
