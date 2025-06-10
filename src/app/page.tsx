// src/app/page.tsx

import ResponseDisplay from '@/components/ResponseDisplay'
import TextInput from '@/components/TextInput'

export default function Home() {
  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-2">Grammar Lab</h1>
      <TextInput />
      <ResponseDisplay />
    </main>
  )
}
