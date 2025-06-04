// /app/page.tsx
'use client'  // enables client-side rendering

import { useState } from "react"

export default function Home() {
  // TODO: add Zustand store
  const [sentence, setSentence] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setResponse('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sentence }),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data = await res.json();
      setResponse(data.message);
    } catch (err) {
      console.error('Error submitting sentence:', err);
      setResponse('Something went wrong. Please try again.');
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
      {response && <p className="mt-4">Response: {response}</p>}
    </main>
  )
}
