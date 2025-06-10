// src/components/TextInput.test.tsx

import React from 'react'

import { render, screen, fireEvent } from '@testing-library/react'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import '@testing-library/jest-dom'
import { useTextStore } from '@/stores/useTextStore'
import TextInput from './TextInput'

// Reset store before each test
beforeEach(() => {
  useTextStore.setState({
    text: '',
    response: '',
    error: '',
    loading: false,
    setText: vi.fn(),
    setResponse: vi.fn(),
    setError: vi.fn(),
    setLoading: vi.fn(),
  })
})

describe('SentenceInput', () => {
  test('renders input and submit button', () => {
    render(<TextInput />)
    expect(screen.getByPlaceholderText('Enter a sentence')).toBeInTheDocument()
    expect(screen.getByText('Submit')).toBeInTheDocument()
  })

  test('input updates state on change', () => {
    const setSentence = vi.fn()
    useTextStore.setState({ setText: setSentence })

    const sentence = 'The quick brown fox jumps over the lazy dog.'

    render(<TextInput />)
    fireEvent.change(screen.getByPlaceholderText('Enter a sentence'), {
      target: { value: sentence },
    })

    expect(setSentence).toHaveBeenCalledWith(sentence)
  })
})
