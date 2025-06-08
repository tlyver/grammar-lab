// src/stores/useSentenceStore.ts

import { create, StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

type State = {
  sentence: string
  response: string
  error: string
  loading: boolean
}

type Actions = {
  setSentence: (sentence: string) => void
  setResponse: (response: string) => void
  setError: (error: string) => void
  setLoading: (loading: boolean) => void
}

type SentenceStore = State & Actions

const createSentenceSlice: StateCreator<SentenceStore> = (set) => ({
	// Set default state
	sentence: '',
	response: '',
	error: '',
	loading: false,

	// Actions
	setSentence: (sentence: string) => set(() => ({ sentence })),
	setResponse: (response: string) => set(() => ({ response })),
	setError: (error: string) => set(() => ({ error })),
	setLoading: (loading: boolean) => set(() => ({ loading })),
})

export const useSentenceStore = create<SentenceStore>()(
	devtools(
		immer((...args) => ({
			...createSentenceSlice(...args)
		})),
		{ name: 'Sentence Store' }
	))