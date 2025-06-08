// src/utils/sanitize.test.ts

import { describe, it, expect } from 'vitest'
import { sanitizeSentence } from './sanitize'

describe('sanitizeSentence', () => {
  it('removes control characters like \\u0007 and \\x00', () => {
    const input = 'Hello\u0007\u0000world'
    const result = sanitizeSentence(input)
    expect(result).toBe('Helloworld')
  })

  it('accepts valid, safe sentences', () => {
    expect(sanitizeSentence('The quick brown fox jumps over the lazy dog.')).toBe(
      'The quick brown fox jumps over the lazy dog.'
    )
  })

  it('returns cleaned result when input is messy but safe', () => {
    const input = '  \u0000Hello world!\n'
    const result = sanitizeSentence(input)
    expect(result).toBe('Hello world!')
  })

  it('rejects empty or whitespace-only input', () => {
    expect(sanitizeSentence('   ')).toBeNull()
    expect(sanitizeSentence('\n\t')).toBeNull()
    expect(sanitizeSentence('')).toBeNull()
  })

  it('rejects strings that exceed length limit', () => {
    const longInput = 'a'.repeat(301)
    expect(sanitizeSentence(longInput)).toBeNull()
  })

  it('rejects dangerous HTML/script patterns', () => {
    expect(sanitizeSentence('<script>alert(1)</script>')).toBeNull()
    expect(sanitizeSentence('<img src=x onerror=alert(1)>')).toBeNull()
    expect(sanitizeSentence('eval(alert("x"))')).toBeNull()
  })

  it('rejects prompt injection-like patterns', () => {
    expect(sanitizeSentence('${malicious}')).toBeNull()
    expect(sanitizeSentence('{{ override }}')).toBeNull()
  })

  it('returns null for non-string input', () => {
    expect(sanitizeSentence(123 as number)).toBeNull()
    expect(sanitizeSentence(undefined)).toBeNull()
    expect(sanitizeSentence(null)).toBeNull()
  })
})
