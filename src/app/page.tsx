// /app/page.tsx
'use client'  // enables client-side rendering

import { useSentenceStore } from "@/stores/useSentenceStore"
import { GenerateResponse } from "@/types/api"
import { generateSentence } from "./api/generate/generateSentence"

export default function Home() {
  const {
    sentence,
    setSentence,
    response,
    setResponse,
    error,
    setError,
    loading,
    setLoading
  } = useSentenceStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)
    setResponse('')
    setError('')
    try {
      const data: GenerateResponse = await generateSentence(sentence); 
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
    <main className="p-4">
      <h1 className="text-xl font-bold mb-2">GrammarLab</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="border p-2 mr-2"
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
          placeholder="Enter a sentence"
        />
        <button
          className="bg-blue-500 text-white p-2 rounded"
          type="submit"
          disabled={loading}
        >
          Submit
        </button>
      </form>
      {response && (<p className="mt-4">Response: {response}</p>)}
      {error && (<p className="mt-4 text-red-600 font-medium">{error}</p>)}
    </main>
  )
}
