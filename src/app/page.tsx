// /app/page.tsx
'use client'  // enables client-side rendering

import { GenerateResponse } from "@/types/api";
import { useState } from "react"

export default function Home() {
  // TODO: add Zustand store
  const [sentence, setSentence] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setResponse('');
    setError('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sentence }),
      });

      const data: GenerateResponse = await res.json();

      if (!res.ok) {
        if ('error' in data) setError(data.error);
        else setError(`Server error: ${res.status}`);
        return
      }

      if ('message' in data) setResponse(data.message);
      else setError('Unexpected response structure');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      console.error('Error submitting sentence:', err)
      setError(message)
    } finally {
      setLoading(false);
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
