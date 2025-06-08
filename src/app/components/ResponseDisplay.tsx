// src/app/components/ResponseDisplay.tsx
'use client'

import React from 'react'
import { useSentenceStore } from '@/app/stores/useSentenceStore'

export default function ResponseDisplay() {
  const { response, error } = useSentenceStore()

  return (
    <>
      {response && <p className="mt-4">Response: {response}</p>}
      {error && <p className="mt-4 text-red-600 font-medium">{error}</p>}
    </>
  )
}
