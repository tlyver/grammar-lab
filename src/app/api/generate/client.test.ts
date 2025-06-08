// src/app/api/generate/client.test.ts

import { describe, expect, test, vi } from 'vitest'
import { generateSentence } from './client'
import { GenerateResponse } from '@/types/api'

global.fetch = vi.fn()

describe('generate/client', () => {
  test('returns message on success', async () => {
    const sentence = 'The quick brown fox jumps over the lazy dog.'
    const mockResponse: GenerateResponse = { message: sentence, submitted: sentence }

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response)

    const data = await generateSentence(sentence)
    if ('message' in data) expect(data.message).toBe(sentence)
  })

  test('returns error message when contains error message', async () => {
    const error = 'There was an error'
    const mockResponse: GenerateResponse = { error }

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      json: async () => mockResponse,
    } as Response)

    await expect(generateSentence('')).rejects.toThrow(error)
  })

  test('returns error message when response does not contain error message', async () => {
    const mockResponse = {} as unknown as GenerateResponse
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => mockResponse,
    } as Response)

    await expect(generateSentence('')).rejects.toThrow('Server error: 500')
  })

  test('throws network error', async () => {
    const networkError = 'Failed to fetch'
    vi.mocked(fetch).mockRejectedValueOnce(new Error(networkError))

    await expect(generateSentence('')).rejects.toThrow(networkError)
  })
})
