// src/components/ResponseDisplay.test.tsx

import React from 'react'

import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import '@testing-library/jest-dom'
import { useTextStore } from '@/stores/useTextStore'
import ResponseDisplay from './ResponseDisplay'

describe('ResponseDisplay', () => {
  test('displays the response when available ', () => {
    const text = 'The quick brown fox jumps over the lazy dog.'
    useTextStore.setState({
      text,
      response: text,
      error: '',
      loading: false,
    })

    render(<ResponseDisplay />)

    expect(screen.getByText(`Response: ${text}`)).toBeInTheDocument()
  })

  test('displays an error message when available ', () => {
    const error = 'Invalid or missing text'
    useTextStore.setState({
      text: '',
      response: '',
      error,
      loading: false,
    })

    render(<ResponseDisplay />)

    expect(screen.getByText(error)).toBeInTheDocument()
  })
})
