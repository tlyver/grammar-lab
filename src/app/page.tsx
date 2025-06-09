// src/app/page.tsx

import ResponseDisplay from "./components/ResponseDisplay"
import SentenceInput from "./components/SentenceInput"

export default function Home() {
  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-2">Grammar Lab</h1>
      <SentenceInput />
      <ResponseDisplay />
    </main>
  )
}
