// src/lib/generate/client.test.ts

import { describe, expect, test, vi } from 'vitest'
import { generateText } from './client'
import { mockNlpResponse } from '@/__fixtures__/nlp'

global.fetch = vi.fn()

function mockJsonResponse(body: unknown, ok: boolean, status = 200): Response {
  return {
    ok,
    status,
    headers: { get: vi.fn().mockReturnValue('application/json') },
    json: async () => body,
    text: async () => '',
  } as unknown as Response
}

describe('generateText', () => {
  test('returns text and tokens on success', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(mockJsonResponse(mockNlpResponse, true))

    const data = await generateText(mockNlpResponse.text)
    expect(data.text).toEqual(mockNlpResponse.text)
    expect(data.tokens).toEqual(mockNlpResponse.tokens)
  })

  test('throws with server error message from JSON body', async () => {
    const error = 'There was an error'
    vi.mocked(fetch).mockResolvedValueOnce(mockJsonResponse({ error }, false, 500))

    await expect(generateText('')).rejects.toThrow(error)
  })

  test('throws with status code when error is plain text', async () => {
    const errorText = 'Internal server error from NLP service'
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 500,
      headers: { get: vi.fn().mockReturnValue('text/plain') },
      text: async () => errorText,
    } as unknown as Response)

    await expect(generateText('')).rejects.toThrow(`Server error: 500 - ${errorText}`)
  })

  test('throws on network error', async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error('Failed to fetch'))

    await expect(generateText('')).rejects.toThrow('Failed to fetch')
  })
})
