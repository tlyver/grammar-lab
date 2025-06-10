// src/stores/useTextStore.test.ts

import { describe, expect, test, beforeEach } from 'vitest'
import { useTextStore } from './useTextStore'

describe('useTextStore', () => {
  beforeEach(() => {
    useTextStore.setState({
      text: '',
      response: '',
      error: '',
      loading: false,
    })
  })

  test('can update text', () => {
    const text = 'She sells seashells by the seashore'
    useTextStore.getState().setText(text)
    expect(useTextStore.getState().text).toBe(text)
  })

  test('can update response', () => {
    const response = 'Fuzzy Wuzzy was a bear. Fuzzy Wuzzy had no hair'
    useTextStore.getState().setResponse(response)
    expect(useTextStore.getState().response).toBe(response)
  })

  test('can update error', () => {
    const error = 'Whoops, try again!'
    useTextStore.getState().setError(error)
    expect(useTextStore.getState().error).toBe(error)
  })

  test('can set loading', () => {
    useTextStore.getState().setLoading(true)
    expect(useTextStore.getState().loading).toBe(true)

    useTextStore.getState().setLoading(false)
    expect(useTextStore.getState().loading).toBe(false)
  })
})
