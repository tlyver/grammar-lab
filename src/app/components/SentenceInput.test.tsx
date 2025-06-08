// src/app/components/SentenceInput.test.tsx

import React from 'react'

import { render, screen, fireEvent } from '@testing-library/react'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import '@testing-library/jest-dom'
import { useSentenceStore } from '@/app/stores/useSentenceStore'
import SentenceInput from './SentenceInput'

// Reset store before each test
beforeEach(() => {
  useSentenceStore.setState({
    sentence: '',
    response: '',
    error: '',
    loading: false,
    setSentence: vi.fn(),
    setResponse: vi.fn(),
    setError: vi.fn(),
    setLoading: vi.fn(),
  })
})

describe('SentenceInput', () => {
  test('renders input and submit button', () => {
    render(<SentenceInput />)
    expect(screen.getByPlaceholderText('Enter a sentence')).toBeInTheDocument()
    expect(screen.getByText('Submit')).toBeInTheDocument()
  })

  test('input updates state on change', () => {
    const setSentence = vi.fn()
    useSentenceStore.setState({ setSentence })

    const sentence = 'The quick brown fox jumps over the lazy dog.'

    render(<SentenceInput />)
    fireEvent.change(screen.getByPlaceholderText('Enter a sentence'), {
      target: { value: sentence },
    })

    expect(setSentence).toHaveBeenCalledWith(sentence)
  })
})
