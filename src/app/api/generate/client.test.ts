// src/app/api/generate/client.test.ts

import { describe, expect, test, vi } from 'vitest'
import { generateSentence } from './client'

global.fetch = vi.fn()

describe('generate/client', () => {
  test('returns message on success', async () => {
    const sentence = 'The quick brown fox jumps over the lazy dog.'

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: sentence, submitted: sentence }),
    } as Response)

    const data = await generateSentence(sentence)
    if ('message' in data) expect(data.message).toBe(sentence)
  })

  test('returns error message when contains error message', async () => {
    const error = 'There was an error'

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error }),
    } as Response)

    await expect(generateSentence('')).rejects.toThrow(error)
  })

  test('returns error message when response does not contain error message', async () => {
    const error = 'There was an error'

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({}),
    } as Response)

    await expect(generateSentence('')).rejects.toThrow('Server error: 500')
  })

  test('throws network error', async () => {
    const networkError = 'Failed to fetch'
    vi.mocked(fetch).mockRejectedValueOnce(new Error(networkError))

    await expect(generateSentence('')).rejects.toThrow(networkError)
  })
})
