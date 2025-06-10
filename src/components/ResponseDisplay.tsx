// src/components/ResponseDisplay.tsx
'use client'

import React from 'react'
import { useTextStore } from '@/stores/useTextStore'

export default function ResponseDisplay() {
  const { response, error } = useTextStore()

  return (
    <>
      {response && <p className="mt-4">Response: {response}</p>}
      {error && <p className="mt-4 text-red-600 font-medium">{error}</p>}
    </>
  )
}
