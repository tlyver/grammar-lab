// src/app/components/SentenceInput.tsx
'use client'

import { useSentenceStore } from '@/stores/useSentenceStore'
import { generateSentence } from '../api/generate/generateSentence'
import { GenerateResponse } from '@/types/api'

export default function SentenceInput() {
  const { sentence, setSentence, setResponse, setError, loading, setLoading } = useSentenceStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)
    setResponse('')
    setError('')

    try {
      const data: GenerateResponse = await generateSentence(sentence)
      if ('message' in data) {
        setResponse(data.message)
      } else {
        setError(data.error)
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      console.error('Error submitting sentence:', err)
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
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
          placeholder="Enter a sentence"
        />
        <button className="bg-blue-500 text-white p-2 rounded" type="submit" disabled={loading}>
          Submit
        </button>
      </div>
    </form>
  )
}
