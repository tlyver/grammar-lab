// src/components/SentenceInput.tsx
'use client'

import React from 'react'

import { useTextStore } from '@/stores/useTextStore'
import { GenerateResponse } from '@/types/api'
import { generateText } from '@/app/api/generate/client'

export default function TextInput() {
  const { text, setText: setText, setResponse, setError, loading, setLoading } = useTextStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)
    setResponse('')
    setError('')

    try {
      const data: GenerateResponse = await generateText(text)
      if ('text' in data) {
        setResponse(data.text)
      } else {
        setError(data.error)
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      console.error('Error submitting text:', err)
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex">
        <input
          className="flex-1 border p-2 mr-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a sentence"
        />
        <button className="bg-blue-500 text-white p-2 rounded" type="submit" disabled={loading}>
          Submit
        </button>
      </div>
    </form>
  )
}
