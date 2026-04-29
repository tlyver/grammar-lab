// src/app/api/generate/nlpService.test.ts

import { describe, expect, test, vi } from 'vitest'
import { callNLPService } from './nlpService'
import { mockNlpResponse } from '@/__fixtures__/nlp'

global.fetch = vi.fn()

describe('callNLPService', () => {
  test('returns parsed NLP response on success', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockNlpResponse,
    } as Response)

    const data = await callNLPService(mockNlpResponse.text)
    expect(data.text).toEqual(mockNlpResponse.text)
    expect(data.tokens).toEqual(mockNlpResponse.tokens)
  })

  test('throws on non-ok response', async () => {
    const error = 'There was an error'
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 500,
      text: async () => error,
    } as Response)

    await expect(callNLPService('')).rejects.toThrow(`NLP server error: ${error}`)
  })

  test('throws on network error', async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error('Failed to fetch'))

    await expect(callNLPService('')).rejects.toThrow('Failed to fetch')
  })
})
