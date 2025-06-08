// src/app/stores/useSentenceStore.test.ts

import { describe, expect, test, beforeEach } from 'vitest'
import { useSentenceStore } from './useSentenceStore'

describe('useSentenceStore', () => {
  beforeEach(() => {
    useSentenceStore.setState({
      sentence: '',
      response: '',
      error: '',
      loading: false,
    })
  })

  test('can update sentence', () => {
    const sentence = 'She sells seashells by the seashore'
    useSentenceStore.getState().setSentence(sentence)
    expect(useSentenceStore.getState().sentence).toBe(sentence)
  })

  test('can update response', () => {
    const response = 'Fuzzy Wuzzy was a bear. Fuzzy Wuzzy had no hair'
    useSentenceStore.getState().setResponse(response)
    expect(useSentenceStore.getState().response).toBe(response)
  })

  test('can update error', () => {
    const error = 'Whoops, try again!'
    useSentenceStore.getState().setError(error)
    expect(useSentenceStore.getState().error).toBe(error)
  })

  test('can set loading', () => {
    useSentenceStore.getState().setLoading(true)
    expect(useSentenceStore.getState().loading).toBe(true)

    useSentenceStore.getState().setLoading(false)
    expect(useSentenceStore.getState().loading).toBe(false)
  })
})
