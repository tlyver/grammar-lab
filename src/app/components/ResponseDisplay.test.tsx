// src/app/components/ResponseDisplay.test.tsx

import React from 'react'

import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import '@testing-library/jest-dom'
import { useSentenceStore } from '@/stores/useSentenceStore'
import ResponseDisplay from './ResponseDisplay'

describe('ResponseDisplay', () => {
  test('displays the response when available ', () => {
    const sentence = 'The quick brown fox jumps over the lazy dog.'
    useSentenceStore.setState({
      sentence,
      response: sentence,
      error: '',
      loading: false,
    })

    render(<ResponseDisplay />)

    expect(screen.getByText(`Response: ${sentence}`)).toBeInTheDocument()
  })

  test('displays an error message when available ', () => {
    const error = 'Invalid or missing sentence'
    useSentenceStore.setState({
      sentence: '',
      response: '',
      error,
      loading: false,
    })

    render(<ResponseDisplay />)

    expect(screen.getByText(error)).toBeInTheDocument()
  })
})
