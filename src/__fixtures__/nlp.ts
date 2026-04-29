import { NLPServiceResponse } from '@/types/api'

export const mockNlpResponse: NLPServiceResponse = {
  text: 'The quick brown fox jumps over the lazy dog.',
  tokens: [
    { text: 'The', pos: 'DET', dep: 'det', head: 'fox' },
    { text: 'quick', pos: 'ADJ', dep: 'amod', head: 'fox' },
    { text: 'brown', pos: 'ADJ', dep: 'amod', head: 'fox' },
    { text: 'fox', pos: 'NOUN', dep: 'nsubj', head: 'jumps' },
    { text: 'jumps', pos: 'VERB', dep: 'ROOT', head: 'jumps' },
    { text: 'over', pos: 'ADP', dep: 'prep', head: 'jumps' },
    { text: 'the', pos: 'DET', dep: 'det', head: 'dog' },
    { text: 'lazy', pos: 'ADJ', dep: 'amod', head: 'dog' },
    { text: 'dog', pos: 'NOUN', dep: 'pobj', head: 'over' },
    { text: '.', pos: 'PUNCT', dep: 'punct', head: 'jumps' },
  ],
}
