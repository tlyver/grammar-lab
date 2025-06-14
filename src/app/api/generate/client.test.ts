// src/app/api/generate/client.test.ts

import { describe, expect, test, vi } from 'vitest'
import { generateText } from './client'
import { GenerateResponse } from '@/types/api'

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

    const data = await generateText(text)
    if ('text' in data) expect(data.text).toEqual(text)
  })

  test('returns error message when contains error message', async () => {
    const error = 'There was an error'
    const mockResponse: GenerateResponse = { error }

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      json: async () => mockResponse,
    } as Response)

    await expect(generateText('')).rejects.toThrow(error)
  })

  test('returns error message when response does not contain error message', async () => {
    const mockResponse = {} as unknown as GenerateResponse
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => mockResponse,
    } as Response)

    await expect(generateText('')).rejects.toThrow('Server error: 500')
  })

  test('throws network error', async () => {
    const networkError = 'Failed to fetch'
    vi.mocked(fetch).mockRejectedValueOnce(new Error(networkError))

    await expect(generateText('')).rejects.toThrow(networkError)
  })
})
