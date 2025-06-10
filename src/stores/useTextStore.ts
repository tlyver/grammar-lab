// src/stores/useTextStore.ts

import { create, StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

type State = {
  text: string
  response: string
  error: string
  loading: boolean
}

type Actions = {
  setText: (text: string) => void
  setResponse: (response: string) => void
  setError: (error: string) => void
  setLoading: (loading: boolean) => void
}

type TextStore = State & Actions

const createTextSlice: StateCreator<TextStore> = (set) => ({
  // Set default state
  text: '',
  response: '',
  error: '',
  loading: false,

  // Actions
  setText: (text: string) => set(() => ({ text })),
  setResponse: (response: string) => set(() => ({ response })),
  setError: (error: string) => set(() => ({ error })),
  setLoading: (loading: boolean) => set(() => ({ loading })),
})

export const useTextStore = create<TextStore>()(
  devtools(
    immer((...args) => ({
      ...createTextSlice(...args),
    })),
    { name: 'Text Store' }
  )
)
