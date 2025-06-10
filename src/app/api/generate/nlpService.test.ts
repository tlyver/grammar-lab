// src/app/api/generate/nlpService.test.ts

import { describe, expect, test, vi } from 'vitest'
import { GenerateResponse } from '@/types/api'
import { callNLPService } from './nlpService'

global.fetch = vi.fn()

describe('generate/client', () => {
  test('returns message on success', async () => {
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
    const mockResponse: GenerateResponse = { text, tokens }

    const mockedFetch = vi.mocked(fetch, true)
    mockedFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response)

    const data = await callNLPService(text)
    if ('tokens' in data) {
      expect(data.text).toEqual(text)
      expect(data.tokens).toEqual(tokens)
    }
  })

  test('returns error message when response is not ok', async () => {
    const error = 'There was an error'
    const mockResponse = {} as unknown as GenerateResponse
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 500,
      text: async () => error,
      json: async () => mockResponse,
    } as Response)

    await expect(callNLPService('')).rejects.toThrow(`NLP server error: ${error}`)
  })

  test('throws network error', async () => {
    const networkError = 'Failed to fetch'
    vi.mocked(fetch).mockRejectedValueOnce(new Error(networkError))

    await expect(callNLPService('')).rejects.toThrow(networkError)
  })
})
