// src/app/components/ResponseDisplay.tsx
'use client'

import { useSentenceStore } from '@/stores/useSentenceStore'

export default function ResponseDisplay() {
  const { response, error } = useSentenceStore()

  return (
    <>
      {response && <p className="mt-4">Response: {response}</p>}
      {error && <p className="mt-4 text-red-600 font-medium">{error}</p>}
    </>
  )
}
